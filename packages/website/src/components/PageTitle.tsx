import React, { type FC } from "react";

export const PageTitle: FC<{ pretitle: string; title: string }> = (props) => (
  <header className="mb-9 space-y-1">
    <p className="font-display text-sm font-medium text-sky-500">
      {props.pretitle}
    </p>
    <h1 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white">
      {props.title}
    </h1>
  </header>
);
