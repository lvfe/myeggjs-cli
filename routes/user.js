module.exports = {
    // /user/
    'get /': async app =>{
        const name = await app.$service.user.getName()
        app.ctx.body = '首页'+name
    },
    // /user/info
    'get /info': async app =>{
        const age = await app.$service.user.getAge()
        app.ctx.body = '用户详细页'+age
    }
}