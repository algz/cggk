var planView = {};

planView.show = function(){
	planView.result = planOther.sm.getSelections();
	
	if (planView.result == null){
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam575')+'',
			msg: ''+getResource('resourceParam1524')+'',
			buttons: Ext.MessageBox.OK,
			icon: Ext.MessageBox.WARNING
		});
	}else if (planView.result.length == 1){
		planView.record = planOther.sm.getSelected();
		planView.init();	
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam575')+'',
			msg: ''+getResource('resourceParam1523')+'',
			buttons: Ext.MessageBox.OK,
			icon: Ext.MessageBox.WARNING
		});
	}
}

planView.init = function(){
	if (planView.win){
		planView.win = null;
	}
	
	planView.formInit();
	planView.tabInit();
	planView.winInit();
	
	planView.win.add(planView.tab);
	planView.win.add(planView.form);
	
	planView.win.show();
}

planView.winInit = function(){
	if (!planView.win){
		//首先在网页上生成id为'view_jh'的元素(容器)
		tlework.addHtml(tlework.divHtml, 'view_jh');
		//初始化窗体
		planView.win = new Ext.Window({
			el: 'view_jh',
			title: ''+getResource('resourceParam576')+''+getResource('resourceParam1046')+'',
			layout: 'border',
			resizable: false,
			modal: true,
			width: 580,
			height: 480,
			closeAction: 'hide',								//点击"x"的动作
			plain: false,
			buttonAlign: 'center',
			buttons:[{
				text: ''+getResource('resourceParam969')+'',
				handler: planView.hide
			}]
		});
	}
	planView.win.on('hide', planView.destroyWin);
}

planView.tabInit = function(){
	planView.tab = new Ext.TabPanel({
		region: 'center',
		activeTab: 0,
		buttonAlign: 'center',
		items: [{
			title: ''+getResource('resourceParam1256')+'',
			items: new Ext.form.HtmlEditor({
				id: 'jhbeizhu',
				value: planView.record.get('jhbeizhu'),
				hieght: 110,
				width: 565,
				fontFamilies: ['宋体','黑体','隶书','幼圆','Arial','Courier New','Tahoma','Times New Roman','Verdana'],
				defaultFont: '宋体'
			})
		}]
	});
}

planView.formInit = function(){
	planView.form = new Ext.form.FormPanel({
		region: 'north',
		height:205,
		labelWidth:100,
		frame:true,
		plain:false,
		bodyStyle:'padding:5px 5px 0',
		items:[{
			layout:'column',
			items:[{
			 	columnWidth:0.5,
			 	layout:'form',
			 	defaultType: 'textfield',
			 	items:[{
					 	fieldLabel:''+getResource('resourceParam1046')+''+getResource('resourceParam481')+'',
					 	name:'jihlxing',
					 	value: planView.record.get('jihlxing'),
					 	cls: 'readonly',
					 	readOnly: true,
					 	anchor:'95%'
			    }]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	defaultType: 'textfield',
			  	items:[{
			  		fieldLabel: ''+getResource('resourceParam1046')+''+getResource('resourceParam480')+'',
			  		name: 'jihuamc',
			  		value: planView.record.get('jihuamc'),
					cls: 'readonly',
					readOnly: true,
			  		anchor: '95%'
			  	}]
			 },{
			 	columnWidth:0.5,
			 	layout:'form',
			 	defaultType: 'textfield',
			 	items:[{
					 	fieldLabel:''+getResource('resourceParam1248')+'',
					 	name:'yonghuId',
					 	value: planView.record.get('yonghuId'),
					 	cls: 'readonly',
					 	readOnly: true,
					 	anchor:'95%'
			    }]
			  },{
			 	columnWidth:0.5,
			 	layout:'form',
			 	defaultType: 'textfield',
			 	items:[{
					 	fieldLabel:''+getResource('resourceParam1046')+'来源',
					 	name:'jihualy',
					 	value: planView.record.get('jihualy'),
					 	cls: 'readonly',
					 	readOnly: true,
					 	anchor:'95%'
			    }]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	defaultType: 'textfield',
			  	items:[{
					  	fieldLabel:''+getResource('resourceParam1237')+'科室',
						name: 'fuzkeshi',
						value: planView.record.get('fuzkeshi'),
						cls: 'readonly',
						readOnly: true,
						anchor: '95%'										//除去label后，控件所占有的宽度
			  	}]
			  },{
			 	columnWidth:0.5,
			 	layout:'form',
			 	defaultType: 'textfield',
			 	items:[{
					 	fieldLabel:''+getResource('resourceParam1237')+'处领导',
					 	name:'lindaoId',
					 	value: planView.record.get('lindaoId'),
						cls: 'readonly',
						readOnly: true,
					 	anchor:'95%'
			    }]
			  },{
			 	columnWidth:0.5,
			 	layout:'form',
			 	defaultType: 'textfield',
			 	items:[{
					 	fieldLabel:''+getResource('resourceParam1034')+'',
					 	name:'fuzheren',
						value: planView.record.get('fuzheren'),
						cls: 'readonly',
						readOnly: true,
					 	anchor:'95%'
			    }]
			  },{
			 	columnWidth:0.5,
			 	layout:'form',
			 	defaultType: 'textfield',
			 	items:[{
					 	fieldLabel:'B角',
					 	name:'bjiaoId',
						value: planView.record.get('bjiaoId'),
						cls: 'readonly',
						readOnly: true,
					 	anchor:'95%'
			    }]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	defaultType: 'textfield',
			  	items:[{
					  	fieldLabel:''+getResource('resourceParam1241')+'',
						name: 'jhkaissj',
						value: planView.record.get('jhkaissj'),
						cls: 'readonly',
						readOnly: true,
						anchor: '95%'											//除去label后，控件所占有的宽度
			  	}]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	defaultType: 'textfield',
			  	items:[{
					  	fieldLabel:''+getResource('resourceParam1242')+'',
						name: 'jhjiessj',
						value: planView.record.get('jhjiessj'),
						cls: 'readonly',
						readOnly: true,
						anchor: '95%'											//除去label后，控件所占有的宽度
			  	}]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	defaultType: 'textfield',
			  	items:[{
					  	fieldLabel:''+getResource('resourceParam856')+'',
						name: 'sjkaissj',
						value: planView.record.get('sjkaissj'),
						cls: 'readonly',
						readOnly: true,
						anchor: '95%'											//除去label后，控件所占有的宽度
			  	}]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	defaultType: 'textfield',
			  	items:[{
					  	fieldLabel:''+getResource('resourceParam992')+'',
						name: 'sjjiessj',
						value: planView.record.get('sjjiessj'),
						cls: 'readonly',
						readOnly: true,
						anchor: '95%'											//除去label后，控件所占有的宽度
			  	}]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	defaultType: 'textfield',
			  	items:[{
					  	fieldLabel:''+getResource('resourceParam1359')+'',
						name: 'canyuren',
						value: planView.record.get('canyuren'),
						cls: 'readonly',
						readOnly: true,
						anchor: '95%'											//除去label后，控件所占有的宽度
			  	}]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	defaultType: 'textfield',
			  	items:[{
					  	fieldLabel:''+getResource('resourceParam997')+'(%)',
						name: 'wancjind',
						value: planView.record.get('wancjind'),
						cls: 'readonly',
						readOnly: true,
						anchor: '95%'											//除去label后，控件所占有的宽度
			  	}]
			  }]
		}]
	}); 
}

planView.hide = function(){
	planView.win.hide();
}

planView.destroyWin = function(){
	if (planView.win){
		planView.win  = null;
	}
}
