<template>
  <div class="content">
    <div class="searchConnections_Upgrade">
      <div class="black" />
      <i class="iconfont icon-Vector" />
      <span>操作指引：点击“生成内容”，生成数据，点击“保存”添加数据.</span>
    </div>
    <div class="content_index">
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
        <button class="button-back-btn1">
          生成内容
        </button>
        <button class="button-back-btn">
          保存
        </button>
      </div>
      <div class="table">
        <span />
        <el-table
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
                >{{ row.title }}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="url"
            label="标题"
            :width="300"
          >
            <template #default="{ row }">
              <span
                style="display: flex;align-items: center;"
              >
                <span :class="`Severity_${row.severity}`">{{ row.severity }}</span>
              </span>
            </template>
          </el-table-column>

          <el-table-column
            prop="content"
            label="内容"
            fit
          >
            <template #default="{ row }">
              <span style="display: flex;align-items: center">
                {{ row.date }}
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
  </div>
</template>

<script setup lang="ts">
import {
  onMounted, reactive, ref, markRaw,
} from 'vue' // introjs主题

const randerEchart = async () => {

}
const title = ref<any>('')
const textarea = ref<any>('')
const operationList = ref<any>([])
const operationTotal = ref<any>(0)
const operationObj = reactive<any>({
  pagesize: 10,
  page: 1,
})
const handleoperationPageChange = (val:any) => {
  operationObj.page = val
  getoperationList()
}
const getoperationList = () => {

}
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
