var templateTabPanel = {};
templateTabPanel.init = function() {

	Ext.QuickTips.init();
//	templateTabPanel.attributePanelMain = attributePanel.init();
//	templateTabPanel.attributePanelMain.add(viewTemplate.init());
	
	templateTabPanel.attributePanelMain=new Ext.Panel( {
		frame : false,
		boder : false,
		layout : 'card',
		items : [ viewTemplate.init(), TaskAttributePanel.init(),
		          viewApproveTask.init() ],
		activeItem : 0
	});
	
	
	templateTabPanel.attributePanel = new Ext.Panel({
				id : 'attributePanel',
				title : '属性',
				frame : false,
				boder : false,
				layout : 'fit',
				items : [templateTabPanel.attributePanelMain],
				listeners : {
					activate : function() {
						TaskAttributePanel.setFirstPage();
						var node = templateTree.node;
						var errorCallBack = function(iconCls) {
							var el = node.getUI().getIconEl();
							Ext.Element.fly(el)
									.removeClass(node.attributes.iconCls);
							Ext.Element.fly(el).addClass(iconCls);
						}
						if (node.attributes.id == 0) {
							templateTabPanel.attributePanelMain.getLayout()
									.setActiveItem(0);
							viewTemplate.setBasic(node.attributes.projectId);
						} else if (node.attributes.nt == '0') {
							TaskAttributePanel.setBasicForm(node.attributes.id,
									errorCallBack);
							templateTabPanel.attributePanelMain.getLayout()
							.setActiveItem(1);
							TaskAttributePanel.taskBasicForm.doLayout();
						} else if (node.attributes.nt == '1') {
							templateTabPanel.attributePanelMain.getLayout()
									.setActiveItem(2);
							viewApproveTask.setBasicForm(node.attributes.id,
									errorCallBack);
						}

					}
				}
			});

	function fnCallback(flag) {
		Ext.getCmp('dataObjectColumnTreeDel').disable();
		Ext.getCmp('dataObjectColumnTreeAdd').disable();
		Ext.getCmp('dataObjectColumnTreeUpdate').disable();
	}
	// 任务数据tab页
	var mydataObjectPanel = new dataObjectPanel();
	templateTabPanel.dataPanel = mydataObjectPanel.init();
	templateTabPanel.dataPanel.on('activate', function() {
				var node = templateTree.node;
				var nodeId = node.attributes.id;
				if (nodeId != 0) {
					// 模板本身没有数据
					templateTabPanel.dataPanel.enable();
					var selectedProjectId = node.attributes.projectId;
					var selectedTaskId = nodeId;
					mydataObjectPanel.setConfigs(selectedProjectId,
							selectedTaskId, false);
				} else if (nodeId == 0) {
					templateTabPanel.dataPanel.disable();
				}
			})
	// end
	templateTabPanel.relationPanel = new Ext.Panel({
		id : 'relationPanel',
		title : '' + getResource('resourceParam1154') + '',
		frame : false,
		boder : false,
		layout : 'fit',
		items : [relationPanel.init()],
		listeners : {
			activate : function() {
				var projectId = '';
				var taskId = '';
				var nodename = '';
				var node = templateTree.node;
				var nodeId = node.attributes.id;
				if (nodeId == 0) {
					projectId = node.attributes.projectId;
					taskId = 'p' + projectId;
					nodename = node.attributes.name;
				} else {
					projectId = node.attributes.projectId;
					taskId = node.attributes.id;
					nodename = node.attributes.name;
				}
				relationPanel.active(projectId, taskId, nodename);

			}
		}
	});
	templateTabPanel.wbsContainer = new Ext.Panel({
				frame : false,
				boder : false,
				layout : 'fit'
			});
	templateTabPanel.addColumnTree = function() {
		if (templateTabPanel.wbs != null) {
			templateTabPanel.wbsContainer.remove(templateTabPanel.wbs);
		}
		templateTabPanel.wbs = wbsdata.init();
		templateTabPanel.wbsContainer.add(templateTabPanel.wbs);
		templateTabPanel.wbsContainer.doLayout();
	};
	templateTabPanel.wbsPanel = new Ext.Panel({
				id : 'wbsPanelOnTab',
				title : 'WBS',
				frame : false,
				boder : false,
				layout : 'fit',
				items : [templateTabPanel.wbsContainer],
				listeners : {
					activate : function() {
						var node = templateTree.node;
						var nodeId = node.attributes.id;
						if (nodeId == 0) {
							nodeId = 'p' + node.attributes.projectId;
						}
						wbsdata.nodeId = nodeId;
						templateTabPanel.addColumnTree();
						wbsdata.sourceNodeId = '';
						wbsdata.relationtypes = '1,2';
						wbsdata.refresh();
					}
				}
			});

	// 甘特图
    templateTabPanel.t9 = Sch.ganttQuantityMain.init();
    templateTabPanel.t9.on("activate", function() {
		var node = templateTree.node;
		var nodeId = node.attributes.id;
		if (nodeId == 0) {
			//edited by suny ,jg 修改后 对模板查看的修复
			nodeId = 'p' + node.attributes.projectId;
		}
        var proxy = new Ext.data.HttpProxy({
      url : '../JSON/gantt_ganttRemote.getGanttList?nodeid='
            + nodeId
});
Sch.ganttQuantityMain.getDay(nodeId);
Sch.ganttQuantityMain.ganttGrid.getStore().proxy = proxy;
myGrid.loadvalue(Sch.ganttQuantityMain.ganttGrid.getStore());
var proxy1 = new Ext.data.HttpProxy({
    url : '../JSON/ganttRelation_GanttRelationRemote.getGantLines?nodeid='
            + nodeId
});
Sch.ganttQuantityMain.ganttGrid.dependencyStore.proxy = proxy1;
myGrid.loadvalue(Sch.ganttQuantityMain.ganttGrid.dependencyStore);
});
    
    
    
//	templateTabPanel.t9 = ganttMain.init();
//	templateTabPanel.t9.on("activate", function() {
//		var node = templateTree.node;
//		var nodeId = node.attributes.id;
//		if (nodeId == 0) {
//			nodeId = 'w' + node.attributes.projectId;
//		}
//		Seam.Component.getInstance("aofoquery_zongheChaxunSvr").getStartDate(
//				nodeId, function(reslut) {
//					var proxy = new Ext.data.HttpProxy({
//						url : '../JSON/aofoquery_zongheChaxunSvr.getGanttList?nodeid='
//								+ nodeId
//					});
//					var today = Date.parseDate(reslut, "Y-m-d");
//					ganttMain.ganttGrid.setView(today, today
//									.add(Date.MONTH, 12), 'monthAndQuarters');
//					ganttMain.ganttGrid.getStore().proxy = proxy;
//					myGrid.loadvalue(ganttMain.ganttGrid.getStore(), {
//								start : 0,
//								limit : 25
//							}, null);
//					myGrid.loadvalue(ganttMain.ganttGrid.dependencyStore, {
//								start : 0,
//								limit : 25
//							}, null);
//				});
//
//	});

	// TAB面板
	templateTabPanel.tabPanel = new Ext.sysTabPanel({
				minTabWidth : 300,
				resizeTabs : false,
				boder : false,
				enableTabScroll:true,
				layoutOnCardChange:true,
				hidden : false,
				items : [templateTabPanel.attributePanel,
						templateTabPanel.dataPanel,
						templateTabPanel.relationPanel,
						templateTabPanel.wbsPanel, templateTabPanel.t9]
			});
	return templateTabPanel.tabPanel;
}
