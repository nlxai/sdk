import React, { type ReactNode, type FC } from "react";

export const Prose: FC<{ children: ReactNode }> = (props) => (
  <div className="prose max-w-none prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem] prose-lead:text-blueMain prose-a:font-semibold prose-a:no-underline prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,theme(colors.blueMain))] hover:prose-a:[--tw-prose-underline-size:6px] dark:[--tw-prose-background:theme(colors.blueMain)] dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.blueMain))] dark:hover:prose-a:[--tw-prose-underline-size:6px] prose-pre:rounded-xl prose-pre:bg-blueMain prose-pre:shadow-lg dark:prose-pre:bg-blueMain dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-blueMain dark:prose-hr:border-blueMain">
    {props.children}
  </div>
);
