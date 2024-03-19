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
} = require("../controller/category.controller");
const categoryRouter = new Router({ prefix: "/category" });

categoryRouter.post("/", vertifyToken, create);
categoryRouter.delete("/:categoryId", vertifyToken, warmDelate(8), deleted);
categoryRouter.patch("/:categoryId", vertifyToken, warmDelate(8), update);
categoryRouter.get("/:categoryId", vertifyToken, get);
categoryRouter.post("/list", vertifyToken, getList);

module.exports = categoryRouter;
