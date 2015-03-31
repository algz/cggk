/**
 * 审批步骤列表
 */
var _isIE = Ext.isIE;
var approveFlowSteps = {grid:null};
var infostore;

approveFlowSteps.getGrid = function() {
	var strurl = '';
	var proxy = new Ext.data.HttpProxy( {
		url : strurl,
		methord:"GET"
	});
	var reader = new Ext.data.JsonReader( {
		root : 'results',
		totalProperty : 'totalProperty',
		id : 'id'
	}, ['id', 'flowInstanceID', 'activityInstanceID', 'activityInstanceName',
			 'examiner', 'examinerName', 'examinerType', 'examinerTypeName', 'approvalStatus', 
			 'approvalStatusName', 'approvalComments', 'approvalTimeString'
			 ]);
	var ascid = 'pid';
	var ascstr = 'desc';
	var ds = new data.Store(proxy, reader);

	var sm = new Ext.grid.RowSelectionModel( {
		singleSelect : true,
		listeners : {
			rowselect : function(sm, row, rec) {
				approveFlowSteps.row = rec;
			}
		}
	});

	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [{
			header : ""+getResource('resourceParam726')+"",
			//fixed : true,
			width : 100,
			dataIndex : 'activityInstanceName'
		}, {
			header : ""+getResource('resourceParam1146')+"",
			//fixed : true,
			width : 80,
			dataIndex : 'examinerName'
		}, {
			header : ""+getResource('resourceParam716')+"",
			//fixed : true,
			width : 80,
			dataIndex : 'examinerTypeName'
		}, {
			header : ""+getResource('resourceParam1144')+"",
			//fixed : true,
			width : 80,
			dataIndex : 'approvalTimeString'
		}, {
			header : ""+getResource('resourceParam1145')+"",
			//fixed : true,
			width : 60,
			dataIndex : 'approvalStatusName'
		}, {
			header : ""+getResource('resourceParam727')+"",
			//fixed : true,
			width : 220,
			dataIndex : 'approvalComments'
		}]
	});

	approveFlowSteps.grid = myGrid.initByPageSize(ds, cm, null, sm, 100, false);
		
	approveFlowSteps.grid.width = 600;
	approveFlowSteps.grid.height = 600;

	return approveFlowSteps.grid;
}

approveFlowSteps.refreshGrid = function() {//刷新操作者grid		
	var proxy = new Ext.data.HttpProxy( {
			url : '../JSON/approval_ApprovalRemote.getApproalFlowInfo?objectID='
					+ collarbMain.dataid + '&objectType=' + collarbMain.datatype
		});
		approveFlowSteps.grid.getStore().proxy = proxy;
		approveFlowSteps.grid.getStore().load();
}
