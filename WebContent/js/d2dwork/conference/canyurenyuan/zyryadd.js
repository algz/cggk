// 添加参与人员类
var zyryadd = {
	depid : null,
	win : null,
	form : null,
	grid : null,
	ds : null,
	issueDialog : null
}

zyryadd.initWin = function(title, dss) {
	var a = zyryadd.initGrid();
	zyryadd.b = zyryadd.initForm();
	zyryadd.c = new Ext.Panel({
				region : 'center',
				layout : 'fit',
				items : a,
				buttons : [{
							id : 'quanxuan',
							text : getResource('resourceParam807') + '',
							handler : function() {
								var rolepri = {
									meetingid : zyryMain.meetingid,
									depid : zyryadd.depid,
									quanxuan : 'yes'
								}
								myGrid.postLoad(a.store, rolepri);
								this.disable();
								Ext.getCmp('quxiao').enable();
							}
						}, {
							id : 'quxiao',
							text : getResource('resourceParam808') + '',
							handler : function() {
								var rolepri = {
									meetingid : zyryMain.meetingid,
									depid : zyryadd.depid,
									quanxuan : 'no'
								}
								myGrid.postLoad(a.store, rolepri);
								this.disable();
								Ext.getCmp('quanxuan').enable();
							}
						}]
			});

	if (!zyryadd.issueDialog) {
		tlework.addHtml(tlework.divHtml, 'zyryadd'); // 动态生成需要绑定的div
		zyryadd.issueDialog = new Ext.Window({ // 创建对话框
			el : 'zyryadd',
			title : title,
			modal : true,
			layout : 'border',
			width : 400,
			height : 350,
			closeAction : 'hide',
			plain : false,
			items : [zyryadd.b, zyryadd.c],
			buttons : [{
						text : getResource('resourceParam505') + '',
						handler : function() {
							zyryadd.submit(dss);
							myGrid.postLoad(dss, {
										meetingid : zyryMain.meetingid
									});
						}
					}, {
						text : getResource('resourceParam9002') + '', // text
						// : 取消
						handler : zyryadd.closeWin
					}]
				// 将面板绑定到对话框
		});
	}
	zyryadd.issueDialog.show();
	zyryadd.issueDialog.on("hide", function() {
				zyryadd.issueDialog.close();
				zyryadd.issueDialog.destroy();
				zyryadd.issueDialog = null;
				myGrid.postLoad(Ext.getCmp('conferenceGridPanel').store, {
							start : 0,
							limit : 25
						}, conferenceMain.baseargs);
			});
}

zyryadd.initForm = function() {
	departmentUser.onselectDepart(getResource('resourceParam873') + '');
	Ext.form.Field.prototype.msgTarget = 'qtip';
	departmentUser.departmentComboa.on('select',
			function(combo, record, index) {
				zyryadd.depid = record.id;
				baseargs = {
					depid : record.id,
					meetingid : zyryMain.meetingid
				};

				myGrid.postLoad(zyryadd.grid.store, baseargs);

			});

	zyryadd.form = {
		xtype : 'form',
		region : 'north',
		labelSeparator : ':',
		frame : true,
		height : 42,
		bodyStyle : 'padding:5px 5px 0;background:transparent',
		items : departmentUser.departmentComboa
	}
	return zyryadd.form
}

zyryadd.closeWin = function() {
	if (zyryadd.issueDialog != null) {
		zyryadd.issueDialog.close();
	}
}

zyryadd.submit = function(dss) {
	var temp = zyryadd.getusers();
	Seam.Component.getInstance("attendPeopleSvr").saveUsers(zyryMain.meetingid,
			zyryadd.depid, temp, zyryadd.saveusers);
	zyryadd.closeWin();
	myGrid.postLoad(dss, {
				meetingid : zyryMain.meetingid
			});
	myGrid.postLoad(Ext.getCmp('conferenceGridPanel').store, {
				start : 0,
				limit : 25
			}, {});
}

zyryadd.initGrid = function() {
	var strurl = '../JSON/attendPeopleSvr.getyonghuList';
	var ds = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : strurl
						}),
				reader : new Ext.data.JsonReader({
							root : 'results',
							totalProperty : 'totalProperty'
						}, [{
									name : 'userid'
								}, {
									name : 'depid'
								}, {
									name : 'depname'
								}, {
									name : 'username'
								}, {
									name : 'flag'
								}]),
				sortInfo : {
					field : 'userid',
					direction : 'ASC'
				}
			});
	var checkColumn = new Ext.grid.CheckColumn({
				header : getResource('resourceParam503') + "",
				dataIndex : 'flag',
				width : 50
			});
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [checkColumn, {
			header : getResource('resourceParam942') + "",
			dataIndex : 'username'
		}, {
			header : getResource('resourceParam685') + "",
			dataIndex : 'depname'
		}]
	});
	var tb = null;
	zyryadd.grid = myGrid.initNobr(ds, cm, tb, null, checkColumn);
	zyryadd.grid.on('checkboxclick', function(element, evt, record) {
				if (record.get('flag') == 0) {
					Ext.getCmp('quanxuan').enable();
				} else {
					Ext.getCmp('quxiao').enable();
				}
			})
	return zyryadd.grid;
}

zyryadd.init = function(title, ds) {
	zyryadd.initWin(title, ds);
}

zyryadd.getusers = function() {
	var colId = "flag";
	var returnId = "userid";
	var data = zyryadd.grid.store;
	var result = "";
	var size = data.getCount();
	for (var i = 0; i < size; i++) {
		var record = data.getAt(i);
		if (record.data[colId])
			if (result == "") {
				result = result + record.data[returnId];
			} else {
				result = result + "|" + record.data[returnId];
			}
	}
	return result;
};

zyryadd.saveusers = function(value) {
	var sign = value;
	if (sign == true) {
		myGrid.postLoad(zyryGridUI.ds, zyryMain.baseargs);
		myGrid.postLoad(Ext.getCmp('conferenceGridPanel').store, {
					start : 0,
					limit : 25
				}, {});
	} else {
		Ext.MessageBox.show({
					title : getResource('resourceParam634') + '',
					msg : getResource('resourceParam804') + '',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
	}
};

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
