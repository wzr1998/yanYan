//更新文章评论内容
//入库
const {mysql} = require('../qcloud')

module.exports = async(ctx)=>{
  const {id, comments} = ctx.request.body
  await mysql('posts')
    .where('id', id)
    .update({comments})
}

