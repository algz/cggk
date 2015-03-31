var civilRepair = {
	
	currentFileName : "",
	
	getPanel : function(){
		var sm = new Ext.grid.CheckboxSelectionModel(); 
		var store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						url : '../JSON/PEdeclareRemote.getCivilRepairList?d='+new Date(),
						method : 'post'
					}),
			reader : new Ext.data.JsonReader({
						root : 'results',
						id : 'id',
						totalProperty : 'totalProperty'
					}, ['repairproject','plancost','costunit','annualinvestment','repairarea',
					'areaunit','useunit','repaircontent','categorys','approvalstate',
					'remark','uploadfile','fileid','id'])
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
			    header : '维修项目',
				dataIndex : 'repairproject',
				sortable : true,
				width : 100 ,
				renderer : function(value, cellmeta, record, rowIndex){
					var id = record.get('id');
					if (record.get('approvalstate') == "待审批"||record.get('approvalstate') == "已退回") {
						return "<a href='javascript:void(0);' onclick = civilRepair.createWindow('" + id + "')>" +
								"<font color=blue>"+value+"</font></a>";
					}else{
						return value;
					}
				}
			},{ 
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
			},{ 
				header : '类别',
				dataIndex : 'categorys',
				sortable : true,
				width : 50 
			}, { 
		        header : '计划费用',
				dataIndex : 'plancost',
				sortable : true,
				width : 100
					 
			},{ 
				header : '费用单位',
			    dataIndex : 'costunit',
				sortable : true,
			    width : 60 
			},{ 
				header : '本年投资额',
				dataIndex : 'annualinvestment',
				sortable : true,
				width : 100 
			},{ 
				header : '修理面积',
				dataIndex : 'repairarea',
				sortable : true,
				width : 100 
			},{ 
				header : '面积单位',
				dataIndex : 'areaunit',
				sortable : true,
				width : 60 
			},{ 
				header : '使用单位',
				dataIndex : 'useunit',
				sortable : true,
				width : 100 
			},{ 
				header : '维修内容',
				dataIndex : 'repaircontent',
				sortable : true,
				width : 100 
			},{ 
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
				header : '备注',
				dataIndex : 'remark',
				sortable : true,
				width : 100 
			},{ 
				header : '更多',
				dataIndex : 'uploadfile',
				sortable : true,
				width : 100 ,
				renderer : function(value, cellmeta, record, rowIndex){
					var ID = record.get('fileid');
					var name = "";
					var ORIGINALNAME = record.get('uploadfile');
					
					if(ORIGINALNAME!=""){
						name = "浏览";
					}
					var value = "<a href='../FILEDOWN/?ID="// 着用的是下载。需传值文件的id和文件名，才能查到
							+ ID + "&ORIGINALNAME=" + encodeURI(encodeURI(ORIGINALNAME)) + "' cursor：hand>" +
							"<font color='blue'>"+name+"</font></a>";
					return value;
				}
			}
		]);
		var grid = new Ext.grid.GridPanel({
			title : '土建大修',
			width : 300,
			id : 'civilRepairGrid',
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
								civilRepair.createWindow();
							}
						},'-',{
							extype : 'button', 
							iconCls : 'del1',
							text : '删除',
							disabled : main.leaderRole&&!main.directorRole,
							handler : function(){
								civilRepair.delCivilRepair();
							}
						},'-' ,{
							extype : 'button',
							iconCls : 'icon-importTasks',
							text : '提交审批',
							disabled : main.leaderRole&&!main.directorRole,
							handler : function(){
								civilRepair.doApproval();
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
		
		var store =  new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						url : '../JSON/PEdeclareRemote.getDepartment?d='+new Date(),
						method : 'post'
					}),
			reader : new Ext.data.JsonReader({
					root : 'results',
					id : 'idd',
					totalProperty : 'totalProperty'
			}, ['departmetname','departmetname']) 
		});
		var window = new Ext.Window({
			id :'civilRepairWindow',
			width : 900,
			title:"土建大修",
			autoScroll:false,
			autoDestroy: true,
			items:[{
				xtype : 'form',
				border : false,
				id : 'civilRepairForm',
				items : [{
					xtype : 'panel',
					layout : 'column',
					border : false,
					items : [{
						xtype : 'panel',
						layout : 'form',
						columnWidth : .33,
						border : false,
						labelWidth : 60,
						bodyStyle : 'padding:5px;',
						defaults : {
							anchor : '95%'
						},
						items : [{
							id : 'repairproject',
							xtype : 'textfield',
							fieldLabel : '维修项目',
							allowBlank : false,
							blankText : '不能为空!'
						}, {
							id : 'annualinvestment',
							xtype : 'numberfield',
							fieldLabel : '本年投资',
							allowBlank : false,
							allowNegative : false,
							blankText : '不能为空!'
						}, {
							id : 'useunit',
							xtype : 'combo',
							fieldLabel : '使用单位',
							emptyText : '请选择',
							triggerAction : 'all',
							displayField : 'departmetname',
							valueField : 'departmetname',
							store : store,
							allowBlank : false,
							editable : false,
							blankText : '不能为空!'
						},{
							id : 'remark',
							xtype : 'textfield',
							fieldLabel : '备注'
						}]
					}, {
						xtype : 'panel',
						layout : 'form',
						columnWidth : .33,
						border : false,
						labelWidth : 60,
						bodyStyle : 'padding:5px;',
						defaultType : 'textfield',
						defaults : {
							anchor : '95%'
						},
						items : [{
							id : 'plancost',
							xtype : 'numberfield',
							fieldLabel : '计划费用',
							allowBlank : false,
							allowNegative : false,
							blankText : '不能为空!'
						}, {
							id : 'repairarea',
							xtype : 'numberfield',
							fieldLabel : '修理面积',
							//allowBlank : false,
							allowNegative : false,
							blankText : '不能为空!'
						}, {
							id : 'repaircontent',
							fieldLabel : '维修内容',
							allowBlank : false,
							blankText : '不能为空!'
						}]
					},{
						xtype : 'panel',
						layout : 'form',
						columnWidth : .33,
						border : false,
						labelWidth : 60,
	
						bodyStyle : 'padding:5px;',
						defaults : {
							anchor : '95%'
						},
						items : [{
							id : 'costunit',
							xtype : 'textfield',
							fieldLabel : '费用单位',
							allowBlank : false,
							blankText : '不能为空!',
							value : '万元',
							disabled : true
						}, {
							id : 'areaunit',
							xtype : 'combo',
							fieldLabel : '面积单位',
							triggerAction : 'all',
							emptyText : '请选择',
							editable : false,
							store : [['米','米'], ['平方米', '平方米'],['立方米', '立方米']],
							allowBlank : false,
							blankText : '不能为空!'
						}, {
							id : 'categorys',
							xtype : 'combo',
							fieldLabel : '类别',
							emptyText : '请选择',
							triggerAction : 'all',
							store : [['股份','股份'],['集团','集团']],
							allowBlank : false,
							editable : false,
							blankText : '不能为空!'
						}]
					}]
				}]
			},{
				layout : 'column',
				border : false,
				items : [{
					xtype : 'form',
					columnWidth : .5,
					id : 'fileFormPanel',
					fileUpload : true,
					border : false,
					labelWidth : 60,
					bodyStyle : 'padding:5px;',
					defaults : {
						anchor : '95%'
					},
					items : [{
							xtype : 'hidden',
							id : 'fileid',
							name : 'fileid'
						},{
							id : 'uploadfile',
							name : 'uploadfile',
							xtype : 'fileuploadfield',
							fieldLabel : '上传附件',
							buttonText : '浏览...',
							anchor : '100%'
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
					var civilRepairForm = Ext.getCmp('civilRepairForm');
					if (!civilRepairForm.getForm().isValid()) {return false;}
					civilRepair.saveCivilRepair(id);
			}},{text:' 关闭 ',handler : function(){window.close()}}]
		});
		
		if(isEdit){
			var rec = Ext.getCmp('civilRepairGrid').store.getById(id);
			Ext.getCmp('civilRepairForm').getForm().loadRecord(rec);
			Ext.getCmp('fileFormPanel').getForm().loadRecord(rec);
			civilRepair.currentFileName = rec.data.uploadfile;
		}
		window.show();
	},
	
	delCivilRepair: function(){
		var grid = Ext.getCmp('civilRepairGrid');
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
					url : "../JSON/PEdeclareRemote.delCivilRepair",
					params : {
							id : id
					},
					success : function(response, opt) {
						var value = response.responseText;
						if (value=="true"){
							Ext.MessageBox.hide();
		    				if(Ext.Msg.alert('提示','删除成功!')){
		//    					main.tabs.setActiveTab(1);
		    					Ext.getCmp('civilRepairGrid').getStore().reload();
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
	
	saveCivilRepair : function(id){
		var repairproject = Ext.getCmp('repairproject').getValue();
		var plancost = Ext.getCmp('plancost').getValue();
		var costunit = Ext.getCmp('costunit').getValue();
		var annualinvestment = Ext.getCmp('annualinvestment').getValue();
		var repairarea = Ext.getCmp('repairarea').getValue();
		var areaunit = Ext.getCmp('areaunit').getValue();
		var useunit = Ext.getCmp('useunit').getValue();
		var repaircontent = Ext.getCmp('repaircontent').getValue();
		var categorys = Ext.getCmp('categorys').getValue();
		var remark = Ext.getCmp('remark').getValue();
		var uploadfile = Ext.getCmp('uploadfile').getValue();
		var fileform = Ext.getCmp('fileFormPanel');
		
		if(typeof(id)=="undefined"){//保存
			
			if(uploadfile==""){
				var json = {
					repairproject : repairproject,plancost:plancost,
					costunit : costunit,annualinvestment:annualinvestment,
					repairarea:repairarea,areaunit : areaunit,useunit:useunit,
					repaircontent : repaircontent,categorys:categorys,remark:remark
				}
				Ext.Ajax.request({
					url : "../JSON/PEdeclareRemote.saveCivilRepair",
					params : {
							json : Ext.encode(json)
					},
					success : function(response, opt) {
						var value = response.responseText;
						if (value=="true"){
							Ext.MessageBox.hide();
		    				if(Ext.Msg.alert('提示','保存成功!')){
		//    					main.tabs.setActiveTab(1);
		    					Ext.getCmp('civilRepairWindow').close();
		    					Ext.getCmp('civilRepairGrid').getStore().reload();
		    				}
						}else{
							Ext.Msg.alert("提示","数据异常，请与管理员联系。")
						}
					},
					disableCaching : true,
				    autoAbort : true
				});
			
			}else{
				fileform.getForm().doAction('submit', {
					waitMsg : '正在保存数据，请稍候...',
					waitTitle : '提示',
					url : '../FILEUP/',// 这里用的上传文件，同时要保存返回来的Json中的文件ID，文件名
					method : 'post',
					success : function(form, action) {
						var file = action.result;
						var json = {
							repairproject : repairproject,plancost:plancost,
							costunit : costunit,annualinvestment:annualinvestment,
							repairarea:repairarea,areaunit : areaunit,useunit:useunit,
							repaircontent : repaircontent,categorys:categorys,remark:remark,
							fileid : file.fileId,uploadfile : file.fileName
						}
						Ext.Ajax.request({
							url : "../JSON/PEdeclareRemote.saveCivilRepair",
							params : {
									json : Ext.encode(json)
							},
							success : function(response, opt) {
								var value = response.responseText;
								if (value=="true"){
									Ext.MessageBox.hide();
				    				if(Ext.Msg.alert('提示','保存成功!')){
				//    					main.tabs.setActiveTab(1);
				    					Ext.getCmp('civilRepairWindow').close();
				    					Ext.getCmp('civilRepairGrid').getStore().reload();
				    				}
								}else{
									Ext.Msg.alert("提示","数据异常，请与管理员联系。")
								}
							},
							disableCaching : true,
						    autoAbort : true
						});
		
					},
					failure : function(form, action) {
						Ext.Msg.alert('提示', "保存失败");
					}
				});
			}
			
		}else{//更新
			if(uploadfile==""||uploadfile==civilRepair.currentFileName){
				var json = {
					repairproject : repairproject,plancost:plancost,
					costunit : costunit,annualinvestment:annualinvestment,
					repairarea:repairarea,areaunit : areaunit,useunit:useunit,
					repaircontent : repaircontent,categorys:categorys,remark:remark,
					fileid : Ext.getCmp('fileid').getValue(),
					uploadfile : Ext.getCmp('uploadfile').getValue(),id:id
				}
				Ext.Ajax.request({
					url : "../JSON/PEdeclareRemote.saveCivilRepair",
					params : {
							json : Ext.encode(json)
					},
					success : function(response, opt) {
						var value = response.responseText;
						if (value=="true"){
							Ext.MessageBox.hide();
		    				if(Ext.Msg.alert('提示','更新成功!')){
		//    					main.tabs.setActiveTab(1);
		    					Ext.getCmp('civilRepairWindow').close();
		    					Ext.getCmp('civilRepairGrid').getStore().reload();
		    				}
						}else{
							Ext.Msg.alert("提示","数据异常，请与管理员联系。")
						}
					},
					disableCaching : true,
				    autoAbort : true
				});
			
			}else{
				fileform.getForm().doAction('submit', {
					waitMsg : '正在保存数据，请稍候...',
					waitTitle : '提示',
					url : '../FILEUP/',// 这里用的上传文件，同时要保存返回来的Json中的文件ID，文件名
					method : 'post',
					success : function(form, action) {
						var file = action.result;
						var json = {
							repairproject : repairproject,plancost:plancost,
							costunit : costunit,annualinvestment:annualinvestment,
							repairarea:repairarea,areaunit : areaunit,useunit:useunit,
							repaircontent : repaircontent,categorys:categorys,remark:remark,
							fileid : file.fileId,uploadfile : file.fileName,id:id
						}
						Ext.Ajax.request({
							url : "../JSON/PEdeclareRemote.saveCivilRepair",
							params : {
									json : Ext.encode(json)
							},
							success : function(response, opt) {
								var value = response.responseText;
								if (value=="true"){
									Ext.MessageBox.hide();
				    				if(Ext.Msg.alert('提示','更新成功!')){
				//    					main.tabs.setActiveTab(1);
				    					Ext.getCmp('civilRepairWindow').close();
				    					Ext.getCmp('civilRepairGrid').getStore().reload();
				    				}
								}else{
									Ext.Msg.alert("提示","数据异常，请与管理员联系。")
								}
							},
							disableCaching : true,
						    autoAbort : true
						});
		
					},
					failure : function(form, action) {
						Ext.Msg.alert('提示', "保存失败");
					}
				});
			}
			
		}
//		var json = {
//			repairproject : repairproject,plancost:plancost,
//			costunit : costunit,annualinvestment:annualinvestment,
//			repairarea:repairarea,areaunit : areaunit,useunit:useunit,
//			repaircontent : repaircontent,categorys:categorys,remark:remark
//		}
//		Ext.Ajax.request({
//			url : "../JSON/PEdeclareRemote.saveCivilRepair",
//			params : {
//					json : Ext.encode(json)
//			},
//			success : function(response, opt) {
//				var value = response.responseText;
//				if (value=="true"){
//					Ext.MessageBox.hide();
//    				if(Ext.Msg.alert('提示','保存成功!')){
////    					main.tabs.setActiveTab(1);
//    					Ext.getCmp('civilRepairGrid').getStore().reload();
//    				}
//				}else{
//					Ext.Msg.alert("提示","数据异常，请与管理员联系。")
//				}
//			},
//			disableCaching : true,
//		    autoAbort : true
//		});
	},
	doApproval : function(){
		var grid = Ext.getCmp('civilRepairGrid');
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
		approvePanel.submit("501801", "土建大修申报审批", "土建大修申报审批", id.substring(0,id.length-1), 
					"CivilRepair", true, civilRepair.approvePanelSuccess, civilRepair.approvePanelFailure);

	},
	approvePanelSuccess : function(){
		var rows = Ext.getCmp("civilRepairGrid").getSelectionModel().getSelections();
		for(i=0;i < rows.length;i++){
			rows[i].set('approvalstate','审批中');
		} 
	},
	
	approvePanelFailure : function(){
		Ext.Msg.alert('提示', '没有送审权限！');
	}
}