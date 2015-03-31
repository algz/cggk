var dataCenterData = {}
dataCenterData.init = function(datacenterid, datatagid, isproject, callback) {
	var taskRoot = new Ext.tree.AsyncTreeNode({
				id : "root",
				text : ''
			});

	var taskTreeloader = new Ext.tree.TreeLoader({
				url : '../JSON/task_TaskRemote.getParentNodeForDataRelation?taskId='
						+ datatagid
			})
	var taskTreePanel = new Ext.tree.TreePanel({
				border : false,
				useArrows : false,
				autoShow : true,
				animate : false,
				enableDD : false,
				containerScroll : false,
				rootVisible : false,
				frame : false,
				loader : taskTreeloader,
				autoScroll : true,
				root : taskRoot				
			});
	taskTreePanel.on('click', function(node) {
		taskDataTreeGrid.getStore().on('beforeload', function(store, options) {
			var isProjectNode = node.attributes.projectId.indexOf("p") == 0;
			var dataCenterid = isProjectNode ? node.attributes.projectId
					.substr(1) : node.attributes.projectId
			var dataCategoryPrefix = isProjectNode
					? "projectdatas_"
					: "taskdatas_"
			this.proxy = new Ext.data.HttpProxy({
						method : 'POST',
						url : '../JSON/dataEntity_DataEntityRemote.getDataEntities'
					})
			options.params = Ext.apply(options.params, {
						dataCenterID : "project_" + dataCenterid,
						parentDataEntityID : dataCategoryPrefix + node.id
					});
			taskRelationTreeGrid.setParameters({"dataCenterPrefixID":"project_" + dataCenterid},{"dataCategoryPrefixID":dataCategoryPrefix + node.id})
		});
		taskDataTreeGrid.getSelectionModel().clearSelections()
		taskDataTreeGrid.getStore().load();
		taskTreePanel.selectedNode = node;
		dataCenterData.parentType = node.attributes.iconCls.indexOf("Project") > -1
				? "project"
				: "task";
		dataCenterData.nodeRelationType = node.attributes.pre == "parent"
				? "parent"
				: "brother";
	})
	taskTreeloader.on('beforeload', function(treeLoader, node) {
		if (node.id == "root") {
			treeLoader.dataUrl = '../JSON/task_TaskRemote.getParentNodeForDataRelation';
			treeLoader.baseParams.taskId = datatagid;
		} else {
			treeLoader.dataUrl = '../JSON/task_TaskRemote.getChildNodesForDataRelation';
			treeLoader.baseParams.projectId = node.attributes.projectId;
			treeLoader.baseParams.taskId = node.id;
			// 过滤操作的任务节点用到的参数
			treeLoader.baseParams.theNodeId = datatagid;
		}
	})

	var root = new Ext.tree.AsyncTreeNode({
				id : 'root',
				text : ''
			});

	var treeloader = new Ext.tree.TreeLoader({
				url : '../JSON/datacenter_DataCenterRemote.getDataCenterLocationTree',
				baseParams : {
	// nodeid : datacenterid,
				// datacenterid : datacenterid
				}
			})

	treeloader.on('beforeload', function(treeLoader, node) {
		if (node.id == "root") {
			treeLoader.dataUrl = '../JSON/datacenter_DataCenterRemote.getDataCenterLocationTree';
			// treeLoader.baseParams.datacenterid = datacenterid;
			// treeLoader.baseParams.nodeid = datacenterid;
		} else {
			treeLoader.dataUrl = '../JSON/datacenter_DataCenterRemote.getDataCenterDataTree';
			treeLoader.baseParams.datacenterid = node.id;
			treeLoader.baseParams.nodeid = node.id;
		}
	})
	var instanceTree = new Ext.tree.TreePanel({
				border : false,
				rootVisible : false,
				useArrows : false,
				autoShow : true,
				animate : false,
				enableDD : false,
				containerScroll : false,
				frame : false,
				loader : treeloader,
				disabled : false,
				autoScroll : true,
				root : root
			});
	var dataCenterDataTabPanel;
	instanceTree.on("click", function(node) {
				dataCenterData.checkinstancenode = node;
				var nodeid = node.id;
				dataCenterDataTabPanel = dataCenterData.initTab(nodeid);
				var tpanel = attriPanel.items.get(0);

				if (tpanel) {
					attriPanel.remove(tpanel);
				}

				attriPanel.add(dataCenterDataTabPanel);
				attriPanel.doLayout();
				instanceTree.selectedNode = node;
				dataCenterData.parentType = "dataCenter";
			});

	// var panel = categoryData.init();
	var temppanel = new Ext.TabPanel({
				activeItem : 0,
				items : [new Ext.Panel({
							title : ''+getResource('resourceParam474')+'',
							html : ''+getResource('resourceParam1726')+''
						})]
			});
	var attriPanel = new Ext.Panel({
				layout : 'fit',
				region : 'center',
				items : [temppanel]

			});
	var dataCenterMainPanel = new Ext.Panel({
				layout : 'border',
				border : false,
				title : ''+getResource('resourceParam561')+'',
				items : [new Ext.Panel({
									region : 'west',
									width : 200,
									border : false,
									layout : 'fit',
									items : [instanceTree]
								}), attriPanel],
				tbar : [{
					text : ''+getResource('resourceParam652')+'',//查询
					iconCls : 'search1',
					handler : function(){
						if(instanceTree.selectedNode == undefined){
							Ext.Msg.show({
								title : ''+getResource('resourceParam575')+'',//提示
								icon : Ext.Msg.ERROR,
								msg : ''+getResource('resourceParam7017')+'！',//请选择要查询的节点
								buttons : Ext.Msg.OK
							})
							return false;
						}
						function callback(win,myFormValues){
							if(Ext.get('searchDataCenterResultGridPanel') == undefined){
								dataCenterData.dataCenterSearchGrid = queryRelationDataResult.init();
								var p = new Ext.Panel({
									title : ''+getResource('resourceParam7018')+'',//查询结果
									id : 'searchDataCenterResultGridPanel',
									items : dataCenterData.dataCenterSearchGrid,
									closable : true,
									listeners : {
										'activate' : function(panel){
											dataCenterData.dataCenterSearchGrid.setHeight(panel.getHeight());
											dataCenterData.dataCenterSearchGrid.setWidth(panel.getWidth());
										},
										'bodyresize' : function(panel){
											dataCenterData.dataCenterSearchGrid.setHeight(panel.getHeight());
											dataCenterData.dataCenterSearchGrid.setWidth(panel.getWidth());
										}
									}
								})
								dataCenterDataTabPanel.add(p);
								dataCenterData.dataCenterSearchGrid.getSelectionModel().on('selectionchange',function(smodel) {
									dataCenterData.selectedRows = smodel.getSelected();
								})
							}
							var index = dataCenterDataTabPanel.items.length;
							dataCenterDataTabPanel.setActiveTab(index-1);
							dataCenterDataTabPanel.doLayout();
							win.close();
							var dcategoryinstanceid = dataCenterData.checkinstancenode.id;
							queryRelationDataResult.setParameters({"searchDataEntityType":myFormValues.dataEntityType});
							queryRelationDataResult.setParameters({"dcategoryinstanceid":dcategoryinstanceid});
							dataCenterData.dataCenterSearchGrid.getStore().on('beforeload', function(store, options) {
								this.proxy = new Ext.data.HttpProxy({
									method : 'POST',
									url : '../JSON/dataEntity_DataEntityRemote.queryInstanceIsWithData'
								})
								options.params = Ext.apply(options.params, {
									 dcategoryinstanceid : dcategoryinstanceid,
									 parent : '0'
								});
								options.params = Ext.apply(options.params,myFormValues)
							});
							dataCenterData.dataCenterSearchGrid.getStore().load();
						}
						
						var searchWin = queryRelationDataWin.init(callback);
						searchWin.show();
					}
				}],
				listeners : {
					'activate' : function(panel) {
						if (taskTreePanel.selectedNode != undefined) {
							taskTreePanel.getSelectionModel()
									.select(taskTreePanel.selectedNode);
							taskTreePanel.fireEvent('click',
									taskTreePanel.selectedNode);
						}
					}
				}
			});
	var taskDataTreeGrid = dataCenterGridView.init()
	taskDataTreeGrid.getSelectionModel().on('selectionchange',
			function(smodel) {
				dataCenterData.selectedRows = smodel.getSelected();
			})
	var taskDataTabpanel = new Ext.TabPanel({
								activeItem : 0,
								id : 'taskDataTabpanel',
								items : new Ext.Panel({
											title : ''+getResource('resourceParam474')+'',
											layout : 'fit',
											items : [taskDataTreeGrid]
										})
							})
	var taskDataPanel = new Ext.Panel({
		title : ''+getResource('resourceParam733')+''+getResource('resourceParam474')+'',
		layout : 'border',
		border : false,
		tbar : [{
//					text : ''+getResource('resourceParam652')+'',//任务数据查询
//					iconCls : 'search1',
//					handler : function(){
//						if(taskTreePanel.selectedNode == undefined){
//							Ext.Msg.show({
//								title : ''+getResource('resourceParam575')+'',//提示
//								icon : Ext.Msg.ERROR,
//								msg : ''+getResource('resourceParam7017')+'！',//请选择要查询的节点
//								buttons : Ext.Msg.OK
//							})
//							return false;
//						}
//						function callback(win,myFormValues){
//							if(Ext.get('searchTaskResultGridPanel') == undefined){
//								dataCenterData.taskDataSearchGrid = queryRelationDataResult.init();
//								var p = new Ext.Panel({
//									title : ''+getResource('resourceParam7018')+'',//查询结果
//									id : 'searchTaskResultGridPanel',
//									items : dataCenterData.taskDataSearchGrid,
//									closable : true,
//									listeners : {
//										'activate' : function(panel){
//											dataCenterData.taskDataSearchGrid.setHeight(panel.getHeight());
//											dataCenterData.taskDataSearchGrid.setWidth(panel.getWidth());
//										},
//										'bodyresize' : function(panel){
//											dataCenterData.taskDataSearchGrid.setHeight(panel.getHeight());
//											dataCenterData.taskDataSearchGrid.setWidth(panel.getWidth());
//										}
//									}
//								})
//								taskDataTabpanel.add(p);
//								dataCenterData.taskDataSearchGrid.getSelectionModel().on('selectionchange',function(smodel) {
//									dataCenterData.selectedRows = smodel.getSelected();
//								})
//							}
//							var index = taskDataTabpanel.items.length;
//							taskDataTabpanel.setActiveTab(index-1);
//							taskDataTabpanel.doLayout();
//							win.close();
//							var dcategoryinstanceid;
//							var datacenterid;
//							var selectedNode = taskTreePanel.selectedNode;
//							var projectId = selectedNode.attributes.projectId;
//							if(projectId.indexOf("p")==0){
//								dcategoryinstanceid = "project_"+selectedNode.id;
//								datacenterid = 'project_'+selectedNode.id;
//							}else{
//								dcategoryinstanceid = "task_"+selectedNode.id;
//								datacenterid = 'project_'+projectId;
//							}
//							var filterInsid = (isproject?'project_':"task_")+datatagid.split("_")[1];
//							queryRelationDataResult.setParameters({"searchDataEntityType":myFormValues.dataEntityType});
//							queryRelationDataResult.setParameters({"dcategoryinstanceid":dcategoryinstanceid});
//							dataCenterData.taskDataSearchGrid.getStore().on('beforeload', function(store, options) {
//								this.proxy = new Ext.data.HttpProxy({
//									method : 'POST',
//									url : '../JSON/dataEntity_DataEntityRemote.queryInstanceIsWithData'
//								})
//								options.params = Ext.apply(options.params, {
//									 dataCenterID : datacenterid,
//									 dcategoryinstanceid : dcategoryinstanceid,
//									 filterInsId : filterInsid,
//									 parent : '0'
//								});
//								options.params = Ext.apply(options.params,myFormValues)
//							});
//							dataCenterData.taskDataSearchGrid.getStore().load();
//						}
//						
//						var searchWin = queryRelationDataWin.init(callback);
//						searchWin.show();
//					}
				}],
		items : [new Ext.Panel({
							region : 'west',
							width : 200,
							border : false,
							items : [taskTreePanel]
						}), new Ext.Panel({
					region : 'center',
					border : false,
					layout : 'fit',
					items : taskDataTabpanel
				})],
		listeners : {
			'activate' : function(panel) {
				if (instanceTree.selectedNode != undefined) {
					instanceTree.getSelectionModel()
							.select(instanceTree.selectedNode)
					instanceTree.fireEvent('click', instanceTree.selectedNode);
				}
			},
			'deactivate' : function(){
				if(Ext.getCmp('searchTaskResultGridPanel') != undefined){
					taskDataTabpanel.remove(Ext.getCmp('searchTaskResultGridPanel'));
				}
			}
		}
	});

	var mainTab = new Ext.TabPanel({
				border : false,
				defaults : {
					autoScroll : true
				},
				enableTabScroll : true,
				items : [taskDataPanel, dataCenterMainPanel]
			});
	var locationWin = new Ext.Window({
				title : ''+getResource('resourceParam474')+'',
				width : 696,
				height : 425,
				layout : 'fit',
				// resizable : false,
				modal : true,
				items : [mainTab],
				buttons : [{
					text : ''+getResource('resourceParam479')+'',
					handler : function(button) {
						button.disable();
						if (dataCenterData.selectedRows == undefined) {
							Ext.Msg.show({
										title : ''+getResource('resourceParam575')+'',
										msg : ''+getResource('resourceParam459')+'映射的源'+getResource('resourceParam474')+'！',
										buttons : Ext.Msg.OK,
										animEl : 'elId',
										icon : Ext.MessageBox.ERROR
									});
							button.enable();
						} else {
							callback(locationWin, dataCenterData.selectedRows,
									dataCenterData.parentType,
									dataCenterData.nodeRelationType)
							button.enable();
						}
					}
				}, {
					text : ''+getResource('resourceParam7007')+'',//取消
					handler : function() {
						locationWin.close();
					}
				}]
			});
	locationWin.show();
	if (isproject) {
		mainTab.remove(taskDataPanel);
	}
	mainTab.setActiveTab(0);
	mainTab.doLayout();

}
dataCenterData.initTab = function(nodeid) {
	var attributeTab = new Ext.TabPanel({
		activeItem : 0,
		border : false,
		defaults : {
			autoScroll : true
		},
		enableTabScroll : true

			// ,
			// plugins : new Ext.ux.TabCloseMenu()

		});
	Seam.Component.getInstance("datacenter_DataCenterRemote")
			.getAllChildCateByFath(nodeid, function(result) {
				var obj = Ext.util.JSON.decode(result)
				if (obj.length > 0) {
					// dataCenterData.attributeTab.items.each(function(item) {
					// if (item.closable) {
					// dataCenterData.attributeTab.remove(item);
					// }
					// });
				}
				for (var i = 0; i < obj.length; i++) {

					var dataObjectTab = dataCenterDataTab.init(
							obj[i]['categoryInstanceName'],
							obj[i]['categoryInstanceID'], i,
							obj[i]['dataCenterID'], '-1');
					if (i == 0) {
						attributeTab.add(dataObjectTab).show();
					} else {
						attributeTab.add(dataObjectTab)
					}
					attributeTab.doLayout();
				}
			});

	return attributeTab;
}
