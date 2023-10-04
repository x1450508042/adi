import request from "../ulits/request.js";
export const LoginUsers = (data) =>
  request({ url: "/login", method: "post", data });

export const logininfo=()=>request({url:'/userInfo',method:'get'})

//注册
export const regReqs=(data)=>request(({url:'/reg',method:'post',data}))

//修改
export const forget=(data)=>request({url:'/forget',method:'post',data})

//退出登录
export const LoginOut=(data)=>request({url:'/loginout',method:'post',data})

//获取所有用户信息
export const reqgetHallList=()=>request({url:'/hall',method:'get'})

//接取任务
export const reqFetchHall=(data)=>request({url:'/fetchs',method:'post',data})

//获取任务
export const reqGetHall=()=>request({url:'/getHall',method:'post'})

//获取当前用户接取的任务
export const reqUserGetHall=()=>request({url:'/getHall/userhall',method:'post'})

//获取单独的任务
export const reqMyHall=(data)=>request({url:'/hall/myHall',method:'post',data})

//修改任务状态为完成
export const reqSetHall=(data)=>request({url:'/fetchs/setfetch',method:'post',data})

//发布任务
export const reqAddHall=(data)=>request({url:'/addhall',method:'post',data})

//获取所有的任务
export const reaListHall=()=>request.get('/hall/list')
//已完成的任务
export const reqwinHall=()=>request.get('/getHall/lists')


