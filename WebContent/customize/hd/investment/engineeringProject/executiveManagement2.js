Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var executiveManagement2 = {
	importForm : null,//form表单
	selectedRowId : null,
	RawText : null,
	RawValue : null,
	theCmpId : null,
	store : null,
	action : null,
	selectDate : null,
	clickFlag : null,
	selectRowId : null
};

//定义方法,获取变量
executiveManagement2.getTheRowId = function(){
	return executiveManagement2.selectedRowId
}
executiveManagement2.setTheRowId = function(value){
	executiveManagement2.selectedRowId = value;
}


executiveManagement2.getStore = function(){
	return executiveManagement2.store ;
}
executiveManagement2.setStore = function(value){
	executiveManagement2.store = value;
}


executiveManagement2.getAction = function(){
	return executiveManagement2.action ;
}
executiveManagement2.setAction = function(value){
	executiveManagement2.action = value;
}


executiveManagement2.getSelectDate = function(){
	return executiveManagement2.selectDate ;
}
executiveManagement2.setSelectDate = function(value){
	executiveManagement2.selectDate = value;
}



// 1、引入命名空间
Ext.namespace("executiveManagement2.mainGrid");
/*
 * 设备工程项目执行--工程项目执行管理--执行管理  TAB 2
 * 
 * @class executiveManagement2.mainGrid
 * @extends Ext.grid.GridPanel
 */
