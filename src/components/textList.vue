<template>
  <div>
    <div class="textList">
      <div>
        <h4>{{informationData.title}}<!--校园]学硕和专硕，那个更好找工作？非全面有必要考吗？--></h4>
        <div>
          <div>
            <span>黑龙江大学</span>
            <!--<span>660阅读</span>-->
          </div>
          <span>{{informationData.time}}</span>
        </div>
      </div>
      <!--<img src="../../static/images/course.gif" alt="" />-->
      <!--<img :src="informationData.img" alt="" />-->
      <img :src="informationData.img" alt="" />
      <!--{{informationData.imgIndex}}-->
    </div>
    <div class="hr"></div>
  </div>
</template>

<script>
  import {showSuccess, post, get, showModal, showText} from '@/util'
    export default {
      name: "textList",
      props: ['informationData'],
      async mounted(){
        const img = await get('/weapp/getRandomImg', {id : this.informationData.imgIndex})
        Object.assign(this.informationData, {img})
        /*console.log(this.informationData)*/
      }
    }
</script>

<style scoped>
  .textList{width:90%; margin:0 auto; display: flex; flex-direction: row; justify-content: space-between; height:146rpx; }
  .textList img{height:146rpx; width:224rpx; }
  .textList > div{display: flex; flex-direction:column; justify-content: space-between; padding-right:30rpx; width:570rpx; }
  .textList h4{font-weight:500; font-size:24rpx; }
  .textList > div > div{display: flex; flex-direction:row; justify-content: space-between; font-size:22rpx; color:#c9c9c9; }
  .hr{background:#a7d2fc; height:4rpx; width:85%; margin:22rpx auto 14rpx; border-radius: 2rpx; }
</style>
