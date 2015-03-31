//土建大修汇总审批查看明细
CivilRepairSummaryApprovalObjectPanel = {};
CivilRepairSummaryApprovalObjectPanel.init = function(id){
		
		var store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						url : '../JSON/peSummaryRemote.getCivilRepairStockList?d='+new Date(),
						method : 'post'
					}),
			reader : new Ext.data.JsonReader({
						root : 'results',
						id : 'id',
						totalProperty : 'totalProperty'
					}, ['repairproject','plancost','costunit','annualinvestment','repairarea',
					'areaunit','useunit','repaircontent','categorys','approvalstate',
					'remark','id'])
		});
		var cm = new Ext.grid.ColumnModel([{  
				id : 'repairproject',
			    header : '维修项目',
				dataIndex : 'repairproject',
				sortable : true,
				width : 120 
			}, { 
		        id : 'plancost',
		        header : '计划费用',
				dataIndex : 'plancost',
				sortable : true,
				width : 130
					 
			},{ 
				id : 'costunit',
				header : '单位',
			    dataIndex : 'costunit',
				sortable : true,
			    width : 120 
			},{ 
				id : 'annualinvestment',
				header : '本年投资额',
				dataIndex : 'annualinvestment',
				sortable : true,
				width : 120 
			},{ 
				id : 'repairarea',
				header : '修理面积',
				dataIndex : 'repairarea',
				sortable : true,
				width : 120 
			},{ 
				id : 'areaunit',
				header : '单位',
				dataIndex : 'areaunit',
				sortable : true,
				width : 120 
			},{ 
				id : 'useunit',
				header : '使用单位',
				dataIndex : 'useunit',
				sortable : true,
				width : 120 
			},{ 
				id : 'repaircontent',
				header : '维修内容',
				dataIndex : 'repaircontent',
				sortable : true,
				width : 120 
			},{ 
				id : 'categorys',
				header : '类别',
				dataIndex : 'categorys',
				sortable : true,
				width : 120 
			},{ 
				id : 'approvalstate',
				header : '状态',
				dataIndex : 'approvalstate',
				sortable : true,
				width : 120 
			},{ 
				id : 'remark',
				header : '审批记录',
				dataIndex : 'remark',
				sortable : true,
				width : 120 
			},{ 
				id : 'remark',
				header : '备注',
				dataIndex : 'remark',
				sortable : true,
				width : 120 
			}
		]);
		var grid = new Ext.grid.GridPanel({
			title : '固定资产（房屋）大修项目明细表',
			width : 300,
			id : 'repairStockGrid',
			cm : cm, 
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