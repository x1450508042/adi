<script>
export default {
  name: "Main"
}
</script>

<template>
  <div class="ys">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <!-- 渲染一级路由组件的子路由 v-if="flag"用来控制组件销毁的 通过watch 来监听 -->
        <component :is="Component" v-if="flag"></component>
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
.ys {
  width: calc(100vw - 200px);
  height: calc(100vh - 62px);
  background: rgba(0, 21, 41, 0.117647058823529);
  overflow: auto;
}
</style>
