var zongheNorth = {
	codeid : null,
	codename : null,
	manname : null,
	models : null,
	store : null,
	modelcombo : null,
	batchecombo : null,
	departmentCombo : null,
	baseparams : {}
};

zongheNorth.getForm = function() {
	delete departmentUser.departmentCombo2;
	delete departmentUser.userComb2;
	departmentUser.init2("" + getResource('resourceParam986') + "", "" + getResource('resourceParam731') + "");
	departmentUser.departmentCombo2.anchor = '95%';
	departmentUser.userComb2.anchor = '95%';
	departmentUser.userComb2.allowBlank = true;
//    departmentUser.userComb2.on('beforequery',function(e){ //@zhengjg
//        departmentUser.userid =null; 
//    });
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
    
    zongheNorth.application=new Ext.form.ComboBox({
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
    
	zongheNorth.form = new Ext.FormPanel({
		labelAlign : 'left',
		plain : false,
		frame : true,
		autoScroll : true,
		region : 'north',
		height : 120,
		labelWidth : 100,
		items : [{
			layout : 'column',
			items : [{
				columnWidth :.95,
				layout : 'form',
                autoScroll : true,
				items : [{
					layout:'column',
					items:[{
						columnWidth : .5,
						layout : 'form',
    					autoScroll : true,
    					items : [departmentUser.departmentCombo2]
					}, {
                        columnWidth : .5,
                        layout : 'form',
                        autoScroll : true,
                        items : [departmentUser.userComb2]
					}]
				}]
			}, { 
				columnWidth :.95,
	            layout : 'form',
	            autoScroll : true,
	            items : [{   
	            	layout:'column',
	                items:[{
	                	columnWidth : .5,
	                    layout : 'form',
	                    autoScroll : true,
	                    items : [{
                            xtype : 'datefield',
                            fieldLabel : '' + getResource('resourceParam991') + '晚于',
                            format : 'Y-m-d',
                            name : 'plannedstartstr',
                            anchor : '95%'
                        }]
                    }, {
	                    
                        columnWidth : .5,
                        layout : 'form',
                        autoScroll : true,
                        items : [{
                            xtype : 'datefield',
                            fieldLabel : '' + getResource('resourceParam993') + '早于',
                            format : 'Y-m-d',
                            name : 'plannedendstr',
                            anchor : '95%'
                        }]
                    }]
	            }]
			}, 
            { columnWidth :.95,
                layout : 'form',
                autoScroll : true,
                items : [{
                    layout:'column',
                    items:[{
                        columnWidth : .5,
                        layout : 'form',
                        items:[taskStauts]
                    }, {
                       columnWidth : .5,
                        layout : 'form',
                        items : [zongheNorth.application]
                }]
                }]
            },
            {
				columnWidth :.95,
	            layout : 'form',
	            autoScroll : true,
	            items : [{   
					layout:'column',
					items:[{
                        columnWidth : .2,
                        layout : 'form',
                        autoScroll : true,
                        items : [{
                            xtype : 'button',
                            text : '' + getResource('resourceParam652') + '',
                            handler : function() {
                                zongheUtil.Query();
                            }
                        }]
					},{
                        columnWidth : .2,
                        layout : 'form',
                        autoScroll : true,
                        items : [{
                            xtype : 'button',
                            text : '' + getResource('resourceParam606') + '',
                            handler : function() {
                                zongheNorth.form.form.reset();
                                zongheUtil.Formatparams();
//                             jumpAll.mytask('zonghechaxun');
                            }
                        }]
					},{
                        columnWidth : .1,
                        layout : 'form',
                        autoScroll : true,
                        items : [{
                            xtype : 'button',
                            text : '' + getResource('resourceParam1287') + '',
                            handler : function() {
                                zongheQuery.init();
                            }
                        }]
					}]
				}]
			}]
		}]
	});
	return zongheNorth.form;
};

zongheNorth.getDaohang = function() {
	var status = '<div id="daohangtitle" class="x-panel-header x-unselectable x-accordion-hd" style="height:50px"   align="left">'
		+ '<div id="daohang" style="float:left; padding-top:0px;padding-left:5px;">sdfewsdfsesdf</div> '
		+ '<div style="float:right; padding-top:0px;">'
		+ '</div> '
		+ ' <div id="fanhui" style="float:right; padding-top:0px;padding-right:20px;">'
		+ '<a style="cursor: hand" onclick="zongheUtil.Stepout()">'
		+ '' + getResource('resourceParam944') + '</a>' + '</div>' + '</div>';
	return new Ext.Panel({
		region : 'north',
		height : 30,
		html : status
	});
}

zongheNorth.ds_gongyi = function(url) {
	ds = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : url
		}),
		reader : new Ext.data.JsonReader({
			totalProperty : 'totalProperty',
			root : 'results'
		}, [{
			name : 'model'
		}, {
			name : 'batchs'
		}, {
			name : 'sorties'
		}, {
			name : 'projectid'
		}])
	});
	return ds;
};
