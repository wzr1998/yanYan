<template>
  <div>
    <div class="classCard">
      <img :src="classItem.img" alt="" />
      <div>
        <h3>{{classItem.title}}</h3>
        <p>{{classItem.author}}·{{classItem.school}}</p>
        <p>共计{{classItem.classHour}}课时 | {{classItem.studentNum}}人已学</p>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "serveClassList",
      props : ['classItem'],
      mounted(){

      }
    }
</script>

<style scoped>
  .classCard{width:90%; margin:0 auto 40rpx; display: flex; flex-direction: row; justify-content: flex-start; }
  .classCard img{width:33%; height:125rpx; }
  .classCard > div{display: flex; flex-direction: column; justify-content: space-between; padding:5rpx 0 5rpx 25rpx; }
  .classCard h3{font-size:26rpx; }
  .classCard p{font-size:20rpx; color:#7b8f90; }
</style>
