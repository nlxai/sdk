import React from "react";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import { InlineWidget, type Item } from "../components/InlineWidget";
import { disclaimerSnippet } from "../snippets";
import VideoPlayer from "../custom-components/VideoPlayer";

export const content = `
This is a custom component that can be used to embed a video player in the widget.

~~~js
${disclaimerSnippet}
~~~
`;

export const WebWidgetComponentsVideoPlayer = () => {
  const items: Item[][] = [
    [
      {
        type: "custom",
        element: <VideoPlayer videoId="kVxTrhojpFI" />,
      },
    ],
  ];
  return (
    <>
      <PageTitle pretitle="Web widget components" title="Video player" />
      <InlineWidget className="mb-8" items={items} />
      <PageContent md={content} />
    </>
  );
};
