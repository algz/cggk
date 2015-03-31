Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var userAddprivtree = {
	columnTree : null,
	nodePath : null,
	issueDialog : null,
	usergrid : null,
	panel : null,
	userform : null,
	gridpanel : null,
	formpanel : null,
	baseargs : null,
	userid : null
};
userAddprivtree.getdialog = function(ids) {
	userAddprivtree.usergrid = ids;
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
				name : 'permitted'
			}, {
				name : 'refused'
			}])
	userAddprivtree.permmissionCheckColumn = new Ext.grid.CheckColumn({
				header : "" + getResource('resourceParam482') + "",
				dataIndex : 'permitted',
				align : 'center',
				width : 50
			});
	userAddprivtree.refuseCheckColumn = new Ext.grid.CheckColumn({
				header : "" + getResource('resourceParam583') + "",
				dataIndex : 'refused',
				align : 'center',
				width : 50
			});
	this.proxy = new Ext.data.HttpProxy({
				method : 'POST',
				url : '../JSON/base_user_UserSerivce.queryPrivilegeTree'
			});
	var store = new Ext.ux.maximgb.tg.sysEditTreeGridStore({
				autoLoad : true,
				proxy : this.proxy,
				// baseParams : {
				// ids:userAddprivtree.usergrid
				// },
				reader : new Ext.data.JsonReader({
							// id : '_id',
							id : 'id',
							root : 'results',
							totalProperty : 'totalProperty'
						}, record)

			});
	store.on('beforeload', function(store, options) {
		var conditions = '';
					var count = 0;
					for (i = 0; i < userAddprivtree.usergrid.length; i++) {
						count++;
						conditions += userAddprivtree.usergrid[i] + ',';
					}
					conditions = conditions.substring(0, conditions.length - 1);
					options.params = Ext.apply(options.params, {
								ids : conditions
							});
			});
	var columnModel = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [{
			id : 'privilegename',
			header : '' + getResource('resourceParam674') + '',
			width : 150,
			dataIndex : 'privilegename'
		}, userAddprivtree.permmissionCheckColumn,
		userAddprivtree.refuseCheckColumn, {
			header : getResource('resourceParam467'),//'说明',
			width : 150,
			dataIndex : 'description'
		}]
	});
	var grid = new Ext.ux.maximgb.tg.sysEditTreeGridPanel({
				store : store,
				master_column_id : 'privilegename',
				cm : columnModel,
				stripeRows : true,
				viewConfig : {
					forceFit : true
				},
				plugins : [userAddprivtree.permmissionCheckColumn,
						userAddprivtree.refuseCheckColumn],
				autoExpandeColumn : 'privilegename',
				listeners : {}
			});
	userAddprivtree.panel = new Ext.Panel({
				region : 'center',
				layout : 'fit',
				// autoScroll : true,
				items : [grid]
			});
	store.on('load', function() {
				store.each(function(rec) {
							if (rec.get("leaf") == false) {
								store.expandNode(rec);
							}
						})
			})
