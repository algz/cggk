Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var implementationPlan2 = {
	importForm : null,//form表单
	selectedRowId : null,
	RawText : null,
	RawValue : null,
	theCmpId : null,
	store : null,
	action : null,
	selectDate : null,
	clickFlag : null
};


// 1、引入命名空间
Ext.namespace("implementationPlan2.mainGrid");
/**
 * 设备工程项目执行--设备项目执行管理--实施计划
 * 
 * @class implementationPlan2.mainGrid
 * @extends Ext.grid.GridPanel
 */
implementationPlan2.mainGrid = Ext.extend(Ext.grid.EditorGridPanel, {// 定义主窗体,主窗体前缀带main
	title : '实施计划', // 扩展时初始化
	id : 'implementationPlanGrid', // 对象名+类型后缀(Grid)
	loadMask : {
	      msg : '正在加载数据,请稍后...'
	},
	frame: true, //True表示为面板的边框外框可自定义的 
    columnLines : true,//True表示为在列分隔处显示分隔符
    stripeRows: true, //隔行变色，区分表格行
    clicksToEdit: 2, //表示点击多少次数才可以编辑表格
    //collapsible: true, //是否在右上角显示收缩按钮  
    //animCollapse: true, //表示收缩（闭合）面板时，显示动画效果  
    trackMouseOver: true, //鼠标在行上移动时显示高亮  
    enableColumnMove: false,//禁止用户拖动表头  
	viewConfig : {
		enableRowBody : true
	},
	listeners : {
		'beforeedit' : function(e) {
			implementationPlan2.clickFlag = 0;//默认
			var record = e.record;
			var grid = e.grid;
			
			if(record.get('status') != '编制中' && record.get('status') != null){
				return false;//不可编辑
			}
			
			
			
			//第一部分
			if(e.record.data.id == null && e.record.data.civilRegistId != null){
				//Ajax调用开始  如果id为空,且civilRegistId不为空,就先插入一条数据,传递回新增的ID
				var getSelectStringUrl = "../JSON/engineeringProject_EngineeringProjectImplementPlanRemote.beforeEditAdd";
				var conn = synchronize.createXhrObject();
				conn.open('POST', getSelectStringUrl, false);// false同步,运行到此程序需要等待返回
				conn.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");// 如果想通过send发送参数,这个必须
				conn.send("civilRegistId=" + e.record.data.civilRegistId);
				// conn.send(null);
				if (conn.responseText == "true") {
					record.set('id',conn.responseText);//新插入的数据获得的ID
				} else  {
					Ext.Msg.alert('提示', '创建数据失败,请检查后台TB_ENGINEERINGPLANDETAILS表数据 !');
					return;
				}		
				//Ajax调用结束
			}
			
			
			//第二部分
			if (record.get('status') == '编制中' || record.get('status') == null) {
				if (e.column == 6 || e.column == 10 || e.column == 12 ||
				    e.column == 14 || e.column == 16 || e.column == 18 ||
			        e.column == 20 || e.column == 22 || e.column == 24 ||
			    	e.column == 26 || e.column == 28 || e.column == 30
				   ) {//项目主管列
				   if(!main.IMPLEMENT){
							userMultiselect.init(function(){
									var dataStore = userMultiselect.usersore;//选择人员面板的store
									var outApprover = Ext.getCmp("projectmanagernameID");
									var records = Ext.data.Record.create([
									    {name:'userid'},
									    {name:'truename'}
									]);
									
									if(dataStore.getCount()>1){
										Ext.MessageBox.show( {
								                        title : "提示",
								                        msg : "请只选择一个用户!!!",
								                        buttons : Ext.MessageBox.OK,
								                        icon : Ext.MessageBox.INFO,
								                        maxWidth : 800, 
								                        minWidth : 300 
								   		});
								   		return;
									}
									//只会有一个循环
									for (i = 0; i < dataStore.getCount(); i++){
										var userid = dataStore.getAt(i).get('userid');
										var truename = dataStore.getAt(i).get('truename');
										var data = new records({
											userid:userid,
											truename:truename
										});
										
										//这种赋值先屏蔽
										//outApprover.setValue(truename+"["+userid+"]");
										if(e.column == 6 ){
											record.set('projectManagerName',truename+'['+userid+']');	
										}else if(e.column == 10){
											record.set('planFileArrivalDutyPerson',truename+'['+userid+']');
										}else if(e.column == 12){
											record.set('planLocationFinishDutyPerson',truename+'['+userid+']');
										}else if(e.column == 14){
											record.set('buildingPlanFinishDutyPerson',truename+'['+userid+']');
										}else if(e.column == 16){
											record.set('licenseFinishDutyPerson',truename+'['+userid+']');
										}else if(e.column == 18){
											record.set('constructionDesignDutyPerson',truename+'['+userid+']');
										}else if(e.column == 20){
											record.set('approvalDutyPerson',truename+'['+userid+']');
										}else if(e.column == 22){
											record.set('tenderDutyPerson',truename+'['+userid+']');
										}else if(e.column == 24){
											record.set('contractSignedDutyPerson',truename+'['+userid+']');
										}else if(e.column == 26){
											record.set('startWorkPerson',truename+'['+userid+']');
										}else if(e.column == 28){
											record.set('mainAcceptanceDutyPerson',truename+'['+userid+']');
										}else if(e.column == 30){
											record.set('deliverDutyPerson',truename+'['+userid+']');
										}
										
									}
									Ext.getCmp('userMultiselectWindow').close();
									
									
									implementationPlan2.clickFlag = 1;//默认
									//直接触发编辑后事件
									grid.fireEvent('afteredit',e);
									
							});
				   }		
							/*userMultiselect.init(function(el) {
								if (el.store.getCount() = 1) {
									Ext.Msg.alert('提示', '请选择一条记录!');
									return;
								} else {
									var rec = el.store.getAt(0)
									record.set('projectmanagerid', rec == null ? "" : rec.get('userid'));
									record.set('projectmanagername', rec == null ? "": rec.get('truename'));
								}
								el.win.close();
								grid.fireEvent('afteredit',e);
							});*/
				}
			}else{
				//alert(e.column);
				return;
				implementationPlan2.clickFlag = 1;
				//直接触发编辑后事件
				grid.fireEvent('afteredit',e);
			}
		},
		'afteredit' :function(e){
			if (e.column == 9 || e.column == 11 || e.column == 13 ||
			    e.column == 15 || e.column == 17 || e.column == 19 ||
			    e.column == 21 || e.column == 23 || e.column == 25 ||
			    e.column == 27 || e.column == 29 
			){//验证1 
			    implementationPlan2.clickFlag = 1;//打开
			}
			if(implementationPlan2.clickFlag == 0){
				return;//验证2
			}
			
			
			var rec = e.record;//一行记录
			var grid = e.grid;
			if(rec.dirty){
				var arr = new Array();
				arr.push(rec.data);
				
				//Ajax调用开始
				var getSelectStringUrl = "../JSON/engineeringProject_EngineeringProjectImplementPlanRemote.saveImplementPlan";
				var conn = synchronize.createXhrObject();
				conn.open('POST', getSelectStringUrl, false);// false同步,运行到此程序需要等待返回
				conn.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");// 如果想通过send发送参数,这个必须
				conn.send("dataJsonArray=" + Ext.util.JSON.encode(arr)+"&updateIndex="+e.column);
				// conn.send(null);
				if (conn.responseText == "true") {
					grid.store.commitChanges();
					XX.common.msg('消息', "<font color=green>更新成功!</font>");
				} else  {
					XX.common.msg('消息', "<font color=red>更新失败!</font>");
				}		
				//Ajax调用结束
				
				//刷新GIRD
				if(rec.data.status == '编制中'){//如果已经有状态了,就不刷新Grid了
					
				}else{//如果没有状态了,就刷新,一般是初次添加值的时候需要刷新
					grid.store.load();
				}
				
				implementationPlan2.clickFlag = 0;//复原
			}
		},
		'activate' : function(grid) {
			grid.store.load();
		}
	},
	initComponent : function() {// 事件绑定不要放在初始时,可以放在扩展时或Renderer中.
		var grid = this;
		
		var store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						url : '../JSON/engineeringProject_EngineeringProjectImplementPlanRemote.getGridData?d='+ new Date(),
						method : 'post'
					}),
			reader : new Ext.data.JsonReader({
						root : 'results',
						totalProperty : 'totalProperty',
						id : 'id'
					}, [    'id','civilRegistId',
							'projectCode','projectName',
							'nums','numsunit',
							'projectManagerid','projectManagerName',
							'useunit',
							'status','remarke',
							{
								name : 'planFileArrivalTime',
								type : 'date',
								dateFormat : 'Y-m-d'
							},
							'planFileArrivalDutyPerson',
							{
								name : 'planLocationFinishTime',
								type : 'date',
								dateFormat : 'Y-m-d'
							},
							'planLocationFinishDutyPerson',
							{
								name : 'buildingPlanFinishTime',
								type : 'date',
								dateFormat : 'Y-m-d'
							},
							'buildingPlanFinishDutyPerson',
							{
								name : 'licenseFinishTime',
								type : 'date',
								dateFormat : 'Y-m-d'
							},
							'licenseFinishDutyPerson',
							{
								name : 'constructionDesignFinishTime',
								type : 'date',
								dateFormat : 'Y-m-d'
							},
							'constructionDesignDutyPerson',
							{
								name : 'approvalTime',
								type : 'date',
								dateFormat : 'Y-m-d'
							},
							'approvalDutyPerson',
							{
								name : 'tenderTime',
								type : 'date',
								dateFormat : 'Y-m-d'
							},
							'tenderDutyPerson',
							{
								name : 'contractSignedTime',
								type : 'date',
								dateFormat : 'Y-m-d'
							},
							'contractSignedDutyPerson',
							{
								name : 'startWorkTime',
								type : 'date',
								dateFormat : 'Y-m-d'
							},
							'startWorkPerson',
							{
								name : 'mainAcceptanceTime',
								type : 'date',
								dateFormat : 'Y-m-d'
							},
							'mainAcceptanceDutyPerson',
							{
								name : 'deliverTime',
								type : 'date',
								dateFormat : 'Y-m-d'
							},
							'deliverDutyPerson',
							{
								name : 'lastupdateTime',
								type : 'date',
								dateFormat : 'Y-m-d'
							},
							'projectCode',
							'projectName',
							'nums',
							'numsunit',
							'projectManagerid',
							'projectManagerName',
							'useunit',
							'createtime' ,
							'lastupdateTime',
							'status',
							'remarke',
							'updateIndex',
							'headperson',
							'projectcategorys'
							]),
			pruneModifiedRecords : true,
			autoLoad : true,
			baseParams : {
				start : 0,
				limit : 25
			}
		});
		
		
		
		
		
		
		var continentGroupRow = new Ext.ux.grid.ColumnHeaderGroup({
	    	// 注:数组元素也为数组类型
			//多表头
			rows : [[{
				header : '',
				colspan : 8,
				align : 'center'
			}, 
			{
				header : '规划文件下达',
				colspan : 2,
				align : 'center'
			},
			{
				header : '规划方案及选址工作完成',
				colspan : 2,
				align : 'center'
			},
			{
				header : '初步建设方案完成',
				colspan : 2,
				align : 'center'
			},
			{
				header : '规划许可证办理完成',
				colspan : 2,
				align : 'center'
			},
			{
				header : '施工设计完工',
				colspan : 2,
				align : 'center'
			},
			{
				header : '招标控制价编制和审批',
				colspan : 2,
				align : 'center'
			},
			{
				header : '施工总包招标定标工作完成',
				colspan : 2,
				align : 'center'
			},
			{
				header : '合同签订',
				colspan : 2,
				align : 'center'
			},
			{
				header : '开工',
				colspan : 2,
				align : 'center'
			},
			{
				header : '主体验收',
				colspan : 2,
				align : 'center'
			},
			{
				header : '交付',
				colspan : 2,
				align : 'center'
			},
			{
				header : '',
				colspan : 2,
				align : 'center'
			}]]
		});
		var rm = new Ext.grid.RowNumberer({header : "序号",width : 40 });
