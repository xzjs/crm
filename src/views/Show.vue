<template>
  <div class="container">
    <el-switch
      v-model="isEmerging"
      active-text="新用户"
      inactive-text="全部用户"
    >
    </el-switch>
    <el-tabs class="tab" tab-position="left">
      <el-tab-pane label="原始数据">
        <el-table :data="tableData" stripe>
          <el-table-column
            prop="AffinityId"
            label="AffinityId"
          ></el-table-column>
          <el-table-column
            prop="ProductDesc"
            label="ProductDesc"
          ></el-table-column>
          <el-table-column
            prop="Probability"
            label="Probability"
          ></el-table-column>
        </el-table>
        <el-pagination
          layout="prev, pager, next"
          :total="num"
          @current-change="pageChange"
          :page-size="pageSize"
        >
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="用户分析">
        <el-input
          v-model="affinityId"
          placeholder="请输入AffinityId"
          style="width: 250px;"
        ></el-input>
        <el-button type="primary" @click="getDataByAffinityId">分析</el-button>
        <div id="echarts"></div>
      </el-tab-pane>
      <el-tab-pane label="产品分析">配置管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  data() {
    return {
      isEmerging: true,
      tableData: [],
      num: 0,
      pageSize: 100,
      xAxis: [],
      yAxis: [],
      dataShadow: [],
      affinityIds: [],
      affinityId: '',
      myChart: null,
      option: {
        calculable: true,
        xAxis: {
          data: [],
          axisLabel: {
            textStyle: {
              color: '#000'
            },
            interval: 0
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#999'
            }
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: [
          {
            // For shadow
            type: 'bar',
            itemStyle: {
              color: 'rgba(0,0,0,0.05)'
            },
            barGap: '-100%',
            barCategoryGap: '40%',
            data: [],
            animation: false
          },
          {
            type: 'bar',
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
            },
            data: []
          }
        ]
      }
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    //获取表格数据
    getTableData(offset = 0) {
      this.axios
        .get('/v1/result', {
          params: {
            query:
              'task_id:' +
              this.$route.params.id +
              ',is_emerging:' +
              (this.isEmerging ? 1 : 0),
            fields: 'AffinityId,ProductDesc,Probability',
            limit: this.pageSize,
            offset: offset * this.pageSize
          }
        })
        .then((response) => {
          this.tableData = response.data.data;
          this.num = response.data.num;
        })
        .catch((err) => {
          this.$message.error('获取数据失败');
          console.log(err.response.data);
        });
    },
    //页面更改
    pageChange(currentPage) {
      this.getTableData(currentPage - 1);
    },
    // 获取id
    getAffinityIds() {
      this.axios
        .get('/v1/result', {
          params: {
            query:
              'task_id:' +
              this.$route.params.id +
              ',is_emerging:' +
              (this.isEmerging ? 1 : 0),
            fields: 'AffinityId'
          }
        })
        .then((response) => {
          this.affinityIds = response.data.data;
        })
        .catch((err) => {
          this.$message.error('获取数据失败');
          console.log(err.response.data);
        });
    },
    // 根据选择的id获取数据并渲染
    getDataByAffinityId() {
      this.axios
        .get('/v1/result', {
          params: {
            query:
              'task_id:' +
              this.$route.params.id +
              ',is_emerging:' +
              (this.isEmerging ? 1 : 0) +
              ',AffinityId:' +
              this.affinityId,
            fields: 'ProductDesc,Probability'
          }
        })
        .then((response) => {
          let d = response.data.data;
          // 清空数据
          this.option.xAxis.data = [];
          this.option.series[0].data = [];
          this.option.series[1].data = [];

          for (let i = 0; i < d.length; i++) {
            this.option.xAxis.data.push(d[i].ProductDesc);
            this.option.series[0].data.push(0.1);
            this.option.series[1].data.push(d[i].Probability);
          }

          this.myChart = echarts.init(document.getElementById('echarts'));
          this.myChart.setOption(this.option);
        })
        .catch((err) => {
          this.$message.error('获取数据失败');
          console.log(err.response.data);
        });
    }
  },
  mounted() {
    // tab1
    this.getTableData();
  }
};
</script>

<style lang="less" scoped>
.container {
  background-color: #fff;
  text-align: center;
  padding-top: 20px;

  .tab {
    margin-top: 20px;
  }

  #echarts {
    width: 100%;
    height: 500px;
  }
}
</style>
