const menuService = require("../service/menu.service");
class MenuController {
  async create(ctx) {
    const result = await menuService.create(ctx.request.body);
    ctx.body = result;
  }
  async deleted(ctx) {
    const result = await menuService.delete(ctx.params.menuId);
    ctx.body = result;
  }
  async update(ctx) {
    const result = await menuService.update(
      ctx.params.menuId,
      ctx.request.body
    );
    ctx.body = result;
  }
  async get(ctx) {
    const result = await menuService.get(ctx.params.menuId);
    ctx.body = result;
  }

  async getList(ctx) {
    const result = await menuService.getList(ctx.request.body);
    ctx.body = result;
  }
}
module.exports = new MenuController();
