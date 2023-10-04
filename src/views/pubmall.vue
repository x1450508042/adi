<template>
  <el-card style="margin: 20px">
    <div class="lisw">
      <img src="../assets/images/文档.png" alt="">
      <span>发布任务</span>
    </div>
    <el-row class="butbj">
      <el-button size="mini" @click='min()' type="primary">发布任务</el-button>
    </el-row>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="当前任务" name="first">
          <el-table
            :data="tableData"
            border
            style="width: 100%" :default-sort = "{prop: 'id', order: 'descending'}">
            <el-table-column sortable prop="id" label="任务编号" >
            </el-table-column>
            <el-table-column prop="name" label="任务名称">
            </el-table-column>
            <el-table-column prop="encode" label="任务奖励">
            </el-table-column>
            <el-table-column prop="rank" label="任务级别" >
            </el-table-column>
            <el-table-column prop="limit" label="任务时限" >
            </el-table-column>
            <el-table-column sortable prop="date" label="日期">
            </el-table-column>
          </el-table>
          <div class="page">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="历史任务" name="second">
          <el-table
            :data="tableData02"
            border
            style="width: 100%" :default-sort = "{prop: 'id', order: 'descending'}">
            <el-table-column sortable prop="id" label="任务编号" >
            </el-table-column>
            <el-table-column prop="name" label="任务名称">
            </el-table-column>
            <el-table-column prop="encode" label="任务奖励">
            </el-table-column>
            <el-table-column prop="rank" label="任务级别" >
            </el-table-column>
            <el-table-column prop="limit" label="任务时限" >
            </el-table-column>
            <el-table-column sortable prop="date" label="日期">
            </el-table-column>
          </el-table>
          <div class="page">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-card>
</template>
<script>
export default {
  name:'pubmall',
  data () {
    return {
      tableData: [],
      tableData02: [],
      past: {},
      activeName: 'first'
    }
  },
  methods: {
    min () {
      this.$router.push('/minuit')
    }
  }
}
</script>
<style scoped>
.butbj {
  width: 80px!important;
  margin-bottom: 20px;
}
#cons {
  margin-top: 20px;
  height: 86vh;
}
#mheader {
  height: 150px;
  background: #fff;
  /* background-color: #000; */
}
.classmain {
  margin-top: 10px;
  background: #fff;
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
  margin:10px 0;
}
.ys {
  color: rgb(45, 57, 224);
}
.el-row {
  margin-top: 10px;
  width: 170px;
}
.lisw {
  margin-bottom: 20px;
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
  font-weight: 700;
}
.page {
  margin-top: 20px;
}
</style>
