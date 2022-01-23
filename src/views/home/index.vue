<template>
 <div class="home-container">
   <van-nav-bar class="page-nav-bar" fixed>
     <van-button
     class="search-btn"
     round
     size="small"
     slot="title"
     icon="search"
     type="info"
     to="/search"
     >搜索</van-button>
   </van-nav-bar>
   <!-- 频道列表 -->
   <van-tabs class="channel-tab" v-model="active" animated swipeable>
    <van-tab
    v-for="channel in channels"
    :key="channel.id"
    :title="channel.name"
    >
    <articleList :channel = "channel"/>
    </van-tab>

    <div slot="nav-right" class="placeholder"></div>
    <div
    slot="nav-right"
    class="gengduo"
    @click="isChannelEditShow = true"
    >
      <i class="toutiao toutiao-gengduo"></i>
    </div>
  </van-tabs>
   <!-- 频道列表 -->
   <!-- 弹层 -->
   <van-popup
    v-model="isChannelEditShow"
    closeable
    position="bottom"
    close-icon-position="top-left"
    :style="{ height: '100%' }"
  >
     <channelEdit
     :myChannels ="channels"
     :active="active"
     @updata-active="updataActive"
     ></channelEdit>
   </van-popup>
   <!-- 弹层 -->
 </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import articleList from './compnents/articleList.vue'
import channelEdit from './compnents/channelEdit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage.js'

export default {
  name: 'homeIndex',
  components: {
    articleList,
    channelEdit
  },
  data () {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  methods: {
    async loadChannel () {
      try {
        // const { data } = await getUserChannels()
        // console.log(data)
        // this.channels = data.data.channels
        let channels = []
        if (this.user) {
          const { data } = await getUserChannels()
          channels = data.data.channels
        } else {
          const localChannels = getItem('TOUTIAO_CHANNELS')
          if (localChannels) {
            channels = localChannels
          } else {
            const { data } = await getUserChannels()
            channels = data.data.channels
          }
        }
        this.channels = channels
      } catch (err) {
        this.$toast('获取失败')
      }
    },
    updataActive (index, isChannelEditShow = true) {
      this.active = index
      this.isChannelEditShow = isChannelEditShow
    }
  },
  created () {
    this.loadChannel()
  },
  mounted () {},
  updated () {}
}
</script>
<style lang='less' scoped>
.home-container {
  padding-bottom: 100px;
  padding-top: 184px;
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .page-nav-bar {
    .search-btn {
      width: 555px;
      height: 64px;
      background-color: #5babfb;
      border: none;
      font-size: 28px;
      .van-icon {
        font-size: 32px;
        color: #fff;
      }
    }
  }

  /deep/ .channel-tab {
    .van-tabs__wrap {
      height: 82px;
      position: fixed;
      left: 0;
      top: 92px;
      right: 0;
      z-index: 2;
    }
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777;
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
    }
    .gengduo {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.8;
      i.toutiao {
        font-size: 33px;
      }
      .placeholder {
      width: 66px;
      height: 82px;
      flex-shrink: 0;
      }
    }
  }
}
</style>
