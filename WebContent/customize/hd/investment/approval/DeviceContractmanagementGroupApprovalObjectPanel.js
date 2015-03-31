// 设备合同审批查看明细
DeviceContractmanagementGroupApprovalObjectPanel = {};
DeviceContractmanagementGroupApprovalObjectPanel.init = function(id) {
	var panel = new contractManagement.contractEditorForm({
				title : '设备合同管理',
				isEdit : false,
				loadForm : function(form, fileForm) {
					Ext.Ajax.request({
								url : '../JSON/deviceContractmanagementRemote.getGridData?d=' + new Date(),
								method : 'post',
								waitMsg : '数据加载中，请稍后....',
								params : {
									contractid : id,
									start : 0,
									limit : 1
								},
								success : function(response, opts) {
									var obj = Ext.decode(response.responseText);
									if (obj.success == true) {
										var data = obj.results[0]
										var TopicRecord = Ext.data.Record.create(["partya", "status", "remark", "contractcode", "partyb", "contractid", "projectname",
												"operatorid", "fileid", "secrecy", "contractmanager", "equipregistId", "contractname", "amount", "projectnum", "amountUnit",
												"leader", "filename"]);
										// create Record instance
										var rec = new TopicRecord({
													partya : data.partya == "" ? "" : data.partya,
													remark : data.remark == "" ? "" : data.remark,
													contractcode : data.contractcode == "" ? "" : data.contractcode,
													partyb: data.partybname == "" ? "" : data.partybname,
													projectname : data.projectname == "" ? "" : data.projectname,
													operatorid : data.operatorid == "" ? "" : data.operatorid,
													secrecy : data.secrecy == "" ? "" : data.secrecy,
													contractmanager : data.contractmanager == "" ? "" : data.contractmanager,
													contractname : data.contractname == "" ? "" : data.contractname,
													amount : data.amount == "" ? "" : data.amount,
													projectnum : data.projectnum == "" ? "" : data.projectnum,
													amountUnit : data.amountUnit == "" ? "" : data.amountUnit,
													leader : data.leader == "" ? "" : data.leader,
													fileid : data.fileid == "" ? "" : data.fileid,
													filename : data.filename == "" ? "" : data.filename
												});
										form.getForm().loadRecord(rec);
										var value = "<a href='../FILEDOWN/?ID="// 着用的是下载。需传值文件的id和文件名，才能查到
												+ data.fileid + "&ORIGINALNAME=" + encodeURI(encodeURI(data.filename)) + "' cursor：hand>" + data.filename + "</a>";
										fileForm.findById('form-filename').setValue(value)
										// fileForm.getForm().loadRecord(rec);
									} else {
										Ext.Msg.alert("提示", "合同数据获取失败!");
									}
								},
								failure : function(response, opts) {
								}
							});
				}
			});

	return panel;
}