var baowenView = {};

baowenView.show = function(type){
	if (type == "1"){
		baowenView.result = baowenOther.sm_week.getSelections();
	
		if (baowenView.result == null){
			Ext.MessageBox.show({
				title: ''+getResource('resourceParam575')+'',
				msg: ''+getResource('resourceParam1524')+'',
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.WARNING
			});
		}else if (baowenView.result.length == 1){
			baowenView.record = baowenOther.sm_week.getSelected();
			baowenView.week_init();	
		}else{
			Ext.MessageBox.show({
				title: ''+getResource('resourceParam575')+'',
				msg: ''+getResource('resourceParam1523')+'',
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.WARNING
			});
		}
	}else if (type == "2"){
		baowenView.result = baowenOther.sm_month.getSelections();
	
		if (baowenView.result == null){
			Ext.MessageBox.show({
				title: ''+getResource('resourceParam575')+'',
				msg: ''+getResource('resourceParam1524')+'',
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.WARNING
			});
		}else if (baowenView.result.length == 1){
			baowenView.record = baowenOther.sm_month.getSelected();
			baowenView.month_init();	
		}else{
			Ext.MessageBox.show({
				title: ''+getResource('resourceParam575')+'',
				msg: ''+getResource('resourceParam1523')+'',
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.WARNING
			});
		}
	}
}

baowenView.week_init = function(){
	if (baowenView.win){
		baowenView.win = null;
	}
	
	baowenView.form_week_init();
	baowenView.tab_week_init();
	baowenView.winInit();
	
	baowenView.win.add(baowenView.form_week);
	baowenView.win.add(baowenView.tab_week);

	baowenView.win.show();
}

baowenView.month_init = function(){
	if (baowenView.win){
		baowenView.win = null;
	}
	
	baowenView.form_month_init();
	baowenView.tab_month_init();
	baowenView.winInit();
	
	baowenView.win.add(baowenView.form_month);
	baowenView.win.add(baowenView.tab_month);

	baowenView.win.show();
}

baowenView.winInit = function(){
	if (!baowenView.win){
		//首先在网页上生成id为'view_bw'的元素(容器)
		tlework.addHtml(tlework.divHtml, 'view_bw');
		//初始化窗体
		baowenView.win = new Ext.Window({
			el: 'view_bw',
			title: ''+getResource('resourceParam1518')+'',
			layout: 'border',
			resizable: false,
			modal: true,
			width: 580,
			height: 470,
			closeAction: 'hide',								//点击"x"的动作
			plain: false,
			buttonAlign: 'center',
			buttons:[{
				text: ''+getResource('resourceParam969')+'',
				handler: baowenView.hide
			}]
		});
	}
	baowenView.win.on('hide', baowenView.destroyWin);
}

baowenView.tab_week_init = function(){
	baowenView.tab_week = new Ext.TabPanel({
		region: 'center',
		activeTab: 0,
		layoutOnTabChange: true,
		autoTabs: true,
		items: [{
			title: ''+getResource('resourceParam6005'), // 6005工作目标
			items: new Ext.form.HtmlEditor({
				id: 'gzmubiao',
				value: baowenView.record.get('gzmubiao'),
				hieght: 110,
				width: 565,
						fontFamilies: ['宋体','黑体','隶书','幼圆','Arial','Courier New','Tahoma','Times New Roman','Verdana'],
		defaultFont: '宋体'
			})
		},{
			title: ''+getResource('resourceParam6006')+getResource('resourceParam1046')+'', // 6006总体工作
			items: new Ext.form.HtmlEditor({
				id: 'ztigzjih',
				value: baowenView.record.get('ztigzjih'),
				hieght: 110,
				width: 565,
						fontFamilies: ['宋体','黑体','隶书','幼圆','Arial','Courier New','Tahoma','Times New Roman','Verdana'],
		defaultFont: '宋体'
			})
		},{
			title: ''+getResource('resourceParam1685')+'',
			items: new Ext.form.HtmlEditor({
				id: 'cunzaiwt',
				value: baowenView.record.get('cunzaiwt'),
				hieght: 110,
				width: 565,
						fontFamilies: ['宋体','黑体','隶书','幼圆','Arial','Courier New','Tahoma','Times New Roman','Verdana'],
		defaultFont: '宋体'
			})
		},{
			title: ''+getResource('resourceParam1286')+'',
			items: new Ext.form.HtmlEditor({
				id: 'bwanchqk',
				value: baowenView.record.get('bwanchqk'),
				hieght: 110,
				width: 565,
						fontFamilies: ['宋体','黑体','隶书','幼圆','Arial','Courier New','Tahoma','Times New Roman','Verdana'],
		defaultFont: '宋体'
			})
		},{
			title: ''+getResource('resourceParam6007')+getResource('resourceParam1046')+'', // 6007下周(月/季)
			items: new Ext.form.HtmlEditor({
				id: 'xwanchqk',
				value: baowenView.record.get('xwanchqk'),
				hieght: 110,
				width: 565,
						fontFamilies: ['宋体','黑体','隶书','幼圆','Arial','Courier New','Tahoma','Times New Roman','Verdana'],
		defaultFont: '宋体'
			})
		},{
			title: ''+getResource('resourceParam1256')+'',
			items: new Ext.form.HtmlEditor({
				id: 'beizhu',
				value: baowenView.record.get('beizhu'),
				hieght: 110,
				width: 565,
						fontFamilies: ['宋体','黑体','隶书','幼圆','Arial','Courier New','Tahoma','Times New Roman','Verdana'],
		defaultFont: '宋体'
			})
		}]
	});
}

