import { type FC } from "react";

import { PageContent } from "../components/PageContent";

export const content = `
The \`<CustomCard>\` component is the parent component for all custom modality renderings with Touchpoint. 

A \`<CustomCard>\` will be composed of at least one \`<CustomCardRow>\` to render and display to content of the card.

### Considerations for Building with CustomCard

* How will the user interact with the card?
* How will the user choice be sent to NLX?
* How many rows of information will be displayed?

### Requirements

* \`onClick\` function that calls the \`sendChoice\` function of the Touchpoint SDK.

### Related Components

* [\`<CustomCardRow>\`](/09-08-touchpoint-CustomCardRow)

### Example

~~~html
<H1>CustomCard Example to be Built</H1>
~~~
`;

export const navGroup: string = "Touchpoint Components";

export const title: string = "Touchpoint CustomCard";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
