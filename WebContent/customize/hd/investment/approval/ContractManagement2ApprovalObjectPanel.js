//工程项目执行管理-采购合同管理 审批明细
ContractManagement2ApprovalObjectPanel = {};
ContractManagement2ApprovalObjectPanel.init = function(id){

		
		var store = new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
								url : '../JSON/engineeringProject_EngineeringProjectRemote.getAll?d='+ new Date(),
								method : 'post'
							}),
					reader : new Ext.data.JsonReader({
								root : 'results',
								totalProperty : 'totalProperty',
								id : 'engineeringContractId'
							 }, ['engineeringContractId','projectCode','projectName','contractCode',
							    'contractName','partTwo','fund','fundUnit',
							    'partOne','contractLevel','unitName','workPerson',
								'contractManagerPerson','superiorPerson','uploadFileId','uploadFile',
								'status','remarks','approvalLog','ymd']
					),
					// autoLoad : true,
					baseParams : {
						start : 0,
						limit : 25,
						time : 0,
						engineeringContractId : id
					}
		});
		store.load();	

	    
	    
	    
		var rm = new Ext.grid.RowNumberer({header : "序号",width : 40 });
	    var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});//只能单选
		//var sm = new Ext.grid.CheckboxSelectionModel({handleMouseDown:Ext.emptyFn});//只能勾选前面的方格,可以多选
		
		var continentGroupRow = new Ext.ux.grid.ColumnHeaderGroup({
	    	// 注:数组元素也为数组类型
			//多表头
			rows : [[{
				header : '',
				colspan : 7,
				align : 'center'
			}, {
				header : '签定单位',
				colspan : 4,
				align : 'center'
			}, {
				header : '',
				colspan : 5,
				align : 'center'
			}]]
		});
		
		
		var cm = new Ext.grid.ColumnModel([ 
			rm,
					{
						header : '合同编号',
						dataIndex : 'contractCode',
						width : 150,
						sortable : true
					}, {
						header : '合同名称',
						dataIndex : 'contractName',
						width : 150,
						align : 'center',
						sortable : true
					},{
						header : '项目编号',
						dataIndex : 'projectCode',
						width : 150,
						sortable : true
					}, {
						header : '项目名称',
						dataIndex : 'projectName',
						width : 150,
						align : 'center',
						sortable : true
					},  {
						header : '乙方',
						dataIndex : 'partTwo',
						width : 100,
						align : 'center',
						sortable : true
					}, {
						header : '单位名称',
						dataIndex : 'unitName',
						width : 100,
						align : 'center',
						sortable : true
					}, {
						header : '经办人',
						dataIndex : 'workPerson',
						width : 150,
						align : 'center',
						sortable : true
					}, {
						header : '合同管理员',
						dataIndex : 'contractManagerPerson',
						width : 150,
						align : 'center',
						sortable : true
					}, {
						header : '行政分管领导',
						dataIndex : 'superiorPerson',
						width : 150,
						align : 'center',
						sortable : true
					}, {
						header : '金额',
						dataIndex : 'fund',
						width : 100,
						align : 'center',
						sortable : true
					}, {
						header : '金额单位',
						dataIndex : 'fundUnit',
						width : 100,
						align : 'center',
						sortable : true
					}, {
						header : '合同秘级',
						dataIndex : 'contractLevel',
						width : 100,
						align : 'center',
						sortable : true
					},{
						header : '状态',
						dataIndex : 'status',
						width : 100,
						align : 'center',
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
					}, {
						header : '审批记录',
						dataIndex : '',
						width : 100,
						align : 'center',
						sortable : true,
						renderer : function(value, cellmeta, record, rowIndex) {
							var id = record.get('engineeringContractId');
							if (record.get('status') != 1) {
								return "<a href='javascript:void(0);' onclick=approvalInfoList.showWin('"+id+"')><font color=blue>查看</font></a>";
							}
						}
					}, {
						header : '备注',
						dataIndex : 'remarks',
						width : 100,
						align : 'center',
						sortable : true
					}
			]);
		

	
var editorGridPanel = new Ext.grid.GridPanel({
	title : '合同管理', // 扩展时初始化
	id : 'contractManagementGrid', // 对象名+类型后缀(Grid)
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