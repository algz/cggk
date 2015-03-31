var formWin = {
	start : 0,
	limit : 10,
	args : {
		start : 0,
		limit : 10
	}

}
formWin.init = function() {
	var strurl = '../JSON/dataClassification_DataClassificationRemote.getDataClassificationList?name=&type=3';
	var proxy = new Ext.data.HttpProxy({
				url : strurl
			});
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'categoryId'
			}, ['categoryId', 'categoryName', 'type', 'groups', 'description',
					'version', 'icon']);
	var ascid = 'categoryId';
	var ascstr = 'asc';
	var ds = new data.Store(proxy, reader, ascid, ascstr);
	var sm = new Ext.grid.CheckboxSelectionModel({
				listeners : {
					selectionchange : function(sm) {

						// if (sm.getCount() == 0) {
						// Ext.getCmp('addobj').disable();
						// } else {
						// Ext.getCmp('addobj').enable();
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
			header : "" + getResource('resourceParam1769') + "",
			dataIndex : 'categoryName',
			width : 100
		}, {
			header : "" + getResource('resourceParam648') + "",
			dataIndex : 'description',
			width : 200
		}]
	});
	var tb = null;
	formWin.grid = formWin.gridinit(ds, cm, sm);
	myGrid.loadvalue(formWin.grid.store, formWin.args, formWin.baseargs);
	var min = new Ext.form.NumberField({
				fieldLabel : '' + getResource('resourceParam1764') + '',
				anchor : '95%',
				labelAlign : 'right',
				labelWidth : 20,
				width : 200,
				minValue : 0

			})
	var max = new Ext.form.TextField({
				fieldLabel : '' + getResource('resourceParam1765') + '',
				anchor : '95%',
				labelAlign : 'top',
				labelWidth : 20,
				emptyText : '' + getResource('resourceParam1766') + '',
				width : 200,
				minValue : 0,
				regex : /(^[0-9]+$)|(^[N,n]$)/,
				// /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
				regexText : '' + getResource('resourceParam1761') + '!'
			});
	var panel = new Ext.FormPanel({
				height : 0,
				width : 450,
				frame : true,

				items : [{
							layout : 'column',
							items : [{
										layout : 'form',
										columnWidth : .5,
										items : [min]
									}, {
										layout : 'form',
										columnWidth : .5,
										items : [max]
									}

							]
						}]
			});
	var label = new Ext.form.Label({
				text : '' + getResource('resourceParam1769') + ':'// 表单名称
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
								type : 3
							});

				});

				myGrid.loadvalue(ds, {
							start : 0,
							limit : 25
						}, formWin.baseargs);
			}
		}
	});
	formWin.checkWin = new Ext.Window({
		width : 450,
		height : 350,
		title : '' + getResource('resourceParam1762') + '',
		modal : true,
		// layout : ',
		tbar : ['->', label, name, query],
		items : [formWin.grid, panel],
		buttons : [{
			id : 'addobj',
			// disabled:true,
			text : '' + getResource('resourceParam479') + '',
			listeners : {
				'click' : function(button) {
					button.disable();
					var count = sm.getCount();
					if (count == 0) {
						Ext.example
								.msg('' + getResource('resourceParam596') + '',
										'' + getResource('resourceParam1763')
												+ '');
						button.enable();
						return;
					}
					var records = sm.getSelections();
					var record;

					var idSequence = '';
					for (var i = 0; i < count; i++) {

						record = records[i];
						var minvalue = "0";
						var maxvalue = "0"
						var showvalue = "";
						if ("" != min.getValue()) {
							minvalue = min.getValue();
						}

						if ("" != max.getValue() && "N" != max.getValue()
								&& "n" != max.getValue()) {
							maxvalue = max.getValue();
							showvalue = max.getValue();
							if ("" != minvalue) {
								if (parseInt(maxvalue) < parseInt(minvalue)) {
									Ext.MessageBox.show({
										title : ''
												+ getResource('resourceParam1724')
												+ '',
										msg : ''
												+ getResource('resourceParam1768')
												+ ' 不能小于 '
												+ getResource('resourceParam1767')
												+ '！',
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.ERROR
									})
									button.enable();
									return;

								}
							}
						}
						if ("N" == max.getValue() || "n" == max.getValue()) {
							maxvalue = "0";
							showvalue = "N";
						}

						var iconpath = "";
						if ("" == record.get("icon")) {
							iconpath = "../base/icons/edm/dataObject.png";
						} else {
							iconpath = '../base/icons/edm/'
									+ record.get("icon");
						}
						var treeNode = new Ext.tree.TreeNode({

									id : record.get('categoryId'),
									text : record.get('categoryName') + "("
											+ minvalue + '-' + showvalue + ')',
									leaf : false,
									expandable : true,
									icon : iconpath

								});
						Ext.apply(treeNode.attributes, {
									type : '3'
								});

						idSequence += record.get('categoryId') + ',';
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
								+ minvalue
								+ "-"
								+ maxvalue
								+ "&a=" + new Date().getTime();
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
					dataObjectAttribute.appendCategory(null, null);
					button.enable();
					formWin.checkWin.close();
				}
			}
		},{
			text:'取消',handler:function(){
			formWin.checkWin.close();
		}
	}]
	});

	formWin.checkWin.show();
	formWin.checkWin.on("close", function() {
				formWin.checkWin.destroy();
			});

}

formWin.gridinit = function(ds, cm, sm, plugin) {
	var grid = new Ext.grid.EditorGridPanel({ // 新建一个GridPanel对象

		// region:'center', //面板位置
		// id:'topic-grid',
		autoScroll : true,
		store : ds, // 绑定数据源
		cm : cm, // 设置列模板
		sm : sm,
		height : 257,
		trackMouseOver : true, // 鼠标放到行上是否有痕迹
		loadMask : {
			msg : '' + getResource('resourceParam579') + ''
		},
		viewConfig : {
			forceFit : true,
			enableRowBody : true,
			showPreview : true
		},
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
