/**

 * 我的日志main func
 */
 Ext.QuickTips.init();
var myLog = {

}

myLog.init = function() {
	Ext.QuickTips.init();

	myLog.workLogGrid = taskLogGrid.init();
	myLog.teamLogGrid = taskLogGrid.init();

	myLog.taskLogGrids = taskLogGrid.init();

	var tb = [{
				text : '' + getResource('resourceParam483') + '',
				iconCls : 'priv-add',
				listeners : {
					'click' : function() {
						var logform = logAdd.init(

						);

						myLog.win = new Ext.Window({
									title : '添加',
									width : 700,
									height : 400,
									layout : 'fit',
									modal : true,
									items : [logform]
								})
						myLog.win.show();
						Ext.getCmp('richEditor').load({
									url : '../js/richEditor.jsp?height=200'
								});
					}
				}

			}, {
				text : '修改',
				iconCls : 'priv-add',
				listeners : {
					'click' : function() {
						if (myLog.workLogGrid.getSelectionModel().getCount() != 1) {
							Ext.Msg.alert('提示信息', '请选一条记录！');
							return;
						}
						var logform = logUpdate.init(function() {
									myGrid.loadvalue(myLog.workLogGrid
													.getStore(),
											taskLogGrid.args,
											taskLogGrid.baseargs);
									myLog.updatewin.close();
									myLog.workLogPanel.getTopToolbar().enable();
								});

						myLog.updatewin = new Ext.Window({
									title : '修改',
									width : 700,
									height : 400,
									layout : 'fit',
									modal : true,
									items : [logform]
								})
						myLog.updatewin.show();

						Ext.Ajax.request({
							url : '../JSON/RecordRemote.getRecordById',
							method : 'POST',
							success : function(response, options) {
								Ext.getCmp('richEditor').load({
											url : '../js/richEditor.jsp?height=200'
										});
								var obj = Ext.util.JSON
										.decode(response.responseText);
								logUpdate.title.setValue(obj.result.title);
								logUpdate.recordid
										.setValue(obj.result.recordid);
								logUpdate.file.setValue(obj.result.filename);
								// try {
								try {
									FCKeditorAPI.GetInstance("dictContent")
											.setHtml(content);
								} catch (e) {
									Ext.getCmp('richEditor').load({
										url : '../js/richEditor.jsp?height=200',
										params : {
											content : obj.result.content
										}
									});
								}
								// } catch (e) {
								// Ext.getCmp('richEditor').load({
								// url : '../js/richEditor.jsp?height=500',
								// params : {
								// content : content
								// }
								// });
								// }

							},
							disableCaching : true,
							autoAbort : true,
							params : {
								recordid : myLog.workLogGrid
										.getSelectionModel().getSelected()
										.get("recordid")
							}
						});
					}
				}

			},{
				text : '删除',
				iconCls : 'priv-add',
				handler:function(){
					if (myLog.workLogGrid.getSelectionModel().getCount() < 1) {
							Ext.Msg.alert('提示信息', '请选要删除的记录！');
							return;
						}
				
				 Ext.MessageBox.confirm('提示', '确实要删除吗?', function(btn){
		           if(btn=="yes"){
		             var records=myLog.workLogGrid.getSelectionModel().getSelections();
					var recordids=[];
					for(var i=0;i<records.length;i++){
						recordids.push("'"+records[i].get("recordid")+"'");
					}
						callSeam("RecordRemote", "deleteRecords",
											[recordids.join(",")], function(result) {
												myLog.workLogGrid.getStore().reload();
											})
					
					
		           }
		       	 });
				
			
						
				}
			}];
	myLog.workLogPanel = new Ext.Panel({
				layout : 'fit',
				items : [myLog.workLogGrid],
				border : false,
				tbar : tb
			});
	myLog.taskLogGrids.getStore().on('beforeload', function(store, options) {
				this.proxy = new Ext.data.HttpProxy({
							method : 'POST',
							url : '../JSON/RecordRemote.getMylogTaskRecordList'
						})
			});
	myLog.taskLogGrids.getStore().load({
				params : {
					start : 0,
					limit : 25
				}
			});

	var myLogDepAdminUser = new Ext.form.ComboBox({
		store : new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
								url : '../JSON/base_user_UserSerivce.queryUserByDepids'
							}),
					reader : new Ext.data.JsonReader({
								totalProperty : 'totalProperty',
								root : 'root'
							}, [{
										name : 'userid'
									}, {
										name : 'truename'
									}])
				}),
		fieldLabel : '部门人员',
		valueField : "userid",
		displayField : "truename",
		mode : 'remote',
		allowBlank : true,
		forceSelection : true,
		triggerAction : 'all',
		emptyText : '' + getResource('resourceParam459') + '部门人员...',
		labelStyle : 'padding:5px 0px 5px 0px',
		pageSize : 15,
		listeners : {},
		style : 'margin-bottom: 5px;'
	});

	var depUsers = new Ext.FormPanel({
				plain : false,
				frame : true,
				autoScroll : true,
				labelWidth : 100,
				items : [{
					layout : 'column',
					items : [{
								columnWidth : .5,
								layout : 'form',
								defaults : {
									anchor : '95%'
								},
								items : myLogDepAdminUser
							}, {
								columnWidth : .3,
								layout : 'form',
								items : {
									xtype : 'button',
									width : 100,
									text : '查询',
									handler : function() {
										if( myLogDepAdminUser.getValue()==""){
											Ext.Msg.alert("提示","请先选择部门人员！");
											return;
										}
										myGrid.loadvalue(myLog.teamLogGrid
														.getStore(),
												taskLogGrid.args, {
													creator : myLogDepAdminUser
															.getValue()
												});
									}
								}
							}]
				}]
			});
	var teamlogpanel = new Ext.Panel({
				layout : 'border',
				border : false,
				items : [{
							region : 'north',
							layout : 'fit',
							items : [depUsers],
							height : 50,
							border : false
						}, {
							layout : 'fit',
							region : 'center',
							items : [myLog.teamLogGrid],
							border : false
						}]
			});
	var mainTabPanel = new Ext.TabPanel({
		region : 'center',
		activeTab : 0,
		closable : false,
		items : [{
					title : '任务日志',
					layout : 'fit',
					items : myLog.taskLogGrids
				}, {
					title : '工作日志',
					layout : 'fit',
					items : myLog.workLogPanel
				}, {
					id : 'dep_user_log',
					title : '部门成员日志',
					layout : 'fit',
					items : teamlogpanel
				}],
		listeners : {
			'afterrender' : function(tabPanelObj) {
				var conn = synchronize.createXhrObject();
				var url = "../JSON/organization_orgchargeman_OrgChargeManRemote.determine_chargeMan";
				conn.open("POST", url, false);
				conn.send(null);
				var respText = conn.responseText;
				var obj = Ext.util.JSON.decode(respText);
				if (!obj.success) {
					tabPanelObj.hideTabStripItem("dep_user_log");
				}
			}
		}
	});

	new Ext.Viewport({
				layout : 'border',
				items : [mainTabPanel]
			});
	myGrid.loadvalue(myLog.workLogGrid.getStore(), taskLogGrid.args,
			taskLogGrid.baseargs);

}
Ext.onReady(myLog.init);
