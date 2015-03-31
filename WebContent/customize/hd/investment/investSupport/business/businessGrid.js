var businessGrid = {

	queryParm : {
		start : 0,
		limit : 20,
		code : null,
		name : null,
		scale : null,
		type : null
	},
	iqueryParm : {
		start : 0,
		limit : 20,
		type : null,
		code : null,
		name : null,
		partType : null,
		ratio : null,
		startDate : null,
		endDate : null
	}
	
};

var queryQuoteWin  = function() { // 报价查询
	
	var queryItem = new Ext.form.FormPanel({
		id : 'form1',
		border : false,
		labelWidth : 120,
		labelAlign : 'left',
		items : [{
			layout : 'form',
			border : false,
			items : [{
				border : false,
				html : '<br><br><table border="0"><tr><td width="120">编号:</td><td><input type="text" id="acode" style="width:180px;height:20px"/></td>'
			}, {
				border : false,
				html : '<table border="0"><tr><td width="120">名称:</td><td><input type="text" id="aname" style="width:180px;height:20px"/></td>'
			}, {
				border : false,
				html : '<table border="0"><tr><td width="120">规格:</td><td><input type="text" id="ascale" style="width:180px;height:20px"/></td>'
			}, {
				border : false,
				html : '<table border="0"><tr><td width="120">类别:</td><td><span id="analyseTypeDiv"></span></td>'
			}]
		}]
	});

	var win1 = new Ext.Window({
		title : "报价分析查询",
		layout : 'fit',
		width : 350,
		height : 220,
		autoScroll : true,
		closeAction : 'close',
		items : queryItem,
		buttons : [{
			text : '查询',
			handler : function() {
				businessGrid.queryParm.code = Ext.get("acode").getValue();
				businessGrid.queryParm.name = Ext.get("aname").getValue();
				businessGrid.queryParm.scale = Ext.get("ascale").getValue();
				businessGrid.queryParm.type = Ext.getCmp("atype").getValue();
				
				businessGrid.aDs.load();
				win1.close();
			}
		}, {
			text : '重置',
			handler : function() {
				Ext.get("acode").dom.value = '';
				Ext.get("aname").dom.value = '';
				Ext.get("ascale").dom.value = '';
				Ext.getCmp("atype").setValue(null);
			}
		}, {
			text : '关闭',
			handler : function() {
				win1.close();
			}
		}]
	}).show();

	var ds = [{
				'name' : '1',
				'text' : '金属材料'
			}, {
				'name' : '2',
				'text' : '非金属材料'
			}]
	var store = new Ext.data.JsonStore({
				data : ds,
				fields : ['name', 'text']
			})
	var stateBox = new Ext.form.ComboBox({
				renderTo : 'analyseTypeDiv',
				id : 'atype',
				hideOnSelect : true,
				store : store,
				width : 180,
				displayField : 'text',
				valueField : 'name',
				triggerAction : 'all',
				forceSelection : true,
				emptyText : '请选择...',
				mode : 'local'
	});
}

var  getQuoteBar  = function(flag) {

	var queryButtion = function() {
		var btn = new Ext.Button({
					text : '查询',
					iconCls : 'search1',
					handler : function() {
						queryQuoteWin();
					}
				});
		return btn;
	}

	var tbar = new Ext.Toolbar({
				items : [queryButtion()]
			})

	return tbar;
}

