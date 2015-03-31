
/**
 * 任务类型列表
 */
// 基准日历主面板
var StandardCalendar = {
	panel : null,
	mainpanel : null,
	args : {
		start : 0,
		limit : 25
	},
	panel : null,
	baseargs : null
};
// 点击查看链接调用的函数
StandardCalendar.lookexception = function(calendar_id) {
	lookexception.init(calendar_id);
};
// 判断并渲染是否已废弃
function renderdeprecated(value) {
	if (value == 1) {
		return "<span style='color:red;font-weight:bold;'>"
				+ getResource('resourceParam509')
				+ getResource('resourceParam7086') + "</span>"
	} else if (value == 0) {
		return "<span style='color:green;font-weight:bold;'>"
				+ getResource('resourceParam9091') + "</span>"
	} else {
		return "<span style='color:purple;font-weight:bold;'>"
				+ getResource('resourceParam454')
				+ getResource('resourceParam7086') + "</span>"
	}
}
// 获取选中的所有基准日历ID数组
StandardCalendar.getStandardCalendarIds = function() {
	var result = new Array();
	if (myGrid.rows != null) {
		var size = myGrid.rows.length;
		if (size == 0) {
			return "false";
		}
		for (var i = 0; i < size; i++) {
			result[i] = myGrid.rows[i].id;
		}
		return result;
	}
	return "false";
}

