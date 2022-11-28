<template>
  <main class="container">
    <AppHeader :score-obj="scoreObj" />
    <div class="container">
      <div class="main">
        <router-view />
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue' // introjs主题
import { useStore } from 'vuex';
import AppHeader from './components/Header.vue';

const store = useStore();
const scoreObj = ref<any>({
  score: '95',
  grade: 'S',
})
onMounted(() => {
})
</script>

<style scoped lang="scss">
  .container{
    font-family: 'Helvetica Neue';
    color: #171B23;
    width: 100%;
    height: 100vh;
    min-width: 1200px;
    display: flex;
    // overflow: hidden;
    flex-direction: column;
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
