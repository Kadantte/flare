import Link from "next/link";

import { ToggleTheme } from "@/components/toggle-theme";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export function Header() {
  return (
    <header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 flex items-center justify-between px-4 py-4 backdrop-blur-sm sm:px-6 lg:px-10">
      <Link
        href="https://github.com/trecente"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub Profile"
        className="transition-opacity hover:opacity-80"
      >
        <GitHubLogoIcon className="h-5 w-5 sm:h-6 sm:w-6" />
      </Link>

      <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Link
          href="/"
          className="text-foreground text-xl font-light tracking-widest uppercase hover:opacity-90 sm:text-2xl"
        >
          Flare
        </Link>
      </h1>

      <ToggleTheme />
    </header>
  );
}
