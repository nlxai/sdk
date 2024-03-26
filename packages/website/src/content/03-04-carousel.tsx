import React from "react";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import { Note } from "../components/Note";
import { Carousel, carouselExampleData } from "../custom-components/Carousel";
import { InlineWidget } from "../components/InlineWidget";
import { carouselSnippet } from "../snippets";

export const content = `
This carousel component presents list-type information in a rich, visually-appealing manner.

~~~js
${carouselSnippet}
~~~
`;

// initial eslint integration
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const WebWidgetComponentsCarousel = () => {
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
