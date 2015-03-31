var huiyijiy = {grid:null,colModel:null,ds:null,tb:null};

huiyijiy.getColModel = function(){
	huiyijiy.colModel = new Ext.grid.ColumnModel([
		{
			header: ""+getResource('resourceParam1352')+"",
			width: 100,
			dataIndex: 'huiyzhut'},
		{
			header: ""+getResource('resourceParam458')+"",
			width: 100,
			dataIndex: 'hyguanjz'},
		{
			header: ""+getResource('resourceParam1269')+"",
			width: 100,
			dataIndex: 'kaisriqi'},
		{
			header: ""+getResource('resourceParam1270')+"",
			width: 100,
			dataIndex: 'jiesriqi'},
		{
			header:"主持人",
			width:100,
			dataIndex: 'zhuchren'},
		{
			header: ""+getResource('resourceParam1113')+"",
			width: 100,
			dataIndex: 'canjreny'}
	]);
};
huiyijiy.getDataStore = function(){
	var url ="../JSON/d2dwork_huiyijiy_HuiyijiyService.getGrid";
	var proxy = new Ext.data.HttpProxy({
			url: url
		});
	var reader = new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalProperty'
            },
            [   
            	'huiyjyId',
            	'huiyzhut',
            	'hyguanjz',
            	'kaisriqi',
            	'jiesriqi',
            	'zhuchren',
            	'canjreny',
            	'hyneirng',
            	'tianzhId',
            	'tianzhrq',
            	'fujiangs'
        	]);
  var ascid = 'huiyzhut';
  var ascstr = 'descr';
  huiyijiy.ds = new data.Store(proxy,reader,ascid,ascstr);
};
huiyijiy.gettb = function(){
huiyijiy.tb = [
	'-',
	{
		text:''+getResource('resourceParam477')+'',
		iconCls:'menu-add',
		tooltip:{title:''+getResource('resourceParam477')+''+getResource('resourceParam736')+'纪要',text:''+getResource('resourceParam466')+'一个'+getResource('resourceParam736')+'纪要'},
		handler:huiyijiyAdd.init
		},
	
	'-',
	{
		text:''+getResource('resourceParam478')+'',
		iconCls:'menu-updata',
		tooltip:{title:''+getResource('resourceParam1227')+'纪要',text:''+getResource('resourceParam478')+'一个'+getResource('resourceParam736')+'纪要'},
		handler:huiyijiyUpdate.init
		},
	
	'-',
	{
		text:''+getResource('resourceParam652')+'',
		iconCls:'user-select',
		tooltip:{title:''+getResource('resourceParam1225')+'纪要',text:''+getResource('resourceParam652')+'一个'+getResource('resourceParam736')+'纪要'},
		handler:huiyijiyQuery.init
		},
		
	'-',
	{
		text:''+getResource('resourceParam475')+'',
		iconCls:'menu-delete',
		tooltip:{title:''+getResource('resourceParam475')+''+getResource('resourceParam736')+'纪要',text:''+getResource('resourceParam475')+'一个'+getResource('resourceParam736')+'纪要'},
		handler:huiyijiyRemove.init
		},
	'-',
	{
		text:''+getResource('resourceParam576')+'',
		iconCls:'user-select',
		tooltip:{title:''+getResource('resourceParam576')+''+getResource('resourceParam736')+'纪要',text:''+getResource('resourceParam576')+'一个'+getResource('resourceParam736')+'纪要'+getResource('resourceParam498')+'内容'},
		handler:huiyijiyView.init
		}];
};
huiyijiy.addgrid = function(){
	huiyijiy.getColModel();
	huiyijiy.getDataStore();
	huiyijiy.gettb();
	huiyijiy.getpanel();
	var sm = new Ext.grid.RowSelectionModel({singleSelect:true});
	huiyijiy.grid = myGrid.init(huiyijiy.ds,huiyijiy.colModel,huiyijiy.tb,sm);
	huiyijiy.loadvalue();
};

huiyijiy.getpanel = function(){
	Ext.QuickTips.init();
	huiyijiy.panel = new Ext.Panel({
		id:'huiyijiypanel',
		region:'center',
		layout:'fit',
		height:540,
		split:true,
		collapsible:true,
		margins:'0 5 5 0'
	});
};
huiyijiy.loadvalue = function(){
	var viewport = new Ext.Viewport({
	layout:'border',
	items:[
		huiyijiy.panel
		]
		
	});
	huiyijiy.panel.add(huiyijiy.grid);
	huiyijiy.panel.doLayout();
	myGrid.loadvalue(huiyijiy.grid.store,{start:0,limit:25},huiyijiy.baseargs);
};
Ext.onReady(huiyijiy.addgrid,huiyijiy,true);	
