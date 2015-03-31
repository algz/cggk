//设备大修汇总审批查看明细
EquipRepairSummaryApprovalObjectPanel = {};
EquipRepairSummaryApprovalObjectPanel.init = function(id){
		var store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						url : '../JSON/peSummaryRemote.getEquipRepairGroupList?d='+new Date(),
						method : 'post'
					}),
			reader : new Ext.data.JsonReader({
						root : 'results',
						id : 'id',
						totalProperty : 'totalProperty'
					}, ['repairequipname','repairequipmodel','equipassetnum',
					'equipinstallfactory','tasknum','equipmanufacturer',
					'equipdeliverytime','customer','lastrepairtime',
					'repaircostestimation','approvalstate','repaircostunit',
					'uploadfile','createtime','categorys','id','headperson'])
		});
		var cm = new Ext.grid.ColumnModel( [{  
			    header : '维修设备名称',
				dataIndex : 'repairequipname',
				sortable : true,
				width : 100 ,
				renderer : function(value, cellmeta, record, rowIndex){
					var id = record.get('id');
					if (record.get('approvalstate') == "待审批") {
						return "<a href='javascript:void(0);' onclick = equipRepair.createWindow('" + id + "')>" +
								"<font color=blue>"+value+"</font></a>";
					}else{
						return value;
					}
				}
			},{  
			    header : '项目主管',
				dataIndex : 'headperson',
				sortable : true,
				width : 70 
			}, {
				header : '类别',
				dataIndex : 'categorys',
				sortable : true,
				width : 50
			},{ 
		        header : '维修设备型号',
				dataIndex : 'repairequipmodel',
				sortable : true,
				width : 100
					 
			},{ 
				header : '设备资产编号',
			    dataIndex : 'equipassetnum',
				sortable : true,
			    width : 100 
			},{ 
				header : '设备安装厂房',
				dataIndex : 'equipinstallfactory',
				sortable : true,
				width : 100 
			},{ 
				header : '任务编号',
				dataIndex : 'tasknum',
				sortable : true,
				width : 100 
			},{ 
				header : '设备生产厂家',
				dataIndex : 'equipmanufacturer',
				sortable : true,
				width : 100 
			},{ 
				header : '设备出厂日期',
				dataIndex : 'equipdeliverytime',
				sortable : true,
				width : 100 
			},{ 
				header : '设备生产厂家售后服务联系人及电话',
				dataIndex : 'customer',
				sortable : true,
				width : 100 
			},{ 
				header : '最后一次维修日期',
				dataIndex : 'lastrepairtime',
				sortable : true,
				width : 100 
			},{ 
				header : '维修费用估算/计划',
				dataIndex : 'repaircostestimation',
				sortable : true,
				width : 100 
			},{ 
				header : '单位',
				dataIndex : 'repaircostunit',
				sortable : true,
				width : 50 
			},{ 
				header : '时间',
				dataIndex : 'createtime',
				sortable : true,
				width : 100 
			},{ 
				id : 'remark',
				header : '审批记录',
				dataIndex : '',
				sortable : true,
				width : 100
			},{ 
				id : 'remark',
				header : '更多',
				dataIndex : 'uploadfile',
				sortable : true,
				width : 100 
			}
		]);
		var grid = new Ext.grid.GridPanel({
			title : '固定资产设备大修项目明细表',
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