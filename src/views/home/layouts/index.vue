<template>
  <div
    id="printMe"
    class="content"
  >
    <div class="left">
      <div class="one_table">
        <div
          class="one_table_title"
          @click="daYinprint"
        >
          检测影响得分：<span>{{ allScores.level }}</span>（{{ allScores.score }}分）
        </div>
        <el-table
          id="tableId"
          :data="loopholeList"
          min-height="calc(100% - 0.53rem)"
          width="100%"
          class="assets-grey-theme-table"
        >
          <el-table-column
            prop="title"
            label="漏洞名称"
            :min-width="230"
            show-overflow-tooltip
          >
            <template #default="{ row, $index }">
              <span
                class="name-input"
                style="display: flex;align-items: center;cursor: pointer;"
                @click="goSql(row)"
              >
                <span
                  :id="'input'+$index"
                  class="id"
                  style="flex: 1;color:#169BD5;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;word-break: break-all;"
                >{{ row.name }}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="url"
            label="漏洞地址"
            :min-width="150"
          >
            <template #default="{ row }">
              <span
                style="display: flex;align-items: center;"
              >
                <span :class="`Severity_${row.severity}`">{{ row.path }}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="number"
            label="请求次数"
            :min-width="100"
          >
            <template #default="{ row }">
              <span
                style="display: flex; align-items: center;"
              >
                <span
                  :style="row?.accessCount<100?'color: #171B23;':'color: #A30014;'"
                >{{ row.accessCount }}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="url"
            label="脏数据"
            :min-width="230"
          >
            <template #default="{ row }">
              <span
                style="display: flex;align-items: center;"
              >
                <span style="width:40%;">新增 + {{ Math.floor(row.dirtyDataInsertCount/1000) }} </span>
                <span style="width:40%;">误删 - {{ Math.floor(row.dirtyDataDeleteCount/1000) }}</span>
              </span>
            </template>
          </el-table-column>

          <el-table-column
            prop="date"
            label="响应时间"
            :min-width="230"
            fit
          >
            <template #default="{ row }">
              <span style="display: flex;align-items: center;">
                <span style="width:50%;">平均 {{ row.responseTimeAverage }} s</span>
                <span style="width:50%;">最高 {{ row.responseTimeMax }} s</span>
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
    </div>
    <div class="right">
      <div class="two_photo">
        <!-- <div class="two_table_title">
          资源影响得分：<span>S</span>（95分）
        </div> -->
        <div class="two_photo_all">
          <div class="two_photo_one">
            <div class="two_photo_num_title">
              CPU Usege
              <!-- 得分：<span>B</span>（80分) -->
            </div>
            <div class="echartImg">
              <trandCPU :data="cpuData" />
            </div>
          </div>
          <div class="two_photo_two">
            <div class="two_photo_num_title">
              Memage Usege
              <!-- 得分：<span>A</span>（80分） -->
            </div>
            <div class="echartImg">
              <trandMemage :data="memData" />
            </div>
          </div>
        </div>
      </div>
      <div
        class="table_three"
      >
        <div class="select">
          <div class="KeepCpu">
            <span>
              Keep CPU Usage over
            </span>
            <div class="baifenbi">
              <el-input
                v-model="cpuNum"
                type="number"
                @change="Changeload_with_jie_liu"
              />%
            </div>
            <el-switch
              v-model="cpuValue"
              class="ml-2"
              style="--el-switch-on-color: #13ce66;"
              @change="Changeload"
            />
            <span>{{ cpuValue?'开启':'关闭' }}</span>
          </div>
          <div class="KeepCpu">
            <span>
              Keep Mem Usage over
            </span>
            <div class="baifenbi">
              <el-input
                v-model="memNum"
                type="number"
                @change="Changeload_with_jie_liu"
              />%
            </div>
            <el-switch
              v-model="memValue"
              class="ml-2"
              style="--el-switch-on-color: #13ce66;"
              @change="Changeload"
            />
            <span>{{ memValue?'开启':'关闭' }}</span>
          </div>
        </div>
        <div class="table">
          <el-table
            :data="operationList"
            min-height="calc(100% - 0.53rem)"
            width="100%"
            class="assets-grey-theme-table"
          >
            <el-table-column
              prop="id"
              label="ID"
              :width="120"
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
              prop="url"
              label="操作"
              fit
            >
              <template #default="{ row }">
                <span
                  style="display: flex;align-items: center;"
                >
                  <span>{{ row.context }}</span>
                </span>
              </template>
            </el-table-column>

            <el-table-column
              prop="date"
              label="时间"
              :width="130"
            >
              <template #default="{ row }">
                <span style="display: flex;align-items: center">
                  {{ enformatDate(row.timestamp) }}
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
  </div>
