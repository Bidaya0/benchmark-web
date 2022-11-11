<template>
  <main class="container">
    <input
      type="file"
      multiple
      @change="handleFileChange"
    >
    <el-button @click="handleUpload">
      上传
    </el-button>
    <el-button @click="pauseUpload">
      暂停
    </el-button>
    <el-button @click="keepUpload">
      续传
    </el-button>
    <div
      v-show="totalPercent"
      style="width: 300px"
    >
      总进度：
      <el-progress :percentage="totalPercent" />
      <!-- 切片进度：
      <div
        v-for="item in fileObj.chunkList"
        :key="item"
      >
        <span>{{ item.chunkName }}：</span>
        <el-progress :percentage="item.percent" />
      </div> -->
    </div>
  </main>
</template>
<script setup lang="ts">
import {
  computed, onMounted, reactive, ref,
} from 'vue'
import { ElMessage } from 'element-plus'
import { axiosRequest, pauseUpload } from '@/api/user'

const keepUpload = async () => {
  const { uploadedList } = await verifyUpload(
    fileObj.file.name,
  );
  console.log(uploadedList)
  uploadChunks(uploadedList);
}
// introjs主题
const fileObj = reactive<any>({ file: null })
const handleFileChange = (e:any) => {
  const [file] = e.target.files
  if (!file) return
  fileObj.file = file
}
const totalPercent = computed(() => {
  if (fileObj?.chunkList?.length === 0) return 0;
  const loaded = fileObj?.chunkList?.map(({ size, percent }:any) => size * percent)?.reduce((pre:any, next:any) => pre + next);
  console.log('loaded', fileObj, fileObj?.chunkList, loaded)
  return fileObj.file?.size ? parseInt((loaded / fileObj.file.size).toFixed(2), 10) : 0;
});
const createChunk = (file:any, size = 5 * 1024 * 1024) => {
  const chunkList = []
  let cur = 0
  while (cur < file.size) {
    // 使用slice方法切片
    chunkList.push({ file: file.slice(cur, cur + size) })
    cur += size
  }
  return chunkList
}

const mergeChunks = async (size = 5 * 1024 * 1024) => {
  axiosRequest({
    url: 'http://localhost:3000/merge',
    headers: {
      'content-type': 'application/json',
    },
    data: JSON.stringify({
      size,
      fileName: fileObj.file.name,
    }),
  })
}
const uploadChunks = async (uploadedList?:any) => {
  const requestList = fileObj.chunkList?.filter((item:any) => !uploadedList?.find((obj:any) => obj.chunkName === item.chunkName))
  console.log('requestList', requestList)
  requestList?.map(({
    file, fileName, index, chunkName,
  }:any) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('chunkName', chunkName);
    return { formData, index };
  })
    .map(async ({ formData, index }:any) => await axiosRequest({
      url: 'http://localhost:3000/upload',
      data: formData,
      onUploadProgress: createProgressHandler(
        fileObj.chunkList[index],
      ), // 传入监听上传进度回调
    }));
  await Promise.all(requestList);
  mergeChunks()
}
// 妙传
const verifyUpload = async (fileName:any) => {
  const { data }:any = await axiosRequest({
    url: 'http://localhost:3000/verify',
    headers: {
      'content-type': 'application/json',
    },
    data: JSON.stringify({
      fileName,
    }),
  });
  return data
}
const createProgressHandler = (item:any) => (e:any) => {
  // 设置每一个切片的进度百分比
  item.percent = parseInt(String((e.loaded / e.total) * 100), 10);
}

const handleUpload = async () => {
  if (!fileObj.file) return
  const { shouldUpload } = await verifyUpload(
    fileObj.file.name,
  );
  if (!shouldUpload) {
    ElMessage.success('秒传：上传成功');
    return;
  }
  const chunkList = createChunk(fileObj.file)
  console.log(chunkList) // 看看chunkList长什么样子
  fileObj.chunkList = chunkList.map(({ file }, index) => ({
    file,
    size: file.size,
    percent: 0,
    chunkName: `${fileObj.file.name}-${index}`,
    fileName: fileObj.file.name,
    index,
  }));
  uploadChunks(); // 执行上传切片的操作
}
onMounted(() => {
  console.log(111)
})
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

</style>
