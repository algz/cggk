var dataObjectUpdate = {

}

dataObjectUpdate.init = function() {
	if (myGrid.row == null) { // 如未选中任何一行，则不执行操作
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam663') + '', // 操作提示
					msg : '' + getResource('resourceParam1760') + '!!',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.WARNING
				});
		return false;
	}

	var rc = dataObjectList.grid.getSelectionModel().getSelected();

	var updateButton = new Ext.Button({
		id : 'updateButton',
		text : '' + getResource('resourceParam7002') + '',// 保存
		handler : function() {
			Ext.Ajax.request({
				url : '../JSON/dataobject_DataObjectRemote.getNameExist?'
						+ new Date(),
				method : 'POST',
				success : function(response, options) {
					var obj = Ext.util.JSON.decode(response.responseText);

					if (obj != 0) {

						Ext.example.msg('' + getResource('resourceParam596')
										+ '', categoryName.getValue()// 提示信息
										+ ' 已存在！');
						// categoryName.invalidText =
						// categoryName.getValue()
						// + ' 已存在';
						categoryName.focus();
						return;
					} else {
						if (updateform.getForm().isValid()) {
							updateform.getForm().submit({

								url : "../JSON/iconFileUpload",
								method : 'POST',
								failure : function() {
									Ext.MessageBox.show({
										title : ''
												+ getResource('resourceParam575') // 提示
												+ '',
										msg : ""
												+ getResource('resourceParam1558')// 上传文件出错！
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
											.newInstance("DataCategoryVO");
									Ext.apply(vo, updateform.getForm()
													.getValues());
									if (obj.fileName) { // 如果文件空件没有选图片，则不添加，否则添加
										vo.setIcon(obj.fileName);
									}

									callSeam(
											"dataClassification_DataClassificationRemote",
											"updateDataClassification", [vo],
											function(result) {
												if ("success" == result) {
													Ext.Msg.show({
														title : ''
																+ getResource('resourceParam596')// 提示信息
																+ '',
														msg : ''
																+ getResource('resourceParam677')// 修改成功!
																+ '',
														width : 170,
														buttons : Ext.Msg.OK,
														icon : Ext.Msg.INFO
													});
													updateWin.close();

													/**
													 * Update by YangJin'gang
													 * begin
													 */
													dataObjectList.grid
															.getStore()
															.reload();
													/** end */

													/*
													 * myGrid.loadvalue(
													 * dataObjectList.grid.store,
													 * dataObjectList.args,
													 * dataObjectList.baseargs);
													 */
												} else {
													Ext.Msg.show({
														title : ''
																+ getResource('resourceParam596')// 提示信息
																+ '',
														msg : ''
																+ getResource('resourceParam572')// 修改失败!
																+ '!',
														width : 170,
														buttons : Ext.Msg.OK,
														icon : Ext.Msg.ERROR
													});
													updateWin.close();
												}

											});
								}

							})

							// var vo = Seam.Remoting
							// .createType("com.sysware.edm.dataClassification.DataCategoryMeta");

						}
					}
				},
				disableCaching : true,
				autoAbort : true,
				params : {
					name : categoryName.getValue(),
					categoryId : categoryId.getValue(),
					categorytype : 1
				}
			});

		}
	});
	var resetButton = new Ext.Button({
				id : 'resetButton',
				text : '' + getResource('resourceParam606') + '', // 重置
				handler : function() {
					updateform.getForm().reset();
				}
			});
	var categoryId = new Ext.form.TextField({
				id : 'categoryId1',
				name : 'categoryId',
				inputType : 'hidden',
				value : rc.get("categoryId")
			});
	var categoryName = new Ext.form.TextField({
				id : 'categoryName1',
				name : 'categoryName',
				fieldLabel : '' + getResource('resourceParam1742') + '',// 分类名称
				style : 'margin-bottom: 5px;',
				allowBlank : false,
				blankText : '' + getResource('resourceParam1758') + '',// 请输入分类名称！
				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\s|\d|[-,._])*$/,
				regexText : '' + getResource('resourceParam1092') + '!', // 只能输入中文,字母,数字,英文逗号,英文句号!
				value : rc.get("categoryName"),
				maxLengthText : '' + getResource('resourceParam7010') + '',// 长度不能超过50
				blankText : '' + getResource('resourceParam1743') + '', // 请输入对象名称！
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
						Ext.getCmp('categoryName1').setValue(curStr);
					}
				}
			});
	var description = new Ext.form.TextArea({
				id : 'description1',
				style : 'margin-bottom: 5px;',
				name : 'description',
				fieldLabel : '' + getResource('resourceParam648') + '',// 描述
				allowBlank : true,
				value : rc.get("description"),
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
								+ getResource('resourceParam648') + '' // 描述
								+ getResource('resourceParam1386') + '200！'; // 长度不能大于
						description.focus();
						return false;
					} else {
						return true;
					}
				}
			});

	var groups = new Ext.form.TextField({
				id : 'groups1',
				style : 'margin-bottom: 5px;',
				name : 'groups',
				fieldLabel : '' + getResource('resourceParam1740') + '',// 类型分组
				allowBlank : true,
				value : rc.get("groups"),
				inputType : 'hidden'
			});
	// var iconText = new Ext.form.TextField( {
	// id : 'appointIcon1',
	// style : 'margin-bottom: 5px;',
	// name : 'appointIcon',
	// allowBlank : true,
	// value : myGrid.row.get("icon"),
	// fieldLabel : '' + getResource('resourceParam1745') + '' // 上传图片
	//
	// });
	var appointIcon = new Ext.form.TextField({
				id : 'appointIcon1',
				name : 'appointIcon',
				inputType : 'file',
				allowBlank : true,
				fieldLabel : '' + getResource('resourceParam1745') + '', // 上传图片
				validator : function() {
					var str = appointIcon.getValue().toLowerCase();
					if ("" != str && null != str) {
						var index = str.lastIndexOf('.');
						if (-1 == index) {
							appointIcon.invalidText = '限制的'
									+ getResource('resourceParam481')// 类型
									+ '为gif、png、jpeg、jpg';
							appointIcon.focus();
							return false;
						} else {
							var temp = str.substr(index + 1, str.length);

							if (temp != 'gif' && temp != 'png'
									&& temp != 'jpeg' && temp != 'jpg') {
								appointIcon.invalidText = '限制的'
										+ getResource('resourceParam481') // 类型
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
	var afafa = new Ext.form.DisplayField( // 数据对象修改展示图片
			{
		html : "<div style='width:28px;height:28px;'><image width=100% height=100% src='../base/icons/edm/"
				+ rc.get('icon') + "?" + new Date() + "'></div>"
	});
	var updateform = new Ext.FormPanel({
				id : 'updateform1',
				bodyStyle : 'padding:5px 5px',
				fileUpload : true,
				defaults : {
					anchor : '90%',
					// allowBlank : false,
					msgTarget : 'side',
					labelAlign : 'right',
					style : 'margin-bottom: 5px;'

				},
				items : [categoryName, groups, description, categoryId,
						appointIcon, afafa],
				buttons : [updateButton, resetButton]
			});
	var updateWin = new Ext.Window({
				id : 'updateWin',
				title : '' + getResource('resourceParam1759') + '',// 修改数据对象信息
				width : 400,
				height : 250,
				modal : true,
				closable : true,
				closeAction : 'close',
				layout : 'fit',
				items : [updateform]

			});
	updateWin.show();

}
