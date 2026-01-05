/* eslint-disable jsdoc/require-jsdoc */
import { type ConversationHandler } from "@nlxai/core";
import { useState } from "react";

interface FeedbackInfo {
  rating: number | null;
  commentSubmitted: boolean;
  commentText: string;
  pending: boolean;
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

function updateFeedbackInfo(
  state: State,
  feedbackUrl: string,
  info: Partial<FeedbackInfo>,
): State {
  return {
    ...state,
    items: {
      ...state.items,
      [feedbackUrl]: {
        ...getFeedbackInfo(state, feedbackUrl),
        ...info,
      },
    },
  };
}

// Helper functions for state transitions
function clickRatingState(
  state: State,
  feedbackUrl: string,
  pending: boolean,
  value?: number,
): State {
  return updateFeedbackInfo(state, feedbackUrl, {
    rating: value,
    pending,
  });
}

type Compatible<T, U> = T extends U ? U : never;

function updateCommentState<S extends State, T extends Partial<CommentState>>(
  state: S,
  newState: Compatible<S["comment"], T>,
): State {
  if (newState.state === "idle") {
    return {
      ...state,
      comment: { state: "idle" },
    };
  }
  return {
    ...state,
    comment: { ...state.comment, ...newState },
  };
}

function clickCommentButtonState(state: State, feedbackUrl: string): State {
  const existingFeedback = getFeedbackInfo(state, feedbackUrl);
  return updateCommentState(state, {
    state: existingFeedback.commentSubmitted ? "submitted" : "editing",
    activeFeedbackUrl: feedbackUrl,
    text: existingFeedback.commentText,
  });
}

function clickCommentEditState(state: State, feedbackUrl: string): State {
  return updateCommentState(state, {
    state: "editing",
    activeFeedbackUrl: feedbackUrl,
    text: getFeedbackInfo(state, feedbackUrl).commentText,
  });
}

function submitCommentState(state: State, feedbackUrl: string): State {
  return updateCommentState(state, {
    activeFeedbackUrl: feedbackUrl,
    state: "submitting",
    text: state.comment.state === "editing" ? state.comment.text : "",
  });
}

function cancelCommentState(state: State): State {
  return updateCommentState(state, {
    state: "idle",
  });
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
  clickRating: (feedbackUrl: string, value?: number) => {
    if (getFeedbackInfo(state, feedbackUrl).rating === value) {
      value = undefined;
    }
    setState((prev) => clickRatingState(prev, feedbackUrl, true, value));
    void handler
      .submitFeedback(feedbackUrl, {
        rating: value ?? 0,
      })
      .then(() => {
        setState((prev) => clickRatingState(prev, feedbackUrl, false, value));
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

      return updateCommentState(prev, {
        state: "editing",
        text,
      });
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
