const connection = require("../app/database");

class RegisterService {
  // 注册账号
  async create(user) {
    const { name, password } = user;
    const statement = `INSERT INTO user (name, password) VALUES (?, ?);`;
    const [result] = await connection.execute(statement, [name, password]);
    return result;
  }

  // 获取用户信息
  async getUserByName(name) {
    const statement = `SELECT * FROM user WHERE name = ?;`;
    const [result] = await connection.execute(statement, [name]);
    return result;
  }
}

module.exports = new RegisterService();
