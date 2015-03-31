var colligateTree={
	treePanel : null,
	nodeId : '0',
	pageSize : 100,
	rootName : 'Root',
	rootIconCls : 'icon-project'
}
colligateTree.init=function(transferFlag)
{
	Ext.tree.TreeLoader.override( {
		requestData : function(node, callback, scope) {
			if (this.fireEvent("beforeload", this, node, callback) !== false) {
				if (this.directFn) {
					var args = this.getParams(node);
					args.push(this.processDirectResponse.createDelegate(this,
							[ {
								callback : callback,
								node : node,
								scope : scope
							} ], true));
					this.directFn.apply(window, args);
				} else {
					this.transId = Ext.Ajax.request( {
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
				// if the load is cancelled, make sure we notify
			// the node that we are done
			this.runCallback(callback, scope || node, []);
		    }
	}
})	;
	var rootNode = new Ext.tree.AsyncTreeNode( {
		id : '0',
		text : colligateTree.rootName,
		iconCls : colligateTree.rootIconCls,
		allowDrag : false
	});
	var treeLoader = new Ext.ux.tree.PagingTreeLoader( {
		dataUrl : '../JSON/project_ProjectRemote.getProjectTreeById',
		pageSize : colligateTree.pageSize,
		enableTextPaging : true,
		uiProviders : {
			"col" : Ext.tree.TreeNodeUI
		},
		baseParams : {
			contentId : 0
		},
		pagingModel : 'remote'
	})
	colligateTree.treePanel = new Ext.tree.TreePanel( {
		id : 'colligateTree',
		width : 398,
		lines : true,
		split : true,
		animate : true,
		rootVisible : true,
		border : false,
		enableDD : transferFlag == "dataCenter" ? false : true,
		root : rootNode,
		plugins : new Ext.ux.tree.TreeNodeMouseoverPlugin(),
		loader : treeLoader,
		autoScroll : true
	});
	colligateTree.mask = new Ext.LoadMask(document.body, {
		msg : ""+getResource('resourceParam990')+""
	});
	treeLoader.on('load', function(treeLoader, node) {
		colligateTree.mask.hide();
		//点击+号展开就刷新当前节点(出始化后第一次新建子节点时，又会点回属性面板)
//		collarbMain.leftTree.fireEvent('beforeclick', node);// 点击该node
//			collarbMain.leftTree.fireEvent('click', node,
//					Ext.EventObject.ctrlKey,false);// 点击该node
		});
	treeLoader
			.on('beforeload',
					function(treeLoader, node) {
						colligateTree.mask.show();
						if (node.id == 0&&(!node.attributes.childProjectId||node.attributes.childProjectId=='0')) {// root节点展开
							treeLoader.dataUrl = '../JSON/project_ProjectRemote.getProjectTreeById';
							treeLoader.baseParams.contentId = 0;
						} else if (node.id.indexOf('c') == 0) {// 项目夹展开
							var contentId = node.id.substring(1);
							treeLoader.dataUrl = "../JSON/project_ProjectRemote.getProjectTreeById";
							treeLoader.baseParams.contentId = contentId;
						} else if (node.id.indexOf("p") == 0||node.id.indexOf("vp")==0) {// 项目展开
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
							if (transferFlag == 'dataCenter') {
								treeLoader.dataUrl = '../JSON/webremote_DataObjectRemote.getDataCenterTaskTree';
								treeLoader.baseParams.id = node.id;
							} else if (transferFlag == 'coop') {
								treeLoader.dataUrl = "../JSON/task_TaskRemote.findSubTasks";
								treeLoader.baseParams.projectId = node.attributes.relationType==1?node.attributes.projectId:node.attributes.childProjectId;
								treeLoader.baseParams.id = node.id;
							}
						}
					});
	treeLoader.baseParams.transferFlag = transferFlag
	function beforeAppend(tree, pnode, node) {
		node.leaf = false;
	}
	if (transferFlag == "coop") {
		colligateTree.treePanel.on("beforeappend", beforeAppend);
		colligateTree.treePanel.on("nodedragover", function(e) {
		});
		colligateTree.treePanel.on("beforenodedrop", function(e) {
			if (e.point == "append" && e.dropNode.parentNode != e.target) {
				Ext.Ajax.request( {
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
								colligateTree.nodeId = parentNode.id;
							} else if (targetNode.contains(parentNode)) {
								colligateTree.nodeId = targetNode.id;
							} else {
								colligateTree.nodeId = 0;
							}
							collarbMain.refresh();
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
					Ext.MessageBox.show( {
						title : ''+getResource('resourceParam575')+'',
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
				targetId : e.target.id == 0 ? 0 : e.target.id.substring(1),
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

	return colligateTree.treePanel;
}