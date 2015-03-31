//			[3].洪都航空固定资产投资设备项目计划表 
var equipPlan = {

//	设备项目投资计划页面
	getPanel : function(){
		var sm = new Ext.grid.CheckboxSelectionModel(); 
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
					'numsunit','marketprice','schedule','fundunit',
					'installsite','installcondition','mainuse',
					'demandreason','categorys','approvalstate',
					'createtime','remarke','uploadfile','id',
					'budgetnum','annualinvestmentplan','fundsource',
					'headperson','specialname'])
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
			    header : "<font color='blue'>项目名称</font>",
				dataIndex : 'projectname',
				sortable : true,
				width : 100 ,
				editor: new Ext.form.TextField({
                    allowBlank: false,
                    blankText : '不能为空!',
                    disabled : main.leaderRole
                })
			},{  
			    header : '项目主管',
				dataIndex : 'headperson',
				sortable : true,
				width : 70 
			},{ 
				header : "<font color='blue'>专项名称</font>",
				dataIndex : 'specialname',
				sortable : true,
				width : 100 ,
				editor: new Ext.form.TextField({
                    disabled : main.leaderRole
                })
			},{
				id : 'fundsource',
				header : "<font color='red'>资金来源*</font>",
				dataIndex : 'fundsource',
				sortable : true,
				width : 60,
				editor : new Ext.form.ComboBox({
							//name : 'yn_life',
							// 作为FORM表单提交时的参数名,并且hiddenName!=id
							//hiddenName : 'yn_life',// 创建一个新的控件,id=hiddenName
							fieldLabel : '资金来源',
							typeAhead : true,// 必须项
							triggerAction : 'all',// 必须项
							lazyRender : true,
							resizable : true,// 是否手动扩展大小,默认false
							mode : 'local',
							forceSelection : true,// 限制输入范围在可选择的文本内
							editable : false,// 不允许输入,只能选择文本列表
							//anchor : '95%',
							store : new Ext.data.ArrayStore({
										id : 0,
										fields : ['value', 'displayText'],
										data : [['专项', '专项'], ['自筹', '自筹']]
									}),
							valueField : 'value',
							value :'自筹',
							disabled : main.leaderRole,
							displayField : 'displayText'
						})
			},{ 
				header : '状态',
				dataIndex : 'approvalstate',
				sortable : true,
				width : 50  ,
				renderer : function(value, cellmeta, record, rowIndex){
					var id = record.get('id');
					if (record.get('approvalstate') == "待审批"||
						record.get('approvalstate') == "已退回"||
						record.get('approvalstate') == "待审批*") {
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
				width : 60
			}, { 
		        header : "<font color='blue'>规格型号(供参考)</font>",
				dataIndex : 'referencemodel',
				sortable : true,
				width : 100,
				editor: new Ext.form.TextField({
                    allowBlank: false,
                    blankText : '不能为空!',
                    disabled : main.leaderRole
                })
					 
			},{ 
				header : "<font color='blue'>主要性能指标</font>",
			    dataIndex : 'mainparam',
				sortable : true,
			    width : 100 ,
			    editor: new Ext.form.TextField({
                    allowBlank: false,
                    blankText : '不能为空!',
                    disabled : main.leaderRole
                })
			},{ 
				header : "<font color='blue'>数量</font>",
				dataIndex : 'nums',
				sortable : true,
				width : 100 ,
				editor: new Ext.form.TextField({
                    allowBlank: false,
                    blankText : '不能为空!',
                    disabled : main.leaderRole
                })
			},{ 
				header : "<font color='blue'>单位</font>",
				dataIndex : 'numsunit',
				sortable : true,
				width : 50 ,
				editor: new Ext.form.TextField({
                    allowBlank: false,
                    blankText : '不能为空!',
                    disabled : main.leaderRole
                })
			},{ 
				id : 'budgetnum',
				header : "<font color='red'>总投资预算控制*</font>",
				dataIndex : 'budgetnum',
				sortable : true,
				width : 100 ,
				editor: new Ext.form.TextField({
                    allowBlank: false,
                    regex : /^\d+(\.\d+)?$/,
                    regexText:"只能够输入正数字",
                    disabled : main.leaderRole
                })
			},{ 
				id : 'annualinvestmentplan',
				header : "<font color='red'>本年计划投资*</font>",
				dataIndex : 'annualinvestmentplan',
				sortable : true,
				width : 100 ,
				editor: new Ext.form.TextField({
                    allowBlank: false,
                    regex : /^\d+(\.\d+)?$/,
                    regexText:"只能够输入正数字",
                    disabled : main.leaderRole
                })
			},{ 
				id : 'fundunit',
				header : '金额单位',
				dataIndex : 'fundunit',
				sortable : true,
				width : 60 
			},{ 
				header : "<font color='blue'>安装地点</font>",
				dataIndex : 'installsite',
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
				header : '审批记录',
				dataIndex : 'remark',
				sortable : true,
				width : 100,
				renderer : function(value, cellmeta, record, rowIndex) {
					var id = record.get('id');
					if (record.get('approvalstate') == "已审批"||record.get('approvalstate') == "已退回") {
						return "<a href='javascript:void(0);' onclick = approvalInfoList.showWin('" + id + "')><font color=blue>查看</font></a>";
					}
				} 
			},{ 
				header : "<font color='blue'>备注</font>",
				dataIndex : 'remarke',
				sortable : true,
				width : 100 ,
				editor: new Ext.form.TextField({
                    disabled : main.leaderRole
                })
			}
		]);
		var grid = new Ext.grid.EditorGridPanel({
			title : '洪都航空固定资产投资设备项目计划表',
			width : 300,
			id : 'equipPlanGrid',
			cm : cm, 
			sm : sm,
			columnLines : true,
			clicksToEdit: 1,
			stripeRows : true,
			bbar : paging,
			region : 'center',
			store : store,
			loadMask : {
		    	 msg : '正在加载数据，请稍侯……'
		    },
			tbar : new Ext.Toolbar({
				items : ['-' ,{
							extype : 'button',
							text : '新增',
							iconCls : 'add1',
							disabled : main.leaderRole,
							handler : function(){
								equipPlan.addEquipPlan();
							}
						},'-' ,{
							extype : 'button',
							text : '删除',
							iconCls : 'del1',
							disabled : main.leaderRole,
							handler : function(){
								equipPlan.delEquipPlan();
							}
						},'-' ,{
							extype : 'button',
							text : '提交审批',
							disabled : main.leaderRole,
							iconCls : 'icon-importTasks',
							handler : function(){
								equipPlan.doApproval();
							}
						},'-',{
							extype : 'button',
							text : '任务指派',
							iconCls : 'icon-projectHistory-16',
							disabled : !main.directorRole,
							handler : function(){
								equipPlan.appointPerson();
							}
						},'-','项目名称:',{xtype:'textfield',id:'equipPlan_projectname'},{
							text : '查询',
							iconCls : 'search1',
							handler : function(){
								var store=grid.getStore()
								store.setBaseParam('projectname',Ext.getCmp('equipPlan_projectname').getValue());
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
			if(record.get('approvalstate')=="待审批*"){
				return true;
			}else if(record.get('approvalstate')=="待审批"||record.get('approvalstate')=="已退回"){
				if(obj.field == "budgetnum"||obj.field == "annualinvestmentplan"||
					obj.field == "fundsource"||obj.field == "specialname"){
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
				url: '../JSON/peSummaryRemote.editEquipPlan',  
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
//	审批
	doApproval : function(){
		var grid = Ext.getCmp('equipPlanGrid');
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
			var headperson=rows[i].get('headperson');
			if(headperson==null||headperson==""){
				Ext.MessageBox.alert('提示', '请指派项目主管!'); 
				return;				
			}
			if(approvalState == '已审批' || approvalState == '审批中'){
				Ext.MessageBox.alert('提示', '请选择待审批记录!'); 
				return;
			}
			
			if(rows[i].data.budgetnum==""||rows[i].data.annualinvestmentplan==""||
				rows[i].data.fundsource==""){
				flag = true;
				break;
			}
		}
		
		if(flag){
			Ext.MessageBox.alert("提示","<font color='red'>*</font>为必填项，不允许提交审批!");
		}else{
			approvePanel.submit("503051", "设备项目计划审批", "设备项目计划审批", id.substring(0,id.length-1), 
					"EquipPlan", true, equipPlan.approvePanelSuccess, equipPlan.approvePanelFailure);
	
		}
		
	},
//	审批通过回调
	approvePanelSuccess : function(){
		var rows = Ext.getCmp("equipPlanGrid").getSelectionModel().getSelections();
		for(i=0;i < rows.length;i++){
			rows[i].set('approvalstate','审批中');
		} 
	},
//	审批失败回调
	approvePanelFailure : function(){
		Ext.Msg.alert('提示', '没有送审权限！');
	},
//	指派任务
	appointPerson : function(){
		var grid = Ext.getCmp('equipPlanGrid');
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
					url: '../JSON/peSummaryRemote.appointPersonToEquipRegist',  
					params: {id : id,person:person},
					success : function(response, opts) {
						Ext.Msg.alert('提示', '任务指派成功!');
						Ext.getCmp('equipPlanGrid').getStore().baseParams = {start:0,limit:20};
						Ext.getCmp('equipPlanGrid').getStore().reload();
					},
					failure : function(response, opts) {
						Ext.Msg.alert('提示', '数据问题,请与管理员联系!');
					}
					
				});
			}
			e.win.close();
		});
	},
	//新增，创建windows	
	addEquipPlan : function(){
		
		var window = new Ext.Window({
			id :'equipPlanWindow',
			width : 900,
			title:"设备项目投资计划",
			autoScroll:false,
			autoDestroy: true,
			items:[{
				xtype : 'form',
				id : 'equipPlanForm',
				border : false,
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
						items : [
							{id : 'projectname',xtype : 'textfield',fieldLabel : '项目名称',allowBlank : false,blankText : '不能为空!'}
						]
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
						items : [
							{id : 'referencemodel',xtype : 'textfield',fieldLabel : '规格型号',allowBlank : false,blankText : '不能为空!'}
						]
					},{
						xtype : 'panel',
						layout : 'form',
						columnWidth : .33,
						border : false,
						labelWidth : 80,
	
						bodyStyle : 'padding:5px;',
						defaults : {
							anchor : '95%'
						},
						items : [
							{id : 'mainparam',xtype : 'textfield',fieldLabel : '主要性能指标',allowBlank : false,allowNegative : false,blankText : '不能为空!'}
						]
					}]
				},{
					xtype : 'panel',
					layout : 'column',
					border : false,
					items : [{
						xtype : 'panel',
						layout : 'form',
						columnWidth : .33,
						border : false,
						labelWidth : 60,
						bodyStyle : 'padding:0px 5px;',
						defaultType : 'textfield',
						defaults : {
							anchor : '95%'
						},
						items : [
							{id : 'nums',xtype : 'numberfield',fieldLabel : '数量',allowBlank : false,blankText : '不能为空!'}
						]
					},{
						xtype : 'panel',
						layout : 'form',
						columnWidth : .33,
						border : false,
						labelWidth : 60,
						bodyStyle : 'padding:0px 5px;',
						defaults : {
							anchor : '95%'
						},
						items : [
								{id : 'numsunit',xtype : 'textfield',fieldLabel : '数量单位',allowBlank : false,blankText : '不能为空!'}
						]
					}, {
						xtype : 'panel',
						layout : 'form',
						columnWidth : .33,
						border : false,
						labelWidth : 80,
						defaultType : 'textfield',
						bodyStyle : 'padding:0px 5px;',
						defaults : {
							anchor : '95%'
						},
						items : [
							{id : 'installsite',fieldLabel : '安装地点',allowBlank : false,blankText : '不能为空!'}
						]
					}]
				},{
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
						defaultType : 'textfield',
						defaults : {
							anchor : '95%'
						},
						items : [
							{id : 'remarke',fieldLabel : '备注'}
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
					var equipPlanForm = Ext.getCmp('equipPlanForm');
					if (!equipPlanForm.getForm().isValid()) {
						return false;
					}else{
						equipPlan.saveEquipPlan();
					}
			}},{text:' 关闭 ',handler : function(){window.close()}}]
		});
		window.show();
	},
//保存
	saveEquipPlan : function(){
		var equipPlanForm = Ext.getCmp('equipPlanForm');
		var data = equipPlanForm.getForm().getValues();
		Ext.Ajax.request({  
			url: '../JSON/peSummaryRemote.saveEquipPlan?d='+new Date(),  
			params: {projectname : data.projectname,
				referencemodel : data.referencemodel,
				mainparam : data.mainparam,
				nums : data.nums, numsunit : data.numsunit,
				installsite : data.installsite,
				remarke : data.remarke
			},
			success : function(response, opts) {
				var obj = Ext.decode(response.responseText);
				if (obj.success == true) {
					Ext.MessageBox.hide();
    				if(Ext.Msg.alert('提示','保存成功!')){
//    					main.tabs.setActiveTab(1);
    					Ext.getCmp('equipPlanWindow').close();
    					Ext.getCmp('equipPlanGrid').getStore().reload();
    				}
				}else{
					Ext.Msg.alert("提示","数据异常，请与管理员联系。")
				}
			}
		});
	},
//删除	
	delEquipPlan : function(){
		var grid = Ext.getCmp('equipPlanGrid');
		var id = "";
 		var rows = grid.getSelectionModel().getSelections();// 返回值为 Record 数组
 		if(rows.length == 0){
		 	Ext.MessageBox.alert('提示', '请选择一条记录!'); 
			return;
		}
		
		for(i = 0;i < rows.length;i++){   
			id = id + rows[i].get('id') + ",";
			var approvalState = rows[i].get('approvalstate');
			if(approvalState != '待审批*' ){
				Ext.MessageBox.alert('提示', "只能删除新增的状态为<font color = 'red'>待审批*</font>的记录!"); 
				return;
			}
		}
		
		Ext.Msg.confirm("提示","是否确定删除?",function(btn){
			if(btn == 'yes'){
				Ext.Ajax.request({
					url : "../JSON/peSummaryRemote.delEquipPlan",
					params : {
							id : id
					},
					success : function(response, opt) {
						var obj = Ext.decode(response.responseText);
						if (obj.success == true) {
							Ext.MessageBox.hide();
		    				if(Ext.Msg.alert('提示','删除成功!')){
		    					Ext.getCmp('equipPlanGrid').getStore().reload();
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
	}
}