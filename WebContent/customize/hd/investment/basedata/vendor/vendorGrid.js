var vendorGrid = {
	userId : null
};

// 去除指定的供应商列表
vendorGrid.gridPanel = function(materialIds) {
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var store = new Ext.data.Store(
			{
				proxy : new Ext.data.HttpProxy( {
					url : '../JSON/vendor_VendorRemote.getVendorAppraisalGridData?d='
							+ new Date()+'&selectStatus='+1,
					method : 'post'
				}),
				reader : new Ext.data.JsonReader( {
					root : 'results',
					id : 'vendorID',
					totalProperty : 'totalProperty'
				}, [ 'vendorID', 'vendorName', 'vendorCode', 'accountID',
						'address', 'bank', 'businessScope','simpleName','type','sector',
						'initialEvaluationDate', 'vendorLevel', 'phone',
						'reviewResult', 'reviewDate', 'taxID', 'materialItemName','reposal','property','productVentor',
		    	        "sector","sector","email","zipCode","license",
		    	        "egal","setUpDate","registeredCapital" , "bank2","bank2"  ,
		                "bank2","bank3","deliveryAddress" , "availability","trial_comment",
		                "simpleName","scale","remark","type","fax","trial_comment","create_date",
		                "evaluation_status","trial_comment","creater","trial_status"])
			});
	var cm = new Ext.grid.ColumnModel( [
			sm,
			rm,
			{
				header : '供应商编号 ',
				dataIndex : 'vendorCode',
				width : 100
			},			
			{
				header : '供应商名称',
				dataIndex : 'vendorName',
				sortable : true
			},			
			{
				header : '供应商简称',
				dataIndex : 'simpleName',
				sortable : true
			},
			{
				header : '经营范围',
				dataIndex : 'businessScope',
				width : 100,
				sortable : true
			},
			{
				header : '类别',
				dataIndex : 'type',
				sortable : true,
				renderer:function(value){
					if(value==1){
						return "合格";
					}else if(value==2){
						return "试供";
					}else {
						return value;
					}
				}
			},{
				header : '所属行业',
				dataIndex : 'sector',
				sortable : true
			},
			/*{
				header : '采购产品名称 ',
//				dataIndex : 'materialItemName',
				dataIndex : 'businessScope',
				width : 100,
				sortable : true
			},*/
			{
				header : '经营地址 ',
				dataIndex : 'address',
				width : 100	,
				sortable : true			
			} ]); 
	var grid = common.gridPanel('vendorGridPanelId', cm, store, null, true, sm,
			'供应商信息');
		grid.width = 500;
		grid.height = 400;
	store.baseParams = {start : 0,limit:20,vendorByMaterial:'1',materialIds:materialIds};
	store.load();
	return grid;
}

