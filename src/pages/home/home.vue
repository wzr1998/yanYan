<template>
  <div>
    <user-search></user-search>
    <div class="details_router">
      <details-router></details-router>
    </div>
    <div class="header">
      <span>分类</span><!--所有都跳转到筛选模板-->
    </div>
    <div class="classifications">
      <div class="row1">
        <a :href="'../passageDetail/main?id=' + '1557221883229'">
          <div>院校选择</div>
        </a>
        <div @click="getSuccessful">成功案例</div>
        <a :href="'../passageDetail/main?id=' + '1557247742110'">
          <div>应试技巧</div>
        </a>
      </div>
      <div class="row2">
        <div @click="firstTry">初试</div>
        <div @click="secondTry">复试</div>
        <div @click="getFailure">血泪史</div><!--不设置跳转-->
      </div>
    </div>
    <div class="header">
      <span>热门讨论</span>
    </div>
    <div style="height:10rpx;"></div>    <!--为了css样式工整，div强制添加高度-->
    <div class="card">
      <div class="discuss"><!--呈现出资讯页中讨论最多的文章-->
        <a :href="'../passageDetail/main?id=' + '1557221883229'">
          <div>2020考研：在校生如何平衡考研和学校课程？</div>
          <div>
            <div><!--文章评论中点赞数最高的用户-->
              <img src="https://wx.qlogo.cn/mmopen/vi_32/z7tEbRbmB8LtvI9xREPpUiaZ8RMcwQkBWhiaQ9Zfjia6mLxv8t6ngDcv0oTGiaRtDIcL7DoLL4IThX5h0tKibMy1D2Q/132" alt="" />
              <img src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLOsuQkAIEyTjJVIeU6DeaBgMt6U5K0bb3FoGIJyEsWFaNTbPZoLE9UolrLBtaDV8AU9ucmwvruEw/132" alt="" />
              <img src="https://wx.qlogo.cn/mmopen/vi_32/XrogcJptcI4Fia0Pdy4mPTSceSUT0LfWbWlDKOeHj5Tmb17e1ib0vreydfnvL5gHwLzaMrAkIVg7mKWN8v5r7W2A/132" alt="" />
            </div>
            <span class="text">火热讨论中</span>
          </div>
        </a>
      </div>
    </div>
    <div style="height:15rpx;"></div>    <!--为了css样式工整，div强制添加高度-->
    <div class="header">
      <span>热门经验贴</span><!--呈现浏览量最高的-->
      <span @click="moveToExperience">更多</span><!--跳转到经验贴一级页面-->
    </div>
    <div style="height:15rpx;"></div>    <!--为了css样式工整，div强制添加高度-->
    <div class="card">
      <div class="post">
        <a :href="'../passageDetail/main?id=' + hottestPost.id">
          <h3>{{hottestPost.title}}</h3>
          <div>
            <img :src="hotPostPic" alt="" />
            <p>
              {{hottestPost.showContent}}
              <br />
              <span>{{hottestPost.user_info.nickName}}</span>
              <span>{{hottestPost.date}}</span>
            </p>
          </div>
        </a>
      </div>
    </div>
    <div style="height:15rpx;"></div>    <!--为了css样式工整，div强制添加高度-->
    <div class="header">
      <span>每周推荐</span><!--显示一周内点赞数最高的经验贴列表-->
      <span @click="moveToExperience">更多</span><!--跳转到经验贴-->
    </div>
    <div style="height:15rpx;"></div>    <!--为了css样式工整，div强制添加高度-->


    <div class="experiencelist" v-for="passageItem in postList" :key="item">
      <a :href="'../passageDetail/main?id=' + passageItem.id">
        <div class="textList">
          <div>
            <h4>{{passageItem.title}}</h4>
            <div>
              <div>
                <span>{{passageItem.user_info.nickName}}</span>
                &nbsp;
                <span>{{passageItem.count}}阅读</span>
              </div>
              <span>{{passageItem.date}}</span>
            </div>
          </div>
          <img :src="passageItem.img" alt="" />
        </div>
      </a>
      <div class="hr"></div>
    </div>



    <div style="height:48rpx; "></div>
    <tab_Bar iconImg="home"></tab_Bar>
    <div style="height:45rpx;"></div>
  </div>
