

var siteMgrMain = {};

var type;
siteMgrMain.init = function() {

	Ext.QuickTips.init();

	siteMgrMain.centerPanel = new Ext.TabPanel({
				activeTab : 0,
				plain : true,
				border : true,
				tabPosition : 'top',
				id : 'centerpanel',
				deferredRender : true,
				animScroll : true,
				enableTabScroll : true,
				region : 'center',
				items : [tablePanel.tabInput(), tablePanel.tabList()]
			});

	var viewport = new Ext.Viewport({ // 页面布局
		layout : 'border',
		items : [{
			region : 'west',
			title : '现场问题栏',
			width : 280,
			height : 500,
			collapsible : true,
			split : true,
			layout : 'fit',
			html : '<A HREF="javascript:openDocInput()"><IMG SRC="../customize/cac/images/doc.png"><FONT COLOR="#330000">书面正式文档处理</FONT></A><BR>'
					+ '<A HREF="javascript:openProblem()"><IMG SRC="../customize/cac/images/problem2.png"><FONT COLOR="#330000">生产试制现场问题处理</FONT></A>'
		}, [siteMgrMain.centerPanel]]
	});
	viewport.doLayout();
}

Ext.onReady(siteMgrMain.init, siteMgrMain, true);
