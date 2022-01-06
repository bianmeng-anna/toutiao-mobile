// 存储用户相关请求模块
import request from '@/utils/request'

export const login = data => {
  return request({
    url: '/v1_0/authorizations',
    method: 'post',
    data
  })
}
// 发送验证码，手机号每分钟一分
// export const sendSms = data => {
//     return request({
//     url:`/v1_0/sms/codes/${mobile}`,
//     method: 'get',
//     data
// })}
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `v1_0/sms/codes/${mobile}`
  })
}
