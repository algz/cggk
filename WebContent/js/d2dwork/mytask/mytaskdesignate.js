var mytaskdesignate = {
	panel : null,
	designatepanel : null,
	form : null,
	taskname : null,
	dsave : null,
	northpanel : null,
	centerpanel : null,
	mainpanel : null
}
mytaskdesignate.panel = function() {
	mytaskdesignate.designatepanel = new Ext.Panel({
		id : 'mytaskdesignatepanel',
        layout:'fit'
		});
    mytaskdesignate.designatepanel.on("activate",function(p){
                    p.removeAll();
                    p.add(mytaskdesignate.mainpanel(mytaskMain.hh));
                    p.doLayout();
                });
	return mytaskdesignate.designatepanel;
}
mytaskdesignate.mainpanel = function(hh) {
	var panel = new Ext.Panel({
				id : 'mytaskdesignatemainpanel',
				layout : 'border',
                region : 'center',
				items : [mytaskdesignate.northpanel(hh),
						mytaskdesignate.centerpanel()]
			});
	return panel;
}

mytaskdesignate.northpanel = function(hh) {

	var panel11 = new Ext.Panel({
				id : 'panel11',
				region : 'north',
				layout : 'fit',
				// collapsible : true,
				html : "<div id='panel11div'>" + hh + "</div>"
			});
	return panel11;
}

mytaskdesignate.getdate = function(date, adddaycount) {
	date.setDate(date.getDate() + adddaycount);
	return date;
};
mytaskdesignate.centerpanel = function() {
    var f=mytaskdesignate.designateform();
	var panelform = new Ext.Panel({
				id : 'panelform',
				layout : 'fit',
				region : 'center',
				items : [f]
			});
	return panelform;
}

