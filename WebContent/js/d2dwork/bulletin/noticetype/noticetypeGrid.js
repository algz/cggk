var noticetypeGrid={};

noticetypeGrid.grid = function() {
	var strurl = "../JSON/noticetypesvr.getnoticetypeList";
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
				noticetypeMain.row =  rec;
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
		handler : noticetypeAdd.init
		
	};
	var updateBt= {
		text : getResource('resourceParam478')+'',
		iconCls : 'user-edit',
		handler : noticetypeUpdate.init 
	};
	var delBt={
		text : getResource('resourceParam475')+'',
		iconCls : 'user-del',
		handler : noticetypeDel.init 
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
