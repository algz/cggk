
/**
 * 型号列表
 */
var modelsMain = {modelspanel:null,modelsgrid:null,
				args:{start:0,limit:25},baseargs:null};

modelsMain.grid = function(){
  var strurl = '../JSON/maintenance_models_ModelsService.getStatusList';
  var proxy = new Ext.data.HttpProxy({
            url: strurl
        });
  var reader = new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalProperty',
            id: 'modelid'
        }, [
            'modelid','modelname','description'
        ]);
  var ascid = 'modelid';
  var ascstr = 'asc';
  var ds = new data.Store(proxy,reader,ascid,ascstr);


  var sm = new Ext.grid.RowSelectionModel({singleSelect:true});
  
  var cm = new Ext.grid.ColumnModel({
	defaults: {
        sortable: false,
        menuDisabled: true
    },
	columns : [{
		id: 'modelid',
		header: "型号"+getResource('resourceParam461')+"",
		dataIndex: 'modelid',
		width: 80
	},{
		header: "型号"+getResource('resourceParam480')+"",
		dataIndex: 'modelname',
		width: 100
	},{
		header: "型号"+getResource('resourceParam648')+"",
		dataIndex: 'description',
		width: 200
	}]
  });

  var tb=[
  	'-',
  	{
  		text:''+getResource('resourceParam477')+'型号',
    	iconCls: 'priv-add',
    	tooltip: {title:''+getResource('resourceParam477')+'型号',text:''+getResource('resourceParam647')+'一个新的型号'},
    	handler:modelsAdd.init
    	
  	},
  	'-',
  	{
  		//enableToggle:true,
        text:''+getResource('resourceParam478')+'型号',
        
        iconCls: 'priv-edit',
        tooltip: {title:''+getResource('resourceParam478')+'型号',text:''+getResource('resourceParam478')+'选中的型号'},
        handler: modelsUpdate.init
        
  	},
  	'-',
  		{
  		//enableToggle:true,
        text:''+getResource('resourceParam475')+'型号',
        
        iconCls: 'priv-del',
        tooltip: {title:''+getResource('resourceParam475')+'型号',text:''+getResource('resourceParam475')+'选中的型号'},
        handler: modelDelete.init
        
  	},
  	'-'];
  var grid = myGrid.init(ds,cm,tb,sm);
  return grid;
}
modelsMain.init = function(){
	Ext.QuickTips.init();
	
	modelsMain.modelspanel = new Ext.Panel({
		 id:'modelspanel',
		 layout:'fit',
		 border:false,
		 region:'center',
		 titlebar: false,
		 autoScroll:true,
         margins:'0 5 5 0'
	
	});
	var viewport = new Ext.Viewport({		//页面布局
        layout:'border',					//布局模式
        items:[
	       	modelsMain.modelspanel
        ]
        
    });
	modelsMain.modelsgrid = modelsMain.modelspanel.add(modelsMain.grid());
	modelsMain.modelspanel.doLayout();
	myGrid.loadvalue(modelsMain.modelsgrid.store,modelsMain.args,modelsMain.baseargs);
}
Ext.onReady(modelsMain.init,modelsMain,true);
