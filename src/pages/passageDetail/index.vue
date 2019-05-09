<template>
  <div>
    <div class="head">
      <div class="ifFailure">{{postDetail.failure === 0 ? '经验贴' : '血泪史'}}</div>
      <h1>{{postDetail.title}}</h1>
      <img :src="postDetail.titltimg" mode="widthFix"/>
    </div>

    <div class="content">
      <div v-for="(paragraph, i) in postDetail.passage" :key="paragraph">
        <div class="paragraphTitle">
          <h2>{{paragraph.title}}</h2>
        </div>
        <div class="paragraphContent">
          <wxParse :content="paragraph.text" />
        </div>
      </div>
      <div class="otherInformation">
        {{postDetail.school}}<br />
        {{postDetail.user_info.nickName}}<br />
        {{postDetail.date}}
      </div>
    </div>


    <div class="comment">
      <div class="head">
        <div>评论 {{postDetail.comments.length}}</div>
        <div :style="{color : postDetail.isCollect ? 'red' : 'black' }" @click="onPassageCollection(postDetail.isCollect)">收藏{{postDetail.collect}}</div>
        <div @click="onPassageGood">
          <img v-if="!passageStar" src="../../../static/icon/good.png" />
          <img v-else src="../../../static/icon/good_active.png" />
          &nbsp;{{postDetail.satr}}
        </div>
      </div>
      <div class="comment" v-for="(comment, i) in postDetail.comments" :key="comment">
        <img :src="comment.user_info.avatarUrl ? comment.user_info.avatarUrl : defaultUserImg" />
        <div class="content">
          <h3>{{comment.user_info.nickName}}</h3>
          <p class="commentContent">{{comment.text}}</p>
          <div class="comment_Comment" v-if="comment.comments.length">
            <p v-for="(comment_Comment, j) in comment.comments" :key="comments">
              <span>{{comment_Comment.nickName}}</span>：{{comment_Comment.text}}
            </p>
          </div>
          <div class="bottom">
            <span>{{comment.date}}</span>
            <span>
              <img src="../../../static/icon/comment.gif" alt="" @click="onClockComment(comment)"/>
              <span @click="onCommentGood(comment)">
                <img v-if="!comment.isStar" src="../../../static/icon/good.png" alt="" />
                <img v-else src="../../../static/icon/good_active.png" alt="" />
                {{comment.star}}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div style="height:80rpx; "></div>
    <div class="releaseComment">
      <input type="text" v-model="CommentText" placeholder="说点什么吧" :focus="commentFocus" @blur="onBlur"/>
      <input type="button" value="发布" @click="releaseComment"/>
    </div>


  </div>
</template>

<script>
  import {get, post, showText} from '@/util'
  import wxParse from 'mpvue-wxparse'
  import defaultUserImg from '../../../static/images/unlogin.png'
  export default {
    data () {
      const postDetail = {}
      return {
        defaultUserImg,
        passageId : 0,
        postDetail,
        passageStar : false,
        //passageCollection : false,
        CommentText : '',
        commentFocus : false,
        activeObj : postDetail  //被评论的对象
      }
    },
    components: {
      wxParse
    },
    computed : {

    },
    methods: {
      async getDetail () {
        const userInfo = wx.getStorageSync('userInfo')
        this.postDetail = await get('/weapp/getdetail', {id: this.passageId, userInfo})
        wx.setNavigationBarTitle({title : this.postDetail.title})
        this.activeObj = this.postDetail  //初始化时发布对象为文章
        this.postDetail.comments.forEach(item => {
          item.isStar = false //客户端每次进入时初始化所有评论点赞为false
        })
        this.passageStar = false
        //this.passageCollection = false  //根据用户的collection是否存在本文章进行判断
        console.log(this.postDetail)
      },
      async onPassageGood(){  //文章点赞
        const userInfo = wx.getStorageSync('userInfo')
        if(!userInfo){
          showText('请先登录')
          return
        }
        if(!this.passageStar){
          showText('点赞成功')
          this.postDetail.satr++
          await get('/weapp/getdetail', {id: this.passageId, star : '+1', userInfo})
          //调用接口更改文章点赞数据
        }else{
          showText('取消点赞成功')
          this.postDetail.satr--
          await get('/weapp/getdetail', {id: this.passageId, star : '-1', userInfo})
          //调用接口更改文章点赞数据
        }
        this.passageStar = !this.passageStar
      },
      async onPassageCollection(isCollect){  //文章收藏
        const userInfo = wx.getStorageSync('userInfo')
        if(!userInfo){
          showText('请先登录')
          return
        }
        if(!isCollect){
          showText('收藏成功')
          this.postDetail.collect++
          await get('/weapp/getdetail', {id: this.passageId, collection : '+1', userInfo})
          //调用接口更改文章点赞数据
        }else{
          showText('取消收藏成功')
          this.postDetail.collect--
          await get('/weapp/getdetail', {id: this.passageId, collection : '-1', userInfo})
          //调用接口更改文章点赞数据
        }
        this.postDetail.isCollect = !this.postDetail.isCollect
      },
      async onCommentGood(comment){//评论点赞
        if(!comment.isStar){//若不存在或点赞为false，则设置点赞为真
          showText('点赞成功')
          comment.star++
          //调用接口更改评论点赞数据
        }
        else{
          showText('取消点赞成功')
          comment.star--
          //调用接口更改评论点赞数据
        }
        comment.isStar = !comment.isStar
        await post('/weapp/addpassagecoment', {id: this.passageId, comments : JSON.stringify(this.postDetail.comments)})
      },
      onClockComment(comment){    //点击评论的评论按钮时触发
        this.commentFocus = true  //文本框自动聚焦
        this.activeObj = comment  //给边当前被评论对象为该文章评论
      },
      onBlur(){//评论文本框失去焦点时触发
        const _this = this  //失去焦点，改变当前被评论对象为默认值（passage）
        this.commentFocus = false
        setTimeout(function(){  //点击提交时是先触发onBlur，再提交，延时1s是为了保留被评论的对象为当前评论内容
          _this.activeObj = _this.postDetail  //注意this指向的问题
        },1000)
      },
      async releaseComment(){   //点击发布按钮时触发
        const user_info = wx.getStorageSync('userInfo')
        if(!user_info){
          showText('请先登录')
          return
        }
        if(!this.CommentText){
          showText('请输入评论内容')
          return
        }
        const Time = new Date()
        let comment = {
          user_info : {   //服务端根据openid整合用户信息
            avatarUrl : user_info.avatarUrl,
            nickName : user_info.nickName,
            openId : user_info.openId
          },
          text : this.CommentText,
          star : 0,
          comments : [],
          date: `${Time.getMonth() + 1}-${Time.getDate()} ${parseInt(Time.getHours()) < 10 ? '0' + Time.getHours() : Time.getHours()}:${parseInt(Time.getMinutes()) < 10 ? '0' + Time.getMinutes() : Time.getMinutes()}`,
          isStar : false
        }
        if(this.activeObj===this.postDetail){//文章的评论
          this.postDetail.comments.push(comment)
        }else{                               //评论的评论
          this.activeObj.comments.push({nickName : user_info.nickName, text : this.CommentText, openId : user_info.openId})
        }
        this.commentFocus = false
        this.activeObj = this.postDetail  //提交完成后恢复发布评论对象默认值为当前文章
        this.CommentText = ''
        console.log(this.postDetail)
        await post('/weapp/addpassagecoment', {id: this.passageId, comments : JSON.stringify(this.postDetail.comments)})
        await get('/weapp/getuserinfo', {openId: user_info.openId, addIntegralNum : 1})//点击评论积分+1
        this.CommentText = ''
      },
      async addIntegral(){//用户一分钟进入积分+1
        const userInfo = wx.getStorageSync('userInfo')
        await get('/weapp/getuserinfo', {openId: userInfo.openId, addIntegralNum : 2})
      }
    },
    async mounted () {
      this.passageId = this.$root.$mp.query.id
      this.getDetail()
      setTimeout(this.addIntegral, 1000*30)//暂定十秒后用户积分+2
    }
  }
