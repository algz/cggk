var baowenCopy = {};

baowenCopy.week_init = function(){
	
	baowenCopy.result = baowenOther.sm_week.getSelections();
	baowenCopy.ds_week = baowenAjax.ds_week;
	baowenCopy.sm_week = baowenOther.sm_week;
	
	if (!baowenCopy.sm_week.hasSelection()){
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam575')+'',
			msg: ''+getResource('resourceParam1516')+'',
			buttons: Ext.MessageBox.OK,
			icon: Ext.MessageBox.WARNING
		});
	}else{
		baowenAjax.copy(baowenCopy.result, "0");
	}
}

baowenCopy.month_init = function(){
	
	baowenCopy.result = baowenOther.sm_month.getSelections();
	baowenCopy.ds_month = baowenAjax.ds_month;
	baowenCopy.sm_month = baowenOther.sm_month;
	
	if (!baowenCopy.sm_month.hasSelection()){
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam575')+'',
			msg: ''+getResource('resourceParam1516')+'',
			buttons: Ext.MessageBox.OK,
			icon: Ext.MessageBox.WARNING
		});
	}else{
		baowenAjax.copy(baowenCopy.result, "1");
	}
}
