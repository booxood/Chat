/**
 * Created by JetBrains WebStorm.
 * User: liucw
 * Date: 13-3-24
 * Time: 下午8:08
 * To change this template use File | Settings | File Templates.
 */
window.onload = function(){
    var host = 'http://localhost:8080';
    //var host = 'http://chat-app.ap01.aws.af.cm';
    var socket = io.connect(host);
    var cookies = getCookie();
    var user = cookies['sid'].split('|')[0];
    socket.emit('online',{username:user});
    document.title += ' - ' + user;

//    socket.on('reconnect',function(){
//        socket.emit('reconnect',{username:user});
//    });

    socket.on('online',function(data){
        addContent(data.username+' 上线了',1);
        flushUserList(data.userList);
    });
    socket.on('offline',function(data){
        addContent(data.username+' 下线了',1);
        flushUserList(data.userList);
    });
    socket.on('forcedOffline',function(data){
        addContent(data.username+'，你被迫下线了',1);
        delCookie('sid');
    });
    socket.on('news',function(data){

        if(data.from == data.to){
            addContent('你很寂寞的对自己说:' + data.msg,2);
        }
        else if(data.to == 'all'){
            if(data.from == user){
                addContent('你对大家说:' + data.msg);
            }else{
                addContent(data.from+'说:' + data.msg);
            }
        }else{
            if(data.from == user){
                addContent('你悄悄的对' + data.to + '说：' + data.msg,2);
            }else{
                addContent(data.from+'悄悄的对你说：' + data.msg,2);
            }

        }
    });

    addSendEvent(socket,user);
    addChangeToEvent();
};

function addChangeToEvent(){
    var usersDiv = document.getElementById('users');
    var usersSpan = usersDiv.getElementsByTagName('span');
    for(var i in usersSpan){
        usersSpan[i].ondblclick = setTo(usersSpan[i]);
    };
    var toAll = document.getElementById('toAll');
    toAll.onclick = setTo(toAll);
};

function setTo(element){
    var toElement = document.getElementById('to');
    return function(){
        toElement.textContent = element.textContent;
    }
};

function addSendEvent(socket,user){
    var sendBtn = document.getElementById('sendBtn');
    var toElement = document.getElementById('to');
    var inputElement = document.getElementById('inputContent');
    sendBtn.onclick = function(){
        if(trim(inputElement.value) == ''){
            return;
        }
        var data = {
            from:user,
            to:trim(toElement.text),
            msg:trim(inputElement.value)
        };
        socket.emit('chat',data);
        inputElement.value = '';
    };
};

function addContent(content,type){
    var contentsDiv = document.getElementById('contents');
    var contentSpan = document.createElement('span');
    var contentText = document.createTextNode(content);
    contentSpan.appendChild(contentText);
    contentSpan.className = 'label';

    if(type == 1){
        addClass(contentSpan,'label-important');
    }else if(type == 2){
        addClass(contentSpan,'label-success');
    };

    contentsDiv.appendChild(contentSpan);
};

function flushUserList(userList){
    var usersDiv = document.getElementById('users');
    deleteElement(usersDiv,'span');
    for(var i in userList){
        addUser(userList[i]);
    };
};

function deleteElement(parentElement,element){
    for(var l = parentElement.childNodes.length -1;l>=0;l--){
        var childNode = parentElement.childNodes[l];
        parentElement.removeChild(childNode);
    }
};

function addUser(user){
    var usersDiv = document.getElementById('users');
    var userSpan = document.createElement('span');
    var userText = document.createTextNode(user);
    userSpan.appendChild(userText);
    userSpan.className = 'label label-info';
    userSpan.ondblclick = setTo(userSpan);
    usersDiv.appendChild(userSpan);
};

function addClass(element,value){
    if(!element.className){
        element.className = value;
    }else{
        var newClassName = element.className;
        newClassName += " ";
        newClassName += value;
        element.className = newClassName;
    }
};

function getCookie(){
    var cookies = {};
    if(document.cookie){
        var cookieArray = document.cookie.split(';');
        for(var c in cookieArray){
            var cc = cookieArray[c].split('=');
            cookies[trim(cc[0])] = cc[1];
        }
    }
    return cookies;
};

//function delCookie(key){
//    if(!document.cookie){
//        return false;
//    }
//    var cookieArray = document.cookie.split(';');
//    for(var c in cookieArray){
//        var cc = cookieArray[c].split('=');
//        if(trim(cc[0]) == key){
//            delete cookieArray[c];
//        }
//    }
//    document.cookie = cookieArray.join(';');
//    alert('1:' + document.cookie);
//}

function delCookie(key){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(key);
    document.cookie = key + '=' + cval + ';expires=' + exp.toGMTString();
}

function trim(str){
    return str.replace(/^\s+|\s+$/g,'');
};
