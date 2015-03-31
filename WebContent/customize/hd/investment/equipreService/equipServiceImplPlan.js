var equipServiceImplPlan = {

	getPanel : function(){
		var sm = new Ext.grid.CheckboxSelectionModel(); 
		var store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						url : '../JSON/equipreService_EquipreServiceRemote.getGridData?d='+new Date(),
						method : 'post'
					}),
			reader : new Ext.data.JsonReader({
						root : 'results',
						id : 'id',
						totalProperty : 'totalProperty'
					}, ['id','projectNum','serviceEquipmentName','serviceEquipmentModel',
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
				id : 'serviceEquipmentName',
			    header : "修理项目",
				dataIndex : 'serviceEquipmentName',
				sortable : true,
				width : 100 
			},{  
			    header : '设备编号',
				dataIndex : 'serviceEquipmentModel',
				sortable : true,
				width : 100 
			},{  
			    header : '使用单位',
				dataIndex : '',
				sortable : true,
				width : 70 
			},{  
			    header : '项目主管<span style="color:red;">**</span>',
				dataIndex : 'projectManager',
				sortable : true,
				width : 70 
			},{ 
				header : '状态',
				dataIndex : 'status',
				sortable : true,
				width : 60 ,
				renderer : function(value, cellmeta, record, rowIndex){
					if (value == 1) {
						return '<span style="color:red;">编制中</span>';
					} else if (value == 3) {
						return '已下发';
					} else {
						return '已下发';// value;
					}
				}
			},{ 
		        header : '维修卡片填写时间<span style="color:red;">*</span>',
				dataIndex : 'repairCardTime',
				sortable : true,
				width : 120,
				editor : new Ext.form.DateField({
					format : 'Y-m-d',
					disabled : main.IMPLEMENT
				}),
				renderer : Ext.util.Format.dateRenderer("Y-m-d")
					 
			},{ 
				header : '确定维修单位时间<span style="color:red;">*</span>',
			    dataIndex : 'repairUnitime',
				sortable : true,
			    width : 120 ,
			    editor : new Ext.form.DateField({
					format : 'Y-m-d',
					disabled : main.IMPLEMENT
				}),
				renderer : Ext.util.Format.dateRenderer("Y-m-d")
			},{ 
				header : '合同签订时间<span style="color:red;">*</span>',
				dataIndex : 'contractSignTime',
				sortable : true,
				width : 100 ,
				editor : new Ext.form.DateField({
					format : 'Y-m-d',
					disabled : main.IMPLEMENT
				}),
				renderer : Ext.util.Format.dateRenderer("Y-m-d")
			},{ 
				header : '提交验收时间<span style="color:red;">*</span>',
				dataIndex : 'subApprovalTime',
				sortable : true,
				width : 100 ,
				editor : new Ext.form.DateField({
					format : 'Y-m-d',
					disabled : main.IMPLEMENT
				}),
				renderer : Ext.util.Format.dateRenderer("Y-m-d")
			},
//				{ 
//				header : '计划编制时间',
//				dataIndex : 'equipmanufacturer',
//				sortable : true,
//				width : 100 
//			},
				{ 
				header : '备注<span style="color:red;">*</span>',
				dataIndex : 'remark',
				sortable : true,
				width : 100 ,
				editor : new Ext.form.TextField({
					disabled : main.IMPLEMENT
				})
			}
		]);
		
		var comboStore = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						url : "../JSON/untilsRemote.getProjectDateData?d=" + new Date(),
						method : 'POST'
					}),
			reader : new Ext.data.JsonReader({
						totalProperty : 'totalProperty',
						root : 'results',
						id : 'projectDate'
					}, ['text', 'value']),
			baseParams : {
				projectDataType : '1'
			}
		});
		
		var grid = new Ext.grid.EditorGridPanel({
			title : '实施计划',
			width : 300,
			id : 'equipServiceImplPlanGrid',
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
							xtype : 'combo',
							mode : 'remote',
							pageSize : 10,
							forceSelection : true,
							triggerAction : 'all',
							emptyText : '请选择...',
							// 弹出选择添加缩放按钮
							resizable : true,
							blankText : '请选择项目日期',
							projectDataType : '1', // 数据获取类型.1实施计划中获取;2执行管理中获取(实施计划状态不为1或2);3合同管理中获取
							valueField : "value",
							displayField : "text",
							store : comboStore
						},'-',{
								text : '任务指派',
								iconCls : 'icon-projectHistory-16',
								disabled : main.APPOINT,
								handler : equipServiceImplPlan.appoint
								
						},'-',{
							
								text : '下发',
								iconCls : 'edit1',
								disabled : !main.MAINER,
								handler : equipServiceImplPlan.sendImplPlan
							
						}
				]})
		
		});
	
		grid.on('activate', function() { 
			store.baseParams = {start:0,limit:20};
			store.reload();
		});
		grid.on('beforeedit',function(e){
			var record = e.record;
			var grid = e.grid;
			// 如果状态为3已下发,则不允许修改.
			if (record.get('status') == 1) {
				return true;
			} else {
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
							url : '../JSON/equipreService_EquipreServiceRemote.editEquipServiceImplPlan?d='+new Date(),
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
//指派项目主管负责人
	appoint : function(){
		
		var grid = Ext.getCmp('equipServiceImplPlanGrid');
		var arr = new Array();
		var recs = grid.getSelectionModel().getSelections();
		if (recs.length == 0) {
			Ext.Msg.alert('提示', '请选择一条记录!');
			return false;
		}
		
		userMultiselect.init(function(el) {
			if (el.store.getCount() > 1) {
				Ext.Msg.alert('提示', '请选择一条记录!');
				return;
			} else {
				var headperson = el.store.getAt(0);
				Ext.Ajax.request({
					url : '../JSON/untilsRemote.getRolesByUser2?d='+new Date(),
					method : 'post',
					params : {projectmanagerid : headperson.get('userid')},
					success : function(response, opts) {
						var obj = Ext.decode(response.responseText);
						var isSzr = check_roles(obj.data,"4664301");//室主任角色
						var isYwzg = check_roles(obj.data,"4664304");//业务主管
//													如果当前登录是计划员。要验证选择的是否是室主任
						if(main.PLANER){
							if(isSzr){
								for (var i = 0; i < recs.length; i++) {
									var rec = recs[i];
									if (rec.get('status') != 1) {
										Ext.Msg.alert('提示', '请选择未下发的数据!');
										return false;
									}
									rec.set('projectManagerId', headperson == null ? "" : headperson.get('userid'));
									rec.set('projectManager', headperson == null ? "" : headperson.get('truename'));
									rec.set('headPerson',headperson == null ? "" : headperson.get('truename'));
									rec.set('headPersonId',headperson == null ? "" : headperson.get('userid'));
									arr.push(rec.data);
								}
								el.win.close();
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
											grid.store.commitChanges();
											Ext.Msg.alert('提示', '保存成功!');
										} else {
											Ext.Msg.alert('提示', '保存失败!');
										}
									},
									failure : function(response, opts) {
										Ext.Msg.alert('提示', '数据问题,请与管理员联系!');
									}
								});
							}else{
								Ext.Msg.alert('提示', '请选择室主任!');
								return false;
							}
						}else{
							if(isYwzg){
								for (var i = 0; i < recs.length; i++) {
									var rec = recs[i];
									if (rec.get('status') != 1) {
										Ext.Msg.alert('提示', '请选择未下发的数据!');
										return false;
									}
									rec.set('projectManagerId', headperson == null ? "" : headperson.get('userid'));
									rec.set('projectManager', headperson == null ? "" : headperson.get('truename'));
									arr.push(rec.data);
								}
								el.win.close();
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
											grid.store.commitChanges();
											Ext.Msg.alert('提示', '保存成功!');
										} else {
											Ext.Msg.alert('提示', '保存失败!');
										}
									},
									failure : function(response, opts) {
										Ext.Msg.alert('提示', '数据问题,请与管理员联系!');
									}
								});
							}else{
								Ext.Msg.alert('提示', '请选择业务主管!');
								return false;
							}
							
						}
						
					}
				});

			}
		});
		
	
	},
