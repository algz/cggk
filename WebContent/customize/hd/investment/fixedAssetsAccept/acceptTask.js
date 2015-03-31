var acceptTask = {
	inputWidth:120,
	/**
	 * 缓存编号
	 * @type 
	 */
	acceptId:null,
	limit:6
};

acceptTask.acceptTaskType = function(){
	var data = [
		['1','设备'],
		['2','工程']
	]
	var fields = ['typeNum','typeName']
	
	var store = new Ext.data.SimpleStore({
		autoLoad:true,
		data:data,
		fields:fields
	})
	var selectTypeValue = new Ext.form.ComboBox({
		id:'acceptTaskTypeComboBox',
		name:'h_acceptType',
		fieldLabel:'类别(<font color="red">*</font>)',
		store:store,
		valueField : "typeNum",
		displayField : "typeName",
		//用form提交时为了获取valueField的值，必须添加此标识，且不能和name的值相同
		hiddenName:'acceptType',
		mode:'local',
		forceSelection : true,
		triggerAction : 'all',
		width:acceptTask.inputWidth,
		//校验是否为空
		allowBlank:false,
		blankText:"“类别”为必填", 
		readOnly:true,
		emptyText : '请选择...'
	});
	selectTypeValue.setValue(1);
	return selectTypeValue;
};

/**
 * 获取项目编号
 * @return {}
 */
acceptTask.selectAcceptNum = function(){
	
	var store = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : "../JSON/AcceptTaskForContractRemote.getTaskList",
			method:'POST'
		}),
		reader : new Ext.data.JsonReader({
			totalProperty : 'totalProperty',
			root : 'results'
			}, 
			[
//			{
//				name : 'acceptNum'
//			},
			{
				name : 'projectnum'
			},{
				name : 'projectname'
			}, {
				name : 'contractId'
			} ,{
				name : 'projectcategorys'
			}
//			,{name:'contractCode'}
			])
	});
	
//	store.load({
//					params:{
//						start:0,
//						limit:6
//					}
//				});
	
	var selectNumValue = new Ext.form.ComboBox({
		id:'selectAcceptNumComboBox',
		name:'t_acceptNum',
		hiddenName:'acceptNum',
		fieldLabel:'项目编号(<font color="red">*</font>)',
		store:store,
		valueField : "contractId",
		displayField : "projectnum",
		mode:'remote',
		pageSize:3,
		forceSelection : true,
		triggerAction : 'all',
		width:acceptTask.inputWidth,
		emptyText : '请选择...',
		//弹出选择添加缩放按钮
		resizable :true,
		//控制下拉列表的宽度
		minListWidth:acceptTask.inputWidth*2,
		//校验是否为空
		allowBlank:false,
		blankText:'必须有项目编号', 
		listeners : {
			'keyup':function(){
				store.baseParams.inputValue=this.getRawValue();
				store.load({
					params:{
						start:0,
						limit:acceptTask.limit
					}
				});
				this.expand();
			},
//			'select':function(combo, record, index){
//				//给合同编号框赋值
//				Ext.getCmp('contractCode').setValue(record.get('contractCode'));
//				acceptTask.acceptTaskMsg.getForm().findField('contractId').setValue(record.get('contractId'));
//			},
			'expand':function(){
				if(store.getCount()<=0){
					Ext.MessageBox.show({
								title : '提示信息',
								msg : '现在没有可用的项目编号！',
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.QUESTION
							});
					acceptTask.win.close();
				}
			},
			'select' : function(combo, record, index){
				var projectcategorys = record.get('projectcategorys')==1?'新建':'大修';
				Ext.getCmp('projectcategorys').setValue(projectcategorys);
			}
		}
	});
//	//默认加载数据
//	store.baseParams.inputValue=selectNumValue.getRawValue();
//				store.load({
//					params:{
//						start:0,
//						limit:6
//					}
//				});
	
	return selectNumValue;
};

