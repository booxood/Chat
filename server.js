/**
 * Created by JetBrains WebStorm.
 * User: liucw
 * Date: 13-2-20
 * Time: 下午7:52
 * To change this template use File | Settings | File Templates.
 */
var http = require('http');
var url = require('url');
var config = require('./config');

function start(route,handle){
    function onRequest(request,response){
        var pathname = url.parse(request.url).pathname;
        console.log('[server - start] request :' + pathname);
        route(handle,pathname,response,request);
    };
    return http.createServer(onRequest).listen(config.PORT,function(){
        console.log('listining port:'+config.PORT);
    });
};
exports.start = start;