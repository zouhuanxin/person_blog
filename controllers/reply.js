const replyDao = require('../db/replyDao');
const sd = require('silly-datetime');

var fn_get_all_reply = async (ctx,next) => {
    var res = await replyDao.get_all_reply(ctx.query.blog_comments_id,ctx.query.page,ctx.query.number);
    ctx.response.body = res;
}

var fn_add_reply = async (ctx,next) => {
    var updatetimes = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    var arr = [ctx.request.body.blog_comments_id,ctx.request.body.commtens_id,ctx.request.body.reply_content
        ,ctx.request.body.reply_id,updatetimes];
    var res = await replyDao.add_reply(arr);
    ctx.response.body = res;
}

module.exports = {
    'GET /get_all_reply':fn_get_all_reply,
    'POST /add_reply':fn_add_reply
}