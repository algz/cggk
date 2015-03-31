/**
 * 审批对象列表
 */
var _isIE = Ext.isIE;
var approvalObjectGrid = {grid:null};

approvalObjectGrid.getGrid = function() {
	var strurl = '../JSON/approval_ApprovalRemote.getApprovalObjectVos';
	var proxy = new Ext.data.HttpProxy( {
		url : strurl,
		methord:"GET"
	});
	var reader = new Ext.data.JsonReader( {
		root : 'results',
		totalProperty : 'totalProperty',
		id : 'id'
	}, ['id', 'flowInstanceID', 'objectID', 'objectName',
			 'objectType', 'objectTypeName'
			 ]);
	var ascid = 'pid';
	var ascstr = 'desc';
	var ds = new data.Store(proxy, reader);

	var sm = new Ext.grid.RowSelectionModel( {
		singleSelect : true,
		listeners : {
			rowselect : function(sm, row, rec) {
				approvalObjectGrid.row = rec;
			}
		}
	});

	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [{
			header : ""+getResource('resourceParam480')+"",
			//fixed : true,
			width : 200,
			dataIndex : 'objectName'
		}, {
			header : ""+getResource('resourceParam481')+"",
			//fixed : true,
			width : 80,
			dataIndex : 'objectTypeName'
		}]
	});

	approvalObjectGrid.grid = myGrid.initByPageSize(ds, cm, null, sm, 100, false);
		
	approvalObjectGrid.grid.width = 200;
	approvalObjectGrid.grid.height = 200;

	return approvalObjectGrid.grid;
}

approvalObjectGrid.refreshGrid = function() {//刷新操作者grid		
	var proxy = new Ext.data.HttpProxy( {
			url : '../JSON/approval_ApprovalRemote.getApprovalObjectVos'
		});
		approvalObjectGrid.grid.getStore().proxy = proxy;
		approvalObjectGrid.grid.getStore().load();
}
