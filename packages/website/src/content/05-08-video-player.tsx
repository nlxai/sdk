import { type FC } from "react";

import { PageContent } from "../components/PageContent";
import { InlineWidget, type Item } from "../components/InlineWidget";
import VideoPlayer from "../custom-components/VideoPlayer";

export const content = `
This is a custom component that can be used to embed a video player in the widget.

~~~js
const VideoPlayer = ({ videoId }) => {
  const videoSrc = \`https://www.youtube.com/embed/\${videoId}\`;
  return (
    <iframe
      width="380"
      height="213"
      src={videoSrc}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
};
~~~
`;

export const navGroup: string = "Web widget components";

export const title: string = "Video player";

export const Content: FC<unknown> = () => {
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
      <InlineWidget className="mb-8" items={items} />
      <PageContent md={content} />
    </>
  );
};
