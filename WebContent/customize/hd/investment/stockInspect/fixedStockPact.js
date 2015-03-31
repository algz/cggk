var fixedStockPact = {

	init : function(){
		
		var panel = new Ext.Panel({
			layout:'border',
			title:'采购执行(*固定资产*)',
			items:[
				fixedStockPact.selectCondition(),
				fixedStockPact.getGridPanel()
			],
			listeners:{'beforeshow':function(){
					fixedStockPact.initChildTab();
				}
			}
		})
		return panel;
	},
	
	selectCondition : function(){
		fixedStockPact.conditionForm = new Ext.FormPanel({
			labelAlign:'left',
			//默认为收缩状态
			collapsed:true,
			//设置为面板允许收缩
			collapsible:true,
			region:'north',
			title:'采购合同查询条件',
			height:100,
			frame:true,
			items:[
			{
				layout:'column',
				items:[
				{
					columnWidth:.95,
					layout:'column',
					items:[
					{
						columnWidth:.33,
						layout:'form',
						items:[{
							xtype:'textfield',
							fieldLabel:'项目名称',
							id:'fixedProjectName',
							name:'fixedProjectName',
							anchor : '95%'
						}]
					},{
						columnWidth:.33,
						layout:'form',
						items:[{
							xtype:'textfield',
							fieldLabel:'项目编号',
							id:'fixedProjectNum',
							name:'fixedProjectNum',
							anchor : '95%'
						}]
					}
					]
				}
				]
			}],
			buttons : [{
							text : '查询',
							handler : function() {
								fixedStockPact.fixedStockPactSelect();
							}
	
						}, {
							text:'重置',
							handler : function() {
								Ext.getCmp('stockPactNum').setValue('');
								Ext.getCmp('stockPactNmae').setValue('');
								Ext.getCmp('stockPactSupplier').setValue('');
							}
						}]
		})
		return fixedStockPact.conditionForm;
	},
	
	getGridPanel : function(){
		var strurl = '../JSON/StockContractRemote.GetFixedStockContract?a='+ new Date();
	
		var proxy = new Ext.data.HttpProxy({
					url : strurl,
					method : 'POST'
				});
				
		//数据记录
		var record = new Ext.data.Record.create([
			 {name : 'projectid'},
			 {name : 'projectnum'},  
		     {name : 'projectname'},                                   
		     {name : 'payedamount'},
	    	 {name : 'contract_amount'},
	    	 {name : 'contractnum'},
	    	 {name : 'plantype'},
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
		
		var cm = new Ext.grid.ColumnModel([
			new Ext.grid.RowNumberer(),
	//		sm,
			{
				header : '项目编号',
				dataIndex : 'projectnum',
				width : 100,
				renderer:function(value, cell, record, rowIndex, columnIndex,
						store){
					var plantype = record.data.plantype;
					var projectid = record.data.projectid;
					return "<a href='#' style='TEXT-DECORATION:none' " +
							"onclick = fixedStockPact.initChildTab('" + plantype + "','"+projectid+"')>" + 
							"<font color='red'>"+value+"</font></a>";
				}
			},{
		    	header : '项目名称',
		    	dataIndex : 'projectname',
		    	renderer:function(value,cell){
					cell.attr =  'ext:qtitle="名称 ："'; 
					cell.attr += ' ext:qtip="'+ value + '"'; 
		            return value; 
				},
		    	width : 100
			},{
				header : '已支付金额',
				dataIndex : 'payedamount',
				width : 100
			},{
				header : '合同总金额',
				dataIndex : 'contract_amount',
				width : 60
			},{
				header : '金额单位',
				dataIndex : 'fundunit',
				width : 60,
				renderer:function(value,cell){
		            return "万元"; 
				}
			},{
				header : '合同数量',
				dataIndex : 'contractnum',
				width : 60
			},{
				header : '项目类别',
				dataIndex : 'plantype',
				width : 80,
				renderer:function(value, cellmeta, record, rowIndex, columnIndex,store){
					if(value == '1'){
						return record.data.fundsource + "设备";
					}else if(value == '2'){
						return  record.data.fundsource + "土建";					
					}
				}
			
			}
		]);
		var grid = new Ext.grid.GridPanel({
			id:'fixedStockPactPanelGrid',
			store:ds,
			cm:cm,
			autoScroll : true,
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
		var items = null;
		if(plantype == 2){
			
			stockInspectDownTab.tab.removeAll();
//			土建相关页面
			var p1 = fixedStockPact.getCivilImplementplan(projectid);
			var p2 = fixedStockPact.getCivilDoManage(projectid);
			items = [p1,p2];
		}else{
			stockInspectDownTab.tab.removeAll();
//			设备相关页面
			p1 = fixedStockPact.getImplementplan(projectid);
			p2 = fixedStockPact.getDoManage(projectid);
			p3 = fixedStockPact.getAcceptTask(projectid);
			items = [p1,p2,p3];
		}

		
		var tab = new Ext.TabPanel({
			id:'fixedStockPactChildTab',
			autoHeight : true,
			region : 'center',
			items:items,
			activeTab:0
		});
		stockInspectDownTab.tab.add(tab);
		stockInspectDownTab.tab.doLayout();
	},
	
//	获取实施计划页面
	getImplementplan : function(id){
		
		var store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						url : '../JSON/deviceImplementPlanRemote.getImplementPlanById?d=' + new Date(),
						method : 'post'
					}),
			reader : new Ext.data.JsonReader({
						root : 'results',
						totalProperty : 'totalProperty',
						id : 'implementplanid'
					}, ['implementplanid', 'categorys', {
								name : 'submitdate',
								type : 'date',
								dateFormat : 'Y-m-d'
							}, {
								name : 'completiondate',
								type : 'date',
								dateFormat : 'Y-m-d'
							}, {
								name : 'confirmdate',
								type : 'date',
								dateFormat : 'Y-m-d'
							}, {
								name : 'calibrationdate',
								type : 'date',
								dateFormat : 'Y-m-d'
							}, {
								name : 'agreementSigningdate',
								type : 'date',
								dateFormat : 'Y-m-d'
							}, {
								name : 'contractSigningdate',
								type : 'date',
								dateFormat : 'Y-m-d'
							}, {
								name : 'planningdate',
								type : 'date',
								dateFormat : 'Y-m-d'
							}, 'plansremarks', 'status', 'remark', 'equipregistId', 'projectnum', 'nums', 'numsunit', 'projectname', 'projectmanagerid',
							'projectmanagername']),
			pruneModifiedRecords : true,
			baseParams : {
				pid : id
			}
		});
		if(id != null){
			store.load();
		}
		var cm = new Ext.grid.ColumnModel([
			{header : '项目编号',dataIndex : 'projectnum',width : 100,sortable : true},  
			{header : '分类',dataIndex : 'categorys',width : 100,sortable : true}, 
			{header : '项目名称',dataIndex : 'projectname',width : 100,sortable : true}, 
			{header : '状态',dataIndex : 'status',width : 100,sortable : true},
			{header : '单位',dataIndex : 'numsunit',width : 100,sortable : true}, 
			{header : '数量',dataIndex : 'nums',width : 100,sortable : true}, 
			{header : '项目主管',dataIndex : 'projectmanagername',width : 100,sortable : true}, 
			{header : '卡片和论证书提交时间(使用单位)',dataIndex : 'submitdate',width : 200,sortable : true,
				renderer : Ext.util.Format.dateRenderer("Y-m-d")
			}, 
			{header : '可行性论证完成时间',dataIndex : 'completiondate',width : 130,sortable : true,
				renderer : Ext.util.Format.dateRenderer("Y-m-d")
			}, 
			{header : '技术指标确定时间(技术改造部)',dataIndex : 'confirmdate',width : 180,sortable : true,
				renderer : Ext.util.Format.dateRenderer("Y-m-d")
			}, 
			{header : '完成招标和定标时间(技术改造部)',dataIndex : 'calibrationdate',width : 200,sortable : true,
				renderer : Ext.util.Format.dateRenderer("Y-m-d")
			}, 
			{header : '技术协议签订时间(使用单位)',dataIndex : 'agreementSigningdate',width : 170,sortable : true,
				renderer : Ext.util.Format.dateRenderer("Y-m-d")
			}, 
			{header : '合同签订时间(签订合同单位)',dataIndex : 'contractSigningdate',width : 170,sortable : true,
				renderer : Ext.util.Format.dateRenderer("Y-m-d")
			}, 
			{header : '实施计划说明',dataIndex : 'plansremarks',width : 160}, 
			{header : '计划编制时间',dataIndex : 'planningdate',width : 100,sortable : true,
				renderer : Ext.util.Format.dateRenderer("Y-m-d")
			}, 
			{header : '备注<span style="color:red;">*</span>',dataIndex : 'remark',width : 100,sortable : true}
		]);
		
		var grid = new Ext.grid.GridPanel({
			cm : cm,
//			columnLines : true,
			border : false,
			layout :'fit',
			region : 'center',
			autoScroll : true,
//			stripeRows : true,
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
			title : '实施计划',
			items : grid
		});
		return panel;
	},
//	获取执行管理页面
	getDoManage : function(id){
		var store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						url : '../JSON/deviceManageRemote.getDeviceManageById?d=' + new Date(),
						method : 'post'
					}),
			reader : new Ext.data.JsonReader({
						root : 'results',
						totalProperty : 'totalProperty',
						id : 'implementplanid'
					}, ['implementplanid', 'equipregistId', 'fundunit', 'projectnum', 'projectname', 'remark', 'budgetnum', 'projectmanagerid', 'status', 'nums',
							'numsunit', 'managecontent']),
			baseParams : {
				pid:id
			}
		});
		if(id != null){
			store.load();
		}
		var cm = new Ext.grid.ColumnModel([
			{header : '项目编号',dataIndex : 'projectnum',width : 100,sortable : true}, 
			{header : '项目名称',dataIndex : 'projectname',width : 100,sortable : true}, 
			{header : '状态',dataIndex : 'status',width : 100,sortable : true,
				renderer : function(value) {
					if (value == 3) {
						return '<span style="color:red;">待编制</span>';
					} else if (value == 4 || value == 5 || value == 6) {
						return '<span style="color:red;">编制中</span>';
					} else if (value == 8) {
						return '已下发';
					} else {
						return value;
					}
				}
			}, 
			{header : '数量',dataIndex : 'nums',width : 100,sortable : true}, 
			{header : '数量单位',dataIndex : 'numsunit',width : 100,sortable : true}, 
			{header : '概算投资',dataIndex : 'budgetnum',width : 100,sortable : true}, 
			{header : '单位',dataIndex : 'fundunit',width : 100,sortable : true}, 
			{header : '执行管理',dataIndex : 'managecontent',width : 700,sortable : true}, 
			{header : '备注',dataIndex : 'remark',width : 100,sortable : true}
		]);
		var grid = new Ext.grid.GridPanel({
			cm : cm,
//			columnLines : true,
			border : false,
			layout :'fit',
			region : 'center',
			autoScroll : true,
//			stripeRows : true,
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
			title : '执行管理',
			items : grid
		});
		return panel;
	},
