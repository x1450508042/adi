<template>
  <el-card style="margin: 20px">
    <div class="lisw">
      <img src="../assets/images/申诉 (1).png" alt="">
      <span>申诉处理</span>
    </div>
    <div class="lisw">
      <el-tabs v-model="activeName">
        <el-tab-pane label="待处理" name="first">
          <el-table :data="tableData" style="width: 100%;top:5px;" :default-sort="{prop: 'date', order: 'descending'}">
            <el-table-column sortable prop="id" label="任务编号">
            </el-table-column>
            <el-table-column prop="name" label="任务名称">
            </el-table-column>
            <el-table-column prop="uname" label="任务发布方">
            </el-table-column>
            <el-table-column prop="service" label="申诉内容">
            </el-table-column>
            <el-table-column prop="date" label="日期">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" plain @click="ids(scope.row)">查看</el-button>
                <el-button size="mini" type="success" plain @click="ids02(scope.$index,scope.row)">完成</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="page">
            <el-pagination :page-size="100" layout="prev, pager, next, jumper" :total="1000">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已处理" name="second">
          <el-table :data="tableData02" style="width: 100%;top:5px;"
                    :default-sort="{prop: 'date', order: 'descending'}">
            <el-table-column sortable prop="id" label="任务编号">
            </el-table-column>
            <el-table-column prop="name" label="任务名称">
            </el-table-column>
            <el-table-column prop="encode" label="任务奖励">
            </el-table-column>
            <el-table-column prop="uname" label="任务发布方">
            </el-table-column>
            <el-table-column sortable prop="offdate" label="日期">
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
  name: 'appeal',
  data() {
    return {
      isoff: true,
      tableData: [],
      tableData02: [],
      offlook: [],
      activeName: 'first',
      systemTime: '',
      lookoff: {}
    }
  },
  mounted() {
    this.getTableData()
    this.addDate()
  },
  methods: {
    getTableData() {
      getService().then((res) => {
        const {code} = res
        if (code === 200) {
          if (sessionStorage.getItem('myoffser') !== null) {
            const serve = JSON.parse(sessionStorage.getItem('myoffser'))
            this.tableData.push(serve)
          } else if (sessionStorage.getItem('tableapp') !== null) {
            this.tableData = JSON.parse(sessionStorage.getItem('tableapp'))
            Object.keys(this.tableData).map((item) => {
              if (!this.tableData[item]) {
                delete this.tableData[item]
              }
              return true
            })
          } else if (sessionStorage.getItem('rows') !== null) {
            this.offlook = res.data.tableData
            const off = JSON.parse(sessionStorage.getItem('rows'))
            delete this.offlook[off.id - 1]
            const info = JSON.stringify(this.offlook)
            sessionStorage.setItem('offlook', info)
            this.tableData = JSON.parse(sessionStorage.getItem('offlook'))
            // 删除空值的方法
            Object.keys(this.tableData).map((item) => {
              if (!this.tableData[item]) {
                delete this.tableData[item]
              }
              return true
            })
          } else {
            this.tableData = res.data.tableData
            Object.keys(this.tableData).map((item) => {
              if (!this.tableData[item]) {
                delete this.tableData[item]
              }
              return true
            })
          }
        }
      })
      getPass().then((res) => {
        const {code} = res
        if (code === 200) {
          if (sessionStorage.getItem('rows') !== null) {
            this.tableData02 = res.data.tablePass
            const rows = JSON.parse(sessionStorage.getItem('rows'))
            rows.id = this.tableData02.length + 1
            this.tableData02.push(rows)
          } else {
            this.tableData02 = res.data.tablePass
          }
        }
      })
    },
    ids(e) {
      const offstate = JSON.stringify(e)
      sessionStorage.setItem('look', offstate)
      this.$router.push({
        name: 'look'
      })
    },
    ids02(index, row) {
      this.tableData.splice(row.id - 1, 1)
      const tableapp = JSON.stringify(this.tableData)
      sessionStorage.setItem('tableapp', tableapp)
      const rows = JSON.stringify(row)
      sessionStorage.setItem('rows', rows)
      sessionStorage.removeItem('myoffser')
      alert('处理完成')
      window.history.go(0)
    }
  }
}
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
</style>
