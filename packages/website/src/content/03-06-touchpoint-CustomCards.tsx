import { type FC } from "react";

import { PageContent } from "../components/PageContent";

export const content = `
* CustomCards

~~~html
<HelloWorld />
~~~
`;

export const navGroup: string = "Touchpoint components";

export const title: string = "Touchpoint CustomCards";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
