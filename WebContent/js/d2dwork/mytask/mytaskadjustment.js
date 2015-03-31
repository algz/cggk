var mytaskadjustment = {
	panel : null,
	northpanel : null,
	centerpanel : null
}
mytaskadjustment.mainpanel = function(hh) {
	var panel = new Ext.Panel({
		id : 'mytaskadjustmentmainpanel',
		layout : 'border',
		items : [mytaskadjustment.northpanel(hh),
				mytaskadjustment.centerpanel()]

	});
	return panel;

}
mytaskadjustment.northpanel = function(hh) {
	var panel12 = new Ext.Panel({
		id : 'panel12',
		region : 'north',
		layout : "fit",
		// collapsible : true,
		html : "<div id='panel12div'>" + hh + "</div>"
	});
	return panel12;
}
mytaskadjustment.centerpanel = function() {
	// 共享 部门、负责人二级联动
	departmentUser.init(""+getResource('resourceParam1430')+"", ""+getResource('resourceParam603')+"");
	departmentUser.departmentCombo.anchor = '60%';
    
	var flag = true;
	var k = mytaskMain.issuedmanid.length;
	var issuedManid = mytaskMain.issuedmanid;
//	var m = mytaskMain.issuedmanname.length;
//	if (k > 0) {
//		for (var i = 0; i < k; i++) {
//			if (!(issuedManid[0] == issuedManid[i])) {
//				flag = false;
//				break;
//			}
//		}
//		if (flag) {
//			if (m > 0) {
//	      departmentUser.userComb.on('beforerender', function(combo, record, index) {
//	    	  combo.setRawValue(mytaskMain.issuedmanname);
//			departmentUser.departmentCombo.setRawValue(mytaskMain.instname);
//			departmentUser.codeid = mytaskMain.chargeddepid;
//		  });
//		  
//		   departmentUser.userComb.on('afterrender', function(combo, record, index) {
//		   	combo.setValue(mytaskMain.issuedmanname);
//            departmentUser.userid=issuedManid[0];
//		   });
//		  }
//		}
//	}
	/**
	 * bug编号1059 wangyf
	 * bug信息：调整任务时接收人显示为简拼应该显示人名
	 * 2011-06-08 16：41
	 */
	var tm = mytaskMain.truename.length;
	if (k > 0) {
		for (var i = 0; i < k; i++) {
			if (!(issuedManid[0] == issuedManid[i])) {
				flag = false;
				break;
			}
		}
		if (flag) {
			if (tm > 0) {
		      	departmentUser.userComb.on('beforerender', function(combo, record, index) {
		    	  combo.setRawValue(mytaskMain.truename);
				departmentUser.departmentCombo.setRawValue(mytaskMain.instname);
				departmentUser.codeid = mytaskMain.chargeddepid;
		  	});
			  	departmentUser.userComb.on('afterrender', function(combo, record, index) {
			   	combo.setValue(mytaskMain.truename);
	            departmentUser.userid=issuedManid[0];
		   });
		  }
		}
	}
	
	
	
	
	
	departmentUser.userComb.anchor = '60%';
	
	
	mytaskadjustment.form = new Ext.FormPanel({
		labelWidth : 120, // label settings here cascade unless overridden
		frame : true,
		plain : false,
		bodyStyle : 'padding:5px 5px 0;background:transparent;',
		defaultType : 'textfield',
		items : [departmentUser.departmentCombo, departmentUser.userComb, {
			xtype : 'textarea',
			fieldLabel : ''+getResource('resourceParam1431')+'',
			labelSeparator : '：',
			id : 'messagebody',
			name : 'messagebody',
			value : "",
			anchor : '60%',
			height : 300,
			maxLength : 500,
			maxLengthText : ''+getResource('resourceParam501')+'内容不超过500字'
		}],
		buttons : [ // 定义面板中的按钮
		{
			text : ''+getResource('resourceParam1432')+'',
			handler : function() // 为当前按钮绑定事件
			{ // 如果验证通过，则将表单元素提交到指定路径
				if (mytaskadjustment.form.form.isValid()) {
					var appVo = Seam.Remoting
							.createType("com.luck.itumserv.message.messageuser.MessageUserVo");
					Ext.apply(appVo, mytaskadjustment.form.getForm()
							.getValues());
					// appVo.setDepartment(dataCenterBase.codeid);
					// alert(departmentUser.userComb.getValue());
					if (departmentUser.userComb.getValue() == "") {
						Ext.MessageBox.show({
							title : ''+getResource('resourceParam587')+'',
							msg : ''+getResource('resourceParam1426')+'',
							minWidth : 200,
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.INFO
						});
                        delete appVo;
						return;
					}
                    appVo.setUserid(departmentUser.userid);
					m=0;
					appVo.setTaskids(mytaskMain.taskids);
					Seam.Component.getInstance("messageuser_MessageUserRemote")
							.save(appVo, function(reslut) {
								if (reslut == "true") {
									Ext.MessageBox.show({
										title : ''+getResource('resourceParam587')+'',
										msg : ''+getResource('resourceParam1428')+'',
										minWidth : 250,
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.INFO,
										fn:tasklist
									});

								} else if (reslut == "faile") {
									Ext.MessageBox.show({
										title : ''+getResource('resourceParam587')+'',
										msg : ''+getResource('resourceParam1427')+'',
										minWidth : 250,
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.ERROR
									});

								} else {
									Ext.MessageBox.show({
										title : ''+getResource('resourceParam587')+'',
										msg : ''+getResource('resourceParam1429')+'',
										minWidth : 250,
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.ERROR
									});
								}
							});
                            delete appVo;
				}
			}
		}, {
			text : '取消',
			handler : function() {
				// mytaskMain.cenpanel.layout.setActiveItem(0);
				// mytaskMain.cenpanel.remove(mytaskadjustment.panel());
				mytaskMain.loadtasklist();
			}
		}]
	});
	var panelform = new Ext.Panel({
		id : 'paneladjustmentform',
		layout : 'fit',
		region : 'center',
		items : [mytaskadjustment.form]
	});
	return panelform;
}
function tasklist()
{
 // mytaskMain.cenpanel.layout.setActiveItem(0);
 mytaskMain.loadtasklist();
}
mytaskadjustment.panel = function() {
	mytaskadjustment.designatepanel = new Ext.Panel({
		id : 'mytaskadjustmentpanel',
		layout : 'fit'
	});
    mytaskadjustment.designatepanel.on("activate",function(p){
        p.removeAll();
        p.add(mytaskadjustment.mainpanel(mytaskMain.hh));
        p.doLayout();
    });
	return mytaskadjustment.designatepanel;
}
