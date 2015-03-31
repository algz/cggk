/**
 * 高级查询
 */
var zongheQuery = {
	queryDialog : null,
	zongheform : null,
	models : null,
	store : null,
	modelcombo : null,
	batchecombo : null,
    queryResult:"1"
};

/**
 * 查询面板初始化
 */
zongheQuery.init = function() {
	delete departmentUser.departmentCombo;
	delete departmentUser.userComb;
	departmentUser.init("" + getResource('resourceParam986') + "", "" + getResource('resourceParam731') + "");
	departmentUser.departmentCombo.anchor = '95%';
	departmentUser.userComb.anchor = '95%';
	departmentUser.userComb.allowBlank = true;
    
    zongheQuery.application=new Ext.form.ComboBox({
        store : new Ext.data.Store({
            proxy : new Ext.data.HttpProxy({
                        url : '../JSON/applicationop_tapplicationsvr.getApplicationList'
                    }),
            reader : new Ext.data.JsonReader({
                        totalProperty : 'totalProperty',
                        root : 'root'
                    }, [{
                                name : 'applicationid'
                            }, {
                                name : 'applicationname'
                            }])
        }),
        fieldLabel : '' + getResource('resourceParam558') + '',
        hiddenName : 'application',
        valueField : "applicationid",
        displayField : "applicationname",
        mode : 'remote',
        allowBlank : true,
        disabled : false,
        forceSelection : true,
        editable : false,
        triggerAction : 'all',
        emptyText : '' + getResource('resourceParam459') + ''
                + getResource('resourceParam558') + '...',
        labelStyle : 'padding:5px 0px 5px 0px',
        listeners : {
            select : function(combo, record, index) {
                zongheNorth.applicationname = record.get('applicationname');
            },
            beforequery : function(qe) {
                delete qe.combo.lastQuery;
                // this.store.load();
            }
        },
        style : 'margin-bottom: 5px;',
        anchor : '95%'
    });
    
    /**
     * 项目名称combox
     */
      zongheQuery.projectName = new Ext.form.ComboBox({
        store : new Ext.data.Store({
            proxy : new Ext.data.HttpProxy({
                        url : '../JSON/project_ProjectRemote.getProjectList'
                    }),
            baseParams : {
            	start : 0,
				limit : 6
            },
            reader : new Ext.data.JsonReader({
                        totalProperty : 'totalProperty',
                        root : 'root'
                    }, [{
                                name : 'projectid'
                            }, {
                                name : 'projectname'
                            }])
        }),
        fieldLabel : '项目名称',
        hiddenName : 'projectid',
        valueField : "projectid",
        displayField : "projectname",
        mode : 'remote',
        allowBlank : true,
        disabled : false,
        forceSelection : true,
        editable : false,
        triggerAction : 'all',
        emptyText : '' + getResource('resourceParam459') + '项目名称...',
        labelStyle : 'padding:5px 0px 5px 0px',
        pageSize : 6,
        listeners : {
            select : function(combo, record, index) {
            },
            beforequery : function(qe) {
                delete qe.combo.lastQuery;
                 this.store.load();
            }
        },
        style : 'margin-bottom: 5px;',
        anchor : '95%'
    });
    
	if (!zongheQuery.queryDialog) {
		tlework.addHtml(tlework.divHtml, "zongheQuery");
		zongheQuery.queryDialog = new Ext.Window({
			el : 'zongheQuery',
			title : '' + getResource('resourceParam1700') + '',
			modal : true,
			layout : 'border',
			width : '75%',
			height : 270,
			closeAction : 'hide',
			plain : false,
			items : zongheQuery.queryzongheform()
		});
	}

	zongheQuery.zongheform.getComponent(0).insert(2, {
		columnWidth : .5,
		layout : 'form',
		items : [{
			xtype : 'datefield',
			fieldLabel : '' + getResource('resourceParam856') + '晚于',
			format : 'Y-m-d',
			name : 'actualstartstr',
			anchor : '95%'
		}]
	});
	zongheQuery.zongheform.getComponent(0).insert(3, {
		columnWidth : .5,
		layout : 'form',
		items : [{
			xtype : 'datefield',
			fieldLabel : '' + getResource('resourceParam1033') + '早于',
			format : 'Y-m-d',
			name : 'actualendstr',
			anchor : '95%'
		}]
	});
	
     var statusds = new Ext.data.Store({
                proxy : new Ext.data.HttpProxy({
                            url : "../JSON/tasklist_taskService.getTaskStatus"
                        }),
                reader : new Ext.data.JsonReader({
                            totalProperty : 'totalProperty',
                            root : 'results'
                        }, [{
                                    name : 'taskstatusname'
                                }, {
                                    name : 'taskstatusid'
                                }])
            });
    statusds.load();
    var taskStauts=new Ext.ux.form.LovCombo({
                id : Ext.id(this,"taskStauuts"),
                fieldLabel : '' + getResource('resourceParam739') + '',
                hideOnSelect : false,
                maxHeight : 200,
                store : statusds,
                triggerAction : 'all',
                valueField : 'taskstatusid',
                displayField : 'taskstatusname',
                hiddenName : 'taskstatusid',
                mode : 'local',
                anchor : '95%',
                beforeBlur : Ext.emptyFn
            });
            
              var record_2 = Ext.data.Record.create([{
                name : 'taskstatusname'
            }, {
                name : 'taskstatusid'
            }]);
    var selectAll_2 = new record_2({
                taskstatusname : getResource('resourceParam5029'),
                taskstatusid : '-1'
            });
    var deSelectAll_2 = new record_2({
                taskstatusname : '' + getResource('resourceParam808') + '',
                taskstatusid : '-2'
            });
   taskStauts.on('expand', function(combo) {
                var store = combo.getStore();
                var firstRecord = store.getAt(0);
                if (firstRecord.data.taskstatusid == -1
                        || firstRecord.data.taskstatusid == -2) {
                    store.remove(firstRecord);
                }
                var checkSum = null;// 选中的总数
                if (combo.getCheckedValue() == '') {
                    checkSum = 0;
                } else {
                    checkSum = combo.getCheckedValue().split(',').length;
                }
                if (checkSum == store.getCount()) {
                    // 已全部选中
                    store.insert(0, deSelectAll_2);
                } else {
                    store.insert(0, selectAll_2);
                }
            });
    taskStauts.on('select', function(combo, record, index) {
                if (record.data.taskstatusid == -1) {
                    // click selectAll
                    record.set('checked', false);
                    combo.getStore().remove(record);
                    combo.selectAll();
                    combo.fireEvent('blur');
                } else if (record.data.taskstatusid == -2) {
                    // click deSelectAll
                    combo.deselectAll();
                    combo.getStore().remove(record);
                    combo.getStore().insert(0, selectAll_2);
                } else {
                    var checkSum = null;// 选中的总数
                    if (combo.getCheckedValue() == '') {
                        checkSum = 0;
                    } else {
                        checkSum = combo.getCheckedValue().split(',').length;
                    }
                    if (checkSum < (combo.getStore().getCount() - 1)) {
                        combo.getStore().remove(combo.getStore().getAt(0));
                        combo.getStore().insert(0, selectAll_2);
                    }
                }

            });
	zongheQuery.zongheform.getComponent(0).add({
		columnWidth : .5,
		layout : 'form',
		items : [taskStauts]
	});
    zongheQuery.zongheform.getComponent(0).add({
        columnWidth : .5,
        layout : 'form',
        items : [zongheQuery.application]
    });
    //项目名称combox
    zongheQuery.zongheform.getComponent(0).add({
        columnWidth : .5,
        layout : 'form',
        items : [zongheQuery.projectName]
    });
    
	zongheQuery.zongheform.getComponent(0).insert(0, {
		columnWidth : .5,
		layout : 'form',
		defaultType : 'textfield',
		items : [{
			msgTarget : "title",
			fieldLabel : '' + getResource('resourceParam998') + '',
			name : 'taskname',
			width : 175,
			maxLength : 50,
			allowBlank : true,
			maxLengthText : "" + getResource('resourceParam1290') + "",
			anchor : '95%'
		}]
	});
	zongheQuery.zongheform.getComponent(0).insert(1, {
		columnWidth : .5,
		layout : 'form',
		defaultType : 'textfield',
		items : [departmentUser.departmentCombo]
	});
	zongheQuery.zongheform.getComponent(0).insert(2, {
		columnWidth : .5,
		layout : 'form',
		defaultType : 'textfield',
		items : [departmentUser.userComb]
	});

	zongheQuery.queryDialog.show();
	zongheQuery.queryDialog.on("hide", function() {
		zongheQuery.queryDialog.close();
		zongheQuery.queryDialog.destroy();
		zongheQuery.queryDialog = null;
	});
};

