<template>
  <div class="container">
    <img src="@/assets/img/dell.png" alt class="img_dell" />
    <div class="box">
      <div class="item">
        <img src="@/assets/img/technology.png" alt class="img_tech" />
        <p>戴尔科技集团与中科院自动化所联合出品</p>
      </div>
      <div class="item">
        <img src="@/assets/img/name.png" alt class="img_name" />
        <div class="loginform">
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
              <el-button class="sendmessage" @click="get_vcode"
                >发送验证码</el-button
              >
            </el-form-item>
            <el-form-item>
              <el-button class="loginBtn" type="primary" round @click="login"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      captcha: '',
      mobile: '',
      vcode: '',
      input_captcha: '',
      captcha_id: '',
      vcodeSend: false
    };
  },
  methods: {
    get_captcha() {
      this.axios
        .get('/v1/captcha')
        .then((response) => {
          this.captcha = response.data.B64s;
          this.captcha_id = response.data.Id;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    get_vcode() {
      if (this.mobile == '' || this.input_captcha == '') {
        this.$message.error('请输入手机号和验证码');
        return;
      }
      this.axios
        .post('/v1/sms', {
          Id: this.captcha_id,
          B64s: this.input_captcha,
          Mobile: this.mobile
        })
        .then((response) => {
          if (response.data == 'success') {
            this.$message({
              message: '短信发送成功',
              type: 'success'
            });
            this.vcodeSend = true;
          } else {
            this.$message.error('图形验证码错误');
          }
        })
        .catch((error) => {
          this.$message.error('短信发送失败');
          console.log(error.data);
        });
    },
    login() {
      if (!this.vcodeSend) {
        this.$message.error('请先获取验证码');
        return;
      }
      if (!this.vcode) {
        this.$message.error('请输入验证码');
        return;
      }
      this.axios
        .post('/v1/login', {
          Mobile: this.mobile,
          Vcode: this.vcode
        })
        .then((response) => {
          console.log(response);
          localStorage.isLogin = true;
          this.$router.push('/');
        })
        .catch((error) => {
          this.$message.error('登录失败');
          console.log(error.response.data);
        });
    }
  },
  mounted() {
    this.get_captcha();
  }
};
</script>

<style scoped lang="less">
.container {
  height: 100vh;
  background: url('~@/assets/img/bg.png') no-repeat fixed -50px;
  background-size: cover;
  margin: auto;

  .img_dell {
    width: 324px;
    height: 74px;
    margin: 46px 63px;
  }

  .box {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    .item {
      display: inline-block;
      position: relative;
      margin: 10px;

      .img_tech {
        width: 810px;
        height: 608px;
      }

      .img_name {
        width: 460px;
        height: 117px;
      }

      .loginform {
        width: 355px;
        background-color: #fff;
        padding: 10px 20px;
        margin: 68px auto;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

        p {
          font-size: 32px;
        }
        .vcode {
          width: 60%;
        }
        img,
        .sendmessage {
          width: 38%;
          margin-left: 2%;
          vertical-align: bottom;
        }
        .loginBtn {
          width: 100%;
        }
      }
    }
  }
}
</style>
