var myMain = {
	privilege : false,
	test:true
};

myMain.toTreeView = function toTreeView(id, name) {
//	Ext.getCmp('view1_create_1').setVisible(false);
//	Ext.getCmp('view1_create_2').setVisible(false);
//	Ext.getCmp('view1_create_3').setVisible(true);
//	Ext.getCmp('view1_create_4').setVisible(true);
//	Ext.getCmp('view1_create_5').setVisible(true);
//	Ext.getCmp('view1_create_6').setVisible(true);
	Ext.getCmp('view1_return').setVisible(true);
	
	Ext.getCmp('view1_update').disable();
	Ext.getCmp('view1_delete').disable();
	Ext.getCmp('view1_approve').disable();
	Ext.getCmp('view1_privilege').disable();

	if (myMain.templatePanel) {
		myMain.mainPanel.remove(myMain.templatePanel);
	}
	myMain.templatePanel = new Ext.Panel({
				layout : 'fit',
				border : false,
				frame : false,
				autoScroll : true,
				bodyStyle : 'overflow:auto;',
				items : [templateDatail.init({
							rootName : name,
							rootId : id
						})]
			});
	myMain.mainPanel.insert(6, myMain.templatePanel);
	templateTree.node = templateTree.rootNode;
	templateTabPanel.tabPanel.setActiveTab(0);
	templateTree.treePanel.on('click', function(node, eventObject) {
				templateTree.node = node;
				templateTree.nodeId = node.attributes.id;
				if(templateTree.nodeId==0){
					templateTabPanel.dataPanel.disable();
				}else{
					templateTabPanel.dataPanel.enable();
				}
				templateTree.nodeName = node.attributes.text;
				var activedPanel = templateTabPanel.tabPanel.getActiveTab();
				activedPanel.fireEvent('activate');
			})
	myMain.mainPanel.getLayout().setActiveItem(6);
}