/**
 * 生成查询日志的Form面板
 */
zongheQuery.queryzongheform = function() {
	zongheQuery.store = new Ext.data.Store({
		reader : new Ext.data.JsonReader({
			totalProperty : 'totalProperty',
			root : 'results'
		}, [{
			name : 'batchname'
		}, {
			name : 'batchs'
		}])
	});
	zongheQuery.combo1 = new Ext.form.ComboBox({
		store : new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
				url : "../JSON/tasklist_taskService.getSelectCombo"
			}),
			reader : new Ext.data.JsonReader({
				totalProperty : 'totalProperty',
				root : 'results'
			}, [{
				name : 'taskcategoryname'
			}, {
				name : 'taskcategoryid'
			}])
		}),

		valueField : "taskcategoryid",
		displayField : "taskcategoryname",
		mode : 'remote',
		forceSelection : true,
		hiddenName : 'taskcategoryid',
		editable : false,
		triggerAction : 'all',
		fieldLabel : '' + getResource('resourceParam1043') + '',
		name : 'taskcategoryid',
		anchor : '95%'
	});
	zongheQuery.modelcombo = new Ext.form.ComboBox({
		store : new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
				url : "../JSON/aofoquery_GongyiwcComboxSvr.getModel"
			}),
			reader : new Ext.data.JsonReader({
				totalProperty : 'totalProperty',
				root : 'results'
			}, [{
				name : 'modelname'
			}, {
				name : 'model'
			}])
		}),
		valueField : "model",
		displayField : "modelname",
		mode : 'remote',
		forceSelection : true,
		hiddenName : 'model',
		editable : false,
		triggerAction : 'all',
		fieldLabel : '' + getResource('resourceParam6003') + '', // 型号
		name : 'model',
		anchor : '95%'
	});
	zongheQuery.batchecombo = new Ext.form.ComboBox({
		xtype : 'combo',
		store : zongheQuery.store,
		valueField : "batchs",
		displayField : "batchname",
		mode : 'remote',
		forceSelection : true,
		hiddenName : 'batchs',
		editable : false,
		triggerAction : 'all',
		fieldLabel : '' + getResource('resourceParam6004') + '', // 批次
		name : 'batchs',
		anchor : '95%'
	});
	zongheQuery.batchecombo.disable();
	zongheQuery.modelcombo.on('select', function(combo, record, index) {
		zongheQuery.batchecombo.reset();
		zongheQuery.store.baseParams = {
			model : record.data.model
		};
		zongheQuery.store.proxy = new Ext.data.HttpProxy({
					url : "../JSON/aofoquery_GongyiwcComboxSvr.getBatchs"
				});
		zongheQuery.store.load();
		zongheQuery.batchecombo.enable();
	});
	zongheQuery.zongheform = new Ext.FormPanel({
		labelWidth : 110, // label settings here cascade unless
		// overridden
		frame : true,
		region : 'center',
		plain : false,
		// shadow: false,
		bodyStyle : 'padding:5px 5px 0',
		width : 550,
		items : [{
			layout : 'column',
			items : [{
				columnWidth : .5,
				layout : 'form',
				items : [{
					xtype : 'datefield',
					fieldLabel : '' + getResource('resourceParam991')+'晚于'
							+ '',
					format : 'Y-m-d',
					name : 'plannedstartstr',
					anchor : '95%'
				}]
			}, {
				columnWidth : .5,
				layout : 'form',
				items : [{
					xtype : 'datefield',
					fieldLabel : '' + getResource('resourceParam1032')+'早于'
							+ '',
					format : 'Y-m-d',
					name : 'plannedendstr',
					anchor : '95%'
				}]
			}, {
				columnWidth : .5,
				layout : 'form',
				defaultType : 'textfield',
				items : [zongheQuery.combo1]
			}]
		}],
		buttons : [
            {
            text : getResource('resourceParam9147'),
            handler : function() {
                zongheQuery.queryResult="0";
                if(zongheMain.renwugrid.store !=null)
                {
                    zongheUtil.GQuery();
                }
                zongheQuery.queryDialog.hide();
            }
        },
            {
			text : '' + getResource('resourceParam652') + '',
			handler : function() {
                zongheQuery.queryResult="1";
				zongheUtil.GQuery();
				zongheQuery.queryDialog.hide();
			}
		}, {
			text : '' + getResource('resourceParam6002') + '', // 取消
			handler : function() {
				zongheQuery.zongheform.getForm().reset();
				zongheQuery.queryDialog.hide();
			}
		}]
	});
	return zongheQuery.zongheform;
};
