<template>
  <main
    id="scale"
    style="width: 400px; height: 230px"
  />
</template>
<script setup lang="ts">
import {
  onMounted, reactive, ref, markRaw,
} from 'vue' // introjs主题
import { ECharts } from 'echarts';
import { useRouter } from 'vue-router';

const obj = reactive<any>({
  高危漏洞: 10,
  中危漏洞: 20,
  低危漏洞: 30,
  提示信息: 40,
})
const total = ref<any>(100)
const showAnimation = ref<Boolean>(true)
const scatterChart = ref<ECharts | null>(null);
const pngUrl = ref<any>()
const router = useRouter();
const randerEchart = async () => {
  const option = {
    animation: showAnimation.value,
    legend: {
      show: true,
      data: ['高危', '中危', '低危', '提示'],
      bottom: 0,
      // selected: {
      //   高危: this.obj['高危漏洞'] !== 0,
      //   中危: this.obj['中危漏洞'] !== 0,
      //   低危: this.obj['低危漏洞'] !== 0,
      //   提示: this.obj['提示信息'] !== 0,
      // },
    },
    polar: {
      radius: [0, '90%'],
      center: ['50%', '45%'],
    },
    angleAxis: {
      max: total.value,
      show: false,
    },
    radiusAxis: {
      type: 'category',
      show: false,
    },
    tooltip: {
      borderColor: '#fff',
      formatter: (params: any) => `
            <div style="display: flex;align-items: center;justify-content: space-between;width:160px; ">
                <p style="display: flex;width:100px; align-items: center;position:relative;padding-left:16px">
                <span style="display:inlie-block;width:8px;height:8px;background:${params.color}; border-radius:50%;position:absolute;left:0;top:7px;"></span>
                <span style="display:inline-block;white-space:pre-wrap;width:100px;color: #959FB4;">${params.seriesName}</span><span style="color: #38435A;margin-right: 8px;">${params.value}</span></p>
                <p style="color:#959FB4">(${((params.value / total.value) * 100).toFixed(2)}%)</p>
                </div>
                `,
    },
    series: [
      {
        layoutAnimation: showAnimation.value,
        name: '提示',
        type: 'bar',
        barGap: 1,
        coordinateSystem: 'polar',
        showBackground: true,
        roundCap: true,
        backgroundStyle: {
          color: 'rgba(242, 243, 245, 1)',
        },
        itemStyle: {
          color: 'rgba(171, 178, 192, 1)',
        },
        data: [obj['提示信息']],
      },
      {
        layoutAnimation: showAnimation.value,

        name: '低危',
        type: 'bar',
        coordinateSystem: 'polar',
        showBackground: true,
        roundCap: true,
        backgroundStyle: {
          color: 'rgba(242, 243, 245, 1)',
        },
        itemStyle: {
          color: 'rgba(47, 144, 234, 1)',
        },
        data: [obj['低危漏洞']],
      },
      {
        layoutAnimation: showAnimation.value,

        name: '中危',
        type: 'bar',
        coordinateSystem: 'polar',
        showBackground: true,
        roundCap: true,
        backgroundStyle: {
          color: 'rgba(242, 243, 245, 1)',
        },
        itemStyle: {
          color: 'rgba(244, 158, 11, 1)',
        },
        data: [obj['中危漏洞']],
      },
      {
        layoutAnimation: showAnimation.value,

        name: '高危',
        type: 'bar',
        coordinateSystem: 'polar',
        showBackground: true,
        roundCap: true,
        backgroundStyle: {
          color: 'rgba(242, 243, 245, 1)',
        },
        itemStyle: {
          color: 'rgba(229, 99, 99, 1)',
        },
        data: [obj['高危漏洞']],
      },
    ],
  }
  const dom = (document as any).getElementById('scale')
  if (!dom) {
    return
  }
  const echarts = await import('echarts');
  scatterChart.value = markRaw(echarts.init((document as any).getElementById('scale')));
  scatterChart.value?.setOption(option as any, true);
  pngUrl.value = scatterChart.value.getDataURL()
  //   console.log('pngUrl.value ', pngUrl.value)
  scatterChart.value.off('click')
  scatterChart.value.on('click', (params: any) => {
    switch (params.seriesName) {
      case '高危':
        router.push({
          path: '/echarts',
          query: { level_id: 1, vulnType: 'sca' } as any,
        })
        break
      case '中危':
        router.push({
          path: '/echarts',
          query: { level_id: 2, vulnType: 'sca' } as any,
        })
        break
      case '低危':
        router.push({
          path: '/echarts',
          query: { level_id: 3, vulnType: 'sca' } as any,
        })
        break
      case '提示':
        router.push({
          path: '/echarts',
          query: { level_id: 5, vulnType: 'sca' } as any,
        })
        break
      default:
        break
    }
  })
}
onMounted(() => {
  randerEchart()
})
</script>

<style scoped lang="scss">

</style>
