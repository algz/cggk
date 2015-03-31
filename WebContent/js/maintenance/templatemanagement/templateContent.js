var templateContent = {
	deepLevel : 0,
	parentId : 0,
	privilege : false
};
templateContent.init = function(config) {

	templateContent.contentName = new Ext.form.TextField({
				name : 'contentsname',
				id : 'quanjiao',
				fieldLabel : getResource('resourceParam5004'),
				style : 'margin-bottom: 5px;',
				allowBlank : false,
				blankText : '' + getResource('resourceParam1560') + '',
				maxLength : 100,
				maxLengthText : '不能超过100个字符！',
				minLength : 1,
				minLengthText : '' + getResource('resourceParam1002') + '',
				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d)*$/,
				regexText : '' + getResource('resourceParam679') + '',
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
						Ext.getCmp('quanjiao').setValue(curStr);
					}
				}
			});

	templateContent.contentForm = new Ext.form.FormPanel({
		bodyStyle : 'padding:10px 0px 10px 10px',
		frame : false,
		/**
		 * bug编号674 wangyf
		 * bug信息：在流程模板管理列表中，修改模板分类或者模板时，进入的界面显示为新建或添加。建议将新建或添加改为修改。
		 * 2011-05-19 14：44
		 */
		/***begin***/
//		title : getResource('resourceParam9796') + "",
		title : ' ',
		/***end***/
		boder : false,
		defaults : {
			anchor : '62%'
		},
		items : [templateContent.contentName],
		buttons : [{
			text : '保存',
			handler : function() {
				if (config && config.update) {
					if (templateContent.contentForm.getForm().isValid()) {
						Ext.Ajax.request({
							url : "../JSON/groups_GroupsRemote.updateWBSTemplateContent",
							method : 'POST',
							success : function(response, options) {
								var obj = Ext.util.JSON
										.decode(response.responseText);
								templateContent.contentForm.getForm().reset();
								if (obj.success == true) {
									Ext.example.msg('提示', '更新成功');
									if (config && config.successCallback) {
										config.successCallback();
									}
								} else {
									if (config && config.cancelCallback) {
										config.cancelCallback();
									}
									Ext.MessageBox.show({
														title : ''
																+ getResource('resourceParam499')
																+ '',
														msg : obj.message,
														buttons : Ext.MessageBox.OK,
														icon : Ext.MessageBox.ERROR
													});
								}
							},
							params : {
								itemID : templateContent.itemId,
								itemName : templateContent.contentName
										.getValue(),
								parentID : templateContent.parentId,
								deepLevel : templateContent.deepLevel,
								privilege : templateContent.privilege
							}
						});

					}
				} else {
					if (templateContent.contentForm.getForm().isValid()) {
						Ext.Ajax.request({
							url : "../JSON/groups_GroupsRemote.addWBSTemplateContent",
							method : 'POST',
							success : function(response, options) {
								var obj = Ext.util.JSON
										.decode(response.responseText);
								templateContent.contentForm.getForm().reset();
								if (obj.success == true) {
									Ext.example.msg('提示', '添加成功');
									if (config && config.successCallback) {
										config.successCallback();
									}
									Ext.getCmp('statusW').enable();
								} else {
									if (config && config.cancelCallback) {
										config.cancelCallback();
									}
								}
							},
							params : {
								itemName : templateContent.contentName
										.getValue(),
								parentID : templateContent.parentId,
								deepLevel : templateContent.deepLevel,
								itemID : templateContent.itemId
							}
						});

					}
				}
			}
		}, {
			text : '取消',
			handler : function() {
				Ext.getCmp('statusW').enable();
				if (config && config.cancelCallback) {
					config.cancelCallback();
				}
			}
		}]
	});
	templateContent.setBasic = function() {
		templateContent.contentForm.getForm().reset();
		Ext.Ajax.request({
					url : "../JSON/groups_GroupsRemote.getWBSTemplateContentInfo",
					method : 'POST',
					success : function(response, options) {
						var obj = Ext.util.JSON.decode(response.responseText);
                        if(obj.success){
						templateContent.contentName.setValue(obj.contentsname);
                        }else{
							Ext.MessageBox.show({
										title : ''
												+ getResource('resourceParam499')
												+ '',
										msg : obj.message,
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.ERROR
									});
                        }
					},
					params : {
						itemID : templateContent.itemId
					}
				});
	}
	templateContent.mainPanel = new Ext.Panel({
				layout : 'fit',
				border : false,
				frame : false,
				autoScroll : true,
				bodyStyle : 'overflow:auto;',
				items : [templateContent.contentForm]
			});

	return templateContent.mainPanel;
}
