<template>
  <div>
    <div id="integral">{{userInfo.integral === null ? 0 : userInfo.integral}}</div>
  </div>
</template>

<script>
  import {get} from '@/util'
  export default {
    name: "index",
    data(){
      return{
        userInfo : {}
      }
    },
    async mounted(){//阅读、发表评论
      const userInfo = wx.getStorageSync('userInfo')
      this.userInfo = await get('/weapp/getuserinfo', {openId: userInfo.openId})
      console.log(this.userInfo)

    }
  };
</script>

<style scoped>
  #integral{height:300rpx; width:100%; font-size:120rpx; line-height:300rpx; background: #b8d2ff; text-align:center; color:#fff; }
</style>