acceptTask.createAcceptWin = function(){
	acceptTask.acceptTaskMsg = new Ext.form.FormPanel({
		frame:true,
		border:true,
		style:'border:none;',
		buttonAlign:'center',
		items:[
			{
				layout:'column',
				items:[
					{
						xtype:'textfield',
						fieldLabel:'合同编号(<font color="red">*</font>)',
						width:acceptTask.inputWidth,
						hidden:true,
						name:'contractId'
					},
					{
						columnWidth:.98,
						layout:'column',
						items:[
							{
								columnWidth:.49,
								layout:'form',
								items:[acceptTask.selectAcceptNum()]
							},{
								columnWidth :.49,
								layout : 'form',
								items : [{
									xtype : 'hidden',
									fieldLabel : '项目类别',
									id : 'projectcategorys',
									name : 'projectcategorys',
									readOnly : true
								}]
							}
//							,{
//								columnWidth:.49,
//								layout:'form',
//								items:[{
//									xtype:'textfield',
//									fieldLabel:'合同编号(<font color="red">*</font>)',
//									//设置了disabled为true后则不能使用表单提交
////									disabled:true,
//									readOnly:true,
//									width:acceptTask.inputWidth,
////									name:'contractId',
//									id:'contractCode'
//								}]
//							}
						]
					},{
						columnWidth:.98,
						layout:'column',
						items:[
							{
								columnWidth:.49,
								layout:'form',
								items:[acceptTask.acceptTaskType()]
							},{
								columnWidth:.49,
								layout:'form',
								items:[{
									xtype:'datefield',
									name:'acceptTime',
									fieldLabel:'创建时间',
									value:new Date(),
									format:'Y-m-d',
//									disabled:true,
									readOnly:true,
									width:acceptTask.inputWidth
								}]
							}
						]
					},{
						columnWidth:.98,
						layout:'column',
						items:[
							{
								columnWidth:.98,
								layout:'form',
								items:[{
									xtype:'textarea',
									name:'acceptNote',
									fieldLabel:'备注',
									width:acceptTask.inputWidth*3.3,
									maxLength:200, 
									maxLengthText:'最多只能输入200个字符。'
								}]
							}
						]
					}
				]
			}
		],
		buttons:[
			{
				text:'保存',
				handler:function(){
					//判断必填项是否有内容
					var form = acceptTask.acceptTaskMsg.getForm();
//					获取项目编号
					var pnum  = Ext.getCmp('selectAcceptNumComboBox').getRawValue();
					form.findField('contractId').setValue(pnum);
					if(form.isValid()){
						form.submit({
							url:'../JSON/AcceptTaskRemote.insertAcceptTask',
							method:'POST',
							failure:function(form,action){
								alert('失败');
							},
							success:function(form,action){
								acceptTask.win.close();
								
								var store = Ext.getCmp('acceptTaskGrid').store;
								//起始数
								var start = Ext.getCmp('acceptTaskGrid').getBottomToolbar().cursor;
								//每页显示总数
								var limit = Ext.getCmp('acceptTaskGrid').getBottomToolbar().pageSize;
								
								//添加默认参数
								store.baseParams.acceptNum=acceptTask.selectNum.getValue();
								store.baseParams.startTime=acceptTask.startTime.getValue();
								store.baseParams.endTime=acceptTask.endTime.getValue();
								//刷新表格
								store.reload({
									params:{
										start:start,
										limit:limit
									}
								});
							},
							params:{
								acceptId:acceptTask.acceptId
							}
						});
					}
				}
			},{
				text:'取消',
				handler:function(){
					acceptTask.win.close();
				}
			}
		]
	});
	
	acceptTask.win = new Ext.Window({
		title:'新建验收任务',
		width:600,
		minWidth:600,
		autoHeight:true,
		modal:true,
		items:[acceptTask.acceptTaskMsg]
	});
	acceptTask.win.show();
}

/**
 * 验证任务新建
 */
acceptTask.insertBtn = new Ext.Button({
	text:'新建',
	handler:function(){
		acceptTask.acceptId=null;
		acceptTask.createAcceptWin();
		Ext.getCmp('selectAcceptNumComboBox').store.load({
			params:{
				start:0,
				limit:acceptTask.limit
			}
		});
	}
});

/**
 * 验证任务修改
 */
