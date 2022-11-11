<template>
  <main class="container">
    <div class="ace-container">
      <div>
        <button
          v-for="(item,index) in list"
          :key="index"
          class="itemButton"
          @click="selectActive(item)"
        >
          {{ item.name }}
        </button>
      </div>
      <!-- <mirrorTextArea /> -->
      <monacoEditor
        v-model="value"
        :language="language"
        width="800px"
        height="500px"
        @editor-mounted="editorMounted"
      />
      <div class="fudong">
        111
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import * as monaco from 'monaco-editor'
import { ref } from 'vue';
import mirrorTextArea from './mirrorTextArea.vue'
import monacoEditor from './monacoEditor.vue'

const list = ref<any>([{
  name: '2.sql',
  language: 'sql',
  value: 'select * from \'sss\' \n',
},
{
  name: 'test.yaml',
  language: 'yaml',
  value: `name: Deploy selefra web

on:
  push:
    branches:
      - dev`,
}])
list.value.push({
  name: '1.js',
  language: 'javascript',
  value: 'let a = 234; \n a++;\n console.log(a) \n',
})
const selectActive = (row:any) => {
  value.value = row.value
  language.value = row.language
}
const value = ref('let a = 234 \n\n\n')
const language = ref('sql')
const editorMounted = (editor: monaco.editor.IStandaloneCodeEditor) => {
  console.log('editor实例加载完成', editor)
}
</script>

<style scoped lang="scss">
.itemButton{
  margin: 0 4px;
}
.fudong{
  width: 100%;
  height: 400px;
  color: #171B23;
  background-color: #fff;
  z-index: 2022;
  border: 1px solid #434C5B;
}
.ace-container{
  position: relative;
  display: flex;
  flex-direction: column;
  height: 500px;
}
#codeEditBox {
  width:100%;
  max-height:200px;
  flex: 1;
}
  .container{
    font-family: 'Helvetica Neue';
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    color: #171B23;
    text-align: left;
    .header{
      color: #434C5B;
      font-family: 'PingFang SC';
    }
  }
</style>
<style lang="scss">
.intro4{
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    img{
      width: 100%;
    }
  }
.warper {
  width: 200px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 1px solid saddlebrown;
}
/* 重置引导组件样式(类似element-ui个人使用) */
.intro-tooltip {
  color: #ffff;
  background: #2c3e50;
}
/* 引导提示框的位置 */
.introjs-bottom-left-aligned {
  left: 45% !important;
}
.introjs-right,
.introjs-left {
  top: 30%;
}
.intro-highlight {
  background: rgba(255,255,255,0.5);
}
.introjs-arrow.left {
  border-right-color: #2c3e50;
}
.introjs-arrow.top {
  border-bottom-color: #2c3e50;
}
.introjs-arrow.right {
  border-left-color: #2c3e50;
}
.introjs-arrow.bottom {
  border-top-color: #2c3e50;
}
/* 提示框头部区域 */
.introjs-tooltip-header {
  padding-right: 0 !important;
  padding-top: 0 !important;
}
.introjs-skipbutton {
  color: #409eff !important;
  font-size: 14px !important;
  font-weight: normal !important;
  padding: 8px 10px !important ;
}
.introjs-tooltipbuttons {
  border: none !important;
}
.introjs-tooltiptext {
  font-size: 14px !important;
  padding: 15px !important;
}
/* 提示框按钮 */
.introjs-tooltipbuttons {
  display: flex;
  align-items: center;
  justify-content: center;
}
.introjs-button {
  width: 50px !important;
  text-align: center;
  padding: 4px !important;
  font-size: 12px !important;
  font-weight: 500 !important;
  border-radius: 3px !important;
  border: none !important;
}
.introjs-button:last-child {
  margin-left: 10px;
}
.introjs-prevbutton {
  color: #606266 !important;
  background: #fff !important;
  border: 1px solid #dcdfe6 !important;
}
.introjs-nextbutton {
  color: #fff !important;
  background-color: #409eff !important;
  border-color: #409eff !important;
}
.introjs-disabled {
  color: #9e9e9e !important;
  border-color: #bdbdbd !important;
  background-color: #f4f4f4 !important;
}
</style>
