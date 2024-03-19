const connection = require("../app/database");
const Db = require("../utils/db");
class UserService extends Db {
  constructor(table) {
    super(table);
  }

  // 查询某个用户
  async get(id) {
    const statement = `SELECT id,name,cellphone,createAt,updateAt,(SELECT JSON_OBJECT('id',role.id,'name',role.name,'intro',role.intro,'createAt',createAt,'updateAt',updateAt) FROM role WHERE id=user.roleId) role,
    (SELECT JSON_OBJECT('id',department.id,'name',department.name,'createAt',createAt,'updateAt',updateAt) FROM department WHERE id=user.departmentId) department
      FROM user WHERE id =?`;
    const [result] = await connection.query(statement, [id]);
    let body = {};
    body.code = 1;
    body.msg = "查询成功";
    body.data = result[0] || [];
    return body;
  }
}

module.exports = new UserService("user");
