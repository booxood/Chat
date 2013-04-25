/**
 * Created by JetBrains WebStorm.
 * User: liucw
 * Date: 13-2-20
 * Time: 下午9:01
 * To change this template use File | Settings | File Templates.
 */
var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');
var socket = require('./socket');
var socketListens = require('./socketListens');

var handle = [];
handle['/'] = requestHandlers.index;
handle['/login'] = requestHandlers.login;
handle['/signup'] = requestHandlers.signup;
handle['/chat'] = requestHandlers.chat;

var listen = [];
listen.push(['on','disconnect',socketListens.onDisconnect]);
listen.push(['on','chat',socketListens.onChat]);
listen.push(['on','online',socketListens.onOnline]);
//listen.push(['emit','news', socketListens.emitNews]);

var app = server.start(router.route,handle);
socket.start(app,listen);