import { type FC } from "react";

import { PageContent } from "../components/PageContent";

export const content = `
* IconButton

~~~html
<HelloWorld />
~~~
`;

export const navGroup: string = "Touchpoint components";

export const title: string = "Touchpoint IconButton";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
