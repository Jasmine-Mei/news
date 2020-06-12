<template>
  <div class="edit">
    <myheader title="编辑个人信息">
      <!-- <van-icon name="arrow-left" slot='left' @click="$router.back()"/> -->
      <span
        class="iconfont iconjiantou2"
        slot="left"
        @click="$router.back()"
      ></span>
    </myheader>
    <div class="userimg">
      <img :src="currentInfo.head_img" alt="" />
      <van-uploader :after-read="afterRead" />
    </div>
    <mycell
      title="昵称"
      :desc="currentInfo.nickname"
      @click="nickshow = !nickshow"
    ></mycell>
    <van-dialog v-model="nickshow" title="标题" show-cancel-button>
    </van-dialog>
    <van-dialog
      v-model="nickshow"
      title="修改昵称"
      show-cancel-button
      @confirm="updateNickname"
    >
      <van-field
        ref="nick"
        :value="currentInfo.nickname"
        placeholder="请输入昵称"
        required
        label="昵称"
      />
    </van-dialog>

    <mycell title="密码" :desc="currentInfo.password" type="password"
    @click="passshow = !passshow"
    ></mycell>
    <van-dialog
      v-model="passshow"
      title="修改密码"
      show-cancel-button
      @confirm="updatePassword"
      :before-close="beforeClose"
    >
      <van-field
        ref="originPass"
        placeholder="请输入原密码"
        required
        label="原密码"
      />
      <van-field
        ref="newPass"
        placeholder="请输入新密码"
        required
        label="新密码"
      />
    </van-dialog>
    <mycell
      title="性别"
      :desc="currentInfo.gender === 0 ? '女' : '男'"
      @click="gendershow = !gendershow"
    ></mycell>
    <van-dialog
      v-model="gendershow"
      title="修改性别"
      show-cancel-button
      @confirm="updateGender"
    >
      <van-picker
        :columns="['女', '男']"
        :default-index="currentInfo.gender"
        @change="onChange"
      />
    </van-dialog>
  </div>
</template>

<script>
import myheader from '@/components/myheader.vue'
import mycell from '@/components/mycell.vue'
import { getUserById, updateUserById } from '@/apis/user.js'
import { uploadFile } from '@/apis/upload.js'
export default {
  components: {
    myheader,
    mycell
  },
  data () {
    return {
      currentInfo: {},
      nickshow: false,
      passshow: false,
      gendershow: false,
      gender: ''
    }
  },
  async mounted () {
    let res = await getUserById(this.$route.params.id)
    if (res.data.message === '获取成功') {
      this.currentInfo = res.data.data
      // 如果有图片，则拼接
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
    // 当用户选择完文件之后触发
    async afterRead (file) {
      // 此时可以自行将文件上传至服务器
      // file.file:是当前的文件对象
      let formdata = new FormData()
      formdata.append('file', file.file)
      let res = await uploadFile(formdata)
      if (res.data.message === '文件上传成功') {
        //   实现预览
        this.currentInfo.head_img = 'http://127.0.0.1:3000' + res.data.data.url
        // 再次发起请求，实现 用户头像的更新
        let res2 = await updateUserById(this.currentInfo.id, {
          head_img: res.data.data.url
        })
        if (res2.data.message === '修改成功') {
          this.$toast.success(res2.data.message)
        } else {
          this.$toast.success(res2.data.message)
        }
      } else {
        this.$toast.fail('文件上传失败')
      }
    },
    // 修改昵称
    async updateNickname () {
      let name = this.$refs.nick.$refs.input.value
      let res = await updateUserById(this.currentInfo.id, { nickname: name })
      if (res.data.message === '修改成功') {
        // 为了实现页面的刷新效果，需要将页面中昵称的绑定数据进行更新
        this.currentInfo.nickname = name
        this.$toast.success('修改成功')
      } else {
        this.$toast.success('修改失败')
      }
    },
    // 修改性别
    async updateGender () {
      let res = await updateUserById(this.currentInfo.id, {
        gender: this.gender
      })
      if (res.data.message === '修改成功') {
        // 为了实现页面的刷新，需要将页面中昵称的绑定数据进行更新
        this.currentInfo.gender = this.gender
        this.$toast.success('修改成功')
      } else {
        this.$toast.fail('修改失败')
      }
    },
    onChange (picker, value, index) {
      this.$toast(`当前值:${value},当前索引:${index}`)
      this.gender = index
    },
    async updatePassword () {
      // 获取用户输入的原密码，判断和用户密码是否匹配
      // 如果匹配，则获取用户输入的新密码，判断是否符合正则规范，如果符合，则获取新密码，实现密码的修改，如果不符合则给出提示
      // 如果原密码输入不正确，则给出提示
      let originPass = this.$refs.originPass.$refs.input.value
      if (originPass === this.currentInfo.password) {
        // 获取输入的新密码
        let newpass = this.$refs.newPass.$refs.input.value
        if (/^\S{3,16}$/.test(newpass)) {
          let res = await updateUserById(this.currentInfo.id, {
            password: newpass
          })
          if (res.data.message === '修改成功') {
            // 为了实现页面刷新效果，需要将页面中昵称的绑定数据进行更新
            this.currentInfo.password = newpass
            this.$toast.success('修改成功')
          } else {
            this.$toast.fail('修改失败')
          }
        } else {
          this.$toast.fail('修改失败')
        }
      }
    },
    // dialog关闭前的回调函数
    // action:confirm   cancel
    beforeClose (action, done) {
      // console.log(action)
      // 1.如果用户单击的是确认，那么就需要判断原密码是否输入正确
      if (action === 'confirm') {
        // 2.获取用户输入的原密码
        let originPass = this.$refs.originPass.$refs.input.value
        // 获取原密码进行密码否正确的判断
        if (originPass !== this.currentInfo.password) {
          // 3.给出提示
          this.$toast.fail('原密码输入不正确')
          // 4.阻止dialog的关闭
          this.$refs.originPass.$refs.input.select()
          this.$refs.originPass.$refs.input.focus()
          done(false)
        } else if (!/^\S{3,16}$/.test(this.$refs.newPass.$refs.input.value)) {
          this.$toast.fail('请输入3-16位的新密码')
          done(false)
        } else {
          done()
        }
      } else {
        done()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.userimg {
  height: 150px;
  position: relative;
  > img {
    width: 90/360 * 100vw;
    height: 90/360 * 100vw;
    display: block;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  /deep/.van-uploader__upload {
    width: 90/360 * 100vw;
    height: 90/360 * 100vw;
  }
  /deep/.van-uploader {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
}
</style>
