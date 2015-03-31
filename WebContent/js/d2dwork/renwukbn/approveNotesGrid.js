var _isIE = Ext.isIE;
var approveNotesGrid = {grid:null};
var infostore;

approveNotesGrid.getGrid = function(taskid,taskstatus) {
	var strurl = '';
	var proxy = new Ext.data.HttpProxy( {
		url : strurl,
		methord:"GET"
	});
	var reader = new Ext.data.JsonReader( {
		root : 'results',
		totalProperty : 'totalProperty',
		id : 'pid'
	}, ['pid', 'taskid', 'taskname', 'approvemanid', 'approvemanName',
			'examiningStatus', 'examiningStatusName', 'approveNote']);
	var ascid = 'pid';
	var ascstr = 'desc';
	var ds = new data.Store(proxy, reader);

	var sm = new Ext.grid.RowSelectionModel( {
		singleSelect : true,
		listeners : {
			rowselect : function(sm, row, rec) {
				approveNotesGrid.row = rec;
			}
		}
	});

	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [{
			header : ""+getResource('resourceParam998')+"",		
			width : 100,
			dataIndex : 'taskname'
		}, {
			header : ""+getResource('resourceParam1146')+"",
			width : 100,
			dataIndex : 'approvemanName'
		}, {
			header : ""+getResource('resourceParam1145')+"",
			width : 100,
			dataIndex : 'examiningStatusName'
		}, {
			header : ""+getResource('resourceParam727')+"",
			width : 320,
			dataIndex : 'approveNote'
		}]
	});
	
	
	var addBt = {
		text : ''+getResource('resourceParam1576')+'',
		iconCls : 'add1',
		handler : function(){
			chooseUserViewMain.init(taskid);
		}
	};
	var delBt={
		text : ''+getResource('resourceParam1577')+'',
		iconCls : 'del1',
		handler : approveManDelete.init
 	};

  
 	var tb = [
		'-', 
		addBt,
		'-', 
		delBt,
		'-'
	];	
	
	if (taskstatus == 5){
		approveNotesGrid.grid = myGrid.initByPageSize(ds, cm, tb, sm, 100, false);
	} else {
		approveNotesGrid.grid = myGrid.initByPageSize(ds, cm, null, sm, 100, false);
	}

	return approveNotesGrid.grid;
}
