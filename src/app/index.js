const Koa = require("koa");
const app = new Koa();
const bodyParser = require("koa-bodyparser");
const cors = require("koa2-cors");
const errorHandler = require("../app/error-handle");

const useRouter = require("../router");

require("../utils/py");

app.useRouter = useRouter; //为了整体好看

app.use(bodyParser());
app.use(cors());
// app.use(registerRouter.routes())
// app.use(loginRouter.routes())
// // 似乎注册一个就行就可以都allowedMethods
// app.use(registerRouter.allowedMethods())

app.useRouter();

app.on("error", (err, ctx) => {
  errorHandler(err, ctx);
});

module.exports = app;
