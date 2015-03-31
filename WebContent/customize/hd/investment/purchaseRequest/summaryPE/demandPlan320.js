//			[1].320厂工艺设备实施计划及资金需求计划(专项) 
var demandPlan320 = {

	getPanel : function(){
		var sm = new Ext.grid.CheckboxSelectionModel(); 
		var store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						url : '../JSON/peSummaryRemote.getSpecialProjectList?d='+new Date(),
						method : 'post'
					}),
			reader : new Ext.data.JsonReader({
						root : 'results',
						id : 'id',
						totalProperty : 'totalProperty'
					}, ['projectname','createperson','createtime','approvalstate',
					'costunit','contractmoney','remark','id','projectnum'])
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
				id : 'projectname',
			    header : '项目名称',
				dataIndex : 'projectname',
				sortable : true,
				width : 120,
				renderer : function(value, cellmeta, record, rowIndex) {
					var id = record.get('id');
					var projectname = record.get('projectname');
					var approvalstate = record.get('approvalstate');
					if(approvalstate == "待审批"){
						return "<a href='javascript:void(0);' " +
							"onclick = demandPlan320.createDetailsWindow('" + id+"','"+projectname +"')>" +
							"<font color=blue>"+projectname+"</font></a>";
					}else{
						return projectname;
					}
					
				} 
			}, { 
		        id : 'projectnum',
		        header : '项目编号',
				dataIndex : 'projectnum',
				sortable : true,
				width : 130
					 
			},{ 
		        id : 'contractmoney',
		        header : '合同金额',
				dataIndex : 'contractmoney',
				sortable : true,
				width : 130
					 
			},{ 
				id : 'costunit',
				header : '单位',
			    dataIndex : 'costunit',
				sortable : true,
			    width : 120 
			},{ 
				id : 'createperson',
				header : '创建者',
				dataIndex : 'createperson',
				sortable : true,
				width : 120 
			},{ 
				id : 'createtime',
				header : '创建时间',
				dataIndex : 'createtime',
				sortable : true,
				width : 120 
			},{
				id : 'approvalstate',
				header : '审批状态',
				dataIndex : 'approvalstate',
				sortable : true,
				width : 120 ,
				renderer : function(value, cellmeta, record, rowIndex){
					var id = record.get('id');
					if (record.get('approvalstate') == "待审批") {
						return "<font color=red>"+value+"</font>";
					}else if(record.get('approvalstate')=='已审批'){
						return "<font color=green>"+value+"</font>";
					}else{
						return value;
					}
				}
			},{ 
				id : 'remark',
				header : '审批记录',
				dataIndex : 'remark',
				sortable : true,
				width : 120,
				renderer : function(value, cellmeta, record, rowIndex) {
					var id = record.get('id');
					if (record.get('approvalstate') == "已审批") {
						return "<a href='javascript:void(0);' onclick = approvalInfoList.showWin('" + id + "')><font color=blue>查看</font></a>";
					}
				} 
			},{ 
				id : 'remark',
				header : '备注',
				dataIndex : 'remark',
				sortable : true,
				width : 120 
			}
		]);
		var grid = new Ext.grid.GridPanel({
			title : '320厂工艺设备实施计划及资金需求计划(专项)',
			width : 100,
			id : 'demandPlan320Grid',
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
							text : '添加',
							disabled : main.leaderRole,
							handler : function(){
								demandPlan320.addSpecialProject();
							}
						},'-',{
							extype : 'button', 
							iconCls : 'del1',
							text : '删除',
							disabled : main.leaderRole,
							handler : function(){
								demandPlan320.delSpecialProject();
							}
						},'-' ,{
							extype : 'button',
							text : '提交审批',
							disabled : main.leaderRole,
							iconCls : 'icon-importTasks',
							handler : demandPlan320.doApproval
						},'-'
				]})
		
		});
	
		grid.on('activate', function() { 
			store.baseParams = {start:0,limit:20};
			store.reload();
		});
		return grid;
	},
	
	addSpecialProject : function(){

		var window = new Ext.Window({
			id :'specialProjectWindow',
			width : 400,
			title:"设备登记",
			autoScroll:false,
			autoDestroy: true,
			items:[{
				xtype : 'form',
				border : false,
				id : 'specialProjectForm',
				items : [{
					layout : 'column',
					border : false,
					items : [{
	                    layout: "form",
	                    border : false,
	                    labelWidth : 60,
	                    bodyStyle : 'padding:5,5,0,5;',
	                    items: {
	                    	id : 'projectname',
	                        xtype: "textfield",
	                        fieldLabel: "项目名称",
	                        anchor: "95%",
							allowBlank : false,
							blankText : '不能为空!'
	                    }
					}]
				},{
					layout : 'column',
					border : false,
					items : [{
	                    layout: "form",
	                    border : false,
	                    labelWidth : 60,
	                    bodyStyle : 'padding:5,5,0,5;',
	                    items: {
	                    	id : 'projectnum',
	                        xtype: "textfield",
	                        fieldLabel: "项目编号",
	                        anchor: "95%",
							allowBlank : false,
							blankText : '不能为空!'
	                    }
					}]
				},{
					layout : 'column',
					border : false,
					items : [{
	                    layout: "form",
	                    border : false,
	                    labelWidth : 60,
	                    bodyStyle : 'padding:0,5,0,5;',
	                    items: {
	                    	id : 'remark',
	                        xtype: "textfield",
	                        fieldLabel: "备注",
	                        anchor: "95%"
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
					var specialProjectForm = Ext.getCmp('specialProjectForm');
					if (!specialProjectForm.getForm().isValid()) {return false;}
					
					demandPlan320.saveSpecialProject();
					window.close();
			}},{text:' 关闭 ',handler : function(){window.close()}}]
		});
		window.show();
	},
	
	
	createDetailsWindow : function(id,projectname){
		var sm = new Ext.grid.CheckboxSelectionModel(); 
		var store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						url : '../JSON/peSummaryRemote.getSpecialProjectDetailsById?d='+new Date(),
						method : 'post'
					}),
			reader : new Ext.data.JsonReader({
						root : 'results',
						id : 'id',
						totalProperty : 'totalProperty'
					}, ['equipname','technicaldepthead','maintechnicalindex','manufacture',
					'nums','replyprice','replybidding','contractmoney','usedepthead',
					{name  :'investigationtime',type : 'date',dateFormat : 'time',mapping : 'investigationtime.time'},
					{name : 'biddingtime',type : 'date',dateFormat : 'time',mapping : "biddingtime.time"},
					{name : 'contracttime',type : 'date',dateFormat : 'time',mapping : "contracttime.time"},
					'payment','settlement','annualadvance','annualsettlement','preacceptance',
					{name : 'createtime',type : 'date',dateFormat : 'time',mapping : "createtime.time"},
					'remark','id'])
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
            new Ext.grid.RowNumberer({ header : "序号",width : 40}),
            {id : 'equipname',header : '设备名称',dataIndex : 'equipname',sortable : true,width : 120,
            	renderer : function(value, cellmeta, record, rowIndex){
					var idd = record.get('id');
					return "<a href='javascript:void(0);' onclick = demandPlan320.addSpecialProjectDetail('"+id+"','" + idd + "')>" +
								"<font color=blue>"+value+"</font></a>";
            	}
            }, 
            {id : 'technicaldepthead',header : '技改部负责人',dataIndex : 'technicaldepthead',sortable : true,width : 130},
            {id : 'maintechnicalindex',header : '主要技术指标',dataIndex : 'maintechnicalindex',sortable : true,width : 120},
            {id : 'manufacture',header : '参考厂商或国别',dataIndex : 'manufacture',sortable : true,width : 120 },
            {id : 'manufacture',header : '使用部门负责人',dataIndex : 'usedepthead',sortable : true,width : 120 },
            {id : 'nums',header : '台/套',dataIndex : 'nums',sortable : true,width : 120},
            {id : 'replyprice',header : '批复价格(万元)',dataIndex : 'replyprice',sortable : true,width : 120},
            {id : 'replybidding',header : '批复招标方式',dataIndex : 'replybidding',sortable : true,width : 120},
            {id : 'investigationtime',header : '调研/选型完成日期',dataIndex : 'investigationtime',sortable : true,width : 120,
            	renderer : Ext.util.Format.dateRenderer('Y-m-d')},
            {id : 'biddingtime',header : '招标完成日期',dataIndex : 'biddingtime',sortable : true,width : 120,
            	renderer : Ext.util.Format.dateRenderer('Y-m-d') },
            {id : 'contracttime',header : '签订合同日期',dataIndex : 'contracttime',sortable : true,width : 120,
            	renderer : Ext.util.Format.dateRenderer('Y-m-d') },
            {id : 'contractmoney',header : '合同金额(万元)',dataIndex : 'contractmoney',sortable : true,width : 120},
            {id : 'payment',header : '已付款金额(万元)',dataIndex : 'payment',sortable : true,width : 120},
            {id : 'settlement',header : '已结算金额(万元)',dataIndex : 'settlement',sortable : true,width : 120},
            {id : 'annualadvance',header : '本年预计付款金额',dataIndex : 'annualadvance',sortable : true,width : 120},
            {id : 'annualsettlement',header : '本年预计结算金额',dataIndex : 'annualsettlement',sortable : true,width : 120},
            {id : 'preacceptance',header : '预计验收交付',dataIndex : 'preacceptance',sortable : true,width : 120},
            {id : 'createtime',header : '创建时间',dataIndex : 'createtime',sortable : true,width : 120,
            	renderer : Ext.util.Format.dateRenderer('Y-m-d') },
			{id : 'remark',header : '备注',dataIndex : 'remark',sortable : true,width : 120 }
		]);
		var grid = new Ext.grid.GridPanel({
//			title : '320厂工艺设备实施计划及资金需求计划(专项)',
//			width : 100,
			id : 'specialProjectDetailsGrid',
			cm : cm, 
			sm : sm,
			columnLines : true,
			stripeRows : true,
			bbar : paging,
//			region : 'center',
			store : store,
			loadMask : {
		    	 msg : '正在加载数据，请稍侯……'
		    },
			tbar : new Ext.Toolbar({
				items : ['-',{
							extype : 'button', 
							iconCls : 'add1',
							text : '添加',
							handler : function(){
								demandPlan320.addSpecialProjectDetail(id);
							}
						},'-',{
							extype : 'button', 
							iconCls : 'del1',
							text : '删除',
							handler : function(){
								demandPlan320.delSpecialProjectDetail(id);
								Ext.getCmp('specialProjectDetailsGrid').getStore().reload();
							}
						},'-',{
							extype : 'button', 
							text : '返回',
							handler : function(){
								Ext.getCmp('specialProjectDetailsWindow').close();
								Ext.getCmp('demandPlan320Grid').getStore().reload();
							}
						},'-'
				]})
		
		});
		var window = new Ext.Window({
			id :'specialProjectDetailsWindow',
			layout : 'fit',
			title : projectname + "明细",
//			width : 400,
			maximized:true,
			autoScroll:false,
			autoDestroy: true,
			items:[grid],
			modal : true,
			border : true,
			bodyStyle:'background:#fff;',
			resizable: false,  
			buttonAlign : 'center'
		});
		store.baseParams = {start:0,limit:20,id : id};
		store.reload();
		window.show();
	},
	
	addSpecialProjectDetail : function(id,idd){
		
		var isEdit = true;
		if(typeof(idd) == "undefined"){
			isEdit = false;
		}
		
		var window = new Ext.Window({
			id :'specialProjectDetailWindow',
			width : 800,
			title:"设备登记",
			autoScroll:false,
			autoDestroy: true,
			items:[{
				xtype : 'form',
				border : false,
				id : 'specialProjectDetailForm',
				items : [{
				layout : 'column',
				border : false,
				items : [{
                    layout: "form",
                    columnWidth : .33,
                    border : false,
                    labelWidth : 105,
                    bodyStyle : 'padding:5,5,0,5;',
                    items: {
                    	id : 'equipname',
                        xtype: "textfield",
                        fieldLabel: "设备名称",
                        anchor: "95%",
						allowBlank : false,
						blankText : '不能为空!'
                    }
				},{
                    layout: "form",
                    columnWidth : .33,
                    border : false,
                    labelWidth : 105,
                    bodyStyle : 'padding:5,5,0,5;',
                    items: {
                    	id : 'technicaldepthead',
                        xtype: "textfield",
                        fieldLabel: "技改部门负责人",
                        anchor: "95%",
						allowBlank : false,
						blankText : '不能为空!'
                    }
				},{
                    layout: "form",
                    columnWidth : .33,
                    border : false,
                    labelWidth : 110,
                    bodyStyle : 'padding:5,5,0,5;',
                    items: {
                    	id : 'maintechnicalindex',
                        xtype: "textfield",
                        fieldLabel: "主要技术指标",
                        anchor: "95%",
						allowBlank : false,
						blankText : '不能为空!'
                    }
				}]
			},{
				layout : 'column',
				border : false,
				items : [{
                    layout: "form",
                    columnWidth : .33,
                    border : false,
                    labelWidth : 105,
                    bodyStyle : 'padding:0,5,0,5;',
                    items: {
                    	id : 'manufacture',
                        xtype: "textfield",
                        fieldLabel: "参考厂商或国别",
                        anchor: "95%",
						allowBlank : false,
						blankText : '不能为空!'
                    }
				},{
                    layout: "form",
                    columnWidth : .33,
                    border : false,
                    labelWidth : 105,
                    bodyStyle : 'padding:0,5,0,5;',
                    items: {
                    	id : 'usedepthead',
                        xtype: "textfield",
                        fieldLabel: "使用部门负责人",
                        anchor: "95%",
						allowBlank : false,
						blankText : '不能为空!'
                    }
				},{
                    layout: "form",
                    columnWidth : .33,
                    border : false,
                    labelWidth : 110,
                    bodyStyle : 'padding:0,5,0,5;',
                    items: {
                    	id : 'nums',
                        xtype: "numberfield",
                        fieldLabel: "台/套",
                        anchor: "95%",
						allowBlank : false,
						allowNegative : false,
						blankText : '不能为空!'
                    }
				}]
			},{
				layout : 'column',
				border : false,
				items : [{
                    layout: "form",
                    columnWidth : .33,
                    border : false,
                    labelWidth : 105,
                    bodyStyle : 'padding:0,5,0,5;',
                    items: {
                    	id : 'replyprice',
                        xtype: "numberfield",
                        fieldLabel: "批复价格(万元)",
                        anchor: "95%",
						allowBlank : false,
						allowNegative : false,
						blankText : '不能为空!'
                    }
				},{
                    layout: "form",
                    columnWidth : .33,
                    border : false,
                    labelWidth : 105,
                    bodyStyle : 'padding:0,5,0,5;',
                    items: {
                    	id : 'replybidding',
                        xtype: "textfield",
                        fieldLabel: "批复招标方式",
                        anchor: "95%",
						allowBlank : false,
						blankText : '不能为空!'
                    }
				},{
                    layout: "form",
                    columnWidth : .33,
                    border : false,
                    labelWidth : 110,
                    bodyStyle : 'padding:0,5,0,5;',
                    items: {
                    	id : 'investigationtime',
                        xtype: "datefield",
                        fieldLabel: "调研/选型完成日期",
                        anchor: "95%",
						allowBlank : false,
						blankText : '不能为空!'
                    }
				}]
			},{
				layout : 'column',
				border : false,
				items : [{
                    layout: "form",
                    columnWidth : .33,
                    border : false,
                    labelWidth : 105,
                    bodyStyle : 'padding:0,5,0,5;',
                    items: {
                    	id : 'biddingtime',
                        xtype: "datefield",
                        fieldLabel: "招标完成日期",
                        anchor: "95%",
						allowBlank : false,
						blankText : '不能为空!'
                    }
				},{
                    layout: "form",
                    columnWidth : .33,
                    border : false,
                    labelWidth : 105,
                    bodyStyle : 'padding:0,5,0,5;',
                    items: {
                    	id : 'contracttime',
                        xtype: "datefield",
                        fieldLabel: "签订合同日期",
                        anchor: "95%",
						allowBlank : false,
						blankText : '不能为空!'
                    }
				},{
                    layout: "form",
                    columnWidth : .33,
                    border : false,
                    labelWidth : 110,
                    bodyStyle : 'padding:0,5,0,5;',
                    items: {
                    	id : 'contractmoney',
                        xtype: "numberfield",
                        fieldLabel: "合同金额(万元)",
                        anchor: "95%",
						allowBlank : false,
						allowNegative : false,
						blankText : '不能为空!'
                    }
				}]
			},{
				layout : 'column',
				border : false,
				items : [{
                    layout: "form",
                    columnWidth : .33,
                    border : false,
                    labelWidth : 105,
                    bodyStyle : 'padding:0,5,0,5;',
                    items: {
                    	id : 'payment',
                        xtype: "numberfield",
                        fieldLabel: "已付款金额(万元)",
                        anchor: "95%",
						allowBlank : false,
						allowNegative : false,
						blankText : '不能为空!'
                    }
				},{
                    layout: "form",
                    columnWidth : .33,
                    border : false,
                    labelWidth : 105,
                    bodyStyle : 'padding:0,5,0,5;',
                    items: {
                    	id : 'settlement',
                        xtype: "numberfield",
                        fieldLabel: "已结算金额(万元)",
                        anchor: "95%",
						allowBlank : false,
						allowNegative : false,
						blankText : '不能为空!'
                    }
				},{
                    layout: "form",
                    columnWidth : .33,
                    border : false,
                    labelWidth : 110,
                    bodyStyle : 'padding:0,5,0,5;',
                    items: {
                    	id : 'annualadvance',
                        xtype: "numberfield",
                        fieldLabel: "本年预计付款金额",
                        anchor: "95%",
						allowBlank : false,
						allowNegative : false,
						blankText : '不能为空!'
                    }
				}]
			},{
				layout : 'column',
				border : false,
				items : [{
                    layout: "form",
                    columnWidth : .33,
                    border : false,
                    labelWidth : 105,
                    bodyStyle : 'padding:0,5,0,5;',
                    items: {
                    	id : 'annualsettlement',
                        xtype: "numberfield",
                        fieldLabel: "本年预计结算金额",
                        anchor: "95%",
						allowBlank : false,
						allowNegative : false,
						blankText : '不能为空!'
                    }
				},{
                    layout: "form",
                    columnWidth : .33,
                    border : false,
                    labelWidth : 105,
                    bodyStyle : 'padding:0,5,0,5;',
                    items: {
                    	id : 'preacceptance',
                        xtype: "textfield",
                        fieldLabel: "预计验收交付",
                        anchor: "95%",
						allowBlank : false,
						blankText : '不能为空!'
                    }
				}]
			},{
				layout : 'column',
				border : false,
				items : [{
                    layout: "form",
                    border : false,
                    labelWidth : 105,
                    columnWidth : .68,
                    bodyStyle : 'padding:0,5,0,5;',
                    items: {
                    	id : 'remark',
                        xtype: "textfield",
                        fieldLabel: "备注",
                        anchor: "95%"
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
					var specialProjectDetailForm = Ext.getCmp('specialProjectDetailForm');
					if (!specialProjectDetailForm.getForm().isValid()) {return false;}
					
					demandPlan320.saveSpecialProjectDetail(id,idd);
					window.close();
			}},{text:' 关闭 ',handler : function(){window.close()}}]
		});
		
		if(isEdit){
			var rec = Ext.getCmp('specialProjectDetailsGrid').store.getById(idd);
			Ext.getCmp('specialProjectDetailForm').getForm().loadRecord(rec);
		}
		window.show();
	},
	
	saveSpecialProject : function(){
		var projectname = Ext.getCmp('projectname').getValue();
		var projectnum = Ext.getCmp('projectnum').getValue();
		var remark = Ext.getCmp('remark').getValue();
		
		var json = {
			projectname : projectname,projectnum : projectnum,remark:remark
		}
		Ext.Ajax.request({
			url : "../JSON/peSummaryRemote.saveSpecialProject",
			params : {
					json : Ext.encode(json)
			},
			success : function(response, opt) {
				var value = response.responseText;
				if (value=="true"){
					Ext.MessageBox.hide();
    				if(Ext.Msg.alert('提示','保存成功!')){
//    					main.tabs.setActiveTab(1);
    					Ext.getCmp('demandPlan320Grid').getStore().reload();
    				}
				}else{
					Ext.Msg.alert("提示","数据异常，请与管理员联系。")
				}
			},
			disableCaching : true,
		    autoAbort : true
		});
	},
	saveSpecialProjectDetail : function(id,idd){
		var equipname = Ext.getCmp('equipname').getValue();
		var technicaldepthead = Ext.getCmp('technicaldepthead').getValue();
		var usedepthead = Ext.getCmp('usedepthead').getValue();
		var maintechnicalindex = Ext.getCmp('maintechnicalindex').getValue();
		var manufacture = Ext.getCmp('manufacture').getValue();
		var nums = Ext.getCmp('nums').getValue();
		var replyprice = Ext.getCmp('replyprice').getValue();
		var replybidding = Ext.getCmp('replybidding').getValue();
		var investigationtime = Ext.getCmp('investigationtime').getValue();
		var biddingtime = Ext.getCmp('biddingtime').getValue();
		var contracttime = Ext.getCmp('contracttime').getValue();
		var contractmoney = Ext.getCmp('contractmoney').getValue();
		var payment = Ext.getCmp('payment').getValue();
		var settlement = Ext.getCmp('settlement').getValue();
		var annualadvance = Ext.getCmp('annualadvance').getValue();
		var annualsettlement = Ext.getCmp('annualsettlement').getValue();
		var preacceptance = Ext.getCmp('preacceptance').getValue();
		var remark = Ext.getCmp('remark').getValue();
		var json = null;
		if(typeof(idd)=="undefined"){//保存
			json = {
			equipname : equipname,technicaldepthead:technicaldepthead,
			usedepthead : usedepthead,maintechnicalindex:maintechnicalindex,
			manufacture : manufacture,nums:nums,replyprice:replyprice,
			replybidding:replybidding,investigationtime:investigationtime,
			biddingtime:biddingtime,contracttime:contracttime,
			contractmoney:contractmoney,payment:payment,
			settlement:settlement,annualadvance:annualadvance,
			annualsettlement:annualsettlement,preacceptance:preacceptance,
			remark:remark}
		}else{//更新
			json = {
				equipname : equipname,technicaldepthead:technicaldepthead,
				usedepthead : usedepthead,maintechnicalindex:maintechnicalindex,
				manufacture : manufacture,nums:nums,replyprice:replyprice,
				replybidding:replybidding,investigationtime:investigationtime,
				biddingtime:biddingtime,contracttime:contracttime,
				contractmoney:contractmoney,payment:payment,
				settlement:settlement,annualadvance:annualadvance,
				annualsettlement:annualsettlement,preacceptance:preacceptance,
				remark:remark,id : idd}
		
		}
		Ext.Ajax.request({
			url : "../JSON/peSummaryRemote.saveSpecialProjectDetail",
			params : {
					json : Ext.encode(json),
					id : id
			},
			success : function(response, opt) {
				var value = response.responseText;
				if (value=="true"){
					Ext.MessageBox.hide();
    				if(Ext.Msg.alert('提示','保存成功!')){
//    					main.tabs.setActiveTab(1);
    					Ext.getCmp('specialProjectDetailsGrid').getStore().reload();
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
		var grid = Ext.getCmp('demandPlan320Grid');
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
		approvePanel.submit("504800", "320专项计划审批", "320专项计划审批", id.substring(0,id.length-1), 
					"SpecialProject", true, demandPlan320.approvePanelSuccess, demandPlan320.approvePanelFailure);
	
	},
	approvePanelSuccess : function(){
		var rows = Ext.getCmp("demandPlan320Grid").getSelectionModel().getSelections();
		for(i=0;i < rows.length;i++){
			rows[i].set('approvalstate','审批中');
		} 
	},
	approvePanelFailure : function(){
		Ext.Msg.alert('提示', '没有送审权限!');
	},
	
	delSpecialProject : function(){
		var grid = Ext.getCmp('demandPlan320Grid');
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
					url : "../JSON/peSummaryRemote.delSpecialProject",
					params : {
							id : id
					},
					success : function(response, opt) {
						var value = response.responseText;
						if (value=="true"){
							Ext.MessageBox.hide();
		    				if(Ext.Msg.alert('提示','删除成功!')){
		//    					main.tabs.setActiveTab(1);
		    					Ext.getCmp('demandPlan320Grid').getStore().reload();
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
	
	delSpecialProjectDetail : function(idd){
		var grid = Ext.getCmp('specialProjectDetailsGrid');
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
					url : "../JSON/peSummaryRemote.delSpecialProjectDetail",
					params : {
							id : id,idd : idd
					},
					success : function(response, opt) {
						var value = response.responseText;
						if (value=="true"){
							Ext.MessageBox.hide();
		    				if(Ext.Msg.alert('提示','删除成功!')){
		//    					main.tabs.setActiveTab(1);
		    					Ext.getCmp('specialProjectDetailsGrid').getStore().reload();
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