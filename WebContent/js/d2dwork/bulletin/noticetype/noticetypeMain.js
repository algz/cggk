Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';

var noticetypeMain = {
	grid : null,
	colModel : null,
	ds : null,
	tb : null,
	baseargs : null
};

// 生成列表
noticetypeMain.addgrid = function() {
	noticetypeMain.getpanel();
	var sm = new Ext.grid.RowSelectionModel( {
		singleSelect : true
	});
	noticetypeMain.grid = noticetypeGrid.grid();
	noticetypeMain.loadvalue();
};

noticetypeMain.getpanel = function() {
	Ext.QuickTips.init();
	noticetypeMain.panel = new Ext.Panel( { // 定义panel面板中显示的信息
		id : 'noticetypeMainpanel',
		region : 'center',
		layout : 'fit',
		height : 540,
		split : true,
		collapsible : true,
		margins : '0 5 5 0'
	});
};
noticetypeMain.loadvalue = function() {
	var viewport = new Ext.Viewport( { // 页面布局
		layout : 'border', // 布局模式
		items : [ noticetypeMain.panel ]

	});
	myGrid.row = null;
	noticetypeMain.panel.add(noticetypeMain.grid);
	noticetypeMain.panel.doLayout();
	myGrid.loadvalue(noticetypeMain.grid.store, {
		start : 0,
		limit : 25
	}, noticetypeMain.baseargs);
};

Ext.onReady(noticetypeMain.addgrid, noticetypeMain, true);
