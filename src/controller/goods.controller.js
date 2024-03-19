const goodsService = require("../service/goods.service");
const fs = require("fs");
const { GOODS_PICTURE_PATH } = require("../constants/file-path");
class GoodsController {
  async create(ctx) {
    const result = await goodsService.create(ctx.request.body);
    ctx.body = result;
  }
  async deleted(ctx) {
    const result = await goodsService.delete(ctx.params.goodsId);
    ctx.body = result;
  }
  async update(ctx) {
    const result = await goodsService.update(
      ctx.params.goodsId,
      ctx.request.body
    );
    ctx.body = result;
  }
  async get(ctx) {
    const result = await goodsService.get(ctx.params.goodsId);
    ctx.body = result;
  }
  async getList(ctx) {
    const result = await goodsService.getList(ctx.request.body);
    ctx.body = result;
  }

  async getGoodsCategoryCount(ctx) {
    const result = await goodsService.getGoodsCategoryCount(ctx.request.body);
    ctx.body = result;
  }

  async getGoodsCategorySale(ctx) {
    const result = await goodsService.getGoodsCategorySale(ctx.request.body);
    ctx.body = result;
  }
  async getGoodsCategoryFavor(ctx) {
    const result = await goodsService.getGoodsCategoryFavor(ctx.request.body);
    ctx.body = result;
  }
  async getGoodsAddressSale(ctx) {
    const result = await goodsService.getGoodsAddressSale(ctx.request.body);
    ctx.body = result;
  }
  async getGoodsAmountList(ctx) {
    const result = await goodsService.getGoodsAmountList(ctx.request.body);
    ctx.body = result;
  }
  async getPhoto(ctx) {
    const id = ctx.params.goodsId;
    const result = await goodsService.getPhoto(id);
    // 2.提供图像信息
    ctx.response.set("content-type", result.mimetype);
    ctx.body = fs.createReadStream(`${GOODS_PICTURE_PATH}/${result.filename}`);
  }
}
module.exports = new GoodsController();
