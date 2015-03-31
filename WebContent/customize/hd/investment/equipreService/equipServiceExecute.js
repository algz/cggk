var equipServiceExecute = {

	getPanel : function(){
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
		//分页工具栏   
		var paging = new Ext.PagingToolbar({
			store : store,
			pageSize : 20,
			displayInfo : true,
			displayMsg : '第 {0} 到 {1} 条，一共  {2} 条',
			emptyMsg : '没有记录'
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
				width : 70,
				renderer : function(value, cellmeta, record, rowIndex) {
					var id = record.get('id');
					if (record.get('status') == 5) {
						return "<a href='javascript:void(0);' onclick=approvalInfoList.showWin('" + id + "')><font color=blue>查看</font></a>";
					}
				}
			},{ 
		        header : '维修卡片填写时间<span style="color:red;">*</span>',
				dataIndex : 'repairCardTimeExecute',
				sortable : true,
				width : 120,
				editor : new Ext.form.DateField({
					format : 'Y-m-d',
					disabled : main.EXECUTE
				}),
				renderer : Ext.util.Format.dateRenderer("Y-m-d")
					 
			},{ 
				header : '确定维修单位时间<span style="color:red;">*</span>',
			    dataIndex : 'repairUnitimeExecute',
				sortable : true,
			    width : 120 ,
			    editor : new Ext.form.DateField({
					format : 'Y-m-d',
					disabled : main.EXECUTE
				}),
				renderer : Ext.util.Format.dateRenderer("Y-m-d")
			},{ 
				header : '合同签订时间<span style="color:red;">*</span>',
				dataIndex : 'contractSignTimeExecute',
				sortable : true,
				width : 100 ,
				editor : new Ext.form.DateField({
					format : 'Y-m-d',
					disabled : main.EXECUTE
				}),
				renderer : Ext.util.Format.dateRenderer("Y-m-d")
			},{ 
				header : '提交验收时间<span style="color:red;">*</span>',
				dataIndex : 'subApprovalTimeExecute',
				sortable : true,
				width : 100 ,
				editor : new Ext.form.DateField({
					format : 'Y-m-d',
					disabled : main.EXECUTE
				}),
				renderer : Ext.util.Format.dateRenderer("Y-m-d")
			},{ 
				header : '备注',
				dataIndex : 'remark',
				sortable : true,
				width : 100 
			}
		]);
		var grid = new Ext.grid.EditorGridPanel({
			title : '执行计划',
			width : 300,
			id : 'equipServiceExecuteGrid',
			cm : cm, 
			sm : sm,
			columnLines : true,
			stripeRows : true,
			bbar : paging,
			region : 'center',
			clicksToEdit: 1,
			store : store,
			loadMask : {
		    	 msg : '正在加载数据，请稍侯……'
		    },
			tbar : new Ext.Toolbar({
				items : ['-' ,{
							extype : 'button',
							text : '提交审批',
							disabled : main.EXECUTE,
							iconCls : 'icon-importTasks',
							handler : equipServiceExecute.doApproval
						},'-'
				]})
		
		});
	
		grid.on('activate', function() { 
			store.baseParams = {start:0,limit:20};
			store.reload();
		});
		grid.on('beforeedit',function(obj){
//			修改的列
			var record = obj.record;
			if(record.get('status')==3||record.get('status')==-3){
				return true;
			}else{
				return false;
			}
		});
		grid.on('afteredit',function(e){
			var rec = e.record;
			var grid = e.grid;
			if (rec.dirty) {
				var arr = new Array();
				arr.push(rec.data);
				Ext.Ajax.request({
					url : '../JSON/equipreService_EquipreServiceRemote.editEquipServiceImplPlan',
					method : 'post',
					waitMsg : '数据加载中，请稍后....',
					params : {
						implementplanid : Ext.util.JSON.encode(arr)
					},
					success : function(response, opts) {
						var obj = Ext.decode(response.responseText);
						if (obj.success == true) {
							// Ext.Msg.alert('提示', '保存成功!');
							grid.store.commitChanges();
						} else {
							Ext.Msg.alert('提示', '保存失败!');
						}
					},
					failure : function(response, opts) {
						Ext.Msg.alert('提示', '数据问题,请与管理员联系!');
					}
				});
			}
		});
		return grid;
	},
	
	doApproval : function(){
		var grid = Ext.getCmp('equipServiceExecuteGrid');
		var id = "";
 		var rows = grid.getSelectionModel().getSelections();// 返回值为 Record 数组
 		if(rows.length == 0){
		 	Ext.MessageBox.alert('提示', '请选择一条记录!'); 
			return;
		}
		for(i = 0;i < rows.length;i++){   
			id = id + rows[i].get('id') + ",";
			var approvalState = rows[i].get('status');
			if(approvalState == 4 || approvalState == 5){
				Ext.MessageBox.alert('提示', '请选择待审批记录!'); 
				return;
			}
			if(rows[i].data.projectnum==""){
				flag = true;
				break;
			}
		}
		approvePanel.submit("489400", "设备大修执行计划审批", "设备大修执行计划审批", id.substring(0,id.length-1), 
					"EquipServiceExecutePlan", true, equipServiceExecute.approvePanelSuccess, equipServiceExecute.approvePanelFailure);
		

	},
	approvePanelSuccess : function(){
		var rows = Ext.getCmp("equipServiceExecuteGrid").getSelectionModel().getSelections();
		for(i=0;i < rows.length;i++){
			rows[i].set('status',4);
		} 
	},
	
	approvePanelFailure : function(){
		Ext.Msg.alert('提示', '没有送审权限！');
	}
}