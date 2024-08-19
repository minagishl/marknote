import { Download, Sun, Moon, Ellipsis, Eye, EyeOff } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem as DefaultDropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Context
import { useMarkdownContext } from '@/context/markdown';

export function Menu() {
  const { theme, setTheme } = useTheme();
  const { markdown, hidden, setHidden } = useMarkdownContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="h-10 w-10 p-0">
        <Button variant="outline">
          <Ellipsis className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-6 w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            {theme === 'light' ? (
              <Moon className="mr-2 h-4 w-4" />
            ) : (
              <Sun className="mr-2 h-4 w-4" />
            )}
            <span>Toggle Theme</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => downloadMarkdown(markdown)}>
            <Download className="mr-2 h-4 w-4" />
            <span>Download Markdown</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setHidden(!hidden)}>
            {hidden ? (
              <Eye className="mr-2 h-4 w-4" />
            ) : (
              <EyeOff className="mr-2 h-4 w-4" />
            )}
            <span>{hidden ? 'Show Input' : 'Hide Input'}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function DropdownMenuItem({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <DefaultDropdownMenuItem className="h-10" onClick={onClick}>
      {children}
    </DefaultDropdownMenuItem>
  );
}

// Function to download the markdown as a file
const downloadMarkdown = (markdown: string) => {
  // Get the current date in ISO 8601 format
  const date = new Date();
  const formattedDate = date.toISOString();

  // Create a Blob from the markdown text
  const blob = new Blob([markdown], { type: 'text/markdown' });

  // Create a link element to trigger the download
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${formattedDate}.md`; // Filename with the current date in ISO format
  link.click();

  // Cleanup the URL object
  URL.revokeObjectURL(link.href);
};
