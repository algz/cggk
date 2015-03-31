var indexpanel = {
	collaborativeProjectArea : null,
	engineeringDataCenterArea : null,
	baseDatabaseArea : null,
	programDatabaseArea : null,
	documentDatabaseArea : null,
	templateDatabaseArea : null,
	doDistrictArea : null,
	logArea : null,
	messageArea : null,
	calendarArea : null,
	newsArea : null,
	bulletinArea : null,
	conferenceArea : null,
	dataReportArea : null,
	approvalArea : null,
	taskid : null,
	taskname : null,
	projectid : null,
	approvalAreaStore : null,
	issueDialog : null
}
Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';

// tab页形式需要添加一个参数，title
indexpanel.onIndex = function(name) {
	// alert("../base/center.jsp?"+name);
	switch (name) {
		case 'news' :
			Ext.getCmp('newsGrid').getStore().load({
						params : {
							start : 0,
							limit : 25
						}
					});
			sampleMain.mainPanel.layout.setActiveItem(1);
			break;
		case 'bulletin' :
			Ext.getCmp('bulletinGrid').getStore().load({
						params : {
							start : 0,
							limit : 25
						}
					});
			sampleMain.mainPanel.layout.setActiveItem(2);
			break;
		case 'conference' :
			Ext.getCmp('conferenceGrid').getStore().load({
						params : {
							start : 0,
							limit : 25
						}
					});
			sampleMain.mainPanel.layout.setActiveItem(3);
			break;
		default :
			/**
			 * 上边为tab页形式，下边为跳转形式
			 * update by CaoRT at 2011-5-31 将主页面框架修改为tab页形式，修改点击portal页面元素跳转至业务功能页面的方法
			 * window.parent.cenpanel.setUrl(name, title);
			 */
			window.location = "../base/center.jsp?" + name;
			break;
	}

}

indexpanel.strdiv = function(name, inname) {
	var str = '<div><span style="float:left;">' + name
			+ '</span><span style="float:right;">'
			+ ' <a style="cursor: hand" onclick=indexpanel.onIndex("' + inname
			+ '");>' + getResource('resourceParam472') + '>></a>'
			+ '</span><div>';
	return str;
}

/** 将tab页形式代码注掉，暂时还原原有方式
indexpanel.strdiv = function(name, inname) {
	var str = '<div><span style="float:left;">' + name
			+ '</span><span style="float:right;">'
			+ ' <a onclick="indexpanel.onIndex(\'' + inname
			+ '\', \'' + name + '\')";>' + getResource('resourceParam472') + '>></a>'
			+ '</span><div>';
	return str;
}
*/

