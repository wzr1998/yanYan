<template>
  <div>
    <div class="content">
      请输入您的问题：
      <textarea v-model="text"></textarea>
    </div>
    <input type="button" value="提交" class="submit" @click="onsubmit"/>
  </div>
</template>

<script>
  import {showSuccess, post, get, showModal, showText} from '@/util'
  export default {
    name: "index",
    data(){
      return{
        text : ''
      }
    },
    methods : {
      onsubmit(){
        if(!this.text) showText('请输入您要反馈的内容')
        else showModal('反馈成功', '您要反馈的内容已提交，我们将尽快为您进行答复!')
      }
    }
  };
</script>

<style scoped>
  .content{font-size:30rpx; padding:30rpx; }
  textarea{border:1px solid #d6eaff; border-radius: 50rpx; padding:30rpx; margin-top:30rpx; height:500rpx; }
  .submit{width:90%;}
</style>
