import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import content from "./02-05-web-widget-api-reference.md?raw";

// initial eslint integration
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const WebWidgetApi = () => {
  return (
    <>
      <PageTitle pretitle="Web Widget API" title="API reference" />
      <PageContent md={content} />
    </>
  );
};