//		var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});//只能单选
		var sm = new Ext.grid.CheckboxSelectionModel({handleMouseDown:Ext.emptyFn});//只能勾选前面的方格,可以多选
		var cm = new Ext.grid.ColumnModel([ 
				sm,{
						header : '项目编号',
						dataIndex : 'projectCode',
						width : 100,
						sortable : true
					}, {
						header : '项目名称',
						dataIndex : 'projectName',
						width : 100,
						sortable : true
					}, 
//						{
//						header : '项目类别',
//						dataIndex : 'projectcategorys',
//						width : 100,
//						sortable : true,
//						renderer : function(value){
//							if(value == 1){
//								return '新建';
//							}else if (value == 2){
//								return '大修';
//							}
//						}
//					},
						{
						header : '状态',
						dataIndex : 'status',
						width : 100,
						sortable : true,
						renderer : function(value, cellmeta, record, rowIndex) {
							var status = record.get('status');
							if (status == 1) {
								return '<font color="red">编制中</font>';
							} else if (status == 3) {
								return '<font color="green">已下发</font>';
							}else{
								return '';
							}
						}
					}, {
						header : '数量',
						dataIndex : 'nums',
						width : 100,
						sortable : true
					},{
						header : '数量单位',
						dataIndex : 'numsunit',
						width : 100,
						sortable : true
					},  {
						id : "projectmanagernameID",
						header : '项目主管<span style="color:red;">**</span>',
						dataIndex : 'projectManagerName',
						width : 150,
						sortable : true
//						editor : new Ext.form.TextField({
//							disabled : main.IMPLEMENT
//						})  //一般的编辑框
						
						
					}, {
						header : '使用单位',
						dataIndex : 'useunit',
						width : 100,
						sortable : true
					}, 
					
					{
						header : '日期<span style="color:red;">*</span>',
						dataIndex : 'planFileArrivalTime',
						width : 100,
						sortable : true,
						renderer:function(value){
									if(value instanceof Date){ 
										return new Date(value).format("Y-m-d"); 
									}else{ 
										return value; 
									}
						},
						editor : new Ext.form.DateField({
									format : 'Y-m-d',
									disabled : main.IMPLEMENT
						}),
						editable : true
					}, {
						header : '责任人<span style="color:red;">*</span>',
						dataIndex : 'planFileArrivalDutyPerson',
						width : 200,
						sortable : true,
						editor : new Ext.form.TextField({
							disabled : main.IMPLEMENT	
						})
					}, 
					
					{
						header : '日期<span style="color:red;">*</span>',
						dataIndex : 'planLocationFinishTime',
						width : 100,
						sortable : true,
						editor : new Ext.form.DateField({
									format : 'Y-m-d',
									disabled : main.IMPLEMENT
								}),
						renderer : Ext.util.Format.dateRenderer("Y-m-d")
					}, {
						header : '责任人<span style="color:red;">*</span>',
						dataIndex : 'planLocationFinishDutyPerson',
						width : 200,
						sortable : true,
						editor : new Ext.form.TextField({
							disabled : main.IMPLEMENT
						})
					}, 
					
					{
						header : '日期<span style="color:red;">*</span>',
						dataIndex : 'buildingPlanFinishTime',
						width : 100,
						sortable : true,
						editor : new Ext.form.DateField({
									format : 'Y-m-d',
									disabled : main.IMPLEMENT
								}),
						renderer : Ext.util.Format.dateRenderer("Y-m-d")
					}, {
						header : '责任人<span style="color:red;">*</span>',
						dataIndex : 'buildingPlanFinishDutyPerson',
						width : 200,
						sortable : true,
						editor : new Ext.form.TextField({
							disabled : main.IMPLEMENT
						})
					}, 
					
					{
						header : '日期<span style="color:red;">*</span>',
						dataIndex : 'licenseFinishTime',
						width : 100,
						sortable : true,
						editor : new Ext.form.DateField({
									format : 'Y-m-d',
									disabled : main.IMPLEMENT
								}),
						renderer : Ext.util.Format.dateRenderer("Y-m-d")
					}, {
						header : '责任人<span style="color:red;">*</span>',
						dataIndex : 'licenseFinishDutyPerson',
						width : 200,
						sortable : true,
						editor : new Ext.form.TextField({
							disabled : main.IMPLEMENT
						})
					}, 
					
					{
						header : '日期<span style="color:red;">*</span>',
						dataIndex : 'constructionDesignFinishTime',
						width : 100,
						sortable : true,
						editor : new Ext.form.DateField({
									format : 'Y-m-d',
									disabled : main.IMPLEMENT
								}),
						renderer : Ext.util.Format.dateRenderer("Y-m-d")
					}, {
						header : '责任人<span style="color:red;">*</span>',
						dataIndex : 'constructionDesignDutyPerson',
						width : 200,
						sortable : true,
						editor : new Ext.form.TextField({
							disabled : main.IMPLEMENT
						})
					}, 
					
					{
						header : '日期<span style="color:red;">*</span>',
						dataIndex : 'approvalTime',
						width : 100,
						sortable : true,
						editor : new Ext.form.DateField({
									format : 'Y-m-d',
									disabled : main.IMPLEMENT
								}),
						renderer : Ext.util.Format.dateRenderer("Y-m-d")
					}, {
						header : '责任人<span style="color:red;">*</span>',
						dataIndex : 'approvalDutyPerson',
						width : 200,
						sortable : true,
						editor : new Ext.form.TextField({
							disabled : main.IMPLEMENT
						})
					}, 
					
					{
						header : '日期<span style="color:red;">*</span>',
						dataIndex : 'tenderTime',
						width : 100,
						sortable : true,
						editor : new Ext.form.DateField({
									format : 'Y-m-d',
									disabled : main.IMPLEMENT
								}),
						renderer : Ext.util.Format.dateRenderer("Y-m-d")
					}, {
						header : '责任人<span style="color:red;">*</span>',
						dataIndex : 'tenderDutyPerson',
						width : 200,
						sortable : true,
						editor : new Ext.form.TextField({
							disabled : main.IMPLEMENT
						})
					}, 
					
					{
						header : '日期<span style="color:red;">*</span>',
						dataIndex : 'contractSignedTime',
						width : 100,
						sortable : true,
						editor : new Ext.form.DateField({
									format : 'Y-m-d',
									disabled : main.IMPLEMENT
								}),
						renderer : Ext.util.Format.dateRenderer("Y-m-d")
					}, {
						header : '责任人<span style="color:red;">*</span>',
						dataIndex : 'contractSignedDutyPerson',
						width : 200,
						sortable : true,
						editor : new Ext.form.TextField({
							disabled : main.IMPLEMENT
						})
					}, 
					
					{
						header : '日期<span style="color:red;">*</span>',
						dataIndex : 'startWorkTime',
						width : 100,
						sortable : true,
						editor : new Ext.form.DateField({
									format : 'Y-m-d',
									disabled : main.IMPLEMENT
								}),
						renderer : Ext.util.Format.dateRenderer("Y-m-d")
					}, {
						header : '责任人<span style="color:red;">*</span>',
						dataIndex : 'startWorkPerson',
						width : 200,
						sortable : true,
						editor : new Ext.form.TextField({
							disabled : main.IMPLEMENT
						})
					}, 
					
					{
						header : '日期<span style="color:red;">*</span>',
						dataIndex : 'mainAcceptanceTime',
						width : 100,
						sortable : true,
						editor : new Ext.form.DateField({
									format : 'Y-m-d',
									disabled : main.IMPLEMENT
								}),
						renderer : Ext.util.Format.dateRenderer("Y-m-d")
					}, {
						header : '责任人<span style="color:red;">*</span>',
						dataIndex : 'mainAcceptanceDutyPerson',
						width : 200,
						sortable : true,
						editor : new Ext.form.TextField({
							disabled : main.IMPLEMENT
						})
					}, 
					
					{
						header : '日期<span style="color:red;">*</span>',
						dataIndex : 'deliverTime',
						width : 100,
						sortable : true,
						editor : new Ext.form.DateField({
									format : 'Y-m-d',
									disabled : main.IMPLEMENT
								}),
						renderer : Ext.util.Format.dateRenderer("Y-m-d")
					}, {
						header : '责任人<span style="color:red;">*</span>',
						dataIndex : 'deliverDutyPerson',
						width : 200,
						sortable : true,
						editor : new Ext.form.TextField({
							disabled : main.IMPLEMENT
						})
					}, 
					
					
					{
						header : '计划创建时间',
						dataIndex : 'lastupdateTime',
						width : 150,
						sortable : true
					},
					{
						header : '备注',
						dataIndex : 'remarke',
						width : 100,
						sortable : true
					}
					
		]);
		
		//上工具条2
		var tbar2 = new Ext.Toolbar({
			items : [
				'选择创建合同时间(年月日)：','<input id="selectDate" type="text" onClick="WdatePicker()" style="width:120px"/>', 
				{
					text : '查询',
					iconCls : 'search1',
					handler : function() {
						//equipreServiceAction.search();//调用搜索方法
						var selectDate = document.getElementById('selectDate').value;//2009-08-08格式字符串
						/*contractManagement2.setSelectDate(selectDate);//保存到全局变量
						
						contractManagement2.getStore().baseParams = { 
		                              start: 0, 
		                              limit: 25,
		                              time : contractManagement2.getSelectDate() == null ? 0 : contractManagement2.getSelectDate() };
						contractManagement2.getStore().load(); */
					}
				}
			]
		});
		
		Ext.applyIf(this, {
			store : store,
			plugins : continentGroupRow,
			cm : cm,
	        sm : sm,
			bbar : new Ext.PagingToolbar({
						pageSize : 25,
						store : store,
						displayInfo : true,
						displayMsg : '当前行数{0} - {1} 共 {2} 行',
						emptyMsg : "未查询到数据"
					}),
			tbar :  { items : [{
						xtype : 'deviceProjectDateComboxBox2',
						projectDataType : 1,
						listeners : {
							'beforequery' : function(qe) {
								delete qe.combo.lastQuery;
							},
							'select' : function(combo, record, index) {
								grid.store.baseParams = {
									time : record.get('value'),
									start : 0,
									limit : 25
								};
								grid.store.load();
							}
					    }
			},'-',{
				text : '任务指派',
				iconCls : 'icon-projectHistory-16',
				disabled : main.APPOINT,
				handler : function(){
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
//									如果当前登录是计划员。要验证选择的是否是室主任
									if(main.PLANER){
										if(isSzr){
											for (var i = 0; i < recs.length; i++) {
												var rec = recs[i];
												if (rec.get('status') != 1) {
													alert(rec.get('status'));
													Ext.Msg.alert('提示', '请选择未下发的数据!');
													return false;
												}
												rec.set('projectManagerName', headperson == null ? "" : headperson.get('truename'));
												rec.set('headperson',headperson == null ? "" : headperson.get('truename'));
												arr.push(rec.data);
											}
											el.win.close();
											Ext.Ajax.request({
												url : '../JSON/engineeringProject_EngineeringProjectImplementPlanRemote.saveImplementPlan',
												method : 'post',
												waitMsg : '数据加载中，请稍后....',
												params : {
													dataJsonArray : Ext.util.JSON.encode(arr),
													updateIndex : ""
												},
												success : function(response, opts) {
													var obj = Ext.decode(response.responseText);
													if (obj == true) {
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
												rec.set('projectManagerName', headperson == null ? "" : headperson.get('truename'));
												arr.push(rec.data);
											}
											el.win.close();
											Ext.Ajax.request({
												url : '../JSON/engineeringProject_EngineeringProjectImplementPlanRemote.saveImplementPlan',
												method : 'post',
												waitMsg : '数据加载中，请稍后....',
												params : {
													dataJsonArray : Ext.util.JSON.encode(arr),
													updateIndex : ""
												},
												success : function(response, opts) {
													var obj = Ext.decode(response.responseText);
													if (obj == true) {
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
					
				}
			},'-',{
				
				text : '下发',
				iconCls : 'edit1',
				disabled : main.HEADER,
				handler : function() {
					
					var recs = grid.getSelectionModel().getSelections();
					if (recs.length == 0) {
						Ext.Msg.alert('提示', '请选择一条记录!');
						return false;
					}
					var arr = new Array();
					for (var i = 0; i < recs.length; i++) {
						var rec = recs[i];
						if (rec.get('status') != 1) {
							Ext.Msg.alert('提示', '请选择"编制中"的数据!');
							return false;
						}else if (rec.get('projectManagerName') == null || rec.get('projectManagerName') == "") {
							Ext.Msg.alert('提示', '请选择项目负责人后在下发!');
							return false;
						}
						arr.push(rec.get('id'));
					}
					
					
					//Ajax调用开始
					var getSelectStringUrl = "../JSON/engineeringProject_EngineeringProjectImplementPlanRemote.sendImplementPlan";
					var conn = synchronize.createXhrObject();
					conn.open('POST', getSelectStringUrl, false);// false同步,运行到此程序需要等待返回
					conn.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");// 如果想通过send发送参数,这个必须
					conn.send("dataJsonArray=" + Ext.util.JSON.encode(arr));
					// conn.send(null);
					if (conn.responseText == "true") {
						grid.store.load();
						XX.common.msg('消息', "<font color=green>下发成功!</font>");
					} else  {
						XX.common.msg('消息', "<font color=red>下发失败!</font>");
					}		
					//Ajax调用结束
					
					
					/*Ext.Ajax.request({
						url : '../JSON/engineeringProject_EngineeringProjectImplementPlanRemote.sendImplementPlan',
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
							}
						},
						failure : function(response, opts) {
							Ext.Msg.alert('提示', '数据问题,请与管理员联系!');
						}
						
						
					});*/
				}
			
			}]}
		});
		
		
		
		implementationPlan2.mainGrid.superclass.initComponent.call(this);// 必须放在末尾,否则出错
	}
})
// 3、注册控件
Ext.reg('implementationPlanMainGrid2', implementationPlan2.mainGrid);// 第一个参数为自定义控件的xtype
