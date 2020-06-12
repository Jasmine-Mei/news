<template>
  <div class="login">
      <div class="container">
        <div class="close"><span class="iconfont iconicon-test"></span></div>
        <div class="logo"><span class="iconfont iconnew"></span></div>
        <div class="inputs">
          <myinput
            placeholder="请输入用户名/手机号"
            :rules='/^(\d{5,6})$|^(1\d{10})$/'
            msg='用户名或者手机号输入不正确'
            :value='users.username'
            @input='handleinput'
          />
          <myinput
            placeholder="请输入密码"
            :rules='/^\S{3,16}$/'
            msg='请输入3-16位的密码'
            v-model='users.password'
            type="password"
          />
        </div>
        <p class="tips">
          没有账号？
          <a href="#/register" class="">去注册</a>
        </p>
        <mybutton class="button" @click="login">登录按钮</mybutton>
      </div>
    </div>
</template>

<script>
import mybutton from '@/components/mybutton'
import myinput from '@/components/myinput'
import { login } from '@/apis/user.js'
export default {
  data () {
    return {
      users: {
        username: '10086',
        password: '123'
      }
    }
  },
  components: {
    mybutton, myinput
  },
  methods: {
    // async标记当前方法中有异步操作
    async login () {
      if (/^(\d{5,6})$|^(1\d{10})$/.test(this.users.username) && /^\S{3,16}$/.test(this.users.password)) {
        // await：
        // 1.可以获取当前操作的返回结果
        // 2.await可以让后续的操作等待，只是执行完当前使用await标记的方法之后才会执行后续的操作
        let res = await login(this.users)
        // console.log(res)
        if (res.data.message === '用户不存在') {
          // 提示用户
          this.$toast.fail(res.data.message)
        } else {
          // 将当前接收到的token实现本地存储
          localStorage.setItem('blackHorse-token', res.data.data.token)
          // 为了后期的操作，将当前用户数据也存储到本地
          localStorage.setItem('blackHorse-tokens', JSON.stringify(res.data.data.user))
          // 实现页面的跳转
          this.$router.push({ path: `/personal/${res.data.data.user.id}` })
        }
      } else {
        this.$toast.fail('用户数据不合法')
      }
    },
    handleinput (data) {
      this.users.username = data
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>
