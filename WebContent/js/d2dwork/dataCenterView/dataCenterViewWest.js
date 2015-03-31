/**
 * 布局左部面板
 */
var dataCenterViewWest = {
	tnode : null,
	oldnode : null,
	limit : 30,
	tag : null
};
var store;
var idflag;
dataCenterViewWest.cmwidth = 80;


	

dataCenterViewWest.init = function() {
	dataCenterViewWest.tag = new Ext.tree.TreePanel( {
		id : 'datacenter-tree',
		region : 'west',
		split:true,
		width:200,
		loader : new Ext.tree.TreeLoader( {
			baseAtts : new Ext.tree.AsyncTreeNode(null),
			dataUrl:'../JSON/DataCenterViewService.getDataCentersJson'
			//baseParams :{name:null,instcode:null}
		}),
		animate:true,
		lines:true,
		draggable:false,
		autoScroll : true		 
	});
	
	
dataCenterViewWest.root = new Ext.tree.AsyncTreeNode({
        draggable : false,
		text: '' + getResource('resourceParam9053') + '' +getResource('resourceParam561')+'',
    	id:'0',
    	iconCls:'top',
    	leaf:false
    });
    dataCenterViewWest.tag.setRootNode(dataCenterViewWest.root);
	
 
	dataCenterViewWest.tag.on('beforeload',
				function(node) {				
				var iname = node.id.substring(3);
				var isRef = node.attributes.isRef;			
					
					if (node.id == '0'){//获取数据中心集合
					    dataCenterViewWest.tag.loader.dataUrl = "../JSON/DataCenterViewService.getDataCentersJson?dataCenterID=0";					    			    				   				    
					}
					else if (node.id.indexOf('_dc') == 0) {//获取数据中心下面的第一级数据集、数据项
						dataCenterViewWest.tag.loader.dataUrl = "../JSON/DataCenterViewService.getDataObjectsByDC?dataCenterID="
								+ iname;						
					} else if (node.id.indexOf('_do') == 0) {//获取数据对象的下一级数据对象
						dataCenterViewWest.tag.loader.dataUrl = "../JSON/DataCenterViewService.getDataObjectsJsonByParentDO?dataObjectID="
								+ iname + "&isRef=" + isRef;
					}					 
				});			 
 
	//dataCenterViewWest.tag.getLoader().load(dataCenterViewWest.tag.getNodeById('0'));
	//dataCenterViewWest.tag.getNodeById('0').expand();
	 
	 //dataCenterViewWest.tag.expandAll();
	
	 
	 
dataCenterViewWest.tag.on('click', function(node) {
			 
				// 如果为顶层节点则不能进行进度查询
				//if (node.id == '0')
				//	return;
//				alert("click:" + node.id);
				
				dataCenterViewWest.tnode = node;
					
					var dataObjectID = node.id.substring(3);//判断对象类型，看哪些对象是有详细信息的
					var expanded = node.isExpanded();
					
					//设置当前点击节点的id和类型
					 
					dataCenterViewMain.currentFullNodeId = node.id;
//					alert(node.attributes.dataType);					
					/*
					if (!node.leaf) {
						var nodearr = node.childNodes;
						for(var i=0;i < nodearr.length;i++){
							taskname += "@" + nodearr[i].id;
						}
					}*/
					myGrid.row=null;
					var dataurl; 
					if (node.id == '0'){//获取数据中心集合，显示数据中心信息，需要修改一下??
						dataCenterViewMain.currentNodeID = '0';
						dataCenterViewMain.currentNodeType = '0';
						dataCenterViewMain.onlinegrid.getTopToolbar().items.itemAt(1).setDisabled(false);
						dataCenterViewMain.onlinegrid.getTopToolbar().items.itemAt(3).setDisabled(false);
					    dataurl = "../JSON/DataCenterViewService.getAllDataCentersDetail?dataCenterID="
								+ '0';					    			    				   				    
					}
					else if (node.id.indexOf('_dc') == 0) {//获取数据中心下面的第一级数据集、数据项??
						dataCenterViewMain.currentNodeID = dataObjectID;
						dataCenterViewMain.currentNodeType = '_dc';					
						dataCenterViewMain.currentNodeDatatypeID = '_dc';
						dataCenterViewMain.onlinegrid.getTopToolbar().items.itemAt(1).setDisabled(false);
						dataCenterViewMain.onlinegrid.getTopToolbar().items.itemAt(3).setDisabled(false);
						dataurl = "../JSON/DataCenterViewService.getFirstDataOjectsInDc?dataCenterID="
								+ dataObjectID;						
					} else if (node.id.indexOf('_do') == 0) {//获取数据对象的下一级数据对象
						dataCenterViewMain.currentNodeID = dataObjectID;
						dataCenterViewMain.currentNodeType = '_do';						
						dataCenterViewMain.currentNodeDatatypeID = node.attributes.dataType;
						if (node.attributes.isRef != '' && node.attributes.isRef != 'None'){//可以添加子节点
							dataCenterViewMain.onlinegrid.getTopToolbar().items.itemAt(1).setDisabled(true);
							dataCenterViewMain.onlinegrid.getTopToolbar().items.itemAt(3).setDisabled(true);
						} else {
							dataCenterViewMain.onlinegrid.getTopToolbar().items.itemAt(1).setDisabled(false);
							dataCenterViewMain.onlinegrid.getTopToolbar().items.itemAt(3).setDisabled(false);
						}
						dataurl = "../JSON/DataCenterViewService.getDataOjectsInfo?dataObjectID="
								+ dataObjectID + "&expanded=true" //+ expanded
					}
					
					//expanded判断节点是否展开，如果是展开则需要显示下一层对象信息
					var proxy = new Ext.data.HttpProxy( {
						url : dataurl,
						method:'get',
						disableCaching:true
					});
					dataCenterViewMain.onlinegrid.getStore().proxy = proxy;
				
				
 	             myGrid.loadvalue(dataCenterViewMain.onlinegrid.store, {start:0,limit:25},{});
 	             
 	             
 	             
 	             
 	             
				});
	//刷新树节点
	dataCenterViewWest.refreshTreeNode = function(node){
		if (node.isExpanded() || node.isLeaf()) {
			dataCenterViewWest.tag.fireEvent('beforeload', node);
			dataCenterViewWest.tag.loader.load(node);
			if (node.isLeaf())
				node.leaf = false;
			node.expand();
		}
	}
				 
	return dataCenterViewWest.tag;
}


