const Db = require("../utils/db");
const formatUtcString = require("../utils/date-format");
class GoodsService extends Db {
  constructor(table) {
    super(table);
  }

  async getList(data) {
    const { offset = 0, size = 10, createAt = [], ...rest } = data;
    const arr = [];
    for (const key in rest) {
      if (typeof rest[key] === "number" || rest[key]) {
        // arr.push(`${key}="${rest[key]}"`);
        arr.push(`${key} LIKE "%${rest[key]}%"`);
      }
    }
    let newArr = arr.join(" and ");

    if (createAt.length > 0 && newArr.length > 0) {
      let a = formatUtcString(createAt[0]);
      let b = formatUtcString(createAt[1]);
      console.log(typeof b);
      newArr = `${newArr} and createAt BETWEEN '${a}' and '${b}'`;
    }

    if (createAt.length > 0 && newArr.length == 0) {
      let a = formatUtcString(createAt[0]);
      let b = formatUtcString(createAt[1]);
      newArr = `createAt BETWEEN '${a}' and '${b}'`;
    }
    let body = {};
    if (newArr) {
      const statement = `SELECT * FROM ${this.table} WHERE ${newArr}  order by createAt desc LIMIT ?,?; `;
      const result = await this.query(statement, [offset, size]);
      const statement2 = `SELECT count(*) totalCount FROM ${this.table} WHERE ${newArr} `;
      const [result2] = await this.query(statement2);
      const data = {
        list: result,
        totalCount: result2.totalCount,
      };
      body.code = 1;
      body.data = data;
      return body;
    } else {
      const statement = `SELECT * FROM ${this.table} order by createAt desc LIMIT ?,?;`;
      const result = await this.query(statement, [offset, size]);
      const statement2 = `SELECT count(*) totalCount FROM ${this.table}`;
      const [result2] = await this.query(statement2);
      const data = {
        list: result,
        totalCount: result2.totalCount,
      };
      body.code = 1;
      body.data = data;
      return body;
    }
  }

  async getPhoto(id) {
    const statement = `SELECT * FROM goods_photo WHERE goods_id = ?;`;
    const result = await this.execute(statement, [id]);
    return result[0];
  }

  async getGoodsCategoryCount() {
    const statement = `SELECT c.id id,c.name name, (SELECT COUNT(*) FROM goods where goods.categoryId=c.id ) goodsCount FROM category  c ;`;
    const result = await this.where(statement);
    return result;
  }

  async getGoodsCategorySale() {
    const statement = `SELECT c.id id,c.name name, (SELECT SUM(saleCount) FROM goods where goods.categoryId=c.id )  goodsSale FROM category  c ;`;
    const result = await this.where(statement);
    return result;
  }
  async getGoodsCategoryFavor() {
    const statement = `SELECT c.id id,c.name name, (SELECT SUM(favorCount) FROM goods where goods.categoryId=c.id ) goodsFavor FROM category  c ;`;
    const result = await this.where(statement);
    return result;
  }
  async getGoodsAddressSale() {
    const statement = `SELECT address,SUM(saleCount) count FROM goods GROUP BY address ORDER BY count desc;`;
    const result = await this.where(statement);
    return result;
  }
  async getGoodsAmountList() {
    const statement = `SELECT
    JSON_ARRAY(
    JSON_OBJECT(
    "amount","sale","title","商品总销量","tip","所有商品总销量","subtitle","商品总销量","number1",SUM(saleCount),"number2",SUM(saleCount)
    ) ,
    JSON_OBJECT(
    "amount","sale","title","商品总收藏","tip","所有商品总收藏","subtitle","商品总收藏","number1",SUM(favorCount),"number2",SUM(favorCount)
    ),
    JSON_OBJECT(
    "amount","sale","title","商品总库存","tip","所有商品总库存","subtitle","商品总库存","number1",SUM(inventoryCount),"number2",SUM(inventoryCount)
    ),
    JSON_OBJECT(
    "amount","sale","title","商品总销售额","tip","所有商品总销售额","subtitle","商品总销售额","number1",SUM(saleCount*newPrice),"number2",SUM(saleCount*newPrice)
    )
    ) "all"
    FROM goods`;
    const [result] = await this.query(statement);
    let body = {};

    body.code = 1;
    body.msg = "查询成功";
    body.data = result.all;
    return body;
  }
}

module.exports = new GoodsService("goods");
