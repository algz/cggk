var deletewenjuan = {};
deletewenjuan.deletewenjuan = function(){	
	if(diaochawj.row == null){
	  	return false;
	  }
	Ext.MessageBox.confirm('警告！', ''+getResource('resourceParam636')+'',function(btn, text){
	    if(btn == 'yes'){
		   callSeam("d2dwork_wenjuandc_wenjuandc_WenjuandcSvr","remove",[diaochawj.row.get('diaochId')],deletewenjuan.delwenjuan);
	    } 
	})		
};

deletewenjuan.delwenjuan = function(value){
	var sign = value;	
	if (sign==true){
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam637')+'',
			msg: ''+getResource('resourceParam884')+'!',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		});			
		diaochawj.loadvalue()				
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam638')+'',
			msg: ''+getResource('resourceParam885')+'!',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR 
		});
	}	
};
