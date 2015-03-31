Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var findsubsystem = {};
findsubsystem.findesubsystem = function(){
	findsubsystem.getfinddialog();
};
findsubsystem.getfinddialog = function(){
	tlework.addHtml(tlework.divHtml,'findsubsystem');	
	if (!findsubsystem.finddialog){		
		findsubsystem.finddialog = new Ext.Window({ 
			el:'findsubsystem',
			title: ''+getResource('resourceParam652')+'',
           	layout:'fit',
			modal:true,
           	width:300,
           	height:140,
           	closeAction:'hide',
           	plain: false,
			items:findsubsystem.getfindform()						
		});
		findsubsystem.finddialog.on('hide',findsubsystem.close);
	}
	findsubsystem.finddialog.show();
};
findsubsystem.close = function(){
	findsubsystem.findform.form.reset();
	findsubsystem.finddialog.destroy();	
	findsubsystem.findform = null;					
	findsubsystem.finddialog = null;
};
findsubsystem.getfindform = function(){
	findsubsystem.findform = new Ext.FormPanel({
		labelWidth: 75, // label settings here cascade unless overridden
        plain: false,
		frame:true,
		bodyStyle:'padding:5px 5px 0',
        width: 350,
		defaults: {width: 230},
		defaultType: 'textfield',
		items:[
		{   
			fieldLabel: '子'+getResource('resourceParam559')+'ID',
			width:175,
			name: 'findSystemId',
			id:'findSystemId',
			minLength:1,
			maxLength:8,
			anchor:'95%'
		},{   
			fieldLabel: '子'+getResource('resourceParam559')+''+getResource('resourceParam480')+'',
			width:175,
			name: 'findSystemName',
			id:'findSystemName',
			minLength:1,
			maxLength:64,
			anchor:'95%'
		}],								
		buttons: [
			{	text: ''+getResource('resourceParam505')+'',
				handler: function()
					{	
						subsystem.baseargs = {
							findSystemId:Ext.get('findSystemId').dom.value,
							findSystemName:Ext.get('findSystemName').dom.value
						}							
						subsystem.loadvalue();	
						findsubsystem.finddialog.hide();				
					}
			},
			{   text: ''+getResource('resourceParam7007')+'',
				handler: function(){
					findsubsystem.finddialog.hide();
				}
			}
		]	
	});				
	return findsubsystem.findform;
};
