<template>
  <div class="basetable" id="heades">
    <el-card>
      <div class="tableMain">
        <div class="lisw">
          <img src="../assets/images/文档.png" alt="">
          <span>任务大厅</span>
        </div>
        <div class="tagr">
          <div class="fl">
            <div class="select-label">
              <label for="" class="fl zitia">任务级别:</label>
              <div class="qwe">
                <span :class="{'active':activeLabel.rankId==''}"
                      @click="addLabel('rankId','')">全部</span>
                <span :class="{'active':activeLabel.rankId=='0'}"
                      @click="addLabel('rankId','0')">普通</span>
                <span :class="{'active':activeLabel.rankId=='1'}"
                      @click="addLabel('rankId','1')">一般</span>
                <span :class="{'active':activeLabel.rankId=='2'}"
                      @click="addLabel('rankId','2')">困难</span>
              </div>
            </div>
            <div class="select-label">
              <label class="fl zitia" for="">任务时间:</label>
              <div class="qwe">
                <span :class="{'active':activeLabel.limits==''}" @click="addLabel('limits','')">全部</span>
                <span :class="{'active':activeLabel.limits=='1'}" @click="addLabel('limits','1')">1天</span>
                <span :class="{'active':activeLabel.limits=='3'}" @click="addLabel('limits','3')">3天</span>
                <span :class="{'active':activeLabel.limits=='7'}" @click="addLabel('limits','7')">7天</span>
                <span :class="{'active':activeLabel.limits=='8'}"
                      @click="addLabel('limits','8')">7以上</span>
              </div>
            </div>
            <div class="select-label">
              <label class="fl zitia" for="">任务奖励:</label>
              <div class="qwe">
                <span :class="{'active':activeLabel.quj===''}" @click="addLabel('quj','')">全部</span>

                <span :class="{'active':activeLabel.quj==='1'}" @click="addLabel('quj','1')">0-99</span>
                <span :class="{'active':activeLabel.quj==='2'}"
                      @click="addLabel('quj','2')">100-199</span>
                <span :class="{'active':activeLabel.quj==='3'}"
                      @click="addLabel('quj','3')">200-499</span>
                <span :class="{'active':activeLabel.quj==='4'}" @click="addLabel('quj','4')">500以上</span>
              </div>

            </div>
          </div>
        </div>
        <el-table :data="tableData02" style="width: 100%;top:5px;" :default-sort="{prop: 'date', order: 'descending'}" v-loading.fullscreen.lock="load">
          <el-table-column prop="id" label="任务编号">
          </el-table-column>
          <el-table-column prop="hallname" label="任务名称">
          </el-table-column>
          <el-table-column sortable prop="encode" label="任务奖励">
          </el-table-column>
          <el-table-column prop="rank" label="任务级别">
          </el-table-column>
          <el-table-column prop="limits" label="任务时限">
          </el-table-column>
          <el-table-column sortable prop="dates" label="日期">
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="{row,$index}">
              <el-button size="small" @click="ids(row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination @current-change="handleCurrentChange"
                       :current-page="page" :page-size="size" layout="prev, pager, next, total,jumper"
                       :total="total">
        </el-pagination>
      </div>
    </el-card>

  </div>
</template>
<script type="text/ecmascript-6">
import {reqgetHallList} from "@/api/login";

export default {
  data() {
    return {
      load:this.load,
      activeLabel: {
        rankId: '',
        limits: '',
        quj: ''
      },
      page: 1,
      size: 5,
      total: 0,
      tableData: [],
      tableData02: [],
      dialogFormVisible: false,
      formLabelWidth: '80px',
      loading: true
    }
  },
  methods: {
    async getHallList() {
      let res = await reqgetHallList()
      if (res.code == 200) {
        this.tableData = res.data
        this.fenyes()
      }
    },
    // 分页
    fenyes() {
      this.tableData02 = this.tableData.slice((this.page - 1) * this.size, this.page * this.size)
      this.total = this.tableData.length
    },
    addLabel(type, value) {
      this.activeLabel[type] = value
    },
    showTime() {
      this.$alert(this.value6, '起止时间', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: '已显示'
          })
        }
      })
    },
    update() {
      this.tableData.push(this.form)
      this.dialogFormVisible = false
    },

    ids(e) {
      this.$router.push({
        name: 'dita',
        params: e
      })
    },
    handleCurrentChange(val) {
      this.page = val
      this.fenyes()
    },

  },
  mounted() {
    this.getHallList()
    sessionStorage.setItem('page', this.page)
    sessionStorage.setItem('size', this.page)
  },
  watch: {
    'activeLabel': {
      deep: true,
      handler: function (val) {
        let filter = Object.keys(val)
        this.tableData02 = this.tableData.filter((item) => {
          return filter.every(key => {
            return String(item[key]).includes(
                String(val[key]).trim()
            )
          })
        })

      }
    }
  }
}
</script>
<style lang="scss" scoped>
.select-label {
  width: 100%;
  float: left;
  margin: 5px;
}

.zitia {
  font-size: 14px;
}

.qwe {
  width: 500px;
  float: left;
  margin-left: 20px;
}

.active {
  background: #3473E6;
  color: #fff;
}

.qwe span {
  float: left;
  padding: 3px;
  margin-left: 20px;
  font-size: 12px;
  cursor: pointer;
}

#heades {
  padding: 20px;
}

.page {
  margin-top: 20px;
}

.radios {
  margin-left: 30px;
  display: inline-block;
}

.fl {
  float: left;
}

.tagr {
  width: 100%;
  float: left;
  height: 100px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.tagr::after {
  content: "";
  display: block;
  clear: both;
}

.lisw {
  padding-top: 10px;
  padding-left: 10px;
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

</style>
