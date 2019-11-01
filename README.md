## 个人博客服务器 （node框架开发）

服务器开发目的有二

1.自己刚好想做个博客

2.竟然都做了那就干脆把服务器拓展下

服务器支持俩种使用方式
 1. socket
 2. 不进行socket
 (推荐使用socket，使用前请先联系作者添加你的账号，或者下载本项目到本地自行运行，请运行app3.js文件)
 <br>
 <font color="#f8f8f8">以下如果进行sokcet连接方式请求服务器请把用户身份证id携带至请求头，否则则放在post或者get请求json参数中</font>


url:http://47.94.255.194:3222/
服务器目前基础功能已经全部开发完毕：
 - 用户操作
   - 登陆 <font color="#4767ff">**get**</font>
     - login
	 ```
	 json:{"blog_name":"","blog_password":""}
	 ```
    - 查询通知信息 <font color="#4767ff">**get**</font>
	 ```
	 json:{"id":""}
	 id:blog_id 用户身份id
	 ```
	- 修改通知信息 <font color="#4767ff">**get**</font>
	```
	json:{"blog_notice":"","id":""}
	blog_notice:已经查看的通知数量
    id:blog_id 用户身份id
	```
 - 博客文章发表
   - add_article  <font color="#4794ff">**post**</font>
    blog_id是身份令牌id
	俩种不同的传参方式供使用
	1. 一种携带在请求头中 {"authorization":""} socket连接方式
	 ```
	json:{"blog_title":"","blog_content":"","article_type":""}
	header:{"authorization":""}
	blog_title:文章标题
	blog_content:文章内容
	article_type:文章类型
	```
	2. 一种携带在post请求的json数据中 不进行sokcet连接方式
    ```
	json:{"blog_id":""，"blog_title":"","blog_content":"","article_type":""}
	```
 - 博客文章修改
   - update_article <font color="#4767ff">**post**</font>
    blog_id是身份令牌id
	俩种不同的传参方式供使用
	1. 一种携带在请求头中 {"authorization":""} socket连接方式
	 ```
	json:{"blog_title":"","blog_content":"","article_type":"","id":""}
	header:{"authorization":""}
	blog_title:文章标题
	blog_content:文章内容
	article_type:文章类型
	id:文章id
	```
	2. 一种携带在post请求的json数据中 不进行sokcet连接方式
    ```
	json:{"blog_id":""，"blog_title":"","blog_content":"","article_type":"","id":""}
	```
 - 博客文章删除
   - delect_article <font color="#4769ff">**post**</font>
    blog_id是身份令牌id
	俩种不同的传参方式供使用
	1. 一种携带在请求头中 {"authorization":""} socket连接方式
	 ```
	json:{"id":""}
	header:{"authorization":""}
	id:文章id
	```
	2. 一种携带在post请求的json数据中 不进行sokcet连接方式
    ```
	json:   {"blog_id":""，"id":""}
	```
 - 博客阅读量
   - 查询
     查询文字接口返回的数据中自带了阅读量这一字段
   - 修改 <font color="#4767ff">**post**</font>
     - update_readnumber
	   ```
	   json:{"id":""}
	   id:文章id
	   ```
 - 博客文章热度查询 <font color="#4767ff">**get**</font>
 - 博客最新文章查询 <font color="#4767ff">**get**</font>
   - fn_search_readortime
   ```
   json:{"blog_id:"","rt":"","page":0,"number":10}
   blog_id:用户身份id 这里一定要放在json数据中
   rt:类型表示你需要查询哪种 一：热度查询 二：时间查询
   page:页码
   number:每页显示条数
   ```
 - 博客文章查询
   - 全部查询
     - get_all_article  <font color="#4767ff">**get**</font>
	 ```
	 json:{"blog_id":"","page":0,"number":10}
	  blog_id:用户身份id 这里一定要放在json数据中
      page:页码
      number:每页显示条数
	 ```
   - 分类查询
     - search_type <font color="#4767ff">**get**</font>
	 ```
	 json:{"article_type":"","blog_id":"","page":0,"number":10}
	  article_type:文章类型
	  blog_id:用户身份id 这里一定要放在json数据中
      page:页码
      number:每页显示条数
	 ```
 - 评论发表
   - 查询
     - add_comments <font color="#4767ff">**post**</font>
	 ```
	 json:{"blog_article_id":"","comments_name":"","comments_content":""}
	 blog_article_id:文章id
	 comments_name:评论名字
	 comments_content:评论内容
	 ```
   - 添加
	 - get_all_comments <font color="#4767ff">**get**</font>
	   ```
	   json:{"blog_article_id":"","page":0,"number":100}
	   blog_article_id:文章id
	   ```
 - 评论回复
   - 查询
     - add_reply <font color="#4767ff">**post**</font>
	 ```
	 json:{"blog_comments_id":"","comments_name":"","reply_content":"","reply_name":""}
	 blog_comments_id:文章id
	 comments_name:评论名字
	 comments_content:评论内容
	 reply_name:被回复人的名字
	 ```
   - 添加
	  - get_all_reply <font color="#4767ff">**get**</font>
	   ```
	   json:{"blog_comments_id":"","page":0,"number":100}
	   blog_comments_id:文章id
	   ```
 - 通知信息获取
   - 查询
     - add_notice <font color="#4767ff">**post**</font>
	 ```
	 json:{"blog_id":"","text":""}
	 blog_id:用户身份id
	 text:评论名字
	 ```
  - 添加
	 - search_all <font color="#4767ff">**get**</font>
	   ```
	   json:{"blog_id":""}
	   blog_id:用户身份id
	   ```

#### qq:634448817
#### tel:15720989670
      