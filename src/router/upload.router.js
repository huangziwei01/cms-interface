const Router = require("koa-router");
const { createGoodsPhoto } = require("../controller/upload.controller");
const { photoHandler } = require("../middleware/upload.middleware");
const { vertifyToken } = require("../middleware/auth.middleware");
const fileRouter = new Router({
  prefix: "/upload",
});
fileRouter.post(
  "/goods_photo/:goodsId",
  vertifyToken,
  photoHandler,
  createGoodsPhoto
);
module.exports = fileRouter;
