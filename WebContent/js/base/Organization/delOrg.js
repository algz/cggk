var delOrg = {}

delOrg.init = function(title, nodeInf) {
	if (nodeInf != null && nodeInf.get("instcode") == undefined) {

		Ext.MessageBox.show({
					title : '' + getResource('resourceParam638') + '',
					msg : '' + getResource('resourceParam690') + '',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
		return;
	}
	if (nodeInf == null) {
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam663') + '',
					msg : '' + getResource('resourceParam662') + '!',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.WARNING
				});
	} else if (nodeInf.get("id") == 0) {
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam638') + '',
					msg : '' + getResource('resourceParam690') + '',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
		return;

	} else {
		Ext.MessageBox.confirm(title, getResource('resourceParam9183'),
				function(btn, text) {
					if (btn == 'yes') {
						Seam.Component
								.getInstance("base_organization_OrganizationService")
								.detele(nodeInf.get("id").split("&")[0],
										function(result) {
											if (result == true) {
												//orgManage.grid.getStore().reload(); //删除后重新加载数据，现在改为不重新加载，因为删除后要默认展开树，所有删除表格里选择的那行
												var selectedRow=orgManage.grid.getSelectionModel().getSelected();
												orgManage.grid.getStore().remove(selectedRow);
												Ext.example
														.msg(
																""
																		+ getResource('resourceParam575')
																		+ "",
																""
																		+ getResource('resourceParam691')//删除组织机构信息成功
																		+ "");
												orgManage.grid
														.getSelectionModel()
														.clearSelections();
											} else {
												Ext.MessageBox.show({
													title : ''
															+ getResource('resourceParam638')
															+ '',
													msg : ''
															+ getResource('resourceParam690')//删除组织机构信息失败
															+ '',
													buttons : Ext.MessageBox.OK,
													icon : Ext.MessageBox.ERROR
												});
											}
										});
					}
				}).getDialog().setWidth(300);
	}
}
