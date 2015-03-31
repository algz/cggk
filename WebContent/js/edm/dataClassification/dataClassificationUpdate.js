var dataClassificationUpdate = {

}

dataClassificationUpdate.init = function() {
	if (dataClassificationList.grid.getSelectionModel().getCount() == 0) { // 如未选中任何一行，则不执行操作
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam663') + '',
					msg : '' + getResource('resourceParam459') + '一个标签!',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.WARNING
				});
		return false;
	}
	var record = dataClassificationList.grid.getSelectionModel()
			.getSelections()[0];
	var updateButton = new Ext.Button({
		id : 'updateButton',
		text : '' + getResource('resourceParam7002') + '',// 保存
		handler : function() {
			Ext.Ajax.request({
				url : '../JSON/dataobject_DataObjectRemote.getNameExist',
				method : 'POST',
				success : function(response, options) {
					var obj = Ext.util.JSON.decode(response.responseText);
					if (obj != 0) {
						Ext.example.msg('' + getResource('resourceParam596')
										+ '', categoryName.getValue()// 提示信息
										+ ' 已存在！');
						categoryName.focus();
						return;
					} else {
						if (updateform.getForm().isValid()) {
							// var vo = Seam.Remoting
							// .createType("com.sysware.edm.dataClassification.DataCategoryMeta");
							// var vo =
							// Seam.Component.newInstance("dataCategoryMeta");
							var vo = Seam.Component
									.newInstance("DataCategoryVO");
							Ext.apply(vo, updateform.getForm().getValues());
							callSeam(
									"dataClassification_DataClassificationRemote",
									"updateDataClassification", [vo], function(
											result) {
										if ("success" == result) {
											Ext.Msg.show({
												title : ''
														+ getResource('resourceParam596')
														+ '',
												msg : ''
														+ getResource('resourceParam677')
														+ '',
												width : 170,
												buttons : Ext.Msg.OK,
												icon : Ext.Msg.INFO
											});
											updateWin.close();
											/**
											 * Update by YangJin'gang begin
											 */
											dataClassificationList.grid.store
													.reload();
											/** end */
											/*
											 * myGrid.loadvalue(
											 * dataClassificationList.grid.store,
											 * dataClassificationList.args,
											 * dataClassificationList.baseargs);
											 */
										} else {
											Ext.Msg.show({
												title : ''
														+ getResource('resourceParam596')
														+ '',
												msg : ''
														+ getResource('resourceParam572')
														+ '!',
												width : 170,
												buttons : Ext.Msg.OK,
												icon : Ext.Msg.ERROR
											});
											updateWin.close();
										}
									});
						}
					}
				},
				disableCaching : true,
				autoAbort : true,
				params : {
					name : categoryName.getValue(),
					categoryId : categoryId.getValue(),
					categorytype : 2
				}
			});
		}
	});
	var resetButton = new Ext.Button({
				id : 'resetButton',
				text : '' + getResource('resourceParam606') + '',
				handler : function() {
					updateform.getForm().reset();
				}
			});
	var categoryId = new Ext.form.TextField({
				id : 'categoryId',
				name : 'categoryId',
				inputType : 'hidden',
				value : record.get("categoryId")
			});
	var categoryName = new Ext.form.TextField({
		id : 'categoryNameY',
		name : 'categoryName',
		fieldLabel : '标签' + getResource('resourceParam480') + '',
		style : 'margin-bottom: 5px;',
		allowBlank : false,
		blankText : '请' + getResource('resourceParam494') + '标签'
				+ getResource('resourceParam480') + '！',
		maxLength : 50,
		minLengthText : '' + getResource('resourceParam782') + '',
		regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[-,._])*$/,
		regexText : '' + getResource('resourceParam1092') + '!',
		value : record.get("categoryName"),
			/**
			 * 取消全角输入时的空格bug
			 * 
			 * @author wangyf 2011-04-20 17:00
			 */
			 enableKeyEvents : true,
			 listeners : {'blur' : function(cur, evt) {
				 var curStr = cur.getValue();
				 for(var i = 0; i < curStr.length; i++) {
					 var str = curStr.charCodeAt(i);
					 if(str == 12288) {
						 if(typeof curStr[i] == 'undefined' || curStr[i] == '　') {
							 curStr = curStr.replace('　', ' ');
						 }
					 }
				 }
			 	Ext.getCmp('categoryNameY').setValue(curStr);
			 }}
		});
	var description = new Ext.form.TextArea({
				id : 'description',
				style : 'margin-bottom: 5px;',
				name : 'description',
				fieldLabel : '' + getResource('resourceParam648') + '',
				allowBlank : true,
				value : record.get("description"),
				validator : function() {
					var str = Ext.util.Format.trim(description.getValue());
					var size = 0;
					for (var i = 0; i < str.length; i++) {
						var code = str.charCodeAt(i);
						if (code > 255) {
							size += 2;
						} else {
							size += 1;
						}
					}
					if (size > 200) {
						description.invalidText = ' '
								+ getResource('resourceParam648') + ''
								+ getResource('resourceParam1386') + '200！';
						description.focus();
						return false;
					} else {
						return true;
					}
				}
			});
	var groups = new Ext.form.TextField({
				id : 'groups',
				style : 'margin-bottom: 5px;',
				name : 'groups',
				fieldLabel : '' + getResource('resourceParam1740') + '',
				allowBlank : true,
				value : record.get("groups"),
				inputType : 'hidden'
			});
	var updateform = new Ext.FormPanel({
				id : 'updateform',
				bodyStyle : 'padding:5px 5px',
				defaults : {
					anchor : '90%',
					// allowBlank : false,
					msgTarget : 'side',
					labelAlign : 'right',
					style : 'margin-bottom: 5px;'
				},
				items : [categoryName, groups, description, categoryId],

				buttons : [updateButton, resetButton]
			});
	var updateWin = new Ext.Window({
				id : 'updateWin',
				title : '' + getResource('resourceParam478') + '标签',
				width : 400,
				height : 200,
				modal : true,
				closable : true,
				resizable : false,
				closeAction : 'close',
				layout : 'fit',
				items : [updateform]
			});
	updateWin.show();
}
