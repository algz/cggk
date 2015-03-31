var setDataPrivilege = {};

setDataPrivilege.selectUser = function(a){
	alert(a);
}

setDataPrivilege.init = function() {	
	
	setDataPrivilege.selectedUserAndRoleGridPanel=selectedUserAndRole.init();
	setDataPrivilege.projectDataPrivilege=dataPrivilege.init();
	
		setDataPrivilege.enpanel = new Ext.Panel({		
		 autoScroll:true,
		title :''+getResource('resourceParam620')+'',
		layout : 'border',
		autoScroll : true,
		items : [setDataPrivilege.projectDataPrivilege,
				setDataPrivilege.selectedUserAndRoleGridPanel			
				]
	});	
	
	
		setDataPrivilege.tab = new Ext.TabPanel({
				activeTab : 0,
				height : 700,
				hidden:true,
				plain : true,
				defaults : {
					autoScroll : true
				},
				items : [
				     setDataPrivilege.enpanel
				      ]
			});	

	return setDataPrivilege.tab;
}
