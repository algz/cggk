//			[6].洪都固定资产投资预算汇总表
var stockSummary = {

	getPanel : function(){
		var sm = new Ext.grid.CheckboxSelectionModel(); 
		var store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						url : '../JSON/peSummaryRemote.getStockSummaryList?d='+new Date(),
						method : 'post'
					}),
			reader : new Ext.data.JsonReader({
						root : 'results',
						id : 'id',
						totalProperty : 'totalProperty'
					}, ['projectname','responsperson','supervisorengineer','directorleader',
					'investtotal','investcountry','investself','accuplantotal',
					'accuplancountry','accuplanself','accuinvesttotal','accuinvestcountry',
					'accuinvestself','annualinvesttotal','annualinvestcountry',
					{name : 'createtime' ,type : 'date',dateFormat : 'time',mapping : "createtime.time"},
					'annualinvestself','approvalstate','remark','id'])
		}); 
		
        var columns = null;
        
    	columns=[sm,
			new Ext.grid.RowNumberer({
				 header : "序号",
				 width : 40
			 }),  
			{header: "项目名称", sortable: true, dataIndex: 'projectname'},  
			{header: "状态", sortable: true, dataIndex: 'approvalstate',
				renderer : function(value, cellmeta, record, rowIndex) {
					if (record.get('approvalstate') == "1") {
						return "<font color = red>待审批</font>";
					}else if(record.get('approvalstate') == "-1"){
						return "<font color = red>已退回</font>";
					}else if(record.get('approvalstate') == "2"){
						return "审批中";
					}else{
						return "<font color = green>已审批</font>";
					}
				}
			},
			{header: "合计", sortable: true, dataIndex: 'investtotal'},
			{header: "国拨", sortable: true, dataIndex: 'investcountry'},
			{header: "自筹", sortable: true, dataIndex: 'investself'},  
			{header: "合计", sortable: true, dataIndex: 'accuplantotal'},
			{header: "国拨", sortable: true, dataIndex: 'accuplancountry'},
			{header: "自筹", sortable: true, dataIndex: 'accuplanself'}, 
			{header: "合计", sortable: true, dataIndex: 'accuinvesttotal'},
			{header: "国拨", sortable: true, dataIndex: 'accuinvestcountry'},
			{header: "自筹", sortable: true, dataIndex: 'accuinvestself'},
			{header: "合计", sortable: true, dataIndex: 'annualinvesttotal'},
			{header: "国拨", sortable: true, dataIndex: 'annualinvestcountry'},
			{header: "自筹", sortable: true, dataIndex: 'annualinvestself'}, 
			{header: "责任人<font color='red'>*</font>", sortable: true, dataIndex: 'responsperson',
				editor : new Ext.form.TextField({
					allowBlank: false
				})
			},  
			{header: "主管总师<font color='red'>*</font>", sortable: true, dataIndex: 'supervisorengineer',
				editor : new Ext.form.TextField({
					allowBlank: false
				})
			},  
			{header: "主管领导<font color='red'>*</font>", sortable: true, dataIndex: 'directorleader',
				editor : new Ext.form.TextField({
					allowBlank: false
				})
			},  
			{header: "时间", sortable: true, dataIndex: 'createtime',
				renderer : Ext.util.Format.dateRenderer('Y-m-d')
			},  
			{header: "审批记录", sortable: true, dataIndex: '',
				renderer : function(value, cellmeta, record, rowIndex) {
					var id = record.get('id');
					if (record.get('approvalstate') == "3"||record.get('approvalstate') == "-1") {
						return "<a href='javascript:void(0);' onclick = approvalInfoList.showWin('" + id + "')><font color=blue>查看</font></a>";
					}
				}
			},  
			{header: "备注", sortable: true, dataIndex: 'remark'}
		];  
		//分页工具栏   
		var paging = new Ext.PagingToolbar({
			store : store,
			pageSize : 20,
			displayInfo : true,
			displayMsg : '第 {0} 到 {1} 条，一共  {2} 条',
			emptyMsg : '没有记录'
		}); 
		var continentGroupRow=[
				{header:'',align: 'left',colspan: 4},
				{header:'总投资',align:'center',colspan:3},  
                {header:'截止上年累计下达计划',align:'center',colspan:3},  
                {header:'截止上年累计完成投资',align:'center',colspan:3},  
                {header:'本年计划投资',align:'center',colspan:3},  
                {header:'',align:'center',colspan:6}
        ];  
		var group = new Ext.ux.grid.ColumnHeaderGroup({  
        	rows: [continentGroupRow]  
        }); 
		var grid = new Ext.grid.EditorGridPanel({
			title : '洪都航空固定资产投资预算汇总表',
			width : 300,
			id : 'stockSummaryGrid',
			columns:columns,
			clicksToEdit : 1,
			sm : sm,
			columnLines : true,
			stripeRows : true,
			bbar : paging,
			region : 'center',
			store : store,
			plugins: group,
			loadMask : {
		    	 msg : '正在加载数据，请稍侯……'
		    },
			tbar : new Ext.Toolbar({
				items : ['-' ,{
							extype : 'button',
							text : '提交审批',
							disabled : main.leaderRole&&!main.directorRole,
							iconCls : 'icon-importTasks',
							handler : function(){
								stockSummary.doApproval();
							}
						},'-','项目名称:',{xtype:'textfield',id:'stockSummary_projectname'},{
							text : '查询',
							iconCls : 'search1',
							handler : function(){
								var store=grid.getStore()
								store.setBaseParam('projectname',Ext.getCmp('stockSummary_projectname').getValue());
								store.load();
							}
						}
				]})
		
		});
		grid.on('render', function(grid) {
         	var gridEl=grid.getEl();
            gridEl.select('div.x-grid3-hd-checker').removeClass('x-grid3-hd-checker');
     	});
		grid.on('activate', function() { 
			store.baseParams = {start:0,limit:20};
			store.reload();
		});
		grid.on('beforeedit',function(obj){
//			修改的列
			var record = obj.record;
			if(record.get('approvalstate')=="1"){
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
			Ext.Ajax.request({  
				url: '../JSON/peSummaryRemote.editStockSummary',  
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
		var grid = Ext.getCmp('stockSummaryGrid');
		var id = "";
 		var rows = grid.getSelectionModel().getSelections();// 返回值为 Record 数组
 		if(rows.length == 0){
		 	Ext.MessageBox.alert('提示', '请选择一条记录!'); 
			return;
		}
 		for(i = 0;i < rows.length;i++){   
			id = id + rows[i].get('id') + ",";
			var approvalState = rows[i].get('approvalstate');
			if(approvalState == '3' || approvalState == '2'){
				Ext.MessageBox.alert('提示', '请选择待审批记录!'); 
				return;
			}
		}
		approvePanel.submit("505800", "投资预算汇总审批", "投资预算汇总审批", id.substring(0,id.length-1), 
					"StockSummary", true, stockSummary.approvePanelSuccess, stockSummary.approvePanelFailure);
	
	},
	
	approvePanelSuccess : function(){
		var rows = Ext.getCmp("stockSummaryGrid").getSelectionModel().getSelections();
		for(i=0;i < rows.length;i++){
			rows[i].set('approvalstate','2');
		} 
	},
	
	approvePanelFailure : function(){
		Ext.Msg.alert('提示', '没有送审权限！');
	}
}