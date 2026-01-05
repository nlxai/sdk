/* eslint-disable no-case-declarations */
/* eslint-disable jsdoc/require-jsdoc */
import { type ConversationHandler } from "@nlxai/core";
import { useState } from "react";

interface FeedbackInfo {
  rating: number | null;
  commentSubmitted: boolean;
  commentText: string;
}

export interface State {
  comment: CommentState;
  items: Record<string, FeedbackInfo>;
}

type CommentState =
  | { state: "idle" }
  | { state: "editing"; activeFeedbackUrl: string; text: string }
  | { state: "submitting"; activeFeedbackUrl: string; text: string }
  | { state: "submitted"; activeFeedbackUrl: string; text: string }
  | { state: "error"; activeFeedbackUrl: string; text: string };

const initialize: State = {
  comment: { state: "idle" },
  items: {},
};

export const getFeedbackInfo = (
  state: State,
  feedbackUrl: string,
): FeedbackInfo => {
  return (
    state.items[feedbackUrl] ?? {
      rating: null,
      commentSubmitted: false,
      commentText: "",
    }
  );
};

// Helper functions for state transitions
function clickRatingState(
  state: State,
  feedbackUrl: string,
  value: number,
): State {
  return {
    ...state,
    items: {
      ...state.items,
      [feedbackUrl]: {
        ...getFeedbackInfo(state, feedbackUrl),
        rating: state.items[feedbackUrl]?.rating == null ? value : null,
      },
    },
  };
}

function clickCommentButtonState(state: State, feedbackUrl: string): State {
  const existingFeedback = getFeedbackInfo(state, feedbackUrl);
  if (existingFeedback.commentSubmitted) {
    return {
      ...state,
      comment: {
        state: "submitted",
        activeFeedbackUrl: feedbackUrl,
        text: existingFeedback.commentText,
      },
    };
  } else {
    return {
      ...state,
      comment: {
        state: "editing",
        activeFeedbackUrl: feedbackUrl,
        text: state.items[feedbackUrl]?.commentText ?? "",
      },
    };
  }
}

function clickCommentEditState(state: State, feedbackUrl: string): State {
  const feedback = getFeedbackInfo(state, feedbackUrl);
  return {
    ...state,
    comment: {
      activeFeedbackUrl: feedbackUrl,
      state: "editing",
      text: feedback.commentText,
    },
  };
}

function editCommentTextState(
  state: State,
  feedbackUrl: string,
  text: string,
): State {
  return {
    ...state,
    comment: {
      activeFeedbackUrl: feedbackUrl,
      state: "editing",
      text,
    },
  };
}

function submitCommentState(state: State, feedbackUrl: string): State {
  return {
    ...state,
    comment: {
      activeFeedbackUrl: feedbackUrl,
      state: "submitting",
      text: state.comment.state === "editing" ? state.comment.text : "",
    },
  };
}

function cancelCommentState(state: State): State {
  return {
    ...state,
    comment: { state: "idle" },
  };
}

function submissionSuccessState(state: State): State {
  if (state.comment.state !== "submitting") {
    return state;
  }
  const feedbackUrl = state.comment.activeFeedbackUrl;
  return {
    ...state,
    comment: {
      state: "idle",
    },
    items: {
      ...state.items,
      [feedbackUrl]: {
        ...getFeedbackInfo(state, feedbackUrl),
        commentSubmitted: true,
        commentText: state.comment.text,
      },
    },
  };
}

function submissionErrorState(state: State): State {
  return {
    ...state,
    comment: {
      activeFeedbackUrl:
        state.comment.state === "submitting"
          ? state.comment.activeFeedbackUrl
          : "",
      text: state.comment.state === "submitting" ? state.comment.text : "",
      state: "error",
    },
  };
}

export interface Actions {
  clickRating: (feedbackUrl: string, value: number) => void;
  clickCommentButton: (feedbackUrl: string) => void;
  clickCommentEdit: () => void;
  editCommentText: (text: string) => void;
  submitComment: () => Promise<void>;
  cancelComment: () => void;
}

const actions = (
  setState: React.Dispatch<React.SetStateAction<State>>,
  handler: ConversationHandler,
  state: State,
): Actions => ({
  clickRating: (feedbackUrl: string, value: number) => {
    if (getFeedbackInfo(state, feedbackUrl).rating === value) {
      setState((prev) => clickRatingState(prev, feedbackUrl, value));
      return;
    }
    void handler
      .submitFeedback(feedbackUrl, {
        rating: value,
      })
      .then(() => {
        setState((prev) => clickRatingState(prev, feedbackUrl, value));
      })
      .catch((err: any) => {
        // TODO: add proper error handling
        // eslint-disable-next-line no-console
        console.warn("Rating error", err);
      });
  },
  clickCommentButton: (feedbackUrl: string) => {
    setState((prev) => clickCommentButtonState(prev, feedbackUrl));
  },
  clickCommentEdit: () => {
    setState((prev) => {
      if (prev.comment.state === "idle") return prev;
      return clickCommentEditState(prev, prev.comment.activeFeedbackUrl);
    });
  },
  editCommentText: (text: string) => {
    setState((prev) => {
      if (prev.comment.state === "idle") return prev;
      return editCommentTextState(prev, prev.comment.activeFeedbackUrl, text);
    });
  },
  submitComment: async () => {
    setState((prev) => {
      if (prev.comment.state === "idle") return prev;
      return submitCommentState(prev, prev.comment.activeFeedbackUrl);
    });
    if (state.comment.state === "idle") return;
    const feedbackUrl = state.comment.activeFeedbackUrl;

    handler
      .submitFeedback(feedbackUrl, {
        comment: state.comment.text,
      })
      .then(() => {
        setState((prev) => {
          return submissionSuccessState(prev);
        });
      })
      .catch(() => {
        setState((prev) => submissionErrorState(prev));
      });
  },
  cancelComment: () => {
    setState((prev) => cancelCommentState(prev));
  },
});

export function useFeedback(handler: ConversationHandler): [State, Actions] {
  const [state, setState] = useState<State>(initialize);
  return [state, actions(setState, handler, state)] as const;
}
