const articleDao = require('../db/articleDao');
const sd = require('silly-datetime');

var fn_get_all_article = async (ctx,next) => {
    var res = await articleDao.get_all_article(ctx.query.page,ctx.query.number);
    ctx.response.body = res;
}

var fn_add_article = async (ctx,next) => {
    var updatetimes = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    var arr = [ctx.request.body.blog_id,ctx.request.body.blog_title,ctx.request.body.blog_content,updatetimes];
    var res = await articleDao.add_article(arr);
    ctx.response.body = res;
}

var fn_delect_article = async (ctx,next) => {
    var res = await articleDao.delect_article(ctx.query.id);
    ctx.response.body = res;
}

module.exports = {
    'GET /get_all_article':fn_get_all_article,
    'POST /add_article':fn_add_article,
    'GET /delect_article':fn_delect_article
}