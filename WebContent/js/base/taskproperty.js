// 任务基本属性
var taskproperty = {
	taskids : null,
	panel : null,
	propertypanel : null,
	form : null,
	cardform : null,
	cardkform : null,
	forcardform : null,
	isdlog : null,
	cardkformpanel1 : null,
	kform : null,
	strvalue : null,
    taskdatas:null
}
taskproperty.form1 = function() {
	taskproperty.form = new Ext.FormPanel({
		id : 'taskpropertyform',
		labelWidth : 120, // label settings here cascade unless overridden
		frame : false,
		plain : false,
		bodyStyle : 'padding:5px 5px 0 0;background:transparent;',
		items : [{
					xtype : 'textfield',
					fieldLabel : '' + getResource('resourceParam480') + '',
					name : 'taskname',
					id : 'taskname',
					width : 430,
					anchor : '60%',
					disabled : true
				}, {
					xtype : 'textfield',
					fieldLabel : '' + getResource('resourceParam481') + '',
					name : 'taskcategoryname',
					id : 'taskcategoryname',
					anchor : '60%',
					width : 430,
					disabled : true
				}, {
					xtype : 'textfield',
					fieldLabel : '' + getResource('resourceParam731') + '',
					name : 'truename',
					anchor : '60%',
					width : 430,
					disabled : true,
					id : 'truename'
				}, {
					xtype : 'textfield',
					fieldLabel : '' + getResource('resourceParam689') + '',
					name : 'instname',
					width : 430,
					anchor : '60%',
					disabled : true,
					id : 'instname'
				}, {
					xtype : 'textfield',
					fieldLabel : '' + getResource('resourceParam858') + '',
					name : 'plannedstartstr',
					anchor : '60%',
					width : 430,
					disabled : true,
					id : 'plannedstartstr',
					format : 'Y-m-d'
				}, {
					xtype : 'textfield',
					fieldLabel : '' + getResource('resourceParam500') + '',
					name : 'taskstatusname',
					anchor : '60%',
					width : 430,
					disabled : true,
					id : 'taskstatusname'

				}, {
					xtype : 'textfield',
					fieldLabel : '' + getResource('resourceParam856') + '',
					anchor : '60%',
					id : 'actualstartstr',
					width : 430,
					disabled : true,
					name : 'actualstartstr',
					format : 'Y-m-d'

				}, {
					xtype : 'checkbox',
					fieldLabel : '' + getResource('resourceParam860') + '',
					boxLabel : '' + getResource('resourceParam855') + '',
					name : 'autorun',
					id : 'autorun',
					width : 430,
					anchor : '60%'
				}, {
					xtype : 'textarea',
					fieldLabel : '' + getResource('resourceParam861') + '',
					// disabled:true,
					name : 'tasknotes',
					width : 430,
					anchor : '60%',
					id : 'tasknotes',
					height : '150'
				}, {
					id : 'taskpanelid',
					xtype : 'panel',
					bodyStyle : 'padding:10px 460px 0;background:transparent;border:0',
					html : '<div id="taskidss"></div>'
				}]
	});
    return taskproperty.form;
}

