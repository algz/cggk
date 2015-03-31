var mgrsystem = {grid:null,colModel:null,ds:null,tb:null};
//生成列表
mgrsystem.getColModel = function(){
	mgrsystem.colModel = new Ext.grid.ColumnModel([
		{
			header: "子"+getResource('resourceParam559')+"ID",
			width: 100,
			dataIndex: 'subSystemId'},
		{
			header: "子"+getResource('resourceParam559')+""+getResource('resourceParam480')+"",
			width: 100,
			dataIndex: 'name'},
		{
			header: "子"+getResource('resourceParam559')+""+getResource('resourceParam648')+"",
			width: 100,
			dataIndex: 'descr'}					
	]);
};
mgrsystem.getDataStore = function(){
	var url = "../data/mgrsystem/sysgrid.txt";
	var proxy = new Ext.data.HttpProxy({
            url: url
        });
  	var reader = new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalProperty',
            id: 'subSystemId'},
            ['subSystemId',
            	'name',
            	'descr'
        	]);
  var ascid = 'subSystemId';
  var ascstr = 'descr';
  mgrsystem.ds = new data.Store(proxy,reader,ascid,ascstr);
};
mgrsystem.gettb = function(){
mgrsystem.tb=[
  	'-',
  	{
  		text:''+getResource('resourceParam477')+'子'+getResource('resourceParam559')+'',
    	iconCls: 'addsystem',
    	tooltip: {title:''+getResource('resourceParam477')+'子'+getResource('resourceParam559')+'',text:''+getResource('resourceParam647')+'一个子'+getResource('resourceParam559')+''},
    	handler: addsystem.init
    	
  	},
  		
  	'-',
  	{
  		text:''+getResource('resourceParam478')+'子'+getResource('resourceParam559')+'',
    	iconCls: 'updatasystem',
    	tooltip: {title:''+getResource('resourceParam478')+'子'+getResource('resourceParam559')+'',text:''+getResource('resourceParam478')+'一个子'+getResource('resourceParam559')+''},
    	handler: updatesystem.init
        
  	},
  	'-',
  	{
  		text:''+getResource('resourceParam475')+'子'+getResource('resourceParam559')+'',
    	iconCls: 'delsystem',
    	tooltip: {title:''+getResource('resourceParam475')+'子'+getResource('resourceParam559')+'',text:''+getResource('resourceParam475')+'一个子'+getResource('resourceParam559')+''},
    	handler: delsystem.init

  	},
  	'-',
  	{
  		text:''+getResource('resourceParam652')+'子'+getResource('resourceParam559')+'',
    	iconCls: 'searchsystem',
    	tooltip: {title:''+getResource('resourceParam652')+'子'+getResource('resourceParam559')+'',text:''+getResource('resourceParam652')+'子'+getResource('resourceParam559')+''},
    	handler: searchsystem.init
  	}];
};
mgrsystem.addgrid = function(){
	mgrsystem.getColModel();
	mgrsystem.getDataStore();
	mgrsystem.gettb();
	mgrsystem.getpanel();
	var sm = new Ext.grid.RowSelectionModel({singleSelect:true});
	mgrsystem.grid = myGrid.init(mgrsystem.ds,mgrsystem.colModel,mgrsystem.tb,sm);
	mgrsystem.loadvalue();
};

mgrsystem.getpanel = function(){
	Ext.QuickTips.init();
	mgrsystem.panel = new Ext.Panel({		//定义panel面板中显示的信息
         id:'mgrsystempanel',
         region:'center',
		 layout:'fit',
		 height:540,
         split:true,
		 collapsible: true,
         margins:'0 5 5 0'
    }); 
}; 
mgrsystem.loadvalue = function(){
	var viewport = new Ext.Viewport({		//页面布局
        layout:'border',					//布局模式
        items:[
	       	mgrsystem.panel
        ]
        
    });
	mgrsystem.panel.add(mgrsystem.grid);
	mgrsystem.panel.doLayout();	
	myGrid.loadvalue(mgrsystem.grid.store,{start:0,limit:25},mgrsystem.baseargs);
};
Ext.onReady(mgrsystem.addgrid,mgrsystem,true);
