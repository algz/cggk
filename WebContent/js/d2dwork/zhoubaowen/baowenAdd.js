var baowenAdd = {
	win:null,
	form_week:null,
	form_month:null
};

baowenAdd.week_init = function(){
	if (baowenAdd.win){
		baowenAdd.win.destroy();
		baowenAdd.win = null;
	}
	baowenAdd.itemInit();
	baowenAdd.tab_week_init();
	baowenAdd.form_week_Init();
	baowenAdd.win_init("1");
	baowenAdd.state = "1";
	
	baowenAdd.win.add(baowenAdd.form_week);
	baowenAdd.win.add(baowenAdd.tab_week);
	baowenAdd.win.show();
}

baowenAdd.month_init = function(){
	if (baowenAdd.win){
		baowenAdd.win.destroy();
		baowenAdd.win = null;
	}
	baowenAdd.itemInit();
	baowenAdd.tab_month_init();
	baowenAdd.form_month_Init();
	baowenAdd.win_init("2");
	baowenAdd.state = "2";
	
	baowenAdd.win.add(baowenAdd.form_month);
	baowenAdd.win.add(baowenAdd.tab_month);
	baowenAdd.win.show();
}

baowenAdd.itemInit = function(){
	baowenAdd.gzmubiao = new Ext.form.HtmlEditor({
		region:'center',
		id: 'gzmubiao',
		width: 567,
		fontFamilies: ['宋体','黑体','隶书','幼圆','Arial','Courier New','Tahoma','Times New Roman','Verdana'],
		defaultFont: '宋体'
	});
	baowenAdd.ztigzjih = new Ext.form.HtmlEditor({
		region:'center',
		id: 'ztigzjih',
		width: 567,
		fontFamilies: ['宋体','黑体','隶书','幼圆','Arial','Courier New','Tahoma','Times New Roman','Verdana'],
		defaultFont: '宋体'
	});
	baowenAdd.beizhu = new Ext.form.HtmlEditor({
		region:'center',
		id: 'beizhu',
		width: 567,
		fontFamilies: ['宋体','黑体','隶书','幼圆','Arial','Courier New','Tahoma','Times New Roman','Verdana'],
		defaultFont: '宋体'
	});
	baowenAdd.cunzaiwt = new Ext.form.HtmlEditor({
		region:'center',
		id: 'cunzaiwt',
		width: 567,
		fontFamilies: ['宋体','黑体','隶书','幼圆','Arial','Courier New','Tahoma','Times New Roman','Verdana'],
		defaultFont: '宋体'
	});
	baowenAdd.bwanchqk = new Ext.form.HtmlEditor({
		region:'center',
		id: 'bwanchqk',
		width: 567,
		fontFamilies: ['宋体','黑体','隶书','幼圆','Arial','Courier New','Tahoma','Times New Roman','Verdana'],
		defaultFont: '宋体'
	});
	baowenAdd.xwanchqk = new Ext.form.HtmlEditor({
		region:'center',
		id: 'xwanchqk',
		width: 567,
		fontFamilies: ['宋体','黑体','隶书','幼圆','Arial','Courier New','Tahoma','Times New Roman','Verdana'],
		defaultFont: '宋体'
	});
}

baowenAdd.tab_week_init = function(){
	
	baowenAdd.tab_week = new Ext.TabPanel({
		region: 'center',
		activeTab: 0,
		//deferredRender:true,										//渲染延迟
		autoTabs:true,
		items: [{
			title: ''+getResource('resourceParam6005')+'', // 工作目标
			layout:'border',
			items: baowenAdd.gzmubiao
		},{
			title: ''+getResource('resourceParam6006')+''+getResource('resourceParam1046')+'', // 总体工作
			layout:'border',
			items: baowenAdd.ztigzjih
		},{
			title: ''+getResource('resourceParam1685')+'',
			layout:'border',
			items: baowenAdd.cunzaiwt
		},{
			title: ''+getResource('resourceParam1286')+'',
			layout:'border',
			items: baowenAdd.bwanchqk
		},{
			title: ''+getResource('resourceParam6007')+''+getResource('resourceParam1046')+'', // 下周(月/季)
			layout:'border',
			items: baowenAdd.xwanchqk
		},{
			title: ''+getResource('resourceParam1256')+'',
			layout:'border',
			items: baowenAdd.beizhu
		}]
	});
}

