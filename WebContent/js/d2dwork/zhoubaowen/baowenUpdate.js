var baowenUpdate = {
	win:null,
	form_week:null,
	form_month:null
};

baowenUpdate.week_init = function(){
	var rcs = baowenOther.sm_week.getSelections();
	if (rcs == null){
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam575')+'',
			msg: ''+getResource('resourceParam1524')+'',
			buttons: Ext.MessageBox.OK,
			icon: Ext.MessageBox.WARNING
		});
	}else if (rcs.length == 1){
		if (baowenUpdate.win){
			baowenUpdate.win.destroy();
			baowenUpdate.win = null;
		}
		baowenUpdate.record = baowenOther.sm_week.getSelected();
		baowenUpdate.itemInit();
		baowenUpdate.tab_week_init();
		baowenUpdate.form_week_Init();
		baowenUpdate.win_init("1");
		baowenUpdate.state = "1";
		
		baowenUpdate.win.add(baowenUpdate.form_week);
		baowenUpdate.win.add(baowenUpdate.tab_week);
		baowenUpdate.win.show();
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam575')+'',
			msg: ''+getResource('resourceParam1523')+'',
			buttons: Ext.MessageBox.OK,
			icon: Ext.MessageBox.WARNING
		});
	}
}

baowenUpdate.month_init = function(){
	var rcs = baowenOther.sm_month.getSelections();
	if (rcs == null){
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam575')+'',
			msg: ''+getResource('resourceParam1524')+'',
			buttons: Ext.MessageBox.OK,
			icon: Ext.MessageBox.WARNING
		});
	}else if (rcs.length == 1){
		if (baowenUpdate.win){
			baowenUpdate.win.destroy();
			baowenUpdate.win = null;
		}
		baowenUpdate.record = baowenOther.sm_month.getSelected();
		baowenUpdate.itemInit();
		baowenUpdate.tab_month_init();
		baowenUpdate.form_month_Init();
		baowenUpdate.win_init("2");
		baowenUpdate.state = "2";
		
		baowenUpdate.win.add(baowenUpdate.form_month);
		baowenUpdate.win.add(baowenUpdate.tab_month);
		baowenUpdate.win.show();
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam575')+'',
			msg: ''+getResource('resourceParam1523')+'',
			buttons: Ext.MessageBox.OK,
			icon: Ext.MessageBox.WARNING
		});
	}
}

baowenUpdate.itemInit = function(){
	baowenUpdate.gzmubiao = new Ext.form.HtmlEditor({
		region:'center',
		id: 'gzmubiao',
		value: baowenUpdate.record.get('gzmubiao'),
		width: 567,
		fontFamilies: ['宋体','黑体','隶书','幼圆','Arial','Courier New','Tahoma','Times New Roman','Verdana'],
		defaultFont: '宋体'
	});
	baowenUpdate.ztigzjih = new Ext.form.HtmlEditor({
		region:'center',
		id: 'ztigzjih',
		value: baowenUpdate.record.get('ztigzjih'),
		width: 567,
		fontFamilies: ['宋体','黑体','隶书','幼圆','Arial','Courier New','Tahoma','Times New Roman','Verdana'],
		defaultFont: '宋体'
	});
	baowenUpdate.beizhu = new Ext.form.HtmlEditor({
		region:'center',
		id: 'beizhu',
		value: baowenUpdate.record.get('beizhu'),
		width: 567,
		fontFamilies: ['宋体','黑体','隶书','幼圆','Arial','Courier New','Tahoma','Times New Roman','Verdana'],
		defaultFont: '宋体'
	});
	baowenUpdate.cunzaiwt = new Ext.form.HtmlEditor({
		region:'center',
		id: 'cunzaiwt',
		value: baowenUpdate.record.get('cunzaiwt'),
		width: 567,
		fontFamilies: ['宋体','黑体','隶书','幼圆','Arial','Courier New','Tahoma','Times New Roman','Verdana'],
		defaultFont: '宋体'
	});
	baowenUpdate.bwanchqk = new Ext.form.HtmlEditor({
		region:'center',
		id: 'bwanchqk',
		value: baowenUpdate.record.get('bwanchqk'),
		width: 567,
		fontFamilies: ['宋体','黑体','隶书','幼圆','Arial','Courier New','Tahoma','Times New Roman','Verdana'],
		defaultFont: '宋体'
	});
	baowenUpdate.xwanchqk = new Ext.form.HtmlEditor({
		region:'center',
		id: 'xwanchqk',
		value: baowenUpdate.record.get('xwanchqk'),
		width: 567,
		fontFamilies: ['宋体','黑体','隶书','幼圆','Arial','Courier New','Tahoma','Times New Roman','Verdana'],
		defaultFont: '宋体'
	});
}

