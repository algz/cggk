var dataLabelLocation = {
	node : null,
	firstLoad : true
}
// 数据ID、项目id、回调函数
dataLabelLocation.init = function(dataEntityId, dataCenterId, insId, callback) {
	
	/** 待选数据中心标签树 BEGIN */
	// 根节点
	dataLabelLocation.root = new Ext.tree.AsyncTreeNode({
		id : 'root',
		text : getResource('resourceParam561') + '',
		expandable : true,
		disiabled : false
	});
	// 数据加载
	dataLabelLocation.treeloader = new Ext.tree.TreeLoader({
		url : '../JSON/datacenter_DataCenterRemote.getDataLabelLocationTree',
		baseParams : {
			nodeid : 0,
			datacenterid : 0,
			insid : 0
		}
	});
	// 加载等待标识
//	dataLabelLocation.treeloader.mask = new Ext.LoadMask(document.body, {
//		msg : getResource('resourceParam990')
//	});
	// 数据加载前
	dataLabelLocation.treeloader.on('beforeload', function(treeLoader, node) {
		// dataLabelLocation.treeloader.mask.show();
		// this.dataUrl = o.loadChildUrl;
		this.baseParams = {
			insid : dataLabelLocation.firstLoad ? 0 : node.attributes.insid
		};
		dataLabelLocation.firstLoad = false;
	});
	// 树面板
	dataLabelLocation.treepanel = new Ext.tree.TreePanel({
		bodyStyle : 'height:100%',
		border : false,
		region : 'center',
		rootVisible : true,
		useArrows : false,
		autoShow : true,
		animate : false,
		enableDD : false,
		containerScroll : false,
		frame : false,
		loader : dataLabelLocation.treeloader,
		disabled : false,
		rootVisible : false,
		autoScroll : true,
		title: '待选择的数据中心标签位置',
		root : dataLabelLocation.root,
		listeners : {
			'dblclick' : function() {
				var node = dataLabelLocation.treepanel.getSelectionModel().getSelectedNode();
				if(!node) {
					Ext.Msg.show({
					   title:'提示',
					   msg: '请选择一条记录！',
					   buttons: Ext.Msg.OK,
					   buttonText: '确定',
					   icon: Ext.MessageBox.INFO
					});
					return false;	
				}
				var tmpNode = node; // 持有当前选中的标签节点
				if (node.attributes.type == '1') {
					Ext.Msg.show({
					   title:'提示',
					   msg: '发布位置只能选择数据标签！',
					   buttons: Ext.Msg.OK,
					   buttonText: '确定',
					   icon: Ext.MessageBox.INFO
					});
					return false;
				}
				
				// 判断是否已经选择了该位置
				var tmpStore = dataLabelLocation.grid.getStore();
				if (tmpStore.find('dataEntityCategoryTag', tmpNode.attributes.id) != -1) {
					Ext.Msg.show({
					   title:'提示',
					   msg: '您选择的数据标签已经存在，<br>请选择其他位置！',
					   buttons: Ext.Msg.OK,
					   buttonText: '确定',
					   icon: Ext.MessageBox.INFO
					});
					return false;
				}
				
				// 向上递归50层至顶层节点
				var arrPos = new Array();
				arrPos.push(node.attributes.categoryName);
				var maxLevel = 50;
				var i = 0;
				while (node && node.parentNode && i < maxLevel) {
					arrPos.push(node.parentNode.attributes.categoryName);
					node = node.parentNode;
					i ++;
				}
				
				arrPos.reverse();
				var strText = arrPos.join('/').substring(1);
				
				// 创建表格行
				var recordTemplet = Ext.data.Record.create([{
					name : 'dataEntityCategoryTagCenterID'
				}, {
					name : 'dataEntityCategoryTag'
				}, {
					name : 'text'
				}]);
				var newRow = new recordTemplet({
					dataEntityCategoryTagCenterID : tmpNode.attributes.dataCenterID,
					dataEntityCategoryTag : tmpNode.attributes.id,
					text: strText
				});
				
				tmpStore.add(newRow);
				tmpStore.commitChanges();
			}
		},
		tbar: [{
			text: '添加',
			scope : this,
			handler: function(b, e){
				dataLabelLocation.treepanel.fireEvent('dblclick');
			}
		}]
	});
	
	dataLabelLocation.treepanel.on("click", function(node) {
		dataLabelLocation.node = node;
	});

	// dataLabelLocation.root.expand(true);
	/** 待选数据中心标签树 END */
	
	/** 已有的数据中心标签列表 BEGIN */
	// 列头定义
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [new Ext.grid.RowNumberer(), {
			header: 'dataEntityCategoryTagCenterID',
			dataIndex: 'dataEntityCategoryTagCenterID',
			hidden: true,
			hideable: false
		}, {
			header: 'dataEntityCategoryTag',
			dataIndex: 'dataEntityCategoryTag',
			hidden: true,
			hideable: false
		}, {
			header : "位置",
			dataIndex : 'text',
			align: 'center',
			width : 30/*,
			renderer : function(value) {
				return '';
			}*/
		}, {
			header : "操作",
			align: 'center',
			dataIndex : 'text',
			width : 10,
			renderer : function(value, cellMeta, row, rowNo, colNo, thiStore) {
				return '<img title="删除" onclick="removeRowByIndex(\'' + rowNo + '\')" style="cursor:pointer;" src="../base/icons/p2m/delete.png"/>';
			}
		}]
	});
	
	// 数据源
	var store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : '../JSON/datacenter_DataCenterRemote.getDataIntoLabels'
				+ '?dataEntityID=' + dataEntityId
				+ '&dataCenterID=' + dataCenterId
				+ '&dcategoryinstanceid=' + insId
		}),
		reader : new Ext.data.JsonReader({
			root : 'results',
			totalProperty : 'totalProperty',
			id : 'id',
			fields : [
				'dataEntityCategoryTagCenterID',
				'dataEntityCategoryTag',
				'text']
		}),
		remoteSort : true
	});
	store.setDefaultSort('dataCenterID', 'asc');
	if (dataEntityId != null) {
		store.load({
			params : {
				start : 0,
				limit : 100
			}
		});
	}
	
	// 展示表格
	dataLabelLocation.grid = new Ext.grid.GridPanel({
		region : 'west',
		trackMouseOver : true,
		disableSelection : false,
		loadMask : true,
		split: true,
	    store: store,
	    cm: cm,
	    viewConfig: {
			forceFit : true,
			enableRowBody : false,
			showPreview : false
	    },
	    width: 260,
	    // height: 300,
	    bodyStyle:'height:100%',
	    border: false,
	    frame: false,
	    title: '已选择的数据中心标签位置'
	    // iconCls: 'icon-grid'
	});
	/** 已有的数据中心标签列表  END */
	
	/** 选择对话框 BEGIN */
	var locationWin = new Ext.Window({
		title : getResource('resourceParam1727') + '',
		width : 500,
		height : 400,
		layout : 'border',
		modal : true,
		items : [dataLabelLocation.grid, dataLabelLocation.treepanel],
		buttons : [{
			text : getResource('resourceParam479') + '',
			handler : function() {
				var insid_s = '';
				var centerid_s = '';
				store.each(function(record){
					insid_s += (record.get('dataEntityCategoryTag') + ',');
					centerid_s += (record.get('dataEntityCategoryTagCenterID') + ',');
				});
				
				callback(insid_s, centerid_s);
				
				locationWin.close();
				dataLabelLocation.firstLoad = true;
			}
		}, {
			text : getResource('resourceParam7007') + '', // 取消
			handler : function() {
				locationWin.close();
				dataLabelLocation.firstLoad = true;
			}
		}]
	});
	/** 选择对话框 END */
	
	locationWin.show();
}

function removeRowByIndex(index){
	dataLabelLocation.grid.getStore().removeAt(index);
	dataLabelLocation.grid.getView().refresh();
}