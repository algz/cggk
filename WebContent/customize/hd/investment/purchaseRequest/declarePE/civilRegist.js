var civilRegist = {

	currentFileName : "",
	
	getPanel : function(){
		var sm = new Ext.grid.CheckboxSelectionModel(); 
		var store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						url : '../JSON/PEdeclareRemote.getCivilRegistList?d='+new Date(),
						method : 'post'
					}),
			reader : new Ext.data.JsonReader({
						root : 'results',
						id : 'id',
						totalProperty : 'totalProperty'
					}, ['projectname','constructiontype','nums','numsunit','investmentbudget',
					'financeunit','constructionsite','useunit','mainuse','deliverytime',
					'demandreason','remarke','approvalstate','uploadfile','fileid','id',
					'categorys'])
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
			    header : '项目名称',
				dataIndex : 'projectname',
				sortable : true,
				width : 100 ,
				renderer : function(value, cellmeta, record, rowIndex){
					var id = record.get('id');
					if (record.get('approvalstate') == "待审批"||record.get('approvalstate') == "已退回") {
						return "<a href='javascript:void(0);' onclick = civilRegist.createWindow('" + id + "')>" +
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
			}, {
				header : '类别',
				dataIndex : 'categorys',
				sortable : true,
				width : 60
			},{ 
		        header : '建设性质',
				dataIndex : 'constructiontype',
				sortable : true,
				width : 60
					 
			},{ 
				header : '数量',
			    dataIndex : 'nums',
				sortable : true,
			    width : 100 
			},{ 
				header : '单位',
				dataIndex : 'numsunit',
				sortable : true,
				width : 50 
			},{ 
				header : '投资概算',
				dataIndex : 'investmentbudget',
				sortable : true,
				width : 100 
			},{ 
				header : '资金单位',
				dataIndex : 'financeunit',
				sortable : true,
				width : 60 
			},{ 
				header : '选址或施工地点',
				dataIndex : 'constructionsite',
				sortable : true,
				width : 100 
			},{ 
				header : '交付时间',
				dataIndex : 'deliverytime',
				sortable : true,
				width : 100 
			},{ 
				header : '使用单位',
				dataIndex : 'useunit',
				sortable : true,
				width : 100 
			},{ 
				header : '主要用途',
				dataIndex : 'mainuse',
				sortable : true,
				width : 100 
			},{ 
				header : '需求原因',
				dataIndex : 'demandreason',
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
				id : 'remarke',
				dataIndex : 'remarke',
				sortable : true,
				width : 100 
			},{ 
				header : '更多',
				id : 'uploadfile',
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
							"<font color='blue'> "+name+" </font></a>";
					return value;
				}
			}
			
			
		]);
		var grid = new Ext.grid.GridPanel({
			title : '土建登记',
			width : 300,
			id : 'civilRegistGrid',
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
								civilRegist.createWindow();
							}
						},'-',{
							extype : 'button', 
							iconCls : 'del1',
							text : '删除',
							disabled : main.leaderRole&&!main.directorRole,
							handler : function(){
								civilRegist.delCivilRegist();
							}
						},'-' ,{
							extype : 'button',
							iconCls : 'icon-importTasks',
							text : '提交审批',
							disabled : main.leaderRole&&!main.directorRole,
							handler : function(){
								civilRegist.doApproval();
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
			id :'civilRegistWindow',
			width : 900,
			title:"土建登记",
			autoScroll:false,
			autoDestroy: true,
			items:[{
				xtype : 'form',
				id : 'civilRegistForm',
				border : false,
				items : [{
					xtype : 'panel',
					layout : 'column',
					border : false,
					items : [{
						xtype : 'panel',
						layout : 'form',
						columnWidth : .25,
						border : false,
						labelWidth : 60,
	
						bodyStyle : 'padding:5px;',
						defaults : {
							anchor : '95%'
						},
						items : [{
							id : 'projectname',
							xtype : 'textfield',
							fieldLabel : '项目名称',
							allowBlank : false,
							blankText : '不能为空!'
						}, {
							id : 'investmentbudget',
							xtype : 'numberfield',
							fieldLabel : '投资概算',
							allowBlank : false,
							blankText : '不能为空!',
							allowNegative : false
						}, {
							id : 'useunit',
							xtype : 'combo',
							fieldLabel : '使用单位',
							emptyText : '请选择',
							triggerAction : 'all',
							displayField : 'departmetname',
							valueField : 'departmetname',
							store : store,
							editable : false,
							allowBlank : false,
							blankText : '不能为空!'
						},{
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
					}, {
						xtype : 'panel',
						layout : 'form',
						columnWidth : .25,
						border : false,
						labelWidth : 60,
						bodyStyle : 'padding:5px;',
						defaultType : 'textfield',
						defaults : {
							anchor : '95%'
						},
						items : [{
							id : 'constructiontype',
							xtype : 'combo',
							fieldLabel : '建设性质',
							triggerAction : 'all',
							emptyText : '请选择',
							editable : false,
							store : [['扩建', '扩建'], ['改造', '改造'],['新建','新建']],
							allowBlank : false,
							blankText : '不能为空!'
							
						}, {
							id : 'financeunit',
							fieldLabel : '资金单位',
							allowBlank : false,
							blankText : '不能为空!',
							value : '万元',
							disabled : true
						}, {
							id : 'mainuse',
							fieldLabel : '主要用途',
							allowBlank : false,
							blankText : '不能为空!'
						}]
					},{
						xtype : 'panel',
						layout : 'form',
						columnWidth : .25,
						border : false,
						labelWidth : 60,
	
						bodyStyle : 'padding:5px;',
						defaults : {
							anchor : '95%'
						},
						items : [{
							id : 'nums',
							xtype : 'numberfield',
							fieldLabel : '数量',
							allowBlank : false,
							allowNegative : false,
							blankText : '不能为空!'
						}, {
							id : 'constructionsite',
							xtype : 'textfield',
							fieldLabel : '选址/地点',
							allowBlank : false,
							blankText : '不能为空!'
						}, {
							id : 'demandreason',
							xtype : 'textfield',
							fieldLabel : '需求原因',
							allowBlank : false,
							blankText : '不能为空!'
						}]
					},{
						xtype : 'panel',
						layout : 'form',
						columnWidth : .25,
						border : false,
						labelWidth : 60,
	
						bodyStyle : 'padding:5px;',
						defaults : {
							anchor : '95%'
						},
						items : [{
							id : 'numsunit',
							xtype : 'combo',
							fieldLabel : '数量单位',
							triggerAction : 'all',
							emptyText : '请选择',
							editable : false,
							store : [['米','米'], ['平方米', '平方米'],['立方米', '立方米']],
							allowBlank : false,
							blankText : '不能为空!'
						}, {
							id : 'deliverytime',
							xtype : 'datefield',
							fieldLabel : '交付时间',
							allowBlank : false,
							format:'Y-m-d',
							blankText : '不能为空!'
						}, {
							id : 'remarke',
							xtype : 'textfield',
							fieldLabel : '备注'
						}]
					}]
				}]
			},{
				xtype : 'form',
				border : false,
				id : 'fileFormPanel',	
				fileUpload : true,
				labelWidth : 60,
				items : [{
					xtype : 'panel',
					layout : 'column',
					border : false,
					items : [{
						xtype : 'panel',
						layout : 'form',
						bodyStyle : 'padding:5px;',
						columnWidth : .5,
						border : false,
						items : [{
							xtype : 'hidden',
							id : 'fileid',
							name : 'fileid'
						},{
							id : 'uploadfile',
							xtype : 'fileuploadfield',
							name : 'uploadfile',
							buttonText : '浏览...',
							anchor : '100%',
							fieldLabel : '上传附件'
						}
//							{
//							id : 'filename',
//							xtype : !isEdit ? 'fileuploadfield' : 'hidden',
//							name : 'filename',
//							buttonText : '浏览...',
//							anchor : '100%',
//							fieldLabel : '上传附件'
//						},{
//							xtype : isEdit ? 'displayfield' : 'hidden',
//							fieldLabel : '上传附件',
//							listeners : {
//								afterrender : function(field) {
//									var ID = Ext.getCmp('fileid').getValue();
//									var ORIGINALNAME = Ext.getCmp('uploadfile').getValue();
//									var value = "<a href='../FILEDOWN/?ID="// 着用的是下载。需传值文件的id和文件名，才能查到
//											+ ID + "&ORIGINALNAME=" + encodeURI(encodeURI(ORIGINALNAME)) + "' cursor：hand>" +
//											"<font color='blue'>" + ORIGINALNAME + "</font></a>";
//									field.setValue(value);
//								}
//							}
//						}
						]
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
					var civilRegistForm = Ext.getCmp('civilRegistForm');
					if (!civilRegistForm.getForm().isValid()) {return false;}
					civilRegist.saveCivilRegist(id);
					
					
			}},{text:' 关闭 ',handler : function(){window.close()}}]
		});
		store.load();
		
		if(isEdit){
			var rec = Ext.getCmp('civilRegistGrid').store.getById(id);
			Ext.getCmp('civilRegistForm').getForm().loadRecord(rec);
			Ext.getCmp('fileFormPanel').getForm().loadRecord(rec);
			civilRegist.currentFileName = rec.data.uploadfile;
		}
		window.show();
	},
	
	saveCivilRegist : function(id){
		
		var projectname = Ext.getCmp('projectname').getValue();
		var constructiontype = Ext.getCmp('constructiontype').getValue();
		var nums = Ext.getCmp('nums').getValue();
		var numsunit = Ext.getCmp('numsunit').getValue();
		var investmentbudget = Ext.getCmp('investmentbudget').getValue();
		var financeunit = Ext.getCmp('financeunit').getValue();
		var constructionsite = Ext.getCmp('constructionsite').getValue();
		var deliverytime = Ext.getCmp('deliverytime').getValue();
		var useunit = Ext.getCmp('useunit').getValue();
		var mainuse = Ext.getCmp('mainuse').getValue();
		var demandreason = Ext.getCmp('demandreason').getValue();
		var remarke = Ext.getCmp('remarke').getValue();
		var categorys = Ext.getCmp('categorys').getValue();
		var uploadfile = Ext.getCmp('uploadfile').getValue();
		var fileform = Ext.getCmp('fileFormPanel');
		
		if(typeof(id)=="undefined"){//保存
			
			if(uploadfile==""){
				var json = {
					projectname : projectname,constructiontype:constructiontype,
					nums : nums,numsunit:numsunit,investmentbudget:investmentbudget,
					financeunit : financeunit,constructionsite:constructionsite,
					deliverytime : deliverytime,useunit:useunit,mainuse:mainuse,
					demandreason:demandreason,remarke:remarke,categorys : categorys
				}
				Ext.Ajax.request({
					url : "../JSON/PEdeclareRemote.saveCivilRegist",
					params : {
							json : Ext.encode(json)
					},
					success : function(response, opt) {
						var value = response.responseText;
						if (value=="true"){
							Ext.MessageBox.hide();
		    				if(Ext.Msg.alert('提示','保存成功!')){
		//    					main.tabs.setActiveTab(1);
		    					Ext.getCmp('civilRegistWindow').close();
		    					Ext.getCmp('civilRegistGrid').getStore().reload();
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
							projectname : projectname,constructiontype:constructiontype,
							nums : nums,numsunit:numsunit,investmentbudget:investmentbudget,
							financeunit : financeunit,constructionsite:constructionsite,
							deliverytime : deliverytime,useunit:useunit,mainuse:mainuse,
							demandreason:demandreason,remarke:remarke,fileid : file.fileId,
							uploadfile : file.fileName,categorys : categorys
						}
						Ext.Ajax.request({
							url : "../JSON/PEdeclareRemote.saveCivilRegist",
							params : {
									json : Ext.encode(json)
							},
							success : function(response, opt) {
								var value = response.responseText;
								if (value=="true"){
									Ext.MessageBox.hide();
				    				if(Ext.Msg.alert('提示','保存成功!')){
				//    					main.tabs.setActiveTab(1);
				    					Ext.getCmp('civilRegistWindow').close();
				    					Ext.getCmp('civilRegistGrid').getStore().reload();
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
			if(uploadfile==""||uploadfile==civilRegist.currentFileName){alert(1);
				var json = {
					projectname : projectname,constructiontype:constructiontype,
					nums : nums,numsunit:numsunit,investmentbudget:investmentbudget,
					financeunit : financeunit,constructionsite:constructionsite,
					deliverytime : deliverytime,useunit:useunit,mainuse:mainuse,
					demandreason:demandreason,remarke:remarke,categorys : categorys,
					fileid : Ext.getCmp('fileid').getValue(),
					uploadfile : Ext.getCmp('uploadfile').getValue(),id:id
				}
				Ext.Ajax.request({
					url : "../JSON/PEdeclareRemote.saveCivilRegist",
					params : {
							json : Ext.encode(json)
					},
					success : function(response, opt) {
						var value = response.responseText;
						if (value=="true"){
							Ext.MessageBox.hide();
		    				if(Ext.Msg.alert('提示','更新成功!')){
		//    					main.tabs.setActiveTab(1);
		    					Ext.getCmp('civilRegistWindow').close();
		    					Ext.getCmp('civilRegistGrid').getStore().reload();
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
							projectname : projectname,constructiontype:constructiontype,
							nums : nums,numsunit:numsunit,investmentbudget:investmentbudget,
							financeunit : financeunit,constructionsite:constructionsite,
							deliverytime : deliverytime,useunit:useunit,mainuse:mainuse,
							demandreason:demandreason,remarke:remarke,categorys : categorys,
							fileid : file.fileId,uploadfile : file.fileName,id:id
						}
						Ext.Ajax.request({
							url : "../JSON/PEdeclareRemote.saveCivilRegist",
							params : {
									json : Ext.encode(json)
							},
							success : function(response, opt) {
								var value = response.responseText;
								if (value=="true"){
									Ext.MessageBox.hide();
				    				if(Ext.Msg.alert('提示','更新成功!')){
				//    					main.tabs.setActiveTab(1);
				    					Ext.getCmp('civilRegistWindow').close();
				    					Ext.getCmp('civilRegistGrid').getStore().reload();
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
	},
	
	delCivilRegist : function(){
		var grid = Ext.getCmp('civilRegistGrid');
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
					url : "../JSON/PEdeclareRemote.delCivilRegist",
					params : {
							id : id
					},
					success : function(response, opt) {
						var value = response.responseText;
						if (value=="true"){
							Ext.MessageBox.hide();
		    				if(Ext.Msg.alert('提示','删除成功!')){
		//    					main.tabs.setActiveTab(1);
		    					Ext.getCmp('civilRegistGrid').getStore().reload();
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
	doApproval : function(){
		var grid = Ext.getCmp('civilRegistGrid');
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
		approvePanel.submit("501800", "土建登记申报审批", "土建登记申报审批", id.substring(0,id.length-1), 
					"CivilRegist", true, civilRegist.approvePanelSuccess, civilRegist.approvePanelFailure);
	
	},
	
	approvePanelSuccess : function(){
		var rows = Ext.getCmp("civilRegistGrid").getSelectionModel().getSelections();
		for(i=0;i < rows.length;i++){
			rows[i].set('approvalstate','审批中');
		} 
	},
	
	approvePanelFailure : function(){
		Ext.Msg.alert('提示', '没有送审权限！');
	}
}