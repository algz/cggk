/**
 * 布局左部面板
 */
var taskProcessWest = {
	tnode : null,
	oldnode : null,
	limit : 30,
	tag : null,
	dep : 2//树自动展开的层级
	
};
var store;
var idflag;
taskProcessWest.cmwidth = 80;

var showNewTree = function() {
	taskProcessWest.tag.getRootNode().appendChild(taskProcessWest.tnode);
	taskProcessWest.removeAllNode();
	taskProcessWest.tag.getRootNode().expand();
	taskProcessWest.tag.getRootNode().firstChild.expand();
	//taskProcessWest.tag.getRootNode().expandChildNodes(true);
}

taskProcessWest.removeAllNode = function() {
	for (var i = 0, l = taskProcessWest.tag.getNodeById('_con0').childNodes.length
			- 1;i < l; i++) {
		taskProcessWest.tag.getNodeById('_con0').removeChild(taskProcessWest.tag
				.getNodeById('_con0').firstChild);
	}
}

taskProcessWest.expandNode = function(node){
	node.expand();
	node.eachChild(function(currentNode){
//					alert(currentNode.attributes.level);
					if (currentNode.getDepth() != taskProcessWest.dep){
						taskProcessWest.expandNode(currentNode);
					} 
				});
}


taskProcessWest.init = function() {
	taskProcessWest.clickin = function() {
		taskProcessWest.tag.getTopToolbar().items.itemAt(1).setDisabled(true);
		if (taskProcessWest.oldnode
				&& taskProcessWest.oldnode.id == taskProcessWest.tnode.id)
			return;
		taskProcessWest.oldnode = taskProcessWest.tnode;
		showNewTree();
		taskProcessWest.tag.getTopToolbar().items.itemAt(0).setDisabled(false);
	}

	taskProcessWest.clickfirst = function() {
		taskProcessWest.tag.getTopToolbar().items.itemAt(0).setDisabled(true);
		taskProcessWest.tag.getTopToolbar().items.itemAt(1).setDisabled(true);
		taskProcessWest.tag.loader.dataUrl = "../JSON/task_processquery_ProcessquerySvr.getContentsTree?contentsid=0";
		taskProcessWest.tag.getLoader().load(taskProcessWest.tag.getNodeById('_con0'));
		taskProcessWest.oldnode = null;
		taskProcessWest.tag.getRootNode().expand();
	}
	taskProcessWest.tag = new Ext.tree.TreePanel( {
		id : 'taskprocess-tree',
		region : 'west',
		split:true,
		width:240,
		loader : new Ext.tree.TreeLoader( {
			baseAtts : new Ext.tree.AsyncTreeNode(null),
			dataUrl : '../JSON/task_processquery_ProcessquerySvr.getContentsTree'
		}),
		//useArrows : true,
		animate:true,
		lines:true,
		autoScroll : true,
		tbar : [ {
			id : 'ckfirst',
			text : ''+getResource('resourceParam944')+'',
			disabled : true,
			handler : taskProcessWest.clickfirst
		}, {
			id : 'ckin',
			text : ''+getResource('resourceParam1533')+'',
			disabled : true,
			handler : taskProcessWest.clickin
		}],
		root : new Ext.tree.AsyncTreeNode( {
			text : '<font size=2>'+getResource('resourceParam1249')+'</font>',
			draggable : false,
			id : '_con0'
		})
	});
	
	taskProcessWest.tag
		.on('beforeload',
				function(node) {
					var iname = node.id.substring(4);
//					alert(node.id);
					if (node.id.indexOf('_con') == 0) {
						taskProcessWest.tag.loader.dataUrl = "../JSON/task_processquery_ProcessquerySvr.getContentsTree?contentsid="
								+ iname;
					} 
					else if (node.id.indexOf('_pro') == 0) {//任务进度查询左侧树只显示项目夹和项目，不显示任务。 20100224
						taskProcessWest.tag.loader.dataUrl = "../JSON/anotherprocessquery_ProcessquerySvr.getProjectTreeData?text="
								+ iname;
					}
					else {
					//任务进度查询左侧树只显示项目夹和项目，不显示任务。   20100224
						taskProcessWest.tag.loader.dataUrl = "../JSON/anotherprocessquery_ProcessquerySvr.getPartnumTreeData?text="
								+ iname;
					}
				});

           taskProcessWest.tag.on('click', function(node) {
           	
           	   var iname = node.id.substring(4);
           	   if(node.id.indexOf('_pro') == 0)
           	   {
           	   	    taskProcessMain.taskid="p"+iname;
//           	   	    alert(wbsdata.nodeId);
//	           	    wbsdata.nodeId=taskProcessMain.taskid;
//	           	    wbsdata.refresh();
	           	    
	           	    if (taskProcessMain.t4 != null) {
			            taskProcessMain.t4.remove(taskProcessMain.panela);
		             }
						wbsdata.nodeId=taskProcessMain.taskid;
						taskProcessMain.panela= wbsdata.init();
						taskProcessMain.t4.add(taskProcessMain.panela);
						taskProcessMain.t4.doLayout();

	                //taskProcessMain.t4.add(f);
	                //taskProcessMain.t4.doLayout();
	                //taskProcessMain.tab.doLayout();
           	   }
           });
	return taskProcessWest.tag;
}


