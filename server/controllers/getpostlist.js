//按条件获取经验贴列表数组
//hottestPost获取最热经验贴
const {mysql} = require('../qcloud')

module.exports = async(ctx)=>{
  const {page, filter, hottestPost} = ctx.request.query
  const size = 10
  /*const postList = await mysql('posts').select().where('title', '*')*/

  //ctx.state.data = await mysql('posts').select('posts.*', 'cSessionInfo').join('表2', '表1.属性', '表2.属性')/*链接条件*/.where('id',id).first()




  let postList


  //注：按照点击量排序时重复点击量太多可能会出现问题
  if(filter === 'hot'){//最热榜
    postList = await mysql('posts')
      .select('cSessionInfo.user_info', 'posts.*')
      .join('cSessionInfo', 'cSessionInfo.open_id', 'posts.author')
      .limit(size)
      .offset(Number(page)*size)
      .orderBy('posts.count', 'desc') //按浏览量排序，降序
  }else if(filter === 'new'){//最新榜
    postList = await mysql('posts')
      .select('cSessionInfo.user_info', 'posts.*')
      .join('cSessionInfo', 'cSessionInfo.open_id', 'posts.author')
      .limit(size)
      .offset(Number(page)*size)
      .orderBy('id', 'desc')//按id（即事件）排序
  }else if(filter === 'failure'){//血泪史
    postList = await mysql('posts')
      .select('cSessionInfo.user_info', 'posts.*')
      .join('cSessionInfo', 'cSessionInfo.open_id', 'posts.author')
      .limit(size)
      .where('failure', '1')
      .offset(Number(page)*size)
      .orderBy('id', 'desc')//按id（即时间）排序
  }else if(filter === '24Hour'){//24小时榜
    const date = new Date()
    const prevDay = date.getTime() - 1*24*60*60*1000
    postList = await mysql('posts')
      .select('cSessionInfo.user_info', 'posts.*')
      .join('cSessionInfo', 'cSessionInfo.open_id', 'posts.author')
      .limit(size)
      .where('id', '>', prevDay)//筛选在一天之内发布的文章
      .offset(Number(page)*size)
      .orderBy('posts.count', 'desc') //按浏览量排序，降序
  }else if(filter === '7days'){//每周推荐
    const date = new Date()
    const prevDay = date.getTime() - 10*24*60*60*1000
    postList = await mysql('posts')
      .select('cSessionInfo.user_info', 'posts.*')
      .join('cSessionInfo', 'cSessionInfo.open_id', 'posts.author')
      .limit(size)
      .where('id', '>', prevDay)//筛选在一天之内发布的文章
      .offset(Number(page)*size)
      .orderBy('posts.count', 'desc') //按浏览量排序，降序
  }

  if(postList){
    postList.forEach(item =>{
      if(item.user_info) item.user_info = JSON.parse(item.user_info)
    })
    postList.forEach(item =>{
      if(item.passage) item.passage = JSON.parse(item.passage)
    })
  }


  if(hottestPost){
    //postList为单个文章对象
    postList = await mysql('posts')
      .select('cSessionInfo.user_info', 'posts.*')
      .join('cSessionInfo', 'cSessionInfo.open_id', 'posts.author')
      .orderBy('posts.count', 'desc')
      .first()
    postList.user_info = JSON.parse(postList.user_info)
    postList.passage = JSON.parse(postList.passage)
    postList.showContent = postList.passage[0].text.length > 34 ? postList.passage[0].text.substring(0,35) + '...' : postList.passage[0].text
  }

  ctx.state.data = postList
}



