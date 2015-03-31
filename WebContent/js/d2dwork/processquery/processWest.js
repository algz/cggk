/**
 * 布局左部面板
 */
var processWest = {
	tnode : null,
	oldnode : null,
	limit : 30,
	tag : null
	
};
var store;
var idflag;
processWest.cmwidth = 80;

var showNewTree = function() {
	processWest.tag.getRootNode().appendChild(processWest.tnode);
	processWest.removeAllNode();
	processWest.tag.getRootNode().expand();
	processWest.tag.getRootNode().firstChild.expand();
	//processWest.tag.getRootNode().expandChildNodes(true);
}

processWest.removeAllNode = function() {
	for (var i = 0, l = processWest.tag.getNodeById('_con0').childNodes.length
			- 1;i < l; i++) {
		processWest.tag.getNodeById('_con0').removeChild(processWest.tag
				.getNodeById('_con0').firstChild);
	}
}


processWest.init = function() {
	processWest.clickin = function() {
		processWest.tag.getTopToolbar().items.itemAt(1).setDisabled(true);
		if (processWest.oldnode
				&& processWest.oldnode.id == processWest.tnode.id)
			return;
		processWest.oldnode = processWest.tnode;
		showNewTree();
		processWest.tag.getTopToolbar().items.itemAt(0).setDisabled(false);
	}

	processWest.clickfirst = function() {
		processWest.tag.getTopToolbar().items.itemAt(0).setDisabled(true);
		processWest.tag.getTopToolbar().items.itemAt(1).setDisabled(true);
		processWest.tag.loader.dataUrl = "../JSON/processquery_ProcessquerySvr.getContentsTree?contentsid=0";
		processWest.tag.getLoader().load(processWest.tag.getNodeById('_con0'));
		processWest.oldnode = null;
		processWest.tag.getRootNode().expand();
	}
	processWest.tag = new Ext.tree.TreePanel( {
		id : 'grocess-tree',
		region : 'west',
		split:true,
		width:200,
		loader : new Ext.tree.TreeLoader( {
			baseAtts : new Ext.tree.AsyncTreeNode(null),
			dataUrl : '../JSON/processquery_ProcessquerySvr.getContentsTree'
		}),
		//useArrows : true,
		animate:true,
		lines:true,
		autoScroll : true,
		tbar : [ {
			id : 'ckfirst',
			text : ''+getResource('resourceParam944')+'',
			disabled : true,
			handler : processWest.clickfirst
		}, {
			id : 'ckin',
			text : ''+getResource('resourceParam1533')+'',
			disabled : true,
			handler : processWest.clickin
		}],
		root : new Ext.tree.AsyncTreeNode( {
			text : ''+getResource('resourceParam1249')+'',
			draggable : false,
			id : '_con0'
		})
	});
	
	processWest.tag
		.on(
				'beforeload',
				function(node) {
					var iname = node.id.substring(4);
					//alert(node.id);
					if (node.id.indexOf('_con') == 0) {
						processWest.tag.loader.dataUrl = "../JSON/processquery_ProcessquerySvr.getContentsTree?contentsid="
								+ iname;
					} else if (node.id.indexOf('_pro') == 0) {
						processWest.tag.loader.dataUrl = "../JSON/anotherprocessquery_ProcessquerySvr.getProjectTreeData?text="
								+ iname;
					} else {
						processWest.tag.loader.dataUrl = "../JSON/anotherprocessquery_ProcessquerySvr.getPartnumTreeData?text="
								+ iname;
					}
				});

processWest.tag
		.on('click', function(node) {
				//alert(node.id);
				//alert(node.parentNode.id);
				// 如果为顶层节点则不能进行进度查询
			

				if (node.id.indexOf('_lit') != -1) {
					var iname = node.id.substring(node.id.indexOf('_lit') + 4);
					var id = node.parentNode.id;
					var url = "";
					if (node.id.indexOf('_con') == 0) {
						url = "../JSON/processquery_ProcessquerySvr.getContentsTree?contentsid="
								+ id.substring(4);
					} else if (node.id.indexOf('_pro') == 0) {
						url = "../JSON/anotherprocessquery_ProcessquerySvr.getProjectTreeData?text="
								+ id.substring(4);
					} else {
						url = "../JSON/anotherprocessquery_ProcessquerySvr.getPartnumTreeData?text="
								+ id.substring(4);
					}
					
					processWest.tag.loader.dataUrl = url + "&start=" + iname;
					processWest.tag.getLoader().load(processWest.tag
							.getNodeById(id));
					processWest.tag.getNodeById(id).expand();
				} else {
					// 如果为页节点，则不能将此节点置为顶层节点
					if (node.leaf || node.id == '_con0') {
						processWest.tag.getTopToolbar().items.itemAt(1)
								.setDisabled(true);
					} else {
						processWest.tag.getTopToolbar().items.itemAt(1)
								.setDisabled(false);
					}
					
//					if(node.id.indexOf('_tsk') == 0){
//						callSeam("processquery_ProcessquerySvr","getTaskEntity",[node.id],function(result){
//                          var tmp ={};					 
//						  for(var i=0;i<result.elements.length;i++){
//						    tmp[result.elements[i].key]=result.elements[i].value;					    
//						  }
//						  processMain.egrid.setSource(tmp);
//						  processMain.egrid.show();
//						});
//					}else if(node.id.indexOf('_pro') == 0){
//						callSeam("processquery_ProcessquerySvr","getProjectEntity",[node.id],function(result){
//                          var tmp ={};					 
//						  for(var i=0;i<result.elements.length;i++){
//						    tmp[result.elements[i].key]=result.elements[i].value;					    
//						  }
//						  processMain.egrid.setSource(tmp);
//						  processMain.egrid.show();
//						  processMain.tab.setActiveTab(processMain.enpanel);
//						});
//					}else{
//						processMain.egrid.hide();
//					}
					
//					if(node.id.indexOf('_con') == 0){
//						processMain.tab.setActiveTab(processMain.cenpanel);
//					}
					
					processWest.tnode = node;
					
					var taskname=node.id;
					if (!node.leaf) {
						var nodearr = node.childNodes;
						for(var i=0;i < nodearr.length;i++){
							taskname += "@" + nodearr[i].id;
						}
					}
					
					var proxy = new Ext.data.HttpProxy( {
						url : '../JSON/anotherprocessquery_ProcessquerySvr.getProcess?taskname='
								+ taskname
					// '../data/d2dwork/d2dwork_process_ProcessSvr_getList0.text'
					});
					processMain.grid.getStore().proxy = proxy;
					// 隐藏下面的表格
					processMain.southpanel.hide();
					processMain.cenpanel.doLayout();
					var fn = node.firstChild;
					var ln = node.lastChild;
					var str = 0;
					if (fn) {
						if (fn.id.indexOf('_lit') != -1) {
							str = (parseInt(fn.id.substring(fn.id
									.indexOf('_lit')
									+ 4)) + 1)
									* processWest.limit;
						}
						if (ln.id.indexOf('_lit') != -1) {
							str = (parseInt(ln.id.substring(ln.id
									.indexOf('_lit')
									+ 4)) - 1)
									* processWest.limit;
						}
					}

					processMain.grid.getStore().load( {
						params : {
							start : str,
							limit : processWest.limit
						}
					});
				}
				// processMain.grid.setWidth(processMain.panel.getInnerWidth());
				// store = processMain.grid.getStore();
				// store.removeAll();
				// if(node.id.indexOf('_spe') == 0){
				// idflag = node.id.substring(4);
				// }
				// callSeam("processquery_ProcessquerySvr","getMMTime",[node.id],getTimeBack);
			});
	return processWest.tag;
}


