/**
 * 数据中心，协同工程左部导航树公共模块封装
 * 
 * leftNavigationTree.init("dataCenter")数据中心初始化
 * leftNavigationTree.init("coop");协同工程初始化
 */

var baobiaoProjectTree = {
	treePanel : null,
	nodeId : '0',
	pageSize : 100,
	rootName : '所有项目', //@chenw 修改root名称
	rootIconCls : 'icon-project'
};

baobiaoProjectTree.init = function(transferFlag) {
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
						// if the load is cancelled, make sure we notify
						// the node that we are done
						this.runCallback(callback, scope || node, []);
					}
				}
			});
	var rootNode = new Ext.tree.AsyncTreeNode({
				id : '0',
				text : baobiaoProjectTree.rootName,
				iconCls : baobiaoProjectTree.rootIconCls,
				allowDrag : false
			});
	var treeLoader = new Ext.ux.tree.PagingTreeLoader({
				dataUrl : '../JSON/project_ProjectRemote.getProjectTreeById',
				pageSize : baobiaoProjectTree.pageSize,
				enableTextPaging : true,
				uiProviders : {
					"col" : Ext.tree.TreeNodeUI
				},
				baseParams : {
					contentId : 0
				},
				pagingModel : 'remote'
			})
	baobiaoProjectTree.treePanel = new Ext.tree.TreePanel({
				id : 'baobiaoProjectTree',
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
	baobiaoProjectTree.mask = new Ext.LoadMask(document.body, {
				msg : "" + getResource('resourceParam990') + ""
			});
	treeLoader.on('load', function(treeLoader, node) {
		baobiaoProjectTree.mask.hide();
			// 点击+号展开就刷新当前节点(出始化后第一次新建子节点时，又会点回属性面板)
			// collarbMain.leftTree.fireEvent('beforeclick', node);// 点击该node
			// collarbMain.leftTree.fireEvent('click', node,
			// Ext.EventObject.ctrlKey,false);// 点击该node
		});
	baobiaoProjectTree.treePanel.on('click', function(node) {
				//切换节点时应把部门ID置空
				departmentUser.codeid = null;
				
				
		          baobiaoMain.nodeid = node.id;
				 var activePanel = baobiaoMain.cenpanel.getLayout().setActiveItem(0);
//				 activePanel.fireEvent('activate');

				if (node.id.indexOf('p') == 0) {
					var s = baobiaoMain.cenpanel.getLayout().activeItem.id;
					if (s == "baobiaoMainpanel") {
						Seam.Component.getInstance("aofoquery_zongheChaxunSvr")
								.getStartDate(node.id, function(reslut) {
											var days = Date.parseDate(reslut,
													"Y-m-d");
											baobiaoMain.getMonth(days);
											baobiaoMain.baseargs = {
												nodeid : baobiaoMain.nodeid,
												monthaa : baobiaoMain.monthaa,
												monthbb : baobiaoMain.monthbb,
												monthcc : baobiaoMain.monthcc,
												monthdd : baobiaoMain.monthdd,
												monthff : baobiaoMain.monthff,
												monthgg : baobiaoMain.monthgg
											}

											myGrid.loadvalue(
													baobiaoMain.grid.store, {
														start : 0,
														limit : baobiaoMain.staticRow
													}, baobiaoMain.baseargs);
										});
					} else {
						Seam.Component.getInstance("aofoquery_zongheChaxunSvr")
								.getTprojectVo(node.id, function(reslut) {

											baobiaoMain.panellist(reslut);

										});

					}
				}
			});

	treeLoader.on('beforeload', function(treeLoader, node) {
		baobiaoProjectTree.mask.show();
		if (node.id == 0) {// root节点展开
			treeLoader.dataUrl = '../JSON/project_ProjectRemote.getBaobiaoProjectTreeById';
			treeLoader.baseParams.contentId = 0;
			treeLoader.baseParams.tpye = "1";
		} else if (node.id.indexOf('c') == 0) {// 项目夹展开
			var contentId = node.id.substring(1);
			treeLoader.dataUrl = "../JSON/project_ProjectRemote.getBaobiaoProjectTreeById";
			treeLoader.baseParams.contentId = contentId;
			treeLoader.baseParams.tpye = "1";
		}
	});
	treeLoader.baseParams.transferFlag = transferFlag
	function beforeAppend(tree, pnode, node) {
		node.leaf = false;
	}
	if (transferFlag == "coop") {
		baobiaoProjectTree.treePanel.on("beforeappend", beforeAppend);
		baobiaoProjectTree.treePanel.on("nodedragover", function(e) {
				});
		baobiaoProjectTree.treePanel.on("beforenodedrop", function(e) {
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
								baobiaoProjectTree.nodeId = parentNode.id;
							} else if (targetNode.contains(parentNode)) {
								baobiaoProjectTree.nodeId = targetNode.id;
							} else {
								baobiaoProjectTree.nodeId = 0;
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

	return baobiaoProjectTree.treePanel;
}
