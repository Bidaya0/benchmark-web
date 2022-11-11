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
declare module '*.md';
declare module 'vue-codemirror';
declare module 'codemirror';
declare module '@codemirror/lang-javascript';
declare module '@codemirror/view';
declare module '@codemirror/lang-cpp';
declare module '@codemirror/lang-python';
declare module 'vite-plugin-monaco-editor';
declare module 'monaco-editor/esm/vs/basic-languages/sql/sql.js';
declare module 'monaco-editor/esm/vs/basic-languages/yaml/yaml.js';
declare module 'monaco-with-tree';
declare module 'vue-tabs-chrome';
declare module 'nice-monaco-tree';
declare module 'vue-splitpane';
declare module 'intro.js';
declare function gio(...argumnet: any): void;
