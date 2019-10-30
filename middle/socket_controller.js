const constant=require('../util/constant');

const fn_route=async function (ctx,next) {
    //先验证账号密码
    const userdao = require('../db/userDao');
    const util = require('../util/Utils');
    var res = await userdao.login(ctx.query.blog_name,ctx.query.blog_password);
    if(res.length==1){
        var bool=true;
        for(var i=0;i<constant.getuserarr().length;i++){
            if(ctx.query.blog_name==constant.getuserarr()[i].query.blog_name){
                bool=false;
            }
        }
        if(bool==true){
            constant.setuserarr(ctx);
            ctx.websocket.send('login_success:'+res[0].id);
        }else{
            ctx.websocket.send('Have landed');
        }

        ctx.websocket.on('message', function (message) {
            //接受消息

        });
        ctx.websocket.on("close", (message) => {
            /* 连接关闭时, 清理 上下文数组, 防止报错 */
            let index = constant.getuserarr().indexOf(ctx);
            constant.getuserarr().splice(index, 1);
        });
    }else{
        ctx.websocket.send('login_fail');
    }
};

module.exports = fn_route;