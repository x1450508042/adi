<template>
  <el-card style="margin: 20px">
    <div class="lisw">
      <img src="../assets/images/支付 (1).png" alt="">
      <span>提现/充值</span>
    </div>
    <div class="lisw">
      <el-tabs v-model="activeName">
        <el-tab-pane label="充值记录" name="first">
          <el-table
              :data="tableData"
              style="width: 100%" :default-sort="{prop: 'id', order: 'descending'}">
            <el-table-column sortable prop="id" label="任务编号">
            </el-table-column>
            <el-table-column prop="encode" label="金额">
            </el-table-column>
            <el-table-column prop="uname" label="申请人">
            </el-table-column>
            <el-table-column prop="offdate" label="申请时间">
            </el-table-column>
            <el-table-column prop="state" label="状态">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="small" :disabled="scope.row.state === '已处理' ? true :false" @click="ids(scope.row)">
                  确认
                </el-button>
                <el-button size="small" :disabled="scope.row.state === '已处理' ? true :false"
                           @click="ids02(scope.row)">取消
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="page">
            <el-pagination :page-size="100" layout="prev, pager, next, jumper" :total="1000">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="提现记录" name="second">
          <el-table
              :data="tableData02"
              style="width: 100%" :default-sort="{prop: 'id', order: 'descending'}">
            <el-table-column sortable prop="id" label="任务编号">
            </el-table-column>
            <el-table-column prop="encode" label="金额">
            </el-table-column>
            <el-table-column prop="uname" label="申请人">
            </el-table-column>
            <el-table-column prop="offdate" label="申请时间">
            </el-table-column>
            <el-table-column sortable prop='state' label="状态">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="small" :disabled="scope.row.state === '已处理' ? true :false"
                           @click="ids03(scope.row)">确认
                </el-button>
                <el-button size="small" :disabled="scope.row.state === '已处理' ? true :false"
                           @click="ids04(scope.row)">取消
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
export default {
  name: 'extract',
  data() {
    return {
      isoff: true,
      conmall: [],
      tableData: [],
      tableData02: [],
      dialogFormVisible: false,
      labelPosition: 'right',
      activeName: 'first',
      upload: {},
      updata: [],
      systemTime: ''
    }
  },
  mounted() {
    this.getTableData()
    this.addDate()
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
    ids(row) {
      row.state = '已处理'
      const upstate = JSON.stringify(row)
      sessionStorage.setItem('upstate', upstate)
    },
    ids02(row) {
      row.state = '已处理'
      const offstate = JSON.stringify(row)
      sessionStorage.setItem('offstate', offstate)
    },
    ids03(row) {
      row.state = '已处理'
      const putstate = JSON.stringify(row)
      sessionStorage.setItem('putstate', putstate)
    },
    ids04(row) {
      row.state = '已处理'
      const offputstate = JSON.stringify(row)
      sessionStorage.setItem('offputstate', offputstate)
    },
    getTableData() {
      getBsup().then((res) => {
        const {code} = res
        if (code === 200) {
          if (sessionStorage.getItem('upstate') !== null) {
            this.tableData = res.data.tableData
            const upstate = JSON.parse(sessionStorage.getItem('upstate'))
            for (var i = 0; i < this.tableData.length; i++) {
              if (this.tableData[i].id === upstate.id) {
                // 替换掉原来的
                this.tableData[i] = upstate
              }
            }
            // this.tableData.push(upstate)
          } else {
            this.tableData = res.data.tableData
          }
          if (sessionStorage.getItem('offstate') !== null) {
            this.tableData = res.data.tableData
            const offstate = JSON.parse(sessionStorage.getItem('offstate'))
            for (var j = 0; j < this.tableData.length; j++) {
              if (this.tableData[j].id === offstate.id) {
                // 替换掉原来的
                this.tableData[j] = offstate
              }
            }
          } else {
            this.tableData = res.data.tableData
          }
        }
      })
      getBsdep().then((res) => {
        const {code} = res
        if (code === 200) {
          if (sessionStorage.getItem('putstate') !== null) {
            this.tableData02 = res.data.tableBsdep
            const putstate = JSON.parse(sessionStorage.getItem('putstate'))
            for (var j = 0; j < this.tableData02.length; j++) {
              if (this.tableData02[j].id === putstate.id) {
                // 替换掉原来的
                this.tableData02[j] = putstate
              }
            }
          } else {
            this.tableData02 = res.data.tableBsdep
          }
          if (sessionStorage.getItem('offputstate') !== null) {
            this.tableData = res.data.tableBsdep
            const offputstate = JSON.parse(sessionStorage.getItem('offputstate'))
            for (var i = 0; i < this.tableData02.length; i++) {
              if (this.tableData02[i].id === offputstate.id) {
                // 替换掉原来的
                this.tableData02[i] = offputstate
              }
            }
          } else {
            this.tableData02 = res.data.tableBsdep
          }
        }
      })
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
  /* margin-top: 10px; */
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
</style>
