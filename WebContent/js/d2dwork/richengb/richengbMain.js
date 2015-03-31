/**
 * 日程管理模块的界面类
 * 游松
 * 2008-3-2
 */
var richengbMain = {};

//定义左边的父面板的南子面板
richengbMain.getSChildPanel = function() {
	richengbMain.sChildPanel = new Ext.Panel( {
		title : ''+getResource('resourceParam1668')+'',
		split : true,
		border : false,
		height : 420,
		width : 520,
		collapsible : true,
		items : richengbFormUI.form
	})
}

//定义左边的父面板.
richengbMain.getParentPanel = function() {
	richengbMain.parentPanel = new Ext.Panel( {
		//title : '父面板',
		split : true,
		border : false,
		region : 'west',
		collapsible : false,
		width : 520,
		height : 768,
		minWidth : 520,
		maxWidth : 520,
		items : [richengbMain.nPanel,richengbMain.sChildPanel]
	})
}

//定义左边的父面板的北子面板
richengbMain.getNPanel = function(){
	richengbMain.nPanel = new Ext.Panel( {
		title : '' + getResource('resourceParam6057'), // 北子面板
		id : 'rli',
		split : true,
		border : false,
		collapsible : true
	});
}

//首先加载的方法
richengbMain.init = function() {
	richengbGridUI.addGrid();
	richengbFormUI.getForm();
	richengbMain.getNPanel();
	richengbMain.getSChildPanel();
	richengbMain.getParentPanel();
	
	var viewport = new Ext.Viewport( {
		layout : 'border',
		items : [richengbMain.parentPanel,{
			title : ''+getResource('resourceParam1669')+'',
			region : 'center',
			split : true,
			border : false,
			collapsible : false,
			layout : 'fit',
			items: richengbGridUI.grid 
		}]
	});
	//建立日历控件需要的div
	document.getElementById("rli").innerHTML = "<div style='height:220px;' id='calendar_contain'></div>";
	//初始化日历控件
	var date = new Date();
	Calendar.difference(date.getFullYear(),date.getMonth(),date.getDay());
	viewport.doLayout();
}



Ext.onReady(richengbMain.init, richengbMain, true);
