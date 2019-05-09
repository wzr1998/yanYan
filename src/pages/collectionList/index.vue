<template>
  <div>

    <div class="collection">
      <ul class="collectionList">
        <li v-for="item in collections" :key="item">
          <a :href="'../passageDetail/main?id=' + item.id">
            <div>
              <h3 v-html="item.title"></h3>
              <div>
                <!--<img src="../../../static/images/course.gif" alt="" />-->
                <img :src="imgs[item.imgIndex]" alt="" />
                <p>
                  {{item.showContent}}
                  <br />
                  <span>{{item.user_info.nickName}}</span>
                  <span>{{item.date}}</span>
                </p>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  import {post, showText, getLowerImgs} from '@/util'
  //await get('/weapp/getdetail', {id: this.passageId, collection : '+1', userInfo})
  export default {
    name: "index",
    data(){
      return{
        collections : [],
        imgs : getLowerImgs()
      }
    },
    async mounted () {
      this.collections = (await post('/weapp/getcollectionlist', {openId: wx.getStorageSync('userInfo').openId})).collectionList
    }
  };
</script>

<style scoped>
  .collection{width:85%; margin:0 auto; }
  .collectionList{padding-bottom:90rpx; }
  .collectionList:after{content: ''; display:block; clear:both; }
  .collectionList li{margin:20rpx 0; }
  .collectionList li a h3{height:70rpx; line-height:70rpx; font-size:28rpx; color:#383838; font-weight:400; }
  .collectionList li a > div > div{display:flex; height:110rpx; }
  .collectionList li a > div > div img{height:110rpx; width:110rpx; }
  .collectionList li a > div > div p{padding-left:10rpx; color:#929292; width:500rpx; }
</style>