baowenUpdate.tab_week_init = function(){
	
	baowenUpdate.tab_week = new Ext.TabPanel({
		region: 'center',
		activeTab: 0,
		//deferredRender:true,										//渲染延迟
		autoTabs:true,
		items: [{
			title: getResource('resourceParam6005')+'', // 6005工作目标
			layout:'border',
			items: baowenUpdate.gzmubiao
		},{
			title: getResource('resourceParam6006')+''+getResource('resourceParam1046')+'', // 6006总体工作
			layout:'border',
			items: baowenUpdate.ztigzjih
		},{
			title: ''+getResource('resourceParam1685')+'',
			layout:'border',
			items: baowenUpdate.cunzaiwt
		},{
			title: ''+getResource('resourceParam1286')+'',
			layout:'border',
			items: baowenUpdate.bwanchqk
		},{
			title: getResource('resourceParam6007')+''+getResource('resourceParam1046')+'', // 6007下周(月/季)
			layout:'border',
			items: baowenUpdate.xwanchqk
		},{
			title: ''+getResource('resourceParam1256')+'',
			layout:'border',
			items: baowenUpdate.beizhu
		}]
	});
}

baowenUpdate.tab_month_init = function(){
	
	baowenUpdate.tab_month = new Ext.TabPanel({
		region: 'center',
		activeTab: 0,
		//deferredRender:true,										//渲染延迟
		autoTabs:true,
		items: [{
			title: getResource('resourceParam6005')+'', // 6005工作目标
			layout:'border',
			items: baowenUpdate.gzmubiao
		},{
			title: ''+getResource('resourceParam1685')+'',
			layout:'border',
			items: baowenUpdate.cunzaiwt
		},{
			title: ''+getResource('resourceParam1286')+'',
			layout:'border',
			items: baowenUpdate.bwanchqk
		},{
			title: getResource('resourceParam6007')+''+getResource('resourceParam1046')+'', // 6007下周(月/季)
			layout:'border',
			items: baowenUpdate.xwanchqk
		},{
			title: ''+getResource('resourceParam1256')+'',
			layout:'border',
			items: baowenUpdate.beizhu
		}]
	});
}

