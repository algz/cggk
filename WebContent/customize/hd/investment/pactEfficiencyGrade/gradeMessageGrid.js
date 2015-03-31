/**
 * 评分信息表
 * @type 
 */
var gradeMessageGrid = {
	start:null,
	limit:null
}

gradeMessageGrid.init = function(contractId,contractCode,contractName){
	gradeMessageGrid.start=0;
	gradeMessageGrid.limit=10;
	
	var grid = gradeMessageGrid.grid(gradeMessageGrid.start,gradeMessageGrid.limit)
	
	//传递加载时需要的参数
	Ext.getCmp('gradeMessageGrid').store.baseParams.contractId=contractId;
	//加载grid的Load
	Ext.getCmp('gradeMessageGrid').store.load({
		params:{
			start:gradeMessageGrid.start,
			limit:gradeMessageGrid.limit
		}
	})
	
	var panel = new Ext.Panel({
//		title:'评分信息界面',
		tbar:['合同编号：<font color="red">'+contractCode+'</font><font style="margin-left:100px;">合同名称：</font><font color="red">'+contractName+'</font>'],
		layout:'fit',
		items:[grid]
	})
	
	wind = new Ext.Window({
		width : 650,
		height : 380,
		layout:'fit',
		autoScrool:true,
		title : '评分信息界面',
		modal : true,
		//弹窗按钮的显示位置
		buttonAlign:'center',
		//防止窗口超出浏览器
		constrain:true,
		closeAction:'hide',
		items : [panel],
		buttons:[
		{
			text:'返回',
			handler:function(){
				wind.hide();
			}
		}
		],
		resizable : false
	})
	wind.show();
}

gradeMessageGrid.grid = function(start,limit){
	var strurl = "";
	strurl = '../JSON/SelectGradePersonnelRemote.GetAnalysisDetailForGrade?a='+ new Date();

	var proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});
			
	//数据记录
	var record = new Ext.data.Record.create([
		 {name : 'id'},
		 {name : 'efficiency_analysis_id'},  
	     {name : 'scorer'},                                   
	     {name : 'ratio_price'},
	     {name : 'quantity_ratio'},
	     {name : 'commit_date_ratio'},
		 {name : 'get_way_retio'},  
	     {name : 'contract_sign_ratio'},                                   
	     {name : 'satisfy_ratio'},
	     {name : 'score_explain'},
	     {name : 'composite_score'},
	     'expert_name'
     ]);		
	
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'taskId'
			},record);

	var ds = new Ext.data.Store({
				proxy : proxy,
				reader : reader,
				remoteSort : true
			});
	
	var sm = new Ext.grid.CheckboxSelectionModel();
	
	var cm = new Ext.grid.ColumnModel([
		new Ext.grid.RowNumberer(),
//		sm,
		{
			header : '评分人',
			dataIndex : 'expert_name',//'scorer',
			width : 100
		},{
	    	header : '性价比',
	    	dataIndex : 'ratio_price',
	    	
	    	width : 100
		},{
			header : '质量',
			dataIndex : 'quantity_ratio',
			width : 100
		},{
			header : '交货方式',
			dataIndex : 'commit_date_ratio',
			width : 100
		},{
	    	header : '采购合同',
	    	dataIndex : 'get_way_retio',
	    	width : 100
		},{
			header : '合同方式',
			dataIndex : 'contract_sign_ratio',
			width : 100
		},{
			header : '用户满意度',
			dataIndex : 'satisfy_ratio',
			width : 100
		},{
			header : '合计',
			dataIndex : 'composite_score',
			width : 100
		}
	]);
	var grid = new Ext.grid.GridPanel({
		id:'gradeMessageGrid',
		store:ds,
		cm:cm,
		sm:sm,
		autoScroll : true,
//		region:'center',
		layout:'fit',
		trackMouseOver : true, // 鼠标放到行上是否有痕迹
		loadMask : {
			msg : '正在装载数据...'
		},
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
//	ds.load({
//		params:{
//			contract_id:
//		}
//	});
	return grid;
}