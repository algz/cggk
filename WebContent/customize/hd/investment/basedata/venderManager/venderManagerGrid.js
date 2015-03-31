/** 
 * @author zhaodw
 * @version 1.0
 * @create 2011-11-21
 * 
 */
var venderManagerGrid = {
	userId : null,
	vendorCode : '',
	vendorName : '',
	type : '',
	vendorLevel : '',
	scale : ''
};

// 数据列表
venderManagerGrid.gridPanel = function() {
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
						'address', 'bank', 'businessScope',
						'initialEvaluationDate', 'vendorLevel', 'phone',
						'reviewResult', 'reviewDate', 'taxID', 'materialItemName',
						'topTypeName','reposal','property','productVentor',
		    	        "sector","sector","email","zipCode","license",
		    	        "egal","setUpDate","registeredCapital" , "bank2","bank2"  ,
		                "bank2","bank3","deliveryAddress" , "availability","trial_comment",
		                "simpleName","scale","remark","type","fax","trial_comment","create_date",
		                "evaluation_status","trial_comment","creater","trial_status",'createrName',
		                'create_date','licenseTime','deadLine','content','secrecyLicense','mark',
		                'produceLicense','kind','kindClass',
		                {name:'recentEvaluationDate',type:'date',dateFormat:'Y-m-d'}])//,
//				baseParams :{evaluation_status:'2'}//审核通过的供应商
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
						return "<a href=javascript:void(0); onclick=vendorQualificationAction.showVendorQualificationList('venderManagerGridPanelId'); ><font color=blue>"+value+"</font></a>"; 
					else
						return "<a href=javascript:void(0); onclick=vendorQualificationAction.showVendorQualificationList('venderManagerGridPanelId'); ><font color=red>"+value+"</font></a>"; 
				}
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
				header : '税号',
				dataIndex : 'taxID',
				width : 100,
				sortable : true
			},
			{
				header : '账户',
				dataIndex : 'accountID',
				width : 100,
				sortable : true
			},
			{
				header : '开户行',
				dataIndex : 'bank',
				width : 100,
				sortable : true
			},
			{
				header : '经营地址',
				dataIndex : 'address',
				width : 100,
				sortable : true
			},
			{
				header : '电话',
				dataIndex : 'phone',
				width : 100,
				sortable : true
			},
			{
				header : '传真',
				dataIndex : 'fax',
				width : 100,
				sortable : true
			}, 
			{
				header : '等级',
				dataIndex : 'vendorLevel',
				width : 100,
				sortable : true
			},
			{
				header : '信用度',
				dataIndex : 'reposal',
				width : 100,
				sortable : true
			},
			{
				header : '企业性质',
				dataIndex : 'property',
				width : 100,
				sortable : true
			}, 
			{
				header : '初评日期',
				dataIndex : 'initialEvaluationDate',
				width : 100,
				sortable : true
			},
			{
				header : '复评日期',
				dataIndex : 'reviewDate',
				width : 100,
				sortable : true
			},
				{
				header : '复评结果',
				dataIndex : 'reviewResult',
				width : 100,
				sortable : true
			},
				{
				header : '所属行业',
				dataIndex : 'sector',
				width : 100,
				sortable : true
			},
				{
				header : 'email',
				dataIndex : 'email',
				width : 100,
				sortable : true
			},
				{
				header : '邮编',
				dataIndex : 'zipCode',
				width : 100,
				sortable : true
			},
				{
				header : '企业法人',
				dataIndex : 'egal',
				width : 100,
				sortable : true
			},
			
				{
				header : '成立时间',
				dataIndex : 'setUpDate',
				width : 100,
				sortable : true
			},
			{
				header : '注册资本',
				dataIndex : 'registeredCapital',
				width : 100,
				sortable : true
			},
			 
			{
				header : '银行账户2',
				dataIndex : 'bank2',
				width : 100,
				sortable : true
			},
			{
				header : '银行账户3',
				dataIndex : 'bank3',
				width : 100,
				sortable : true
			},
			{
				header : '发货地址',
				dataIndex : 'deliveryAddress',
				width : 100,
				sortable : true
			},
			{
				header : '供货资格',
				dataIndex : 'availability',
				width : 100,
				sortable : true
			},
			{
				header : '規模',
				dataIndex : 'scale',
				width : 100,
				sortable : true
			},
			{
				header : '类别',
				dataIndex : 'type',
				width : 100,
				sortable : true,
				renderer:function(value){
					if(value==1){
						return "合格";
					}else if(value==2){
						return "试供";
					}else{
						return value;
					}
				}
			},{
				header:'最近考核时间',
				dataIndex:'recentEvaluationDate',
				sortable:true,
				renderer:Ext.util.Format.dateRenderer("Y-m-d")
			
			},
				{
				header : '备注',
				dataIndex : 'remark',
				width : 100,
				sortable : true
			} ]);
	var tbar = [ '-', {
		text : '导出',
		iconCls : 'icon-exportTasks',
		handler : function() {
			venderManagerAction.exportInfo();
		}
	} ,'-', {
		text : '查询',
		iconCls : 'Send',
		handler : function() {
			venderManagerQuery.getSearchForm().show();
		}
	} ,
	{
		text : '导出过期供应商资质',
		iconCls : 'icon-exportTasks',
		handler : function() {
			venderRegisterAction.exprot('venderManagerGridPanelId');
		}
	} ];
	var grid = common.gridPanel('venderManagerGridPanelId', cm, store, tbar, true, sm,
			'供应商信息'); 
	return grid;
}

venderManagerGrid.tabPanel = function() {
	var tab = new Ext.Panel( {
		title : '供应商目录',
		id : 'venderManagerGridPanelTab',
		layout : 'fit',
		items : [ venderManagerGrid.gridPanel() ],
		listeners : {
			'activate' : function() { 
				var grid = Ext.getCmp('venderManagerGridPanelId'); 
				grid.store.baseParams = {start:0,limit:20};
				grid.store.load();
			}
		}
	});

	return tab;
};
