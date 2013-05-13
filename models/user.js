/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 13-4-24
 * Time: 下午10:27
 * To change this template use File | Settings | File Templates.
 */
var mongodb = require('./db');

function User(user){
    this.name = user.name;
    this.password = user.password;
    this.phone = user.phone || '';
}

module.exports = User;

User.get = function(username,callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        };
        db.collection('users',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.findOne({name:username},function(err,doc){
                mongodb.close();
                if(doc){
                    var user = new User(doc);
                    callback(err,user);
                }else{
                    callback(err,null);
                }

            });
        });

    });
};

User.prototype.save = function(callback){
    var user = {
        name : this.name,
        password : this.password,
        phone : this.phone || ''
    }
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        };
        db.collection('users',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.ensureIndex('name',{unique:true},function(err){
                mongodb.close();
                callback(err);
            });
            collection.insert(user,{safe:true},function(err,one){
                mongodb.close();
                callback(err,one);
            });
        });

    });
};