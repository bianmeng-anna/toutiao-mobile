<template>
 <div class="layout-container">
     <!-- 子路由出口 -->
     <router-view></router-view>
     <van-tabbar v-model="active" route>
        <van-tabbar-item to="/">
            <i slot="icon" class="toutiao toutiao-shouye"></i>
            首页
        </van-tabbar-item>
        <van-tabbar-item to="/qa">
            <i slot="icon" class="toutiao toutiao-wenda"></i>
            问答
        </van-tabbar-item>
        <van-tabbar-item to="/video">
            <i slot="icon" class="toutiao toutiao-shipin"></i>
            视频
        </van-tabbar-item>
        <van-tabbar-item to="/my">
            <i slot="icon" class="toutiao toutiao-wode"></i>
            {{$store.state.user? '我的':'未登陆'}}
        </van-tabbar-item>
     </van-tabbar>
 </div>
</template>

<script>

export default {
  name: 'layoutIndex',
  components: {},
  data () {
    return {
      active: 0
    }
  },
  computed: {},
  watch: {},
  methods: {},
  created () {},
  mounted () {},
  updated () {}
}
</script>
<style lang='less' scoped>

</style>
