var buinessPlanGrid = {
};
// 数据列表
buinessPlanGrid.gridPanel = function() {
	var rm = new Ext.grid.RowNumberer();
	var store = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : '../JSON/buinessPlanRemote.getGridData',
			method : 'post'
		}),
		reader : new Ext.data.JsonReader( {
			root : 'results',
			id : 'id',
			totalProperty : 'totalProperty'
		},
				[ 'buinessPlanId', 'author', 'createDate',
						'planType', 'issuedDate', 'planStatus','planType',
						'remarks', 'buinessPlanName','planStatusName','trueUserName'])
	});
	var cm = new Ext.grid.ColumnModel( [ rm, {
		header : '名称',
		dataIndex : 'buinessPlanName',
		width : 200,
		sortable : true,
		renderer : function(value, cellmeta, record,rowIndex) { 
		//record为grid的当前记录，cellmeta列号，rowIndex行号，value显示值
			var id = record.get("buinessPlanId"); 
			var planType=record.get('planType');
			alert(planType)
			return "<a href='javascript:void(0);' onclick=buinessPlanAction.showPlanDetail('"+id+"','"+value+ "','"+planType+"')><font color=blue>"+value+"</font></a>";
			}
	}, {
		header : '编制人',
		dataIndex : 'trueUserName',
		width : 100,
		sortable : true
	}, {
		header : '编制日期',
		dataIndex : 'createDate',
		width : 100,
		sortable : true
	}, {
		header : '编制状态',
		dataIndex : 'planStatusName',
		width : 100,
		sortable : true
	},{
		header : '计划类型',
		dataIndex : 'planType',
		width : 100,
		sortable : true,
		renderer:function(value){
			if(value==1){
				return "预拨计划";
			}else if(value==2){
				return "调整计划";
			}else if(value==3){
				return "临批计划";
			}else{
				return value;
			}
		}
	}, {
		header : '下发日期',
		dataIndex : 'issuedDate',
		width : 100,
		sortable : true
	}]);
	var tbar = [ '-', {
		text : '导入',
		iconCls : 'Import',
		handler : function() {
		buinessPlanAction.upload();
		}
	},{
		text : '下载导入模板',
		iconCls : 'Import',
		handler : function() {
			window.location.href="../BuinessPlanDownloadServlet";
		}
	}  ];
	var grid = common.gridPanel('buinessPlanGridPanelId', cm, store, tbar, true,
			null,'年度经营计划'); 
	return grid;
}
buinessPlanGrid.tabPanel = function() {
	var tab = new Ext.Panel({
				title : '年度经营计划',
				id : 'buinessPlanGridTab', 
				layout : 'fit',
				items : [buinessPlanGrid.gridPanel()],
				listeners : {
					'activate' : function() {
						Ext.getCmp('buinessPlanGridPanelId').store.baseParams={start:0,limit:20};
						Ext.getCmp('buinessPlanGridPanelId').store.load();
					}
				}
 
			});

	return tab;
}; 
