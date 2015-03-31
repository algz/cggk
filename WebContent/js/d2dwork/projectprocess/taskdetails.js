var taskdetails = {}
taskdetails.init = function() {
	// 属性
	taskdetails.attributePanel = ProjectAttributePanel.init();
	taskdetails.t1 = new Ext.Panel({
				id : 'etabpanel11',
				height : 800,
				title : '' + getResource('resourceParam6001'), // 属性
				layout : 'fit',
				listeners : {
					activate : showTaskAttribute,
					deactivate : setTaskAttribute
				},
				items : [taskdetails.attributePanel]
			});
	function setTaskAttribute() {
		ProjectAttributePanel.setFirstPage();
	}
	function showTaskAttribute() {
		ProjectAttributePanel.projectId = 'p' + zongheMain.projectid;
		ProjectAttributePanel.setBasicForm();
		ProjectAttributePanel.setFirstPage();
		Ext.getCmp('etabpanel11').removeClass('x-hide-display');
		taskdetails.tabpanel.doLayout();
		ProjectAttributePanel.setFirstPage();
	}

	// 数据
	var mydataObjectPanel = new dataObjectPanel();
	taskdetails.egridpanel2 = mydataObjectPanel.init();
	taskdetails.egridpanel2.on('activate', function() {
				var enableEdit = false;
				mydataObjectPanel.setConfigs('p' + zongheMain.projectid,
						zongheMain.projectid, enableEdit);
			});

	// taskdetails.t2 = new Ext.Panel({
	// id : 'etabpanel12',
	// height : 800,
	// title : '数据',
	// layout : 'fit'
	// });
	// 关系
	taskdetails.t3 = new Ext.Panel({
		id : 'etabpanel13',
		height : 800,
		title : '' + getResource('resourceParam1154') + '',
		layout : 'fit',
		items : [relationPanel.init()],
		listeners : {
			activate : function() {
				relationPanel.active(zongheMain.projectid, "p" + zongheMain.projectid, zongheMain.projectname);
			}

		}
	});
	// WBS
	taskdetails.t4 = new Ext.Panel({
				id : 'etabpanel14',
				height : 800,
				title : 'WBS',
				layout : 'fit',
				listeners : {
					activate : function() {
						wbsdata.nodeId = "p" + zongheMain.projectid;
						var f = wbsdata.init(wbsdata.nodeId);
						this.add(f);
						wbsdata.refresh();
						this.doLayout();
					}
				}
			});
	// 甘特图
	taskdetails.t9 = Sch.ganttQuantityMain.init();
	taskdetails.t9.on("activate", function() {
				var taskname = "p" + zongheMain.projectid;
                var proxy = new Ext.data.HttpProxy({
                        url : '../JSON/gantt_ganttRemote.getGanttList?nodeid='
                                + taskname
                    });
                    Sch.ganttQuantityMain.getDay(taskname);
                    Sch.ganttQuantityMain.ganttGrid.getStore().proxy = proxy;
                    myGrid.loadvalue(Sch.ganttQuantityMain.ganttGrid.getStore(),
                            taskdetails.args, taskdetails.baseargs);
                                    
			});
        taskdetails.t10 = Sch.actualmanhourMain.init();
        taskdetails.t10.on("activate", function() {
                var taskname = "p" + zongheMain.projectid;
                 var proxy = new Ext.data.HttpProxy({
                        url : '../JSON/gantt_ganttRemote.getActualmanHourGanttList?nodeid='
                                + taskname
                    });
                    Sch.actualmanhourMain.ganttGrid.getStore().proxy = proxy;
                    myGrid.loadvalue(Sch.actualmanhourMain.ganttGrid.getStore(),
                            taskdetails.args, taskdetails.baseargs);
                                    
            });
            
          taskdetails.t11 = Sch.timeMain.init();
          taskdetails.t11.on("activate", function() {
                var taskname = "p" + zongheMain.projectid;
                var proxy = new Ext.data.HttpProxy({
                        url : '../JSON/gantt_ganttRemote.getTimeGanttList?nodeid='
                                + taskname
                    });
                    Sch.timeMain.getDay(taskname);
                    Sch.timeMain.ganttGrid.getStore().proxy = proxy;
                    myGrid.loadvalue(Sch.timeMain.ganttGrid.getStore(),
                            taskdetails.args, taskdetails.baseargs);
                                    
            });
	// 进度
	taskdetails.t8 = processSharingPanel.init();
	taskdetails.t8.on("activate", function() {
		taskname = 'p' + zongheMain.projectid;
		var proxy = new Ext.data.HttpProxy({
			url : '../JSON/anotherprocessquery_ProcessquerySvr.getProjectTaskAndId?taskname='
					+ taskname
				// '../data/d2dwork/d2dwork_process_ProcessSvr_getList0.text'
		});
		processSharingPanel.grid.getStore().proxy = proxy;
		myGrid.loadvalue(processSharingPanel.grid.getStore(), zongheMain.args,
				zongheMain.baseargs);
	});
	// 审批记录
	taskdetails.t7 = new Ext.Panel({
				id : 'etabpanel17',
				height : 800,
				title : '' + getResource('resourceParam1448') + '',
				layout : 'fit',
				listeners : {
					activate : function() {
						var dataid = zongheMain.projectid;
						var datatype = 'TaskDataType';
						examApproval.getCommentGrid(this, dataid, datatype);
					}
				}
			});

	// 任务历程

	taskdetails.ttttt = new Ext.Panel({
		id : 'etabpanel222',
		height : 800,
		title : '' + getResource('resourceParam6077'), // 6077任务历程
		layout : 'fit',
		listeners : {
			activate : function() {

				Ext.Ajax.request({
					url : "../JSON/privilege_DataPrivilegeRemote.getDataManipultations",
					method : 'POST',
					success : function(response, options) {
						var obj = Ext.util.JSON.decode(response.responseText);
						var conn = synchronize.createXhrObject();
						var url = "../JSON/datacenter_DataCenterRemote.getInstanceById?insid=project_"
								+ zongheMain.projectid;

						conn.open("GET", url, false);
						conn.send(null);
						var respText = conn.responseText;

						var obj1 = Ext.util.JSON.decode(respText);
						// alert(respText);
						var dataid = zongheMain.projectid;
						taskdetails.licheng = cateInstancePanel.init("project_"
										+ dataid, obj1.categoryInstanceName);
						if (taskdetails.licheng != null) {
							taskdetails.ttttt.remove(taskdetails.licheng);
						}
						taskdetails.ttttt.add(taskdetails.licheng);
						taskdetails.ttttt.doLayout();
						if (obj.view) {
							taskdetails.licheng.enable();
						} else {
							taskdetails.licheng.disable();
							Ext.MessageBox.show({
										title : ''
												+ getResource('resourceParam499')
												+ '',
										msg : ''
												+ getResource('resourceParam1049')
												+ '',
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.ERROR
									});
						}
					},
					disableCaching : true,
					autoAbort : true,
					params : {
						dataId : "p" + zongheMain.projectid
					}
				});

			}
		}
	});
	taskdetails.ttttt.enable();
	// TAB页面
	taskdetails.tabpanel = new Ext.TabPanel({
		id : 'taskdetailstabpanel',
		region : 'center',
		resizeTabs : true,
		items : [taskdetails.t1, taskdetails.egridpanel2, taskdetails.t3,
				taskdetails.t4, taskdetails.t9,taskdetails.t10,taskdetails.t11, taskdetails.t8, taskdetails.t7,
				taskdetails.ttttt]
			// taskdetails.t5,
			// taskdetails.t6,

		});
	return taskdetails.tabpanel;
}
