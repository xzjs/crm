<template>
  <div>
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
          <el-input
            placeholder="短信验证码"
            prefix-icon="el-icon-message"
            class="vcode"
            v-model="vcode"
          ></el-input>
          <el-button class="sendmessage">发送验证码</el-button>
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
      captcha:
        'data:image/png;base64,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',
      mobile: '',
      vcode: '',
      input_captcha: '',
      captcha_id: ''
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
    }
  },
  mounted() {
    this.get_captcha();
  }
};
</script>

<style scoped lang="less">
.loginform {
  width: 368px;
  p {
    font-size: 32px;
  }
  .vcode {
    width: 258px;
  }
  img,
  .sendmessage {
    width: 102px;
    vertical-align: bottom;
  }
  .loginBtn {
    width: 100%;
  }
}
</style>