baowenUpdate.win_init = function(size){
	if (!baowenUpdate.win){
		if (size == "1"){
			//首先在网页上生成id为'add'的元素(容器)
			tlework.addHtml(tlework.divHtml, 'update_bw');
			//初始化窗体
			baowenUpdate.win = new Ext.Window({
				el: 'update_bw',
				title: ''+getResource('resourceParam478')+getResource('resourceParam6024'), // 6024报文
				layout: 'border',
				resizable: false,
				modal: true,
				width: 630,
				height: 445,
				autoScroll: true,
				closeAction: 'hide',								//点击"x"的动作
				plain: false,
				buttonAlign: 'center',
				buttons:[{
					text: ''+getResource('resourceParam479')+'',
					handler: function(button){
						button.disable();
						var id = baowenUpdate.record.get('zoubaoId');
						if (baowenUpdate.state == "1"){
							baowenAjax.update(baowenUpdate.form_week, "0", baowenUpdate.win, id);
						}else if (baowenUpdate.state == "2"){
							baowenAjax.update(baowenUpdate.form_month, "1", baowenUpdate.win, id);					
						}
						button.enable();
					}
				},{
					text: ''+getResource('resourceParam6002')+'', // 取消
					handler: baowenUpdate.hide
				}]
			});
		}else if (size == "2"){
			tlework.addHtml(tlework.divHtml, 'update_bw');
			//初始化窗体
			baowenUpdate.win = new Ext.Window({
				el: 'update_bw',
				title: ''+getResource('resourceParam478')+getResource('resourceParam6024'), // 6024报文
				layout: 'border',
				resizable: false,
				modal: true,
				width: 580,
				height: 425,
				autoScroll: true,
				closeAction: 'hide',								//点击"x"的动作
				plain: false,
				buttonAlign: 'center',
				buttons:[{
					text: ''+getResource('resourceParam479')+'',
					handler: function(button){
						button.disable();
						var id = baowenUpdate.record.get('zoubaoId');
						if (baowenUpdate.state == "1"){
							baowenAjax.update(baowenUpdate.form_week, "0", baowenUpdate.win, id);
						}else if (baowenUpdate.state == "2"){
							baowenAjax.update(baowenUpdate.form_month, "1", baowenUpdate.win, id);					
						}
					button.enable();
					}
				},{
					text: ''+getResource('resourceParam6002')+'', // 取消
					handler: baowenUpdate.hide
				}]
			});
		}
	}
	baowenUpdate.win.on('hide', baowenUpdate.destroyWin);
}

