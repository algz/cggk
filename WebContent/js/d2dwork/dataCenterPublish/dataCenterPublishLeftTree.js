var dataCenterPublishLeftTree ={};

dataCenterPublishLeftTree.init=function(){
	
	dataCenterPublishLeftTree.tag = new Ext.tree.TreePanel( {
		id : 'task-tree',
		region : 'west',
		split:true,
		 height : 800,
		title :""+getResource('resourceParam1249')+"",
		margins : '0 5 0 5',
		loader : new Ext.tree.TreeLoader( {
			baseAtts : new Ext.tree.AsyncTreeNode({draggable:false}),
			dataUrl:'../JSON/processquery_ProcessquerySvr.getContentsTree'
			//baseParams :{name:null,instcode:null}
		}),
		animate:true,
		lines:true,
		 enableDD:false,
		// dropConfig: {appendOnly:true},
		draggable:false,
		autoScroll : true     
	});
	
	  
              
               
	  // add a tree sorter in folder mode
    new Ext.tree.TreeSorter(dataCenterPublishLeftTree.tag, {folderSort:true});
    //
	dataCenterPublishLeftTree.root = new Ext.tree.AsyncTreeNode({
        draggable : false,
		text:''+getResource('resourceParam1249')+'',
    	id:'_con0'
    	//iconCls:'top'
    });
    dataCenterPublishLeftTree.tag.setRootNode(dataCenterPublishLeftTree.root);
    
    
    
    
    
    dataCenterPublishLeftTree.tag
		.on(
				'beforeload',
				function(node) {
					var iname = node.id.substring(4);
					//alert(node.id);
					if (node.id.indexOf('_con') == 0) {
						dataCenterPublishLeftTree.tag.loader.dataUrl = "../JSON/processquery_ProcessquerySvr.getContentsTree?contentsid="
								+ iname;
					} else if (node.id.indexOf('_pro') == 0) {
						dataCenterPublishLeftTree.tag.loader.dataUrl = "../JSON/anotherprocessquery_ProcessquerySvr.getProjectAndParametersTreeData?text="
								+ iname;
					} else if (node.id.indexOf('_tsk') == 0) {
						dataCenterPublishLeftTree.tag.loader.dataUrl = "../JSON/anotherprocessquery_ProcessquerySvr.getTaskAndOutParametersTreeData?text="
								+ iname;
					} else {//参数数据没有父子关系，因此不会调到
					   alert(''+getResource('resourceParam1250')+'');
					}
				});
				
				
	dataCenterPublishLeftTree.tag.on('click', function(node) {
	/*
					var dataObjectID = node.id.substring(3);
					dataCenterPublishMain.rightDataObjectID = dataObjectID;//把节点的id传到对象里面去
					
					if (node.id == '0'){//数据中心集合
					    dataCenterPublishMain.rightDataType = '_dcSet';					    			    				   				    
					}
					else if (node.id.indexOf('_dc') == 0) {//数据中心
						dataCenterPublishMain.rightDataType = '_dc';						
					} else if (node.id.indexOf('_do') == 0) {//数据对象
						dataCenterPublishMain.rightDataType = '_do';
					}
					*/
					
					//if (node.id.indexOf('_lit') != -1) {
					//var iname = node.id.substring(node.id.indexOf('_lit') + 4);
					//var id = node.parentNode.id;
					//var url = "";					
					if (node.id.indexOf('_con') == 0) {//选中的是根节点_con或项目夹，不能发布
						dataCenterPublishMain.leftDataObjectID='_con0';
						dataCenterPublishMain.leftDataType='_con';
					} else if (node.id.indexOf('_pro') == 0) {//选中的是项目节点_pro
						dataCenterPublishMain.leftDataObjectID=node.id.substring(4);
						dataCenterPublishMain.leftDataType='_pro';
					} else if (node.id.indexOf('_tsk') == 0) {//选中的是任务节点_tsk任务层级id _pro项目id					
						dataCenterPublishMain.leftDataObjectID=node.id.substring(4,node.id.indexOf('_pro'));
						dataCenterPublishMain.leftDataType='_tsk';
					} else if (node.id.indexOf('_par') == 0) {//选中的是参数节点，_par参数id _tsk任务id _pro项目id
						dataCenterPublishMain.leftDataObjectID=node.id.substring(4,node.id.indexOf('_tsk'));
						dataCenterPublishMain.leftDataType='_par';
					} else {
						//不会出现这样的情况				
					}
					
					//}	
				});
    /*
    	dataCenterPublishLeftTree.tag.on('beforeload',
				function(node) {
				 
				dataCenterPublishLeftTree.tag.loader.dataUrl = "../JSON/base_organization_OrganizationService.bumenlist?instcode="
								+ node.id;
					 
				});
				*/			 
 
	//chatwest.tag.getLoader().load(chatwest.tag.getNodeById('0'));
	//chatwest.tag.getNodeById('0').expand();
	 
	 //dataCenterPublishLeftTree.tag.expandAll();
	
	 
	   //dataCenterPublishLeftTree.root.attributes.description='这是根节点';
	dataCenterPublishLeftTree.tag.on('click', function(node) {
			 
			 //alert(node.att/点则不能进行进度查询
				//if (node.id == '0')
				//	return;
	});
    
    return dataCenterPublishLeftTree.tag;
}
