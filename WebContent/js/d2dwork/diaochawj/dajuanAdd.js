Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var adddajuan = {dialog:null,wjform:null,returnvo:null};
adddajuan.adddajuan = function(){
	if (diaochawj.row==null){
		return false;
	}
	callSeam("d2dwork_wenjuandc_wenjuandc_WenjuandcSvr","getDajuan",[diaochawj.row.get('diaochId')],adddajuan.getdialog);
};
adddajuan.getform = function(){
	adddajuan.addform = new Ext.FormPanel({
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
        	labelSeparator: '：'
    	},
		items:[{   
			inputType:'hidden',
			width:175,
			name: 'diaochId',
			id:'diaochId',
			value:adddajuan.returnvo.diaochId,
			anchor:'95%'
		},{   
			inputType:'hidden',
			width:175,
			name: 'dajuanId',
			id:'dajuanId',
			value:adddajuan.returnvo.dajuanId,
			anchor:'95%'
		}]	
	});
	adddajuan.addform.items.add(
				new Ext.form.TextArea({
					fieldLabel: '问卷'+getResource('resourceParam467')+'',
					readOnly:true,
					style:'border:0px;background:transparent;',
					width:175,
					name: 'shuoming',
					id:'shuoming',
					value:adddajuan.returnvo.shuoming,
					anchor:'95%'
				})
	);
	for (var i=0;i<adddajuan.returnvo.xiangs.length;i++){
		var xiangvo = adddajuan.returnvo.xiangs[i];
		if(xiangvo.wentleix=='3'){
			if (xiangvo.neirleix=='2'){
				adddajuan.addform.items.add(
					new Ext.form.TextArea({
						fieldLabel: i+1+'. '+xiangvo.wenjtimu,
						width:175,
						name: xiangvo.diaocxid,
						id: xiangvo.diaocxid,
						value:xiangvo.nrongzhi,
						anchor:'95%'
					})
				);
			}else if(xiangvo.neirleix=='1'){
				adddajuan.addform.items.add(
					new Ext.form.NumberField({
						fieldLabel: i+1+'. '+xiangvo.wenjtimu,
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
						adddajuan.addform.items.add(						
							new Ext.form.Radio({
								fieldLabel:i+1+'. '+xiangvo.wenjtimu,
								boxLabel:xzdaanjivo[n].value,
								name:xiangvo.diaocxid,
								inputValue:xzdaanjivo[n].id,
								checked:true								
							})
						)
					}else{
						adddajuan.addform.items.add(						
							new Ext.form.Radio({
								fieldLabel:i+1+'. '+xiangvo.wenjtimu,
								boxLabel:xzdaanjivo[n].value,
								inputValue:xzdaanjivo[n].id,
								name:xiangvo.diaocxid								
							})
						)
					}
				}else{
					if (xiangvo.nrongzhi==xzdaanjivo[n].id){			
						adddajuan.addform.items.add(						
							new Ext.form.Radio({
								boxLabel:xzdaanjivo[n].value,
								hideLabel:true,
								name:xiangvo.diaocxid,
								inputValue:xzdaanjivo[n].id,
								checked:true								
							})
						)
					}else{
						adddajuan.addform.items.add(						
							new Ext.form.Radio({
								boxLabel:xzdaanjivo[n].value,
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
						adddajuan.addform.items.add(						
							new Ext.form.Checkbox({
								fieldLabel:i+1+'. '+xiangvo.wenjtimu,
								boxLabel:xzdaanjivo[n].value,
								name:xiangvo.diaocxid,
								inputValue:xzdaanjivo[n].id,
								checked:true								
							})
						)
					}else{
						adddajuan.addform.items.add(						
							new Ext.form.Checkbox({
								fieldLabel:i+1+'. '+xiangvo.wenjtimu,
								boxLabel:xzdaanjivo[n].value,
								inputValue:xzdaanjivo[n].id,
								name:xiangvo.diaocxid						
							})
						)
					}
				}else{
					if (sign==1){			
						adddajuan.addform.items.add(						
							new Ext.form.Checkbox({
								hideLabel:true,
								boxLabel:xzdaanjivo[n].value,
								name:xiangvo.diaocxid,
								inputValue:xzdaanjivo[n].id,
								checked:true								
							})
						)
					}else{
						adddajuan.addform.items.add(						
							new Ext.form.Checkbox({
								hideLabel:true,
								boxLabel:xzdaanjivo[n].value,
								inputValue:xzdaanjivo[n].id,
								name:xiangvo.diaocxid							
							})
						)
					}
				}
			}
		}
	}			
	return adddajuan.addform;
};
adddajuan.getvalue = function(bcstate){
	var valueVo = Seam.Remoting.createType("com.luck.itumserv.d2dwork.wenjuandc.wenjuandc.FankuiVo");
	var values = new Array();
	for(var i=0;i<adddajuan.returnvo.xiangs.length;i++){
		var value = new Array();
		value[0] = adddajuan.returnvo.xiangs[i].diaocxid;
		if(adddajuan.returnvo.xiangs[i].wentleix!='2'){
			value[1] = adddajuan.addform.form.getValues()[adddajuan.returnvo.xiangs[i].diaocxid];
		}else{
			var dxvalue = adddajuan.addform.form.getValues()[adddajuan.returnvo.xiangs[i].diaocxid];
			var dvalue = '';
			if(dxvalue!=null){
				for(var n=0;n<dxvalue.length;n++){
					if (n==dxvalue.length-1){
						dvalue = dvalue + dxvalue[n];	
					}else{
						dvalue = dvalue + dxvalue[n]+'|';	
					}		
				}
			}	
			value[1] = dvalue;
		}
		values[i] = value;
	}
	valueVo.diaochId = adddajuan.returnvo.diaochId;
	valueVo.dajuanId = adddajuan.returnvo.dajuanId;
	valueVo.bcstate = bcstate;
	valueVo.values = values;
	return valueVo;
};
adddajuan.save = function(value){
	var sign = value;	
	if (sign==true){
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam7033')+'',//保存成功
			msg: ''+getResource('resourceParam1072')+'',//保存成功!
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		});	
		adddajuan.close();
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: ''+getResource('resourceParam1072')+'',//保存成功!
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR
		});
	}	
};
adddajuan.getdialog = function(vo){
	adddajuan.returnvo = vo;	
	adddajuan.getform();
	tlework.addHtml(tlework.divHtml,'adddajuan');	
	if (!adddajuan.dialog){	
		adddajuan.dialog = new Ext.Window({ 
			el:'adddajuan',
			title: adddajuan.returnvo.dchzhuti,
           	layout:'fit',
			modal:true,
           	width:700,
           	height:480,
           	closeAction:'close',
           	plain: false,
			items:adddajuan.addform,
			buttons: [
				{	text: ''+getResource('resourceParam484')+'',
					handler: function(){
						callSeam("d2dwork_wenjuandc_wenjuandc_WenjuandcSvr","saveFankui",[adddajuan.getvalue('0')],adddajuan.save);
					}
				},
				{	text: ''+getResource('resourceParam7002')+'',//保存
					handler: function(){
						callSeam("d2dwork_wenjuandc_wenjuandc_WenjuandcSvr","saveFankui",[adddajuan.getvalue('1')],adddajuan.save);
					}
				},				
				{   text: ''+getResource('resourceParam7007')+'',//取消
					handler: function(){		
						adddajuan.dialog.hide();	
					}
				}
			]
		});
		adddajuan.dialog.on('hide',adddajuan.close);
	}
	adddajuan.dialog.show();
};
adddajuan.close = function(){			
		adddajuan.addform.form.reset();									
		adddajuan.dialog.destroy();
		adddajuan.addform = null;					
		adddajuan.dialog = null;	
};
