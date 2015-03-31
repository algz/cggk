/** 
 * @author zhaodw
 * @version 1.0
 * @create 2011-11-21
 * 
 */
var venderAppraisalGrid = {
};

// 数据列表
venderAppraisalGrid.gridPanel = function() {
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var store = new Ext.data.Store(
			{
				proxy : new Ext.data.HttpProxy( {
					url : '../JSON/vendorAppraisalRemote.getGridData?d='
							+ new Date(),
					method : 'post'
				}),
				reader : new Ext.data.JsonReader( {
					root : 'results',
					id : 'vendorAppraisalId',
					totalProperty : 'totalProperty'
				}, [ 'vendorAppraisalId', 'appraisalName', 'appraisalNo','appraisalStatus',
				'createName','appraisalScore','appraisalComment','amount','createDate','scale',
				'businessScope','vendorName','vendorCode','vendorID','isExaminer'])
			});
	var cm = new Ext.grid.ColumnModel( [
//			sm,
			rm,
			{
				header : '考核表编号 ',
				dataIndex : 'appraisalNo',
				width : 100
			},			
			{
				header : '考核表名称',
				dataIndex : 'appraisalName',
				sortable : true
			},
			{
				header : '提交人 ',
				dataIndex : 'createName',
				width : 100,
				sortable : true
			},
			{
				header : '评分人数量',
				dataIndex : 'amount',
				width : 100,
				sortable : true
			},
			{
				header : '类别',
				dataIndex : 'appraisalStatus',
				width : 100,
				sortable : true,
				renderer:function(value){
					if(value==0){
						return "未考核";
					}else if(value==1){
						return "合格";
					}else if(value==2){
						return "试供";
					}else if(value==3){
						return "不合格";
					}else{
						return value;
					}
				}
			},
			{
				header : '时间',
				dataIndex : 'createDate',
				width : 100,
				sortable : true
			} ,
			{
				header : '评分', 
				width : 100,
				dataIndex : 'appraisalScore',
				sortable : true,
				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
				store) {  if(record.get('isExaminer')=="3"||record.get('isExaminer')=="0"){
					return "<a href=javascript:void(0); onclick=venderAppraisalAction.appraisalScore(); ><font color=blue>评分</font></a>"; 
				}else{
					return "";
				}
						
				}
			},
			 
			{
				header : '意见报告', 
				width : 100,
				dataIndex : 'appraisalComment',
				sortable : true,
				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
				store) {  
					 if(record.get('isExaminer')=="3"||record.get('isExaminer')=="1"){
return "<a href=javascript:void(0); onclick=venderAppraisalAction.appraisalContext(); ><font color=blue>意见报告</font></a>";  
				}else{
					return "";
				}
						
				}
			} ]);
	var tbar = [ '-', {
		text : '下发考核表',
		iconCls : 'Send',
		handler : function() {
			venderAppraisalForm.getForm().show();
		}
	} ,'-', {
		text : '查询',
		iconCls : 'Send',
		handler : function() {
			venderAppraisalQuery.getSearchForm().show();
		}
	}  ];
	var grid = common.gridPanel('venderAppraisalGridPanelId', cm, store, tbar, true, sm,
			'供应商信息'); 
	return grid;
}

venderAppraisalGrid.tabPanel = function() {
	var tab = new Ext.Panel( {
		title : '供应商考核',
		id : 'venderAppraisalGridTab',
		layout : 'fit',
		items : [ venderAppraisalGrid.gridPanel() ],
		listeners : {
			'activate' : function() {
			 
					Ext.getCmp('venderAppraisalGridPanelId').store.baseParams={start:0,limit:20};
					Ext.getCmp('venderAppraisalGridPanelId').store.load();
				
			}
		}
	});

	return tab;
};
