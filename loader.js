const fs = require('fs');
const path = require('path');
const Router = require('koa-router');
const routes = require('./routes');

function load(dir, cb){
    console.log(dir);
    const url = path.resolve(__dirname, dir) //变成绝对路径
    const files = fs.readdirSync(url)
    files.forEach(filename=>{
        filename = filename.replace('.js', '')
        const file = require(url+'/'+filename);
        cb(filename, file);
    })
}

function initRouter(app){
    const router = new Router()
    load('routes',(filename, routes)=>{
        const prefix = filename === 'index'?'':`/${filename}`
        routes = typeof routes == 'function'?routes(app): routes
        Object.keys(routes).forEach(key =>{
            const [method, path] = key.split(' ')
            console.log(`正在映射地址:${method} ${prefix}${path}`);
            // router[method](prefix+path, routes[key])
            console.log(routes[key]);
            router[method](prefix+path, async ctx=>{
                console.log(33,routes[key]);
                app.ctx=  ctx;
                await routes[key](app)
            })
        })
    })
    return router;
}
function initController(app){
    const controllers = {};
    load('controller', (filename, controller)=>{
        controller = typeof controller=='function'?controller(app):controller
        controllers[filename] = controller;
    })
    console.log(controllers);
    return controllers;
}
function initService(app){
    const services = {};
    load('service', (filename, service)=>{
        service = typeof service=='function'?service(app):service
        services[filename] = service;
    })
    return services
}
const Sequelize = require('sequelize')
function loadConfig(app){
    load('config', (filename, conf)=>{
        if(conf.db){
            app.$db = new Sequelize(conf.db)
            // load model
            app.$model = {};
            load('model', (filename, {schema,options})=>{
                app.$model[filename] = app.$db.define(filename, schema, options);
            })
            app.$db.sync({force:true})
        }
        if(conf.middleware){
            conf.middleware.forEach(mid=>{
                // /xxx+/midddlwareconf
                const midPath = path.resolve(__dirname, 'middleware', mid);
                console.log(1111, midPath);
                app.$app.use(require(midPath))
            })
        }
    })
    
}
const schedule = require('node-schedule')
function initSchedule(){
    load('schedule', (filename, scheduleConfig)=>{
        schedule.scheduleJob(scheduleConfig.interval, scheduleConfig.handler);
    })
}
//cron sechedule
module.exports = {initRouter, initController, initService, loadConfig, initSchedule}