const connection = require("../app/database");
const menuService = require("./menu.service");
const formatUtcString = require("../utils/date-format");
const Db = require("../utils/db");

class RoleService extends Db {
  // 创建用户
  async create(reqBody) {
    try {
      const statement = `INSERT INTO role set name=?,intro=?;`;
      const [result] = await connection.execute(statement, [
        reqBody.name,
        reqBody.intro,
      ]);
      await this.createRoleMenu({
        roleId: result.insertId,
        menuIdList: reqBody.menuList,
      });
      let body = {};
      if (result.affectedRows > 0) {
        body.code = 1;
        body.msg = "创建成功";
      } else {
        body.code = 0;
        body.msg = "创建失败";
      }
      return body;
    } catch (error) {
      console.log(error);
    }
  }

  //修改用户
  async update(roleId, reqBody) {
    try {
      const statement = `UPDATE role set name=?,intro=? WHERE id =?;`;
      const [result] = await connection.execute(statement, [
        reqBody.name,
        reqBody.intro,
        roleId,
      ]);
      await this.createRoleMenu({
        roleId,
        menuIdList: reqBody.menuList,
      });
      let body = {};
      if (result.affectedRows > 0) {
        body.code = 1;
        body.msg = "更新成功";
      } else {
        body.code = 0;
        body.msg = "更新失败";
      }
      return body;
    } catch (error) {
      console.log(error);
    }
  }
  // 查询用户列表
  async getList(data) {
    const { offset = 0, size = 100, createAt = [], ...rest } = data;
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
      for (const item of result) {
        item.menuList = await this.getRoleMenuList(item.id);
      }
      const data = {
        list: result,
        totalCount: result2.totalCount,
      };
      body.code = 1;
      body.msg = "查询成功";
      body.data = data;
      return body;
    } else {
      const statement = `SELECT * FROM ${this.table} order by createAt desc LIMIT ?,?;`;
      const result = await this.query(statement, [offset, size]);
      const statement2 = `SELECT count(*) totalCount FROM ${this.table}`;
      const [result2] = await this.query(statement2);
      for (const item of result) {
        const { data } = await this.getRoleMenuList(item.id);
        item.menuList = data;
      }
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

  // 给角色分配权限
  async createRoleMenu(reqBody) {
    console.log(reqBody);
    try {
      const statement1 = `DELETE FROM role_menu WHERE roleId=?`;
      const [result] = await connection.execute(statement1, [reqBody.roleId]);
      const statement2 = `INSERT INTO role_menu set roleId=?,menuId=?;`;
      let result2 = "";
      for (const item of reqBody.menuIdList) {
        [result2] = await connection.query(statement2, [reqBody.roleId, item]);
      }
      let body = {};
      console.log(result);
      console.log(result2);
      if (result2.affectedRows > 0 || result.affectedRows > 0) {
        body.code = 1;
        body.msg = "创建成功";
      } else {
        body.code = 0;
        body.msg = "创建失败";
      }
      return body;
    } catch (error) {
      console.log(error);
    }
  }

  async getRoleMenuList(id) {
    try {
      const statement = `SELECT rm.roleId,JSON_ARRAYAGG(rm.menuId) menuIds FROM role_menu rm  WHERE rm.roleId = ? GROUP BY rm.roleId ;`;
      const [result1] = await connection.execute(statement, [id]);
      const menuId = result1[0]?.menuIds || [];

      const result2 = await menuService.getList();
      const menuList = result2.data.list;
      for (let index = 0; index < menuList.length; index++) {
        if (!menuId.includes(menuList[index].id)) {
          menuList.splice(index, 1);
        }
      }

      const recFilterMenu = function (menuList) {
        const newMenu = [];
        for (const item of menuList) {
          if (item.children) {
            item.children = recFilterMenu(item.children);
          }
          if (menuId.includes(item.id)) {
            newMenu.push(item);
          }
        }
        return newMenu;
      };

      recFilterMenu(menuList);
      let body = {};
      body.code = 1;
      body.msg = "查询成功";
      body.data = menuList;
      return body;
    } catch (error) {
      console.log(error);
    }
  }

  async getRoleMenuIds(id) {
    try {
      const statement = `SELECT id,name,intro, (SELECT JSON_ARRAYAGG(menuId) FROM role_menu WHERE roleId=id) menuIds FROM role  WHERE id =?`;
      const [result] = await connection.query(statement, [id]);
      console.log(result);
      let body = {};
      body.code = 1;
      body.msg = "查询成功";
      body.data = result;
      return body;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new RoleService("role");