indexpanel.collaborativeProjectArea = function() {
	var leftNavigationTree = {
		treePanel : null,
		nodeId : '0',
		pageSize : 25,
		rootName : 'Root',
		rootIconCls : 'icon-project'
	};
	var transferFlag = "coop";
	Ext.tree.TreeLoader.override({
				requestData : function(node, callback, scope) {
					if (this.fireEvent("beforeload", this, node, callback) !== false) {
						if (this.directFn) {
							var args = this.getParams(node);
							args.push(this.processDirectResponse
									.createDelegate(this, [{
														callback : callback,
														node : node,
														scope : scope
													}], true));
							this.directFn.apply(window, args);
						} else {
							this.transId = Ext.Ajax.request({
										method : this.requestMethod,
										url : this.dataUrl || this.url,
										success : this.handleResponse,
										failure : this.handleFailure,
										timeout : this.timeout || 300000,
										scope : this,
										argument : {
											callback : callback,
											node : node,
											scope : scope
										},
										params : this.getParams(node)
									});
						}
					} else {
						this.runCallback(callback, scope || node, []);
					}
				}
			});
	var rootNode = new Ext.tree.AsyncTreeNode({
				id : '0',
				text : '' + getResource('resourceParam724') + '',
				iconCls : leftNavigationTree.rootIconCls,
				allowDrag : false
			});
	var treeLoader = new Ext.ux.tree.PagingTreeLoader({
				dataUrl : '../JSON/project_ProjectRemote.getProjectTreeById',
				pageSize : leftNavigationTree.pageSize,
				enableTextPaging : true,
				uiProviders : {
					"col" : Ext.tree.TreeNodeUI
				},
				baseParams : {
					contentId : 0
				},
				pagingModel : 'remote'
			})
	var treePanel = new Ext.tree.TreePanel({
				id : 'leftNavigationTree',
				height : 263,
				lines : true,
				split : true,
				animate : true,
				rootVisible : true,
				border : false,
				enableDD : false,
				root : rootNode,
				plugins : new Ext.ux.tree.TreeNodeMouseoverPlugin(),
				loader : treeLoader,
				autoScroll : true
			});
	leftNavigationTree.mask = new Ext.LoadMask(document.body, {
				msg : "" + getResource('resourceParam990') + ""
			});
	treeLoader.on('load', function(treeLoader, node) {
				leftNavigationTree.mask.hide();
			});
			
	treePanel.on('click', function(node) {
		indexpanel.onIndex("xietong");
	});
	/** tab页形式调用方式
	treePanel.on('click', function(node) {
		indexpanel.onIndex("xietong", getResource('resourceParam724'));
	});
	*/
	treeLoader.on('beforeload', function(treeLoader, node) {
		leftNavigationTree.mask.show();
		if (node.id == 0
				&& (!node.attributes.childProjectId || node.attributes.childProjectId == '0')) {// root节点展开
			treeLoader.dataUrl = '../JSON/project_ProjectRemote.getProjectTreeById';
			treeLoader.baseParams.contentId = 0;
			treeLoader.baseParams.tpye = '1';
		} else if (node.id.indexOf('c') == 0) {// 项目夹展开
			var contentId = node.id.substring(1);
			treeLoader.dataUrl = "../JSON/project_ProjectRemote.getProjectTreeById";
			treeLoader.baseParams.contentId = contentId;
			treeLoader.baseParams.tpye = '1';
		} else if (node.id.indexOf("p") == 0 || node.id.indexOf("vp") == 0) {// 项目展开
			var projectId = base.convertNodeId(node.id).substring(1);
			treeLoader.dataUrl = "../JSON/task_TaskRemote.findSubTasks";
			treeLoader.baseParams.projectId = projectId;
		} else if ('io' == node.id.split("_")[0]) {// 展开项目数据
			if (node.attributes.dataObjectId == "") {
				treeLoader.dataUrl = '../JSON/webremote_DataObjectRemote.getChildDataObjectEntityForDataCenter';
				treeLoader.baseParams.dataObjectType = node.attributes.dataObjectRealType;
				treeLoader.baseParams.customTypeItemID = node.attributes.customTypeItemID;
				treeLoader.baseParams.dataCenterId = node.attributes.dataCenterId;
				treeLoader.baseParams.value = node.attributes.value;
				treeLoader.baseParams.parentDataObjectId = node.attributes.parentDataObjectId;
				treeLoader.baseParams.dataObjectId = node.attributes.dataObjectId;
				treeLoader.baseParams.isAdded = node.attributes.added;
				treeLoader.baseParams.isRef = node.attributes.isRef;
				treeLoader.baseParams.dimension = node.attributes.dimension;
				treeLoader.baseParams.orderNumber = node.attributes.orderNumber;
				treeLoader.baseParams.dataObjectName = node.attributes.dataObjectName;
				treeLoader.baseParams.customTypeParentID = node.attributes.customTypeParentID;
			} else {
				treeLoader.dataUrl = '../JSON/webremote_DataObjectRemote.getChildDataObjectForDataCenter';
				treeLoader.baseParams.id = node.attributes.dataObjectId
			}
		} else {// 任务展开
			if (transferFlag == 'coop') {
				treeLoader.dataUrl = "../JSON/task_TaskRemote.findSubTasks";
				treeLoader.baseParams.projectId = node.attributes.projectId;
				if (node.attributes.relationType == 2) {
					treeLoader.baseParams.projectId = node.attributes.childProjectId;
				}
				treeLoader.baseParams.id = node.id;
			}
		}
	});
	function beforeAppend(tree, pnode, node) {
		node.leaf = false;
	}
	if (transferFlag == "coop") {
		treePanel.on("beforeappend", beforeAppend);
		treePanel.on("nodedragover", function(e) {
				});
		treePanel.on("beforenodedrop", function(e) {
			if (e.point == "append" && e.dropNode.parentNode != e.target) {
				Ext.Ajax.request({
					url : "../JSON/project_ProjectRemote.dropContent",
					method : 'POST',
					success : function(response, options) {
						var obj = Ext.util.JSON.decode(response.responseText);
						if (obj.success == true) {
						} else {
							var dropNode = e.dropNode;
							var targetNode = e.target;
							var parentNode = dropNode.parentNode;
							if (parentNode.contains(targetNode)) {
								leftNavigationTree.nodeId = parentNode.id;
							} else if (targetNode.contains(parentNode)) {
								leftNavigationTree.nodeId = targetNode.id;
							} else {
								leftNavigationTree.nodeId = 0;
							}
							// var dropNode = e.dropNode;
							// var targetNode = e.target;
							// var newNode = new Ext.tree.TreeNode({
							// id : dropNode.id,
							// text : dropNode.text,
							// allowDrop : true,
							// iconCls : dropNode.attributes.iconCls,
							// expandable : !dropNode.leaf,
							// leaf : dropNode.leaf
							// });
							//
							// var parentNode = dropNode.parentNode;
							// var nextNode = dropNode.nextSibling;
							// // target.removeChild(dropNode);
							// // parentNode.removeChild(dropNode);
							// dropNode.remove();
							// if (nextNode != null) {
							// parentNode.insertBefore(newNode,
							// nextNode);
							// } else {
							// // alert(newNode.parentNode);
							// parentNode.appendChild(newNode);
							// // alert(newNode.parentNode);
							// newNode.parentNode=parentNode;
							// }
							Ext.MessageBox.show({
										title : ''
												+ getResource('resourceParam575')
												+ '',
										msg : obj.message,
										minWidth : 100,
										icon : Ext.MessageBox.ERROR,
										buttons : Ext.MessageBox.OK
									});
						}
					},
					failure : function(response, options) {

					},
					params : {
						dropId : e.dropNode.id.substring(1),
						targetId : e.target.id == 0 ? 0 : e.target.id
								.substring(1),
						dropType : e.dropNode.id.indexOf("p") == 0 ? "0" : "1"
					}
				});

				// Ext.Ajax.on('requestcomplete',function( conn, response,
				// options){
				// alert(123);
				// })
			} else {
				return false;
			}
		})
	}
	// var rootNode = new Ext.tree.AsyncTreeNode({
	// id : '0',
	// text : ''+getResource('resourceParam724')+'',
	// iconCls : 'icon-project'
	// });
	// var treeLoader = new Ext.tree.TreeLoader({
	// dataUrl : '../JSON/project_ProjectRemote.getProjectTreeById',
	// uiProviders : {
	// "col" : Ext.tree.TreeNodeUI
	// },
	// baseParams : {
	// contentId : 0
	// }
	// })
	// var treePanel = new Ext.tree.TreePanel({
	// height : 263,
	// lines : true,
	// split : true,
	// animate : true,
	// rootVisible : true,
	// border : false,
	// root : rootNode,
	// loader : treeLoader,
	// autoScroll : true
	// });
	// treeLoader.on('beforeload', function(treeLoader, node) {
	// if (node.id == 0) {// root节点展开
	// treeLoader.dataUrl = '../JSON/project_ProjectRemote.getProjectTreeById';
	// treeLoader.baseParams.contentId = 0;
	// } else if (node.id.indexOf('c') == 0) {// 项目夹展开
	// var contentId = node.id.substring(1);
	// treeLoader.dataUrl = "../JSON/project_ProjectRemote.getProjectTreeById";
	// treeLoader.baseParams.contentId = contentId;
	// } else if (node.id.indexOf("p") == 0) {// 项目展开
	// var projectId = node.id.substring(1);
	// treeLoader.dataUrl = "../JSON/project_ProjectRemote.getTaskTreeById";
	// treeLoader.baseParams.projectId = projectId;
	// } else if ('io' == node.id.split("_")[0]) {// 展开项目数据
	// if (node.attributes.dataObjectId == "") {
	// treeLoader.dataUrl =
	// '../JSON/webremote_DataObjectRemote.getChildDataObjectEntityForDataCenter';
	// treeLoader.baseParams.dataObjectType =
	// node.attributes.dataObjectRealType;
	// treeLoader.baseParams.customTypeItemID =
	// node.attributes.customTypeItemID;
	// treeLoader.baseParams.dataCenterId = node.attributes.dataCenterId;
	// treeLoader.baseParams.value = node.attributes.value;
	// treeLoader.baseParams.parentDataObjectId =
	// node.attributes.parentDataObjectId;
	// treeLoader.baseParams.dataObjectId = node.attributes.dataObjectId;
	// treeLoader.baseParams.isAdded = node.attributes.added;
	// treeLoader.baseParams.isRef = node.attributes.isRef;
	// treeLoader.baseParams.dimension = node.attributes.dimension;
	// treeLoader.baseParams.orderNumber = node.attributes.orderNumber;
	// treeLoader.baseParams.dataObjectName = node.attributes.dataObjectName;
	// treeLoader.baseParams.customTypeParentID =
	// node.attributes.customTypeParentID;
	// } else {
	// treeLoader.dataUrl =
	// '../JSON/webremote_DataObjectRemote.getChildDataObjectForDataCenter';
	// treeLoader.baseParams.id = node.attributes.dataObjectId
	// }
	// } else {// 任务展开
	// treeLoader.dataUrl =
	// '../JSON/webremote_DataObjectRemote.getDataCenterTaskTree';
	// treeLoader.baseParams.id = node.id;
	// }
	// treeLoader.baseParams.transferFlag = "coop";
	// });

	return new Ext.Panel({
				id : 'collaborativeProjectArea',
				draggable : true,
				collapsible : true,
				layout : 'fit',
				title : indexpanel.strdiv("" + getResource('resourceParam724')
								+ "", "xietong"),
				items : [treePanel]
			});
}

