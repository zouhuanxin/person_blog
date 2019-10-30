const Koa = require('koa'),
    route = require('koa-route');
    websockify = require('koa-websocket');

const koa= new Koa();
const app = websockify(koa);

const constant = require('./util/constant');
const util = require('./util/Utils');
const socket_conntroller = require('./middle/socket_controller');

//与服务器进行长连接
//登陆推荐走这里
app.ws.use(function (ctx, next) {
    return next(ctx)
});
app.ws.use(route.all('/login_socket',socket_conntroller));

//-------------------------------------------------------------------------------

const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const controller = require('./middle/controller');

//接口性访问服务器
koa.use(bodyParser());
koa.use(cors({
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'OPIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    origin: function(ctx) {
        const origin = ctx.header.origin || ctx.origin;
        console.log("Time:" + new Date(), "来源:", origin);
        return origin;
    },
}));

//启动定时器
setInterval(util.start_time,1000);

koa.use(controller());

app.listen(3222);