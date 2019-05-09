
-- show create table books
--浏览量（count）、帖子类型
--id为当前时间戳
--date：发布日期（年/月/日）
--time：详细时间（时/分）


--文章（作者，id，浏览量， 学校， 省份， 专业）
  --文章发布：输入学校、专业、相关学科、说明是不是血泪史文章、考研时间（19考研/20考研）、考研阶段：初试/复试
--个人设置（学校、专业、真实姓名、身份证号、身份证照片、联系方式（邮箱、手机号）、录取通知书照片、学生证照片）

  --真实姓名，学生证照片，在校证明照片，联系方式（邮箱、手机号）

--筛选
    --学校：只写黑龙江省大学，写死
    --定位保存
--课程（图片、标题、讲师、科目、访问量）
  --课程筛选：写死的
--用户（浏览文章、点赞、收藏、评论、积分、学校、专业、身份标示（本科生、研究生【上传附件】）、关注、粉丝）
--管理员（审核文章和发布者，删除文章、评论）
--资讯（题目、文章、学校、图片、浏览量、时间）



DROP TABLE IF EXISTS `posts`;

CREATE TABLE `posts` (
  `id` varchar(50) NOT NULL,--id,当前时间戳
  `author` varchar(50) NOT NULL,--保存用户openId，联表查询用户信息
  `title` text NOT NULL,--标题
  `passage` text NOT NULL,--文章主体，json格式字符串
  `school` text NOT NULL,
  `category` text NOT NULL,--学科大类
  `categorydetail` text NOT NULL,--学科小类
  `subject` text NOT NULL,--学科名称
  `failure` INT NOT NULL DEFAULT '0',--是否为血泪史文章，默认不是为0，是为1
  `testTime` INT NOT NULL,--考研时间：19/20
  `phase` INT NOT NULL,--考研阶段，1为初试，2为复试
  `time` varchar(50) NOT NULL,--详细时间：时分秒
  `date` varchar(50) NOT NULL,--发布日期：年月日
  `satr` INT NOT NULL DEFAULT '0',--点赞
  `count` INT NOT NULL DEFAULT '0',--浏览量
  `collect` INT NOT NULL DEFAULT '0',--收藏数
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;




DROP TABLE IF EXISTS `posts`;

CREATE TABLE `posts` (
  `id` varchar(50) NOT NULL,
  `author` varchar(50) NOT NULL,
  `title` text NOT NULL,
  `passage` text NOT NULL,
  `school` text NOT NULL,
  `category` text NOT NULL,
  `categorydetail` text NOT NULL,
  `subject` text NOT NULL,
  `failure` int(11) NOT NULL DEFAULT '0',
  `testtime` int(11) NOT NULL,
  `phase` int(11) NOT NULL,
  `time` varchar(50) NOT NULL,
  `date` varchar(50) NOT NULL,
  `satr` int(11) NOT NULL DEFAULT '0',
  `count` int(11) NOT NULL DEFAULT '0',
  `collect` int(11) NOT NULL DEFAULT '0',
  `comments` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