//	验收任务管理页面
	getAcceptTask : function(id){
		var store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						url : '../JSON/AcceptTaskRemote.getAcceptTaskById?a='+ new Date(),
						method : 'post'
					}),
			reader : new Ext.data.JsonReader({
						root : 'results',
						totalProperty : 'totalProperty',
						id : 'implementplanid'
					}, [{name : 'acceptId'},
					     {name : 'acceptNum'},                                   
					     {name : 'contractId'},
				    	 {name : 'acceptType'},
				    	 {name : 'acceptState'},
					     {name : 'acceptTime',type:'date',dateFormat:'Y-m-d H:i:s.u'},
					     {name : 'acceptNote'}]),
			baseParams : {
				pid:id
			}
		});
		if(id != null){
			store.load();
		}
		var cm = new Ext.grid.ColumnModel({
			columns:[
				{header : '项目编号',dataIndex : 'acceptNum',width : 100},
				{header : '项目类别',dataIndex : 'acceptType',width : 100,
					renderer:function(value){
						var result;
						if(value=='1')
							result='设备'
						else if(value=='2')
							result='工程'
						return result;								
					}
				},
				{header : '<div align="center">验收</div>',width : 400,
					renderer:function(value, cellmeta, record, rowIndex, columnIndex,store){
						var result='';
						if(record.get('acceptType')=='1'){
							if(record.get('acceptState')<9){
								result = '<div align="center">'
								if(record.get('acceptState')==1)
									result = result + '<font color="green">预验收</font>'
								else if(1<record.get('acceptState'))
									result = result + '<font color="blue">预验收</font>'
								else if(1>record.get('acceptState'))
									result = result + '<font color="red">预验收</font>'
								result = result +'<font color="blue">==></font>'
								if(record.get('acceptState')==2)
									result = result +'<font color="green">安装准备</font>'
								else if(2<record.get('acceptState'))
									result = result +'<font color="blue">安装准备</font>'
								else if(2>record.get('acceptState'))
									result = result + '<font color="red">安装准备</font>'
								result = result +'<font color="blue">==></font>'
								if(record.get('acceptState')==3)
									result = result +'<font color="green">开箱验收</font>'
								else if(3<record.get('acceptState'))
									result = result +'<font color="blue">开箱验收</font>'
								else if(3>record.get('acceptState'))
									result = result + '<font color="red">开箱验收</font>'
								result = result +'<font color="blue">==></font>'
								if(record.get('acceptState')==4||record.get('acceptState')==5)
									result = result +'<font color="green">验收过程</font>'
								else if(4<record.get('acceptState'))
									result = result +'<font color="blue">验收过程</font>'
								else if(5>record.get('acceptState'))
									result = result + '<font color="red">验收过程</font>'
								result = result +'<font color="blue">==></font>'
								if(record.get('acceptState')==6)
									result = result +'<font color="green">最终验收</font>'
								else if(6<record.get('acceptState'))
									result = result +'<font color="blue">最终验收</font>'
								else if(6>record.get('acceptState'))
									result = result + '<font color="red">最终验收</font>'
								result = result +'<font color="blue">==></font>'
								if(record.get('acceptState')==7||record.get('acceptState')==8)
									result = result +'<font color="green">资产交接</font>'
								else if(7<record.get('acceptState'))
									result = result +'<font color="blue">资产交接</font>'
								else if(8>record.get('acceptState'))
									result = result + '<font color="red">资产交接</font>'
								result = result +'</div>';
							}else{
								result = '<div align="center">'
									+'<font color="blue">预验收</font>'
									+'<font color="blue">==></font>'
									+'<font color="blue">安装准备</font>'
									+'<font color="blue">==></font>'
									+'<font color="blue">开箱验收</font>'
									+'<font color="blue">==></font>'
									+'<font color="blue">验收过程</font>'
									+'<font color="blue">==></font>'
									+'<font color="blue">最终验收</font>'
									+'<font color="blue">==></font>'
									+'<font color="blue">资产交接</font>'
									+'</div>';
							}
						}else if(record.get('acceptType')=='2'){
							if(record.get('acceptState')<9){
								result = '<div align="center">'
									+'<font color="green">资产交接</font>'
									+'</div>';
							}else{
								result = '<div align="center">'
									+'<font color="blue">资产交接</font>'
									+'</div>';
							}		+'</div>';
						}
						return result;
					}
				},
				{header : '状态',dataIndex : 'acceptState',width : 100,
					renderer:function(value, cellmeta, record, rowIndex, columnIndex,store){
						var result;
						if(record.get('acceptType')=='1'){
							if(value=='1')
								result='预验收'
							else if(value=='2')
								result='安装准备'
							else if(value=='3')
								result='开箱验收'
							else if(value=='4')
								result='验收过程'
							else if(value=='5')
								result='验收过程【送审】'
							else if(value=='6')
								result='最终验收'
							else if(value=='7')
								result='资产交接'
							else if(value=='8')
								result='资产交接【送审】'
							else if(value=='9')
								result='完成'
						}else if(record.get('acceptType')=='2'){
							if(value=='7')
								result='资产交接'
							else if(value=='8')
								result='资产交接【送审】'
							else if(value=='9')
								result='完成'
						}
						return result;		
					}
				},
				{header : '生成日期',dataIndex : 'acceptTime',width : 100,
					renderer:Ext.util.Format.dateRenderer('Y年m月d日')
				},
				{header : '进度',dataIndex : 'acceptNote',width : 100,
					renderer:function(value, cellmeta, record, rowIndex, columnIndex,store){
						return '<a href="javascript:void(0)" onclick="acceptTaskGantt.chart(\''+record.get('acceptId')+'\')")>进度视图</a>';
					}
				},
				{header : '备注',dataIndex : 'acceptNote',width : 100}
			]
		});
		var grid = new Ext.grid.GridPanel({
			cm : cm,
//			columnLines : true,
			border : false,
			layout :'fit',
			region : 'center',
			autoScroll : true,
//			stripeRows : true,
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
			title : '验收任务管理',
			items : grid
		});
		return panel;
	},
