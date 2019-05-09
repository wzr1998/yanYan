//获取用户信息、增加用户积分
const {mysql} = require('../qcloud')

module.exports = async(ctx)=>{
  const {openId, addIntegralNum} = ctx.request.query
  ctx.state.data = await mysql('cSessionInfo')
    .select('*')
    .where('open_id', openId)
    .first()

  if(addIntegralNum){
    await mysql('cSessionInfo')
      .where('open_id', openId)
      .increment('integral', addIntegralNum)
  }

}

