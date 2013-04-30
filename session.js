/**
 * Created by JetBrains WebStorm.
 * User: liuchu
 * Date: 13-4-29
 * Time: 下午10:34
 * To change this template use File | Settings | File Templates.
 */

var _session = {};

function Session(){
    this.EXPIRE_TIME = 15*60*1000;
}

Session = {

    genSID : function(username){
        return username + '|' + Math.round(Math.random()*100);
    },

    createSession:function(sid){
        var session = {
            sid : sid,
            modifyTime : new Date()
        };
        return session;
    },

    setSession:function(sid){
        _session[sid] = this.createSession(sid);
    },

    getSession:function(sid){
        return _session[sid];
    },

    updateSession:function(sid){
        _session[sid].modifyTime = new Date();
    },

    displaySession:function(){
        for(var s in _session){
            console.log('sid       :' +_session[s].sid);
            console.log('modifyTime:' +_session[s].modifyTime);

        }
    }

};

setInterval(function(){
    for(var s in  _session){
        if(new Date() - _session[s].modifyTime > Session.EXPIRE_TIME){
            delete _session[s];
        }
    }
},10000);

module.exports = Session;
