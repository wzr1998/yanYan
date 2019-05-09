<template>
  <div>
    <user-search></user-search>
    <ul class="select">
      <li @click="getHot">最热榜</li>
      <li @click="getNew">最新榜</li>
      <li @click="get24Hour">24小时</li>
      <li @click="getFailure">血泪史</li>
      <li>
        <span @click="switchShowFilter">筛选</span>
        <img src="../../../static/icon/select.gif" />
      </li>
    </ul>

    <ul class="postList">
      <li v-for="passageItem in postList" :key="passageItem">
        <a :href="'../passageDetail/main?id=' + passageItem.id">
          <div>
            <h3>{{passageItem.title}}</h3>
            <div>
              <!--<img src="../../../static/images/course.gif" alt="" />-->
              <img :src="passageItem.img" alt="" />
              <p>
                {{passageItem.showContent}}
                <br />
                <span>{{passageItem.user_info.nickName}}</span>
                <span>{{passageItem.date}}</span>
              </p>
            </div>
          </div>
        </a>
      </li>
    </ul>
    <tab_Bar iconImg="experience"></tab_Bar>
    <filter :show="showFilter" @closeFilter="toCloseFilter"></filter>
  </div>
</template>

<script>
  import user_search from '@/components/user_search/'
  import textList from '@/components/textList/'
  import tabBar from '@/components/tabBar/'
  import postImg from "../../../static/images/course.gif"
  import filter from "@/components/filter"
  import {showSuccess, get, showModal, showText, getLowerImgs} from '@/util'
  export default {
    name: "information",
    data(){
      return{
        /*postList : [
          {title : "19法大中欧民商考研+18法考经验贴", postImg, content : "拖欠大家很久的经验贴终于来啦！拖欠大家很久的经验贴终于来啦！", author : "考研研指", time : "4天前"},
          {title : "19法大中欧民商考研+18法考经验贴", postImg, content : "拖欠大家很久的经验贴终于来啦！拖欠大家很久的经验贴终于来啦！", author : "考研研指", time : "4天前"},
          {title : "19法大中欧民商考研+18法考经验贴", postImg, content : "拖欠大家很久的经验贴终于来啦！拖欠大家很久的经验贴终于来啦！", author : "考研研指", time : "4天前"},
          {title : "19法大中欧民商考研+18法考经验贴", postImg, content : "拖欠大家很久的经验贴终于来啦！拖欠大家很久的经验贴终于来啦！", author : "考研研指", time : "4天前"},
          {title : "19法大中欧民商考研+18法考经验贴", postImg, content : "拖欠大家很久的经验贴终于来啦！拖欠大家很久的经验贴终于来啦！", author : "考研研指", time : "4天前"},
          {title : "19法大中欧民商考研+18法考经验贴", postImg, content : "拖欠大家很久的经验贴终于来啦！拖欠大家很久的经验贴终于来啦！", author : "考研研指", time : "4天前"},
          {title : "19法大中欧民商考研+18法考经验贴", postImg, content : "拖欠大家很久的经验贴终于来啦！拖欠大家很久的经验贴终于来啦！", author : "考研研指", time : "4天前"},
          {title : "19法大中欧民商考研+18法考经验贴", postImg, content : "拖欠大家很久的经验贴终于来啦！拖欠大家很久的经验贴终于来啦！", author : "考研研指", time : "4天前"},
          {title : "19法大中欧民商考研+18法考经验贴", postImg, content : "拖欠大家很久的经验贴终于来啦！拖欠大家很久的经验贴终于来啦！", author : "考研研指", time : "4天前"},
          {title : "19法大中欧民商考研+18法考经验贴", postImg, content : "拖欠大家很久的经验贴终于来啦！拖欠大家很久的经验贴终于来啦！", author : "考研研指", time : "4天前"},
        ],*/
        showFilter : false,
        postList: [],
        page: 0,
        more: true,
        filter : 'hot',
        i : 0
      }
    },
    components : {
      "user-search" : user_search,
      textList,
      tab_Bar : tabBar,
      filter
    },
    methods : {
      getHot(){
        if(this.filter === 'hot') return
        this.filter = 'hot'
        this.getPostList(true)
      },
      getNew(){
        if(this.filter === 'new') return
        this.filter = 'new'
        this.getPostList(true)
      },
      get24Hour(){
        if(this.filter === '24Hour') return
        this.filter = '24Hour'
        this.getPostList(true)
      },
      getFailure(){
        if(this.filter === 'failure') return
        this.filter = 'failure'
        this.getPostList(true)
      },
      async getPostList (init) {
        if (init) {
          this.page = 0
          this.more = true
        }
        wx.showNavigationBarLoading()
        let postList
        if(this.filter === 'hot') postList = (await get('/weapp/getpostlist', {page: this.page, filter : 'hot'}))
        if(this.filter === 'new') postList = (await get('/weapp/getpostlist', {page: this.page, filter : 'new'}))
        if(this.filter === '24Hour') postList = (await get('/weapp/getpostlist', {page: this.page, filter : '24Hour'}))
        if(this.filter === 'failure') postList = (await get('/weapp/getpostlist', {page: this.page, filter : 'failure'}))

        console.log(postList)

        /*postList.forEach(item =>{
          if(item.user_info) item.user_info = JSON.parse(item.user_info)
        })
        postList.forEach(item =>{
          item.passage = JSON.parse(item.passage)
        })*/


        postList.forEach(item => {
          const _this = this
          this.i++
          this.i %= 14
          if(item) item.showContent = item.passage[0].text.length > 34 ? item.passage[0].text.substring(0,35) + '...' : item.passage[0].text
          Object.assign(item, {img : getLowerImgs()[_this.i]})
        })



        if (postList.length < 10 && this.page > 0) this.more = false
        if (init) {
          this.postList = postList
          wx.stopPullDownRefresh()
        } else {
          this.postList = this.postList.concat(postList)
        }
        wx.hideNavigationBarLoading()
      },
      toCloseFilter(){
        this.showFilter = !this.showFilter
      },
      switchShowFilter(){
        this.showFilter = !this.showFilter
      },
    },
    onReachBottom () {//触底加载
      if (!this.more) return
      this.page++
      this.getPostList()
    },
    onPullDownRefresh () {//下拉刷新
      wx.showNavigationBarLoading()
      this.getPostList(true) // 有问题，应该获取最新数据
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
    },
    created () {
      this.getPostList(true)
    }
  }
