const {mysql} = require('../qcloud')

module.exports = async(ctx)=>{
  const {id} = ctx.request.query
  if(id) ctx.state.data = (await mysql('passageDetailImgs').select().where('id', id).first()).image
  else ctx.state.data = (await mysql('passageDetailImgs').select().where('id', Math.floor(Math.random()*14+1)).first()).image

}

