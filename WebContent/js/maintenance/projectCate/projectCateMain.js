
/**
 * 项目类型列表
 */
var cateGoryMain = {
	cateGorypanel : null,
	cateGorygrid : null,
	args : {
		start : 0,
		limit : 25
	},
	baseargs : null,
	sm:null
};
cateGoryMain.defineAttribute = function defineAttribute(projectcategoryid,
		projectcategoryname) {
	// window.parent.document.getElementById("center_frame").firstChild.firstChild.innerHTML
	// = '<a ext:qtip="'
	// + getResource('resourceParam1240')
	// + getResource('resourceParam944')
	// + '" href="#" onClick="back1('
	// + projectcategoryid
	// + ',\''
	// + projectcategoryname
	// + '\')" style="text-decoration:underline;color:blue">'
	// + getResource('resourceParam1791')
	// + ''
	// + projectcategoryname
	// + '</a>';
	cateGoryAttribute.projectcategoryid = projectcategoryid;
	cateGoryAttribute.projectcategoryname = projectcategoryname;
	// 点击时传入项目类型id
	cateGoryMain.baseargs = {
		projectcategoryid : projectcategoryid
	};
	cateGoryMain.cateGorypanel.getLayout().setActiveItem(1);
	cateGoryMain.attributePanel.setActiveTab(0);
};
cateGoryMain.grid = function() {
	var strurl = '../JSON/maintenance_ProjectCateGory_ProjectCateGoryService.getcateGoryList';
	var proxy = new Ext.data.HttpProxy({
				url : strurl
			});
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'projectcategoryid'
			}, ['projectcategoryid', 'projectcategoryname',
					'projectcategorynotes']);
	var ascid = 'projectcategoryid';
	var ascstr = 'asc';
	var ds = new data.Store(proxy, reader, ascid, ascstr);

	cateGoryMain.sm = new Ext.grid.RowSelectionModel({
		singleSelect : true,
		listeners : {
			rowselect : function(model, rowIndex, record) {
				// taskCateMain.projectcategoryid =
				// record.data.projectcategoryid;
				taskCateMain.loadvalue(record.data.projectcategoryid);
				taskCateAdd.projectVaue = record.data.projectcategoryid;
				// taskCateMain.taskCatepanel.getUpdater().update();
				// 选中时传入项目类型id
				window.parent.document.getElementById("center_frame").firstChild.firstChild.innerHTML = ''
						+ getResource('resourceParam1791')
						+ ''
						+ record.data.projectcategoryname;
				cateGoryMain.baseargs = {
					projectcategoryid : record.data.projectcategoryid
				}
			}
		}
	});

	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [{
			id : 'projectcategoryid',
			hidden : true,
			header : "" + getResource('resourceParam1798') + "",
			dataIndex : 'projectcategoryid',
			width : 80,
			hideable:false
		}, {
			header : "" + getResource('resourceParam1789') + "",
			dataIndex : 'projectcategoryname',
			width : 80,
			/**
			 * bug编号1047 wangyf
			 * bug信息：项目类型上限为20个字，缺省下内容显示不完整
			 * 注：已修改为鼠标放上时信息 悬浮显示
			 * 2011-06-08 13：46
			 */
			renderer : function(v, p, record) {
				return '<div ext:qtip="' + v + '">' + v + '</div>';
			}
		}, {
			header : "" + getResource('resourceParam1790') + "",
			dataIndex : 'projectcategorynotes',
			width : 100,
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
			header : '' + getResource('resourceParam1782') + '',
			dataIndex : 'projectmanipulation',
			width : 60,
			renderer : function(value, p, record) {
				return '<a href="javascript:void(0);" onClick="cateGoryMain.defineAttribute('
						+ record.data.projectcategoryid
						+ ',\''
						+ record.data.projectcategoryname
						+ '\'    )"><span style="color:blue;font-weight:bold;" >'
						+ getResource('resourceParam490') + '</span></a>';
			}
		}]
	});
	var tb = ['-', {
				text : '' + getResource('resourceParam466') + '',
				iconCls : 'priv-add',
				tooltip : {
					title : '' + getResource('resourceParam1800') + '',
					text : '' + getResource('resourceParam1795') + ''
				},
				handler : cateGoryAdd.init

			}, '-', {
				// enableToggle:true,
				text : '' + getResource('resourceParam478') + '',

				iconCls : 'priv-edit',
				tooltip : {
					title : '' + getResource('resourceParam1801') + '',
					text : '' + getResource('resourceParam1796') + ''
				},
				handler : function() {
					if (cateGoryMain.cateGorygrid.getSelectionModel()
							.getSelections().length == 1) {
						cateGoryUpdate.init()
					} else {
						Ext.MessageBox.show({
									title : ''
											+ getResource('resourceParam663')
											+ '',
									msg : '' + getResource('resourceParam1788')
											+ '!',
									width : 270,
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.WARNING
								});
					}
				}

			}, '-', {
				text : '' + getResource('resourceParam475') + '',
				iconCls : 'priv-del',
				tooltip : {
					title : '' + getResource('resourceParam1802') + '',
					text : '' + getResource('resourceParam1797') + ''
				},
				handler : cateGoryDelete.init
			}, '-'];
	var grid = myGrid.init(ds, cm, tb, cateGoryMain.sm);
	return grid;
}
cateGoryMain.init = function() {
	Ext.lib.Ajax.defaultPostHeader += ";charset=utf-8";// 设置默认编码为utf-8
	Ext.QuickTips.init();
	cateGoryMain.cateGorygrid = cateGoryMain.grid();
	cateGoryMain.attributePanel = cateGoryAttribute.init();
	taskCateMain.loadvalue();
	cateGoryMain.cateGorypanel = new Ext.Panel({
				id : 'cateGorypanel',
				layout : 'card',
				activeItem : 0,
//				border : false,
				region : 'center',
				split:true,
				titlebar : false,
//				autoScroll : true,
				// margins : '0 5 5 0',
				items : [cateGoryMain.cateGorygrid, cateGoryMain.attributePanel]

			});
	cateGoryMain.centerPanel = new Ext.Panel({
				layout : 'border',
				region : 'center',
				border : false,
				items : [cateGoryMain.cateGorypanel, taskCateMain.taskCatepanel]
			});
	var viewport = new Ext.Viewport({ // 页面布局
		layout : 'fit', // 布局模式
		items : [cateGoryMain.centerPanel]

	});
	myGrid.loadvalue(cateGoryMain.cateGorygrid.store, cateGoryMain.args,
			cateGoryMain.baseargs);

}
Ext.onReady(cateGoryMain.init, cateGoryMain, true);
