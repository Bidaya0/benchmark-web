<template>
  <div id="aaa" />
</template>

<script lang="ts" setup>
// import NiceMonacoTree from 'nice-monaco-tree';
// import { onMounted } from 'vue';

// onMounted(() => {
//   const monacoTree = NiceMonacoTree.init(document.getElementById('aaa'), {
//     fileList: ['package.json', 'README.md', 'src/test.js', 'src/index.js'],
//     onClick: (file:any) => {
//       console.log(111, file);
//     },
//     onDoubleClick: (file:any) => {
//       console.log(222, file);
//     },
//   });
//   console.log(111)
//   monacoTree.setSelection('public/js/ui.js'); // 选中某个文件
//   monacoTree.getSelection(); // 获取当前选中的文件
//   monacoTree.expandAll(); // 递归展开所有文件夹
//   monacoTree.expandFolder('public/js'); // 展开某个文件夹
//   monacoTree.collapseAll(); // 递归收起所有文件夹
//   monacoTree.collapseFolder('public/js'); // 收起某个文件夹
//   monacoTree.getTree(); // 获取底层tree实例，上面挂载了很多方法和事件
// })

</script>
<style lang="scss">
#aaa{
  width: 400px;
  height: 400px;
  border: 1px solid #000;
}
</style>
