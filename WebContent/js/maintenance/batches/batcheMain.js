
/**
 * 批次列表
 */
var batcheMain = {batchepanel:null,batchegrid:null,
				args:{start:0,limit:25},baseargs:null};

batcheMain.grid = function(){
  var strurl = '../JSON/maintenance_batche_BatcheService.getbatcheList';
  var proxy = new Ext.data.HttpProxy({
            url: strurl
        });
  var reader = new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalProperty',
            id: 'batchid'
        }, [
            'batchid','batchname','description',
            'model','modelname','modelBatcheid'
        ]);
  var ascid = 'batchid';
  var ascstr = 'asc';
  var ds = new data.Store(proxy,reader,ascid,ascstr);


  var sm = new Ext.grid.RowSelectionModel({singleSelect:true});
  
  var cm = new Ext.grid.ColumnModel({
	defaults: {
        sortable: false,
        menuDisabled: true
    },
	columns : [{
		id: 'batchid',
		header: "批次"+getResource('resourceParam461')+"",
		dataIndex: 'batchid',
		width: 80
	},{
		header: "批次"+getResource('resourceParam480')+"",
		dataIndex: 'batchname',
		width: 100
	},{
		header: "型号",
		dataIndex: 'modelname',
		width: 100
	},{
		header: "批次"+getResource('resourceParam648')+"",
		dataIndex: 'description',
		width: 300
	}]
  });

  var tb=[
  	'-',
  	{
  		text:''+getResource('resourceParam477')+'批次',
    	iconCls: 'priv-add',
    	tooltip: {title:''+getResource('resourceParam477')+'批次',text:''+getResource('resourceParam647')+'一个新的批次'},
    	handler:batcheAdd.init
    	
  	},
  	'-',
  	{
  		//enableToggle:true,
        text:''+getResource('resourceParam478')+'批次',
        
        iconCls: 'priv-edit',
        tooltip: {title:''+getResource('resourceParam478')+'批次',text:''+getResource('resourceParam478')+'选中的批次'},
        handler: batcheUpdate.init
        
  	},
  	'-',
  	{
  		//enableToggle:true,
        text:''+getResource('resourceParam652')+'批次',
        
        iconCls: 'priv-select',
        tooltip: {title:''+getResource('resourceParam652')+'批次',text:''+getResource('resourceParam1780')+''},
        handler: batcheSelect.init
        
  	},
  	'-'];
  var grid = myGrid.init(ds,cm,tb,sm);
  return grid;
}
batcheMain.init = function(){
	Ext.QuickTips.init();
	
	batcheMain.batchepanel = new Ext.Panel({
		 id:'batchepanel',
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
	       	batcheMain.batchepanel
        ]
        
    });
	batcheMain.batchegrid = batcheMain.batchepanel.add(batcheMain.grid());
	batcheMain.batchepanel.doLayout();
	myGrid.loadvalue(batcheMain.batchegrid.store,batcheMain.args,batcheMain.baseargs);
}
Ext.onReady(batcheMain.init,batcheMain,true);
