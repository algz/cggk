SpecialProjectApprovalObjectPanel = {};
SpecialProjectApprovalObjectPanel.init = function(id){

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
					'nums','replyprice','replybidding','contractmoney',
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
            {id : 'equipname',header : '设备名称',dataIndex : 'equipname',sortable : true,width : 120}, 
            {id : 'technicaldepthead',header : '技改部负责人',dataIndex : 'technicaldepthead',sortable : true,width : 130},
            {id : 'maintechnicalindex',header : '主要技术指标',dataIndex : 'maintechnicalindex',sortable : true,width : 120},
            {id : 'manufacture',header : '参考厂商或国别',dataIndex : 'manufacture',sortable : true,width : 120 },
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
		    }
		
		});
		store.baseParams = {start:0,limit:20,id : id};
		store.reload();
		return grid;
}