baowenView.tab_month_init = function(){
	baowenView.tab_month = new Ext.TabPanel({
		region: 'center',
		activeTab: 0,
		layoutOnTabChange: true,
		buttonAlign: 'center',
		items: [{
			title: ''+getResource('resourceParam6005'), // 6005工作目标
			items: new Ext.form.HtmlEditor({
				id: 'gzmubiao',
				value: baowenView.record.get('gzmubiao'),
				hieght: 110,
				width: 565,
						fontFamilies: ['宋体','黑体','隶书','幼圆','Arial','Courier New','Tahoma','Times New Roman','Verdana'],
		defaultFont: '宋体'
			})
		},{
			title: ''+getResource('resourceParam1685')+'',
			items: new Ext.form.HtmlEditor({
				id: 'cunzaiwt',
				value: baowenView.record.get('cunzaiwt'),
				hieght: 110,
				width: 565,
						fontFamilies: ['宋体','黑体','隶书','幼圆','Arial','Courier New','Tahoma','Times New Roman','Verdana'],
		defaultFont: '宋体'
			})
		},{
			title: ''+getResource('resourceParam1286')+'',
			items: new Ext.form.HtmlEditor({
				id: 'bwanchqk',
				value: baowenView.record.get('bwanchqk'),
				hieght: 110,
				width: 565,
						fontFamilies: ['宋体','黑体','隶书','幼圆','Arial','Courier New','Tahoma','Times New Roman','Verdana'],
		defaultFont: '宋体'
			})
		},{
			title: ''+getResource('resourceParam6007')+getResource('resourceParam1046')+'', // 6007下周(月/季)
			items: new Ext.form.HtmlEditor({
				id: 'xwanchqk',
				value: baowenView.record.get('xwanchqk'),
				hieght: 110,
				width: 565,
						fontFamilies: ['宋体','黑体','隶书','幼圆','Arial','Courier New','Tahoma','Times New Roman','Verdana'],
		defaultFont: '宋体'
			})
		},{
			title: ''+getResource('resourceParam1256')+'',
			items: new Ext.form.HtmlEditor({
				id: 'beizhu',
				value: baowenView.record.get('beizhu'),
				hieght: 110,
				width: 565,
						fontFamilies: ['宋体','黑体','隶书','幼圆','Arial','Courier New','Tahoma','Times New Roman','Verdana'],
		defaultFont: '宋体'
			})
		}]
	});
}

