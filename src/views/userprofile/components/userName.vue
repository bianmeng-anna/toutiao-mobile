<template>
 <div class="userName">
     <van-nav-bar
        title="设置昵称"
        left-text="取消"
        right-text="完成"
        @click-left="$emit('close')"
        @click-right="onConfirm"
     />
    <div class="text">
      <van-field
        v-model.trim="localName"
        rows="2"
        type="textarea"
        maxlength="10"
        placeholder="请输入昵称"
        show-word-limit
      />
  </div>
 </div>
</template>

<script>
import { UserProfile } from '@/api/user'
export default {
  name: 'userName',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      localName: this.value
    }
  },
  computed: {},
  watch: {},
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        if (this.localName.length === 0) {
          this.$toast('用户昵称不能为空')
          return
        }
        await UserProfile({ name: this.localName })
        // 更新视图
        this.$emit('input', this.localName)
        // 关闭弹层
        this.$emit('close')
        // 提示成功
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast('操作失败')
      }
    }
  },
  created () {},
  mounted () {},
  updated () {}
}
</script>
<style lang='less' scoped>
.userName {
  .text {
    margin: 10px 10px 10px 10px;
  }
}
</style>
