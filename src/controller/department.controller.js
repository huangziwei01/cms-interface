const departmentService = require("../service/department.service");

class DepartmentController {
  async create(ctx) {
    const result = await departmentService.create(ctx.request.body);
    ctx.body = result;
  }
  async deleted(ctx) {
    console.log(ctx.params.departmentId);
    const result = await departmentService.delete(ctx.params.departmentId);
    ctx.body = result;
  }
  async update(ctx) {
    const result = await departmentService.update(
      ctx.params.departmentId,
      ctx.request.body
    );
    ctx.body = result;
  }
  async get(ctx) {
    const result = await departmentService.get(ctx.params.departmentId);
    ctx.body = result;
  }
  async getList(ctx) {
    const result = await departmentService.getList(ctx.request.body);
    ctx.body = result;
  }
}
module.exports = new DepartmentController();
