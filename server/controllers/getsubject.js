const {mysql} = require('../qcloud')

module.exports = async(ctx)=>{
  ctx.state.data = await mysql('subject').select('*').first()
}

