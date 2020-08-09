
module.exports = app=> ({
    index: async ctx =>{
        // ctx.body = 'home controller'
       const name =  await app.$service.user.getName()
       app.ctx.body = 'ctrl use service'+name;
    },
    detail: ctx =>{
        app.ctx.body = 'home detail controller'
    }
})
//为什么需要柯里化