<template>
  <div class="content">
    <div class="searchConnections_Upgrade">
      <div class="black" />
      <i class="iconfont icon-Vector" />
      <span>操作指引：通过以下任一方式访问链接即可.</span>
    </div>
    <div class="content_index">
      <VMdEditor
        v-model="WebhooksPayload"
        mode="preview"
        height="306px"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  onMounted, reactive, ref, markRaw,
} from 'vue' // introjs主题
import VMdEditor from '@kangc/v-md-editor/lib/codemirror-editor'
import '@kangc/v-md-editor/lib/style/codemirror-editor.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'

// codemirror 编辑器的相关资源
import Codemirror from 'codemirror'
// mode
import 'codemirror/mode/markdown/markdown'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/vue/vue'
// edit
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/matchbrackets'
// placeholder
import 'codemirror/addon/display/placeholder'
// active-line
import 'codemirror/addon/selection/active-line'
// scrollbar
import 'codemirror/addon/scroll/simplescrollbars'
import 'codemirror/addon/scroll/simplescrollbars.css'
// style
import 'codemirror/lib/codemirror.css'

// highlightjs
import hljs from 'highlight.js'

const randerEchart = async () => {

}
const WebhooksPayload = ref<any>(`
  * [aws\\_redshift\\_event\\_subscriptions](https://github.com/selefra/selefra-provider-aws/blob/main/docs/tables/aws\\_redshift\\_event\\_subscriptions.md)
`)
VMdEditor.Codemirror = Codemirror
VMdEditor.use(githubTheme, {
  Hljs: hljs,
})
onMounted(() => {
  randerEchart()
})
</script>

<style scoped lang="scss">
.content{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0 100px;
    .searchConnections_Upgrade{
      width: 100%;
      height: 40px;
      background: #F2F3F5;
      border-radius: 4px;
      overflow: hidden;
      margin: 24px 0;
      position: relative;
      padding: 8px 16px;
      display: flex;
      align-items: center;
      gap: 16px;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      color: #000000;
      .black{
        position: absolute;
        width: 4px;
        left: 0px;
        top: 0px;
        bottom: 0px;
        background: #000000;
      }
      .plan{
        display: flex;
        align-items: center;
        color: #0058F0;
        cursor: pointer;
      }
    }
    .content_index{
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 16px;
      border: 1px solid #ccc;
      >div{
        display: flex;
        width: 100%;
        >span{
          margin-top: 6px;
          width: 80px;
        }
      }
      .table{
        flex-direction: column;
      }
      .button_content{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 16px;
      }
    }
}
</style>
