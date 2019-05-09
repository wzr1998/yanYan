<template>
  <div>
    <h2><input type="text" v-model="passage.title" placeholder="请输入标题"/> </h2>
    <div class="content">
      <div v-for="(item,i) in passage.content" :key="item" class="passage_content">
        <div class="title">
          <p>第{{i+1}}段标题：&nbsp;&nbsp;</p>
          <input type="text" v-model="item.title" :placeholder="'请输入第' + (i+1) + '段标题'" />
        </div>
        <div class="content">
          第{{i+1}}段内容：<textarea :placeholder="'请输入第' + (i+1) + '段内容'" v-model="item.text" maxlength="500"></textarea>
        </div>
      </div>
    </div>
    <input type="button" value="添加段落" @click="addParagraph" class="addParagraph"/>
    <div class="additional_Information">

      <div>
        <p>学校：</p>
        <input type="text" v-model="passage.school"/>
      </div>

      <div class="subject">
        <p>相关学科：{{passage.category}}-{{passage.categoryDetail}}-{{passage.subject.data}}</p>
        <picker-view indicator-style="height: 40rpx;" style="width: 100%; height: 300rpx;" @change="onChange">
          <picker-view-column>
            <view v-for="item in Allsubject" style="line-height: 70rpx; " :key="item">{{item.mc}}</view>
          </picker-view-column>
          <picker-view-column>
            <view v-for="item in categoryDetail" style="line-height: 70rpx" :key="item">{{item.mc}}</view>
          </picker-view-column>
          <picker-view-column>
            <view v-for="item in subject" style="line-height: 70rpx" :key="item">{{item.data}}</view>
          </picker-view-column>
        </picker-view>
      </div>
      是否为血泪史文章：<switch @change="onSwitchChange" color="#abcdef" style="zoom:.7 "/> &nbsp;&nbsp;&nbsp;&nbsp;{{passage.failure ? '是' : '否'}}<br />
      <div style="margin-top:10rpx; ">
        <p>考研时间：</p>
        <radio-group @change="onRadioTimeChange">
          <radio style="zoom:.8 " checked color="#abcdef" value="19">19考研</radio>
          &nbsp;&nbsp;
          <radio style="zoom:.8 " color="#abcdef" value="20">20考研</radio>
        </radio-group>
      </div>

      <div style="margin-top:10rpx; ">
        <p>考研阶段：</p>
        <radio-group @change="onRadioPhaseChange">
          <radio style="zoom:.8 " checked color="#abcdef" value="1">初试</radio>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <radio style="zoom:.8 " color="#abcdef" value="2">复试</radio>
        </radio-group>
      </div>
    </div>
    <input type="button" value="发送" class="submit" @click="addpost"/>
  </div>
</template>

