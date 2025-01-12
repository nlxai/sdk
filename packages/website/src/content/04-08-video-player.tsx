import { PageTitle } from "../components/PageTitle";
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

export const WebWidgetComponentsVideoPlayer = (): JSX.Element => {
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