acceptTask.updateBtn = new Ext.Button({
	text:'修改',
	handler:function(){
		var records = Ext.getCmp('acceptTaskGrid').getSelectionModel().getSelections();
		//判断是否有勾选
		if(records.length<=0||records.length>1){
			Ext.MessageBox.show({
								title : '提示信息',
								msg : '有且只有一条勾选内容才能进行此操作！',
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.ERROR
							});
		}else{
			if(records[0].get('acceptState')>1&&records[0].get('acceptType')=='1'){
				Ext.MessageBox.show({
					title : '提示信息',
					msg : '“设备”类别只有在“预验收”之前才能做修改操作！',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.INFO
				});
				return;
			}
			
			if(records[0].get('acceptState')>7&&records[0].get('acceptType')=='2'){
				Ext.MessageBox.show({
					title : '提示信息',
					msg : '“工程”类别只有在“资产交接”填写之前才能做修改操作！',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.INFO
				});
				return;
			}
			
			Ext.Ajax.request({
				url:'../JSON/AcceptTaskRemote.getOneAcceptTask',
				method:'POST',
				failure:function(){
					Ext.MessageBox.show({
								title : '提示信息',
								msg : '获取后台数据失败！',
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.ERROR
							});
				},
				success:function(response, options){
					var result = Ext.util.JSON.decode(response.responseText);
					var selectAcceptNumComboBox = Ext.getCmp('selectAcceptNumComboBox');
					//编号赋值
					acceptTask.acceptId=result.acceptId;
					acceptTask.createAcceptWin();
					if(result.success=='false'){
						//默认加载数据
//						selectAcceptNumComboBox.store.baseParams.inputValue=selectAcceptNumComboBox.getRawValue();
						Ext.getCmp('selectAcceptNumComboBox').store.load({
							params:{
								start:0,
								limit:acceptTask.limit
							}
						});
					}
					//给各输入框赋值
//					acceptTask.acceptTaskMsg.getForm().findField('acceptNum').setValue(result.acceptNum);
					acceptTask.acceptTaskMsg.getForm().findField('contractId').setValue(result.contractId);
					acceptTask.acceptTaskMsg.getForm().findField('acceptType').setValue(result.acceptType);
					acceptTask.acceptTaskMsg.getForm().findField('acceptTime').setValue(result.acceptTime);
					acceptTask.acceptTaskMsg.getForm().findField('acceptNote').setValue(result.acceptNote);
					
					//默认加载数据
//					selectAcceptNumComboBox.store.baseParams.inputValue=selectAcceptNumComboBox.getRawValue();
					Ext.getCmp('selectAcceptNumComboBox').store.load({
						params:{
							start:0,
							limit:acceptTask.limit
						},callback:function(){
							acceptTask.acceptTaskMsg.getForm().findField('acceptNum').setValue(result.acceptNum);
						}
					});
					
					//给合同编号框赋值
//					Ext.getCmp('contractCode').setValue(acceptTask.myContractCode(result.contractId));
				},
				disableCaching : true,
				autoAbort : true,
				params:{
					acceptId:records[0].get('acceptId')
				}
			});
		}
	}
});

acceptTask.myContractCode = function(contractId){
//	var url = '../JSON/AcceptTaskRemote.getContractCode?contractId='+contractId;
	var url = '../JSON/deviceContractmanagementRemote.getContractCode?contractid='+contractId;
	var conn = synchronize.createXhrObject();
	conn.open('GET', url, false);
	conn.send(null);
	return conn.responseText;
}

/**
 * 验证任务删除
 */
acceptTask.deleteBtn = new Ext.Button({
	text:'删除',
	handler:function(){
		var records = Ext.getCmp('acceptTaskGrid').getSelectionModel().getSelections();
		//判断是否有勾选
		if(records.length==0){
			Ext.MessageBox.show({
								title : '提示信息',
								msg : '必须有勾选内容才能进行此操作！',
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.ERROR
							});
		}else{
			var str='';
			//获取需要删除的编号
			for(var i=0;i<records.length;i++){
				if(records[i].get('acceptState')>1&&records[i].get('acceptType')=='1'){
				Ext.MessageBox.show({
						title : '提示信息',
						msg : '“设备”类别只有在“预验收”之前才能做修改操作！',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.INFO
					});
					return;
				}
				
				if(records[i].get('acceptState')>7&&records[i].get('acceptType')=='2'){
					Ext.MessageBox.show({
						title : '提示信息',
						msg : '“工程”类别只有在“资产交接”填写之前才能做修改操作！',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.INFO
					});
					return;
				}
				
				str = str+"\'"+records[i].get('acceptId')+"\'";
				if(i<records.length-1)
					str = str + ',';
			}
			Ext.Msg.confirm('提示信息','是否删除勾选的信息？',
				function(btn){
					if(btn=='yes'){
						Ext.Ajax.request({
							url:'../JSON/AcceptTaskRemote.removeAcceptTask',
							method:'POST',
							failure:function(){
								Ext.MessageBox.show({
											title : '提示信息',
											msg : '获取后台数据失败！',
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										});
							},
							success:function(response, options){
								//起始数
								var start = Ext.getCmp('acceptTaskGrid').getBottomToolbar().cursor;
								//每页显示总数
								var limit = Ext.getCmp('acceptTaskGrid').getBottomToolbar().pageSize;
								
								Ext.getCmp('acceptTaskGrid').store.reload({
									params:{
										start:start,
										limit:limit
									}
								});
							},
							disableCaching : true,
							autoAbort : true,
							params:{
								acceptIds:str
							}
						});
					}
				});
		}
	}
});

