var entityGrid = {};

entityGrid.getGrid = function(){

  var strurl = '';
  var proxy = new Ext.data.HttpProxy({
            url: strurl,
            method:'GET'
        });
  var reader = new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalProperty',
            id: 'partsnum'
        }, [
            'partsnum','completedamount','plannedamount','plannedstarttime','plannedendtime',
			'actualstarttime','actualendtime','model','sorties','batchs'
        ]);
  var ds = new Ext.data.Store(proxy,reader);
 // var sm = new Ext.grid.RowSelectionModel({singleSelect:true});
  var cm = new Ext.grid.ColumnModel({
	defaults: {
        sortable: false,
        menuDisabled: true
    },
	columns : [{
  		header: "机型", 		
  		width:120,
  		dataIndex: 'model'
  	},{
		header: "批次",		
		width: 80,
		dataIndex: 'batchs'
	},{
		header: "架次",		
		width: 180,
		dataIndex: 'sorties'
	},{
		header: "图号",		
		width: 180,
		dataIndex: 'partsnum'
	},{
		header: "单机数",		
		width: 80,
		hidden:true,
		dataIndex: ''
	},{
		header: "制造",		
		width: 80,
		hidden:true,
		dataIndex: ''
	},{
		header: "使用",		
		width: 80,
		hidden:true,
		dataIndex: ''
	},{
		header: "下达数量",
		width: 100,
		dataIndex: 'plannedamount'
	},{
		header: "完成数量",
		width: 100,
		dataIndex: 'completedamount'
	},{
		header: ""+getResource('resourceParam991')+"",
		width: 130,
		dataIndex: 'plannedstarttime'
	},{
		header: ""+getResource('resourceParam1032')+"",
		width: 130,
		dataIndex: 'plannedendtime'
	},{
		header: ""+getResource('resourceParam856')+"",
		width: 130,
		dataIndex: 'actualstarttime'
	},{
		header: ""+getResource('resourceParam1033')+"",
		width: 130,
		dataIndex: 'actualendtime'
	},{
		header: "开工"+getResource('resourceParam500')+"",
		width: 80,
		hidden:true,
		dataIndex: ''
	},{
		header: "热表"+getResource('resourceParam500')+"",
		width: 80,
		hidden:true,
		dataIndex: ''
	},{
		header: "库存数量",
		width: 80,
		hidden:true,
		dataIndex: ''
	},{
		header: "原材料",
		width: 80,
		hidden:true,
		dataIndex: ''
	},{
		header: "工装",
		width: 80,
		hidden:true,
		dataIndex: ''
	},{
		header: ""+getResource('resourceParam465')+"",
		width: 80,
		hidden:true,
		dataIndex: ''
	},{
		header: "样板",
		width: 80,
		hidden:true,
		dataIndex: ''
	},{
		header: "AO",
		width: 80,
		hidden:true,
		dataIndex: ''
	},{
		header: "FO",
		width: 80,
		hidden:true,
		dataIndex: ''
	}]
  });
  var grid = new Ext.grid.PropertyGrid({
  	clicksToEdit : 3,
  	isEditor : false
	});
  grid.region='center';

  return grid;
}
