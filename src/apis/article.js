// 引入的axios已经配置好基准路径
import axios from '@/utils/myaxios.js'

// 1.获取栏目的新闻数据
export const getPostList = (params) => {
  return axios({
    url: '/post',
    params
  })
}

// 2.根据文章的id获取文章详情
export const getArticleById = (id) => {
  return axios({
    url: `/post/${id}`
  })
}

// 3.点赞和取消点赞
export const likeArticle = (id) => {
  return axios({
    url: `/post_like/${id}`
  })
}

// 4.收藏和取消收藏
export const starArticle = (id) => {
  return axios({
    url: `/post_star/${id}`
  })
}

// 5.获取文章评论列表
export const getCommentList = (id, params) => {
  return axios({
    url: `/post_comment/${id}`,
    params
  })
}

// 6.发表评论
export const replyComment = (id, data) => {
  return axios({
    method: 'post',
    url: `/post_comment/${id}`,
    data
  })
}
