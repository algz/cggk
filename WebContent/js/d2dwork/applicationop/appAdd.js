var appAdd = {
	issueDialog : null,
	form : null,
	appName : null
}

appAdd.init = function() {
	Ext.QuickTips.init();
	if (!appAdd.issueDialog) {
		tlework.addHtml(tlework.divHtml, 'tapp'); // 动态生成需要绑定的div
		appAdd.issueDialog = new Ext.Window({ // 创建对话框
			el : 'tapp',
			title : '' + getResource('resourceParam1096') + '',  //添加应用程序
			modal : true,
			layout : 'fit',
			width : 320,
			height : 200,
			closeAction : 'hide',
			plain : false,
			items : [appAdd.addform()]
				// 将面板绑定到对话框
		});
	}
	appAdd.issueDialog.show();
	if(Ext.isIE6)
	{
		var files=document.getElementsByTagName('input');
		for(i=0;i<files.length;i++)
		{
			if(files[i].type=='file')
			{
				files[i].UNSELECTABLE="on";
			}
		}
	}
	appAdd.issueDialog.on("hide", function() {
				appAdd.issueDialog.close();
				appAdd.issueDialog.destroy();
				appAdd.issueDialog = null;

			});
}

appAdd.addform = function() {
	appAdd.file = new Ext.form.Field({
				name : 'applicationpath',
				inputType : 'file',
				allowBlank : false,
				fieldLabel : '' + getResource('resourceParam1097') + '',  //应用程序路径
				anchor : '94%'
			});
	appAdd.form = new Ext.FormPanel({
		labelWidth : 80, // label settings here cascade unless overridden
		frame : false,
		plain : false,
		border : false,
		bodyStyle : 'padding:5px 5px 0;background:transparent;',
		defaultType : 'textfield',
		items : [{
					fieldLabel : '' + getResource('resourceParam1098') + '', // 文本框
					id : 'applicationname',
					name : 'applicationname',
					regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
					regexText : '' + getResource('resourceParam1092') + '', //只能输入中文,字母,数字,英文逗号,英文句号!
					width : 200,
					blankText : '' + getResource('resourceParam1095') + '',//请输入应用程序名称!
					maxLength : 50,
					maxLengthText : '' + getResource('resourceParam1094') + '', //应用程序名称长度过长，不能超过50!
					allowBlank : false,
					anchor : '94%',
					enableKeyEvents : true,
					listeners : {'keyup' : function(cur, evt) {
							var url = '../JSON/applicationop_tapplicationsvr.validAppName';
							Ext.Ajax.request({
								url : url,
								method : 'POST',
								params : {
									applicationname : cur.getValue()
								},
								success : function(response, options) {
									var obj = Ext.util.JSON.decode(response.responseText);
									appAdd.appName = obj;
									if(obj == null || obj == "") {
										Ext.MessageBox.show({
											title : '' + getResource('resourceParam634')
													+ '',
											msg : '' + "数据加载有误！" + '',
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										});
									}
									if(obj == '2') {
//										Ext.MessageBox.show({
//												title : '' + getResource('resourceParam634') + '',
//												msg : "此角色名称已被使用，请更换！",
//												buttons : Ext.MessageBox.OK,
//												icon : Ext.MessageBox.ERROR
//											});
									}
								},
								failure : function(response, options) {
									Ext.MessageBox.show({
										title : '' + getResource('resourceParam634')
												+ '',
										msg : '' + "数据加载有误！" + '',
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.ERROR
									});
								}
							});
						}
					}
				}, {
					xtype : 'textfield',
					fieldLabel : '' + getResource('resourceParam558')
							+ getResource('resourceParam9001') + '', // text:应用程序 标签
					name : 'applicationtype',
					allowBlank : true,
					anchor : '94%',
					maxLength : 50,
					maxLengthText : '' + getResource('resourceParam558') + getResource('resourceParam4044')+getResource('resourceParam7010')+'!'
				}, {
					xtype : 'radiogroup',
					items : [{
								boxLabel : '本地应用程序',
								name : 'app-radio',
								inputValue : 1,
								checked : true
							}, {
								boxLabel : 'URL',
								name : 'app-radio',
								inputValue : 2
							}],
					listeners : {
						change : function(group, radio) {
							var inputValue = radio.getGroupValue();
							if (inputValue == 2) {
								appAdd.form.remove(appAdd.file);
								appAdd.file = new Ext.form.TextField({
											fieldLabel : 'URL',
											name : 'applicationpath',
											allowBlank : false,
											value:'http://',
											anchor : '94%'
										});
								appAdd.form.add(appAdd.file);
							} else {
								appAdd.form.remove(appAdd.file);
								appAdd.file = new Ext.form.Field({
											name : 'applicationpath',
											inputType : 'file',
											allowBlank : false,
											fieldLabel : ''
													+ getResource('resourceParam1097')
													+ '',
											anchor : '94%'
										});
								appAdd.form.add(appAdd.file);
							}
							appAdd.form.doLayout();
						}

					}
				}, appAdd.file
	
		],
		buttons : [ // 定义面板中的按钮
		{
			text : '' + getResource('resourceParam505') + '',
			handler : function() // 为当前按钮绑定事件
			{ // 如果验证通过，则将表单元素提交到指定路径
				if(appAdd.appName == "2") {
					Ext.MessageBox.show({
							title : '' + getResource('resourceParam634') + '',
							msg : "此应用程序名称已被使用，请更换！",
							width:300, //gaoyn bug 847 2011-6-7 14:53
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.ERROR
						});
					return ;
				}
				
				if (appAdd.form.form.isValid()) {
					//bug 187 应用程序路径不能为空
					if(appAdd.file.getValue()<=0){
						Ext.MessageBox.show({
									title : ''
											+ getResource('resourceParam1099')
											+ '',
									width :200,		
									msg : '' + getResource('resourceParam1085')+getResource('resourceParam1097')
											+ '!',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.INFO
									
								});
						return false;
					}
					
					if (fileExists(appAdd.file.getValue())) {
						var appVo = Seam.Remoting
								.createType("com.luck.itumserv.applicationop.TApplicationVo");
						appVo.setApplicationpath(appAdd.file.getValue());
						Ext.apply(appVo, appAdd.form.getForm().getValues());
						callSeam("applicationop_tapplicationsvr", "tappAdd",
								[appVo], appAdd.save);
					} 
					else {
						Ext.MessageBox.show({
									title : ''
											+ getResource('resourceParam1099')
											+ '',
									msg : '' + getResource('resourceParam1093')
											+ '',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.INFO
								});
					}
				}
				

			}
		}, {
			text : '' + getResource('resourceParam9002') + '', // text: 取消
			handler : function() {
				// batcheUpdate.batcheform.form.reset(); //表单重置
				appAdd.issueDialog.hide();

			}
		}]
	});
	return appAdd.form;
}

/**
 * 根据返回结果进行操作
 */
appAdd.save = function(result) {
	var sign = result;
	if (sign == "true") {
		Ext.example.msg("" + getResource('resourceParam575') + "", ""
						+ getResource('resourceParam631') + "");
	} else {
		appAdd.form.form.reset();
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam634') + '',
					msg : sign,
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
	}
	myGrid.loadvalue(appMain.appgrid.store, {
				start : 0,
				limit : 25
			}, {});
	appAdd.issueDialog.hide();

}
