
// new Date(getNowDate()).getTime()  可以转换成当前时间戳
export const getNowDate = () => {
    let myDate = new Date;
    let year = myDate.getFullYear(); //获取当前年
    let mon = myDate.getMonth() + 1; //获取当前月
    let date = myDate.getDate(); //获取当前日
    // let hours = myDate.getHours(); //获取当前小时
    // let minutes = myDate.getMinutes(); //获取当前分钟
    // let seconds = myDate.getSeconds(); //获取当前秒
    // let now = year + "-" + mon + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    let now = year + "-" + mon + "-" + date

    return now;
}
// 时间戳：1637244864707
/* 时间戳转换为时间 */
export const timestampToTime=(timestamp)=> {
    timestamp = timestamp ? timestamp : null;
    let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    // let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    // let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    // let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    // return Y + M + D + h + m + s;
    return Y + M + D ;

}

//倒计时
export function countDown(tim){
    // 创建目标时间对象
    var target_time = new Date(tim);
    // 计算目标时间对象到当前时间的毫秒数
    var reduce_ms = target_time.getTime() - Date.now();
    // 返回需要的数据
    return {
        day  : parseInt(reduce_ms / 1000 / 3600 / 24),
        hour : parseInt(reduce_ms / 1000 / 3600 % 24),
        min  : parseInt(reduce_ms / 1000 / 60 % 60 ),
        sec  : Math.round(reduce_ms / 1000 % 60)
    }
}

//克隆 深浅拷贝
export function cloneDeep(obj) {
    //判断传过来的是否是对象
    let objValue = typeof obj
    if(objValue != null && typeof obj ==='object' ||typeof value ==='function'){
        const newObj={}
        for(let k in obj){
            newObj[k]=cloneDeep(obj[k])
        }
    }else{
        //不是对象类型 直接返回
        return obj
    }
}
