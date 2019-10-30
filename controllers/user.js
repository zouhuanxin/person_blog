const userdao = require('../db/userDao');

var fn_register = async (ctx,next)=>{
    var arr = [ctx.request.body.blog_name,ctx.request.body.blog_password,ctx.request.body.blog_email,0];
    var res = await userdao.register(arr);
    ctx.response.body = res;
};

var fn_login = async (ctx,next)=>{
    var res = await userdao.login(ctx.query.blog_name,ctx.query.blog_password);
    ctx.response.body = res;
};

var fn_upload_notice = async (ctx,next)=>{
    if(ctx.query.blog_notice==undefined||ctx.query.id==undefined){
        ctx.response.body = '{"code":-1,"msg":"参数错误"}';
        return ;
    }
    var arr=[ctx.query.blog_notice,ctx.query.id];
    var res = await userdao.update_notice(arr);
    ctx.response.body = '{"code":0,"msg":"修改成功"}';
};

var fn_search_notice = async (ctx,next)=>{
    if(ctx.query.id==undefined){
        ctx.response.body = '{"code":-1,"msg":"参数错误"}';
        return ;
    }
    var res = await userdao.search_notice(ctx.query.id);
    ctx.response.body = res;
};

module.exports = {
    'GET /login':fn_login,
    'POST /register':fn_register,
    'GET /upload_notice':fn_upload_notice,
    'GET /search_notice':fn_search_notice
};