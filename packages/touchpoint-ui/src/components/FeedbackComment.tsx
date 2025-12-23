/* eslint-disable jsdoc/require-jsdoc */
import { type FC } from "react";
import type * as Feedback from "../feedback";
import { IconButton } from "./ui/IconButton";
import { ArrowLeft, Check, Edit } from "./ui/Icons";
import { TextButton } from "./ui/TextButton";

export const FeedbackComment: FC<{
  feedbackState: Feedback.State;
  feedbackActions: Feedback.Actions;
}> = ({ feedbackState, feedbackActions }) => {
  if (feedbackState.comment.state === "idle") return null;
  if (feedbackState.comment.state === "submitted") {
    return (
      <div className="flex flex-col grow p-2 md:p-3 gap-2.5">
        <div className="flex items-center gap-2.5">
          <IconButton
            type="ghost"
            Icon={ArrowLeft}
            label="Back"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              feedbackActions.cancelComment();
            }}
          />
          <h2 className="">Feedback submitted</h2>
        </div>
        <p className="grow border border-primary-10 rounded-2xl p-2">
          {feedbackState.comment.text}
        </p>
        <TextButton
          type="ghost"
          label="Edit"
          Icon={Edit}
          onClick={() => {
            feedbackActions.clickCommentEdit();
          }}
        />
      </div>
    );
  }
  return (
    <form
      className="flex flex-col grow p-2 gap-2.5"
      onSubmit={(e) => {
        e.preventDefault();
        void feedbackActions.submitComment();
      }}
    >
      <div className="flex items-center gap-2.5">
        <IconButton
          type="ghost"
          Icon={ArrowLeft}
          label="Back"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            feedbackActions.cancelComment();
          }}
        />
        <label htmlFor="feedback-form">Provide feedback</label>
      </div>
      <textarea
        id="feedback-form"
        className="grow bg-primary-5 rounded-2xl p-2"
        placeholder="Enter your feedback..."
        value={feedbackState.comment.text}
        onChange={(e) => {
          feedbackActions.editCommentText(e.target.value);
        }}
      ></textarea>
      <TextButton type="main" label="Submit" Icon={Check} onClick={() => {}} />
    </form>
  );
};
