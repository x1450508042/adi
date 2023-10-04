<template>
  <div>
    <template v-for="item in routers" >
      <template v-if="item.children">
        <template v-for="(text,index) in item.children" >
          <el-menu-item v-if="!text.meta.hidden" :index="text.path" @click="goRoute(text)">
            <template v-slot:title>
              <img :src="text.meta.icon" alt="">
              <span>{{ text.meta.title }}</span>
            </template>
          </el-menu-item>
        </template>
      </template>
    </template>


  </div>
</template>
<style scoped>

.el-menu-item img {
  width: 16px;
  height: 16px;
  display: inline-block;
  margin-right: 10px;
}
</style>

<script>

export default {
  name:'Menu',
  props:['routers'],
  data () {
    return {
      isCollapse: false,
      // menu: [
      //   {
      //     path: '/',
      //     name: 'Main',
      //     label: '任务大厅',
      //     icon: require('@/assets/images/主页.png'),
      //     url: 'Main'
      //   },
      //   {
      //     path: '/mall',
      //     name: 'mall',
      //     label: '任务管理',
      //     icon: require('@/assets/images/任务.png'),
      //     url: 'mall'
      //   },
      //   {
      //     path: '/user',
      //     name: 'user',
      //     label: '用户管理',
      //     icon: require('@/assets/images/个人.png'),
      //     url: 'user'
      //   }
      // ]
    }
  },
  methods: {
    goRoute (item) {
      this.$router.push(item.path)
    }
  }
}
</script>
