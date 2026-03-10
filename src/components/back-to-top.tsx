"use client";

import { ArrowUp } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 300;
const THROTTLE_MS = 100;

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    setIsVisible(window.scrollY > SCROLL_THRESHOLD);
  }, []);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const throttledToggle = () => {
      if (timeoutId) return;

      timeoutId = setTimeout(() => {
        toggleVisibility();
        timeoutId = null;
      }, THROTTLE_MS);
    };

    window.addEventListener("scroll", throttledToggle, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledToggle);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [toggleVisibility]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "bg-background/50 hover:bg-background/80 fixed right-4 bottom-4 z-50 h-10 w-10 rounded-full border shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-110 md:right-8 md:bottom-8",
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      )}
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      title="Scroll back to top"
    >
      <ArrowUp className="h-4 w-4" />
    </Button>
  );
}
