<template>
  <div>
    <ul class="user_router">
      <li @click="toExperience">
        <img src="../../static/icon/experience.jpg" alt="" />
        <span>经验贴</span><!--链接到经验贴一级页面-->
      </li>
      <li @click="toInformation">
        <img src="../../static/icon/experience.jpg" alt="" />
        <span>小广场</span><!--链接到资讯一级页面-->
      </li>
      <li @click="toService">
        <img src="../../static/icon/experience.jpg" alt="" />
        <span>见面课</span><!--链接到服务一级页面-->
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
      name: "details_router",
      methods : {
        toExperience(){
          wx.redirectTo({url : "/pages/experience/main"})
        },
        toInformation(){
          wx.redirectTo({url : "/pages/information/main"})
        },
        toService(){
          wx.redirectTo({url : "/pages/service/main"})
        }
      }
    }
</script>

<style scoped>
  .user_router{display:flex; flex-direction: row; justify-content: space-around; }
  .user_router li{display:flex; flex-direction:column; }
  .user_router img{height:60rpx; width:80rpx; }
  .user_router span{width:100%; text-align: center; padding-top:10rpx; }
</style>
