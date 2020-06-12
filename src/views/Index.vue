<template>
  <div class="index">
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search" @click="$router.push({ name: 'Search' })">
        <van-icon name="search" />
        <span>搜索商品</span>
      </div>
      <div class="user" @click="$router.push({ path: `/personal/${id}` })">
        <van-icon name="manager-o" />
      </div>
    </div>
    <div class="nav">
      <!-- 整个标签页 -->
      <!-- 通过v-model绑定当前激活标签对应的索引值，默认情况下启用第一个标签 -->
      <van-tabs v-model="active" sticky swipeable>
        <!-- 单击标签项及内容面板 -->
        <!-- 生成栏目数据  -->
        <van-tab :title="cate.name" v-for="cate in cateList" :key="cate.id">
          <van-list
            v-model="cate.loading"
            :finished="cate.finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
            :offset="10"
          >
            <van-pull-refresh v-model="cate.isLoading" @refresh="onRefresh">
              <!-- 生成当前栏目的文章列表数据 -->
              <myarticleblock
                v-for="item in cate.postList"
                :key="item.id"
                :post="item"
                @click="$router.push({path:`/articleDetail/${item.id}`})"
              ></myarticleblock>
            </van-pull-refresh>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 新闻列表 -->
    <!-- <div class="newsList"></div> -->
  </div>
</template>

<script>
import { getCateList } from '@/apis/cate.js'
import { getPostList } from '@/apis/article.js'
import myarticleblock from '@/components/myarticleBlock.vue'
export default {
  data () {
    return {
      id: '',
      // 我们应该始终让头条被激活。如果登陆过，栏目数据中返回了关注，那么应该将active设置为1，否则设置为0
      active: localStorage.getItem('blackHorse-token') ? 1 : 0,
      cateList: []
    }
  },
  watch: {
    active () {
      // 重新发起请求，获取当前栏目的新闻数据
      // 注意：如果之前已经加载好数据了，那么就不用再重复的加载
      if (this.cateList[this.active].postList.length === 0) {
        this.init()
      }
    }
  },
  components: {
    myarticleblock
  },
  async mounted () {
    //   获取用户id
    this.id = JSON.parse(localStorage.getItem('blackHorse-tokens') || '{}').id

    // 获取所有栏目数据
    let res = await getCateList()
    this.cateList = res.data.data
    // 重点操作：对数据进行改造
    this.cateList = this.cateList.map(value => {
      return {
        ...value, // 展开对象，我要这个对象的所有成员
        postList: [], // 这个栏目的新闻列表数据
        pageSize: 5, // 这栏目每页所显示的记录数
        pageIndex: 1, // 这个栏目 当前的页码
        loading: false, // 这个栏目的加载状态
        finished: false, // 这个栏目的数据是否完全加载完毕
        isLoading: false // 这个栏目是否正在下拉刷新
      }
    })
    // 获取默认栏目的新闻数据，并动态渲染
    // this.cateList[this.active]:就是当前的默认栏目
    this.init()
  },
  methods: {
    // 下拉刷新
    onRefresh () {
      // 重新加载第一页
      // 1.重新加载页码
      this.cateList[this.active].pageIndex = 1
      // 2.清空数据
      this.cateList[this.active].postList.length = 0
      // 3.发起数据请求--异步请求
      setTimeout(() => {
        this.init()
      }, 1000)
    },

    // 上拉加载
    onLoad () {
      // 加载这个栏目的下一页数据
      this.cateList[this.active].pageIndex++
      setTimeout(() => {
        this.init()
      }, 1000)
    },
    // 1.获取当前被激活的栏目id
    // 2.根据这个栏目 id获取这个栏目的新闻数据，并存储在这个栏目的postList中
    // 3.遍历这个栏目的postList，生成新闻列表
    async init () {
      let id = this.cateList[this.active].id
      let res2 = await getPostList({
        pageSize: this.cateList[this.active].pageSize,
        pageIndex: this.cateList[this.active].pageIndex,
        category: id
      })
      // 将当前栏目的loding重置为false
      if (this.cateList[this.active].loading) {
        this.cateList[this.active].loading = false
      }
      // 重置isloading标记
      if (this.cateList[this.active].isLoading) {
        this.cateList[this.active].isLoading = false
      }

      // 如果所有数据加载完毕，则需要手动的将当前栏目的finished重置为true,以显示没有更多数据的提示
      if (res2.data.data.length < this.cateList[this.active].pageSize) {
        this.cateList[this.active].finished = true
      }
      // 将数据存储到当前栏目的postList中
      this.cateList[this.active].postList.push(...res2.data.data)
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  background-color: #f00;
  align-items: center;
  color: #fff;
  .logo {
    padding: 0 10px;
    .iconnew {
      font-size: 60px;
    }
  }
  .search {
    height: 40px;
    border-radius: 20px;
    flex: 1;
    background-color: rgba(255, 255, 255, 0.4);
    text-align: center;
    line-height: 40px;
  }
  .user {
    font-size: 25px;
    padding: 0 10px;
  }
}
</style>