//下发实施计划	
	sendImplPlan : function(){
		var grid = Ext.getCmp('equipServiceImplPlanGrid');
		var recs = grid.getSelectionModel().getSelections();
		if (recs.length == 0) {
			Ext.Msg.alert('提示', '请选择一条记录!');
			return false;
		}
		var arr = new Array();
		for (var i = 0; i < recs.length; i++) {
			var rec = recs[i];
			if (rec.get('status') != 1) {
				Ext.Msg.alert('提示', '请选择编制中的数据!');
				return false;
			} else if (rec.get('projectManagerId') == null || rec.get('projectManagerId') == "") {
				Ext.Msg.alert('提示', '请选择项目负责人后在下发!');
				return false;
			}
			arr.push(rec.get('id'));
		}
		
		Ext.MessageBox.confirm('提示','确定项目主管下发数据?',function(e){
			if(e=='yes'){
				Ext.Ajax.request({
					url : '../JSON/equipreService_EquipreServiceRemote.sendImplementPlan',
					method : 'post',
					waitMsg : '数据加载中，请稍后....',
					params : {
						implementplanid : Ext.util.JSON.encode(arr)
					},
					success : function(response, opts) {
						var obj = Ext.decode(response.responseText);
						if (obj.success == true) {
							Ext.Msg.alert('提示', '下发成功!');
							grid.store.load();
						} else {
							Ext.Msg.alert('提示', '下发失败!');
							// 你后台返回success 为
							// false时执行的代码
						}
						// console.dir(obj);
					},
					failure : function(response, opts) {
						Ext.Msg.alert('提示', '数据问题,请与管理员联系!');
						// console.log('server-side
						// failure with status code
						// ' + response.status);
					}
				});
			}
		});

	
	}
}