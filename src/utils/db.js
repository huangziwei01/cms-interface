const connection = require("../app/database");
const retCode = require("../constants/retcode");
const formatUtcString = require("./date-format");
class Mysql {
  async query(sql, args) {
    try {
      const [result] = await connection.query(sql, args);
      return result;
    } catch (error) {
      console.log(error);
      return retCode.ServerError;
    }
  }
  async execute(sql, args) {
    try {
      const [result] = await connection.execute(sql, args);
      return result;
    } catch (error) {
      console.log(error);
      return retCode.ServerError;
    }
  }
}

class Db extends Mysql {
  constructor(table) {
    super();
    this.table = table;
  }
  // 创建数据
  async create(obj) {
    const statement = `INSERT INTO ${this.table} set ?;`;
    const result = await this.query(statement, [obj]);
    let body = {};
    if (result.affectedRows > 0 && !!result.affectedRows) {
      body.code = 1;
      body.msg = "创建成功";
      body.data = result;
    } else {
      body.code = 0;
      body.msg = "创建失败";
    }
    return body;
  }

  //删除数据
  async delete(id) {
    const statement = `DELETE FROM ${this.table} WHERE id=?`;
    const result = await this.execute(statement, [id]);
    let body = {};
    if (result.affectedRows > 0) {
      body.code = 1;
      body.msg = "删除成功";
    } else {
      body.code = 0;
      body.msg = "删除失败";
    }
    return body;
  }

  //修改数据
  async update(userId, data) {
    const statement = `UPDATE ${this.table} set ? WHERE id =?;`;
    const result = await this.query(statement, [data, userId]);
    let body = {};
    if (result.affectedRows > 0) {
      body.code = 1;
      body.msg = "更新成功";
    } else {
      body.code = 0;
      body.msg = "更新失败";
    }
    return body;
  }

  // 查看数据库单条数据
  async get(id) {
    const statement = `SELECT * FROM ${this.table} WHERE id = ?;`;
    const [result] = await this.execute(statement, [id]);
    let body = {};
    console.log(result);
    body.code = 1;
    body.msg = "查询成功";
    body.data = result || [];
    return body;
  }

  // 查询数据列表
  async getList(obj) {
    const { offset = 0, size = 100, createAt = [], ...rest } = obj;
    const arr = [];
    for (const key in rest) {
      if (typeof rest[key] === "number" || rest[key]) {
        // arr.push(`${key}="${rest[key]}"`);
        arr.push(`${key} LIKE "%${rest[key]}%"`);
      }
    }
    let newArr = arr.join(" and ");
    // 时间查询
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
      const statement = `SELECT * FROM ${this.table} WHERE ${newArr} order by id desc LIMIT ?,?;`;
      const result = await this.query(statement, [offset, size]);
      const statement2 = `SELECT count(*) totalCount FROM ${this.table} WHERE ${newArr}`;
      const [result2] = await this.query(statement2);
      const data = {
        list: result,
        totalCount: result2.totalCount,
      };
      body.code = 1;
      body.msg = "查询成功";
      body.data = data;
      return body;
    } else {
      const statement = `SELECT * FROM ${this.table} order by id desc LIMIT ?,?;`;
      const result = await this.query(statement, [offset, size]);
      const statement2 = `SELECT count(*) totalCount FROM ${this.table}`;
      const [result2] = await this.query(statement2);
      const data = {
        list: result,
        totalCount: result2.totalCount,
      };
      body.code = 1;
      body.msg = "查询成功";
      body.data = data;
      return body;
    }
  }

  async where(sql, arg = []) {
    let body = {};
    const result = await this.query(sql, arg);
    body.code = 1;
    body.msg = "查询成功";
    body.data = result;
    return body;
  }
}

module.exports = Db;
