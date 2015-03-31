/**
 * 审批步骤列表
 */
var _isIE = Ext.isIE;
var approveFlowSteps = {
	grid : null
};
var infostore;

approveFlowSteps.getGrid = function() {
	var strurl = '';
	var proxy = new Ext.data.HttpProxy({
				url : strurl,
				methord : "GET"
			});
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, ['id', 'flowInstanceID', 'activityInstanceID',
					'activityInstanceName', 'examiner', 'examinerName',
					'examinerType', 'examinerTypeName', 'approvalStatus','acceptTime',
					'approvalStatusName', 'approvalComments',
					'approvalTimeString', 'stepAndApprovalName','departmentName']);
	var ascid = 'pid';
	var ascstr = 'desc';
	// var ds = new data.Store(proxy, reader);
	var ds = new Ext.data.GroupingStore({
				reader : reader,
				proxy : proxy,
				remoteSort : true,
				sortInfo : {
					field : 'stepAndApprovalName',
					direction : 'asc'
				},
				groupField : 'stepAndApprovalName'
			})

	var sm = new Ext.grid.RowSelectionModel({
				// singleSelect : true,
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
			header : ""+getResource('resourceParam1362')+"",
			dataIndex : 'stepAndApprovalName',
			hidden : true
		}, {
			header : ""+getResource('resourceParam726')+"",
			// fixed : true,
			width : 100,
			dataIndex : 'activityInstanceName'
		}, {
			header : ""+getResource('resourceParam1146')+"",
			// fixed : true,
			width : 80,
			dataIndex : 'examinerName'
		}, {
			header : "审批人所在部门",
			width : 120,
			dataIndex : 'departmentName'
		}, {
			header : ""+getResource('resourceParam716')+"",
			// fixed : true,
			width : 80,
			dataIndex : 'examinerTypeName'
		},{
			header : "接收时间",
			// fixed : true,
			width : 80,
			dataIndex : 'acceptTime'
		},{
			header : ""+getResource('resourceParam1144')+"",
			// fixed : true,
			width : 80,
			dataIndex : 'approvalTimeString'
		}, {
			header : ""+getResource('resourceParam1145')+"",
			// fixed : true,
			width : 60,
			dataIndex : 'approvalStatusName'
		}, {
			header : ""+getResource('resourceParam727')+"",
			// fixed : true,
			width : 220,
			dataIndex : 'approvalComments',
			renderer : function(value, metadata, record, rowIndex, colIndex) {
				var str = '<div align="left" title="' + value + '">' + value + '</div>';
				return str;
			}
		}]
	});
	
	// approveFlowSteps.grid = myGrid.initByPageSize(ds, cm, null, sm, 100,
	// false);
	approveFlowSteps.grid = new Ext.grid.GridPanel({
				autoScroll:true,
				store : ds,
				region:'center',
				cm : cm,
				view : new Ext.grid.GroupingView({
							forceFit : true
				})
			})

	approveFlowSteps.grid.width = 600;
//	approveFlowSteps.grid.height = 800;

	return approveFlowSteps.grid;
}

approveFlowSteps.refreshGrid = function(activityID) {// 刷新操作者grid
	var proxy = new Ext.data.HttpProxy({
				url : '../JSON/approval_ApprovalRemote.getApproalFlowInfos?approvalId='
						+ activityID+"&approvalType=StepByStep"
			});
	approveFlowSteps.grid.getStore().proxy = proxy;
	approveFlowSteps.grid.getStore().load();
	
}

approveFlowSteps.getAllApprovalRecord = function(objectID,objectType) {// 刷新操作者grid
	if(objectType == undefined) {
		objectType = null;
	}
	var proxy = new Ext.data.HttpProxy({
			url : '../JSON/approval_ApprovalRemote.getApproalFlowInfosByObjId?objectID='
			+objectID+"&objectType="+objectType+"&approvalType=StepByStep"
		});
	approveFlowSteps.grid.getStore().proxy = proxy;
	approveFlowSteps.grid.getStore().load();
	
}