mytaskdesignate.designateform=function(){
    // 共享 部门、负责人二级联动
    departmentUser.init('' + getResource('resourceParam1445') + '', ''
                    + getResource('resourceParam1447') + '');
    departmentUser.departmentCombo.anchor = '60%';
    departmentUser.departmentCombo.allowBlank = false;
    departmentUser.departmentCombo.style = 'margin-bottom: 5px;';
    departmentUser.userComb.anchor = '60%';
    departmentUser.userComb.allowBlank = false;
    departmentUser.userComb.style = 'margin-bottom: 5px;';
    departmentUser.departmentCombo.on('expand', function() {
                departmentUser.treePanel.on('expandnode', function() {
                            var node = departmentUser.treePanel.getNodeById(0);
                            if (node != null) {
                                node.expand();
                            }
                        });
            });
    /**
     * dataCenterBase.combox(""+getResource('resourceParam1445')+"",""+getResource('resourceParam1447')+"");
     * dataCenterBase.departmentCombo.anchor='60%';
     * dataCenterBase.departmentCombo.width=600;
     * dataCenterBase.userComb.anchor='60%';
     */
    mytaskdesignate.form = new Ext.FormPanel({
        labelWidth : 120, // label settings here cascade unless overridden
        frame : true,
        plain : false,
        bodyStyle : 'padding:5px 5px 0;background:transparent;',
        defaultType : 'textfield',
        items : [departmentUser.departmentCombo, departmentUser.userComb, {
            xtype : 'datefield',
            id : 'startdate',
            fieldLabel : '' + getResource('resourceParam1442') + '',
            format : 'Y-m-d',
            name : 'startdate',
            anchor : '60%',
            value : new Date(),
            minValue : mytaskdesignate.getdate(new Date, -1),
            minText : '开始时间不能早于今天',
            blankText : '' + getResource('resourceParam1440') + '',
            allowBlank : false,
            editable : false
                // disabled : true

            }, {
            xtype : 'datefield',
            id : 'enddate',
            fieldLabel : '' + getResource('resourceParam1443') + '',
            format : 'Y-m-d',
            showToday : false,
            name : 'enddate',
            blankText : '' + getResource('resourceParam1438') + '',
            minValue : mytaskdesignate.getdate(new Date, -1),
            allowBlank : false,
            editable : false,
            invalidText : getResource('resourceParam1438'),
            anchor : '60%'
        },

        {
            xtype : 'textarea',
            fieldLabel : '' + getResource('resourceParam1446') + '',
            labelSeparator : '：',
            id : 'memo',
            name : 'memo',
            value : "",
            anchor : '60%',
            height : 300,
            // blankText:'请输入委派原因',
            // allowBlank:false,
            maxLength : 500,
            maxLengthText : '' + getResource('resourceParam1437') + ''
        }],
        buttons : [ // 定义面板中的按钮
        {
            text : '' + getResource('resourceParam1433') + '',
            handler : function() // 为当前按钮绑定事件
            { // 如果验证通过，则将表单元素提交到指定路径
                if (mytaskdesignate.form.form.isValid()) {
                    var appVo = Seam.Remoting
                            .createType("com.luck.itumserv.task.designate.TaskUserVo");
                    Ext
                            .apply(appVo, mytaskdesignate.form.getForm()
                                            .getValues());
                    appVo.setDepartment(departmentUser.codeid);
                    // edit by suny 20101220
                    // appVo.setUserid(departmentUser.userComb.getValue());
                    appVo.setUserid(departmentUser.userid);
                    appVo.setTaskids(mytaskMain.taskids);
                    Seam.Component.getInstance("TaskUser_TaskUserRemote").save(
                            appVo, function(reslut) {
                                if (reslut == "true") {
                                    // mytaskMain.cenpanel.remove(mytaskdesignate.panel());
                                    // mytaskMain.cenpanel.layout.setActiveItem(0);
                                   mytaskMain.loadtasklists();

                                } else if (reslut == "loginfaile") {
                                    Ext.MessageBox.show({
                                        title : ''
                                                + getResource('resourceParam587')
                                                + '',
                                        msg : ''
                                                + getResource('resourceParam1439')
                                                + '',
                                        minWidth : 250,
                                        buttons : Ext.MessageBox.OK,
                                        icon : Ext.MessageBox.ERROR
                                    });
                                } else if (reslut == "yiweipai") {
                                    Ext.MessageBox.show({
                                        title : ''
                                                + getResource('resourceParam587')
                                                + '',
                                        msg : ''
                                                + getResource('resourceParam1436')
                                                + '',
                                        minWidth : 250,
                                        buttons : Ext.MessageBox.OK,
                                        icon : Ext.MessageBox.ERROR
                                    });
                                } else {
                                    Ext.MessageBox.show({
                                        title : ''
                                                + getResource('resourceParam587')
                                                + '',
                                        msg : ''
                                                + getResource('resourceParam1441')
                                                + '',
                                        minWidth : 250,
                                        buttons : Ext.MessageBox.OK,
                                        icon : Ext.MessageBox.ERROR
                                    });
                                }
                            });
                } 
                /**
                 * bug编号1054 wangyf
                 * bug信息：委派任务如果原因超过上限，点委派时系统弹出的提示信息不合适
                 * 注：把原来的提示信息去掉，当表单中的信息填写有误时，输入框显示红线，表示有误。
				 *	   这时点击委派按钮时不会又任何操作。
				 * 2011-06-08 14：49
                 */
//                else {
//                    Ext.MessageBox.show({
//                                title : '' + getResource('resourceParam587')
//                                        + '',
//                                msg : '' + getResource('resourceParam676')
//                                        + '',
//                                minWidth : 250,
//                                buttons : Ext.MessageBox.OK,
//                                icon : Ext.MessageBox.ERROR
//                            });
//                }
            }
        }, {
            text : '' + getResource('resourceParam944') + '',
            handler : function() {
                // mytaskMain.cenpanel.layout.setActiveItem(0);
                // mytaskMain.cenpanel.remove(mytaskdesignate.panel());
                mytaskMain.loadtasklist();
            }
        }]
    });

    // Ext.getCmp("startdate").on("select",function(fn,o){
    // // alert(fn.getValue());
    // mytaskdesignate.form.getForm().findField("enddate").setMinValue(fn.getValue());
    // mytaskdesignate.form.getForm().findField("enddate").setValue("");
    // });

    Ext.getCmp("enddate").on("select", function(fn, o) {
        var starttime = mytaskdesignate.form.getForm().findField("startdate")
                .getValue();
        var endtime = fn.getValue();
        if (starttime > endtime) {
            Ext.MessageBox.show({
                        title : '' + getResource('resourceParam587') + '',
                        msg : '' + getResource('resourceParam1690') + '',
                        minWidth : 250,
                        buttons : Ext.MessageBox.OK,
                        icon : Ext.MessageBox.ERROR
                    });
            mytaskdesignate.form.getForm().findField("enddate").setValue("");
        }
    });
    
    return mytaskdesignate.form;
}
