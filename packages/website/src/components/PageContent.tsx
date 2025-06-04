import { type FC, type ReactNode, useState, useContext } from "react";
import { clsx } from "clsx";
import { Link } from "react-router-dom";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import { version } from "@nlxai/chat-core";

import { ReactContext } from "../context";
import { type SnippetEnv } from "../types";
import { indentBy } from "../snippets";
import { Toggle } from "./Toggle";
import { CheckIcon, ContentCopyIcon } from "./Icons";

const CopyToClipboardButton: FC<{ text: string; className?: string }> = ({
  text,
  className,
}) => {
  const [copied, setCopied] = useState(false);

  return (
    <button
      className={`w-6 h-6 p-1.5 bg-primary-10 text-primary-60 rounded-lg hover:bg-primary-20 hover:text-primary-80 ${
        className ?? ""
      }`}
      onClick={() => {
        setCopied(true);
        navigator.clipboard.writeText(text).catch((err) => {
          // eslint-disable-next-line no-console
          console.warn(err);
        });
        setTimeout(() => {
          setCopied(false);
        }, 750);
      }}
    >
      {copied ? <CheckIcon /> : <ContentCopyIcon />}
    </button>
  );
};

export const Prose: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div
    className={clsx(
      "prose prose-docs max-w-3xl w-full prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem]",
      "prose-a:font-normal prose-a:no-underline prose-a:text-accent hover:prose-a:text-accent-darker",
      "prose-pre:rounded-xl prose-code:font-normal prose-pre:shadow-lg",
      "prose-code:before:content-['']",
      "prose-code:after:content-['']",
      "prose-strong:font-medium",
      className,
    )}
  >
    {children}
  </div>
);

const touchpointUiImports = ["create", "React", "html"];

const processTouchpointUiCode = (code: string, env: SnippetEnv): string => {
  if (env === "html") {
    const codeWithImport = `import { ${touchpointUiImports.join(", ")} } from "https://unpkg.com/@nlxai/touchpoint-ui@${version}/lib/index.js?module";

${code}
`;
    return `<script type="module">
  ${indentBy("  ", codeWithImport)}
</script>`;
  }
  return `import { ${touchpointUiImports.join(", ")} } from "@nlxai/touchpoint-ui";

${code}
`;
};

const Code: FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const language = /language-(\w+)/.exec(className ?? "")?.[1];
  const lines = String(children).replace(/\n$/, "");
  const ctx = useContext(ReactContext);
  const isTouchpointUiLang = language === "touchpointui";
  const displayCode = isTouchpointUiLang
    ? processTouchpointUiCode(lines, ctx.snippetEnv)
    : lines;
  return (
    <>
      <div className="absolute top-1.5 right-1.5 hidden group-hover:flex items-center gap-2">
        {isTouchpointUiLang ? (
          <Toggle
            value={ctx.snippetEnv}
            onChange={ctx.setSnippetEnv}
            options={[
              { value: "html", label: "HTML" },
              { value: "js", label: "JS" },
            ]}
          />
        ) : null}
        <CopyToClipboardButton text={displayCode} />
      </div>
      {language != null ? (
        <SyntaxHighlighter
          style={{}}
          useInlineStyles={false}
          showLineNumbers={true}
          language={
            isTouchpointUiLang
              ? ctx.snippetEnv === "html"
                ? "html"
                : "javascript"
              : language
          }
          PreTag="div"
        >
          {displayCode}
        </SyntaxHighlighter>
      ) : (
        <code className={className}>{children}</code>
      )}
    </>
  );
};

export const PageContent: FC<{ md: string; className?: string }> = ({
  md,
  className,
}) => {
  return (
    <Prose className={className}>
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        components={{
          a(props) {
            // `concat-md` output contains markup such as <a name="interfacespropsmd"></a> as anchor targets. However, react types don't expect the (basically deprecated) `name` attribute, hence the `as unknown as any` hack.
            // markdown package typings expect it not to.
            const name: string | undefined = (props as unknown as any).name;
            // eslint-disable-next-line react/prop-types
            if (props.href == null && name != null) {
              // redefine `name` as `id` as suggested in the MDN for anchor targets.
              return <a id={name}>{props.children}</a>;
            }
            // TODO: when using a react-router redirect, scroll to heading ID if available
            // eslint-disable-next-line react/prop-types
            return <Link to={props.href ?? ""}>{props.children}</Link>;
          },
          pre(props) {
            return (
              <pre className="relative group !font-mono">{props.children}</pre>
            );
          },
          code({ children, className }) {
            return <Code className={className}>{children}</Code>;
          },
        }}
      >
        {md}
      </Markdown>
    </Prose>
  );
};
