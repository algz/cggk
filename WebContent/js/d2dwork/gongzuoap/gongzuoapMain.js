Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var gongzuoapMain = {}

gongzuoapMain.initViewport = function() {
	Ext.QuickTips.init();
	gongzuoapUI.initJsGrid();
	gongzuoapUI.initApGrid();
	gongzuoapUI.initTabPanel();
	return new Ext.Viewport({
		layout:'border',
		items:gongzuoapUI.tabPanel
	});
}

Ext.onReady(gongzuoapMain.initViewport, gongzuoapMain);
