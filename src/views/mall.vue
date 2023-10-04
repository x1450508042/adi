<template>
  <div v-if="$store.state.role==1">
    <el-card>
      <div class="fl" v-if="conmall.length>0">
        <span class="spz">当前任务</span>
        <h3 class="bt">{{ conmall[0].title }}</h3>
        <span class="spz">距离任务截止时间:<span class="ys">{{ count }}</span> </span>
        <el-row>
          <el-button size="mini" @click="onminuit()" type="primary">提交任务</el-button>
          <el-button size="mini" @click="routsto">任务详情</el-button>
        </el-row>
      </div>
      <div v-else style="line-height:150px">
        <router-link to="/hall">暂无任务,点击返回接取任务</router-link>
      </div>
    </el-card>
    <el-card>
      <div class="lisw">
        <img src="../assets/images/文档.png" alt="">
        <span>历史任务</span>
      </div>
      <el-table
          :data="zero"
          style="width: 100%" :default-sort="{prop: 'id', order: 'descending'}">
        <el-table-column sortable prop="id" label="任务编号">
        </el-table-column>
        <el-table-column prop="title" label="任务名称">
        </el-table-column>
        <el-table-column prop="requires" label="任务奖励">
        </el-table-column>
        <el-table-column prop="level" label="任务级别">
        </el-table-column>
        <el-table-column prop="deadline" label="申请时间">
        </el-table-column>
        <el-table-column sortable prop='state' label="状态">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button :disabled="scope.row.state === '超时'?true:false" size="small" @click="ids(scope.row)">客服介入
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination @current-change="handleCurrentChange"
                       :current-page="page" :page-size="size" layout="prev, pager, next, total,jumper"
                       :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
  <div v-else>
  <el-card style="margin: 20px">
    <div class="lisw">
      <img src="../assets/images/文档.png" alt="">
      <span>任务管理</span>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="任务审核" name="first">
        <el-table
          :data="tableData1"
          style="width: 100%" :default-sort = "{prop: 'id', order: 'descending'}">
          <el-table-column sortable prop="id" label="任务编号" >
          </el-table-column>
          <el-table-column prop="hallname" label="任务名称">
          </el-table-column>
          <el-table-column prop="encode" label="任务奖励">
          </el-table-column>
          <el-table-column prop="username" label="任务发布方" >
          </el-table-column>
          <el-table-column prop="limits" label="任务时限" >
          </el-table-column>
          <el-table-column label="操作" >
            <template v-slot="{row,$index}">
              <el-button @click="idss(row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
<!--        <div class="page">-->
<!--          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="100" layout="prev, pager, next, jumper" :total="1000">-->
<!--          </el-pagination>-->
<!--        </div>-->
      </el-tab-pane>
      <el-tab-pane label="进行中的任务" name="second">
        <el-table
          :data="tableData2"
          style="width: 100%" :default-sort = "{prop: 'id', order: 'descending'}">
          <el-table-column sortable prop="id" label="任务编号" >
          </el-table-column>
          <el-table-column prop="hallname" label="任务名称">
          </el-table-column>
          <el-table-column prop="encode" label="任务奖励">
          </el-table-column>
          <el-table-column prop="rank" label="任务级别" >
          </el-table-column>
          <el-table-column prop="limits" label="任务时限" >
          </el-table-column>
          <el-table-column sortable prop="dates" label="日期">
          </el-table-column>
          <el-table-column label="操作" >
            <template v-slot="{row,$index}">
              <el-button @click="ross(row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
<!--        <div class="page">-->
<!--          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="100" layout="prev, pager, next, jumper" :total="1000">-->
<!--          </el-pagination>-->
<!--        </div>-->
      </el-tab-pane>
      <el-tab-pane label="已完成的任务" name="noes">
        <el-table
          :data="tableData3"
          style="width: 100%" :default-sort = "{prop: 'id', order: 'descending'}">
          <el-table-column sortable prop="id" label="任务编号" >
          </el-table-column>
          <el-table-column prop="title" label="任务名称">
          </el-table-column>
          <el-table-column prop="requires" label="任务奖励">
          </el-table-column>
          <el-table-column prop="level" label="任务级别" >
          </el-table-column>
          <el-table-column prop="deadline" label="日期" >
          </el-table-column>
<!--          <el-table-column label="操作" >-->
<!--            <template v-slot="{row,$index}">-->
<!--              <el-button @click="ids(row)">查看</el-button>-->
<!--            </template>-->
<!--          </el-table-column>-->
        </el-table>
