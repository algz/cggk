//			[5].洪都公司固定资产设备大修明细表(股份、集团)
var equipRepair = {

	getPanel : function(){
		var sm = new Ext.grid.CheckboxSelectionModel(); 
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
					'uploadfile','createtime','categorys','id','headperson',
					'remark'])
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
				header : "<font color='blue'>维修费用估算/计划</font>",
				dataIndex : "repaircostestimation",
				sortable : true,
				width : 100 ,
				editor: new Ext.form.TextField({
                    allowBlank: false,
                    blankText : '不能为空!',
                    disabled : main.leaderRole
                })
			},{ 
				header : '单位',
				dataIndex : 'repaircostunit',
				sortable : true,
				width : 50 
			},{ 
				id : 'remark',
				header : "<font color='blue'>维修内容</font>",
				dataIndex : 'remark',
				sortable : true,
				width : 100 ,
				editor: new Ext.form.TextField({
                    allowBlank: false,
                    blankText : '不能为空!',
                    disabled : main.leaderRole
                })
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
			}
		]);
		var grid = new Ext.grid.EditorGridPanel({
			title : '洪都航空固定资产设备大修明细表',
			width : 300,
			id : 'repairGroupGrid',
			cm : cm, 
			sm : sm,
			columnLines : true,
			stripeRows : true,
			bbar : paging,
			region : 'center',
			clicksToEdit : 1,
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
								equipRepair.doApproval();
							}
						},'-',{
							extype : 'button',
							text : '任务指派',
							iconCls : 'icon-projectHistory-16',
							disabled : !main.directorRole,
							handler : function(){
								equipRepair.appointPerson();
							}
						},'-','项目名称:',{xtype:'textfield',id:'repairGroup_repairproject'},{
							text : '查询',
							iconCls : 'search1',
							handler : function(){
								var store=grid.getStore()
								store.setBaseParam('repairproject',Ext.getCmp('repairGroup_repairproject').getValue());
								store.load();
							}
						}
				]})
		
		});
	
		grid.on('activate', function() { 
			store.baseParams = {start:0,limit:20};
			store.reload();
		});
		grid.on('beforeedit',function(obj){
//			修改的列
			var record = obj.record;
			if(record.get('approvalstate')=='待审批'||record.get('approvalstate')=='已退回'){
				if(obj.field == "repaircostestimation"||
					obj.field == "remark"){
					return true;
				}else{
					return false;
				}
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
				url: '../JSON/peSummaryRemote.editEquipRepair',  
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
		var grid = Ext.getCmp('repairGroupGrid');
		var id = "";
 		var rows = grid.getSelectionModel().getSelections();// 返回值为 Record 数组
 		if(rows.length == 0){
		 	Ext.MessageBox.alert('提示', '请选择一条记录!'); 
			return;
		}
 		for(i = 0;i < rows.length;i++){   
			id = id + rows[i].get('id') + ",";
			var approvalState = rows[i].get('approvalstate');
			var headperson=rows[i].get('headperson');
			if(headperson==null||headperson==""){
				Ext.MessageBox.alert('提示', '请指派项目主管!'); 
				return;				
			}
			if(approvalState == '已审批' || approvalState == '审批中'){
				Ext.MessageBox.alert('提示', '请选择待审批记录!'); 
				return;
			}
		}
		approvePanel.submit("503053", "设备大修项目审批", "设备大修项目审批", id.substring(0,id.length-1), 
					"EquipRepairSummary", true, equipRepair.approvePanelSuccess, equipRepair.approvePanelFailure);
	
	},
	
	approvePanelSuccess : function(){
		var rows = Ext.getCmp("repairGroupGrid").getSelectionModel().getSelections();
		for(i=0;i < rows.length;i++){
			rows[i].set('approvalstate','审批中');
		} 
	},
	
	approvePanelFailure : function(){
		Ext.Msg.alert('提示', '没有送审权限！');
	},
	
	appointPerson : function(){
		var grid = Ext.getCmp('repairGroupGrid');
		var id = "";
 		var rows = grid.getSelectionModel().getSelections();// 返回值为 Record 数组
 		if(rows.length == 0){
		 	Ext.MessageBox.alert('提示', '请选择一条记录!'); 
			return;
		}
		for(i = 0;i < rows.length;i++){   
			if(rows[i].get('approvalstate') == "已审批"||rows[i].get('approvalstate') == "审批中"){
		 	    Ext.MessageBox.alert('提示', '请选择待审批的数据!'); 
			    return;				
			}
			id = id + rows[i].get('id') + ",";
		}
		userMultiselect.init(function(e) {
			if (e.store.getCount() > 1) {
				Ext.Msg.alert('提示', '只能选择一位负责人!');
				return;
			} else {
				var rec = e.store.getAt(0);
				var person = rec.get('truename');
				Ext.Ajax.request({  
					url: '../JSON/peSummaryRemote.appointPersonToEquipRepair',  
					params: {id : id,person:person},
					success : function(response, opts) {
						Ext.Msg.alert('提示', '任务指派成功!');
						Ext.getCmp('repairGroupGrid').getStore().baseParams = {start:0,limit:20};
						Ext.getCmp('repairGroupGrid').getStore().reload();
					},
					failure : function(response, opts) {
						Ext.Msg.alert('提示', '数据问题,请与管理员联系!');
					}
					
				});
			}
			e.win.close();
		});
	}
}