//搜索文章/新闻
const {mysql} = require('../qcloud')
module.exports = async(ctx)=>{
  const {searchText, testTime, filterText} = ctx.request.query
  let passageSearch






  if(searchText){
    passageSearch = await mysql('posts')
      .select('cSessionInfo.user_info', 'posts.*')
      .join('cSessionInfo', 'cSessionInfo.open_id', 'posts.author')
      .where('posts.title', 'like', `%${searchText}%`)
      .orderBy('id', 'desc')
    passageFunction(passageSearch, searchText, true)
  }

  if(testTime){
    passageSearch = await mysql('posts')
      .select('cSessionInfo.user_info', 'posts.*')
      .join('cSessionInfo', 'cSessionInfo.open_id', 'posts.author')
      .where('posts.testtime', testTime)
      .orderBy('id', 'desc')
    passageFunction(passageSearch, searchText)
  }

  if(filterText){
    const filtetObj = JSON.parse(filterText)


    if(filtetObj.school){ //如果学校存在则搜索
      if(filtetObj.subject)
        passageSearch = await mysql('posts')
          .select('cSessionInfo.user_info', 'posts.*')
          .join('cSessionInfo', 'cSessionInfo.open_id', 'posts.author')
          .where({"posts.school" : filtetObj.school, "posts.subject" : filtetObj.subject})
          .orderBy('id', 'desc')
      else if(filtetObj.categoryDetail)
        passageSearch = await mysql('posts')
          .select('cSessionInfo.user_info', 'posts.*')
          .join('cSessionInfo', 'cSessionInfo.open_id', 'posts.author')
          .where({"posts.school" : filtetObj.school, "posts.categoryDetail" : filtetObj.categoryDetail})
          .orderBy('id', 'desc')
      else if(filtetObj.category)
        passageSearch = await mysql('posts')
          .select('cSessionInfo.user_info', 'posts.*')
          .join('cSessionInfo', 'cSessionInfo.open_id', 'posts.author')
          .where({"posts.school" : filtetObj.school, "posts.category" : filtetObj.category})
          .orderBy('id', 'desc')
      else passageSearch = await mysql('posts')
          .select('cSessionInfo.user_info', 'posts.*')
          .join('cSessionInfo', 'cSessionInfo.open_id', 'posts.author')
          .where({"posts.school" : filtetObj.school})
          .orderBy('id', 'desc')
    }else{
      if(filtetObj.subject)//按学科大类搜索
        passageSearch = await mysql('posts')
          .select('cSessionInfo.user_info', 'posts.*')
          .join('cSessionInfo', 'cSessionInfo.open_id', 'posts.author')
          .where({"posts.subject" : filtetObj.subject})
          .orderBy('id', 'desc')
      else if(filtetObj.categoryDetail)//按学科小类搜索
        passageSearch = await mysql('posts')
          .select('cSessionInfo.user_info', 'posts.*')
          .join('cSessionInfo', 'cSessionInfo.open_id', 'posts.author')
          .where({"posts.categoryDetail" : filtetObj.categoryDetail})
          .orderBy('id', 'desc')
      else if(filtetObj.category)//按专业搜索
        passageSearch = await mysql('posts')
          .select('cSessionInfo.user_info', 'posts.*')
          .join('cSessionInfo', 'cSessionInfo.open_id', 'posts.author')
          .where({"posts.category" : filtetObj.category})
          .orderBy('id', 'desc')
      else if(filtetObj.phase)//按考研阶段搜索（初试/复试）
        passageSearch = await mysql('posts')
          .select('cSessionInfo.user_info', 'posts.*')
          .join('cSessionInfo', 'cSessionInfo.open_id', 'posts.author')
          .where({"posts.phase" : filtetObj.phase})
          .orderBy('id', 'desc')
      else if(filtetObj.failure)//按考成功与否搜索（成功案例/血泪史）
        passageSearch = await mysql('posts')
          .select('cSessionInfo.user_info', 'posts.*')
          .join('cSessionInfo', 'cSessionInfo.open_id', 'posts.author')
          .where({"posts.failure" : filtetObj.failure})
          .orderBy('id', 'desc')

      //failure
    }
    passageFunction(passageSearch, searchText)
  }


  ctx.state.data = passageSearch
}


const passageFunction = (passageSearch, searchText, markSearch) => {
  if(passageSearch){
    passageSearch.forEach(passage => {
      passage.user_info = JSON.parse(passage.user_info)
      passage.passage = JSON.parse(passage.passage)
      passage.comments = JSON.parse(passage.comments)
      if(markSearch) passage.title = passage.title.replace(new RegExp(searchText, 'g'), `<span style="color:#95c496">${searchText}</span>`)//高亮显示检索文字
    })
    passageSearch.forEach(item => {
      if(item) item.showContent = item.passage[0].text.length > 34 ? item.passage[0].text.substring(0,35) + '...' : item.passage[0].text
    })

  }
}
