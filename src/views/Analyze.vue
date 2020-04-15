<template>
  <el-table :data="tasks">
    <el-table-column prop="Name" label="任务名"> </el-table-column>
    <el-table-column prop="StartTime" label="开始时间"> </el-table-column>
    <el-table-column prop="EndTime" label="结束时间"> </el-table-column>
    <el-table-column label="进度">
      <template slot-scope="scope">
        <el-progress :percentage="(scope.row.Status + 1) * 25"></el-progress>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <div v-if="scope.row.Status == 3">
          <router-link :to="'show/' + scope.row.Id">分析</router-link>
          &nbsp;&nbsp;
          <a
            :href="'/v1/task/' + scope.row.Id + '?is_emerging=0'"
            target="_blank"
            >全部用户下载</a
          >
          &nbsp;&nbsp;
          <a
            :href="'/v1/task/' + scope.row.Id + '?is_emerging=1'"
            target="_blank"
            >新用户下载</a
          >
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tasks: []
    };
  },
  methods: {
    getTasks() {
      this.axios
        .get('/v1/task')
        .then((response) => {
          this.tasks = response.data;
        })
        .catch((err) => {
          this.$message.error('获取任务数据失败');
          console.log(err.response.data);
        });
    }
  },
  mounted() {
    this.getTasks();
  }
};
</script>

<style lang="less" scoped></style>