</template>
<script>
  import user_search from '@/components/user_search/'
  import details_router from '@/components/details_router/'
  import textList from '@/components/textList/'
  import tabBar from '@/components/tabBar/'
  import {get, getLowerImgs} from '@/util'

  export default{
    data(){
      return{
        postList: [],
        hottestPost : {},
        page: 0,
        more: true,
        i : 0,
        hotPostPic : 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAKAAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQwMzc4OUI0NjFDNDExRTk4RjFBRjlDN0RGMEVDMjU2IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQwMzc4OUIzNjFDNDExRTk4RjFBRjlDN0RGMEVDMjU2IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjc1MkI1QkZCNURDMTExRTlBRDEzQ0U5MzgzMEVCRjAyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjc1MkI1QkZDNURDMTExRTlBRDEzQ0U5MzgzMEVCRjAyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAFBAQGRIZJxcXJzImHyYyLiYmJiYuPjU1NTU1PkRBQUFBQUFERERERERERERERERERERERERERERERERERERERAEVGRkgHCAmGBgmNiYgJjZENisrNkREREI1QkRERERERERERERERERERERERERERERERERERERERERERERERERE/8AAEQgASQBkAwEiAAIRAQMRAf/EAIIAAAIDAQEAAAAAAAAAAAAAAAAEAQMFAgYBAQEBAQAAAAAAAAAAAAAAAAABAgMQAAEDAgMCCQoHAQEAAAAAAAEAAgMRBCExElEFQWFxgZGhIjIT8LHB0UJSYhQVBuFygpIjM0PiFhEBAAMAAgMBAAAAAAAAAAAAAAERIVESMZECIv/aAAwDAQACEQMRAD8A2wF2FAC6RAhShAIQhAKFKjLEoBVTzNgYZH5DZwpafeDWj+Oh+N3d/wCubDjSsLfmD4slXe6XegZALM/VNRFlbrfV2XeFbwFpOTn+VOtD/n4GCQyF59oUHmV+8L9tnprjU4jiV7bhsrQ9hBacis9paj5hmfXX0phq/L+PoQnfCi1+JpGrkQnY6tkKVCldHNKEIQCFTPcxwd84nJoxKSkkubnADw2cefr8yzM0sRZm4vo4ajvOHAMhyng86x5b2W8OmMF/EMGD18/QnGbvhbQyVeR72X7Rgu5ruK3b2iGgcCzcz4bqI8lIt3knXcu1H3R3fxTM9w2IbTk1ozPEFnfVX3TvDs4y8+8cGjlWjBamEeJO/XJnsa3y2lK5L4Y1rG/ek5e+OkYPac/H9IGXqRPbSbtcXAuEZ2NqzqxanN470dA5ogGo5ubTMHbyq+13o2YYtcw8LXjDmKt+kpmfU49NdTa8vkULW+Ss9XjeE3V1dGSE/PBrVC6CAFNFtgLiVjnijXadppjzK3SqZWPNau0jYMD0oQUcyK07TiBXNzjiUu68e/8AoifJx00t6TRNtZDGdVBXbSpUuuD7Mb3cjD6Vzx01lvtd4XGD3shbsb2nIj3DbMOudzpXfEcOgY9afc68f/XDT87gPNVcixv5e/IyMfCC49aupUAyGJui3jAA5GN9fUknRyTOAe8Pd7je6ObN3PQLSZuaMYzPfIdjjQdATY8K2bRjQ1vQEpbh5vee6ZIrUzOke6QOqccNJ4hwpzdW6I3WjBKO24F+rh7X4UVt3vy2jBBe1xp3R2gk7P7nhf2ZWlrvhFQfSqzZj/zsddP+ezU6nQhNfWrf3sdlDXoQlHaWoGLrSrA1Q9lQRUivCFplSYgMXuJ51yTBHnQcqXmsoiauc53K8obaQNyY3oqs41qx28LdnttHOl5N+WrM3hMCKMZNb0BBijObWn9IRGZJ9zWrcjVJS/dTPYHnPqW861gdnGw/pCpdu61OcTP2hLgeYm+4ppcGvcPyNA89Sn922D7tplnLyDkHuqVrfTLOtREzoTFQwUaKAcASynmLr7ffq/jDSOOo8yd3fuRsNC+lfhV29t5ttIzj23d0elRuve7L2MaqCVveb6QlytHPpcHieJpxpSnAhXeMKISyj8rJSew4AbKJR7JjmWnpC0ks/MpKwzpLeZ3dAHP6wuWNuo8xqHKFoqFGiJlnH+R6VWbmYZxO8uZaaETGV888Zxu8uZR9R2scFsBShjEdvJg4HdXrS5vp5zoto+1ji8+pat73Sose4hjw146YSHxgNfDqbU9dU9urd9xcfzUDWjJ2mhPJRPfcn9reRehs/wCpvIFR5L568rTT2a58NEL1Xs8/pQoY/9k='
      }
    },
    methods : {
      async getPostList (init) {
        if (init) {
          this.page = 0
          this.more = true
        }
        wx.showNavigationBarLoading()
        let postList = (await get('/weapp/getpostlist', {page: this.page, filter : '7days'}))

        console.log(postList)
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
      moveToExperience(){
        wx.redirectTo({url : "/pages/experience/main"})
      },
      async getHottestPost(){
        this.hottestPost = (await get('/weapp/getpostlist', {hottestPost : true}))
      },
      firstTry(){
        wx.navigateTo({url : "/pages/search/main?search=" + JSON.stringify({phase :'1'})})
      },
      secondTry(){
        wx.navigateTo({url : "/pages/search/main?search=" + JSON.stringify({phase :'2'})})
      },
      getSuccessful(){
        wx.navigateTo({url : "/pages/search/main?search=" + JSON.stringify({failure :'0'})})
      },
      getFailure(){
        wx.navigateTo({url : "/pages/search/main?search=" + JSON.stringify({failure :'1'})})
      }
    },
    components : {
      "user-search" : user_search,
      "details-router" : details_router,
      textList,
      tab_Bar : tabBar
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
    mounted(){
      this.getPostList(true)
      this.getHottestPost()
    }
  }
</script>
<style scoped>
  .details_router{padding:30rpx 0 40rpx 0; }
  .header{display: flex; flex-direction: row; justify-content:space-between; height:40rpx; padding:0 24rpx 0 32rpx; /*border-bottom:1rpx solid #000; */}
  .header span:nth-child(1){font-size:32rpx; font-weight:bold; line-height: 40rpx; }
  .header span:nth-child(2){font-size:22rpx; color:#9e9e9e; line-height: 30rpx; padding-right:18rpx; background:url("../../../static/icon/more.gif") no-repeat right 4rpx; background-size:10rpx 20rpx; }
  .classifications{display: flex; flex-direction:column; height:200rpx; justify-content:space-around; margin:20rpx 0; }
  .classifications .row1, .classifications .row2{display: flex; flex-direction:row; justify-content:space-around; }
  .classifications .row1 div, .classifications .row2 div{width:180rpx; height:80rpx; border-radius:30rpx; color:#34302d; line-height:80rpx;text-align: center; }
  .classifications .row1 div:nth-child(2n), .classifications .row2 div:nth-child(2n+1){background:#cce1ff; }
  .classifications .row1 div:nth-child(2n+1), .classifications .row2 div:nth-child(2n){background:#ffedd5; }
  .card{background: #accff9; height:300rpx; width:90%; margin:0 auto; border-radius: 30rpx; padding-top:15rpx; }
  .card > div{height:285rpx; width:88%; margin:0 auto; padding:0 3.2% 0 2.13%; }
  .discuss{display: flex; flex-direction: column; justify-content: space-around; background:url("../../../static/lowpic/15.jpg") no-repeat;background-size: 100% 100%;}
  .discuss a .text{color:#000; font-size:30rpx; position:relative; top:40rpx; }
  .discuss a img{height:56rpx; width: 56rpx; border:1rpx solid #fff; border-radius: 50%; }
  .discuss a > div:nth-child(1){line-height: 30rpx; color:#000; font-size:34rpx; display: flex; font-weight:500; position:relative; bottom:40rpx; }
  .discuss a > div:nth-child(1) span{display: block; height: 100%; line-height: 56rpx; padding-left: 24rpx; }
  .discuss a > div:nth-child(2){font-size:36rpx; color:#2f3541; }
  .discuss a > div:nth-child(3){display: flex; justify-content: flex-end; }
  .discuss a > div:nth-child(3) > div img:nth-child(1){position:relative; left:36rpx; z-index: 3; }
  .discuss a > div:nth-child(3) > div img:nth-child(2){position:relative; left:0; z-index: 2; }
  .discuss a > div:nth-child(3) > div img:nth-child(3){position:relative; right:36rpx; z-index: 1; }
  .discuss a > div:nth-child(3) span{display: block; height: 100%; line-height: 56rpx; color:#b3b3b5; }
  .post{background:#fff; display: flex; flex-direction: column; justify-content: space-around; }
  .post a h3{font-weight: 500; font-size:30rpx; color:#1a1a1a; }
  .post a > div{display: flex; flex-direction: row; height:150rpx; }
  .post a > div img{height:130rpx; width:150rpx; position:relative; top:20rpx; }
  .post a > div p{padding-left: 20rpx; color:#7f7f7f; width:400rpx; padding-top:20rpx; }
  .post a > div p span{color:#bababa; position:relative; top:20rpx; }
  .experiencelist .textList{width:90%; margin:0 auto; display: flex; flex-direction: row; justify-content: space-between; height:146rpx; }
  .experiencelist .textList img{height:146rpx; width:224rpx; }
  .experiencelist .textList > div{display: flex; flex-direction:column; justify-content: space-between; padding-right:28rpx; width:570rpx; }
  .experiencelist .textList h4{font-weight:400; font-size:30rpx; color:#555}
  .experiencelist .textList > div > div{display: flex; flex-direction:row; justify-content: space-between; font-size:26rpx; color:#c9c9c9; }
  .experiencelist .hr{background:#a7d2fc; height:4rpx; width:85%; margin:22rpx auto 14rpx; border-radius: 2rpx; }
</style>
