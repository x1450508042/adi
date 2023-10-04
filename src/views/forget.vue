<template>
  <div class="login">
    <div class="lf">
      <img :src="loginimg" alt="">
    </div>
    <div class="rf">
      <div class="dl">忘记密码</div>

      <el-form label-width="80px" :model="ruleForm" ref="ruleForm" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" clearable placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input v-model="ruleForm.password" clearable placeholder="新密码"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="iphone">
          <el-input v-model="ruleForm.iphone" clearable placeholder="手机号"></el-input>

        </el-form-item>
        <el-form-item prop="verif">
          <el-input class="yzminput" v-model="ruleForm.verif" clearable placeholder="验证码"></el-input>
          <el-button type="primary" :disabled="offon" @click="Code()">{{ trtext }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login()" :loading="load" :disabled="load">确定</el-button>
        </el-form-item>
      </el-form>
      <div class="kuan">
        <div><span>没有账号？</span><span style="color:#1890FF;"><router-link to="/regin">快速注册</router-link></span>
        </div>
        <div><span>已有账号？</span><span style="color:#1890FF;"><router-link to="/">点击登录</router-link></span></div>

      </div>
    </div>
  </div>
</template>
<script>
import {forget} from "@/api/login";

export default {
  data() {
    const validatorPhone = (rule, value, callback) => {
      if (!/^1[345789]\d{9}$/.test(value)) {
        callback(new Error('请输入正确的手机号格式'))
      } else {
        callback()
      }
    }
    return {
      load:false,
      verif: '',
      ruleForm: {
        username: '',
        iphone: '',
        password: '',
        verif: '',
        lay: ''
      },
      rules: {
        username: [
          {required: true, message: '用户名不能为空', trigger: 'blur'},
          {min: 3, max: 10, message: '长度要在6~10个字符', trigger: 'change'}
        ],
        iphone: [
          {required: true, message: '手机号不能为空', trigger: 'blur'},
          {validator: validatorPhone, trigger: 'change'}
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'},
          {min: 6, max: 10, message: '长度要在6~10个字符', trigger: 'change'}
        ],
        verif: [
          {required: true, message: '验证码不能为空', trigger: 'blur'}
        ]
      },
      loginimg: require('../assets/images/u2.png'),
      verif02: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      isRun: false,
      runTime: 10,
      offon: false,
      trtext: '发送'
    }
  },
  methods: {
    // 手机号验证和验证码倒计时
    async Code() {
      this.verif=''
        // 获取随机数
        for (var i = 0; i <= 4; i++) {
          var index = Math.floor(Math.random() * 9)
          this.verif += this.verif02[index]
          this.ruleForm.verif=this.verif
        }
       await alert('验证码为:' + this.verif)
        // 当isRun为true则添加10秒运行
        this.isRun = true
        if (this.isRun === true) {
          this.aoTime = setInterval(() => {
            this.trtext = this.runTime
            this.offon = true
            if (this.runTime === 0) {
              this.runTime = 10
              this.isRun = false
              clearInterval(this.aoTime)
              this.trtext = '发送'
              this.offon = false
            }
            this.runTime--
          }, 1000)
        } else {
          this.trtext = '发送'
        }

    },
    login() {
      if(this.ruleForm.verif !== this.verif){
        this.$message({
          type:'error',
          message:'验证码错误'
        })
        return false
      }
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          this.load=true
          let res = await forget(this.ruleForm)
          console.log(res)
          if(res.code ==200){
            this.load=false
            this.$message({
              type:'success',
              message:'修改成功'
            })
          }else{
            this.load=false
            this.$message({
              type:'error',
              message:res.msg
            })
          }
        }else {
          return false;
        }
        })
    }
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

.yzminput {
  width: 200px;
  margin-right: 30px;

}

.el-button {
  width: 70px;
}

</style>
