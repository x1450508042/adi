import router from '@/router'
import axios from 'axios'
import cookie from './cookie'
import globalVar from '@/configs/globalVar'

const baseUrl = process.env.VUE_APP_API_BASE_URL

// 30秒中断请求
axios.defaults.timeout = 30000

// 拦截发送请求
axios.interceptors.request.use(
  config => {
    const token = cookie.get(globalVar.TOKEN)
    token && (config.headers.Authorization = 'Bearer ' + token)
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// 拦截返回结果
axios.interceptors.response.use(
  res => {
    if (res.status === 200) {
      let token
      if (res.headers && res.headers.authorization) {
        token = res.headers.authorization
        cookie.set(globalVar.TOKEN, token)
      }
      if (res.data.code === 10127 || res.data.code === 10126 || res.data.code === 10117) {
        // token失效
        cookie.remove(globalVar.TOKEN)
        router.replace('/login')
      }
    }
    return res
  },
  err => {
    return Promise.reject(err)
  }
)

/**
 * request封装
 */
function fetchData (method, url, data = {}) {
  return new Promise((resolve, reject) => {
    let request
    if (method === 'get' || method === 'delete') {
      request = axios[method](baseUrl + url, { params: data })
    } else {
      request = axios[method](baseUrl + url, data)
    }
    request
      .then(res => {
        resolve(res)
      })
      .catch(e => {
        reject(e)
      })
  })
}

const get = function (url, params) {
  return fetchData('get', url, params)
}

const post = function (url, data) {
  return fetchData('post', url, data)
}

const put = function (url, data) {
  return fetchData('put', url, data)
}

const remove = function (url, params) {
  return fetchData('delete', url, params)
}

const upload = function (url, data) {
  const formData = new FormData()
  Object.keys(data).forEach((child) => {
    formData.append(child, data[child])
  })
  return post(url, formData)
}

export default {
  baseUrl,
  get,
  post,
  put,
  remove,
  upload
}
