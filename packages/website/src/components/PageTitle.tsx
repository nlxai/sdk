import { type FC } from "react";

export const PageTitle: FC<{ pretitle: string; title: string }> = (props) => (
  <header className="mb-9 space-y-2">
    <p className="font-display text-sm text-primary-60">{props.pretitle}</p>
    <h1 className="font-display text-3xl text-primary-80">{props.title}</h1>
  </header>
);
