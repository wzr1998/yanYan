//获取文章、文章点赞
const fs = require('fs');
const xmlreader = require("xmlreader");
const {mysql} = require('../qcloud')

module.exports = async(ctx)=>{
  //const {id, star} = ctx.request.query





//<?xml version="1.0" encoding="utf-8" ?>


  let passage = await mysql('information')
    .select('informationlist')
    .first()

  //let randomImg = (await mysql('passageDetailImgs').select().where('id', Math.floor(Math.random()*14+1)).first()).image



  //const aLi = passage.getElementsByTagName('li')
  //fs.writeFileSync('passage.xml', passage)

  ctx.state.data = (JSON.parse(passage.informationlist)).ul.li
}


