<template>
  <el-table :data="records" stripe>
    <el-table-column label="手机号">
      <template slot-scope="scope">{{ scope.row.User.Mobile }}</template>
    </el-table-column>
    <el-table-column prop="Time" label="登录时间"></el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      records: []
    };
  },
  methods: {
    getRecords() {
      this.axios
        .get('/v1/record')
        .then((response) => {
          this.records = response.data;
        })
        .catch((err) => {
          this.$message.error('获取数据失败');
          console.log(err.response.data);
        });
    }
  },
  mounted() {
    this.getRecords();
  }
};
</script>

<style scoped lang="less"></style>