var queryIndagateinitWin = function() { // 商情分析查询
	var queryItem = new Ext.form.FormPanel({
		id : 'form2',
		border : false,
		labelWidth : 120,
		labelAlign : 'left',
		bodyStyle:'padding:5px 5px 0',
		defaultType:'textfield',
		items : [{
			fieldLabel:'类别',
			name:'iType',
			id:'iType'
		},{
			fieldLabel:'编号',
			name:'iCode',
			id:'iCode'
		},{
			fieldLabel:'名称',
			name:'iName',
			id:'iName'
		},{
			fieldLabel:'型号',
			name:'iPartType',
			id:'iPartType'
		}/*,{
			layout : 'form',
			border : false,
			items : [ {
				border : false,
				html : '<table border="0"><tr><td width="120">名称:</td><td><input type="text" id="iName" style="width:180px;height:20px"/></td>'
			},{
				border : false,
				html : '<table border="0"><tr><td width="120">型号:</td><td><input type="text" id="iPartType" style="width:180px;height:20px"/></td>'
			},{
				border : false,
				html : '<table border="0"><tr><td width="120">差异率:</td><td><div id="contrastDiv"></div></td>'
			}, {
				border : false,
				html : '<table border="0"><tr><td width="120">时间阶段:</td><td><div style="display:block;float:left" id="startTime3div"></div><div style="display:block;float:left" id="endTime3div"></div></td>'
			}]
		}*/]
	});

	var win1 = new Ext.Window({
		title : "商情调查查询",
		layout : 'fit',
		width : 300,
		height : 200,
		autoScroll : true,
		closeAction : 'close',
		items : queryItem,
		buttons : [{
			text : '查询',
			handler : function() {
				businessGrid.iqueryParm.type = Ext.get("iType").getValue();
				businessGrid.iqueryParm.code = Ext.get("iCode").getValue();
				businessGrid.iqueryParm.name = Ext.get("iName").getValue();
				businessGrid.iqueryParm.partType = Ext.get("iPartType").getValue();
//				businessGrid.iqueryParm.ratio = Ext.getCmp("iRatio").getValue();
				if (null != Ext.getCmp("startTime1").getValue() && "" != Ext.getCmp("startTime1").getValue() ) {
					businessGrid.iqueryParm.startDate = new Date(Ext.getCmp("startTime1").getValue()).format('Y-m-d');
				}
				if (null != Ext.getCmp("endTime2").getValue() && "" != Ext.getCmp("endTime2").getValue() ) {
					businessGrid.iqueryParm.endDate = new Date(Ext.getCmp("endTime2").getValue()).format('Y-m-d');
				}
				businessGrid.iDs.load();
				win1.close();
			}
		}, {
			text : '重置',
			handler : function() {
				Ext.get("iType").dom.value = '';
				Ext.get("iCode").dom.value = '';
				Ext.get("iName").dom.value = '';	
				Ext.get("iPartType").dom.value = '';
				Ext.getCmp("iRatio").setValue(null);
				Ext.getCmp("startTime1").setValue(null);
				Ext.getCmp("endTime2").setValue(null);
			}
		}, {
			text : '关闭',
			handler : function() {
				win1.close();
			}
		}]
	}).show();

	var strartTime1 = new Ext.form.DateField({
				renderTo : 'startTime3div',
				id : 'startTime1',
				width : 90,
				emptyText : '开始',
				dateFormat : 'Y-m-d'
			});

	var strartTime2 = new Ext.form.DateField({
				renderTo : 'endTime3div',
				id : 'endTime2',
				width : 90,
				emptyText : '结束',
				dateFormat : 'Y-m-d'
			});
			
	var ds = [{
				'name' : '1',
				'text' : '2'
			}, {
				'name' : '2',
				'text' : '3'
			}]
	var store = new Ext.data.JsonStore({
				data : ds,
				fields : ['name', 'text']
			})
	var stateBox = new Ext.form.ComboBox({
				renderTo : 'contrastDiv',
				id : 'iRatio',
				hideOnSelect : true,
				store : store,
				width : 180,
				displayField : 'text',
				valueField : 'name',
				triggerAction : 'all',
				forceSelection : true,
				emptyText : '请选择...',
				mode : 'local'
			});

}

var getIndagateinitBar = function(flag) {

	var queryButtion = function() {
		var btn = new Ext.Button({
					text : '查询',
					iconCls : 'search1',
					handler : function() {
						queryIndagateinitWin();
					}
				});
		return btn;
	}

	var tbar = new Ext.Toolbar({
				items : [queryButtion()]
			})

	return tbar;
}

/**
 * 报价分析 -- 历史趋势
 * @param {} code  物料编码
 * @param {} name  物料名称
 * @param {} id    物料ID
 */
businessGrid.historyGrid = function(code, name,id) {
	var cm = new Ext.grid.ColumnModel({
				defaults : {
					sortable : false,
					menuDisabled : true
				},
				columns : [new Ext.grid.RowNumberer(), {
							header : "编号",
							dataIndex : 'code'
						}, {
							header : "名称",
							width : 130,
							dataIndex : 'name'
						}, {
							header : "规格",
							width : 130,
							dataIndex : 'scale'
						}, {
							header : "物质类别",
							width : 130,
							dataIndex : 'type'
						}, {
							header : "最新报价",
							width : 130,
							dataIndex : 'newPrice'
						}, {
							header : "报价时间",
							width : 130,
							dataIndex : 'priceDate'
						}]
			});

	var sm = new Ext.grid.CheckboxSelectionModel();

	var strurl = '../JSON/businessRemote.getOtherPriceInfo?code='+code;

	var proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});

	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, ['id', 'qname', 'code', 'name', 'scale', 'type', 'newPrice', 'priceDate']);

	var ds = new Ext.data.Store({
				proxy : proxy,
				reader : reader,
				baseParams:{
					id:id
				}
			});

	var gridPanel = new Ext.grid.GridPanel({
				store : ds,
				cm : cm,
				loadMask : true,
				height : 100,
				layout : 'fit'
			});

	ds.load({
				params : {
					start : 0,
					limit : 20
				}
			});

	var gridMainPanel = new Ext.Panel({
				region : 'center',
				border : false,
				layout : 'fit',
				autoScroll : true,
				items : [gridPanel]
			});
	
	var mainPanel = new Ext.Panel({
				layout : 'border',
				items : [gridMainPanel, businessPic.initHistory(code)]
			})
			
	if (businessTabpanel.tabPanel.get(code + "history")) {
			businessTabpanel.tabPanel.setActiveTab(code + "history");
		} else {
			businessTabpanel.tabPanel.add({
						id : code +'history',
						title : "历史趋势",
						layout : 'fit',
						closable : true,
						items : [mainPanel]
			}).show();
	}

}