indexpanel.engineeringDataCenterArea = function() {

	var root = new Ext.tree.TreeNode({
				// id : 'root',
				text : '' + getResource('resourceParam561') + '',
				icon : 'icons/p2m/dataCenter.png'
			});

	var treeloader = new Ext.tree.TreeLoader({
				url : '../JSON/datacenter_DataCenterRemote.getDataCenterTree'
			})

	var datacentertree = new Ext.tree.TreePanel({
				// renderTo : 'defaultDataCenter',
				// id : 'datacentertree',
				root : {
					icon : 'icons/p2m/dataCenter.png',
					id : 'root',
					nodeType : 'async',
					text : '' + getResource('resourceParam561') + ''
				},
				border : true,
				rootVisible : true,
				loader : treeloader
			});
	datacentertree.getRootNode().expand(true);
	datacentertree.on("click", function(node) {

				var temp = {

				};

				if (node.attributes.type == 4) {
					temp.name = "dataCenterWareHouse";
					temp.text = node.attributes.realName;
					temp.id = node.id
					window.parent.clickNode(node.id);
				} else if (node.attributes.type == 40) {
					temp.name = "table";
					temp.text = node.attributes.realName;
					temp.id = node.id
					window.parent.clickNode(node.id);
				}
				if ("root" == node.id) {
					// EDMDataCenterTree.datacentertree.getRootNode().reload();
					// EDMDataCenterTree.datacentertree.getRootNode().expand(true);

					temp.name = 'defaultDataCenter';
					temp.text = '' + getResource('resourceParam561') + '';
					window.parent.menu_click(temp);
				} else {

					temp.name = "datainstance";
					temp.text = node.attributes.realName;
					temp.id = node.id
					window.parent.clickNode(node.id);
				}

			});
	return datacentertree;

}
indexpanel.baseDatabaseArea = function() {
	return new Ext.Panel({
				id : 'baseDatabaseArea',
				draggable : true,
				layout : 'fit',
				collapsible : true,
				title : '' + getResource('resourceParam717') + ''
			});
}
indexpanel.programDatabaseArea = function() {
	return new Ext.Panel({
				id : 'programDatabaseArea',
				layout : 'fit',
				draggable : true,
				collapsible : true,
				title : '' + getResource('resourceParam718') + ''
			});
}
indexpanel.documentDatabaseArea = function() {
	return new Ext.Panel({
				id : 'documentDatabaseArea',
				draggable : true,
				layout : 'fit',
				collapsible : true,
				title : '' + getResource('resourceParam719') + ''
			});
}

indexpanel.templateDatabaseArea = function() {
	return new Ext.Panel({
				id : 'templateDatabaseArea',
				layout : 'fit',
				draggable : true,
				collapsible : true,
				title : '' + getResource('resourceParam720') + ''
			});
}

indexpanel.doDistrictArea = function() {
	indexpanel.grid = SampleGrid.getgrid();
	myGrid.loadvalue(indexpanel.grid.store, {
				start : 0,
				limit : 10
			}, {
				fanwei : 'man',
				role : 'fuze'
			});
	var panel = new Ext.Panel({
				id : 'doDistrictArea',
				// draggable : {
				// endDrag : function(e) {
				// indexpanel.grid.doLayout();
				// }
				// },
				layout : 'fit',
				draggable : true,
				collapsible : true,
				height : '100%',
				autoScroll : true,
				autoWidth : true,
				title : indexpanel.strdiv("" + getResource('resourceParam9790')
								+ "", "mytask")
			});
	panel.on("beforerender", function(e) {
				panel.add(indexpanel.grid);
			});
	return panel;
}
indexpanel.taskDetaile = function(taskname, taskid, projectid) {
    
    Ext.Ajax.request({                 
                                        method : "GET",
                                        url : "../JSON/mytask_MyTaskRemote.getMyTaskVo",
                                        success : function(obj){
                                          var o=Ext.util.JSON.decode(obj.responseText);
                                            window.parent.getMenu.title_record = {data:o};
											window.parent.getMenu.jump_type = "mytaskdetail";
											indexpanel.onIndex("mytask");
                                        },
                                        failure : function(obj){
                                        },
                                        timeout : this.timeout || 300000,
                                        scope : this,
                                        params : {taskid:taskid}
                                    });
    

	// tab页形式调用方式
	// indexpanel.onIndex("mytask", getResource('resourceParam9790'));
}

