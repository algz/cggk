
/**
 * 任务类型列表
 */
var taskCateMain = {
	taskCatepanel : null,
	taskCategrid : null,
	args : {
		start : 0,
		limit : 25
	},
	baseargs : null,
	sm:null
};

taskCateMain.defineAttribute = function defineAttribute(taskcategoryid,
		taskcategoryname) {
	// window.parent.document.getElementById("center_frame").firstChild.firstChild.innerHTML
	// = '<a
	// ext:qtip="'+getResource('resourceParam1240')+getResource('resourceParam944')+'"
	// href="#" onClick="back('+taskcategoryid+',\''+taskcategoryname+'\')"
	// style="text-decoration:underline;color:blue">'+getResource('resourceParam1635')+''
	// + taskcategoryname + '</a>';
	taskCateAttribute.taskcategoryid = taskcategoryid;
	taskCateAttribute.taskcategoryname = taskcategoryname;
	// 点击时传入任务类型id
	taskCateMain.baseargs = {
		taskcategoryid : taskcategoryid
	};
	taskCateMain.taskCatepanel.getLayout().setActiveItem(1);
	taskCateMain.attributePanel.setActiveTab(0);
};

taskCateMain.defineTaskphase = function defineTaskphase(taskcategoryid,
		taskcategoryname) {
	// window.parent.document.getElementById("center_frame").firstChild.firstChild.innerHTML
	// = '<a
	// ext:qtip="'+getResource('resourceParam1240')+getResource('resourceParam944')+'"
	// href="#" onClick="back('+taskcategoryid+',\''+taskcategoryname+'\')"
	// style="text-decoration:underline;color:blue">'+getResource('resourceParam1635')+''
	// + taskcategoryname + '</a>';
	taskPhaseMain.taskcategoryid = taskcategoryid;
	taskPhaseMain.taskcategoryname = taskcategoryname;
	// 点击时传入任务类型id
	taskCateMain.baseargs = {
		taskcategoryid : taskcategoryid
	};
	myGrid.loadvalue(taskPhasePanel.grid.store, {
				start : 0,
				limit : 25
			}, taskCateMain.baseargs);
	taskCateMain.taskCatepanel.getLayout().setActiveItem(2);
	taskCateMain.taskphasePanel.setActiveTab(0);
};

taskCateMain.grid = function() {
	var strurl = '../JSON/maintenance_TaskCategory_TaskCategoryService.getTaskcateList';
	var proxy = new Ext.data.HttpProxy({
				url : strurl
			});
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'taskcategoryid'
			}, ['taskcategoryid', 'taskcategoryname', 'taskcategorynotes',
					'projectcategorynames']);
	var ascid = 'taskcategoryid';
	var ascstr = 'asc';
	var ds = new data.Store(proxy, reader, ascid, ascstr);

	taskCateMain.sm = new Ext.grid.RowSelectionModel({
		singleSelect : true,
		listeners : {
			rowselect : function(model, rowIndex, record) {   //一下注释为了选择行时，不显示右下角的任务类型
//				window.parent.document.getElementById("center_frame").firstChild.firstChild.innerHTML = ''
//						+ getResource('resourceParam1635') //
//						+ ''
//						+ record.data.taskcategoryname;
				// 选中时传入项目类型id
				taskCateMain.baseargs = {
					taskcategoryid : record.data.taskcategoryid
				}
			}
		}
	});

	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [/*{  2011-5-17 yangh 测试部要求不能显示该列（去掉该列发现对现有功能没有影响）
			id : 'taskcategoryid',
			hidden : true,
			header : "" + getResource('resourceParam1812') + "",
			dataIndex : 'taskcategoryid',
			width : 60
		}, */{
			header : "" + getResource('resourceParam1804') + "",
			dataIndex : 'taskcategoryname',
			width : 80
		}, {
			header : "" + getResource('resourceParam1805') + "", //任务类型描述
			dataIndex : 'taskcategorynotes',
			width : 150,
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
		}, {
			header : "" + getResource('resourceParam7068') + "",
			dataIndex : 'projectcategorynames',
			width : 150
		}, {
			header : '' + getResource('resourceParam7073') + '',
			dataIndex : 'taskphase',
			width : 40,
			renderer : function(value, p, record) {
				return '<a href="javascript:void(0);" onClick="taskCateMain.defineTaskphase('
						+ record.data.taskcategoryid
						+ ',\''
						+ record.data.taskcategoryname
						+ '\'    )"><span style="color:blue;font-weight:bold;" >'
						+ getResource('resourceParam490') + '</span></a>';
			}
		}, {
			header : '' + getResource('resourceParam1782') + '',
			dataIndex : 'taskmanipulation',
			width : 40,
			renderer : function(value, p, record) {
				return '<a href="javascript:void(0);" onClick="taskCateMain.defineAttribute('
						+ record.data.taskcategoryid
						+ ',\''
						+ record.data.taskcategoryname
						+ '\'    )"><span style="color:blue;font-weight:bold;" >'
						+ getResource('resourceParam490') + '</span></a>';
			}
		}]
	});

	var tb = ['-', {
				text : '' + getResource('resourceParam466') + '',
				iconCls : 'priv-add',
				tooltip : {
					title : '' + getResource('resourceParam1814') + '',
					text : '' + getResource('resourceParam1809') + ''
				},
				handler : taskCateAdd.init

			}, '-', {
				// enableToggle:true,
				text : '' + getResource('resourceParam478') + '',

				iconCls : 'priv-edit',
				tooltip : {
					title : '' + getResource('resourceParam1815') + '',
					text : '' + getResource('resourceParam1810') + ''
				},
				handler : taskCateUpdate.init

			}, '-', {
				// enableToggle:true,
				text : '' + getResource('resourceParam475') + '',

				iconCls : 'priv-del',
				tooltip : {
					title : '' + getResource('resourceParam1816') + '',
					text : '' + getResource('resourceParam1811') + ''
				},
				handler : taskCateDelete.init

			}, '-'];
	var grid = myGrid.init(ds, cm, tb, taskCateMain.sm);
	return grid;
}
taskCateMain.init = function() {
	Ext.lib.Ajax.defaultPostHeader += ";charset=utf-8";// 设置默认编码为utf-8
	Ext.QuickTips.init();
	taskCateMain.taskCategrid = taskCateMain.grid();
	taskCateMain.taskphasePanel = taskPhaseMain.init();
	taskCateMain.attributePanel = taskCateAttribute.init();
	taskCateMain.taskCatepanel = new Ext.Panel({
				id : 'taskCatepanel',
				layout : 'card',
				activeItem : 0,
				border : false,
				region : 'center',
				titlebar : false,
				autoScroll : true,
				margins : '0 5 5 0',
				items : [taskCateMain.taskCategrid,
						taskCateMain.attributePanel,
						taskCateMain.taskphasePanel]

			});
	var viewport = new Ext.Viewport({ // 页面布局
		layout : 'border', // 布局模式
		items : [taskCateMain.taskCatepanel]

	});
	myGrid.loadvalue(taskCateMain.taskCategrid.store, taskCateMain.args,
			taskCateMain.baseargs);
}
Ext.onReady(taskCateMain.init, taskCateMain, true);