</template>

<script setup lang="ts">
import {
  onMounted, reactive, ref, markRaw, onUnmounted,
} from 'vue' // introjs主题
import { useRouter } from 'vue-router';
import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';
import {
  messageLogcount,
  messageLogDisplay, messageMetric_display, messageVulList, messageVulListCount, messageChangeload, testscores, messageload,
} from '@/api/manage';
import trandCPU from '../components/trandCPU.vue'
import trandMemage from '../components/trandMemage.vue'
import {
  enformatDate1, enformatDate, formatDate, downloadPDF, handlePrint, outputPDF, downloadPDF1,
} from '@/utils';
// 引入插件

// const printObj = {
//   id: 'printMe', // 打印区域 Dom ID
//   popTitle: '', // 打印的标题
//   extraCss: '', // 打印可引入外部的一个css文件
//   // extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>,<style> #printMe { height: auto !important; } <style>', // 打印头部文字附加在head标签上的额外标签//可以传进去 style tag 标签；注意要逗号分隔 解决特定区域不显示问题；
//   // preview: '', // 是否启动预览模式，默认是false（开启预览模式，可以先预览后打印）
//   // previewTitle: '', // 打印预览的标题（开启预览模式后出现）,
//   // previewPrintBtnLabel: '', // 打印预览的标题的下方按钮文本，点击可进入打印（开启预览模式后出现）
//   // zIndex: '', // 预览的窗口的z-index，默认是 20002（此值要高一些，这涉及到预览模式是否显示在最上面）
//   previewBeforeOpenCallback() {}, // 预览窗口打开之前的callback（开启预览模式调用）
//   previewOpenCallback() {}, // 预览窗口打开之后的callback（开启预览模式调用）
//   beforeOpenCallback() {}, // 开启打印前的回调事件
//   openCallback() {}, // 调用打印之后的回调事件
//   closeCallback() {}, // 关闭打印的回调事件（无法确定点击的是确认还是取消）
// }
const cpuValue = ref<any>(false)
const memValue = ref<any>(false)
const cpuNum = ref<any>(0)
const memNum = ref<any>(0)
const loopholeList = ref<any>([])
const loopholeTotal = ref<any>(0)
const loopholeObj = reactive<any>({
  pagesize: 50,
  page: 1,
})
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

