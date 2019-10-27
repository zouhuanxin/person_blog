const commentsDao = require('../db/commentsDao');
const sd = require('silly-datetime');

var fn_get_all_comments = async (ctx,next) => {
    var res = await commentsDao.get_all_article(ctx.query.blog_article_id,ctx.query.page,ctx.query.number);
    ctx.response.body = res;
}

var fn_add_commtens = async (ctx,next) => {
    var updatetimes = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    var arr = [ctx.request.body.blog_article_id,ctx.request.body.blog_id,ctx.request.body.comments_content,updatetimes];
    var res = await commentsDao.add_article(arr);
    ctx.response.body = res;
}

module.exports = {
    'GET /get_all_comments':fn_get_all_comments,
    'POST /add_comments':fn_add_commtens
}