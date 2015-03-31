var huiyijiyUpdate = {huiyijiyUpdate:null,huiyijiyUpdateform:null,huiyijiy:null};



huiyijiyUpdate.gethuiyijiyUpdateform = function(){
	return new Ext.FormPanel({
		labelWidth:75,
		frame:true,
		plain:false,
		labelAlign:"right",
		bodyStyle:'padding:5px 5px 0',
		items:[{
			layout:'column',
			items:[{
				columnWidth:0.5,
				layout:'form',
				defaultType:'textfield',
				items:[
				{	
					inputType:'hidden',
					name: 'huiyjyId',
					width:175,
					value:myGrid.row.get('huiyjyId')
				},{
						fieldLabel:''+getResource('resourceParam1352')+'',
						name:'huiyzhut',
						width:175,
						blankText:''+getResource('resourceParam1350')+'',
						value:myGrid.row.get('huiyzhut'),
						maxLength:50,
						maxLengthText:''+getResource('resourceParam1356')+'',
						allowBlank:false,
						anchor:'95%'
				}]
			},{
				columnWidth:0.5,
				layout:'form',
				defaultType:'textfield',
				items:[{
						fieldLabel:''+getResource('resourceParam458')+'',
						name:'hyguanjz',
						value: myGrid.row.get('hyguanjz'),
						width:175,
						blankText:''+getResource('resourceParam1349')+'',
						maxlength:'80',
					 	maxlengthText:''+getResource('resourceParam1344')+'',
					 	allowBlank:false,
					 	anchor:'95%'
				}]
			},{
				columnWidth:0.5,
				layout:'form',
				defaultType:'datefield',
				items:[{
					  	fieldLabel:''+getResource('resourceParam1269')+'',
					  	name:'kaisriqi',
					  	blankText:''+getResource('resourceParam1347')+'',
					  	value: myGrid.row.get('kaisriqi'),
					  	anchor:'95%'
				}]
			},{
				columnWidth:0.5,
				layout:'form',
				defaultType:'datefield',
				items:[{
					  	fieldLabel:''+getResource('resourceParam1270')+'',
					  	name:'jiesriqi',
					  	blankText:''+getResource('resourceParam1348')+'',
					  	value: myGrid.row.get('jiesriqi'),
					  	anchor:'95%'
				}]
			},{
				columnWidth:0.5,
				layout:'form',
				defaultType:'textfield',
				items:[{
						fieldLabel:''+getResource('resourceParam1113')+'',
						name:'canjreny',
						width:175,
						value: myGrid.row.get('canjreny'),
						blankText:''+getResource('resourceParam1357')+'',
						allowBlank:false,
						anchor:'95%'
				}]
			},{
				columnWidth:0.5,
				layout:'form',
				defaultType:'textfield',
				items:[{
						fieldLabel:'主持人',
						name:'zhuchren',
						width:175,
						value:myGrid.row.get('zhuchren'),
						blankText:'请'+getResource('resourceParam494')+'主持人',
						allowBlank:false,
						anchor:'95%'
				}]
			},{
				columnWidth:1.03,
				layout:'form',
				items:[{
						xtype:'htmleditor',
					  	fieldLabel:'纪要内容',
					  	name:'hyneirng',
					  	width:500,
					  	value: myGrid.row.get('hyneirng'),
					  	blankText:''+getResource('resourceParam1351')+'',
					  	allowBlank:false,
					  	anchor:'95%'
				}]
			 }],
			buttons:[
			  	  {     text:'保存',
			  	  		handler: function()
			  	  			{
				  	  		if(huiyijiyUpdate.huiyijiyform.form.isValid()){	
								var huiyijiyForm = Seam.Remoting.createType("com.luck.itumserv.d2dwork.huiyijiy.HuiyijiyForm");
								Ext.apply(huiyijiyForm,huiyijiyUpdate.huiyijiyform.form.getValues());
								callSeam("d2dwork_huiyijiy_HuiyijiyService","update",[huiyijiyForm],huiyijiyUpdate.save); 
							}
			  	        	}
			  	  },
			  	  {		text:'取消',
			  	  		handler:function()
			  	  			{
			  	  			huiyijiyUpdate.dialogUpdate.close();
			  	  			huiyijiyUpdate.dialogUpdate.destroy();
			  	  			huiyijiyUpdate.dialogUpdate = null;
			  	  			}
			  	  }]
		}]
		
	})
};


huiyijiyUpdate.init = function(response, opt){
	if (myGrid.row == null){
		Ext.MessageBox.show({
			title:''+getResource('resourceParam744')+'',
			msg:''+getResource('resourceParam1355')+'',
			buttons:Ext.MessageBox.OK
		});
	}else{
		if(!huiyijiyUpdate.dialogUpdate){
		tlework.addHtml(tlework.divHtml,'huiyijiyUpdate');
		huiyijiyUpdate.dialogUpdate = new Ext.Window({
			el:'huiyijiyUpdate',
		    title:''+getResource('resourceParam1227')+'纪要',
		    modal:true,
		    layout:'fit',
		    width:800,
		    height:350,
		    closeAction:'hide',
		    plain:false,
		    items:[huiyijiyUpdate.huiyijiyUpdateform()]
		    });
		}
		huiyijiyUpdate.dialogUpdate.show();
	}
}

huiyijiyUpdate.huiyijiyUpdateform = function(){
	Ext.form.Field.prototype.msgTarget = 'qtip';
	huiyijiyUpdate.huiyijiyform = huiyijiyUpdate.gethuiyijiyUpdateform();
	return huiyijiyUpdate.huiyijiyform;
};

huiyijiyUpdate.save = function(response){
	var sign = response;
	if (sign){
		Ext.MessageBox.show({
			title:''+getResource('resourceParam677')+'',
			msg:'你的'+getResource('resourceParam736')+'纪要'+getResource('resourceParam509')+'经'+getResource('resourceParam478')+'并'+getResource('resourceParam1072')+'',
			buttons:Ext.MessageBox.OK
		});
	}else{
		huiyijiyUpdate.huiyijiyUpdateform.form.reset();
		Ext.MessageBox.show({
			title:''+getResource('resourceParam572')+'',
			msg:'你'+getResource('resourceParam494')+'的'+getResource('resourceParam736')+'纪要内容'+getResource('resourceParam509')+'经存在，请重新'+getResource('resourceParam494')+'！',
			buttons: Ext.MessageBox.OK
		});
	}
	huiyijiyUpdate.dialogUpdate.close();
	huiyijiyUpdate.dialogUpdate.destroy();
	huiyijiyUpdate.dialogUpdate = null;
	huiyijiy.baseargs = null;
	huiyijiy.args = {start: 0, limit: 25};
	myGrid.loadvalue(huiyijiy.grid.store,huiyijiy.args,huiyijiy.baseargs);
};
