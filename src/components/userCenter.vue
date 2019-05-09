<template>
  <div>
    <div class="userCenter" v-show="show">
      <div class="user">
        <img :src="userInfo.avatarUrl ? userInfo.avatarUrl : defaultUserImg" alt="" />
        <button open-type="getUserInfo" lang="zh_CN" v-if="!userInfo.openId" @click="onLogin">点击登录</button>
        <!--<button open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin2">获取用户信息</button>-->
        <!--<button open-type="getUserInfo" bindgetuserinfo="getUserInfo"> 获取头像昵称 </button>-->
        <p v-if="userInfo.openId">{{userInfo.nickName}}</p><!--实现设置、积分、收藏-->
      </div>
      <ul class="service">
        <!--<li>
          <div>同步更新</div>
        </li>
        <li>
          <div>我的参与</div>
        </li>-->
        <li>
          <a href="../../pages/collectionList/main">
            <div>我的收藏</div>
          </a>
        </li>
        <li>
          <a href="../../pages/purchase/main">
            <div>我的购买</div>
          </a>
        </li>
        <li>
          <a href="../../pages/integral/main">
            <div>我的积分</div>
          </a>
        </li>
        <li>
          <a href="../../pages/setting/main">
            <div>个人设置</div><!--身份认证-->
          </a>
        </li>
        <li>
          <a href="../../pages/feedback/main">
            <div>反馈资讯</div>
          </a>
        </li>
      </ul>
      <ul class="bottom">
        <!--<li>关注</li>
        <li>粉丝</li>-->
        <a href="../../pages/nearby/main">
          <li>附近</li>
        </a>
        <li @click="exitLogin">退出登录</li>
      </ul>
    </div>

    <div class="filter" @click="close" v-if="show"></div>
  </div>
</template>

<script>
  import defaultUserImg from '../../static/images/unlogin.png'
  import qcloud from 'wafer2-client-sdk'
  import config from './../config'
  import {showSuccess, post, showModal, showText} from '@/util'


  export default {
    name: "userCenter",
    data(){
      return{
        defaultUserImg,
        userInfo: wx.getStorageSync('userInfo'),
      }
    },
    props : ["show", "userInfo"],
    methods : {
      close(){
        this.$emit('closeUserCenter')
      },
      exitLogin(){
        const _this = this
        wx.removeStorageSync('userInfo')
        _this.userInfo = {}
        showText('退出登录成功')
      },
      onLogin(e){
        console.log(12345)
        const _this = this
        if (!wx.getStorageSync('userInfo')) {
          qcloud.setLoginUrl(config.loginUrl)
          qcloud.login({
            success (userInfo) {
              console.log(23333)
              wx.setStorageSync('userInfo', userInfo)
              _this.userInfo = userInfo
              showText('登录成功')
              _this.$emit('succeedLogin')
            },
            fail: err => {
              console.error(err)
            }
          })
        }
      },
      /*doLogin2(){
        qcloud.setLoginUrl(config.loginUrl)
        const session = qcloud.Session.get()
        console.log(session)

        if (session) {
          // 第二次登录
          // 或者本地已经有登录态
          // 可使用本函数更新登录态

          qcloud.loginWithCode({
            success: res => {
              this.setData({ userInfo: res, logged: true })
            },
            fail: err => {
              console.error(err)
            }
          })
        } else {
          // 首次登录
          qcloud.login({
            success: res => {
              console.log('登录成功', res)
            },
            fail: err => {
              console.error('登录错误',err)
            }
          })
        }
      }*/
    },
    mounted(){
      this.userInfo = null
    }
  };
</script>

<style scoped>
  .userCenter{width:70%; height:100%; background:#fff; position:fixed; top:0; left:0; z-index: 7;}
  .userCenter .user{height:150rpx; background:#c9dff5; display: flex; flex-direction: row; justify-content:flex-start; padding:75rpx 0; }
  .userCenter .user img{height:150rpx; width:150rpx; border-radius: 50%; margin-left: 30rpx; }
  .userCenter .user p{line-height:150rpx; font-size:40rpx; color:#536883;  margin-left: 30rpx; }
  .userCenter .user button{width:220rpx; border-radius:30rpx; line-height: 60rpx; text-align: center; height:60rpx; color:#666; position:relative; top:45rpx; right:54rpx; }
  .userCenter .service li{height:88rpx; border-bottom:2rpx solid #f2f2f2; line-height:88rpx; text-indent:100rpx; font-size:34rpx; background:url("../../static/icon/userMore.gif") no-repeat 96% 30rpx; background-size:16rpx 27rpx; }
  /*.userCenter .service li:nth-child(1) div{background:url("../../static/icon/update.jpeg") no-repeat 44rpx 28rpx; background-size:36rpx 36rpx; }
  .userCenter .service li:nth-child(2) div{background:url("../../static/icon/participate.jpeg") no-repeat 44rpx 28rpx; background-size:36rpx 36rpx; }*/
  .userCenter .service li:nth-child(1) div{background:url("../../static/icon/collection.jpeg") no-repeat 44rpx 28rpx; background-size:36rpx 36rpx; }
  .userCenter .service li:nth-child(2) div{background:url("../../static/icon/purchase.jpeg") no-repeat 44rpx 28rpx; background-size:36rpx 36rpx; }
  .userCenter .service li:nth-child(3) div{background:url("../../static/icon/integral.jpeg") no-repeat 44rpx 28rpx; background-size:36rpx 36rpx; }
  .userCenter .service li:nth-child(4) div{background:url("../../static/icon/setting.jpeg") no-repeat 44rpx 28rpx; background-size:36rpx 36rpx; }
  .userCenter .service li:nth-child(5) div{background:url("../../static/icon/question.jpeg") no-repeat 44rpx 28rpx; background-size:36rpx 36rpx; }
  .userCenter .bottom{height:80rpx; position:absolute; bottom:0; display:flex; justify-content:flex-end; width:100%; }
  .userCenter .bottom li{margin:0 30rpx; line-height:80rpx; }
  .filter{height:100%; width:100%; z-index: 6; background:rgba(0,0,0,.15); position:fixed; top:0; left:0; }
</style>
