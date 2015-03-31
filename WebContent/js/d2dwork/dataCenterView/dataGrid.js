  var dataGrid={strurl:null,ds:null};
dataGrid.grid = function() {
	strurl = "../JSON/dataobject_service.getDataObject";
	var proxy = new Ext.data.HttpProxy( {
		url : strurl,
		method:'GET'
	});
	var reader = new Ext.data.JsonReader( {
		root : 'results',
		totalProperty : 'totalProperty',
		id : 'dataObjectID'
	}, ['dataObjectID', 'dataObjectName', 'dimension', 'dataObjectType','dataTypeEntity.dataTypeName',
			'value', 'unit', 'description', 'projectName', 'taskName']);
//	var ascid = 'appId';
//	var ascstr = 'asc';
//	var ds = new data.Store(proxy, reader, ascid, ascstr);
 	 ds = new Ext.data.Store({
        proxy: proxy,
        reader: reader
    });
		var sm = new Ext.grid.RowSelectionModel( {
		singleSelect : true,
		listeners : {
			rowselect : function(sm, row, rec) {
				//conferenceMain.row =  rec;
			}
		}
	});	
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [new Ext.grid.RowNumberer(), {
			header : ""+getResource('resourceParam480')+"",
			dataIndex : 'dataObjectName'
	
		}, {
			header : ""+getResource('resourceParam853')+"",
			dataIndex : 'dimension'
		}, {
			header : ""+getResource('resourceParam481')+"",
			dataIndex : 'dataTypeEntity.dataTypeName'
		}, {
			header : ""+getResource('resourceParam511')+"",
			dataIndex : 'value'
		}, {
			header : ""+getResource('resourceParam1201')+"",
			dataIndex : 'unit'
		}, {
			header : ""+getResource('resourceParam861')+"",
			dataIndex : 'description'
		}, {
			header : ""+getResource('resourceParam857')+"",
			dataIndex : 'dataObjectID',
			renderer : function(value, cellmeta, record, rowIndex, columnIndex,
					store) {
				// 这里要根据类型来返回不同的详细信息窗口
				var detail = '';
				if (record.data.dataObjectType == ''
						|| record.data.dataObjectType == 'dataset') {
				} else if (record.data.dataObjectType == 'file') {
					detail = '<div style="width:25px;float:left;" title="'+getResource('resourceParam1240')+getResource('resourceParam576')+getResource('resourceParam469')+getResource('resourceParam857')+'">'
							+ '<a href="javascript:void(0);" name="user1" onClick="dataCenterViewGrid.viewfiledetaildata(\''
							+ record.data.dataObjectID
							+ '\',\''
							+ record.data.dataObjectType
							+ '\')">'
							+ ''+getResource('resourceParam857')+'</a></div>';
				} else {
					detail = '<div style="width:25px;float:left;" title="'+getResource('resourceParam1240')+getResource('resourceParam1253')+getResource('resourceParam857')+'">'
							+ '<a href="javascript:void(0);" name="user1" onClick="dataCenterViewGrid.viewdetaildata(\''
							+ record.data.dataObjectID
							+ '\',\''
							+ record.data.dataObjectType
							+ '\')">'
							+ ''+getResource('resourceParam857')+'</a></div>';
				}
				if (record.data.isonline) {
					return detail;
				} else {
					return detail;
				}
	
			}
		}
		, {
			header : ""+getResource('resourceParam1035')+"",
			dataIndex : 'projectName'
		}
		, {
			header : ""+getResource('resourceParam998')+"",
			dataIndex : 'taskName'
		}]
	});
	
	
  	var selBt={
		text : ''+getResource('resourceParam652')+'',
		iconCls : 'search1',
		handler : rowQuery.init
 	};
 	var fileBt={
 	    text:''+getResource('resourceParam469')+'',
 	    iconCls:'search2',
 	    handler:fileQuery.init
 	};
 	 var clearBt={
 	    text:''+getResource('resourceParam557')+'',
 	    iconCls:'del2',
 	    handler:function()
 	    {
 	    	dataCenterViewMain.dataid.store.removeAll();
 	      	 	      
 	    }
 	};
 	
 	var tb = [
		'-',
		selBt,
		'-',
		fileBt,
		'-',
		clearBt,
		'-'
		]
	
	var grid = myGrid.init(ds, cm, tb, sm);
	
	return grid;
}
