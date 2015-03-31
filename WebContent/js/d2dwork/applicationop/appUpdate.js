//
//var appUpdate = {
//	addDialog : null,
//	appform : null
//};
//
///**
// * 修改操作
// */
//appUpdate.init = function() {
//	myGrid.row = appMain.appgrid.selModel.getSelected();
//	if (myGrid.row == null) { // 如未选中任何一行，则不执行操作
//		Ext.MessageBox.show( {
//			title : '操作提示',
//			msg : '请选择一个应用程序信息进行操作!',
//			buttons : Ext.MessageBox.OK,
//			icon : Ext.MessageBox.WARNING
//		});
//		return false;
//	}
//	appUpdate.appDate();
//};
//
///**
// * 生成修改应用程序信息表单面板
// */
//appUpdate.getappform = function() {
//	
//	appAdd.file = new Ext.form.Field({
//		name:'applicationpath',
//		inputType :'file',
//		fieldLabel: '应用程序名称'
//		//,
//		//value:myGrid.row.get('applicationpath')
//	});
//	appUpdate.appform = new Ext.FormPanel({
//		labelWidth: 80, // label settings here cascade unless overridden
//        frame:false,
//        plain: false,
//        bodyStyle:'padding:5px 5px 0;background:transparent;',
//		defaultType: 'textfield',
//		items:[	
//			{
//				fieldLabel: '应用程序名称',		//文本框
//				name: 'applicationname',
//				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
//				regexText : '只能输入中文,字母,数字,英文逗号,英文句号!',
//				width:200,
//				blankText:'请输入应用程序名称',
//				maxLength : 50,
//				maxLengthText :'应用程序名称长度过长，不能超过50',
//				//value:myGrid.row.get('applicationname'),
//				allowBlank:false,
//				anchor:'94%'
//			},appAdd.file,
//			{
//                xtype:'combo',
//                store: new Ext.data.SimpleStore({
//                      	fields: ["retrunValue", "displayText"],
//                     	 data: [['ERP','ERP'],['CAPP','CAPP'],['任务管理系统','任务管理系统'],['PDM','PDM']]
//                	  }),
//               valueField :"retrunValue",
//               displayField: "displayText",
//               mode: 'local',
//               forceSelection: true,
//               blankText:'应用程序类型',
//               emptyText:'应用程序类型',
//               hiddenName:'applicationtype',
//               editable: false,
//               triggerAction: 'all',
//               allowBlank:false,
//			   fieldLabel: '应用程序类型',
//			   name: 'applicationtype',
//			 //  value:myGrid.row.get('applicationtype'),
//			   anchor:'94%'
//        }],	
//		buttons : [ // 定义面板中的按钮
//		{
//			text : '确认',
//			handler : function() // 为当前按钮绑定事件
//				{ // 如果验证通过，则将表单元素提交到指定路径
//					if (appUpdate.appform.form.isValid()) {
////						var appForm = Seam.Remoting
////								.createType("com.luck.itumserv.applicationop.TApplicationVo");
////						appForm.setApplicationid(myGrid.row.get('applicationid'));
////						var theValues = appUpdate.appform.form.getValues();
////						Ext.apply(appForm, theValues);
////						callSeam("applicationop_tapplicationsvr", "tappUpdate",
////								[appForm], appUpdate.save);
////						myGrid.loadvalue(appMain.appgrid.store, {
////							start : 0,
////							limit : 25
////						}, appMain.appgrid.store.baseParams);
//
//					}
//
//				}
//			}, {
//				text : '取消',
//				handler : function() {
//					appUpdate.addDialog.hide();
//
//				}
//			}]
//	});
//	return appUpdate.appform;
//}
//
///**
// * 创建修改备份信息对话框
// */
//appUpdate.appDate = function(response, opt) {
//	if (!appUpdate.addDialog){				
//		tlework.addHtml(tlework.divHtml,'tappu');			//动态生成需要绑定的div
//		appAdd.addDialog = new Ext.Window({ 				//创建对话框
//		el:'tappu',
//		title: '修改应用程序配置',
//		modal: true,
//		layout:'fit',
//		width:320,
//		height:180,
//		closeAction:'hide',
//		plain: false,
//		items: [appUpdate.getappform()]						//将面板绑定到对话框
//		});
//	}
//	appUpdate.addDialog.show();
//	appUpdate.addDialog.on("hide",function(){
//		appUpdate.addDialog.close();
//		appUpdate.addDialog.destroy();		
//		appUpdate.addDialog = null;
//		
//	});
//}
//
///**
// * 根据返回结果进行操作
// */
//appUpdate.save = function(result) {
//	var sign = result;
//	if (sign) {
//		Ext.MessageBox.show( {
//			title : '操作提示',
//			msg : '您的信息已保存成功!',
//			buttons : Ext.MessageBox.OK,
//			icon : Ext.MessageBox.INFO
//		});
//	} else {
//		appUpdate.appform.form.reset();
//		Ext.MessageBox.show( {
//			title : '操作提示',
//			msg : "修改失败!",
//			buttons : Ext.MessageBox.OK,
//			icon : Ext.MessageBox.ERROR
//		});
//	}
//	appUpdate.addDialog.hide();
//	appMain.baseargs = {};
//	myGrid.loadvalue(appMain.appgrid.store, appMain.args,
//			appMain.baseargs);
//};



