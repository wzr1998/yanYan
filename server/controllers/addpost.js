//获取帖子信息
//入库
const {mysql} = require('../qcloud')

module.exports = async(ctx)=>{
  //const {post, userInfo, date, time, id} = ctx.request.body
  //const {id, author, title, passage, school, category, categorydetail, subject, failure, testtime, phase, time, date} = ctx.request.body
  //const postsArr = await mysql('posts').select().where('author', userInfo)
  try{
    await mysql('posts').insert(ctx.request.body)
    ctx.state.data = {
      title : ctx.request.body.title,
      msg:'success'
    }
  }catch(e){
    ctx.state = {
      code:-1,
      data:{
        msg:'新增失败:'+e.sqlMessage
      }
    }
  }
}

