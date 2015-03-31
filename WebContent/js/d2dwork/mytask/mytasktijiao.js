var mytasktijiao = {
	tijiaopane : null,
	tijiaopanelform : null,
	propertypanel : null,
	commitauditpanel : null,
	tabpanel : null,
	northpanel : null,
	centerpanel : null
}
mytasktijiao.panel = function() {
	mytasktijiao.tijiaopane = new Ext.Panel({
				id : 'tijiaopane',
				layout : 'fit'
			});
    mytasktijiao.tijiaopane.on("activate",function(p){
                    p.removeAll();
                    p.add(mytasktijiao.mainpanel(mytaskMain.hh,mytaskMain.taskids,mytaskMain.ptids));
                    p.doLayout();
                });
	return mytasktijiao.tijiaopane;
}
mytasktijiao.mainpanel = function(hh, taskids, projectids) {
	var panel = new Ext.Panel({
				id : 'mytasktijiaomainpanel',
				layout : 'border',
				items : [mytasktijiao.northpanel(hh),
						mytasktijiao.centerpanel(taskids, projectids)]
			});
	return panel;
}
mytasktijiao.centerpanel = function(taskids, projectids) {
//    taskproperty.taskdatas=myGrid.rows[0].data;
//	var perty = taskproperty.cardform(1, taskids);
	mytasktijiao.mydataObjectPanel = new dataObjectPanel();
	mytasktijiao.dataPanel = mytasktijiao.mydataObjectPanel.init();
	mytasktijiao.dataPanel.on('activate', function() {
				var enableEdit = true;
				mytasktijiao.mydataObjectPanel.setConfigs(projectids[0],
						taskids[0], enableEdit);
			})
	mytasktijiao.tabpanel = new Ext.TabPanel({
		id : 'tijiaotabpanel',
		resizeTabs : true,
		activeTab : 0,
		items : [mytasktijiao.dataPanel],
		buttons : [{ // 定义面板中的按钮
			text : '' + getResource('resourceParam484') + '',
			handler : function() { // 为当前按钮绑定事件
				var directApprove = new Array(); // 不需要审批的任务id集合
				var directSum = 0;
				var directIds = '';
				var randomApprove = new Array(); // 自由选择审批人审批的任务id集合
				var randomSum = 0;
				var randomIds = '';
				var superApprove = new Array(); // 上级任务负责人审批的任务id集合
				var superSum = 0;
				var superIds = ''
				for (var i = 0; i < mytaskMain.taskids.length; i++) {
					if (mytaskMain.approvallist[i] == 0) {
						directApprove[directSum] = mytaskMain.taskids[i];
						directSum++;
					} else if (mytaskMain.approvallist[i] == 1) {
						randomApprove[randomSum] = mytaskMain.taskids[i];
						randomIds += mytaskMain.taskids[i] + ',';
						randomSum++;
					} else if (mytaskMain.approvallist[i] == 2) {
						superApprove[superSum] = mytaskMain.taskids[i];
						superIds += mytaskMain.taskids[i] + ',';
						superSum++;
					}
				}

				if (directSum > 0 && randomSum == 0 && superSum == 0) { // 所有任务都不需要审批
					var info = "该操作会将所有未完成的子任务终止，是否进行操作？";
					Ext.Msg.confirm('' + getResource('resourceParam575') + '',
							info, function(btn) {
								if (btn == 'yes') {
									var mask = new Ext.LoadMask(document.body,
											{
												msg : '正在提交,请稍候...'
											});
									mask.show();
									var appVo = Seam.Remoting
											.createType("com.luck.itumserv.mytask.MyTaskVo");
									appVo.setValid(false);
									appVo.setTaskids(directApprove);
									callSeam("mytask_MyTaskRemote",
											"isApproval", [appVo], function(
													result) {
												if (result == "true") {
													mytaskMain.loadtasklist();
												} else if (result == "false") {
													Ext.MessageBox.show({
														title : getResource('resourceParam5034'),
														msg : getResource('resourceParam5035'),
														buttons : Ext.MessageBox.OK,
														icon : Ext.MessageBox.ERROR
													});
												} else {
													Ext.Msg.confirm(''+ getResource('resourceParam575')+ '',
																	"有子任务没有完成，继续操作会将所有未完成的子任务终止，是否继续？",
																	function(
																			btn) {
																		if (btn == 'yes') {
																			var mask1 = new Ext.LoadMask(document.body,
											{
												msg : '正在提交,请稍候...'
											});
									mask1.show();
									var appVo = Seam.Remoting
											.createType("com.luck.itumserv.mytask.MyTaskVo");
									appVo.setValid(true);
									appVo.setTaskids(directApprove);
									callSeam("mytask_MyTaskRemote",
											"isApproval", [appVo], function(
													result) {
												if (result == "true") {
													mytaskMain.loadtasklist();
												} else if (result == "false") {
													Ext.MessageBox.show({
														title : getResource('resourceParam5034'),
														msg : getResource('resourceParam5035'),
														buttons : Ext.MessageBox.OK,
														icon : Ext.MessageBox.ERROR
													});
												} 
												mask1.hide();
											});
																		}
																	});

												}
												mask.hide();
											});
								}
							});

				} else if (directSum == 0 && randomSum > 0 && superSum == 0) {
					mytaskMain.cenpanel.remove(mytaskMain.card6, true);
					mytaskMain.card6 = approvePanel.init(mytaskMain.cenpanel,
							randomIds, 'TaskDataType',
							(function canelApproval() {
								mytaskMain.cenpanel.layout.setActiveItem(0);
							}), '' + getResource('resourceParam1486') + '');
					mytaskMain.cenpanel.layout.setActiveItem(5);
					mytaskMain.card6.doLayout();
				} else if (directSum == 0 && randomSum == 0 && superSum > 0) {
					if (superSum == 1) {
						mytaskMain.cenpanel.remove(mytaskMain.card6, true);
						mytaskMain.card6 = approvePanel.init(
								mytaskMain.cenpanel, superIds, 'TaskDataType',
								(function canelApproval() {
									mytaskMain.cenpanel.layout.setActiveItem(0);
								}), '' + getResource('resourceParam1486') + '');
						mytaskMain.cenpanel.layout.setActiveItem(5);
						mytaskMain.card6.doLayout();
						Ext.Ajax.request({
							url : "../JSON/mytask_MyTaskRemote.getSuperLeader",
							method : 'POST',
							params : {
								taskid : superApprove[0]
							},
							success : function(response, options) {
								var obj = Ext.util.JSON
										.decode(response.responseText);
								approvePanel.participantsGrid.getTopToolbar()
										.disable();
								var approvalUserRecord = Ext.data.Record
										.create([{
													name : 'userid'
												}, {
													name : 'truename'
												}, {
													name : 'ginstitutename'
												}, {
													name : 'usertype'
												}]);
								var record = new approvalUserRecord({
											userid : obj.result.userid,
											truename : obj.result.truename,
											ginstitutename : obj.result.ginstitutename,
											usertype : ''
													+ getResource('resourceParam731')
													+ ''
										});
								var toDataStore = approvePanel.participantsGrid
										.getStore();
								toDataStore.add(record);
							}
						});
					} else {
						Ext.MessageBox.show({
									title : ''
											+ getResource('resourceParam587')
											+ '',
									msg : '' + getResource('resourceParam9120')
											+ '',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								});
					}
				} else {
					Ext.MessageBox.show({
								title : '' + getResource('resourceParam587')
										+ '',
								msg : '' + getResource('resourceParam9121')
										+ '',
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.ERROR
							});
				}
			}
		}, {
			text : '取消',
			handler : function() {
				mytaskMain.loadtasklist();
			}
		}]
	});
	// 装载tab面板
	mytasktijiao.ttabpanel = new Ext.Panel({
				id : 'ttabpanel',
				layout : 'fit',
				region : 'center',
				items : [mytasktijiao.tabpanel]
			});
	return mytasktijiao.ttabpanel;
}
mytasktijiao.northpanel = function(hh) {
	var tpanel1 = new Ext.Panel({
				id : 'tpanel1',
				region : 'north',
				height : 25,
				// collapsible : true,
				html : "<div id='mytasktijiaodiv'>" + hh + "</div>"
			});
	return tpanel1;
}
