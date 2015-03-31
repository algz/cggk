//土建投资计划
var civilPurchasePlan = {

	getPanel : function(){
		var sm = new Ext.grid.CheckboxSelectionModel(); 
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
					'fileid','uploadfile','headperson','specialname',
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
			 { 
	            id : 'projectnum',
	        	header : "<font color='red'>项目编号*</font>",
				dataIndex : 'projectnum',
				sortable : true,
				width : 100,
				editor: new Ext.form.TextField({
                    allowBlank: false,
					disabled : main.leaderRole
                })
			 },{  
				id : 'costnum',
			    header : "<font color='blue'>费用编号*</font>",
				dataIndex : 'costnum',
				sortable : true,
				width : 100 ,
				editor: new Ext.form.TextField({
                    allowBlank: false,
					disabled : main.leaderRole
                })
			}, { 
				id : 'projectname',
				header : '项目名称',
			    dataIndex : 'projectname',
				sortable : true,
			    width : 100 
			},{ 
				id : 'headperson',
				header : '项目主管',
			    dataIndex : 'headperson',
				sortable : true,
			    width : 100 
			},{ 
		        id : 'fundsource',
		      //  header : '经营计划编号',
		        header : '资金来源',
				dataIndex : 'fundsource',
				sortable : true,
				width : 60
					 
			},{ 
		        id : 'specialname',
		        header : '专项名称',
				dataIndex : 'specialname',
				sortable : true,
				width : 100
					 
			},{ 
				id : 'approvalstate',
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
				id : 'categorys',
				header : '类别',
				dataIndex :'categorys',
				sortable : true,
				width : 60
			},{ 
				id : 'constructiontype',
				header : '建设性质',
				dataIndex : 'constructiontype',
				sortable : true,
				width : 60 
			},{ 
				id : 'nums',
				header : '数量',
				dataIndex : 'nums',
				sortable : true,
				width : 100 
			},{ 
				id : 'numsunit',
				header : '单位',
				dataIndex : 'numsunit',
				sortable : true,
				width : 50 
			},{ 
				id : 'investmentbudget',
				header : '投资概算',
				dataIndex : 'investmentbudget',
				sortable : true,
				width : 100 
			},{ 
				id : 'financeunit',
				header : '资金单位',
				dataIndex : 'financeunit',
				sortable : true,
				width : 60 
			},{ 
				id : 'totalinvestmentplan',
				header : "<font color='red'>累计完成投资*</font>",
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
				width : 100 ,
				editor: new Ext.form.TextField({
                    allowBlank: false,
                    regex : /^\d+(\.\d+)?$/,
                    regexText:"只能够输入正数字",
					disabled : main.leaderRole
                })
			},{ 
				id : 'constructionsite',
				header : '选址或施工地点',
				dataIndex : 'constructionsite',
				sortable : true,
				width : 100 
			},{ 
				id : 'schedule',
				header : '进度要求',
				dataIndex : 'schedule',
				sortable : true,
				width : 100 
			},{ 
				id : 'deliverytime',
				header : '交付时间',
				dataIndex : 'deliverytime',
				sortable : true,
				width : 100 ,
				editor : new Ext.form.DateField({
					format : "Y-m-d"
				})
			},{ 
				id : 'useunit',
				header : '使用单位',
				dataIndex : 'useunit',
				sortable : true,
				width : 100 
			},{ 
				id : 'mainuse',
				header : '主要用途',
				dataIndex : 'mainuse',
				sortable : true,
				width : 100 
			},{ 
				id : 'demandreason',
				header : '需求原因',
				dataIndex : 'demandreason',
				sortable : true,
				width : 100 
//				renderer : function(value, cellmeta, record, rowIndex){
//					var ID = record.get('fileid');
//					var ORIGINALNAME = record.get('uploadfile');
//					var name  = "";
//					if(ORIGINALNAME!=""){
//						name = "浏览";
//					}
//					var value = "<a href='../FILEDOWN/?ID="// 着用的是下载。需传值文件的id和文件名，才能查到
//							+ ID + "&ORIGINALNAME=" + encodeURI(encodeURI(ORIGINALNAME)) + "' cursor：hand>" +
//							"<font color='blue'>"+name+"</font></a>";
//					return value;
//				}
			},{ 
				id : 'createtime',
				header : '时间',
				dataIndex : 'createtime',
				sortable : true,
				width : 100 
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
			title : '土建采购计划',
			width : 300,
			id : 'civilPurchasePlanGrid',
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
								civilPurchasePlan.doApproval();
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
								$("<form action='../exportCivilPlanServlet' method='post'>"+input+"</form>")
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
			if(record.get('approvalstate')=="待审批"||record.get('approvalstate')=="已退回"){
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
			if(column == "deliverytime"){
				value = value.format("Y-m-d").toString();
				record.set('deliverytime',value);
			}
			var id = record.get('id');
			Ext.Ajax.request({  
				url: '../JSON/pePlanRemote.editCivilPurchasePlan',  
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
		var grid = Ext.getCmp('civilPurchasePlanGrid');
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
				rows[i].data.totalinvestmentplan==""||
				rows[i].data.annualinvestmentplan==""){
				flag = true;
				break;
			}
		}
		if(flag){
			Ext.MessageBox.alert("提示","数据不完整，不允许提交审批!");
		}else{
			approvePanel.submit("503203", "土建采购计划审批", "土建采购计划审批", id.substring(0,id.length-1), 
					"CivilPurchasePlan", true, civilPurchasePlan.approvePanelSuccess, civilPurchasePlan.approvePanelFailure);
	
		}
		
	},
	
	approvePanelSuccess : function(){
		var rows = Ext.getCmp("civilPurchasePlanGrid").getSelectionModel().getSelections();
		for(i=0;i < rows.length;i++){
			rows[i].set('approvalstate','审批中');
		} 
	},
	
	approvePanelFailure : function(){
		Ext.Msg.alert('提示', '没有送审权限！');
	}
}