/**
 * Created by JetBrains WebStorm.
 * User: liucw
 * Date: 13-3-24
 * Time: 下午8:08
 * To change this template use File | Settings | File Templates.
 */

var socket = io.connect('http://localhost:8080');
socket.on('news',function(data){
    console.log('client socket happen~~~~~~~:'+data.msg);
});