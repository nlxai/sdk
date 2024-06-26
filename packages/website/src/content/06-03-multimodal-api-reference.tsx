import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import content from "./06-03-multimodal-api-reference.md?raw";

// initial eslint integration
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const MultimodalApiReference = () => {
  return (
    <>
      <PageTitle pretitle="Multimodal" title="API reference" />
      <PageContent md={content} />
    </>
  );
};