<!--        <div class="page">-->
<!--          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="100" layout="prev, pager, next, jumper" :total="1000">-->
<!--          </el-pagination>-->
<!--        </div>-->
      </el-tab-pane>
    </el-tabs>

  </el-card>
  </div>
</template>
<script>
import {reaListHall, reqGetHall, reqSetHall, reqUserGetHall, reqwinHall} from "@/api/login";
import {countDown, timestampToTime} from "@/ulits/index"

export default {
  data() {
    return {
      activeName: 'first',
      tableData1:[],
      tableData2:[],
      tableData3:[],
      conmall: [],
      count: '', // 倒计时
      seconds: {}, // 还剩多少时间
      zero: [],
      tableData:[],
      time: null,
      page:1,
      size:5,
      total:0,
    }
  },
  mounted() {
    if(this.$store.state.role==1){
      this.getHallInfo()
      this.getUserHall()
    }else{
      this.getListHalls()
    }


  },
  methods: {
    async getListHalls(){
      let res = await reaListHall()
      let ress = await reqwinHall()
      if(res.code ==200){
        res.data.forEach(item=>{
          if(item.state ==1){
            this.tableData2.push(item)
          } else if(item.state==2){
            this.tableData1.push(item)
          }
        })
      }

      if(ress.code == 200){
        this.tableData3 =ress.data
        console.log(this.tableData3)
      }
    },
    handleClick(tab, event){
      // console.log(tab, event);
    },
    handleCurrentChange(val) {
      this.page = val
      this.fenyes()
    },
    // 分页
    fenyes() {
      this.zero = this.tableData.slice((this.page - 1) * this.size, this.page * this.size)
      this.total = this.tableData.length
    },
    async getHallInfo() {
      let res = await reqGetHall()
      if (res.code == 200) {
        res.data.map(item => {
          if (item.state == 1) {
            item.state = '未完成'
          } else if (item.state == 0) {
            item.state = '已完成'
          }
        })
      }

      this.tableData = res.data
      this.fenyes()
    },

    async getUserHall() {
      let res = await reqUserGetHall()
      if (res.code == 200 && res.data.length>0) {
        this.conmall = res.data
        this.seconds = timestampToTime(parseInt(this.conmall[0].offTime))
        this.Time()
      }
    },
    ids(e) {
      // 客服是否介入
      let kf = true
      e.kf=kf
      console.log(e)
      this.$router.push({
        name: 'dita',
        params:e
      })
    },
    idss(e) {
      this.$router.push({
        name: 'dita',
        params:e
      })
    },
    ross(e){
      let jxz=true
      e.jxz=jxz
      this.$router.push({
        name: 'dita',
        params:e
      })
    },
    onminuit() {
      this.$confirm('任务确认完成后，任务发布方将会验证任务完成程度，并根据完成程度发放奖励！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '提交成功!'
        })
        const username = 'username'
        this.zero[username] = this.user.uname
        const info = JSON.stringify(this.zero)
        sessionStorage.setItem('past', info)
        sessionStorage.removeItem('zerohour', JSON.stringify(this.zero))
        window.history.go(0)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    Time() {
      this.time = setInterval(async () => {
        //倒计时
        let t = countDown(this.seconds)
        this.count = `${t.day}天${t.hour}时${t.min}分${t.sec}秒`
        if(t.day<=0 && t.hour<=0&& t.min<=0 && t.sec<=0){
        let res = await reqSetHall(this.conmall)
          if(res.code == 200){
            this.$message.success('修改成功')
            clearInterval(this.time)
          }else{
            this.$message.error('修改失败')
          }
        }
      }, 1000)
    },
    routsto(){
      this.$router.push({
        name: 'dita',
        params: this.conmall[0]
      })
    }
  },
  beforeDestroy() {
    clearInterval(this.time)
  }
}
</script>
<style scoped>
.el-card {
  margin: 20px;
}

.fl {
  float: left;
  padding: 10px;
  width: 300px;
  height: 100%;
}

.spz {
  font-size: 12px;
  color: #a7a7a7;
  display: block;
  text-align: left;
}

.bt {
  font-weight: 700;
  text-align: left;
  margin: 10px 0;
}

.ys {
  color: rgb(45, 57, 224);
}

.el-row {
  margin-top: 10px;
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
</style>
