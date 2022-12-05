<template>
  <div class="content">
    <div class="searchConnections_Upgrade">
      <div class="black" />
      <i class="iconfont icon-Vector" />
      <span v-show="sqlType===1">操作指引：点击“生成内容”，生成数据，点击“保存”添加数据.</span>
      <span v-show="sqlType===2">操作指引：点击页面可点击的“删除”按钮，删除部分数据.</span>
      <span v-show="sqlType===3">操作指引：通过以下任一方式访问链接即可.</span>
    </div>
    <div
      v-show="sqlType===1"
      class="content_index"
    >
      <div class="title">
        <span>标题：</span>
        <el-input
          v-model="title"
          disabled
        />
      </div>
      <div class="content1">
        <span>内容：</span>
        <el-input
          v-model="textarea"
          type="textarea"
          :autosize="{ minRows: 6, maxRows: 10 }"
          disabled
        />
      </div>
      <div class="button_content">
        <button
          class="button-back-btn1"
          @click="getsqlMessage"
        >
          生成内容
        </button>
        <button
          :style="!title?'cursor: no-drop;':''"
          class="button-back-btn"
          @click="saveMessage"
        >
          保存
        </button>
      </div>
      <div class="table">
        <span />
        <el-table
          v-loading="operation1ListLLoading"
          :data="operationList"
          min-height="calc(100% - 0.53rem)"
          width="100%"
          class="assets-grey-theme-table"
        >
          <el-table-column
            prop="id"
            label="ID"
            :width="300"
            show-overflow-tooltip
          >
            <template #default="{ row, $index }">
              <span
                class="name-input"
                style="display: flex;align-items: center;cursor: pointer;"
              >
                <span
                  :id="'input'+$index"
                  class="id"
                  style="flex: 1;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;word-break: break-all;"
                >{{ row.id }}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题"
            :width="300"
          >
            <template #default="{ row }">
              <span
                style="display: flex;align-items: center;"
              >
                <span>{{ row.title }}</span>
              </span>
            </template>
          </el-table-column>

          <el-table-column
            prop="context"
            label="内容"
            fit
          >
            <template #default="{ row }">
              <span style="display: flex;align-items: center">
                {{ row.context }}
              </span>
            </template>
          </el-table-column>
          <template #empty>
            <div
              class="empty-box"
            >
              <div class="title">
                no Data
              </div>
            </div>
          </template>
        </el-table>
        <el-pagination
          :total="operationTotal"
          :page-size="operationObj.pagesize"
          :current-page="operationObj.page"
          layout="prev, pager, next"
          style="margin: 8px;display: flex;justify-content: end;"
          @current-change="handleoperationPageChange"
        />
      </div>
    </div>
    <div
      v-show="sqlType===2"
      class="content_index"
    >
      <div class="table">
        <span />
        <el-table
          v-loading="operation2ListLLoading"
          :data="operation2List"
          min-height="calc(100% - 0.53rem)"
          width="100%"
          class="assets-grey-theme-table"
        >
          <el-table-column
            prop="title"
            label="标题"
            :width="300"
            show-overflow-tooltip
          >
            <template #default="{ row, $index }">
              <span
                class="name-input"
                style="display: flex;align-items: center;cursor: pointer;"
              >
                <span
                  :id="'input'+$index"
                  class="id"
                  style="flex: 1;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;word-break: break-all;"
                >{{ row.title }}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="context"
            label="内容"
            fit
          >
            <template #default="{ row }">
              <span
                style="display: flex;align-items: center;"
              >
                <span :class="`Severity_${row.severity}`">{{ row.context }}</span>
              </span>
            </template>
          </el-table-column>

          <el-table-column
            prop="content"
            label="操作"
            :width="300"
          >
            <template #default="{ row }">
              <span style="display: flex;align-items: center">
                <span
                  class="delrow"
                  @click="sql2Del(row)"
                >删除</span>
              </span>
            </template>
          </el-table-column>
          <template #empty>
            <div
              class="empty-box"
            >
              <div class="title">
                no Data
              </div>
            </div>
          </template>
        </el-table>
        <el-pagination
          :total="operation2Total"
          :page-size="operation2Obj.pagesize"
          :current-page="operation2Obj.page"
          layout="prev, pager, next"
          style="margin: 8px;display: flex;justify-content: end;"
          @current-change="handleoperation2PageChange"
        />
      </div>
    </div>
    <div
      v-show="sqlType===3"
      id="content3"
      class="content_index"
      style="border: 1px solid #ccc;"
    >
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
  onMounted, reactive, ref, markRaw, watch,
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
import { useRoute } from 'vue-router'
import { ElLoading, ElMessage } from 'element-plus'
import {
  dataDisplayCountMessage,
  dataDisplayMessage, dataDisplayCount, generateMessage, logicExec3Message, logicExecMessage, sql1LogicExec, sqlMessage,
} from '@/api/manage'

