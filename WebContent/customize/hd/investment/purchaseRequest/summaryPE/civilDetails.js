//			[2].洪都航空固定资产投资计划土建项目明细表
var civilDetails = {
//获取土建项目投资计划页面
	getPanel : function(){
		var sm = new Ext.grid.CheckboxSelectionModel(); 
		var store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						url : '../JSON/peSummaryRemote.getCivilDetailsList?d='+new Date(),
						method : 'post'
					}),
			reader : new Ext.data.JsonReader({
						root : 'results',
						id : 'id',
						totalProperty : 'totalProperty'
					}, ['projectname','constructiontype','nums','numsunit','investmentbudget',
					'fundunit','constructionsite','deliverytime','useunit','mainuse',
					'demandreason','remarke','approvalstate','id','createtime','specialname',
					'schedule','budgetnum','fundsource','annualinvestmentplan','headperson',
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
			 }),
			{id : 'projectname',header : "<font color='blue'>项目名称</font>",dataIndex : 'projectname',sortable : true,width : 100 ,
				editor: new Ext.form.TextField({
                    allowBlank: false,
                    blankText : '不能为空!',
                    disabled : main.leaderRole
                })
			},
			{id : 'headperson',header : '项目主管',dataIndex : 'headperson',sortable : true,width : 70 },
			{id : 'specialname',header : "<font color='blue'>专项名称</font>",dataIndex : 'specialname',sortable : true,width : 100 ,
				editor: new Ext.form.TextField({
                    disabled : main.leaderRole
                })
			},
			{id : 'fundsource',header : "<font color='red'>资金来源*</font>",dataIndex : 'fundsource',sortable : true,width : 60 ,
				editor:new Ext.form.ComboBox({
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
			},
			{id : 'approvalstate',header : '状态',dataIndex : 'approvalstate',sortable : true,width : 50  ,
				renderer : function(value, cellmeta, record, rowIndex){
					var id = record.get('id');
					if (record.get('approvalstate') == "待审批"||
						record.get('approvalstate') == "已退回"||
						record.get('approvalstate') == '待审批*') {
						return "<font color=red>"+value+"</font>";
					}else if(record.get('approvalstate')=='已审批'){
						return "<font color=green>"+value+"</font>";
					}else{
						return value;
					}
				}
			}, 
			{id : 'categorys',header : '类别',dataIndex : 'categorys',sortable:true,width:60},
			{id : 'constructiontype',header : "<font color='blue'>建设性质</font>",dataIndex : 'constructiontype',sortable : true,width : 60,
				editor : new Ext.form.ComboBox({
					fieldLabel : '建设性质',
					triggerAction : 'all',
					emptyText : '请选择',
					editable : false,
					store : [['扩建', '扩建'], ['改造', '改造'],['新建','新建']],
					allowBlank : false,
					blankText : '不能为空!'
				})	 
			},
			{id : 'nums',header : "<font color='blue'>数量</font>",dataIndex : 'nums',sortable : true,width : 100 ,
				editor: new Ext.form.TextField({
                    allowBlank: false,
                    blankText : '不能为空!',
                    disabled : main.leaderRole
                })
			},
			{id : 'numsunit',header : "<font color='blue'>单位</font>",dataIndex : 'numsunit',sortable : true,width : 50 ,
				editor: new Ext.form.TextField({
                    allowBlank: false,
                    blankText : '不能为空!',
                    disabled : main.leaderRole
                })
			},
			{id : 'schedule',header : "<font color='red'>进度要求*</font>",dataIndex : 'schedule',sortable : true,width : 100 ,
				editor: new Ext.form.TextField({
                    allowBlank: false,
                    blankText : '不能为空!',
                    disabled : main.leaderRole
                })
			},
			{id : 'budgetnum',header : "<font color='red'>总投资预算控制*</font>",dataIndex : 'budgetnum',sortable : true,width : 100 ,
				editor: new Ext.form.TextField({
                    allowBlank: false,
                    blankText : '不能为空!',
                    regex : /^\d+(\.\d+)?$/,
                    regexText:"只能够输入正数字",
                    disabled : main.leaderRole
                })
			},
			{id : 'annualinvestmentplan',header : "<font color='red'>本年计划投资*</font>",dataIndex : 'annualinvestmentplan',sortable : true,width : 100 ,
				editor: new Ext.form.TextField({
                    allowBlank: false,
                    blankText : '不能为空!',
                    regex : /^\d+(\.\d+)?$/,
                    regexText:"只能够输入正数字",
                    disabled : main.leaderRole
                })
			},
			{id : 'fundunit',header : '金额单位',dataIndex : 'fundunit',sortable : true,width : 60},
			{id : 'constructionsite',header : "<font color='blue'>施工地点</font>",dataIndex : 'constructionsite',sortable : true,idth : 100 ,
				editor: new Ext.form.TextField({
                    allowBlank: false,
                    blankText : '不能为空!',
                    disabled : main.leaderRole
                })
			},
			{id : 'createtime',header : '时间',dataIndex : 'createtime',sortable : true,width : 100 },
			{id : '',header : '审批记录',dataIndex : '',sortable : true,width : 100,
				renderer : function(value, cellmeta, record, rowIndex) {
					var id = record.get('id');
					if (record.get('approvalstate') == "已审批"||record.get('approvalstate') == "已退回") {
						return "<a href='javascript:void(0);' onclick = approvalInfoList.showWin('" + id + "')><font color=blue>查看</font></a>";
					}
				}
			},
			{id : 'remarke',header : "<font color='blue'>备注</font>",dataIndex : 'remarke',sortable : true,width : 100 ,
				editor: new Ext.form.TextField({
                    disabled : main.leaderRole
                })
			}
		]);
		var grid = new Ext.grid.EditorGridPanel({
			title : '洪都航空固定资产投资土建项目计划表',
			width : 300,
			id : 'civilDetailsGrid',
			cm : cm, 
			sm : sm,
			columnLines : true,
			stripeRows : true,
			bbar : paging,
			region : 'center',
			store : store,
			clicksToEdit: 1,
			loadMask : {
		    	 msg : '正在加载数据，请稍侯……'
		    },
			tbar : new Ext.Toolbar({
				items : ['-' ,
						{extype : 'button',text : '新增',iconCls : 'add1',disabled : main.leaderRole,
							handler : function(){
								civilDetails.addCivilDetails();
							}
						},'-' ,
						{extype : 'button',text : '删除',iconCls : 'del1',disabled : main.leaderRole,
							handler : function(){
								civilDetails.delCivilDetails();
							}
						},'-' ,
						{extype : 'button',text : '提交审批',iconCls : 'icon-importTasks',disabled : main.leaderRole,
							handler : function(){
								civilDetails.doApproval();
							}
						},'-',
						{extype : 'button',text : '任务指派',iconCls : 'icon-projectHistory-16',disabled : !main.directorRole,
							handler : function(){
								civilDetails.appointPerson();
							}
						},'-','项目名称:',
						{xtype:'textfield',id:'civilDetails_projectname'},
						{text : '查询',iconCls : 'search1',
							handler : function(){
								var store=grid.getStore()
								store.setBaseParam('projectname',Ext.getCmp('civilDetails_projectname').getValue());
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
				if(obj.field == "schedule"||obj.field == "budgetnum"||
					obj.field == "annualinvestmentplan"||obj.field == "fundsource"||
					obj.field == "specialname"){
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
				url: '../JSON/peSummaryRemote.editCivilDetails',  
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
//审批
	doApproval : function(){
		var grid = Ext.getCmp('civilDetailsGrid');
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
			if(rows[i].data.schedule==""||rows[i].data.budgetnum==""||
				rows[i].data.annualinvestmentplan==""||rows[i].data.fundsource==""){
				flag = true;
				break;
			}
		}
		if(flag){
			Ext.MessageBox.alert("提示","<font color='red'>*</font>为必填项，不允许提交审批!");
		}else{
			approvePanel.submit("503000", "土建项目明细审批", "土建项目明细审批", id.substring(0,id.length-1), 
			"CivilDetails", true, civilDetails.approvePanelSuccess, civilDetails.approvePanelFailure);

		}

	},
//审批回调成功	
	approvePanelSuccess : function(){
		var rows = Ext.getCmp("civilDetailsGrid").getSelectionModel().getSelections();
		for(i=0;i < rows.length;i++){
			rows[i].set('approvalstate','审批中');
		} 
	},
//审批回调失败	
	approvePanelFailure : function(){
		Ext.Msg.alert('提示', '没有送审权限！');
	},

//任务指派
	appointPerson : function(){
		var grid = Ext.getCmp('civilDetailsGrid');
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
					url: '../JSON/peSummaryRemote.appointPersonToCivilRegist',  
					params: {id : id,person:person},
					success : function(response, opts) {
						Ext.Msg.alert('提示', '任务指派成功!');
						Ext.getCmp('civilDetailsGrid').getStore().baseParams = {start:0,limit:20};
						Ext.getCmp('civilDetailsGrid').getStore().reload();
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
	addCivilDetails : function(){
		
		var window = new Ext.Window({
			id :'civilDetailsWindow',
			width : 900,
			title:"土建项目投资计划",
			autoScroll:false,
			autoDestroy: true,
			items:[{
				xtype : 'form',
				id : 'civilDetailsForm',
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
						items : [
							{id : 'projectname',xtype : 'textfield',fieldLabel : '项目名称',allowBlank : false,blankText : '不能为空!'}
						]
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
						items : [
							{id : 'constructiontype',xtype : 'combo',fieldLabel : '建设性质',triggerAction : 'all',emptyText : '请选择',
								editable : false,store : [['扩建', '扩建'], ['改造', '改造'],['新建','新建']],allowBlank : false,blankText : '不能为空!'
							}
						]
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
						items : [
							{id : 'nums',xtype : 'numberfield',fieldLabel : '数量',allowBlank : false,allowNegative : false,blankText : '不能为空!'}
						]
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
						items : [
							{id : 'numsunit',xtype : 'textfield',fieldLabel : '数量单位',allowBlank : false,blankText : '不能为空!'}
						]
					}]
				},{
					xtype : 'panel',
					layout : 'column',
					border : false,
					items : [{
						xtype : 'panel',
						layout : 'form',
						columnWidth : .25,
						border : false,
						labelWidth : 60,
						bodyStyle : 'padding:0px 5px;',
						defaultType : 'textfield',
						defaults : {
							anchor : '95%'
						},
						items : [
							{id : 'constructionsite',fieldLabel : '施工地点',allowBlank : false,blankText : '不能为空!'}
						]
					},{
						xtype : 'panel',
						layout : 'form',
						columnWidth : .25,
						border : false,
						labelWidth : 60,
						bodyStyle : 'padding:0px 5px;',
						defaults : {
							anchor : '95%'
						},
						items : [
							{id : 'fundsource',xtype : 'combo',fieldLabel : '资金来源',allowBlank : false,triggerAction : 'all',emptyText : '请选择',
								editable : false,store : [['自筹', '自筹'], ['专项', '专项']],allowBlank : false,blankText : '不能为空!'
							}
						]
					}, {
						xtype : 'panel',
						layout : 'form',
						columnWidth : .25,
						border : false,
						labelWidth : 60,
						defaultType : 'textfield',
						bodyStyle : 'padding:0px 5px;',
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
					var civilDetailsForm = Ext.getCmp('civilDetailsForm');
					if (!civilDetailsForm.getForm().isValid()) {
						return false;
					}else{
						civilDetails.saveCivilDetails();
					}
			}},{text:' 关闭 ',handler : function(){window.close()}}]
		});
		window.show();
	},
//保存
	saveCivilDetails : function(){
		var civilDetailsForm = Ext.getCmp('civilDetailsForm');
		var data = civilDetailsForm.getForm().getValues();
		Ext.Ajax.request({  
			url: '../JSON/peSummaryRemote.saveCivilDetails?d='+new Date(),  
			params: {projectname : data.projectname,
				constructiontype : data.constructiontype,
				nums : data.nums, numsunit : data.numsunit,
				constructionsite : data.constructionsite,
				fundsource : data.fundsource,
				remarke : data.remarke
			},
			success : function(response, opts) {
				var obj = Ext.decode(response.responseText);
				if (obj.success == true) {
					Ext.MessageBox.hide();
    				if(Ext.Msg.alert('提示','保存成功!')){
//    					main.tabs.setActiveTab(1);
    					Ext.getCmp('civilDetailsWindow').close();
    					Ext.getCmp('civilDetailsGrid').getStore().reload();
    				}
				}else{
					Ext.Msg.alert("提示","数据异常，请与管理员联系。")
				}
			}
		});
	},
//删除	
	delCivilDetails : function(){
		var grid = Ext.getCmp('civilDetailsGrid');
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
					url : "../JSON/peSummaryRemote.delCivilDetails",
					params : {
							id : id
					},
					success : function(response, opt) {
						var obj = Ext.decode(response.responseText);
						if (obj.success == true) {
							Ext.MessageBox.hide();
		    				if(Ext.Msg.alert('提示','删除成功!')){
		    					Ext.getCmp('civilDetailsGrid').getStore().reload();
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