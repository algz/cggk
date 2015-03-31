var declare_deparment_query_form = {}; 
declare_deparment_query_form.getSearchForm = function(){
 
	var items = [ {
		border : false, 
			border : false,  
			html:"&nbsp;&nbsp;&nbsp;&nbsp;部门：&nbsp;&nbsp;&nbsp;&nbsp;<input id = 'departmentName' style='width:200px'>"
	},
	{ 
			border : false,  
			html:"&nbsp;&nbsp;&nbsp;&nbsp;金额：&nbsp;&nbsp;&nbsp;&nbsp;<select id = 'r_totalAmount'><option value='>'>></option><option value='='>=</option>" +
					"<option value='<'><</option><option value='>='>>=</option><option value='<='><=</option></select><input id = 'totalAmount' style='width:160px'>"
		 
},  { 
			border : false,  
			html:"&nbsp;&nbsp;&nbsp;&nbsp;项数：&nbsp;&nbsp;&nbsp;&nbsp;<select id = 'r_totalCount'><option value='>'>></option><option value='='>=</option>" +
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
		var departmentName =document.getElementById('departmentName').value; 
		var grid = Ext.getCmp('declare_demartmentGrid');
		grid.getStore().baseParams = {start:0,limit:20,totalAmount:totalAmount,totalCount:totalCount
			,departmentName:departmentName};
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
		id : "declare_deparment_query_form",
		title : "查询页面",
		width : 350, 
		layout : 'fit',
		autoScroll : true, 
		modal : true,
		items : inform,
		autoDestory : true,
		closeAction :'close',
		buttons : buttons
	});
	return window;


}