//	grid.store.on('beforeexpandnode', function(store, rc) {
//		store.on('beforeload', function(store, options) {
//					var conditions = '';
//					var count = 0;
//					for (i = 0; i < userAddprivtree.usergrid.length; i++) {
//						count++;
//						conditions += userAddprivtree.usergrid[i] + ',';
//					}
//					conditions = conditions.substring(0, conditions.length - 1);
//					options.params = Ext.apply(options.params, {
//								parentName : rc.get("privilegename"),
//								ids : conditions
//							});
//				});
//	})

	store.on('expandnode', function(store, rc) {
				if (rc.get("refused")) {
					var childrenNodes = store.getNodeChildren(store.getAt(store
							.indexOf(rc)));
					for (var i = 0; i < childrenNodes.length; i++) {
						childrenNodes[i].set('refused', true);
						childrenNodes[i].set('permitted', false);
					}
				}
				if (rc.get("permitted")) {
					var childrenNodes = store.getNodeChildren(store.getAt(store
							.indexOf(rc)));
					for (var i = 0; i < childrenNodes.length; i++) {
						childrenNodes[i].set('permitted', true);
						childrenNodes[i].set('refused', false);
					}
				}
			})

	grid.on('checkboxclick', function(element, evt, record, row, column) {
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
	if (!userAddprivtree.userAddprivdialog) {
		tlework.addHtml(tlework.divHtml, 'userAddprivdialog'); // 动态生成需要绑定的div
		userAddprivtree.userAddprivdialog = new Ext.Window({ // 创建对话框
			el : 'userAddprivdialog',
			title : getResource('resourceParam3006'),//'用户权限分配',
			modal : true,
			layout : 'border',
			width : 400,
			height : 400,
			closeAction : 'hide',
			resizable : true,
			plain : false,
			buttons : [{
				text : '' + getResource('resourceParam505') + '',
				handler : function() {
					var userids = '';
					var count = 0;
					for (i = 0; i < userAddprivtree.usergrid.length; i++) {
						count++;
						userids += userAddprivtree.usergrid[i] + ',';
					}
					userids = userids.substring(0, userids.length - 1);
					if (count == 0) {
						Ext.Msg.alert(getResource('resourceParam575')/*'提示'*/, getResource('resourceParam3007')/*'必须至少选择一个用户'*/);
						return;
					}
					var privileges = '';
					var amount = 0;
					store.each(function(rec) {
								if (rec.get("leaf")) {
									if (rec.get("refused")) {
										amount++;
										privileges += rec.get("id") + "-" + 0
												+ ',';
									}
									if (rec.get("permitted")) {
										amount++;
										privileges += rec.get("id") + "-" + 1
												+ ',';
									}
								}
							});
					privileges = privileges.substring(0, privileges.length - 1);
					var uptv = Seam.Remoting
							.createType("com.luck.itumserv.base.user.UserPrivTreeVo");
					uptv.setUserids(userids);
					uptv.setPrivileges(privileges);
					Seam.Component.getInstance("base_user_UserSerivce")
							.saveuserPrivileges(uptv,
									userAddprivtree.saveSuccess);
				}
			}, {
				text : ''+getResource('resourceParam7007')+'',
				handler : function() {
					userAddprivtree.userAddprivdialog.hide();
				}
			}]
				// 将面板绑定到对话框
		});

		userAddprivtree.userAddprivdialog.on('hide', userAddprivtree.close);
	}
	userAddprivtree.userAddprivdialog.add(userAddprivtree.panel);
	userAddprivtree.userAddprivdialog.show();
}
userAddprivtree.saveSuccess = function(value) {
	var sign = value;
	if (sign == true) {
		Ext.MessageBox.show({
					title : getResource('resourceParam1072'),//'保存成功',
					msg : '' + getResource('resourceParam631') + '',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.INFO
				});
		userAddprivtree.userAddprivdialog.hide();
	} else {
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam634') + '',
					msg : '' + getResource('resourceParam804') + '',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
	}
}
userAddprivtree.close = function() {
	userAddprivtree.userAddprivdialog.destroy();
	userAddprivtree.userAddprivdialog = null;
};
Ext.grid.CheckColumn = function(config) {
	Ext.apply(this, config);
	if (!this.id) {
		this.id = Ext.id();
	}
	this.renderer = this.renderer.createDelegate(this);
};
// 封装包组件
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

//Ext.example = function() {
//	var msgCt;
//
//	function createBox(t, s) {
//		return [
//				'<div class="msg">',
//				'<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>',
//				'<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc"><h3>',
//				t,
//				'</h3>',
//				s,
//				'</div></div></div>',
//				'<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>',
//				'</div>'].join('');
//	}
//	return {
//		msg : function(title, format) {
//			if (!msgCt) {
//				msgCt = Ext.DomHelper.insertFirst(Ext
//								.get('dataPrivilegeListpanel'), {
//							id : 'msg-div'
//						}, true);
//			}
//			var s = String.format.apply(String, Array.prototype.slice.call(
//							arguments, 1));
//			var m = Ext.DomHelper.append(msgCt, {
//						html : createBox(title, s)
//					}, true);
//			m.slideIn('t').pause(1.5).ghost("t", {
//						remove : true
//					});
//		},
//
//		init : function() {
//			var lb = Ext.get('lib-bar');
//			if (lb) {
//				lb.show();
//			}
//		}
//	};
//}();