indexpanel.goSubmitApprove = function(id) {
	var re = indexpanel.approvalAreaStore.store.getById(id);
	window.parent.getMenu.title_record = re;
	indexpanel.onIndex("myapproval");
	// tab页形式调用方式
	// indexpanel.onIndex("myapproval", getResource('resourceParam9791'));
}

indexpanel.approvalArea = function(position) {
	var hiddenFlag = false;
	if (position.substring(0, 1) == '1' || position.substring(0, 1) == '3') {
		hiddenFlag = true;
	}
	var myApproveGrid = {};
	var strurl = '../JSON/approval_ApprovalRemote.getApprovalListByUserId?approveStatus=-1&objectType=-2&approvalType=StepByStep';

	myApproveGrid.proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'GET'
			});
	myApproveGrid.reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : "ID"
			}, ["approveStatus", "approveNote", "ID", "approveStartTime",
					"approveVeiw", "approveTime", "approvePressName",
					"objectType", "approveStepName", "examinertype",
					"flowinstanceID", "activityInstanceID", "examiner",
					"objectId"]);

	var ds = new Ext.data.Store({
				proxy : myApproveGrid.proxy,
				reader : myApproveGrid.reader
			});
	myApproveGrid.cm = new Ext.grid.ColumnModel({
		defaults : {
			sortable : false,
			menuDisabled : true
		},
		columns : [{
			header : "" + getResource('resourceParam726') + "",
			dataIndex : 'approveStepName',
			width : 100,
			renderer : function(value, cellmeta, record, rowIndex, columnIndex,
					store) {
				return '<a href="javascript:indexpanel.goSubmitApprove('
						+ '\''
						+ record.data.ID
						+ '\''
						+ ')" style="text-decoration:underline;color:blue;"><span title='
						+ value + '>' + Ext.util.Format.ellipsis(value, 20)
						+ '</span></a>';
			}
		}, {
			header : "" + getResource('resourceParam722') + "",
			width : 100,
			dataIndex : 'approvePressName',
			renderer : function(value, cellmeta, record, rowIndex, columnIndex,
					store) {
				return '<span title=' + value + '>'
						+ Ext.util.Format.ellipsis(value, 20) + '</span>';
			}
		}, {
			header : "" + getResource('resourceParam728') + "",
			width : 50,
			hidden : hiddenFlag,
			dataIndex : 'objectType',
			renderer : function(value, cellmeta, record, rowIndex, columnIndex,
					store) {
				if ("TaskDataType" == value) {
					return "" + getResource('resourceParam733') + "";
				} else if ("ProjectDataType" == value) {
					return "" + getResource('resourceParam463') + "";
				} else {
					return "" + getResource('resourceParam469') + "";
				}
			}
		}, {
			header : "" + getResource('resourceParam716') + "",
			id : "approveuser",
			width : 50,
			dataIndex : 'examinertype',
			hidden : hiddenFlag,
			renderer : function(value, cellmeta, record, rowIndex, columnIndex,
					store) {
				if ("1" == value) {
					return "" + getResource('resourceParam731') + "";
				} else {
					return "" + getResource('resourceParam732') + "";
				}
			}
		}, {
			header : "" + getResource('resourceParam723') + "",
			width : 80,
			hidden : hiddenFlag,
			dataIndex : 'approveStartTime'
		}, {
			header : "" + getResource('resourceParam727') + "",
			width : 100,
			hidden : hiddenFlag,
			dataIndex : 'approveVeiw',
			renderer : function(value, cellmeta, record, rowIndex, columnIndex,
					store) {
				return '<span title='
						+ value.replace(/\n/ig, "").replace(/\r/ig, "") + '>'
						+ Ext.util.Format.ellipsis(value, 20) + '</span>';
			}
		}]
	});
	myApproveGrid.sm = new Ext.grid.CheckboxSelectionModel();
	var grid = myGrid.gridPageSize(ds, myApproveGrid.cm, null,
			myApproveGrid.sm, null, 10);
	grid.height = 250;
	ds.load();
	var panel = new Ext.Panel({
				id : 'approvalArea',
				draggable : {
					endDrag : function(e) {
						panel.findParentBy(function(panel) {
									if (panel.id == 'portal1') {
										myApproveGrid.cm.setHidden(3, true);
										myApproveGrid.cm.setHidden(4, true);
										myApproveGrid.cm.setHidden(5, true);
										myApproveGrid.cm.setHidden(2, true);
									} else if (panel.id == "portal2") {
										myApproveGrid.cm.setHidden(3, false);
										myApproveGrid.cm.setHidden(4, false);
										myApproveGrid.cm.setHidden(5, false);
										myApproveGrid.cm.setHidden(2, false);
									}
								})

					}
				},
				collapsible : true,
				autoScroll : true,
				layout : 'fit',
				height : '100%',
				title : indexpanel.strdiv("" + getResource('resourceParam9791')
								+ "", "myapproval")
			});
	indexpanel.approvalAreaStore = grid;
	panel.on("beforerender", function(e) {
				panel.add(indexpanel.approvalAreaStore);
			});
	return panel;
}

