/**
 * 同步Ajax请求,线程锁定
 * @type 
 */

var synchronize = {};

synchronize.createXhrObject = function() {
	var http;
	var activeX = ["MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", 'Microsoft.XMLHTTP'];
	try {
		http = new XMLHttpRequest();
		http.setRequestHeader('Cache-Control', 'no-cache');
	} catch (e) {
		for (var i = 0; i < activeX.length; i++) {
			try {
				http = new ActiveXObject(activeX[i]);
				break;
			} catch (e) {

			}
		}
	} finally {
		return http;
	}
}
