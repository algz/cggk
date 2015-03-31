// 设备合同审批查看明细
EngineeringInspectionApplicationApprovalObjectPanel = {};
EngineeringInspectionApplicationApprovalObjectPanel.init = function(id) {
	var panel = new inspectionApplication.inspectionEditorForm({
		        isEdit:false,
				loadForm : function(form) {
					Ext.Ajax.request({
								url : '../JSON/engineeringInspectionApplicationRemote.getGridData?d=' + new Date(),
								method : 'post',
								waitMsg : '数据加载中，请稍后....',
								params : {
									inspectioapplicatioid : id,
									start : 0,
									limit : 1
								},
								success : function(response, opts) {
									var obj = Ext.decode(response.responseText);
									if (obj.success == true) {
										var data = obj.results[0]
										var TopicRecord = Ext.data.Record.create(['inspectioapplicatioid', {
										name : 'applicationtime',
										type : 'date',
										dateFormat : 'Y-m-d'
									}, 'projectdirector', 'projectdirectortel', 'suppliersid', 'supplierscontact', 'supplierstel', 'administrativeunit', 'opinion',
									'civilregistid', 'projectname', 'status', 'administrativeunit', 'suppliersname', 'useunit']);
										// create Record instance
										var rec = new TopicRecord({
													useunit : data.useunit == "" ? "" : data.useunit,
													projectname : data.projectname == "" ? "" : data.projectname,
													applicationtime : data.applicationtime == "" ? "" : data.applicationtime,
													administrativeunit : data.administrativeunit == "" ? "" : data.administrativeunit,
													projectdirector : data.projectdirector == "" ? "" : data.projectdirector,
													projectdirectortel : data.projectdirectortel == "" ? "" : data.projectdirectortel,
													suppliersname : data.suppliersname == "" ? "" : data.suppliersname,
													supplierscontact : data.supplierscontact == "" ? "" : data.supplierscontact,
													supplierstel : data.supplierstel == "" ? "" : data.supplierstel
												});
										form.getForm().loadRecord(rec);
									} else {
										Ext.Msg.alert("提示", "数据获取失败!");
									}
								},
								failure : function(response, opts) {
								}
							});

				}
			});

	return panel;
}