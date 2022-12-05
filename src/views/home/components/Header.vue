<template>
  <div
    class="header-warp"
  >
    <header>
      <div class="title">
        <div
          class="title_index"
          @click="goIndex"
        >
          零入侵安全检测 benchmark
        </div>
        <div
          class="title_right"
          @click="goInstructions"
        >
          使用说明
        </div>
      </div>

      <!-- <div
        v-show="route.meta.name==='index'"
        class="title_score"
      >
        总得分：<span>{{ scoreObj.grade }}</span>（{{ scoreObj.score }}分）
      </div> -->
    </header>
  </div>
</template>
<script lang="ts" setup>

import {
  ref, onMounted, watch, computed, nextTick, onUnmounted,
} from 'vue';
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router';
import { useStore } from 'vuex';
import { useDebounceFn } from '@vueuse/core';
import { ElMessage } from 'element-plus';

const props = defineProps({
  scoreObj: {
    type: Object,
    default: () => ({}),
  },
});
watch(
  () => props.scoreObj,
  () => {
  },
  { deep: true },
)
const router = useRouter();
const route = useRoute();

const store = useStore();

// const orgInfo = computed(() => store.getters.orgInfo || null);
// 去往github页面
const goIndex = () => {
  router.push('/index')
}
const goInstructions = () => {
  router.push('/instructions')
}
const goDocs = () => {
  window.open('https://selefra.io/docs', '_blank')
}
onMounted(() => {
  window.addEventListener('scroll', debounceFn);
});

onUnmounted(() => {
  window.removeEventListener('scroll', debounceFn);
});

const notTop = ref(false);
const debounceFn = useDebounceFn(() => {
  notTop.value = document.documentElement.scrollTop > 0;
}, 0);

</script>
<style lang="scss" scoped>
header{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0px -1px 0px #f0f0f0;
  padding:0 124px;
  box-sizing: border-box;
  height: 114px;
  max-width: 100%;
  margin: 0 auto;
  font-family: 'Arial-BoldMT', 'Arial Bold', 'Arial', sans-serif;
  font-weight: 700;
  letter-spacing: normal;
  color: #333333;
  font-size: 32px;
  position: relative;
  gap: 16px;
  .title{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  .title_index{
    cursor: pointer;
  }
  .title_right{
    position: absolute;
    right: 48px;
    font-size: 16px;
    color: #169BD5;
    cursor: pointer;
  }
  .title_score{
    display: flex;
    position: absolute;
    bottom: 16px;
    right: 148px;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC', sans-serif;
    font-weight: 650;
    font-style: normal;
    font-size: 18px;
    span{
      color:#70B603;
    }
  }
}
</style>
