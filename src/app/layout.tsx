import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { MarkdownProvider } from '@/context/markdown';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import './globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Marknote',
  description:
    'This is a notebook application that allows you to write using Markdown',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <MarkdownProvider>{children}</MarkdownProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
