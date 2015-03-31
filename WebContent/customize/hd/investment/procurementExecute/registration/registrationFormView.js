var registrationFormView = {};
registrationFormView.getTab = function(rd,checkStatus,materialType){
	var tabPanel = new Ext.Panel({
		//activeTab : 0, 
		id : 'centerpanel',  
		width:500,  
		autoHeight:true,
		border:false,
		items:[registrationForm.getForm(rd,checkStatus,materialType)]
       // height:290,
		//items : [registrationForm.tabPanel(rd,checkStatus,materialType)/*,registrationNonMetallicForm.tabPanel(rd,checkStatus,materialType)*/]
	})
	
	//检验类别:1金属;2非金属
/*	if(materialType!='1')
		tabPanel.setActiveTab(1);*/
	return tabPanel;
}