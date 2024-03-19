const connection = require("../app/database");
class LoginService {
  // 查询该名字是否已存在
  async getUserByName(name) {
    const statement = `SELECT * FROM user WHERE name = ?;`;
    const [result] = await connection.execute(statement, [name]);
    return result;
  }
}

module.exports = new LoginService();
