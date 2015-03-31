lookexception = {
	baseargs : null,
	args : {
		start : 0,
		limit : 10
	}
};
// 判断并渲染是否是工作日
function renderwork_or_not(value) {
	if (value == 1) {
		return "<span style='color:red;font-weight:bold;'>"
				+ getResource('resourceParam512') + "</span>"
	} else {
		return "<span style='color:green;font-weight:bold;'>"
				+ getResource('resourceParam510') + "</span>"
	}
}
// 创建基准日历例外面板并加载数据
lookexception.grid = function(calendar_id) {
	//设置显示字段
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [{
			header : '' + getResource('resourceParam7093') + '',
			dataIndex : 'work_or_not',
			renderer : renderwork_or_not
		},{
			header : '' + getResource('resourceParam1269') + '',
			dataIndex : 'exception_begin'
		}, {
			header : '' + getResource('resourceParam1270') + '',
			dataIndex : 'exception_end'
		}, {
			header : '' + getResource('resourceParam467') + '',
			dataIndex : 'exception_notes'
		}]
	});
	var proxy = new Ext.data.HttpProxy({
		method : 'POST',
		url : '../JSON/calendar_StandardCalendarRemote.getStandardCalendarExceptionsListByCalendarId'
	});
	var record = Ext.data.Record.create([{
				name : 'exception_id'
			}, {
				name : 'exception_begin'
			}, {
				name : 'exception_end'
			}, {
				name : 'work_or_not'
			}, {
				name : 'exception_notes'
			}])
	var store = new Ext.data.Store({
				proxy : proxy,
				reader : new Ext.data.JsonReader({
							id : 'id',
							root : 'results',
							totalProperty : 'totalProperty'
						}, record),
				sortInfo : {
					field : 'exception_begin',
					direction : 'ASC'
				}
			});
	lookexception.baseargs = {
		calendar_id : calendar_id
	};
	store.on('beforeload', function(store, options) {
				Ext.apply(options.params, lookexception.baseargs);
			});
	store.load({
				params : lookexception.args
			});
	//创建grid面板
	var grid = new Ext.grid.GridPanel({
				ds : store,
				cm : cm,
				viewConfig : {
					forceFit : true
				},
				layout : 'fit',
				bbar : new Ext.PagingToolbar({
							pageSize : 10,
							store : store,
							displayInfo : true,
							displayMsg : '' + getResource('resourceParam7074')
									+ '',
							emptyMsg : "" + getResource('resourceParam7075')
									+ ""
						})
			});
	return grid;
}
// 初始化窗口
lookexception.initWindow = function(calendar_id) {
	lookexception.panel = lookexception.grid(calendar_id);
	lookexception.orgWin = new Ext.Window({
				title : "" + getResource('resourceParam7091')
						+ getResource('resourceParam508')
						+ getResource('resourceParam576') + "",
				width : 500,
				height : 300,
				layout : 'fit',
				items : [lookexception.panel]
			});
	lookexception.orgWin.show();
	lookexception.orgWin.on('hide', lookexception.closeWin);
};
// 关闭并销毁对画框
lookexception.closeWin = function() {
	if (lookexception.orgWin != null) {
		lookexception.orgWin.close();
		lookexception.orgWin.destroy();
	}
}
lookexception.init = function(calendar_id) {
	lookexception.initWindow(calendar_id);
}