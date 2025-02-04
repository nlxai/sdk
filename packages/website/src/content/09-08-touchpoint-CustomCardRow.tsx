import { type FC } from "react";

import { PageContent } from "../components/PageContent";

export const content = `
* CustomCardRow

~~~html
<HelloWorld />
~~~
`;

export const navGroup: string = "Touchpoint Components";

export const title: string = "Touchpoint CustomCardRow";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
