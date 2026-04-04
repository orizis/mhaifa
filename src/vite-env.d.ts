/// <reference types="vite/client" />

declare module 'use-react-screenshot' {
  export function useScreenshot(opts?: {
    type?: string;
    quality?: number;
  }): [
    image: string | null,
    takeScreenShot: (node: HTMLElement, options?: object) => Promise<string>,
    state: { error: unknown },
  ];
  export function createFileName(extension?: string, ...names: string[]): string;
}
