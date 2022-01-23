<template>
 <div class="searchHistory">
   <van-cell title="搜索历史">
     <div v-if="isDeleteShow">
     <span @click="$emit('search-historyes')">全部删除$nbsp;$nbsp;</span>
     <span @click="isDeleteShow = false">完成</span>
     </div>
     <van-icon v-else name="delete-o" @click="isDeleteShow = true"/>
   </van-cell>
   <van-cell
   :title="item"
   v-for="(item, index) in searchHistories"
   :key="index"
   @click="onSearchItemClick(item, index)"
   >
     <van-icon v-show="isDeleteShow" name="close" />
   </van-cell>
 </div>
</template>

<script>

export default {
  name: 'searchHistory',
  components: {},
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    onSearchItemClick (item, index) {
      // 如果编辑状态下 则 删除
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1)
      }
      // 非编辑状态 则跳转
      this.$emit('searchHistor', item)
    }
  },
  created () {},
  mounted () {},
  updated () {}
}
</script>
<style lang='less' scoped>

</style>
