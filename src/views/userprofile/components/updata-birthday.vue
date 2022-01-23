<template>
 <div class="updataBirthday">
     <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="$emit('close')"
        @confirm="onconfirm"
        />
 </div>
</template>

<script>
import { UserProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'updataBirthday',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: this.value
    }
  },
  computed: {},
  watch: {},
  methods: {
    async onconfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
        await UserProfile({ birthday: currentDate })
        this.$emit('input', currentDate)
        this.$emit('close')
        this.$toast.success('保存成功')
      } catch (err) {
        this.$toast.fail('更新失败')
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
