<template>
 <div class="articleList">
     <van-pull-refresh
        v-model="isFreshLoading"
        :success-text="refreshSuccessText"
        @refresh="onRefresh"
        :success-duration="1500"
     >
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
            @load="onLoad"
        >
        <articleItem :article = "article"
        v-for="(article,index) in list"
        :key="index"
        />
        <!-- <van-cell v-for="(obj,index) in list" :key="index" :title="obj.title" /> -->
    </van-list>
</van-pull-refresh>
 </div>
</template>

<script>
import { getAticleList } from '@/api/article'
import articleItem from '@/components/articleItem/index.vue'
export default {
  name: 'articleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  components: {
    articleItem
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isFreshLoading: false, // 控制下拉刷新的状态
      refreshSuccessText: '刷新成功'
    }
  },
  computed: {},
  watch: {},
  methods: {
    async onLoad () {
      try {
        const { data } = await getAticleList({
          channel_id: this.channel.id, // 频道id
          timestamp: this.timestamp || Date.now() // 时间戳  页码
        })
        const { results } = data.data
        this.list.push(...results)
        // console.log(results)
        this.loading = false
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        //   展示错误提示状态
        this.error = true
        this.loading = false
      }
    },
    async onRefresh () {
      try {
        const { data } = await getAticleList({
          channel_id: this.channel.id, // 频道id
          timestamp: Date.now() // 时间戳  页码
        })
        const { results } = data.data
        this.list.unshift(...results)
        // console.log(results)
        this.isFreshLoading = false
        this.refreshSuccessText = `刷新成功 更新了${results.length}条数据`
      } catch (err) {
        //   展示错误提示状态
        this.loading = false
        this.refreshSuccessText = '刷新失败'
      }
    }
  },
  created () {},
  mounted () {},
  updated () {}
}
</script>
<style lang='less' scoped>
.articleList {
    height:80vh;
    overflow-y:auto;
}
</style>
