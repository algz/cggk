Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var meetingtypeMain = {
	grid : null,
	colModel : null,
	ds : null,
	tb : null,
	baseargs : null
};

// 生成列表
meetingtypeMain.addgrid = function() {
	meetingtypeMain.getpanel();
	var sm = new Ext.grid.RowSelectionModel( {
		singleSelect : true
	});
	meetingtypeMain.grid = meetingtypeGrid.grid();
	meetingtypeMain.loadvalue();
};

meetingtypeMain.getpanel = function() {
	Ext.QuickTips.init();
	meetingtypeMain.panel = new Ext.Panel( { // 定义panel面板中显示的信息
		id : 'meetingtypeMainpanel',
		region : 'center',
		layout : 'fit',
		height : 540,
		split : true,
		collapsible : true,
		margins : '0 5 5 0'
	});
};
meetingtypeMain.loadvalue = function() {
	var viewport = new Ext.Viewport( { // 页面布局
		layout : 'border', // 布局模式
		items : [ meetingtypeMain.panel ]
	});
	myGrid.row = null;
	meetingtypeMain.panel.add(meetingtypeMain.grid);
	meetingtypeMain.panel.doLayout();
	myGrid.loadvalue(meetingtypeMain.grid.store, {
		start : 0,
		limit : 25
	}, meetingtypeMain.baseargs);
};

Ext.onReady(meetingtypeMain.addgrid, meetingtypeMain, true);
