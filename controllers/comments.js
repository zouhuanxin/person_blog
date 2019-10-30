const commentsDao = require('../db/commentsDao');
const sd = require('silly-datetime');
const util = require('../util/Utils');

var fn_get_all_comments = async (ctx,next) => {
    var res = await commentsDao.get_all_comments(ctx.query.blog_article_id,ctx.query.page,ctx.query.number);
    ctx.response.body = res;
}

var fn_add_commtens = async (ctx,next) => {
    if(ctx.request.body.blog_article_id==undefined||ctx.request.body.comments_name==undefined||ctx.request.body.comments_content==undefined){
        ctx.response.body = '{"code":-1,"msg":"参数错误"}';
        return ;
    }
    var updatetimes = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    var arr = [ctx.request.body.blog_article_id,ctx.request.body.comments_name,ctx.request.body.comments_content,updatetimes];
    var res = await commentsDao.add_comments(arr);
    util.send_notice(ctx.request.body.blog_article_id,ctx.request.body.comments_name,ctx.request.body.comments_content);
    ctx.response.body = '{"code":0,"msg":"返回成功"}';
}

module.exports = {
    'GET /get_all_comments':fn_get_all_comments,
    'POST /add_comments':fn_add_commtens
}