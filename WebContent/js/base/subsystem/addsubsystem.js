Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var addsubsystem ={adddialog:null,addform:null,menus:null};
addsubsystem.addsubsystem = function(){
	Seam.Component.getInstance("base_subsystem_SubSystemSerivce").getMenuList(addsubsystem.getadddialog);
};
addsubsystem.getaddform = function(){
	addsubsystem.addform = new Ext.FormPanel({
		labelWidth: 75, // label settings here cascade unless overridden
        plain: false,
		frame:false,
		bodyStyle:'padding:5px 5px 0;background:transparent',
        width: 350,
		defaults: {width: 230},
		defaultType: 'textfield',
		labelWidth:80,
		items:[
		{   
			fieldLabel: ''+getResource('resourceParam842')+'',
			width:175,
			name: 'systemName',
			id:'systemName',
			minLength:1,
			maxLength:64,
			anchor:'95%'
		},{   
			fieldLabel: ''+getResource('resourceParam648')+'',
			width:175,
			name: 'descr',
			id:'descr',
			minLength:1,
			maxLength:128,
			anchor:'95%'
		},{   
			xtype:'combo',
			store: new Ext.data.SimpleStore({
				fields: ["menuroot", "name"],
				data:addsubsystem.menus
				}),	
			valueField :"menuroot",
			displayField: "name",
			mode: 'local',
			forceSelection: true,
			blankText:''+getResource('resourceParam840')+'',
			emptyText:''+getResource('resourceParam841')+'',
			hiddenName:'menuroot',
			editable: false,
			triggerAction: 'all',
			allowBlank:false,
			fieldLabel: ''+getResource('resourceParam844')+'',
			name: 'menuroot',
			anchor:'95%'
		}],						
		buttons: [
			{	text: ''+getResource('resourceParam505')+'',
				handler: function(){
					if(addsubsystem.addform.form.isValid()){	
						var subsystemform = Seam.Remoting.createType("com.luck.itumserv.base.subsystem.GsubSystemForm");
						Ext.apply(subsystemform,addsubsystem.addform.form.getValues());
						Seam.Component.getInstance("base_subsystem_SubSystemSerivce").save(subsystemform,addsubsystem.addsave); 
					}
				}
			},
			{   text: ''+getResource('resourceParam7007')+'',
				handler: function(){				
					addsubsystem.adddialog.hide();
				}
			}
		]	
	});				
	return addsubsystem.addform;
};
addsubsystem.addsave = function(returnvo){
	if (returnvo.sign==true){
		Ext.MessageBox.show({
			title: getResource('resourceParam1072'),//'保存成功',
			msg: returnvo.value,
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		});	
		subsystem.loadvalue();			
		addsubsystem.adddialog.hide();
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: returnvo.value,
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR
		});
	}	
};
addsubsystem.getadddialog = function(menulist){
	addsubsystem.menus = menulist;
	tlework.addHtml(tlework.divHtml,'addsubsystem');	
	addsubsystem.getaddform();
	if (!addsubsystem.adddialog){	
		addsubsystem.adddialog = new Ext.Window({ 
			el:'addsubsystem',
			title: ''+getResource('resourceParam843')+'',
           	layout:'fit',
			modal:true,
           	width:350,
           	height:160,
           	closeAction:'hide',
           	plain: false,
			items:addsubsystem.addform						
		});
		addsubsystem.adddialog.on('hide',addsubsystem.close);
	}
	addsubsystem.adddialog.show();
};
addsubsystem.close = function(){		
	addsubsystem.addform.form.reset();									
	addsubsystem.adddialog.destroy();
	addsubsystem.addform = null;					
	addsubsystem.adddialog = null;
}
