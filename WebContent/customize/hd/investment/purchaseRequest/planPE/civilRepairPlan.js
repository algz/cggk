//土建大修计划
var civilRepairPlan = {

	getPanel : function(){
		var sm = new Ext.grid.CheckboxSelectionModel(); 
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
	            id : 'projectnum',
	        	header : "<font color='red'>项目编号*</font>",
				dataIndex : 'projectnum',
				sortable : true,
				width : 100,
				editor: new Ext.form.TextField({
                    allowBlank: false,
					disabled : main.leaderRole
                })
			 },{  
				id : 'costnum',
			    header : "<font color='blue'>费用编号*</font>",
				dataIndex : 'costnum',
				sortable : true,
				width : 100 ,
				editor: new Ext.form.TextField({
                    allowBlank: false,
					disabled : main.leaderRole
                })
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
				width : 60,
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
		var grid = new Ext.grid.EditorGridPanel({
			title : '土建大修计划',
			width : 300,
			id : 'civilRepairPlanGrid',
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
							disabled : main.leaderRole,
							iconCls : 'icon-importTasks',
							handler : function(){
								civilRepairPlan.doApproval();
							}
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
			if(record.get('approvalstate')=="待审批"||record.get('approvalstate')=="已退回"){
				return true;
			}else{
				return false;
			}
		});
		grid.on('afteredit',function(obj){
//			修改的列
			var record = obj.record;
			var column = obj.field;
			var value = record.get(column);
			var id = record.get('id');
			Ext.Ajax.request({  
				url: '../JSON/pePlanRemote.editCivilRepairPlan',  
				params: {id : id,column:column,value :value},
				success : function(response, opts) {
					var obj = response.responseText;
					if (obj == "true") {
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
		});
		return grid;
	},
	
	doApproval : function(){
		var grid = Ext.getCmp('civilRepairPlanGrid');
		var id = "";
		var flag = false;
 		var rows = grid.getSelectionModel().getSelections();// 返回值为 Record 数组
 		if(rows.length == 0){
		 	Ext.MessageBox.alert('提示', '请选择一条记录!'); 
			return;
		}
 		for(i = 0;i < rows.length;i++){   
			id = id + rows[i].get('id') + ",";
			var approvalState = rows[i].get('approvalstate');
			if(approvalState == '已审批' || approvalState == '审批中'){
				Ext.MessageBox.alert('提示', '请选择待审批记录!'); 
				return;
			}
			if(rows[i].data.projectnum==""){
				flag = true;
				break;
			}
		}
		if(flag){
			Ext.MessageBox.alert("提示","数据不完整，不允许提交审批!");
		}else{
			approvePanel.submit("478004", "土建大修计划审批", "土建大修计划审批", id.substring(0,id.length-1), 
					"CivilRepairPlan", true, civilRepairPlan.approvePanelSuccess, civilRepairPlan.approvePanelFailure);
		}

	},
	approvePanelSuccess : function(){
		var rows = Ext.getCmp("civilRepairPlanGrid").getSelectionModel().getSelections();
		for(i=0;i < rows.length;i++){
			rows[i].set('approvalstate','审批中');
		} 
	},
	
	approvePanelFailure : function(){
		Ext.Msg.alert('提示', '没有送审权限！');
	}
}