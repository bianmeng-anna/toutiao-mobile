<template>
 <div class="my-container">
   <!-- 已登陆页面 -->
   <div v-if="user" class="header user-info">
     <div class="base-info">
       <div class="left">
         <van-image
          round
          fit="cover"
          class="avatar"
          :src="useInfo.photo"
        />
        <span class="name">{{useInfo.name}}</span>
       </div>
       <div class="right">
         <van-button size="mini" round to="/user/profile">编辑资料</van-button>
       </div>
     </div>
     <div class="data-state">
       <div class="data-item">
         <div class="count">{{useInfo.art_count}}</div>
         <div class="text">头条</div>
       </div>
       <div class="data-item">
         <div class="count">{{useInfo.follow_count}}</div>
         <div class="text">关注</div>
       </div>
       <div class="data-item">
         <div class="count">{{useInfo.fans_count}}</div>
         <div class="text">粉丝</div>
       </div>
       <div class="data-item">
         <div class="count">{{useInfo.like_count}}</div>
         <div class="text">获赞</div>
       </div>
     </div>
   </div>
   <!-- 未登陆页面 -->
   <div v-else class="header not-login">
     <div class="login-btn" @click="$router.push('/login')">
       <img class="mobile-img" src="@/assets/mobile.png" alt="">
       <span class="text">登陆 / 注册</span>
     </div>
   </div>

   <van-grid :column-num="2" class="grid-nav" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item"  >
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <van-cell class="info-cell" title="消息通知" is-link>
    </van-cell>
    <van-cell title="小智同学" is-link>
    </van-cell>
    <van-cell v-if="user" class="lagout" center title="退出登陆" @click="onLogout"></van-cell>
 </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'myIndex',
  components: {},
  data () {
    return {
      useInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  methods: {
    onLogout () {
      this.$dialog.confirm({
        title: '确认退出吗？'
      })
        .then(() => {
          // 清除user
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    // 加载个人信息
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        this.useInfo = data.data
        console.log(this.useInfo)
      } catch (err) {
        this.$toast('获取失败')
      }
    }

  },
  created () {
    if (this.user) {
      this.loadUserInfo()
    }
  },
  mounted () {},
  updated () {}
}
</script>
<style lang='less' scoped>
.my-container {
.header {
    height: 361px;
    background: url('~@/assets/banner.png');
    background-size: cover;
  }

  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .user-info {
    .base-info {
      display: flex;
      justify-content: space-between;
      height: 231px;
      // background-color: pink;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          margin-right: 23px;
          border: 1px solid #fff;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-state {
      height: 130px;
      display: flex;
      .data-item {
        flex: 1;
        height: 130px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .count {
          font-size: 36px;
          color: #fff;
        }
        .text {
          font-size: 23px;
          color: #fff;
        }
      }
    }
  }
  .grid-nav {
    .grid-item {
      height: 141px;
    }
    i.toutiao {
      font-size: 45px;
    }
    .toutiao-shoucang {
      color: red;
    }
    .toutiao-lishi {
      color: orange;
    }
    span.text {
      font-size: 28px;
    }
  }
  .info-cell {
    margin-top: 10px;
  }
  .lagout {
    text-align: center;
    color: red;
    margin-top: 10px;
  }
}
</style>
