<template>
  <div
    ref="codeEditBox"
    class="codeEditBox"
  />
</template>

<script lang="ts">
import {
  defineComponent, onBeforeUnmount, onMounted, ref, watch,
} from 'vue'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import * as monaco from 'monaco-editor'
import { language as sqlLanguage } from 'monaco-editor/esm/vs/basic-languages/sql/sql.js';
import { language as yamlLanguage } from 'monaco-editor/esm/vs/basic-languages/yaml/yaml.js';
import 'monaco-editor/esm/vs/basic-languages/sql/sql.contribution'
import { editorProps } from './monacoEditorType'

export default defineComponent({
  name: 'MonacoEditor',
  props: editorProps,
  emits: ['update:modelValue', 'change', 'editor-mounted'],
  setup(props, { emit }) {
    self.MonacoEnvironment = {
      getWorker(_: string, label: string) {
        if (label === 'json') {
          // eslint-disable-next-line new-cap
          return new jsonWorker()
        }
        if (['css', 'scss', 'less'].includes(label)) {
          // eslint-disable-next-line new-cap
          return new cssWorker()
        }
        if (['html', 'handlebars', 'razor'].includes(label)) {
          // eslint-disable-next-line new-cap
          return new htmlWorker()
        }
        if (['typescript', 'javascript'].includes(label)) {
          // eslint-disable-next-line new-cap
          return new tsWorker()
        }
        return new EditorWorker()
      },
    }
    let editor: monaco.editor.IStandaloneCodeEditor
    const codeEditBox = ref()

    const init = () => {
      monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: false,
      })
      monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.ES2020,
        allowNonTsExtensions: true,
      })
      monaco.languages.registerCompletionItemProvider('sql', {
        provideCompletionItems() {
          const suggestions:any = [];
          // 这个keywords就是sql.js文件中有的
          sqlLanguage.keywords.forEach((item:any) => {
            suggestions.push({
              label: item,
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: item,
            });
          })
          sqlLanguage.operators.forEach((item:any) => {
            suggestions.push({
              label: item,
              kind: monaco.languages.CompletionItemKind.Operator,
              insertText: item,
            });
          })
          sqlLanguage.builtinFunctions.forEach((item:any) => {
            suggestions.push({
              label: item,
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: item,
            });
          })
          sqlLanguage.builtinVariables.forEach((item:any) => {
            suggestions.push({
              label: item,
              kind: monaco.languages.CompletionItemKind.Variable,
              insertText: item,
            });
          })
          return {
            // 最后要返回一个数组
            suggestions,
          };
        },
      })
      monaco.languages.registerCompletionItemProvider('yaml', {
        provideCompletionItems() {
          const suggestions:any = [];
          // 这个keywords就是python.js文件中有的
          yamlLanguage.keywords.forEach((item:any) => {
            suggestions.push({
              label: item,
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: item,
            });
          })
          return {
            // 最后要返回一个数组
            suggestions,
          };
        },
      })

      editor = monaco.editor.create(codeEditBox.value, {
        value: props.modelValue,
        language: props.language,
        theme: props.theme,
        ...props.options,
      })

      // 监听值的变化
      editor.onDidChangeModelContent(() => {
        const value = editor.getValue() // 给父组件实时返回最新文本
        emit('update:modelValue', value)
        emit('change', value)
      })

      emit('editor-mounted', editor)
    }
    watch(
      () => props.modelValue,
      (newValue) => {
        if (editor) {
          const value = editor.getValue()
          if (newValue !== value) {
            editor.setValue(newValue)
          }
        }
      },
    )

    watch(
      () => props.options,
      (newValue) => {
        editor.updateOptions(newValue)
      },
      { deep: true },
    )

    watch(
      () => props.language,
      (newValue) => {
        monaco.editor.setModelLanguage(editor.getModel()!, newValue)
      },
    )

    onBeforeUnmount(() => {
      editor.dispose()
    })

    onMounted(() => {
      init()
    })

    return { codeEditBox }
  },
})
</script>

  <style lang="scss" scoped>
  .codeEditBox {
    width: v-bind(width);
    height: v-bind(height);
  }
  </style>
