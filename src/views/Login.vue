<template>
  <div class="container">
    <div class="loginform">
      <p>诸葛小戴</p>
      <el-form>
        <el-form-item>
          <el-input
            placeholder="手机号"
            prefix-icon="el-icon-user"
            v-model="mobile"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="图形验证码"
            prefix-icon="el-icon-message"
            class="vcode"
            v-model="input_captcha"
          ></el-input>
          <img :src="captcha" alt @click="get_captcha" />
        </el-form-item>
        <el-form-item>
          <el-input placeholder="短信验证码" prefix-icon="el-icon-message" class="vcode" v-model="vcode"></el-input>
          <el-button class="sendmessage" @click="get_vcode">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="loginBtn" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      captcha: "",
      mobile: "",
      vcode: "",
      input_captcha: "",
      captcha_id: ""
    };
  },
  methods: {
    get_captcha() {
      this.axios
        .get('/v1/captcha')
        .then((response) => {
          this.captcha = response.data.B64s;
          this.captcha_id = response.data.ID;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    get_vcode() {
      this.axios
        .post("/v1/captcha", { ID: this.captcha_id, B64s: this.input_captcha })
        .then(response => {
          if (response.data == true) {
            console.log(response.data);
          } else {
            this.$message.error("图形验证码错误");
          }
        });
    },
    login() {
      
    }
  },
  mounted() {
    this.get_captcha();
  }
};
</script>

<style scoped lang="less">
.container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .loginform {
    width: 380px;
    padding: 0 20px;
    p {
      font-size: 32px;
    }
    .vcode {
      width: 258px;
    }
    img,
    .sendmessage {
      width: 112px;
      margin-left: 10px;
      vertical-align: bottom;
    }
    .loginBtn {
      width: 100%;
    }
  }
}
</style>
