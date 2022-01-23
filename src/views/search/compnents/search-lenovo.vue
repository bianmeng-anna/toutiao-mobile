<template>
 <div class="searchLenovo">
   <van-cell
   :title="text"
   icon="search"
   v-for="(text, index) in searchLenovo"
   :key="index"
   @click="$emit('search',text)"
   >
    <div slot="title" v-html="lightHight(text)"></div>
   </van-cell>
    <!-- <van-cell title="000" icon="search">
   </van-cell> -->
 </div>
</template>

<script>
import { getSearchLenove } from '@/api/search'
import { debounce } from 'lodash'

export default {
  name: 'searchLenovo',
  components: {},
  props: {
    searchText: {
      type: String
    }
  },
  data () {
    return {
      searchLenovo: [],
      htmlStr: ''
    }
  },
  computed: {},
  watch: {
    searchText: {
      // handler (value) {
      //   this.loadSearchLenovo(value)
      // },
      // debounce防抖函数
      handler: debounce(function (value) {
        this.loadSearchLenovo(value)
      }, 1000),
      immediate: true
    }
  },
  methods: {
    async loadSearchLenovo (q) {
      try {
        const { data } = await getSearchLenove(q)
        this.searchLenovo = data.data.options
      } catch (err) {
        this.$toast('获取失败')
      }
    },
    lightHight (text) {
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, `<span style="color:red">${this.searchText}</span>`)
    }
  },
  created () {},
  mounted () {},
  updated () {}
}
</script>
<style lang='less' scoped>

</style>
