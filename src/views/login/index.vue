<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar" title="登录页面" />
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        left-icon="smile-o"
        v-model="user.mobile"
        :rules="userRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="iconfont icon-shouji1"></i>
      </van-field>
      <van-field
        name="code"
        placeholder="验证码"
        left-icon="smile-o"
        v-model="user.code"
        :rules="userRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma1"></i>
        <template #button>
          <van-count-down
            v-if="isCountShow"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountShow = false"
          />
          <van-button
            v-else
            round
            size="small"
            type="primary"
            class="send_btn"
            @click="onsendsms"
            native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn">
        <van-button block type="info" class="loginbtn" native-type="submit"
          >登陆</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
// import { mapmutions } from 'vuex'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userRules: {
        mobile: [
          {
            required: true,
            message: '请填写手机号'
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '请填写密码'
          },
          {
            pattern: /^\d{6}$/,
            message: '密码格式错误'
          }
        ]
      },
      isCountShow: false // 是否显示倒计时
    }
  },

  mounted () {},

  methods: {
    async onSubmit (values) {
      // 1.获取表单数据
      const user = this.user
      //     // 2.表单验证
      // 组件中调用必须通过this.$toast
      this.$toast.loading({
        message: '登陆中...',
        forbidClick: true, // 禁用背景点击
        duration: 0
      })

      //     // 3.提交表单请求登陆

      try {
        const { data } = await login(this.user)
        console.log('登陆 成功', data.status)
        this.$store.commit('serUser', data.data)
        this.$toast.success('成功')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('登不上')

          console.log(err.response.data.message)
        } else {
          this.$toast.fail('登不上')
        }
      }
      // 4.根据请求响应结果处理后续操作
    },
    async onsendsms () {
      // 1.校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
        // console.log('验证成功');
        // this.isCountShow = !this.isCountShow
      } catch (err) {
        return console.log('验证失败', err)
      }

      // 2.验证通过显示倒计时
      this.isCountShow = true
      // 3.请求发送验证码
      try {
        const res = await sendSms(this.user.mobile)
        console.log(res)
        this.$toast('发送成功')
      } catch (err) {
        this.isCountShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后再试')
        } else {
          this.$toast('发送失败')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container .iconfont {
  font-size: 37px;
}

.send_btn {
  width: 152px;
  height: 46px;
  font-size: 22px;
  color: #000;
  background-color: #ededed;
  border: none;
}

.login-btn {
  margin: 53px 33px;

  .loginbtn {
    background-color: #6db4fb;
    border: none;
  }
}
</style>
