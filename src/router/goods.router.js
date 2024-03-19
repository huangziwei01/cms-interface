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
  getPhoto,
  getGoodsCategoryCount,
  getGoodsCategorySale,
  getGoodsCategoryFavor,
  getGoodsAddressSale,
  getGoodsAmountList,
} = require("../controller/goods.controller");
const goodsRouter = new Router({ prefix: "/goods" });

goodsRouter.post("/", vertifyToken, create);
goodsRouter.delete("/:goodsId", vertifyToken, warmDelate(141), deleted);
goodsRouter.patch("/:goodsId", vertifyToken, warmUpdate(141), update);
goodsRouter.get("/:goodsId", vertifyToken, get);
goodsRouter.post("/list", vertifyToken, getList);

goodsRouter.get("/category/count", vertifyToken, getGoodsCategoryCount);
goodsRouter.get("/category/sale", vertifyToken, getGoodsCategorySale);
goodsRouter.get("/category/favor", vertifyToken, getGoodsCategoryFavor);
goodsRouter.get("/address/sale", vertifyToken, getGoodsAddressSale);
goodsRouter.get("/amount/list", vertifyToken, getGoodsAmountList);

goodsRouter.get("/:goodsId/photo", getPhoto);

module.exports = goodsRouter;
