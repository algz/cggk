var dataObjectAdd = {

}
dataObjectAdd.init = function() {
	var saveButton = new Ext.Button({
		id : 'saveButton',
		text : '' + getResource('resourceParam7002') + '',// 保存
		handler : function() {
			if (addform.getForm().isValid()) {
				// /JSON/iconFileDownload
				// var vo = Seam.Remoting
				// .createType("com.sysware.edm.dataClassification.DataCategoryMeta");
				Ext.Ajax.request({
					url : '../JSON/dataobject_DataObjectRemote.getNameExist',
					method : 'POST',
					success : function(response, options) {
						var obj = Ext.util.JSON.decode(response.responseText);

						if (obj != 0) {
							Ext.example.msg(''
											+ getResource('resourceParam596')
											+ '', categoryName.getValue()// 提示信息
											+ ' 已存在！');
							// categoryName.invalidText = categoryName
							// .getValue()
							// + ' 已存在';
							categoryName.focus();
							return;
						} else {
							addform.getForm().submit({
								url : "../JSON/iconFileUpload",
								method : 'POST',
								failure : function() {
									Ext.MessageBox.show({
										title : ''
												+ getResource('resourceParam575')
												+ '',
										msg : ""
												+ getResource('resourceParam1558')
												+ "",
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.ERROR
									});
								},
								success : function(form, action) {
									var obj = Ext.util.JSON
											.decode(action.response.responseText);
									var filepath = action.response.responseText;
									var vo = Seam.Component
											.newInstance("dataCategoryMeta");
									Ext
											.apply(vo, addform.getForm()
															.getValues());
									vo.setIcon(obj.fileName);
									callSeam("dataobject_DataObjectRemote",
											"addDataObejct", [vo], function(
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
													// 新增完毕
													/**
													 * Update by YangJin'gang
													 * begin
													 */
													dataObjectList.grid.store
															.reload();
													/** end */
													/*
													 * myGrid.loadvalue(dataObjectList.grid.store,
													 * dataObjectList.args,
													 * dataObjectList.baseargs);
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
							})
						}
					},
					disableCaching : true,
					autoAbort : true,
					params : {
						name : categoryName.getValue(),
						categorytype : 1

					}
				});
			}
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
				id : 'categoryName',
				fieldLabel : '' + getResource('resourceParam1746') + '',
				style : 'margin-bottom: 5px;',
				allowBlank : false,
				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\s|\d|[-,._])*$/,
				regexText : '' + getResource('resourceParam1092') + '!',
				maxLength : 50,
				maxLengthText : '' + getResource('resourceParam7010') + '',// 长度不能超过50
				blankText : '' + getResource('resourceParam1743') + '',
				emptyText : '' + getResource('resourceParam1743') + '',
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
						Ext.getCmp('categoryName').setValue(curStr);
					}
				}
			});
	var description = new Ext.form.TextArea({
				style : 'margin-bottom: 5px;',
				name : 'description',
				fieldLabel : '' + getResource('resourceParam648') + '',
				allowBlank : true,
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
	var appointIcon = new Ext.form.TextField({
				inputType : 'file',
				allowBlank : true,
				fieldLabel : '' + getResource('resourceParam1745') + '',
				validator : function() {
					var str = appointIcon.getValue().toLowerCase();
					if ("" != str && null != str) {
						var index = str.lastIndexOf('.');
						if (-1 == index) {
							appointIcon.invalidText = '限制的'
									+ getResource('resourceParam481')
									+ '为gif、png、jpeg、jpg';
							appointIcon.focus();
							return false;
						} else {
							var temp = str.substr(index + 1, str.length);

							if (temp != 'gif' && temp != 'png'
									&& temp != 'jpeg' && temp != 'jpg') {
								appointIcon.invalidText = '限制的'
										+ getResource('resourceParam481')
										+ '为gif、png、jpeg、jpg';
								appointIcon.focus();
								return false;
							} else {
								return true;
							}
						}

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
				inputType : 'hidden'
			});
	var addform = new Ext.form.FormPanel({
				id : 'addform',
				fileUpload : true,
				bodyStyle : 'padding:5px 5px',
				defaults : {
					anchor : '90%',
					// allowBlank : false,
					msgTarget : 'side',
					labelAlign : 'right',
					style : 'margin-bottom: 5px;'

				},

				items : [categoryName, groups, description, appointIcon],

				buttons : [saveButton, resetButton]
			});
	var addWin = new Ext.Window({
				title : '' + getResource('resourceParam1744') + '',
				width : 400,
				height : 210,
				modal : true,
				closable : true,
				closeAction : 'close',
				layout : 'fit',
				items : [addform]

			});
	addWin.show();

}
