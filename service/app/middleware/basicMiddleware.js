module.exports = (options) => {
  return async function basicMiddleware(ctx, next) {
    // console.log(ctx)
    // console.log(ctx.session.openId)
    await next()
  }
}
