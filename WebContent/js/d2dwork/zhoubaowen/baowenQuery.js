var baowenQuery = {
	win:null,
	form_week:null,
	form_month:null
};

baowenQuery.week_init = function(){
	if (baowenQuery.win){
		baowenQuery.win.destroy();
		baowenQuery.win = null;
	}	
	baowenQuery.form_week_Init();
	baowenQuery.win_init();
	baowenQuery.state = "1";
	
	baowenQuery.win.add(baowenQuery.form_week);
	baowenQuery.win.show();
}

baowenQuery.month_init = function(){
	if (baowenQuery.win){
		baowenQuery.win.destroy();
		baowenQuery.win = null;
	}
	baowenQuery.form_month_Init();
	baowenQuery.win_init();
	baowenQuery.state = "2";
	
	baowenQuery.win.add(baowenQuery.form_month);
	baowenQuery.win.show();
}

baowenQuery.win_init = function(){
	if (!baowenQuery.win){
		//首先在网页上生成id为'query_bw'的元素(容器)
		tlework.addHtml(tlework.divHtml, 'query_bw');
		//初始化窗体
		baowenQuery.win = new Ext.Window({
			el: 'query_bw',
			title: getResource('resourceParam6023')+'', // '检索报文'
			layout: 'fit',
			resizable: false,
			modal: true,
			width: 350,
			height: 240,
			autoScroll: true,
			closeAction: 'hide',								//点击"x"的动作
			plain: false,
			buttonAlign: 'center',
			buttons:[{
				text: ''+getResource('resourceParam479')+'',
				handler: function(){
					if (baowenQuery.state == "1"){
						baowenAjax.query(baowenQuery.form_week, '0');
					}else if (baowenQuery.state == "2"){
						baowenAjax.query(baowenQuery.form_month, '1');					
					}
				}
			},{
				text: ''+getResource('resourceParam6002')+'', // 取消
				handler: baowenQuery.hide
			}]
		});
	}
	baowenQuery.win.on('hide', baowenQuery.destroyWin);
}

baowenQuery.form_week_Init = function(){
	
	baowenQuery.form_week = new Ext.form.FormPanel({
		labelWidth:90,
		frame:true,
		plain:false,
		defaultType: 'textfield',
		bodyStyle:'padding:5px 5px 0',
		items:[{
			  	fieldLabel: ''+getResource('resourceParam1035')+'',
			  	name: 'mingchen',
			  	blankText: ''+getResource('resourceParam1683')+'',
			  	maxLength: '20',
			  	maxLengthText: ''+getResource('resourceParam1508')+'!',
			  	allowBlank: true,
			  	anchor: '100%'
		},{
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
				forceSelection: false,
				editable: false,
				triggerAction: 'all',
				allowBlank: true,
				emptyText: ''+getResource('resourceParam1684')+'',
				anchor:'100%'
		},
			userMain.init('forXmufuzer', ''+getResource('resourceParam1034')+'', 'xmufuzer', '100%', true, false, "")
		,{
			 	xtype: 'combo',
				fieldLabel:getResource('resourceParam6024')+''+getResource('resourceParam481')+'('+getResource('resourceParam988')+')', // 6024报文
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
				forceSelection: false,
				editable: false,
				triggerAction: 'all',
				allowBlank: true,
				emptyText: ''+getResource('resourceParam459')+getResource('resourceParam6014')+getResource('resourceParam988')+''+getResource('resourceParam481')+'', // 6014报告的
				anchor:'100%'
		},
			userMain.init('forYonghuId', ''+getResource('resourceParam1521')+'', 'yonghuId', '100%', true, false, "")
		,{
				xtype: 'datefield',
				fieldLabel: ''+getResource('resourceParam1696')+'',
			  	name: 'zoubkssj',
			  	format: 'Y-m-d',
			  	allowBlank: true,
			  	anchor: '100%'
		}]
	}); 
}

baowenQuery.form_month_Init = function(){
	
	baowenQuery.form_month = new Ext.form.FormPanel({
		labelWidth:90,
		frame:true,
		plain:false,
		defaultType: 'textfield',
		bodyStyle:'padding:5px 5px 0',
		items:[{
				fieldLabel: ''+getResource('resourceParam1686')+'',
				name: 'mingchen',
			  	blankText: ''+getResource('resourceParam1695')+'',
			  	maxLength: '20',
			  	maxLengthText: ''+getResource('resourceParam1508')+'!',
			  	allowBlank: true,
			  	anchor: '100%'
		},{
			 	xtype: 'combo',
				fieldLabel:''+getResource('resourceParam6024')+getResource('resourceParam481')+'('+getResource('resourceParam988')+')', // 6024报文
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
				forceSelection: false,
				editable: false,
				triggerAction: 'all',
				allowBlank: true,
				emptyText: ''+getResource('resourceParam459')+''+getResource('resourceParam6014')+getResource('resourceParam988')+''+getResource('resourceParam481')+'', // 报告的
				anchor:'100%'
		},
			userMain.init('forYonghuId', ''+getResource('resourceParam1521')+'', 'yonghuId', '100%', true, false, "")
		,{
				xtype: 'datefield',
				fieldLabel: ''+getResource('resourceParam1696')+'',
			  	name: 'zoubkssj',
			  	format: 'Y-m-d',
			  	allowBlank: true,
			  	anchor: '100%'
		}]
	}); 
}

baowenQuery.hide = function(){
	baowenQuery.win.hide();
}

baowenQuery.destroyWin = function(){
	if (baowenQuery.win){
		baowenQuery.win.destroy();
		baowenQuery.win  = null;
	}
}
