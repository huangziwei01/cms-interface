const jwt = require("jsonwebtoken");
const errorTypes = require("../constants/error-types");

const vertifyToken = async (ctx, next) => {
  if (!ctx.header.authorization === true) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    return ctx.app.emit("error", error, ctx);
  }
  const authorization = ctx.header.authorization;
  const token = authorization.split(" ")[1];
  // console.log(token);
  try {
    const result = jwt.verify(token, "codermie");
    ctx.user = result;
    await next();
  } catch (err) {
    console.log("授权try", err);
    let body = {};

    body.code = 0;
    body.msg = `token已过期请重新登录`;
    ctx.body = body;
    return;
    // const error = new Error(errorTypes.UNAUTHORIZATION);
    // return ctx.app.emit("error", error, ctx);
  }
};

module.exports = { vertifyToken };
