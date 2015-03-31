/** 
 * @author zhaodw
 * @version 1.0
 * @create 2011-11-21
 * 
 */
var venderManagerMain = {};
venderManagerMain.init = function(){
	Ext.QuickTips.init();
	
	var centerPanel = new Ext.TabPanel({
		id : 'venderManagerMainPanel',
		activeTab : 0,
		region: 'center',
		items :[venderManagerView.tabs()]
	});
	var viewport = new Ext.Viewport({ // 页面布局
		id : 'venderManagerMainViewPanel',
		layout : 'fit',
		items : centerPanel
	});

	viewport.doLayout();
};

Ext.onReady(venderManagerMain.init, venderManagerMain, true);