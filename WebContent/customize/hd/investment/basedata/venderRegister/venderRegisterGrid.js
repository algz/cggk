/** 
 * @author zhaodw
 * @version 1.0
 * @create 2011-11-21
 * 
 */
var venderRegisterGrid = {
	userId : null
};

// 数据列表
venderRegisterGrid.gridPanel = function() {
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var store = new Ext.data.Store(
			{
				proxy : new Ext.data.HttpProxy( {
					url : '../JSON/vendor_VendorRemote.getGridData?d='
							+ new Date(),
					method : 'post'
				}),
				reader : new Ext.data.JsonReader( {
					root : 'results',
					id : 'vendorID',
					totalProperty : 'totalProperty'
				}, [ 'vendorID', 'vendorName', 'vendorCode', 'accountID','kind',
						'address', 'bank', 'businessScope','kindClass',
						'initialEvaluationDate', 'vendorLevel', 'phone',
						'reviewResult', 'reviewDate', 'taxID', 'materialItemName',
						'topTypeName','reposal','property','productVentor',
		    	        "sector","sector","email","zipCode","license",
		    	        "egal","setUpDate","registeredCapital" , "bank2","bank2"  ,
		                "bank2","bank3","deliveryAddress" , "availability","trial_comment",
		                "simpleName","scale","remark","type","fax","trial_comment","create_date",
		                "evaluation_status","trial_comment","creater","trial_status",'createrName',
		                'create_date','licenseTime','deadLine','content','secrecyLicense','produceLicense','mark','productVendor'])
			});
	var cm = new Ext.grid.ColumnModel( [
			sm,
			rm,
			{
				header : '供应商编号 ',
				dataIndex : 'vendorCode',
				width : 100,
				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
				store) { 
					var mark = record.get("mark");
					if(mark=="0")
						return "<a href=javascript:void(0); onclick=vendorQualificationAction.showVendorQualificationList('venderRegisterGridPanelId'); ><font color=blue>"+value+"</font></a>"; 
					else
						return "<a href=javascript:void(0); onclick=vendorQualificationAction.showVendorQualificationList('venderRegisterGridPanelId'); ><font color=red>"+value+"</font></a>"; 
				}
			},			
			{
				header : '供应商名称',
				dataIndex : 'vendorName',
				sortable : true
			},
			{
				header : '规模 ',
				dataIndex : 'scale',
				width : 100,
				sortable : true
			},
			{
				header : '经营范围',
				dataIndex : 'businessScope',
				width : 100,
				sortable : true
			},
			{
				header : '供应商类型',
				dataIndex : 'kind',
				width : 100,
				sortable : true,
				renderer : function(value, cellmeta, record, rowIndex){
					if (value == 1) {
						return '固定资产类供应商';
					}else {
						return '消耗类供应商';// value;
					}
				}
			},
			{
				header : '供应商类别',
				dataIndex : 'kindClass',
				width : 100,
				sortable : true,
				renderer : function(value, cellmeta, record, rowIndex){
					if (value == 1) {
						return '生产商';
					}else {
						return '供应商';// value;
					}
				}
			},
			{
				header : '选评送审状态',
				//程序原有送审状态，先去掉登记的送审，固此地改为显示选评送审状态
//				dataIndex : 'trial_status',
				dataIndex : 'evaluation_status', 
				sortable : true,
				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
				store) { 
//				    if(record.get("trial_status")=="0")
//						return '编制中'; 
//					else if(record.get("trial_status")=="1")
//						return '已送审'; 
//					else if(record.get("trial_status")=="2")
//						return '已通过'; 
				if(value=="0")
					return '编制中'; 
				else if(value=="1")
					return '已送审'; 
				else if(value=="2")
					return '已通过'; 
					else 
						return '编制中';
				}
			},
			{
				header : '申报人 ',
				dataIndex : 'createrName',
				width : 100	,
				sortable : true			
			},
			{
				header : '登记时间 ',
				dataIndex : 'create_date',
				width : 100	,
				sortable : true			
			},
			{
				header : '备注 ',
				dataIndex : 'remark',
				width : 300	,
				sortable : true			
			} ]);
	var tbar = [
		'-', {
		text : '新增',
		iconCls : 'add1',
		handler : function() {
			vendorAction.addView();
		}
	}, '-', {
		text : '编辑',
		iconCls : 'edit1',
		handler : function() {
			vendorAction.editView();
		}
	}, '-', {
		text : '删除',
		iconCls : 'del1',
		handler : function() {
			vendorAction.del();
		}
	}, '-', 
//	{
//		text : '送审',
//		iconCls : 'Send',
//		handler : function() {
//			venderRegisterAction.send("venderRegisterGridPanelId");
//		}
//	},'-',
	{
		text : '查询',
		iconCls : 'search1',
		handler : function() {
			venderRegisterAction.seach();
		}
	},
	{
		text : '供应商资质',
		iconCls : 'add1',
		handler : function() {
			vendorQualificationAction.showVendorQualificationList('venderRegisterGridPanelId');
		}
	},
	{
		text : '导出过期供应商资质',
		iconCls : 'icon-exportTasks',
		handler : function() {
			venderRegisterAction.exprot('venderRegisterGridPanelId');
		}
	}
//	, '-', {
//		text : '导入供应商信息',
//		iconCls : 'Import',
//		handler : function() {
//			vendorAction.upload();
//		}
//	}
//	, 
//	'-', {
//		text : '供应商信息模板',
//		iconCls : 'Import',
//		handler : function() {
//			vendorAction.download();
//		}
//	}
	];
	var grid = common.gridPanel('venderRegisterGridPanelId', cm, store, tbar, true, sm,
			'供应商信息'); 
			grid.stripeRows = true
	return grid;
}

venderRegisterGrid.tabPanel = function() {
	var tab = new Ext.Panel( {
		title : '供应商登记',
		id : 'venderRegisterGridTab',
		layout : 'fit',
		items : [ venderRegisterGrid.gridPanel() ],
		listeners : {
			'activate' : function() {
				var grid = Ext.getCmp('venderRegisterGridPanelId'); 
				grid.store.baseParams = {start :0 ,limit : 20};
				grid.store.load();
			}
		}
	});

	return tab;
};