taskproperty.panel = function(count, taskid) {
  
	taskproperty.propertypanel = new Ext.Panel({
		id : 'propertypanel',
		layout : 'fit',
		labelWidth : 120, // label settings here cascade unless
		// overridden
		frame : true,
		plain : false,
		bodyStyle : 'padding:5px 5px 0 0;background:transparent;'
			// items : [taskproperty.form]
		});
	taskproperty.propertypanel.on("activate", function(p) {
          var form=taskproperty.form1();
    if (taskid != null) {
        Ext.Ajax.request({
            url : "../JSON/privilege_DataPrivilegeRemote.getDataManipultations",
            method : 'POST',
            success : function(response, options) {
                var obj = Ext.util.JSON.decode(response.responseText);
                if (obj.remove) {
                    Ext.MessageBox.show({
                                title : '' + getResource('resourceParam499')
                                        + '',
                                msg : obj.message,
                                buttons : Ext.MessageBox.OK,
                                icon : Ext.MessageBox.ERROR
                            });
                } else {
                    if (obj.view) {
                            form.getForm().setValues(taskproperty.taskdatas);
			                p.removeAll();
			                p.add(form);
			                p.doLayout();
                            var str_html = '<a href="javascript:void(0);" onclick="taskproperty.forcard2()' +
                                            ';"><span style="font-weight:bold;">'
                                            + '<font color="blue">'
                                            + getResource('resourceParam857')
                                            + '</font></span></a>';
                            Ext.get("taskidss").dom.innerHTML = str_html;
                    } else {
                        form.getForm().reset();
                    }
                }
            },
            disableCaching : true,
            autoAbort : true,
            params : {
                dataId : taskid[0]
            }
        });
    }
			});
	return taskproperty.propertypanel;
}
taskproperty.cardform = function(count, taskid) {
	taskproperty.card1 = taskproperty.panel(count, taskid);
	taskproperty.card2 = taskproperty.cardkformpanel(taskid);
	taskproperty.cardkform = new Ext.Panel({
				title : '' + getResource('resourceParam859') + '',
				id : 'taskpropertycard',
				layout : 'card',
				resizable : true,
				activeItem : 0,
				items : [taskproperty.card1, taskproperty.card2]
			});
	return taskproperty.cardkform;
}

taskproperty.cardkformpanel = function(taskid) {
	taskproperty.cardkformpanel1 = new Ext.Panel({
				id : 'cardkformpanel',
				layout : 'fit'
			});
    taskproperty.cardkformpanel1.on("activate",function(p){
        p.removeAll();
        p.add(taskproperty.forcardform(taskid));
        p.doLayout();
    });
	return taskproperty.cardkformpanel1;
}

// 返回基本属性页面
taskproperty.forcard1 = function() {
	Ext.getCmp("taskpropertycard").layout.setActiveItem(0);
}
taskproperty.forcard2 = function() {
    Ext.getCmp("taskpropertycard").layout.setActiveItem(1);
}

// 扩展属性
taskproperty.forcardform = function(taskid) {
	taskproperty.kform = new Ext.FormPanel({
		labelWidth : 150, // label settings here cascade unless overridden
		frame : true,
		id : 'forcardformid',
		plain : false,
		bodyStyle : 'padding:5px 5px 0;background:transparent;',
		defaultType : 'textfield',
		items : [{
			xtype : 'panel',
			bodyStyle : 'padding:5px 5px 5px 5px;background:transparent;border:0',
			html : '<a href="javascript:void(0);" onclick="taskproperty.forcard1();">'
					+ '<span style="font-weight:bold;">'
					+ '<font color="blue">'
					+ getResource('resourceParam862')
					+ '</font></span></a>'
		}]
	});

	if (taskid != null) {
		Ext.Ajax.request({
			url : "../JSON/privilege_DataPrivilegeRemote.getDataManipultations",
			method : 'POST',
			success : function(response, options) {
				var obj = Ext.util.JSON.decode(response.responseText);
				if (obj.remove) {
					Ext.MessageBox.show({
								title : '' + getResource('resourceParam499')
										+ '',
								msg : obj.message,
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.ERROR
							});
				} else {
					if (obj.view) {
						var appVo = Seam.Remoting
								.createType("com.luck.itumserv.tasklist.TaskVo");
						appVo.setTaskid(taskid);
						Seam.Component.getInstance("mytask_MyTaskRemote")
								.getExtendedAttributes(appVo, function(str) {
									var _value = Ext.util.JSON.decode(str).items;
									for (var k = 0; k < _value.length; k++) {
										var fomat = "";
										var precision = 0;
										var type = _value[k].type;
										if (type == "double") {
											precision = 10;
										} else if (type == "date") {
											fomat = "Y-m-d";
										}
										taskproperty.kform.add(mytaskExtend
												.FormControls(
														_value[k].dataObjectId,
														_value[k].name,
														_value[k].value, fomat,
														precision, type));
									}
									taskproperty.kform.doLayout();
								});
					} else {
						taskproperty.cardkform.layout.setActiveItem(0);
					}
				}
			},
			disableCaching : true,
			autoAbort : true,
			params : {
				dataId : taskid[0]
			}
		});

	}
    return taskproperty.kform;
}
