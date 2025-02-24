import { type FC } from "react";
import Markdown from "react-markdown";
import { clsx } from "clsx";

export const Note: FC<{ title?: string; body: string; className?: string }> = (
  props,
) => {
  return (
    <div
      className={clsx(
        "flex gap-2 rounded-lg p-2 bg-primary-10 text-primary-60",
        props.className,
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        className="flex-none"
        fill="none"
      >
        <path
          d="M9.99996 1.66675C5.39996 1.66675 1.66663 5.40008 1.66663 10.0001C1.66663 14.6001 5.39996 18.3334 9.99996 18.3334C14.6 18.3334 18.3333 14.6001 18.3333 10.0001C18.3333 5.40008 14.6 1.66675 9.99996 1.66675ZM10.8333 14.1667H9.16663V9.16675H10.8333V14.1667ZM10.8333 7.50008H9.16663V5.83342H10.8333V7.50008Z"
          fill="currentColor"
        />
      </svg>
      <div className="space-y-2">
        {props.title != null ? (
          <p className="m-0 font-display text-sm font-medium">{props.title}</p>
        ) : null}
        <Markdown className="text-sm">{props.body}</Markdown>
      </div>
    </div>
  );
};
