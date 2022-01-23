<template>
 <div class="updataPhoto">
     <img class="img" :src="img" ref="img">
     <div class="toolbar">
         <div class="cancel" @click="$emit('close')">取消</div>
         <div class="confirm" @click="onconfirm">确定</div>
     </div>
 </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { UserPhoto } from '@/api/user'
export default {
  name: 'updataPhoto',
  components: {},
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data () {
    return {
      cropper: null
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
    //   ea: 1, //
    //   cropBoxMovable: false, //
    //   cropBoxResizable: false, // 缩放
    //   background: false, // 背景
    //   movable: trueviewMode: 1, // 拖动区域
    //   dragMode: 'move', // 裁剪的拖动模式
    //   aspectRatio: 1, // 截图比例
    //   autoCropAr // 画布是否可移动
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false
    })
  },
  methods: {
    onconfirm () {
      this.cropper.getCroppedCanvas().toBlob(async blob => {
        // UserPhoto({ photo: blob })
        const formData = new FormData()

        // Pass the image file name as the third parameter if necessary.
        formData.append('photo', blob)
        const { data } = await UserPhoto(formData)
        // 关闭弹层
        this.$emit('close')
        // 更新视图
        this.$emit('updatePhoto', data.data.photo)
      })
    }
  },
  updated () {}
}
</script>
<style lang='less' scoped>
.updataPhoto {
    background-color: #000;
    height: 100%;
    .toolbar {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        .cancel, .confirm {
            width: 90px;
            height: 90px;
            font-size: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
        }
    }
}
.img {
  display: block;
  max-width: 100%;
}
</style>