var appUpdate = {
	issueDialog:null,
	form:null,
	appName : null
}

appUpdate.init = function(){
	/**
	 * bug编号184
	 * bug已修复并完善
	 * @author wangyf
	 * 2011-04-22 11:27
	 */
	myGrid.row = appMain.appgrid.selModel.getSelected();
	var rows = appMain.appgrid.selModel.getSelections();
	if(rows.length != 1 || myGrid.row == null) {
		Ext.MessageBox.show( {
			title : ''+getResource('resourceParam663')+'',
			msg : ''+getResource('resourceParam1100')+'',
			width : 270,
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.WARNING
		});
		return;
	}
//	if (myGrid.row == null) { // 如未选中任何一行，则不执行操作
//		Ext.MessageBox.show( {
//			title : ''+getResource('resourceParam663')+'',
//			msg : ''+getResource('resourceParam1100')+'',
//			buttons : Ext.MessageBox.OK,
//			icon : Ext.MessageBox.WARNING
//		});
//		return false;
//	}
	
	if (!appUpdate.issueDialog){				
		tlework.addHtml(tlework.divHtml,'tappu');			//动态生成需要绑定的div
		appUpdate.issueDialog = new Ext.Window({ 				//创建对话框
		el:'tappu',
		title: ''+getResource('resourceParam1106')+'',
		modal: true,
		layout:'fit',
		width:360,
		height:220,
		closeAction:'hide',
		plain: false,
		items: [appUpdate.addform()]						//将面板绑定到对话框
		});
	}
	appUpdate.issueDialog.show();
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
	appUpdate.issueDialog.on("hide",function(){
		appUpdate.issueDialog.close();
		appUpdate.issueDialog.destroy();		
		appUpdate.issueDialog = null;
		
	});
}

