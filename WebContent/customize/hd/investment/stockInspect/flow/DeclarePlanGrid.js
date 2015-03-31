var DeclarePlanGrid = {};
DeclarePlanGrid.getForm = function(){
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var store = new Ext.data.Store(
			{
				proxy : new Ext.data.HttpProxy( {
					url : '../JSON/declarePlan_DeclarePlanRemote.getGridDataByProcurement?d='
							+ new Date(),
					method : 'post'
				}),
				reader : new Ext.data.JsonReader( {
					root : 'results',
					id : 'declareplanDetilID',
					totalProperty : 'totalProperty'
				}, ['declareplanName','declareplanCode','amount','status','editer',
				    'editorDate','editDate','declareplanDetilID'
			        ])
			});
	var cm = new Ext.grid.ColumnModel( [
			sm,
			rm,
			{
					header : '申报计划名称',
					dataIndex : 'declareplanName',
					width : 100,
					sortable : true,
					renderer : function(value, cellmeta, record,
						rowIndex) {
							return "<a href=javascript:void(0) onclick=flowAction.showDeclarePlanFlow('"+record.get("declareplanDetilID")+"')><font color=blue>"+value+"</font> </a>"
						}
				},{
					header : '申报计划编号',
					dataIndex : 'declareplanCode',
					width : 100,
					sortable : true
				},{
					header : '金额',
					dataIndex : 'amount',
					width : 100,
					sortable : true
				}, {
					header : '单位',
					dataIndex : '',
					width : 100,
					sortable : true,
					renderer : function(value, cellmeta, record,
						rowIndex) {
							return "万";
					}
				}, {
					header : '状态',
					dataIndex : 'status',
					width : 100,
					sortable : true
				}, {
					header : '编辑人',
					dataIndex : 'editer',
					width : 100,
					sortable : true
				}, {
					header : '编辑时间',
					dataIndex : 'editDate',
					width : 100,
					sortable : true
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
				id : 'DeclarePlanGrid',
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
		id : "DeclarePlanGridWind",
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