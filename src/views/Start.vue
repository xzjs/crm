<template>
  <div>
    <div class="title">
      <el-input
        placeholder="输入标题，开始推荐"
        class="input"
        v-model="name"
      ></el-input>
      <el-button type="primary" round class="button" @click="start"
        >开始</el-button
      >
    </div>
    <el-table :data="table_data" stripe class="upload">
      <el-table-column label="特征" prop="name"></el-table-column>
      <el-table-column label="上传时间" prop="time"></el-table-column>
      <el-table-column label="上传进度">
        <template slot-scope="scope">
          <el-progress :percentage="scope.row.process"></el-progress>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-upload
            class="upload-demo"
            action="/v1/file"
            :data="{ name: scope.row.name }"
            name="file"
            :with-credentials="true"
            accept=".csv,.txt"
            :on-success="getFiles"
            :before-upload="startUpload(scope.row.name)"
          >
            <el-button type="text" size="small">上传</el-button>
          </el-upload>
          <el-button @click="del(scope.row.id)" type="text" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Start',
  data() {
    return {
      table_data: [],
      name: ''
    };
  },
  methods: {
    getFiles() {
      this.axios
        .get('/v1/file')
        .then((response) => {
          let data = response.data;
          for (let i = 0; i < data.length; i++) {
            this.updateData(data[i]);
          }
        })
        .catch((err) => {
          this.$message.error('获取文件失败');
          console.log(err.response.data);
        });
    },
    updateData(data) {
      for (let i = 0; i < this.table_data.length; i++) {
        if (this.table_data[i].name == data.Name) {
          this.table_data[i].time = data.Time;
          this.table_data[i].process = 100;
          this.table_data[i].id = data.Id;
          break;
        }
      }
    },
    startUpload(name) {
      this.updateData({ name: name, process: 0 });
    },
    start() {
      this.axios
        .post('/v1/task', { Name: this.name })
        .then(() => {
          this.$router.push('analyze');
        })
        .catch((err) => {
          this.$message.error('开始任务失败');
          console.log(err.response.data);
        });
    },
    del(id) {
      this.axios
        .delete('/v1/file/' + id)
        .then(() => {
          this.init();
          this.getFiles();
        })
        .catch((err) => {
          this.$message.error('删除失败');
          console.log(err);
        });
    },
    init() {
      this.table_data = [
        {
          name: 'CAS.csv',
          time: '',
          id: 0,
          process: 0
        },
        {
          name: 'acct_coverage_by_event.txt',
          time: '',
          id: 0,
          process: 0
        },
        {
          name: 'CASData.txt',
          time: '',
          id: 0,
          process: 0
        },
        {
          name: 'visit_history.txt',
          time: '',
          id: 0,
          process: 0
        }
      ];
    }
  },
  mounted() {
    this.init();
    this.getFiles();
  }
};
</script>

<style scoped lang="less">
.title {
  width: 935px;
  margin: 30px auto;
  .input {
    width: 760px;
  }

  .button {
    width: 126px;
    margin-left: 49px;
  }
}
</style>
