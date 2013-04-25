/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 13-4-24
 * Time: 下午10:47
 * To change this template use File | Settings | File Templates.
 */
var User = require('./user');
var util = require('util');

var user = new User({
    name : 'Jim',
    password : '123'
});
//user.save(function(err,user){
//    if(err){
//        console.log('err:' + err);
//    }else{
//        console.log('save ok:' + util.inspect(user));
//    }
//});

User.get('a',function(err,user){
    if(err || !user){
        console.log('faild:'+ err + ':' + util.inspect(user));
    }else if(user){
        console.log('get ok:' + util.inspect(user));
    }
});