const WebhooksPayload = ref<any>('')
VMdEditor.Codemirror = Codemirror
VMdEditor.use(githubTheme, {
  Hljs: hljs,
})
const title = ref<any>('')
const textarea = ref<any>('')
const operation1ListLLoading = ref<any>(false)
const operationList = ref<any>([])
const operationTotal = ref<any>(0)
const operationObj = reactive<any>({
  pagesize: 10,
  page: 1,
})
const handleoperationPageChange = (val:any) => {
  operationObj.page = val
  getDataDisplayMessage()
  getDataDisplayCountMessage()
}
const operation2List = ref<any>([])
const operation2Total = ref<any>(0)
const operation2Obj = reactive<any>({
  pagesize: 10,
  page: 1,
})
const operation2ListLLoading = ref<any>(false)
const handleoperation2PageChange = (val:any) => {
  operation2Obj.page = val
  getGenerateMessage()
}
const sqlType = ref<any>(0)
const Route = useRoute();
const getGenerateMessage = async () => {
  operation2ListLLoading.value = true
  const params:any = {
    page: operation2Obj.page - 1,
    pageSize: operation2Obj.pagesize,
    path: urlpath.value,
  }
  const data = await generateMessage(params);
  operation2ListLLoading.value = false
  // TODO 结构有问题 返回的是对象
  operation2List.value = data || []
}
const getGenerateMessageCount = async () => {
  const params:any = {
    path: urlpath.value,
  }
  const data = await dataDisplayCount(params);
  // TODO 结构有问题 返回的是对象
  operation2Total.value = data || 0
}
const sql2Del = async (row:any) => {
  const params:any = {
    id: row.id,
    title: row.title,
    context: row.context,
    path: urlpath.value,
  }
  const data = await logicExecMessage(params);
  // TODO 接口有问题 返回的是对象
  ElMessage.success(data.context)
  getGenerateMessage()
  getGenerateMessageCount()
}
const getLogicExec3Message = async () => {
  const loading = ElLoading.service({
    lock: true,
    target: document.getElementById('content3') as HTMLElement,
    text: 'Loading',
    background: 'rgba(255, 255, 255, 0.6)',
  })
  const params:any = {
    path: urlpath.value,
  }
  const data = await logicExec3Message(params);
  loading.close()
  // TODO
  WebhooksPayload.value = data
}
// sql 001
const getDataDisplayMessage = async () => {
  operation1ListLLoading.value = true
  const params:any = {
    page: operationObj.page - 1,
    pageSize: operationObj.pagesize,
    path: urlpath.value,
  }
  const data = await dataDisplayMessage(params);
  operation1ListLLoading.value = false
  operationList.value = data
}
const getDataDisplayCountMessage = async () => {
  const params:any = {
    path: urlpath.value,
  }
  const data = await dataDisplayCountMessage(params);
  operationTotal.value = data
}
const getsqlMessage = async () => {
  const params:any = {
    path: urlpath.value,
  }
  const data = await sqlMessage(params);
  title.value = data.title
  textarea.value = data.context
  getDataDisplayMessage()
}
const saveMessage = async () => {
  if (!title.value) {
    return
  }
  const params:any = {
    title: title.value,
    context: textarea.value,
    path: urlpath.value,
  }
  const data = await sql1LogicExec(params);
  ElMessage.success(data.context);
  getDataDisplayMessage()
}
const urlpath = ref<any>('')
watch(
  () => Route.params,
  () => {
    console.log('Route.params', Route.params)
    const { type = '' as string, path = '' as string } = Route.params;
    urlpath.value = path
    if (type === '1') {
      sqlType.value = 1
      getDataDisplayMessage()
      getDataDisplayCountMessage()
    }
    if (type === '2') {
      sqlType.value = 2
      getGenerateMessage()
      getGenerateMessageCount()
    }
    if (type === '3') {
      sqlType.value = 3
      getLogicExec3Message()
    }
  },
  { immediate: true, deep: true },
)
onMounted(() => {
})
</script>

<style scoped lang="scss">
.delrow{
  color:#0058F0;
  cursor: pointer;
}
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