baowenView.form_week_init = function(){
	
	baowenView.form_week = new Ext.form.FormPanel({
		region: 'north',
		height:195,
		labelWidth:100,
		frame:true,
		plain:false,
		bodyStyle:'padding:5px 5px 0',
		items:[{
			layout:'column',
			items:[{
			  	columnWidth:0.5,
			  	layout:'form',
			  	defaultType:'textfield',
			  	items:[{
			  		fieldLabel: ''+getResource('resourceParam1035')+'',
			  		name: 'mingchen',
			  		value: baowenView.record.get('mingchen'),
					cls: 'readonly',
					readOnly: true,
			  		allowBlank: true,
			  		anchor: '95%'
			  	}]
			 },{
			 	columnWidth:0.5,
			 	layout:'form',
			 	defaultType:'textfield',
			 	items:[{
					 	fieldLabel:''+getResource('resourceParam1037')+'',
					 	name:'xiangmlx',
						value: baowenView.record.get('xiangmlx'),
						cls: 'readonly',
						readOnly: true,
					 	anchor:'95%'
			    }]
			  },{
			 	columnWidth:0.5,
			 	layout:'form',
			 	defaultType:'textfield',
			 	items:[{
			 			xtype: 'textfield',
					 	fieldLabel:''+getResource('resourceParam6008')+getResource('resourceParam481')+'', // 6008报告
					 	name:'zoubaolx',
					 	value: baowenView.record.get('zoubaolx'),
					 	cls: 'readonly',
						readOnly: true,
					 	anchor:'95%'
			    }]
			  },{
			 	columnWidth:0.5,
			 	layout:'form',
			 	defaultType:'textfield',
			 	items:[{
					 	fieldLabel:''+getResource('resourceParam6008')+getResource('resourceParam481')+'('+getResource('resourceParam988')+')', // 6008报告
					 	name:'zoubaobz',
						value: baowenView.record.get('zoubaobz'),
						cls: 'readonly',
						readOnly: true,
					 	anchor:'95%'
			    }]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	defaultType:'textfield',
			  	items:[{
					  	fieldLabel:''+getResource('resourceParam1237')+''+getResource('resourceParam6017'), // 6017科室
						name: 'fuzekesh',
						value: baowenView.record.get('fuzekesh'),
						cls: 'readonly',
						readOnly: true,
						anchor: '95%'											//除去label后，控件所占有的宽度
			  	}]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	defaultType:'textfield',
			  	items:[{
					 	fieldLabel:''+getResource('resourceParam1034')+'',
					 	name:'xmufuzer',
						value: baowenView.record.get('xmufuzer'),
						cls: 'readonly',
						readOnly: true,
					 	anchor:'95%'											//除去label后，控件所占有的宽度
			  	}]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	defaultType:'textfield',
			  	items:[{
					  	fieldLabel:''+getResource('resourceParam6008')+getResource('resourceParam723')+'', // 6008报告
						name: 'zoubkssj',
						value: baowenView.record.get('zoubkssj'),
						cls: 'readonly',
						readOnly: true,
						anchor: '95%'											//除去label后，控件所占有的宽度
			  	}]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	defaultType:'textfield',
			  	items:[{
					  	fieldLabel:' '+getResource('resourceParam6008')+getResource('resourceParam987')+''+getResource('resourceParam988')+'', // 6008报告
						name: 'zoubjssj',
						value: baowenView.record.get('zoubjssj'),
						cls: 'readonly',
						readOnly: true,
						anchor: '95%'											//除去label后，控件所占有的宽度
			  	}]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	defaultType: 'textfield',
			  	items:[{
					  	fieldLabel:''+getResource('resourceParam6015')+getResource('resourceParam988')+'', // 6015报告填写
						name: 'tianbsj',
						value: baowenView.record.get('tianbsj'),
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
						name: 'zongtijd',
						value: baowenView.record.get('zongtijd'),
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
						name: 'zhuycjry',
						value: baowenView.record.get('zhuycjry'),
						cls: 'readonly',
						readOnly: true,
						anchor: '95%'											//除去label后，控件所占有的宽度
			  	}]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	defaultType: 'textfield',
			  	items:[{
					  	fieldLabel:''+getResource('resourceParam1521')+'',
						name: 'yonghuId',
						value: baowenView.record.get('yonghuId'),
						cls: 'readonly',
						readOnly: true,
						anchor: '95%'											//除去label后，控件所占有的宽度
			  	}]
			  }]
		}]
	}); 
}

