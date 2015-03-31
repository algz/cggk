EquipPurchasePlanApprovalObjectPanel = {}
EquipPurchasePlanApprovalObjectPanel.init = function(id){

		var store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						url : '../JSON/pePlanRemote.getEquipRegistPlanList?d='+new Date(),
						method : 'post'
					}),
			reader : new Ext.data.JsonReader({
						root : 'results',
						id : 'id',
						totalProperty : 'totalProperty'
					}, ['projectname','referencemodel','mainparam','nums',
					'numsunit','marketprice','schedule',
					'installsite','installcondition','mainuse',
					'demandreason','categorys','approvalstate',
					'createtime','remarke','uploadfile','id',
					'projectnum','costnum','investmentplan',
					'totalinvestmentplan','annualbudget'])
		});
		var cm = new Ext.grid.ColumnModel([{ 
	        	header : '项目编号',
				dataIndex : 'projectnum',
				id : 'projectnum',
				sortable : true,
				width : 120
			 },{  
			    header : '费用编号',
			    id : 'costnum',
				dataIndex : 'costnum',
				sortable : true,
				width : 120 
			}, { 
		        header : '资金来源',
				dataIndex : 'planSource',
				sortable : true,
				width : 130
					 
			},{ 
				header : '项目名称',
			    dataIndex : 'projectname',
				sortable : true,
			    width : 120 
			},{ 
				header : '参考型号',
				dataIndex : 'referencemodel',
				sortable : true,
				width : 120 
			},{ 
				header : '主要性能参数及配置',
				dataIndex : 'mainparam',
				sortable : true,
				width : 120 
			},{ 
				header : '数量',
				dataIndex : 'nums',
				sortable : true,
				width : 120 
			},{ 
				header : '单位',
				dataIndex : 'numsunit',
				sortable : true,
				width : 120 
			},{ 
				id : 'investmentplan',
				header : '投资计划',
				dataIndex : 'investmentplan',
				sortable : true,
				width : 120
			},{ 
				header : '累计完成投资',
				id : 'totalinvestmentplan',
				dataIndex : 'totalinvestmentplan',
				sortable : true,
				width : 120 
			},{ 
				id : 'annualbudget',
				header : '本年预算',
				dataIndex : 'annualbudget',
				sortable : true,
				width : 120
			},{ 
				header : '进度要求',
				dataIndex : 'schedule',
				sortable : true,
				width : 120 
			},{ 
				header : '交付时间',
				dataIndex : '',
				sortable : true,
				width : 120 
			},{ 
				header : '安装地点',
				dataIndex : 'installsite',
				sortable : true,
				width : 120 
			},{ 
				header : '安装条件',
				dataIndex : 'installcondition',
				sortable : true,
				width : 120 
			},{ 
				header : '主要用途',
				dataIndex : 'mainuse',
				sortable : true,
				width : 120 
			},{ 
				header : '需求原因',
				dataIndex : 'demandreason',
				sortable : true,
				width : 120 
			},{ 
				header : '类别',
				dataIndex : 'categorys',
				sortable : true,
				width : 120 
			},{ 
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
			}
			
			
		]);
		var grid = new Ext.grid.EditorGridPanel({
			title : '设备采购计划',
			width : 300,
			id : 'equipPurchasePlanGrid',
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