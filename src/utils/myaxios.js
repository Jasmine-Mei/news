import axios from 'axios'
// 设置基准路径
axios.defaults.baseURL = 'http://localhost:3000'

// 添加请求拦截器：所有请求都会经过这个拦截器
axios.interceptors.request.use((config) => {
  // 获取token
  let token = localStorage.getItem('blackHorse-token')
  if (token) {
    config.headers.Authorization = token
  }
  // 可以拦截请求对报文进行处理，但是拦截器并不会代替你来发请求，只是对发送请求时所传递的报文 数据进行必要的处理
  return config
},
function (error) {
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应的数据做点什么
  if (response.data.message === '用户信息验证失败' || response.data.message === '用户信息验证失败!') {
    location.href = '#/login'
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

export default axios
