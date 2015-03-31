var equipRepair = {

	getPanel : function(){
		var sm = new Ext.grid.CheckboxSelectionModel(); 
		var store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						url : '../JSON/PEdeclareRemote.getEquipRepairList?d='+new Date(),
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
					'uploadfile','createtime','categorys','id','remark'])
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
//				 renderer:function(value,metadata,record,rowIndex){
//				   return record_start + 1 + rowIndex;
//				 }
			 }),{  
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
				id : 'remark',
				header : '维修内容',
				dataIndex : 'remark',
				sortable : true,
				width : 100 
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
		var grid = new Ext.grid.GridPanel({
			title : '设备大修',
			width : 300,
			id : 'equipRepairGrid',
			cm : cm, 
			sm : sm,
			columnLines : true,
			stripeRows : true,
			bbar : paging,
			region : 'center',
			store : store,
			loadMask : {
		    	 msg : '正在加载数据，请稍侯……'
		    },
			tbar : new Ext.Toolbar({
				items : ['-',{
							extype : 'button', 
							iconCls : 'add1',
							text : '新增',
							disabled : main.leaderRole&&!main.directorRole,
							handler : function(){
								equipRepair.createWindow();
							}
						},'-',{
							extype : 'button', 
							iconCls : 'del1',
							text : '删除',
							disabled : main.leaderRole&&!main.directorRole,
							handler : function(){
								equipRepair.delEquipRepair();
							}
						},'-' ,{
							extype : 'button',
							iconCls : 'icon-importTasks',
							text : '提交审批',
							disabled : main.leaderRole&&!main.directorRole,
							handler : function(){
								equipRepair.doApproval();
							}
						},'-'
				]})
		
		});
		
		grid.on('activate', function() { 
			store.baseParams = {start:0,limit:20};
			store.reload();
		});
		return grid;
	},
	createWindow : function(id){
		
		var isEdit = true;
		if(typeof(id) == "undefined"){
			isEdit = false;
		}
		
		var window = new Ext.Window({
			id :'equipRegistWindow',
			width : 800,
			title:"设备大修",
			autoScroll:false,
			autoDestroy: true,
			items:[{
				xtype : 'form',
				id : 'equipRepairForm',
				border : false,
				items : [{
					layout : 'column',
					border : false,
					items : [{
						columnWidth: .33,
		                layout: "form",
		                border : false,
		                labelWidth : 110,
		                bodyStyle : 'padding:5px 5px 0px 5px;',
		                items: {
		                	id : 'repairequipname',
		                    xtype: "textfield",
		                    fieldLabel: "维修设备名称",
		                    anchor: "95%",
							allowBlank : false,
							blankText : '不能为空!'
		                }
					},{
						columnWidth: .33,
		                layout: "form",
		                border : false,
		                labelWidth : 110,
		                bodyStyle : 'padding:5px 5px 0px 5px;',
		                items: {
		                	id : 'repairequipmodel',
		                    xtype: "textfield",
		                    fieldLabel: "维修设备型号",
		                    anchor: "95%",
							allowBlank : false,
							blankText : '不能为空!'
		                }
					},{
						columnWidth: .33,
		                layout: "form",
		                border : false,
		                labelWidth : 80,
		                bodyStyle : 'padding:5px 5px 0px 5px;',
		                items: {
		                	id : 'equipassetnum',
		                    xtype: "textfield",
		                    fieldLabel: "设备资产编号",
		                    anchor: "95%",
							allowBlank : false,
							blankText : '不能为空!'
		                }
					}]
				},{
					layout : 'column',
					border : false,
					items : [{
						columnWidth: .33,
		                layout: "form",
		                border : false,
		                labelWidth : 110,
		                bodyStyle : 'padding:0px 5px;',
		                items: {
		                	id : 'equipinstallfactory',
		                    xtype: "textfield",
		                    fieldLabel: "设备安装厂房",
		                    anchor: "95%",
							allowBlank : false,
							blankText : '不能为空!'
		                }
					},{
						columnWidth: .33,
		                layout: "form",
		                border : false,
		                labelWidth : 110,
		                bodyStyle : 'padding:0px 5px;',
		                items: {
		                	id : 'tasknum',
		                    xtype: "textfield",
		                    fieldLabel: "任务编号",
		                    anchor: "95%"//,
							//allowBlank : false,
							//blankText : '不能为空!'
		                }
					},{
						columnWidth: .33,
		                layout: "form",
		                border : false,
		                labelWidth : 80,
		                bodyStyle : 'padding:0px 5px;',
		                items: {
		                	id : 'equipmanufacturer',
		                    xtype: "textfield",
		                    fieldLabel: "设备生产厂家",
		                    anchor: "95%",
							allowBlank : false,
							blankText : '不能为空!'
		                }
					}]
				},{
					layout : 'column',
					border : false,
					items : [{
						columnWidth: .33,
		                layout: "form",
		                border : false,
		                labelWidth : 110,
		                bodyStyle : 'padding:0px 5px;',
		                items: {
		                	id : 'lastrepairtime',
		                    xtype: "datefield",
		                    fieldLabel: "最后一次维修日期",
		                    format:'Y-m-d',
		                    anchor: "95%",
							allowBlank : false,
							blankText : '不能为空!'
		                }
					},{
						columnWidth: .33,
		                layout: "form",
		                border : false,
		                labelWidth : 110,
		                bodyStyle : 'padding:0px 5px;',
		                items: {
		                	id : 'repaircostestimation',
		                    xtype: "numberfield",
		                    fieldLabel: "维修费用估算/计划",
		                    anchor: "95%",
							allowBlank : false,
							allowNegative : false,
							blankText : '不能为空!'
		                }
					},{
						columnWidth: .33,
		                layout: "form",
		                border : false,
		                labelWidth : 80,
		                bodyStyle : 'padding:0px 5px;',
		                items: {
		                	id : 'repaircostunit',
		                    xtype: "textfield",
		                    fieldLabel: "费用单位",
		                    anchor: "95%",
		                    value : '万元',
		                    disabled : true,
							allowBlank : false,
							blankText : '不能为空!'
		                }
					}]
				},{
					layout : 'column',
					border : false,
					items : [{
						columnWidth: .33,
		                layout: "form",
		                border : false,
		                labelWidth : 110,
		                bodyStyle : 'padding:0px 5px;',
		                items: {
		                	id : 'equipdeliverytime',
		                    xtype: "datefield",
		                    fieldLabel: "设备出厂日期",
		                    format:'Y-m-d',
		                    anchor: "95%",
							allowBlank : false,
							blankText : '不能为空!'
		                }
					},{
						columnWidth: .33,
		                layout: "form",
		                border : false,
		                labelWidth : 110,
		                bodyStyle : 'padding:0px 5px;',
		                items: {
							id : 'categorys',
							xtype : 'combo',
							fieldLabel : '类别',
							emptyText : '请选择',
							width : 125,
							triggerAction : 'all',
							store : [['股份','股份'],['集团','集团']],
							allowBlank : false,
							editable : false,
							blankText : '不能为空!'
						}
					},{
						
						columnWidth: .33,
		                layout: "form",
		                border : false,
		                labelWidth : 80,
		                bodyStyle : 'padding:0px 5px;',
		                items: {
		                	id : 'remark',
		                    xtype: "textfield",
		                    fieldLabel: "维修内容",
		                    anchor: "95%",
							allowBlank : false,
							blankText : '不能为空!'
		                }
					
					}]
				},{
					layout : 'column',
					border : false,
					items : [{
						columnWidth: .68,
		                layout: "form",
		                border : false,
		                labelWidth : 110,
		                bodyStyle : 'padding:0px 5px;',
		                items: {
		                	id : 'customer',
		                    xtype: "textfield",
		                    fieldLabel: "设备生产厂家售后服务联系人及电话",
		                    anchor: "95%",
							allowBlank : false,
							blankText : '不能为空!'
		                }
					}]
				}]
			}],
			modal : true,
			border : true,
			bodyStyle:'background:#fff;',
			resizable: false,  
			buttonAlign : 'center',
			buttons : [{text:' 保存 ',
				handler: function(){
					var equipRepairForm = Ext.getCmp('equipRepairForm');
					if (!equipRepairForm.getForm().isValid()) {return false;}
					equipRepair.saveEquipRepair(id);
					window.close();
			}},{text:' 关闭 ',handler : function(){window.close()}}]
		});
		
		if(isEdit){
			var rec = Ext.getCmp('equipRepairGrid').store.getById(id);
			Ext.getCmp('equipRepairForm').getForm().loadRecord(rec);
		}
		window.show();
	},
	delEquipRepair : function(){
		var grid = Ext.getCmp('equipRepairGrid');
		var id = "";
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
		}
		
		Ext.Msg.confirm("提示","是否确定删除?",function(btn){
			if(btn == 'yes'){
				Ext.Ajax.request({
					url : "../JSON/PEdeclareRemote.delEquipRepair",
					params : {
							id : id
					},
					success : function(response, opt) {
						var value = response.responseText;
						if (value=="true"){
							Ext.MessageBox.hide();
		    				if(Ext.Msg.alert('提示','删除成功!')){
		//    					main.tabs.setActiveTab(1);
		    					Ext.getCmp('equipRepairGrid').getStore().reload();
		    				}
						}else{
							Ext.Msg.alert("提示","数据异常，请与管理员联系。")
						}
					},
					disableCaching : true,
				    autoAbort : true
				});
			}
		});
		
	},
	saveEquipRepair : function(id){
		var repairequipname = Ext.getCmp('repairequipname').getValue();
		var repairequipmodel = Ext.getCmp('repairequipmodel').getValue();
		var equipassetnum = Ext.getCmp('equipassetnum').getValue();
		var equipinstallfactory = Ext.getCmp('equipinstallfactory').getValue();
		var tasknum = Ext.getCmp('tasknum').getValue();
		var equipmanufacturer = Ext.getCmp('equipmanufacturer').getValue();
		var lastrepairtime = Ext.getCmp('lastrepairtime').getValue();
		var repaircostestimation = Ext.getCmp('repaircostestimation').getValue();
		var repaircostunit = Ext.getCmp('repaircostunit').getValue();
		var equipdeliverytime = Ext.getCmp('equipdeliverytime').getValue();
		var customer = Ext.getCmp('customer').getValue();
		var categorys = Ext.getCmp('categorys').getValue();
		var remark = Ext.getCmp('remark').getValue();
		var json = null;
		
		if(typeof(id)=="undefined"){//保存
			json = {
				repairequipname : repairequipname,repairequipmodel:repairequipmodel,
				equipassetnum : equipassetnum,equipinstallfactory:equipinstallfactory,tasknum:tasknum,
				equipmanufacturer : equipmanufacturer,lastrepairtime:lastrepairtime,
				repaircostestimation : repaircostestimation,repaircostunit:repaircostunit,
				equipdeliverytime:equipdeliverytime,customer:customer,categorys:categorys,
				remark : remark
			}
		}else{//更新
			json = {
				repairequipname : repairequipname,repairequipmodel:repairequipmodel,
				equipassetnum : equipassetnum,equipinstallfactory:equipinstallfactory,tasknum:tasknum,
				equipmanufacturer : equipmanufacturer,lastrepairtime:lastrepairtime,
				repaircostestimation : repaircostestimation,repaircostunit:repaircostunit,
				equipdeliverytime:equipdeliverytime,customer:customer,categorys:categorys,
				remark : remark ,id:id
			}
		}
		Ext.Ajax.request({
			url : "../JSON/PEdeclareRemote.saveEquipRepair",
			params : {
					json : Ext.encode(json)
			},
			success : function(response, opt) {
				var value = response.responseText;
				if (value=="true"){
					Ext.MessageBox.hide();
    				if(Ext.Msg.alert('提示','保存成功!')){
//    					main.tabs.setActiveTab(1);
    					Ext.getCmp('equipRepairGrid').getStore().reload();
    				}
				}else{
					Ext.Msg.alert("提示","数据异常，请与管理员联系。")
				}
			},
			disableCaching : true,
		    autoAbort : true
		});
	},
	doApproval : function(){
		var grid = Ext.getCmp('equipRepairGrid');
		var id = "";
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
		}
		approvePanel.submit("501803", "设备大修申报审批", "设备大修申报审批", id.substring(0,id.length-1), 
					"EquipRepair", true, equipRepair.approvePanelSuccess, equipRepair.approvePanelFailure);

	},
	approvePanelSuccess : function(){
		var rows = Ext.getCmp("equipRepairGrid").getSelectionModel().getSelections();
		for(i=0;i < rows.length;i++){
			rows[i].set('approvalstate','审批中');
		} 
	},
	
	approvePanelFailure : function(){
		Ext.Msg.alert('提示', '没有送审权限！');
	}
}