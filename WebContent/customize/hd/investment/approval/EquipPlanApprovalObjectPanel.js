//设备登记审批查看明细
EquipPlanApprovalObjectPanel = {};
EquipPlanApprovalObjectPanel.init = function(id){
		var store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						url : '../JSON/peSummaryRemote.getEquipPlanList?d='+new Date(),
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
					'budgetnum','annualinvestmentplan','fundsource'])
		});
		
		var cm = new Ext.grid.ColumnModel([{  
			    header : '项目名称',
				dataIndex : 'projectname',
				sortable : true,
				width : 120 
			}, { 
		        header : '规格型号(供参考)',
				dataIndex : 'referencemodel',
				sortable : true,
				width : 130
					 
			},{ 
				header : '主要性能指标',
			    dataIndex : 'mainparam',
				sortable : true,
			    width : 120 
			},{ 
				header : '数量',
				dataIndex : 'nums',
				sortable : true,
				width : 120 
			},{ 
				header : '单位(台/套)',
				dataIndex : 'numsunit',
				sortable : true,
				width : 120 
			},{ 
				id : 'budgetnum',
				header : '总投资预算控制',
				dataIndex : 'budgetnum',
				sortable : true,
				width : 120 
			},{ 
				id : 'annualinvestmentplan',
				header : '本年计划投资',
				dataIndex : 'annualinvestmentplan',
				sortable : true,
				width : 120
			},{ 
				id : 'fundsource',
				header : '资金来源',
				dataIndex : 'fundsource',
				sortable : true,
				width : 120 
			},{ 
				header : '金额单位',
				dataIndex : '',
				sortable : true,
				width : 120 
			},{ 
				id : 'remark',
				header : '使用单位',
				dataIndex : 'remark',
				sortable : true,
				width : 120 
			},{ 
				header : '安装地点',
				dataIndex : 'installsite',
				sortable : true,
				width : 120 
			},{ 
				header : '时间',
				dataIndex : 'remark',
				sortable : true,
				width : 120 
			},{ 
				header : '状态',
				dataIndex : 'approvalstate',
				sortable : true,
				width : 120 
			},{ 
				header : '审批记录',
				dataIndex : 'remark',
				sortable : true,
				width : 120 
			},{ 
				header : '备注',
				dataIndex : 'remarke',
				sortable : true,
				width : 120 
			}
		]);
		var grid = new Ext.grid.GridPanel({
			title : '固定资产投资设备项目计划表',
			width : 300,
			id : 'equipPlanGrid',
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