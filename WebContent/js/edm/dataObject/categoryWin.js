var categoryWin = {
	start : 0,
	limit : 10,
	args : {
		start : 0,
		limit : 10
	},
	baseargs : {

	}

}
categoryWin.init = function() {
	var strurl = '../JSON/dataClassification_DataClassificationRemote.getDataClassificationList?name=&type=2';
	var proxy = new Ext.data.HttpProxy({
				url : strurl
			});
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'categoryId'
			}, ['categoryId', 'categoryName', 'type', 'groups', 'description',
					'version']);
	var ascid = 'categoryId';
	var ascstr = 'asc';
	var ds = new data.Store(proxy, reader, ascid, ascstr);
	var sm = new Ext.grid.CheckboxSelectionModel({
				listeners : {
					selectionchange : function(sm) {

						// if (sm.getCount() == 0) {
						// Ext.getCmp('addcategory').disable();
						// } else {
						// Ext.getCmp('addcategory').enable();
						// }

					},
					rowselect : function(sm, rowIndex, record) {
						if (sm.getCount() == 1) {
							// dataClassificationAttribute.categoryName
							// .setValue(record.get("categoryName"));
							// dataClassificationAttribute.categoryId
							// .setValue(record.get("categoryId"));
							// dataClassificationAttribute.dateTypeTree.enable();
							// dataClassificationAttribute.treeloader.baseParams
							// = {
							// id : dataClassificationAttribute.categoryId
							// .getValue()
							// }
							// dataClassificationAttribute.dateTypeTree
							// .getRootNode().reload();
							// dataClassificationAttribute.dateTypeTree
							// .getRootNode().expand(true);

						} else {
						}
					}
				}

			});

	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [sm, new Ext.grid.RowNumberer(), {
			header : "标签" + getResource('resourceParam480') + "",
			dataIndex : 'categoryName',
			width : 100
		}, {
			header : "" + getResource('resourceParam648') + "",
			dataIndex : 'description',
			width : 200
		}]
	});
	var tb = null;
	categoryWin.grid = categoryWin.gridinit(ds, cm, tb, sm);
	myGrid.loadvalue(categoryWin.grid.store, categoryWin.args,
			categoryWin.baseargs);
	var label = new Ext.form.Label({
				text : '' + getResource('resourceParam7013') + ':'// 标签名称
			})
	var name = new Ext.form.TextField({});
	var query = new Ext.Button({
		text : '' + getResource('resourceParam652') + '',// 查询
		listeners : {
			'click' : function() {
				ds.on('beforeload', function(store, options) {
					this.proxy = new Ext.data.HttpProxy({
						method : 'POST',
						url : '../JSON/dataClassification_DataClassificationRemote.getDataClassificationList'
					})

					options.params = Ext.apply(options.params, {
								name : name.getValue(),
								type : 2
							});

				});

				myGrid.loadvalue(ds, {
							start : 0,
							limit : 25
						}, categoryWin.baseargs);
			}
		}
	});
	categoryWin.checkWin = new Ext.Window({
		width : 450,
		height : 350,
		title : '' + getResource('resourceParam503') + ''
				+ getResource('resourceParam474') + '标签',
		modal : true,
		layout : 'fit',
		tbar : ['->', label, name, query],
		items : [categoryWin.grid],
		buttons : [{
			id : 'addcategory',
			// disabled:true,
			text : '' + getResource('resourceParam479') + '',
			listeners : {
				'click' : function(button) {
					button.disable();
					var sm = categoryWin.grid.getSelectionModel();
					var count = sm.getCount();
					if (count == 0) {
						Ext.example.msg('' + getResource('resourceParam596')
										+ '', ''
										+ getResource('resourceParam1071')
										+ '标签！');
						button.enable();
						return;
					}
					var records = sm.getSelections();
					var record;

					var idSequence = '';
					for (var i = 0; i < count; i++) {

						record = records[i];
						var treeNode = new Ext.tree.AsyncTreeNode({
									id : record.get('categoryId'),
									text : record.get('categoryName'),
									leaf : true

								});
						Ext.apply(treeNode.attributes, {
									type : '2',
									icon : '../base/icons/edm/dataCategory.png'
								});

						var childNodes = dataObjectAttribute.attributeTree
								.getRootNode().childNodes;
						var exist = false;
						for (var x = 0; x < childNodes.length; x++) {
							if (childNodes[x].id.substring(0, childNodes[x].id
											.indexOf(',')) == record
									.get('categoryId')) {
								exist = true;
								Ext.example.msg(
										'' + getResource('resourceParam596')
												+ '', record
												.get('categoryName')
												+ '已存在！');
								break;
							}

						}
						if (exist) {
							continue;
						}
						var conn = synchronize.createXhrObject();
						var url = "../JSON/dataobject_DataObjectRemote.addDateCategoryMetaStruct?categoryId="
								+ record.get('categoryId')
								+ "&parentcategoryid="
								+ dataObjectAttribute.currentId
								+ "&multiplicity="
								+ "&a="
								+ new Date().getTime();
						conn.open("GET", url, false);
						conn.send(null);
						var respText = conn.responseText;
						var obj = Ext.util.JSON.decode(respText);
						if (obj.success == true) {
							// dataObjectAttribute.appendCategory(
							// dataObjectAttribute.currentId, treeNode);
						} else {
							Ext.MessageBox.show({
								title : '' + getResource('resourceParam1724')
										+ '',
								msg : '' + getResource('resourceParam651') + '',
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.ERROR
							});
							break;

						}

					}
					// myGrid.loadvalue(dataObjectList.grid.store,
					// dataObjectDel.args, dataObjectDel.baseargs);
					dataObjectAttribute.appendCategory(null, null);
					button.enable();
					categoryWin.checkWin.close();
				}
			}
		},{
			text:'取消',handler:function(){
			     categoryWin.checkWin.close();
			}
		}]
	});

	categoryWin.checkWin.show();
	categoryWin.checkWin.on("close", function() {
				categoryWin.checkWin.destroy();
			});

}

