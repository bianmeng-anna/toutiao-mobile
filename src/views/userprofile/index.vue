<template>
 <div class="user-porfile">
   <!-- 导航栏 -->
   <van-nav-bar
    class="page-nav-bar"
    title="个人信息"
    left-arrow
    @click-left="$router.back()"
/>
   <!-- 导航栏 -->
   <input type="file" hidden ref="file" @change="onFileChange">
   <!-- 个人信息 -->
   <van-cell
   title="头像"
   @click="$refs.file.click()"
   is-link
   >
     <van-image
      class="avatar"
      round
      fit="cover"
      :src="user.photo"
    />
   </van-cell>
   <van-cell title="昵称" @click="ispopupshow=true" :value="user.name" is-link></van-cell>
   <van-cell title="性别" @click="isGendershow = true" :value="user.gender===0?'男':'女'" is-link></van-cell>
   <van-cell title="生日" @click="isBirthshow = true" :value="user.birthday" is-link></van-cell>
   <!-- 个人信息 -->

   <!-- 编辑昵称弹出层 -->
   <van-popup
    v-model="ispopupshow"
    position="bottom"
    :style="{ height: '80%' }"
  >
  <userName
    v-if="ispopupshow"
    @close = "ispopupshow=false"
    v-model="user.name"
  ></userName>
  </van-popup>
   <!-- 编辑昵称弹出层 -->

   <!-- 编辑性别弹出层 -->
    <van-popup
      v-model="isGendershow"
      position="bottom"
    >
    <UpdataGender
    v-if="isGendershow"
    v-model="user.gender"
    @close="isGendershow=false"
    ></UpdataGender>
    </van-popup>
   <!-- 编辑性别弹出层 -->
   <!-- 编辑生日弹层 -->
    <van-popup
    v-model="isBirthshow"
    position="bottom"
    ><updataBirthday
    v-if="isBirthshow"
    v-model="user.birthday"
    @close="isBirthshow=false"
    />
    </van-popup>
   <!-- 编辑生日弹层 -->

      <!-- 编辑头像弹层 -->
    <van-popup
    v-model="isPhotoshow"
    position="bottom"
    style="height:100%"
    >
      <updataPhoto :img="img"
       v-if="isPhotoshow"
       @close="isPhotoshow=false"
       @updatePhoto="user.photo=$event"
       ></updataPhoto>
    </van-popup>
   <!-- 编辑头像弹层 -->

</div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import userName from './components/userName.vue'
import UpdataGender from './components/updata-gender.vue'
import updataBirthday from './components/updata-birthday.vue'
import updataPhoto from './components/updataPhoto.vue'
export default {
  name: 'user-porfile',
  components: {
    userName,
    UpdataGender,
    updataBirthday,
    updataPhoto
  },
  props: {
  },
  data () {
    return {
      user: {},
      ispopupshow: false,
      isGendershow: false,
      isBirthshow: false,
      isPhotoshow: false,
      img: null // 预览的图片
    }
  },
  computed: {},
  watch: {},
  methods: {
    async loadUserProfile () {
      const { data } = await getUserProfile()
      this.user = data.data
    },
    onFileChange () {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 基于文件对象获取blob数据
      this.img = window.URL.createObjectURL(file)
      // 展示图片弹出层
      this.isPhotoshow = true
      // file-input 如果选了同一个文件， change事件不会重复触发
      // 解决：就是每次使用完 把它的value清空
      this.$refs.file.value = ''
    }
  },
  created () {
    this.loadUserProfile()
  },
  mounted () {},
  updated () {}
}
</script>
<style lang='less' scoped>
.user-porfile {
  /deep/ .avatar {
    width: 60px;
    height: 60px;
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
