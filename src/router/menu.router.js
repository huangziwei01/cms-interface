const Router = require("koa-router");
const { vertifyToken } = require("../middleware/auth.middleware");
const { warm } = require("../middleware/warmDelate.middleware");
const {
  create,
  deleted,
  update,
  get,
  getList,
} = require("../controller/menu.controller");
const menuRouter = new Router({ prefix: "/menu" });

menuRouter.post("/", vertifyToken, warm(), create);

menuRouter.delete("/:menuId", vertifyToken, warm(), deleted);
menuRouter.patch("/:menuId", vertifyToken, warm(), update);
menuRouter.get("/:menuId", vertifyToken, get);
menuRouter.post("/list", vertifyToken, getList);

module.exports = menuRouter;
