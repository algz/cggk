var adddchx = {adddialog:null,addform:null,topics:null,cs:null,panel:null};
adddchx.adddchx = function(){
	adddchx.getadddialog();
};
adddchx.getaddform = function(){
	adddchx.addform = new Ext.FormPanel({
		labelWidth: 75, // label settings here cascade unless overridden
        frame:true,
        plain: false,
        region:'north',
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
						fieldLabel: '调查项题目',//调查项题目
						name: 'wenjtimu',
						id:'wenjtimu',
						width:175,
						minLength:1,
						maxLength:20,
						allowBlank:false,
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
						editable: false,
						triggerAction: 'all',
						fieldLabel: '调查项顺序',//调查项顺序
						value:1,
						name: 'dcshunxu',
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
						value:3,
						name: 'wentleix',
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
						value:2,
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
						value:0,
						anchor:'95%'
				}]
			}]
		}]
	});				
	return adddchx.addform;
};
adddchx.addsave = function(returnvo){
	var sign = returnvo.sign
	if (sign=="true"){
		Ext.MessageBox.show({
			title: '保存成功',
			msg: returnvo.value,
			buttons: Ext.MessageBox.OK
		});	
		adddchx.close();	
		adddchx.loadvalue();			
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: returnvo.value,
			buttons: Ext.MessageBox.OK
		});
	}	
};
adddchx.getpanel = function(){
	Ext.QuickTips.init();
	adddchx.panel = new Ext.Panel({		//定义panel面板中显示的信息
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
adddchx.getadddialog = function(){
	tlework.addHtml(tlework.divHtml,'adddchx');	
	adddchx.getaddform();
	adddchx.getpanel();
	beixdaan.getgrid(null);	
	if (!adddchx.adddialog){	
		adddchx.adddialog = new Ext.Window({ 
			el:'adddchx',
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
						if(adddchx.addform.form.isValid()){
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
							adddchx.close();
						}	
					}
				},
				{   text: '取消',
					handler: function(){
						adddchx.close();	
				}
			}]							
		});
		adddchx.adddialog.on('hide',adddchx.close);
	}
	adddchx.adddialog.add(adddchx.addform);
	adddchx.adddialog.add(adddchx.panel);
	adddchx.panel.add(beixdaan.grid);
	adddchx.adddialog.show();
};
adddchx.close = function(){
	adddchx.addform.form.reset();									
	adddchx.adddialog.destroy();					
	adddchx.adddialog.hide();	
	adddchx.addform = null;					
	adddchx.adddialog = null;
};
