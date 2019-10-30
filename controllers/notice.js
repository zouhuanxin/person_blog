const noticedao = require('../db/noticeDao');

var fn_search_all = async (ctx,next)=>{
    if(ctx.query.blog_id==undefined){
        ctx.response.body = '{"code":-1,"msg":"参数错误"}';
        return ;
    }
    var res = await noticedao.search_all(ctx.query.blog_id);
    ctx.response.body = res;
};

var fn_add_notice = async (ctx,next)=>{
    var updatetimes = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    var arr = [ctx.request.body.blog_id,ctx.request.body.text,updatetimes];
    var res = await noticedao.add_notice(arr);
    ctx.response.body = res;
};

module.exports = {
    'GET /search_all':fn_search_all,
    'POST /add_notice':fn_add_notice
};