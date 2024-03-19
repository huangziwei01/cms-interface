const userService = require("../service/user.service");
const retCode = require("../constants/retcode");

class userController {
  async create(ctx) {
    const result = await userService.create(ctx.request.body);
    ctx.body = result;
  }

  async deleted(ctx) {
    const result = await userService.delete(ctx.params.userId);
    ctx.body = result;
  }

  async update(ctx) {
    const result = await userService.update(
      ctx.params.userId,
      ctx.request.body
    );
    ctx.body = result;
  }

  async get(ctx) {
    console.log(ctx.params.userId);
    const result = await userService.get(ctx.params.userId);
    ctx.body = result;
  }

  async getList(ctx) {
    const result = await userService.getList(ctx.request.body);
    ctx.body = result;
  }
}

module.exports = new userController();
