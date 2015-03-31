CivilServiceExecutePlanApprovalObjectPanel = {}
CivilServiceExecutePlanApprovalObjectPanel.init = function(id){
	var sm = new Ext.grid.CheckboxSelectionModel(); 
	var store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
					url : '../JSON/civilServiceManageRemote.getGridData?d=' + new Date(),
					method : 'post'
				}),
		reader : new Ext.data.JsonReader({
					root : 'results',
					id : 'id',
					totalProperty : 'totalProperty'
				}, ['id','projectNum','repairProject','repairArea','repairContent',
						'headPerson','projectManager','status','headPersonId','projectManagerId',
						{name : 'thinRequireTime', type : 'date', dateFormat :'Y-m-d'},
						{name : 'completeBidsTime', type : 'date', dateFormat :'Y-m-d'},
						{name : 'beginCardTime', type : 'date', dateFormat :'Y-m-d'},
						{name : 'formalBeginTime', type : 'date', dateFormat :'Y-m-d'},
						{name : 'subApprovalTime', type : 'date', dateFormat :'Y-m-d'},
						{name : 'thinRequireTimeExecute', type : 'date', dateFormat :'Y-m-d'},
						{name : 'completeBidsTimeExecute', type : 'date', dateFormat :'Y-m-d'},
						{name : 'beginCardTimeExecute', type : 'date', dateFormat :'Y-m-d'},
						{name : 'formalBeginTimeExecute', type : 'date', dateFormat :'Y-m-d'},
						{name : 'subApprovalTimeExecute', type : 'date', dateFormat :'Y-m-d'},
						'remark','useUnit'
					])
	});
	var cm = new Ext.grid.ColumnModel([sm, 
              new Ext.grid.RowNumberer({
				 header : "序号",
				 width : 40
			 }),{ 
	            id : 'projectNum',
	        	header : "项目编号",
				dataIndex : 'projectNum',
				sortable : true,
				width : 100
			 },{  
				id : 'repairProject',
			    header : "项目名称",
				dataIndex : 'repairProject',
				sortable : true,
				width : 100 
			},{  
			    header : '维修面积',
				dataIndex : 'repairArea',
				sortable : true,
				width : 100 
			},{  
			    header : '维修内容',
				dataIndex : 'repairContent',
				sortable : true,
				width : 70 
			},{  
			    header : '使用单位',
				dataIndex : 'useUnit',
				sortable : true,
				width : 70 
			},{  
			    header : '项目主管<span style="color:red;">**</span>',
				dataIndex : 'projectManager',
				sortable : true,
				width : 70 
			},{ 
				header : '状态',
				dataIndex : 'status',
				sortable : true,
				width : 60 ,
				renderer : function(value, cellmeta, record, rowIndex){
					if (value == 3) {
						return "<font color=red>待审批</font>";
					}else if(value == -3){
						return "<font color=red>已退回</font>";
					}else if(value == 4){
						return "<font color=red>审批中</font>";
					}else if(value==5){
						return "<font color=green>已审批</font>";
					}
				}
			},{
				header : '审批记录',
				dataIndex : '',
				sortable : true,
				width : 70,
				renderer : function(value, cellmeta, record, rowIndex) {
					var id = record.get('id');
					if (record.get('status') == 5) {
						return "<a href='javascript:void(0);' onclick=approvalInfoList.showWin('" + id + "')><font color=blue>查看</font></a>";
					}
				}
			},{ 
		        header : '细化需求(公用签)<span style="color:red;">*</span>',
				dataIndex : 'thinRequireTimeExecute',
				sortable : true,
				width : 100,
				renderer : Ext.util.Format.dateRenderer("Y-m-d")
					 
			},{ 
				header : '完成招标(下浮点)<span style="color:red;">*</span>',
			    dataIndex : 'completeBidsTimeExecute',
				sortable : true,
			    width : 100,
				renderer : Ext.util.Format.dateRenderer("Y-m-d") 
			},{ 
				header : '开工卡片填报审签<span style="color:red;">*</span>',
				dataIndex : 'beginCardTimeExecute',
				sortable : true,
				width : 100,
				renderer : Ext.util.Format.dateRenderer("Y-m-d") 
			},{ 
				header : '正式开工<span style="color:red;">*</span>',
				dataIndex : 'formalBeginTimeExecute',
				sortable : true,
				width : 100,
				renderer : Ext.util.Format.dateRenderer("Y-m-d") 
			},{ 
				header : '提交验收<span style="color:red;">*</span>',
				dataIndex : 'subApprovalTimeExecute',
				sortable : true,
				width : 100,
				renderer : Ext.util.Format.dateRenderer("Y-m-d") 
			},{ 
				header : '备注',
				dataIndex : 'remark',
				sortable : true,
				width : 100 
			}
		]);
	var grid = new Ext.grid.GridPanel({
		width : 300,
		id : 'civilServiceExecutePlanGrid',
		cm : cm, 
		sm : sm,
		columnLines : true,
		stripeRows : true,
		region : 'center',
		store : store,
		loadMask : {
	    	 msg : '正在加载数据，请稍侯……'
	    }
	});
	store.baseParams = {start:0,limit:20,id : id};
	store.reload();
	return grid;
}