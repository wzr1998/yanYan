<template>
    <div>
      <div class="filterSelect" v-if="show">
        <div>
          <h3>报考院校</h3>
          <div :class="search.school ? 'item active' : 'item'" @click="getSchool">黑龙江大学</div>
          <hr />
          <h3>报考专业</h3>
          <!--<div class="profession">
            <div class="item">学业硕士</div>
            <div>——</div>
            <div class="item">专业硕士</div>
          </div>
          <hr />-->
          <ul class="category">
            <li v-for="(item,i) in category" :key="item" :class="item.active ? 'item active' : 'item' " @click="categoryClick(item)"> {{item.mc}} </li>
          </ul>
          <ul class="categoryDetail">
            <li v-for="(item,j) in categoryDetail" :key="item" :class="item.active ? 'active' : '' " >
              <h4 @click="getSubject(item)">{{item.mc}}</h4>
              <ul v-if="item.active">
                <li v-for="subjectItem in subject" :key="subjectItem" :class="subjectItem.active ? 'active' : '' " @click="clickSubject(subjectItem)">{{subjectItem.data}}</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="search" v-if="show">
        <input type="button" value="重置" @click="reset"/>
        <input type="button" value="确定" @click="submit"/>
      </div>
      <div class="filter" @click="close" v-if="show"></div>
    </div>
</template>

<script>
  import {get, showText} from '@/util'
  export default {
    name: "filter",
    props : ["show"],
    data(){
      return{
        category : [],
        categoryDetail : [],
        subject : [],
        localSubject : [],
        search : {school : '', category : '', categoryDetail : '', subject : ''}
      }
    },
    methods : {
      async getCategory(){
        //this.category = await this.get("https://yz.chsi.com.cn/zsml/pages/getMl.jsp")
        this.category = (JSON.parse((await get('/weapp/getsubject')).subject)).map(item => Object.assign(item, {"active" : false}) )
        console.log(this.category)
      },
      async getCategoryDetail(dm){    //本地时就是item
        //this.categoryDetail = await this.get(`https://yz.chsi.com.cn/zsml/pages/getZy.jsp?mldm=${dm}`)
        this.categoryDetail = dm.data.map(item => Object.assign(item, {"active" : false}) )
      },
      categoryClick(item){
        if(item.active){
          item.active = !item.active
          this.categoryDetail = []
          this.search.category = ''
          return false
        }
        this.category.forEach(item=>{item.active = false})
        item.active = !item.active
        this.search.category = item.mc
        //this.getCategoryDetail(item.dm)
        this.getCategoryDetail(item)
      },
      async getSubject(item){
        if(item.active) {
          item.active = false
          this.subject = []
          this.search.categoryDetail = ''
          return false
        }
        this.categoryDetail.forEach(item=>{item.active = false})
        this.search.categoryDetail = item.mc
        item.active = true
        //this.subject = await this.get(`https://yz.chsi.com.cn/zsml/code/zy.do?q=${item.dm}`)
        this.subject = item.data
        console.log(this.search)
      },
      getSchool(){
        if(!this.search.school)this.search.school = '黑龙江大学'
        else this.search.school = ''
      },
      clickSubject(subjectItem){
        if(subjectItem.active){
          subjectItem.active = false
          this.search.subject = ''
          return false
        }
        this.subject.forEach(item => {
          item.active = false
        })
        subjectItem.active = true
        this.search.subject = subjectItem.data
      },
      reset(){
        this.getCategory()
        this.categoryDetail = []
          this.subject = []
          this.localSubject = []
          this.search = {school : '', category : '', categoryDetail : '', subject : ''}
      },
      async submit(){
        if(!this.search.school && !this.search.category && !this.search.categoryDetail && !this.search.subject){
          showText('请选择筛选条件')
          return
        }
        console.log(this.search)
        wx.navigateTo({url : "/pages/search/main?search=" + JSON.stringify(this.search)})
        //await get('/weapp/search', {filterText : this.search})
      },
      get (url, data) {
        return this.request(url, 'GET', data)
      },
      request (url, method, data, header = {}) {
        return new Promise(resolve => {
          wx.request({
            data,
            method,
            header,
            url,
            success: function (res) {
              resolve(res.data)
            }
          })
        })
      },
      close(){
        this.$emit('closeFilter')
      }
    },
    mounted(){
      this.getCategory()
    }
  };
</script>

<style scoped>
  .filter{height:100%; width:100%; z-index: 6; background:rgba(0,0,0,.15); position:fixed; top:0; left:0; }
  .filterSelect{width:80%; height:100%; background:#fff; position:absolute; top:0; right:0; z-index: 7; overflow: auto; }
  .filterSelect > div{padding-bottom:80rpx; }
  .filterSelect > div > div, .filterSelect > div > h3, .filterSelect > div > ul{margin:0 20rpx; }
  .filterSelect h3{font-size:30rpx; height:80rpx; line-height:80rpx; }
  .filterSelect .item{height:70rpx; width:160rpx; background:#f5f5f5; line-height:70rpx; text-align: center; border-radius:20rpx; color:#404040; }
  .filterSelect .active{background:#aad0f7; }
  .filterSelect hr{height:2rpx; background:#eeeeee; margin:20rpx 0; }
  .filterSelect .profession{display: flex; justify-content: space-around; }
  .filterSelect .profession div:nth-child(1), .filterSelect .profession div:nth-child(3){width:200rpx; border-radius: 35rpx; }
  .filterSelect .profession div:nth-child(2){height:70rpx; line-height: 70rpx; color:#cfcfcf; }
  .filterSelect .category{display: flex; flex-wrap:wrap; justify-content: flex-start; }
  .filterSelect .category .item{margin:10rpx 27rpx 10rpx 0; }
  .filterSelect .categoryDetail{margin:0; }
  .filterSelect .categoryDetail > li{height:70rpx; line-height:70rpx; text-indent: 60rpx; background: url("../../static/icon/userMore.gif") no-repeat 30rpx 25rpx; background-size:10rpx 20rpx; }
  .filterSelect .categoryDetail > li h4{border-bottom:1rpx solid #dadada; }
  .filterSelect .categoryDetail > .active{background: url("../../static/icon/userMoreActive.gif") no-repeat 25rpx 30rpx; background-size:20rpx 10rpx; height:auto; }
  .filterSelect .categoryDetail > li li{text-indent: 80rpx; }
  .search{position:absolute; bottom:0; display:flex; justify-content: flex-end; width:60%; right:0; padding-bottom:10rpx; z-index: 7; background:#fff; padding-left:20%; }
  .search input{height:70rpx; border-radius:40rpx; line-height:70rpx; padding:0 40rpx; }
</style>
