const uploadService = require("../service/upload.service");
const goodsService = require("../service/goods.service");

const { APP_HOST, APP_PORT } = require("../app/config");

class fileController {
  async createGoodsPhoto(ctx, next) {
    const { mimetype, filename, size } = ctx.req.file;
    const goods_id = ctx.params.goodsId;
    // 将图像存到数据库中
    const result = await uploadService.createGoodsPhoto(
      goods_id,
      mimetype,
      filename,
      size
    );
    //将图像信息更新到goods表中
    const photoUrl = `${APP_HOST}:${APP_PORT}/goods/${goods_id}/photo`;
    await goodsService.update(goods_id, {
      imgUrl: photoUrl,
    });
    ctx.body = result;
  }
}

module.exports = new fileController();