executiveManagement2.mainGrid = Ext.extend(Ext.grid.EditorGridPanel, {// 定义主窗体,主窗体前缀带main
	title : '执行管理', // 扩展时初始化
	id : 'executiveManagement2Grid', // 对象名+类型后缀(Grid)
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
		'beforeedit' : function(e){
			executiveManagement2.clickFlag = 0;//默认
			var record = e.record;
			var grid = e.grid;
			
			if(record.get('status') != '编制中'){
				return false;//不可编辑
			}
			
			
			//第一部分
			if(e.record.data.id == null && e.record.data.civilRegistId != null){
				//Ajax调用开始  如果id为空,且civilRegistId不为空,就先插入一条数据,传递回新增的ID
				var getSelectStringUrl = "../JSON/engineeringProject_EngineeringProjectExecutiveManagementRemote.beforeEditAdd";
				var conn = synchronize.createXhrObject();
				conn.open('POST', getSelectStringUrl, false);// false同步,运行到此程序需要等待返回
				conn.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");// 如果想通过send发送参数,这个必须
				conn.send("civilRegistId=" + e.record.data.civilRegistId);
				// conn.send(null);
				if (conn.responseText != null || conn.responseText != "" || conn.responseText != "null") {
					record.set('id',conn.responseText);//新插入的数据获得的ID
				} else if (conn.responseText == "0") {
					Ext.Msg.alert('提示', '创建数据失败,请检查后台TB_ENGINEERINGEXEMANADETAILS 表数据 !');
					return;
				}	
				//Ajax调用结束
			}
			
			
			//第二部分
			if (record.get('status') == '编制中' || record.get('status') == null) {
				if (e.column == 7 ) {//项目主管列
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
										record.set('projectManagerName',truename+'['+userid+']');	
										
									}
									Ext.getCmp('userMultiselectWindow').close();
									
									
									executiveManagement2.clickFlag = 1;//默认
									//直接触发编辑后事件
									grid.fireEvent('afteredit',e);
									
							});
							
							
				}
			}else{
				return;
				executiveManagement2.clickFlag = 1;
				//直接触发编辑后事件
				grid.fireEvent('afteredit',e);
			}
		},
		'afteredit' :function(e){
			if (e.column == 9 ||
			    e.column == 10 || e.column == 11 || e.column == 12 ||
			    e.column == 13 || e.column == 14 || e.column == 15 ||
			    e.column == 16 || e.column == 17 || e.column == 18 || e.column == 19
			){//验证1 
			    executiveManagement2.clickFlag = 1;//打开
			}
			if(executiveManagement2.clickFlag == 0){
				return;//验证2
			}
			
			
			var rec = e.record;//一行记录
			var grid = e.grid;
			if(rec.dirty){
				var arr = new Array();
				arr.push(rec.data);
				
				//Ajax调用开始
				var getSelectStringUrl = "../JSON/engineeringProject_EngineeringProjectExecutiveManagementRemote.saveImplementPlan";
				var conn = synchronize.createXhrObject();
				conn.open('POST', getSelectStringUrl, false);// false同步,运行到此程序需要等待返回
				conn.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");// 如果想通过send发送参数,这个必须
				conn.send("dataJsonArray=" + Ext.util.JSON.encode(arr)+"&updateIndex="+e.column);
				// conn.send(null);
				if (conn.responseText == "success") {
					grid.store.commitChanges();
					XX.common.msg('消息', "<font color=green>更新成功!</font>");
				} else if (conn.responseText == "0") {
					XX.common.msg('消息', "<font color=red>更新失败!</font>");
				}		
				//Ajax调用结束
					
				executiveManagement2.clickFlag = 0;//复原
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
								url : '../JSON/engineeringProject_EngineeringProjectExecutiveManagementRemote.getGridData?d='+ new Date(),
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
							'planFileArrivalTime','planFileArrivalDutyPerson','planLocationFinishTime',
							'planLocationFinishDutyPerson','buildingPlanFinishTime','buildingPlanFinishDutyPerson',
							'licenseFinishTime','licenseFinishDutyPerson','constructionDesignFinishTime',
							'constructionDesignDutyPerson','approvalTime','approvalDutyPerson',
							'tenderTime','tenderDutyPerson','contractSignedTime',
							'contractSignedDutyPerson','startWorkTime','startWorkPerson','mainAcceptanceTime',
							'mainAcceptanceDutyPerson','deliverTime','deliverDutyPerson',
							'lastupdateTime','projectCode','projectName','nums','numsunit',
							'projectManagerid','useunit',
							'createtime' ,'lastupdateTime','status','remarke',
							'fixedAssetAcceptanceApplyId','civilregistId',
							'applyAcceptanceTime','applyAcceptanceTime','tel','contractmanuFacturers','contractmanuFacturersTel',
							'contactPerson','opinion','projectcategorys'
							]),
					pruneModifiedRecords : true,
					autoLoad : true,
					baseParams : {
						start : 0,
						limit : 25
					}
				});
				
		executiveManagement2.setStore(store);//保存到全局变量		
		
				
				
		var continentGroupRow = new Ext.ux.grid.ColumnHeaderGroup({
	    	// 注:数组元素也为数组类型
			//多表头
			rows : [[{
				header : '',
				colspan : 9,
				align : 'center'
			}, 
			{
				header : '项目节点',
				colspan : 11,
				align : 'center'
			},
			{
				header : '',
				colspan : 2,
				align : 'center'
			}]]
		});
		var rm = new Ext.grid.RowNumberer({header : "序号",width : 40 });
		//var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});//只能单选
		var sm = new Ext.grid.CheckboxSelectionModel({handleMouseDown:Ext.emptyFn});//只能勾选前面的方格,可以多选
		var cm = new Ext.grid.ColumnModel([ 
				sm, {
					    header : '项目ID',
						name : 'civilRegistId',
						hidden : true,
						dataIndex : 'civilRegistId'
					},{
						header : '项目编号',
						dataIndex : 'projectCode',
						width : 160,
						sortable : true,
						renderer : function(value, cellmeta, record, rowIndex, columnIndex,store) {
                            var partId = record.get("id");
                            return value;
	                        //return "<a href=javascript:openSearchDataForExeWindow('"+partId+"','"+value+"')>"+"<font color='blue'><u>"+ value + "</u></font></a>";
                   		}
					}, {
						header : '项目名称',
						dataIndex : 'projectName',
						width : 160,
						sortable : true
					}, 
//						{
//						header : '项目类别',
//						dataIndex : 'projectcategorys',
//						width : 160,
//						sortable : true,
//						renderer : function(value){
//							if(value == 1){
//								return '新建';
//							}else if(value == 2){
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
							} else if (status == 2) {
								return '<font color="red">审批中</font>';
							} else if (status == 3) {
								return '<font color="green">已审批</font>';
							} else {
								return value;
							}
						}
					},{
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
						sortable : true,
						editor : new Ext.form.TextField()  //一般的编辑框
					}, {
						header : '使用单位',
						dataIndex : 'useunit',
						width : 100,
						sortable : true
					}, 
					{
						header : '规划文件下达日期<span style="color:red;">*</span>',
						dataIndex : 'planFileArrivalTime',
						width : 200,
						sortable : true,
						renderer:function(value){
									if(value instanceof Date){ 
										return new Date(value).format("Y-m-d"); 
									}else{ 
										return value; 
									}
						},
						editor : new Ext.form.DateField({
									format : 'Y-m-d'
						}),
						editable : true
					}, 
					{
						header : '规划方案及选址工作完成日期<span style="color:red;">*</span>',
						dataIndex : 'planLocationFinishTime',
						width : 200,
						sortable : true,
						editor : new Ext.form.DateField({
									format : 'Y-m-d'
								}),
						renderer:function(value){
									if(value instanceof Date){ 
										return new Date(value).format("Y-m-d"); 
									}else{ 
										return value; 
									}
						}
					},  
					{
						header : '初步建设方案完成日期<span style="color:red;">*</span>',
						dataIndex : 'buildingPlanFinishTime',
						width : 200,
						sortable : true,
						editor : new Ext.form.DateField({
									format : 'Y-m-d'
								}),
						renderer:function(value){
									if(value instanceof Date){ 
										return new Date(value).format("Y-m-d"); 
									}else{ 
										return value; 
									}
						}
					}, 
					{
						header : '规划许可证办理完成日期<span style="color:red;">*</span>',
						dataIndex : 'licenseFinishTime',
						width : 200,
						sortable : true,
						editor : new Ext.form.DateField({
									format : 'Y-m-d'
								}),
						renderer:function(value){
									if(value instanceof Date){ 
										return new Date(value).format("Y-m-d"); 
									}else{ 
										return value; 
									}
						}
					},
					{
						header : '施工设计完工日期<span style="color:red;">*</span>',
						dataIndex : 'constructionDesignFinishTime',
						width : 200,
						sortable : true,
						editor : new Ext.form.DateField({
									format : 'Y-m-d'
								}),
						renderer:function(value){
									if(value instanceof Date){ 
										return new Date(value).format("Y-m-d"); 
									}else{ 
										return value; 
									}
						}
					}, 
					{
						header : '招标控制价编制和审批日期<span style="color:red;">*</span>',
						dataIndex : 'approvalTime',
						width : 200,
						sortable : true,
						editor : new Ext.form.DateField({
									format : 'Y-m-d'
								}),
						renderer:function(value){
									if(value instanceof Date){ 
										return new Date(value).format("Y-m-d"); 
									}else{ 
										return value; 
									}
						}
					},
					{
						header : '施工总包招标定标工作完成日期<span style="color:red;">*</span>',
						dataIndex : 'tenderTime',
						width : 200,
						sortable : true,
						editor : new Ext.form.DateField({
									format : 'Y-m-d'
								}),
						renderer:function(value){
									if(value instanceof Date){ 
										return new Date(value).format("Y-m-d"); 
									}else{ 
										return value; 
									}
						}
					}, 
					{
						header : '合同签订日期<span style="color:red;">*</span>',
						dataIndex : 'contractSignedTime',
						width : 200,
						sortable : true,
						editor : new Ext.form.DateField({
									format : 'Y-m-d'
								}),
						renderer:function(value){
									if(value instanceof Date){ 
										return new Date(value).format("Y-m-d"); 
									}else{ 
										return value; 
									}
						}
					},  
					{
						header : '开工日期<span style="color:red;">*</span>',
						dataIndex : 'startWorkTime',
						width : 200,
						sortable : true,
						editor : new Ext.form.DateField({
									format : 'Y-m-d'
								}),
						renderer:function(value){
									if(value instanceof Date){ 
										return new Date(value).format("Y-m-d"); 
									}else{ 
										return value; 
									}
						}
					}, 
					{
						header : '主体验收日期<span style="color:red;">*</span>',
						dataIndex : 'mainAcceptanceTime',
						width : 200,
						sortable : true,
						editor : new Ext.form.DateField({
									format : 'Y-m-d'
								}),
						renderer:function(value){
									if(value instanceof Date){ 
										return new Date(value).format("Y-m-d"); 
									}else{ 
										return value; 
									}
						}
					}, 
					{
						header : '交付日期<span style="color:red;">*</span>',
						dataIndex : 'deliverTime',
						width : 200,
						sortable : true,
						editor : new Ext.form.DateField({
									format : 'Y-m-d'
								}),
						renderer:function(value){
									if(value instanceof Date){ 
										return new Date(value).format("Y-m-d"); 
									}else{ 
										return value; 
									}
						}
					}, 
					{
						header : '备注',
						dataIndex : 'remarke',
						width : 100,
						sortable : true
					},
					{
						header : '审批记录',
						dataIndex : '',
						width : 100,
						align : 'center',
						sortable : true,
						renderer : function(value, cellmeta, record, rowIndex) {
							var id = record.get('id');
							if (record.get('status') != 1) {
								return "<a href='javascript:void(0);' onclick=approvalInfoList.showWin('"+id+"')><font color=blue>查看</font></a>";
							}
						}
					}
					
		]);
		
		
		
		
		//上工具条1
		var tbar1 = new Ext.Toolbar({
		    items : [ '-', {
				text : '送审',
				disabled : main.EXECUTE,
				iconCls : 'icon-importTasks',
				handler : function() {
					
					var recs = grid.getSelectionModel().getSelections();
					if (recs.length == 0) {
						Ext.Msg.alert('提示', '请选择一条记录!');
						return false;
					}
					var arr = new Array();
					for (var i = 0; i < recs.length; i++) {
						var rec = recs[i];
						if (rec.get('status') != 1 &&rec.get('status') != '已退回') {
							Ext.Msg.alert('提示', '请选择"编制中"的数据!');
							return false;
						}
						arr.push(rec.get('id'));
					}
					
					
					//Ajax调用开始
					/*var getSelectStringUrl = "../JSON/engineeringProject_EngineeringProjectExecutiveManagementRemote.sendImplementPlan";
					var conn = synchronize.createXhrObject();
					conn.open('POST', getSelectStringUrl, false);// false同步,运行到此程序需要等待返回
					conn.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");// 如果想通过send发送参数,这个必须
					conn.send("dataJsonArray=" + Ext.util.JSON.encode(arr));
					// conn.send(null);
					if (conn.responseText == "success") {
						grid.store.load();
						XX.common.msg('消息', "<font color=green>下发成功!</font>");
					} else if (conn.responseText == "0") {
						XX.common.msg('消息', "<font color=red>下发失败!</font>");
					}		*/
					//Ajax调用结束
					//调用流程模板开始送审
					Untils.approvePanel.submit("489700", 
								        "工程项目执行管理", 
								        "工程项目执行管理", 
								        arr, 
										"ExecutiveManagement2", true, function() {
											//Ext.Msg.alert('提示', '送审成功!');
											
											grid.store.load();
											//grid.store.reload();
											/*contractManagement2.getStore().baseParams = { 
											                              start: 0, 
											                              limit: 25,
											                              time : contractManagement2.getSelectDate() == null ? 0 : contractManagement2.getSelectDate() };
											*/
											//contractManagement2.getStore().load();
											//contractManagement2.getStore().reload();
											
										}, function() {
												Ext.Msg.alert('提示', '提交失败!');
										});
				}
			}]
		});
		
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
						executiveManagement2.setSelectDate(selectDate);//保存到全局变量
						executiveManagement2.getStore().baseParams = { 
		                              start: 0, 
		                              limit: 25,
		                              time : executiveManagement2.getSelectDate() == null ? 0 : executiveManagement2.getSelectDate() };
						executiveManagement2.getStore().load();
					}
				}
			]
		});
				
		var tbar3 = [{
						xtype : 'deviceProjectDateComboxBox2',
						projectDataType : 2,
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
		}];
		
		
		//点击项目编号的弹出窗口
		openSearchDataForExeWindow = function(partId,value){
			executiveManagement2.selectRowId = partId;//保存点击ID到全局
			var recode = grid.getSelectionModel().getSelected();
            if(partId == null){
                Ext.Msg.alert("提示","请先选择一个'项目主管',已确保新增一条数据 !");
                return;
            }
            if(recode.get('projectManagerName') == null){
            	Ext.Msg.alert("提示","请先选择一个'项目主管',已确保新增一条数据 !");
            	return;
            }
			
			var win = new executiveManagement2.contractEditorWin({
								loadForm : function(mainForm, fileForm) {
									mainForm.getForm().loadRecord(recode);
									//fileForm.getForm().loadRecord(recode);
								}
							});//调用下面的命名空间的类创建窗口
            win.show();
   		}
		
		
		
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
			tbar :  { items : [tbar3,tbar1]}
		});
		
		
		executiveManagement2.mainGrid.superclass.initComponent.call(this);// 必须放在末尾,否则出错
	}
})
// 3、注册控件
Ext.reg('executiveManagement2MainGrid', executiveManagement2.mainGrid);// 第一个参数为自定义控件的xtype





































