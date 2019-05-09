<template>
  <div>
    <web-view :src="url"></web-view>
  </div>
</template>

<script>
  export default {
    name: "index",
    data(){
      return{
        url : ''
      }
    },
    mounted(){
      this.url = this.$root.$mp.query.url
    }
  };
</script>

<style scoped>

</style>
