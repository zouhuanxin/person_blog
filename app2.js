const Koa = require('koa'),
    route = require('koa-route'),
    websockify = require('koa-websocket');
const app = websockify(new Koa());

let ctxs=[];

app.ws.use(function (ctx, next) {
    return next(ctx)
})
app.ws.use(route.all('/login', function (ctx,next) {
    ctx.websocket.on('message', function (message) {
        console.log(ctx.query.id);
        console.log(message);
        for(let i = 0; i < ctxs.length; i++) {
            if (ctx == ctxs[i]) continue;
            ctxs[i].websocket.send(message);
        }
    });
    ctx.websocket.on("close", (message) => {
        /* 连接关闭时, 清理 上下文数组, 防止报错 */
        let index = ctxs.indexOf(ctx);
        ctxs.splice(index, 1);
    });
}))
app.listen(3000)
// 会默认打开127.0.0.1:3000这个端口号