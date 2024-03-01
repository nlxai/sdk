import React, { type FC, type ReactNode, useState } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { CheckIcon, ContentCopyIcon } from "./Icons";

const CopyToClipboardButton: FC<{ text: string; className?: string }> = ({
  text,
  className,
}) => {
  const [copied, setCopied] = useState(false);

  return (
    <button
      className={`w-8 h-8 p-1.5 bg-slate-900 border border-slate-600 rounded-lg hover:bg-slate-800 ${
        className || ""
      }`}
      onClick={() => {
        setCopied(true);
        navigator.clipboard.writeText(text);
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
    className={`prose prose-slate max-w-none prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem] prose-lead:text-slate-500 prose-a:font-medium prose-a:no-underline prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,theme(colors.blue.300))] hover:prose-a:[--tw-prose-underline-size:6px]] prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:shadow-lg ${
      className || ""
    }`}
  >
    {children}
  </div>
);

export const CodeComponents = {
  pre({ children }: React.HTMLAttributes<HTMLPreElement>) {
    return <pre className="relative group !font-mono">{children}</pre>;
  },
  code({ children, className, ...rest }: React.HTMLAttributes<HTMLElement>) {
    const match = /language-(\w+)/.exec(className || "");
    const lines = String(children).replace(/\n$/, "");
    return (
      <>
        <CopyToClipboardButton
          text={lines}
          className="absolute top-1.5 right-1.5 hidden group-hover:block"
        />
        {match ? (
          <SyntaxHighlighter
            children={lines}
            style={{}}
            useInlineStyles={false}
            showLineNumbers={true}
            language={match[1]}
            PreTag="div"
          />
        ) : (
          <code {...rest} className={className}>
            {children}
          </code>
        )}
      </>
    );
  },
};

export const PageContent: FC<{ md: string }> = (props) => (
  <Prose>
    <Markdown components={CodeComponents}>{props.md}</Markdown>
  </Prose>
);
