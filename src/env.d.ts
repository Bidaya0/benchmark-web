/// <reference types="vite/client" />

// declare module '*.vue' {
//   import type { DefineComponent } from 'vue'
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
//   const component: DefineComponent<{}, {}, any>
//   export default component
// }

declare module '*.vue' {
  import { DefineComponent } from 'vue';

  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'insert-css';
declare module 'snowflake-id'
declare module '*.md';
declare module 'intro.js';
declare function gtag(...argumnet: any): void;
declare module 'monaco-editor';
declare module 'vite-plugin-monaco-editor';
declare module 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
declare module 'monaco-editor/esm/vs/basic-languages/sql/sql.js';
declare module 'monaco-editor/esm/vs/basic-languages/yaml/yaml.js';
declare module 'monaco-editor/esm/vs/language/json/json.worker?worker'
declare module 'monaco-editor/esm/vs/language/css/css.worker?worker'
declare module 'monaco-editor/esm/vs/language/html/html.worker?worker'
declare module 'monaco-editor/esm/vs/editor/editor.worker?worker'
declare module '@kangc/v-md-editor/lib/preview'
declare module '@kangc/v-md-editor/lib/codemirror-editor'
declare module '@kangc/v-md-editor/lib/theme/github.js'
declare module 'highlight.js'
declare module 'vue3-print-nb'
declare module 'html2canvas'
