<template>
  <div>
    <p class="title">
      上传列表
    </p>

    <div class="head_box">
      <el-upload
        action=""
        :auto-upload="false"
        :on-change="handleChange"
        :show-file-list="false"
        multiple
      >
        <el-button
          size="small"
          type="primary"
        >
          点击上传
        </el-button>
      </el-upload>

      <div
        v-if="isShow"
        class="head_btn"
      >
        <el-button
          class="tag"
          type="primary"
          plain
          :disabled="
            fileList.length === 0 ||
              fileList.every((item) => item.fileStatus === 5) ||
              !fileList.some(
                (item) => item.fileStatus === 3 || item.fileStatus === 4)
          "
          @click="allContinueUpload"
        >
          全部继续
        </el-button>
        <el-button
          class="tag"
          type="info"
          plain
          :disabled="
            fileList.length === 0 ||
              fileList.every((item) => item.fileStatus === 5) ||
              !fileList.some(
                (item) => item.fileStatus === 1 || item.fileStatus === 2)
          "
          @click="allSuspendUpload"
        >
          全部暂停
        </el-button>

        <el-button
          class="tag"
          type="danger"
          plain
          :disabled="fileList.length === 0"
          @click="allCancelUpload"
        >
          全部取消
        </el-button>
      </div>
    </div>

    <div
      v-if="isShow"
      class="table_box"
    >
      <el-table
        :data="fileList"
        style="width: 100%"
        :row-key="(row) => row.uid"
        border
      >
        <el-table-column
          prop="uid"
          label="uid"
        />
        <el-table-column
          prop="fileName"
          label="文件名"
        />
        <el-table-column
          prop="fileType"
          label="文件类型"
        />
        <el-table-column label="文件大小">
          <template #default="scope">
            <p>转换前：{{ scope.row.fileSizeOrigin }}</p>
            <p>转换后：{{ scope.row.fileSize }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="创建时间"
        />
        <el-table-column label="文件状态">
          <!-- 1：上传中 2：等待上传 3：已暂停 4：上传失败 5：已完成 -->
          <template #default="scope">
            <p
              v-if="[1].includes(scope.row.fileStatus)"
              class="percentage"
            >
              {{ scope.row.percentage }}%
            </p>
            <p v-else>
              {{ ["等待上传", "已暂停", "上传失败", "已完成"][scope.row.fileStatus - 2] }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
        >
          <template #default="scope">
            <div class="head_btn">
              <el-tag
                v-if="scope.row.fileStatus == 3"
                class="tag"
                @click.stop="continueUpload(scope.row)"
              >
                继续
              </el-tag>
              <el-tag
                v-if="[1, 2].includes(scope.row.fileStatus)"
                class="tag"
                type="info"
                @click.stop="suspendUpload(scope.row)"
              >
                暂停
              </el-tag>
              <el-tag
                class="tag"
                type="danger"
                @click.stop="cancelUpload(scope.row)"
              >
                取消
              </el-tag>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UploadList',
  data() {
    return {
      fileList: [],
      isShow: true,
    };
  },

  methods: {
    // 全部继续上传
    allContinueUpload() {
      this.allContinueUploadSuspendUpload(1);
    },

    // 全部暂停上传
    allSuspendUpload() {
      this.allContinueUploadSuspendUpload(2);
    },

    // 封装全部继续上传和暂停上传
    allContinueUploadSuspendUpload(type) {
      const fileList = this.fileList;

      for (let i = 0; i < fileList.length; i++) {
        const item = fileList[i];
        if (type === 1) {
          this.continueUpload(item);
        } else {
          this.suspendUpload(item);
        }
      }
    },

    // 全部取消上传
    allCancelUpload() {
      this.encapsulationCancelUpload({}, 2);
    },

    // 封装全部取消上传和取消上传
    encapsulationCancelUpload(row, type) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          if (type === 1) {
            const i = this.fileList.findIndex((item) => item.uid === row.uid);

            if (i >= 0) {
              this.fileList.splice(i, 1);
              this.$forceUpdate();
              this.$message({
                type: 'success',
                message: '删除成功!',
              });

              this.autoUpload();
            }
          } else {
            this.fileList = [];
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },

    // 取消上传
    cancelUpload(row) {
      this.encapsulationCancelUpload(row, 1);
    },

    // 暂停上传
    suspendUpload(row) {
      if (row.fileStatus !== 5) {
        row.fileStatus = 3;
        this.isShow = false;

        // eslint-disable-next-line no-return-assign
        this.$nextTick(() => (this.autoUpload(), (this.isShow = true), clearInterval(row.time)));
      }
    },

    // 继续上传
    continueUpload(row) {
      this.isShow = false;

      if (row.fileStatus !== 5) {
        if (this.taskExecution() < 2) {
          row.fileStatus = 1;

          this.$nextTick(() => {
            this.isShow = true;

            row.time = setInterval(() => {
              if (row.percentage >= 100) {
                this.isShow = false;
                row.fileStatus = 5;
                this.$nextTick(() => {
                  this.isShow = true;
                  this.autoUpload();
                  clearInterval(row.time);
                });
              }

              row.percentage += 5;
            }, 1000);
          });
        } else {
          row.fileStatus = 2;

          // eslint-disable-next-line no-return-assign
          this.$nextTick(() => (this.isShow = true));
        }
      }
    },

    // 封装检测任务列表当前正在执行的任务
    taskExecution() {
      const fileList = this.fileList;
      let num = 0;

      for (let i = 0; i < fileList.length; i++) {
        const item = fileList[i];

        if (item.fileStatus === 1) num += 1;
      }

      return num;
    },

    // 封装自动上传
    autoUpload() {
      const fileList = this.fileList;

      for (let i = 0; i < fileList.length; i++) {
        const item = fileList[i];
        if (item.fileStatus === 2 && this.taskExecution() < 2) this.continueUpload(item);
      }
    },

    // 选择文件
    handleChange(event) {
      event.fileSizeOrigin = `${event.size}B`;
      // event.fileSize = this.$functionalModule.bytesToSize(event.size);
      event.fileName = event.name.substring(0, event.name.lastIndexOf('.'));
      event.fileType = event.name.split('.').pop();
      // event.createDate = this.$functionalModule.timeDateFormat();

      this.fileList.unshift(event);
      // 继续上传
      this.continueUpload(event);
    },
  },
};

</script>
<style lang="scss">
.title {
    color: #606266;
    font-size: 24px;
}

.head_box {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.head_btn {
    .tag {
        margin-left: 10px;
        cursor: pointer;
    }
}

.table_box {
    margin-top: 17px;

    .percentage {
        color: #409eff;
    }
}

</style>
