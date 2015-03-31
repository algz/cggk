var gradeParticipant = {}

gradeParticipant.init = function(){

	var panel = new Ext.Panel({
		title:'参与人',
		titleAlign:'center',
		region:'east',
		width:280,
		layout:'fit',
		items:[gradeParticipant.grid()]
	})
	return panel;
}

gradeParticipant.grid = function(){
	var strurl = "";
	strurl = '../JSON/SelectGradePersonnelRemote.GetGradeParticipant?a='+ new Date();

	var proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});
			
	//数据记录
	var record = new Ext.data.Record.create([
		 {name : 'id'},
		 {name : 'expert_code'},  
	     {name : 'expert_name'},                                   
	     {name : 'project_name'},
	     {name : 'expertId'}
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
		sm,
		{
			header : '编号',
			dataIndex : 'expert_code',
			width : 100
		},{
	    	header : '名称',
	    	dataIndex : 'expert_name',
	    	renderer:function(value,cell){
				cell.attr =  'ext:qtitle="名称 ："'; 
				cell.attr += ' ext:qtip="'+ value + '"'; 
	            return value; 
			},
	    	width : 100
		}/*,{
			header : '专长方向',
			dataIndex : 'project_name',
			width : 100
		}*/
	]);
	var grid = new Ext.grid.GridPanel({
		id:'gradeParticipantGrid',
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
		}
	});
//	ds.load({
//		params:{
//			contract_id:
//		}
//	});
	return grid;
}