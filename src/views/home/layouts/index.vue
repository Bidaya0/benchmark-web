<template>
  <div class="content">
    <div class="one_table">
      <div class="one_table_title">
        检测影响得分：<span>S</span>（95分）
      </div>
      <el-table
        :data="loopholeList"
        min-height="calc(100% - 0.53rem)"
        width="100%"
        class="assets-grey-theme-table"
      >
        <el-table-column
          prop="title"
          label="漏洞名称"
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
          label="漏洞地址"
          :width="200"
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
          prop="number"
          label="请求次数"
          :width="200"
        >
          <template #default="{ row }">
            <span
              style="display: flex; align-items: center;"
            >
              <span
                style=" color: #171B23;"
              >{{ row.resource_type }}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="url"
          label="脏数据"
          :width="300"
        >
          <template #default="{ row }">
            <span
              style="display: flex;align-items: center;justify-content: center;"
            >
              {{ row.issues_count }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          prop="date"
          label="响应时间"
          :width="300"
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
              loophole is still empty
            </div>
          </div>
        </template>
      </el-table>
      <el-pagination
        :total="loopholeTotal"
        :page-size="loopholeObj.pagesize"
        :current-page="loopholeObj.page"
        layout="prev, pager, next"
        style="margin: 8px;display: flex;justify-content: end;"
        @current-change="handleloopholePageChange"
      />
    </div>
    <div class="two_photo">
      <div class="two_table_title">
        资源影响得分：<span>S</span>（95分）
      </div>
      <div class="two_photo_all">
        <div class="two_photo_one">
          <div class="two_photo_num_title">
            CPU Usege 得分：<span>B</span>（80分)
          </div>
          <div class="echartImg">
            <trandCPU />
          </div>
        </div>
        <div class="two_photo_two">
          <div class="two_photo_num_title">
            Memage Usege 得分：<span>A</span>（80分）
          </div>
          <div class="echartImg">
            <trandMemage />
          </div>
        </div>
      </div>
    </div>
    <div>第三步表格</div>
  </div>
</template>

<script setup lang="ts">
import {
  onMounted, reactive, ref, markRaw,
} from 'vue' // introjs主题
import trandCPU from '../components/trandCPU.vue'
import trandMemage from '../components/trandMemage.vue'

const loopholeList = ref<any>([])
const loopholeTotal = ref<any>(0)
const loopholeObj = reactive<any>({
  pagesize: 10,
  page: 1,
})
const handleloopholePageChange = (val:any) => {
  loopholeObj.page = val
  getloopholeList()
}
const getloopholeList = async () => {

}

onMounted(() => {
  getloopholeList()
})
</script>

  <style scoped lang="scss">
  .content{
      display: flex;
      flex-direction: column;
      width: 100%;
      margin: 0 auto;
      max-width: 1200px;
      margin-top: 24px;
      .one_table{
        .one_table_title{
          font-weight: 600;
          font-size: 18px;
          color: #333333;
          margin-bottom: 24px;
          span{
            color:#70B603;
          }
        }
      }
      .two_photo{
        margin-top: 24px;
        .two_table_title{
          font-weight: 600;
          font-size: 18px;
          color: #333333;
          margin-bottom: 24px;
          span{
            color:#70B603;
          }
        }
        .two_photo_all{
          width:100%;
          display: flex;
          gap: 16px;
          >div{
            flex: 1;
            height: 400px;
            display: flex;
            flex-direction: column;
            .two_photo_num_title{
              font-family: 'Arial-BoldMT', 'Arial Bold', 'Arial', sans-serif;
              font-weight: 700;
              font-style: normal;
              font-size: 18px;
              text-align: left;
              color: #333333;
              >span{
              }
            }
            .echartImg{
              flex:1;
              width:100%;
              padding: 16px;
              box-sizing: border-box;
            }
          }
        }
      }
  }
  </style>
