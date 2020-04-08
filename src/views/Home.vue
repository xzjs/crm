/* eslint-disable prettier/prettier */
<template>
  <div class="home">
    <el-container>
      <el-aside width="256px" class="aside">
        <el-menu
          default-active="1"
          class="el-menu-vertical"
          @open="handleOpen"
          @close="handleClose"
          background-color="black"
          text-color="white"
        >
          <p class="title">诸葛小戴</p>
          <el-menu-item index="1">
            <i class="el-icon-odometer"></i>
            <span slot="title">开始推荐</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-odometer"></i>
            <span slot="title">推荐分析</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">登录记录</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="header">
          <i class="el-icon-s-custom"></i>
          <span>{{ mobile }}</span>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  data() {
    return {
      user: {
        id: 0,
        mobile: '',
        type: 0
      }
    };
  },
  components: {},
  methods: {
    handleOpen() {
      console.log('open');
    },
    handleClose() {
      console.log('close');
    }
  }
};
</script>
<style scoped lang="less">
.home {
  /*height: 100%;*/
  .title {
    font-size: 28px;
    color: white;
  }

  /*height: 100%;*/
  .el-menu-vertical {
    height: 100vh;
    background-color: #545c64;
  }

  .header {
    padding: 20px;
    text-align: right;
    border-bottom: 1px solid #a5999938;

    i {
      color: #409eff;
    }
  }
}
</style>
