<template>
  <div>
    <!--<div class="userInfo">
      <img :src="userInfo.avatarUrl" />
      <p>{{userInfo.nickName}}</p>
      <p v-if="userInfo.gender">性别：{{userInfo.gender}}</p>
      <p v-if="userInfo.country">地区：{{userInfo.country+userInfo.province+userInfo.city}}</p>
      <button class="login" v-if="!userInfo.gender" open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">登陆</button>
    </div>
    <input type="text" v-model="post.title"/>
    <textarea v-model='post.passage'
              class='textarea'
              :maxlength='5000'
              placeholder='请输入帖子内容'
    ></textarea>

    <button @click="addpost">发送</button>
-->
  </div>
</template>
<script>
  /*import defaultUserImg from '../../../static/images/unlogin.png'
  import qcloud from 'wafer2-client-sdk'
  import config from './../../config'
  import {showSuccess, post, showModal, showText} from '@/util'

  const defaultUserInfo = {
    avatarUrl: defaultUserImg,
    nickName: '请登陆'
  }*/
  export default{
    /*data () {
      return {
        defaultUserImg,
        userInfo: wx.getStorageSync('userInfo') ? wx.getStorageSync('userInfo') : defaultUserInfo,
        post: {
          title: '',
          passage: ''
        }
      }
    },
    mounted () {

    },
    methods: {
      onGotUserInfo (e) {
        if (!wx.getStorageSync('userInfo')) {
          const _this = this
          this.userInfo = e.target.userInfo
          if (this.userInfo.gender === 0) this.userInfo.gender = '未知'
          if (this.userInfo.gender === 1) this.userInfo.gender = '男'
          if (this.userInfo.gender === 2) this.userInfo.gender = '女'
          if (!this.userInfo.avatarUrl) this.userInfo.avatarUrl = this.defaultUserImg
          qcloud.setLoginUrl(config.loginUrl)
          qcloud.login({
            success (userInfo) {
              Object.assign(_this.userInfo, {'openId': userInfo.openId})
              wx.setStorageSync('userInfo', _this.userInfo)
            }
          })
        }
      },
      async addpost () {
        if (wx.getStorageSync('userInfo')) {
          if (!this.post.title) {
            showText('请输入标题!')
          } else if (!this.post.passage) {
            showText('请输入文章内容!')
          } else {
            const Time = new Date()
            const res = await post('/weapp/addpost', {
              post: this.post,
              userInfo: JSON.stringify(this.userInfo),
              id: Time.getTime(),
              date: `${Time.getFullYear()}年${Time.getMonth() + 1}月${Time.getDate()}日`,
              time: `${parseInt(Time.getHours()) < 10 ? '0' + Time.getHours() : Time.getHours()}:${parseInt(Time.getMinutes()) < 10 ? '0' + Time.getMinutes() : Time.getMinutes()}`
            })
            showText(`文章"${!(res.title.length > 10) ? res.title : (res.title.substring(0, 10) + '...')}"发送成功`)
          }
        } else {
          showText('发送失败')
        }
      }
    }*/
  }
</script>

<style scoped lang="scss">
  /*.userInfo{
    text-align: center;
    img{
      height:128rpx;
      width:128rpx;
      border-radius: 50%;
    }
    .login {
      height: 50rpx;
      width: 150rpx;
      font-size: 24rpx;
    }
    .div{
      width:750rpx;
      height:50rpx;
      background:red;
    }
  }*/
</style>
