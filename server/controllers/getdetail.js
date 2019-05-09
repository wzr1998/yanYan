//获取文章、文章点赞
const {mysql} = require('../qcloud')

module.exports = async(ctx)=>{
  const {id, star, collection, userInfo} = ctx.request.query

  let passage
  const user_info = userInfo ? JSON.parse(userInfo) : {}
  const openId = user_info.openId
  const user = await mysql('cSessionInfo').where('open_id', openId).first()
  const userCollection = user.collection ? JSON.parse(user.collection) : []

  passage = await mysql('cSessionInfo')
    .select('cSessionInfo.user_info', 'posts.*')
    .join('posts', 'cSessionInfo.open_id', 'posts.author')
    .where('id',id)
    .first()

  if(passage){
    passage.user_info = JSON.parse(passage.user_info)
    passage.passage = JSON.parse(passage.passage)
    passage.comments = JSON.parse(passage.comments)
    passage.passage.forEach(item=>{
      item.text = '<p>' + item.text.replace(/\n/g, "<p /><p>") + '<p />'
    })
    passage.titltimg = (await mysql('passageDetailImgs').select().where('id', Math.floor(Math.random()*14+1)).first()).image
    passage.isCollect = userCollection.findIndex(item=>item===id) === -1 ? false : true
  }

  ctx.state.data = passage


  if(star === '+1') await mysql('posts').where('id', id).increment('satr', 1)//注意：库表里的点赞写错了
  if(star === '-1') await mysql('posts').where('id', id).decrement('satr', 1)


  if(collection){
    if (collection === '+1'){     //添加收藏
      await mysql('posts').where('id', id).increment('collect', 1)
      userCollection.push(id)
    }else if(collection === '-1'){//取消收藏
      await mysql('posts').where('id', id).decrement('collect', 1)
      userCollection.splice(userCollection.findIndex(item => item===id ),1)
    }
    await mysql('cSessionInfo').where('open_id', openId).update({collection: JSON.stringify(userCollection)})
  }


  await mysql('posts').where('id', id).increment('count', 1) //文章浏览量+1
}


