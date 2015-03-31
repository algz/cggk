var libraryMain = {

}

libraryMain.init = function() {
	Ext.QuickTips.init();
	
	libraryMain.centerPanle = new Ext.Panel({
				region : 'center',
				// collapsible : true,
				id : 'centerpanel',
				split : true,
				layout : 'fit',
				items : []
			});
	var viewport = new Ext.Viewport({ // 页面布局
		layout : 'border',

		items : [{
					region : 'west',
					width : 400,
					height : 500,
					collapsible : true,
					split : true,
					layout : 'fit',
					items : [libraryList.grid()]
				}, libraryMain.centerPanle]

	});
	viewport.doLayout();

}
Ext.onReady(libraryMain.init, libraryMain, true);
