var planQuery = {
	win:null,
	form:null
};

planQuery.init = function(){
	if (planQuery.win){
		planQuery.win = null;
	}	
	planQuery.form_Init();
	planQuery.win_init();
	
	planQuery.win.add(planQuery.form);
	planQuery.win.show();
}

planQuery.win_init = function(){
	if (!planQuery.win){
		//首先在网页上生成id为'query_jh'的元素(容器)
		tlework.addHtml(tlework.divHtml, 'query_jh');
		//初始化窗体
		planQuery.win = new Ext.Window({
			el: 'query_jh',
			title: '检索'+getResource('resourceParam1046')+'',
			layout: 'fit',
			resizable: false,
			modal: true,
			width: 335,
			height: 240,
			autoScroll: true,
			closeAction: 'hide',								//点击"x"的动作
			plain: false,
			buttonAlign: 'center',
			buttons:[{
				text: ''+getResource('resourceParam479')+'',
				handler: function(){
					planAjax.query(planQuery.form);
				}
			},{
				text: '取消',
				handler: planQuery.hide
			}]
		});
	}
	planQuery.win.on('hide', planQuery.destroyWin);
}

planQuery.form_Init = function(){
	
	planQuery.form = new Ext.form.FormPanel({
		labelWidth:80,
		frame:true,
		plain:false,
		defaultType: 'textfield',
		bodyStyle:'padding:5px 5px 0',
		items:[{
			  		fieldLabel: ''+getResource('resourceParam1046')+''+getResource('resourceParam480')+'',
			  		name: 'jihuamc',
			  		maxLength: '20',
			  		maxLengthText: ''+getResource('resourceParam1508')+'!',
			  		allowBlank: true,
			  		anchor: '100%'
			  	},{
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
					forceSelection: false,
					editable: false,
					triggerAction: 'all',
					allowBlank: true,
					emptyText: ''+getResource('resourceParam459')+''+getResource('resourceParam1046')+'来源',
					anchor:'100%'
			    },{
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
					forceSelection: false,
					editable: false,
					triggerAction: 'all',
					allowBlank: true,
					emptyText: ''+getResource('resourceParam459')+''+getResource('resourceParam1046')+''+getResource('resourceParam481')+'',
					anchor:'100%'
			   },
			 		userMain.init('forFuzheren', ''+getResource('resourceParam1034')+'', 'fuzheren', '100%', true, false, ""),
					userMain.init('forYonghuId', ''+getResource('resourceParam1521')+'', 'yonghuId', '100%', true, false, "")
			   ,{
					xtype : 'datefield',
					fieldLabel : ''+getResource('resourceParam1241')+'',
					name : 'jhkaissj',
					format: 'Y-n-j',
					allowBlank : true,
					blankText : ''+getResource('resourceParam459')+''+getResource('resourceParam1241')+'',
					anchor : '100%'											//除去label后，控件所占有的宽度
			  	}]
	}); 
}

planQuery.hide = function(){
	planQuery.win.hide();
}

planQuery.destroyWin = function(){
	if (planQuery.win){
		planQuery.win.destroy();
		planQuery.win  = null;
	}
}