indexpanel.logArea = function() {
	var panel = new Ext.Panel({
		id : 'logArea',
		layout : 'fit',
		draggable : true,
		collapsible : true,
		title : indexpanel.strdiv("" + getResource('resourceParam627') + "",
				"mylog"),
		html : '<DIV id="logAreadiv" STYLE="padding:10px 0 10px 10px;background-color:#DFE8F6;"></DIV>'
	});
	panel.on("beforerender", function(e) {
		var htmlstr = "";

		Seam.Component.getInstance("myLog_LogInfoRemote").getIndexLog(
				function(result) {
					htmlstr = '';
					var json = eval('(' + result + ')');
					for (var i = 0; i < json.results; i++) {
						htmlstr += '<a href="../oneInfo.seam?messageid='
								+ json.rows[i]['messageid']
								+ '"><image style="width:17px;height:16px"  src="../images/tu22.png"></a>&nbsp;'
								+ json.rows[i]['messagedate']
								+ '&nbsp;&nbsp;<a href="../oneInfo.seam?messageid='
								+ json.rows[i]['messageid'] + '">'
								+ json.rows[i]['messagetitle'] + '</a><BR><BR>';
					}
					htmlstr += "</DIV>";
					// alert(htmlstr);
					Ext.get("logAreadiv").dom.innerHTML = htmlstr;
				});
	});
	return panel;

}

indexpanel.messageArea = function() {
	var panel = new Ext.Panel({
		id : 'messageArea',
		draggable : true,
		collapsible : true,
		layout : 'fit',
		title : indexpanel.strdiv("" + getResource('resourceParam725') + "",
				"mymessage"),
		html : '<DIV id="messageAreadiv" STYLE="padding:10px 0 10px 10px;background-color:#DFE8F6;"></DIV>'
	});
	panel.on("beforerender", function(e) {
		var htmlstr = "";
		var appVo = Seam.Remoting
				.createType("com.luck.itumserv.message.messagereceive.MessageInBoxNewsVo");
		Seam.Component.getInstance("messagereceive_MessageReceiveRemote")
				.myNewsInboxlist(appVo, function(reslut) {
					htmlstr = '';
					Ext.each(reslut, function(o, index) {
						var redstr = '&nbsp;';
						if (index % 2 != 0) {
							redstr = indexpanel.messageUrl1(o.messagetype,
									o.unreadcount, o.allcount);
						}
						var s = indexpanel.messageUrl(o.messagetype,
								o.messageid);
						htmlstr += '<div style="float:left;width:65%;background-color:#DFE8F6;"><a href="'
								+ s
								+ '"><image src="../base/icons/p2m/myMessage-16.png">&nbsp;'
								+ o.messagedate
								+ '&nbsp;&nbsp;'
								+ Ext.util.Format.ellipsis(o.messagetitle, 10,
										true)
								+ '</a></div>'
								+ '<div align="right" style="float:right;width:35%;background-color:#DFE8F6;color:blue;">'
								+ redstr + '&nbsp;</div><br><br>';
					});
					Ext.get("messageAreadiv").dom.innerHTML = htmlstr;
				});
	});
	return panel;
}
indexpanel.messageUrl = function(type, id) {
	var url = '../jsp/mymessage/{0}.seam?messageid={1}';
	var m = '';
	if (type == "2") {
		m = String.format(url, 'feedbackdetails', id);
	} else if (type == "3") {
		m = String.format(url, 'thatremindsdetails', id);
	} else if (type == "4") {
		m = String.format(url, 'adjusttaskdetails', id);
	} else if (type == "5") {
		m = '../jsp/mymessage/mynews.jsp?tapid=0';
	}
	return m;
}

indexpanel.messageUrl1 = function(type, c, p) {
	var url = '(<a style="color:blue;" href="../jsp/mymessage/{0}">未读{1}</a>/<a style="color:blue;" href="../jsp/mymessage/{2}">全部{3}</a>)';
	var m = '';
	if (type == "2") {
		m = getResource('resourceParam607')
				+ String.format(url, 'feedback.seam?status=2', c,
						'feedback.seam?status=1', p);
	} else if (type == "3") {
		m = getResource('resourceParam790')
				+ String.format(url, 'thatreminds.seam?status=2', c,
						'thatreminds.seam?status=1', p);
	} else if (type == "4") {
		m = getResource('resourceParam501')
				+ String.format(url, 'adjusttask.seam?status=2', c,
						'adjusttask.seam?status=1', p);
	} else if (type == "5") {
		m = getResource('resourceParam9145')
				+ String.format(url, 'mynews.jsp?tapid=0', c,
						'mynews.jsp?tapid=0', p);
	}
	return m;
}
indexpanel.calendarArea = function() {
	var panel = new Ext.Panel({
		id : 'calendarArea',
		draggable : true,
		layout : 'fit',
		collapsible : true,
		title : indexpanel.strdiv("" + getResource('resourceParam729') + "",
				"mydate"),
		html : '<DIV id="dateAreadiv" STYLE="padding:10px 0 10px 10px;background-color:#DFE8F6;"></DIV>'
	});
	panel.on("beforerender", function(e) {
		var htmlstr = "";

		Seam.Component.getInstance("mydate_MyDateRemote").getIndexDate(
				function(result) {
					htmlstr = '';
					var json = eval('(' + result + ')');
					for (var i = 0; i < json.results; i++) {
						htmlstr += '<a href="#"><image style="width:17px;height:16px" src="../images/tu22.png"></a>&nbsp;<a href="../base/center.jsp?mydate">'
								+ json.rows[i]['startdate']
								+ '&nbsp;&nbsp;'
								+ json.rows[i]['taskname'] + '</a><BR><BR>';
					}
					htmlstr += "</DIV>";
					Ext.get("dateAreadiv").dom.innerHTML = htmlstr;
				});
	});
	return panel;
}

