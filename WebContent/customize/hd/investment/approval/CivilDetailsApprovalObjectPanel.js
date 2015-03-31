//土建项目审批查看明细
CivilDetailsApprovalObjectPanel = {};
CivilDetailsApprovalObjectPanel.init = function(id){

		var store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						url : '../JSON/peSummaryRemote.getCivilDetailsList?d='+new Date(),
						method : 'post'
					}),
			reader : new Ext.data.JsonReader({
						root : 'results',
						id : 'id',
						totalProperty : 'totalProperty'
					}, ['projectname','constructiontype','nums','numsunit','investmentbudget',
					'financeunit','constructionsite','deliverytime','useunit','mainuse',
					'demandreason','remarke','approvalstate','id',
					'schedule','budgetnum','fundsource','annualinvestmentplan'])
		}); 
		var cm = new Ext.grid.ColumnModel([{ 
			 	id : 'projectname',
			    header : '项目名称',
				dataIndex : 'projectname',
				sortable : true,
				width : 120 
			}, { 
				id : 'constructiontype',
		        header : '建设性质',
				dataIndex : 'constructiontype',
				sortable : true,
				width : 130
					 
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
				id : 'schedule',
				header : '进度要求',
				dataIndex : 'schedule',
				sortable : true,
				width : 120 ,
				editor: new Ext.form.TextField({
                    allowBlank: false
                })
			},{ 
				id : 'budgetnum',
				header : '总投资预算控制',
				dataIndex : 'budgetnum',
				sortable : true,
				width : 120 ,
				editor: new Ext.form.TextField({
                    allowBlank: false
                })
			},{ 
				id : 'annualinvestmentplan',
				header : '本年计划投资',
				dataIndex : 'annualinvestmentplan',
				sortable : true,
				width : 120 ,
				editor: new Ext.form.TextField({
                    allowBlank: false
                })
			},{ 
				id : 'fundsource',
				header : '资金来源',
				dataIndex : 'fundsource',
				sortable : true,
				width : 120 ,
				editor: new Ext.form.TextField({
                    allowBlank: false
                })
			},{ 
				id : 'fundunit',
				header : '金额单位',
				dataIndex : 'fundunit',
				sortable : true,
				width : 120 
			},{ 
				id : 'constructionsite',
				header : '施工地点',
				dataIndex : 'constructionsite',
				sortable : true,
				width : 120 
			},{ 
				id : '',
				header : '时间',
				dataIndex : '',
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
				header : '审批记录',
				dataIndex : '',
				sortable : true,
				width : 120 
			},{ 
				id : 'remarke',
				header : '备注',
				dataIndex : 'remarke',
				sortable : true,
				width : 120 
			}
		]);
		var grid = new Ext.grid.GridPanel({
			title : '固定资产投资计划土建项目明细表',
			width : 300,
			id : 'civilDetailsGrid',
			cm : cm, 
			columnLines : true,
			stripeRows : true,
			region : 'center',
			store : store,
			loadMask : {
		    	 msg : '正在加载数据，请稍侯……'
		    }
		
		});
	
		
		store.baseParams = {start:0,limit:20,id:id};
		store.reload();
		
		return grid;
}