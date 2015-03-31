var MyTaskFeedBackHandler = {
    byPlan : null,
	byStep : null,
	bySubTask : null,
	updateAmount : null,
	bySubTaskAmount : null
};

MyTaskFeedBackHandler.updateAmount = function(record, completedamount, completedquantity) {
	record.set('completedamount', completedamount);
	var oldValue = record.get('completedamount');
	Ext.Ajax.request( {
		url : '../JSON/mytask_MyTaskRemote.modifyTaskAmount',
		method : 'POST',
		success : function(response, options) {
			var obj = Ext.util.JSON.decode(response.responseText);
			if (obj.success == true) {
				record.commit();
			} else {
				record.set('completedamount', oldValue);
				record.commit();
				Ext.MessageBox.show( {
					title : '' + getResource('resourceParam499') + '',
					msg : obj.message,
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
			}
		},
		disableCaching : true,
		autoAbort : true,
		params : {
			taskid : record.get('taskid'),
			taskdesignate : record.get('taskdesignate'),
			completedamount : completedamount,
			completedquantity : completedquantity
		}
	});
}

// 通过填写计划量和完成量来计算任务的进度
MyTaskFeedBackHandler.byPlan = function(record) {
	var form = new Ext.FormPanel({
		bodyStyle : 'padding:5px 5px 5px 5px',
		autoScroll : true,
		split : true,
		border : false,
		labelWidth : 80,
		width : 235,
		height : 130,
		frame : true,
		items : [{
			xtype : 'numberfield',
			fieldLabel : '' + getResource('resourceParam9129') + '', // 计划完成量
			name : 'plan',
			disabled : true,
			width : 105,
			value : record.get('plannedquantity')
		}, {
			xtype : 'numberfield',
			fieldLabel : '' + getResource('resourceParam9130') + '', // 实际完成量
			name : 'complet',
			allowBlank : false,
			width : 105,
			value : record.get('completedquantity') && record.get('completedquantity')!='' ? record.get('completedquantity') : '',
			listeners : {
				blur : function(field) {
					var plan = form.getForm().findField('plan').getValue();
					if(plan && field.getValue() > plan) {
						field.setValue(plan);
					}
					
					var oldAmount = form.getForm().findField('amount').getValue();
					var complet = field.getValue();
					if(plan && complet && plan!='' && complet!='') {
						var amount = (complet * 100) / (plan);
						amount = amount < 1 ? 1 : amount;
						amount = amount > 99 ? 99 : amount;
						amount = parseInt(amount);
						if(oldAmount!=amount) {
							Ext.getCmp('msgLabel').show();
						} else {
							Ext.getCmp('msgLabel').hide();
						}
					}
				}
			}
		}, {
			border : false,
			width : 200,
			items : [{
				border : false,
				layout : 'column',
				items : [{
					width : 130,
					layout : 'form',
					labelWidth : 80,
					border : false,
					items : [{
						xtype : 'numberfield',
						width : 42,
						minValue : 1,
						maxValue : 99,
						value : record.get('completedamount') && record.get('completedamount')!='' ? record.get('completedamount') : '',
						fieldLabel : '' + getResource('resourceParam9131') + '',
						name : 'amount',
						allowBlank : false,
						listeners : {
							blur : function(field) {
								var oldAmount = form.getForm().findField('amount').getValue();
								var plan = form.getForm().findField('plan').getValue();
								var complet = form.getForm().findField('complet').getValue();
								if(plan && complet && plan!='' && complet!='') {
									var amount = (complet * 100) / (plan);
									amount = amount < 1 ? 1 : amount;
									amount = amount > 99 ? 99 : amount;
									amount = parseInt(amount);
									if(oldAmount!=amount) {
										Ext.getCmp('msgLabel').show();
									} else {
										Ext.getCmp('msgLabel').hide();
									}
								}
							}
						}
					}]
				}, {
					width : 25,
					border : false,
					html : '<div valign="middle" align="left">&nbsp;%</div>'
				}, {
					width : 28,
					xtype : 'button',
					text : '' + getResource('resourceParam9132') + '',
					handler : function() {
						var plan = form.getForm().findField('plan').getValue();
						var complet = form.getForm().findField('complet').getValue();
						var amount = (complet * 100) / (plan);
						amount = amount < 1 ? 1 : amount;
						amount = amount > 99 ? 99 : amount;
						form.getForm().findField('amount').setValue(parseInt(amount));
						Ext.getCmp('msgLabel').hide();
					}
				}]
			}]
		}, {
			border : false,	
			id : 'msgLabel',
			 frame : true, 
			hidden : true,
			html : '<font color=red>' + getResource('resourceParam9135') + '</font>'
		}]
	});
	var window = new Ext.Window({
		title : "" + getResource('resourceParam9128') + "",
		width : 253,
		height : 200,
		buttonAlign : 'center',
		resizable : false,
		modal : true,
		plain : true,
		bodystyle : 'padding:5px',
		buttonAlign : 'center',
		items : [form],
		buttons : [{
			width : 50,
			text : "" + getResource('resourceParam479') + "",
			handler : function() {
				var amount = form.getForm().findField('amount').getValue();
				var complet = form.getForm().findField('complet').getValue();
				if(form.getForm().findField('amount').isValid() && form.getForm().findField('complet').isValid()) {
					MyTaskFeedBackHandler.updateAmount(record, amount, complet);
					window.close();
				}
			}
		}, {
			width : 50,
			text : "" + getResource('resourceParam2006') + "",
			handler : function() {
				window.close();
			}
		}]
	});
	window.show();
};

// 通过任务阶段反馈任务完成进度的处理方法
MyTaskFeedBackHandler.byStep = function(record) {
	var phase = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : '../JSON/taskCateGory_taskPhase_TaskPhaseRemote.queryTaskPhase'
		}),
		baseParams : {
			taskcategoryid : record.get('taskcategoryid')
		},
		reader : new Ext.data.JsonReader({
			totalProperty : 'totalProperty',
			root : 'results'
		}, [{
			name : 'phasepercent'
		}, {
			name : 'phasename'
		}, {
			name : 'taskphaseid'
		}])
	});
	var phaseCombo = new Ext.form.ComboBox({
		store : phase,
		fieldLabel : '' + getResource('resourceParam7073') + getResource('resourceParam607')+'',
		hiddenName : 'phase',
		valueField : "taskphaseid",
		displayField : "phasename",
		mode : 'remote',
		editable : false,
		allowBlank : false,
		disabled : false,
		forceSelection : true,
		triggerAction : 'all',
		labelStyle : 'padding:5px 0px 5px 0px',
		style : 'margin-bottom: 5px;',
		tpl:'<tpl for="."><div class="x-combo-list-item" qtip="{phasename}">{phasename}</div></tpl>',
		resizable:true,
		width : 130,
		listeners : {
			select : function(combo, rec, index) {
				Ext.getCmp('stepAmount').setValue(rec.get('phasepercent'));
			}
		}
	});	
	var form = new Ext.FormPanel({
		bodyStyle : 'padding:5px 5px',
//		autoScroll : true,
		split : true,
		border : false,
		labelWidth : 120,
		width : 300,
		height : 85,
		frame : true,
		items : [phaseCombo, {
			border : false,
			items : [{
				border : false,
				layout : 'column',
				items : [{
					columnWidth:0.8,
					layout : 'form',
					labelWidth : 120,
					border : false,
					items : [{
						xtype : 'numberfield',
						id : 'stepAmount',
						width : 85,
						minValue : 1,
						maxValue : 99,
						readOnly : true,
						fieldLabel : '' + getResource('resourceParam9131') + '',
						name : 'amount'
					}]
				}
				, {
					columnWidth:0.1,
					border : false,
					html : '%'
				}
				]
			}]
		}]
	});
	var window = new Ext.Window({
		title : "" + getResource('resourceParam9128') + "",
		width : 293,
		height : 155,
		buttonAlign : 'center',
		resizable : false,
		modal : true,
		plain : true,
		bodystyle : 'padding:5px',
		buttonAlign : 'center',
//		layout:'fit',
		items : [form],
		buttons : [{
			width : 50,
			text : "" + getResource('resourceParam479') + "",
			handler : function() {
				var amount = form.getForm().findField('amount').getValue();
				if(form.getForm().findField('phase').isValid()) {
					MyTaskFeedBackHandler.updateAmount(record, amount);
					window.close();
				}
			}
		}, {
			width : 50,
			text : "" + getResource('resourceParam2006') + "",
			handler : function() {
				window.close();
			}
		}]
	});
	window.show();
};

// 根据子任务的完成进度计算出父任务完成进度（平均）的反馈方式的处理方法
MyTaskFeedBackHandler.bySubTask = function(record) {
	Ext.Msg.confirm('提示',"" + getResource('resourceParam9136') + "",function(btn){
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : '../JSON/mytask_MyTaskRemote.updateAmountBySubTask',
				method : 'post',
				disableCaching : true,
				autoAbort : true,
				success : function(response, options) {
					var obj = Ext.util.JSON.decode(response.responseText);
					record.set('completedamount', obj.amount);
					record.commit();
				},
				params : {taskid : record.get('taskid')}
			});
		}
	});
};

// 根据子任务的完成进度计算出父任务完成进度（根据子任务所占权重）的反馈方式的处理方法
MyTaskFeedBackHandler.bySubTaskAmount = function(record) {
}