indexpanel.newsArea = function() {
	var panel = new Ext.Panel({
		id : 'newsArea',
		draggable : true,
		layout : 'fit',
		collapsible : true,
		title : indexpanel.strdiv("" + getResource('resourceParam735') + "",
				"news"),
		html : '<DIV id="newsAreadiv" STYLE="padding:10px 0 10px 10px;background-color:#DFE8F6;"></DIV>'
	});
	panel.on("beforerender", function(e) {
		var htmlstr = "";
		var appVo = Seam.Remoting.createType("com.luck.itumserv.news.NewsVo");
		appVo.setStart(0);
		appVo.setLimit(3);
		Seam.Component.getInstance("news_newssvr").getNewsDateString(appVo,
				function(reslut) {
					Ext.each(reslut, function(o, index) {

						htmlstr += '<a href="#"'
								+ 'onclick="indexpanel.newsinit(\''
								+ o.newsid
								+ '\')">'
								+ '<image src="../base/icons/p2m/newsManagement-16.png">&nbsp;'
								+ o.pbudatestr + '&nbsp;&nbsp;' + o.title
								+ '</a><BR><BR>';
					});
					Ext.get("newsAreadiv").dom.innerHTML = htmlstr;
				});
	});
	return panel;

}

indexpanel.bulletinArea = function() {
	var panel = new Ext.Panel({
		id : 'bulletinArea',
		draggable : true,
		layout : 'fit',
		collapsible : true,
		title : indexpanel.strdiv("" + getResource('resourceParam734') + "",
				"bulletin"),
		html : '<DIV id="bulletinAreadiv" STYLE="padding:10px 0 10px 10px;background-color:#DFE8F6;"></DIV>'
	});
	panel.on("beforerender", function(e) {
		var htmlstr = "";
		var appVo = Seam.Remoting
				.createType("com.luck.itumserv.bulletin.NoticesVo");
		appVo.setStart(0);
		appVo.setLimit(3);
		Seam.Component.getInstance("notices_noticesserver").getNoticesVoArea(
				appVo, function(reslut) {
					Ext.each(reslut, function(o, index) {
						htmlstr += '<a href="#" onclick="indexpanel.bulletininit(\''
								+ o.id
								+ '\')"'
								+ '"><image src="../base/icons/p2m/bulletinManagement-16.png">&nbsp;'
								+ o.pbudatestr
								+ '&nbsp;&nbsp;'
								+ o.title
								+ '</a><BR><BR>';
					});
					Ext.get("bulletinAreadiv").dom.innerHTML = htmlstr;
				});
	});
	return panel;
}

indexpanel.conferenceArea = function() {
	var panel = new Ext.Panel({
		id : 'conferenceArea',
		draggable : true,
		layout : 'fit',
		collapsible : true,
		title : indexpanel.strdiv("" + getResource('resourceParam736') + "",
				"conference"),
		html : '<DIV id="conferenceAreadiv" STYLE="padding:10px 0 10px 10px;background-color:#DFE8F6;"></DIV>'
	});
	panel.on("beforerender", function(e) {
		var htmlstr = "";
		var appVo = Seam.Remoting
				.createType("com.luck.itumserv.conference.MeetingsVo");
		appVo.setStart(0);
		appVo.setLimit(3);
		Seam.Component.getInstance("meetings_meetingsserver")
				.getMeetingsVoArea(appVo, function(reslut) {
					Ext.each(reslut, function(o, index) {
						var tip = '<table class=taskTip>' + '<tr><td>'
								+ getResource('resourceParam1216') + ':</td>'
								+ '<td>' + o.title + '</td></tr>' + '<tr><td>'
								+ getResource('resourceParam1230') + ':</td>'
								+ '<td>' + o.organizer + '</td></tr>'
								+ '<tr><td>' + getResource('resourceParam1217')
								+ ':</td>' + '<td>' + o.place + '</td></tr>'
								+ '<tr><td>' + getResource('resourceParam1218')
								+ ':</td><td>' + o.meetingdatestr
								+ '</td></tr>' + '<tr><td valign=top>'
								+ getResource('resourceParam1214')
								+ ':</td><td>' + indexpanel.splitStr(o.content)
								+ '</td></tr>' + '</table>';
						htmlstr += '<a href="#" onclick="indexpanel.conferenceinit(\''
								+ o.id
								+ '\')"><image src="../base/icons/p2m/meetingManagement-16.png">&nbsp;'
								+ o.pbudatestr
								+ '&nbsp;&nbsp;'
								+ o.title
								+ '</a><BR><BR>';
					});
					Ext.get("conferenceAreadiv").dom.innerHTML = htmlstr;
				});
	});
	return panel;
}
// indexpanel.conference = function(id)
// {
// window.parent.getMenu.title_id=id;
// indexpanel.onIndex("conference");
// }

indexpanel.dataReportArea = function() {
	return new Ext.Panel({
				id : 'dataReportArea',
				draggable : true,
				layout : 'fit',
				collapsible : true,
				title : '' + getResource('resourceParam730') + ''

			});
}
indexpanel.myapprove = function() {
	return new Ext.Panel({
				id : 'myapproveid',
				draggable : true,
				layout : 'fit',
				collapsible : true,
				title : +getResource('resourceParam721')
			});

}
indexpanel.splitStr = function(str) {
	var n = '';
	var strs = str.split("<br>");
	for (var i = 0; i < strs.length; i++) {
		var m = strs[i];
		var content = m.length;
		if (content > 50) {
			for (var k = 0; k < content; k++) {
				n = n + m.charAt(k);
				if (k % 50 == 0 && k != 0) {
					n += "<br>";
				}
			}
		} else {
			n += m;
		}
		n += "<br>";
	}
	return n;
}
indexpanel.allArea = function(id, position) {
	Ext.Ajax.timeout = 90000;
	switch (id) {
		case 'collaborativeProjectArea' :
			return indexpanel.collaborativeProjectArea();
			break;
		case 'engineeringDataCenterArea' :
			return indexpanel.engineeringDataCenterArea();
			break;
		case 'baseDatabaseArea' :
			return indexpanel.baseDatabaseArea();
			break;
		case 'programDatabaseArea' :
			return indexpanel.programDatabaseArea();
			break;
		case 'documentDatabaseArea' :
			return indexpanel.documentDatabaseArea();
			break;
		case 'templateDatabaseArea' :
			return indexpanel.templateDatabaseArea();
			break;
		case 'doDistrictArea' :
			return indexpanel.doDistrictArea();
			break;
		case 'logArea' :
			return indexpanel.logArea();
			break;
		case 'messageArea' :
			return indexpanel.messageArea();
			break;
		case 'calendarArea' :
			return indexpanel.calendarArea();
			break;
		case 'newsArea' :
			return indexpanel.newsArea();
			break;
		case 'bulletinArea' :
			return indexpanel.bulletinArea();
			break;
		case 'conferenceArea' :
			return indexpanel.conferenceArea();
			break;
		case 'dataReportArea' :
			return indexpanel.dataReportArea();
			break;
		case 'approvalArea' :
			return indexpanel.approvalArea(position);
		default :
			return;
	}
}

