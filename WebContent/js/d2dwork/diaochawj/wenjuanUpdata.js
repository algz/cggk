var updatawenjuan = {updatadialog:null,updataform:null,panel:null,addVo:null};
updatawenjuan.updatawenjuan = function(){
	if(diaochawj.row == null){
	  	return false;
	}
	callSeam("d2dwork_wenjuandc_wenjuandc_WenjuandcSvr","getWenjuandcById",[diaochawj.row.get('diaochId')],updatawenjuan.getupdatadialog);
};
updatawenjuan.getupdataform = function(){
	updatawenjuan.updataform = new Ext.FormPanel({
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
						value:updatawenjuan.addVo.dchzhut,
						anchor:'95%'
				},{
						fieldLabel: 'diaochId',
						inputType:'hidden',
						width:175,
						name: 'diaochId',
						id:'diaochId',
						value:updatawenjuan.addVo.diaochId,
						anchor:'95%'
				},{
						fieldLabel: 'updataSign',
						inputType:'hidden',
						width:175,
						name: 'updataSign',
						id:'updataSign',
						value:'1',
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
						name: 'wjzhutai',
						value:updatawenjuan.addVo.wjzhutai,
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
						fieldLabel: '问卷范围',
						name: 'dcleifen',
						value:updatawenjuan.addVo.dcleifen,
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
						name: 'ipshifcf',
						value:updatawenjuan.addVo.ipshifcf,
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
						value:updatawenjuan.addVo.kaishirq,
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
						allowBlank:false,
						readOnly:true,
						format:'Y-n-j',
						value:updatawenjuan.addVo.jieshurq,
						anchor:'95%'
				}]
			}]
		}]	
	});
	updatawenjuan.updataform.items.add(
		new Ext.form.TextArea({
			fieldLabel:'问卷'+getResource('resourceParam467')+'',
			width:50,
			name:'shuoming',
			id:'shuoming',
			autoHeight:false,
			value:updatawenjuan.addVo.shuoming,
			anchor:'95%'
		})
	);
	return updatawenjuan.updataform;
};
updatawenjuan.updatasave = function(sign){
	if (sign==true){
		Ext.MessageBox.show({
			title: '保存成功',
			msg: '保存成功!',
			buttons: Ext.MessageBox.OK
		});	
		updatawenjuan.close();
		diaochawj.loadvalue()			
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg:  ''+getResource('resourceParam634')+'!',
			buttons: Ext.MessageBox.OK
		});
	}	
};
updatawenjuan.getpanel = function(){
	Ext.QuickTips.init();
	updatawenjuan.panel = new Ext.Panel({		//定义panel面板中显示的信息
         id:'xianggridpanel',
         region:'center',
		 title: '调查项'+getResource('resourceParam508')+'',
		 layout:'fit',
		 height:540,
         split:true,
		 collapsible: true,
         margins:'0 5 5 0'
    }); 
}; 
updatawenjuan.getupdatadialog = function(addVo){
	updatawenjuan.addVo = addVo;
	tlework.addHtml(tlework.divHtml,'updatawenjuan');
	updatawenjuan.getpanel();
	diaochaxiang.addgrid(updatawenjuan.addVo.xiangs);
	updatawenjuan.getupdataform();	
	if (!updatawenjuan.updatadialog){	
		updatawenjuan.updatadialog = new Ext.Window({ 
			el:'updatawenjuan',
			modal:true,
			title: ''+getResource('resourceParam478')+'问卷'+getResource('resourceParam508')+'',
           	layout:'border',
           	width:700,
           	height:500,
           	closeAction:'close',
           	plain: false,							
			buttons: [
				{	text: ''+getResource('resourceParam505')+'',
					handler: function(){
						if(updatawenjuan.updataform.form.isValid()){
							var wenjuan = Seam.Remoting.createType("com.luck.itumserv.d2dwork.wenjuandc.wenjuandc.WenjuandcAddVo");
							Ext.apply(wenjuan,updatawenjuan.updataform.form.getValues());
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
							callSeam("d2dwork_wenjuandc_wenjuandc_WenjuandcSvr","save",[wenjuan],updatawenjuan.updatasave);
						}	
					}
				},
				{   text: '取消',
					handler: function(){
						updatawenjuan.updatadialog.close();				
				}
			}]					
		});
		updatawenjuan.updatadialog.on('hide',updatawenjuan.close);
	}	
	updatawenjuan.updatadialog.add(updatawenjuan.updataform);
	updatawenjuan.updatadialog.add(updatawenjuan.panel);
	updatawenjuan.panel.add(diaochaxiang.grid);
	updatawenjuan.updatadialog.show();
};
updatawenjuan.close = function(){								
	updatawenjuan.updatadialog.destroy();					
	updatawenjuan.updatadialog.hide();
	updatawenjuan.updataform = null;					
	updatawenjuan.updatadialog = null;
};
