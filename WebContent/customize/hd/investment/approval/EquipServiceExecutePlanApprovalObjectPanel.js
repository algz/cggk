EquipServiceExecutePlanApprovalObjectPanel = {}
EquipServiceExecutePlanApprovalObjectPanel.init = function(id){
	var sm = new Ext.grid.CheckboxSelectionModel(); 
	var store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
					url : '../JSON/equipServiceManageRemote.getGridData?d=' + new Date(),
					method : 'post'
				}),
		reader : new Ext.data.JsonReader({
					root : 'results',
					id : 'id',
					totalProperty : 'totalProperty'
				}, ['id','projectNum','equipName','equipModel',
					'headPerson','projectManager','status','headPersonId','projectManagerId',
					{name : 'repairCardTime', type : 'date', dateFormat :'Y-m-d'},
					{name : 'repairUnitime', type : 'date', dateFormat :'Y-m-d'},
					{name : 'contractSignTime', type : 'date', dateFormat :'Y-m-d'},
					{name : 'subApprovalTime', type : 'date', dateFormat :'Y-m-d'},
					{name : 'repairCardTimeExecute', type : 'date', dateFormat :'Y-m-d'},
					{name : 'repairUnitimeExecute', type : 'date', dateFormat :'Y-m-d'},
					{name : 'contractSignTimeExecute', type : 'date', dateFormat :'Y-m-d'},
					{name : 'subApprovalTimeExecute', type : 'date', dateFormat :'Y-m-d'},
					'remark'
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
			id : 'equipName',
		    header : "修理项目",
			dataIndex : 'equipName',
			sortable : true,
			width : 100 
		},{  
		    header : '设备编号',
			dataIndex : 'equipModel',
			sortable : true,
			width : 100 
		},{  
		    header : '使用单位',
			dataIndex : '',
			sortable : true,
			width : 70 
		},{  
		    header : '项目主管',
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
		}, {
			header : '审批记录',
			dataIndex : '',
			sortable : true,
			width : 70
		},{ 
	        header : '维修卡片填写时间<span style="color:red;">*</span>',
			dataIndex : 'repairCardTimeExecute',
			sortable : true,
			width : 120,
			renderer : Ext.util.Format.dateRenderer("Y-m-d")
				 
		},{ 
			header : '确定维修单位时间<span style="color:red;">*</span>',
		    dataIndex : 'repairUnitimeExecute',
			sortable : true,
		    width : 120 ,
			renderer : Ext.util.Format.dateRenderer("Y-m-d")
		},{ 
			header : '合同签订时间<span style="color:red;">*</span>',
			dataIndex : 'contractSignTimeExecute',
			sortable : true,
			width : 100 ,
			renderer : Ext.util.Format.dateRenderer("Y-m-d")
		},{ 
			header : '提交验收时间<span style="color:red;">*</span>',
			dataIndex : 'subApprovalTimeExecute',
			sortable : true,
			width : 100 ,
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
		id : 'equipServiceExecutePlanGrid',
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