/** 
 * @author zhaodw
 * @version 1.0
 * @create 2011-11-21
 * 
 */
var venderEvaluationGrid = {
	userId : null
};

// 数据列表
venderEvaluationGrid.gridPanel = function() {
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
				}, [ 'vendorID', 'vendorName', 'vendorCode', 'businessScope',
					 'scale','evaluation_status','createrName','create_date',
					 'remark','vendorLevel','type','kind','kindClass'])
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
				header : '保密资质等级',
				dataIndex : 'vendorLevel',
				width : 100,
				sortable : true
			},
			{
				header : '类别',
				dataIndex : 'type',
				width : 100,
				editor:new Ext.form.ComboBox({
    typeAhead: true,//必须项
    triggerAction: 'all',//必须项
    lazyRender:true,
    resizable:true,//是否手动扩展大小,默认false
    mode: 'local',
    forceSelection:true,//限制输入范围在可选择的文本内
    editable:false,//不允许输入,只能选择文本列表
    store: new Ext.data.ArrayStore({
        id: 0,
        fields: [
            'value',
            'displayText'
        ],
        data: [[1, '合格'], [2, '试供']]
    }),
    valueField: 'value',
    displayField: 'displayText'
}),
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
			},
			{
				header : '选评送审状态',
				dataIndex : 'evaluation_status',
				sortable : true,
				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
				store) { 
				    if(record.get("evaluation_status")=="0")
						return '编制中'; 
					else if(record.get("evaluation_status")=="1")
						return '已送审'; 
					else if(record.get("evaluation_status")=="2")
						return '已通过';
					else return '编制中';
				}
			},{
						header : '审批记录',
						dataIndex : '',
						renderer : function(value, cellmeta, record, rowIndex){
							var id =record.get("vendorID")
							var applicationStatus = record.get("evaluation_status");
//							if(applicationStatus!="0"){
								return "<a href='javascript:void(0);' onclick=approvalInfoList.showWin('"
									+id+"')><font color=blue>查看</font></a>";
//							}			
						},
						sortable : true
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
	var tbar = [ '-', {
		text : '送审',
		iconCls : 'Send',
		handler : function() {
			venderRegisterAction.send("venderEvaluationGridPanelId");  
		}
	},'-', {
		text : '查询',
		iconCls : 'search1',
		handler : function() {
			venderEvaluationQuery.getSearchForm().show();
		}
	}  ];
//	var grid = common.gridPanel('venderEvaluationGridPanelId', cm, store, tbar, true, sm,
//			'供应商信息'); 
	var grid = new Ext.grid.EditorGridPanel({
		id : 'venderEvaluationGridPanelId',
		cm : cm,
		sm : sm,
		store : store,
		autoScroll : true,
		columnLines : true,
		stripeRows : true,
		viewConfig : {
			enableRowBody : true
		},
		listeners:{
			"beforeedit":function(e){ 
/* 
                e = { 
                    grid: this, 
                    record: r, 
                    field: field, 
                    value: r.data[field], 
                    row: row, 
                    column: col, 
                    cancel:false 
                }; 
*/ 
   if(e.record.get('evaluation_status')!=0){ 
      return false; // 中止，不让编辑 
   } 
}
		
		},
		tbar : tbar,
		bbar : new Ext.PagingToolbar({
		pageSize:20,
		store:store,
		displayInfo:true,
		displayMsg:'显示第{0}条到{1}条记录,一共{2}条',
		emptyMsg:'没有记录'
	})
	});

	return grid;
}

venderEvaluationGrid.tabPanel = function() {
	var tab = new Ext.Panel( {
		title : '供应商选评',
		id : 'venderEvaluationGridTab',
		layout : 'fit',
		items : [ venderEvaluationGrid.gridPanel() ],
		listeners : {
			'activate' : function() { 
				var grid = Ext.getCmp('venderEvaluationGridPanelId'); 
				grid.store.baseParams = {start :0 ,limit : 20};
				grid.store.load();
			}
		}
	});

	return tab;
};
