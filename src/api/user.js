// 用户相关的axios请求
import requset from '@/utils/request'

// 登录请求
export const loginApi = data => {
  return requset.post('/auth/login', data)
}

// 获取人员相关信息
export const getUserApi = () => {
  return requset.get('/auth/currentUser')
}