myMain.init = function() {
	Ext.lib.Ajax.defaultPostHeader += ";charset=utf-8";// 设置默认编码为utf-8
	Ext.QuickTips.init();
	function backToMain() {
//		Ext.getCmp('view1_create_1').setVisible(true);
//		Ext.getCmp('view1_create_2').setVisible(false);
//		Ext.getCmp('view1_create_3').setVisible(false);
//		Ext.getCmp('view1_create_4').setVisible(false);
//		Ext.getCmp('view1_create_5').setVisible(false);
//		Ext.getCmp('view1_create_6').setVisible(false);
		wbsPanel.refresh();
		myMain.mainPanel.getLayout().setActiveItem(0);
	}

	var templateContentConfig = {
		cancelCallback : function() {
			myMain.mainPanel.getLayout().setActiveItem(0);
		},
		successCallback : function() {
			myMain.mainPanel.getLayout().setActiveItem(0);
			wbsPanel.refresh();

		}
	}
	var templateConfig = {
		cancelCallback : function() {
			myMain.mainPanel.getLayout().setActiveItem(0);
		},
		successCallback : function() {
			myMain.mainPanel.getLayout().setActiveItem(0);
			wbsPanel.refresh();
		},
		url : "../JSON/wbstemplate_TemplateRemote.addWBSTemplate"
	}
	var createContent = new Ext.Action({
				// 新建模板分类
				text : getResource('resourceParam5005'),
				id : 'view1_create_1',
				handler : function() {
					templateContentConfig.update = false;
					templateContent.contentForm.getForm().reset();
					/**
					 * bug编号674 wangyf
					 * bug信息：在流程模板管理列表中，修改模板分类或者模板时，进入的界面显示为新建或添加。建议将新建或添加改为修改。
					 * 2011-05-19 14：44
					 */
					/***begin***/
					templateContent.contentForm.setTitle(getResource('resourceParam5005'), "");
					/***end***/
					myMain.mainPanel.getLayout().setActiveItem(2);
				}
			});
	var createTemplate = new Ext.Action({
				// 新建模板
				text : getResource('resourceParam5008'),
				id : 'view1_create_2',
				hidden:true,
				handler : function() {
					templateConfig.update = false;
					template.reset();
					var r = wbsPanel.sm.getSelected();
					if (r) {
						templateCate.itemId = r.get('itemId');// 模板分类id
						templateCate.setValue(r.get('name'));
					}
					myMain.mainPanel.getLayout().setActiveItem(3);
				}
			});
	var createSameLevelTask = new Ext.Action({
				// 新建同级任务
				text : getResource('resourceParam5009'),
				id : 'view1_create_3',
				hidden : true,
				handler : function() {
				}
			});
	var createSubLevelTask = new Ext.Action({
				// 新建子任务
				text : getResource('resourceParam5010'),
				id : 'view1_create_4',
				hidden : true,
				handler : function() {
				}
			});
	var createApprovalTask = new Ext.Action({
				// 新建审批任务
				text : getResource('resourceParam5011'),
				id : 'view1_create_5',
				hidden : true,
				handler : function() {
				}
			});
	var createFromTemplate = new Ext.Action({
				// 从模板中新建
				text : getResource('resourceParam5012'),
				id : 'view1_create_6',
				hidden : true,
				handler : function() {
				}
			});
	var action1 = new Ext.Action({
				id : 'view1_appro',
				text : '送审模板',
				handler : function() {
					var selections = wbsPanel.sm.getSelections();
					var ids = '';
					approvePanel.dataid = '';
					for (var i = 0; i < selections.length; i++) {
						approvePanel.dataid += selections[i].data.id + ',';
						ids += selections[i].data.id + ',';
					}
					/**
					 * bug编号652 —— 送审（送审模板）
					 * bug信息：当前人员被赋予拒绝模板设置权限，如果添加用户后，系统弹出的提示存在错误
					 * @author wangyf 
					 * @date 2011-5-20 下午02:15:22
					 * @param vo
					 * @return
					 */
					/***begin***/
					Ext.Ajax.request({
						url : "../JSON/privilege_DataPrivilegeRemote.getTemplateManipultationsSendApp",
						method : 'POST',
						success : function(response, options) {
							var obj = Ext.util.JSON.decode(response.responseText);
							//当只选择一条数据的情况
							if(obj.appResult != null && obj.appResult != "") {
								if(obj.appResult == "true") {
									approvePanel.reset();
									myMain.mainPanel.getLayout().setActiveItem(4)
								} else {
									Ext.MessageBox.show({
										title : '提醒',
										msg : "没有送审模板的权限！",
										width : 250,
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.WARNING
									});
									return ;
								}
							}
							//选中多条数据的情况
							var intR = 0;
							var arrs = new Array();
							var strs = '';
							if(obj.moreResults != null && obj.moreResults != "") {
								var mr = obj.moreResults.substring(0, obj.moreResults.length - 1);
								var mrArrs = mr.split(",");
								if(obj.moreIds != null && obj.moreIds != "") {
									var mi = obj.moreIds.substring(0, obj.moreIds.length - 1);
									var miArrs = mi.split(",");
									for(var i = 0; i < mrArrs.length; i++) {
										if(mrArrs[i] == "true") {
											intR++;
										} else {
											arrs.push(miArrs[i]);
										}
									}
									if(intR == mrArrs.length) {
										approvePanel.reset();
										myMain.mainPanel.getLayout().setActiveItem(4)
									} else {
										for(var j = 0; j < selections.length; j++) {
											for(var m = 0; m < arrs.length; m++) {
												if(selections[j].data.id == arrs[m]) {
													strs += selections[j].data.name + ", ";
												}
											}
										}
										var strss = strs.substring(0, strs.length - 2);
										Ext.MessageBox.show({
											title : '提醒',
											msg : "模板名称：" + "<font color='red'>" + strss+ "</font>" +
												  "<br>" + "没有送审模板的权限！",
											minWidth : 300,
											maxWidth : 1000,
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.WARNING
										});
										return ;
									}
								}
							}
						},
						disableCaching : true,
						autoAbort : true,
						params : {
							dataId : ids
						}
					});
//					approvePanel.reset();
//					myMain.mainPanel.getLayout().setActiveItem(4)
				}
			});
	var action = new Ext.Action({
		text : '置模板入库',
		handler : function() {
			var selections = wbsPanel.sm.getSelections();
			var ids = '';
			for (var i = 0; i < selections.length; i++) {
				ids += selections[i].data.id + ',';
			}
			/**
			 * bug编号652 —— 置模板入库
			 * bug信息：当前人员被赋予拒绝模板设置权限，如果添加用户后，系统弹出的提示存在错误
			 * @author wangyf 
			 * @date 2011-5-20 下午02:15:22
			 * @param vo
			 * @return
			 */
			/***begin***/
			Ext.Ajax.request({
				url : "../JSON/privilege_DataPrivilegeRemote.getTemplateManipultationsIntoBox",
				method : 'POST',
				success : function(response, options) {
					var obj = Ext.util.JSON.decode(response.responseText);
					//当只选择一条数据的情况
					if(obj.setResult != null && obj.setResult != "") {
						if(obj.setResult == "true") {
							Ext.Msg.confirm('' + getResource('resourceParam575') + '',
							getResource('resourceParam5013') + "，"
									+ getResource('resourceParam512') + ""
									+ getResource('resourceParam510') + "进行操作？",
							function(btn) {
								if (btn == 'yes') {
									var selections = wbsPanel.sm.getSelections();
									var ids = '';
									for (var i = 0; i < selections.length; i++) {
										ids += selections[i].data.id + ',';
									}
									Ext.Ajax.request({
										url : "../JSON/wbstemplate_TemplateRemote.directApprove",
										method : 'POST',
										success : function(response, options) {
											var obj = Ext.util.JSON
													.decode(response.responseText);
											backToMain();
											if (obj.success == true) {
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
										disableCaching : true,
										autoAbort : true,
										params : {
											ids : ids
										}
									});
								}
							});
						} else {
							Ext.MessageBox.show({
								title : '提醒',
								msg : " 没有置模板入库的权限！",
								width : 250,
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.WARNING
							});
							return ;
						}
					}
					//选中多条数据的情况
					var intR = 0;
					var arrs = new Array();
					var strs = '';
					if(obj.moreResults != null && obj.moreResults != "") {
						var mr = obj.moreResults.substring(0, obj.moreResults.length - 1);
						var mrArrs = mr.split(",");
						if(obj.moreIds != null && obj.moreIds != "") {
							var mi = obj.moreIds.substring(0, obj.moreIds.length - 1);
							var miArrs = mi.split(",");
							for(var i = 0; i < mrArrs.length; i++) {
								if(mrArrs[i] == "true") {
									intR++;
								} else {
									arrs.push(miArrs[i]);
								}
							}
							if(intR == mrArrs.length) {
								Ext.Msg.confirm('' + getResource('resourceParam575') + '',
										getResource('resourceParam5013') + "，"
												+ getResource('resourceParam512') + ""
												+ getResource('resourceParam510') + "进行操作？",
										function(btn) {
											if (btn == 'yes') {
												var selections = wbsPanel.sm.getSelections();
												var ids = '';
												for (var i = 0; i < selections.length; i++) {
													ids += selections[i].data.id + ',';
												}
												Ext.Ajax.request({
													url : "../JSON/wbstemplate_TemplateRemote.directApprove",
													method : 'POST',
													success : function(response, options) {
														var obj = Ext.util.JSON
																.decode(response.responseText);
														backToMain();
														if (obj.success == true) {
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
													disableCaching : true,
													autoAbort : true,
													params : {
														ids : ids
													}
												});
							} 
						}
						);
					} else {
						for(var j = 0; j < selections.length; j++) {
							for(var m = 0; m < arrs.length; m++) {
								if(selections[j].data.id == arrs[m]) {
									strs += selections[j].data.name + ", ";
								}
							}
						}
						var strss = strs.substring(0, strs.length - 2);
						Ext.MessageBox.show({
							title : '提醒',
							msg : "模板名称：" + "<font color='red'>" + strss+ "</font>" +
								  "<br>" + " 没有置模板入库的权限！",
							minWidth : 300,
							maxWidth : 1000,
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.WARNING
						});
						return ;
					}
					}
					}
				},
				disableCaching : true,
				autoAbort : true,
				params : {
					dataId : ids
				}
			});
		}	
	});
	var tbar = new Ext.Toolbar({
		items : [
		{
			text:'模板分类、模板数据权限测试',
		    hidden:myMain.test,
		    handler:function(){
		    var mask=new Ext.LoadMask(document.body, {
				    msg : '正在操作，请稍候...'
			    });
			 mask.show();
			 if(!templateTree.node)templateTree.node='';
			 var ids = '{"WBSContent":"'
										+ templateContent.itemId
										+ '",  "WBSTemplate":"' + template.id
										+ '",  "WBSTask":"' + templateTree.node.id
										+ '" }';
			 Ext.Ajax.request({
					url : "../JSON/wbstemplate_TemplateRemote.testDataPrivilege",
					method : 'POST',
					success : function(response,
							options) {
				 var obj=Ext.util.JSON.decode(response.responseText);
				 mask.hide();
				 Ext.example.msg(obj.success,obj.message);
					},
					failure:function(response,
							options){
						 mask.hide();
					},
					disableCaching : true,
					autoAbort : true,
					params : {
						ids : ids
					}
				});
		    }
		},'-',
		{
			text : getResource('resourceParam483'),
			id : 'view1_create',
			disabled : false,
			handler : function() {
				/**
				 * bug编号804 wangyf
				 * bug信息：此bug中的第二个提议 在此页面上的状态选择按钮应屏蔽
				 * 2011-05-25 13:45
				 */
				Ext.getCmp('statusW').disable();
			
				templateContentConfig.update = false;
				templateContent.contentForm.getForm().reset();
				/**
				 * bug编号674 wangyf
				 * bug信息：在流程模板管理列表中，修改模板分类或者模板时，进入的界面显示为新建或添加。建议将新建或添加改为修改。
				 * 2011-05-19 14：44
				 */
				/***begin***/
				templateContent.contentForm.setTitle(getResource('resourceParam5005'), "");
				/***end***/
				myMain.mainPanel.getLayout().setActiveItem(2);
			}
//			menu : [createContent, createTemplate, createSameLevelTask,
//					createSubLevelTask, createApprovalTask, createFromTemplate]
		}, '-', {
			text : getResource('resourceParam478'),
			id : 'view1_update',
			disabled : true,
			handler : function() {
				/**
				 * bug编号590 wangyf
				 * bug信息：在任务看板——》我的流程模板管理中审批中和已入库的模板不能进行修改,编制中的可以进行修改
				 * 2011-05-17
				 */
				/****begin****/
				var smOne = wbsPanel.sm.getSelections();
				/**
				 * bug编号862 wangyf
				 * bug信息：在流程模板管理界面中可以选中多个模板执行修改操作。
				 * 1.在流程模板管理界面中可以选中多个模板执行修改操作。如果都为编制中的，则可进入修改界面，并各项信息显示为空。
				 * 2.建议选择多个时不能执行修改操作。
				 * 2011-05-26 15:45
				 */
				if(smOne.length != 1) {
					Ext.MessageBox.show({
						title : '提醒',
						msg : "请选择一条数据进行修改！",
						width : 320,
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.WARNING
					});
					return ;
				}
				var ids = '';
				for (var i = 0; i < smOne.length; i++) {
					ids += smOne[i].data.id + ',';
				}
				//当选中多个任务模板修改时，把模板分类的值 置空！
				if(smOne.length > 1) {
					template.reset();
					templateCate.init().reset();
					for(var i = 0; i < smOne.length; i++) {
						if(smOne[i].get('status') == 1 || smOne[i].get('status') == 2) {
							Ext.MessageBox.show({
								title : '提醒',
								msg : "状态为审批中或已入库的模板不能修改！",
								width : 320,
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.WARNING
							});
							return ;
						}
					}
				} else {
					//选中一个时的情况
					var status = smOne[0].get('status');
					if(status != null && status == 1) {
						Ext.MessageBox.show({
							title : '提醒',
							msg : "审批中的模板不能进行修改！",
							width : 250,
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.WARNING
						});
						return ;
					}
					if(status != null && status == 2) {
						Ext.MessageBox.show({
							title : '提醒',
							msg : "已入库的模板不能进行修改！",
							width : 250,
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.WARNING
						});
						return ;
					}
				}
				
				/****end****/
				
				/**
				 * bug编号652 —— 修改
				 * bug信息：当前人员被赋予拒绝模板设置权限，如果添加用户后，系统弹出的提示存在错误
				 * @author wangyf 
				 * @date 2011-5-19 下午02:15:22
				 * @param vo
				 * @return
				 */
				/***begin***/
				Ext.Ajax.request({
					url : "../JSON/privilege_DataPrivilegeRemote.getTemplateManipultationsUpdate",
					method : 'POST',
					success : function(response, options) {
						var obj = Ext.util.JSON.decode(response.responseText);
						//选中一条数据时的情况
						var wcOne = null;
						var wtOne = null;
						if(obj.wc != null && obj.wc != null) {
							wcOne = obj.wc;
							if(wcOne == "true") {
								if (wbsPanel.dataType == 'WBSContent') {
									templateContentConfig.update = true;
									templateContent.setBasic();
									/**
									 * bug编号674 wangyf —— 模板分类
									 * bug信息：在流程模板管理列表中，修改模板分类或者模板时，进入的界面显示为新建或添加。建议将新建或添加改为修改。
									 * 2011-05-19 14：44
									 */
									/***begin***/
									templateContent.contentForm.setTitle(getResource('resourceParam9796'), "");
									/***end***/
									myMain.mainPanel.getLayout().setActiveItem(2);
								} else if (wbsPanel.dataType == 'WBSTemplate') {
									templateConfig.update = true;
									template.setBasic();
									/**
									 * bug编号674 wangyf ——　模板
									 * bug信息：在流程模板管理列表中，修改模板分类或者模板时，进入的界面显示为新建或添加。建议将新建或添加改为修改。
									 * 2011-05-19 14：44
									 */
									/***begin***/
									template.panel.setTitle("修改任务流程模板","");
									/***end***/
									myMain.mainPanel.getLayout().setActiveItem(3);
								}
							} else {
								Ext.MessageBox.show({
									title : '提醒',
									msg : "没有修改的权限！",
									width : 230,
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.WARNING
								});
								return ;
							}
						}
						if(obj.wt != null && obj.wt != "") {
							wtOne = obj.wt;
							if(wtOne == "true") {
								if (wbsPanel.dataType == 'WBSContent') {
									templateContentConfig.update = true;
									templateContent.setBasic();
									/**
									 * bug编号674 wangyf —— 模板分类
									 * bug信息：在流程模板管理列表中，修改模板分类或者模板时，进入的界面显示为新建或添加。建议将新建或添加改为修改。
									 * 2011-05-19 14：44
									 */
									/***begin***/
									templateContent.contentForm.setTitle(getResource('resourceParam9796'), "");
									/***end***/
									myMain.mainPanel.getLayout().setActiveItem(2);
								} else if (wbsPanel.dataType == 'WBSTemplate') {
									templateConfig.update = true;
									template.setBasic();
									/**
									 * bug编号674 wangyf —— 模板
									 * bug信息：在流程模板管理列表中，修改模板分类或者模板时，进入的界面显示为新建或添加。建议将新建或添加改为修改。
									 * 2011-05-19 14：44
									 */
									/***begin***/
									template.panel.setTitle("修改任务流程模板","");
									/***end***/
									myMain.mainPanel.getLayout().setActiveItem(3);
								}
							} else {
								Ext.MessageBox.show({
									title : '提醒',
									msg : "没有修改的权限！",
									width : 230,
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.WARNING
								});
								return ;
							}
						}
						//选中多条数据时的情况
						var tr = null;
						var trInt = 0;
						var trIds = null;
						//模板
						if(obj.tResult != null && obj.tResult != "") {
							if(obj.tRIds != null && obj.tRIds != "") {
								tr = obj.tResult.substring(0, obj.tResult.length - 1);
								trIds = obj.tRIds.substring(0, obj.tRIds.length - 1);
								var trArrIds = trIds.split(",");
								var tArrIds = new Array();
								var trStrs = "";
								var trArr = tr.split(",");
								for(var i = 0; i < trArr.length; i++) {
									if(trArr[i] == "true") {
										trInt++;
									} else {
										tArrIds.push(trArrIds[i]);
									}
								}
								if(trInt == trArr.length) {
									templateConfig.update = true;
									template.setBasic();
//									template.reset();
									/**
									 * bug编号674 wangyf
									 * bug信息：在流程模板管理列表中，修改模板分类或者模板时，进入的界面显示为新建或添加。建议将新建或添加改为修改。
									 * 2011-05-19 14：44
									 */
									/***begin***/
									template.panel.setTitle("修改任务流程模板","");
									/***end***/
									myMain.mainPanel.getLayout().setActiveItem(3);
								} else {
									for(var m = 0; m < smOne.length; m++) {
										for(var n = 0; n < tArrIds.length; n++) {
											if(smOne[m].data.id == tArrIds[n]) {
												trStrs += smOne[m].data.name + ", ";
											}
										}
									}
									var trStr = trStrs.substring(0, trStrs.length - 2);
									Ext.MessageBox.show({
										title : '提醒',
										msg : "模板名称：" + "<font color='red'>" + trStr+ "</font>" +
											  "<br>" + "没有修改的权限！",
										minWidth : 300,
										maxWidth : 1000,
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.WARNING
									});
									return ;
								}
							}
						}
					},
					disableCaching : true,
					autoAbort : true,
					params : {
						dataId : ids,
						dataType : wbsPanel.dataType
					}
				});
				/***end***/
//				if (wbsPanel.dataType == 'WBSContent') {
//					templateContentConfig.update = true;
//					templateContent.setBasic();
//					myMain.mainPanel.getLayout().setActiveItem(2);
//				} else if (wbsPanel.dataType == 'WBSTemplate') {
//					templateConfig.update = true;
//					template.setBasic();
//					/**
//					 * bug编号674 wangyf
//					 * bug信息：在流程模板管理列表中，修改模板分类或者模板时，进入的界面显示为新建或添加。建议将新建或添加改为修改。
//					 * 2011-05-19 14：44
//					 */
//					/***begin***/
//					template.panel.setTitle("修改任务流程模板","");
//					/***end***/
//					myMain.mainPanel.getLayout().setActiveItem(3);
//				}
			}
		}, '-', {
			text : getResource('resourceParam475')+'',
			id : 'view1_delete',
			disabled : true,
			handler : function() {
				var res = wbsPanel.sm.getSelections();
				var ids = '';
				var dataTypes = '';
				for (var i = 0; i < res.length; i++) {
					ids += res[i].data.id + ',';
					dataTypes += res[i].data.dataType + ','
				}
				/**
				 * bug编号593
				 * @author wangyf
				 */
				/***begin***/
				for (var i = 0; i < res.length; i++) {
					if (res[i].get('dataType') == 'WBSContent') {
						if(res[i].get('leaf') == false) {
							Ext.MessageBox.show({
								title : '提醒',
								msg : "选取的模板分类有子模板，不能删除！",
								width : 300,
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.WARNING
							});
							return ;
						}
					} else if (res[i].get('dataType') == 'WBSTemplate') {
						if(res[i].get('status') == 1 || res[i].get('status') == 2) {
							Ext.MessageBox.show({
								title : '提醒',
								msg : "只有状态为编制中的模板才能删除！",
								width : 290,
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.WARNING
							});
							return ;
						}
					}
				}
				/***end***/
				/**
				 * bug编号652 —— 删除
				 * bug信息：当前人员被赋予拒绝模板设置权限，如果添加用户后，系统弹出的提示存在错误
				 * @author wangyf 
				 * @date 2011-5-20 下午10:27:22
				 * @param vo
				 * @return
				 */
				/***begin***/
				Ext.Ajax.request({
					url : "../JSON/privilege_DataPrivilegeRemote.getTemplateManipultationsDelete",
					method : 'POST',
					success : function(response, options) {
						var obj = Ext.util.JSON.decode(response.responseText);
						//删除 选中一条数据的情况
						var wc = null;
						var wt = null;
						if(obj.wc != null && obj.wc != "") {
							wc = obj.wc;
							if(wc == "true") {
								Ext.Msg.confirm('' + getResource('resourceParam575') + '',
									"是否删除?", function(btn) {
										if (btn == 'yes') {
											var ids = '{"WBSContent":"'
													+ templateContent.itemId
													+ '",  "WBSTemplate":"' + template.id
													+ '" }';
											Ext.Ajax.request({
												url : "../JSON/wbstemplate_TemplateRemote.deleteContentAndTemplate",
												method : 'POST',
												success : function(response, options) {
													var obj = Ext.util.JSON
															.decode(response.responseText);
													if (obj.success == true) {
														Ext.example.msg(getResource('resourceParam575'), getResource('resourceParam637'));
													}
													if (obj.message) {
														Ext.example.msg(getResource('resourceParam575'), obj.message);
													}
													wbsPanel.refresh();
													myMain.mainPanel.getLayout().setActiveItem(0);
												},
												disableCaching : true,
												autoAbort : true,
												params : {
													ids : ids,
													privilege : myMain.privilege
												}
											});
										}
									});
							} else {
								Ext.MessageBox.show({
									title : '提醒',
									msg : "没有删除的权限！",
									width : 230,
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.WARNING
								});
								return ;
							}
						}
						if(obj.wt != null && obj.wt != "") {
							wt = obj.wt;
							if(wt == "false") {
								Ext.MessageBox.show({
									title : '提醒',
									msg : "没有删除的权限！",
									width : 230,
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.WARNING
								});
								return ;
							} else {
								Ext.Msg.confirm('' + getResource('resourceParam575') + '',
									"是否删除?", function(btn) {
										if (btn == 'yes') {
											var ids = '{"WBSContent":"'
													+ templateContent.itemId
													+ '",  "WBSTemplate":"' + template.id
													+ '" }';
											Ext.Ajax.request({
												url : "../JSON/wbstemplate_TemplateRemote.deleteContentAndTemplate",
												method : 'POST',
												success : function(response, options) {
													var obj = Ext.util.JSON
															.decode(response.responseText);
													if (obj.success == true) {
														Ext.example.msg(getResource('resourceParam575'), getResource('resourceParam637'));
													}
													if (obj.message) {
														Ext.example.msg(getResource('resourceParam575'), obj.message);
													}
													wbsPanel.refresh();
													myMain.mainPanel.getLayout().setActiveItem(0);
												},
												disableCaching : true,
												autoAbort : true,
												params : {
													ids : ids,
													privilege : myMain.privilege
												}
											});
										}
									});
							}
						}
						//选中多条数据的情况
						var delResult = '';
						var delIds = '';
						var trInt = 0;
						var strArrs = new Array();
						if(obj.delResult != null && obj.delResult != "") {
							delResult = obj.delResult.substring(0, obj.delResult.length - 1);
							var delStrs = delResult.split(",");
							if(obj.delIds != null && obj.delIds != "") {
								delIds = obj.delIds.substring(0, obj.delIds.length - 1);
								var delOns = delIds.split(",");
								
								for(var i = 0; i < delStrs.length; i++) {
									if(delStrs[i] == "true") {
										trInt++;
									} else {
										strArrs.push(delOns[i]);
									}
								}
								if(trInt == delStrs.length) {
									Ext.Msg.confirm('' + getResource('resourceParam575') + '',
									"是否删除?", function(btn) {
										if (btn == 'yes') {
											var ids = '{"WBSContent":"'
													+ templateContent.itemId
													+ '",  "WBSTemplate":"' + template.id
													+ '" }';
											Ext.Ajax.request({
												url : "../JSON/wbstemplate_TemplateRemote.deleteContentAndTemplate",
												method : 'POST',
												success : function(response, options) {
													var obj = Ext.util.JSON
															.decode(response.responseText);
													if (obj.success == true) {
														Ext.example.msg(getResource('resourceParam575'), getResource('resourceParam637'));
													}
													if (obj.message) {
														Ext.example.msg(getResource('resourceParam575'), obj.message);
													}
													wbsPanel.refresh();
													myMain.mainPanel.getLayout().setActiveItem(0);
												},
												disableCaching : true,
												autoAbort : true,
												params : {
													ids : ids,
													privilege : myMain.privilege
												}
											});
										}
									});
								} else {
									var strs = '';
									for(var m = 0; m < res.length; m++) {
										for(var n = 0; n < strArrs.length; n++) {
											if(res[m].data.id == strArrs[n]) {
												strs += res[m].data.name + ", ";
											}
										}
									}
									var trStr = strs.substring(0, strs.length - 2);
									Ext.MessageBox.show({
										title : '提醒',
										msg : "数据名称：" + "<font color='red'>" + trStr+ "</font>" +
											  "<br>" + "没有删除的权限！",
										minWidth : 300,
										maxWidth : 1000,
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.WARNING
									});
									return ;								
								}
							}
						}
					},
					disableCaching : true,
					autoAbort : true,
					params : {
						dataId : ids,
						dataType : dataTypes
					}
				});
				/***end***/
				
				
//				Ext.Msg.confirm('' + getResource('resourceParam575') + '',
//						"是否删除?", function(btn) {
//							if (btn == 'yes') {
//								var ids = '{"WBSContent":"'
//										+ templateContent.itemId
//										+ '",  "WBSTemplate":"' + template.id
//										+ '" }';
//								Ext.Ajax.request({
//									url : "../JSON/wbstemplate_TemplateRemote.deleteContentAndTemplate",
//									method : 'POST',
//									success : function(response, options) {
//										var obj = Ext.util.JSON
//												.decode(response.responseText);
//										if (obj.success == true) {
//											Ext.example
//													.msg(
//															getResource('resourceParam575'),
//															getResource('resourceParam637'));
//										}
//										if (obj.message) {
//											Ext.example
//													.msg(
//															getResource('resourceParam575'),
//															obj.message);
//										}
//										wbsPanel.refresh();
//										myMain.mainPanel.getLayout()
//												.setActiveItem(0);
//									},
//									disableCaching : true,
//									autoAbort : true,
//									params : {
//										ids : ids,
//										privilege : myMain.privilege
//									}
//								});
//							}
//						});
			}
		},
				// , '-', {
				// text : '复制',
				// id:'view1_copy',
				// disabled : false,
				// handler : function() {
				// }
				// }, '-', {
				// text : '剪切',
				// id:'view1_cut',
				// disabled : false,
				// handler : function() {
				// }
				// }, '-', {
				// text : '粘贴',
				// id:'view1_paste',
				// disabled : false,
				// handler : function() {
				// }
				// },
				'-', {
					text : getResource('resourceParam1062'),
					id : 'view1_approve',
					disabled : true,
					menu : [action, action1]
				}, '-', {
					text : getResource('resourceParam582'),
					id : 'view1_privilege',
					disabled : true,
					handler : function() {
						var selections = wbsPanel.sm.getSelections();
						var ids = '';
						for (var i = 0; i < selections.length; i++) {
							ids += selections[i].data.id + ',';
						}
						setDataPrivilege.mainpanel.dataId = ids;
						var selection = wbsPanel.sm.getSelected();
						if (selection.data.dataType == 'WBSContent') {
							setDataPrivilege.mainpanel.dataType = "WBSContentDataType";
						} else {
							setDataPrivilege.mainpanel.dataType = "TemplateDataType";
						}
						/**
						 * bug编号652
						 * bug信息：当前人员被赋予拒绝模板设置权限，如果添加用户后，系统弹出的提示存在错误
						 * @author wangyf 
						 * @date 2011-5-18 下午02:15:22
						 * @param vo
						 * @return
						 */
						/***begin***/
						Ext.Ajax.request({
							url : "../JSON/privilege_DataPrivilegeRemote.getTemplateManipultationsW",
							method : 'POST',
							success : function(response, options) {
								var obj = Ext.util.JSON.decode(response.responseText);
								//单选一个的情况
								var wc = obj.wcResult;
								var td = obj.tdResult;
								if(wc != null && wc != "") {
									if(wc == "true") {
										setDataPrivilege.refresh();
										setDataPrivilege.config = {
											dataId : selection.data.id,
											dataType : setDataPrivilege.mainpanel.dataType
										}
										myMain.mainPanel.getLayout().setActiveItem(5);
									} else {
										Ext.MessageBox.show({
											title : '提醒',
											msg : "没有设置权限的权限！",
											width : 230,
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.WARNING
										});
										return ;
									}
								}
								if(td != null && td != "") {
									if(td == "true") {
										setDataPrivilege.refresh();
										setDataPrivilege.config = {
											dataId : selection.data.id,
											dataType : setDataPrivilege.mainpanel.dataType
										}
										myMain.mainPanel.getLayout().setActiveItem(5);
									} else {
										Ext.MessageBox.show({
											title : '提醒',
											msg : "没有设置权限的权限！",
											width : 230,
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.WARNING
										});
										return ;
									}
								}
								//多选的情况
								var wr = null;
								var wrInt = 0;
								var tr = null;
								var trInt = 0;
								var wrIds = null;
								var trIds = null;
								if(obj.wResult != null && obj.wResult != "") {
									wr = obj.wResult.substring(0, obj.wResult.length - 1);
								}
								if(obj.tResult != null && obj.tResult != "") {
									tr = obj.tResult.substring(0, obj.tResult.length - 1);
								}
								if(obj.tRIds != null && obj.tRIds != "") {
									trIds = obj.tRIds.substring(0, obj.tRIds.length - 1);
								}
								if(obj.wRIds != null && obj.wRIds != "") {
									wrIds = obj.wRIds.substring(0, obj.wRIds.length - 1);
								}
								//模板分类
								if(wrIds != null && wrIds != "") {
									var wrArrIds = wrIds.split(",");
									var wArrIds = new Array();
									var wrStrs = "";
									if(wr != null && wr != "") {
										var wrArr = wr.split(",");
										for(var i = 0; i < wrArr.length; i++) {
											if(wrArr[i] == "true") {
												wrInt++;
											} else {
												wArrIds.push(wrArrIds[i]);
											}
										}
										if(wrInt == wrArr.length) {
											setDataPrivilege.refresh();
											setDataPrivilege.config = {
												dataId : selection.data.id,
												dataType : setDataPrivilege.mainpanel.dataType
											}
											myMain.mainPanel.getLayout().setActiveItem(5);
										} else {
											for(var m = 0; m < selections.length; m++) {
												for(var n = 0; n < wArrIds.length; n++) {
													if(selections[m].data.id == wArrIds[n]) {
														wrStrs += selections[m].data.name + ", ";
													}
												}
											}
											var wrStr = wrStrs.substring(0, wrStrs.length - 2);
											Ext.MessageBox.show({
												title : '提醒',
												msg : "模板名称：" + "<font color='red'>" + wrStr+ "</font>" +
													  "<br>" + "没有设置权限的权限！",
												minWidth : 300,
												maxWidth : 1000,
												buttons : Ext.MessageBox.OK,
												icon : Ext.MessageBox.WARNING
											});
											return ;
										}
									}
								}
								//模板
								if(trIds != null && trIds != "") {
									var trArrIds = trIds.split(",");
									var tArrIds = new Array();
									var trStrs = "";
									if(tr != null && tr != "") {
										var trArr = tr.split(",");
										for(var i = 0; i < trArr.length; i++) {
											if(trArr[i] == "true") {
												trInt++;
											} else {
												tArrIds.push(trArrIds[i]);
											}
										}
										if(trInt == trArr.length) {
											setDataPrivilege.refresh();
											setDataPrivilege.config = {
												dataId : selection.data.id,
												dataType : setDataPrivilege.mainpanel.dataType
											}
											myMain.mainPanel.getLayout().setActiveItem(5);
										} else {
											for(var m = 0; m < selections.length; m++) {
												for(var n = 0; n < tArrIds.length; n++) {
													if(selections[m].data.id == tArrIds[n]) {
														trStrs += selections[m].data.name + ", ";
													}
												}
											}
											var trStr = trStrs.substring(0, trStrs.length - 2);
											Ext.MessageBox.show({
												title : '提醒',
												msg : "模板名称：" + "<font color='red'>" + trStr+ "</font>" +
													  "<br>" + "没有设置权限的权限！",
												minWidth : 300,
												maxWidth : 1000,
												buttons : Ext.MessageBox.OK,
												icon : Ext.MessageBox.WARNING
											});
											return ;
										}
									}
								}
								
//								if (obj.setprivilege) {
//									setDataPrivilege.refresh();
//									setDataPrivilege.config = {
//										dataId : selection.data.id,
//										dataType : setDataPrivilege.mainpanel.dataType
//									}
//									myMain.mainPanel.getLayout().setActiveItem(5);
//								} else {
//									Ext.MessageBox.show({
//										title : '' + getResource('resourceParam634') + '',
//										msg : "没有设置权限的权限！",
//										buttons : Ext.MessageBox.OK,
//										icon : Ext.MessageBox.ERROR
//									});
//									return ;
//									Ext.example.msg("提示", "没有修改权限,无法启动流程编辑器");
//								}
							},
							disableCaching : true,
							autoAbort : true,
							params : {
								dataId : ids,
								dataType : setDataPrivilege.mainpanel.dataType
							}
						});
						/***end***/
					}
				}, '-', {
					text : '返回',
					id : 'view1_return',
					// hidden : true,
					handler : function() {
						backToMain();
						// Ext.getCmp('view1_return').setVisible(false);
					}
				}, {
					xtype : 'tbspacer',
					width : 20
				}, {
					xtype : 'tbtext',
					text : getResource('resourceParam500')
				}, {
					xtype:'tbtext',
					text: '<div id="111111" ></div>'
				}]
	});
	myMain.wbsPanel = new Ext.Panel({
				layout : 'fit',
				border : false,
				frame : false,
				autoScroll : true,
				bodyStyle : 'overflow:auto;',
				items : [wbsPanel.init()]
			});
	wbsPanel.sm.on('rowselect', function(sm) {
				if (sm.getCount() > 1) {
					setDataPrivilege.mutiFirst = true;
				} else {
					setDataPrivilege.mutiFirst = false;
				}
			});
	wbsPanel.sm.on('selectionchange', function(sm) {

				if (sm.getCount() == 0) {
					Ext.getCmp('view1_create').enable();
					Ext.getCmp('view1_update').disable();
					Ext.getCmp('view1_delete').disable();
					Ext.getCmp('view1_approve').disable();
					Ext.getCmp('view1_privilege').disable();

				} else if (sm.getCount() == 1) {
					var r = sm.getSelected();
					
					wbsPanel.dataType = r.get('dataType');
					if (wbsPanel.dataType == 'WBSContent') {
						Ext.getCmp('view1_create').enable();
					} else {
						Ext.getCmp('view1_create').disable();
					}
					Ext.getCmp('view1_update').enable();
					Ext.getCmp('view1_delete').enable();
					if (wbsPanel.dataType == 'WBSTemplate'&&r.get('status')=='0') {
						Ext.getCmp('view1_approve').enable();
					} else {
						Ext.getCmp('view1_approve').disable();
					}
					Ext.getCmp('view1_privilege').enable();

				} else {
					Ext.getCmp('view1_create').disable();
					Ext.getCmp('view1_delete').enable();

					var res = sm.getSelections();
					var len = res.length;
					var contentLength = 0;
					var temlateLength = 0;
					for (var i = 0; i < len; i++) {
						if (res[i].get('dataType') == 'WBSContent'||res[i].get('status')!='0') {
							//模板分类时++，状态不为0时，也++
							contentLength++;
						}
						if (res[i].get('dataType') == 'WBSTemplate'&&res[i].get('dataType') != 'WBSContent') {
							temlateLength++;
						}
					}
					if (contentLength > 0) {
						Ext.getCmp('view1_approve').disable();
					} else {
						Ext.getCmp('view1_approve').enable();
					}
					if (contentLength == len && temlateLength==0) {
						Ext.getCmp('view1_privilege').enable();
						Ext.getCmp('view1_update').disable();
					}else if (temlateLength == len ) {
						//多选时，当勾选一个content又取消时，类型的修复
						wbsPanel.dataType = 'WBSTemplate';
						Ext.getCmp('view1_privilege').enable();
						Ext.getCmp('view1_update').enable();
					} else  {
						Ext.getCmp('view1_privilege').disable();
						Ext.getCmp('view1_update').disable();
					}
				}
				if (sm.getCount() == 0) {
					templateCate.itemId = 0;
					templateContent.itemId = '';
					templateContent.parentId = 0;
					templateContent.deepLevel = 0;
					template.id = '';
				} else if (sm.getCount() == 1) {
					var r = sm.getSelected();
					wbsPanel.nodeId = r.get('id');
					templateContent.parentId = wbsPanel.nodeId;
					templateContent.deepLevel = r.get('deepLevel');
					templateCate.itemId = r.get('itemId');// 模板分类id
					templateCate.setValue(r.get('name'));
					if (r.get('dataType') == 'WBSContent') {
						template.id = '';
					} else if (r.get('dataType') == 'WBSTemplate') {
						template.id = ''+r.get('id');// 更新时，模板id
					}
					templateContent.itemId = r.get('itemId');
					wbsPanel.dataType = r.get('dataType');

				} else {
					templateContent.itemId = '';
					template.id = '';
					var res = sm.getSelections();
					for (var i = 0; i < res.length; i++) {
						if (res[i].get('dataType') == 'WBSContent') {
							templateContent.itemId += res[i].get('itemId');
							templateContent.itemId += ',';
						} else if (res[i].get('dataType') == 'WBSTemplate') {
							template.id += res[i].get('id');
							template.id += ',';
						}
					}
					if (templateContent.itemId) {
						templateContent.itemId = templateContent.itemId
								.substring(0, templateContent.itemId
												.lastIndexOf(","));
					}
					if (template.id) {
						template.id = template.id.substring(0, template.id
										.lastIndexOf(","));
					}
				}
			});
	wbsPanel.refresh();
	myMain.detailPanel = new Ext.Panel({});

	myMain.approvalPanel = approvePanel.init(null, "", "TemplateDataType",
			backToMain, "" + getResource('resourceParam943') + ""
					+ getResource('resourceParam1826') + "", backToMain);
	setDataPrivilege.privileged = myMain.privilege;
	myMain.privilegeSet = setDataPrivilege.init();

	myMain.templatePanel = new Ext.Panel({
				layout : 'fit',
				border : false,
				frame : false,
				autoScroll : true,
				bodyStyle : 'overflow:auto;'
			});

	myMain.mainPanel = new Ext.Panel({
				layout : 'card',
				border : false,
				titlebar : false,
//				autoScroll : true,
				activeItem : 0,
				margins : '0 5 5 0',
							listeners : {
				render : function() {
					new Ext.form.ComboBox({
						id : 'statusW',
						hiddenName : 'stauts',
						renderTo : '111111',
						store : new Ext.data.SimpleStore({
							fields : ['id', 'name'],
							data : [
									[
											-1,
											'所有'
													+ getResource('resourceParam500')
													+ ''],
									[
											0,
											''
													+ getResource('resourceParam947')
													+ ''],
									[
											1,
											''
													+ getResource('resourceParam948')
													+ ''],
									[
											2,
											''
													+ getResource('resourceParam509')
													+ '入库']]
						}),
						value : '所有' + getResource('resourceParam500') + '',
						valueField : 'id',
						displayField : 'name',
						typeAhead : false,
						mode : 'local',
						triggerAction : 'all',
						selectOnFocus : true,
						allowBlank : true,
						forceSelection : true,
						editable : false,
						style : 'margin-bottom: 5px;',
						width : 120,
						listeners : {
							'select' : function(combo, record, index) {
								wbsPanel.status = record.get('id');
								backToMain();

							}
						}
					})
				}
			},
				items : [myMain.wbsPanel, myMain.detailPanel,
						templateContent.init(templateContentConfig),
						template.init(templateConfig), myMain.approvalPanel,// 审批面板
						myMain.privilegeSet, myMain.templatePanel]
			});
	var viewport = new Ext.Viewport({
		layout : 'border',
		items : [{
			xtype : 'panel',
			layout : 'fit',
			tbar : tbar,
			region : 'center',
			items : [myMain.mainPanel]

		}]

	});

}
Ext.onReady(myMain.init, myMain, true);