// 基准日历首页
StandardCalendar.grid = function() {
	var strurl = '../JSON/calendar_StandardCalendarRemote.getStandardCalendarList';
	var proxy = new Ext.data.HttpProxy({
				url : strurl
			});
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'calendar_id'
			}, ['calendar_id', 'create_date', 'calendar_name',
					'calendar_notes', 'daywork', 'weekwork', 'deprecated']);
	var ascid = 'create_date';
	var ascstr = 'desc';
	var ds = new data.Store(proxy, reader, ascid, ascstr);
	// 创建复选框
	StandardCalendar.sm = new Ext.grid.CheckboxSelectionModel();
	// 设置显示内容
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [StandardCalendar.sm, {
			header : "" + getResource('resourceParam7088')
					+ getResource('resourceParam480') + "",
			dataIndex : 'calendar_name',
			width : 100
		}, {
			header : "" + getResource('resourceParam6052')
					+ getResource('resourceParam7089') + "",
			dataIndex : 'daywork',
			width : 200
		}, {
			header : "" + getResource('resourceParam7090')
					+ getResource('resourceParam7089') + "",
			dataIndex : 'weekwork',
			width : 150
		}, {
			header : "" + getResource('resourceParam467') + "",
			dataIndex : 'calendar_notes',
			width : 200,
			// 设置悬停，如果是字母或数字，则大于45个就换行
			renderer : function(value, cellmeta, record, rowIndex, columnIndex,
					store) {
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
		}, {
			header : "" + getResource('resourceParam7091') + "",
			width : 80,
			renderer : function(value, p, record) {
				return '<a href="javascript:void(0);" onClick="StandardCalendar.lookexception(\''
						+ record.data.calendar_id
						+ '\')"><span style="color:blue;font-weight:bold;" >'
						+ getResource('resourceParam4067') + '</span></a>';
			}
		}, {
			header : "" + getResource('resourceParam7092') + "",
			dataIndex : 'deprecated',
			width : 100,
			renderer : renderdeprecated
		}]
	});
	// 下拉列表原始数据
	var data_type = [
			[3, '' + getResource('resourceParam4020') + ''],
			[
					2,
					'' + getResource('resourceParam454')
							+ getResource('resourceParam7086') + ''],
			[
					1,
					'' + getResource('resourceParam509')
							+ getResource('resourceParam7086') + ''],
			[0, '' + getResource('resourceParam9091') + '']];
	var calendarTypeStore = new Ext.data.SimpleStore({
				fields : ['value', 'text'],
				data : data_type
			});
	// 日历类型下拉列表
	var comboCalendarType = new Ext.form.ComboBox({
				id : 'calendartype',
				store : calendarTypeStore,
				// emptyText:'审批记录',
				mode : 'local',
				triggerAction : 'all',
				valueField : 'value',
				displayField : 'text',
				editable : false,
				value : 3
			});
	// 当点击首页的下拉列表时
	comboCalendarType.on('select', function(combo, record, index) {
				if (record.get('value') == 1) {
					StandardCalendar.baseargs = {
						deprecated : 1
					};
				} else if (record.get('value') == 0) {
					StandardCalendar.baseargs = {
						deprecated : 0
					};
				} else if (record.get('value') == 2) {
					StandardCalendar.baseargs = {
						deprecated : 2
					};
				} else {
					StandardCalendar.baseargs = {
						deprecated : null
					};
				}
				myGrid.loadvalue(StandardCalendar.panel.getStore(),
						StandardCalendar.args, StandardCalendar.baseargs);
			})
	// 创建工具栏
	var tb = ['-', {
		text : '' + getResource('resourceParam483') + '',// 新建
		iconCls : 'priv-add',
		tooltip : {
			title : '' + getResource('resourceParam483') + '',
			text : '' + getResource('resourceParam483')
					+ getResource('resourceParam7087') + ''
		},
		handler : function() {
			StandardCalendar.mainpanel.getLayout().setActiveItem(1);
		}

	}, '-', {
		text : '' + getResource('resourceParam478') + '',// 修改

		iconCls : 'priv-edit',
		tooltip : {
			title : '' + getResource('resourceParam478') + '',
			text : '' + getResource('resourceParam478')
					+ getResource('resourceParam7087') + ''
		},
		handler : function() {
			var result = StandardCalendar.getStandardCalendarIds();
			if (result.length == 1 && result != "false"
					&& StandardCalendar.sm.getSelected().get('deprecated') == 2) {
				addStandardCalendarOne.loadData(result[0]);
				StandardCalendar.mainpanel.getLayout().setActiveItem(1);
			} else if (result.length != 1) {
				Ext.MessageBox.alert('' + getResource('resourceParam587') + '',
						'' + getResource('resourceParam662') + '');
			} else {
				Ext.MessageBox.alert('' + getResource('resourceParam587') + '',
						'' + getResource('resourceParam7135') +getResource('resourceParam478')+ '');
			}
		}

	}, '-', {
		text : '' + getResource('resourceParam475') + '',// 删除
		iconCls : 'priv-del',
		tooltip : {
			title : '' + getResource('resourceParam475') + '',
			text : '' + getResource('resourceParam475')
					+ getResource('resourceParam454')
					+ getResource('resourceParam7086')
					+ getResource('resourceParam7085') + ''
		},
		// 删除选中的未启用的基准日历
		handler : function() {
			var result = StandardCalendar.getStandardCalendarIds();
			if (result != "false") {
				var records=StandardCalendar.sm.getSelections();
				for(count=0;count<records.length;count++)
				{
					if(records[count].get('deprecated')!=2)
					{
						Ext.MessageBox.alert('' + getResource('resourceParam587') + '',
						'' + getResource('resourceParam7135') +getResource('resourceParam475')+ '');
						return;
					}
				}
				var appVo = Seam.Remoting
						.createType("com.sysware.p2m.calendar.StandardCalendarVo");
				appVo.setCalendar_ids(result);
				Seam.Component.getInstance("calendar_StandardCalendarRemote")
						.deleteCalendar(appVo, StandardCalendar.callback);
			} else {
				Ext.MessageBox.alert('' + getResource('resourceParam587') + '',
						'' + getResource('resourceParam7094') + '');
			}
		}

	}, '-', {
		text : '' + getResource('resourceParam9095') + '',// 废弃

		iconCls : 'priv-del',
		tooltip : {
			title : '' + getResource('resourceParam9095') + '',
			text : '' + getResource('resourceParam9095')
					+ getResource('resourceParam7086')
					+ getResource('resourceParam7085') + ''
		},
		// 废弃选中的基准日历
		handler : function() {
			var result = StandardCalendar.getStandardCalendarIds();
			if (result == "false") {
				Ext.MessageBox.show({
							title : '' + getResource('resourceParam663') + '',
							msg : '' + getResource('resourceParam7094') + ''
									+ getResource('resourceParam7087') + ''
									+ getResource('resourceParam9039') + '!',
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.WARNING
						});
			} else {
				Ext.MessageBox.confirm('' + getResource('resourceParam575')
								+ '', '' + getResource('resourceParam512')
								+ getResource('resourceParam510')
								+ getResource('resourceParam9095')
								+ getResource('resourceParam7095') + '',
						function(btn, text) {
							if (btn == 'yes') {
								var appVo = Seam.Remoting
										.createType("com.sysware.p2m.calendar.StandardCalendarVo");
								appVo.setCalendar_ids(result);
								Seam.Component
										.getInstance("calendar_StandardCalendarRemote")
										.disableCalendar(appVo,
												StandardCalendar.callback);
							}
						})
			}
		}

	}, '-', {
		text : '' + getResource('resourceParam7086') + '',// 启用

		iconCls : 'priv-add',
		tooltip : {
			title : '' + getResource('resourceParam7086') + '',
			text : '' + getResource('resourceParam7086')
					+ getResource('resourceParam9095')
					+ getResource('resourceParam7085') + ''
		},
		// 启用选中的基准日历
		handler : function() {
			var result = StandardCalendar.getStandardCalendarIds();
			if (result == "false") {
				Ext.MessageBox.show({
							title : '' + getResource('resourceParam663') + '',
							msg : '' + getResource('resourceParam7094') + ''
									+ getResource('resourceParam7087') + ''
									+ getResource('resourceParam9039') + '!',
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.WARNING
						});
			} else {
				Ext.MessageBox.confirm('' + getResource('resourceParam575')
								+ '', '' + getResource('resourceParam512')
								+ getResource('resourceParam510')
								+ getResource('resourceParam7086')
								+ getResource('resourceParam7095') + '',
						function(btn, text) {
							if (btn == 'yes') {
								var appVo = Seam.Remoting
										.createType("com.sysware.p2m.calendar.StandardCalendarVo");
								appVo.setCalendar_ids(result);
								Seam.Component
										.getInstance("calendar_StandardCalendarRemote")
										.enableCalendar(appVo,
												StandardCalendar.callback);
							}
						})
			}
		}

	}, '-', {
		text : '' + getResource('resourceParam1482') + '',
		style : 'margin-left:20px;',
		xtype : 'label'

	}, comboCalendarType];
	var grid = myGrid.initBox(ds, cm, tb, StandardCalendar.sm);// 创建grid面板
	return grid;
}
// 废弃、删除、启用基准日历的回调函数
StandardCalendar.callback = function(value) {
	if (value == true) {
		Ext.example.msg("" + getResource('resourceParam587') + "", ""
						+ getResource('resourceParam3002') + "");
		StandardCalendar.sm.clearSelections();
		myGrid.rows = null;
		myGrid.loadvalue(StandardCalendar.panel.getStore(),
				StandardCalendar.args, null);
	} else {
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam634') + '',
					msg : '' + getResource('resourceParam651') + '!',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
	}
}
StandardCalendar.init = function() {
	Ext.lib.Ajax.defaultPostHeader += ";charset=utf-8";// 设置默认编码为utf-8
	Ext.QuickTips.init();
	// 主面板
	StandardCalendar.panel = StandardCalendar.grid();
	// 点击增加或修改后的第一步
	StandardCalendar.oneStepPanel = addStandardCalendarOne.init();
	// 点击增加或修改后的第二步
	StandardCalendar.twoStepPanel = addStandardCalendarTwo.init();
	// 点击增加或修改后的第三步
	StandardCalendar.threeStepPanel = addStandardCalendarThree.init();
	// 点击增加或修改后的第四步
	StandardCalendar.fourStepPanel = addStandardCalendarFour.init();
	// 基准日历总面板
	StandardCalendar.mainpanel = new Ext.Panel({
				id : 'taskCatepanel',
				layout : 'card',
				activeItem : 0,
				border : false,
				region : 'center',
				titlebar : false,
				autoScroll : true,
				margins : '0 5 5 0',
				items : [StandardCalendar.panel, StandardCalendar.oneStepPanel,
						StandardCalendar.twoStepPanel,
						StandardCalendar.threeStepPanel,
						StandardCalendar.fourStepPanel]
			});
	// 视图
	var viewport = new Ext.Viewport({ // 页面布局
		layout : 'border', // 布局模式
		items : [StandardCalendar.mainpanel]

	});
	// 加载数据
	myGrid.loadvalue(StandardCalendar.panel.getStore(), StandardCalendar.args,
			StandardCalendar.baseargs);
}
Ext.onReady(StandardCalendar.init, StandardCalendar, true);
