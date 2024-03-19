const connection = require("../app/database");

class UploadService {
  // 添加图片数据
  async createGoodsPhoto(goods_id, mimetype, filename, size) {
    console.log(goods_id, mimetype, filename, size);
    const statement = `INSERT INTO goods_photo (goods_id,mimetype,filename,size) VALUES(?,?,?,?)`;
    const [result] = await connection.execute(statement, [
      goods_id,
      mimetype,
      filename,
      size,
    ]);
    return result;
  }
}

module.exports = new UploadService();
