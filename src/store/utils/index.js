const state ={
  //全局的加载效果
  loadings:false
}
const mutations ={
  UPDATELOA(state,val){
    state.loadings=val
  }
}
const actions={}
export default {
  state,
  mutations,
  actions
}
