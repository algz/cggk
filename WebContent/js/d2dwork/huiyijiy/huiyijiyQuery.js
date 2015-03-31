var huiyijiyQuery = {huiyijiyQueryform:null};

huiyijiyQuery.gethuiyijiyQueryform = function(){
	return new Ext.FormPanel({
		labelWidth:75,
		frame:true,
		plain:false,
		labelAlign:"right",
		bodyStyle:'padding:5px 5px 0',
		defaultType:'textfield',
		items:[{
					    fieldLabel:''+getResource('resourceParam1352')+'',
					    name:'huiyzhut',
					    width:100,
					    //blankText:'请输入会议主题',
					    maxlength:'50',
					    maxlengthText:''+getResource('resourceParam1346')+'',
					    minlength:'10',
					    minlengthText:''+getResource('resourceParam1345')+'!',
					    //allowBlank:false,
					    anchor:'95%'
			   
			    },{
					 	fieldLabel:''+getResource('resourceParam458')+'',
					 	name:'hyguanjz',
					 	width:100,
					 	blankText:''+getResource('resourceParam1349')+'',
					 	maxlength:'80',
					 	maxlengthText:''+getResource('resourceParam1344')+'',
					 	minlength:'16',
					 	minlengthText:''+getResource('resourceParam1343')+'',
					 	anchor:'95%'
			    },{
					  	xtype:'datefield',
					  	fieldLabel:''+getResource('resourceParam1269')+'',
					  	name:'kaisriqi',
					  	blankText:''+getResource('resourceParam1347')+'',
					  	anchor:'95%'
			  	},{
					  	xtype:'datefield',
					  	fieldLabel:''+getResource('resourceParam1270')+'',
					  	name:'jiesriqi',
					  	blankText:''+getResource('resourceParam1348')+'',
					  	anchor:'95%'
			  	},{
					  	xtype:'datefield',
					  	fieldLabel:''+getResource('resourceParam1354')+'',
					  	width:175,
					  	name:'tianzhrq',
					  	blankText:''+getResource('resourceParam1353')+'',
					  	anchor:'95%'
			  	},{
			  			xtype:'textfield',
			  			fieldLabel:'主持人',
			  			width:175,
			  			name:'zhuchren',
			  			blankText:'请'+getResource('resourceParam494')+'支持人',
			  			anchor:'95%'
			  	}],
			 
			  	buttons:[
			  	  {     text:''+getResource('resourceParam505')+'',
			  	  		handler: function(){
			  	  			if(huiyijiyQuery.huiyijiyForm.form.isValid()){	
								var huiyijiyForm = Seam.Remoting.createType("com.luck.itumserv.d2dwork.huiyijiy.HuiyijiyForm");
								Ext.apply(huiyijiyForm,huiyijiyQuery.huiyijiyForm.form.getValues());
								huiyijiy.baseargs = {
									huiyzhut:huiyijiyForm.getHuiyzhut(),								
									hyguanjz:huiyijiyForm.getHyguanjz(),			
									kaisriqi:huiyijiyForm.getKaisriqi(),
									jiesriqi:huiyijiyForm.getJiesriqi(),
									tianzhrq:huiyijiyForm.getTianzhrq(),
									zhuchren:huiyijiyForm.getZhuchren()
								}
								myGrid.loadvalue(huiyijiy.grid.store,{start:0,limit:25},huiyijiy.baseargs);
								huiyijiyQuery.dialogQuery.hide();
			  	        	}
			  	        	}
			  	  },
			  	  {		text:'取消',
			  	  		handler:function()
			  	  			{
			  	  			huiyijiyQuery.dialogQuery.hide();
			  	  			}
			  	  }]
	    });
}
huiyijiyQuery.getform = function(){
	huiyijiyQuery.huiyijiyform = huiyijiyQuery.gethuiyijiyQueryform();
	return huiyijiyQuery.huiyijiyform;
}

huiyijiyQuery.huiyijiyQueryform = function(){
	Ext.form.Field.prototype.msgTarget = 'qtip';
	huiyijiyQuery.huiyijiyForm = huiyijiyQuery.gethuiyijiyQueryform();
	return huiyijiyQuery.huiyijiyForm;
}

huiyijiyQuery.init = function(response, opt){
	
	if(!huiyijiyQuery.dialogQuery){
	tlework.addHtml(tlework.divHtml,'huiyijiyQuery');
	huiyijiyQuery.dialogQuery = new Ext.Window({
		
	    title:''+getResource('resourceParam1225')+'纪要',
	    modal:true,
	    layout:'fit',
	    width:400,
	    height:250,
	    closeAction:'hide',
	    plain:false,
	    items:[huiyijiyQuery.huiyijiyQueryform()]
	    });
	}
	huiyijiyQuery.dialogQuery.show();
	huiyijiyQuery.dialogQuery.on("hide", function() {
		huiyijiyQuery.dialogQuery.close();
		huiyijiyQuery.dialogQuery.destroy();
		huiyijiyQuery.dialogQuery = null;
	});
};

			  	
