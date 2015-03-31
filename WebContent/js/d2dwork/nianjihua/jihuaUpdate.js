var planUpdate = {
	win:null,
	form_week:null
};

planUpdate.init = function(){
	var result = planOther.sm.getSelections();

	if (result == null){
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam575')+'',
			msg: ''+getResource('resourceParam1524')+'',
			buttons: Ext.MessageBox.OK,
			icon: Ext.MessageBox.WARNING
		});
	}else if (result.length == 1){
		if (planUpdate.win){
			planUpdate.win = null;
		}	
		planUpdate.record = planOther.sm.getSelected();
		planUpdate.tabInit();
		planUpdate.form_Init();
		planUpdate.win_init();
		
		planUpdate.win.add(planUpdate.form);
		planUpdate.win.add(planUpdate.tab);
		planUpdate.win.show();
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam575')+'',
			msg: ''+getResource('resourceParam1525')+'',
			buttons: Ext.MessageBox.OK,
			icon: Ext.MessageBox.WARNING
		});
	}
}

planUpdate.tabInit = function(){
	planUpdate.tab = new Ext.TabPanel({
		region:'center',
		activeTab: 0,
		buttonAlign: 'center',
		items: [{
			title: ''+getResource('resourceParam1256')+'',
			items: new Ext.form.HtmlEditor({
				id: 'jhbeizhu',
				value: planUpdate.record.get('jhbeizhu'),
				hieght: 100,
				width: 615,
				fontFamilies: ['宋体','黑体','隶书','幼圆','Arial','Courier New','Tahoma','Times New Roman','Verdana'],
				defaultFont: '宋体'
			})
		}]
	});
}

planUpdate.win_init = function(){
	if (!planUpdate.win){
		//首先在网页上生成id为'update'的元素(容器)
		tlework.addHtml(tlework.divHtml, 'update');
		//初始化窗体
		planUpdate.win = new Ext.Window({
			el: 'update',
			title: ''+getResource('resourceParam478')+''+getResource('resourceParam1046')+'',
			layout: 'border',
			modal: true,
			width: 630,
			height: 465,
			autoScroll: true,
			closeAction: 'hide',								//点击"x"的动作
			plain: false,
			buttonAlign: 'center',
			buttons:[{
				text: ''+getResource('resourceParam479')+'',
				handler: function(button){
					button.disable();
					var jihuaId = planUpdate.record.get('jihuaId');
					planAjax.update(planUpdate.form, planUpdate.win, jihuaId);
					button.enable();
				}
			},{
				text: '取消',
				handler:function(){
					planUpdate.destroyWin();
					planUpdate.form = null;
				}
			}]
		});
	}
	planUpdate.win.on('hide', planUpdate.destroyWin);
}