acceptTask.labelNum = new Ext.form.Label({
	text:'编号：',
	style:'margin-left:100px;'
});

/**
 * 查询输入的编号
 */
acceptTask.selectNum = new Ext.form.Field({
//	style:'margin-left:50px;'
});

acceptTask.labelStartTime = new Ext.form.Label({
	text:'时间：',
	style:'margin-left:30px;'
});

/**
 * 查询输入的开始时间
 */
acceptTask.startTime = new Ext.form.DateField({
});

acceptTask.labelEndTime = new Ext.form.Label({
	text:'至'
});

/**
 * 查询输入的结束时间
 */
acceptTask.endTime = new Ext.form.DateField({
});

acceptTask.selectBtn = new Ext.Button({
	text:'查询',
	style:'margin-left:30px;',
	handler:function(){
		var store = Ext.getCmp('acceptTaskGrid').store;
		//添加默认参数
		store.baseParams.acceptNum=acceptTask.selectNum.getValue();
		store.baseParams.startTime=acceptTask.startTime.getValue();
		store.baseParams.endTime=acceptTask.endTime.getValue();
		//刷新表格
		store.reload({
			params:{
				start:fixedAssetsAcceptMain.start,
				limit:fixedAssetsAcceptMain.limit
			}
		});
	}
});

acceptTask.defaultBtn = new Ext.Button({
	text:'重置',
	style:'margin-left:10px;',
	handler:function(){
		acceptTask.selectNum.setValue('');
		acceptTask.startTime.setValue('');
		acceptTask.endTime.setValue('');
	}
});

