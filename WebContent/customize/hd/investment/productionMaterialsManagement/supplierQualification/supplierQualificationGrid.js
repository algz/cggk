
var supplierQualificationGrid = {
	selectRow:null,
	selectObj:null
};
//var supplierQualificationMain = {};


supplierQualificationGrid.getView = function(vendorId){
	var win = Ext.getCmp('supplierQualificationMainWin');
	if (win == null){
		//win = supplierQualificationMain.contractId = procurementContractId;	
	    win= new Ext.Window({
		id:'supplierQualificationMainWin',
		title:'供应商资质',
		width : 800,
		height : 400,
		layout : 'fit',//'card',
//		activeItem : 0,
		items : [supplierQualificationGrid.gridPanel(vendorId)/*, supplierQualificationForm.getForm()*/]//,
//		listeners : {
//			'beforeclose' : function(){
//				supplierQualificationMain.window = null;
//				supplierQualificationMain.contractId = null;
//				supplierQualificationMain.isDirectAdd = false;
//			}
//		}
	});
	//supplierQualificationMain.window = window;	
		
	}
//	else{
//		win.getLayout().setActiveItem(0);
//		win.setHeight(400);
//	}		
	win.show();
}



// 供应商资质GRID
supplierQualificationGrid.gridPanel = function(vendorId) {
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var store = new Ext.data.Store(
			{
				proxy : new Ext.data.HttpProxy( {
					url : '../JSON/vendorQualificationRemote.getGridData?d='
							+ new Date(),
					method : 'post'
				}),
				reader : new Ext.data.JsonReader( {
					root : 'results',
					id : 'id',
					totalProperty : 'totalProperty'
				}, [ 'id', 'name', 'license', 'deadline',
						'issuingauthority', 'note','content','startDate']),
				autoLoad:true,
				baseParams : {
					vendorId:vendorId,
					endDate:new Date(),
					start : 0,
					limit : 20
				}
			});
	 
	var grid = new Ext.grid.GridPanel({
		id : 'vendorQualificationGridPanelId',
		sm : sm,
		store : store,
		autoScroll : true,
		height : 300,
		width : 700, 
		autoWidth : true,
		columnLines : true,
		stripeRows : true,
		stripeRows: true, // 隔行换色  
		bbar : new Ext.PagingToolbar({
			pageSize : 20,
			store : store,
			displayInfo : true,
			displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
			emptyMsg : '没有记录'

		}),
		cm : new Ext.grid.ColumnModel( [
//			sm,
			rm,
			{
				header : '名称 ',
				dataIndex : 'name',
				width : 100 
			},			
			{
				header : '证书编号',
				dataIndex : 'license',
				sortable : true
			},	
			{
				header : '起始日期',
				dataIndex : 'startDate',
				sortable : true
			},
			{
				header : '期限',
				dataIndex : 'deadline',
				sortable : true
			},
			{
				header : '发证机关',
				dataIndex : 'issuingauthority',
				width : 100,
				sortable : true
			},
			{
				header : '内容',
				dataIndex : 'content',
				sortable : true 
			},{
				header : '备注',
				dataIndex : 'note',
				sortable : true
			} ])
	}); 

	return grid;
}

