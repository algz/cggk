var _isIE = (navigator.appName == "Microsoft Internet Explorer");
var addOrg = {
	orgWin : null,
	orgForm : null,
	data : null,
	kindData : null,
	tag : null
};
// 增加机构窗口
addOrg.initWindow = function(title) {
	var h = 190;
	if (_isIE) {
		h = 200;
	}
	addOrg.orgWin = new Ext.Window({
				title : title,
				width : 450,
				height : h,
				modal : true,
				resizable : false,
				plain : false,
				layout : 'fit'
			});
	addOrg.orgWin.on('hide', addOrg.closeWin);
};

addOrg.closeWin = function() {
	if (addOrg.orgWin != null) {
		addOrg.orgWin.close();
		addOrg.orgWin.destroy();
	}
}
// 点击确定按钮执行方法
addOrg.submit = function(parentcode) {
	if (!addOrg.orgForm.form.isValid()) {
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam661') + '',//添加组织'
					msg : '' + getResource('resourceParam678') + '',//请输入组织机构的完整信息
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.WARNING
				});
	} else {
		var orgVO = Seam.Remoting.createType("com.luck.itumserv.base.organization.OrganizationVO");
		// var s = Seam.Remoting
		// .createType("com.luck.itumserv.base.organization.OrgSearchVO");
		orgVO.setLeaf(false);
		parentcode.set("leaf", false);
		Ext.apply(orgVO, addOrg.orgForm.form.getValues());
		Seam.Component.getInstance("base_organization_OrganizationService")
				.addOrganization(orgVO, function(result) {
					if (result == true) {
						orgManage.baseargs = {
							sign : '0',
							instcode : parentcode.get('instcode'),
							name : null
						};
						// 按照查询条件重新加载数据
						orgManage.grid.getStore().load({callback:function(records, options, success){
							orgManage.grid.getStore().expandNode(parentcode);
						}});
						orgManage.grid.getSelectionModel().clearSelections()
						Ext.example.msg("" + getResource('resourceParam575')
										+ "", ""
										+ getResource('resourceParam680') + "");//添加组织机构信息成功!
					} else {
						Ext.MessageBox.show({
									title : ''
											+ getResource('resourceParam594')
											+ '',
									msg : '' + getResource('resourceParam681')
											+ '',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								});
					}
				});

		addOrg.closeWin();
	}
}
// 增加机构form表单
addOrg.initForm = function(parentName, parentcode, kind, treecode, nodeid) {
	Ext.form.Field.prototype.msgTarget = 'side';
	addOrg.orgForm = {
		xtype : 'form',
		bodyStyle : 'padding:5px 5px 0;background:transparent',
		labelAlign : "left",
		labelSeparator : ':',
		labelWidth : 95,
		frame : true,
		buttons : [{
			text : '' + getResource('resourceParam505') + '',//确认
			handler : function() {
				Ext.Ajax.request({
					url : "../JSON/base_organization_OrganizationService.getOrgByInstcode",
					params : {
						"instcode" : addOrg.orgForm.form.getValues().instcode
					},
					success : function(response, opt) {
						if (response.responseText != "null") {
							Ext.Msg.alert("" + getResource('resourceParam575')
											+ "", ""
											+ getResource('resourceParam688')//机构编码
											+ ""
											+ getResource('resourceParam509') //已
											+ "存在！");
						} else {
							addOrg.submit(parentcode)
						}
					},
					disableCaching : true,
					autoAbort : true
				});
			}
		}, {
			text : '' + getResource('resourceParam3001') + '',//取消
			handler : addOrg.closeWin
		}],

		items : [{
					xtype : 'textfield',
					minLength : 1,
					maxLength : 16,
					allowNegative : false,
					allowDecimals : false,
					id : 'instcode',
					fieldLabel : "" + getResource('resourceParam688') + "",
					name : "instcode",
					anchor : "90%",
					allowBlank : false,
					regex : /^[0-9]*[1-9][0-9]*$/,// /^\d*$/,
					regexText : '' + getResource('resourceParam9171') + ''
				}, {
					xtype : 'textfield',
					id : 'name',
					minLength : 1,
					maxLength : 50,
					regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\s|\d)*$/,
					regexText : '' + getResource('resourceParam679') + '',
					fieldLabel : "" + getResource('resourceParam685') + "",
					name : "name",
					anchor : "90%",
					allowBlank : false
				}, {
					xtype : 'combo',
					anchor : "90%",
					store : new Ext.data.Store({

						proxy : new Ext.data.HttpProxy({
							url : '../JSON/maintenance_deptype_deptypeService.getDeptypeName'
						}),
						reader : new Ext.data.JsonReader({
									totalProperty : 'totalProperty',
									root : 'results'
								}, [{
											name : 'typename'
										}, {
											name : 'deptypeid'
										}]),
						baseParams : {
							deptypeid : kind
						}
					}),
					valueField : "deptypeid",
					displayField : "typename",
					mode : 'remote',
					forceSelection : true,
					hiddenName : 'kind',
					editable : false,
					triggerAction : 'all',
					fieldLabel : '' + getResource('resourceParam686') + '',
					blankText : '' + getResource('resourceParam683') + '',
					name : 'kind',
					emptyText : '' + getResource('resourceParam684') + '',
					allowBlank : false
				}, {
					xtype : 'textfield',
					minlength : 1,
					maxLength : 10,
					allowNegative : false,
					allowDecimals : false,
					fieldLabel : "" + getResource('resourceParam687') + "",
					regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d)*$/,
					regexText : '' + getResource('resourceParam679') + '',
					disabled : true,
					anchor : "90%",
					value : parentName,
					disabled : true
				}, {
					xtype : 'textfield',
					name : 'parentcode',
					hidden : true,
					value : parentcode.get("instcode")
				}, {
					xtype : 'textfield',
					name : 'treecode',
					hidden : true,
					value : treecode
				}, {
					xtype : 'textfield',
					name : 'instlevel',
					hidden : true,
					value : kind == 0 ? 1 : 2
				}]
	}

	return addOrg.orgForm;
}
addOrg.init = function(title, nodeInf) {
	if (nodeInf == null) {
		Ext.MessageBox.alert('' + getResource('resourceParam663') + '', '' + getResource('resourceParam662') + '');
	} else {
		var parentcode = nodeInf;
		var parentName = nodeInf.get("name");
		var kind = nodeInf.get("kind");
		// if (kind == '0') {
		// addOrg.kindData = [['1', '集团公司'], ['2', '公司机关'], ['3', '分厂']];
		// } else {
		// addOrg.kindData = [['4',
		// '' + getResource('resourceParam689') + '(处/科室)']];
		// }
		var treecode = nodeInf.get("treecode");

		// if(kind > 3) {
		// Ext.MessageBox.alert('操作提示','该组织不允许再添加属下组织');
		// } else {
		addOrg.initWindow(title);
		addOrg.orgForm = addOrg.orgWin.add(addOrg.initForm(parentName,parentcode, kind, treecode));
		addOrg.orgWin.show(this);
		// }
	}
};
