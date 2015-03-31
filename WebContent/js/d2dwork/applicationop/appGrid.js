var appGrid = {};

appGrid.grid = function(){
  var strurl = '../JSON/applicationop_tapplicationsvr.getappList';
  var proxy = new Ext.data.HttpProxy({
            url: strurl,
            method:'GET'
        });
  var reader = new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalProperty',
            id: 'applicationid'
        }, [
            'applicationid','applicationip','applicationname','applicationpath',
            'applicationtype'
        ]);
  var ascid = 'applicationid';
  var ascstr = 'asc';
  var ds = new data.Store(proxy,reader,ascid,ascstr);


//  var sm = new Ext.grid.RowSelectionModel({singleSelect:true});
  var sm = new Ext.grid.CheckboxSelectionModel();
  
  var cm = new Ext.grid.ColumnModel({
	defaults: {
        sortable: false,
        menuDisabled: true
    },
	columns : [sm,{
		id: 'applicationid',
		header: ""+getResource('resourceParam1098')+"",
		dataIndex: 'applicationname',
		width: 100
	},{
		header: ""+getResource('resourceParam1104')+"",
		dataIndex: 'applicationip',
		width: 60
	},{
		header: ""+getResource('resourceParam1097')+"",
		dataIndex: 'applicationpath',
		width: 100
	},{
		header: ""+getResource('resourceParam558')+''+getResource('resourceParam9001')+'', // text: "应用程序" + "标签",
		dataIndex: 'applicationtype',
		width: 60
	}
	]
  });

  var tb=[
  	'-',
  	{
  		text:''+getResource('resourceParam1105')+'',
    	iconCls: 'role-add',
    	tooltip: {title:''+getResource('resourceParam1105')+'',text:''+getResource('resourceParam1103')+''}
    	//handler:appAdd.init
    	
  	},
  	'-',
  	{
  		//enableToggle:true,
        text:''+getResource('resourceParam1106')+'',
        tooltip: {title:''+getResource('resourceParam1106')+'',text:''+getResource('resourceParam1101')+''},
        iconCls: 'role-addpriv'//,
       // handler: appUpdate.init
  	},
  	'-',
  	{
  		//enableToggle:true,
        text:''+getResource('resourceParam1107')+'',
        tooltip: {title:''+getResource('resourceParam1107')+'',text:''+getResource('resourceParam1102')+''},
        iconCls: 'role-addpriv'
       // handler: appDel.init
  	}
  	];
   
  var grid = myGrid.init(ds,cm,tb,sm);
  grid.region = 'center';
  return grid;
}
