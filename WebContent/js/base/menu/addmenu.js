Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var addmenu = {adddialog:null,addform:null,topics:null,menupacketlist:null,menuid:null};
addmenu.addmenu = function(){
	addmenu.getadddialog();
};
addmenu.getaddform = function(){
	if (menu.node!=null){ 
		addmenu.menuid=menu.node.attributes.menuid;
	};	
	addmenu.addform = new Ext.FormPanel({
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
			fieldLabel: ''+getResource('resourceParam635')+'',
			width:175,
			name: 'caption',
			id:'caption',
			minLength:1,
			maxLength:64,
			anchor:'95%'
		},{   
			fieldLabel: ''+getResource('resourceParam633')+'',
			width:175,
			name: 'uri',
			id:'uri',
			minLength:1,
			maxLength:250,
			anchor:'95%'
		},{	
			fieldLabel: 'parent',
			name: 'parent',
			width:175,
			inputType:'hidden',
			value:[addmenu.menuid],
			anchor:'95%'	
		}],						
		buttons: [
			{	text: ''+getResource('resourceParam505')+'',
				handler: function(){
					if(addmenu.addform.form.isValid()){	
						var menuform = Seam.Remoting.createType("com.luck.itumserv.base.menu.GmenuForm");
						Ext.apply(menuform,addmenu.addform.form.getValues());
						Seam.Component.getInstance("base_menu_MenuSerivce").save(menuform,addmenu.addsave); 
					}
				}
			},
			{   text: getResource('resourceParam3001'),//'取消',
				handler: function(){				
					addmenu.adddialog.hide();	
				}
			}
		]	
	});				
	return addmenu.addform;
};
addmenu.addsave = function(value){
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
		addmenu.adddialog.hide();
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: ''+getResource('resourceParam630')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR
		});
	}	
};
addmenu.getadddialog = function(){
	tlework.addHtml(tlework.divHtml,'addmenu');	
	addmenu.getaddform();
	if (!addmenu.adddialog){	
		addmenu.adddialog = new Ext.Window({ 
			el:'addmenu',
			title: ''+getResource('resourceParam632')+'',
           	layout:'fit',
			modal:true,
           	width:350,
           	height:180,
           	closeAction:'hide',
           	plain: false,
			items:addmenu.addform						
		});
		addmenu.adddialog.on('hide',addmenu.close);
	}
	addmenu.adddialog.show();
};
addmenu.close = function(){			
		addmenu.addform.form.reset();									
		addmenu.adddialog.destroy();
		addmenu.addform = null;					
		addmenu.adddialog = null;
};
