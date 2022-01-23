import request from '@/utils/request'
// import store from '@/store'

// 获取用户登陆接口
export const login = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}

// 获取验证码接口
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}

// 获取用户个人信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

// 获取用户频道列表
export const getUserChannels = () => {
  return request({
    url: '/v1_0/user/channels',
    method: 'get'
  })
}

// 关注用户
export const addFollow = target => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target
    }
  })
}

// 取消关注用户
export const deleteFollow = target => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE'
  })
}

// 点赞用户
export const likingFollow = target => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target
    }
  })
}

// 取消点赞用户
export const delliking = target => {
  return request({
    url: `/v1_0/article/likings/${target}`,
    method: 'DELETE'
  })
}

// 获取用户个人资料
export const getUserProfile = () => {
  return request({
    url: '/v1_0/user/profile',
    method: 'get'
  })
}

// 更改个人资料
export const UserProfile = data => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}

// 更新用户照片资料
export const UserPhoto = data => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data
  })
}
