var declareDetailGrid = {}
declareDetailGrid.getDeclareDetail = function(){ 
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var store = new Ext.data.Store(
			{
				proxy : new Ext.data.HttpProxy( {
					url : '../JSON/declareDetail_DeclareDetailRemote.getGridDataByType?d='
							+ new Date(),
					method : 'post'
				}),
				reader : new Ext.data.JsonReader( {
					root : 'results',
					id : 'declareDetailId',
					totalProperty : 'totalProperty'
				}, ['declareDetailId','materialid','declareId','materialItemName','technicCondition','demension',
				    'materialStandard','materialCatalogName','quantity','useDate','use','amount','declareType',
				    'fileName','reason','fileId'
			        ])
			});
	var cm = new Ext.grid.ColumnModel( [
			sm,
			rm,
			{
					header : '物资名称',
					dataIndex : 'materialItemName',
					width : 100,
					sortable : true
				},{
					header : '规格型号',
					dataIndex : 'materialStandard',
					width : 100,
					sortable : true
				},{
					header : '物资类别',
					dataIndex : 'materialCatalogName',
					width : 100,
					sortable : true
				}, {
					header : '数量',
					dataIndex : 'quantity',
					width : 100,
					sortable : true
				}, {
					header : '单位',
					dataIndex : 'demension',
					width : 100,
					sortable : true
				}, {
					header : '资金预算',
					dataIndex : 'amount',
					width : 100,
					sortable : true
				}, {
					header : '采购用途',
					dataIndex : 'use',
					width : 100,
					sortable : true
				}, {
					header : '使用时间',
					dataIndex : 'useDate',
					width : 100,
					sortable : true
				}, {
					header : '可行性/需求报告',
					dataIndex : 'fileName',
					width : 180,
					sortable : true,
					renderer : function(value, cellmeta, record,
						rowIndex) {
						var ID = record.get("fileId");
						var ORIGINALNAME = record.get("fileName");
						value = "&nbsp;<font color=blue>" + value
								+ "</font>";
						return "<a href='../FILEDOWN/?ID="//着用的是下载。需传值文件的id和文件名，才能查到
								+ ID
								+ "&ORIGINALNAME="
								+ encodeURI(encodeURI(ORIGINALNAME))
								+ "' cursor：hand>" + value + "</a>";
			   		}
				}]);
	var tbar = [ '-', {
		text : '送审',
		iconCls : 'Send',
		handler : function() {
			venderRegisterAction.send();
		}
	},'-', {
		text : '查询',
		iconCls : 'Send',
		handler : function() {
			venderRegisterAction.seach();
		}
	}  ];
	var grid = new Ext.grid.EditorGridPanel({
				id : 'declareDetailGrid',
				layout : 'fit',
				cm : cm,
				sm:sm,
				store : store,
				autoScroll : true,
				height : 370,
				autoWidth  : true,
				columnLines : true,
				clicksToEdit:1, 
				loadMask : {
					msg : '数据加载中...'
				},
				stripeRows : true,
				viewConfig : {
					enableRowBody : true
				}, 
				bbar : new Ext.PagingToolbar({
							pageSize : 20,
							store : store,
							displayInfo : true,
							displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
							emptyMsg : '没有记录'
							
						})
	});
	var buttons = [{
		text : '关闭',
		handler : function() { 
			window.close();
		}
	} ]
	var window = new Ext.Window( {
		id : "declareDetailGridWind",
		width : 700,
		layout : 'fit',
		autoScroll : true,
		title : '采购申报列表',
		modal : true,
		items : grid,
		border : true,
		buttons : buttons,
		closeAction : 'close'
	});
	return window;
}