const handleloopholePageChange = (val:any) => {
  loopholeObj.page = val
  getloopholeList()
}
const router = useRouter();
const goSql = (row:any) => {
  router.push(`/sql/${row.path}/${row.type}`)
}
const getloopholeList = async () => {
  const params:any = {
    page: loopholeObj.page - 1,
    pageSize: loopholeObj.pagesize,
  }
  const data = await messageVulList(params);
  loopholeList.value = data || []
}
const getloopholeTotal = async () => {
  const params:any = {
  }
  const data = await messageVulListCount(params);
  loopholeTotal.value = data || 0
}
const getoperationList = async () => {
  const params:any = {
    page: operationObj.page - 1,
    pageSize: operationObj.pagesize,
  }
  const data = await messageLogDisplay(params);
  operationList.value = data || []
}
const getoperationListTotal = async () => {
  const params:any = {
  }
  const data = await messageLogcount(params);
  operationTotal.value = data || 0
}
const cpuData = ref<any>()
const memData = ref<any>()
const getPhoto = async () => {
  const params:any = {
  }
  const data = await messageMetric_display(params);
  cpuData.value = {
    XData: data.loadInfo.map((item:any) => enformatDate1(item.timestamp)),
    YHData: data.loadInfo.map((item:any) => item.cpuUsage),
    YMData: data.selfInfo.map((item:any) => item.cpuUsage),
  } || {}
  memData.value = {
    XData: data.loadInfo.map((item:any) => enformatDate1(item.timestamp)),
    YHData: data.loadInfo.map((item:any) => item.memoryUsage),
    YMData: data.selfInfo.map((item:any) => item.memoryUsage),
  } || {}
}
const timer = ref<any>(null)
const Changeload_with_jie_liu = () => {
  if (timer.value) {
    return
  }
  timer.value = setTimeout(() => {
    timer.value = null
    Changeload()
  }, 800)
}
const Changeload = async () => {
  const params:any = {
    cpuUsage: Number(cpuNum.value),
    memoryUsage: Number(memNum.value),
    cpuLoadEnable: cpuValue.value,
    memoryLoadEnable: memValue.value,
  }
  const data = await messageChangeload(params);
  // TODO
  console.log(data)
  getoperationList()
}
const allScores = ref<any>({})
const gettestscores = async () => {
  const params:any = {
  }
  const data = await testscores(params);
  // TODO
  allScores.value = data
}
const getMessageload = async () => {
  const params:any = {
  }
  const data = await messageload(params);
  // TODO
  memValue.value = data.memoryLoadEnable
  memNum.value = data.memoryUsage
  cpuValue.value = data.cpuLoadEnable
  cpuNum.value = data.cpuUsage
}

const exportPDF = () => {
  const ele: HTMLElement | null = document.getElementById('printMe');
  html2canvas(ele as HTMLElement, {
    dpi: 400, // 分辨率
    scale: 2, // 设置缩放
    useCORS: true, // 允许canvas画布内 可以跨域请求外部链接图片, 允许跨域请求。,
    // backgroundColor:'#ffffff',这样背景还是黑的
    bgcolor: '#ffffff', // 应该这样写
    logging: false, // 打印日志用的 可以不加默认为false
  } as any).then((canvas:any) => {
    const contentWidth = canvas.width;
    const contentHeight = canvas.height;
    // 一页pdf显示html页面生成的canvas高度;
    const pageHeight = (contentWidth / 592.28) * 841.89;
    // 未生成pdf的html页面高度
    let leftHeight = contentHeight;
    // 页面偏移
    let position = 0;
    // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
    const imgWidth = 595.28;
    const imgHeight = (595.28 / contentWidth) * contentHeight;
    // const ctx: any = canvas.getContext('2d');
    // 添加水印
    // ctx.textAlign = 'center';
    // ctx.textBaseline = 'middle';
    // ctx.rotate((25 * Math.PI) / 180);
    // ctx.font = '20px Microsoft Yahei';
    // ctx.fillStyle = 'rgba(184, 184, 184, 0.8)';
    // for (let i = contentWidth * -1; i < contentWidth; i += 240) {
    //   for (let j = contentHeight * -1; j < contentHeight; j += 100) {
    //     // 填充文字，x 间距, y 间距
    //     ctx.fillText('selefra-cloud', i, j);
    //   }
    // }
    const pageData = canvas.toDataURL('image/jpeg', 1.0);
    const pdf = new JsPDF('p', 'pt', 'a4');
    if (leftHeight < pageHeight) {
      // 在pdf.addImage(pageData, 'JPEG', 左，上，宽度，高度)设置在pdf中显示；
      pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
    } else {
    // 分页
      while (leftHeight > 0) {
        pdf.addImage(
          pageData,
          'JPEG',
          0,
          position,
          imgWidth,
          imgHeight,
        );
        leftHeight -= pageHeight;
        position -= 841.89;
        // 避免添加空白页
        if (leftHeight > 0) {
          pdf.addPage();
        }
      }
    }
    // 可动态生成
    pdf.save('文件名.pdf');
  });
}

