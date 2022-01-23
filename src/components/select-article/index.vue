<template>
<van-button
        :icon="value ? 'star' : 'star-o'"
        :class="{collected: value}"
        @click ="onCollect(articleId)"
        :loading="loading"
      />
</template>

<script>
import { addCollect, delCollect } from '@/api/article'
export default {
  name: 'select-article',
  components: {},
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    async onCollect () {
      this.loading = true
      try {
        console.log(11)
        if (this.value) {
        //   如果收藏，点击时则取消
          await delCollect(this.articleId)
        } else {
          //   如果取消，点击时则收藏
          await addCollect(this.articleId)
        }
        // 更新视图 ，不能直接修改数据value，用input事件提交给父级v-module
        this.$emit('input', !this.value)
        // 提示用户，收藏是否成功
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (err) {
        this.$toast.fail('操作失败，稍候重试')
      }
      this.loading = false
    }
  },
  created () {},
  mounted () {},
  updated () {}
}
</script>
<style lang='less' scoped>
.collected {
    .van-icon {
        color: #ffa500;
    }
}
.van-button--default {
  border: unset;
}
</style>
