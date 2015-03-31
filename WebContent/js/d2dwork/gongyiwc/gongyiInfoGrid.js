var gongyiInfoGrid = {};
gongyiInfoGrid.grid = function(){

 // var strurl = '../data/d2dwork/d2dwork_gongyiwc_GongyiwcSvr_getGongyiwcPageList.text';
  var proxy = new Ext.data.HttpProxy({
            url: "../JSON/aofoquery_GongyiwcSvr.getGrid",
            method:'GET'
        });
  var reader = new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalProperty'
            //id: 'taskid'
        }, [
            'taskid','taskname','partsnum','taskstatusid',
            'plannedstartstr','plannedendstr','actualstartstr','actualendstr',
            'chargeddepid','tasknotes','chargedmanname','taskstatusname','projectname','projectid'
        ]);
  //var ascid = 'projectname';
  //var ascstr = 'asc';
  var ds = new data.Store(proxy,reader,null,null);

  var sm = new Ext.grid.RowSelectionModel({singleSelect:true});
  var cm = new Ext.grid.ColumnModel({
	defaults: {
        sortable: false,
        menuDisabled: true
    },
	columns : [{
		header: ""+getResource('resourceParam1284')+"",
		dataIndex: 'projectname',
		width: 60
	},{
		header: ""+getResource('resourceParam998')+"",
		dataIndex: 'taskname',
		width: 60
	},{
		header: "零部件号",
		dataIndex: 'partsnum',
		width: 60
	},{
		header: ""+getResource('resourceParam739')+"",
		dataIndex: 'taskstatusname',
		width: 60
	},{
		header: ""+getResource('resourceParam991')+"",
		dataIndex: 'plannedstartstr',
		width: 60
	},{
		header: ""+getResource('resourceParam1032')+"",
		dataIndex: 'plannedendstr',
		width: 60
	},{
		header: ""+getResource('resourceParam856')+"",
		dataIndex: 'actualstartstr',
		width: 60
	},{
		header: ""+getResource('resourceParam1033')+"",
		dataIndex: 'actualendstr',
		width: 60
	},{
		header: ""+getResource('resourceParam731')+"",
		dataIndex: 'chargedmanname',
		width: 60
	},{
		header: ""+getResource('resourceParam467')+"",
		dataIndex: 'tasknotes',
		width: 60
	}]
  });
  cm.defaultSortable = true;
  var grid = myGrid.init(ds,cm,null,sm);
  grid.region='center';
  return grid;
}
