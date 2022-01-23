<template>
 <div class="searchResult">
   <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
      v-for="(article, index) in list"
      :key="index"
      :title="article.title"
      />
    </van-list>
 </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'searchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      per_page: 20,
      page: 1,
      error: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    async onLoad () {
      try {
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText
        })
        // 模拟随机失败的情况
        // if (Math.random() > 0.3) {
        //   JSON.parse('adfqeereqrawereqwr')
        // }
        this.list.push(...data.data.results)
        console.log(this.list)
        this.loading = false
        if (data.data.results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (err) {
        this.$toast('获取失败')
        // 展示加载失败的状态
        this.error = true
        this.loading = false
      }
    }
  },
  created () {},
  mounted () {},
  updated () {}
}
</script>
<style lang='less' scoped>

</style>