// 报价分析 -- 同业他价详情
businessGrid.otherPriceGrid = function(code, name) {

	var cm = new Ext.grid.ColumnModel({
				defaults : {
					sortable : false,
					menuDisabled : true
				},
				columns : [new Ext.grid.RowNumberer(), {
							header : "企业名称",
							dataIndex : 'qname'
						}, {
							header : "编号",
							width : 130,
							dataIndex : 'code'
						}, {
							header : "名称",
							width : 130,
							dataIndex : 'name'
						}, {
							header : "规格",
							width : 130,
							dataIndex : 'scale'
						}, {
							header : "类别",
							width : 130,
							dataIndex : 'type'
						}, {
							header : "最新报价",
							width : 130,
							dataIndex : 'newPrice'
						}, {
							header : "报价时间",
							width : 130,
							dataIndex : 'priceDate'
						}]
			});

	var sm = new Ext.grid.CheckboxSelectionModel();

	var strurl = '../JSON/businessRemote.getOtherPriceInfo?code='+code;

	var proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});

	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, ['id', 'qname', 'code', 'name', 'scale', 'type', 'newPrice', 'priceDate']);

	var ds = new Ext.data.Store({
				proxy : proxy,
				reader : reader
			});

	var gridPanel = new Ext.grid.GridPanel({
				store : ds,
				cm : cm,
				loadMask : true,
				height : 250,
				layout : 'fit',
				bbar : new Ext.PagingToolbar({
							pageSize : 20,
							store : ds,
							displayInfo : true
						})
			});

	ds.load({
				params : {
					start : 0,
					limit : 20
				}
			});

	var mainPanel = new Ext.Panel({
				border : false,
				layout : 'fit',
				autoScroll : true,
				items : [gridPanel]
			});
	
	if (businessTabpanel.tabPanel.get(code + "otherPrice")) {
		businessTabpanel.tabPanel.setActiveTab(code + "otherPrice");
	} else {
		businessTabpanel.tabPanel.add({
					id : code +'otherPrice',
					title : "同行他价",
					layout : 'fit',
					closable : true,
					items : [mainPanel]
		}).show();
	}
}

// 报价分析
businessGrid.quoteAnalyseInitGrid = function() {

	var cm = new Ext.grid.ColumnModel({
				defaults : {
					sortable : false,
					menuDisabled : true
				},
				columns : [new Ext.grid.RowNumberer(), {
							header : "编号",
							dataIndex : 'code'
						}, {
							header : "名称",
							width : 130,
							dataIndex : 'name'
						}, {
							header : "规格",
							width : 130,
							dataIndex : 'scale'
						}, {
							header : "物质类别",
							width : 130,
							dataIndex : 'partType'
						}, {
							header : "最新报价",
							width : 130,
							dataIndex : 'newPrice'
						}, {
							header : "报价时间",
							width : 130,
							dataIndex : 'priceDate'
						}, {
							header : "历史趋势",
							width : 130,
							dataIndex : '_column3',
							renderer : function(value, cellmeta, record, rowIndex,
									columnIndex, store) {
									return "<a><span onclick=\"businessGrid.historyGrid('"+record.get('code')+"','"+record.get('name')+"','"+record.get('id')+"')\">详情</span></a>";
							}
						}, {
							header : "同业他价",
							width : 130,
							dataIndex : '_column3',
							renderer : function(value, cellmeta, record, rowIndex,
									columnIndex, store) {
									return "<a><span onclick=\"businessGrid.otherPriceGrid('"+record.get('code')+"','"+record.get('name')+"')\">详情</span></a>";
							}
						}]
			});

	var sm = new Ext.grid.CheckboxSelectionModel();

	var strurl = '../JSON/businessRemote.getInfo';

	var proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});

	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, ['id', 'code', 'name', 'scale', 'type', 'stockType', 'partType', 'newPrice', 'priceDate']);

	businessGrid.aDs = new Ext.data.Store({
				proxy : proxy,
				reader : reader
			});

	var gridPanel = new Ext.grid.GridPanel({
				store : businessGrid.aDs,
				cm : cm,
				loadMask : true,
				height : 250,
				layout : 'fit',
				bbar : new Ext.PagingToolbar({
							pageSize : 20,
							store : businessGrid.aDs,
							displayInfo : true
						})
			});

	businessGrid.aDs.on('beforeload', function(ds, options) {
		Ext.apply(ds.baseParams, businessGrid.queryParm);
	});
	businessGrid.aDs.load();

	var mainPanel = new Ext.Panel({
				border : false,
				layout : 'fit',
				tbar : getQuoteBar(),
				autoScroll : true,
				items : [gridPanel]
			});

	return mainPanel;

}


