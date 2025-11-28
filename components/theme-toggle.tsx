"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={(e) => {
        e.preventDefault();
        setTheme((theme) => (theme == "dark" ? "light" : "dark"));
      }}
    >
      {theme == "light" ? <Sun /> : <Moon />}
    </Button>
  );
}
