<template>
  <main class="container">
    <div class="home">
      vue3-app {{ $t("home.name") }}
    </div>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{ langType[language] }}
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="zhCn">
            中文
          </el-dropdown-item>
          <el-dropdown-item command="en">
            English
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <section
      class="header someDialogClass"
    >
      {{ msg }}
      <iconpark-icon name="miyao" />
      <el-button
        type="primary"
      >
        立即认证
      </el-button>
      <el-input
        v-model="msg"
      />
      <button class="button-back-btn">
        sss
      </button>
    </section>
    <section
      id="step4"
      class="conter"
    >
      {{ count }}
      <div
        id="step1"
        class="warper"
      >
        第1步
      </div>
      <div
        id="step2"
        class="warper"
      >
        第2步
      </div>
      <div
        id="step3"
        class="warper"
      >
        第3步
      </div>
    </section>
  </main>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue' // introjs主题
import IntroJs from 'intro.js' // introjs库
import 'intro.js/introjs.css' // introjs默认css样式
// introjs还提供了多种主题，可以通过以下方式引入
import 'intro.js/themes/introjs-modern.css'
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';

const msg = ref('Hello')
const count = ref(710)

const store = useStore();
const language = computed(() => store.getters.language);

const langType = ref<any>({
  zhCn: '中文',
  en: 'English',
})
const { locale } = useI18n(); // vue-i18n提供了一个钩子函数 useI18n(),暴露出locale属性用于切换语言
const handleCommand = (value: string) => {
  store.dispatch('languageChange', 'en');

  locale.value = value;// 要切换的语言
};
onMounted(() => {
  IntroJs().setOptions({
    prevLabel: '上一步',
    nextLabel: '下一步',
    skipLabel: '跳过',
    doneLabel: '完成',
    /* 引导说明框相对高亮说明区域的位置 */
    tooltipPosition: 'bottom',
    /* 引导说明文本框的样式 */
    tooltipClass: 'intro-tooltip', // 用于设置全局的样式
    /* 说明高亮区域的样式 */
    highlightClass: 'intro-highlight',
    /* 引导说明框相对高亮说明区域的位置 */
    /* 是否使用键盘Esc退出 */
    exitOnEsc: true,
    /* 是否允许点击空白处退出 */
    exitOnOverlayClick: false,
    /* 提示边框的padding */
    helperElementPadding: 2,
    /* 是否显示说明的数据步骤 */
    showStepNumbers: false,
    /* 是否允许键盘来操作 */
    keyboardNavigation: true,
    /* 是否按键来操作 */
    showButtons: true,
    /* 是否使用点显示进度 */
    showBullets: false,
    /* 是否显示进度条 */
    showProgress: false,
    /* 是否滑动到高亮的区域 */
    scrollToElement: true,
    /* 遮罩层的透明度 */
    overlayOpacity: 0.9,
    /* 当位置选择自动的时候，位置排列的优先级 */
    positionPrecedence: ['bottom', 'top', 'right', 'left'],
    /* 是否禁止与元素的相互关联 */
    disableInteraction: false,
    /* 是否在第一步隐藏上一步 */
    // hidePrev: true,
    /* 是否在最后一步隐藏下一步 */
    // hideNext: true,
    /* steps步骤，可以写个工具类保存起来 */
    steps: [
      {
        // title: 'Welcome',
        element: '#step1',
        intro: '步骤1：step1!',
        position: 'bottom',
      },
      {
        element: '#step2',
        intro: '步骤2：step2!',
        position: 'bottom',
      },
      {
        element: '#step3',
        intro: '步骤3：step3!',
        position: 'bottom',
      },
      {
        element: '#step4',
        intro: `<div class="intro4">
            你好
            <img src="https://images.unsplash.com/photo-1608096299210-db7e38487075?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" />
        </div>`,
        position: 'bottom',
      },
    ],
  }).oncomplete(() => {
    // 点击结束按钮后执行的事件
    console.log('oncomplete');
  }).onexit(() => {
    // 点击跳过按钮后执行的事件
    console.log('onexit');
  })
    .onchange(() => {
    // 点击下一步执行的事件
      console.log('onchange');
    })
    .start();
  // locale.value = 'en';
})
// i18n
</script>

<style scoped lang="scss">
  .container{
    font-family: 'Helvetica Neue';
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    color: #171B23;
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
