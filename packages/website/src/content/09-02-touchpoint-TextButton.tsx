import { type FC } from "react";

import { PageContent } from "../components/PageContent";

export const content = `
* TextButton

~~~html
<HelloWorld />
~~~
`;

export const navGroup: string = "Touchpoint Components";

export const title: string = "Touchpoint TextButton";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
