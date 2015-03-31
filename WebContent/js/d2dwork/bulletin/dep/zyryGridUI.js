Ext.QuickTips.init();
//该类实现初始化参与人员界面功能
var zyryGridUI = {
	grid : null,
	ds : null
}

// 初始化表格
zyryGridUI.initGrid = function(flag) {
	var url = '../JSON/noticeDeptsSvr.getList';
	zyryGridUI.ds = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : url,
			method : 'POST'
		}),
		reader : new Ext.data.JsonReader( {
			root : 'results',
			totalProperty : 'totalProperty'
		}, [ {
			name : 'noticeid'
		}, {
			name : 'deptid'
		}, {
			name : 'depname'
		}, {
			name : 'id'
		}, {
			name : 'flag'
		} ]),
		sortInfo : {
			field : 'id',
			direction : 'ASC'
		}
	});
/*	var sm = new Ext.grid.RowSelectionModel( {
		singleSelect : true
	});*/
	var sm = new Ext.grid.CheckboxSelectionModel({});
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [sm, {
			header : "" + getResource('resourceParam697') + "",
			dataIndex : 'deptid'
		}, {
			header : "" + getResource('resourceParam685') + "",
			dataIndex : 'depname' ,
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
						return '<div style ="cursor:pointer"><font ext:qtip="' + name + '">' + value + '</font></div>';
					}
		} ]
	});
	
	var tb = null;
	// chakanlx为2时为查看状态则不显示工具条

	// text : 9018--通知的
	if (flag != '2') {
		var tb = [
				'-',
				{
					text : getResource('resourceParam490') + ''//v编辑
							+ getResource('resourceParam9018') + ''//通知的
							+ getResource('resourceParam882'),//机构
					iconCls : 'news-add',
					handler : function() {
						zyryadd.init(getResource('resourceParam490') + ''
								+ getResource('resourceParam9018') + ''
								+ getResource('resourceParam882'),
								zyryGridUI.ds);
//						myGrid.postLoad(zyryGridUI.ds, zyryMain.baseargs);
					}
				},
				'-',
				{
					text : getResource('resourceParam475') + ''//删除
							+ getResource('resourceParam9018') + ''
							+ getResource('resourceParam882'),
					iconCls : 'news-delete',
					listeners : { //2011-4-22新闻删除gzj
					  'click' : function(){
					 	var sm = zyryGridUI.grid.getSelectionModel();
						var count = sm.getCount();
						var records = sm.getSelections();
						if(count == 0 || zyryGridUI.grid.getSelectionModel().getSelections() == null){
								Ext.example
								.msg(
										getResource('resourceParam1724'),// 警告!
										getResource('resourceParam7124')+'')// 请至少选择一条信息进行操作
										return false;
							}
				        var ids = '';
						for (i = 0; i < count; i++) {
							if (i != count - 1) {
								ids += records[i].get('id') + ",";
								
							} else {
								ids += records[i].get('id');
							}
						}
					 Ext.Msg.confirm('' + getResource('resourceParam1724') + '', // 警告
								"" + getResource('resourceParam475') + "的" // 删除
										+ getResource('resourceParam474') + "无法恢复，" // 数据
										+ getResource('resourceParam512') + "" // 是
										+ getResource('resourceParam510') + "继续?",
								function(btn) {
									if (btn == 'yes') {
										var uid=ids;
										Ext.Ajax.request({
											url : '../JSON/noticeDeptsSvr.depDel?uid='+uid,
											method : 'GET',
											disableCaching : true,
											autoAbort : true,
											success : function(response, options) {
												if (response.responseText == 'true') {
													Ext.example.msg(getResource('resourceParam1724'),//警告!
																	getResource('resourceParam637'))//删除成功
													zyryGridUI.ds.reload();
												} else {
													Ext.example.msg(getResource('resourceParam1724'),
																	getResource('resourceParam651'))//操作失败!
												}
											}
										});
										zyryGridUI.ds.reload();
									}
									
								}).getDialog().setWidth(300);
					  }
					}
					
//					handler : function() {
//						if (!zyryUtil.isNull(sm.getSelected()))
//							return;
//						zyryDel.init(zyryGridUI.ds, sm.getSelected());
//					}
				} ];
	}
	zyryGridUI.grid = myGrid.initNobr(zyryGridUI.ds, cm, tb, sm, null);
	zyryGridUI.grid.autoScroll = true;
	// 创建一个有数据的grid,当添加一个工作安排时（chakanlx为0），不需要显示用户数据
	return zyryGridUI.grid;
}