businessGrid.busIndagateinitPic = function(){
	var picMainPanel = new Ext.Panel({
		region:'center',
		layout : 'fit',
		height : 400,
		border : false, 
		autoScroll : true,
		items : [businessPic.initOtherPic()]
	});
	return picMainPanel;
}

// 商情调查
businessGrid.busIndagateinitGrid = function() {
	
	var sm = new Ext.grid.CheckboxSelectionModel({
		singleSelect:true,
		listeners:{
			rowselect:function(sm,rowIndex,record){
				Ext.Ajax.request({
							url : '../JSON/businessRemote.getAnalysePic?date='
									+ new Date(),
							method : 'POST',
							success : function(response, options) {
								var result = response.responseText;
								var chart1 = new FusionCharts(
										"../fusioncharts/Charts/MSCombiDY2D.swf",
										"ChId1", "850", "350", "0", "0");
								chart1.setDataXML(result);
								chart1.render("amoteId");
							},
							disableCaching : true,
							autoAbort : true,
							params : {
								materialid:record.get('materialid')							
							}
						})
			},
			rowdeselect:function(sm,rowIndex,record){
				Ext.Ajax.request({
							url : '../JSON/businessRemote.getAnalysePic?date='
									+ new Date(),
							method : 'POST',
							success : function(response, options) {
								var result = response.responseText;
								var chart1 = new FusionCharts(
										"../fusioncharts/Charts/MSCombiDY2D.swf",
										"ChId1", "850", "350", "0", "0");
								chart1.setDataXML(result);
								chart1.render("amoteId");
							},
							disableCaching : true,
							autoAbort : true,
							params : {
//								materialid:record.get('materialid')							
							}
						})
			}
		}
	});
	
	var cm = new Ext.grid.ColumnModel({
				defaults : {
					sortable : false,
					menuDisabled : true
				},
				columns : [new Ext.grid.RowNumberer(), sm,{
							header : "编号",
							dataIndex : 'code'
						}, {
							header : "名称",
							width : 130,
							dataIndex : 'name'
						}, {
							header : "型号",
							width : 130,
							dataIndex : 'partType'
						}, {
							header : "类别",
							width : 130,
							dataIndex : 'type'
						},/* {//数据库无计算方法
							header : "差异率",
							width : 130,
							dataIndex : 'ratio'
						},*/ {
							header : "合同编号",
							width : 130,
							dataIndex : 'contractCode'
						}, {
							header : "合同名称",
							width : 130,
							dataIndex : 'contractName'
						}, {
							header : "价格",
							width : 130,
							dataIndex : 'newPrice'
						}]
			});

	var strurl = '../JSON/businessRemote.getIndagateInfo';

	var proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});

	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, ['id', 'code', 'name', 'partType', 'type', 'ratio', 'contractCode', 'contractName', 'newPrice','materialid']);

	businessGrid.iDs = new Ext.data.Store({
				proxy : proxy,
				reader : reader
			});

	var gridPanel = new Ext.grid.GridPanel({
				store : businessGrid.iDs,
				cm : cm,
				sm:sm,
				height:300,
				loadMask : true, 
				region:'north',
				tbar : getIndagateinitBar(),
				bbar : new Ext.PagingToolbar({
							pageSize : 20,
							store : businessGrid.iDs,
							displayInfo : true
						})
			});

//	businessGrid.iDs.on('beforeload', function(ds, options) {
//		Ext.apply(ds.baseParams, businessGrid.iqueryParm);
//	});
////	businessGrid.iDs.baseParams = {start:0,limit:20};
//	businessGrid.iDs.load();

/*	var gridMainPanel = new Ext.Panel({
				height : 300,
				border : false,
				layout : 'fit', 
				autoScroll : true,
				tbar : getIndagateinitBar(),
				items : [gridPanel]
	});*/

	var mainPanel = new Ext.Panel({
				layout : 'border', 
				autoScroll : true,
				items : [gridPanel/*gridMainPanel*/,businessPic.initOtherPic()]
			})

	businessGrid.iDs.on('beforeload', function(ds, options) {
		Ext.apply(ds.baseParams, businessGrid.iqueryParm);
	}); 
	businessGrid.iDs.load();
	return mainPanel;

}