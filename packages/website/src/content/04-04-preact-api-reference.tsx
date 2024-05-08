import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import content from "./04-04-preact-api-reference.md?raw";

export const PreactApi = (): JSX.Element => {
  return (
    <>
      <PageTitle pretitle="Preact API" title="API reference" />
      <PageContent md={content} />
    </>
  );
};
