var materialMain = {}

materialMain.item = function() {
	var style = "margin-left:30px;font-size:13;line-height:150%;";
	var menuItem1 = new Ext.menu.Item({
		id : "datumManger",
		cls : 'menu-ye',
		activeClass:'menu-ye',
		style : style+'margin-top:10px;',
		text : '资料管理',
		handler:function(){
			materialMain.getMaterialMain("datumManger");
		}
	});
	var menuItem2 = new Ext.menu.Item({
		id : "outDatumManger",
		cls : 'menu-ye',
		activeClass:'menu-ye',
		style : style,
		text : '作废资料管理',
		handler:function(){
			materialMain.getMaterialMain("outDatumManger");
		}
	});
	var menuItem3 = new Ext.menu.Item({
		id : "directory",
		cls : 'menu-ye',
		activeClass:'menu-ye',
		style : style,
		text : '卷内目录',
		handler:function(){
			materialMain.getMaterialMain("directory");
		}
	});
	
	var panel = new Ext.Panel({
		title:"资料栏",
		region:"west",
		layout:'form',
		width:240,
		collapsible:true,
		items:[menuItem1,menuItem2,menuItem3]
	});
	return panel;
};

materialMain.init = function() {
	Ext.QuickTips.init();
	var vp = new Ext.Viewport({
		layout:"border",
		id:'vp',
		border:false,
		items:[materialMain.item(),materialMain.tabPanel()]
	});
	//getMaterialMain("datumManger");//初始化右边
}
//创建tabpanel
materialMain.tabPanel = function() {
	var tabPanel = new Ext.TabPanel({
		id : 'tabPanel',
		region : 'center',
		activeTab : 1,
		items : [materialManger.inForm(),materialManger.inGrid()]
	})
	return tabPanel;
}

//初始化资料管理
materialMain.initDatumManger = function(items,activeId){
	var tabpanel = Ext.getCmp("tabPanel")
	tabpanel.removeAll();
	tabpanel.add(items);
	tabpanel.setActiveTab(activeId);
	tabpanel.doLayout();
}

//点击资料栏内的item
materialMain.getMaterialMain = function(id){
	var items;
	if(id == "datumManger"){
		items = [materialManger.inForm(),materialManger.inGrid()];
		materialMain.initDatumManger(items,"materialGridId");
	} else if(id == "outDatumManger"){
		//加载列表数据
		items = [materialOutManger.outForm(),materialOutManger.outGrid()];
		materialMain.initDatumManger(items,"materialOutFrom");//初始化右边
	} else if(id == "directory"){
		materialMain.initDatumManger(materialDir.gridpanel(),"materialDirGridId");
	}
}
Ext.onReady(materialMain.init, materialMain, true);
