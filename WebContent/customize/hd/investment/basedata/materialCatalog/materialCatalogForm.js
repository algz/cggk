var materialCatalogForm = {
		isUpdate : false,
		theMaterialcatalogCode : ""
};
materialCatalogForm.getForm = function(rd) {
	var items = [ {
		layout : 'form',
		border : false,
		width : '100%',
		defaults : {
			border : false,
			labelWidth : 70
		},
		items : [ {
				xtype : 'hidden',
				name : 'id',
				id : 'id'
			}, {
				xtype : 'hidden',
				name : 'parentid',
				value : materialCatalogTree.parentId
			}, {
				xtype : 'hidden',
				name : 'isUpdate',
				value : materialCatalogForm.isUpdate
			}, 
			/*{
				fieldLabel : '<font color=red>*</font>物资种类编码',
				id : "materialcatalogCode",
				xtype : 'textfield',
				allowBlank : true,
				//maxLength : 20,
				//maxLengthText : '最多可输入25个字，请重新输入！',
				disabled : true ,
				readOnly : materialCatalogForm.isUpdate ,
				anchor : '100%'
			}*/
			{
				fieldLabel : '<font color=red>*</font>物资种类名称',
				id : "materialtypename",
				xtype : 'textfield',
				allowBlank : false,
				maxLength : 20,
				maxLengthText : '最多可输入20个字，请重新输入！',
				disabled : false ,
				readOnly : materialCatalogForm.isUpdate ,
				anchor : '100%'
			}, {
				fieldLabel : '备注',
				id : "remark",
				xtype : 'textarea',
				height : 90,
				allowBlank : true,
				maxLength : 200,
				maxLengthText : '最多可输入200个字，请重新输入！',
				disabled : false,
				anchor : '100%'
			} ]
	} ];

	var inform = new Ext.FormPanel( {
		id : 'materialCatalogFrom',
		buttonAlign : 'center',
		labelAlign : 'left',
		bodyStyle : 'padding:10,0,0,0',
		autoHeight : true,
		padding : 5,
		frame : false,
		items : items
	});
	if (rd) {
		inform.getForm().loadRecord(rd);
	}
	var buttons = [
			{
				text : ' 确定 ',
				handler : function() {
					if (inform.form.isValid()) {//null字符串验证
						if (inform.form.getValues().materialtypename.length > 0
								&& inform.form.getValues().materialtypename != 'null') {
							if (inform.form.getValues().remark != 'null') {
								inform.form.doAction('submit', {
									waitMsg : '正在保存数据，请稍候...',
									waitTitle : '提示',
									url : '../JSON/materialCatalogRemote.save',
									method : 'post',
									success : function(form, action) {
									var result = action.result.info;
									if(result=="name"){
										Ext.Msg.alert('提示', '物质种类名称已经存在，请重新输入！');
									}else{
										Ext.Msg.alert('提示', '保存数据成功！');
										form.reset();
										materialCatalogForm.isUpdate = false;
										window.close();
										materialCatalogAction.treeRefresh();
									}
								}
								})
							} else {
								Ext.Msg.alert('提示', '备注不能为 null');
							}

						} else {
							Ext.Msg.alert('提示', '物质种类名称不能为 null');
						}
					}
				}
			}, {
				text : '取消',
				handler : function() {
					inform.getForm().reset();
					materialCatalogForm.isUpdate = false;
					window.close();
				}
			} ]

	var window = new Ext.Window( {
		id : "materialCatalogAddWind",
		width : 480,
		height : 230,
		layout : 'fit',
		title : '&nbsp;物资种类-新增',
		modal : true,
		items : inform,
		buttons : buttons
	});
	return window;

}
