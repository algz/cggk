var addwenjuan = {adddialog:null,addform:null};
addwenjuan.addwenjuan = function(){
	addwenjuan.getadddialog();
};
addwenjuan.getaddform = function(){
	addwenjuan.addform = new Ext.FormPanel({
        frame:true,
        region:'north',
        plain: false,
        width: 300,
        height:160,
        bodyStyle:'padding:5px 5px 0',
		labelWidth:80,
		items:[{
            layout:'column',
			items:[{
                columnWidth:0.5,
                layout: 'form',
				defaultType: 'textfield',
				items:[{
						fieldLabel: '问卷'+getResource('resourceParam476')+'',
						name: 'dchzhut',
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
							fields: ["wjzhutai", "value"],
							data:[[0,''+getResource('resourceParam1267')+''],[1,''+getResource('resourceParam1266')+''],[2,''+getResource('resourceParam506')+'']]
						}),	
						valueField :"wjzhutai",
						displayField: "value",
						mode: 'local',
						forceSelection: true,
						blankText:''+getResource('resourceParam459')+'',
						emptyText:''+getResource('resourceParam459')+'',
						hiddenName:'wjzhutai',
						allowBlank:false,
						editable: false,
						triggerAction: 'all',
						fieldLabel: '问卷'+getResource('resourceParam500')+'',
						value:0,
						name: 'wjzhutai',
						anchor:'95%'
				}]
			},{
                columnWidth:0.5,
                layout: 'form',
				defaultType: 'textfield',
				items:[{
						xtype:'combo',
						store: new Ext.data.SimpleStore({
							fields: ["dcleifen", "value"],
							data:[[1,'不限'],[2,''+getResource('resourceParam882')+''],[3,'人员']]
						}),	
						valueField :"dcleifen",
						displayField: "value",
						mode: 'local',
						forceSelection: true,
						blankText:''+getResource('resourceParam459')+'',
						emptyText:''+getResource('resourceParam459')+'',
						hiddenName:'dcleifen',
						allowBlank:false,
						editable: false,
						triggerAction: 'all',
						fieldLabel: '调查范围',
						name: 'dcleifen',
						value:1,
						anchor:'95%'
				}]
			},{
                columnWidth:0.5,
                layout: 'form',
				defaultType: 'textfield',
				items:[{
						xtype:'combo',
						store: new Ext.data.SimpleStore({
							fields: ["ipshifcf", "value"],
							data:[[1,''+getResource('resourceParam482')+''],[0,'不'+getResource('resourceParam482')+'']]
						}),	
						valueField :"ipshifcf",
						displayField: "value",
						mode: 'local',
						forceSelection: true,
						blankText:''+getResource('resourceParam459')+'',
						emptyText:''+getResource('resourceParam459')+'',
						hiddenName:'ipshifcf',
						allowBlank:false,
						editable: false,
						triggerAction: 'all',
						fieldLabel: '同一IP'+getResource('resourceParam484')+'',
						value:0,
						name: 'ipshifcf',
						anchor:'95%'
				}]
			},{
                columnWidth:0.5,
                layout: 'form',
				defaultType: 'textfield',
				items:[{
						fieldLabel: ''+getResource('resourceParam723')+'',
						xtype: 'datefield',
						name: 'kaishirq',
						width:175,
						minLength:1,
						maxLength:20,
						allowBlank:false,
						readOnly:true,
						format:'Y-n-j',
						anchor:'95%'
				}]
			},{
                columnWidth:0.5,
                layout: 'form',
				defaultType: 'textfield',
				items:[{
						fieldLabel: ''+getResource('resourceParam987')+''+getResource('resourceParam988')+'',
						xtype: 'datefield',
						name: 'jieshurq',
						width:175,
						minLength:1,
						maxLength:20,
						readOnly:true,
						format:'Y-n-j',
						allowBlank:false,
						anchor:'95%'
				}]
			}]
		}]	
	});	
	addwenjuan.addform.items.add(
		new Ext.form.TextArea({
			fieldLabel:'问卷'+getResource('resourceParam467')+'',
           	height:50,
			name:'shuoming',
			id:'shuoming',
			anchor:'95%'
		})
	);			
	return addwenjuan.addform;
};
addwenjuan.addsave = function(sign){
	if (sign==true){
		Ext.MessageBox.show({
			title: '保存成功',
			msg: '保存成功!',
			buttons: Ext.MessageBox.OK
		});	
		addwenjuan.close();	
		diaochawj.loadvalue()			
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: ''+getResource('resourceParam634')+'!',
			buttons: Ext.MessageBox.OK
		});
	}	
};
addwenjuan.getadddialog = function(){
	diaochaxiang.addgrid(null);
	addwenjuan.getaddform();
	tlework.addHtml(tlework.divHtml,'addwenjuan');	
	//Ext.DomHelper.append(document.body,{tag:'div',id:'addwenjuan'});
		addwenjuan.adddialog = new Ext.Window({ 
			el:'addwenjuan',
			modal:true,
			title: ''+getResource('resourceParam477')+'问卷'+getResource('resourceParam508')+'',
           	layout:'border',
           	width:700,
           	height:500,
           	closeAction:'close',
           	plain: false,							
			buttons: [
				{	text: ''+getResource('resourceParam505')+'',
					handler: function(){
						if(addwenjuan.addform.form.isValid()){
							var wenjuan = Seam.Remoting.createType("com.luck.itumserv.d2dwork.wenjuandc.wenjuandc.WenjuandcAddVo");
							Ext.apply(wenjuan,addwenjuan.addform.form.getValues());
							var xiangs = new Array();
							for(var i=0;i<diaochaxiang.ds.getCount();i++){
								var x = new Array();
								var xiang = diaochaxiang.ds.data.items[i];
								x[0] = xiang.get('wenjtimu');
								x[1] = xiang.get('wentleix');
								x[2] = xiang.get('hzfangshi');
								x[3] = xiang.get('dcshunxu');
								x[4] = xiang.get('neirleix');
								x[5] = xiang.get('beixdaan');
								xiangs[i] = x;
							}
							wenjuan.xiangs = xiangs;
							callSeam("d2dwork_wenjuandc_wenjuandc_WenjuandcSvr","save",[wenjuan],addwenjuan.addsave);
						}	
					}
				},
				{   text: '取消',
					handler: function(){
						addwenjuan.adddialog.close();				
				}
			}]					
		});
		//addwenjuan.adddialog.on('hide',addwenjuan.close);
	
	addwenjuan.adddialog.add(addwenjuan.addform);
	addwenjuan.adddialog.add(diaochaxiang.grid);
	addwenjuan.adddialog.show();
};
addwenjuan.close = function(){
	addwenjuan.addform.form.reset();									
	addwenjuan.adddialog.destroy();					
	addwenjuan.adddialog.hide();	
	addwenjuan.addform = null;					
	addwenjuan.adddialog = null;
}
