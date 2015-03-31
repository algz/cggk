var roleSelect = {
	selectDialog : null,
	roleform : null,
	sel : false
};

/**
 * 查询角色
 */
roleSelect.init = function() {

	if (!roleSelect.selectDialog) {
		tlework.addHtml(tlework.divHtml, "roleselect");
		roleSelect.selectDialog = new Ext.Window({
					el : 'roleselect',
					title : '' + getResource('resourceParam837') + '',
					modal : true,
					layout : 'fit',
					width : 300,
					height : 160,
					closeAction : 'hide',
					plain : false,
					items : roleSelect.selectroleform()
				});
	}
	roleSelect.selectDialog.show();
	roleSelect.selectDialog.on("hide", function() {
				roleSelect.selectDialog.close();
				roleSelect.selectDialog.destroy();
				roleSelect.selectDialog = null;

			});
};

/**
 * 生成查询角色的Form面板
 */
roleSelect.selectroleform = function() {
	roleSelect.roleform = new Ext.FormPanel({

				labelWidth : 75, // label settings here cascade unless
									// overridden
				frame : false,
				plain : false,
				bodyStyle : 'padding:5px 5px 0;background:transparent',
				width : 350,
				defaults : {
					width : 230
				},
				defaultType : 'textfield',
				items : [{
							xtype : 'numberfield',
							fieldLabel : '' + getResource('resourceParam809')
									+ '',
							name : 'roleid',
							width : 175
						}, {
							fieldLabel : '' + getResource('resourceParam797')
									+ '',
							name : 'rolename',
							width : 175
						}, {
							fieldLabel : '' + getResource('resourceParam9106')
									+ '',
							name : 'jianPinyinName',
							width : 175
						}],
				buttons : [{
					text : '' + getResource('resourceParam652') + '',
					handler : function() {
						var roleVo = Seam.Remoting
								.createType("com.luck.itumserv.base.role.RoleVo");
						Ext.apply(roleVo, roleSelect.roleform.getForm()
										.getValues());
						roleMain.baseargs = {
							roleid : roleVo.getRoleid(),
							rolename : roleVo.getRolename(),
							roleType : roleVo.getRoleType(),
							pinyinName : roleVo.getPinyinName(),
							jianPinyinName : roleVo.getJianPinyinName()
						};

						myGrid.loadvalue(roleMain.rolegrid.store,
								roleMain.args, roleMain.baseargs);
						roleSelect.sel = true;
						roleSelect.selectDialog.hide();
					}

				}, {
					text : '' + getResource('resourceParam7007') + '',
					handler : function() {
						roleSelect.selectDialog.hide();
					}
				}]
			});
	return roleSelect.roleform;
};

roleSelect.fileUploadForm = function() {//物料信息上传form方法
	var items = [ {//物料信息上传组件
		xtype : "textfield",
		fieldLabel : '上传文件',
		name : 'file',
		inputType : 'file',
		id : 'file1',
		allowBlank : false
	} ];
	var inform = new Ext.FormPanel( {//物料信息上传form
		id : 'roleFileUploadForm',
		buttonAlign : 'center',
		labelAlign : 'left',
		padding : 5,
		fileUpload : true,
		labelWidth : 70,		
		frame : false,
		items : items
	});
	var buttons = [ {
		text : '确定',
		handler : function() {
			if (!inform.form.isValid()) return;	//判断上传文件Excel的文件后缀名是否为‘.xls’，其余的格式文件上传为非法上传		
			var fileName = inform.form.findField('file').getValue().toLowerCase().trim();
			if (fileName.lastIndexOf('.') == -1) {
				Ext.Msg.alert('提示','仅支持扩展名为.xls的Excel文件!');
				return;
			}
			if(fileName.substr(fileName.lastIndexOf('.')) != '.xls' && fileName.substr(fileName.lastIndexOf('.')) != '.xlsx'){
				Ext.Msg.alert('提示','仅支持扩展名为.xls的Excel文件!');
				return;
			}			
					inform.form.doAction('submit', {
						waitMsg : '正在上传数据，请稍候...',
						waitTitle : '提示',
						url : '../roleUploadServlet',
						method : 'post',
						success : function(form, action) {
							form.reset();
							window.close();
							if(action.result.ImportExcelVo.redupObjs == ''){
								Ext.Msg.alert('提示', '上传数据成功！');
							}   
						},
						failure : function(form, action){
							window.close();
							form.reset(); 
							Ext.Msg.alert('提示', '上传数据失败！');
						}
					});
		}
	}, {
		text : '取消',
		handler : function() {
			inform.getForm().reset();
			window.close();
		}
	} ];

	var window = new Ext.Window( {//物料信息上传窗口
		id : "roleFileUploadWind",
		layout : 'fit',
		width : 300,
		height : 100,
		title : '&nbsp;角色信息-上传',
		modal : true,
		items : inform,
		buttons : buttons
	});
	return window;

}
