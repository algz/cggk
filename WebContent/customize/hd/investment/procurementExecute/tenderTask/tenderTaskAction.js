var tenderTaskAction = {
		
};
tenderTaskAction.showPanel=function(id){  
	var records = Ext.getCmp('tenderTaskGrid').getSelectionModel().getSelections();
	tenderTaskForm.getForm(id,records[0]).show();
}