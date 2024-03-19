function warmDelate(limitId) {
  return async (ctx, next) => {
    if (Object.values(ctx.params)[0] <= limitId) {
      let body = {};
      body.code = 0;
      body.msg = `删除失败,不能删除id<${limitId}的数据`;
      ctx.body = body;
      return;
    } else {
      await next();
    }
  };
}

function warmUpdate(limitId) {
  return async (ctx, next) => {
    if (Object.values(ctx.params)[0] <= limitId) {
      let body = {};
      body.code = 0;
      body.msg = `修改失败,不能修改id<${limitId}的数据`;
      ctx.body = body;
      return;
    } else {
      await next();
    }
  };
}

function warm(limitId) {
  return async (ctx, next) => {
    let body = {};
    body.code = 0;
    body.msg = `数据比较敏感,不能修改,暂未开放,后期会开放`;
    ctx.body = body;
    return;
  };
}

function warmassign(limitId) {
  return async (ctx, next) => {
    console.log(ctx.request.body.roleId);
    if (ctx.request.body.roleId <= limitId) {
      let body = {};
      body.code = 0;
      body.msg = `修改失败,不能修改roleId<${limitId}的数据`;
      ctx.body = body;
      return;
    } else {
      await next();
    }
  };
}

module.exports = { warmDelate, warmUpdate, warm, warmassign };
