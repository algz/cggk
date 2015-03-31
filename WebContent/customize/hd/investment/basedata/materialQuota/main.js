var materialQuotaMain = {
	useType : 0  //1成品清单定额2备件清册3设备清册4工具清册5标准件清册
};
//材料定额初始化
materialQuotaMain.init = function() {
	Ext.QuickTips.init();
	var centerPanel = new Ext.TabPanel( {
		id : 'materialCenterPanel',
		activeTab : 0,
		region : 'center',
		items : [ materialQuotaView.tabs() ]
	});
	//上传文件菜单项
	var menuFile = new Ext.menu.Menu();
	menuFile.add( {
		text : '材料定额',
		handler : function() {
			materialQuotaAction.upload();
		}
	});
	menuFile.add('separator');
	menuFile.add( {
		text : '成品清单定额',
		handler : function() {
			inventoryAction.exlType = '1';
			inventoryAction.upload('成品清单定额');
		}
	});
	menuFile.add('separator');
	menuFile.add( {
		text : '备件清册',
		handler : function() {
			inventoryAction.exlType = '2';
			inventoryAction.upload('备件清册');
		}
	});
	menuFile.add('separator');
	menuFile.add( {
		text : '设备清册',
		handler : function() {
			inventoryAction.exlType = '3';
			inventoryAction.upload('设备清册');
		}
	});
	menuFile.add('separator');
	menuFile.add( {
		text : '工具清册',
		handler : function() {
			inventoryAction.exlType = '4';
			inventoryAction.upload('工具清册');
		}
	});
	menuFile.add('separator');
	menuFile.add( {
		text : '标准件清册',
		handler : function() {
			inventoryAction.exlType = '5';
			inventoryAction.upload('标准件清册');
		}
	});
	var northPanel = new Ext.Panel( {
		id : 'northPanel',
		layout : 'border',
		height : 30,
		split : true, 
		region : 'center',
		items : [ equipTree.init(),centerPanel]/*,
		tbar : [ {
			text : '导入文件',
			iconCls : 'Import',
			extype : 'button',
			menu : menuFile,
			id : 'tbar'
		} ]*/
	});
	var viewport = new Ext.Viewport( { // 页面布局
		id : 'mianViewPanel',
		layout : 'fit',
		activeTab : 0,
		items : [ northPanel ] 
	});
	

	viewport.doLayout();
};

Ext.onReady(materialQuotaMain.init, materialQuotaMain, true);