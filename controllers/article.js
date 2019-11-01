const articleDao = require('../db/articleDao');
const sd = require('silly-datetime');
const util = require('../util/Utils');
const constant = require('../util/constant');

var fn_get_all_article = async (ctx,next) => {
    if(ctx.query.blog_id==undefined){
        ctx.response.body = '{"code":-1,"msg":"参数错误"}';
        return ;
    }
    var res = await articleDao.get_all_article(ctx.query.blog_id,ctx.query.page,ctx.query.number);
    ctx.response.body = res;
};

var fn_add_article = async (ctx,next) => {
    var blog_id;
    let index=await util.isqq(ctx);
    if(index==0){
        blog_id=ctx.header.authorization;
    }else if (index==1){
        blog_id=ctx.request.body.blog_id;
    }else{
        ctx.response.body = '{"code":-1,"msg":"请先登陆"}';
        return ;
    }
    var updatetimes = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    var arr = [blog_id,ctx.request.body.blog_title,ctx.request.body.blog_content,updatetimes,0,ctx.request.body.article_type];
    var res = await articleDao.add_article(arr);
    ctx.response.body = '{"code":0,"msg":"返回成功"}';
};

var fn_search_title= async (ctx,next) => {
    if(ctx.query.article_title==undefined||ctx.query.blog_id==undefined){
        ctx.response.body = '{"code":-1,"msg":"参数错误"}';
        return ;
    }
    var res = await  articleDao.query_title(ctx.query.blog_id,ctx.query.article_title,ctx.query.page,ctx.query.number);
    ctx.response.body = res;
};

var fn_search_type = async (ctx,next) => {
    if(ctx.query.article_type==undefined||ctx.query.blog_id==undefined){
        ctx.response.body = '{"code":-1,"msg":"参数错误"}';
        return ;
    }
    var res = await  articleDao.query_type(ctx.query.blog_id,ctx.query.article_type,ctx.query.page,ctx.query.number);
    ctx.response.body = res;
};

var fn_search_readortime = async (ctx,next) => {
    if(ctx.query.rt==undefined||ctx.query.page==undefined||ctx.query.number==undefined||ctx.query.blog_id==undefined){
        ctx.response.body = '{"code":-1,"msg":"参数错误"}';
        return ;
    }
    var res = await  articleDao.query_readortime(ctx.query.blog_id,ctx.query.rt,ctx.query.page,ctx.query.number);
    ctx.response.body = res;
};

var fn_search_id = async (ctx,next) => {
    if(ctx.query.id==undefined){
        ctx.response.body = '{"code":-1,"msg":"参数错误"}';
        return ;
    }
    var res = await  articleDao.query_id(ctx.query.id);
    ctx.response.body = res;
};

var fn_delect_article = async (ctx,next) => {
    var blog_id;
    let index=await util.isqq(ctx);
    if(index==0){
        blog_id=ctx.header.authorization;
    }else if (index==1){
        blog_id=ctx.request.body.blog_id;
    }else{
        ctx.response.body = '{"code":-1,"msg":"请先登陆"}';
        return ;
    }
    var res = await articleDao.delect_article(ctx.request.body.id);
    ctx.response.body = '{"code":0,"msg":"删除成功"}';
};

var fn_update_article = async (ctx,next) => {
    if(ctx.request.body.blog_title==undefined||ctx.request.body.blog_content==undefined||ctx.request.body.article_type==undefined
        ||ctx.request.body.id==undefined){
        ctx.response.body = '{"code":-1,"msg":"参数错误"}';
        return ;
    }
    var blog_id;
    let index=await util.isqq(ctx);
    if(index==0){
        blog_id=ctx.header.authorization;
    }else if (index==1){
        blog_id=ctx.request.body.blog_id;
    }else{
        ctx.response.body = '{"code":-1,"msg":"请先登陆"}';
        return ;
    }
    var arr=[ctx.request.body.blog_title,ctx.request.body.blog_content,ctx.request.body.article_type,ctx.request.body.id];
    var res = await articleDao.update_article(arr);
    ctx.response.body = '{"code":0,"msg":"修改成功"}';
};

var fn_update_readnumber = async (ctx,next) => {
    if(ctx.request.body.id==undefined){
        ctx.response.body = '{"code":-1,"msg":"参数错误"}';
        return ;
    }
    var res = await  articleDao.query_id(ctx.request.body.id);
    var arr=[(parseInt(res[0].read_number)+1),ctx.request.body.id];
    var res = await articleDao.update_readnumber(arr);
    ctx.response.body = '{"code":0,"msg":"修改成功"}';
};

module.exports = {
    'GET /get_all_article':fn_get_all_article,
    'POST /add_article':fn_add_article,
    'POST /delect_article':fn_delect_article,
    'GET /search_type':fn_search_type,
    'GET /search_readortime':fn_search_readortime,
    'GET /search_id':fn_search_id,
    'GET /search_title':fn_search_title,
    'POST /update_article':fn_update_article,
    'POST /update_readnumber':fn_update_readnumber
};