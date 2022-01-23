<template>
 <div class="search-container">
     <!-- 搜索栏 -->
     <form action="/" class="search">
        <van-search
            v-model="searchText"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @cancel="onCancel"
            background="#3296fa"
            @focus="isResultShow= false"
        />
     </form>
    <!-- 搜索栏 -->
    <!-- 搜索结果 -->
    <searchResult
    v-if="isResultShow"
    :search-text="searchText"
    />
    <!-- 搜索结果 -->

    <!-- 联想建议 -->
    <searchLenovo
    v-else-if="searchText"
    :search-text="searchText"
    @search="onSearch"
    />
    <!-- 联想建议 -->
    <!-- 搜索历史记录 -->
    <searchHistory
    v-else
    :searchHistories = "searchHistories"
    @search-historyes ="searchHistories = []"
    @searchHistor = "onSearch"
    />
    <!-- 搜索历史记录 -->

 </div>
</template>

<script>
import searchHistory from './compnents/search-history.vue'
import searchLenovo from './compnents/search-lenovo.vue'
import searchResult from './compnents/search-result.vue'
import { setItem, getItem } from '../../utils/storage'

export default {
  name: 'searchIndex',
  components: {
    searchHistory,
    searchLenovo,
    searchResult
  },
  data () {
    return {
      searchText: '',
      isResultShow: false, // 控制搜索结果的展示
      searchHistories: getItem('toutiao_search') || [] // 搜索的历史记录数据
    }
  },
  computed: {},
  watch: {
    searchHistories: {
      handler (val) {
        setItem('toutiao_search', val)
      }
    }
  },
  methods: {
    onSearch (val) {
      // 更新文本框
      this.searchText = val
      console.log(val)
      // 去重复
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      // 更新的数组放最前面
      this.searchHistories.unshift(val)
      // 显示搜索结果
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  },
  created () {},
  mounted () {},
  updated () {}
}
</script>
<style lang='less' scoped>
.search-container {
    padding-top: 108px;
    .van-search__action {
        color: #fff;
    }
    .search {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        z-index: 2;
    }
}
</style>
