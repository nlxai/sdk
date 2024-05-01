/// <reference types="vite/client" />

/* VITE will filter out env vars not prefixed with VITE_.
 * to avoid accidentally exposing secrets.
 *
 * in other words: none of these are secrets
 */
interface ImportMetaEnv {
  // used by address component example
  readonly VITE_GOOGLE_MAPS_API_KEY: string;
  // used by docsearch
  readonly VITE_ALGOLIA_APP_ID: string;
  readonly VITE_ALGOLIA_INDEX_NAME: string;
  readonly VITE_ALGOLIA_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
