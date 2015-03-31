/**
 * 计划类别监控界面
 * @type 
 */
var planTypeInspect = {}

planTypeInspect.init = function(){
	
}

planTypeInspect.openNewPage = function(pageUrl,urlName){
	window.open('../base/center.jsp?'+pageUrl,urlName,
	'top=0,left=0,resizable=yes,scrollbars=yes,toolbar=yes,menubar=yes,alwaysRaised=yes,location=yes,status=yes,height='+(screen.availHeight-165)+',width='+(screen.availWidth-10));
}

//开始时间
planTypeInspect.strtTimePanel = function(){
	planTypeInspect.strtTime = new Ext.form.DateField({
	//	layout:'form',
		fieldLabel:'从',
		format:'Y年m月d日',
		width:200
	})
	return planTypeInspect.strtTime;
}

//结束时间
planTypeInspect.endTimePanel = function(){
	planTypeInspect.endTime = new Ext.form.DateField({
	//	layout:'form',
		fieldLabel:'至',
		format:'Y年m月d日',
		width:200
	})
	return planTypeInspect.endTime;
}

//执行分析操作的按钮
planTypeInspect.btn = function(){
	var btn = new Ext.Button({
		text:'分析',
		width:60,
		handler:function(){
			Ext.getCmp('planTypeInspectGrid').store.load({
				params:{
					dateStart:planTypeInspect.strtTime.getValue(),
					dateEnd:planTypeInspect.endTime.getValue()
				}
			});
			var startTime = planTypeInspect.strtTime.getValue();
			var endTime = planTypeInspect.endTime.getValue()
//			window.sTime = planTypeInspect.strtTime.getValue();
//			window.eTime = planTypeInspect.endTime.getValue();
			if(startTime == null||startTime==''){
				window.sTime = null;
			}
			else{ 
				//获取年月日来组成时间格式
				window.sTime = startTime.getFullYear()+'-'+(startTime.getMonth()+1)+'-'+startTime.getDate();
			}	
			if(endTime == null||endTime==''){
				window.eTime=null;
			}
			else{
				//获取年月日来组成时间格式
				window.eTime = endTime.getFullYear()+'-'+(endTime.getMonth()+1)+'-'+endTime.getDate();
			}	
			planTypeInspect.openNewPage('piechartPanel','计划类别饼图信息');
		}
	})
	return btn;
}

planTypeInspect.reset = function(){
	var btn = new Ext.Button({
		text:'重置',
		width:60,
		handler:function(){
			planTypeInspect.strtTime.setValue('');
			planTypeInspect.endTime.setValue('')
		}
	})
	return btn;
}

planTypeInspect.grid = function(){
	var strurl = "";
	strurl = '../JSON/PlanTypeInspectRemote.GetAllAmoteAndQuantity?a='+ new Date();

	var proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});
			
	//数据记录
	var record = new Ext.data.Record.create([
	     {name : 'type'},                                   
	     {name : 'rquantity'},
	     {name : 'quantityPercent'},                                   
	     {name : 'ramount'},
    	 {name : 'amountPercent'}
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
			header : '类别',
			dataIndex : 'type',
			width : 100,
			renderer:function(value, cellmeta, record, rowIndex, columnIndex,
					store){
				if(value == 1)
					return '计划内';
				else if(value == 2)
					return '应急';
				else if(value == 3)
					return '非应急';
			}
		},{
	    	header : '项数',
	    	dataIndex : 'rquantity',
	    	width : 100
		},{
			header : '项数百分比',
			dataIndex : 'quantityPercent',
			width : 100,
			renderer:function(value, cellmeta, record, rowIndex, columnIndex,
					store){
				return value+'%'
			}
		},{
			header : '金额（元）',
			dataIndex : 'ramount',
			width : 100
		},{
			header : '金额百分比',
			dataIndex : 'amountPercent',
			width : 100,
			renderer:function(value, cellmeta, record, rowIndex, columnIndex,
					store){
				return value+'%'
			}
		}
	]);
	var grid = new Ext.grid.GridPanel({
		id:'planTypeInspectGrid',
		title:'计划类别监控',
		tbar:['从：',planTypeInspect.strtTimePanel(),'<span style="margin-left:50px">至：</spzn>',
			planTypeInspect.endTimePanel(),'<span style="margin-left:50px"></spzn>',planTypeInspect.btn(),
			'<span style="margin-left:20px"></spzn>',planTypeInspect.reset()],
		store:ds,
		cm:cm,
		sm:sm,
		autoScroll : true,
//		width : '100%',
//		height : 285,
		region:'center',
		layout:'fit',
		trackMouseOver : true, // 鼠标放到行上是否有痕迹
		loadMask : {
			msg : '正在装载数据...'
		},
		viewConfig : {
			forceFit : true,
			enableRowBody : true,
			showPreview : true
		}
	});
	
//	ds.load();
	return grid;
}