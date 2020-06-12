<template>
  <div class="personal">
    <router-link :to="{ path: `/editPersonal/${currentInfo.id}` }">
      <div class="profile">
        <!-- $axios.defaults.baseURL读取axios的服务器路径 -->
        <img :src="currentInfo.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan"></span
            >{{ currentInfo.nickname }}
          </div>
          <div class="time">{{ currentInfo.create_date | dateFormat }}</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <mycell
      title="我的关注"
      desc="关注的用户"
      @click="$router.push({ name: 'MyFollows' })"
    ></mycell>
    <mycell title="我的跟帖" desc="跟帖/回复"></mycell>
    <mycell title="我的收藏" desc="文章/视频"  @click="$router.push({name:'MyStars'})"></mycell>
    <mycell title="设置"></mycell>
    <mybutton class="btn" @click="exit">退出</mybutton>
  </div>
</template>

<script>
import mycell from '@/components/mycell.vue'
import mybutton from '@/components/mybutton.vue'
import { getUserById } from '@/apis/user.js'
import { dateFormat } from '@/utils/myfilters.js'
export default {
  components: {
    mycell,
    mybutton
  },
  filters: {
    dateFormat
  },
  data () {
    return {
      currentInfo: {}
    }
  },
  async mounted () {
    let res = await getUserById(this.$route.params.id)
    if (res.data.message === '获取成功') {
      this.currentInfo = res.data.data
      this.currentInfo.create_date = this.currentInfo.create_date
        ? this.currentInfo.create_date
        : new Date()
      if (this.currentInfo.head_img) {
        this.currentInfo.head_img =
          'http://127.0.0.1:3000' + this.currentInfo.head_img
      } else {
        // 如果没有图片，则设置默认图片
        this.currentInfo.head_img =
          'http://127.0.0.1:3000/uploads/image/default.png'
      }
    }
  },
  methods: {
    exit () {
      // 清除token数据
      localStorage.removeItem('blackHorse-token')
      // 加到首页
      this.$route.push({ name: 'Index' })
    }
  }
}
</script>

<style lang="less" scoped>
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}
a {
  color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}

.btn {
  margin: 20px auto;
  background-color: #f00;
}
</style>