indexpanel.newsinit = function(newsid) {
	window.open(""
			+ encodeURI(encodeURI("../base/shownewsDetail.seam?ID=" + newsid))
			+ "");
	// if (!indexpanel.issueDialog) {
	// tlework.addHtml(tlework.divHtml, 'indexpanel'); // 动态生成需要绑定的div
	// indexpanel.issueDialog = new Ext.Window({ // 创建对话框
	// el : 'indexpanel',
	// title : '' + getResource('resourceParam1507') + '',
	// modal : true,
	// layout : 'fit',
	// width : 440,
	// height : 500,
	// closeAction : 'hide',
	// plain : false,
	// items : [indexpanel.newsaddform(title, Ext.util.Format
	// .htmlDecode(content), stime, ginstituteName,
	// authorname)]
	// // 将面板绑定到对话框
	// });
	// }
	// indexpanel.issueDialog.show();
	//
	// indexpanel.issueDialog.on("hide", function() {
	// indexpanel.issueDialog.close();
	// indexpanel.issueDialog.destroy();
	// indexpanel.issueDialog = null;
	// });
}

// 利用EXT.Form加载新闻数据到指定控件
indexpanel.newsaddform = function(title, content, stime, ginstituteName,
		authorname) {
	indexpanel.temp = new Ext.form.HtmlEditor({
				height : 440,
				width : 500,
				name : "content",
				fieldLabel : getResource('resourceParam1125') + "",
				readOnly : true,
				cls : 'readonly',
				disabled : true,
				id : "content",
				fontFamilies : ['宋体', '黑体', '隶书', '幼圆', 'Arial', 'Courier New',
						'Tahoma', 'Times New Roman', 'Verdana'],
				defaultFont : '宋体'
			});

	indexpanel.form = new Ext.FormPanel({
		labelWidth : 60, // label settings here cascade unless overridden
		frame : false,
		plain : false,
		bodyStyle : 'padding:5px 5px 0;background:transparent;',
		items : [{
					fieldLabel : getResource('resourceParam1499') + '', // 文本框
					xtype : 'textfield',
					name : 'title',
					readOnly : true,
					cls : 'readonly',
					value : title,
					anchor : '100%'
				}, {
					fieldLabel : '' + getResource('resourceParam1120') + '', // 发布日期
					xtype : 'textfield',
					name : 'title',
					readOnly : true,
					cls : 'readonly',
					value : stime,
					anchor : '100%'
				}, {
					xtype : 'panel',
					bodyStyle : 'padding:0px 0px 10px 0px;background:transparent;border:0',
					html : '<div><span style="float:left;font-size:12px;">'
							+ getResource('resourceParam453')
							+ ':&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
							+ authorname
							+ '</span><span style="float:left;font-size:12px;padding-left: 100px;">'
							+ getResource('resourceParam689')
							+ ':&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
							+ ginstituteName + '</span></div>'
				}, {
					title : getResource('resourceParam1498') + '',
					layout : 'fit',
					items : new Ext.Panel({
						autoScroll : true,
						frame : true,
						width : 300,
						height : 300,
						bodyStyle : 'padding:5px 5px 0 5px;background:transparent',
						html : content
					})
				}],
		buttons : [{ // 定义面板中的按钮
			text : getResource('resourceParam479') + '',
			handler : function() {
				// batcheUpdate.batcheform.form.reset(); //表单重置
				indexpanel.issueDialog.hide();
			}
		}]
	});
	return indexpanel.form;
}

indexpanel.bulletininit = function(bulletinid) {
	window.open(""
			+ encodeURI(encodeURI("../base/showBulletinDetail.seam?ID="
					+ bulletinid)) + "");
	// if (!indexpanel.issueDialog) {
	// tlework.addHtml(tlework.divHtml, 'indexpanel'); // 动态生成需要绑定的div
	// indexpanel.issueDialog = new Ext.Window({ // 创建对话框
	// el : 'indexpanel',
	// title : getResource('resourceParam1135') + '',
	// modal : true,
	// layout : 'fit',
	// width : 300,
	// height : 500,
	// closeAction : 'hide',
	// plain : false,
	// items : [indexpanel.bulletinaddform(title, Ext.util.Format
	// .htmlDecode(content), stime, ginstituteName,
	// authorname)]
	// // 将面板绑定到对话框
	// });
	// }
	// indexpanel.issueDialog.show();
	//
	// indexpanel.issueDialog.on("hide", function() {
	// indexpanel.issueDialog.close();
	// indexpanel.issueDialog.destroy();
	// indexpanel.issueDialog = null;
	//
	// });
}

