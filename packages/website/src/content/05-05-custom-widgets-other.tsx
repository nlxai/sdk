import { type FC } from "react";

import { PageContent } from "../components/PageContent";
import { Note } from "../components/Note";
import { packageUrls } from "../constants";

export const content = `
If you are using a different frontend framework, you can easily integrate the [@nlxai/chat-core](${packageUrls.chatCore}) package covered in the next chapter to build a custom widget. In fact, the [React](${packageUrls.chatReact}) and [Preact](${packageUrls.chatReact}) packages are both under 100 lines of TypeScript.
`;

export const navGroup: string = "Custom widgets";

export const title: string = "Other frameworks";

export const Content: FC<unknown> = () => {
  return (
    <>
      <PageContent md={content} />
      <Note
        title="A note for Svelte users"
        body="The conversation handler exported with the headless core package satisfies the [Svelte store contract](https://svelte.dev/docs/svelte-components#script-4-prefix-stores-with-$-to-access-their-values-store-contract)."
      />
    </>
  );
};