baowenView.form_month_init = function(){
	
	baowenView.form_month = new Ext.form.FormPanel({
		region: 'north',
		height:195,
		labelWidth:100,
		frame:true,
		plain:false,
		bodyStyle:'padding:5px 5px 0',
		items:[{
			layout:'column',
			items:[{
			  	columnWidth:0.5,
			  	layout:'form',
			  	defaultType:'textfield',
			  	items:[{
			  		fieldLabel: ''+getResource('resourceParam1035')+'',
			  		name: 'mingchen',
					cls: 'readonly',
					readOnly: true,
			  		allowBlank: true,
			  		anchor: '95%'
			  	}]
			 },{
			 	columnWidth:0.5,
			 	layout:'form',
			 	defaultType:'textfield',
			 	items:[{
					 	fieldLabel:''+getResource('resourceParam1037')+'',
					 	name:'xiangmlx',
						cls: 'readonly',
						readOnly: true,
					 	anchor:'95%'
			    }]
			  },{
			 	columnWidth:0.5,
			 	layout:'form',
			 	defaultType:'textfield',
			 	items:[{
			 			xtype: 'textfield',
					 	fieldLabel:''+getResource('resourceParam6008')+getResource('resourceParam481')+'', // 6008报告
					 	name:'zoubaolx',
					 	value: baowenView.record.get('zoubaolx'),
					 	cls: 'readonly',
						readOnly: true,
					 	anchor:'95%'
			    }]
			  },{
			 	columnWidth:0.5,
			 	layout:'form',
			 	defaultType:'textfield',
			 	items:[{
					 	fieldLabel:''+getResource('resourceParam6008')+getResource('resourceParam481')+'('+getResource('resourceParam988')+')', // 6008报告
					 	name:'zoubaobz',
						value: baowenView.record.get('zoubaobz'),
						cls: 'readonly',
						readOnly: true,
					 	anchor:'95%'
			    }]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	defaultType:'textfield',
			  	items:[{
					  	fieldLabel:''+getResource('resourceParam1237')+'' + getResource('resourceParam6017'), // 6017科室
						name: 'fuzekesh',
						value: baowenView.record.get('fuzekesh'),
						cls: 'readonly',
						readOnly: true,
						anchor: '95%'											//除去label后，控件所占有的宽度
			  	}]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	defaultType:'textfield',
			  	items:[{
					 	fieldLabel:''+getResource('resourceParam1034')+'',
					 	name:'xmufuzer',
						cls: 'readonly',
						readOnly: true,
					 	anchor:'95%'											//除去label后，控件所占有的宽度
			  	}]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	defaultType:'textfield',
			  	items:[{
					  	fieldLabel:''+getResource('resourceParam6008')+getResource('resourceParam723')+'', // 6008报告
						name: 'zoubkssj',
						value: baowenView.record.get('zoubkssj'),
						cls: 'readonly',
						readOnly: true,
						anchor: '95%'											//除去label后，控件所占有的宽度
			  	}]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	defaultType:'textfield',
			  	items:[{
					  	fieldLabel:' '+getResource('resourceParam6008')+getResource('resourceParam987')+''+getResource('resourceParam988')+'', // 6008报告
						name: 'zoubjssj',
						value: baowenView.record.get('zoubjssj'),
						cls: 'readonly',
						readOnly: true,
						anchor: '95%'											//除去label后，控件所占有的宽度
			  	}]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	defaultType: 'textfield',
			  	items:[{
					  	fieldLabel:''+getResource('resourceParam6015')+getResource('resourceParam988')+'', // 6015报告填写
						name: 'tianbsj',
						value: baowenView.record.get('tianbsj'),
						cls: 'readonly',
						readOnly: true,
						anchor: '95%'											//除去label后，控件所占有的宽度
			  	}]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	defaultType: 'textfield',
			  	items:[{
					  	fieldLabel:''+getResource('resourceParam1521')+'',
						name: 'yonghuId',
						value: baowenView.record.get('yonghuId'),
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
						name: 'zhuycjry',
						value: baowenView.record.get('zhuycjry'),
						cls: 'readonly',
						readOnly: true,
						anchor: '95%'											//除去label后，控件所占有的宽度
			  	}]
			  }]
		}]
	}); 
}

baowenView.hide = function(){
	baowenView.win.hide();
}

baowenView.destroyWin = function(){
	if (baowenView.win){
		baowenView.win  = null;
	}
}
