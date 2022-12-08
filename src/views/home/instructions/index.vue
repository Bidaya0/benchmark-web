<template>
  <div class="content">
    <div class="neirong">
      <h2> 靶场设计初衷：</h2>
      <p> 验证安全检测产品对业务系统以及功能测试的影响程度。</p>
      <p> 目前，市面上存在琳琅满目的安全检测产品，无入侵成了很多安全检测产品努力的方向，但是目前已有的靶场均验证漏洞检测能力为主，缺少一款以检测安全产品对业务系统影响程度的检测基准产品。</p>
      <h2> 靶场使用方式：</h2>
      <p> 为了区分脏数据和正常业务数据，针对创建和编辑数据场景，所有输入的数据均由后端标记生成；针对删除数据场景，请在执行测试阶段模拟测试工程师点击“删除”按钮，删除数据。</p>
      <h2> 脏数据计算逻辑：</h2>
      <p> 添加数据时，所有非后端生成的数据均计算为脏数据。删除数据时，非点击页面删除的数据均计算为误删。</p>
      <h2> 评分标准：</h2>
      <p> 功能测试影响得分 = 100 - 脏数据量 - 0.1 * 访问量</p>
      <p>
        S &gt;= 95分
      </p><p>
        A &gt;= 90分
      </p><p>
        B &gt;= 85分
      </p><p> C &gt;= 80分</p>
      <p>
        D &lt; 80分
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  onMounted, reactive, ref, markRaw,
} from 'vue' // introjs主题

const randerEchart = async () => {

}

onMounted(() => {
  randerEchart()
})
</script>

<style scoped lang="scss">
.content{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    .neirong{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        width: 60%;
        gap:24px;
        padding:48px 24px;
        >p{
            text-indent:2em;
            word-wrap: break-word;
            text-transform: none;
            font-family: 'PingFangSC-Regular', 'PingFang SC', sans-serif;
            font-weight: 500;
            font-style: normal;
            font-size: 18px;
            text-align: left;
            color: #333333;
        }
    }
}
</style>
