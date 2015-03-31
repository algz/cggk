//默认空白图片
Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';

var plan = {};

plan.init = function(){
	Ext.QuickTips.init();
	planUI.init();
}

Ext.onReady(plan.init, plan, true);
