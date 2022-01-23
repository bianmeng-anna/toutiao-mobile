<template>
 <div class="channelEdit">
     <van-cell :border = 'false'>
        <div slot="title" class="titleText">我的频道</div>
        <van-button
        class="edit-btn"
        type="danger"
        size="mini"
        plain
        round
        @click="isEdit = !isEdit"
        >{{isEdit? '完成':'编辑'}}</van-button>
     </van-cell>
    <van-grid :gutter="10" class="my-grid">
        <van-grid-item
        class="grid-item"
        v-for="(channel,index) in myChannels"
        :key="index"
        @click="onMychannelClick(channel,index)"
        >
        <van-icon slot="icon" name="clear" v-show="isEdit &&!fiexChannels.includes(channel.id)"></van-icon>
        <span
        slot="text"
        class="text"
        :class="{active: active === index}"
        >{{channel.name}}</span>
        </van-grid-item>
    </van-grid>
         <!-- 频道列表 -->
     <van-cell :border = 'false'>
        <div slot="title" class="titleText">频道推荐</div>
     </van-cell>
    <van-grid :gutter="10" class="recommend-grid">
        <van-grid-item class="grid-item" icon="plus" v-for="(channel, index) in recommentChannels" :key="index" :text="channel.name" @click="onAddChannel(channel)" />
    </van-grid>
     <!-- 频道列表 -->
 </div>
</template>

<script>
import { getAllChannels, getChannelList, deleteChannelList } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'channelEdit',
  components: {},
  props: {
    myChannels: [],
    active: Number
  },
  data () {
    return {
      allChannels: [],
      isEdit: false,
      fiexChannels: [0] // 固定频道不允许删除
    }
  },
  computed: {
    ...mapState(['user']),
    // eslint-disable-next-line vue/return-in-computed-property
    recommentChannels () {
      return this.allChannels.filter(channle => {
        return !this.myChannels.find(mychannel => {
          return mychannel.id === channle.id
        })
      })
    }
    //       const channels = []
    //       this.allChannels.forEach(channel => {
    //         const ret = this.myChannels.find(mychannel => {
    //           return mychannel.id === channel.id
    //         })
    //         if (!ret) {
    //           channels.push(channel)
    //         }
    //       })
    //       return channels
    //     }
  },
  watch: {},
  methods: {
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('获取失败', err)
      }
    },
    async onAddChannel (channel) {
      this.myChannels.push(channel)
      if (this.user) {
        // 如果已登陆，则存储到线上 先找到用户的user状态  映射mapState
        try {
          await getChannelList({
            id: channel.id,
            seq: this.myChannels.length
          })
        } catch (err) {
          this.$toast('保存失败')
        }
        // 调用接口  批量修改用户频道列表
        // 封装请求方法
        // 请求调用
      } else {
        // 如果未登陆，则存储到本地   把setItem引入过来调用
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    onMychannelClick (channel, index) {
      console.log(channel, index)
      //   如果是固定频道则不删除
      if (this.fiexChannels.includes(channel.id)) {
        return
      }
      if (this.isEdit) {
        // 如果编辑状态 则删除
        this.myChannels.splice(index, 1)
        // 如果index比 当前active 小 则让active-1 否则直接删除
        if (index <= this.active) {
          this.$emit('updata-active', this.active - 1, true)
        }
        // 4.处理删除状态的持久化
        this.deleteChannel(channel)
      } else {
        // 如果非编辑状态 则切换频道
        this.$emit('updata-active', index, false)
      }
    },
    async deleteChannel (channel) {
      try {
        if (this.user) {
        //   如果已登陆，则存储到线上
        // 调用接口 删除指定用户频道
          await deleteChannelList(channel.id)
          // 封装请求方法
          // 请求调用
        } else {
          //    如果未登陆，则存储到本地
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (err) {
        this.$toast('操作失败')
      }
    }
  },
  created () {
    this.loadAllChannels()
  },
  mounted () {},
  updated () {}
}
</script>
<style lang='less' scoped>
.channelEdit {
    padding: 85px 0;
    .titleText {
        font-size: 32px;
        color: #333;
    }
    .edit-btn {
        width: 104px;
        height: 48px;
        font-size: 26px;
        color: #f85959;
        border: 1px solid #f85959;
    }
    /deep/ .grid-item {
        width: 160px;
        height: 86px;
        .van-grid-item__content {
            background-color: #f4f5f6;
            white-space: nowrap;
            .van-grid-item__text, .text {
                font-size: 28px;
                color: #222;
                margin-top: 0;
            }
            .active {
                color: red;
            }
            .van-grid-item__icon-wrapper {
                position: unset;
            }
        }
    }
    /deep/ .my-grid {
        .grid-item {
            .van-icon-clear {
                position: absolute;
                right: -5px;
                top: -5px;
                font-size: 30px;
                color: #cacaca;
                z-index: 2;
            }
        }
    }
    /deep/ .recommend-grid {
        .grid-item {
            .van-grid-item__content {
                flex-direction: row;
                .van-icon-plus {
                    font-size: 28px;
                    margin-right: 6px;
                }
                .van-grid-item__text {
                margin-top: unset;
            }
            }
        }
    }
}
</style>
