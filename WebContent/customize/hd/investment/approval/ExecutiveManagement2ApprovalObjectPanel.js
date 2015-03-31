//工程项目执行管理-采购合同管理 审批明细
ExecutiveManagement2ApprovalObjectPanel = {};
ExecutiveManagement2ApprovalObjectPanel.init = function(id){

		var store = new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
								url : '../JSON/engineeringProject_EngineeringProjectExecutiveManagementRemote.getGridData?d='+ new Date(),
								method : 'post'
							}),
					reader : new Ext.data.JsonReader({
								root : 'results',
								totalProperty : 'totalProperty',
								id : 'id'
							}, [    'id','civilRegistId',
							'projectCode','projectName',
							'nums','numsunit',
							'projectManagerid','projectManagerName',
							'useunit',
							'status','remarke',
							'planFileArrivalTime','planFileArrivalDutyPerson','planLocationFinishTime',
							'planLocationFinishDutyPerson','buildingPlanFinishTime','buildingPlanFinishDutyPerson',
							'licenseFinishTime','licenseFinishDutyPerson','constructionDesignFinishTime',
							'constructionDesignDutyPerson','approvalTime','approvalDutyPerson',
							'tenderTime','tenderDutyPerson','contractSignedTime',
							'contractSignedDutyPerson','startWorkTime','startWorkPerson','mainAcceptanceTime',
							'mainAcceptanceDutyPerson','deliverTime','deliverDutyPerson',
							'lastupdateTime','projectCode','projectName','nums','numsunit',
							'projectManagerid','useunit',
							'createtime' ,'lastupdateTime','status','remarke',
							'fixedAssetAcceptanceApplyId','civilregistId',
							'applyAcceptanceTime','applyAcceptanceTime','tel','contractmanuFacturers','contractmanuFacturersTel',
							'contactPerson','opinion'
							]),
					pruneModifiedRecords : true,
					autoLoad : true,
					baseParams : {
						start : 0,
						limit : 25,
						id : id
					}
				});
				
				
				
		var continentGroupRow = new Ext.ux.grid.ColumnHeaderGroup({
	    	// 注:数组元素也为数组类型
			//多表头
			rows : [[{
				header : '',
				colspan : 8,
				align : 'center'
			}, 
			{
				header : '项目节点',
				colspan : 11,
				align : 'center'
			},
			{
				header : '',
				colspan : 3,
				align : 'center'
			}]]
		});
		var rm = new Ext.grid.RowNumberer({header : "序号",width : 40 });
		var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});//只能单选
		
		var cm = new Ext.grid.ColumnModel([ 
				rm, {
					    header : '项目ID',
						name : 'civilRegistId',
						hidden : true,
						dataIndex : 'civilRegistId'
					},{
						header : '项目编号',
						dataIndex : 'projectCode',
						width : 160,
						sortable : true
					}, {
						header : '项目名称',
						dataIndex : 'projectName',
						width : 160,
						sortable : true
					}, {
						header : '数量',
						dataIndex : 'nums',
						width : 100,
						sortable : true
					},{
						header : '数量单位',
						dataIndex : 'numsunit',
						width : 100,
						sortable : true
					},  {
						id : "projectmanagernameID",
						header : '项目主管',
						dataIndex : 'projectManagerName',
						width : 150,
						sortable : true,
						editor : new Ext.form.TextField()  //一般的编辑框
					}, {
						header : '使用单位',
						dataIndex : 'useunit',
						width : 100,
						sortable : true
					}, 
					{
						header : '规划文件下达日期',
						dataIndex : 'planFileArrivalTime',
						width : 200,
						sortable : true,
						renderer:function(value){
									if(value instanceof Date){ 
										return new Date(value).format("Y-m-d"); 
									}else{ 
										return value; 
									}
						},
						editor : new Ext.form.DateField({
									format : 'Y-m-d'
						}),
						editable : true
					}, 
					{
						header : '规划方案及选址工作完成日期',
						dataIndex : 'planLocationFinishTime',
						width : 200,
						sortable : true,
						editor : new Ext.form.DateField({
									format : 'Y-m-d'
								}),
						renderer:function(value){
									if(value instanceof Date){ 
										return new Date(value).format("Y-m-d"); 
									}else{ 
										return value; 
									}
						}
					},  
					{
						header : '初步建设方案完成日期',
						dataIndex : 'buildingPlanFinishTime',
						width : 200,
						sortable : true,
						editor : new Ext.form.DateField({
									format : 'Y-m-d'
								}),
						renderer:function(value){
									if(value instanceof Date){ 
										return new Date(value).format("Y-m-d"); 
									}else{ 
										return value; 
									}
						}
					}, 
					{
						header : '规划许可证办理完成日期',
						dataIndex : 'licenseFinishTime',
						width : 200,
						sortable : true,
						editor : new Ext.form.DateField({
									format : 'Y-m-d'
								}),
						renderer:function(value){
									if(value instanceof Date){ 
										return new Date(value).format("Y-m-d"); 
									}else{ 
										return value; 
									}
						}
					},
					{
						header : '施工设计完工日期',
						dataIndex : 'constructionDesignFinishTime',
						width : 200,
						sortable : true,
						editor : new Ext.form.DateField({
									format : 'Y-m-d'
								}),
						renderer:function(value){
									if(value instanceof Date){ 
										return new Date(value).format("Y-m-d"); 
									}else{ 
										return value; 
									}
						}
					}, 
					{
						header : '招标控制价编制和审批日期',
						dataIndex : 'approvalTime',
						width : 200,
						sortable : true,
						editor : new Ext.form.DateField({
									format : 'Y-m-d'
								}),
						renderer:function(value){
									if(value instanceof Date){ 
										return new Date(value).format("Y-m-d"); 
									}else{ 
										return value; 
									}
						}
					},
					{
						header : '施工总包招标定标工作完成日期',
						dataIndex : 'tenderTime',
						width : 200,
						sortable : true,
						editor : new Ext.form.DateField({
									format : 'Y-m-d'
								}),
						renderer:function(value){
									if(value instanceof Date){ 
										return new Date(value).format("Y-m-d"); 
									}else{ 
										return value; 
									}
						}
					}, 
					{
						header : '合同签订日期',
						dataIndex : 'contractSignedTime',
						width : 200,
						sortable : true,
						editor : new Ext.form.DateField({
									format : 'Y-m-d'
								}),
						renderer:function(value){
									if(value instanceof Date){ 
										return new Date(value).format("Y-m-d"); 
									}else{ 
										return value; 
									}
						}
					},  
					{
						header : '开工日期',
						dataIndex : 'startWorkTime',
						width : 200,
						sortable : true,
						editor : new Ext.form.DateField({
									format : 'Y-m-d'
								}),
						renderer:function(value){
									if(value instanceof Date){ 
										return new Date(value).format("Y-m-d"); 
									}else{ 
										return value; 
									}
						}
					}, 
					{
						header : '主体验收日期',
						dataIndex : 'mainAcceptanceTime',
						width : 200,
						sortable : true,
						editor : new Ext.form.DateField({
									format : 'Y-m-d'
								}),
						renderer:function(value){
									if(value instanceof Date){ 
										return new Date(value).format("Y-m-d"); 
									}else{ 
										return value; 
									}
						}
					}, 
					{
						header : '交付日期',
						dataIndex : 'deliverTime',
						width : 200,
						sortable : true,
						editor : new Ext.form.DateField({
									format : 'Y-m-d'
								}),
						renderer:function(value){
									if(value instanceof Date){ 
										return new Date(value).format("Y-m-d"); 
									}else{ 
										return value; 
									}
						}
					}, 
					{
						header : '状态',
						dataIndex : 'status',
						width : 100,
						sortable : true,
						renderer : function(value, cellmeta, record, rowIndex) {
							var status = record.get('status');
							if (status == 1) {
								return '编制中';
							} else if (status == 2) {
								return '审批中';
							} else if (status == 3) {
								return '已审批';
							} else {
								return value;
							}
						}
					},
					{
						header : '备注',
						dataIndex : 'remarke',
						width : 100,
						sortable : true
					},
					{
						header : '审批记录',
						dataIndex : '',
						width : 100,
						align : 'center',
						sortable : true,
						renderer : function(value, cellmeta, record, rowIndex) {
							var id = record.get('id');
							if (record.get('status') != 1) {
								return "<a href='javascript:void(0);' onclick=approvalInfoList.showWin('"+id+"')><font color=blue>查看</font></a>";
							}
						}
					}
					
		]);
		
		
		
		
		
		

	
var editorGridPanel = new Ext.grid.GridPanel({
	title : '执行管理', // 扩展时初始化
	id : 'executiveManagement2Grid', // 对象名+类型后缀(Grid)
	loadMask : {
	      msg : '正在加载数据,请稍后...'
	},
	frame: true, //True表示为面板的边框外框可自定义的 
    columnLines : true,//True表示为在列分隔处显示分隔符
    stripeRows: true, //隔行变色，区分表格行
    clicksToEdit: 100, //表示点击多少次数才可以编辑表格
    //collapsible: true, //是否在右上角显示收缩按钮  
    //animCollapse: true, //表示收缩（闭合）面板时，显示动画效果  
    trackMouseOver: true, //鼠标在行上移动时显示高亮  
    enableColumnMove: false,//禁止用户拖动表头  
	viewConfig : {
		enableRowBody : true
	},
	store : store,
	plugins : continentGroupRow,
	cm : cm,
	sm : sm,
	bbar : new Ext.PagingToolbar({
						pageSize : 25,
						store : store,
						displayInfo : true,
						displayMsg : '当前行数{0} - {1} 共 {2} 行',
						emptyMsg : "未查询到数据"
					})
	//tbar :  { items : [tbar1]}
});



return editorGridPanel;
}