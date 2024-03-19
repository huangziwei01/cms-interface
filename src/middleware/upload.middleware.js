const { GOODS_PICTURE_PATH } = require("../constants/file-path");

const Multer = require("koa-multer");
const photoUpload = Multer({
  dest: GOODS_PICTURE_PATH,
});

const photoHandler = photoUpload.single("photo");

module.exports = { photoHandler };
