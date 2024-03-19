const roleService = require("../service/role.service");

class RoleController {
  async create(ctx) {
    const result = await roleService.create(ctx.request.body);
    ctx.body = result;
  }

  async deleted(ctx) {
    console.log(ctx.params.roleId);
    const result = await roleService.delete(ctx.params.roleId);
    ctx.body = result;
  }

  async update(ctx) {
    const result = await roleService.update(
      ctx.params.roleId,
      ctx.request.body
    );
    ctx.body = result;
  }
  async get(ctx) {
    const result = await roleService.get(ctx.params.roleId);
    ctx.body = result;
  }

  async getList(ctx) {
    const result = await roleService.getList(ctx.request.body);
    ctx.body = result;
  }

  async createRoleMenu(ctx) {
    const result = await roleService.createRoleMenu(ctx.request.body);
    ctx.body = result;
  }

  async getRoleMenuList(ctx) {
    const result = await roleService.getRoleMenuList(ctx.params.roleId);
    ctx.body = result;
  }

  async getRoleMenuIds(ctx) {
    const result = await roleService.getRoleMenuIds(ctx.params.roleId);
    ctx.body = result;
  }
}

module.exports = new RoleController();
