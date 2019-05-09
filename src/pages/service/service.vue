<template>
    <div>
      <user-search></user-search>
      <div style="height:20rpx;"></div>
      <details-router></details-router>
      <div style="height:10rpx;"></div>
      <div class="card">
        <div>
          <div>考研管家</div>
          <div>师兄面对面</div>
        </div>
        <div>
          <div>历年真题</div>
          <div>状元笔记</div>
        </div>
      </div>
      <!--<ul class="serverNav">
        <li class="active">全部</li>
        &lt;!&ndash;<li>国家精品课程</li>&ndash;&gt;
        <li>理学</li>
        <li>工学</li>
        <li>农学</li>
        <li>医学</li>
      </ul>-->
      <div v-for="classItem in classList" :key="classItem">
        <serveClassList :classItem="classItem"></serveClassList>
      </div>
      <div style="height:50rpx; "></div>
      <tab_Bar iconImg="service"></tab_Bar>
    </div>
</template>

<script>
  import user_search from '@/components/user_search/'
  import details_router from '@/components/details_router/'
  import tabBar from '@/components/tabBar/'
  import serveClassList from '@/components/serveClassList/'
  import classImg from '../../../static/images/course.gif'
    export default {
      name: "index",
      data(){
        return{
          classList : [
            {img : classImg, title : "天体物理", author : "王卓然", school : "清华大学", classHour : 36, studentNum : 865},
            {img : classImg, title : "天体物理", author : "王卓然", school : "清华大学", classHour : 36, studentNum : 865},
            {img : classImg, title : "天体物理", author : "王卓然", school : "清华大学", classHour : 36, studentNum : 865},
            {img : classImg, title : "天体物理", author : "王卓然", school : "清华大学", classHour : 36, studentNum : 865},
            {img : classImg, title : "天体物理", author : "王卓然", school : "清华大学", classHour : 36, studentNum : 865},
            {img : classImg, title : "天体物理", author : "王卓然", school : "清华大学", classHour : 36, studentNum : 865},
            {img : classImg, title : "天体物理", author : "王卓然", school : "清华大学", classHour : 36, studentNum : 865},
            {img : classImg, title : "天体物理", author : "王卓然", school : "清华大学", classHour : 36, studentNum : 865},
            {img : classImg, title : "天体物理", author : "王卓然", school : "清华大学", classHour : 36, studentNum : 865},
            {img : classImg, title : "天体物理", author : "王卓然", school : "清华大学", classHour : 36, studentNum : 865},
          ]
        }
      },
      components : {
        "user-search" : user_search,
        "details-router" : details_router,
        serveClassList,
        tab_Bar : tabBar
      }
    }
</script>

<style scoped>
  .card > div{display: flex; justify-content: space-around; margin:20rpx 0; }
  .card > div > div{height:140rpx; width:40%; border-radius:30rpx; font-size:40rpx; color:#fff; padding:40rpx 0 0 6.25%; }
  .card > div:nth-child(1) > div:nth-child(1){background: #7da0c6; }
  .card > div:nth-child(1) > div:nth-child(2){background: #a2bcd7; }
  .card > div:nth-child(2) > div:nth-child(1){background: #aad0f7; }
  .card > div:nth-child(2) > div:nth-child(2){background: #89b7db; }
  .serverNav{border-top:3rpx solid #aed0f3; display:flex; justify-content: space-around; height:90rpx; box-shadow: 0 20rpx 20rpx #f8f8f8; margin-top:40rpx; margin-bottom:20rpx; }
  .serverNav li{line-height:84rpx; font-size:26rpx; font-weight:400; }
  .serverNav .active{border-bottom:4rpx solid #04d88b; font-size:30rpx; font-weight:500; }
</style>
