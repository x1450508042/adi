<template>
  <div class="heade">
    <div class="fl">
      <ul style="display: flex">
        <li class="flli"><img class="imgs" src="../../../assets/images/logo.png" alt=""></li>
        <li class="flli"><h3 style="font-weight:700">任务悬赏平台</h3></li>
        <li class="flli"><span>|</span><span class="zitsp">{{tabName}}</span></li>
      </ul>
    </div>
    <div class="fr">
      <el-popover
        placement="bottom-end"
        width="400"
        trigger="click">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>消息</span>
          </div>
          <div class="text item">
            {{ past.name + '已被' + past.username + '完成' }}
          </div>
        </el-card>
        <el-badge class="items" slot="reference" :is-dot='isdot'><img @click="isdots()" style="cursor:pointer;"
                                                                      src="../../../assets/images/消息 (1).png" alt="">
        </el-badge>
        <!-- <el is-dot  slot="reference"></el> -->

      </el-popover>
      <el-dropdown trigger="click">
      <span class="el-dropdown-link juli">
        {{ uname.usname }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-circle-close"><span @click="loginout">退出登录</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<style scoped lang="scss">
.heade {
  height: 100%;
  display: flex;
  justify-content: space-between;

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .items {
    width: 16px;
    height: 16px;
  }

  .items img {
    width: 100%;
    height: 100%;
  }

  .box-card {
    width: 480px;
  }

  .juli {
    margin-top: 20px;
  }

  .fl {
    margin-left: 10px;
  }

  .fr {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }

  .fr span {
    margin-left: 50px;
  }

  .flli {
    line-height: 60px;
    margin-right: 15px;

  }

  .flli span {
    color: rgb(138, 136, 136);
    margin-right: 10px;
  }

  .zitsp {
    font-size: 12px;
  }

  .imgs {
    width: 16px;
    height: 16px;
    margin-top: 22px;
  }

  .userimg {
    width: 30px;
    height: 30px;
  }

  .userimg img {
    width: 100%;
    height: 100%;
    border-radius: 30px;
  }
}

</style>
<script>
import {mapState} from "vuex"
export default {
  data() {
    return {
      userImg: require('../../../assets/images/user.jpg'),
      uname: {},
      tablePass: {},
      isdot: true,
      past: {}
    }
  },
  methods: {
    async loginout() {
      let username = localStorage.getItem('username')
      try {
        await this.$store.dispatch('LoginO', {username})
        location.reload();
        this.$message.success('退出成功')
      } catch (e) {
        this.$message.error('网络异常，稍后重试')
      }
    },
    isdots() {
      this.isdot = false
    }
  },
  computed:{
    ...mapState({
      names:state => state.LoginUser.role
    }),
    tabName(){
      let u =''
      switch (this.names) {
        case 1:
          u= '用户端'
          break;
        case  2:
          u='管理端'
          break
        case 3:
          u='超级管理端'
          break
        default:
          break
      }
      return u
    }
  }
}
</script>
