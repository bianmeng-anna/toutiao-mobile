<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar"  title="黑马头条">
      <van-icon slot="left" name="arrow-left" @click="$router.back()"></van-icon>
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="content.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ content.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="content.aut_photo"
          />
          <div slot="title" class="user-name">{{ content.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ content.pubdate | relativeTime }}
          </div>
          <!-- 模板中的$event是事件参数 -->
          <!-- 当我们传参数据既要使用还要修改 -->
          <!-- 传参：props -->
          <!-- :isfollowed = "content.is_followed" -->
          <!-- 修改自定义事件 -->
          <!-- @updata-is_followed="content.is_followed = $event" -->
          <follow
            class="follow-btn"
            :user-id="content.aut_id"
            v-model="content.is_followed"
          ></follow>
          <!-- <van-button
            v-if="content.is_followed"
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            :loading="loadFollow"
            @click="onFollow"
          >关注</van-button>
          <van-button
            v-else
            class="follow-btn"
            round
            size="small"
            @click="onFollow"
          >已关注</van-button>-->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="content.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 评论区域 -->
        <commentList
        :source="content.art_id"
        :list = "commentList"
        @sourceId = "totalCount= $event.total_count"
        @reply-click="onreply"
        ></commentList>
        <!-- 评论区域 -->
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button class="comment-btn" type="default" round size="small"
          @click="ispostShow = true"
            >写评论</van-button
          >
          <!-- 评论回复  -->
          <van-popup
            v-model="ispostShow"
            closeable
            position="bottom"
          >
          <commentPost
          :target ="content.art_id"
          @post-success="postsuccess"
          />
          </van-popup>
          <!-- 评论回复 -->
          <van-icon name="comment-o" :info="totalCount" color="#777" />
          <articleSelect
          color="#777"
          v-model="content.is_collected"
          :article-id="content.art_id"
          />
          <!-- <van-icon
        color="#777"
        name="star-o"
      /> -->
          <like class="van-icon" color="#777" v-model="content.attitude" :article-id="content.art_id"/>
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errState === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadAticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <!-- 弹出层 -->
    <van-popup
        v-model="isReplyShow"
        position="bottom"
        style="height:100%"
      >
      <commentReply
      v-if="isReplyShow"
      :comment = "currentComment"
      @close="isReplyShow=false"
      ></commentReply>
      </van-popup>
    <!-- 弹出层 -->
  </div>
</template>

<script>
import { getAticleById } from '@/api/article'
import { ImagePreview } from 'vant'
import follow from '../../components/follow/index.vue'
import articleSelect from '../../components/select-article/index.vue'
import like from '../../components/like/index.vue'
import commentList from '@/views/article/component/comment-list.vue'
import commentPost from './component/comment-post.vue'
import commentReply from './component/comment-reply.vue'

// ImagePreview({
//   images: [
//     'https://img01.yzcdn.cn/vant/apple-1.jpg',
//     'https://img01.yzcdn.cn/vant/apple-2.jpg'
//   ],
//   startPosition: 1
// })

export default {
  name: 'ArticleIndex',
  components: {
    follow,
    articleSelect,
    like,
    commentList,
    commentPost,
    commentReply
  },
  provide: function () {
    return {
      articleId: this.articleId
    }
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      content: {},
      loading: true,
      errState: 0, // 失败的状态码
      loadFollow: false,
      totalCount: 0,
      ispostShow: false, // 显示弹出层状态
      commentList: [], // 评论列表数据
      isReplyShow: false,
      currentComment: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadAticle()
  },
  mounted () {},
  methods: {
    async loadAticle (articleId) {
      this.loading = true
      try {
        const { data } = await getAticleById(this.articleId)
        // 数据驱动视图 不是立即执行的
        this.content = data.data
        // 请求成功
        // 初始化图片点击预览
        this.loading = false
        setTimeout(() => {
          // console.log(this.$refs['article-content'])
          this.PreviewImage()
        }, 0)
      } catch (err) {
        this.$toast('获取失败')
        if (err.response && err.response.status === 404) {
          this.errState = 404
        }
      }
      // 无论成功还是失败都要关闭loading
      this.loading = false
    },
    PreviewImage () {
      const imgs = this.$refs['article-content'].querySelectorAll('img')
      const images = []
      imgs.forEach((img, index) => {
        images.push(img.src)
        img.onclick = () => {
          ImagePreview({
            images,
            startPosition: index
          })
        }
      })
    },
    postsuccess (data) {
      // 发送成功后 关才弹出层   在父组件操作
      this.ispostShow = false
      // 发布内容推送到主页最前面    在父组件操作
      this.commentList.unshift(data.new_obj)
    },
    onreply (comment) {
      console.log(comment)
      this.currentComment = comment
      this.isReplyShow = true
    }
  }
}
</script>

<style scoped lang="less">
@import "./github-markdown.css";
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