<script>
  import user_search from '@/components/user_search/'
  import details_router from '@/components/details_router/'
  import tabBar from '@/components/tabBar/'
  import serveClassList from '@/components/serveClassList/'
  import {showSuccess, post, get, showModal, showText} from '@/util'
  export default {
    name: "index",
    data(){
      return{
        passage : {
          title : '',
          content : [ {title : '' , text : '' } ],
          school : '',
          category : '',
          categoryDetail : '',
          subject : '',
          failure : 0,     //是否为血泪史文章，默认不是为0，是为1
          testTime : 19,       //考研事件，值为年份（19/20）
          phase : 1        //考研阶段，1为初试，2为复试
        },
        Allsubject : [],//组件内滚动数据内容
        categoryDetail : [],
        subject : [],
      }
    },
    components : {
      "user-search" : user_search,
      "details-router" : details_router,
      serveClassList,
      tab_Bar : tabBar
    },
    methods : {
      addParagraph(){
        this.passage.content.push({title : '', text : ''})
      },
      onChange(e){
        //更新问斩数据
        this.passage.category = this.Allsubject[e.target.value[0]].mc
        this.passage.categoryDetail = this.Allsubject[e.target.value[0]].data[e.target.value[1]].mc
        this.passage.subject = this.Allsubject[e.target.value[0]].data[e.target.value[1]].data[e.target.value[2]]
        //更新模块内滚动数据
        this.categoryDetail = this.Allsubject[e.target.value[0]].data
        this.subject = this.categoryDetail[e.target.value[1]].data
      },
      onSwitchChange(e){
        if(e.mp.detail.value) this.passage.failure = 1
        else this.passage.failure = 0
      },
      onRadioTimeChange(e){
        this.passage.testTime = e.mp.detail.value;
      },
      onRadioPhaseChange(e){
        this.passage.phase = e.mp.detail.value;
      },
      async getCategory(){
        //获取课程数据，并设置组件内课程类别、科目默认值
        this.Allsubject = (JSON.parse((await get('/weapp/getsubject')).subject)).map(item => Object.assign(item, {"active" : false}) )
        this.categoryDetail = this.Allsubject[0].data
        this.subject = this.categoryDetail[0].data
        //设置文章学科默认值
        this.passage.category = this.Allsubject[0].mc
        this.passage.categoryDetail = this.Allsubject[0].data[0].mc
        this.passage.subject = this.Allsubject[0].data[0].data[0]
      },
      async addpost () {
        const _this = this
        console.log(this.passage.content)
        if(!this.passage.title){
          showText("请输入标题")
          return
        }else if(this.passage.content.some(item => item.title === '')){
          showText("段落标题不能为空！")
          return
        }else if(this.passage.content.some(item => item.text === '')){
          showText("段落内容不能为空！")
          return
        }else if(!this.passage.school){
          showText("学校不能为空！")
          return
        }
        if (wx.getStorageSync('userInfo')) {
          const Time = new Date()
          const passageData = {
            id: parseInt(Time.getTime()),
            author: wx.getStorageSync('userInfo').openId,
            title : _this.passage.title,
            passage : JSON.stringify(_this.passage.content),
            school : _this.passage.school,
            category : _this.passage.category,
            categorydetail : _this.passage.categoryDetail,
            subject : _this.passage.subject.data,
            failure : _this.passage.failure,
            testtime : _this.passage.testTime,
            phase : _this.passage.phase,
            time: `${parseInt(Time.getHours()) < 10 ? '0' + Time.getHours() : Time.getHours()}:${parseInt(Time.getMinutes()) < 10 ? '0' + Time.getMinutes() : Time.getMinutes()}`,
            date: `${Time.getFullYear()}年${Time.getMonth() + 1}月${Time.getDate()}日`,
            comments : '[]'
          }
          console.log(passageData)
          const res = await post('/weapp/addpost', passageData)
          showText(`文章"${!(res.title.length > 10) ? res.title : (res.title.substring(0, 10) + '...')}"发送成功`)
          //let passageData = this.passage
          setTimeout(function(){
            //passageData = {}
            _this.passage = {
              title : '',
                content : [ {title : '' , text : '' } ],
                school : '',
                category : '',
                categoryDetail : '',
                subject : '',
                failure : 0,     //是否为血泪史文章，默认不是为0，是为1
                testTime : 19,       //考研事件，值为年份（19/20）
                phase : 1        //考研阶段，1为初试，2为复试
            }
            setTimeout(wx.redirectTo({url : "/pages/home/main"}))
          }, 1000)
        } else {
          showText('发送失败')
        }
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
      }
    },
    mounted(){
      this.getCategory()
    }
  }
</script>

<style scoped>
  h2 input{height:100rpx; border-bottom:1px solid #f0f0f0; background:url("../../../static/icon/release_original.gif") no-repeat 50rpx 28rpx; background-size:52rpx 50rpx; line-height:100rpx; padding-left: 130rpx; font-size:30rpx; color:#666;}
  .addParagraph{width:80%; margin:20rpx auto; height:70rpx; line-height:70rpx; }
  .passage_content{padding:0 20rpx; margin-top:20rpx; }
  .passage_content .title{display: flex; }
  .passage_content .title p{height:50rpx; line-height:50rpx; font-size:30rpx; color:#111; }
  .passage_content .title input{height:50rpx; line-height:50rpx; font-size:30rpx; color:#111; border:1px solid #abcdef; border-radius: 24rpx; width:500rpx; margin:0; padding-left:10rpx; }
  .passage_content .content{font-size:30rpx; }
  .passage_content .content textarea{border:1px solid #abcdef; border-radius: 30rpx; padding:10rpx; width:680rpx; }
  .additional_Information{padding:0 20rpx; }
  .additional_Information .subject{margin-top:20rpx; }
  .additional_Information > div:not(.subject){display: flex; }
  .additional_Information > div:not(.subject) input{border:1px solid #abcdef; border-radius: 30rpx; padding-left: 10rpx; }
  .submit{margin-top:20rpx; }
</style>
