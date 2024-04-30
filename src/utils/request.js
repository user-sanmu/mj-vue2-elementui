// 导入axios
import router from '@/router'
import axios from 'axios'

// 创建axios实例,配置根路径
const requset = axios.create({
  baseURL: 'http://interview-api-t.itheima.net'
})

// 添加请求拦截器
requset.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const token = localStorage.getItem('mj-pc-token')
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
requset.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('mj-pc-token')
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

// 导出配置好的实例
export default requset
