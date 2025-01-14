import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import content from "./preact-api-reference.md?raw";

export const PreactApi = (): JSX.Element => {
  return (
    <>
      <PageTitle pretitle="Preact API" title="API reference" />
      <PageContent md={content} />
    </>
  );
};
