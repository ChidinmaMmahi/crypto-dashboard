import { useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark";
const STORAGE_KEY = "theme";

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // On first load: use saved theme or system theme
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    return saved ?? getSystemTheme();
  });

  const [userSet, setUserSet] = useState(() => {
    return !!localStorage.getItem(STORAGE_KEY);
  });

  // Apply theme when it changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Watch system preference only if user hasn’t chosen a theme
  useEffect(() => {
    if (userSet) return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [userSet]);

  // Toggle between dark and light
  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem(STORAGE_KEY, next);
      setUserSet(true);
      return next;
    });
  }, []);

  // Clear saved theme to follow system again
  const clearTheme = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUserSet(false);
    setTheme(getSystemTheme());
  }, []);

  return { theme, toggleTheme, clearTheme, userSet };
}
