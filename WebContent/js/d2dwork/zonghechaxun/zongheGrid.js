var zongheGrid = {};
zongheGrid.grid = function(){
	var proxy = new Ext.data.HttpProxy({
        url: "../JSON/aofoquery_zongheChaxunSvr.getGrid",
        method:"POST"
    });
	var reader = new Ext.data.JsonReader({
	    root: 'results',
	    totalProperty: 'totalProperty',
	    id: 'taskid'
	}, [
	    'taskid','taskname','partsnum','taskstatusid','taskstatusids','chargedmanid','variety','taskcategoryid',
	    'plannedstartstr','plannedendstr','actualstartstr','actualendstr','projectid','taskcategoryname',
	    'chargeddepid','chargeddepname','tasknotes','chargedmanname','taskstatusname','issuedmanid',"tasktype"
	]);
	var ascid = 'taskid';
	var ascstr = 'asc';
	var ds = new data.Store(proxy,reader,ascid,ascstr);
//	ds.on('datachanged',function(ds){
//	   	if(zongheUtil.sel && ds.getCount()==0){
//	   		Ext.MessageBox.alert(''+getResource('resourceParam508')+'', ""+getResource('resourceParam9146')+"");
//	   	}
//	   	zongheUtil.sel=false;
//	});
        ds.on('load',function(ds,e,o){
           	if(zongheUtil.sel && ds.getCount()==0){
	   		Ext.MessageBox.alert(''+getResource('resourceParam508')+'', ""+getResource('resourceParam9146')+"");
	   	}
	   	zongheUtil.sel=false;
        });
	var sm = new Ext.grid.RowSelectionModel({singleSelect:true});
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [{
			id: 'taskid',
			header: ""+getResource('resourceParam998')+"",
			dataIndex: 'taskname',
			width: 60,
			renderer : function(value, cellmeta, record, rowIndex, columnIndex, store) {
				var str = record.data.taskname;
				var taskd = record.data.taskdesignate;
				var strs = "<a href='javascript:void(0);' tag='" + record.data.projectid
					+ "' onclick='zongheMain.detailsOnclick(&quot;"
					+ str + "&quot;," + record.data.taskid + ","
					+ record.data.projectid
					+ ","+record.data.tasktype+");'><span style='color:" + record.data.color
					+ ";font-weight:bold;'>" + record.data.taskname
					+ "</span></a>";
				return strs;
			}
		},{
			header: ""+getResource('resourceParam1043')+"",
			dataIndex: 'taskcategoryname',
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
			header: ""+getResource('resourceParam986')+"",
			dataIndex: 'chargeddepname',
			width: 60
		},{
			header: ""+getResource('resourceParam467')+"",
			dataIndex: 'tasknotes',
			width: 60
		}]
	});
	var grid = myGrid.init(ds,cm,null,sm);
	grid.region='center';
	return grid;
}