baowenUpdate.form_week_Init = function(){
	
	baowenUpdate.form_week = new Ext.form.FormPanel({
		region: 'north',
		height:165,
		labelWidth:90,
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
			  		value: baowenUpdate.record.get('mingchen'),
			  		blankText: ''+getResource('resourceParam1683')+'',
			  		maxLength: '20',
			  		maxLengthText: ''+getResource('resourceParam1508')+'!',
			  		allowBlank: true,
			  		anchor: '95%'
			  	}]
			 },{
			 	columnWidth:0.5,
			 	layout:'form',
			 	items:[{
			 			xtype: 'combo',
					 	fieldLabel:''+getResource('resourceParam1037')+'',
					 	name:'xiangmlx',
						hiddenName: 'xiangmlx',
						store: new Ext.data.SimpleStore({
							fields: ["xiangmlx","displayText"],
							data: [
								[0,''+getResource('resourceParam6009')+''], // 总行
								[1,''+getResource('resourceParam6010')+''], // 总行要求分行自主开发
								[2,''+getResource('resourceParam6011')+''], // 分行
								[3,''+getResource('resourceParam6012')+''] // 中支
							]
						}),
						valueField: 'xiangmlx',
						displayField: 'displayText',
						value: baowenUpdate.record.get('xiangmlx'),
						mode: 'local',
						forceSelection: true,
						editable: false,
						triggerAction: 'all',
					 	allowBlank: false,
					 	emptyText: ''+getResource('resourceParam1684')+'',
					 	anchor:'100%'
			    }]
			  },{
			 	columnWidth:0.5,
			 	layout:'form',
			 	items:[{
			 			xtype: 'textfield',
					 	fieldLabel:getResource('resourceParam6008')+''+getResource('resourceParam481')+'', // 6008报告
					 	name:'zoubaolx',
						value: ''+getResource('resourceParam463')+getResource('resourceParam6013')+'', // 6013类
						readOnly: true,
					 	anchor:'95%'
			    }]
			  },{
			 	columnWidth:0.5,
			 	layout:'form',
			 	items:[{
			 			xtype: 'combo',
					 	fieldLabel:getResource('resourceParam6008') + ''+getResource('resourceParam481')+'('+getResource('resourceParam988')+')', // 6008报告
					 	name:'zoubaobz',
						hiddenName: 'zoubaobz',
						store: new Ext.data.SimpleStore({
							fields: ["zoubaobz","displayText"],
							data: [
								[0,""+getResource('resourceParam1687')+""],
								[1,""+getResource('resourceParam1688')+""],
								[2,""+getResource('resourceParam1689')+""]
							]
						}),
						valueField: 'zoubaobz',
						displayField: 'displayText',
						value: baowenUpdate.record.get('zoubaobz'),
						mode: 'local',
						forceSelection: true,
						editable: false,
						triggerAction: 'all',
					 	allowBlank: false,
					 	emptyText: ''+getResource('resourceParam459')+getResource('resourceParam6014')+''+getResource('resourceParam988')+''+getResource('resourceParam481')+'', // 6014报告的
					 	anchor:'100%'
			    }]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	defaultType: 'textfield',
			  	items:[{
					  	fieldLabel:''+getResource('resourceParam1359')+'',
						name: 'zhuycjry',
						value: baowenUpdate.record.get('zhuycjry'),
						allowBlank: false,
						anchor: '95%'											//除去label后，控件所占有的宽度
			  	}]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	items:[{
			  			xtype: 'datefield',
					  	fieldLabel:''getResource('resourceParam6008') + getResource('resourceParam723')+'', // 6008报告
						name: 'zoubkssj',
						format: 'Y-n-j',
						value: baowenUpdate.record.get('zoubkssj'),
						allowBlank: false,
						blankText: ''+getResource('resourceParam459')+''+getResource('resourceParam6008')+getResource('resourceParam723')+'', // 6008报告
						anchor: '100%'											//除去label后，控件所占有的宽度
			  	}]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	items:[{
			  			xtype: 'datefield',
					  	fieldLabel:' ' + getResource('resourceParam6008') + getResource('resourceParam987')+''+getResource('resourceParam988')+'', // 6008报告
						name: 'zoubjssj',
						format: 'Y-n-j',
						value: baowenUpdate.record.get('zoubjssj'),
						allowBlank: true,
						blankText: ''+getResource('resourceParam459')+''+getResource('resourceParam6008')+getResource('resourceParam987')+''+getResource('resourceParam988')+'', // 6008报告
						anchor: '95%'											//除去label后，控件所占有的宽度
			  	}]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	items:[{
			  			xtype: 'datefield',
					  	fieldLabel:''+getResource('resourceParam6015') + getResource('resourceParam988')+'', // 6015报告填写
						name: 'tianbsj',
						format: 'Y-n-j',
						value: baowenUpdate.record.get('tianbsj'),
						allowBlank: false,
						blankText: ''+getResource('resourceParam459')+''+getResource('resourceParam6015')+getResource('resourceParam988')+'', // 6015报告填写
						anchor: '100%'											//除去label后，控件所占有的宽度
			  	}]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	defaultType: 'textfield',
			  	items:[{
					  	fieldLabel:''+getResource('resourceParam997')+'(%)',
						name: 'zongtijd',
						value: baowenUpdate.record.get('zongtijd'),
						allowBlank: true,
						anchor: '95%'											//除去label后，控件所占有的宽度
			  	}]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	items:[
			  		userMain.init('forXmufuzer', ''+getResource('resourceParam1034')+'', 'xmufuzer', '100%', false, true, baowenUpdate.record.get('xmufuzer'))
			  	]
			  }]
		}]
	}); 
}

