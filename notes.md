##个人博客后台服务器

1. 接口
- 注册博客用户接口 post
- 查询博客用户接口 get
- 发表博客文章接口 post
- 查询博客文章接口 get
- 删除博客文章接口 get
- 修改博客文章接口 post
<br>....

2.数据库表格设计
  - blog_user表格 (用户表)
  
  | id | blog_name | blog_password | blog_email | blog_notice |
  | --- | --- | --- | --- | --- |
  | 1 | test | test| test | 0 | 
  | 2 | test2 | test2| test2 | 0 | 
  | 3 | test3 | test3| test3 | 0 |
  ---
  
  - blog_article表格(博客文章表)
  <br>*blog_id字段与用户表的id字段进行外键链接*
  
  |id|blog_id|blog_title|blog_content|create_time|
  | --- | --- | --- | --- | --- |
  |1|1|android四大组件|活动，广播。。。。。|2019-10-27 21:10:44|
  ---

  - blog_comments表格(评论表)
  <br>*blog_article_id字段与博客文章表的id字段进行外键链接*
  
  |id|blog_article_id|blog_id|comments_content|create_time|
  | --- | --- | --- | --- | --- |
  |1|1|1|第一条评论|2019-10-27 21:10:44|
  ---
  
  - blog_reply表格(评论回复表)
  <br>*blog_comments_id字段与评论表的id字段进行外键链接*
  
  |id|blog_comments_id|blog_id|comments_content|reply_id|create_time|
  | --- | --- | --- | --- | --- |---|
  |1|1|2|第一条评论回复|1|2019-10-27 21:10:44|
  |2|1|3|第二条评论回复|1|2019-10-27 21:10:44|
  |3|1|3|第三条评论回复|2|2019-10-27 21:10:44|