/**
 * Created by JetBrains WebStorm.
 * User: liucw
 * Date: 13-4-20
 * Time: 下午3:18
 * To change this template use File | Settings | File Templates.
 */
exports.PORT = 8080;

exports.MIME = {
    'css':'text/css',
    'html':'text/html',
    'js':'text/javascript',
    'png':'image/png',
    'jpg':'image/jpeg',
    'ico':'image/x-icon',
    'jpeg':'image/jpeg'
};

//for appfog
if(process.env.VCAP_SERVICES){
    var env = JSON.parse(process.env.VCAP_SERVICES);
    var mongo = env['mongodb-1.8'][0]['credentials'];
}
else{
    var mongo = {
        "hostname":"localhost",
        "port":27017,
        "username":"",
        "password":"",
        "name":"",
        "db":"chat"
    }
}
var generate_mongo_url = function(obj){
    obj.hostname = (obj.hostname || 'localhost');
    obj.port = (obj.port || 27017);
    obj.db = (obj.db || 'test');
    if(obj.username && obj.password){
        obj.hostname = obj.username + ":" + obj.password + "@" + obj.hostname;
    }
    return obj;
}
exports.db = generate_mongo_url(mongo);