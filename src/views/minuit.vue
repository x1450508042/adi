<template>
  <el-container id="dita" style="margin: 20px">
    <el-header style="height:100px" id="dheader">
      <el-row   :gutter="20">
        <el-col :span="3"><div class="grid-content bg-purple"><i class="el-icon-arrow-left"></i><a title="返回" href="javascript:;"><router-link to="/pubmall">返回</router-link></a></div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple"><h3>发布任务</h3></div></el-col>
      </el-row>
    </el-header>
    <el-main id="contents">
      <el-form ref="elform" :rules="rules" :model="form" label-width="80px" size='mini'>
        <el-form-item label="任务标题" prop="name">
          <el-input placeholder="请输入任务标题"  v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="任务奖励" prop="encode">
          <el-input placeholder="请输入奖励金额"  v-model="form.encode"></el-input>
        </el-form-item>
        <el-form-item label="最后时间" prop="offdate">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            style="width: 250px"
            v-model="form.offdate"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="任务时限" prop="limit">
          <el-select class="tanc" v-model="form.limit" placeholder="请选择时间限制">
            <el-option label="1" value="1"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="5" value="5"></el-option>
            <el-option label="7" value="7"></el-option>
            <el-option label="30" value="30"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务级别" prop="rank">
          <el-select class="tanc" v-model="form.rank" placeholder="请选择任务级别">
            <el-option label="普通" value="普通"></el-option>
            <el-option label="一般" value="一般"></el-option>
            <el-option label="困难" value="困难"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务描述" prop="ask">
          <el-input
            type="textarea"
            placeholder="请描述"
            v-model="form.ask"
            maxlength="300"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item label="任务提示" prop="desc">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="form.desc"
            maxlength="300"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item label="文件上传" prop="file">
          <el-upload
            class="avatar-uploader"
            action="/api/network/upload"
            :headers="authorization"
            :on-success="onsuccess"
            :before-remove="beforeRemove"
            :limit="3"
            multiple
            :on-exceed="handleExceed"
            :file-list="fileList">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">发布任务</el-button>
          <el-button><router-link to="/pubmall">取消</router-link></el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>

</template>
<style scoped lang="scss">
::v-deep {
  .avatar-uploader .el-upload {
    width: 50px;
    height: 50px;
    line-height: 50px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}

.tanc {
  float: left;
}
.riqi {
  float: left;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

#contents {
  width: 96%;
  margin: 10px auto;
}
.bg-purple {
  height: 100px;
}
.bg-purple a {
  line-height: 100px;
  font-size: 14px;
  color: rgb(122, 121, 121);
}
.bg-purple i {
  margin-right: 5px;
}
.bg-purple h3 {
  width: 100px;
  font-weight: 700;
  line-height: 100px;
}
.bg-purple p {
  color: rgb(190, 188, 188);
  font-size: 14px;
}
.el-col {
  border-radius: 4px;
}

#dita {
  margin-top: 20px;
  background: #fff;
  height: 85vh;
}
#dheader {
  height: 100px;
  border-bottom: 2px solid #eee;
}
.el-input--mini .el-input__inner {
  width: 200px;
  display: block;
}
</style>
<script>
import {reqAddHall} from "@/api/login";

export default {
  name:'minuit',
  data () {
   let validatorFile =(rule, value, callback)=>{
     if(this.fileList.length>0){
       callback()
     }else{
       callback(new Error('请上传文件'))
     }
   }
    return {
      pickerOptions: {
        disabledDate(v) {
          return v.getTime() < new Date().getTime() - 86400000;//  - 86400000是否包括当天
        }
      },
      fileList: [],
      tableData: {},
      form: {
        name: '',
        offdate: '',
        encode: '',
        rank: '',
        limit: '',
        desc: '',
        ask: '',
        attach:[]
      },
      rules:{
        name:[ { required: true, message: '请输入任务标题', trigger: 'blur' }],
        encode:[ { required: true, message: '请输入奖励', trigger: 'blur' }],
        offdate:[ { required: true, message: '请选择最后时间', trigger: 'change' }],
        limit:[ { required: true, message: '请输入任务时限', trigger: 'change' }],
        rank:[ { required: true, message: '请选择任务级别', trigger: 'change' }],
        desc:[ { required: true, message: '请输入任务描述', trigger: 'change' }],
        ask:[ { required: true, message: '请输入任务提示', trigger: 'change' }],
        file:[ { required: true, validator:validatorFile, trigger: 'change' }],

      }
    }
  },
  methods: {
    // 获取当前时间
    addDate (t) {
      //使用该函数可以获取当前时间  参数t为 new Date() 格式
      let nowDate
      if(t){
        nowDate =t
      }else{
        nowDate = new Date()
      }
      const date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate()
      }
      let systemTime = date.year + '-' + date.month + '-' + date.date
      return systemTime
    },
     onSubmit () {

      this.$refs["elform"].validate(async(valid) => {
        if (valid) {

          const fr = this.form
          fr.attach=[]
          //将上传文件的路径拿出来
          this.fileList.forEach(i=>{
            fr.attach.push(i.response.data)
          })
          if(fr.rank == '普通'){
            fr.rankId=0
          }else if(fr.rank == '一般'){
            fr.rankId=1
          }else if(fr.rank == '困难'){
            fr.rankId=2
          }
          if(fr.encode>=0 && fr.encode <=99){
            fr.quj=1
          }else if(fr.encode>=100 && fr.encode <=199){
            fr.quj=2
          }else if(fr.encode>=200 && fr.encode <=499){
            fr.quj=3
          }else if(fr.encode>=500){
            fr.quj=4
          }
          const one = {
            username: this.$store.state.LoginUser.username,
            mobile: this.$store.state.LoginUser.mobile,
            hallname: fr.name,
            dates: this.addDate(),
            offdate: this.addDate(fr.offdate),
            encode: fr.encode,
            rank: fr.rank,
            limit: fr.limit,
            desc: fr.desc,
            ask: fr.ask,
            attachmentIds:fr.attach,
            rankId:fr.rankId,
            quj:fr.quj
          }
          let res = await reqAddHall(one)
          if(res.code == 200){
            this.$message.success('发布成功')
            this.$router.push({name:'pubmall'})
          }
        } else {
          return false;
        }
      });


    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件`);
    },
    //点击删除
    beforeRemove(file, fileList) {
     return this.$confirm(`确定移除 ${file.name}？`).then(()=>{
       this.fileList=fileList
       this.$message({
         type: 'success',
         message: '删除成功!'
       });
     }).catch(()=>{
       this.$message({
         type: 'info',
         message: '已取消删除'
       });
     });
    },
    // //文件上传成功回调
    onsuccess(response, file, fileList){
      this.fileList=fileList
    },
  },
  computed:{
    authorization() {
      return {authorization: "Bearer " + localStorage.getItem('token')}
    }
  }
}
</script>
