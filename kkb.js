const Koa = require('koa') 
const {initRouter, initController, initSchedule, initService, loadConfig} = require('./loader')
class kkb {
    constructor(conf){
        this.$app = new Koa(conf)
        loadConfig(this)
        this.$service = initService(this)
        this.$ctrl = initController(this)
        this.$router = initRouter(this) //$
        this.$app.use(this.$router.routes())
        initSchedule();
    }

    start(port) {
        this.$app.listen(port, ()=>{
            console.log('start', port);
        });
    }
}
module.exports = kkb