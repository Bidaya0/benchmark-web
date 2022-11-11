<template>
  <!-- :indent-with-tab="true" 是否自动获取焦点-->
  <codemirror
    v-model="code"
    placeholder="Code gose here..."
    :style="{ height: '100%' }"
    :autofocus="false"
    :tab-size="2"
    :options="options"
  />
</template>
<!-- @ready="ready('ready', $event)"
        @change="Change('change', $event)" @focus="focus('focus', $event)" @blur="blur('blur', $event)" -->
<script lang="ts" setup>
import { Codemirror } from 'vue-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { cpp } from '@codemirror/lang-cpp';
import { reactive, ref } from 'vue';
import { python } from '@codemirror/lang-python';
import { EditorView } from '@codemirror/view'
// import 'codemirror/addon/hint/show-hint.css';
// import 'codemirror/lib/codemirror.css'
// // require active-line.js
// import 'codemirror/addon/selection/active-line.js'
// // styleSelectedText
// import 'codemirror/addon/selection/mark-selection.js'
// // hint
// import 'codemirror/addon/hint/show-hint.js'
// import 'codemirror/addon/hint/sql-hint.js'
// import 'codemirror/addon/hint/javascript-hint.js'
// // highlightSelectionMatches
// import 'codemirror/addon/scroll/annotatescrollbar.js'
// import 'codemirror/addon/search/matchesonscrollbar.js'
// import 'codemirror/addon/search/match-highlighter.js'
// // keyMap
// import 'codemirror/mode/sql/sql'
// import 'codemirror/mode/clike/clike.js'
// import 'codemirror/mode/sql/sql.js'
// import 'codemirror/addon/edit/matchbrackets.js'
// import 'codemirror/addon/comment/comment.js'
// import 'codemirror/addon/dialog/dialog.js'
// import 'codemirror/addon/dialog/dialog.css'
// import 'codemirror/addon/search/searchcursor.js'
// import 'codemirror/addon/search/search.js'
// import 'codemirror/keymap/sublime.js'
// // foldGutter
// import 'codemirror/addon/fold/foldgutter.css'
// import 'codemirror/addon/fold/brace-fold.js'
// import 'codemirror/addon/fold/comment-fold.js'
// import 'codemirror/addon/fold/foldcode.js'
// import 'codemirror/addon/fold/foldgutter.js'
// import 'codemirror/addon/fold/indent-fold.js'
// import 'codemirror/addon/fold/markdown-fold.js'
// import 'codemirror/addon/fold/xml-fold.js'
// // 编辑的主题文件
// import 'codemirror/theme/monokai.css'
// import 'codemirror/theme/base16-light.css'

const myTheme = EditorView.theme({
  // 输入的字体颜色
  '&': {
    color: '#0052D9',
    backgroundColor: '#FFFFFF',
  },
  '.cm-content': {
    caretColor: '#0052D9',
  },
  // 激活背景色
  '.cm-activeLine': {
    backgroundColor: '#FAFAFA',
  },
  // 激活序列的背景色
  '.cm-activeLineGutter': {
    backgroundColor: '#FAFAFA',
  },
  // 光标的颜色
  '&.cm-focused .cm-cursor': {
    borderLeftColor: '#0052D9',
  },
  // 选中的状态
  '&.cm-focused .cm-selectionBackground, ::selection': {
    backgroundColor: '#0052D9',
    color: '#FFFFFF',
    border: 'none',
  },
  // 左侧侧边栏的颜色
  '.cm-gutters': {
    backgroundColor: '#FFFFFF',
    color: '#ddd', // 侧边栏文字颜色
    border: 'none',
  },
}, { dark: false })
// 接受的参数
interface IProps {
    height?: string,
}
// 接受的参数
const props = withDefaults(defineProps<IProps>(), {
  height: '400px',
})
const code = ref('dsgvhjdkhljfasklhv');
const options = reactive({
  style: { height: '400px' },
  mode: 'text/x-javascript',
  spellcheck: true,
  autofocus: true,
  indentWithTab: true,
  tabSize: 2,
  extensions: [javascript(), oneDark], // 传递给CodeMirror EditorState。创建({扩展})
});
const extensions = [python(), myTheme];
const Change = () => {

}
</script>
