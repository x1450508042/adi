<script>
import {reqFetchHall, reqMyHall} from "@/api/login";
import {getNowDate} from "@/ulits/index"
import {mapState} from "vuex";

export default {
  name: "dita",
  data() {
    return {
      zero: {},
      fileList: [],
      token: "",
      kf:false,
      jxz:false,
      // state:this.roles
    }
  },
  mounted() {
    if (JSON.stringify(this.$route.params) === '{}') {
      this.$router.push('/hall')

    } else {
      let obj = this.$route.params
      if(obj.kf) this.kf=obj.kf
      if(obj.jxz) this.jxz=obj.jxz
      if (obj.halltit) {
        this.getMyhall({id: obj.halltit})
      } else {
        this.zero = this.$route.params
      }
    }
    this.token = localStorage.getItem('token')

  },
  computed: {
    ...mapState({
      roles:state=>state.LoginUser.role
    }),
    jisuans() {
      if (JSON.stringify(this.zero) !== '{}') {
        let arr = this.zero.ask.split('；')
        arr.forEach((item, index) => {
          //当存在空数组的时候
          if (item == '') {
            arr.splice(index, 1)
          }
        })

        return arr
      }

    },
    authorization() {
      return {authorization: "Bearer " + this.token}
    }
  },
  methods: {
    gotoRoter(){
      this.$router.go(-1)
    },
    async getMyhall(id) {
      let res = await reqMyHall(id)
      if (res.code == 200) {
        this.zero = res.data[0]
      }
    },
    fetchHall() {
      let dateTime = new Date();
      this.$confirm('个人单次只能接受一个任务，需在时限要求内提交任务交付物，超时未提交则自动判定任务失败，无法获得奖励！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let obj = {}
        Object.assign(obj, this.zero)
        obj.dates = getNowDate()
        obj.halltit = obj.id
        obj.offTime = dateTime.setDate(dateTime.getDate() + parseInt(obj.limits))
        let res = await reqFetchHall(obj)
        if (res.code == 200) {
          this.$message.success('接取成功')
        } else {
          this.$message.error(res.msg)
        }
        this.$router.push('/mall')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    //文件上传
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
}
</script>

<template>
  <div style="display: flex">
    <el-card style="margin: 20px;width: 1000px">
      <div class="tops">
        <span @click="gotoRoter" class="diyspan">
          返回
<!--          <p style="color:#000"></p>-->
        </span>
        <span>任务详情</span>
      </div>
      <!--      任务基本信息-->
      <div class="hallXx">
        <h3>任务基本信息</h3>
        <el-button type="primary" style="width: 150px;height: 50px" @click="fetchHall" v-if="!$route.params.halltit &&  roles==1">
          接受任务
        </el-button>
        <el-button type="primary" style="width: 150px;height: 50px" @click="fetchHall" v-if="$route.params.halltit && kf==false &&  roles==1">提交任务</el-button>
        <div>
          <el-button type="primary" style="width: 150px;height: 50px" @click="fetchHall" v-if="roles==2 || roles==3 && jxz==false">通过任务</el-button>
          <el-button style="width: 150px;height: 50px" @click="fetchHall" v-if="roles==2 || roles==3 && jxz==false">驳回</el-button>
        </div>
        <el-button type="primary" style="width: 150px;height: 50px" @click="fetchHall" v-if="roles==2 || roles==3 && jxz==true">关闭任务</el-button>




      </div>
      <div class="detail">
        <div class="renw">
          <div class="qqs">
            <span style="margin-right: 10px">任务标题: </span>
            <span>{{ zero.hallname }}</span>
          </div>
          <div class="qqs">
            <span style="margin-right: 10px">发布时间: </span>
            <span>{{ zero.dates }}</span>
          </div>
          <div class="qqs">
            <span style="margin-right: 10px">完成时间: </span>
            <span>{{ zero.limits }}</span>
          </div>
          <div class="qqs">
            <span style="margin-right: 10px">任务关闭时间: </span>
            <span>{{ zero.offdate }}</span>
          </div>
          <div>
            <span style="margin-right: 10px">任务描述: </span>
            <span>{{ zero.descs }}</span>
          </div>
        </div>
      </div>
      <!--      任务要求-->
      <div class="hallXx">
        <h3>任务要求</h3>
      </div>
      <div class="detail">
        <div style="margin: 30px;">
          <p style="margin-bottom: 10px" v-for="(item,index) in jisuans" :key="index">{{ index + 1 }}、{{ item }} </p>
        </div>
      </div>
      <div v-if="!$route.params.halltit && kf==false && roles==1">
        <!--      相关附件-->
        <div class="hallXx">
          <h3>相关附件</h3>
        </div>
        <div style="margin: 30px;">
          <el-table border>
            <el-table-column label="序号" type="index" width="80"></el-table-column>
            <el-table-column label="附件名称"></el-table-column>
            <el-table-column label="操作" width="200"></el-table-column>
          </el-table>
        </div>
      </div>
      <div v-if="$route.params.halltit && kf==false && roles==1" class="kuandu">
        <div class="hallXx">
          <h3>完结材料</h3>
        </div>
        <el-upload
          class="upload-demo"
          action="/api/network/upload"
          :headers="authorization"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :limit="3"
          multiple
          :on-exceed="handleExceed"
          :file-list="fileList">
          <el-button type="primary" style="margin-top: 30px;">点击上传</el-button>
        </el-upload>

      </div>
      <div v-if="kf == true">
        <div class="hallXx">
          <h3>反馈</h3>
        </div>
        <el-button  @click="confirms()" style="margin-top:30px" type="danger" plain>申请客服介入</el-button>
      </div>
    </el-card>
    <el-card style="margin: 20px 0; width: 300px;  height: 200px">
      <div class="shyangs">
        <div>任务发布方</div>
        <div>用户名:{{ zero.username }}</div>
        <div>联系方式:{{ zero.mobile }}</div>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
::v-deep {
  //这里可以更改elementui样式
  .el-upload-list__item {
    width: 20%;
  }
}

.tops {
  span:nth-child(2) {
    padding: 10px;
  }

  .diyspan {
    cursor:pointer;
    text-align: left;
    border-right: 2px solid rgba(0, 0, 0, .2);
    padding-right: 10px;
  }
}

.hallXx {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-weight: 700;
    padding: 10px;
    border-left: 10px solid blue;
  }
}

.detail {
  margin-top: 30px;
  width: 950px;
  border: 1px solid rgba(0, 0, 0, .3);

  .renw {
    width: 950px;
    display: flex;
    margin: 30px;
    flex-wrap: wrap;

    .qqs {
      width: calc(950px / 2);
      margin-bottom: 30px;
    }
  }
}

.shyangs {
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    height: 50px;
    line-height: 50px;
  }
}
</style>
