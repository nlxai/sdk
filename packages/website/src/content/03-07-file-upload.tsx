import React, { useState } from "react";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import { FileUpload } from "../custom-components/FileUpload";
import { InlineWidget, Item } from "../components/InlineWidget";
import { disclaimerSnippet } from "../snippets";

export const content = `
~~~js
${disclaimerSnippet}
~~~
`;

export const WebWidgetComponentsFileUpload = () => {
  const [uploaded, setUploaded] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const items: Item[][] = [
    [
      {
        type: "custom",
        element: (
          <FileUpload
            onUploadCompleted={(fileName: string) => {
              setUploaded(true);
              setFileName(fileName);
            }}
          />
        ),
      },
    ],
  ];

  if (uploaded) {
    items.push([
      {
        type: "bot",
        message: `Your file \`${fileName}\` was uploaded.`,
      },
    ]);
  }

  return (
    <>
      <PageTitle pretitle="Web widget components" title="File upload" />
      <InlineWidget className="mb-8" items={items} />
      <PageContent md={content} />
    </>
  );
};