acceptTask.init = function(start,limit,selectType){
	var strurl = "";
	strurl = '../JSON/AcceptTaskRemote.getAcceptTask?a='+ new Date()+ '&selectType=' + selectType;

	var proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});
			
	//数据记录
	var record = new Ext.data.Record.create([
		 {name : 'acceptId'},
	     {name : 'acceptNum'},                                   
	     {name : 'contractId'},
    	 {name : 'acceptType'},
    	 {name : 'acceptState'},
	     {name : 'acceptTime',type:'date',dateFormat:'Y-m-d H:i:s.u'},
	     {name : 'acceptNote'},
	     'projectcategorys'
     ]);		
	
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'acceptId'
			},record);

	var ds = new Ext.data.Store({
				proxy : proxy,
				reader : reader,
				remoteSort : true
			});
	
	var sm = new Ext.grid.CheckboxSelectionModel();
	
	var cm = new Ext.grid.ColumnModel({
		columns:[
					new Ext.grid.RowNumberer(),
					sm,
					{
						header : '项目编号',
						dataIndex : 'acceptNum',
						width : 100
					},
//						{
//						header : '项目类别',
//						dataIndex : 'projectcategorys',
//						width : 100,
//						renderer:function(value){
//							if(value==1)
//								return result='设备新建';
//							else if(value==2)
//								return result='设备大修';					
//						}
//					},
						{
						header : '<div align="center">验收</div>',
//						dataIndex : 'amount',
						width : 400,
						renderer:function(value, cellmeta, record, rowIndex, columnIndex,store){
							var result='';
							if(record.get('acceptType')=='1'){
								if(record.get('acceptState')<9){
									result = '<div align="center">'
									if(record.get('acceptState')==1)
										result = result + '<a href="javascript:void(0)" onclick="beforehandTest.init(\''+record.get('acceptId')+'\')"><font color="green">预验收</font></a>'
									else if(1<record.get('acceptState'))
										result = result + '<a href="javascript:void(0)" onclick="beforehandTest.init(\''+record.get('acceptId')+'\')"><font color="blue">预验收</font></a>'
									else if(1>record.get('acceptState'))
										result = result + '<font color="red">预验收</font>'
									result = result +'<font color="blue">==></font>'
									if(record.get('acceptState')==2)
										result = result +'<a href="javascript:void(0)" onclick="fixCondition.init(\''+record.get('acceptId')+'\')"><font color="green">安装准备</font></a>'
									else if(2<record.get('acceptState'))
										result = result +'<a href="javascript:void(0)" onclick="fixCondition.init(\''+record.get('acceptId')+'\')"><font color="blue">安装准备</font></a>'
									else if(2>record.get('acceptState'))
										result = result + '<font color="red">安装准备</font>'
									result = result +'<font color="blue">==></font>'
									if(record.get('acceptState')==3)
										result = result +'<a href="javascript:void(0)" onclick="rendTest.init(\''+record.get('acceptId')+'\')"><font color="green">开箱验收</font></a>'
									else if(3<record.get('acceptState'))
										result = result +'<a href="javascript:void(0)" onclick="rendTest.init(\''+record.get('acceptId')+'\')"><font color="blue">开箱验收</font></a>'
									else if(3>record.get('acceptState'))
										result = result + '<font color="red">开箱验收</font>'
									result = result +'<font color="blue">==></font>'
									if(record.get('acceptState')==4||record.get('acceptState')==5)
										result = result +'<a href="javascript:void(0)" onclick="testCourse.init(\''+record.get('acceptId')+'\')")><font color="green">验收过程</font></a>'
									else if(4<record.get('acceptState'))
										result = result +'<a href="javascript:void(0)" onclick="testCourse.init(\''+record.get('acceptId')+'\')")><font color="blue">验收过程</font></a>'
									else if(5>record.get('acceptState'))
										result = result + '<font color="red">验收过程</font>'
									result = result +'<font color="blue">==></font>'
									if(record.get('acceptState')==6)
										result = result +'<a href="javascript:void(0)" onclick="lastTest.init(\''+record.get('acceptId')+'\')")><font color="green">最终验收</font></a>'
									else if(6<record.get('acceptState'))
										result = result +'<a href="javascript:void(0)" onclick="lastTest.init(\''+record.get('acceptId')+'\')")><font color="blue">最终验收</font></a>'
									else if(6>record.get('acceptState'))
										result = result + '<font color="red">最终验收</font>'
									result = result +'<font color="blue">==></font>'
									if(record.get('acceptState')==7||record.get('acceptState')==8)
										result = result +'<a href="javascript:void(0)" onclick="assetConnect.init(\''+record.get('acceptId')+'\')")><font color="green">资产交接</font></a>'
									else if(7<record.get('acceptState'))
										result = result +'<a href="javascript:void(0)" onclick="assetConnect.init(\''+record.get('acceptId')+'\')")><font color="blue">资产交接</font></a>'
									else if(8>record.get('acceptState'))
										result = result + '<font color="red">资产交接</font>'
									result = result +'</div>';
								}else{
									result = '<div align="center">'
										+'<a href="javascript:void(0)" onclick="beforehandTest.init(\''+record.get('acceptId')+'\')"><font color="blue">预验收</font></a>'
										+'<font color="blue">==></font>'
										+'<a href="javascript:void(0)" onclick="fixCondition.init(\''+record.get('acceptId')+'\')"><font color="blue">安装准备</font></a>'
										+'<font color="blue">==></font>'
										+'<a href="javascript:void(0)" onclick="rendTest.init(\''+record.get('acceptId')+'\')"><font color="blue">开箱验收</font></a>'
										+'<font color="blue">==></font>'
										+'<a href="javascript:void(0)" onclick="testCourse.init(\''+record.get('acceptId')+'\')")><font color="blue">验收过程</font></a>'
										+'<font color="blue">==></font>'
										+'<a href="javascript:void(0)" onclick="lastTest.init(\''+record.get('acceptId')+'\')")><font color="blue">最终验收</font></a>'
										+'<font color="blue">==></font>'
										+'<a href="javascript:void(0)" onclick="assetConnect.init(\''+record.get('acceptId')+'\')")><font color="blue">资产交接</font></a>'
										+'</div>';
								}
//								result = '<div align="center">'
//										+'<a href="javascript:void(0)" onclick="beforehandTest.init(\''+record.get('acceptId')+'\')">预验收</a>'
//										+'<font color="blue">==></font>'
//										+'<a href="javascript:void(0)" onclick="fixCondition.init(\''+record.get('acceptId')+'\')">安装准备</a>'
//										+'<font color="blue">==></font>'
//										+'<a href="javascript:void(0)" onclick="rendTest.init(\''+record.get('acceptId')+'\')">开箱验收</a>'
//										+'<font color="blue">==></font>'
//										+'<a href="javascript:void(0)" onclick="testCourse.init(\''+record.get('acceptId')+'\')")>验收过程</a>'
//										+'<font color="blue">==></font>'
//										+'<a href="javascript:void(0)" onclick="lastTest.init(\''+record.get('acceptId')+'\')")>最终验收</a>'
//										+'<font color="blue">==></font>'
//										+'<a href="javascript:void(0)" onclick="assetConnect.init(\''+record.get('acceptId')+'\')")>资产交接</a>'
//										+'</div>';
							}else if(record.get('acceptType')=='2'){
								if(record.get('acceptState')<9){
									result = '<div align="center">'
										+'<a href="javascript:void(0)" onclick="assetConnect.init(\''+record.get('acceptId')+'\')")><font color="green">资产交接</font></a>'
										+'</div>';
								}else{
									result = '<div align="center">'
										+'<a href="javascript:void(0)" onclick="assetConnect.init(\''+record.get('acceptId')+'\')")><font color="blue">资产交接</font></a>'
										+'</div>';
								}
//								result = '<div align="center">'
//										+'<a href="javascript:void(0)" onclick="assetConnect.init(\''+record.get('acceptId')+'\')")>资产交接</a>'
//										+'</div>';
							}
							return result;
						}
					},{
						header : '状态',
						dataIndex : 'acceptState',
						width : 100,
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
					},{
						header : '生成日期',
						dataIndex : 'acceptTime',
						width : 100,
						renderer:Ext.util.Format.dateRenderer('Y年m月d日')
					},{
						header : '进度',
						dataIndex : 'acceptNote',
						width : 100,
						renderer:function(value, cellmeta, record, rowIndex, columnIndex,store){
							return '<a href="javascript:void(0)" onclick="acceptTaskGantt.chart(\''+record.get('acceptId')+'\')")>进度视图</a>';
						}
					},{
						header : '备注',
						dataIndex : 'acceptNote',
						width : 100
					}
				]
	});
	acceptTask.insertBtn.disabled = main.CHECK;
	acceptTask.updateBtn.disabled = main.CHECK;
	acceptTask.deleteBtn.disabled = main.CHECK;
	var grid = new Ext.grid.GridPanel({
		title:'验收任务管理',
		id:'acceptTaskGrid',
		tbar:[acceptTask.insertBtn,'-',acceptTask.updateBtn,'-',acceptTask.deleteBtn
				,acceptTask.labelNum,acceptTask.selectNum,acceptTask.labelStartTime
				,acceptTask.startTime,acceptTask.labelEndTime,acceptTask.endTime
				,acceptTask.selectBtn,acceptTask.defaultBtn],
		store:ds,
		cm:cm,
		sm:sm,
		autoScroll : true,
		layout:'fit',
		trackMouseOver : true, // 鼠标放到行上是否有痕迹
		loadMask : {
			msg : '正在装载数据...'
		},
		//使用多层表头
//		view : new MyGridView(viewConfig),
		viewConfig : {
			forceFit : true,
			enableRowBody : true,
			showPreview : true
		},
		bbar : new Ext.PagingToolbar({ // 定义下方工作面板(分页效果)
			pageSize : limit,
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
	
	//添加默认参数
	ds.baseParams.acceptNum=acceptTask.selectNum.getValue();
	ds.baseParams.startTime=acceptTask.startTime.getValue();
	ds.baseParams.endTime=acceptTask.endTime.getValue();
	ds.load({
		params:{
			start:start,
			limit:limit
		}
	});
	
	return grid;
}