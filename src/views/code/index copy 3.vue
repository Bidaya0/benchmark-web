<template>
  <div
    ref="wrapper"
    :class="`monaco-with-tree${isFullScreen ? ' full-screen' : ''}`"
  >
    <split-pane
      v-if="defaultSplitPercent"
      :min-percent="minSplitPercent"
      :default-percent="defaultSplitPercent"
      split="vertical"
      class="monaco-with-tree-splitter"
      @resize="resize"
    >
      <template slot="paneL">
        <div
          ref="menu"
          class="monaco-menu-pane"
        />
      </template>
      <template slot="paneR">
        <div class="monaco-right-pane">
          <!-- insert-to-after：添加tab时插入到当前tab后面 -->
          <vue-tabs-chrome
            ref="tab"
            v-model="currentTab"
            theme="dark"
            :tabs="tabs"
            insert-to-after
          />
          <i
            :class="['btn-fullscreen', 'luyou-icon',
                     isFullScreen ? 'icontuichuquanping' : 'iconquanping1',
                     isFullScreen ? 'fullscreen' : '']"
            @click="toggleFullScreen"
          />
          <!-- monaco初始化的时候高度必须确定好，所以这里用visibility来隐藏 -->
          <div
            ref="monacoId"
            :style="{
              height: `calc(100% - ${tabHeight}px)`,
              visibility: currentTab ? 'visible' : 'hidden'}"
          />
          <div
            v-show="!currentTab"
            class="no-tab-pane"
            :style="{height: `calc(100% - ${tabHeight}px)`}"
          >
            <div class="center-wrapper">
              请从左侧打开一个文件
            </div>
          </div>
        </div>
      </template>
    </split-pane>
  </div>
</template>

<script lang="ts" setup>
import VueTabsChrome from 'vue-tabs-chrome';
import NiceMonacoTree from 'nice-monaco-tree';
import SplitPane from 'vue-splitpane';
import * as monaco from 'monaco-editor';
import {
  computed, onMounted, onUnmounted, ref, watch,
} from 'vue';

const monacoDiffEditor = ref<any>(null);
const monacoEditor = ref<any>(null);
const monacoTree = ref<any>(null);

