const Router = require("koa-router");
const { vertifyToken } = require("../middleware/auth.middleware");
const {
  warmDelate,
  warmUpdate,
  warmassign,
} = require("../middleware/warmDelate.middleware");
const {
  create,
  deleted,
  update,
  get,
  getList,
  createRoleMenu,
  getRoleMenuList,
  getRoleMenuIds,
} = require("../controller/role.controller");
const roleRouter = new Router({ prefix: "/role" });

roleRouter.post("/", vertifyToken, create);
roleRouter.delete("/:roleId", vertifyToken, warmDelate(5), deleted);
roleRouter.patch("/:roleId", vertifyToken, warmUpdate(5), update);
roleRouter.get("/:roleId", vertifyToken, get);
roleRouter.post("/list", vertifyToken, getList);
roleRouter.post("/assign", vertifyToken, warmassign(5), createRoleMenu);
roleRouter.get("/:roleId/menu", vertifyToken, getRoleMenuList);
roleRouter.get("/:roleId/menuIds", vertifyToken, getRoleMenuIds);
module.exports = roleRouter;
