/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 13-4-24
 * Time: 下午10:19
 * To change this template use File | Settings | File Templates.
 */
var config = require('../config');
var mongodb = require('mongodb');



var server = new mongodb.Server(config.db.hostname,config.db.port,{auto_reconnect:true});
module.exports = new mongodb.Db(config.db.db,server,{safe:true});
