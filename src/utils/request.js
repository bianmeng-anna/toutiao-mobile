import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'

// JSONBig.parse()
// JSONBig.stringify()
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  // 自定义返回原始大数据
  // data 后端返回的原始数据，json格式的字符串
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (err) {
      return data
    }
  }]
})

export default request

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  // config ：本次请求的配置对象
  // config 里面有一个属性：headers
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
