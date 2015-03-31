var atemplateContent = {
	deepLevel : 0,
	parentId : -1,
	privilege : false
};
atemplateContent.init = function(config) {
	// 创建文本域分类名称
	atemplateContent.contentName = new Ext.form.TextField({
				id : 'quanjiao',
				name : 'typeName',
				fieldLabel : getResource('resourceParam5004'),
				style : 'margin-bottom: 5px;',
				allowBlank : false,
				blankText : '' + getResource('resourceParam1560') + '',
				maxLength : 20,
				maxLengthText : '' + getResource('resourceParam1000') + '',
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

	// 新建form表单实现新增或修改审批模板分类
	atemplateContent.contentForm = new Ext.form.FormPanel({
		bodyStyle : 'padding:10px 0px 10px 10px',
		width : 500,
		height : 350,
		frame : false,
		title : getResource('resourceParam5005'),
		boder : false,
		defaults : {
			anchor : '62%'
		},
		items : [atemplateContent.contentName],
		buttons : [{
			text : ''+getResource('resourceParam5019')+'',
			handler : function() {
				if (config && config.update) {
					if (atemplateContent.contentForm.getForm().isValid()) {
						Ext.Ajax.request({
							url : "../JSON/approval_templetRemote.updateFlowType",// 修改审批模板分类
							method : 'POST',
							success : function(response, options) {
								var obj = Ext.util.JSON
										.decode(response.responseText);
								atemplateContent.contentForm.getForm().reset();
								if (obj.success == true) {
									Ext.example.msg(''+getResource('resourceParam575')+'', ''+getResource('resourceParam4025')+'');
									if (config && config.successCallback) {
										config.successCallback();
									}
									/**
									 * bug编号965 wangyf
									 * bug信息：审批模板新建完数据后应回到信息列表主页面，并可以进行状态的选择操作，现在是不可以进行状
									 * 2011-06-03 9：50
									 */
									Ext.getCmp('statusW').enable();
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
							disableCaching : true,
							autoAbort : true,
							params : {
								typeid : atemplateContent.itemId,
								typeName : atemplateContent.contentName
										.getValue(),
								parentTypeid : atemplateContent.parentId
							}
						});

					}
				} else {// 新增审批模板分类
					if (atemplateContent.contentForm.getForm().isValid()) {
						Ext.Ajax.request({
							url : "../JSON/approval_templetRemote.createFlowType",
							method : 'POST',
							success : function(response, options) {
								var obj = Ext.util.JSON
										.decode(response.responseText);
								atemplateContent.contentForm.getForm().reset();
								if (obj.success == true) {
									/**
									 * bug编号801 wangyf
									 * bug信息：审批模板发布成功后没有信息提示。
									 * 2011-05-24
									 */
									Ext.example.msg(''+getResource('resourceParam575')+'', ''+getResource('resourceParam4024')+'');
									if (config && config.successCallback) {
										config.successCallback();
									}
									/**
									 * bug编号965 wangyf
									 * bug信息：审批模板新建完数据后应回到信息列表主页面，并可以进行状态的选择操作，现在是不可以进行状
									 * 2011-06-03 9：50
									 */
									Ext.getCmp('statusW').enable();
								} else {
									if (config && config.cancelCallback) {
										config.cancelCallback();
									}
								}
							},
							disableCaching : true,
							autoAbort : true,
							params : {
								typeName : atemplateContent.contentName
										.getValue(),
								parentTypeid : atemplateContent.parentId
								// ,
								// deepLevel : atemplateContent.deepLevel,
								// itemID : atemplateContent.itemId
							}
						});

					}
				}
			}
		}, {
			text : ''+getResource('resourceParam7007')+'',
			handler : function() {
				Ext.getCmp('statusW').enable();
				if (config && config.cancelCallback) {
					config.cancelCallback();
				}
			}
		}]
	});
	// 修改
	atemplateContent.setBasic = function() {
		atemplateContent.contentForm.getForm().reset();
		atemplateContent.contentName.setValue(atemplateContent.itemname);
	}
	atemplateContent.mainPanel = new Ext.Panel({
				layout : 'absolute',
				width : 500,
				height : 350,
				border : false,
				frame : false,
				autoScroll : true,
				bodyStyle : 'overflow:auto;',
				items : [atemplateContent.contentForm]
			});

	return atemplateContent.mainPanel;
}
