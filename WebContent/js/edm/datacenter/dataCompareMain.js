var dataCompareMain = {
	
}
dataCompareMain.gridInit = function() {
	var record = Ext.data.Record.create([{
				name : 'objectName',
				type : 'string'
			}, {
				name : 'categoryInstanceId',
				type : 'string'
			}, {
				name : 'version',
				type : 'string'
			}, {
				name : 'revision',
				type : 'string'
			}]);
	var store = new Ext.data.ArrayStore({
		autoDestroy: true,
	    storeId: 'myStore',
	    idIndex: 0,  
	    fields: [
	       {name: 'objectName', type: 'string'},
	       {name: 'categoryInstanceId', type: 'string'},
	       {name: 'version', type: 'string'},
	       {name: 'revision', type: 'string'}
	    ]
	});
	var lineNum = new Ext.grid.RowNumberer({});
	var sm = new Ext.grid.CheckboxSelectionModel({});
	dataCompareMain.initUpGrid = new Ext.grid.EditorGridPanel({
		border : false,
		height : 140,
		store : store,
		sm : sm,
		cm : new Ext.grid.ColumnModel({
			defaults: {
		        sortable: false,
		        menuDisabled: true
		    },
			columns : [lineNum,sm,{
				header : '对象名',
				width : 300,
				dataIndex : 'objectName'
			},{
				header : '版本',
				width : 300,
				dataIndex : 'version',
				editor : new Ext.form.ComboBox({
					fieldLabel : '版本',
					store : new Ext.data.JsonStore({
						url : '../JSON/datacenter_DataCenterRemote.getAllVersionsByCategoryInstanceId',
						method : 'POST',
						root : 'results',
						fields : [{
									name : 'version',
									mapping : 'version'
								}, {
									name : 'revision',
									mapping : 'revision'
								}],
						baseParams : {
							categoryInstanceID : id
						}
					}),
					triggerAction : 'all',
					valueField : 'revision',
					displayField : 'version',
					editable : false,
					lazyRender : true,
					onSelect : function(record, index) {
						if (this.fireEvent('beforeselect', this, record,
								index) !== false) {
							var value = record.data[this.valueField
									|| this.displayField];
							this.setValue(value);
							this.collapse();
							this.fireEvent('select', this, record, index);
						}
						grid.getSelectNodes()[0].set('dataEntityType',
								record.get("datatypeId"));
						grid.getSelectNodes()[0].set('isRef', record
										.get("rank"));
						grid.getSelectNodes()[0].set('realIsRef', record
										.get("rank"));
						grid.getSelectNodes()[0].set('extendsTypeRealName',
								record.get('dataType'));
						grid.getSelectNodes()[0].set('value', "");
	
					}
				})
			},{
				header : '别名',
				dataIndex : 'nickName'
			}]
		})
	});
	
	dataCompareMain.initDownTabPanel = new Ext.TabPanel({
		border : false,
		activeTab : 0,
		items : [new Ext.tree.TreePanel({
			id : 'initDownTree',
			title : '默认比较数据',
			border : false,
			rootVisible : true,
			useArrows : false,
			autoScroll : true,
			autoShow : true,
			animate : true,
			enableDD : false,
			frame : false,
			root : new Ext.tree.AsyncTreeNode({
				id : 'root',
				text : '方案对比',
				expanded: true,
				expandable : true,
//				iconCls : '',
//				icon : '../base/icons/p2m/dataCenter.png',
				checked : false,
				children : [{
				        id: 1,
				        text: '数据',
				        checked : false,
				        leaf: true
				    },{
				        id: 2,
				        text: '曲线',
				        checked : false,
				        leaf: true
				   }]
				})
			})
		]
	});
	var panel = new Ext.Panel({
		autoScroll : true,
		border : false,
		items : [dataCompareMain.initUpGrid,dataCompareMain.initDownTabPanel],
		buttons : [{
			text : '自定义比较数据......'
		},{
			text : '下一步'
		},{
			text : '返回',
			handler : function(){
				Ext.getCmp('comparePanel').hide();
				dataCateList.grid.show();
			}
		}]
	});
	return panel;
}
dataCompareMain.treeInit = function() {
	dataCompareMain.treeRoot = new Ext.tree.AsyncTreeNode({
				id : 'root',
				text : ''+getResource('resourceParam561')+'',//数据中心
				expandable : true,
				iconCls : '',
				icon : '../base/icons/p2m/dataCenter.png'//,
//				checked : false
			});
	Ext.apply(dataCompareMain.treeRoot.attributes, {
				type : '',
				name : '',
				parentId : '',
				dataEntityType : '',
				isRef : '',
				customTypeParentId : '',
				customTypeItemId : '',
				dcategoryInstanceId : '',
				dataCenterId : '',
				inout : '',
				currentVersion : '',
				revision : ''
			});
	dataCompareMain.treeloader = new Ext.tree.TreeLoader({
		url : '../JSON/datacenter_DataCenterRemote.getCategoryEntityTree',
		baseParams : {
			node : ''
		}
	})
	dataCompareMain.dataCompareTree = new Ext.tree.TreePanel({
		id : 'dataCompareTree',
		border : false,
		rootVisible : true,
		useArrows : false,
		autoScroll : true,
		autoShow : true,
		animate : true,
		enableDD : false,
		frame : false,
		root : dataCompareMain.treeRoot,
		loader : dataCompareMain.treeloader,

		listeners : {
			'checkchange' : function(node, checked) {
			},
			'click' : function(node){
				if(node==dataCompareMain.treeRoot){
					return false;
				}
				if(node.attributes.checked){
					node.getUI().checkbox.checked = false;
					node.attributes.checked = false;
				}else{
					node.getUI().checkbox.checked = true;
					node.attributes.checked = true;
				}
			},
			'beforeload' : function(node){
				dataCompareMain.treeloader.baseParams = Ext.apply(dataCompareMain.treeloader.baseParams,{
					node : node.id,
					type : node.attributes.type,
					parentId : node.attributes.parentId,
					dataEntityType : node.attributes.dataEntityType,
					dataCenterId : node.attributes.dataCenterId,
					isRef : node.attributes.isRef,
					customTypeParentId : node.attributes.customTypeParentId,
					customTypeItemId : node.attributes.customTypeItemId,
					dcategoryInstanceId : node.attributes.dcategoryInstanceId,
					inout : node.attributes.inout,
					currentVersion : node.attributes.currentVersion,
					revision : node.attributes.revision
				});
			}
		},
		tbar : ['->',{
			text : '选择对比数据',
			handler : function(){
				var arr = dataCompareMain.dataCompareTree.getChecked();
				var store = dataCompareMain.initUpGrid.getStore();
				var r = store.recordType;
				for(var i=0;i<arr.length;i++){
					store.add(new r({'objectName':arr[i].text,'categoryInstanceId':arr[i].id,'version':'A.0','revision':arr[i].attributes.revision}));
				}
			}
		}]
	});
	dataCompareMain.treeContextMenu = new Ext.menu.Menu();
	dataCompareMain.dataCompareTree.on('contextmenu',function(node,event){
		event.preventDefault();
		node.select();
		var vo = Seam.Component.newInstance("CategoryInstance");
		vo.setCategoryInstanceID(node.id);
		Seam.Component.getInstance("datacenter_DataCenterRemote")
					.getAllVersionsByCategoryInstanceId(vo,function(result){
			var list = Ext.util.JSON.decode(result);
			dataCompareMain.treeContextMenu.removeAll();
			for(var i=0;i<list.length;i++){
				dataCompareMain.treeContextMenu.addItem(new Ext.menu.Item({
					revision : list[i].fixedRevision,
					text : list[i].categoryInstanceName+'/'+list[i].version,
					handler : function(){
						node.setText(this.text);
						node.attributes.revision = this.revision;
					}
				}));
			}
			if(list.length>0){
				var firstItem = dataCompareMain.treeContextMenu.get(0);
				var tempText = firstItem.text;
				firstItem.setText(''+getResource('resourceParam1732')+'');
				firstItem.setHandler(function(){
					node.setText(tempText);
					node.attributes.revision = list[0].fixedRevision;
				});
			}
			dataCompareMain.treeContextMenu.show(node.ui.getAnchor());
		});
	});
//	dataCompareMain.dataCompareTree.getRootNode().expand(true);
	return dataCompareMain.dataCompareTree;
}
