const md5password = require("../utils/password-handle");
const service = require("../service/register.service");
const errorTypes = require("../constants/error-types");
const vertifyUser = async (ctx, next) => {
  // 1.获取用户名和密码
  const { name, password } = ctx.request.body;
  // 2.判断用户名或者密码不能空
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }
  // 3.判断这次注册的用户名是没有被注册过
  const result = await service.getUserByName(name);
  if (result.length) {
    const error = new Error(errorTypes.USER_ALREADY_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }
  await next();
};
const handleUser = async (ctx, next) => {
  console.log(md5password(ctx.request.body.password));
  ctx.request.body.password = md5password(ctx.request.body.password);
  await next();
};

module.exports = { vertifyUser, handleUser };
