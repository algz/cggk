var notifyGrid = {cm:null,sm:null};
notifyGrid.grid = function(num){
 
  var proxy = new Ext.data.HttpProxy({
            url: "../JSON/tasknotify_TaskNotifySvr.getGrid"
        });
  var reader = new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalProperty',
            id: 'msgId'
        }, [                                    
            'msgId','taskId','partsnum','taskcategoryid',
            'taskcategoryname','taskname','model',
            'batchs','sorties','msgTypeId','msgstr',
            'msgcontent','validityFlag','projectid','chargedmanid',
            'chargedmanname','projectname'
        ]);
  var ascid = null;
  var ascstr = null;
  var ds = new data.Store(proxy,reader,ascid,ascstr);
 
 if(num==1){
	notifyGrid.setcm1();
    var grid = myGrid.initBox(ds,notifyGrid.cm,null,notifyGrid.sm);
    grid.region='center';
    return grid;
  }else{
  	notifyGrid.setcm2();
    var grid = myGrid.initBox(ds,notifyGrid.cms,null,notifyGrid.sms);
    grid.region='center';
    return grid;
  } 
  
}

notifyGrid.setcm1 = function (){
 notifyGrid.sm = new Ext.grid.CheckboxSelectionModel();
  
  notifyGrid.cm = new Ext.grid.ColumnModel({
	defaults: {
        sortable: false,
        menuDisabled: true
    },
	columns : [
  		new Ext.grid.RowNumberer(),
  		notifyGrid.sm,
  		{
			header: ""+getResource('resourceParam1630')+"",
			dataIndex: 'projectname',
			width:100,
			renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){
				return record.data.projectname;
			}
		},{
			header: ""+getResource('resourceParam998')+"",
			dataIndex: 'taskname',
			width:100,
			renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){
				return "<span style='color:"+ record.data.color +";font-weight:bold;'>"+ record.data.taskname +"</span>";
			}
		},
//  		{
//			header: "零件号",
//			width:80,
//			dataIndex: 'partsnum'
//		},
		{
			header: ""+getResource('resourceParam731')+"",
			width:60,
			dataIndex: 'chargedmanname'
		},{
			header: ""+getResource('resourceParam1043')+"",
			width:60,
			dataIndex: 'taskcategoryname'
		},{
			header: ""+getResource('resourceParam1670')+"",
			width:80,
			dataIndex: 'msgstr'
		},{
			header: ""+getResource('resourceParam1671')+"",
			width:80,
			dataIndex: 'msgcontent'
		}
	]});
}
notifyGrid.setcm2 = function (){
 //notifyGrid.sm = new Ext.grid.RowSelectionModel({singleSelect:true});
  notifyGrid.sms = new Ext.grid.CheckboxSelectionModel();
  notifyGrid.cms = new Ext.grid.ColumnModel({
	defaults: {
        sortable: false,
        menuDisabled: true
    },
	columns : [
       new Ext.grid.RowNumberer(),
       notifyGrid.sms,
  		{
  			header: ""+getResource('resourceParam1630')+"",
			dataIndex: 'projectname',
			width:100,
			renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){
				return record.data.projectname;
			}
		},{
			header: ""+getResource('resourceParam998')+"",
			dataIndex: 'taskname',
			width:100,
			renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){
				return record.data.taskname ;
			}
		},
//  		{
//			header: "零件号",
//			width:80,
//			dataIndex: 'partsnum'
//		},
			{
			header: ""+getResource('resourceParam731')+"",
			width:60,
			dataIndex: 'chargedmanname'
		},{
			header: ""+getResource('resourceParam1043')+"",
			width:60,
			dataIndex: 'taskcategoryname'
		},{
			header: ""+getResource('resourceParam1670')+"",
			width:80,
			dataIndex: 'msgstr'
		},{
			header: ""+getResource('resourceParam1671')+"",
			width:80,
			dataIndex: 'msgcontent'
		}
	]});
}
 
 
