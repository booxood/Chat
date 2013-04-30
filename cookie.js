/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 13-4-30
 * Time: 下午4:17
 * To change this template use File | Settings | File Templates.
 */

/**
 * parse request.headers.cookie = 'key1=value1; key2=value2; ...'
 *
 * return {key1:value1,key2:value2, ...}
 */
module.exports = function Cookie(request){
    var cookies = {};
    if(request.headers && request.headers.cookie){
        var cookieArray = request.headers.cookie.split(';');
        for(var c in cookieArray){
            var cc = cookieArray[c].split('=');
            cookies[trim(cc[0])] = cc[1];
        }
    }
    return cookies;
};

function trim(str){
    return (str||'').replace(/^\s+|\s+$/g,'');
}