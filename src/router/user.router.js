const Router = require("koa-router");
const {
  warmDelate,
  warmUpdate,
} = require("../middleware/warmDelate.middleware");
const { vertifyToken } = require("../middleware/auth.middleware");
const {
  vertifyUser,
  handleUser,
} = require("../middleware/register.middleware");
const {
  endGetAvatar,
  create,
  deleted,
  update,
  get,
  getList,
} = require("../controller/user.controller");
const userRouter = new Router({ prefix: "/users" });
userRouter.post("/register", vertifyUser, handleUser, create);
userRouter.post("/", vertifyToken, vertifyUser, handleUser, create);
userRouter.delete("/:userId", vertifyToken, warmDelate(5), deleted);
userRouter.patch("/:userId", vertifyToken, warmUpdate(5), update);
userRouter.get("/:userId", vertifyToken, get);
userRouter.post("/list", vertifyToken, getList);

module.exports = userRouter;
