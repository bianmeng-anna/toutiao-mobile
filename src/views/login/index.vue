<template>
 <div class="login-container">
     <van-nav-bar
        title="登陆" class="page-nav-bar"
     >
     <van-icon slot="left" name="cross" @click="$router.back()"/>
     </van-nav-bar>
    <van-form @submit="onSubmit" ref="loginForm">
        <van-field
            v-model="user.mobile"
            name="mobile"
            placeholder="请输入手机号"
            :rules="userFormRules.mobile"
            type="number"
            maxlength="11"
        ><i slot="left-icon" class="toutiao toutiao-shouji"></i>
        </van-field>
        <van-field
            v-model="user.code"
            name="code"
            placeholder="请输入验证码"
            :rules="userFormRules.code"
            type="number"
            maxlength="6"

        ><i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
         <van-count-down
         :time="10 * 1000
         " format="ss s"
         v-if="isContDown"
         @finish="isContDown = false"
         />
            <van-button v-else @click="onSendSms" class="sent-msg" round size="small" type="default" native-type="button">发送验证码</van-button>
        </template>
        </van-field>
        <div style="margin: 30px;">
            <van-button block type="info" native-type="submit">登录</van-button>
        </div>
    </van-form>
 </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'loginIndex',
  components: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      isContDown: false,
      userFormRules: {
        mobile: [{
          required: true,
          message: '请填写用户名'
        },
        {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '请填写验证码'
        },
        {
          pattern: /^\d{6}$/,
          message: '手机号格式错误'
        }]
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    async onSubmit () {
    //   console.log('submit', values)
      //   1.获取表单数据   用户认证（登录注册），data里声明一个对象user 有 mobile和code ，通过v-model绑定到输入框 v-model:user.mobile
      const user = this.user
      // 2.表单验证
      this.$toast.loading({
        message: '登陆中...',
        forbidClick: true
      })
      // 3.提交 表单 请求登陆, 把用户认证接口 api封装成请求方法 进行调用 ，把axios引入过来 导出一个方法 里面用return
      // 4.根据请求响应结果触发后续操作  成功/登陆
      try {
        const res = await login(user)
        this.$toast.success('登陆成功')
        // 提交用户token到store
        this.$store.commit('setUser', res.data.data)
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          return this.$toast.fail('验证码输入错误')
        } else {
          this.$toast.fail('登陆失败，请稍候重试')
          console.log(err)
        }
      }
    },
    async onSendSms () {
      console.log(11)
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return this.$toast('验证码有误')
      }
      // 2.验证通过，显示倒计时
      this.isContDown = true
      // 3.请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        this.isContDown = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁，稍候再试')
        } else {
          this.$toast('发送失败')
        }
      }
    }
  },
  created () {},
  mounted () {},
  updated () {}
}
</script>
<style lang='less' scoped>
.login-container {
    .toutiao {
        font-size: 27px;
    }
    .sent-msg {
        background-color: #eee;
        .van-button--small {
            font-size: 22px;
            color: #666;
        }
    }
}
</style>
