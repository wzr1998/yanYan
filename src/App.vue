<script>
  import {get} from './util'
  import qcloud from 'wafer2-client-sdk'
  import config from './config'
  export default{
    async created () {
      /* const res = await get('/weapp')
      console.log(res) */

      /* qcloud.setLoginUrl(config.loginUrl)
      qcloud.login({
        success: function (userInfo) {
          console.log('登录成功', userInfo)
        },
        fail: function (err) {
          console.log('登录失败', err)
        }
      }) */

    }
  }
</script>

<style>
  div, p, h1, h2, h3, h4{padding : 0; margin : 0; list-style : none; text-decoration: none; font-size: 26rpx; }
  img{border:none; vertical-align: top; }
</style>
