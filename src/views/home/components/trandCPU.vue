<template>
  <main
    id="trandCPU"
    style="width: 100%;height: 100%;"
  />
</template>

<script setup lang="ts">
import {
  onMounted, reactive, ref, markRaw, watch,
} from 'vue' // introjs主题

import { ECharts } from 'echarts';

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});
const data = ref<any>({
  XData: ['06-29', '06-30', '07-01', '07-02', '07-03', '07-04', '07-05'],
  YHData: [383, 127, 222, 220, 0, 70, 80],
  YMData: [83, 127, 22, 220, 0, 10, 200],
})
watch(
  () => props.data,
  () => {
    console.log(props.data)
    data.value = props.data
    randerEchart()
  },
  { deep: true },
)
const scatterChart = ref<ECharts | null>(null);
const pngUrl = ref<any>('')
const showAnimation = ref<boolean>(true)

const randerEchart = async () => {
  const colorMap = {
    1: '#E56363',
    2: '#F49E0B',
    3: '#2F90EA',
    5: '#ACB4C4',
  }
  const option: any = {
    animation: showAnimation.value,
    tooltip: {
      trigger: 'axis',
      className: 'echart-tooltip-content',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
      // formatter: (params: any) => {
      // },
    },
    legend: {
      icon: 'rect',
      itemHeight: 4,
      itemWidth: 20,
      itemGap: 20,
      bottom: '0',
      data: ['负载进程', '自身进程'],
    },
    grid: {
      left: '2%',
      right: '4%',
      bottom: '8%',
      top: '8%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: data.value.XData,
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: '#B6BBC5',
          },
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        type: 'line',
        layoutAnimation: showAnimation.value,
        markLine: {
          symbol: ['none', 'none'],
          silent: true,
          label: { show: false },
          itemStyle: {
            normal: {
              color: '#F2F3F5',
            },
          },
          data: [
            { xAxis: 0 },
            { xAxis: 1 },
            { xAxis: 2 },
            { xAxis: 3 },
            { xAxis: 4 },
            { xAxis: 5 },
            { xAxis: 6 },
          ],
        },
      },
      {
        name: '负载进程',
        type: 'line',
        symbol: 'circle',
        symbolSize: 0,
        smooth: true,
        color: ['rgba(15, 198, 194, 1)'],
        itemStyle: {
          borderColor: '#ffffff',
          borderType: 'solid',
          borderWidth: '1',
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 1,
            x2: 0,
            y2: 0,
            colorStops: [{
              offset: 0, color: 'rgba(15, 198, 194, 0.66)', // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(255,255,255,0)', // 100% 处的颜色
            }],
            global: false, // 缺省为 false
          },
        },
        emphasis: {
          focus: 'series',
        },
        data: data.value.YHData,
      },
      {
        name: '自身进程',
        type: 'line',
        symbol: 'circle',
        symbolSize: 0,
        smooth: true,
        color: ['rgba(26, 134, 238, 1)'],
        itemStyle: {
          borderColor: '#ffffff',
          borderType: 'solid',
          borderWidth: '1',
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 1,
            x2: 0,
            y2: 0,
            colorStops: [{
              offset: 0, color: 'rgba(26, 134, 238, 0.66)', // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(255,255,255,0)', // 100% 处的颜色
            }],
            global: false, // 缺省为 false
          },

        },
        emphasis: {
          focus: 'series',
        },
        data: data.value.YMData,
      },
    ],
  }
  const dom = (document as any).getElementById('trandCPU')
  if (!dom) {
    return
  }
  const echarts = await import('echarts');
  scatterChart.value = markRaw(echarts.init((document as any).getElementById('trandCPU')));
  scatterChart.value?.setOption(option as any, true);
  pngUrl.value = scatterChart.value.getDataURL()
}

onMounted(() => {
  // randerEchart()
})
</script>

<style scoped lang="scss">

</style>