</script>

<style scoped>
  @import url("~mpvue-wxparse/src/wxParse.css");
  .head{width:86%; margin:20rpx auto 0; }
  .head .ifFailure{width:25%; height:50rpx; background:#b3dffc; color:#bf3528; line-height:50rpx; text-align: center; font-size:30rpx; /*margin-left:20rpx;*/ }
  .head h1{text-align: center; font-size:36rpx; line-height:100rpx; }
  .head img{width:100%; }
  .content{width:90%; margin:0 auto; }
  .content .paragraphTitle{padding-bottom:4rpx; border-bottom:2rpx dashed #000; display : inline-block; margin:20rpx 0; }
  .content h2{background:#9ec1c7; color:#fff; height:60rpx; line-height:60rpx; font-size:40rpx; padding:0 20rpx; }
  .content .paragraphContent{line-height:70rpx; text-indent: 2em; }
  .content .otherInformation{text-align:right; line-height:50rpx; font-size:30rpx; }
  .comment{width:95%; margin:0 auto; }
  .comment .head{display: flex; flex-direction: row; justify-content: space-between; border-bottom:5rpx solid #b1cff3; width:94%; padding:0 3% 10rpx; margin-bottom:10rpx; }
  .comment .head div{font-size:30rpx; line-height: 50rpx; height:50rpx; }
  .comment .head div:nth-child(3){border:1px solid #abcdef; border-radius:25rpx; width:110rpx; line-height: 50rpx; height:50rpx; vertical-align: middle; padding-left:10rpx; }
  .comment .head div:nth-child(3) img{height:40rpx; width:40rpx; position:relative; top:5rpx; padding-left:6rpx; }
  .comment .comment{display: flex; justify-content: space-between; padding:10rpx 0; margin-top:10rpx; }
  .comment .comment > img{height:80rpx; width:80rpx; border-radius: 50%; }
  .comment .comment .content{border-bottom:2rpx solid #abcdef; width:570rpx; }
  .comment .comment:last-child .content{border-bottom:none; }
  .comment .comment h3{line-height:50rpx; font-size:30rpx; }
  .comment .comment p{line-height:40rpx; font-size:28rpx; }
  .comment .comment .commentContent{padding-bottom:15rpx; }
  .comment .comment .comment_Comment{padding-bottom:10rpx;  }
  .comment .comment .comment_Comment p{background:#f6f6f6; line-height:40rpx; padding:3rpx 10rpx; }
  .comment .comment .comment_Comment span{color:#4a6588; }
  .comment .comment .bottom{display: flex; justify-content: space-between; font-size:28rpx; }
  .comment .comment .bottom > span:last-child{width:120rpx; display: flex; justify-content: space-between; padding-right:20rpx; }
  .comment .comment .bottom img{height:30rpx; width:30rpx; }
  .releaseComment{height:80rpx; position:fixed; bottom:0; left:0; width:90%; display: flex; justify-content: space-between; background:#fff; padding:0 5%; }
  .releaseComment input:nth-child(1){border:1px solid #eee; background:#f5f5f5; border-radius: 40rpx; height:80rpx;  color:#444; width:80%; font-size:30rpx; text-indent: 3rpx; }
  .releaseComment input:nth-child(2){width:16%; font-size:30rpx; height:80rpx; border:40rpx; background: #fefefe; padding:0; margin:0; border-radius: 40rpx; border:none; }
</style>
