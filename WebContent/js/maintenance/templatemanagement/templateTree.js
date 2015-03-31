

var templateTree = {
	projectId : null,
	pageSize : 100,
	rootId : '0',
	rootName : null,
	rootIconCls : null
};
templateTree.init = function() {
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
	templateTree.rootNode = new Ext.tree.AsyncTreeNode({
				id : templateTree.rootId,
				projectId : templateTree.projectId,
				text : templateTree.rootName,
				iconCls : templateTree.rootIconCls,
				allowDrag : false
			});
	var treeLoader = new Ext.ux.tree.PagingTreeLoader({
				dataUrl : '../JSON/wbstemplate_TemplateRemote.findSubTasks',
				pageSize : templateTree.pageSize,
				enableTextPaging : true,
				uiProviders : {
					"col" : Ext.tree.TreeNodeUI
				},
				baseParams : {
					projectId : templateTree.projectId
				},
				pagingModel : 'remote'
			})
	templateTree.treePanel = new Ext.tree.TreePanel({
				width : 398,
				lines : true,
				split : true,
				animate : true,
				rootVisible : true,
				border : false,
				enableDD : false,
				root : templateTree.rootNode,
				plugins : new Ext.ux.tree.TreeNodeMouseoverPlugin(),
				loader : treeLoader,
				autoScroll : true
			});
	templateTree.mask = new Ext.LoadMask(document.body, {
				msg : "" + getResource('resourceParam990') + ""
			});
	treeLoader.on('load', function(treeLoader, node) {
				templateTree.mask.hide();
			});
	treeLoader.on('beforeload', function(treeLoader, node) {
				templateTree.mask.show();
			});

	return templateTree.treePanel;
}
