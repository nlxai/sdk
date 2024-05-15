import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import content from "./07-02-journey-manager-api-reference.md?raw";

// initial eslint integration
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const JourneyManagerApiReference = () => {
  return (
    <>
      <PageTitle pretitle="Journey manager" title="API reference" />
      <PageContent md={content} />
    </>
  );
};
