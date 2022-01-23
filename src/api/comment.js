// 评论请求模块
import request from '@/utils/request'

// 获取文章评论列表
export const getComment = params => {
  return request({
    url: '/v1_0/comments',
    method: 'GET',
    params
  })
}

// 对评论点赞
export const addCommentlike = target => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target
    }
  })
}

// 删除文章点赞
export const delCommentlike = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${target}`
  })
}

// 发布文章评论
export const addComment = data => {
  return request({
    method: 'post',
    url: '/v1_0/comments',
    data
  })
}
