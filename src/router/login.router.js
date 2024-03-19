const Router = require("koa-router");
const { endMdwLogin, endMdwToken } = require("../controller/login.controller");
const { vertifyLogin } = require("../middleware/login.middleware");
const { vertifyToken } = require("../middleware/auth.middleware");
const loginRouter = new Router();

loginRouter.post("/login", vertifyLogin, endMdwLogin);
loginRouter.get("/token", vertifyToken, endMdwToken);

module.exports = loginRouter;
