<template>
  <main class="container">
    <img v-lazy="'/src/assets/images/index/banner.png'">

    <div class="parant">
      <img
        v-lazy="'/src/assets/images/index/banner.png'"
        class="img1"
      >
      <div class="child1" />
      <div class="child2" />
      <div class="child3" />
      <canvas
        id="canvas5"
        height="400"
        width="400"
      />
    </div>
  </main>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue' // introjs主题

const canvas = ref<any>()
const van = ref<any>()
const offSet = ref<any>(0);
const drawArcDash = () => {
  // 清除矩形内所有内容
  van.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
  // 开始一次绘制
  van.value.beginPath();
  // 设置虚线4-2-4-2排列
  van.value.setLineDash([10, 4, 2]);
  // 设置虚线偏移量
  van.value.lineDashOffset = -offSet.value;
  van.value.strokeStyle = 'red'
  // 绘制圆形
  van.value.arc(200, 200, 200, 0, Math.PI * 2);
  van.value.stroke();
  van.value.closePath();
  van.value.beginPath();
  van.value.setLineDash([20, 3]);
  van.value.strokeStyle = 'blue'
  van.value.arc(200, 200, 170, 0, Math.PI * 2);
  van.value.stroke();
  van.value.closePath();
  van.value.beginPath();
  van.value.setLineDash([40, 3]);
  van.value.strokeStyle = 'yellow'
  van.value.arc(200, 200, 140, 0, Math.PI * 2);
  // 执行绘制
  van.value.stroke();
  // 关闭此次绘制
  van.value.closePath();
  // 当偏移量大于16时重归0
  if (offSet.value > 360) {
    offSet.value = 0;
  }
  offSet.value++;
  // 通过setTimeout递归调用绘制
  setTimeout(drawArcDash, 20)
}
onMounted(() => {
  canvas.value = document.getElementById('canvas5');
  if (canvas.value.getContext) {
    van.value = canvas.value.getContext('2d');
    drawArcDash();
  } else {
    alert('不支持')
  }
})
</script>

<style scoped lang="scss">
@keyframes changeright{
  0%{-webkit-transform:rotate(0deg);}

  50%{-webkit-transform:rotate(180deg);}

  100%{-webkit-transform:rotate(360deg);}
}
@keyframes changeleft{
  0%{-webkit-transform:rotate(0deg);}
  50%{-webkit-transform:rotate(-180deg);}

  100%{-webkit-transform:rotate(-360deg);}
}
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
    img{
      width: 200px;
      height: 100px;
    }
  }
  .parant{
    position: relative;
    width: 400px;
    height: 400px;
    border-radius: 400px;
    overflow: hidden;
    #canvas5{
      position: absolute;
      left: -200px;
      top: 0;
    }
    .img1{
      width: 40px;
      height: 40px;
      border-radius: 20px;
      position: absolute;
      left: 126px;
      top: 200px;
      z-index: 1;
    }
    // .child1{
    //   position: absolute;
    //   top: 0px;
    //   left: 0px;
    //   width: 400px;
    //   height: 400px;
    //   border-radius: 400px;
    //   border: 1px dashed #171B23;
    //   animation:changeleft 20s linear infinite;
    // }
    // .child2{
    //   position: absolute;
    //   top: 40px;
    //   left: 40px;
    //   width: 320px;
    //   height: 320px;
    //   border-radius: 320px;
    //   border: 1px dashed #171B23;
    //   animation:changeright 20s linear infinite;
    //   background: linear-gradient(white,white)  padding-box , repeating-linear-gradient(90deg,#000 0, #000 0.2em,#fff 0.2em,#fff 0.4em,#000 0.4em, #000 0.8em,#fff 0.8em,#fff 1em)
    // }
  }
</style>
