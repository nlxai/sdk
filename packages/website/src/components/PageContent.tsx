import { type FC, type ReactNode, useState } from "react";
import { clsx } from "clsx";
import { Link } from "react-router-dom";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";

import { CheckIcon, ContentCopyIcon } from "./Icons";

const CopyToClipboardButton: FC<{ text: string; className?: string }> = ({
  text,
  className,
}) => {
  const [copied, setCopied] = useState(false);

  return (
    <button
      className={`w-8 h-8 p-1.5 bg-slate-900 border border-slate-600 rounded-lg hover:bg-slate-800 ${
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
      "prose prose-docs max-w-none prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem]",
      "prose-a:font-medium prose-a:no-underline prose-pre:rounded-xl prose-pre:bg-secondary-40 prose-pre:shadow-lg",
      className,
    )}
  >
    {children}
  </div>
);

export const PageContent: FC<{ md: string }> = ({ md }) => (
  <Prose>
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeSlug]}
      components={{
        a(props) {
          // eslint-disable-next-line react/prop-types
          if (props.href == null) {
            // eslint-disable-next-line react/prop-types
            return <a href={props.href}>{props.children}</a>;
          }
          // TODO: when using a react-router redirect, scroll to heading ID if available
          // eslint-disable-next-line react/prop-types
          return <Link to={props.href}>{props.children}</Link>;
        },
        pre(props) {
          return (
            <pre className="relative group !font-mono">{props.children}</pre>
          );
        },
        code(props) {
          // initial eslint integration
          // eslint-disable-next-line react/prop-types
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className ?? "");
          const lines = String(children).replace(/\n$/, "");
          return (
            <>
              <CopyToClipboardButton
                text={lines}
                className="absolute top-1.5 right-1.5 hidden group-hover:block"
              />
              {match ? (
                <SyntaxHighlighter
                  style={{}}
                  useInlineStyles={false}
                  showLineNumbers={true}
                  language={match[1]}
                  PreTag="div"
                >
                  {lines}
                </SyntaxHighlighter>
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              )}
            </>
          );
        },
      }}
    >
      {md}
    </Markdown>
  </Prose>
);
