const {mysql} = require('../qcloud')

module.exports = async(ctx)=>{
  const {subject} = ctx.request.body
  try{
    await mysql('subject').insert({subject, id : 1})
    ctx.state.data = {
      msg:'success'
    }
  }catch(e){
    ctx.state = {
      code:-1,
      data:{
        msg:'储存失败:'+e.sqlMessage
      }
    }
  }
}

