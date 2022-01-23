import request from '@/utils/request'

// 获取文章列表
export const getAticleList = params => {
  return request({
    method: 'get',
    url: '/v1_0/articles',
    params

  })
}

// 获取文章新闻内容
export const getAticleById = articleId => {
  return request({
    method: 'get',
    url: `/v1_0/articles/${articleId}`
  })
}

// 收藏文章
export const addCollect = target => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}

// 取消收藏文章
export const delCollect = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`
  })
}
