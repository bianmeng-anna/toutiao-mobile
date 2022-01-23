<template>
 <div class="commentReply">
    <van-nav-bar
        :title="comment.reply_count>0?`${comment.reply_count}条回复`:'赞无回复'"
    >
    <van-icon slot="left" name="cross" @click="$emit('close')"/>
    </van-nav-bar>
    <div class="scroll-wrap">
          <!-- 当前的评论回复 -->
      <commentItem :comment="comment"/>
      <!-- 当前的评论回复 -->
      <!-- 评论的回复列表 （评论的评论） -->
      <van-cell title="全部回复">
      </van-cell>
      <commentList
        :list="commentReply"
        :source="comment.com_id"
        type="c"
      ></commentList>
      <!-- 评论的回复列表 （评论的评论） -->
    </div>

    <!-- 发布评论 底部区域-->
    <div class="post-wrap">
      <van-button class="post-btn" size="small" @click="isPostShow=true">写评论</van-button>
    </div>
    <!-- 发布评论 底部区域-->
    <van-popup
    v-model="isPostShow"
    position="bottom"
    style="height=30%"
    >
    <commentPost
    :target="comment.com_id"
    @post-success="onPostSuccess"
    ></commentPost>
    </van-popup>
 </div>
</template>

<script>
import commentItem from './commentItem.vue'
import commentList from './comment-list.vue'
import commentPost from './comment-post.vue'
// import commentPost from './comment-post.vue'
export default {
  name: 'commentReply',
  components: {
    commentItem,
    commentList,
    commentPost
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isPostShow: false,
      commentReply: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    onPostSuccess (data) {
      console.log(data)
      // 更新回复的数量
      this.comment.reply_count++
      // 关闭弹层
      this.isPostShow = false
      // 将最新回复的内容放在最前面  设置空数组来接收commentList  与父组件list 通信
      this.commentReply.unshift(data.new_obj)
    }
  },
  created () {},
  mounted () {},
  updated () {}
}
</script>
<style lang='less' scoped>
.post-wrap {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 1px solid #d8d8d8;
  .post-btn {
    width: 60%;
  }
  .scroll-wrap {
    position: fixed;
    top: 92px;
    left: 0;
    right: 0;
    bottom: 88px;
    overflow-y: auto;
  }
}
</style>
