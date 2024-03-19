const Router = require("koa-router");
const { vertifyToken } = require("../middleware/auth.middleware");
const {
  warmDelate,
  warmUpdate,
} = require("../middleware/warmDelate.middleware");
const {
  create,
  deleted,
  update,
  get,
  getList,
} = require("../controller/department.controller");
const departmentRouter = new Router({ prefix: "/department" });

departmentRouter.post("/", vertifyToken, create);
departmentRouter.delete("/:departmentId", vertifyToken, warmDelate(5), deleted);
departmentRouter.patch("/:departmentId", vertifyToken, warmUpdate(5), update);
departmentRouter.get("/:departmentId", vertifyToken, get);
departmentRouter.post("/list", vertifyToken, getList);
module.exports = departmentRouter;
