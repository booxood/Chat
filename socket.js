/**
 * Created by JetBrains WebStorm.
 * User: liucw
 * Date: 13-2-27
 * Time: 下午8:34
 * To change this template use File | Settings | File Templates.
 */
var socketIO = require('socket.io');
function start(app,listen){
    var io = socketIO.listen(app,{log:false});
    var userList = [];
    //[[username,socket],
    // [username,socket],...]

    io.sockets.on('connection',function(socket){

        console.log('socket.id :' + socket.id);

//        socket['emit']('news',(function(){
//            return {msg:'hello world'};
//        })());
//
//        socket.on('disconnect',function(){
//            console.log('socket.id :' + socket.id + ' , disconnect');
//        });
        for(var ls in listen){
            if(typeof listen[ls][2] === 'function'){
                // socket['emit']('news',function(){});
                socket[listen[ls][0]](listen[ls][1],listen[ls][2](socket,userList));
            };
        };

    });
};

exports.start = start;