appUpdate.addform= function(){
	
	appUpdate.file = new Ext.form.Field({
		name:'applicationpath',
		inputType :'file',
		fieldLabel: ''+getResource('resourceParam1110')+''
	});
	
	appUpdate.form = new Ext.FormPanel({
		labelWidth: 100, // label settings here cascade unless overridden
        frame:false,
        plain: false,
        border:false,
        bodyStyle:'padding:5px 5px 0;background:transparent;',
		defaultType: 'textfield',
		items:[	
			{
				fieldLabel: ''+getResource('resourceParam1098')+'',		//应用程序名称
				id : 'applicationname1',
				name: 'applicationname',
				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
				regexText : ''+getResource('resourceParam1092')+'!',
				width:200,
				blankText:''+getResource('resourceParam1095')+'',
				maxLength : 50,
				maxLengthText :''+getResource('resourceParam1094')+'',
				allowBlank:false,
				value:myGrid.row.get('applicationname'),
				anchor:'94%',
				enableKeyEvents : true,
				listeners : {'keyup' : function(cur, evt) {
						var nameVal = myGrid.row.get('applicationname');
						if(nameVal == cur.getValue()) {
							return;
						}
						var url = '../JSON/applicationop_tapplicationsvr.validAppName';
						Ext.Ajax.request({
							url : url,
							method : 'POST',
							params : {
								applicationname : cur.getValue()
							},
							success : function(response, options) {
								var obj = Ext.util.JSON.decode(response.responseText);
								appUpdate.appName = obj;
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
//									Ext.MessageBox.show({
//											title : '' + getResource('resourceParam634') + '',
//											msg : "此角色名称已被使用，请更换！",
//											buttons : Ext.MessageBox.OK,
//											icon : Ext.MessageBox.ERROR
//										});
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
				
			},{
				xtype:'textfield',
				fieldLabel:''+getResource('resourceParam558')+''+getResource('resourceParam9001')+'', 
				text : '应用程序' + '标签',
				id : 'applicationtypeID',
				name:'applicationtype',
				allowBlank:true,
				maxLength : 50,
				maxLengthText : '' + getResource('resourceParam558') + getResource('resourceParam4044')+getResource('resourceParam7010')+'!',
				anchor:'94%',
				value:myGrid.row.get('applicationtype')
			},
			{
				fieldLabel: ''+getResource('resourceParam1111')+'',		//文本框
				id : 'applicationpathID',
				name: 'applicationpath',
				width:200,
				cls : 'readonly',
				value:myGrid.row.get('applicationpath'),
				readOnly :true,
				anchor:'94%'
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
								appUpdate.form.remove(appUpdate.file);
								appUpdate.file = new Ext.form.TextField({
											fieldLabel : 'URL',
											name : 'applicationpath',
											allowBlank : true,
											value:'http://',
											anchor : '94%'
										});
								appUpdate.form.add(appUpdate.file);
							} else {
								appUpdate.form.remove(appUpdate.file);
								appUpdate.file = new Ext.form.Field({
											name : 'applicationpath',
											inputType : 'file',
											fieldLabel : ''
													+ getResource('resourceParam1097')
													+ '',
											anchor : '94%'
										});
								appUpdate.form.add(appUpdate.file);
							}
							appUpdate.form.doLayout();
						}

					}
				},
			appUpdate.file
//			{
//                xtype:'combo',
//                store: new Ext.data.SimpleStore({
//                      	fields: ["retrunValue", "displayText"],
//                     	 data: [['ERP','ERP'],['CAPP','CAPP'],['任务管理系统','任务管理系统'],['PDM','PDM']]
//                	  }),
//               valueField :"retrunValue",
//               displayField: "displayText",
//               mode: 'local',
//               forceSelection: true,
//               blankText:'应用程序类型',
//               emptyText:'应用程序类型',
//               hiddenName:'applicationtype',
//               editable: false,
//               triggerAction: 'all',
//               allowBlank:false,
//			   fieldLabel: '应用程序类型',
//			   name: 'applicationtype',
//			   value:myGrid.row.get('applicationtype'),
//			   anchor:'89%'
//        }
			],						
		buttons: [							//定义面板中的按钮
			{	text: ''+getResource('resourceParam505')+'',
				handler: function()			//为当前按钮绑定事件
					{						//如果验证通过，则将表单元素提交到指定路径
//					var store = appMain.appgrid.store;
//					for(var i = 0; i < store.getCount(); i++) {
//						var record = store.getAt(i);
//						if(appName == record.get('applicationname')) {
//							Ext.MessageBox.show({
//										title : '' + getResource('resourceParam634') + '',
//										msg : "此应用程序名称已被使用，请更换！",
//										buttons : Ext.MessageBox.OK,
//										icon : Ext.MessageBox.ERROR
//									});
//								return ;
//						}
//					}
				var aName = Ext.getCmp('applicationname1').getValue();
				var grName = myGrid.row.get('applicationname');
				if(grName == aName) {
					appUpdate.appName = null;
				} 
				if(appUpdate.appName != null && appUpdate.appName == "2") {
					Ext.MessageBox.show({
							title : '' + getResource('resourceParam634') + '',
							msg : "此应用程序名称已被使用，请更换！",
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.ERROR
						});
					return ;
				}
				var formerFile = Ext.getCmp('applicationpathID').getValue();
				
					if(appUpdate.form.form.isValid()){
						//bug 187 应用程序路径不能为空
						if(formerFile == null || formerFile == "") {
							Ext.MessageBox.show({
								title : ''
										+ getResource('resourceParam1099')
										+ '',
								msg : '' + getResource('resourceParam1085')+getResource('resourceParam1097')
										+ '',
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.INFO
							});
							return false;
						}
//						if(appUpdate.file.getValue()<=0){
//							Ext.MessageBox.show({
//										title : ''
//												+ getResource('resourceParam1099')
//												+ '',
//										msg : '' + getResource('resourceParam1085')+getResource('resourceParam1097')
//												+ '',
//										buttons : Ext.MessageBox.OK,
//										icon : Ext.MessageBox.INFO
//									});
//							return false;
//						}

						
							var appVo = Seam.Remoting.createType("com.luck.itumserv.applicationop.TApplicationVo");
							
							appVo.setApplicationid(myGrid.row.get('applicationid'));
							Ext.apply(appVo,appUpdate.form.getForm().getValues());
							if(fileExists(appUpdate.file.getValue())){
							   appVo.setApplicationpath(appUpdate.file.getValue());
							   callSeam("applicationop_tapplicationsvr","tappUpdate",[appVo],appUpdate.save);
							} else {
							   if(fileExists(appVo.getApplicationpath())){
							   		callSeam("applicationop_tapplicationsvr","tappUpdate",[appVo],appUpdate.save);
							   }else {
									Ext.MessageBox.show({
										title: ''+getResource('resourceParam1112')+'',
										msg: ''+getResource('resourceParam1108')+'',
										buttons: Ext.MessageBox.OK,
									    icon: Ext.MessageBox.ERROR 
									});
							   }
							}	 		 
					}
					
				}
			},
			{   text: ''+getResource('resourceParam9002')+'', // text : '取消'
				handler: function(){
					//batcheUpdate.batcheform.form.reset();	//表单重置
					appUpdate.issueDialog.hide();

					}
			}]	
		});
	return appUpdate.form;
}

/**
 * 根据返回结果进行操作
 */
appUpdate.save = function(result){
	var sign = result;	
	if (sign=="true"){							
		Ext.example.msg("" + getResource('resourceParam575') + "", ""
						+ getResource('resourceParam631') + "");				
	}else{
		appUpdate.form.form.reset();
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam572')+'',
			msg: sign,
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR 
		});
	}
	myGrid.loadvalue(appMain.appgrid.store, {start:0,limit:25},{});
	appUpdate.issueDialog.hide();
	
}
