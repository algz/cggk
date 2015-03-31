//设备大修审批查看明细
EquipRepairApprovalObjectPanel = {};
EquipRepairApprovalObjectPanel.init = function(id){

	var panel = new Ext.Panel({
		id :'EquipRepairApprovalObjcetPanel',
		width : 900,
		title:"设备大修",
		autoScroll:false,
		autoDestroy: true,
		items:[{
				layout : 'column',
				border : false,
				items : [{
					columnWidth: .33,
                    layout: "form",
                    border : false,
                    labelWidth : 110,
                    bodyStyle : 'padding:5,5,0,5;',
                    items: {
                    	id : 'repairequipname',
                        xtype: "textfield",
                        fieldLabel: "维修设备名称",
                        anchor: "95%",
                    	readOnly : true
                    }
				},{
					columnWidth: .33,
                    layout: "form",
                    border : false,
                    labelWidth : 110,
                    bodyStyle : 'padding:5,5,0,5;',
                    items: {
                    	id : 'repairequipmodel',
                        xtype: "textfield",
                        fieldLabel: "维修设备型号",
                        anchor: "95%",
                    	readOnly : true
                    }
				},{
					columnWidth: .33,
                    layout: "form",
                    border : false,
                    labelWidth : 80,
                    bodyStyle : 'padding:5,5,0,5;',
                    items: {
                    	id : 'equipassetnum',
                        xtype: "textfield",
                        fieldLabel: "设备资产编号",
                        anchor: "95%",
                    	readOnly : true
                    }
				}]
			},{
				layout : 'column',
				border : false,
				items : [{
					columnWidth: .33,
                    layout: "form",
                    border : false,
                    labelWidth : 110,
                    bodyStyle : 'padding:0,5,0,5;',
                    items: {
                    	id : 'equipinstallfactory',
                        xtype: "textfield",
                        fieldLabel: "设备安装厂房",
                        anchor: "95%",
                    	readOnly : true
                    }
				},{
					columnWidth: .33,
                    layout: "form",
                    border : false,
                    labelWidth : 110,
                    bodyStyle : 'padding:0,5,0,5;',
                    items: {
                    	id : 'tasknum',
                        xtype: "textfield",
                        fieldLabel: "任务编号",
                        anchor: "95%",
                    	readOnly : true
                    }
				},{
					columnWidth: .33,
                    layout: "form",
                    border : false,
                    labelWidth : 80,
                    bodyStyle : 'padding:0,5,0,5;',
                    items: {
                    	id : 'equipmanufacturer',
                        xtype: "textfield",
                        fieldLabel: "设备生产厂家",
                        anchor: "95%",
                    	readOnly : true
                    }
				}]
			},{
				layout : 'column',
				border : false,
				items : [{
					columnWidth: .33,
                    layout: "form",
                    border : false,
                    labelWidth : 110,
                    bodyStyle : 'padding:0,5,0,5;',
                    items: {
                    	id : 'lastrepairtime',
                        xtype: "textfield",
                        fieldLabel: "最后一次维修日期",
                        anchor: "95%",
                    	readOnly : true
                    }
				},{
					columnWidth: .33,
                    layout: "form",
                    border : false,
                    labelWidth : 110,
                    bodyStyle : 'padding:0,5,0,5;',
                    items: {
                    	id : 'repaircostestimation',
                        xtype: "numberfield",
                        fieldLabel: "维修费用估算/计划",
                        anchor: "95%",
                    	readOnly : true
                    }
				},{
					columnWidth: .33,
                    layout: "form",
                    border : false,
                    labelWidth : 80,
                    bodyStyle : 'padding:0,5,0,5;',
                    items: {
                    	id : 'repaircostunit',
                        xtype: "textfield",
                        fieldLabel: "单位",
                        anchor: "95%",
                    	readOnly : true
                    }
				}]
			},{
				layout : 'column',
				border : false,
				items : [{
					columnWidth: .33,
                    layout: "form",
                    border : false,
                    labelWidth : 110,
                    bodyStyle : 'padding:0,5,0,5;',
                    items: {
                    	id : 'equipdeliverytime',
                        xtype: "textfield",
                        fieldLabel: "设备出厂日期",
                        anchor: "95%",
                    	readOnly : true
                    }
				},{
					columnWidth: .6,
                    layout: "form",
                    border : false,
                    labelWidth : 110,
                    bodyStyle : 'padding:0,5,0,5;',
                    items: {
                    	id : 'customer',
                        xtype: "textfield",
                        fieldLabel: "设备生产厂家售后服务联系人及电话",
                        anchor: "95%",
                    	readOnly : true
                    }
				}]
			}],
		modal : true,
		border : true,
		bodyStyle:'background:#fff;',
		resizable: false,  
		buttonAlign : 'center'
	});
	
	Ext.Ajax.request({
		url : "../JSON/PEdeclareRemote.getEquipRepairList?d="+new Date(),
		params : {
				id : id
		},
		success : function(response, opt) {
			var obj = Ext.decode(response.responseText);
			if (obj.success == true) {
				var data = obj.results[0];
				Ext.getCmp('repairequipname').setValue(data.repairequipname);
				Ext.getCmp('repairequipmodel').setValue(data.repairequipmodel);
				Ext.getCmp('equipassetnum').setValue(data.equipassetnum);
				Ext.getCmp('equipinstallfactory').setValue(data.equipinstallfactory);
				Ext.getCmp('tasknum').setValue(data.tasknum);
				Ext.getCmp('equipmanufacturer').setValue(data.equipmanufacturer);
				Ext.getCmp('equipdeliverytime').setValue(data.equipdeliverytime);
				Ext.getCmp('customer').setValue(data.customer);
				Ext.getCmp('lastrepairtime').setValue(data.lastrepairtime);
				Ext.getCmp('repaircostestimation').setValue(data.repaircostestimation);
				Ext.getCmp('repaircostunit').setValue(data.repaircostunit);
			}else{
				Ext.Msg.alert("提示","数据异常，请与管理员联系。")
			}
		},
		disableCaching : true,
	    autoAbort : true
	});
	return panel;
}