baowenAdd.tab_month_init = function(){
	
	baowenAdd.tab_month = new Ext.TabPanel({
		region: 'center',
		activeTab: 0,
		//deferredRender:true,										//渲染延迟
		autoTabs:true,
		items: [{
			title: ''+getResource('resourceParam6005')+'',// 工作目标
			layout:'border',
			items: baowenAdd.gzmubiao
		},{
			title: ''+getResource('resourceParam1685')+'',
			layout:'border',
			items: baowenAdd.cunzaiwt
		},{
			title: ''+getResource('resourceParam1286')+'',
			layout:'border',
			items: baowenAdd.bwanchqk
		},{
			title: ''+getResource('resourceParam6007')+''+getResource('resourceParam1046')+'', // 下周(月/季)
			layout:'border',
			items: baowenAdd.xwanchqk
		},{
			title: ''+getResource('resourceParam1256')+'',
			layout:'border',
			items: baowenAdd.beizhu
		}]
	});
}

baowenAdd.win_init = function(size){
	if (!baowenAdd.win){
		if (size == "1"){
			//首先在网页上生成id为'add'的元素(容器)
			tlework.addHtml(tlework.divHtml, 'add_bw');
			//初始化窗体
			baowenAdd.win = new Ext.Window({
				el: 'add_bw',
				title: ''+getResource('resourceParam477')+ '' + getResource('resourceParam6008'), // 报告
				layout: 'border',
				resizable: false,
				modal: true,
				width: 650,
				height: 435,
				autoScroll: true,
				closeAction: 'hide',								//点击"x"的动作
				plain: false,
				buttonAlign: 'center',
				buttons:[{
					text: ''+getResource('resourceParam479')+'',
					handler: function(button){
						button.disable();
						if (baowenAdd.state == "1"){
							baowenAjax.add(baowenAdd.form_week, "0", baowenAdd.win);
						}else if (baowenAdd.state == "2"){
							baowenAjax.add(baowenAdd.form_month, "1", baowenAdd.win);
						}
						button.enable();
					}
				},{
					text: ''+getResource('resourceParam6002')+'', // 取消
					handler: baowenAdd.hide
				}]
			});
		}else if (size == "2"){
			tlework.addHtml(tlework.divHtml, 'add_bw');
			//初始化窗体
			baowenAdd.win = new Ext.Window({
				el: 'add_bw',
				title: ''+getResource('resourceParam477')+ '' + getResource('resourceParam6008'), // 报告
				layout: 'border',
				resizable: false,
				modal: true,
				width: 610,
				height: 395,
				autoScroll: true,
				closeAction: 'hide',								//点击"x"的动作
				plain: false,
				buttonAlign: 'center',
				buttons:[{
					text: ''+getResource('resourceParam479')+'',
					handler: function(button){
						button.disable();
						if (baowenAdd.state == "1"){
							baowenAjax.add(baowenAdd.form_week, "0", baowenAdd.win);
						}else if (baowenAdd.state == "2"){
							baowenAjax.add(baowenAdd.form_month, "1", baowenAdd.win);
						}
						button.enable();
					}
				},{
					text: ''+getResource('resourceParam6002')+'', // 取消
					handler: baowenAdd.hide
				}]
			});
		}
	}
	baowenAdd.win.on('hide', baowenAdd.destroyWin);
}

baowenAdd.form_week_Init = function(){
	
	baowenAdd.form_week = new Ext.form.FormPanel({
		region: 'north',
		height:150,
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
			  		blankText: ''+getResource('resourceParam1683')+'',
			  		maxLength: '20',
			  		maxLengthText: ''+getResource('resourceParam1508')+'!',
			  		allowBlank: false,
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
					 	fieldLabel:''+getResource('resourceParam6008')+''+getResource('resourceParam481')+'', // 6008报告
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
					 	fieldLabel:''+getResource('resourceParam6008')+''+getResource('resourceParam481')+'('+getResource('resourceParam988')+')', // 6008报告
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
						mode: 'local',
						forceSelection: true,
						editable: false,
						triggerAction: 'all',
					 	allowBlank: false,
					 	emptyText: ''+getResource('resourceParam459')+getResource('resourceParam6014')+getResource('resourceParam988')+''+getResource('resourceParam481')+'', // 6014报告的
					 	anchor:'100%'
			    }]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	defaultType: 'textfield',
			  	items:[{
					  	fieldLabel:''+getResource('resourceParam1359')+'',
						name: 'zhuycjry',
						allowBlank: false,
						anchor: '95%'											//除去label后，控件所占有的宽度
			  	}]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	defaultType: 'textfield',
			  	items:[{
					  	fieldLabel:''+getResource('resourceParam997')+'(%)',
						name: 'zongtijd',
						allowBlank: true,
						anchor: '100%'											//除去label后，控件所占有的宽度
			  	}]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	items:[{
			  			xtype: 'datefield',
					  	fieldLabel:''+getResource('resourceParam6008')+''+getResource('resourceParam723')+'', // 6008报告
						name: 'zoubkssj',
						format: 'Y-n-j',
						allowBlank: false,
						blankText: ''+getResource('resourceParam459')+''+getResource('resourceParam6008')+''+getResource('resourceParam723')+'', // 6008报告
						anchor: '95%'											//除去label后，控件所占有的宽度
			  	}]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	items:[{
			  			xtype: 'datefield',
					  	fieldLabel:''+getResource('resourceParam6008')+''+getResource('resourceParam987')+''+getResource('resourceParam988')+'', // 6008报告
						name: 'zoubjssj',
						format: 'Y-n-j',
						allowBlank: true,
						blankText: ''+getResource('resourceParam459')+''+getResource('resourceParam6008')+''+getResource('resourceParam987')+''+getResource('resourceParam988')+'', // 6008报告
						anchor: '100%'											//除去label后，控件所占有的宽度
			  	}]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	items:[{
			  			xtype: 'datefield',
					  	fieldLabel:getResource('resourceParam6015')+''+getResource('resourceParam988')+'', // 6015报告填写
						name: 'tianbsj',
						format: 'Y-n-j',
						allowBlank: false,
						blankText: ''+getResource('resourceParam459')+''+getResource('resourceParam6015')+''+getResource('resourceParam988')+'', // 6015报告填写
						anchor: '95%'											//除去label后，控件所占有的宽度
			  	}]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	items:[
			  		userMain.init('forXmufuzer', ''+getResource('resourceParam1034')+'', 'xmufuzer', '100%', false, false, "")
			  	]
			  }]
		}]
	}); 
}

