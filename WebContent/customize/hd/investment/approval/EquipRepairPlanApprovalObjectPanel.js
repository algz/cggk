//设备大修审批查看明细
EquipRepairPlanApprovalObjectPanel = {};
EquipRepairPlanApprovalObjectPanel.init = function(id){
		var store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						url : '../JSON/pePlanRemote.getEquipRepairPlanList?d='+new Date(),
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
					'uploadfile','createtime','categorys','id','headperson',
					'projectnum','costnum'])
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
			    header : '维修设备名称',
				dataIndex : 'repairequipname',
				sortable : true,
				width : 100 
			},{  
			    header : '项目主管',
				dataIndex : 'headperson',
				sortable : true,
				width : 70 
			},{ 
				header : '状态',
				dataIndex : 'approvalstate',
				sortable : true,
				width : 60 ,
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
				width : 100,
				renderer : function(value, cellmeta, record, rowIndex) {
					var id = record.get('id');
					if (record.get('approvalstate') == "已审批"||record.get('approvalstate') == "已退回") {
						return "<a href='javascript:void(0);' onclick = approvalInfoList.showWin('" + id + "')><font color=blue>查看</font></a>";
					}
				}
			},{ 
				id : 'remark',
				header : '更多',
				dataIndex : 'uploadfile',
				sortable : true,
				width : 100 
			}
		]);
		var grid = new Ext.grid.EditorGridPanel({
			title : '设备大修计划',
			width : 300,
			id : 'equipRepairPlanGrid',
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