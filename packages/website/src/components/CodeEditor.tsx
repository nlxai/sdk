import { DownloadIcon } from "./Icons";
import React, { type FC, useRef, useEffect } from "react";

// initial eslint integration
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const escapeForHighlightJs = (str: string) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

export const CodeEditor: FC<{ code: string }> = (props) => {
  const codeRef = useRef(null);

  useEffect(() => {
    (window as any).hljs.highlightElement(codeRef.current);
  }, [props.code]);

  return (
    <div className="code-editor">
      <a
        href={window.URL.createObjectURL(
          new Blob([props.code], {
            type: "text/plain",
          })
        )}
        download={`index.html`}
      >
        <DownloadIcon />
      </a>
      <pre key={props.code}>
        <code
          ref={codeRef}
          className="language-html"
          dangerouslySetInnerHTML={{ __html: escapeForHighlightJs(props.code) }}
        ></code>
      </pre>
    </div>
  );
};
