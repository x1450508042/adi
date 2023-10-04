import Vue from 'vue'
import VueRouter from 'vue-router'
import  {cosntRouter} from './routes'
import userStore from "@/store";

// 解决vue-router在3.0版本以上重复点报错问题
//开始添加代码
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes =cosntRouter

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(){
    return {
      top:0,
      left:0
    }
  }
})

// 路由守卫
router.beforeEach(async (to,from,next)=>{
  if(userStore.state.LoginUser.token || localStorage.getItem('token')){
    //登录成功不能访问登录页了
    if(to.path == '/login'){
      next({path:'/'})
    }else{
      // 登录成功有无用户信息
      if(userStore.state.LoginUser.username){
        next()
      }else{
        try {
         await userStore.dispatch('loginInfo')
          //避免token失效无法获取用户数据时 一直发送请求。
          //等路由加载完毕后再放行
          next()
        }catch (e) {
          //这里说明没有token了
          userStore.dispatch('LoginO', {username:localStorage.getItem('username')})
          next({path:'/login'})
        }
      }
    }
  }else{
    //用户未登录 只能访问 登录 注册 忘记密码页面
    if(to.path == '/login' || to.path == '/forget' || to.path == '/regin'){
      next()
    }else{
      //要是访问的是别的页面 就把他定向到login页面去
      next({path:'/login'})
    }
  }
})


export default router
