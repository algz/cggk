var updatadchx = {updatadialog:null,updataform:null,topics:null,cs:null,panel:null};
updatadchx.updatadchx = function(){
	if(diaochaxiang.row == null){
	  	return false;
	  }
	updatadchx.getupdatadialog();
};
updatadchx.getupdataform = function(){
	updatadchx.updataform = new Ext.FormPanel({
		labelWidth: 75, // label settings here cascade unless overridden
        frame:true,
        plain: false,
        region:'north',
        width: 300,
        height:100,
        bodyStyle:'padding:5px 5px 0',
		labelWidth:80,
		items:[{
            layout:'column',
			items:[{
                columnWidth:1,
                layout: 'form',
				defaultType: 'textfield',
				items:[{
						fieldLabel: '调查项题目',
						name: 'wenjtimu',
						id:'wenjtimu',
						width:175,
						minLength:1,
						maxLength:20,
						allowBlank:false,
						value:diaochaxiang.row.get('wenjtimu'),
						anchor:'95%'
				}]			
			},{
                columnWidth:0.5,
                layout: 'form',
				defaultType: 'textfield',
				items:[{
						xtype:'combo',
						store: new Ext.data.SimpleStore({
							fields: ["dcshunxu", "value"],
							data:[[1,'1'],[2,'2'],[3,'3'],[4,'4'],[5,'5']]
						}),	
						valueField :"dcshunxu",
						displayField: "value",
						mode: 'local',
						forceSelection: true,
						blankText:''+getResource('resourceParam459')+'',
						emptyText:''+getResource('resourceParam459')+'',
						hiddenName:'dcshunxu',
						allowBlank:false,
						editable: false,
						triggerAction: 'all',
						fieldLabel: '调查项顺序',
						name: 'dcshunxu',
						value:diaochaxiang.row.get('dcshunxu'),
						anchor:'95%'
				}]
			},{
                columnWidth:0.5,
                layout: 'form',
				defaultType: 'textfield',
				items:[{
						xtype:'combo',
						store: new Ext.data.SimpleStore({
							fields: ["wentleix", "value"],
							data:[[3,'问答题'],[1,'单选题'],[2,'多选题']]
						}),	
						valueField :"wentleix",
						displayField: "value",
						mode: 'local',
						forceSelection: true,
						blankText:''+getResource('resourceParam459')+'',
						emptyText:''+getResource('resourceParam459')+'',
						hiddenName:'wentleix',
						allowBlank:false,
						editable: false,
						triggerAction: 'all',
						fieldLabel: '调查项'+getResource('resourceParam481')+'',
						name: 'wentleix',
						value:diaochaxiang.row.get('wentleix'),
						anchor:'95%'
				}]
			},{
                columnWidth:0.5,
                layout: 'form',
				defaultType: 'textfield',
				items:[{
						xtype:'combo',
						store: new Ext.data.SimpleStore({
							fields: ["neirleix", "value"],
							data:[[2,'字符'],[1,'数字']]
						}),	
						valueField :"neirleix",
						displayField: "value",
						mode: 'local',
						forceSelection: true,
						blankText:''+getResource('resourceParam459')+'',
						emptyText:''+getResource('resourceParam459')+'',
						hiddenName:'neirleix',
						allowBlank:false,
						editable: false,
						triggerAction: 'all',
						fieldLabel: '内容'+getResource('resourceParam481')+'',
						name: 'neirleix',
						value:diaochaxiang.row.get('neirleix'),
						anchor:'95%'
				}]
			},{
                columnWidth:0.5,
                layout: 'form',
				defaultType: 'textfield',
				items:[{
						xtype:'combo',
						store: new Ext.data.SimpleStore({
							fields: ["hzfangshi", "value"],
							data:[[0,'不汇总'],[1,'求平均'],[2,'求和']]
						}),	
						valueField :"hzfangshi",
						displayField: "value",
						mode: 'local',
						forceSelection: true,
						blankText:''+getResource('resourceParam459')+'',
						emptyText:''+getResource('resourceParam459')+'',
						hiddenName:'hzfangshi',
						allowBlank:false,
						editable: false,
						triggerAction: 'all',
						fieldLabel: '汇总方式',
						name: 'hzfangshi',
						value:diaochaxiang.row.get('hzfangshi'),
						anchor:'95%'
				},{
						fieldLabel: 'updatasign',
						inputType:'hidden',
						width:175,
						name: 'updatasign',
						id:'updatasign',
						value:'1',
						anchor:'95%'
				}]
			}]
		}]	
	});				
	return updatadchx.updataform;
};
updatadchx.updatasave = function(returnvo){
	var sign = returnvo.sign
	if (sign=="true"){
		Ext.MessageBox.show({
			title: '保存成功',
			msg: returnvo.value,
			buttons: Ext.MessageBox.OK
		});	
		updatadchx.close();	
		updatadchx.loadvalue();			
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: returnvo.value,
			buttons: Ext.MessageBox.OK
		});
	}	
};
updatadchx.getpanel = function(){
	Ext.QuickTips.init();
	updatadchx.panel = new Ext.Panel({		//定义panel面板中显示的信息
         id:'updatadchxpanel',
         region:'center',
		 title: '备选答案',
		 layout:'fit',
		 height:540,
         split:true,
		 collapsible: true,
         margins:'0 5 5 0'
    }); 
}; 
updatadchx.getupdatadialog = function(){
	Ext.QuickTips.init();
	tlework.addHtml(tlework.divHtml,'updatadchx');
	updatadchx.getpanel();
	updatadchx.getupdataform();
	beixdaan.getgrid(diaochaxiang.row.get('beixdaan'));	
	if (!updatadchx.updatadialog){	
		updatadchx.updatadialog = new Ext.Window({ 
			el:'updatadchx',
			modal:true,
			title: ''+getResource('resourceParam477')+'问卷项'+getResource('resourceParam508')+'',
           	layout:'border',
           	width:700,
           	height:400,
           	closeAction:'close',
           	plain: false,							
			buttons: [
				{	text: ''+getResource('resourceParam505')+'',
					handler: function(){					
						if(updatadchx.updataform.form.isValid()){
							diaochaxiang.ds.remove(diaochaxiang.row);
							/**
							var beixdaans = new Array();
							for (var i=0;i<beixdaan.ds.getCount();i++){
								var beix = beixdaan.ds.data.items[i];
								var bx = new Array();
								bx[0] = beix.get('id');
								bx[1] = beix.get('value');
								beixdaans[i] = bx;
							}	
							*/	
							var beixdaans = '';
							for (var i=0;i<beixdaan.ds.getCount();i++){
								var beix = beixdaan.ds.data.items[i];
								beixdaans = beixdaans + beix.get('id')+':';
								beixdaans = beixdaans + beix.get('value')+'|';
							}
							var record = new Ext.data.Record({
									"wenjtimu":Ext.get('wenjtimu').dom.value,
									"dcshunxu":Ext.get('dcshunxu').dom.value,
									"wentleix":Ext.get('wentleix').dom.value,
									"neirleix":Ext.get('neirleix').dom.value,
									"hzfangshi":Ext.get('hzfangshi').dom.value,								
									"beixdaan":beixdaans
								}); 
							diaochaxiang.ds.insert(0,record);
							diaochaxiang.grid.doLayout();
							updatadchx.close();
							}	
					}
				},
				{   text: '取消',
					handler: function(){
						updatadchx.close();	
				}
			}]
		});
		updatadchx.updatadialog.on('hide',updatadchx.close);
	}	
	updatadchx.updatadialog.add(updatadchx.updataform);
	updatadchx.updatadialog.add(updatadchx.panel);
	updatadchx.panel.add(beixdaan.grid);
	updatadchx.updatadialog.show();
};
updatadchx.close = function(){
	updatadchx.updataform.form.reset();									
	updatadchx.updatadialog.destroy();					
	updatadchx.updatadialog.hide();	
	updatadchx.updataform = null;					
	updatadchx.updatadialog = null;
};
