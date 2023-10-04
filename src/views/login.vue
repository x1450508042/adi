<template>
  <div class="login">
    <div class="lf">
      <img :src="loginimg" alt="">
    </div>
    <div class="rf">
      <div class="dl">登录</div>
      <el-form label-width="80px" label-height="40px" :model="loginusers" :rules="rules" ref="LoginForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginusers.username" clearable placeholder="请输入用户名或手机号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input placeholder="请输入密码" v-model="loginusers.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" type="primary" plain :loading="load" :disabled="load">登录</el-button>
        </el-form-item>
      </el-form>
      <div class="kuan">
        <div class="lf wj"><span><router-link to="/forget">忘记密码</router-link></span></div>
        <div class="fud"><span>没有账号？</span><span style="color:#1890FF;"><router-link
          to="/regin">快速注册</router-link></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>


export default {

  data() {
    return {
      load:false,
      loginimg: require('../assets/images/u2.png'),
      loginusers: {
        username: '',
        password: '',
      },
      flag: false,
      index: 0,
      // 表单校验
      rules: {
        username: [{required: true, trigger: 'blur', message: '请输入用户名'},
          {min: 4, max: 15, message: '长度再4到15个字符！', trigger: 'blur'}
        ],
        password: [{required: true, trigger: 'blur', message: '请输入密码'},
          {min: 4, max: 15, message: '长度在4到15个字符！', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    async login() {
      this.load=true
      await this.$refs.LoginForm.validate()
      try {
        await this.$store.dispatch('loginU', this.loginusers)
        await this.$store.dispatch('loginInfo')
        this.load=false
        this.$message({
          type: 'success',
          message: "登录成功"
        })
        this.$router.push('/hall')
      } catch (e) {
        this.load=false
        this.$message({
          type: 'error',
          message: e.message
        })
      }

    }
  },
  mounted() {
  }
}

</script>
<style scoped>
.login {
  width: 800px;
  height: 600px;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 15px #eee;
  display: flex;

}

/deep/ .el-form-item__content {
  height: 40px !important;
}

.rf {
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 100px;
}


.lf img {
  width: 400px;
  height: 600px;
}

.dl {
  font-size: 30px;
  margin-bottom: 20px;
  margin-left: 20px;
  text-align: center;
}

.el-input {
  width: 300px;
  margin-bottom: 20px;
}

.kuan {
  width: 300px;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
}

span {
  font-size: 12px;
}

.wj {
  color: rgb(170, 166, 166);
}
</style>
