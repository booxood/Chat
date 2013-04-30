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
var User = require('./models/user');
var session = require('./session');
var cookie = require('./cookie');

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
        responseFile('/public/views/login.html',response);
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
            if(post.length > 100){
                console.log('post.length:' + post.length);
                request.emit('end');
            }
        });

        request.on('end',function(){
            console.log('post:'+post);
            post = querystring.parse(post);
            var username = post['username'];
            var password = post['password'];
            User.get(username,function(err,user){
                if(err || !user){
                    responseFile('/public/views/login.html',response);
                }else if(user){
                    if(user.password == password){
                        //set session
                        var sid = session.genSID(user.name);
                        session.setSession(sid);
                        response.setHeader('Set-Cookie',['sid=' + sid]);
                        //responseFile('/public/views/chat.html',response);
                        response.statusCode = 302;
                        response.setHeader('Location','/chat');
                        response.end();
                    }else{
                        responseFile('/public/views/login.html',response);
                    }
                }
            });
        });
    };
};

function chat(response,request){

    var cookies = cookie(request);

    if(cookies['sid']){
        if(session.getSession(cookies['sid'])){
            session.updateSession(cookies.sid);
            responseFile('/public/views/chat.html',response);
        }
    }else{
        response.statusCode = 302;
        response.setHeader('Location','/');
        response.end();
    }
}

function signup(response,request){
    if(request.method == "GET"){
        responseFile('/public/views/signup.html',response);
    }else if(request.method == "POST"){
        response.setHeader('Content-Type','text/html');
        response.end('<h1>signup... 待续...</h1>')
    }
};

exports.index = index;
exports.login = login;
exports.signup = signup;
exports.chat = chat;