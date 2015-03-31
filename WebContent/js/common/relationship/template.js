var template = {
	itemId : 0,
	privilege : true
}
var success = false;
template.init = function(config) {
	var url = "../JSON/wbstemplate_TemplateRemote.createTemplate";
	if (config && config.url) {
		url = config.url;
	}
	templateCate.privilege = template.privilege;
	templateCate.init();
	var form = new Ext.form.FormPanel({
		bodyStyle : 'padding:10px 0px 10px 10px',
		autoScroll : true,
		split : true,
		border : false,
		autoWidth : true,
		items : [{
			xtype : 'textfield',
			fieldLabel : '' + getResource('resourceParam943') + '模板'
					+ getResource('resourceParam480') + '',
			// id : 'wbstemplatename',
			itemId : 'wbstemplatename',
			// hideLabel:true,
			allowBlank : false,
			blankText : '请' + getResource('resourceParam494') + '模板'
					+ getResource('resourceParam480') + '',
			minLength : 1,
			maxLength : 50,
			minLengthText : '' + getResource('resourceParam1002') + '',
			maxLengthText : '' + getResource('resourceParam1054') + '',
			width : 250,
			invalidText : '' + getResource('resourceParam7054') + ''
				// validator : function() {
				// if (config && config.update) {
				// return true;
				// }
				// function returnValue(value) {
				// success = value;
				// };
				// Ext.Ajax.request({
				// url : "../JSON/wbstemplate_TemplateRemote.checkName",
				// method : 'POST',
				// success : function(response, options) {
				// var obj = Ext.util.JSON
				// .decode(response.responseText);
				// returnValue(obj.success);
				// },
				// params : {
				// name : form.getComponent('wbstemplatename').getValue()
				// }
				// });
				// return success;
				// }
		}, templateCate.templateCombo, {
			xtype : 'textarea',
			fieldLabel : '' + getResource('resourceParam943') + '模板'
					+ getResource('resourceParam648') + '',
			// id : 'wbstemplatenote',
			itemId : 'wbstemplatenote',
			name : 'ttextarea',
			style : 'margin-bottom: 5px;',
			width : 250,
			height:100,
			disabled : false,
			maxLength : 250,
			/**
			 * bug编号630 wangyf bug已修改
			 * bug信息：描述信息根据输入的字符数量自动放大，输入过多字符，导致页面难看
			 * 2011-05-16 18:25
			 */
//			grow : true,
//			growMin : 50,
			preventScrollbars : false,
			maxLengthText : '长度过长，不能超过250'
		}, {
			layout : 'column',
			border : false,
			items : [{
						border : false,
						width : 325,
						layout : 'form',
						items : [{
							xtype : 'button',
							style : 'margin-left: 280px;',
							text : '完成',
							handler : function() {
								if (config && config.update) {
									if (form.getForm().isValid()) {
										var finishedMask = new Ext.LoadMask(
												document.body, {
													msg : "正在处理,请稍候..."
												});
										finishedMask.show();
										Ext.Ajax.request({
											url : "../JSON/wbstemplate_TemplateRemote.updateWBSTemplate",
											method : 'POST',
											success : function(response,
													options) {
												finishedMask.hide();
												var obj = Ext.util.JSON
														.decode(response.responseText);
												template.reset();
												if (obj.success == true) {
													if (config
															&& config.successCallback) {
														config
																.successCallback();
													}
													Ext.example.msg('提示',
															'模板更新成功');
												} else {
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
												name : form
														.getComponent('wbstemplatename')
														.getValue(),
												notes : form
														.getComponent('wbstemplatenote')
														.getValue(),
												itemId : templateCate.itemId,
												privilege : template.privilege,
												ids : template.id
											}
										});
									}
								} else {
									if (form.getForm().isValid()) {
										var finishedMask = new Ext.LoadMask(
												document.body, {
													msg : "正在处理,请稍候..."
												});
										finishedMask.show();
										Ext.Ajax.request({
											url : url,
											method : 'POST',
											success : function(response,
													options) {
												finishedMask.hide();
												var obj = Ext.util.JSON
														.decode(response.responseText);
												template.reset();
												if (obj.success == true) {
													if (config
															&& config.successCallback) {
														config
																.successCallback();
													}
													Ext.example.msg('提示',
															'模板创建成功');
												} else {
													Ext.MessageBox.show({
														title : ''
																+ getResource('resourceParam499')
																+ '',
														msg : obj.msg,
														buttons : Ext.MessageBox.OK,
														icon : Ext.MessageBox.ERROR
													});
												}

											},
											params : {
												name : form
														.getComponent('wbstemplatename')
														.getValue(),
												notes : form
														.getComponent('wbstemplatenote')
														.getValue(),
												itemId : templateCate.itemId,
												ids : template.ids
											}
										});
									}
								}
							}
						}]
					},{
						border : false,
						width : 50,
						layout : 'form',
						items : [{
									xtype : 'button',
									text : '取消',
									handler : function() {
										if (config && config.cancelCallback) {
											config.cancelCallback();
										}
									}
								}]
					}]
		}]
	});
	template.setBasic = function() {
		template.reset();
		var ids = template.id.split(',');
		var len = ids.length;
		if (len == 1) {
			// update single template
			form.getComponent('wbstemplatename').enable();
			form.getComponent('wbstemplatenote').enable();
			Ext.Ajax.request({
						url : "../JSON/wbstemplate_TemplateRemote.getWBSTemplateInfo",
						method : 'POST',
						success : function(response, options) {
							var obj = Ext.util.JSON
									.decode(response.responseText);
							if (obj.success) {
								form.getComponent('wbstemplatename')
										.setValue(obj.wbstemplatename);
								form.getComponent('wbstemplatenote')
										.setValue(obj.wbstemplatenote);
								templateCate.itemId = obj.itemId;
								templateCate.itemName = obj.cate;
								templateCate.setValue(obj.cate);
							} else {
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
							id : template.id
						}
					});
		} else {
			// update multiple template
			form.getComponent('wbstemplatename').disable();
			form.getComponent('wbstemplatenote').disable();
		}
	}

	template.reset = function() {
		form.getForm().reset();
		templateCate.itemId = null;
		templateCate.itemName = null;
	}
	template.panel = new Ext.Panel({
				title : '' + getResource('resourceParam1055') + ''
						+ getResource('resourceParam1056') + '模板',
				layout : 'fit',
				border : false,
				items : [form]
			});
	return template.panel;

}
