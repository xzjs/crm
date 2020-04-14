<template>
  <el-container>
    <el-aside width="225px" class="aside">
      <img src="@/assets/img/logo.png" alt="" />
      <el-menu
        default-active="start"
        class="menu"
        background-color=""
        text-color="white"
        active-text-color="#0076CE"
        :router="true"
      >
        <el-menu-item index="/home/start">
          <i class="el-icon-odometer"></i>
          <span slot="title">开始推荐</span>
        </el-menu-item>
        <el-menu-item index="/home/analyze">
          <i class="el-icon-odometer"></i>
          <span slot="title">推荐分析</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-notebook-2"></i>
          <span slot="title">登录记录</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container class="container">
      <el-header class="header" height="81px">
        <img src="@/assets/img/dell.png" alt="" class="dell" />
        <div class="portrait">
          <img src="@/assets/img/portrait.png" alt="" />
          <span>{{ user.mobile }}</span>
        </div>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
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
        mobile: '1234567890',
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
.aside {
  background-image: linear-gradient(#0076ce, #1fb8ff);
  height: 100vh;

  img {
    margin: 35px 13px;
    width: 198px;
    height: 50px;
  }

  .menu {
    background-color: transparent;

    .is-active {
      background-color: #fff;
    }

    .el-menu-item {
      font-size: 28px;
    }

    i {
      font-size: 28px;
    }
  }
}

.container {
  background-color: #f3f5f9;
  .header {
    padding: 17px 37px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

    .dell {
      width: 177px;
      height: 41px;
    }

    .portrait {
      float: right;

      img {
        width: 36px;
        height: 38px;
        vertical-align: middle;
        margin-right: 5px;
      }
    }
  }
}
</style>
