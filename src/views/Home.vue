<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
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
        <el-header>Header</el-header>
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
  .el-container {
    /*height: 100%;*/
    .el-menu-vertical {
      height: 100vh;
      background-color: #545c64;
    }
  }
}
</style>
