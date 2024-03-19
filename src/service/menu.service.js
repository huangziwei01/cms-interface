const Db = require("../utils/db");

class MenuService extends Db {
  constructor(table) {
    super(table);
  }

  // 联合查询用户列表
  async getList(body) {
    try {
      const statement = `SELECT m1.id "id", m1.name "name",m1.type type,m1.url url,m1.icon icon,m1.sort sort,m1.createAt createAt,m1.updateAt updateAt,
      (SELECT JSON_ARRAYAGG(
      JSON_OBJECT(
      "id",m2.id,
      "name",m2.name,
      "type",m2.type,
       "url",m2.url,
       "icon",m2.icon,
       "sort",m2.sort,
       "createAt",m2.createAt,
       "updateAt",m2.updateAt,
       "children",(SELECT JSON_ARRAYAGG(JSON_OBJECT(
                "id",m3.id,
                "name",m3.name,
                "type",m3.type,
                 "url",m3.url,
                 "permission",m3.permission,
                 "icon",m3.icon,
                 "sort",m3.sort,
                 "createAt",m3.createAt,
                 "updateAt",m3.updateAt
      )) FROM menu m3  WHERE m3.parentId=m2.id  order by m3.sort asc))) FROM menu m2  WHERE m2.parentId=m1.id  order by m2.sort asc
      ) children
       FROM menu m1 
       WHERE type=1
       order by m1.sort asc
       `;
      const result = await this.query(statement, []);

      const statement2 = `SELECT COUNT(*) totalCount
      FROM menu m1 
      WHERE type=1
      order by m1.sort asc`;
      const [result2] = await this.query(statement2, []);
      let body = {};
      const data = {
        list: result,
        totalCount: result2.totalCount,
      };
      body.code = 1;
      body.msg = "查询成功";
      body.data = data;
      return body;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new MenuService("menu");
