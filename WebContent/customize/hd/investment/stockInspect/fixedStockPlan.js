var fixedStockPlan = {

	init : function(){
		
		var panel = new Ext.Panel({
			layout:'border',
			title:'采购计划(*固定资产*)',
			items:[
				fixedStockPlan.selectCondition(),
				fixedStockPlan.getGridPanel()
			],
			listeners:{'beforeshow':function(){
					fixedStockPlan.initChildTab();
				}
			}
		})
		return panel;
	},
	
	selectCondition : function(){
		fixedStockPlan.conditionForm = new Ext.FormPanel({
			labelAlign:'left',
			//默认为收缩状态
			collapsed:true,
			labelWidth : 50,
			//设置为面板允许收缩
			collapsible:true,
			title:'采购计划查询条件',
			region:'north',
			height:120,
			frame:true,
			items:[{
				layout:'column',
				items:[{
					columnWidth:.2,
					layout:'form',
					items:[fixedStockPlan.stockPlanStatus()]
				},{
					columnWidth:.15,
					layout:'form',
					items:[fixedStockPlan.stockPlanMoney()]
				},{
					columnWidth:.2,
					layout:'form',
					items:[{
						xtype:'textfield',
						hideLabel : true,
						id:'fixedInsertMoney',
						name:'fixedInsertMoney',
						style : 'float : left',
						value:0,
						width : 100
					}]
				}]
			}],
			buttons : [{
				text : '查询',
				handler : function() {
					fixedStockPlan.fixedStockPlanSelect();
				}
			}, {
				text:'重置',
				handler : function() {
					fixedStockPlan.stockPlanStatusValue.setValue('');
					fixedStockPlan.selectMoneyValue.setValue('');
					fixedStockPlan.conditionForm.getForm().setValues().insertMoney='';
				}
			}]
		})
		return fixedStockPlan.conditionForm;
	},
	
	getGridPanel : function(){
		var strurl = '../JSON/StockInspectRemote.GetFixedStockPlan?a='+ new Date();
	
		var proxy = new Ext.data.HttpProxy({
					url : strurl,
					method : 'POST'
				});
				
		//数据记录
		var record = new Ext.data.Record.create([
			 {name : 'procurementplan_id'},
		     {name : 'procurementplan_code'},                                   
		     {name : 'procurementplan_name'},
	    	 {name : 'amount'},
	    	 {name : 'plantype'},
	    	 {name : 'editer'},
		     {name : 'senddate',type:'date',dateFormat:'Y-m-d H:i:s.u'},
		     {name : 'status'},
	    	 {name : 'editdate',type:'date',dateFormat:'Y-m-d H:i:s.u'},
	    	 {name : 'userName'},
	    	 {name : 'fundsource'}
	     ]);		
		
		var reader = new Ext.data.JsonReader({
					root : 'results',
					totalProperty : 'totalProperty',
					id : 'taskId'
				},record);
	
		var ds = new Ext.data.Store({
					proxy : proxy,
					reader : reader,
					remoteSort : true
				});
		
		var sm = new Ext.grid.CheckboxSelectionModel();
		
		var cm = new Ext.grid.ColumnModel([
			new Ext.grid.RowNumberer(),
	//		sm,
			{header : '编号',dataIndex : 'procurementplan_code',width : 100,
				renderer:function(value, cellmeta, record, rowIndex, columnIndex,
						store){
					var plantype = record.data.plantype;
					var projectid = record.data.procurementplan_id;
					return "<a href='#' onclick=fixedStockPlan.initChildTab('" + plantype + "','"+projectid+"')>" + 
							"<font color='red'>"+value+"</font></a>";
				}
			},
			{header : '名称',dataIndex : 'procurementplan_name',width : 200,
		    	renderer:function(value,cell){
					cell.attr =  'ext:qtitle="名称 ："'; 
					cell.attr += ' ext:qtip="'+ value + '"'; 
		            return value; 
				}
		    },
		    {header : '金额（元）',dataIndex : 'amount',width : 100},
		    {header : '项目类型',dataIndex : 'fundsource',width : 100},
			{header : '编制人',dataIndex : 'userName',width : 60},
			{header : '送审时间',dataIndex : 'senddate',width : 130,type:'date',
				renderer:Ext.util.Format.dateRenderer('Y年m月d日')
			},
			{header : '审批状态',dataIndex : 'status',width : 80,
				renderer:function(value, cellmeta, record, rowIndex, columnIndex,
						store){
					var name = "";
					if(record.data.plantype==1){
						if(value == 1)
							name =  "<font color='red'>待审批</font>";
						else if(value == 2)
							name =  "审批中";	
						else if(value == 3)
							name =  "<font color='green'>已审批</font>";
					}else{
						if(value == 5){
							name =  "<font color='red'>待审批</font>";
							value = 1;
						}else if(value == 6){
							name =  "审批中";
							value = 2;
						}else if(value == 7){
							name =  "<font color='green'>已审批</font>";
							value = 3;
						}
					}
					return "<a href=javascript:void(0) onclick= flowAction.showPanel('"+record.get('procurementplan_id')+"','"+value+"','"+record.get('plantype')+"')>"+name+"</a>";
				}
			},
			{header : '编辑时间',dataIndex : 'editdate',width : 130,type:'date',
				renderer:Ext.util.Format.dateRenderer('Y年m月d日 ')
			}
		]);
		var grid = new Ext.grid.GridPanel({
			id:'fixedStockPlanGrid',
			store:ds,
			cm:cm,
			sm:sm,
			autoScroll : true,
	//		width : '100%',
	//		height : 285,
			region:'center',
			layout:'fit',
			trackMouseOver : true, // 鼠标放到行上是否有痕迹
			loadMask : {
				msg : '正在装载数据...'
			},
			viewConfig : {
				forceFit : true,
				enableRowBody : true,
				showPreview : true
			},
			bbar : new Ext.PagingToolbar({ // 定义下方工作面板(分页效果)
				pageSize : 5,
				store : ds,
				displayInfo : true,
				beforePageText : '当前第',
				firstText : '首页',
				prevText : '上一页',
				nextText : '下一页',
				lastText : '末页',
				refreshText : '刷新',
				afterPageText : '页，共{0}页',
				displayMsg : '当前行数{0} - {1} 共 {2} 行',
				emptyMsg : "未查询到数据"
			})
		});
		ds.load({
			params:{
				start:0,
				limit:5
			}
		});
		return grid;
	},
	initChildTab : function(plantype,projectid){
		var p1 = null;
		if(plantype == 1){//土建页面
			p1 = fixedStockPlan.getCivilPlan(projectid);
		}else if(plantype == 2){//设备页面
			p1 = fixedStockPlan.getEquipPlan(projectid);
		}else{//页面
			p1 = fixedStockPlan.getSpecialPlan(projectid);
		}
		
		var tab = new Ext.TabPanel({
			id:'fixedStockPlanChildTab',
			autoHeight : true,
			region : 'center',
			items:[p1],
			activeTab:0
		});
		stockInspectDownTab.tab.removeAll();
		stockInspectDownTab.tab.add(tab);
		stockInspectDownTab.tab.doLayout();
	},
	
	stockPlanStatus : function(){
		var data = [
			['1','待审批'],
			['2','审批中'],
			['3','已审批']
		]
		var fields = ['typeNum','typeName']
		
		var store = new Ext.data.SimpleStore({
			autoLoad:true,
			data:data,
			fields:fields
		})
		fixedStockPlan.stockPlanStatusValue = new Ext.form.ComboBox({
			id:'fixedStockPlanStatusComboBox',
			fieldLabel:'状态',
			store:store,
			valueField : "typeNum",
			displayField : "typeName",
			mode:'local',
			forceSelection : true,
			triggerAction : 'all',
			emptyText : '请选择...',
			width:100
		})
		
		return fixedStockPlan.stockPlanStatusValue;
	},
	
	stockPlanMoney : function(){
		var data = [
			['1','大于'],
			['2','等于'],
			['3','小于']
		];
		var fields = ['typeNum','typeName'];
		
		var store = new Ext.data.SimpleStore({
			autoLoad:true,
			data:data,
			fields:fields
		});
		fixedStockPlan.selectMoneyValue = new Ext.form.ComboBox({
			id:'fixedStockPlanMoneyComboBox',
			fieldLabel:'金额',
			store:store,
			valueField : "typeNum",
			displayField : "typeName",
			mode:'local',
			forceSelection : true,
			triggerAction : 'all',
			emptyText : '请选择...',
			width:100
		});
		return fixedStockPlan.selectMoneyValue;
	},
	getEquipPlan : function(id){
		
		var store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						url : '../JSON/pePlanRemote.getEquipRegistPlanList?d='+new Date(),
						method : 'post'
					}),
			reader : new Ext.data.JsonReader({
						root : 'results',
						id : 'id',
						totalProperty : 'totalProperty'
					}, ['projectname','referencemodel','mainparam','nums',
					'numsunit','marketprice','schedule','deliverytime',
					'installsite','installcondition','mainuse',
					'demandreason','categorys','approvalstate',
					'createtime','remarke','uploadfile','id',
					'projectnum','costnum','investmentplan','fundsource',
					'totalinvestmentplan','annualbudget','fileid']),
			baseParams : {
				id : id
			}
		});
		
		if(id != null){
			store.load();
		}
		
		var cm = new Ext.grid.ColumnModel([
			{header : "项目编号",dataIndex : 'projectnum',sortable : true,width : 120},
			{header : "费用编号",dataIndex : 'costnum',sortable : true,width : 120}, 
			{header : '资金来源',dataIndex : 'fundsource',sortable : true,width : 130},
			{header : '项目名称',dataIndex : 'projectname',sortable : true,width : 120},
			{header : '状态',dataIndex : 'approvalstate',sortable : true,width : 120,
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
			},
			{header : '参考型号',dataIndex : 'referencemodel',sortable : true,width : 120},
			{header : '主要性能参数及配置',dataIndex : 'mainparam',sortable : true,width : 120},
			{header : '数量',dataIndex : 'nums',sortable : true,width : 120},
			{header : '单位',dataIndex : 'numsunit',sortable : true,width : 120},
			{header : "投资计划",dataIndex : 'investmentplan',sortable : true,width : 120},
			{header : "累计完成投资",dataIndex : 'totalinvestmentplan',sortable : true,width : 120},
			{header : "本年预算",dataIndex : 'annualbudget',sortable : true,width : 120},
			{header : '进度要求',dataIndex : 'schedule',sortable : true,width : 120},
			{header : "交付时间",dataIndex : 'deliverytime',sortable : true,width : 120},
			{header : '安装地点',dataIndex : 'installsite',sortable : true,width : 120},
			{header : '安装条件',dataIndex : 'installcondition',sortable : true,width : 120},
			{header : '主要用途',dataIndex : 'mainuse',sortable : true,width : 120},
			{header : '需求原因',dataIndex : 'demandreason',sortable : true,width : 120 ,
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
			},
			{header : '类别',dataIndex : 'categorys',sortable : true,width : 120},
			{header : '审批记录',dataIndex : 'remark',sortable : true,width : 120,
				renderer : function(value, cellmeta, record, rowIndex) {
					var id = record.get('id');
					if (record.get('approvalstate') == "已审批") {
						return "<a href='javascript:void(0);' onclick = approvalInfoList.showWin('" + id + "')><font color=blue>查看</font></a>";
					}
				} 
			}
			
			
		]);
		var grid = new Ext.grid.GridPanel({
			width : 300,
			id : 'equipPurchasePlanGrid',
			cm : cm,
			columnLines : true,
			stripeRows : true,
			region : 'center',
			store : store,
			loadMask : {
		    	 msg : '正在加载数据，请稍侯……'
		    }
		});
		var panel = new Ext.Panel({
			height : 255,
			layout : 'fit',
			border : true,
			autoScroll : true,
			title : '设备采购计划',
			items : grid
		});
		return panel;
	},
	
	getCivilPlan : function(id){
		var store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						url : '../JSON/pePlanRemote.getCivilRegistPlanList?d='+new Date(),
						method : 'post'
					}),
			reader : new Ext.data.JsonReader({
						root : 'results',
						id : 'id',
						totalProperty : 'totalProperty'
					}, ['projectname','constructiontype','nums','numsunit','investmentbudget',
					'financeunit','constructionsite','deliverytime','useunit','mainuse',
					'demandreason','remarke','approvalstate','id','createtime',
					'schedule','budgetnum','fundsource','annualinvestmentplan',
					'projectnum','costnum','totalinvestmentplan','annualbudget',
					'fileid','uploadfile']),
			baseParams : {
				id : id
			}
		});
		
		if(id != null){
			store.load();
		}
		
		var cm = new Ext.grid.ColumnModel([ 
			 {header : "项目编号",dataIndex : 'projectnum',sortable : true,width : 120},
			 {header : "费用编号",dataIndex : 'costnum',sortable : true,width : 120}, 
			 {header : '资金来源',dataIndex : 'fundsource',sortable : true,width : 130},
			 {header : '项目名称', dataIndex : 'projectname',sortable : true, width : 120},
			 {header : '状态',dataIndex : 'approvalstate',sortable : true,width : 120  ,
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
			},
			{header : '建设性质',dataIndex : 'constructiontype',sortable : true,width : 120},
			{header : '数量',dataIndex : 'nums',sortable : true,width : 120},
			{header : '单位',dataIndex : 'numsunit',sortable : true,width : 120},
			{header : '投资概算',dataIndex : 'investmentbudget',sortable : true,width : 120},
			{header : '单位',dataIndex : 'financeunit',sortable : true,width : 120},
			{header : "累计完成投资",dataIndex : 'totalinvestmentplan',sortable : true,width : 120},
			{header : "本年预算",dataIndex : 'annualbudget',sortable : true,width : 120},
			{header : '选址或施工地点',dataIndex : 'constructionsite',sortable : true,width : 120},
			{header : '进度要求',dataIndex : 'schedule',sortable : true,width : 120},
			{header : '交付时间',dataIndex : 'deliverytime',sortable : true,width : 120},
			{header : '使用单位',dataIndex : 'useunit',sortable : true,width : 120},
			{header : '主要用途',dataIndex : 'mainuse',sortable : true,width : 120},
			{header : '需求原因',dataIndex : 'demandreason',sortable : true,width : 120},
			{header : '时间',dataIndex : 'createtime',sortable : true,width : 120},
			{header : '审批记录',dataIndex : 'remark',sortable : true,width : 120,
				renderer : function(value, cellmeta, record, rowIndex) {
					var id = record.get('id');
					if (record.get('approvalstate') == "已审批") {
						return "<a href='javascript:void(0);' onclick = approvalInfoList.showWin('" + id + "')><font color=blue>查看</font></a>";
					}
				} 
			}
		]);
		var grid = new Ext.grid.GridPanel({
			width : 300,
			id : 'civilPurchasePlanGrid',
			cm : cm, 
			columnLines : true,
			stripeRows : true,
			region : 'center',
			store : store,
			loadMask : {
		    	 msg : '正在加载数据，请稍侯……'
		    }
		});
		var panel = new Ext.Panel({
			height : 255,
			layout : 'fit',
			border : true,
			autoScroll : true,
			title : '土建采购计划',
			items : grid
		});
		return panel;
	},
	
	getSpecialPlan : function(id){
		
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
					'remark','id']),
			baseParams : {id : id,start : 0,limit : 5}
		}); 
		if(id != null){
			store.load();
		}
		//分页工具栏   
		var paging = new Ext.PagingToolbar({
			store : store,
			pageSize : 20,
			displayInfo : true,
			displayMsg : '第 {0} 到 {1} 条，一共  {2} 条',
			emptyMsg : '没有记录'
		}); 
		var cm = new Ext.grid.ColumnModel([
            {header : '设备名称',dataIndex : 'equipname',sortable : true,width : 120}, 
            {header : '技改部负责人',dataIndex : 'technicaldepthead',sortable : true,width : 130},
            {header : '主要技术指标',dataIndex : 'maintechnicalindex',sortable : true,width : 120},
            {header : '参考厂商或国别',dataIndex : 'manufacture',sortable : true,width : 120 },
            {header : '使用部门负责人',dataIndex : 'usedepthead',sortable : true,width : 120 },
            {header : '台/套',dataIndex : 'nums',sortable : true,width : 120},
            {header : '批复价格(万元)',dataIndex : 'replyprice',sortable : true,width : 120},
            {header : '批复招标方式',dataIndex : 'replybidding',sortable : true,width : 120},
            {header : '调研/选型完成日期',dataIndex : 'investigationtime',sortable : true,width : 120,
            	renderer : Ext.util.Format.dateRenderer('Y-m-d')},
            {header : '招标完成日期',dataIndex : 'biddingtime',sortable : true,width : 120,
            	renderer : Ext.util.Format.dateRenderer('Y-m-d') },
            {header : '签订合同日期',dataIndex : 'contracttime',sortable : true,width : 120,
            	renderer : Ext.util.Format.dateRenderer('Y-m-d') },
            {header : '合同金额(万元)',dataIndex : 'contractmoney',sortable : true,width : 120},
            {header : '已付款金额(万元)',dataIndex : 'payment',sortable : true,width : 120},
            {header : '已结算金额(万元)',dataIndex : 'settlement',sortable : true,width : 120},
            {header : '本年预计付款金额',dataIndex : 'annualadvance',sortable : true,width : 120},
            {header : '本年预计结算金额',dataIndex : 'annualsettlement',sortable : true,width : 120},
            {header : '预计验收交付',dataIndex : 'preacceptance',sortable : true,width : 120},
            {header : '创建时间',dataIndex : 'createtime',sortable : true,width : 120,
            	renderer : Ext.util.Format.dateRenderer('Y-m-d') },
            {header : '备注',dataIndex : 'remark',sortable : true,width : 120 }
		]);
		var grid = new Ext.grid.GridPanel({
			width : 100,
			id : 'demandPlan320Grid',
			cm : cm,
			bbar : paging,
			columnLines : true,
			stripeRows : true,
			region : 'center',
			store : store,
			loadMask : {
		    	 msg : '正在加载数据，请稍侯……'
		    }
		});
		var panel = new Ext.Panel({
			height : 255,
			layout : 'fit',
			border : true,
			autoScroll : true,
			title : '专项采购计划',
			items : grid
		});
		return panel;
	},
	fixedStockPlanSelect : function(){
		
		var status = fixedStockPlan.stockPlanStatusValue.getValue();
		var judgment = fixedStockPlan.selectMoneyValue.getValue();
		var amount = Ext.getCmp('fixedInsertMoney').getValue();
		Ext.getCmp('fixedStockPlanGrid').store.load({
			params:{
				status : status,
				judgment : judgment,
				amount : amount,
				start:0,
				limit:5
			}
		});
	}
}