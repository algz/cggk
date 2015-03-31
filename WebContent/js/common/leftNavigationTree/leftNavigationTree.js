/**
 * 数据中心，协同工程左部导航树公共模块封装
 * 
 * leftNavigationTree.init("dataCenter")数据中心初始化
 * leftNavigationTree.init("coop");协同工程初始化
 */

var leftNavigationTree = {
	treePanel : null,
	nodeId : '0',
	pageSize : 25,
	rootName : 'Root',
	rootIconCls : 'icon-project'
};
leftNavigationTree.init = function(transferFlag) {
	Ext.tree.TreeLoader.override( {
		requestData : function(node, callback, scope) {
			if (this.fireEvent("beforeload", this, node, callback) !== false) {
				if (this.directFn) {
					var args = this.getParams(node);
					args.push(this.processDirectResponse.createDelegate(this, [{
						callback : callback,
						node : node,
						scope : scope
					}], true));
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
				this.runCallback(callback, scope || node, []);
		    }
		}
	});
	var rootNode = new Ext.tree.AsyncTreeNode( {
		id : '0',
		text : leftNavigationTree.rootName,
		iconCls : leftNavigationTree.rootIconCls,
		allowDrag : false
	});
	var treeLoader = new Ext.ux.tree.PagingTreeLoader( {
		dataUrl : '../JSON/project_ProjectRemote.getProjectTreeById',
		pageSize : leftNavigationTree.pageSize,
		enableTextPaging : true,
		requestMethod:'GET',
		uiProviders : {
			"col" : Ext.tree.TreeNodeUI
		},
		baseParams : {
			contentId : 0
		},
		pagingModel : 'remote'
	})
	leftNavigationTree.treePanel = new Ext.tree.TreePanel( {
		id : 'leftNavigationTree',
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
	leftNavigationTree.mask = new Ext.LoadMask(document.body, {
		msg : ""+getResource('resourceParam990')+""
	});
	treeLoader.on('load', function(treeLoader, node) {
		leftNavigationTree.mask.hide();
		/*
		 * 任务项目类型 ，定义名称的颜色
		 */
//		var childNodes=node.childNodes;
//		for(var i=0;i<childNodes.length;i++){
//			var c_node=childNodes[i];
//			//类型id
//			var categoryId=c_node.attributes.categoryId;
//			//类型名称
//			var categoryName=c_node.attributes.categoryName;
//			//节点名称
//			var text=c_node.attributes.text;
//			c_node.setText('<span style="color:red;">'+text+'</span>');
//		}
	});
	treeLoader.on( 'beforeload', function(treeLoader, node) {
		leftNavigationTree.mask.show();
		if (node.id == 0&&(!node.attributes.childProjectId||node.attributes.childProjectId=='0')) {// root节点展开
			treeLoader.dataUrl = '../JSON/project_ProjectRemote.getProjectTreeById';
			treeLoader.baseParams.contentId = 0;
            treeLoader.baseParams.tpye = collarbMain.tpye;
		} else if (node.id.indexOf('c') == 0) {// 项目夹展开
			var contentId = node.id.substring(1);
			treeLoader.dataUrl = "../JSON/project_ProjectRemote.getProjectTreeById";
			treeLoader.baseParams.contentId = contentId;
            treeLoader.baseParams.tpye = collarbMain.tpye;
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
				treeLoader.baseParams.projectId=node.attributes.projectId;
				if(node.attributes.relationType==2){
					treeLoader.baseParams.projectId=node.attributes.childProjectId;
				}
				treeLoader.baseParams.id = node.id;
			}
		}
	});
	treeLoader.baseParams.transferFlag = transferFlag
	function beforeAppend(tree, pnode, node) {
		node.leaf = false;
	}
	if (transferFlag == "coop") {
		leftNavigationTree.treePanel.on("beforeappend", beforeAppend);
		leftNavigationTree.treePanel.on("nodedragover", function(e) {
		});
		leftNavigationTree.treePanel.on("beforenodedrop", function(e) {
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
								leftNavigationTree.nodeId = parentNode.id;
							} else if (targetNode.contains(parentNode)) {
								leftNavigationTree.nodeId = targetNode.id;
							} else {
								leftNavigationTree.nodeId = 0;
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

	return leftNavigationTree.treePanel;
}
