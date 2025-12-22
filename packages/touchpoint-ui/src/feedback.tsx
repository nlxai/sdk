/* eslint-disable no-case-declarations */
/* eslint-disable jsdoc/require-jsdoc */
import { type ConversationHandler } from "@nlxai/core";
import { useReducer } from "react";

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

type Action =
  | { type: "CLICK_RATING"; feedbackUrl: string; value: number }
  | { type: "CLICK_COMMENT_BUTTON"; feedbackUrl: string }
  | { type: "CLICK_COMMENT_EDIT"; feedbackUrl: string }
  | { type: "EDIT_COMMENT_TEXT"; feedbackUrl: string; text: string }
  | { type: "SUBMIT_COMMENT"; feedbackUrl: string }
  | { type: "CANCEL_COMMENT" }
  | { type: "SUBMISSION_SUCCESS" }
  | { type: "SUBMISSION_ERROR" };

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

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "CLICK_RATING":
      return {
        ...state,
        items: {
          ...state.items,
          [action.feedbackUrl]: {
            ...getFeedbackInfo(state, action.feedbackUrl),
            rating:
              state.items[action.feedbackUrl]?.rating == null
                ? action.value
                : null,
          },
        },
      };
    case "CLICK_COMMENT_BUTTON":
      const existingFeedback = getFeedbackInfo(state, action.feedbackUrl);

      if (existingFeedback.commentSubmitted) {
        return {
          ...state,
          comment: {
            state: "submitted",
            activeFeedbackUrl: action.feedbackUrl,
            text: existingFeedback.commentText,
          },
        };
      } else {
        return {
          ...state,
          comment: {
            state: "editing",
            activeFeedbackUrl: action.feedbackUrl,
            text: state.items[action.feedbackUrl]?.commentText ?? "",
          },
        };
      }
    case "CLICK_COMMENT_EDIT":
      const feedback = getFeedbackInfo(state, action.feedbackUrl);
      return {
        ...state,
        comment: {
          activeFeedbackUrl: action.feedbackUrl,
          state: "editing",
          text: feedback.commentText,
        },
      };
    case "EDIT_COMMENT_TEXT":
      return {
        ...state,
        comment: {
          activeFeedbackUrl: action.feedbackUrl,
          state: "editing",
          text: action.text,
        },
      };
    case "SUBMIT_COMMENT":
      return {
        ...state,
        comment: {
          activeFeedbackUrl: action.feedbackUrl,
          state: "submitting",
          text: state.comment.state === "editing" ? state.comment.text : "",
        },
      };
    case "CANCEL_COMMENT":
      return {
        ...state,
        comment: { state: "idle" },
      };

    case "SUBMISSION_SUCCESS":
      if (state.comment.state !== "submitting") {
        return state;
      }
      const feedbackUrl = state.comment.activeFeedbackUrl;
      return {
        ...state,
        comment: {
          activeFeedbackUrl: feedbackUrl,
          state: "submitted",
          text: state.comment.text,
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
    case "SUBMISSION_ERROR":
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
    default:
      throw new Error("Unknown action type");
  }
};

export interface Actions {
  clickRating: (feedbackUrl: string, value: number) => void;
  clickCommentButton: (feedbackUrl: string) => void;
  clickCommentEdit: () => void;
  editCommentText: (text: string) => void;
  submitComment: () => Promise<void>;
  cancelComment: () => void;
}

const actions = (
  dispatch: React.Dispatch<Action>,
  handler: ConversationHandler,
  state: State,
): Actions => ({
  clickRating: (feedbackUrl: string, value: number) => {
    // the following is a more correct and idiomatic version, but it will need to wait for a dependency update
    // startTransition(async () => {
    //   try {
    //     await handler.submitFeedback(state.feedbackUrl, {
    //       rating: value,
    //     });
    //     startTransition(() => {
    //       dispatch({ type: "CLICK_RATING", value });
    //     });
    //   } catch (_error) {}
    // });

    if (getFeedbackInfo(state, feedbackUrl).rating === value) {
      dispatch({ type: "CLICK_RATING", value, feedbackUrl });
      return;
    }

    void handler
      .submitFeedback(feedbackUrl, {
        rating: value,
      })
      .then(() => {
        dispatch({ type: "CLICK_RATING", value, feedbackUrl });
      })
      .catch((err: any) => {
        // TODO: add proper error handling
        // eslint-disable-next-line no-console
        console.warn("Rating error", err);
      });
  },
  clickCommentButton: (feedbackUrl: string) => {
    dispatch({ type: "CLICK_COMMENT_BUTTON", feedbackUrl });
  },
  clickCommentEdit: () => {
    if (state.comment.state === "idle") return;
    dispatch({
      type: "CLICK_COMMENT_EDIT",
      feedbackUrl: state.comment.activeFeedbackUrl,
    });
  },
  editCommentText: (text: string) => {
    if (state.comment.state === "idle") return;
    dispatch({
      type: "EDIT_COMMENT_TEXT",
      text,
      feedbackUrl: state.comment.activeFeedbackUrl,
    });
  },
  submitComment: async () => {
    if (state.comment.state === "idle") return;
    dispatch({
      type: "SUBMIT_COMMENT",
      feedbackUrl: state.comment.activeFeedbackUrl,
    });
    handler
      .submitFeedback(state.comment.activeFeedbackUrl, {
        comment: state.comment.text,
      })
      .then(() => {
        dispatch({ type: "SUBMISSION_SUCCESS" });
      })
      .catch(() => {
        dispatch({ type: "SUBMISSION_ERROR" });
      });
  },
  cancelComment: () => {
    dispatch({ type: "CANCEL_COMMENT" });
  },
});

export function useFeedback(handler: ConversationHandler): [State, Actions] {
  const [state, dispatch] = useReducer(reducer, initialize);
  return [state, actions(dispatch, handler, state)] as const;
}
