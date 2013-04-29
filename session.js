/**
 * Created by JetBrains WebStorm.
 * User: liuchu
 * Date: 13-4-29
 * Time: 下午10:34
 * To change this template use File | Settings | File Templates.
 */
var EXPIRE_TIME = 15*60*1000;

var _session = {};

function genSID(username){
    return username + '|' + Math.round(Math.random()*100);
}

function createSession(sid){
    var session = {
        sid : sid,
        modifyTime : new Date()
    };
    return session;
}

function setSession(sid){
    _session[sid] = createSession(sid);
}

function getSession(sid){
    return _session[sid];
}

function updateSession(sid){
    _session[sid].modifyTime = new Date();
}

setInterval(function(){
    for(var s in  _session){
        if(new Date() - _session[s].modifyTime > EXPIRE_TIME){
            delete _session[s];
        }
    }
},1000);

exports.genSID = genSID;
exports.setSession = setSession;
exports.getSession = getSession;
exports.updateSession = updateSession;
