<template>
<van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
  :error = "error"
  error-text="加载失败"
  :immediate-check = false
>
  <!-- <van-cell v-for="(item,index) in list" :key="index" :title="item.content" /> -->
   <commentItem
   v-for="(item,index) in list"
   :comment = "item"
   @reply-click="$emit('reply-click',$event)"
   :key="index"  />
</van-list>
</template>

<script>
import { getComment } from '@/api/comment'
import commentItem from './commentItem.vue'
export default {
  name: 'commentList',
  components: {
    commentItem
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    async onLoad () {
      try {
        const { data } = await getComment({
          type: this.type, // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source.toString(), // 文章id或评论id
          offset: this.offset, //  获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit //  获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        })
        console.log(data)
        // 将数据添加到列表中
        const { results } = data.data
        this.list.push(...results)
        // 加载完成传递父组件
        this.$emit('sourceId', data.data)
        // 将loading设置为false
        this.loading = false
        // 判断是否还有数据  如果有就获取下一页 如果没有就将finished设置为true
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  },
  created () {
    this.loading = true
    this.onLoad()
  },
  mounted () {},
  updated () {}
}
</script>
<style lang='less' scoped>

</style>
