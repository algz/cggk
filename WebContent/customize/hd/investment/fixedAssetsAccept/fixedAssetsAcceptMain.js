var fixedAssetsAcceptMain = {
	start:0,
	limit:15
}
//Ext.QuickTips.init();
//Ext.form.Field.prototype.msgTarget='under';

fixedAssetsAcceptMain.init = function(){
	var accept = acceptTask.init(fixedAssetsAcceptMain.start,fixedAssetsAcceptMain.limit);
	var payment = paymentTask.init(fixedAssetsAcceptMain.start,fixedAssetsAcceptMain.limit,1);
	
	var tab =new Ext.TabPanel({
		id:'fixedAssetsAcceptTab',
		items:[accept,payment],
		activeTab:0
	});
	
	var view =new Ext.Viewport({
		layout:'fit',
		items:[tab]
	});
};

Ext.onReady(fixedAssetsAcceptMain.init,fixedAssetsAcceptMain,true);