Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var wenjuanform = {dialog:null,wjform:null,returnvo:null};
wenjuanform.addwenjuan = function(){
	if (diaochawj.row==null){
		return false;
	}
	callSeam("d2dwork_wenjuandc_wenjuandc_WenjuandcSvr","getWenjuan",[diaochawj.row.get('diaochId')],wenjuanform.getdialog);
};
wenjuanform.getform = function(){
	wenjuanform.wjform = new Ext.FormPanel({
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
			value:wenjuanform.returnvo.diaochId,
			anchor:'95%'
		}]	
	});
	wenjuanform.wjform.items.add(
		new Ext.form.TextArea({
			fieldLabel: '问卷'+getResource('resourceParam467')+'',
			readOnly:true,
			style:'border:0px;background:transparent;',
			width:175,
			name: '',
			id:'',
			value:wenjuanform.returnvo.shuoming,
			anchor:'95%'
		})
	);
	for (var i=0;i<wenjuanform.returnvo.xiangs.length;i++){
		var xiangvo = wenjuanform.returnvo.xiangs[i];
		if(xiangvo.wentleix=='3'){
			if (xiangvo.neirleix=='2'){
				wenjuanform.wjform.items.add(
					new Ext.form.TextArea({
						fieldLabel:  i+1+'. '+xiangvo.wenjtimu,
						width:175,
						name: xiangvo.diaocxid,
						id: xiangvo.diaocxid,
						value:xiangvo.nrongzhi,
						anchor:'95%'
					})
				);
			}else if(xiangvo.neirleix=='1'){
				wenjuanform.wjform.items.add(
					new Ext.form.NumberField({
						fieldLabel:  i+1+'. '+xiangvo.wenjtimu,
						width:175,
						name: xiangvo.diaocxid,
						id: xiangvo.diaocxid,
						value:xiangvo.nrongzhi,
						anchor:'95%'
					})
				);
			}		
		}else if(xiangvo.wentleix=='1'){
			var xzdaanjivo = xiangvo.xzdaanji;
			for (var n=0;n<xzdaanjivo.length;n++){
				if (n==0){
					if (xiangvo.nrongzhi==xzdaanjivo[n].id){			
						wenjuanform.wjform.items.add(						
							new Ext.form.Radio({
								fieldLabel: i+1+'. '+xiangvo.wenjtimu,
								boxLabel:xzdaanjivo[n].value,
								name:xiangvo.diaocxid,
								inputValue:xzdaanjivo[n].id,
								checked:true								
							})
						)
					}else{
						wenjuanform.wjform.items.add(						
							new Ext.form.Radio({
								fieldLabel: i+1+'. '+xiangvo.wenjtimu,
								boxLabel:xzdaanjivo[n].value,
								inputValue:xzdaanjivo[n].id,
								name:xiangvo.diaocxid								
							})
						)
					}
				}else{
					if (xiangvo.nrongzhi==xzdaanjivo[n].id){			
						wenjuanform.wjform.items.add(						
							new Ext.form.Radio({
								boxLabel: i+1+'. '+xzdaanjivo[n].value,
								hideLabel:true,
								name:xiangvo.diaocxid,
								inputValue:xzdaanjivo[n].id,
								checked:true								
							})
						)
					}else{
						wenjuanform.wjform.items.add(						
							new Ext.form.Radio({
								boxLabel: i+1+'. '+xzdaanjivo[n].value,
								hideLabel:true,
								inputValue:xzdaanjivo[n].id,
								name:xiangvo.diaocxid							
							})
						)
					}
				}
			}
		}else if(xiangvo.wentleix=='2'){
			var valuevo = new Array();
			for (var n=0;n<xiangvo.nrongzhi.length;n++){
				valuevo[xiangvo.nrongzhi[n]] = xiangvo.nrongzhi[n];
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
						wenjuanform.wjform.items.add(						
							new Ext.form.Checkbox({
								fieldLabel: i+1+'. '+xiangvo.wenjtimu,
								boxLabel:xzdaanjivo[n].value,
								name:xiangvo.diaocxid,
								inputValue:xzdaanjivo[n].id,
								checked:true								
							})
						)
					}else{
						wenjuanform.wjform.items.add(						
							new Ext.form.Checkbox({
								fieldLabel: i+1+'. '+xiangvo.wenjtimu,
								boxLabel:xzdaanjivo[n].value,
								inputValue:xzdaanjivo[n].id,
								name:xiangvo.diaocxid						
							})
						)
					}
				}else{
					if (sign==1){			
						wenjuanform.wjform.items.add(						
							new Ext.form.Checkbox({
								hideLabel:true,
								boxLabel: i+1+'. '+xzdaanjivo[n].value,
								name:xiangvo.diaocxid,
								inputValue:xzdaanjivo[n].id,
								checked:true								
							})
						)
					}else{
						wenjuanform.wjform.items.add(						
							new Ext.form.Checkbox({
								hideLabel:true,
								boxLabel: i+1+'. '+xzdaanjivo[n].value,
								inputValue:xzdaanjivo[n].id,
								name:xiangvo.diaocxid							
							})
						)
					}
				}
			}
		}
	}			
	return wenjuanform.wjform;
};
wenjuanform.getdialog = function(vo){
	wenjuanform.returnvo = vo;	
	wenjuanform.getform();
	tlework.addHtml(tlework.divHtml,'wenjuanform');	
	if (!wenjuanform.dialog){	
		wenjuanform.dialog = new Ext.Window({ 
			el:'wenjuanform',
			title: wenjuanform.returnvo.dchzhuti,
           	layout:'fit',
			modal:true,
           	width:700,
           	height:480,
           	closeAction:'close',
           	plain: false,
			items:wenjuanform.wjform,				
			buttons: [
				{   text: '取消',
					handler: function(){		
						wenjuanform.dialog.hide();	
					}
				}
			]
		});
		wenjuanform.dialog.on('hide',wenjuanform.close);
	}
	wenjuanform.dialog.show();
};
wenjuanform.close = function(){			
		wenjuanform.wjform.form.reset();									
		wenjuanform.dialog.destroy();
		wenjuanform.wjform = null;					
		wenjuanform.dialog = null;	
};
