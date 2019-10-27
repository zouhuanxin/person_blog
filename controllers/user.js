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

module.exports = {
    'GET /login':fn_login,
    'POST /register':fn_register,
};