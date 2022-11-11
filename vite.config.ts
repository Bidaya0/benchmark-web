import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import monacoEditorPlugin from 'vite-plugin-monaco-editor'
import path from 'path'
// @ts-ignore
import fs from 'fs'
// @ts-ignore
import dotenv from 'dotenv'

const { resolve } = require('path')
const postCssPxToRem = require('postcss-pxtorem')

// https://vitejs.dev/config/
export default defineConfig(({ mode }: UserConfig): UserConfig => {
  // 根据环境变量加载环境变量文件
  const ASR_ENV = dotenv.parse(fs.readFileSync(`.env.${mode}`))
  return {
    base: ASR_ENV.VITE_PUBLIC_PATH,
    server: {
      host: 'localhost',
      port: 8092,
      https: true,
      proxy: {
        [ASR_ENV.VITE_BASE_API]: {
          target: `${ASR_ENV.VITE_TARGET_HOST}`,
          changeOrigin: true,
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      monacoEditorPlugin({}),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          charset: false,
        },
      },
      postcss: {
        plugins: [
          postCssPxToRem({
            rootValue: 16, // 1rem的大小
            propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
          }),
        ],
      },
    },
    // 强制预构建插件包
    optimizeDeps: {
      include: [
        'monaco-editor/esm/vs/language/json/json.worker',
        'monaco-editor/esm/vs/language/css/css.worker',
        'monaco-editor/esm/vs/language/html/html.worker',
        'monaco-editor/esm/vs/language/typescript/ts.worker',
        'monaco-editor/esm/vs/editor/editor.worker',
      ],
    },
    build: {
      minify: 'terser', // 是否进行压缩,boolean | 'terser' | 'esbuild',默认使用esbuild
      // reportCompressedSize: true,
      manifest: false, // 是否产出maifest.json
      sourcemap: false, // 是否产出soucemap.json
      chunkSizeWarningLimit: 1500,
    },
  }
})
