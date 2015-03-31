
/**
 * 任务状态列表
 */
var statusMain = {statuspanel:null,statusgrid:null,
				args:{start:0,limit:25},baseargs:null};

statusMain.grid = function(){
  var strurl = '../JSON/maintenance_taskStatus_TaskStatusService.getStatusList';
  var proxy = new Ext.data.HttpProxy({
            url: strurl
        });
  var reader = new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalProperty',
            id: 'taskstatusid'
        }, [
            'taskstatusid','taskstatusname','taskstatusnotes'
        ]);
  var ascid = 'taskstatusid';
  var ascstr = 'asc';
  var ds = new data.Store(proxy,reader,ascid,ascstr);


  var sm = new Ext.grid.RowSelectionModel({singleSelect:true});
  
  var cm = new Ext.grid.ColumnModel({
	defaults: {
        sortable: false,
        menuDisabled: true
    },
	columns : [{
		id: 'taskstatusid',
		header: ""+getResource('resourceParam1823')+"",
		dataIndex: 'taskstatusid',
		width: 80
	},{
		header: ""+getResource('resourceParam1819')+"",
		dataIndex: 'taskstatusname',
		width: 100
	},{
		header: ""+getResource('resourceParam1820')+"",
		dataIndex: 'taskstatusnotes',
		width: 200
	}]
  });

  var tb=[
  	'-',
  	{
  		text:''+getResource('resourceParam1824')+'',
    	iconCls: 'priv-add',
    	tooltip: {title:''+getResource('resourceParam1824')+'',text:''+getResource('resourceParam1821')+''},
    	handler:statusAdd.init
    	
  	},
  	'-',
  	{
  		//enableToggle:true,
        text:''+getResource('resourceParam1645')+'',
        
        iconCls: 'priv-edit',
        tooltip: {title:''+getResource('resourceParam1645')+'',text:''+getResource('resourceParam1822')+''},
        handler: statusUpdate.init
        
  	},
  	'-'];
  var grid = myGrid.init(ds,cm,tb,sm);
  return grid;
}
statusMain.init = function(){
	Ext.QuickTips.init();
	
	statusMain.statuspanel = new Ext.Panel({
		 id:'statuspanel',
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
	       	statusMain.statuspanel
        ]
        
    });
	statusMain.statusgrid = statusMain.statuspanel.add(statusMain.grid());
	statusMain.statuspanel.doLayout();
	myGrid.loadvalue(statusMain.statusgrid.store,statusMain.args,statusMain.baseargs);
}
Ext.onReady(statusMain.init,statusMain,true);
