/**
 * Created by JetBrains WebStorm.
 * User: liucw
 * Date: 13-2-27
 * Time: 下午8:53
 * To change this template use File | Settings | File Templates.
 */
function emitNews(){
    console.log('server - emit - news ');
    return {msg:'hello world'};
};

function onDisconnect(socket){
    var _fun = function(){
//        console.log('on disconnect :'+ typeof socket);
        console.log('socket.id :' + socket.id + ' , disconnect');
    }
    return _fun;
};

function onChat(socket,userList){
    var _fun = function(data){
        if(data.to == 'all'){
            for(var i=0;i<userList.length;i++){
                if(userList[i][0] != data.from){
                    userList[i][1].emit('news',data);
                }
            }
        }else{
            for(var i=0;i<userList.length;i++){
                if(userList[i][0] == data.to){
                    userList[i][1].emit('news',data);
                    break;
                }
                console.log('onChat:  data.to ? ');
            }
        }
    };
    return _fun;
}

function onOnline(socket,userList){
    var _func = function(data){
        console.log('----online----:' + data.username);
        userList.push([data.username,socket]);
    };
    return _func;
}

exports.emitNews = emitNews;
exports.onDisconnect = onDisconnect;
exports.onChat = onChat;
exports.onOnline = onOnline;