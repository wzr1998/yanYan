<template>
  <div>
<!--

    <post :key="post.time" v-for="post in postList" :post='post'></post>

    &lt;!&ndash;<div :key="post.time" v-for="post in postList" class="post">
      <p>标题：{{post.title}}</p>
      <p>文章内容：{{post.passage}}</p>
      <p>id：{{post.id}}</p>
      <img :src="post.author.avatarUrl" />
      <p>作者{{post.author.nickName}}</p>
      <p>浏览量{{post.count}}</p>
    </div>&ndash;&gt;

    <p v-if="!more">没有更多数据</p>
    &lt;!&ndash;<button @click="getPostList(true)">获取文章列表</button>&ndash;&gt;
-->

  </div>




</template>

<script>
 /* import {showSuccess, get, showModal, showText} from '@/util'
  import post from '@/components/post'
*/
  export default {
    /*data () {
      return {
        postList: [],
        page: 0,
        more: true
      }
    },
    components: {
      post
    },

    methods: {
      async getPostList (init) {
        if (init) {
          this.page = 0
          this.more = true
        }
        wx.showNavigationBarLoading()
        let postList = (await get('/weapp/getpostlist', {page: this.page})).postList
        postList.forEach(item => {
          item.author = JSON.parse(item.author)
        })
        if (postList.length < 10 && this.page > 0) this.more = false
        if (init) {
          this.postList = postList
          wx.stopPullDownRefresh()
        } else {
          this.postList = this.postList.concat(postList)
        }
        wx.hideNavigationBarLoading()
      }
    },

    onReachBottom () {
      if (!this.more) return
      this.page++
      this.getPostList()
    },

    onPullDownRefresh () {
      wx.showNavigationBarLoading()
      this.getPostList(true) // 有问题，应该获取最新数据
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
    },

    created () {
      this.getPostList(true)
    }*/
  }
</script>

<style scoped>
  /*img{
    height:100rpx;
    width:100rpx;
  }
  .post{
    padding-bottom:100rpx;
    margin-bottom:20rpx;
    background:#eee
  }*/
</style>
