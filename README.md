# person_blog
personal blog program,provide registered users,published articles,comment reply and other basic funtions...

## 个人博客后台服务器

#### 目前暂不开发具体接口，如有需求使用可以私聊我，qq:634448817

1. 接口
- 博客用户接口 
  > /get login <br> 
    **1.blog_name<br>2.blog_password**<br>
  > /post register <Br>
    **1.blog_name<br>2.blog_password<Br>3.blog_email**
  
- 博客文章接口 
  > /get get_all_article <br>
    **No parameters required** <br> 
  > /post add_article <br>
    **1.blog_id<br>2.blog_title<br>3.blog_content** <br> 
  > /get delect_article <br>
    **1.id** <br>
- 博客评论接口 
  > /get get_all_comments <Br>
    **1.blog_article_id<br>2.page<br>3.number**<Br>
  > /post add_comments <Br>
    **1.blog_article_id<Br>2.blog_id<Br>3.comments_content**<br>
- 博客评论回复接口 
  > /get get_all_reply <Br>
    **1.blog_comments_id<br>2.page<br>3.number**<Br>
  > /post add_reply
    **1.blog_comments_id<br>2.commtens_id<br>3.reply_content<br>4.reply_id**<Br>
  
  ....

2.数据库表格设计  (初稿并非完整表设计，仅供观赏)
  - blog_user表格 (用户表)
   
   | id | blog_name | blog_password | blog_email | blog_notice |
   | --- | --- | --- | --- | --- |
   | 1 | test | test| test | 0 | 
   | 2 | test2 | test2| test2 | 0 | 
   | 3 | test3 | test3| test3 | 0 |
   ---
   
   - blog_article表格(博客文章表)
   <br>*blog_id字段与用户表的id字段进行外键链接*
   
   |id|blog_id|blog_title|blog_content|create_time|read_number|
   | --- | --- | --- | --- | --- | --- |
   |1|1|android四大组件|活动，广播。。。。。|2019-10-27 21:10:44|0|
   ---
 
   - blog_comments表格(评论表)
   <br>*blog_article_id字段与博客文章表的id字段进行外键链接*
   
   |id|blog_article_id|blog_id|comments_content|create_time|
   | --- | --- | --- | --- | --- |
   |1|1|1|第一条评论|2019-10-27 21:10:44|
   ---
   
   - blog_reply表格(评论回复表)
   <br>*blog_comments_id字段与评论表的id字段进行外键链接*
   
   |id|blog_comments_id|commtens_id|reply_content|reply_id|create_time|
   | --- | --- | --- | --- | --- |---|
   |1|1|2|第一条评论回复|1|2019-10-27 21:10:44|
   |2|1|3|第二条评论回复|1|2019-10-27 21:10:44|
   |3|1|3|第三条评论回复|2|2019-10-27 21:10:44|