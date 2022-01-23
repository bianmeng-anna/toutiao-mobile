<template>
 <div class="UpdataGender">
    <van-picker
    title="昵称"
    show-toolbar
    :columns="columns"
    @cancel="$emit('close')"
    @confirm="confirm"
    :default-index="0"
    @change="onPickerChange"
    />
 </div>
</template>

<script>
import { UserProfile } from '@/api/user'
export default {
  name: 'UpdataGender',
  components: {},
  props: {
    value: {
      type: Number, // 0男 1女
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      localGender: this.value
    }
  },
  computed: {},
  watch: {},
  methods: {
    onPickerChange (picker, value, index) {
      this.localGender = index
    },
    async confirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const localGender = this.localGender
        await UserProfile({ gender: localGender })
        // 更新视图
        this.$emit('input', localGender)
        console.log(localGender)
        // 关闭弹层
        this.$emit('close')
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

</style>
