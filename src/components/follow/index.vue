/* eslint-disable vue/no-parsing-error */
<template>

<van-button
    v-if="value"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="loading"
    @click="onFollow"
  >关注</van-button>
  <van-button
    v-else
    round
    size="small"
    :loading="loading"
    @click="onFollow"
>已关注</van-button>

</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'

export default {
  name: 'followIndex',
  components: {},
  data () {
    return {
      loading: false
    }
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, Object, String],
      required: true
    }
  },
  computed: {},
  watch: {},
  methods: {
    async onFollow () {
      this.loading = true
      try {
        if (this.value) {
          // 已关注，则取消关注
          await deleteFollow(this.userId)
        } else {
          // 取消关注，则添加关注
          await addFollow(this.userId)
        }
        // 更新视图状态
        // this.$emit('updata-is_followed', !this.value)
        this.$emit('input', !this.value)
      } catch (err) {
        let message = '获取失败'
        if (err.response && err.response.status === 404) {
          message = '不能关注自己'
        }
        this.$toast(message)
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

</style>
