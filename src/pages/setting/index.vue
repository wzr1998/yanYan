<template>
  <div>
    <!-- 真实姓名，学生证照片，在校证明照片，联系方式（邮箱、手机号）-->
    <div id="content">
      <div class="item">
        <span>真实姓名：</span><input type="text" v-model="name"/>
      </div>
      <div class="item">
        <span>手机号：</span><input type="text" v-model="phone"/>
      </div>
      <div class="item">
        <span>邮箱：</span><input type="text" v-model="emaile"/>
      </div>
      <div class="img">
        <span>学生证图片：</span><input type="button" @click="getStudentImg" value="上传图片"/>
      </div>
      <img v-for="img in studentImgList" :src="img" :key="img"  v-if="studentImgList.length>0"/>
      <div class="img">
        <span>在校证明图片：</span><input type="button" @click="getSchoolImg" value="上传图片"/>
      </div>
      <img v-for="img in schoolImgList" :src="img" :key="img"  v-if="schoolImgList.length>0"/>

    </div>
    <input type="button" value="提交" class="submit" @click="onSubmit"/>
  </div>
</template>

<script>
  import {showSuccess, post, get, showModal, showText} from '@/util'
  export default {
    name: "index",
    data(){
      return {
        name : '',
        phone : '',
        emaile : '',
        studentImgList : [],
        schoolImgList : []
      }
    },
    methods : {
      getStudentImg(){
        wx.chooseImage({
          sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
          sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
          success: res => {
            console.log(res)
            this.studentImgList = res.tempFilePaths
            console.log(this.studentImgList[0])
          }
        })
      },
      getSchoolImg(){
        wx.chooseImage({
          sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
          sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
          success: res => {
            console.log(res)
            this.schoolImgList = res.tempFilePaths
            console.log(this.studentImgList[0])
          }
        })
      },
      onSubmit(){
        if(!this.name || !this.phone || !this.emaile || this.studentImgList.length===0 || this.schoolImgList.length===0)
          showText('请输入完整信息')
        else{
          showText('提交完成，请耐心等待审核')
        }
      }
    }
  };
</script>

<style scoped>
  #content{margin:0 80rpx; }
  #content .item, #content .img{display: flex; margin-top:20rpx; font-size:30rpx; height:70rpx; line-height: 70rpx; }
  #content .item span{width:180rpx; }
  #content .item input{border:1px solid #cfe2ff; width:400rpx; border-radius: 30rpx; padding-left: 10rpx;  }
  #content .img input{height:60rpx; width:200rpx; margin:0; padding:0; line-height: 60rpx; font-size:30rpx; position:relative; top:7rpx; }
  img{height:200rpx; width:200rpx; }
  .submit{position:fixed; bottom:0; width:90%; left:5%; }
</style>
