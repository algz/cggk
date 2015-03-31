var dataCompareMain = {
	
}
dataCompareMain.zlineInit = function() {
	var reader = new Ext.data.ArrayReader( {
		fields : [ {
			name : 'index',
			type : 'int'
		}, {
			name : 'name',
			type : 'string'
		}, {
			name : 'state',
			type : 'int'
		}, {
			name : 'color',
			type : 'string'
		}, {
			name : 'data'
		}]
	});
	var data = [
			[
					1,
					'小草',
					1,
					'#ff0000',
					[
							[
									'2007',
									'#4040FF',
									[5, 10, 20, 10, 40, 52, 68, 70, 70, 60, 28,
											48]],
							[
									'2008',
									'#FF00FF',
									[8, 7, 12, 25, 24, 16, 36, 28, 28, 45, 28,
											15]],
							[
									'2009',
									'#8080FF',
									[8, 7, 12, 20, 34, 16, 96, 25, 28, 56, 28,
											95]]]],
			[
					2,
					'大草',
					0,
					'#00ff00',
					[
							[
									'2007',
									'#4040FF',
									[5, 10, 20, 10, 40, 52, 68, 70, 70, 60, 56,
											45]],
							[
									'2008',
									'#FF00FF',
									[1, 20, 3, 2, 10, 12, 8, 10, 28, 45, 28, 21]],
							[
									'2009',
									'#8080FF',
									[8, 7, 12, 20, 24, 16, 36, 28, 28, 45, 76,
											82]]]],
			[
					3,
					'消食片',
					0,
					'#0000ff',
					[
							[
									'2007',
									'#4040FF',
									[5, 10, 26, 10, 40, 52, 64, 70, 70, 60, 28,
											45]],
							[
									'2008',
									'#FF00FF',
									[1, 20, 3, 2, 1, 4, 15, 12, 154, 10, 28, 12]],
							[
									'2009',
									'#8080FF',
									[8, 7, 12, 20, 24, 36, 36, 21, 28, 45, 28,
											45]]]]]

	var ds = new Ext.data.Store( {
		reader : reader,
		data : data
	});
	var line = new Ext.chart.Line( {
		width : 850,
		height : 220,
		ds : ds,
		xLabels : ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月',
				'11月', '12月']
	});
	var panel = new Ext.Panel({
		autoScroll : true,
		height : 250,
//		items : [line],
		layout : 'fit'
	});
	return panel;

}
dataCompareMain.gridInit = function() {
	var lineNum = new Ext.grid.RowNumberer({});
	dataCompareMain.grid = new Ext.grid.EditorGridPanel({
		clicksToEdit : 1,
		autoHeight : true,
		cm : new Ext.grid.ColumnModel({
			defaults: {
		        sortable: false,
		        menuDisabled: true
		    },
			columns : [lineNum, {
					header : 'X轴'+getResource('resourceParam480')+'',
					width : 200,
					dataIndex : 'xName'
				}]
		}),
		listeners : {
			cellclick : function(grid,rowIndex,colIndex,e){
				
				grid.startEditing(rowIndex,colIndex);
				var comboTree = new Ext.ux.ComboBoxTree(grid.getColumnModel().getCellEditor(colIndex,rowIndex).field);
//				alert(comboTree.tree.root);
//				comboTree.tree.root.expand(true);
//				var store = grid.getColumnModel().getCellEditor(colIndex,rowIndex).field.store;
//				store.removeAll();
//				var record = Ext.data.Record.create([{
//					name : 'value',
//					type : 'string'
//				},{
//					name : 'text',
//					type : 'string'
//				}]);
//				var nodeid = grid.getColumnModel().getDataIndex(colIndex);
//				var combo = grid.getColumnModel().getCellEditor(colIndex,rowIndex).field;
//				for(var i=0;i<3;i++){
//					store.add(new record({
//						value : i,
//						text : i+'p'
//					}));
//				}
			}
		}
	});
	var panel = new Ext.Panel({
					region : 'north',
					height : 200,
					autoScroll : true,
					tbar : [{
						text : ''+getResource('resourceParam466')+'比'+getResource('resourceParam474')+'',
						handler : function(){
							var recArray = [{
								name : 'xName',
								type : 'string'
							}];
							var checkedArr = dataCompareMain.dataCompareTree.getChecked();
							for (var i = 0; i < checkedArr.length; i++) {
								recArray.push({
									name : checkedArr[i].id,
									type : 'string'
								});
							}
							var recordDef = Ext.data.Record.create(recArray);
							var record = new recordDef();
							var store = dataCompareMain.grid.getStore();
							record.set('xName','x'+(store.getCount()+1));
//							for (var i = 0; i < checkedArr.length; i++) {
//								record.set(checkedArr[i].id,'asdfsdf');
//							}
							store.add([record]);
						}
					}],	
					items : [dataCompareMain.grid]
				});
	return panel;
}
dataCompareMain.treeInit = function(id, text, categoryid, icon) {
	dataCompareMain.treeRoot = new Ext.tree.AsyncTreeNode({
				id : id,
				text : text,
				expandable : true,
				icon : icon,
				checked : false
			});
	Ext.apply(dataCompareMain.treeRoot.attributes, {
				categoryid : categoryid,
				revision : -1
			});
	dataCompareMain.treeloader = new Ext.tree.TreeLoader({
		url : '../JSON/datacenter_DataCenterRemote.getCategoryEntityTree',
		baseParams : {
			nodeid : ''
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

//				if (checked) {
//
//					node.getUI().addClass('complete');
//					if (node.getDepth() == 1) {
//						node.eachChild(function(n) {
//									n.getUI().checkbox.checked = true;
//									n.attributes.checked = true;
//								});
//
//					}
//				} else {
//
//					node.getUI().removeClass('complete');
//					if (node.getDepth() == 1) {
//						node.eachChild(function(n) {
//									n.getUI().checkbox.checked = false;
//									n.attributes.checked = false;
//								});
//
//					}
//				}
			},
			'click' : function(node){
				if(node.attributes.checked){
					node.getUI().checkbox.checked = false;
					node.attributes.checked = false;
				}else{
					node.getUI().checkbox.checked = true;
					node.attributes.checked = true;
				}
			}
		},
		tbar : ['->',{
			text : ''+getResource('resourceParam503')+'对比列',
			handler : function(){
				var arr = dataCompareMain.dataCompareTree.getChecked();
				var store = new Ext.data.Store();
				var cmArray = [new Ext.grid.RowNumberer({}),{
					header : 'X轴'+getResource('resourceParam480')+'',
					width : 200,
					dataIndex : 'xName'
				}];
				for(var i=0;i<arr.length;i++){
					cmArray.push({
						header : arr[i].text,
						width : 200,
						dataIndex : arr[i].id,
						editor : new Ext.ux.ComboBoxTree({
							width : 200,
							tree : {
								xtype : 'treepanel',
								rootVisible : false,
								loader : new Ext.tree.TreeLoader({
											dataUrl : '../JSON/datacenter_DataCenterRemote.getDataCategoryInstanceTreeWithDatas',
											baseParams : {
												nodeid : ''
											}
										}),
								root : new Ext.tree.AsyncTreeNode({
												id : arr[i].id,
												text : arr[i].text,
												icon : arr[i].icon
											})
							},
							selectNodeModel : 'leaf',
							autoExpand : true
						})
					});
				}
				dataCompareMain.grid.reconfigure(store,new Ext.grid.ColumnModel({
					defaults: {
				        sortable: false,
				        menuDisabled: true
				    },
					columns : cmArray})
				);
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
	dataCompareMain.dataCompareTree.getRootNode().expand(true);
	return dataCompareMain.dataCompareTree;
}