const cropCanvas = (
  canvas: any,
  contentWidth: any,
  contentHeight: any,
  positionTop: any,
  hasPos: any,
) => {
  const ctx = canvas.getContext('2d');
  // 新canvas控件- 保存裁剪后的图片
  const newCanvas = document.createElement('canvas');
  const newCtx: any = newCanvas.getContext('2d');
  newCanvas.setAttribute('width', contentWidth);
  newCanvas.setAttribute('height', contentHeight);
  // 导出的pdf默认黑色背景，需要用白色填充
  newCtx.fillStyle = '#FFFFFF';
  newCtx.fillRect(0, 0, contentWidth, contentHeight);
  // hasPos-3 防止截取掉表格title的最上方1px
  const imgRgbData = ctx.getImageData(0, hasPos > 0 ? (hasPos - 3) : hasPos, contentWidth, positionTop);
  console.log('positionTop=', positionTop, ' hasPos=', hasPos);
  // 把裁剪后的像素数据渲染到新canvas
  newCtx.putImageData(imgRgbData, 0, 0);
  // 获取裁剪后图片的base64数据
  const imgBase64 = newCanvas.toDataURL('image/jpeg', 1.0);
  return imgBase64;
}
const daYinprint = () => {
  // exportPDF()
  // handlePrint('printMe', false)
  // outputPDF(
  //   {
  //     element: document.querySelector('#printMe'),
  //     contentWidth: 550,
  //     footer: document.querySelector('#footer'),
  //     header: document.querySelector('#header'),
  //   },
  // )
  downloadPDF1(document.querySelector('#printMe'), 'benchmark');
  // let iframe = document.getElementById('print-iframe');
  // if (!iframe) {
  //   const el = document.getElementById('printMe');
  //   iframe = document.createElement('IFRAME');
  //   let doc = null;
  //   iframe.setAttribute('id', 'print-iframe');
  //   iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;');
  //   document.body.appendChild(iframe);
  //   doc = (iframe as any).contentWindow.document;
  //   // 这里可以自定义样式
  //   doc.write('<style media="print">@page {size: auto;margin: 0mm;}</style>'); // 解决出现页眉页脚和路径的问题
  //   doc.write(`<div>${(el as HTMLElement).innerHTML}</div>`);
  //   doc.close();
  //   (iframe as any).contentWindow.focus();
  // }
  // setTimeout(() => { (iframe as any).contentWindow.print(); }, 5000) // 解决第一次样式不生效的问题
  // if (navigator.userAgent.indexOf('MSIE') > 0) {
  //   document.body.removeChild(iframe);
  // }
}
const setInter = ref<any>()

onMounted(() => {
  gettestscores()
  getloopholeList()
  getloopholeTotal()
  getPhoto()
  getoperationList()
  getoperationListTotal()
  getMessageload()
  setInter.value = setInterval(() => {
    getPhoto()
  }, 5000)
})
onUnmounted(() => {
// 轮询结束
  if (setInter.value) {
    clearInterval(setInter.value)
  }
})
</script>

  <style scoped lang="scss">
  .content{
      display: flex;
      width: 100%;
      margin: 0 auto;
      padding: 16px;
      overflow: auto;
      // max-width: 1200px;
      // margin-top: 24px;
      // padding:40px;
      .left{
        width: 70%;
        min-width: 960px;
        flex: 1;
        padding: 10px;
      }
      .right{
        display: flex;
        flex-direction: column;
        width: 30%;
        padding-left: 10px;
        border-left: 1px solid #f0f0f0;
      }
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
          flex-direction: column;
          gap: 16px;
          height: 600px;
          >div{
            flex: 1;
            height: 300px;
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
              padding: 16px 0;
              box-sizing: border-box;
            }
          }
        }
      }
      .table_three{
        margin-top: 32px;
        margin-bottom: 24px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        .select{
          display: flex;
          flex-direction: column;
          align-items: center;
          padding:0 24px;
          gap: 16px;
          >div{
            flex: 1;
            width: 100%;
          }
        }
        .KeepCpu{
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          .baifenbi{
            border: 1px solid #ccc;
            border-radius: 4px;
            height: 28px;
            display: flex;
            align-items: center;
            padding: 0 5px;
            :deep(.el-input){
              border: none;
              box-shadow: none;
              height: 24px;
              .el-input__wrapper{
                border: none;
                box-shadow: none;
                height: 24px;
                width: 60px;
              }
            }
          }
        }
      }
  }
  </style>
