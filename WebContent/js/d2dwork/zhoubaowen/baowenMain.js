//默认空白图片
Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';

var baowen = {};

baowen.init = function(){
	Ext.QuickTips.init();
	baowenUI.init();
}

Ext.onReady(baowen.init, baowen, true);
