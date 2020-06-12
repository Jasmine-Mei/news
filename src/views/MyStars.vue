<template>
  <div class="stars">
    <hmheader title="我的收藏">
      <span
        slot="left"
        class="iconfont iconjiantou2"
        @click="$router.back()"
      ></span>
    </hmheader>

    <van-swipe-cell v-for="item in startsList" :key="item.id">
      <hmarticleBlock
        :post="item"
        @click="$router.push({ path: `/articleDetail/${item.id}` })"
      ></hmarticleBlock>
      <template slot="right">
        <van-button square type="danger" text="删除" />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import hmheader from '@/components/myheader.vue'
import hmarticleBlock from '@/components/myarticleBlock.vue'
import { getUserStars } from '@/apis/user.js'
export default {
  components: {
    hmheader,
    hmarticleBlock
  },
  data () {
    return {
      startsList: []
    }
  },
  async mounted () {
    let res = await getUserStars()
    this.startsList = res.data.data
  }
}
</script>

<style></style>
