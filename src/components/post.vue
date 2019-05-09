<template>
    <a :href="detailUrl">

      <div class="post-card">
        <div class="author">
          <img :src="post.author.avatarUrl" class="img" />
        </div>


        <div class="detail">

          <div class="row text-primary">
            <div class="right">{{post.title}}</div>
            <div class="left">{{post.title}}</div>
          </div>

          <div class="row">
            <div class="right text-primary">浏览量:{{post.count}}</div>
            <div class="left">{{post.author.nickName}}</div>
          </div>

          <div class="row">
            <div class="right">{{post.author.nickName}}</div>
            <div class="left">{{post.author.nickName}}</div>
          </div>

        </div>
      </div>

    </a>
</template>

<script>
  export default {
    name: 'post',
    props: ['post'],
    computed: {
      detailUrl () {
        return '/pages/detail/main?id=' + this.post.id
      }
    }
  }
</script>

<style lang='scss' scoped>
  .post-card{
    padding:5px;
    overflow: hidden;
    margin-top:5px;
    margin-bottom:5px;
    font-size:14px;
    .author{
      width:90px;
      height:90px;
      float: left;
      margin:0 auto;
      overflow:hidden;
      .img{
        max-width: 100%;
        max-height: 100%;
      }
    }
    .detail{
      margin-left: 100px;
      .row{
        line-height:20px;
        margin-bottom:3px;
      }
      .right{
        float: right;

      }
      .left{
        margin-right:80px;
      }
    }
  }
  .text-primary{
    color:#EA5149;
  }
</style>
