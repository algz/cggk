Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var roleAddprivtree = {
	columnTree : null,
	nodePath : null,
	issueDialog : null,
	rolegrid : null,
	panel : null,
	roleform : null,
	gridpanel : null,
	formpanel : null,
	baseargs : null,
	roleid : null,
	grid : null
};
// 角色管理权限面板具体实现
roleAddprivtree.getdialog = function(roleid) {
	roleAddprivtree.rolegrid = roleid;
	var record = Ext.data.Record.create([{
				name : 'privilegename'
			}, {
				name : 'parent'
			}, {
				name : 'leaf'
			}, {
				name : 'id'
			}, {
				name : 'description'
			}, {
				name : 'permitted',
				type : 'bool'
			}, {
				name : 'refused',
				type : 'bool'
			}])
	// 允许复选框
	roleAddprivtree.permmissionCheckColumn = new Ext.grid.CheckColumn({
				header : "" + getResource('resourceParam482') + "",
				dataIndex : 'permitted',
				align : 'center',
				width : 60
			});
	// 拒绝复选框
	roleAddprivtree.refuseCheckColumn = new Ext.grid.CheckColumn({
				header : "" + getResource('resourceParam583') + "",
				dataIndex : 'refused',
				align : 'center',
				width : 60
			});
	this.proxy = new Ext.data.HttpProxy({
				method : 'POST',
				url : '../JSON/base_role_rolePrivSerivce.queryPrivilegeTree'
			});
	var store = new Ext.ux.maximgb.tg.sysEditTreeGridStore({
				autoLoad : true,
				proxy : this.proxy,
				// baseParams : {
				// ids:roleAddprivtree.rolegrid
				// },
				reader : new Ext.data.JsonReader({
							// id : '_id',
							id : 'id',
							root : 'results',
							totalProperty : 'totalProperty'
						}, record)

			});
	store.on('beforeload', function(store, options) {
		if (roleAddprivtree.rolegrid == "" || roleAddprivtree.rolegrid == null) {
			options.params = Ext.apply(options.params, {
						roleid : null
					});

		} else {
			options.params = Ext.apply(options.params, {
						roleid : roleAddprivtree.rolegrid
					});
		}
	});
	// 展示的表头以及关联的字段
	var columnModel = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [
			{
				id : 'privilegename',
				header : '' + getResource('resourceParam674') + '',
				width : 140,
				dataIndex : 'privilegename',
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					var name = '';
					if (value.length > 45) {
						for (i = 0; i < value.length; i = i + 45) {
							name = name + value.substring(i, i + 45) + ' ';
						}
					} else {
						name = value;
					}
					return '<font ext:qtip="' + name + '">' + value + '</font>';
				}
			}, roleAddprivtree.permmissionCheckColumn,
			roleAddprivtree.refuseCheckColumn, {
				header : getResource('resourceParam467'),// '说明',
				width : 250,
				dataIndex : 'description',
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					var name = '';
					if (value.length > 45) {
						for (i = 0; i < value.length; i = i + 45) {
							name = name + value.substring(i, i + 45) + ' ';
						}
					} else {
						name = value;
					}
					return '<font ext:qtip="' + name + '">' + value + '</font>';
				}
			}]
	});
	// 创建面板
	roleAddprivtree.grid = new Ext.ux.maximgb.tg.sysEditTreeGridPanel({
				id : 'grid',
				store : store,
				master_column_id : 'privilegename',
				cm : columnModel,
				viewConfig : {
					forceFit : true
				},
				stripeRows : true,
				plugins : [roleAddprivtree.permmissionCheckColumn,
						roleAddprivtree.refuseCheckColumn],
				autoExpandeColumn : 'privilegename',
				listeners : {}
			});
	if (roleAddprivtree.rolegrid == "" || roleAddprivtree.rolegrid == null) {
		roleMain.rightPanel.add(roleAddprivtree.grid);
		roleMain.rightPanel.doLayout();
	} else {
		roleMain.rightPanel.remove(roleAddprivtree.grid, false);
		roleMain.rightPanel.add(roleAddprivtree.grid);
		roleMain.rightPanel.doLayout();
	}
	// 加载数据时展开权限树
	store.on('load', function() {
				store.each(function(rec) {
							if (rec.get("leaf") == false) {
								store.expandNode(rec);
							}
						})
			})
	// store.on('expandnode', function(store, rc) {
	// if (rc.get("refused")) {
	// var childrenNodes = store.getNodeChildren(store.getAt(store
	// .indexOf(rc)));
	// for (var i = 0; i < childrenNodes.length; i++) {
	// childrenNodes[i].set('refused', true);
	// childrenNodes[i].set('permitted', false);
	// }
	// }
	// if (rc.get("permitted")) {
	// var childrenNodes = store.getNodeChildren(store.getAt(store
	// .indexOf(rc)));
	// for (var i = 0; i < childrenNodes.length; i++) {
	// childrenNodes[i].set('permitted', true);
	// childrenNodes[i].set('refused', false);
	// }
	// }
	// })
	// 当点击权限树复选框时触发的事件
	roleAddprivtree.grid.on('checkboxclick', function(element, evt, record,
			row, column) {
		if (column == 2) {
			if (record.get('refused') == true) {
				record.set('permitted', false);
			}
			if (record.get('leaf') == false) {
				// var childrenNodes = store.getNodeChildren(store.getAt(row));
				// for (var i = 0; i < childrenNodes.length; i++) {
				// childrenNodes[i].get('isRefused');
				// }
				if (record.get('refused') == true) {
					var childrenNodes = store.getNodeChildren(store.getAt(row));
					for (var i = 0; i < childrenNodes.length; i++) {
						childrenNodes[i].set('refused', true);
						childrenNodes[i].set('permitted', false);
					}
				}
				if (record.get('refused') == false) {
					var childrenNodes = store.getNodeChildren(store.getAt(row));
					for (var i = 0; i < childrenNodes.length; i++) {
						childrenNodes[i].set('refused', false);
					}
				}
			}
		}
		if (column == 1) {
			if (record.get('permitted') == true) {
				record.set('refused', false);
			}
			if (record.get('leaf') == false) {
				if (record.get('permitted') == true) {
					var childrenNodes = store.getNodeChildren(store.getAt(row));
					for (var i = 0; i < childrenNodes.length; i++) {
						childrenNodes[i].set('permitted', true);
						childrenNodes[i].set('refused', false);
					}
				}
				if (record.get('permitted') == false) {
					var childrenNodes = store.getNodeChildren(store.getAt(row));
					for (var i = 0; i < childrenNodes.length; i++) {
						childrenNodes[i].set('permitted', false);
					}
				}
			}
		}
	})
}
// 封装包组件
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
			var column = this.grid.getView().findCellIndex(t);
			var record = this.grid.store.getAt(index);
			record.set(this.dataIndex, !record.data[this.dataIndex]);
			this.grid
					.fireEvent('checkboxclick', this, e, record, index, column);// 定义发送事件
		}
	},

	renderer : function(v, p, record) {
		p.css += ' x-grid3-check-col-td';
		this.value = v;
		return '<div class="x-grid3-check-col' + (v ? '-on' : '')
				+ ' x-grid3-cc-' + this.id + '">&#160;</div>';
	}
};

Ext.example = function() {
	var msgCt;

	function createBox(t, s) {
		return [
				'<div class="msg">',
				'<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>',
				'<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc"><h3>',
				t,
				'</h3>',
				s,
				'</div></div></div>',
				'<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>',
				'</div>'].join('');
	}
	return {
		msg : function(title, format) {
			if (!msgCt) {
				msgCt = Ext.DomHelper.insertFirst(Ext
								.get('dataPrivilegeListpanel'), {
							id : 'msg-div'
						}, true);
			}
			var s = String.format.apply(String, Array.prototype.slice.call(
							arguments, 1));
			var m = Ext.DomHelper.append(msgCt, {
						html : createBox(title, s)
					}, true);
			m.slideIn('t').pause(1.5).ghost("t", {
						remove : true
					});
		},

		init : function() {
			var lb = Ext.get('lib-bar');
			if (lb) {
				lb.show();
			}
		}
	};
}();
