<template>
  <div>
    <div class="search">
      <input type="text" focus="true" v-model="searchText"/>
      <input type="button" value="搜索" @click="onSearch"/>
    </div>
    <div class="hot list" v-if="defaultSearchResults">
      <div class="head">
        <div class="point"></div>
        <h3>热门搜索</h3>
      </div>
      <ul>
        <li @click="searchTestTime(19)">19考研</li>
        <li @click="searchTestTime(20)">20考研</li>
      </ul>
    </div>

    <div class="searchResults" v-if="hasSearchResults">
      <ul class="searchResultList">
        <li v-for="searchResult in searchResults" :key="searchResult">
          <a :href="'../passageDetail/main?id=' + searchResult.id">
            <div>
              <h3 v-html="searchResult.title"></h3>
              <div>
                <img src="../../../static/images/course.gif" alt="" />
                <p>
                  {{searchResult.showContent}}
                  <br />
                  <span>{{searchResult.user_info.nickName}}</span>
                  <span>{{searchResult.date}}</span>
                </p>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>

    <div v-if="!defaultSearchResults && !hasSearchResults">
      没有找到相关的文章
    </div>

    <!--<tab_Bar></tab_Bar>-->
  </div>
</template>

<script>
  import user_search from '@/components/user_search/'
  import details_router from '@/components/details_router/'
  import tabBar from '@/components/tabBar/'
  import serveClassList from '@/components/serveClassList/'
  import {get} from '@/util'
  export default {
    name: "index",
    data(){
      return{
        searchResults : [],
        searchText : '',
        defaultSearchResults : true,
        hasSearchResults : false
      }
    },
    components : {
      "user-search" : user_search,
      "details-router" : details_router,
      serveClassList,
      tab_Bar : tabBar
    },
    methods : {
      async onSearch(){
        if(this.defaultSearchResults) this.defaultSearchResults = false
        this.searchResults = await get('/weapp/search', {searchText : this.searchText})
        if(this.searchResults.length > 0) this.hasSearchResults = true
        else this.hasSearchResults = false
        console.log(this.searchResults)
      },
      async searchTestTime(testTime){
        if(this.defaultSearchResults) this.defaultSearchResults = false
        this.searchResults = await get('/weapp/search', {testTime})
        if(this.searchResults.length > 0) this.hasSearchResults = true
        else this.hasSearchResults = false
        console.log(this.searchResults)
      }
    },
    async mounted(){
      if(this.$root.$mp.query.search){
        if(this.defaultSearchResults) this.defaultSearchResults = false
        this.searchResults = await get('/weapp/search', {filterText : JSON.parse(this.$root.$mp.query.search)})
        console.log({filterText : JSON.parse(this.$root.$mp.query.search)})
        if(this.searchResults.length > 0) this.hasSearchResults = true
        else this.hasSearchResults = false
      }
    }
  }
</script>

<style scoped>
  .search{display:flex; justify-content: space-around; padding:10rpx 30rpx 0; }
  .search input:nth-child(1){height:70rpx; width:70%; border:2rpx solid #dedede; border-radius: 40rpx; background:url("../../../static/icon/search.gif") no-repeat 10rpx 18rpx; background-size:50rpx 34rpx; padding-left: 10%; color:#666; margin:0 auto; }
  .search input:nth-child(2){height:70rpx; border-radius: 35rpx; width:17%; font-size:34rpx; line-height:70rpx; padding:0; border:none; position:relative; top:5rpx; }
  .list{margin:0 20rpx; }
  .list .head{height:100rpx; line-height: 100rpx; padding:30rpx 20rpx 0; display: flex; }
  .list .point{height:30rpx; width:30rpx; border-radius: 50%; background:#7b90fb; margin:0 10rpx 0 20rpx; position:relative; top:35rpx; }
  .list ul{display: flex; flex-direction: row; flex-wrap:wrap; }
  .list ul li{height:80rpx; background:#f6f6f6; line-height:80rpx; border-radius: 40rpx; margin:0 20rpx; padding:0 40rpx; }

  .searchResults{width:85%; margin:0 auto; }
  .searchResultList{padding-bottom:90rpx; }
  .searchResultList:after{content: ''; display:block; clear:both; }
  .searchResultList li{margin:20rpx 0; }
  .searchResultList li a h3{height:70rpx; line-height:70rpx; font-size:28rpx; color:#383838; font-weight:400; }
  .searchResultList li a > div > div{display:flex; height:110rpx; }
  .searchResultList li a > div > div img{height:110rpx; width:110rpx; }
  .searchResultList li a > div > div p{padding-left:10rpx; color:#929292; width:500rpx; }






</style>
