var importMain = {
	apppanel : null,
	args : null,
	baseargs : null
}
importMain.init = function() {

	importMain.importMbom = function() {
		callSeam("Import_ImportRemote", "importMbom", function(result) {
					alert(result);
				});
	};

	importMain.tabPanel = new Ext.TabPanel({
				activeTab : 0,
				id : 'tabpanel',
				minTabWidth : 300,
				resizeTabs : false,
				boder : false,
				hidden : false,
				items : [{
							id : 'tab1',
							title : 'MBOM数据导入',
							closable : false,
							layout : 'fit',
							listeners : {
								activate : function() {
									importMain.importMbom();
								}
							}
						}]
			});

	// 主面板 的 中间面板
	importMain.cardPanel = new Ext.Panel({
				frame : false,
				boder : false,
				layout : 'card',
				items : [importMain.tabPanel],
				activeItem : 0
			});

	importMain.centerPanel = new Ext.Panel({
				region : 'center',
				height : 800,
				frame : false,
				boder : false,
				layout : 'fit',
				items : [importMain.cardPanel]

			});

	var viewport = new Ext.Viewport({
				layout : 'border',
				items : [importMain.centerPanel]
			});
}
Ext.onReady(importMain.init, importMain, true);
