<template>
  <div>
    <user-search></user-search>
    <ul class="select">
      <li class="active">招生单位发布的信息</li>
      <li>省招办发布的信息</li>
      <li @click="switchShowFilter">筛选</li>
    </ul>

    <div v-for="item in indormationList" :key="item" class="informationItem">
      <a :href="'../informationDetail/main?url=' + item.href">
        <!--<textList :informationData="item" ></textList>-->
        <div class="textList">
          <div>
            <h4>{{item.title}}</h4>
            <div>
              <div>
                <span>黑龙江大学</span>
                <!--<span>660阅读</span>-->
              </div>
              <span>{{item.time}}</span>
            </div>
          </div>
          <img :src="item.img" alt="" />
        </div>
        <div class="hr"></div>
      </a>
    </div>

    <tab_Bar iconImg="information"></tab_Bar>
    <div style="height:45rpx;"></div>
    <filter :show="showFilter" @closeFilter="toCloseFilter"></filter>
  </div>
</template>

<script>
  import user_search from '@/components/user_search/'
  import textList from '@/components/textList/'
  import tabBar from '@/components/tabBar/'
  import filter from "@/components/filter"
  import {showSuccess, post, get, showModal, showText, getLowerImgs} from '@/util'
    export default {
      name: "information",
      data(){
        return{
          showFilter : false,
          indormationList : [],
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
        toCloseFilter(){
          this.showFilter = !this.showFilter
        },
        switchShowFilter(){
          this.showFilter = !this.showFilter
        },
        onClick(url){
          wx.navigateTo({url})
        }
      },
      async mounted(){
        let indormationList = await post('/weapp/getinformationlist')
        const _this = this
        this.indormationList = indormationList.map(item => {
          _this.i++
          _this.i %= 14
          return{
            time : item.span,
            href : 'http://yjsy.hlju.edu.cn' + item.a['-href'].substring(5),
            title : item.a['-title'],
            /*img : getLowerImgs()[Math.floor(Math.random()*14)]*/
            img : getLowerImgs()[_this.i]
          }
        })

      }
    }
</script>

<style scoped>
  .select{width:90%; margin:20rpx auto 30rpx; height:55rpx; border-left:1rpx solid #efefef; }
  .select li{float:left; text-align:center; font-size:22rpx; border:1rpx solid #efefef; height:55rpx; line-height: 55rpx; border-left: none; background:#f8f9fb; }
  .select li:nth-child(1){width:40%; }
  .select li:nth-child(2){width:40%; }
  .select li:nth-child(3){width:18%; background:#fff; border:none; font-size:26rpx; background:url("../../../static/icon/select.gif") no-repeat 90% 15rpx; background-size:25rpx 25rpx; }
  .select .active{border-top:2rpx solid #4f8ec4; background:#fff; border-bottom: none; color:#5294c0;}
  a{font-size:30rpx; }
  .informationItem .textList{width:90%; margin:0 auto; display: flex; flex-direction: row; justify-content: space-between; height:146rpx; }
  .informationItem .textList img{height:146rpx; width:224rpx; }
  .informationItem .textList > div{display: flex; flex-direction:column; justify-content: space-between; padding-right:28rpx; width:570rpx; }
  .informationItem .textList h4{font-weight:400; font-size:30rpx; color:#555}
  .informationItem .textList > div > div{display: flex; flex-direction:row; justify-content: space-between; font-size:26rpx; color:#c9c9c9; }
  .informationItem .hr{background:#a7d2fc; height:4rpx; width:85%; margin:22rpx auto 14rpx; border-radius: 2rpx; }
</style>
