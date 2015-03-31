var centerjslist = inputJS["center_js"];

for (i = 0; i < centerjslist.length; i++) {
	var tag = '<script type="text/javascript" src="' + centerjslist[i] + '"></script>';
	document.write(tag);
}

//Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
//Seam.Remoting.displayLoadingMessage = function() {};
//Seam.Remoting.hideLoadingMessage = function() {};
var lang = getLanguage();
if (lang == 'zh') {
	document.write('<script type="text/javascript" src="../lib/ext/source/locale/ext-lang-zh_CN_gb.js"></script>');
} else if (lang == 'ja') {
	document.write('<script type="text/javascript" src="../lib/ext/source/locale/ext-lang-ja.js"></script>');
} else if (lang == 'en') {
	document.write('<script type="text/javascript" src="../lib/ext/source/locale/ext-lang-en_UK.js"></script>');
} else {// 如果以上都不匹配，默认加载中文
	document.write('<script type="text/javascript" src="../lib/ext/source/locale/ext-lang-zh_CN_gb.js"></script>');
}

var href = window.location.href.split("?");

var jslist = inputJS[href[1]]

for (i = 0; i < jslist.length; i++) {
	var tag = '<script type="text/javascript" src="' + jslist[i] + '"></script>';
	document.write(tag);
}