const props = {
  files: {
    type: Array,
    // default: () => [],
    default: () => ['package.json', 'README.md', 'index.js', 'src/test.js', 'src/index.js', 'public/index.html'],
  },
  // 暂时只支持传一个文件
  defaultOpenFiles: {
    type: Array,
    // default: () => [],
    default: () => ['README.md'],
  },
  readonly: {
    type: Boolean,
    default: true,
  },
  monacoConfig: {
    type: Object,
    default: () => ({}),
  },
}
const defaultOpenFiles = ref<any>(['README.md'])
const files = ref<any>(['package.json', 'README.md', 'index.js', 'src/test.js', 'src/index.js', 'public/index.html'])
const tabHeight = ref<any>(48)
const defaultSplitPercent = ref<any>(0)
const minSplitPercent = ref<any>(0)
const currentTab = ref<any>('')
const tabs = ref<any>([])
const isFullScreen = ref<any>(false)
const tabsMap = computed(() => {
  const map = {};
  tabs.value.forEach((item:any) => { map[item.key] = item });
  return map;
})
const getFileContent = (filePath:any) => [`${filePath}-left`, `${filePath}-right`]
const monacoId = ref<any>()
const initMonacoEditor = (filePath:any) => {
  const resp = getFileContent(filePath);
  const [left, right] = resp instanceof Array ? resp : [resp];
  const modeMap = {
    js: 'javascript',
    json: 'json',
    html: 'html',
    md: 'markdown',
  };
  const ext = filePath.slice(filePath.lastIndexOf('.') + 1);
  const language = modeMap[ext.toLowerCase()] || 'javascript';
  if (!monacoDiffEditor.value) {
    // 如果不是diff模式
    if (!right) {
      monacoEditor.value = monaco.editor.create(monacoId.value as HTMLElement, {
        theme: 'vs-dark',
        fontSize: 13,
        readOnly: true,
        // todo 切换文件时需要修改语言
        language,
      });
    } else {
      monacoDiffEditor.value = monaco.editor.createDiffEditor(monacoId.value, {
        // 禁用分割线resize
        enableSplitViewResizing: false,
        theme: 'vs-dark',
        fontSize: 13,
        readOnly: true,
        automaticLayout: true,
      });
    }
  }
  if (!right) {
    monacoEditor.value.setValue(left);
  } else {
    const original = monaco.editor.createModel(left, language);
    const modified = monaco.editor.createModel(right, language);
    monacoDiffEditor.value.setModel({ original, modified });
  }
}
const tab = ref<any>()
const getFileTitle = (filePath:any) => filePath.split('/').pop()
const openFile = (filePath:any, file?:any, fileIcon?:any, isDoubleClick = true) => {
  // const idx = this.tabs.findIndex(item => item.key === filePath);
  if (tabsMap.value[filePath]) {
    currentTab.value = filePath;
    if (isDoubleClick && tabsMap.value[filePath].tempOpen) {
      tabsMap.value[filePath].tempOpen = false;
    }
  } else {
    if (isDoubleClick) {
      (tab.value as any).addTab({
        label: getFileTitle(filePath),
        key: filePath,
        closable: true,
        // 默认的icon只支持传图片，这里我们直接使用monaco的icon class来实现图标展示
        // 通过设置一个空的favicon来设置一个占位符
        favicon: (h:any) => h('span'),
        class: `monaco-icon-label ${fileIcon}`,
      });
      currentTab.value = filePath;
    }
  }
  initMonacoEditor(filePath);
}
const menu = ref<any>()
const initMonacoTree = () => {
  setTimeout(() => {
    monacoTree.value = NiceMonacoTree.init(menu.value as HTMLElement, {
      files: files.value,
      onClick: (filePath:any, file:any, fileIcon:any) => {
        openFile(filePath, file, fileIcon, true);
      },
      onDoubleClick: (filePath:any, file:any, fileIcon:any) => {
        openFile(filePath, file, fileIcon, true);
      },
    });
    monacoTree.value.expandAll();
    setTimeout(() => {
      if (defaultOpenFiles.value && defaultOpenFiles.value[0]) {
        monacoTree.value.setSelection(defaultOpenFiles.value[0]);
      }
    });
  }, 100);
}
const getMonacoTree = () => monacoTree.value
const wrapper = ref<any>()
watch(
  () => currentTab.value,
  (newValue) => {
    openFile(newValue);
    monacoTree.value.setSelection(newValue);
  },
)
onMounted(() => {
  const totalWith = parseInt(getComputedStyle(wrapper.value as HTMLElement).width, 10) || document.documentElement.offsetWidth;
  defaultSplitPercent.value = (200 / totalWith) * 100;
  minSplitPercent.value = (100 / totalWith) * 100;
  setTimeout(() => {
    initMonacoTree();
  }, 0)
})
// 组件销毁事件
onUnmounted(() => {
  // 销毁编辑器
  monacoDiffEditor.value && monacoDiffEditor.value.dispose();
  monacoEditor.value && monacoEditor.value.dispose();
  monacoDiffEditor.value = null;
  monacoEditor.value = null;
})
const getMonacoDiffEditor = () => monacoDiffEditor.value
// 选中并打开某个文件
const setSelection = (filePath:any) => {
  monacoTree.value && monacoTree.value.setSelection(filePath);
}

const resize = () => {

}
const toggleFullScreen = () => {
  isFullScreen.value = !isFullScreen.value;
}

</script>
<style lang="scss">
.monaco-with-tree {
    height: 100%;
    background: #3a3a3a;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif;
    -webkit-font-smoothing: antialiased;
    &.full-screen {
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh !important;
        z-index: 100000;
    }
    .monaco-menu-pane {
        height: 100%;
    }
    .monaco-right-pane {
        height: 100%;
        position: relative;
        .vue-tabs-chrome {
            *, *::before, *::after {
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
            }
            font-size: 14px;
            .tabs-item.monaco-icon-label::before {
                box-sizing: content-box;
                position: absolute;
                left: 22px;
                top: 5px;
                z-index: 1;
            }
        }
        .no-tab-pane {
            background-color: #1e1e1e;
            text-align: center;
            position: absolute;
            left: 0;
            top: 48px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    .btn-fullscreen {
        position: absolute;
        top: 10px;
        right: 8px;
        z-index: 2000;
        color: white;
        width: 24px;
        height: 24px;
        text-align: center;
        line-height: 24px;
        cursor: pointer;
        opacity: 0.8;
        &.fullscreen {
            position: fixed;
        }
        &:hover {
            opacity: 1;
        }
    }
}
</style>