//	获取土建实施计划
	getCivilImplementplan : function(id){
		var store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
				url : '../JSON/engineeringProject_EngineeringProjectImplementPlanRemote.getImplementPlanById?d='+ new Date(),
				method : 'post'
			}),
			reader : new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, 
			[  'id','civilRegistId','projectCode','projectName','nums','numsunit',
				'projectManagerid','projectManagerName','useunit','status','remarke',
				{name : 'planFileArrivalTime',type : 'date',dateFormat : 'Y-m-d'},
				'planFileArrivalDutyPerson',
				{name : 'planLocationFinishTime',type : 'date',dateFormat : 'Y-m-d'},
				'planLocationFinishDutyPerson',
				{name : 'buildingPlanFinishTime',type : 'date',dateFormat : 'Y-m-d'},
				'buildingPlanFinishDutyPerson',
				{name : 'licenseFinishTime',type : 'date',dateFormat : 'Y-m-d'},
				'licenseFinishDutyPerson',
				{name : 'constructionDesignFinishTime',type : 'date',dateFormat : 'Y-m-d'},
				'constructionDesignDutyPerson',
				{name : 'approvalTime',type : 'date',dateFormat : 'Y-m-d'},
				'approvalDutyPerson',
				{name : 'tenderTime',type : 'date',dateFormat : 'Y-m-d'},
				'tenderDutyPerson',
				{name : 'contractSignedTime',type : 'date',dateFormat : 'Y-m-d'},
				'contractSignedDutyPerson',
				{name : 'startWorkTime',type : 'date',dateFormat : 'Y-m-d'},
				'startWorkPerson',
				{name : 'mainAcceptanceTime',type : 'date',dateFormat : 'Y-m-d'},
				'mainAcceptanceDutyPerson',
				{name : 'deliverTime',type : 'date',dateFormat : 'Y-m-d'},
				'deliverDutyPerson',
				{name : 'lastupdateTime',type : 'date',dateFormat : 'Y-m-d'},
				'projectCode','projectName','nums','numsunit','projectManagerid','projectManagerName',
				'useunit','createtime' ,'lastupdateTime','status','remarke'
			]),
			pruneModifiedRecords : true,
			baseParams : {
				pid:id
			}
		});
		
		if(id != null){
			store.load();
		}
		
		var continentGroupRow = new Ext.ux.grid.ColumnHeaderGroup({
	    	// 注:数组元素也为数组类型
			//多表头
			rows : [[{header : '',colspan : 7,align : 'center'}, 
				{header : '规划文件下达',colspan : 2,align : 'center'},
				{header : '规划方案及选址工作完成',colspan : 2,align : 'center'},
				{header : '初步建设方案完成',colspan : 2,align : 'center'},
				{header : '规划许可证办理完成',colspan : 2,align : 'center'},
				{header : '施工设计完工',colspan : 2,align : 'center'},
				{header : '招标控制价编制和审批',colspan : 2,align : 'center'},
				{header : '施工总包招标定标工作完成',colspan : 2,align : 'center'},
				{header : '合同签订',colspan : 2,align : 'center'},
				{header : '开工',colspan : 2,align : 'center'},
				{header : '主体验收',colspan : 2,align : 'center'},
				{header : '交付',colspan : 2,align : 'center'},
				{header : '',colspan : 2,align : 'center'}]]
		});
		var cm = new Ext.grid.ColumnModel([ 
			{header : '项目编号',dataIndex : 'projectCode',width : 100,sortable : true}, 
			{header : '项目名称',dataIndex : 'projectName',width : 100,sortable : true},
			{header : '状态',dataIndex : 'status',width : 100,sortable : true,
				renderer : function(value, cellmeta, record, rowIndex) {
					var status = record.get('status');
					if (status == '编制中') {
						return '<font color="red">编制中</font>';
					} else if (status == '审批中') {
						return '审批中';
					} else if (status == '已审批') {
						return '<font color="green">已审批</font>';
					} else if (status == '已下发'){
						return '<font color="green">已下发</font>';
					} else{
						return value;
					}
				}
			}, 
			{header : '数量',dataIndex : 'nums',width : 100,sortable : true},
			{header : '数量单位',dataIndex : 'numsunit',width : 100,sortable : true},
			{header : '项目主管',dataIndex : 'projectManagerName',width : 150,sortable : true}, 
			{header : '使用单位',dataIndex : 'useunit',width : 100,sortable : true}, 
			{header : '日期',dataIndex : 'planFileArrivalTime',width : 100,sortable : true,
				renderer:function(value){
					if(value instanceof Date){ 
						return new Date(value).format("Y-m-d"); 
					}else{ 
						return value; 
					}
				}
			}, 
			{header : '责任人',dataIndex : 'planFileArrivalDutyPerson',width : 200,sortable : true}, 
			{header : '日期',dataIndex : 'planLocationFinishTime',width : 100,sortable : true,
				renderer : Ext.util.Format.dateRenderer("Y-m-d")
			}, 
			{header : '责任人',dataIndex : 'planLocationFinishDutyPerson',width : 200,sortable : true}, 
			{header : '日期',dataIndex : 'buildingPlanFinishTime',width : 100,sortable : true,
				renderer : Ext.util.Format.dateRenderer("Y-m-d")
			}, 
			{header : '责任人',dataIndex : 'buildingPlanFinishDutyPerson',width : 200,sortable : true}, 
			{header : '日期',dataIndex : 'licenseFinishTime',width : 100,sortable : true,
				renderer : Ext.util.Format.dateRenderer("Y-m-d")
			}, 
			{header : '责任人',dataIndex : 'licenseFinishDutyPerson',width : 200,sortable : true}, 
			{header : '日期',dataIndex : 'constructionDesignFinishTime',width : 100,sortable : true,
				renderer : Ext.util.Format.dateRenderer("Y-m-d")
			}, 
			{header : '责任人',dataIndex : 'constructionDesignDutyPerson',width : 200,sortable : true}, 
			{header : '日期',dataIndex : 'approvalTime',width : 100,sortable : true,
				renderer : Ext.util.Format.dateRenderer("Y-m-d")
			}, 
			{header : '责任人',dataIndex : 'approvalDutyPerson',width : 200,sortable : true}, 
			{header : '日期',dataIndex : 'tenderTime',width : 100,sortable : true,
				renderer : Ext.util.Format.dateRenderer("Y-m-d")
			}, 
			{header : '责任人',dataIndex : 'tenderDutyPerson',width : 200,sortable : true}, 
			{header : '日期',dataIndex : 'contractSignedTime',width : 100,sortable : true,
				renderer : Ext.util.Format.dateRenderer("Y-m-d")
			}, 
			{header : '责任人',dataIndex : 'contractSignedDutyPerson',width : 200,sortable : true}, 
			{header : '日期',dataIndex : 'startWorkTime',width : 100,sortable : true,
				renderer : Ext.util.Format.dateRenderer("Y-m-d")
			}, 
			{header : '责任人',dataIndex : 'startWorkPerson',width : 200,sortable : true}, 
			{header : '日期',dataIndex : 'mainAcceptanceTime',width : 100,sortable : true,
				renderer : Ext.util.Format.dateRenderer("Y-m-d")
			}, {header : '责任人',dataIndex : 'mainAcceptanceDutyPerson',width : 200,sortable : true}, 
			{header : '日期',dataIndex : 'deliverTime',width : 100,sortable : true,
				renderer : Ext.util.Format.dateRenderer("Y-m-d")
			}, 
			{header : '责任人',dataIndex : 'deliverDutyPerson',width : 200,sortable : true}, 
			{header : '计划创建时间',dataIndex : 'lastupdateTime',width : 150,sortable : true},
			{header : '备注',dataIndex : 'remarke',width : 100,sortable : true}
		]);
		
		var grid = new Ext.grid.GridPanel({
			cm : cm,
//			columnLines : true,
			plugins : continentGroupRow,
			border : false,
			layout :'fit',
			region : 'center',
			autoScroll : true,
//			stripeRows : true,
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
			title : '实施计划',
			items : grid
		});
		return panel;
	},
