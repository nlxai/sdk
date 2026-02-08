/* eslint-disable jsdoc/require-jsdoc */
import { useMemo, type FC, type DetailedHTMLProps } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

const renderer = new marked.Renderer();
renderer.link = function ({ href, title, text }) {
  const isExternal =
    typeof href === "string" &&
    (href.startsWith("http://") || href.startsWith("https://"));
  const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : "";
  const titleAttr =
    typeof title === "string" && title !== "" ? ` title="${title}"` : "";
  return `<a href="${href ?? ""}"${titleAttr}${target}>${text}</a>`;
};

export const SafeMarkdown: FC<
  { contents: string } & DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
> = ({ contents, ...props }) => {
  const rendered = useMemo(
    () =>
      DOMPurify.sanitize(marked(contents, { renderer, async: false }), {
        ADD_ATTR: ["target", "rel"],
      }),
    [contents],
  );
  return <div dangerouslySetInnerHTML={{ __html: rendered }} {...props}></div>;
};
