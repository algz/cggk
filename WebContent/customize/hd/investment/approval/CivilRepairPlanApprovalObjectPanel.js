//土建大修计划审批查看明细
CivilRepairPlanApprovalObjectPanel = {};
CivilRepairPlanApprovalObjectPanel.init = function(id){
		var store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						url : '../JSON/pePlanRemote.getCivilRepairPlanList?d='+new Date(),
						method : 'post'
					}),
			reader : new Ext.data.JsonReader({
						root : 'results',
						id : 'id',
						totalProperty : 'totalProperty'
					}, ['repairproject','plancost','costunit','annualinvestment','repairarea',
					'areaunit','useunit','repaircontent','categorys','approvalstate',
					'remark','id','headperson','projectnum','costnum'])
		}); 
		var cm = new Ext.grid.ColumnModel([ 
              new Ext.grid.RowNumberer({
				 header : "序号",
				 width : 40
			 }),{ 
	            id : 'projectnum',
	        	header : "<font color='red'>项目编号*</font>",
				dataIndex : 'projectnum',
				sortable : true,
				width : 120
			 },{  
				id : 'costnum',
			    header : "<font color='red'>费用编号*</font>",
				dataIndex : 'costnum',
				sortable : true,
				width : 120 
			},{  
				id : 'repairproject',
			    header : '维修项目',
				dataIndex : 'repairproject',
				sortable : true,
				width : 100 
			},{  
			    header : '项目主管',
				dataIndex : 'headperson',
				sortable : true,
				width : 70 
			},{ 
				id : 'approvalstate',
				header : '状态',
				dataIndex : 'approvalstate',
				sortable : true,
				width : 50  ,
				renderer : function(value, cellmeta, record, rowIndex){
					var id = record.get('id');
					if (record.get('approvalstate') == "待审批"||record.get('approvalstate') == "已退回") {
						return "<font color=red>"+value+"</font>";
					}else if(record.get('approvalstate')=='已审批'){
						return "<font color=green>"+value+"</font>";
					}else{
						return value;
					}
				}
			}, { 
				id : 'categorys',
				header : '类别',
				dataIndex : 'categorys',
				sortable : true,
				width : 50 
			},{ 
		        id : 'plancost',
		        header : '计划费用',
				dataIndex : 'plancost',
				sortable : true,
				width : 100
					 
			},{ 
				id : 'costunit',
				header : '单位',
			    dataIndex : 'costunit',
				sortable : true,
			    width : 50 
			},{ 
				id : 'annualinvestment',
				header : '本年投资额',
				dataIndex : 'annualinvestment',
				sortable : true,
				width : 100 
			},{ 
				id : 'repairarea',
				header : '修理面积',
				dataIndex : 'repairarea',
				sortable : true,
				width : 100 
			},{ 
				id : 'areaunit',
				header : '单位',
				dataIndex : 'areaunit',
				sortable : true,
				width : 50 
			},{ 
				id : 'useunit',
				header : '使用单位',
				dataIndex : 'useunit',
				sortable : true,
				width : 100 
			},{ 
				id : 'repaircontent',
				header : '维修内容',
				dataIndex : 'repaircontent',
				sortable : true,
				width : 100 
			},{ 
				id : 'remark',
				header : '审批记录',
				dataIndex : 'remark',
				sortable : true,
				width : 100,
				renderer : function(value, cellmeta, record, rowIndex) {
					var id = record.get('id');
					if (record.get('approvalstate') == "已审批"||record.get('approvalstate') == "已退回") {
						return "<a href='javascript:void(0);' onclick = approvalInfoList.showWin('" + id + "')><font color=blue>查看</font></a>";
					}
				} 
			},{ 
				id : 'remark',
				header : '备注',
				dataIndex : 'remark',
				sortable : true,
				width : 100 
			}
		]);
		var grid = new Ext.grid.GridPanel({
			title : '土建大修计划',
			width : 300,
			id : 'civilRepairPlanGrid',
			cm : cm, 
			columnLines : true,
			stripeRows : true,
			region : 'center',
			clicksToEdit: 1,
			store : store,
			loadMask : {
		    	 msg : '正在加载数据，请稍侯……'
		    }
		});
		
		store.baseParams = {start:0,limit:20,id : id};
		store.reload();
		return grid;
	}