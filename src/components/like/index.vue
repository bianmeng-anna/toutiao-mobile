<template>
 <van-button
 :icon="value === 1? 'good-job' : 'good-job-o'"
 @click="onClickLick"
 :loading="loading"
 :class="{red: value===1 }"
 />
</template>

<script>
import { likingFollow, delliking } from '../../api/user'

export default {

  name: 'likeIndex',
  components: {},
  props: {
    value: {
      type: Number,
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
    async onClickLick () {
      try {
        this.loading = true
        let state = -1
        if (this.value === 1) {
          // 如果是点赞状态，则调用取消
          await delliking(this.articleId)
        } else {
        // 如果是取消，则调用点赞
          await likingFollow(this.articleId)
          state = 1
        }
        // 更新视图
        this.$emit('input', state)
        this.$toast.success(state === 1 ? '点赞成功' : '取消点赞')
      } catch (err) {
        this.$toast.fail('操作失败')
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
.red {
  color: red;
}
.van-button--default {
  border: unset;
}
</style>
