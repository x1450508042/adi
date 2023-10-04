<template>
<div>
  <el-card style="margin: 20px">
    <div style="display: flex;justify-content: space-between">
      <div style="display: flex;justify-content: space-between;align-items: center">
        <div class="imgs"><img src="../assets/images/支付 (1).png" alt=""></div>
        <div class="yue">
          <h3>个人账号余额</h3>
          <p>{{encodes}}<span>元</span></p>
          <el-button :disabled="offon" @click="cash()" size="small" type="primary">提现</el-button>
        </div>
      </div>
      <div>
        <el-button @click="open()" size="mini" >提现设置</el-button>
      </div>
    </div>
  </el-card>
  <el-card style="margin: 20px">
    <div class="lisw">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item @click="active01"  index="1">到账记录</el-menu-item>
        <el-menu-item @click="active02" index="2">提现记录</el-menu-item>
      </el-menu>
    </div>
    <div v-show="offson">
      <el-table
        fit="ture"
        :data="tableData"
        border
        style="width: 100%" :default-sort = "{prop: 'id', order: 'descending'}">
        <el-table-column sortable prop="id" label="序号" >
        </el-table-column>
        <el-table-column prop="offdate" label="任务时限" >
        </el-table-column>
        <el-table-column prop="encode" label="到账金额">
        </el-table-column>
        <el-table-column prop="uname" label="任务发布方">
        </el-table-column>
        <el-table-column prop="name" label="任务名称">
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
        </el-pagination>
      </div>
    </div>
    <div v-show="offson02">
      <el-table
        border
        :data="tableData02"
        style="width: 100%" :default-sort = "{prop: 'id', order: 'descending'}">
        <el-table-column width="175px"  sortable prop="id" label="序号" >
        </el-table-column>
        <el-table-column width="183px" prop="offdate" label="提现时间" >
        </el-table-column>
        <el-table-column width="183px" prop="encode" label="提现金额">
        </el-table-column>
        <el-table-column width="183px" prop="uname" label="发卡公司">
        </el-table-column>
        <el-table-column width="183px" prop="name" label="名称">
        </el-table-column>
        <el-table-column width="177px" prop="state" label="状态">
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
        </el-pagination>
      </div>
    </div>
  </el-card>
</div>
</template>
<script>
export default {
  name:'userMag',
  data () {
    return {
      conmall: [],
      user: {},
      user02: {},
      tableData: [],
      encodes: 0,
      tableData02: [],
      activeIndex: '1',
      offson: true,
      offson02: false,
      offon: false
    }
  },
  mounted () {
    this.getTableData()
    this.getTableData02()
    if (sessionStorage.getItem('myusname') === null) {
      this.$router.push('/')
    } else {
      var tz = JSON.parse(sessionStorage.getItem('myusname'))
      if (tz.role !== 1) {
        alert('你不是用户')
        this.$router.push('/')
      }
    }
  },
  methods: {
    getTableData () {
      getMinuit().then((res) => {
        const { code } = res
        if (code === 200) {
          this.tableData = res.data.tableData
          // 计算自己的总金额数
          for (var i = 0; i < this.tableData.length; i++) {
            this.encodes += parseInt(this.tableData[i].encode)
          }
          if (this.encodes === 0) {
            this.offon = true
          } else {
            this.offon = false
          }
        }
      })
    },
    getTableData02 () {
      getRecold().then((res) => {
        const { code } = res
        if (code === 200) {
          this.tableData02 = res.data.tableData
        }
      })
    },
    open () {
      if (this.user02 === null) {
        this.$prompt('你的银行卡是', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^[0-9]*[1-9][0-9]*$/,
          inputErrorMessage: '银行卡格式不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的银行卡是: ' + value
          })
          this.user = JSON.parse(sessionStorage.getItem('user'))
          this.user.bank = value
          const bank = JSON.stringify(this.user)
          sessionStorage.setItem('user02', bank)
          this.user02 = JSON.parse(sessionStorage.getItem('user02'))
          console.log(this.user02)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      } else {
        this.$alert('你已经绑定了银行卡', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: '请前往提现'
            })
          }
        })
      }
    },
    cash () {
      if (sessionStorage.getItem('user02') === null) {
        this.$confirm('暂未绑定银行卡，点击确定绑定', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$prompt('你的银行卡是', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /^[0-9]*[1-9][0-9]*$/,
            inputErrorMessage: '银行卡格式不正确'
          }).then(({ value }) => {
            this.$message({
              type: 'success',
              message: '你的银行卡是: ' + value
            })
            this.user = JSON.parse(sessionStorage.getItem('user'))
            this.user.bank = value
            const bank = JSON.stringify(this.user)
            sessionStorage.setItem('user02', bank)
            this.user02 = JSON.parse(sessionStorage.getItem('user02'))
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消输入'
          })
        })
      } else {
        this.$confirm('每月只能提现一次！请确定您的操作', '提现', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '提现成功!'
          })
          this.user02 = JSON.parse(sessionStorage.getItem('user02'))
          const one = {
            id: this.tableData02.length + 1,
            offdate: '2020-10-15 15:30:10',
            uname: '科技有限公司',
            name: this.user02.uname,
            encode: this.encodes,
            state: '已到账'
          }
          this.tableData02.push(one)
          this.encodes = 0
          console.log(this.encodes)
          if (this.state === '已到账') {
            this.offon = false
          } else {
            this.offon = true
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消提现'
          })
        })
      }
    },

    active01 () {
      this.activeIndex = '1'
      this.offson = true
      this.offson02 = false
    },
    active02 () {
      this.activeIndex = '2'
      this.offson = false
      this.offson02 = true
    }
  }
}
</script>
<style scoped>
#cons {
  margin-top: 20px;
  height: 86vh;
}
#mheader {
  height: 180px;
  background: #fff;
}
.classmain {
  margin-top: 30px;
  background: #fff;
}
.imgs {
  width: 250px;
}
.yue{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100px;
}
.yue p {
  color: rgb(45, 206, 206);
}
.yue span {
  margin-left: 5px;
  font-size:8px;
}
.ys {
  color: rgb(45, 57, 224);
}
.el-row {
  /* margin-top: 10px; */
  width: 170px;
}
.lisw {
  margin-bottom: 10px;
}
.lisw::after{
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