baowenUpdate.form_month_Init = function(){

	baowenUpdate.form_month = new Ext.form.FormPanel({
		region: 'north',
		height:145,
		labelWidth:90,
		frame:true,
		plain:false,
		bodyStyle:'padding:5px 5px 0',
		items:[{
			layout:'column',
			items:[{
			 	columnWidth:0.5,
			 	layout:'form',
			 	items:[{
			 			xtype: 'textfield',
					 	fieldLabel:''+getResource('resourceParam6008')+getResource('resourceParam481')+'', // 6008报告
					 	name:'zoubaolx',
						value: ''+getResource('resourceParam6016'), // 运行、管理类
						readOnly: true,
					 	anchor:'95%'
			    }]
			  },{
			 	columnWidth:0.5,
			 	layout:'form',
			 	items:[{
			 			xtype: 'combo',
					 	fieldLabel:''+getResource('resourceParam6008')+getResource('resourceParam481')+'('+getResource('resourceParam988')+')', // 6008报告
					 	name:'zoubaobz',
						hiddenName: 'zoubaobz',
						store: new Ext.data.SimpleStore({
							fields: ["zoubaobz","displayText"],
							data: [
								[0,""+getResource('resourceParam1687')+""],
								[1,""+getResource('resourceParam1688')+""],
								[2,""+getResource('resourceParam1689')+""]
							]
						}),
						valueField: 'zoubaobz',
						displayField: 'displayText',
						value: baowenUpdate.record.get('zoubaobz'),
						mode: 'local',
						forceSelection: true,
						editable: false,
						triggerAction: 'all',
					 	allowBlank: false,
					 	emptyText: ''+getResource('resourceParam459')+''+getResource('resourceParam6014')+getResource('resourceParam988')+''+getResource('resourceParam481')+'', // 6014报告的
					 	anchor:'95%'
			    }]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	defaultType:'textfield',
			  	items:[{
			  		fieldLabel: ''+getResource('resourceParam1686')+'',
			  		name: 'mingchen',
			  		value: baowenUpdate.record.get('mingchen'),
			  		maxLength: '20',
			  		maxLengthText: ''+getResource('resourceParam1508')+'!',
			  		allowBlank: false,
			  		anchor: '95%'
			  	}]
			 },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	items:[{
			  			xtype: 'datefield',
					  	fieldLabel:''+getResource('resourceParam6008')+getResource('resourceParam723')+'', // 6008报告
						name: 'zoubkssj',
						format: 'Y-n-j',
						value: baowenUpdate.record.get('zoubkssj'),
						allowBlank: false,
						blankText: ''+getResource('resourceParam459')+''+getResource('resourceParam6008')+getResource('resourceParam723')+'', // 6008报告
						anchor: '95%'											//除去label后，控件所占有的宽度
			  	}]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	items:[{
			  			xtype: 'datefield',
					  	fieldLabel:' '+getResource('resourceParam6008')+getResource('resourceParam987')+''+getResource('resourceParam988')+'', // 6008报告
						name: 'zoubjssj',
						format: 'Y-n-j',
						value: baowenUpdate.record.get('zoubjssj'),
						allowBlank: true,
						blankText: ''+getResource('resourceParam459')+''+getResource('resourceParam6008')+getResource('resourceParam987')+''+getResource('resourceParam988')+'', // 6008报告
						anchor: '95%'											//除去label后，控件所占有的宽度
			  	}]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	items:[{
			  			xtype: 'datefield',
					  	fieldLabel:''+getResource('resourceParam6015')+getResource('resourceParam988')+'', // 6015报告填写
						name: 'tianbsj',
						format: 'Y-n-j',
						value: baowenUpdate.record.get('tianbsj'),
						allowBlank: false,
						blankText: ''+getResource('resourceParam459')+''+getResource('resourceParam6015')+getResource('resourceParam988')+'', // 6015报告填写
						anchor: '95%'											//除去label后，控件所占有的宽度
			  	}]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	defaultType: 'textfield',
			  	items:[{
					  	fieldLabel:''+getResource('resourceParam1359')+'',
						name: 'zhuycjry',
						value: baowenUpdate.record.get('zhuycjry'),
						allowBlank: false,
						anchor: '95%'											//除去label后，控件所占有的宽度
			  	}]
			  }]
		}]
	}); 
}

baowenUpdate.hide = function(){
	baowenUpdate.win.hide();
}

baowenUpdate.destroyWin = function(){
	if (baowenUpdate.win){
		baowenUpdate.win.destroy();
		baowenUpdate.win  = null;
	}
}