//	获取土建执行管理
	getCivilDoManage : function(id){
		
		var store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
				url : '../JSON/engineeringProject_EngineeringProjectExecutiveManagementRemote.getCivilManageById?d='+ new Date(),
				method : 'post'
			}),
			reader : new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, [ 'id','civilRegistId','projectCode','projectName','nums','numsunit',
					'projectManagerid','projectManagerName','useunit','status','remarke',
					'planFileArrivalTime','planFileArrivalDutyPerson','planLocationFinishTime',
					'planLocationFinishDutyPerson','buildingPlanFinishTime','buildingPlanFinishDutyPerson',
					'licenseFinishTime','licenseFinishDutyPerson','constructionDesignFinishTime',
					'constructionDesignDutyPerson','approvalTime','approvalDutyPerson',
					'tenderTime','tenderDutyPerson','contractSignedTime',
					'contractSignedDutyPerson','startWorkTime','startWorkPerson','mainAcceptanceTime',
					'mainAcceptanceDutyPerson','deliverTime','deliverDutyPerson',
					'lastupdateTime','projectCode','projectName','nums','numsunit',
					'projectManagerid','useunit','createtime' ,'lastupdateTime','status','remarke',
					'fixedAssetAcceptanceApplyId','civilregistId','applyAcceptanceTime','applyAcceptanceTime',
					'tel','contractmanuFacturers','contractmanuFacturersTel','contactPerson','opinion'
			]),
			pruneModifiedRecords : true,
			autoLoad : true,
			baseParams : {
				pid:id
			}
		});
		
		if(id != null){
			store.load();
		}
		
		var continentGroupRow = new Ext.ux.grid.ColumnHeaderGroup({
	    	// 注:数组元素也为数组类型
			//多表头
			rows : [[
				{header : '',colspan : 8,align : 'center'}, 
				{header : '项目节点',colspan : 11,align : 'center'},
				{header : '',colspan : 2,align : 'center'}]]
		});
		
		var cm = new Ext.grid.ColumnModel([ 
				{header : '项目ID',name : 'civilRegistId',hidden : true,dataIndex : 'civilRegistId'},
				{header : '项目编号',dataIndex : 'projectCode',width : 160,sortable : true}, 
				{header : '项目名称',dataIndex : 'projectName',width : 160,sortable : true},
				{header : '状态',dataIndex : 'status',width : 100,sortable : true,
					renderer : function(value, cellmeta, record, rowIndex) {
						var status = record.get('status');
						if (status == '编制中') {
							return '<font color="red">编制中</font>';
						} else if (status == '审批中') {
							return '审批中';
						} else if (status == '已审批') {
							return '<font color="green">已审批</font>';
						} else if (status == '已下发'){
							return '<font color="green">已下发</font>';
						} else{
							return value;
						}
					}
				},
				{header : '数量',dataIndex : 'nums',width : 100,sortable : true},
				{header : '数量单位',dataIndex : 'numsunit',width : 100,sortable : true},  
				{header : '项目主管',dataIndex : 'projectManagerName',width : 150,sortable : true}, 
				{header : '使用单位',dataIndex : 'useunit',width : 100,sortable : true}, 
				{header : '规划文件下达日期',dataIndex : 'planFileArrivalTime',width : 200,sortable : true,
					renderer:function(value){
								if(value instanceof Date){ 
									return new Date(value).format("Y-m-d"); 
								}else{ 
									return value; 
								}
					}
				}, 
				{header : '规划方案及选址工作完成日期',dataIndex : 'planLocationFinishTime',width : 200,sortable : true,
					renderer:function(value){
								if(value instanceof Date){ 
									return new Date(value).format("Y-m-d"); 
								}else{ 
									return value; 
								}
					}
				},  
				{header : '初步建设方案完成日期',dataIndex : 'buildingPlanFinishTime',width : 200,sortable : true,
					renderer:function(value){
						if(value instanceof Date){ 
							return new Date(value).format("Y-m-d"); 
						}else{ 
							return value; 
						}
					}
				}, 
				{header : '规划许可证办理完成日期',dataIndex : 'licenseFinishTime',width : 200,sortable : true,
					renderer:function(value){
						if(value instanceof Date){ 
							return new Date(value).format("Y-m-d"); 
						}else{ 
							return value; 
						}
					}
				},
				{header : '施工设计完工日期',dataIndex : 'constructionDesignFinishTime',width : 200,sortable : true,
					renderer:function(value){
						if(value instanceof Date){ 
							return new Date(value).format("Y-m-d"); 
						}else{ 
							return value; 
						}
					}
				}, 
				{header : '招标控制价编制和审批日期',dataIndex : 'approvalTime',width : 200,sortable : true,
					renderer:function(value){
						if(value instanceof Date){ 
							return new Date(value).format("Y-m-d"); 
						}else{ 
							return value; 
						}
					}
				},
				{header : '施工总包招标定标工作完成日期',dataIndex : 'tenderTime',width : 200,sortable : true,
					renderer:function(value){
						if(value instanceof Date){ 
							return new Date(value).format("Y-m-d"); 
						}else{ 
							return value; 
						}
					}
				}, 
				{header : '合同签订日期',dataIndex : 'contractSignedTime',width : 200,sortable : true,
					renderer:function(value){
						if(value instanceof Date){ 
							return new Date(value).format("Y-m-d"); 
						}else{ 
							return value; 
						}
					}
				},  
				{header : '开工日期',dataIndex : 'startWorkTime',width : 200,sortable : true,
					renderer:function(value){
						if(value instanceof Date){ 
							return new Date(value).format("Y-m-d"); 
						}else{ 
							return value; 
						}
					}
				}, 
				{header : '主体验收日期',dataIndex : 'mainAcceptanceTime',width : 200,sortable : true,
					renderer:function(value){
						if(value instanceof Date){ 
							return new Date(value).format("Y-m-d"); 
						}else{ 
							return value; 
						}
					}
				}, 
				{header : '交付日期',dataIndex : 'deliverTime',width : 200,sortable : true,
					renderer:function(value){
						if(value instanceof Date){ 
							return new Date(value).format("Y-m-d"); 
						}else{ 
							return value; 
						}
					}
				}, 
				{header : '备注',dataIndex : 'remarke',width : 100,sortable : true},
				{header : '审批记录',dataIndex : '',width : 100,align : 'center',sortable : true,
					renderer : function(value, cellmeta, record, rowIndex) {
						var id = record.get('id');
						if (record.get('status') != 1) {
							return "<a href='javascript:void(0);' onclick=approvalInfoList.showWin('"+id+"')><font color=blue>查看</font></a>";
						}
					}
				}
		]);
		
		var grid = new Ext.grid.GridPanel({
			cm : cm,
//			columnLines : true,
			plugins : continentGroupRow,
			border : false,
			layout :'fit',
			region : 'center',
			autoScroll : true,
//			stripeRows : true,
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
			title : '执行管理',
			items : grid
		});
		return panel;
	},
	
	fixedStockPactSelect : function(){
		var name = Ext.getCmp('fixedProjectName').getValue();
		var num = Ext.getCmp('fixedProjectNum').getValue();
		Ext.getCmp('fixedStockPactPanelGrid').store.load({
			params:{
				projectname : name,
				projectnum : num,
				start:0,
				limit:5
			}
		})
	}
}