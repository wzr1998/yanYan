<template>
  <div class="tabBar">
    <ul>
      <li @click="homeUrl">
        <img :src="homeImg" alt="" />
        <span>首页</span>
      </li>
      <li @click="informationUrl">
        <img :src="informationImg" alt="" />
        <span>资讯</span>
      </li>
      <li @click="releaseUrl">
        <img src="../../static/icon/center.gif" alt="" />
      </li>
      <li @click="experienceUrl">
        <img :src="experienceImg" alt="" />
        <span>经验</span>
      </li>
      <li @click="serviceUrl">
        <img :src="serviceImg" alt="" />
        <span>服务</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import homeImg from "../../static/icon/home.jpg"
  import informationImg from "../../static/icon/information.jpg"
  import experience1Img from "../../static/icon/experience1.jpg"
  import serviceImg from "../../static/icon/service.gif"

  import homeImg_active from "../../static/icon/home_active.jpg"
  import informationImg_active from "../../static/icon/information_active.jpg"
  import experience1Img_active from "../../static/icon/experience1_active.jpg"
  import serviceImg_active from "../../static/icon/service_active.jpg"
  import {showText} from "../util.js"
  export default {
    name: "tabBar1",
    computed : {
      homeImg(){
        if(this.iconImg === "home") return homeImg_active
        else return homeImg
      },
      informationImg(){
        if(this.iconImg === "information") return informationImg_active
        else return informationImg
      },
      experienceImg(){
        if(this.iconImg === "experience") return experience1Img_active
        else return experience1Img
      },
      serviceImg(){
        if(this.iconImg === "service") return serviceImg_active
        else return serviceImg
      }
    },
    props: ['iconImg'],
    methods : {
      homeUrl(){
        if(this.iconImg === "home") return
        wx.redirectTo({url : "/pages/home/main"})
      },
      informationUrl(){
        if(this.iconImg === "information") return
        wx.redirectTo({url : "/pages/information/main"})
      },
      releaseUrl(){
        if(wx.getStorageSync('userInfo')) wx.navigateTo({url : "/pages/release/main"})
        else showText('请先登陆')
      },
      experienceUrl(){
        if(this.iconImg === "experience") return
        wx.redirectTo({url : "/pages/experience/main"})
      },
      serviceUrl(){
        if(this.iconImg === "service") return
        wx.redirectTo({url : "/pages/service/main"})
      },
    }
  };
</script>

<style scoped>
  .tabBar{z-index: 5; position:fixed; bottom:0; background:#fff; width:100%; height:100rpx; padding-top:10rpx; }
  .tabBar ul{display: flex; flex-direction: row; justify-content: space-around; }
  .tabBar li{display: flex; flex-direction: column; justify-content: space-between; }
  .tabBar li:nth-child(3) img{height:80rpx; width:80rpx; }
  .tabBar li img{display: flex; flex-direction: column; justify-content: space-between; height:53rpx; width:53rpx; }
  .tabBar li span{text-align:center; width:100% }
</style>