baowenAdd.form_month_Init = function(){

	baowenAdd.form_month = new Ext.form.FormPanel({
		region: 'north',
		height:145,
		labelWidth:100,
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
					 	fieldLabel:''+getResource('resourceParam6008')+''+getResource('resourceParam481')+'', // 6008报告
					 	name:'zoubaolx',
						value: ''+getResource('resourceParam6016')+'', // 6016运行、管理类
						readOnly: true,
					 	anchor:'95%'
			    }]
			  },{
			 	columnWidth:0.5,
			 	layout:'form',
			 	items:[{
			 			xtype: 'combo',
					 	fieldLabel:' '+getResource('resourceParam6008')+''+getResource('resourceParam481')+'('+getResource('resourceParam988')+')', // 6008报告
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
						mode: 'local',
						forceSelection: true,
						editable: false,
						triggerAction: 'all',
					 	allowBlank: false,
					 	emptyText: ''+getResource('resourceParam459')+getResource('resourceParam6014')+''+getResource('resourceParam988')+''+getResource('resourceParam481')+'', // 6014报告的
					 	anchor:'95%'
			    }]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	defaultType:'textfield',
			  	items:[{
			  		fieldLabel: ''+getResource('resourceParam1686')+'',
			  		name: 'mingchen',
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
					  	fieldLabel:''+getResource('resourceParam6008')+''+getResource('resourceParam723')+'', // 6008报告
						name: 'zoubkssj',
						format: 'Y-n-j',
						allowBlank: false,
						blankText: ''+getResource('resourceParam459')+''+getResource('resourceParam6008')+''+getResource('resourceParam723')+'', // 6008报告
						anchor: '95%'											//除去label后，控件所占有的宽度
			  	}]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	items:[{
			  			xtype: 'datefield',
					  	fieldLabel:' '+getResource('resourceParam6008')+''+getResource('resourceParam987')+''+getResource('resourceParam988')+'', // 6008报告
						name: 'zoubjssj',
						format: 'Y-n-j',
						allowBlank: true,
						blankText: ''+getResource('resourceParam459')+''+getResource('resourceParam6008')+''+getResource('resourceParam987')+''+getResource('resourceParam988')+'', // 6008报告
						anchor: '95%'											//除去label后，控件所占有的宽度
			  	}]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	items:[{
			  			xtype: 'datefield',
					  	fieldLabel:getResource('resourceParam6015')+''+getResource('resourceParam988')+'', // 6015报告填写
						name: 'tianbsj',
						format: 'Y-n-j',
						allowBlank: false,
						blankText: ''+getResource('resourceParam459')+getResource('resourceParam6015')+''+getResource('resourceParam988')+'', // 6015报告填写
						anchor: '95%'											//除去label后，控件所占有的宽度
			  	}]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	defaultType: 'textfield',
			  	items:[{
					  	fieldLabel:''+getResource('resourceParam1359')+'',
						name: 'zhuycjry',
						allowBlank: false,
						anchor: '95%'											//除去label后，控件所占有的宽度
			  	}]
			  }]
		}]
	});
}

baowenAdd.hide = function(){
	baowenAdd.win.hide();
}

baowenAdd.destroyWin = function(){
	if (baowenAdd.win){
		baowenAdd.win.destroy();
		baowenAdd.win  = null;
	}
}
