import React from "react";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import { Note } from "../components/Note";
import { Carousel, carouselExampleData } from "../custom-components/Carousel";
import { InlineWidget } from "../components/InlineWidget";

export const content = `
This carousel component presents list-type information in a rich, visually-appealing manner.

~~~js
const Carousel = ({ data }) => {
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  return html\`
    <div className="chat-carousel-container">
      <div className="chat-carousel-slides">
        \${data.map(
          document =>
            html\`
              <div
                className=\${\`chat-carousel-slide \${
                  selectedId === document.id
                    ? "chat-carousel-slide--active"
                    : ""
                }\`}
                key=\${document.id}
                onClick=\${() => {
                  setSelectedId(document.id);
                }}
              >
                <div className="chat-carousel-title">\${document.name}</div>
                <div
                  className="chat-carousel-image"
                  style=\${{
                    backgroundImage: \`url(\${document.imageUrl})\`
                  }}
                />
                <div className="chat-carousel-description">
                  \${document.description}
                </div>
              </div>
            \`
        )}
      </div>
    </div>
  \`;
};
~~~
`;

export const WebWidgetComponentsCarousel = (): JSX.Element => {
  return (
    <>
      <PageTitle pretitle="Web widget components" title="Carousel" />
      <InlineWidget
        className="mb-8"
        items={[
          [
            {
              type: "custom",
              element: <Carousel data={carouselExampleData} />,
            },
          ],
        ]}
      />
      <PageContent md={content} />
      <Note
        title="Note"
        body="Compatible data must be sent from the bot configuration along with the 'Carousel' modality in order for the presentation layer to work."
      />
    </>
  );
};
