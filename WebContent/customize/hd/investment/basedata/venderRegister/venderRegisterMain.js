/** 
 * @author zhaodw
 * @version 1.0
 * @create 2011-11-21
 * 
 */
var venderRegisterMain = {};
venderRegisterMain.init = function(){
	Ext.QuickTips.init();
	
	var centerPanel = new Ext.TabPanel({
		id : 'venderRegisterMainPanel',
		activeTab : 0,
		region: 'center',
		items :[venderRegisterView.tabs()]
	});
	var viewport = new Ext.Viewport({ // 页面布局
		id : 'venderRegisterMainViewPanel',
		layout : 'fit',
		items : centerPanel
	});

	viewport.doLayout();
};

Ext.onReady(venderRegisterMain.init, venderRegisterMain, true);