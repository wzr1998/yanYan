<template>
  <div class="user_search">
    <userCenter :show="isShow" @closeUserCenter="toCloseUserCenter" :userInfo="userInfo" @succeedLogin="succeedLogin"></userCenter>
    <img :src="userInfo.avatarUrl ? userInfo.avatarUrl : defaultUserImg" alt="" @click="switchShow"/>
    <!--<button class="login" open-type="getUserInfo" lang="zh_CN" @getuserinfo="switchShow" :style="{'background':'userInfo.avatarUrl', 'background-position' : '-30rpx 0rpx', 'background-size' : '100rpx 100rpx'}">
      <img :src="userInfo.avatarUrl ? userInfo.avatarUrl : defaultUserImg" alt="" />
    </button>-->
    <input type="text" @click="onShowSearch" /><!--热门搜索：写死， 科目：对应筛选科目-->
  </div>
</template>

<script>
  import userCenter from "./userCenter"



  import defaultUserImg from '../../static/images/unlogin.png'
  import qcloud from 'wafer2-client-sdk'
  import config from './../config'
  import {showSuccess, post, showModal, showText} from '@/util'




  export default{
    name: "user_search",
    data(){
      return{
        isShow : false,
        defaultUserImg,
        userInfo: wx.getStorageSync('userInfo')
      }
    },
    props : {

    },
    components : {
      userCenter
    },
    methods : {
      switchShow(){
        this.isShow = !this.isShow
      },
      toCloseUserCenter(){
        this.isShow = !this.isShow
      },
      onShowSearch(){
        wx.navigateTo({url : "/pages/search/main"})
      },
      succeedLogin(){
        this.userInfo = wx.getStorageSync('userInfo')
      }
    }
  }
</script>

<style scoped>
  button{height:80rpx; width:80rpx; border-radius:50%; border:none; /*background:rgba(0,0,0,0); */}
  button img{ height:90rpx; width:90rpx; border-radius:50%; margin-right:20rpx;  position:relative; right:32rpx; bottom:4rpx; }
  .user_search{display: flex; flex-direction: row; justify-content: center; height:85rpx; padding-top: 20px; }
  .user_search img{height:80rpx; width:80rpx; border-radius:50%; margin-right:20rpx; padding-top:2rpx; }
  .user_search input{height:80rpx; width:70%; border:2rpx solid #dedede; border-radius: 40rpx; background:url("../../static/icon/search.gif") no-repeat 10rpx 20rpx; background-size:60rpx 40rpx; padding-left: 10%; color:#666; margin-right:20rpx; }
</style>
