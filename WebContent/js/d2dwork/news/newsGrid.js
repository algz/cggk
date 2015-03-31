// 新闻内容列表对象
var newsGrid = {
	rows : null,
	loginId : null
};

// 新闻内容列表对象实例化
newsGrid.grid = function() {
	Ext.QuickTips.init();
	/** 有关数据 开始 */
	var strurl = "../JSON/news_newssvr.getnewsList";
	// 列表内容请求proxy对象
	var proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});
	// 列表内容请求返回数据的reader解析对象
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'newsid'
			}, ['newsid', 'title', 'author', 'content', 'pbudate',
					'isarchived', 'typeid', 'typename', 'authorname', 
					'ginstituteName', 'isarchivedname', 'pbudatestr', 'type','url','userId']);
	// 列表数据的浏览器store缓存对象
	var ds = new Ext.data.Store({
				proxy : proxy,
				reader : reader,
				baseParams : {
					typeid : null,
				    title : null
				}
			});
	/** 有关数据 结束 */

	/** 有关布局 开始 */
	// 定义列表的单项选择列
	var sm = new Ext.grid.CheckboxSelectionModel({
				// singleSelect : true,
				listeners : {
					// 列表的 行选中 事件监听函数
					rowselect : function(sm, row, rec) {
						var status = rec.data.isarchived;
						var saveButton = Ext.getCmp("newsSaveButton");
						// 根据新闻的发布状态值动态确定按钮文本及其事件
						// 根据新闻的发布状态值动态确定按钮文本及其事件
						if (status == 1) {
							saveButton.setText(''
									+ getResource('resourceParam9002') + ''
									+ getResource('resourceParam605') + ''); // 取消发布
							saveButton.setHandler(guidang.send);
							saveButton.enable();
						} else if (status == 0) {
							saveButton.setText(''
									+ getResource('resourceParam605') + ''); // 发布
							saveButton.setHandler(guidang.init);
							saveButton.enable();

						}
					},
					// 列表的 行选择切换 事件监听函数
					selectionchange : function(sm) {
						newsGrid.rows = sm.getSelections();
						if (sm.getSelections().length < 1) {
							var saveButton = Ext.getCmp("newsSaveButton");
							saveButton.disable();
						}
					},
					rowdeselect : function() {
						var hd = Ext.fly(this.grid.getView().innerHd)
								.child('div.x-grid3-hd-checker');
						if (hd.hasClass('x-grid3-hd-checker-on')) {
							hd.removeClass('x-grid3-hd-checker-on');
						}
					}
				}
			});
	// 定义列表所有列头
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [new Ext.grid.RowNumberer(), sm, {
			id : 'newsid',
			header : "ID",
			dataIndex : 'newsid',
			hidden:true,
			hideable:false
		}, {
			header : "" + getResource('resourceParam504') + "",
			dataIndex : 'title',
			width:250,
			
			
			renderer:function(value,p,r){ 
				//gaoyn bug 1196 悬浮提示 2011-6-14 15:54 
				var name = '';
				if (value.length > 45) {
					for (i = 0; i < value.length; i = i + 45) {
						name = name + value.substring(i, i + 45) + '<br/> ';
					}
				} else {
					name = value;
				}
				//gaoyn 
			     return "<a style='text-decoration:underline; color:blue;'  href='"+encodeURI(encodeURI(r.get("url")))+"' target=_blank > <font ext:qtip='" + name + "'>" + value + "</font></a>"	
			}
		}, {
			header : "" + getResource('resourceParam858') + "",
			dataIndex : 'pbudatestr',
			width:60,
				// gaoyn bug 1187 设置悬停，如果是字母或数字，则大于45个就换行
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
			header : "" + getResource('resourceParam453') + "",
			dataIndex : 'author',
			width:30,
			hidden  : true,
			hideable:false
		},{
			header : "" + getResource('resourceParam453') + "",
			dataIndex : 'authorname',
			width:30
		}, {
			header : "" + getResource('resourceParam605') + ""
					+ getResource('resourceParam500') + "", // 发布状态
			dataIndex : 'isarchived',
			width:30,
			renderer : function(value, cellmeta, record, rowIndex,
					columnIndex, store) { // 显示数据前根据发布状态展示不同文本描述
				if (value == 0) {
					return '' + getResource('resourceParam9099') + '';
				} else if (value == 1) {
					return '' + getResource('resourceParam9098') + '';
				}
			}
		}, {
			header : "" + getResource('resourceParam689') + "",
			dataIndex : 'ginstituteName',
			width:60,
				// gaoyn bug 1187 设置悬停，如果是字母或数字，则大于45个就换行
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
			id : 'type',
			dataIndex : 'type',
			hidden : true,
			hideable:false
		}]
	});
	// 定义列表中所有操作按钮
	var addBt = {
		id : 'add',
		text : '' + getResource('resourceParam477') + '', // 新增
		iconCls : 'add1',
		handler : function(){
//			var formPanel = Ext.getCmp('news_form_panel');
//			formPanel.show();
//			grid.hide();
		newsMain.setActiveItem(1);
		}
	};
	var updateBt = {
		id : 'update',
		text : '' + getResource('resourceParam478') + '', // 修改
		iconCls : 'edit1',
		handler : newsFormUpdate.init
	};
	var delBt = {
		id : 'del',
		text : '' + getResource('resourceParam475') + '', // 删除
		iconCls : 'del1',
		handler : newsDel.init
	};
	var selBt = {
		id : 'query',
		text : '' + getResource('resourceParam652') + '', // 查询
		iconCls : 'search1',
		handler : newsQuery.init
	};
	var saveBt = new Ext.Button({
				text : '' + getResource('resourceParam605') + '', // 发布 与 取消发布
				id : 'newsSaveButton',
				iconCls : 'save1',
				handler : guidang.init
			});
	saveBt.disable();
	var viewBt = {
		text : '' + getResource('resourceParam576') + '', // 查看
		iconCls : 'view1',
		handler : newsView.init
	}

	var tb = ['-', addBt, '-', delBt, '-', updateBt, '-', selBt, '-', saveBt
			];

	/** 有关布局 结束 */
	// 组装界面组件为列表
//	var grid = myGrid.init(ds, cm, tb, sm);
	
	var grid = new Ext.grid.GridPanel({
					store : ds,
					id:'fileGridPanel',
					cm : cm,
					sm : sm,
					autoScroll : true,
					trackMouseOver : true,
					viewConfig : {
						forceFit : true,
						enableRowBody : true,
						showPreview : true
					},
					tbar : tb,
					bbar : new Ext.PagingToolbar({
								pageSize : 25,
								store : ds,
								displayInfo : true
							}),
					stripeRows : true
				});

		/**
		 * 得到用户登陆得ID
		 * @author wangyf
		 */
		Ext.Ajax.request({
				url : '../JSON/news_newssvr.loginId',
				method : 'POST',
				success : function(response, options) {
					var obj = Ext.util.JSON.decode(response.responseText);
					if (obj.success) {
						if (obj.loginId != "" && obj.loginId != null) {
							newsGrid.loginId = obj.loginId;
							if (newsGrid.loginId == '3') {
								var t = grid.getTopToolbar(tb);
								t.get("add").hide();
								t.get("update").hide();
								t.get("newsSaveButton").hide();
							}
						}
					}
				},
				failure : function(response, options) {
					Ext.MessageBox.show({
								title : '' + getResource('resourceParam634')
										+ '',
								msg : '' + "数据加载有误！" + '',
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.ERROR
							});
				}
			});

	return grid;
}
