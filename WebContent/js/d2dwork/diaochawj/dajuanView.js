Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var dajuanform = {dialog:null,wjform:null,returnvo:null};
dajuanform.adddajuan = function(){
	if (dajuan.row==null){
		return false;
	}
	callSeam("d2dwork_wenjuandc_wenjuandc_WenjuandcSvr","getDajuanOfdajuanId",[dajuan.row.get('dajuanId')],dajuanform.getdialog);
};
dajuanform.getform = function(){
	dajuanform.wjform = new Ext.FormPanel({
		labelWidth: 75, // label settings here cascade unless overridden
        plain: false,
		frame:false,
		bodyStyle:'padding:10px 30px 0',
        autoScroll:true,
		defaults: {width: 230},
		defaultType: 'textfield',
		labelWidth:100,
		labelAlign:'top',
		layoutConfig: {
        	labelSeparator: ':'
    	},
		items:[{   
			inputType:'hidden',
			width:175,
			name: 'diaochId',
			id:'diaochId',
			value:dajuanform.returnvo.diaochId,
			anchor:'95%'
		}]	
	});
	dajuanform.wjform.items.add(
		new Ext.form.TextArea({
			fieldLabel: '问卷'+getResource('resourceParam467')+'',
			readOnly:true,
			style:'border:0px;background:transparent;',
			width:175,
			name: '',
			id:'',
			value:dajuanform.returnvo.shuoming,
			anchor:'95%'
		})
	);
	for (var i=0;i<dajuanform.returnvo.xiangs.length;i++){
		var xiangvo = dajuanform.returnvo.xiangs[i];
		if(xiangvo.wentleix=='3'){
			if (xiangvo.neirleix=='2'){
				dajuanform.wjform.items.add(
					new Ext.form.TextArea({
						fieldLabel: xiangvo.wenjtimu,
						width:175,
						name: xiangvo.diaocxid,
						id: xiangvo.diaocxid,
						value:xiangvo.nrongzhi,
						readOnly:true,
						anchor:'95%'
					})
				);
			}else if(xiangvo.neirleix=='1'){
				dajuanform.wjform.items.add(
					new Ext.form.NumberField({
						fieldLabel: xiangvo.wenjtimu,
						width:175,
						name: xiangvo.diaocxid,
						id: xiangvo.diaocxid,
						value:xiangvo.nrongzhi,
						readOnly:true,
						anchor:'95%'
					})
				);
			}		
		}else if(xiangvo.wentleix=='1'){
			var xzdaanjivo = xiangvo.xzdaanji;
			for (var n=0;n<xzdaanjivo.length;n++){
				if (n==0){
					if (xiangvo.nrongzhi==xzdaanjivo[n].id){						
						var radio1 = new Ext.form.Radio({
							fieldLabel:xiangvo.wenjtimu,
							boxLabel:xzdaanjivo[n].value,
							name:xiangvo.diaocxid,
							inputValue:xzdaanjivo[n].id,
							checked:true								
						});	
						dajuanform.wjform.items.add(radio1);
					}else{
						var radio2 = new Ext.form.Radio({
							fieldLabel:xiangvo.wenjtimu,
							boxLabel:xzdaanjivo[n].value,
							inputValue:xzdaanjivo[n].id,
							name:xiangvo.diaocxid									
						});	
						dajuanform.wjform.items.add(radio2);
					}
				}else{
					if (xiangvo.nrongzhi==xzdaanjivo[n].id){
						
						var radio3 = new Ext.form.Radio({
							boxLabel:xzdaanjivo[n].value,
							hideLabel:true,
							name:xiangvo.diaocxid,
							inputValue:xzdaanjivo[n].id,
							checked:true								
						});	
						dajuanform.wjform.items.add(radio3);
					}else{						
						var radio4 = new Ext.form.Radio({
							boxLabel:xzdaanjivo[n].value,
							hideLabel:true,
							inputValue:xzdaanjivo[n].id,
							name:xiangvo.diaocxid									
						});	
						dajuanform.wjform.items.add(radio4);
					}
				}
			}
		}else if(xiangvo.wentleix=='2'){
			var valuevo = new Array();
			var zhi = xiangvo.nrongzhi.split("\|");
			for (var n=0;n<zhi.length;n++){
				valuevo[zhi[n]] = zhi[n];
			}
			var xzdaanjivo = xiangvo.xzdaanji;
			for (var n=0;n<xzdaanjivo.length;n++){
				var sign = 0;
				for (var m=0;m<xiangvo.nrongzhi.length;m++){
					if(xiangvo.nrongzhi[m]==xzdaanjivo[n].id){
						sign = 1;
					}
				}
				if (n==0){
					if (sign==1){	
						dajuanform.wjform.items.add(						
							new Ext.form.Checkbox({
								fieldLabel:xiangvo.wenjtimu,
								boxLabel:xzdaanjivo[n].value,
								name:xiangvo.diaocxid,
								inputValue:xzdaanjivo[n].id,
								readOnly:true,
								checked:true								
							})
						)
					}else{
						dajuanform.wjform.items.add(						
							new Ext.form.Checkbox({
								fieldLabel:xiangvo.wenjtimu,
								boxLabel:xzdaanjivo[n].value,
								inputValue:xzdaanjivo[n].id,
								readOnly:true,
								name:xiangvo.diaocxid						
							})
						)
					}
				}else{
					if (sign==1){			
						dajuanform.wjform.items.add(						
							new Ext.form.Checkbox({
								hideLabel:true,
								boxLabel:xzdaanjivo[n].value,
								name:xiangvo.diaocxid,
								inputValue:xzdaanjivo[n].id,
								readOnly:true,
								checked:true								
							})
						)
					}else{
						dajuanform.wjform.items.add(						
							new Ext.form.Checkbox({
								hideLabel:true,
								boxLabel:xzdaanjivo[n].value,
								inputValue:xzdaanjivo[n].id,
								readOnly:true,
								name:xiangvo.diaocxid							
							})
						)
					}
				}
			}
		}
	}			
	return dajuanform.wjform;
};
dajuanform.getdialog = function(vo){
	dajuanform.returnvo = vo;	
	dajuanform.getform();
	tlework.addHtml(tlework.divHtml,'dajuanform');	
	if (!dajuanform.dialog){	
		dajuanform.dialog = new Ext.Window({ 
			el:'dajuanform',
			title: dajuanform.returnvo.dchzhuti,
           	layout:'fit',
			modal:true,
           	width:700,
           	height:480,
           	closeAction:'close',
           	plain: false,
			items:dajuanform.wjform,
			buttons: [
				{   text: ''+getResource('resourceParam7007')+'',//取消
					handler: function(){		
						dajuanform.dialog.hide();	
					}
				}
			]
		});
		dajuanform.dialog.on('hide',dajuanform.close);
	}
	dajuanform.dialog.show();
};
dajuanform.close = function(){			
		dajuanform.wjform.form.reset();									
		dajuanform.dialog.destroy();
		dajuanform.wjform = null;					
		dajuanform.dialog = null;	
};
