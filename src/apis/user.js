// 引入的axios已经配置好基准路径
import axios from '@/utils/myaxios.js'

// 1.登陆
export const login = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}
// 2.根据id获取用户详情
export const getUserById = (id) => {
  return axios({
    url: `/user/${id}`
  })
}

// 3.更新个人信息
export const updateUserById = (id, data) => {
  return axios({
    method: 'post',
    url: `/user_update/${id}`,
    data
  })
}

// 4.实现用户注册
export const register = (data) => {
  return axios({
    method: 'post',
    url: '/register',
    data
  })
}
// 5.关注用户
export const followUser = (id) => {
  return axios({
    url: `/user_follows/${id}`
  })
}

// 6.取消关注
export const unFollowUser = (id) => {
  return axios({
    url: `/user_unfollow/${id}`
  })
}

// 7.用户关注列表
export const getUserFollows = () => {
  return axios({
    url: `/user_follows`
  })
}

// 8.用户收藏列表
export const getUserStars = () => {
  return axios({
    url: `/user_star`
  })
}
