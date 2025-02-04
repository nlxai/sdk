import { type FC } from "react";

import { PageContent } from "../components/PageContent";

export const content = `
* SmallText

~~~html
<HelloWorld />
~~~
`;

export const navGroup: string = "Touchpoint Components";

export const title: string = "Touchpoint SmallText";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
