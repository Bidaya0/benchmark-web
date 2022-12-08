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
