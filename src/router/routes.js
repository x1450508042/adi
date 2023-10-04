
//常量路由
export const cosntRouter = [
  {
    path: '/',
    name: 'Layout',
    component: ()=>import('@/components/layout/index.vue'),
    redirect:'/hall',
    children:[
      {
        //任务大厅
        path:'/hall',
        name:'hall',
        meta:{
          icon: require('@/assets/images/主页.png'),
          hidden:false,
          title:'任务大厅'
        },
        component:()=>import('@/views/hall.vue')
      },
      {
        //任务管理
        path:'/mall',
        name:'mall',
        meta:{
          icon: require('@/assets/images/任务.png'),
          hidden:false,
          title:'任务管理'
        },
        component:()=>import('@/views/mall.vue')
      },
    ]
  },

  {
    path: '/login',
    name: 'login',
    meta:{
      icon: require('@/assets/images/任务.png'),
      title:"登录",
      hidden:true
    },
    component: () => import('../views/login.vue'),
    // redirect:'/login'
  },
  {
    path: '/regin',
    name: 'regin',
    meta:{
      hidden:true
    },
    component: () => import( '../views/regin.vue')
  },
  {
    path: '/forget',
    name: 'forget',
    meta:{
      hidden:true
    },
    component: () => import( '../views/forget.vue')
  }
]

//异步路由
export const asyncRouter=[
  {
    path: '/',
    name: 'Layout',
    component: ()=>import('@/components/layout/index.vue'),
    redirect:'/hall',
    children:[
      {
        //任务详情
        path:'/dita',
        name:'dita',
        meta:{
          hidden:true,
        },
        component:()=>import('@/views/dita.vue')
      },
      {
        //个人中心
        path:'/userMag',
        name:'userMag',
        meta:{
          icon: require('@/assets/images/个人.png'),
          hidden: false,
          title:'个人中心'
        },
        component:()=>import('@/views/userMag.vue')
      },
      {
        //发布任务
        path:'/pubmall',
        name:'pubmall',
        meta:{
          icon: require('@/assets/images/任务.png'),
          hidden:false,
          title:'发布任务'
        },
        component:()=>import('@/views/pubmall.vue')
      },
      {
        //发布任务子页面
        path:'/minuit',
        name:'minuit',
        meta:{
          hidden:true,
        },
        component:()=>import('@/views/minuit.vue')
      },
      //管理员拥有的
      {
        //账号管理
        path:'/userSetting',
        name:'userSetting',
        meta:{
          icon: require('@/assets/images/个人.png'),
          hidden:false,
          title:'账号管理'
        },
        component:()=>import('@/views/userSetting.vue')
      },
      //申诉处理
      {
        path:'/appeal',
        name:'appeal',
        meta:{
          icon: require('@/assets/images/申诉.png'),
          hidden:false,
          title:'申诉处理'
        },
        component:()=>import('@/views/appeal.vue')
      },
      //提现充值  extract
      {
        path:'/extract',
        name:'extract',
        meta:{
          icon: require('@/assets/images/支付 (3).png'),
          hidden:false,
          title:'申诉处理'
        },
        component:()=>import('@/views/extract.vue')
      },
    ]
  },

]
