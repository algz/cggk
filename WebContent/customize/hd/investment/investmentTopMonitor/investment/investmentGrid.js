var investmentGrid = {
	userId : null
};

//虚拟数据
var data = {
	"id" : "",
	"totalProperty" : 19,
	"results" : [ {
		"id":'aaasssxcxx1111',
		"projectCode":'PZS-20069090',
		"projectName":'A厂房建设',
		"status":'100',
		"editors":'里斯',
		"paid":'50',
		"contractDate":'2011-09-08' 
	},{
		"id":'aaasssxcxx1112',
		"projectCode":'PZS-20069090',
		"projectName":'B厂房建设',
		"status":'40',
		"editors":'里斯',
		"paid":'200',
		"contractDate":'2011-09-11' 
	},{
		"id":'aaasssxcxx1113',
		"projectCode":'PZS-20100521',
		"projectName":'厂房建设',
		"status":'70',
		"editors":'里斯',
		"paid":'100',
		"contractDate":'2009-12-03' 
	}  ],
	"success" : true,
	"msg" : ""
};
var pr = [ "id", "projectCode", "projectName", "status", "editors", "paid", "contractDate" ];
var st = new Ext.data.Store( {
	proxy : new Ext.data.MemoryProxy(data),
	reader : new Ext.data.JsonReader( {
		root : 'results',
		id : 'id',
		totalProperty : 'totalProperty'
	}, pr)
});
//虚拟数据 结束  //使用时只需修改 
// 数据列表
investmentGrid.gridPanel = function() {
	var rm = new Ext.grid.RowNumberer();
//	var store = new Ext.data.Store(
//			{
//				proxy : new Ext.data.HttpProxy( {
//					url : '../JSON/unplannedPurchase_UnplannedPurchaseRemote.getGridData?d='
//							+ new Date(),
//					method : 'post'
//				}),
//				reader : new Ext.data.JsonReader( {
//					root : 'results',
//					id : 'procurementContractId',
//					totalProperty : 'totalProperty'
//				}, [ 'procurementContractId', 'projectCode', 'applicationStatus',
//						'editors'])
//			});
	var cm = new Ext.grid.ColumnModel( [
			rm,
			{
				header : '项目编号 ',
				dataIndex : 'projectCode',
				width : 100,
				renderer : function(value){
				return '<p style="color:red;">'+value+'</p>';
		}
			},			
			{
				header : '项目名称',
				dataIndex : 'projectName'
			},
			{
				header : '当前状态',
				dataIndex : 'status',
				width : 300,
				renderer : function(value){
						return '<p style="background-color:green; width:'+value+'%">选型--招标--签订合同--预验收--正式验收</p>';
				}
			},
			{
				header : '负责人',
				dataIndex : 'editors',
				sortable : true
			},
			{
				header : '已付款 ',
				dataIndex : 'paid',
				width : 100
			},
			{
				header : '合同签订日 ',
				dataIndex : 'contractDate',
				width : 100				
			} ]);

//	var grid = common.gridPanel('investmentGridPanelId', cm, store, true, '投资状态表');
//	store.baseParams = {start : 0, limit: 20};
//	store.load();
	var grid = common.gridPanel('investmentGridPanelId', cm, st, true, '投资状态表');
	st.load();//使用时只需修改 为 store 并修改相关参数
	return grid;
}

