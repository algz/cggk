Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var newstypeMain = {
	grid : null,
	colModel : null,
	ds : null,
	tb : null,
	baseargs : null
};
// 生成列表
newstypeMain.addgrid = function() {
	newstypeMain.getpanel();
	var sm = new Ext.grid.RowSelectionModel( {
		singleSelect : true
	});
	newstypeMain.grid = newstypeGrid.grid();
	newstypeMain.loadvalue();
};

newstypeMain.getpanel = function() {
	Ext.QuickTips.init();
	newstypeMain.panel = new Ext.Panel( { // 定义panel面板中显示的信息
		id : 'newstypeMainpanel',
		region : 'center',
		layout : 'fit',
		height : 540,
		split : true,
		collapsible : true,
		margins : '0 5 5 0'
	});
};

newstypeMain.loadvalue = function() {
	var viewport = new Ext.Viewport( { // 页面布局
		layout : 'border', // 布局模式
		items : [ newstypeMain.panel ]
	});
	myGrid.row = null;
	newstypeMain.panel.add(newstypeMain.grid);
	newstypeMain.panel.doLayout();
	myGrid.loadvalue(newstypeMain.grid.store, {
		start : 0,
		limit : 25
	}, newstypeMain.baseargs);
};
Ext.onReady(newstypeMain.addgrid, newstypeMain, true);
