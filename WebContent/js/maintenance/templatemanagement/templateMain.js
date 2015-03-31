

var templateMain = {
	args : {
		start : 0,
		limit : 25
	},
	baseargs : {
		status : -1
	}
};
templateMain.toWBS = function toWBS(id) {
	wbsdata.nodeId = 'w' + id;
	wbsdata.refresh();
	templateMain.mainPanel.getLayout().setActiveItem(1);
};

templateMain.init = function() {
	Ext.lib.Ajax.defaultPostHeader += ";charset=utf-8";// 设置默认编码为utf-8
	Ext.QuickTips.init();
	function backToMain() {
		myGrid.loadvalue(templateMain.gridPanel.store, templateMain.args,
			templateMain.baseargs);
		templateMain.mainPanel.getLayout().setActiveItem(0);
	}
	templateMain.gridPanel = templateGrid.init();
	templateMain.wbsPanel = wbsdata.init();
	templateMain.approvalPanel = approvePanel.init(null, "wwwww",
			"TemplateDataType", backToMain, ""+getResource('resourceParam943')+""+getResource('resourceParam1826')+"",backToMain);

	templateMain.privilegeSet = setDataPrivilege.init();

	templateMain.wbsPanel.getTopToolbar().add({
				text : ''+getResource('resourceParam944')+'',
				handler : backToMain
			});
	templateMain.mainPanel = new Ext.Panel({
				layout : 'card',
				border : false,
				region : 'center',
				titlebar : false,
				autoScroll : true,
				activeItem : 0,
				margins : '0 5 5 0',
				items : [templateMain.gridPanel, templateMain.wbsPanel,
						templateMain.approvalPanel,templateMain.privilegeSet]

			});
	var viewport = new Ext.Viewport({ // 页面布局
		layout : 'border', // 布局模式
		items : [templateMain.mainPanel]

	});
	myGrid.loadvalue(templateMain.gridPanel.store, templateMain.args,
			templateMain.baseargs);
}
Ext.onReady(templateMain.init, templateMain, true);
