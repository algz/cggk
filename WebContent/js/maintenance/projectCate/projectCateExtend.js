var cateGoryExtend = {};

cateGoryExtend.init = function() {
	Ext.grid.CheckboxSelectionModel.prototype.header='<div id="hd-joe" class="x-grid3-hd-checker">&#160;</div>';
	var strurl = '../JSON/maintenance_ProjectCateGory_ProjectCateGoryRemote.getExtentAttribute';
	var proxy = new Ext.data.HttpProxy({
				url : strurl
			});
	var reader = new Ext.data.JsonReader({
				root : 'root',
				totalProperty : 'totalProperty'
			}, ['name', 'category', 'categoryid', 'compulsory', 'dataObjectId']);
	var ds = new data.Store(proxy, reader, null, null);

	var sm = new Ext.grid.CheckboxSelectionModel({
				listeners : {
					selectionchange : function(sm) {
						if (ds.getCount() == sm.getCount()) {

							Ext.fly(Ext.get('hd-joe').dom.parentNode)
									.addClass('x-grid3-hd-checker-on');
						} else {
							Ext.fly(Ext.get('hd-joe').dom.parentNode)
									.removeClass('x-grid3-hd-checker-on');
						}
						if (sm.getCount()) {
							Ext.getCmp('deleteProjectCate').enable();
						} else {
							Ext.getCmp('deleteProjectCate').disable();
						}
						if (sm.getCount() == 1) {
							Ext.getCmp('updateProjectCate').enable();
							Ext.getCmp('moveUpProjectCate').enable();
							Ext.getCmp('moveDownProjectCate').enable();
						} else {
							Ext.getCmp('updateProjectCate').disable();
							Ext.getCmp('moveUpProjectCate').disable();
							Ext.getCmp('moveDownProjectCate').disable();
						}
					},
					rowselect : function(model, rowIndex, record) {
						// 选中时传入扩展属性的id
						cateGoryMain.dataObjectId = record.data.dataObjectId;
						cateGoryMain.rowIndex = rowIndex;
					}
				}

			});
	var checkColumn = new Ext.grid.CheckColumn({
				header : ""+getResource('resourceParam512')+""+getResource('resourceParam510')+""+getResource('resourceParam7070')+"",
				dataIndex : 'compulsory',
				width : 55
			});

	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [sm, {
			header : ''+getResource('resourceParam1784')+'',
			dataIndex : 'name',
			width : 80
		}, {
			header : ""+getResource('resourceParam481')+"",
			dataIndex : 'category',
			width : 100
		}, checkColumn/**, {
			header : getResource('resourceParam5001')+'ID',
			dataIndex : 'dataObjectId',
			width : 100,
			hidden : true
		}*/]
	});
	cateGoryExtend.grid = myGrid.initNoPaging(ds, cm, null, sm, checkColumn);
	cateGoryExtend.grid.on('checkboxclick', function(element, evt, record) {
		Ext.Ajax.request({
			url : '../JSON/maintenance_ProjectCateGory_ProjectCateGoryRemote.updateAttribute',
			method : 'POST',
			success : function(response, options) {
				var obj = Ext.util.JSON.decode(response.responseText);
				if (obj.success == true) {
					record.commit();
				} else {
					Ext.MessageBox.show({
								title : ''+getResource('resourceParam499')+'',
								msg : ''+getResource('resourceParam9063')+''+getResource('resourceParam512')+''+getResource('resourceParam510')+'必添失败，请再试！',
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.ERROR
							});
				}

			},
			disableCaching : true,
			autoAbort : true,
			params : {
				name : record.get('name'),
				category : record.get('categoryid'),
				compulsory : record.get('compulsory'),
				dataObjectId : record.get('dataObjectId')
			}
		});

	});

	cateGoryExtend.main = new Ext.Panel({
		border : false,
		layout : 'fit', // 布局模式
		items : [cateGoryExtend.grid],
		tbar : [{
					text : ''+getResource('resourceParam477')+'',
					listeners : {
						click : function() {
							cateGoryExtendAdd.init();
						}

					}
				}, '-', {
					text : ''+getResource('resourceParam478')+'',
					id : 'updateProjectCate',
					disabled : true,
					listeners : {
						click : function() {
							cateGoryExtendUpdate.init();
						}

					}
				}, '-', {
					text : ''+getResource('resourceParam475')+'',
					id : 'deleteProjectCate',
					disabled : true,
					listeners : {
						click : function() {
							var count = sm.getCount();
							var records = sm.getSelections();
							var record;

							var idSequence = '';
							for (var i = 0; i < count; i++) {
								record = records[i];
								idSequence += record.get('dataObjectId') + '#';
							}
							Ext.Msg.confirm(''+getResource('resourceParam575')+'', ""+getResource('resourceParam1720')+"?", function(btn) {
								if (btn == 'yes') {
									Ext.Ajax.request({
										url : '../JSON/maintenance_ProjectCateGory_ProjectCateGoryRemote.deleteAttribute',
										method : 'POST',
										success : function(response, options) {
											var obj = Ext.util.JSON
													.decode(response.responseText);
											if (obj.success == true) {
												myGrid
														.loadvalue(
																cateGoryExtend.grid.store,
																cateGoryMain.args,
																cateGoryMain.baseargs);
												ds.on('load', function(store) {
													if (Ext
															.fly(Ext
																	.get('hd-joe').dom.parentNode)
															.hasClass('x-grid3-hd-checker-on')) {
														Ext
																.fly(Ext
																		.get('hd-joe').dom.parentNode)
																.removeClass('x-grid3-hd-checker-on');
													}
												})

											} else {
												Ext.Msg.alert(""+getResource('resourceParam575')+"",
														""+getResource('resourceParam1783')+"");
											}
										},
										disableCaching : true,
										autoAbort : true,
										params : {
											dataObjectId : idSequence
										}
									});
								}
							});
						}
					}
				}, '-', {
					text : ''+getResource('resourceParam488')+'',
					id : 'moveUpProjectCate',
					disabled : true,
					listeners : {
						click : function() {
							Ext.Ajax.request({
								url : '../JSON/maintenance_ProjectCateGory_ProjectCateGoryRemote.moveUpAttribute',
								method : 'POST',
								success : function(response, options) {
									var obj = Ext.util.JSON
											.decode(response.responseText);
									if (obj.success == true) {
										var record = sm.getSelected();
										ds.remove(record);
										ds.insert(cateGoryMain.rowIndex - 1,
												record);
										sm.selectRow(cateGoryMain.rowIndex - 1);
									} else if (obj.success == false) {
										Ext.Msg.alert(""+getResource('resourceParam575')+"", obj.message);
									} else {
										Ext.Msg.alert(""+getResource('resourceParam575')+"", obj.message);
									}
								},
								disableCaching : true,
								autoAbort : true,
								params : {
									dataObjectId : cateGoryMain.dataObjectId
								}
							});

						}

					}
				}, '-', {
					text : ''+getResource('resourceParam489')+'',
					id : 'moveDownProjectCate',
					disabled : true,
					listeners : {
						click : function() {
							Ext.Ajax.request({
								url : '../JSON/maintenance_ProjectCateGory_ProjectCateGoryRemote.moveDownAttribute',
								method : 'POST',
								success : function(response, options) {
									var obj = Ext.util.JSON
											.decode(response.responseText);
									if (obj.success == true) {
										var record = sm.getSelected();
										ds.remove(record);
										ds.insert(cateGoryMain.rowIndex + 1,
												record);
										sm.selectRow(cateGoryMain.rowIndex + 1);
									} else if (obj.success == false) {
										Ext.Msg.alert(""+getResource('resourceParam575')+"", obj.message);
									} else {
										Ext.Msg.alert(""+getResource('resourceParam575')+"", obj.message);
									}
								},
								disableCaching : true,
								autoAbort : true,
								params : {
									dataObjectId : cateGoryMain.dataObjectId
								}
							});
						}

					}
				}]
	});

	return cateGoryExtend.main;
}
Ext.grid.CheckColumn = function(config) {
	Ext.apply(this, config);
	if (!this.id) {
		this.id = Ext.id();
	}
	this.renderer = this.renderer.createDelegate(this);
};

Ext.grid.CheckColumn.prototype = {
	init : function(grid) {
		this.grid = grid;
		this.grid.on('render', function() {
					var view = this.grid.getView();
					view.mainBody.on('mousedown', this.onMouseDown, this);
				}, this);
	},

	onMouseDown : function(e, t) {
		if (t.className && t.className.indexOf('x-grid3-cc-' + this.id) != -1) {
			e.stopEvent();
			var index = this.grid.getView().findRowIndex(t);
			var record = this.grid.store.getAt(index);
			record.set(this.dataIndex, !record.data[this.dataIndex]);
			this.grid.fireEvent('checkboxclick', this, e, record);// 定义发送事件
		}
	},

	renderer : function(v, p, record) {
		p.css += ' x-grid3-check-col-td';
		return '<div class="x-grid3-check-col' + (v ? '-on' : '')
				+ ' x-grid3-cc-' + this.id + '">&#160;</div>';
	}
};
