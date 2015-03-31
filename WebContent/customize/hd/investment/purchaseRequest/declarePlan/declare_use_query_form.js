var declare_use_query_form = {}; 
declare_use_query_form.getSearchForm = function(){
 
	var items = [  
	{
	        border : false,  
			html:"&nbsp;&nbsp;&nbsp;&nbsp;采购用途：&nbsp;&nbsp;&nbsp;&nbsp;<select id='use1'  style='width:200px'><option vlaue=''>全部</option>" +
					"<option vlaue='批产用（备注机型）'>批产用（备注机型）</option>" +
					"<option vlaue='科研用（备注项目）'>科研用（备注项目）</option>" +
					"<option vlaue='生产准备'>生产准备</option>" +
					"<option vlaue='办公耗材'>办公耗材</option>" +
					"<option vlaue='生产补料'>生产补料</option>" +
					"<option vlaue='备件（备注型号）'>备件（备注型号）</option>" +
					"<option vlaue='试验用（备注机型或项目）'>试验用（备注机型或项目）</option>" +
					"<option vlaue='工装用（备注具体项目）'>工装用（备注具体项目）</option>" +
					"<option vlaue='典型试飞'>典型试飞</option>" +
					"<option vlaue='技改大修'>技改大修</option>" +
					"<option vlaue='日常管理（备注具体用途）'>日常管理（备注具体用途）</option>" +
					"<option vlaue='其他'>其他</option></select>"
	},
	{ 
			border : false,  
			html:"&nbsp;&nbsp;&nbsp;&nbsp;金额：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<select id = 'r_totalAmount'><option value='>'>></option><option value='='>=</option>" +
					"<option value='<'><</option><option value='>='>>=</option><option value='<='><=</option></select><input id = 'totalAmount' style='width:160px'>"
		 
},  { 
			border : false,  
			html:"&nbsp;&nbsp;&nbsp;&nbsp;项数：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<select id = 'r_totalCount'><option value='>'>></option><option value='='>=</option>" +
					"<option value='<'><</option><option value='>='>>=</option><option value='<='><=</option></select><input id = 'totalCount' style='width:160px'>"
		 
}]; 

	var inform = new Ext.FormPanel( {
		id : 'productFrom', 
		buttonAlign : 'center',
		labelAlign : 'right', 
		autoHeight : true, 
		frame : false,
		items : items,
		width : 350,
		height : 150
	});
	
	var buttons = [ {
		text : ' 确定 ',
		handler : function() { 
			var totalAmount = ''; 
		if(document.getElementById("totalAmount").value!=null && document.getElementById("totalAmount").value != '')
			totalAmount =document.getElementById("r_totalAmount").value+document.getElementById("totalAmount").value;
		var totalCount  = '';
		if(document.getElementById("totalCount").value != null && document.getElementById("totalCount").value != '')
			 totalCount = document.getElementById("r_totalCount").value+document.getElementById("totalCount").value;
		var dom=document.getElementById('use1'); 
		var use1 =dom.options[dom.selectedIndex].text;
		var grid = Ext.getCmp('declare_useGrid');
		grid.getStore().baseParams = {start:0,limit:20,totalAmount:totalAmount,totalCount:totalCount
			,use:use1};
		grid.store.load();
		window.close();

	}
	}, {
		text : '取消',
		handler : function() {
			inform.getForm().reset();
			window.close();
		}
	} ]

	var window = new Ext.Window( {
		id : "declare_query_form_win",
		title : "查询页面",
		width : 350,
		layout : 'fit',
		autoScroll : true, 
		modal : true,
		items : inform,
		autoDestory : true,
		buttons : buttons,
		closeAction :'close'
	});
	return window;


}