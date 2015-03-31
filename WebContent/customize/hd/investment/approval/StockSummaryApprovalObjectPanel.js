//投资计划汇总审批查看明细
StockSummaryApprovalObjectPanel = {};
StockSummaryApprovalObjectPanel.init = function(id){
var sm = new Ext.grid.CheckboxSelectionModel(); 
		var store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						url : '../JSON/peSummaryRemote.getStockSummaryById?d='+new Date(),
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
					'annualinvestself','createtime','approvalstate','remark','id'])
		}); 
		
        var columns = null;
        
    	columns=[
			new Ext.grid.RowNumberer({
				 header : "序号",
				 width : 40
			 }),  
			{header: "项目名称", sortable: true, dataIndex: 'projectname'},
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
			{header: "责任人", sortable: true, dataIndex: 'responsperson',
				editor : new Ext.form.TextField({
					allowBlank: false
				})
			},  
			{header: "主管总师", sortable: true, dataIndex: 'supervisorengineer',
				editor : new Ext.form.TextField({
					allowBlank: false
				})
			},  
			{header: "主管领导", sortable: true, dataIndex: 'directorleader',
				editor : new Ext.form.TextField({
					allowBlank: false
				})
			},  
			{header: "时间", sortable: true, dataIndex: 'createtime'},  
			{header: "状态", sortable: true, dataIndex: 'approvalstate',
				renderer : function(value, cellmeta, record, rowIndex) {
					if (record.get('approvalstate') == "1") {
						return "待审批";
					}else if(record.get('approvalstate') == "2"){
						return "审批中";
					}else{
						return "已审批";
					}
				}
			},  
			{header: "审批记录", sortable: true, dataIndex: '',
				renderer : function(value, cellmeta, record, rowIndex) {
					var id = record.get('id');
					if (record.get('approvalstate') == "3") {
						return "<a href='javascript:void(0);' onclick = approvalInfoList.showWin('" + id + "')><font color=blue>查看</font></a>";
					}
				}
			},  
			{header: "备注", sortable: true, dataIndex: 'remark'}
		];
		var continentGroupRow=[
				{header:'',align: 'left',colspan: 2},
				{header:'总投资',align:'center',colspan:3},  
                {header:'截止上年累计下达计划',align:'center',colspan:3},  
                {header:'截止上年累计完成投资',align:'center',colspan:3},  
                {header:'本年计划投资',align:'center',colspan:3},  
                {header:'',align:'center',colspan:7}
        ];  
		var group = new Ext.ux.grid.ColumnHeaderGroup({  
        	rows: [continentGroupRow]  
        }); 
		var grid = new Ext.grid.EditorGridPanel({
			title : '固定资产投资预算汇总表',
			width : 300,
			id : 'stockSummaryGrid',
			columns:columns,
			clicksToEdit : 1,
//			sm : sm,
			columnLines : true,
			stripeRows : true,
			region : 'center',
			store : store,
			plugins: group,
			loadMask : {
		    	 msg : '正在加载数据，请稍侯……'
		    }
		
		});
		
		store.baseParams = {start:0,limit:20,id : id};
		store.reload();
		
		return grid;
		
}