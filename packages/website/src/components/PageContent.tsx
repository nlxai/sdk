import { type FC, type ReactNode, useState, useContext } from "react";
import { clsx } from "clsx";
import { Link } from "react-router-dom";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import touchpointUiPackageJson from "@nlxai/touchpoint-ui/package.json";
import { ReactContext } from "../context";
import { type SnippetEnv } from "../types";
import { indentBy } from "../snippets";
import { Toggle } from "./Toggle";
import { CheckIcon, ContentCopyIcon } from "./Icons";
import { CONTINUE, SKIP, visit, type Visitor } from "unist-util-visit";
import { findAfter } from "unist-util-find-after";
import { selectAll } from "hast-util-select";
import { remove } from "unist-util-remove";
import type { Element, ElementContent, Literal, Node } from "hast";
const { version } = touchpointUiPackageJson;

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
  const cdnUrl = `https://unpkg.com/@nlxai/touchpoint-ui@${version}/lib/index.js?module`;
  const moduleUrl = "@nlxai/touchpoint-ui";
  const containsImports = code.includes(`"${moduleUrl}"`);
  if (env === "html") {
    const codeWithImport = containsImports
      ? code.replace(`"${moduleUrl}"`, `"${cdnUrl}"`)
      : `import { ${touchpointUiImports.join(", ")} } from "${cdnUrl}";

${code}
`;
    return `<html lang="en">
  <head>
    <title>Touchpoint Sample HTML</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <script type="module">
      ${indentBy("      ", codeWithImport)}
    </script>
  </body>
</html>`;
  }
  return containsImports
    ? code
    : `import { ${touchpointUiImports.join(", ")} } from "${moduleUrl}";

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

const rehypePostprocessDocs = () => {
  const githubLink = (src: string): Element => ({
    type: "element",
    tagName: "a",
    properties: {
      href: src,
      className: [
        "absolute",
        "top-6",
        "right-4",
        "text-primary-60",
        "hover:text-primary-80",
      ],
      target: "_blank",
      rel: "noopener noreferrer",
    },
    children: [
      {
        type: "element",
        tagName: "svg",
        properties: {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 16 16",
          class: "w-4 h-4",
        },
        children: [
          {
            type: "element",
            tagName: "path",
            properties: {
              fill: "currentColor",
              d: "M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z",
            },
            children: [],
          },
        ],
      },
    ],
  });

  const toDepth = (node: Element): number => {
    if (node.tagName === "h1") return 1;
    if (node.tagName === "h2") return 2;
    if (node.tagName === "h3") return 3;
    if (node.tagName === "h4") return 4;
    if (node.tagName === "h5") return 5;
    if (node.tagName === "h6") return 6;

    return 0;
  };
  const sectionize: Visitor<Element, Element> = (
    node: Element,
    index: number | undefined,
    parent: Element | undefined,
  ) => {
    const start = node;
    const startIndex = index;

    if (startIndex == null) return CONTINUE;

    const isEnd = (n: Node): boolean =>
      n.type === "element" &&
      ["h1", "h2", "h3", "h4", "h5", "h6"].includes((n as Element).tagName) &&
      toDepth(n as Element) <= toDepth(node);

    if (parent == null) {
      return CONTINUE;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const end = findAfter(parent as any, start as any, isEnd);
    if (end == null) {
      return CONTINUE;
    }
    const endIndex = parent.children.indexOf(end as ElementContent);

    const between = parent.children.slice(
      startIndex,
      endIndex > 0 ? endIndex : undefined,
    );

    const section: Element = {
      type: "element",
      tagName: "section",
      children: between,
      properties: {
        class: [
          "relative",
          "bg-primary-5",
          "px-4",
          "py-1",
          "mb-4",
          "rounded-xl",
        ],
      },
    };

    const definedIn = selectAll(`h${toDepth(node) + 1}`, section).find(
      (n) => (n.children[0] as Literal).value === "Defined in",
    );

    if (definedIn != null) {
      // console.log(section.children);
      section.children[2] = {
        type: "element",
        tagName: "pre",
        properties: {
          class: ["whitespace-pre-wrap", "!font-mono"],
        },
        children: (section.children[2] as Element).children,
      };

      const definedIndex = section.children.indexOf(definedIn);

      section.children.splice(
        definedIndex,
        3,
        githubLink(
          (
            (section.children[definedIndex + 2] as Element)
              .children[0] as Element
          ).properties.href as string,
        ),
      );
      parent.children.splice(startIndex, section.children.length, section);
      return SKIP;
    } else {
      // console.log(`Not found`, node);
      return CONTINUE;
    }
  };
  return (tree: Node) => {
    visit(
      tree,
      (node: Node) =>
        node.type === "element" &&
        ["h2", "h3", "h4"].includes((node as Element).tagName),
      // @ts-expect-error These types are not great
      sectionize,
    );
    remove(tree, (node) => (node as Element).tagName === "hr");
  };
};

export const ApiDocContent: FC<{ md: string; className?: string }> = ({
  md,
  className,
}) => {
  return (
    <Prose className={className}>
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug, rehypePostprocessDocs]}
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

            return (
              // eslint-disable-next-line react/prop-types
              <Link className={props.className} to={props.href ?? ""}>
                {props.children}
              </Link>
            );
          },
          // pre({ children, className }) {
          //   return <Code className={className}>{children}</Code>;
          // },
          // code({ children, className }) {
          //   return <Code className={className}>{children}</Code>;
          // },
        }}
      >
        {md}
      </Markdown>
    </Prose>
  );
};