// 1、引入命名空间
Ext.namespace('executiveManagement2.contractEditorWin');
/*
 * 合同管理编辑窗口
 * 
 * @class contractManagement.contractEditorWin
 * @extends Ext.Window
 */
// 2、封装
executiveManagement2.contractEditorWin = Ext.extend(Ext.Window, {
	id : "extendWindowId",
	title : '固定资产验收申请表',
	width : 600,
	modal : true,//window显示时对其后面的一切内容进行遮罩
	constrainHeader : true,   //window头必须在窗口中
	maximizable : true,  //添加最大按钮
	// height : 300,
	// layout : 'fit',
	closeAction : 'close',//当关闭按钮被点击时执行的动作
    plain : false,//True表示为渲染window body的背景为透明的背景
    //items : importjyjh.getimportform(o)//formPanel
	buttonAlign :"right",
	// 窗口是否编辑(可修改)
	isEdit : true,
	// 页面加载时,加载窗口内的表单元素
	loadForm : function(form, fileForm) {
		
	},
	initComponent : function() {
	    var win = this;
		//获取选取行的ID
	    //alert(executiveManagement2.getTheRowId());
	    
	    
	    
////////////////////////////////////////新增选择审批人/////////////////////

//调用回调函数
selectUserPanel.callBack = function(){
	var dataStore = userMultiselect.usersore;
	//var store = Ext.getCmp('pingFenGrid').getStore();
	var theCmpId = executiveManagement2.theCmpId ;
	var outApprover = Ext.getCmp(theCmpId);
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
        //var record = dataStore.getAt(i);
		var data = new records({
			userid:userid,
			truename:truename
		});
        //records.set('userid',userid);
        //records.set('truename',truename);
		//store.add(data);
		outApprover.setValue(truename+"["+userid+"]");
	}
	Ext.getCmp('userMultiselectWindow').close();
}
////////////////////////////////////////新增选择审批人/////////////////////
	    
////////////////////////单位选择/////////////////////////////////////////////////////////////
//部门选择的下拉列表树
var comboBoxTree = new Ext.ux.ComboBoxTree({
	    id : "unitNameId",
		width : 350,
		fieldLabel : '单位名称',
		triggerAction : 'all',
		emptyText : '请选择机构!',
		style : 'margin-bottom: 2px;',
		tree : {
			xtype : 'treepanel',
			rootVisible : false,
			loader : new Ext.tree.TreeLoader({
						dataUrl : "../JSON/common_inst_InstSelectSvr.getMenuDatas"
					}),
			root : new Ext.tree.AsyncTreeNode({
						id : '0',
						text : '根结点'
					})
		},
		onViewClick : function(doFocus) {
			var index = this.view.getSelectedIndexes()[0], s = this.store, r = s.getAt(index);
			if (r) {
				this.onSelect(r, index);
			} else {
				// this.collapse();
			}
			if (doFocus !== false) {
				this.el.focus();
			}
		},

		// all:所有结点都可选中
		// exceptRoot：除根结点，其它结点都可选(默认)
		// folder:只有目录（非叶子和非根结点）可选
		// leaf：只有叶子结点可选
		selectNodeModel : 'all'
});

//添加选择事件
comboBoxTree.on('select', function(combo, record, index){
		//var instcode = record.id;
	    //var a = Ext.getCmp("equipreServiceGridPanelId").getSelectionModel().record;
	    //var b = Ext.getCmp("equipreServiceGridPanelId").getSelectionModel().getSelected();
	    //写法一
	    //equipreServiceGrid.RawText = comboBoxTree.getRawValue();//保存全局变量
	    //equipreServiceGrid.RawValue = comboBoxTree.getValue();//保存全局变量
	    //写法二
		//var a = Ext.getCmp('unitNameId').setTextValue("你妹");
		executiveManagement2.RawText = record.attributes.text;//保存全局变量
	    executiveManagement2.RawValue = record.attributes.id;//保存全局变量
		
});
////////////////////////单位选择/////////////////////////////////////////////////////////////
var datefield = new Ext.form.DateField({
				id : "inputDate",
                fieldLabel : '申请验收时间',
                emptyText : '请选择日期',
                format : 'Y-m-d',
                width : 200,
                editable:false//禁止手工修改  
});
	    



		Ext.applyIf(this, {
			items : [{
				xtype : 'form',
				id : 'contractEditorMainForm',
				border : false,
				items : [{
					xtype : 'panel',
					layout : 'column',
					border : false,
					items : [{
						xtype : 'panel',
						layout : 'form',
						columnWidth : .5,
						border : false,
						labelWidth : 100,
						bodyStyle : 'padding:5px;',
						defaults : {
							anchor : '95%'
						},
						items : [{
										xtype : 'hidden',
										id : 'uploadFileId',
										name : 'uploadFileId'
								 },
								 {
								 	xtype : 'hidden',
								    name : 'civilRegistId'
								 },
								 
							     {
									xtype : "textfield",
									fieldLabel : '项目编号',
									id : 'projectCode',
									name : 'projectCode',
									anchor : '98%',
									allowBlank : false,
									blankText : "不能为空",
									disabled : true,
									listeners : {
										afterrender : function(cmp) {
											cmp.el.on("click", function() {
														//projectMultiselect.init(selectProjectPanelCallBack);//调用回调函数
														projectMultiselect.init();
													})
										}
									}
								}, {
									xtype : "textfield",
									fieldLabel : '项目主管',
									id : 'projectManagerName',
									name : 'projectManagerName',
									anchor : '98%',
									allowBlank : false,
									blankText : "不能为空",
									disabled : true
								}, {
									xtype : "textfield",
									fieldLabel : '合同厂商',
									id : 'contractmanuFacturers',
									name : 'contractmanuFacturers',
									anchor : '98%',
									allowBlank : false,
									blankText : "不能为空",
									listeners : {
										afterrender : function(cmp) {
											cmp.el.on("click", function() {
														//projectMultiselect.init(selectProjectPanelCallBack);//调用回调函数
														vendorMultiselect.init();
													})
										}
									}
									
								}, {
									xtype : "textfield",
									fieldLabel : '厂商联系电话',
									id : 'contractmanuFacturersTel',
									name : 'contractmanuFacturersTel',
									anchor : '98%',
									disabled : true
								}]
								
					}, 
					//第二列
					{
						xtype : 'panel',
						layout : 'form',
						columnWidth : .5,
						border : false,
						labelWidth : 100,
						bodyStyle : 'padding:5px;',
						defaultType : 'textfield',
						defaults : {
							anchor : '95%'
						},
						items : [/*{
									xtype : "textfield",
									fieldLabel : '申请验收时间',
									id : 'applyAcceptanceTime',
									name : 'applyAcceptanceTime',
									anchor : '98%',
									allowBlank : false,
									blankText : "不能为空",
									disabled : false,
									listeners : {
										afterrender : function(cmp) {
											cmp.el.on("click", function() {
														//projectMultiselect.init(selectProjectPanelCallBack);//调用回调函数
														projectMultiselect.init();
													})
										}
									}
								}*/
								datefield
								, {
									xtype : "textfield",
									fieldLabel : '联系电话',
									id : 'tel',
									name : 'tel',
									anchor : '98%',
									allowBlank : true,
									blankText : "不能为空",
									disabled : false
								}, {
									xtype : "textfield",
									fieldLabel : '厂商联系人',
									id : 'contactPerson',
									name : 'contactPerson',
									anchor : '98%',
									disabled : true
								}
								]
					}]
				}, 
					
				{
					xtype : 'panel',
					border : false,
					bodyStyle : 'padding:5px;',
					items : [{
						xtype : 'fieldset',
						title : '主管单位意见',
						layout : 'column',
						items : [{
							xtype : 'panel',
							layout : 'form',
							columnWidth : .9,
							border : false,
							labelWidth : 40,
							defaults : {
								anchor : '95%'
							},
							items : [
							{
				             	    xtype : "textfield",
									fieldLabel : '意见',
									id : 'opinion',
									name : 'opinion',
									anchor : '98%',
									allowBlank : true,
									blankText : "不能为空"
				            }
							]
						}
						
						]
					}]
				}]
			}
			
			],
			buttons : [{
				text : '确定',
				handler : function() {
					var form1 = win.findById("contractEditorMainForm");
					var data = form1.getForm().getValues();
					if (!form1.getForm().isValid()) {
						return;
					}
					/*
					var form2 = win.findById("fileFormPanel");
					var data = form2.getForm().getValues();
					if (!form2.getForm().isValid()) {
						return;
					}*/

					
							//其次,保存剩余的表格
	
							
					
					
							var applyAcceptanceTime = Ext.getCmp('inputDate').value == undefined ? "" : Ext.getCmp('inputDate').value; //申请时间
							var projectManagerName = Ext.getCmp('projectManagerName').value ; //项目主管
							var tel = data.tel ; //联系电话
							var contractmanuFacturers = Ext.getCmp('contractmanuFacturers').value ;//厂商名称
							var contractmanuFacturersTel = Ext.getCmp('contractmanuFacturersTel').value ;//厂商联系电话
							var contactPerson = Ext.getCmp('contactPerson').value ;//厂商联系人
							var opinion = data.opinion;//意见
							var civilRegistId = data.civilRegistId;//外键的ID,这里保证一个外键只有一条 申请表记录
							var status = "1";//默认为1

							
							
							
							var getSelectStringUrl = "../JSON/engineeringProject_EngineeringProjectExecutiveManagementRemote.selectOrAdd";
							var conn = synchronize.createXhrObject();
							conn.open('POST', getSelectStringUrl, false);//false同步,运行到此程序需要等待返回
							conn.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");//如果想通过send发送参数,这个必须
							conn.send("applyAcceptanceTime=" + applyAcceptanceTime
									+"&projectManagerName=" + projectManagerName
									+"&tel=" + tel 
									+"&contractmanuFacturers="+ contractmanuFacturers 
									+"&contractmanuFacturersTel=" + contractmanuFacturersTel
									+"&contactPerson=" + contactPerson
									+"&opinion=" + opinion 
									+"&civilRegistId="+ civilRegistId 
									+"&status=" + status
									);
							//conn.send(null);
									
							//returnStringFinal = "0";// 新增成功
							//returnStringFinal = "2";// 错误2 插入数据库异常,需要检查
	    					//returnStringFinal = "1";// 错误1 有>=1条的数据了,不要再添加了
							if (conn.responseText == "0") {
								Ext.MessageBox.show({
											title : "提示",
											msg : "新增成功!",
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.INFO,
											maxWidth : 800,
											minWidth : 300
										});
								executiveManagement2.getStore().load({start : 0,limit : 25,time : 0});
								win.close();
								win.destroy();
							} else if (conn.responseText == "2") {
								Ext.MessageBox.show({
											title : "提示",
											msg : "插入数据库异常,需要检查运行情况!",
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.INFO,
											maxWidth : 800,
											minWidth : 300
								});
								return;
							} else if (conn.responseText == "1") {
								Ext.MessageBox.show({
											title : "提示",
											msg : "有一条或多条的申请单数据了,请确保每个项目对应一条申请单数据!",
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.INFO,
											maxWidth : 800,
											minWidth : 300
								});
								return;
							}


					

				}
			}, {
				text : '取消',
				handler : function() {
					win.close();
					win.destroy();
					//executiveManagement2.contractEditorWin.hide();
				}
			}]
		}
		);			
		
		executiveManagement2.contractEditorWin.superclass.initComponent.call(this);
	},
	onRender : function(ct, position) {// 扩展渲染,在内部函数的顶层,可以使用this对此对象的引用.注意,不要在镶嵌的函数层次太深,不然this就不是此对象,需要sope指定.
		executiveManagement2.contractEditorWin.superclass.onRender.call(this, ct,position);// 必须放在开始
		//this.loadForm(this.findById("contractEditorMainForm"), this.findById('fileFormPanel'));
		this.loadForm(this.findById("contractEditorMainForm"), "");
	}
})
// 3、注册控件
Ext.reg('executiveManagement2', executiveManagement2.contractEditorWin);// 第一个参数为自定义控件的xtype

