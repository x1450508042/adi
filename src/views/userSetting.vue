<template>
  <el-card style="margin: 20px">

    <div class="lisw">
      <img src="../assets/images/个人 (1).png" alt="">
      <span>用户管理</span>
    </div>
    <el-row class="butbj">
      <el-button @click="dialogFormVisible=true" size="mini" type="primary">添加账号</el-button>
      <el-dialog v-if='isoff' title="添加账号" width='500px' :visible.sync="dialogFormVisible">
        <el-form label-position="labelPosition" :model="ruleForm" ref="ruleForm" :rules="rules" label-width='80px'>
          <el-form-item prop="username" label="账号">
            <el-input type="text" v-model="ruleForm.username" clearable
                      placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item prop="iphone" label="手机号">
            <el-input  type="text" v-model="ruleForm.iphone" clearable
                      placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input type="text" v-model="ruleForm.password" clearable
                      placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="role">
            <el-select v-model="ruleForm.role" placeholder="账号类型">
              <el-option :label="i.label" :value="i.value" v-for="(i,index) in roles" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialogFormVisible = false ; $refs.ruleForm.resetFields();">取 消</el-button>
          <el-button size="mini" type="primary" @click="adduser()">确 定</el-button>
        </div>
      </el-dialog>
    </el-row>
    <div class="lisw">
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户账号" name="first">
          <el-table
              :data="username"
              style="width: 100%" :default-sort="{prop: 'id', order: 'descending'}" border>
            <el-table-column sortable prop="id" label="用户编号">
            </el-table-column>
            <el-table-column prop="username" label="用户名">
            </el-table-column>
            <el-table-column prop="iphone" label="手机号">
            </el-table-column>
            <el-table-column prop="password" label="密码">
            </el-table-column>
            <el-table-column label="修改">

              <template v-slot="{row,$index}">
                <el-button size="small" @click="ids(row)" :type="row.status === 0?'primary':'danger' ">{{ row.status === 0 ? '启用' : '禁用' }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="page">
            <el-pagination :page-size="100" layout="prev, pager, next, jumper" :total="1000">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="管理端账号" name="third">
          <el-table
              :data="bossname"
              border
              style="width: 100%">
            <el-table-column sortable prop="id" label="管理编号">
            </el-table-column>
            <el-table-column prop="username" label="用户名">
            </el-table-column>
            <el-table-column prop="iphone" label="手机号">
            </el-table-column>
            <el-table-column prop="password" label="密码" v-if="$store.state.LoginUser.role===2">
            </el-table-column>
            <el-table-column label="修改">

              <template v-slot="{row,$index}">
                <!-- <router-link :to="{path:'/confirmOrder', query:{scope.$index, scope.row}}" class="gotopay_button_style" v-else >去结算</router-link> -->
                <el-button size="small" :disabled="row.role ===3" @click="ids(row)" :type="row.status === 0?'primary':'danger' ">{{ row.status === 0 ? '启用' : '禁用'}}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="page">
            <el-pagination :page-size="100" layout="prev, pager, next, jumper" :total="1000">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-card>
</template>
<script>
import request from "@/ulits/request";
import {forget, regReqs} from "@/api/login";

export default {
  name: 'userSetting',
  data() {
    const validatorPhone = (rule, value, callback) => {
      if (!/^1[345789]\d{9}$/.test(value)) {
        callback(new Error('请输入正确的手机号格式'))
      } else {
        callback()
      }
    }
    return {
      roles: [],
      states: '',
      isoff: true,
      activeName: 'first',
      getUserNames: [],
      myusname: [],
      // 用户
      username: [],
      // 企业
      enname: [],
      // 管理员
      bossname: [],
      dialogFormVisible: false,
      labelPosition: 'right',
      ruleForm: {
        username: '',
        iphone: '',
        role: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: '用户名不能为空', trigger: 'blur'},
          {min: 3, max: 10, message: '长度要在3~10个字符', trigger: 'change'}
        ],
        iphone: [
          {required: true, message: '手机号不能为空', trigger: 'blur'},
          {validator: validatorPhone, trigger: 'change'}
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'},
          {min: 6, max: 10, message: '长度要在6~10个字符', trigger: 'blur'}
        ],
        role:[
          { required: true, message: '请选择账号类型', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {

    if (this.$store.state.LoginUser.role == 2) {
      this.roles = [{
        label: '用户',
        value: '1'
      }]
    } else {
      this.roles = [{
        label: '用户',
        value: '1'
      },
        {
          label: '管理员',
          value: '2'
        }]
    }
    this.getTableData()

  },
  methods: {

    // 获取当前时间
    addDate() {
      const nowDate = new Date()
      const date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate(),
        hours: nowDate.getHours(),
        min: nowDate.getMinutes() < 10 ? '0' + nowDate.getMinutes() : nowDate.getMinutes(),
        sec: nowDate.getSeconds() < 10 ? '0' + nowDate.getSeconds() : nowDate.getSeconds()
      }
      this.systemTime = date.year + '-' + date.month + '-' + date.date + ' ' + date.hours + ':' + date.min + ':' + date.sec
    },

    async getTableData() {
      let res = await request.get('/userInfo/roleInfo')
      if (res.code == 200) {
        this.username = res.data.user
        this.bossname = res.data.userRole
      }
    },
    async ids(e) {
      if (e.status == 0) {
        e.status = 1
      } else {
        e.status = 0
      }
      let res = await request.post('/userInfo/settingRole', e)

      if (res.code == 200) {
        this.$message.success(res.data)
      } else {
        this.$message.error(e.msg)
      }
      this.getTableData()
    },
   async adduser() {
     this.$refs.ruleForm.validate(async (valid) => {
       if (valid) {
       let res = await regReqs(this.ruleForm)
       if(res.code == 200){
         this.$message.success(res.data)
       }else{
         this.$message.error(res.msg)
       }
       this.dialogFormVisible=false
         this.$refs.ruleForm.resetFields();
       this.getTableData()

       } else {
         return false;
       }
     });

    }
  }
}
// }
</script>
<style scoped>
#cons {
  margin-top: 20px;
  height: 86vh;
}

.classmain {
  background: #fff;
}

.fr {
  float: right;
  padding-top: 20px;
}

.fl {
  float: left;
  padding: 10px;
  width: 300px;
  height: 100%;
}

.imgs {
  float: left;
  width: 150px;
  padding-top: 5px;
}

.yue {
  line-height: 50px;
}

.yue p {
  color: rgb(45, 206, 206);
}

.yue span {
  margin-left: 5px;
  font-size: 8px;
}

.ys {
  color: rgb(45, 57, 224);
}

.el-row {
  width: 170px;
}

.lisw {
  margin-bottom: 10px;
}

.lisw::after {
  content: "";
  display: block;
  clear: both;
}

.lisw img {
  width: 20px;
  height: 20px;
  float: left;
}

.lisw span {
  float: left;
  margin-left: 10px;
  font-size: 14px;
}

.page {
  margin-top: 20px;
}

.renz {
  float: left;
  margin-top: 50px;
}

.renz span {
  display: block;
  font-size: 8px;
}

.renz .bus {
  margin-top: 20px;
  float: left;
}

.butbj {
  width: 80px !important;
  margin: 10px 0;
}
</style>
