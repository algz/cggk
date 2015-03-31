var huiyijiyAdd = {huiyijiyAdd:null,huiyijiyAddform:null,huiyijiy:null};

huiyijiyAdd.gethuiyijiyAddform = function(){
	return new Ext.FormPanel({
		labelWidth:75,
		frame:true,
		buttonAlign:'right',
		plain:false,
		labelAlign:"right",
		bodyStyle:'padding:5px 5px 0',
		items:[{
			layout:'column',
			items:[{
			  	columnWidth:0.5,
			  	layout:'form',
			  	defaultType:'textfield',
			  	items:[{
					    fieldLabel:''+getResource('resourceParam1352')+'',
					    name:'huiyzhut',
					    width:175,
					    blankText:''+getResource('resourceParam1350')+'',
					    maxlength:'50',
					    maxlengthText:''+getResource('resourceParam1346')+'',
					    minlength:'10',
					    minlengthText:''+getResource('resourceParam1345')+'!',
					    anchor:'95%'
			   
			    }]
			 },{
			 	columnWidth:0.5,
			 	layout:'form',
			 	defaultType:'textfield',
			 	items:[{
					 	fieldLabel:''+getResource('resourceParam458')+'',
					 	name:'hyguanjz',
					 	width:200,
					 	blankText:''+getResource('resourceParam1349')+'',
					 	maxlength:'80',
					 	maxlengthText:''+getResource('resourceParam1344')+'',
					 	minlength:'16',
					 	minlengthText:''+getResource('resourceParam1343')+'',
					 	anchor:'95%'
			    }]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	items:[{
					  	xtype:'datefield',
					  	fieldLabel:''+getResource('resourceParam1269')+'',
					  	name:'kaisriqi',
					  	blankText:''+getResource('resourceParam1347')+'',
					  	anchor:'95%'
			  	}]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	items:[{
					  	xtype:'datefield',
					  	fieldLabel:''+getResource('resourceParam1270')+'',
					  	name:'jiesriqi',
					  	blankText:''+getResource('resourceParam1348')+'',
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
					  	blankText:'请'+getResource('resourceParam494')+'主持人的'+getResource('resourceParam480')+'',
					  	maxlength:'100',
					  	anchor:'95%'
			  	}]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	border: false,
			  	items:[{
			  			xtype:'combo',
					  	fieldLabel:''+getResource('resourceParam1113')+'',
					  	name:'canjreny',
					  	width:175,
					  	maxlength:'100',
					  	anchor:'95%',
					  	store: new Ext.data.SimpleStore({
					  		fields:["returnValue","displayText"],
					  		data:[[1,'全科'],[2,'全处'],[3,'全行'],[4,'全省']]
					  	}),
					  	valueField:"returnValue",
					  	displayField:"displayText",
					  	mode:'local',
					  	forceSelection:true,
					  	hiddenName:'canjreny',
					  	editable:true,
					  	triggerAction:'all',
					  	allowBlank:false
			  	}]
			  },{			  	
				columnWidth:1.03,
			  	layout:'form',
			  	items:[{
					  	xtype:'htmleditor',
					  	fieldLabel:'纪要内容',
					  	name:'hyneirng',
					  	width:500,
					  	height:300,
					  	blankText:''+getResource('resourceParam1351')+'',
					  	allowBlank:false,
					  	anchor:'95%'
				}] 	
			 }]
		}],
			  	buttons:[
			  	  {     text:''+getResource('resourceParam505')+'',
			  	  		handler: function()
			  	  		{
				  	  		if(huiyijiyAdd.huiyijiyForm.form.isValid()){	
								var huiyijiyForm = Seam.Remoting.createType("com.luck.itumserv.d2dwork.huiyijiy.HuiyijiyForm");
								Ext.apply(huiyijiyForm,huiyijiyAdd.huiyijiyForm.form.getValues());
								callSeam("d2dwork_huiyijiy_HuiyijiyService","save",[huiyijiyForm],huiyijiyAdd.save); 
							}	
			  	  		}
			  	  			}, 			  	        	
			  	  {		text:'取消',
			  	  		handler:function()
			  	  			{
			  	  			huiyijiyAdd.dialogAdd.close();
			  	  			huiyijiyAdd.dialogAdd.destroy();
			  	  			huiyijiyAdd.dialogAdd = null;
			  	  			}
			  	  }]
	    });
}

huiyijiyAdd.init = function(response, opt){
	
	if(!huiyijiyAdd.dialogAdd){
	tlework.addHtml(tlework.divHtml,'huiyijiyAdd');
	huiyijiyAdd.dialogAdd = new Ext.Window({
		el:'huiyijiyAdd',
	    title:''+getResource('resourceParam466')+''+getResource('resourceParam736')+'纪要',
	    modal:true,
	    layout:'fit',
	    width:800,
	    height:400,
	    closeAction:'hide',
	    plain:false,
	    items:[huiyijiyAdd.huiyijiyAddform()]
	    });
	}
	huiyijiyAdd.dialogAdd.show();
}

huiyijiyAdd.huiyijiyAddform = function(){
	Ext.form.Field.prototype.msgTarget = 'qtip';
	huiyijiyAdd.huiyijiyForm = huiyijiyAdd.gethuiyijiyAddform();
	return huiyijiyAdd.huiyijiyForm;
};

huiyijiyAdd.save = function(response){
	var sign = response;
	if (sign){
		Ext.MessageBox.show({
			title:'保存成功',
			msg:'你的'+getResource('resourceParam736')+'纪要'+getResource('resourceParam509')+'经'+getResource('resourceParam1072')+'',
			buttons:Ext.MessageBox.OK
		});
	}else{
		huiyijiyAdd.huiyijiyAddform.form.reset();
		Ext.MessageBox.show({
			title:''+getResource('resourceParam634')+'',
			msg:'你'+getResource('resourceParam494')+'的'+getResource('resourceParam736')+'纪要'+getResource('resourceParam509')+'经存在，请重新'+getResource('resourceParam494')+'！',
			buttons: Ext.MessageBox.OK
		});
	}
	huiyijiyAdd.dialogAdd.close();
	huiyijiyAdd.dialogAdd.destroy();
	huiyijiyAdd.dialogAdd = null;
	huiyijiy.baseargs = null;
	huiyijiy.args = {start: 0, limit: 25};
	myGrid.loadvalue(huiyijiy.grid.store,huiyijiy.args,huiyijiy.baseargs);
};			  	
