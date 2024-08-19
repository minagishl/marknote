'use client';

import { createContext, useState, useContext, ReactNode } from 'react';

// Type definition of context
interface MarkdownContextType {
  markdown: string;
  setMarkdown: (markdown: string) => void;
  hidden: boolean;
  setHidden: (hidden: boolean) => void;
}

// Default value of context
const MarkdownContext = createContext<MarkdownContextType | undefined>(
  undefined,
);

const defaultMarkdown =
  '# Hello, World!' +
  '\n\n' +
  'This note can be written in Markdown!' +
  '\n\n' +
  'But there is a caveat, and that is that what you write is not saved because it is all done on the front end. You will be warned when you leave the page, but we recommend that you download Markdown from the download button!' +
  '\n\n' +
  'Please direct inquiries, code modifications and contributions to this [GitHub](https://github.com/minagishl/marknote)!';

export const MarkdownProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [markdown, setMarkdown] = useState<string>(defaultMarkdown);
  const [hidden, setHidden] = useState<boolean>(false);

  return (
    <MarkdownContext.Provider
      value={{ markdown, setMarkdown, hidden, setHidden }}
    >
      {children}
    </MarkdownContext.Provider>
  );
};

export const useMarkdownContext = (): MarkdownContextType => {
  const context = useContext(MarkdownContext);
  if (context === undefined) {
    throw new Error(
      'useMarkdownContext must be used within a MarkdownProvider',
    );
  }
  return context;
};
