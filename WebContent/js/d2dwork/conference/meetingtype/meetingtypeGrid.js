var meetingtypeGrid={};

meetingtypeGrid.grid = function() {
	var strurl = "../JSON/meetingtypesvr.getmeetingtypeList";
	var proxy = new Ext.data.HttpProxy( {
		url : strurl
	});
	var reader = new Ext.data.JsonReader( {
		root : 'results',
		totalProperty : 'totalProperty',
		id : 'typeid'
	}, ['typeid', 'name', 'description', 'deleted']);
	
 	var ds = new Ext.data.Store({
        proxy: proxy,
        reader: reader
    });
	 
	var sm = new Ext.grid.RowSelectionModel( {
		singleSelect : true,
		listeners : {
			rowselect : function(sm, row, rec) {
				meetingtypeMain.row =  rec;
			}
		}
	});	
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [ {
			id: 'typeid',
			header : "ID",
			dataIndex : 'typeid'
		}, {
			header : getResource('resourceParam1139')+"",
			dataIndex : 'name'
		}, {
			header : getResource('resourceParam1140')+"",
			dataIndex : 'description'
		}]
	});
	
	var addBt = {
		text : getResource('resourceParam477')+'',
		iconCls : 'user-add',
		handler : meetingtypeAdd.init
		
	};
	var updateBt= {
		text : getResource('resourceParam478')+'',
		iconCls : 'user-edit',
		handler : meetingtypeUpdate.init 
	};
	var delBt={
		text : getResource('resourceParam475')+'',
		iconCls : 'user-del',
		handler : meetingtypeDel.init 
 	};
 	var selBt={
		text : getResource('resourceParam652')+'',
		iconCls : 'user-del' 
 	};
 	var saveBt={
		text : getResource('resourceParam1130')+'',
		iconCls : 'user-del' 
 	};
	 
	var tb = ['-', addBt, '-', delBt, '-', updateBt, '-'];
	var grid = myGrid.init(ds, cm, tb, sm);
	return grid;
}