categoryWin.gridinit = function(ds, cm, tb, sm, plugin) {

	cm.defaultSortable = true; // 设定能进行排序

	var grid = new Ext.grid.EditorGridPanel({ // 新建一个GridPanel对象

		// region:'center', //面板位置
		// id:'topic-grid',
		store : ds, // 绑定数据源
		cm : cm, // 设置列模板
		sm : sm,
		trackMouseOver : true, // 鼠标放到行上是否有痕迹
		loadMask : {
			msg : '' + getResource('resourceParam579') + ''
		},
		viewConfig : {
			forceFit : true,
			enableRowBody : true,
			showPreview : true
		},
		tbar : tb,
		stripeRows : true, // 相邻行的颜色是否有差别
		// plugins:checkEditable,
		clicksToEdit : 1, // 设置插件
		bbar : new Ext.PagingToolbar({ // 定义下方工作面板
			pageSize : 10,
			store : ds,
			displayInfo : true,
			displayMsg : '' + getResource('resourceParam946') + '{0} - {1} '
					+ getResource('resourceParam949') + ' {2} 行',
			emptyMsg : "" + getResource('resourceParam945') + ""
		})
	})
	// 定义grid的rowclick事件
	grid.on('rowclick', function(grid, rowIndex, e) {
				myGrid.row = ds.data.items[rowIndex]; // 得到选中行的对象
			});
	grid.on('beforedestroy', function(e) {
				e.store.removeAll();
			});
	// grid.on('afteredit',function(e){
	// var r=e.record;
	// if(r.get("taskid")!=null || r.get("taskid").length<=0)
	// {
	// var appVo =
	// Seam.Remoting.createType("com.luck.itumserv.tasklist.TaskVo");
	// appVo.setTaskid(r.get("taskid"));
	// appVo.setCompletedamount(r.get("completedamount"));
	// callSeam("tasklist_taskService", "updateCompletedamount",
	// [appVo],updateDetail);
	// }
	//    	
	// });
	return grid;

};
