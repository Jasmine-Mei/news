// 这个就是当前项目中的路由模块，以后与路由配置相关的代码全部在这个文件中搞定
// 1.引入Vue
import Vue from 'vue'
// 2.引入VueRouter--构造函数
import VueRouter from 'vue-router'

// 引入路由所需要映射的组件
import Login from '@/views/login.vue'
import Personal from '@/views/personal.vue'
import EditPersonal from '@/views/EditPersonal.vue'
import Index from '@/views/Index.vue'
import Register from '@/views/Register.vue'
import ArticleDetail from '@/views/ArticleDetail.vue'
import MyFollows from '@/views/MyFollow.vue'
import MyStars from '@/views/MyStars.vue'
import Comment from '@/views/Comment.vue'
// 3.挂载：明确的告诉vue，使用vue-router来进行路由的管理
// 如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能
Vue.use(VueRouter)

// 创建路由对象
let router = new VueRouter({
  routes: [
    {
      name: 'Index',
      path: '/',
      component: Index
    },
    {
      name: 'Index',
      path: '/index',
      component: Index
    },
    {
      name: 'Comment',
      path: '/comment/:id',
      component: Comment
    },
    {
      name: 'MyStars',
      path: '/myStars',
      component: MyStars
    },
    {
      name: 'MyFollows',
      path: '/myFollows',
      component: MyFollows
    },
    {
      name: 'Login',
      path: '/login',
      component: Login
    },
    {
      name: 'Register',
      path: '/register',
      component: Register
    },
    {
      name: 'Personal',
      path: '/personal/:id',
      component: Personal
    },
    {
      name: 'EditPersonal',
      path: '/editPersonal/:id',
      component: EditPersonal
    },
    {
      name: 'ArticleDetail',
      path: '/articleDetail/:id',
      component: ArticleDetail
    }
  ]
})

// 添加导航守卫:前置守卫：在跳转之前进行调用
// 所有路由跳转请求都会经过这个导航守卫
// to:目标路由
// from:源路由
// next:下一步的操作，就是用户当前需要进行的操作
// router.beforeEach((to, from, next) => {
//   // 并不是每个页面的访问都需要先登陆
//   if (to.path.indexOf('/personal') === 0) { // 这里说明你要访问个人中心页
//     // 如果用户登陆过，则进行路由的跳转，否则重定向到登陆页
//     let token = localStorage.getItem('toutiao_41_token')
//     if (token) { // 如果有token说明你登陆过了
//       next()
//     } else {
//       // 如果是访问需要授权的页面且没有登陆过，则重定向到登陆页
//       next({ name: 'Login' })
//     }
//   } else { // 如果不是访问需要授权的页面，如新闻页，那么不需要判断是否登陆
//     next()
//   }
// })

// 暴露
export default router
