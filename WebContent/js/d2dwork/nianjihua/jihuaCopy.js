var planCopy = {};

planCopy.init = function(){
	
	planCopy.result = planOther.sm.getSelections();
	planCopy.sm = planOther.sm;
	
	if (!planCopy.sm.hasSelection()){
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam575')+'',
			msg: ''+getResource('resourceParam1516')+'',
			buttons: Ext.MessageBox.OK,
			icon: Ext.MessageBox.WARNING
		});
	}else{
		planAjax.copy(planCopy.result);
	}
}
