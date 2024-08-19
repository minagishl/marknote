'use client';

import { useEffect } from 'react';
import { tv } from 'tailwind-variants';
import ReactMarkdown from 'react-markdown';

// Styles
import 'katex/dist/katex.min.css';

// Plugins
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// Components
import { Menu } from '@/components/menu';
import { Textarea } from '@/components/ui/textarea';

// Context
import { useMarkdownContext } from '@/context/markdown';

const container = tv({
  base: 'flex h-screen max-h-screen w-screen flex-col sm:flex-row sm:py-6',
  variants: {
    hidden: {
      true: 'itemc-center justify-center',
    },
  },
});

const preview = tv({
  base: 'markdown-body max-h-[50%] w-full overflow-scroll p-6 sm:max-h-screen sm:w-1/2',
  variants: {
    hidden: {
      true: 'max-w-screen-md',
    },
  },
});

export default function Home() {
  const { markdown, setMarkdown, hidden } = useMarkdownContext();

  // Warn the user when they attempt to leave the page
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = ''; // Modern browsers require this for the warning to show
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className={container({ hidden })}>
      {hidden ? null : (
        // Markdown Input
        <div className="h-1/2 w-full px-6 py-4 text-base sm:h-full sm:max-h-screen sm:w-1/2">
          <Textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="h-full w-full resize-none"
          />
        </div>
      )}
      {/* Markdown Preview */}
      <div className={preview({ hidden })}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {markdown}
        </ReactMarkdown>
      </div>
      <div className="absolute bottom-12 right-6">
        <Menu />
      </div>
    </div>
  );
}