</script>

<style scoped>
  .select{width:90%; display: flex; justify-content: space-around; border-bottom: 4rpx solid #b4cae2; margin:20rpx auto 30rpx; }
  .select li{color:#494949; font-weight: bold; font-size:26rpx; height:40rpx; line-height: 40rpx; }
  .select li:last-child{color:#545557; font-size:26rpx; font-weight: normal; }
  .select li:last-child img{height: 25rpx; width:25rpx; vertical-align: middle; }
  .postList{padding-bottom:90rpx; }
  .postList:after{content: ''; display:block; clear:both; }
  .postList li{width:87%; background:#cbe2fa; padding:20rpx 0; margin:20rpx 0; }
  .postList li:nth-child(2n+1){border-top-right-radius: 30rpx; border-bottom-right-radius: 30rpx; float:left;  }
  .postList li:nth-child(2n){border-top-left-radius: 30rpx; border-bottom-left-radius: 30rpx; float:right; }
  .postList li a > div{width:91%; background:#fff; margin:0 auto; padding:0 10rpx 20rpx; }
  .postList li a h3{height:70rpx; line-height:70rpx; font-size:28rpx; color:#383838; font-weight:400; }
  .postList li a > div > div{display:flex; height:110rpx; }
  .postList li a > div > div img{height:110rpx; width:110rpx; }
  .postList li a > div > div p{padding-left:10rpx; color:#929292; width:480rpx; }
</style>
