function getResource(paramName){
	var lang = navigator.lang;
	if(lang=='zh'){
		return JsResource_zh[paramName];
	}else if(lang=='ja'){
		return JsResource_ja[paramName];
	}else if(lang=='en'){
		return paramName;
	}
	return JsResource_zh[paramName];
}

//function getLanguage(){
//	var win = window;
//	if(win!=window.parent){
//		win = window.parent;
//	}
//	var args = getArgs(win);
//	var lang = args['lang'];
//	if(!lang){
////		lang = (navigator.language || navigator.browserLanguage).split('-')[0];
////		if(lang.length!=2){
////			lang = lang.substring(0,2);
////		}
//		lang = 'ja';
//	}
//	return lang;
//}

function getArgs(win){
	var args = new Object();
	var query = win.location.search.substring(1);
	var pairs = query.split('&');
	for(var i=0;i<pairs.length;i++){
		var pos = pairs[i].indexOf('=');
		if(pos==-1){
			continue;
		}
		var argname = pairs[i].substring(0,pos);
		var value = pairs[i].substring(pos+1);
		value = decodeURIComponent(value);
		args[argname] = value;
	}
	return args;
}
