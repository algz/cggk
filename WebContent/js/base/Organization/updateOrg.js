var _isIE = (navigator.appName == "Microsoft Internet Explorer");
var updateOrg = {
	orgWin : null,
	orgForm : null,
	data : null
};

updateOrg.initWindow = function(title) {
	var h = 190;
	if (_isIE) {
		h = 200;
	}
	updateOrg.orgWin = new Ext.Window({
				title : title,
				width : 450,
				height : h,
				modal : true,
				resizable : false,
				plain : false,
				layout : 'fit'

			});
	updateOrg.orgWin.on('hide', updateOrg.closeWin);
};

updateOrg.closeWin = function() {
	if (updateOrg.orgWin != null) {
		updateOrg.orgWin.close();
		updateOrg.orgWin.destroy();
	}
}

updateOrg.submit = function(nodeInf,parentNode) {
	if (!updateOrg.orgForm.form.isValid()) {
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam661') + '',
					msg : '' + getResource('resourceParam709') + '',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.WARNING
				});
	} else {
		var orgVO = Seam.Remoting
				.createType("com.luck.itumserv.base.organization.OrganizationVO");
		orgVO.setLeaf('false');
		Ext.apply(orgVO, updateOrg.orgForm.form.getValues());
		Seam.Component.getInstance("base_organization_OrganizationService")
				.updateOrganization(orgVO, function(result) {
					if (result == true) {
						Ext.example.msg("" + getResource('resourceParam575')
										+ "", ""
										+ getResource('resourceParam631') + "");
//						orgManage.grid.getSelectionModel().clearSelections();
						// orgManage.grid.getStore().removeAll();
						orgManage.baseargs = {
							sign : '0',
							instcode : parentNode.get("instcode"),
							name : null
						};
						// 重新加载数据
						orgManage.grid.getStore().load(
						);
						orgManage.grid.getSelectionModel().clearSelections();
					} else {
						Ext.MessageBox.show({
									title : ''
											+ getResource('resourceParam572')
											+ '',
									msg : '' + getResource('resourceParam707')
											+ '',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								});
					}
				});
		updateOrg.closeWin();
	}
}

updateOrg.initForm = function(nodeInf,parentNode) {
	Ext.form.Field.prototype.msgTarget = 'side';
	updateOrg.orgForm = {
		xtype : 'form',
		bodyStyle : 'padding:5px 5px 0;background:transparent',
		labelAlign : "left",
		labelSeparator : ':',
		labelWidth : 95,
		frame : true,
		buttons : [{
					text : '' + getResource('resourceParam505') + '',
					handler : function() {
						updateOrg.submit(nodeInf,parentNode)
					}
				}, {
					text : '取消',
					handler : updateOrg.closeWin
				}],

		items : [{
					xtype : 'textfield',
					fieldLabel : "" + getResource('resourceParam688') + "",
					regex : /^([a-zA-Z]|\d)*$/,
					regexText : '' + getResource('resourceParam708') + '',
					disabled : true,
					anchor : "90%",
					value : updateOrg.data.instcode
				}, {
					xtype : 'textfield',
					id : 'name',
					minLength : 1,
					maxLength : 50,
					fieldLabel : "" + getResource('resourceParam685') + "",
					regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d)*$/,
					regexText : '' + getResource('resourceParam679') + '',
					name : "name",
					anchor : "90%",
					allowBlank : false,
					value : updateOrg.data.name
				}, {
					xtype : 'combo',
					anchor : "90%",
					store : new Ext.data.Store({
						proxy : new Ext.data.HttpProxy({
							url : '../JSON/maintenance_deptype_deptypeService.getDeptypeNames'
						}),
						reader : new Ext.data.JsonReader({
									totalProperty : 'totalProperty',
									root : 'results'
								}, [{
											name : 'typename'
										}, {
											name : 'deptypeid'
										}])
					}),
					valueField : "deptypeid",
					displayField : "typename",
					mode : 'remote',
					forceSelection : true,
					hiddenName : 'deptypeid',
					editable : false,
					triggerAction : 'all',
					fieldLabel : '' + getResource('resourceParam686') + '',
					blankText : '' + getResource('resourceParam683') + '',
					name : 'deptypeid',
					emptyText : '' + getResource('resourceParam684') + '',
					value : updateOrg.data.kindname,
					disabled : true,
					allowBlank : false
				}, {
					xtype : 'textfield',
					minlength : 1,
					maxLength : 10,
					allowNegative : false,
					allowDecimals : false,
					id : 'parentcode',
					fieldLabel : "" + getResource('resourceParam710') + "",
					disabled : true,
					name : "parentcode",
					anchor : "90%",
					value : updateOrg.data.parentcode
				}, {
					xtype : 'textfield',
					hidden : true,
					name : 'instcode',
					value : updateOrg.data.instcode
				}]
	}

	return updateOrg.orgForm;
}

updateOrg.addFormData = function(instcode,parentNode) {
	Ext.Ajax.request({
				url : "../JSON/base_organization_OrganizationService.getOrgByInstcode",
				params : {
					"instcode" : instcode.get("instcode")
				},
				success : function(response, opt) {
					updateOrg.data = Ext.util.JSON
							.decode(response.responseText);
					updateOrg.initForm(instcode,parentNode);
					updateOrg.orgForm = updateOrg.orgWin.add(updateOrg.orgForm);
					updateOrg.orgWin.show();
				},
				disableCaching : true,
				autoAbort : true
			});
}

updateOrg.init = function(title, nodeInf,parentNode) {
	if (nodeInf == null) {
		Ext.MessageBox.alert('' + getResource('resourceParam663') + '', ''
						+ getResource('resourceParam662') + '');
	} else if (nodeInf.get("id") == "0") {
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam572') + '',
					msg : '' + getResource('resourceParam707') + '',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
		return;

	} else {
		updateOrg.initWindow(title);
		updateOrg.addFormData(nodeInf,parentNode);
	}
};
