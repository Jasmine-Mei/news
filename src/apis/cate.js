// 引入的axios已经配置好基准路径
import axios from '@/utils/myaxios.js'

// 1.获取所有栏目数据
export const getCateList = () => {
  return axios({
    url: '/category'
  })
}
