'use client';
import { createContext, useContext, useEffect } from 'react';

interface StoreTheme {
  colorBackground: string;
  colorPrimary: string;
  colorDark: string;
  colorMedium: string;
  colorAccent: string;
  fontHeading: string;
  fontBody: string;
  storeName: string;
}

const Ctx = createContext<StoreTheme | null>(null);

const CSS_MAP: Array<[keyof StoreTheme, string]> = [
  ['colorBackground', '--bg'],
  ['colorPrimary',    '--coral'],
  ['colorDark',       '--ink'],
  ['colorMedium',     '--medium'],
  ['colorAccent',     '--gold'],
];

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    fetch('/api/store/theme')
      .then(r => r.ok ? r.json() : null)
      .then((theme: StoreTheme | null) => {
        if (!theme) return;
        const root = document.documentElement;
        for (const [key, cssVar] of CSS_MAP) {
          const val = theme[key];
          if (typeof val === 'string' && val.startsWith('#')) {
            root.style.setProperty(cssVar, val);
          }
        }
      })
      .catch(() => {});
  }, []);

  return <Ctx.Provider value={null}>{children}</Ctx.Provider>;
}

export const useTheme = () => useContext(Ctx);
