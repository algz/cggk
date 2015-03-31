//土建采购计划审批查看明细
CivilPurchasePlanApprovalObjectPanel = {};
CivilPurchasePlanApprovalObjectPanel.init = function(id){

		var store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						url : '../JSON/pePlanRemote.getCivilRegistPlanList?d='+new Date(),
						method : 'post'
					}),
			reader : new Ext.data.JsonReader({
						root : 'results',
						id : 'id',
						totalProperty : 'totalProperty'
					}, ['projectname','constructiontype','nums','numsunit','investmentbudget',
					'financeunit','constructionsite','deliverytime','useunit','mainuse',
					'demandreason','remarke','approvalstate','id',
					'schedule','budgetnum','fundsource','annualinvestmentplan',
					'projectnum','costnum','totalinvestmentplan','annualbudget'])
		});
		
		var cm = new Ext.grid.ColumnModel([ 
			 { 
	            id : 'projectnum',
	        	header : '项目编号',
				dataIndex : 'projectnum',
				sortable : true,
				width : 120,
				editor: new Ext.form.TextField({
                    allowBlank: false
                })
			 },{  
				id : 'costnum',
			    header : '费用编号',
				dataIndex : 'costnum',
				sortable : true,
				width : 120 ,
				editor: new Ext.form.TextField({
                    allowBlank: false
                })
			}, { 
		        id : 'fundsource',
		      //  header : '经营计划编号',
		        header : '资金来源',
				dataIndex : 'fundsource',
				sortable : true,
				width : 130
					 
			},{ 
				id : 'projectname',
				header : '项目名称',
			    dataIndex : 'projectname',
				sortable : true,
			    width : 120 
			},{ 
				id : 'constructiontype',
				header : '建设性质',
				dataIndex : 'constructiontype',
				sortable : true,
				width : 120 
			},{ 
				id : 'nums',
				header : '数量',
				dataIndex : 'nums',
				sortable : true,
				width : 120 
			},{ 
				id : 'numsunit',
				header : '单位',
				dataIndex : 'numsunit',
				sortable : true,
				width : 120 
			},{ 
				id : 'investmentbudget',
				header : '投资概算',
				dataIndex : 'investmentbudget',
				sortable : true,
				width : 120 
			},{ 
				id : 'financeunit',
				header : '单位',
				dataIndex : 'financeunit',
				sortable : true,
				width : 120 
			},{ 
				id : 'totalinvestmentplan',
				header : '累计完成投资',
				dataIndex : 'totalinvestmentplan',
				sortable : true,
				width : 120 ,
				editor: new Ext.form.TextField({
                    allowBlank: false
                })
			},{ 
				id : 'annualbudget',
				header : '本年预算',
				dataIndex : 'annualbudget',
				sortable : true,
				width : 120 ,
				editor: new Ext.form.TextField({
                    allowBlank: false
                })
			},{ 
				id : 'constructionsite',
				header : '选址或施工地点',
				dataIndex : 'constructionsite',
				sortable : true,
				width : 120 
			},{ 
				id : 'schedule',
				header : '进度要求',
				dataIndex : 'schedule',
				sortable : true,
				width : 120 
			},{ 
				id : 'deliverytime',
				header : '交付时间',
				dataIndex : 'deliverytime',
				sortable : true,
				width : 120 
			},{ 
				id : 'useunit',
				header : '使用单位',
				dataIndex : 'useunit',
				sortable : true,
				width : 120 
			},{ 
				id : 'mainuse',
				header : '主要用途',
				dataIndex : 'mainuse',
				sortable : true,
				width : 120 
			},{ 
				id : 'demandreason',
				header : '需求原因',
				dataIndex : 'demandreason',
				sortable : true,
				width : 120 
			},{ 
				id : 'approvalstate',
				header : '状态',
				dataIndex : 'approvalstate',
				sortable : true,
				width : 120 
			},{ 
				id : '',
				header : '时间',
				dataIndex : '',
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
		var grid = new Ext.grid.GridPanel({
			title : '土建采购计划',
			width : 300,
			id : 'civilPurchasePlanGrid',
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