planUpdate.form_Init = function(){
	
	planUpdate.form = new Ext.form.FormPanel({
		region: 'north',
		height:190,
		labelWidth:80,
		frame:true,
		plain:false,
		bodyStyle:'padding:5px 5px 0',
		items:[{
			layout:'column',
			items:[{
			 	columnWidth:0.5,
			 	layout:'form',
			 	items:[{
			 			xtype: 'combo',
					 	fieldLabel:''+getResource('resourceParam1046')+''+getResource('resourceParam481')+'',
					 	name:'jihlxing',
					 	value: planUpdate.record.get('jihlxing'),
						hiddenName: 'jihlxing',
						store: new Ext.data.SimpleStore({
							fields: ["jihlxing","displayText"],
							data: [
								[0,""+getResource('resourceParam463')+"类"],
								[1,"制度类"],
								[2,"培训类"],
								[3,"管理类"],
								[4,""+getResource('resourceParam513')+"类"]
							]
						}),
						valueField: 'jihlxing',
						displayField: 'displayText',
						mode: 'local',
						forceSelection: true,
						editable: false,
						triggerAction: 'all',
					 	allowBlank: false,
					 	emptyText: ''+getResource('resourceParam459')+''+getResource('resourceParam1046')+''+getResource('resourceParam481')+'',
					 	anchor:'95%'
			    }]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	defaultType:'textfield',
			  	items:[{
			  		fieldLabel: ''+getResource('resourceParam1046')+''+getResource('resourceParam480')+'',
			  		name: 'jihuamc',
			  		value: planUpdate.record.get('jihuamc'),
			  		maxLength: '20',
			  		maxLengthText: ''+getResource('resourceParam1508')+'!',
			  		allowBlank: false,
			  		anchor: '100%'
			  	}]
			 },{
			 	columnWidth:0.5,
			 	layout:'form',
			 	items:[{
			 			xtype: 'combo',
					 	fieldLabel:''+getResource('resourceParam1046')+'来源',
					 	name:'jihualy',
					 	value: planUpdate.record.get('jihualy'),
						hiddenName: 'jihualy',
						store: new Ext.data.SimpleStore({
							fields: ["jihualy","displayText"],
							data: [
								[0,"总行"],
								[1,"总行要求分行自主开发"],
								[2,"分行"],
								[3,"中支"]
							]
						}),
						valueField: 'jihualy',
						displayField: 'displayText',
						mode: 'local',
						forceSelection: true,
						editable: false,
						triggerAction: 'all',
					 	allowBlank: false,
					 	emptyText: ''+getResource('resourceParam459')+''+getResource('resourceParam1046')+'来源',
					 	anchor:'95%'
			    }]
			  },{
			 	columnWidth:0.5,
			 	layout:'form',
			 	items:[
			 		userMain.init('forLindaoId', ''+getResource('resourceParam1237')+'处领导', 'lindaoId', '100%', false, true, planUpdate.record.get('lindaoId'))
			 	]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	defaultType: 'textfield',
			  	items:[{
					  	fieldLabel:''+getResource('resourceParam1359')+'',
						name: 'canyuren',
						value: planUpdate.record.get('canyuren'),
						allowBlank: true,
						anchor: '95%'											//除去label后，控件所占有的宽度
			  	}]
			  },{
			 	columnWidth:0.5,
			 	layout:'form',
			 	items:[
			 		userMain.init('forBjiaoId', 'B角', 'bjiaoId', '100%', true, true, planUpdate.record.get('bjiaoId'))
			 	]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	defaultType: 'textfield',
			  	items:[{
					  	fieldLabel:''+getResource('resourceParam997')+'(%)',
						name: 'wancjind',
						value: planUpdate.record.get('wancjind'),
						allowBlank: true,
						anchor: '95%'											//除去label后，控件所占有的宽度
			  	}]
			  },{
			 	columnWidth:0.5,
			 	layout:'form',
			 	items:[
			 		userMain.init('forFuzheren', ''+getResource('resourceParam1034')+'', 'fuzheren', '100%', false, true, planUpdate.record.get('fuzheren'))
			 	]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	items:[{
			  			xtype: 'datefield',
					  	fieldLabel:''+getResource('resourceParam1241')+'',
						name: 'jhkaissj',
						format: 'Y-n-j',
						value: planUpdate.record.get('jhkaissj'),
						allowBlank: false,
						blankText: ''+getResource('resourceParam459')+''+getResource('resourceParam1241')+'',
						anchor: '95%'											//除去label后，控件所占有的宽度
			  	}]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	items:[{
			  			xtype: 'datefield',
					  	fieldLabel:''+getResource('resourceParam1242')+'',
						name: 'jhjiessj',
						format: 'Y-n-j',
						value: planUpdate.record.get('jhjiessj'),
						allowBlank: true,
						blankText: ''+getResource('resourceParam459')+''+getResource('resourceParam1242')+'',
						anchor: '100%'											//除去label后，控件所占有的宽度
			  	}]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	items:[{
			  			xtype: 'datefield',
					  	fieldLabel:''+getResource('resourceParam856')+'',
						name: 'sjkaissj',
						format: 'Y-n-j',
						value: planUpdate.record.get('sjkaissj'),
						allowBlank: false,
						blankText: ''+getResource('resourceParam459')+''+getResource('resourceParam856')+'',
						anchor: '95%'											//除去label后，控件所占有的宽度
			  	}]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	items:[{
			  			xtype: 'datefield',
					  	fieldLabel:''+getResource('resourceParam992')+'',
						name: 'sjjiessj',
						format: 'Y-n-j',
						value: planUpdate.record.get('sjjiessj'),
						allowBlank: true,
						blankText: ''+getResource('resourceParam459')+''+getResource('resourceParam992')+'',
						anchor: '100%'											//除去label后，控件所占有的宽度
			  	}]
			  }]
		}]
	}); 
}

planUpdate.destroyWin = function(){
	if (planUpdate.win){
		planUpdate.win.hide();
		planUpdate.win.destroy();
		planUpdate.win  = null;
	}
}
