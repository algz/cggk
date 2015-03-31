Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var updatasubsystem = {updatadialog:null,updataform:null,menus:null};
updatasubsystem.updatasubsystem = function(){
	if(myGrid.row == null){
	  	return false;
	}
	Seam.Component.getInstance("base_subsystem_SubSystemSerivce").getMenuList(updatasubsystem.getupdatadialog);
};
updatasubsystem.getupdataform = function(){
	updatasubsystem.updataform = new Ext.FormPanel({
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
			value:myGrid.row.get('systemName'),
			anchor:'95%'
		},{   
			fieldLabel: ''+getResource('resourceParam648')+'',
			width:175,
			name: 'descr',
			id:'descr',
			minLength:1,
			maxLength:128,
			value:myGrid.row.get('descr'),
			anchor:'95%'
		},{   
			xtype:'combo',
			store: new Ext.data.SimpleStore({
				fields: ["menuroot", "name"],
				data:updatasubsystem.menus
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
			value:myGrid.row.get('menuroot'),
			anchor:'95%'
		},{	fieldLabel: ''+getResource('resourceParam846')+'',
			name: 'updatasign',
			width:175,
			inputType:'hidden',
			value:"1",
			anchor:'95%'	
		},{	fieldLabel: 'subSystemId',
			name: 'subSystemId',
			width:175,
			inputType:'hidden',
			value:[myGrid.row.get('subSystemId')],
			anchor:'95%'	
		}],						
		buttons: [
			{	text: ''+getResource('resourceParam505')+'',
				handler: function(){
					if(updatasubsystem.updataform.form.isValid()){	
						var subsystemform = Seam.Remoting.createType("com.luck.itumserv.base.subsystem.GsubSystemForm");
						Ext.apply(subsystemform,updatasubsystem.updataform.form.getValues());
						Seam.Component.getInstance("base_subsystem_SubSystemSerivce").save(subsystemform,updatasubsystem.updatasave); 
					}
				}
			},
			{   text: ''+getResource('resourceParam7007')+'',
				handler: function(){	
					updatasubsystem.updatadialog.hide();		
				}
			}
		]	
	});				
	return updatasubsystem.updataform;
};
updatasubsystem.updatasave = function(returnvo){
	if (returnvo.sign==true){
		Ext.MessageBox.show({
			title: getResource('resourceParam1072'),//'保存成功',
			msg: returnvo.value,
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		});	
		subsystem.loadvalue();	
		updatasubsystem.updatadialog.hide();	
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: returnvo.value,
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR 
		});
	}	
};
updatasubsystem.getupdatadialog = function(menulist){
	updatasubsystem.menus = menulist;
	tlework.addHtml(tlework.divHtml,'updatasubsystem');	
	updatasubsystem.getupdataform();
	if (!updatasubsystem.updatadialog){	
		updatasubsystem.updatadialog = new Ext.Window({ 
			el:'updatasubsystem',
			title: ''+getResource('resourceParam845')+'',
           	layout:'fit',
			modal:true,
           	width:350,
           	height:160,
           	closeAction:'hide',
           	plain: false,
			items:updatasubsystem.updataform						
		});
		updatasubsystem.updatadialog.on('hide',updatasubsystem.close);
	}
	updatasubsystem.updatadialog.show();
};
updatasubsystem.close = function(){		
		updatasubsystem.updataform.form.reset();									
		updatasubsystem.updatadialog.destroy();
		updatasubsystem.updataform = null;					
		updatasubsystem.updatadialog = null;
};
