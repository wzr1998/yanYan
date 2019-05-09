<template>
  <div>
    <!--<div v-html="postDetail.passage"></div>-->
  </div>
</template>

<script>
  //import {get} from '@/util'
  export default {
    /*data () {
      return {
        postDetail: {}
      }
    },
    computed : {

    },
    methods: {
      async getDetail () {
        this.postDetail = await get('/weapp/getdetail', {id: this.postid})
        this.postDetail.passage = '<p>' + this.postDetail.passage.replace(/\n/g, "<p /><p>") + '<p />'
        wx.setNavigationBarTitle({title : this.postDetail.title})
      }
    },
    mounted () {
      this.postid = this.$root.$mp.query.id
      this.getDetail()
    }*/
  }
</script>

<style scoped>

</style>
