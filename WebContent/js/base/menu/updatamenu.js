Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var updatamenu = {updatadialog:null,updataform:null,topics:null,menupacketlist:null};
updatamenu.updatamenu = function(){
	if (menu.node==null){
		return false;
	}
	updatamenu.getupdatadialog(); 
};
updatamenu.getupdataform = function(){
	updatamenu.updataform = new Ext.FormPanel({
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
			fieldLabel: 'menuid',
			width:175,
			inputType:'hidden',
			name: 'menuid',
			id:'menuid',
			minLength:1,
			maxLength:64,
			value:[menu.node.attributes.menuid],
			anchor:'95%'
		},{   
			fieldLabel: ''+getResource('resourceParam635')+'',
			width:175,
			name: 'caption',
			id:'caption',
			minLength:1,
			maxLength:64,
			value:[menu.node.attributes.caption],
			anchor:'95%'
		},{   
			fieldLabel: ''+getResource('resourceParam633')+'',
			width:175,
			name: 'uri',
			id:'uri',
			minLength:1,
			maxLength:32,
			value:menu.node.attributes.uri,
			anchor:'95%'
		},{	
			fieldLabel: 'parent',
			name: 'parent',
			width:175,
			inputType:'hidden',
			value:[menu.node.attributes.menuid],
			anchor:'95%'	
		},{	
			fieldLabel: 'updatasign',
			name: 'updatasign',
			width:175,
			inputType:'hidden',
			value:1,
			anchor:'95%'	
		}],						
		buttons: [
			{	text: ''+getResource('resourceParam505')+'',
				handler: function(){
					if(updatamenu.updataform.form.isValid()){	
						var menuform = Seam.Remoting.createType("com.luck.itumserv.base.menu.GmenuForm");
						Ext.apply(menuform,updatamenu.updataform.form.getValues());
						Seam.Component.getInstance("base_menu_MenuSerivce").save(menuform,updatamenu.updatasave); 
					}	
				}
			},
			{   text: JsResource_zh['resourceParam3000'],//'取消',
				handler: function(){		
					updatamenu.updatadialog.hide();	
				}
			}
		]	
	});				
	return updatamenu.updataform;
};
updatamenu.updatasave = function(value){
	var sign = value;	
	if (sign==true){
		Ext.MessageBox.show({
			title: getResource('resourceParam1072'),//'保存成功',
			msg: ''+getResource('resourceParam631')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		});		
		menu.tree.getLoader().load(menu.tree.getRootNode());
		//将选中记录置为空
		menu.node = null;			
		updatamenu.updatadialog.hide();	
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: ''+getResource('resourceParam630')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR
		});
	}	
};
updatamenu.getupdatadialog = function(){

	tlework.addHtml(tlework.divHtml,'updatamenu');		
	updatamenu.getupdataform();
	if (!updatamenu.updatadialog){	
		updatamenu.updatadialog = new Ext.Window({ 
			el:'updatamenu',
			title: ''+getResource('resourceParam646')+'',
           	layout:'fit',
			modal:true,
           	width:350,
           	height:180,
           	closeAction:'hide',
           	plain: false,
			items:updatamenu.updataform						
		});
		updatamenu.updatadialog.on('hide',updatamenu.close);
	}
	updatamenu.updatadialog.show();
};
updatamenu.close = function(){			
		updatamenu.updataform.form.reset();									
		updatamenu.updatadialog.destroy();
		updatamenu.updataform = null;					
		updatamenu.updatadialog = null;	
};
