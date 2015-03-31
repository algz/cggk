var baowenUI = {};

baowenUI.init = function(){
	//先初始化标签页
	baowenUI.tabInit();
	//最后初始化布局
	baowenUI.vpInit();
}

//布局初始化
baowenUI.vpInit = function(){
	baowenUI.vp = new Ext.Viewport({
		layout: 'border',
		items:baowenUI.tab
	});
}

//标签页的初始化
baowenUI.tabInit = function(){

	
	
	
	//构造标签页
	baowenUI.tab = new Ext.TabPanel({
		region:'center',									//渲染延迟
		layoutOnTabChange:true,
		autoTabs:true,												
		activeTab:0,
		items: [{
			title: ''+getResource('resourceParam463')+'类',
			layout: 'fit',
			items: grid_week()
		},{
			title: ''+getResource('resourceParam6025'), // 运维类
			layout: 'fit',
			items: grid_month()
		}]
	});
}

function grid_week(){
	//项目类--数据源和显示方式的初始化
	baowenAjax.ds_week_init("../JSON/d2dwork_zhoubaowen_ZhoubaowenSvr.getGridForZhoubaowen");
	baowenOther.week_init();
	//构造grid
	baowenUI.grid_week = myGrid.init(baowenAjax.ds_week, baowenOther.cm_week, baowenOther.tb_week, baowenOther.sm_week);
	baowenAjax.baseargs = {
		type:'0'
	}
	//加载grid的数据
	myGrid.loadvalue(baowenAjax.ds_week, baowenAjax.args, baowenAjax.baseargs);
	
	return baowenUI.grid_week; 
}

function grid_month(){
	//运维类--数据源和显示方式的初始化
	baowenAjax.ds_month_init("../JSON/d2dwork_zhoubaowen_ZhoubaowenSvr.getGridForZhoubaowen");
	baowenOther.month_init();
	//构造grid
	baowenUI.grid_month = myGrid.init(baowenAjax.ds_month, baowenOther.cm_month, baowenOther.tb_month, baowenOther.sm_month);
	baowenAjax.baseargs = {
		type:'1'
	}
	//加载grid的数据
	myGrid.loadvalue(baowenAjax.ds_month, baowenAjax.args, baowenAjax.baseargs);
	
	return baowenUI.grid_month;
}
