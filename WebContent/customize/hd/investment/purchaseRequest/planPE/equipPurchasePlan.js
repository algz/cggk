//设备投资采购计划
var equipPurchasePlan = {

	getPanel : function(){
		var sm = new Ext.grid.CheckboxSelectionModel(); 
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
					'installsite','installcondition','mainuse','annualinvestmentplan',
					'demandreason','categorys','approvalstate','createtime',
					'remarke','uploadfile','id','projectnum','costnum',
					'investmentplan','fundsource','totalinvestmentplan',
					'annualbudget','fileid','headperson','specialname'])
		});
		//分页工具栏   
		var paging = new Ext.PagingToolbar({
			store : store,
			pageSize : 20,
			displayInfo : true,
			displayMsg : '第 {0} 到 {1} 条，一共  {2} 条',
			emptyMsg : '没有记录'
		}); 
		var cm = new Ext.grid.ColumnModel([sm, { 
	        	header : "<font color='red'>项目编号*</font>",
				dataIndex : 'projectnum',
				id : 'projectnum',
				sortable : true,
				width : 100,
				editor: new Ext.form.TextField({
                    allowBlank: false,
					disabled : main.leaderRole
                })
			 },{  
			    header : "<font color='blue'>费用编号*</font>",
			    id : 'costnum',
				dataIndex : 'costnum',
				sortable : true,
				width : 100 ,
				editor: new Ext.form.TextField({
                    allowBlank: false,
					disabled : main.leaderRole
                })
			},{ 
				header : '项目名称',
			    dataIndex : 'projectname',
				sortable : true,
			    width : 100 
			},{ 
				header : '项目主管',
			    dataIndex : 'headperson',
				sortable : true,
			    width : 100 
			},{ 
		        header : '资金来源',
				dataIndex : 'fundsource',
				sortable : true,
				width : 60
					 
			},{ 
		        header : '专项名称',
				dataIndex : 'specialname',
				sortable : true,
				width : 100
					 
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
			},{ 
				header : '参考型号',
				dataIndex : 'referencemodel',
				sortable : true,
				width : 100 
			},{ 
				header : '主要性能参数及配置',
				dataIndex : 'mainparam',
				sortable : true,
				width : 100 
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
				id : 'investmentplan',
				header : "<font color='red'>投资计划额*</font>",
				dataIndex : 'investmentplan',
				sortable : true,
				width : 100,
				editor: new Ext.form.TextField({
                    allowBlank: false,
                    regex : /^\d+(\.\d+)?$/,
                    regexText:"只能够输入正数字",
					disabled : main.leaderRole
                })
			},{ 
				header : "<font color='red'>累计完成投资*</font>",
				id : 'totalinvestmentplan',
				dataIndex : 'totalinvestmentplan',
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
				header : "<font color='red'>本年预算*</font>",
				dataIndex : 'annualinvestmentplan',
				sortable : true,
				width : 100,
				editor: new Ext.form.TextField({
                    allowBlank: false,
                    regex : /^\d+(\.\d+)?$/,
                    regexText:"只能够输入正数字",
					disabled : main.leaderRole
                })
			},{ 
				header : '进度要求',
				dataIndex : 'schedule',
				sortable : true,
				width : 100 
			},{ 
				header : "<font color='red'>交付时间*</font>",
				dataIndex : 'deliverytime',
				sortable : true,
				width : 100 ,
				editor : new Ext.form.DateField({
					disabled : main.leaderRole
				})
			},{ 
				header : '安装地点',
				dataIndex : 'installsite',
				sortable : true,
				width : 100 
			},{ 
				header : '安装条件',
				dataIndex : 'installcondition',
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
			},{ 
				id : 'remark',
				header : '审批记录',
				dataIndex : 'remark',
				sortable : true,
				width : 60,
				renderer : function(value, cellmeta, record, rowIndex) {
					var id = record.get('id');
					if (record.get('approvalstate') == "已审批"||record.get('approvalstate') == "已退回") {
						return "<a href='javascript:void(0);' onclick = approvalInfoList.showWin('" + id + "')><font color=blue>查看</font></a>";
					}
				} 
			}
			
			
		]);
		var grid = new Ext.grid.EditorGridPanel({
			title : '设备采购计划',
			width : 300,
			id : 'equipPurchasePlanGrid',
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
				items : ['-' ,{
							extype : 'button',
							text : '提交审批',
							disabled : main.leaderRole,
							iconCls : 'icon-importTasks',
							handler : function(){
								equipPurchasePlan.doApproval();
							}
						},'-',{
							extype : 'button',
							text : '导出',
							disabled : main.leaderRole,
							handler : function(){
								var jsonArray = new Array();
								store.each(function(record){
									jsonArray.push(record.data);
								})
								var input = "<input type='hidden' name='json' value='"+Ext.encode(jsonArray)+"'/>";
								$("<form action='../exportEquipPlanServlet' method='post'>"+input+"</form>")
									.appendTo('body').submit().remove();
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
			if(record.get('approvalstate')=="待审批"){
				return true;
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
			if(column == "deliverytime"){
				value = value.format("Y-m-d").toString();
				record.set('deliverytime',value);
			}
			
			Ext.Ajax.request({  
				url: '../JSON/pePlanRemote.editEquipPurchasePlan',  
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
	
	doApproval : function(){
		var grid = Ext.getCmp('equipPurchasePlanGrid');
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
			if(approvalState == '已审批' || approvalState == '审批中'){
				Ext.MessageBox.alert('提示', '请选择待审批记录!'); 
				return;
			}
			if(rows[i].data.projectnum==""||
				rows[i].data.investmentplan==""||
				rows[i].data.totalinvestmentplan==""||
				rows[i].data.annualinvestmentplan==""||
				rows[i].data.deliverytime==""){
				flag = true;
				break;
			}
		}
		
		if(flag){
			Ext.MessageBox.alert("提示","数据不完整，不允许提交审批!");
		}else{
			approvePanel.submit("503203", "设备采购计划审批", "设备采购计划审批", id.substring(0,id.length-1), 
					"EquipPurchasePlan", true, equipPurchasePlan.approvePanelSuccess, equipPurchasePlan.approvePanelFailure);
	
		}
		
	},
	
	approvePanelSuccess : function(){
		var rows = Ext.getCmp("equipPurchasePlanGrid").getSelectionModel().getSelections();
		for(i=0;i < rows.length;i++){
			rows[i].set('approvalstate','审批中');
		} 
	},
	
	approvePanelFailure : function(){
		Ext.Msg.alert('提示', '没有送审权限！');
	}
}