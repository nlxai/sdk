/// <reference types="vite/client" />

// See base64Loader in vite.config.ts
declare module "*?base64" {
  const value: string;
  export = value;
}
