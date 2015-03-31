var DesignerPanel = function() {
    // 流程设计面板
    var flowGraph = new FlowGraph();
    
	// 左上部工具栏面板
	var library = new LibraryPanel({
		border : false,
        rootVisible : false,
        lines : false,
        autoScroll : true,
        root : new Ext.tree.TreeNode(''),
		expanded : true,
        region : 'center',
	    split : true,
	    layoutConfig:{
	       	animate:true
	    },
		layout:'accordion',
        graph : flowGraph.getGraph(),
        listeners : {
        	"afterrender" : function() {
			    library.addItem('审批节点', 'icons/p2m/flow/approvalTask.png', 50, 50, 'icons/p2m/flow/approvalTask.png', flowGraph.getGraph(), '6');
			    library.addItem('会签节点', 'icons/p2m/flow/task.png', 50, 50, 'icons/p2m/flow/task.png', flowGraph.getGraph(), '9');
			   	if(config.template_privilege==1) {
				    library.addItem('判断节点', 'icons/p2m/flow/judge.png', 50, 50, 'icons/p2m/flow/judge.png', flowGraph.getGraph(), '1');
			   	}
			    library.addItem('判断节点（人工）', 'icons/p2m/flow/judge.png', 50, 50, 'icons/p2m/flow/judge.png', flowGraph.getGraph(), '10');
        	}
        }
    });
    
   	//左边工具箱
    var leftPanel = new Ext.Panel({
		title : '工具箱',
		border : true,
        icon : 'icons/p2m/gantt.png',
        split : true,
		width : 200,
		collapsible:true,
		region :'west',
		layout : 'border',
		items : [library, flowGraph.getOutlinePanel()]
    });
    
    //中间流程图
    var centerPanel = new Ext.Panel({
		border : false,
    	region : 'center',
		layout : 'border',
		items : [flowGraph.getGraphPanel()]
    });
    
    //主面板，整合左边面板和右边面板
    var mainPanel = new Ext.Panel({
		border : false,
    	region : 'center',
    	layout : 'border',
    	items : [centerPanel, leftPanel]
 	});
 	
 	this.getMainPanel = function() {
 		return mainPanel;
 	};
 	
 	this.getFlowGraph = function() {
 		return flowGraph;
 	};
}