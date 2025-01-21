import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import { packageUrls } from "../constants";
import mdContent from "./01-01-getting-started-content.md?raw";

// fill in the content with the packageUrls
export const content = new Function("packageUrls", `return \`${mdContent}\`;`)(packageUrls);

// initial eslint integration
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const GettingStarted = () => {
  return (
    <>
      <PageTitle pretitle="Introduction" title="Getting started" />
      <PageContent md={content} />
    </>
  );
};