indexpanel.bulletinaddform = function(title, content, stime, ginstituteName,
		authorname) {
	indexpanel.temp = new Ext.form.HtmlEditor({
				height : 300,
				width : 500,
				name : "content",
				fieldLabel : getResource('resourceParam1125') + "",
				readOnly : true,
				cls : 'readonly',
				disabled : true,
				id : "content",
				fontFamilies : ['宋体', '黑体', '隶书', '幼圆', 'Arial', 'Courier New',
						'Tahoma', 'Times New Roman', 'Verdana'],
				defaultFont : '宋体'
			});

	indexpanel.form = new Ext.FormPanel({
		labelWidth : 60, // label settings here cascade unless overridden
		frame : false,
		plain : false,
		bodyStyle : 'padding:5px 5px 0;background:transparent;',
		items : [{
					fieldLabel : getResource('resourceParam1126') + '', // 文本框
					xtype : 'textfield',
					name : 'title',
					readOnly : true,
					cls : 'readonly',
					value : title,
					anchor : '100%'
				}, {
					fieldLabel : '' + getResource('resourceParam1120') + '', // 发布日期
					xtype : 'textfield',
					name : 'title',
					readOnly : true,
					cls : 'readonly',
					value : stime,
					anchor : '100%'
				}, {
					xtype : 'panel',
					bodyStyle : 'padding:0px 0px 10px 0px;background:transparent;border:0',
					html : '<div><span style="float:left;font-size:12px;">'
							+ getResource('resourceParam453')
							+ ':&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
							+ authorname
							+ '</span><span style="float:left;font-size:12px;padding-left: 100px;">'
							+ getResource('resourceParam689')
							+ ':&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
							+ ginstituteName + '</span></div>'
				}, {
					title : getResource('resourceParam1125') + '',
					layout : 'fit',
					items : new Ext.Panel({
								autoScroll : true,
								frame : true,
								width : 300,
								height : 300,
								bodyStyle : 'padding:5px 5px 0;background:transparent',
								html : content
							})
				}],
		buttons : [{ // 定义面板中的按钮
			text : getResource('resourceParam479') + '',
			handler : function() {
				// batcheUpdate.batcheform.form.reset(); //表单重置
				indexpanel.issueDialog.hide();
			}
		}]
	});
	return indexpanel.form;
}

indexpanel.conferenceinit = function(conferenceid) {
	window.open(""
			+ encodeURI(encodeURI("../base/showMeetingsDetail.seam?ID="
					+ conferenceid)) + "");
	// if (!indexpanel.issueDialog) {
	// tlework.addHtml(tlework.divHtml, 'indexpanel'); // 动态生成需要绑定的div
	// indexpanel.issueDialog = new Ext.Window({ // 创建对话框
	// el : 'indexpanel',
	// title : '' + getResource('resourceParam1229') + '',
	// modal : true,
	// layout : 'fit',
	// width : 500,
	// height : 500,
	// closeAction : 'hide',
	// plain : false,
	// items : [indexpanel.conferenceaddform(title, pbudatestr, depname,
	// authorname, meetingdatestr, place, Ext.util.Format
	// .htmlDecode(content))]
	// // 将面板绑定到对话框
	// });
	// }
	// indexpanel.issueDialog.show();
	//
	// indexpanel.issueDialog.on("hide", function() {
	// indexpanel.issueDialog.close();
	// indexpanel.issueDialog.destroy();
	// indexpanel.issueDialog = null;
	//
	// });
}

indexpanel.conferenceaddform = function(title, pbudatestr, depname, authorname,
		meetingdatestr, place, content) {
	indexpanel.temp = new Ext.form.HtmlEditor({
				height : 450,
				width : 480,
				name : "content",
				fieldLabel : getResource('resourceParam1214') + "",
				readOnly : true,
				cls : 'readonly',
				disabled : true,
				id : "content",
				fontFamilies : ['宋体', '黑体', '隶书', '幼圆', 'Arial', 'Courier New',
						'Tahoma', 'Times New Roman', 'Verdana'],
				defaultFont : '宋体'
			});
	indexpanel.form = new Ext.FormPanel({
		labelAlign : 'left',
		plain : false,
		frame : true,
		autoScroll : false,
		region : 'north',
		labelWidth : 60,
		items : [{
			layout : 'column',
			items : [{
				columnWidth : .98,
				layout : 'form',
				items : [{
							fieldLabel : getResource('resourceParam1216') + '', // 文本框
							name : 'title',
							xtype : 'textfield',
							value : title,
							readOnly : true,
							cls : 'readonly',
							anchor : '100%'
						}, {
							fieldLabel : '' + getResource('resourceParam1120')
									+ '', // 发布日期
							xtype : 'textfield',
							name : 'title',
							readOnly : true,
							cls : 'readonly',
							value : pbudatestr,
							anchor : '100%'
						}]
			}, {
				columnWidth : .49,
				layout : 'form',
				items : [{
							fieldLabel : getResource('resourceParam1230') + '', // 文本框
							xtype : 'textfield',
							name : 'typename',
							readOnly : true,
							cls : 'readonly',
							value : depname,
							anchor : '100%'
						}]
			}, {
				columnWidth : .49,
				layout : 'form',
				items : [{

							fieldLabel : '' + getResource('resourceParam453')
									+ '', // 发布人
							xtype : 'textfield',
							name : 'title',
							readOnly : true,
							cls : 'readonly',
							value : authorname,
							anchor : '50%'

						}]
			}, {
				columnWidth : .49,
				layout : 'form',
				items : [{
							fieldLabel : getResource('resourceParam1218') + '', // 文本框
							name : 'meetingdatestr',
							xtype : 'textfield',
							cls : 'readonly',
							value : meetingdatestr,
							anchor : '100%'
						}]
			}, {
				columnWidth : .49,
				layout : 'form',
				items : [{
							fieldLabel : getResource('resourceParam1217') + '', // 文本框
							name : 'place',
							xtype : 'textfield',
							value : place,
							cls : 'readonly',
							readOnly : true,
							anchor : '100%'
						}]
			}, {
				columnWidth : .98,
				layout : 'form',
				items : [{
					title : getResource('resourceParam1214') + '',
					layout : 'fit',
					items : new Ext.Panel({
								autoScroll : true,
								frame : true,
								width : 380,
								height : 300,
								bodyStyle : 'padding:5px 5px 0;background:transparent',
								html : content
							})
				}]
			}]
		}],
		buttons : [{ // 定义面板中的按钮
			text : getResource('resourceParam479') + '',
			handler : function() {
				// batcheUpdate.batcheform.form.reset(); //表单重置
				indexpanel.issueDialog.hide();
			}
		}]
	});
	return indexpanel.form;
}
