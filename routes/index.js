module.exports = app=>({
    // 'get /': async ctx =>{
    //     const name = await app.$service.user.getName()
    //     ctx.body = '首页'+name
    // },
    
    'get /': app.$ctrl.home.index,
    'get /detail':  app.$ctrl.home.detail,
    

    // 'get /detail': async ctx =>{
    //     ctx.body = 'detail page'
    // }
})
// currying object->对象工厂
