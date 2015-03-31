var dataClassificationAdd = {

}
dataClassificationAdd.init = function() {
	var saveButton = new Ext.Button({
		id : 'saveButton',
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
						if (addform.getForm().isValid()) {
							var vo = Seam.Component
									.newInstance("DataCategoryVO");
							// var vo = Seam.Remoting
							// .createType("com.sysware.edm.dataClassification.DataCategoryVO")
							Ext.apply(vo, addform.getForm().getValues());
							callSeam(
									"dataClassification_DataClassificationRemote",
									"addDataClassification", [vo], function(
											result) {
										if ("success" == result) {
											Ext.Msg.show({
												title : ''
														+ getResource('resourceParam596')
														+ '',
												msg : ''
														+ getResource('resourceParam623')
														+ '',
												width : 170,
												buttons : Ext.Msg.OK,
												icon : Ext.Msg.INFO
											});
											addWin.close();

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
														+ getResource('resourceParam594')
														+ '!',
												width : 170,
												buttons : Ext.Msg.OK,
												icon : Ext.Msg.ERROR
											});
											addWin.close();
										}
									});

						}
					}
				},
				disableCaching : true,
				autoAbort : true,
				params : {
					name : categoryName.getValue(),
					categorytype : 2
				}
			});

		}
	});
	var resetButton = new Ext.Button({
				id : 'resetButton',
				text : '' + getResource('resourceParam3001') + '',
				handler : function() {
					addWin.close();
				}
			});
	var categoryName = new Ext.form.TextField({
				name : 'categoryName',
				id : 'categoryNameW',
				fieldLabel : '标签' + getResource('resourceParam480') + '',
				style : 'margin-bottom: 5px;',
				allowBlank : false,
				blankText : '请' + getResource('resourceParam494') + '标签'
						+ getResource('resourceParam480') + '！',
				maxLength : 50,
				minLengthText : '' + getResource('resourceParam782') + '',
				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[-,._])*$/,
//				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d)*$/,
				regexText : '' + getResource('resourceParam1092') + '!',
				/**
				 * 取消全角输入时的空格bug
				 * @author wangyf
				 * 2011-04-20 17:00
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
						Ext.getCmp('categoryNameW').setValue(curStr);
					}
				}
			});
	var description = new Ext.form.TextArea({
				style : 'margin-bottom: 5px;',
				name : 'description',
				fieldLabel : '' + getResource('resourceParam648') + '',
				allowBlank : true,
				maxLength : 200,
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
				inputType : 'hidden',
				allowBlank : true
			});
	var addform = new Ext.FormPanel({
				id : 'addform',
				bodyStyle : 'padding:5px 5px',
				defaults : {
					anchor : '90%',
					// allowBlank : false,
					msgTarget : 'side',
					labelAlign : 'right',
					style : 'margin-bottom: 5px;'

				},
				items : [categoryName, groups, description],

				buttons : [saveButton, resetButton]
			});
	var addWin = new Ext.Window({
				id : 'addWin',
				title : '' + getResource('resourceParam647') + '标签',
				resizable : false,
				width : 400,
				height : 200,
				modal : true,
				closable : true,
				closeAction : 'close',
				layout : 'fit',
				items : [addform]

			});
	addWin.show();

}
