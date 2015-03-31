/** 
 * @author zhaodw
 * @version 1.0
 * @create 2011-11-21
 * 
 */
var ExpertMain = {};
ExpertMain.init = function(){
	Ext.QuickTips.init();
	
	var centerPanel = new Ext.TabPanel({
		id : 'ExpertMainPanel',
		activeTab : 0,
		region: 'center',
		items :[ExpertView.tabs()]
	});
	var viewport = new Ext.Viewport({ // 页面布局
		id : 'ExpertMainViewPanel',
		layout : 'fit',
		items : centerPanel
	});

	viewport.doLayout();
};

Ext.onReady(ExpertMain.init, ExpertMain, true);