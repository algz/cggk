/**
 * 审批步骤列表
 */
Ext.ns('Sysware.P2M')
Sysware.P2M.ApproveFlowStepsStore = function(config) {
	var config = config ? config : {};
	Ext.applyIf(config, {
		reader : new Ext.data.JsonReader( {
			root : 'results',
			totalProperty : 'totalProperty',
			id : 'id'
		}, [ 'id', 'flowInstanceID', 'activityInstanceID',
				'activityInstanceName', 'examiner', 'examinerName',
				'examinerType', 'examinerTypeName', 'approvalStatus',
				'approvalStatusName', 'approvalComments', 'approvalTimeString',
				'stepAndApprovalName' ]),
		proxy : new Ext.data.HttpProxy( {
			methord : "GET"
		}),
		remoteSort : true,
		sortInfo : {
			field : 'stepAndApprovalName',
			direction : 'asc'
		},
		groupField : 'stepAndApprovalName'
	});
	Sysware.P2M.ApproveFlowStepsStore.superclass.constructor.call(this, config);
};
Ext.extend(Sysware.P2M.ApproveFlowStepsStore, Ext.data.GroupingStore);

Sysware.P2M.ApproveFlowStepsGrid = Ext
		.extend(
				Ext.grid.GridPanel,
				{
					dataId : null,
					dataType : null,
					initComponent : function() {
						Ext
								.apply(
										this,
										{
											border:false,
											cm : new Ext.grid.ColumnModel({
												defaults: {
											        sortable: false,
											        menuDisabled: true
											    },
												columns : [
													{
														header : ""
																+ getResource('resourceParam1362')
																+ "",
														dataIndex : 'stepAndApprovalName',
														hidden : true
													},
													{
														header : ""
																+ getResource('resourceParam726')
																+ "",
														width : 100,
														dataIndex : 'activityInstanceName'
													},
													{
														header : ""
																+ getResource('resourceParam1146')
																+ "",
														width : 80,
														dataIndex : 'examinerName'
													},
													{
														header : ""
																+ getResource('resourceParam716')
																+ "",
														width : 80,
														dataIndex : 'examinerTypeName'
													},
													{
														header : ""
																+ getResource('resourceParam1144')
																+ "",
														width : 80,
														dataIndex : 'approvalTimeString'
													},
													{
														header : ""
																+ getResource('resourceParam1145')
																+ "",
														width : 60,
														dataIndex : 'approvalStatusName'
													},
													{
														header : ""
																+ getResource('resourceParam727')
																+ "",
														width : 220,
														dataIndex : 'approvalComments',
														renderer : function(
																value,
																metadata,
																record,
																rowIndex,
																colIndex) {
															var str = '<div align="left" title="'
																	+ value
																	+ '">'
																	+ value
																	+ '</div>';
															return str;
														}
													} ]
											}),
											sm : new Ext.grid.RowSelectionModel(
													{
														listeners : {
															rowselect : function(
																	sm, row,
																	rec) {
															}
														}
													}),
											store : new Sysware.P2M.ApproveFlowStepsStore(
													{
														storeId : 'Sysware.P2M.ApproveFlowStepsStore',
														proxy : new Ext.data.HttpProxy( {
																methord : "GET",
																url : '../JSON/approval_ApprovalRemote.getApproalFlowInfos?approvalId=' + this.dataId + '&approvalType=StepByStep'
														})	
													}),
											view : new Ext.grid.GroupingView( {
												forceFit : true
											}),
											refresh : function(dataId) {// 刷新操作者grid
											    this.dataId = dataId ? dataId
														: this.dataId;
												var proxy = new Ext.data.HttpProxy({
													url : '../JSON/approval_ApprovalRemote.getApproalFlowInfos?approvalId='
															+ this.dataId+"&approvalType=StepByStep"
												});
												this.store.proxy=proxy;
												this.store.reload();
												
											}
										});
						Sysware.P2M.ApproveFlowStepsGrid.superclass.initComponent.call(this);
					}
				});
Ext.reg('sysware.p2m.approveflowstepsgrid', Sysware.P2M.ApproveFlowStepsGrid);