var librarianMain = {}

librarianMain.item = function() {
	var style = "margin-left:30px;font-size:13;line-height:150%;";
	var menuItem1 = new Ext.menu.Item({
		id : "librarianInfo",
		cls : 'menu-ye',
		activeClass:'menu-ye',
		style : style+'margin-top:10px;',
		text : '图书期刊管理',
		handler:function(){
			librarianMain.getLibrarianMain(this.id);
		}
	});
	var menuItem2 = new Ext.menu.Item({
		id : "librarianManger",
		cls : 'menu-ye',
		activeClass:'menu-ye',
		style : style,
		text : '借阅管理',
		handler:function(){
			librarianMain.getLibrarianMain(this.id);
		}
	});
	var panel = new Ext.Panel({
		title:"资料栏",
		region:"west",
		width:240,
		collapsible:true,
		items:[menuItem1,menuItem2]
	});
	return panel;
};

//面板初始化
librarianMain.init = function() {
	Ext.QuickTips.init();
	var vp = new Ext.Viewport({
		layout:"border",
		id:'vp',
		border:false,
		items:[librarianMain.item(),librarianMain.tabPanel()]
	});
}
//创建tabpanel
librarianMain.tabPanel = function() {
	var tabPanel = new Ext.TabPanel({
		id : 'tabPanel',
		region : 'center',
		activeTab : 1,
		items : [librarianInfo.inForm(),lirarianAttribute.inGrid(librarianInfo.tbar)]
	})
	return tabPanel;
}
//初始化
librarianMain.initDatumManger = function(items,activeId){
	var tabpanel = Ext.getCmp("tabPanel");
	tabpanel.removeAll();
	tabpanel.add(items);
	tabpanel.setActiveTab(activeId);
	tabpanel.doLayout();
}

//点击资料栏内的item
librarianMain.getLibrarianMain = function(id){
	var items;
	if(id == "librarianInfo"){//图书期刊管理
		items = [librarianInfo.inForm(),lirarianAttribute.inGrid(librarianInfo.tbar)];
	} else if(id == "librarianManger"){//借阅管理
		//加载列表数据
		var grid = lirarianAttribute.inGrid(librarianManger.tbar);
		grid.setTitle("借阅管理");
		items = [grid,librarianReader.readerMangerPanel(),librarianBook.bookMangerPanel()];
		lirarianAttribute.obj = null;
	} 
	librarianMain.initDatumManger(items,"materialGridId");//初始化右边
}
Ext.onReady(librarianMain.init, librarianMain, true);
