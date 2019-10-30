const constant = require('../util/constant');

function getDiffMinute(date1,date2){
    date2.setHours(date2.getHours()+8);
    date1 = format(date1,'yyyy-MM-dd HH:mm:ss');
    date2 = format(date2,'yyyy-MM-dd HH:mm:ss')
    var reg=new RegExp("-","g"); //创建正则RegExp对象
    var date1 = date1.replace(reg,"/") ;
    var date2 = date2.replace(reg,"/") ;
    var date1 = new Date(date1) ;
    var date2 = new Date(date2);
    var s1 = date1.getTime();
    var s2 = date2.getTime();
    return parseInt((s2-s1)/60000) ;
}

var format = function(time, format){
    var t = new Date(time);
    var tf = function(i){return (i < 10 ? '0' : '') + i};
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
        switch(a){
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        };
    });
};

//开启一个定时器 排除登陆过去账号
function start_time(){
    //检查是否有登陆在线时长超过2小时的
    for(var i=0;i<constant.getuserarr().length;i++){
        if(getDiffMinute(new Date(constant.getuserarr()[i].query.date),new Date())>120){
            constant.getuserarr()[i].websocket.send('Connection closed');
            constant.getuserarr()[i].websocket.close();
            constant.getuserarr().splice(i,1);
            console.log('断开连接');
        }
    }
}

//封装一个判断请求类型的方法
//俩种请求类型
//一种长连接类型
//一种短连接请求类型
//0表示长连接 默认状态
//1表示短连接
//-1表示没有登陆
async function isqq(ctx){
    var status=0;
    if (ctx.header.authorization!=undefined){
        var bool = await islogin(ctx.header.authorization);
        if(bool==false){
            status=-1;
        }
    }else{
        if(ctx.request.body.blog_id==undefined){
            status=-1;
        }else{
            status=1;
        }
    }
    return status;
}

const userdao = require('../db/userDao');
//判断此用户是否登陆
//false表示未登录
//true表示已经登陆
async function islogin(blog_id){
    var bool=false;
    for (var i=0;i<constant.getuserarr().length;i++){
        var res = await userdao.search_id(constant.getuserarr()[i].query.blog_name);
        if(res[0].id==blog_id){
            bool=true;
            continue;
        }
    }
    return bool;
}

//发送通知信息
const articledao = require('../db/articleDao');
const noticedao = require('../db/noticeDao');
const sd = require('silly-datetime');
async function send_notice(blog_article_id,name,text){
    let blog_id = await articledao.query_id(blog_article_id);
    var updatetimes = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    var str=`${name}评论的你的文章:${text}`;
    var arr=[blog_id[0].blog_id,str,updatetimes];
    await noticedao.add_notice(arr);
    if(blog_id.length==1){
        for (var i=0;i<constant.getuserarr().length;i++){
            var res = await userdao.search_id(constant.getuserarr()[i].query.blog_name);
            if(blog_id[0].blog_id==blog_id[0].blog_id){
                constant.getuserarr()[i].websocket.send(str);
                continue;
            }
        }
    }
}

module.exports = {
    getDiffMinute,
    start_time,
    islogin,
    isqq,
    send_notice
}