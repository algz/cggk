Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var subsystem = {grid:null,colModel:null,ds:null,tb:null,baseargs:null};
//生成列表
subsystem.getColModel = function(){
	subsystem.colModel = new Ext.grid.ColumnModel([
		{
			header: "子"+getResource('resourceParam559')+"ID",
			width: 100,
			dataIndex: 'subSystemId'},
		{
			header: "子"+getResource('resourceParam559')+""+getResource('resourceParam480')+"",
			width: 100,
			dataIndex: 'systemName'},
		{
			header: "子"+getResource('resourceParam559')+""+getResource('resourceParam648')+"",
			width: 100,
			dataIndex: 'strdescr'}			
	]);
};
subsystem.getDataStore = function(){
	var url = "../JSON/base_subsystem_SubSystemSerivce.getGrid";
	var proxy = new Ext.data.HttpProxy({
            url: url
        });
  	var reader = new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalProperty',
            id: 'subSystemId'},
            ['subSystemId',
            	'systemName',
            	'descr',
            	'strdescr',
            	'menuroot',
            	'menuname'
        	]);
  var ascid = 'subSystemId';
  var ascstr = 'desc';
  subsystem.ds = new data.Store(proxy,reader,ascid,ascstr);
};
subsystem.gettb = function(){
subsystem.tb=[
  	'-',
  	{
  		text:''+getResource('resourceParam477')+'子'+getResource('resourceParam559')+'',
    	iconCls: 'subsystem-add',
    	tooltip: {title:''+getResource('resourceParam477')+'子'+getResource('resourceParam559')+'',text:''+getResource('resourceParam477')+'子'+getResource('resourceParam559')+''},
    	handler: addsubsystem.addsubsystem
  	},
  	'-',
  	{
  		text:''+getResource('resourceParam478')+'子'+getResource('resourceParam559')+'',
    	iconCls: 'subsystem-updata',
    	tooltip: {title:''+getResource('resourceParam478')+'子'+getResource('resourceParam559')+'',text:''+getResource('resourceParam478')+'子'+getResource('resourceParam559')+''},
    	handler: updatasubsystem.updatasubsystem
  	},
  	'-',
  	{
  		text:''+getResource('resourceParam475')+'子'+getResource('resourceParam559')+'',
    	iconCls: 'subsystem-delete',
    	tooltip: {title:''+getResource('resourceParam475')+'子'+getResource('resourceParam559')+'',text:''+getResource('resourceParam475')+'子'+getResource('resourceParam559')+''},
    	handler: deletesubsystem.deletesubsystem
  	},
  	'-',
  	{
  		text:''+getResource('resourceParam652')+'子'+getResource('resourceParam559')+'',
    	iconCls: 'user-select',
    	tooltip: {title:''+getResource('resourceParam652')+'子'+getResource('resourceParam559')+'',text:''+getResource('resourceParam652')+'子'+getResource('resourceParam559')+''},
    	handler: findsubsystem.findesubsystem
  	}];
};
subsystem.addgrid = function(){
	subsystem.getColModel();
	subsystem.getDataStore();
	subsystem.gettb();
	subsystem.getpanel();
	var sm = new Ext.grid.RowSelectionModel({singleSelect:true});
	subsystem.grid = myGrid.init(subsystem.ds,subsystem.colModel,subsystem.tb,sm);
	subsystem.loadvalue();
};

subsystem.getpanel = function(){
	Ext.QuickTips.init();
	subsystem.panel = new Ext.Panel({		//定义panel面板中显示的信息
         id:'subsystempanel',
         region:'center',
		 layout:'fit',
		 height:540,
         split:true,
		 collapsible: true,
         margins:'0 5 5 0'
    }); 
}; 
subsystem.loadvalue = function(){
	var viewport = new Ext.Viewport({		//页面布局
        layout:'border',					//布局模式
        items:[
	       	subsystem.panel
        ]
        
    });
    myGrid.row = null;
	subsystem.panel.add(subsystem.grid);
	subsystem.panel.doLayout();	
	myGrid.loadvalue(subsystem.grid.store,{start:0,limit:25},subsystem.baseargs);
};
Ext.onReady(subsystem.addgrid,subsystem,true);
