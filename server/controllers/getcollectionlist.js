//获取收藏文章列表
//入库
const {mysql} = require('../qcloud')

module.exports = async(ctx)=>{
  const {openId} = ctx.request.body
  const user = await mysql('cSessionInfo').where('open_id', openId).first()
  const userCollection = user.collection ? JSON.parse(user.collection) : []
  let collectionList = []


  for(let i=0; i<userCollection.length; i++){
    let collectionItem = await mysql('cSessionInfo')
      .select('cSessionInfo.user_info', 'posts.*')
      .join('posts', 'cSessionInfo.open_id', 'posts.author')
      .where('id', userCollection[i])
      .first()
    collectionList.push(collectionItem)
  }


/*
  if(collectionList){
    collectionList.forEach(item =>{
      if(item.user_info) item.user_info = JSON.parse(item.user_info)
    })
    collectionList.forEach(item =>{
      if(item.passage) item.passage = JSON.parse(item.passage)
    })
  }*/




  if(collectionList){
    collectionList.forEach((item, index) => {
      item.user_info = JSON.parse(item.user_info)
      item.passage = JSON.parse(item.passage)
      item.comments = JSON.parse(item.comments)
      item.showContent = item.passage[0].text.length > 34 ? item.passage[0].text.substring(0,35) + '...' : item.passage[0].text
      item.imgIndex = index%14
    })

  }




  ctx.state.data = {collectionList}
}

