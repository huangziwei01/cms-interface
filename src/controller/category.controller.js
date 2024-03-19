const categoryService = require("../service/category.service");

class CategoryController {
  async create(ctx) {
    const result = await categoryService.create(ctx.request.body);
    ctx.body = result;
  }
  async deleted(ctx) {
    const result = await categoryService.delete(ctx.params.categoryId);
    ctx.body = result;
  }
  async update(ctx) {
    const result = await categoryService.update(
      ctx.params.categoryId,
      ctx.request.body
    );
    ctx.body = result;
  }
  async get(ctx) {
    const result = await categoryService.get(ctx.params.categoryId);
    ctx.body = result;
  }
  async getList(ctx) {
    const result = await categoryService.getList(ctx.request.body);
    ctx.body = result;
  }
}
module.exports = new CategoryController();
