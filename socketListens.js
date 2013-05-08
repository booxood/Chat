/**
 * Created by JetBrains WebStorm.
 * User: liucw
 * Date: 13-2-27
 * Time: 下午8:53
 * To change this template use File | Settings | File Templates.
 */
var util = require('util');

function emitNews(){
    console.log('server - emit - news ');
    return {msg:'hello world'};
};

function onDisconnect(socket,userList){
    var _func = function(){
//        console.log('on disconnect :'+ typeof socket);
//        console.log('onDisconnect--socket.id :' + socket.id);
//        console.log('onDisconnect--userList:' + util.inspect(userList));
        var username = '';
        var users = [];
        for(var u in userList){
            if(userList[u][1] == socket){
                username = userList[u][0];
                userList.splice(u,1);
//                console.log('onDisconnect--for--if--userList:' + util.inspect(userList));
            }else{
                users.push(userList[u][0]);
            }
        };
        if(username != ''){
            for(var u in userList){
                userList[u][1].emit('offline',{username:username,userList:users});
            };
        };
    }
    return _func;
};

function onChat(socket,userList){
    var _func = function(data){
        console.log('onChat:'+util.inspect(data));
        if(data.to == 'all'){
            for(var i=0;i<userList.length;i++){
                userList[i][1].emit('news',data);
            }
        }else{
            for(var i=0;i<userList.length;i++){
                if(userList[i][0] == data.from || userList[i][0] == data.to){
                    userList[i][1].emit('news',data);
                }
            }
        }
    };
    return _func;
};

function onOnline(socket,userList){
    var _func = function(data){
//        console.log('onOnline-1-userList:' + util.inspect(userList));
        var users = [];
        var flag = true;
        for(var u in  userList){
            users.push(userList[u][0]);
            if(userList[u][0] == data.username){
                userList[u][1] = socket;
                flag = false;
            }
        };
        if(flag){
            userList.push([data.username,socket]);
            users.push(data.username);
        };
//        console.log('onOnline-2-userList:' + util.inspect(userList));
        for(var i=0;i<userList.length;i++){
            userList[i][1].emit('online',{username:data.username,userList:users});
        };

    };
    return _func;
};

exports.emitNews = emitNews;
exports.onDisconnect = onDisconnect;
exports.onChat = onChat;
exports.onOnline = onOnline;