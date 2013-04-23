/**
 * Created by JetBrains WebStorm.
 * User: liucw
 * Date: 13-2-20
 * Time: 下午7:57
 * To change this template use File | Settings | File Templates.
 */
var path = require('path');
var fs = require('fs');
var config = require('./config');

function route(handle,pathname,response,request){
    if(typeof handle[pathname] === 'function'){
        handle[pathname](response,request);
    }else{
        var realPath = path.join('public',path.normalize(pathname.replace(/\.\./g,'')));
//        var realPath = './public'+pathname;
        var pathHandle = function(realPath){
            fs.stat(realPath,function(err,stats){
                if(err){
                    response.writeHead(404,{"Content-Type":"text/html"});
                    response.write("<h1>path:" + pathname + "</h1>");
                    response.write("<h1>404 Not found!</h1>");
                    response.end();
                }else{
                    if(stats.isDirectory()){
                        realPath = path.join(realPath,path.normalize('index.html'));
                        pathHandle(realPath);
                    }else{
                        var ext = path.extname(realPath);
                        ext = ext ? ext.slice(1):'unknown';
                        var contentType = config.MIME[ext] || 'text/plain';
                        response.setHeader('Content-Type',contentType);
                        response.setHeader('Content-Length',stats.size);
//                        fs.readFile(realPath,function(err,data){
//                            if(err){
//                                console.log('err......');
//                            }else{
//                                response.writeHead(200);
//                                response.end(data);
//                            }
//                        });
                        var raw = fs.createReadStream(realPath);
                        response.writeHead(200);
                        raw.pipe(response);
                    }
                }
            });
        };

        pathHandle(realPath);


    };
};
exports.route = route;