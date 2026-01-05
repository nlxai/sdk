import { renderHook, act, waitFor } from "@testing-library/react";
import { useFeedback, getFeedbackInfo } from "../src/feedback";
import { vi, describe, it, expect, beforeEach } from "vitest";

// Mock ConversationHandler
const mockHandlerObj = {
  submitFeedback: vi.fn(async () => Promise.resolve()),
};
const mockHandler =
  mockHandlerObj as unknown as import("@nlxai/core").ConversationHandler;

describe("useFeedback", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with default state", () => {
    const { result } = renderHook(() => useFeedback(mockHandler));
    const [state] = result.current;
    expect(state.comment.state).toBe("idle");
    expect(state.items).toEqual({});
  });

  it("should handle clickRating and update state", async () => {
    const { result } = renderHook(() => useFeedback(mockHandler as any));
    const [, actions] = result.current;
    await act(async () => {
      actions.clickRating("url1", 4);
    });
    const [state] = result.current;
    expect(getFeedbackInfo(state as any, "url1").rating).toBe(4);
    expect(mockHandler.submitFeedback).toHaveBeenCalledWith("url1", {
      rating: 4,
    });
  });

  it("should handle clickCommentButton and enter editing state", () => {
    const { result } = renderHook(() => useFeedback(mockHandler));
    const [, actions] = result.current;
    act(() => {
      actions.clickCommentButton("url2");
    });
    const [state] = result.current;
    expect(state.comment.state).toBe("editing");
    if (state.comment.state === "editing") {
      expect(state.comment.activeFeedbackUrl).toBe("url2");
    } else {
      throw new Error("Expected comment state to be 'editing'");
    }
  });

  it("should handle editCommentText and update text", () => {
    const { result } = renderHook(() => useFeedback(mockHandler));
    act(() => {
      result.current[1].clickCommentButton("url3");
    });
    act(() => {
      result.current[1].editCommentText("Test comment");
    });
    const [state] = result.current;
    if (state.comment.state !== "editing") throw new Error();
    expect(state.comment.text).toBe("Test comment");
  });

  it("should handle submitComment and update state on success", async () => {
    const { result } = renderHook(() => useFeedback(mockHandler));
    act(() => {
      result.current[1].clickCommentButton("url4");
    });
    act(() => {
      result.current[1].editCommentText("My feedback");
    });
    await act(async () => {
      await result.current[1].submitComment();
    });
    // Wait for the state to update to 'submitted'
    await waitFor(() => {
      const [state] = result.current;
      expect(state.comment.state).toBe("submitted");
    });
    const [state] = result.current;
    expect(getFeedbackInfo(state as any, "url4").commentSubmitted).toBe(true);
    expect(getFeedbackInfo(state as any, "url4").commentText).toBe(
      "My feedback",
    );
    expect(mockHandler.submitFeedback).toHaveBeenCalledWith("url4", {
      comment: "My feedback",
    });
  });

  it("should handle cancelComment and return to idle", () => {
    const { result } = renderHook(() => useFeedback(mockHandler));
    const [, actions] = result.current;
    act(() => {
      actions.clickCommentButton("url5");
      actions.cancelComment();
    });
    const [state] = result.current;
    expect(state.comment.state).toBe("idle");
  });

  it("should handle submission error", async () => {
    const errorHandlerObj = {
      submitFeedback: vi.fn(async () => Promise.reject(new Error("fail"))),
    };
    const errorHandler =
      errorHandlerObj as unknown as import("@nlxai/core").ConversationHandler;
    const { result } = renderHook(() => useFeedback(errorHandler));

    act(() => {
      result.current[1].clickCommentButton("url6");
      result.current[1].editCommentText("fail");
    });
    await act(async () => {
      await result.current[1].submitComment();
    });
    // Wait for the state to update to 'error'
    await waitFor(() => {
      const [state] = result.current;
      expect(state.comment.state).toBe("error");
    });
  });
});
