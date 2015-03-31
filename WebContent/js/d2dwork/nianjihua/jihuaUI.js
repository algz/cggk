var planUI = {
	grid: null
};

planUI.init = function(){
	//先初始化标签页
	planUI.gridInit();
	//最后初始化布局
	planUI.vpInit();
}

//布局初始化
planUI.vpInit = function(){
	planUI.vp = new Ext.Viewport({
		layout: 'border',
		items:planUI.pan
	});
}

//grid的初始化
planUI.gridInit = function(){

	//周--数据源和显示方式的初始化
	planAjax.ds_init('../JSON/d2dwork_nianjihua_NianjihuaSvr.getGridForJihua');
	planOther.init();
	//构造grid
	planUI.grid = myGrid.init(planAjax.ds, planOther.cm, planOther.tb, planOther.sm);
	//加载grid的数据
	planAjax.baseargs = {
		type: '0'
	};
	myGrid.loadvalue(planAjax.ds, planAjax.args, planAjax.baseargs);
	
	planUI.pan = new Ext.Panel({
		region: 'center',
		layout: 'fit',
		items: planUI.grid
	});
}
