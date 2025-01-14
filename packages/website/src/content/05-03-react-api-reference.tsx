import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import content from "./react-api-reference.md?raw";

export const ReactApi = (): JSX.Element => {
  return (
    <>
      <PageTitle pretitle="React API" title="API reference" />
      <PageContent md={content} />
    </>
  );
};
