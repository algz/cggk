var deletesubsystem = {};
deletesubsystem.deletesubsystem = function(){
	if(myGrid.row == null){
	  	return false;
	  }
	Ext.MessageBox.confirm(getResource('resourceParam1724')/*'警告！'*/, ''+getResource('resourceParam636')+'',function(btn, text){
	    if(btn == 'yes'){
		    Seam.Component.getInstance("base_subsystem_SubSystemSerivce").deleteSystem(myGrid.row.get('subSystemId'),deletesubsystem.delSystem); 
	    } 
	})		
};
deletesubsystem.delSystem = function(returnvo){	
	if (returnvo.sign==true){
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam637')+'',
			msg: returnvo.value,
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		});			
		subsystem.loadvalue();				
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam638')+'',
			msg: returnvo.value,
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR 
		});
	}	
};
