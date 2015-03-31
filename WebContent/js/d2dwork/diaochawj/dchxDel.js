var deletedchx = {};
deletedchx.deletedchx = function(){	
	if(diaochaxiang.row == null){
	  	return false;
	  }
	Ext.MessageBox.confirm('警告！', ''+getResource('resourceParam636')+'',function(btn, text){
	    if(btn == 'yes'){
		    diaochaxiang.ds.remove(diaochaxiang.row);
		    diaochaxiang.grid.doLayout();
	    } 
	})		
};
