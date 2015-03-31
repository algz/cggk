var paramsetGrid = {};
paramsetGrid.getGrid = function(){

  var strurl = '../JSON/paramset_ParamsetSvr.getAllParam';
  var proxy = new Ext.data.HttpProxy({
            url: strurl,
            method:'GET'
        });
  var reader = new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalProperty',
            id: 'paramid'
        }, [
            'paramid','paramkey','paramvalue','projectid'
        ]);
  var ascid = 'paramid';
  var ascstr = 'asc';
  var ds = new data.Store(proxy,reader,ascid,ascstr);

  var cm = new Ext.grid.ColumnModel({
	defaults: {
        sortable: false,
        menuDisabled: true
    },
	columns : [{
		header: ""+getResource('resourceParam1258')+"",
		dataIndex: 'paramkey'
	},{
		header: ""+getResource('resourceParam1262')+"",
		dataIndex: 'paramvalue'
	} 
	]
  });

	
  var sm = new Ext.grid.RowSelectionModel({singleSelect:true});
  var grid = myGrid.initByPageSize(ds,cm,null,sm,20);
//  var grid = myGrid.init(ds,cm,null,sm);

  grid.on('rowdblclick',function(thisgrid){
 		paramsetUpdate.updateTaskType(thisgrid);
  });

  grid.viewConfig={
      forceFit:true
  };
                    
  grid.region='center';
  return grid;
}
