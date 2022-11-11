<template>
  <main class="container">
    <div class="ace-container">
      111
      <!-- 官方文档中使用 id，这里禁止使用，在后期打包后容易出现问题，使用 ref 或者 DOM 就行 -->
      <div
        ref="aceId"
        class="ace-editor"
      />
    </div>
  </main>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue' // introjs主题
import ace from 'ace-builds'
// import 'ace-builds/webpack-resolver' // 在 webpack 环境中使用必须要导入
// import 'ace-builds/src-noconflict/theme-monokai' // 默认设置的主题
// import 'ace-builds/src-noconflict/mode-javascript'
// 默认设置的语言模式
const aceEditor = ref<any>()
const aceId = ref<any>()
const themePath = 'ace/theme/monokai' // 不导入 webpack-resolver，该模块路径会报错
const modePath = 'ace/mode/javascript' // 同上
onMounted(() => {
  aceEditor.value = ace.edit((aceId.value as HTMLElement), {
    maxLines: 20, // 最大行数，超过会自动出现滚动条
    minLines: 10, // 最小行数，还未到最大行数时，编辑器会自动伸缩大小
    fontSize: 14, // 编辑器内字体大小
    // theme: themePath, // 默认设置的主题
    // mode: modePath, // 默认设置的语言模式
    tabSize: 4, // 制表符设置为 4 个空格大小
  })
})
// i18n
</script>

<style scoped lang="scss">
  .container{
    font-family: 'Helvetica Neue';
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    color: #171B23;
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
