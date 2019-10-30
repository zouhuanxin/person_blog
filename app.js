//导入koa 和koa1.0不同 在koa2中，我们导入的是一个class，因此用大写的Koa表示
const Koa = require('koa');
//注意这里require返回的是一个函数
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
//解决跨域问题
const cors = require('koa2-cors');
//创建一个koa对象表示web app 本身  由于koa返回的是一个类  所以这里使用需要new一下 创建这个对象
const app= new Koa();

const controller = require('./middle/controller');

app.use(bodyParser());

//对于任何请求，app将调用该异步函数处理请求
//这里解决跨域请求问题
app.use(cors({
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'OPIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept' ,"application/json"],
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    origin: function(ctx) {
        const origin = ctx.header.origin || ctx.origin;
        console.log("Time:" + new Date(), "来源:", origin);
        return origin;
    },
}))

// 使用middleware:
app.use(controller());

//端口监听
app.listen(3131);
console.log('app started at port 3131...');