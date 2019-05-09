<template>
  <div>
    <div>从学信网获取专业数据</div>
  </div>
</template>

<script>
  import {post} from '@/util'
  export default {
    name: "getdata",
    data(){
      return{
        subject : []
      }
    },
    methods : {
      async getSubject(){
        this.subject = await this.get("https://yz.chsi.com.cn/zsml/pages/getMl.jsp")
        for(let i=0; i<this.subject.length; i++){
          const categoryDetail = await this.get(`https://yz.chsi.com.cn/zsml/pages/getZy.jsp?mldm=${this.subject[i].dm}`)
          for(let j=0; j<categoryDetail.length; j++){
            let subjects = await this.get(`https://yz.chsi.com.cn/zsml/code/zy.do?q=${categoryDetail[j].dm}`)
            for(let k=0; k<subjects.length; k++){
              console.log(subjects[k])
              subjects[k] = {"data" : subjects[k], "active" : false}
            }

            Object.assign(categoryDetail[j], {data : subjects})
          }
          Object.assign(this.subject[i], {data : categoryDetail})
        }
        await post('/weapp/storeSubjectData', {
          subject : JSON.stringify(this.subject)
        })
        console.log(this.subject)
      },
      get (url) {
        return new Promise(resolve => {
          wx.request({
            method : 'GET',
            url,
            success(res) {
              resolve(res.data)
            }
          })
        })
      }
    },
    mounted(){
      this.getSubject()
    }
  };
</script>

<style scoped>

</style>
