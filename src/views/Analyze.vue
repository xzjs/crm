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
        <router-link :to="'show/' + scope.row.Id">分析</router-link>
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
