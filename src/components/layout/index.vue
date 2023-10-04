<script>
import Tabbar from "./tabbar/index.vue";
import menu from "@/components/layout/menu/index.vue";
import main from "@/components/layout/main/index.vue";

export default {
  name: "Layout",
  data(){
    return{
      routers:this.$store.state.LoginUser.userRouter
    }
  },
  components: {
    TopBar: Tabbar,
    menus: menu,
    mains: main
  },
  mounted() {
    // console.log(this.routers)
  }
}
</script>

<template>
  <div>
    <!--  顶部tab-->
    <div>
      <TopBar></TopBar>
    </div>
    <div style="display: flex">
      <!--  左侧菜单-->
      <div>
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo"  background-color="#545c64"
                 text-color="#fff" active-text-color="#ffd04b">
          <menus :routers="routers"></menus>
          </el-menu>
      </div>
      <!--    内容区域-->
      <div>
        <mains></mains>
      </div>
    </div>
  </div>
</template>

<style scoped>
.el-menu {
  height: calc(100vh - 62px);
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
