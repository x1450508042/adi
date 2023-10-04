import {logininfo, LoginOut, LoginUsers} from "@/api/login";
import {cosntRouter,asyncRouter} from "@/router/routes";
import {cloneDeep} from "@/ulits";
import router from "@/router";

function fillterAsyncRouter(asyncRoute, routes) {
  return asyncRoute.filter((item) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = fillterAsyncRouter(item.children, routes)
      }
      return true
    }
  })
}

const state = {
  token: '',
  username: "",
  mobile: "",
  userRouter: cosntRouter,
  role:0
}
const mutations = {
  LOGINU(state, data) {
    state.token = data.token
    state.username = data.username
  },
  TOKENS(state, token) {
    state.token = token
  },
  LOGINOUT(state) {
    state.token = ''
    state.username = ''
  },
  LOGININFO(state,data){
    state.username=data.username
    state.mobile=data.iphone
    state.role=data.role
    //筛选当前用户需要展示的路由  这个要深拷贝一份 不然改变了账号路由也会变化
    let userAsyncRouter =fillterAsyncRouter([...asyncRouter],data.router.split(','))
    state.userRouter=[...cosntRouter,...userAsyncRouter]
    let userroute =[...userAsyncRouter]
    //目前路由器管理的只有常量路由: 计算完毕的异步路由任意路由动态追加
    userroute.forEach((route)=>{
      //追加路由
      router.addRoute(route)
    })
  }
}
const actions = {
  async loginU({commit}, loginusers) {
    let res = await LoginUsers(loginusers)
    if (res.code === 200) {
      commit('LOGINU', res.data)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('username', res.data.username)
      return 'ok'
    } else {
      return Promise.reject(new Error(res.msg))
    }

  },
  async LoginO({commit}, data) {
    let res = await LoginOut(data)
    if (res.code === 200) {
      commit('LOGINOUT')
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      return 'ok'
    } else {
      return Promise.reject(new Error(res.msg))
    }
  },
  async loginInfo({commit}){
    let res = await logininfo()
    if(res.code == 200){
      commit('LOGININFO',res.data[0])
      return 'ok'
    }else{
      return Promise.reject(new Error(res.msg))
    }
  }
}

export default {
  state,
  mutations,
  actions
}
