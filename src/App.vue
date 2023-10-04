<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
a {
  text-decoration: none;
}
</style>
<script>
export default {
  mounted() {
    if(this.$store.state.LoginUser.token=='' && localStorage.getItem('token') ){
        this.$store.commit('TOKENS',localStorage.getItem('token'))
    }
  }
}
</script>
