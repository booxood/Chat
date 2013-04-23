/**
 * Created by JetBrains WebStorm.
 * User: liucw
 * Date: 13-2-20
 * Time: 下午8:01
 * To change this template use File | Settings | File Templates.
 */
var fs = require('fs');
var path = require('path');
var querystring = require('querystring');
var util = require('util');

function responseFile(filePath,response){
    var realPath = path.join(__dirname,path.normalize(filePath));
//    fs.readFile(realPath),
//        function(err,data){
//            if(err){
//                response.writeHead(500);
//                response.end('read file index.html error!');
//            }
//            response.writeHead(200);
//            response.end(data);
//        }
//    )
    var stream = fs.createReadStream(realPath);
    response.writeHead(200);
    stream.pipe(response);
};

function index(response,request){
    if(request.method == "GET"){
        responseFile('/public/views/index.html',response);
    };
};

function login(response,request){
    console.log('[login] request.method:' + request.method);
    if(request.method == "GET"){
        responseFile('/public/views/login.html',response);
    }else if(request.method == "POST"){
        var post = '';
        request.on('data',function(chunk){
            post += chunk;
        });

        request.on('end',function(){
            console.log('post:'+post);
            post = querystring.parse(post);
            response.end(util.inspect(post));
        });
    };
};

function signup(response,request){
    if(request.method == "GET"){
        responseFile('/public/views/signup.html',response);
    }else if(request.method == "POST"){

    }
};

exports.index = index;
exports.login = login;
exports.signup = signup;