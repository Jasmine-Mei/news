<template>
  <div class="login">
    <div class="container">
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="inputs">
        <!-- 使用封装组件时的属性设置默认会设置给封装组件的根元素 -->
        <!-- 如果封装组件设置了props,那么优先为props中的成员赋值 -->
        <myinput
          placeholder="请输入用户名/手机号"
          :rules="/^(\d{5,6})$|^(1\d{10})$/"
          msg="用户名或者手机号输入不正确"
          v-model="users.username"
        ></myinput>
        <myinput
          placeholder="请输入密码"
          :rules="/^\S{3,16}$/"
          msg="请输入3-16位的密码"
          v-model="users.password"
        ></myinput>
        <myinput
          placeholder="请输入昵称"
          :rules="/^\w+$/"
          msg="请输入昵称"
          v-model="users.nickname"
        ></myinput>
      </div>
      <p class="tips">
        已有账号？
        <a href="#/login" class>去登陆</a>
      </p>
      <mybutton @click="register">注册</mybutton>
    </div>
  </div>
</template>

<script>
import mybutton from '@/components/mybutton.vue'
import myinput from '@/components/myinput.vue'
import { register } from '@/apis/user.js'
export default {
  components: {
    mybutton, myinput
  },
  data () {
    return {
      users: {
        username: '',
        password: '',
        nickname: ''
      }
    }
  },
  methods: {
    async register () {
      let res = await register(this.users)
      if (res.data.message === '注册成功') {
        this.$toast.success('注册成功')
        this.$router.push({ name: 'Login' })
      } else {
        this.$toast.fail('注册失败')
      }
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
}</style
><style lang="less" scoped>
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
