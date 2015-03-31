Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var resetpasswordlist = {
	
	
};
resetpasswordlist.resetpasswordlist = function() {
	resetpasswordlist.userids = user.useridall();
	if (resetpasswordlist.userids == "false") {
		Ext.MessageBox.alert(''+getResource('resourceParam508')+'', ''+getResource('resourceParam904')+'');
		return false;
	}
	if (resetpasswordlist.userids == "admin") {
		Ext.MessageBox.alert(''+getResource('resourceParam508')+'', ''+getResource('resourceParam902')+'');
		return false;
	}
	Ext.MessageBox.confirm(''+getResource('resourceParam4015')+'',''+getResource('resourceParam6085')+getResource('resourceParam6065')+getResource('resourceParam925')+getResource('resourceParam6066')+getResource('resourceParam1531')+"(123456)"+'',yesOrNo)
	
	function yesOrNo(id){
		 if(id == 'yes'){
	    	var userVo = Seam.Remoting.createType("com.luck.itumserv.base.user.GuserVo");
	    	userVo.setUserids(resetpasswordlist.userids);
		    Seam.Component.getInstance("user_Remote").resetPasswordList(userVo,successOrFailure); 
	    } 
	}
	
}
function successOrFailure(value){
		if (value==true){
			Ext.example.msg("" + getResource('resourceParam575') + "",""+getResource('resourceParam3002')+"!");	
			user.sm.clearSelections();
			user.baseargs={start:0,limit:25}
			myGrid.loadvalue(user.grid.store,user.baseargs,null);			
		}else{
			Ext.MessageBox.show({
				title: ''+getResource('resourceParam651')+'',
				msg: ''+getResource('resourceParam1177')+'!',
				buttons: Ext.MessageBox.OK,
			    icon: Ext.MessageBox.ERROR 
			});
		}	
	}