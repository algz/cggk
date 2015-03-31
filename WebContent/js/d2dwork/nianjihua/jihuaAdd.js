var planAdd = {
	win:null,
	form:null
};

planAdd.init = function(){
	if (planAdd.win){
		planAdd.win.destroy();
		planAdd.win = null;
	}		
	planAdd.tabInit();
	planAdd.form_Init();
	planAdd.win_init();
	
	planAdd.win.add(planAdd.form);
	planAdd.win.add(planAdd.tab);
	planAdd.win.show();
}

planAdd.tabInit = function(){
	planAdd.tab = new Ext.TabPanel({
		region: 'center',
		activeTab: 0,
		buttonAlign: 'center',
		items: [{
			title: ''+getResource('resourceParam1256')+'',
			items: new Ext.form.HtmlEditor({
				id: 'jhbeizhu',
				hieght: 100,
				width: 615,
				fontFamilies: ['宋体','黑体','隶书','幼圆','Arial','Courier New','Tahoma','Times New Roman','Verdana'],
				defaultFont: '宋体'
			})
		}]
	});
}

planAdd.win_init = function(){
	if (!planAdd.win){
		//首先在网页上生成id为'add'的元素(容器)
		tlework.addHtml(tlework.divHtml, 'add_jh');
		//初始化窗体
		planAdd.win = new Ext.Window({
			el: 'add_jh',
			title: ''+getResource('resourceParam466')+''+getResource('resourceParam1046')+'',
			layout: 'border',
			resizable: false,
			modal: true,
			width: 630,
			height: 465,
			closeAction: 'hide',								//点击"x"的动作
			plain: false,
			buttonAlign: 'center',
			buttons:[{
				text: ''+getResource('resourceParam479')+'',
				handler: function(button){
					button.disable();
					planAjax.add(planAdd.form, planAdd.win);
					button.enable();
				}
			},{
				text: '取消',
				handler:function(){
					planAdd.destroyWin();
					planAdd.form = null;
				}
			}]
		});
	}
	planAdd.win.on('hide', planAdd.destroyWin);
}

planAdd.form_Init = function(){
	
	planAdd.form = new Ext.form.FormPanel({
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
			  		blankText: '请'+getResource('resourceParam494')+'工作'+getResource('resourceParam1046')+'的'+getResource('resourceParam480')+'',
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
			 		userMain.init('forLindaoId', ''+getResource('resourceParam1237')+'处领导', 'lindaoId', '100%', false, false, "")
			 	]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	defaultType: 'textfield',
			  	items:[{
					  	fieldLabel:''+getResource('resourceParam1359')+'',
						name: 'canyuren',
						allowBlank: true,
						anchor: '95%'											//除去label后，控件所占有的宽度
			  	}]
			  },{
			 	columnWidth:0.5,
			 	layout:'form',
			 	items:[
			 		userMain.init('forBjiaoId', 'B角', 'bjiaoId', '100%', true, false, "")
			 	]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	defaultType: 'textfield',
			  	items:[{
					  	fieldLabel:''+getResource('resourceParam997')+'(%)',
						name: 'wancjind',
						allowBlank: true,
						anchor: '95%'											//除去label后，控件所占有的宽度
			  	}]
			  },{
			 	columnWidth:0.5,
			 	layout:'form',
			 	items:[
			 		userMain.init('forFuzheren', ''+getResource('resourceParam1034')+'', 'fuzheren', '100%', false, false, "")
			 	]
			  },{
			  	columnWidth:0.5,
			  	layout:'form',
			  	items:[{
			  			xtype: 'datefield',
					  	fieldLabel:''+getResource('resourceParam1241')+'',
						name: 'jhkaissj',
						format: 'Y-n-j',
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
						allowBlank: true,
						blankText: ''+getResource('resourceParam459')+''+getResource('resourceParam992')+'',
						anchor: '100%'											//除去label后，控件所占有的宽度
			  	}]
			  }]
		}]
	}); 
}

planAdd.destroyWin = function(){
	if (planAdd.win){
		planAdd.win.hide();
		planAdd.win.destroy();
		planAdd.win  = null;
	}
}
