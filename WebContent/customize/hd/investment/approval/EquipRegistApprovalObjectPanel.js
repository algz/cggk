//设备登记审批查看明细
EquipRegistApprovalObjectPanel = {};
EquipRegistApprovalObjectPanel.init = function(id){

	var panel = new Ext.Panel({
		id :'EquipRegistApprovalObjcetPanel',
		width : 900,
		title:"设备登记",
		autoScroll:false,
		autoDestroy: true,
		items:[{
			xtype : 'form',
			border : false,
			id : 'equipRegistForm',
			items : [{
				
				layout : 'column',
				border : false,
				items : [{
					columnWidth: .3,
                    layout: "form",
                    border : false,
                    labelWidth : 60,
                    bodyStyle : 'padding:5,5,0,5;',
                    items: {
                    	id : 'projectname',
                        xtype: "textfield",
                        fieldLabel: "项目名称",
                        anchor: "95%",
						readOnly : true
                    }
				},{
					columnWidth: .3,
                    layout: "form",
                    border : false,
                    labelWidth : 60,
                    bodyStyle : 'padding:5,5,0,5;',
                    items: {
                    	id : 'referencemodel',
                        xtype: "textfield",
                        fieldLabel: "参考型号",
                        anchor: "95%",
						readOnly : true
                    }
				},{
					columnWidth: .4,
                    layout: "form",
                    border : false,
                    labelWidth : 120,
                    bodyStyle : 'padding:5,5,0,5;',
                    items: {
                    	id : 'mainparam',
                        xtype: "textfield",
                        fieldLabel: "主要性能参数及配置",
                        anchor: "95%",
						readOnly : true
                    }
				}]
			},{
				layout : 'column',
				border : false,
				items : [{
					columnWidth: .3,
                    layout: "form",
                    border : false,
                    labelWidth : 60,
                    bodyStyle : 'padding:0,5,0,5;',
                    items: {
                    	id : 'nums',
                        xtype: "numberfield",
                        fieldLabel: "数量",
                        anchor: "95%",
						readOnly : true
                    }
				},{
					columnWidth: .3,
                    layout: "form",
                    border : false,
                    labelWidth : 60,
                    bodyStyle : 'padding:0,5,0,5;',
                    items: {
                    	id : 'numsunit',
                        xtype: "textfield",
                        fieldLabel: "单位",
                        anchor: "95%",
						readOnly : true
                    }
				},{
					columnWidth: .4,
                    layout: "form",
                    border : false,
                    labelWidth : 120,
                    bodyStyle : 'padding:0,5,0,5;',
                    items: {
                    	id : 'marketprice',
                        xtype: "numberfield",
                        fieldLabel: "市场价格",
                        anchor: "95%",
						readOnly : true
                    }
				}]
			},{
				layout : 'column',
				border : false,
				items : [{
					columnWidth: .3,
                    layout: "form",
                    border : false,
                    labelWidth : 60,
                    bodyStyle : 'padding:0,5,0,5;',
                    items: {
                    	id : 'schedule',
                        xtype: "textfield",
                        fieldLabel: "进度要求",
                        anchor: "95%",
						readOnly : true
                    }
				},{
					columnWidth: .3,
                    layout: "form",
                    border : false,
                    labelWidth : 60,
                    bodyStyle : 'padding:0,5,0,5;',
                    items: {
                    	id : 'installsite',
                        xtype: "textfield",
                        fieldLabel: "安装地点",
                        anchor: "95%",
						readOnly : true
                    }
				},{
					columnWidth: .4,
                    layout: "form",
                    border : false,
                    labelWidth : 120,
                    bodyStyle : 'padding:0,5,0,5;',
                    items: {
                    	id : 'installcondition',
                        xtype: "textfield",
                        fieldLabel: "安装条件",
                        anchor: "95%",
						readOnly : true
                    }
				}]
			},{
				layout : 'column',
				border : false,
				items : [{
					columnWidth: .3,
                    layout: "form",
                    border : false,
                    labelWidth : 60,
                    bodyStyle : 'padding:0,5,0,5;',
                    items: {
                    	id : 'mainuse',
                        xtype: "textfield",
                        fieldLabel: "主要用途",
                        anchor: "95%",
						readOnly : true
                    }
				},{
					columnWidth: .3,
                    layout: "form",
                    border : false,
                    labelWidth : 60,
                    bodyStyle : 'padding:0,5,0,5;',
                    items: {
                    	id : 'categorys',
                        xtype: "textfield",
                        fieldLabel: "类别",
                        anchor: "95%",
						readOnly : true
                    }
				},{
					columnWidth: .4,
                    layout: "form",
                    border : false,
                    labelWidth : 120,
                    bodyStyle : 'padding:0,5,0,5;',
                    items: {
                    	id : 'remarke',
                        xtype: "textfield",
						readOnly : true
                    }
				}]
			},{
				layout : 'column',
				border : false,
				items : [{
					columnWidth: .3,
                    layout: "form",
                    border : false,
                    labelWidth : 60,
                    bodyStyle : 'padding:0,5,0,5;',
                    items: {
                    	id : 'demandreason',
                        xtype: "textfield",
                        fieldLabel: "需求原因",
                        anchor: "95%",
						readOnly : true
                    }
				}]
			}] 
		},{
			layout : 'column',
			border : false,
			items : [{
				xtype : 'form',
				columnWidth : .5,
				border : false,
				labelWidth : 60,
				bodyStyle : 'padding:5px;',
				defaults : {
					anchor : '95%'
				},
				items : [{
					id : 'uploadfile',
					xtype : 'displayfield',
					fieldLabel : '上传/浏览',
					readOnly : true
				}]
			}]
		}],
		modal : true,
		border : true,
		bodyStyle:'background:#fff;',
		resizable: false,  
		buttonAlign : 'center'
	});
	
	Ext.Ajax.request({
		url : "../JSON/PEdeclareRemote.getEquipRegistList?d="+new Date(),
		params : {
				id : id
		},
		success : function(response, opt) {
			var obj = Ext.decode(response.responseText);
			if (obj.success == true) {
				var data = obj.results[0];
				Ext.getCmp('projectname').setValue(data.projectname);
				Ext.getCmp('referencemodel').setValue(data.referencemodel);
				Ext.getCmp('mainparam').setValue(data.mainparam);
				Ext.getCmp('nums').setValue(data.nums);
				Ext.getCmp('numsunit').setValue(data.numsunit);
				Ext.getCmp('marketprice').setValue(data.marketprice);
				Ext.getCmp('schedule').setValue(data.schedule);
				Ext.getCmp('installsite').setValue(data.installsite);
				Ext.getCmp('installcondition').setValue(data.installcondition);
				Ext.getCmp('mainuse').setValue(data.mainuse);
				Ext.getCmp('demandreason').setValue(data.demandreason);
				Ext.getCmp('categorys').setValue(data.categorys);
				Ext.getCmp('remarke').setValue(data.remarke);
				var value = "<a href='../FILEDOWN/?ID="// 着用的是下载。需传值文件的id和文件名，才能查到
					+ data.fileid + "&ORIGINALNAME=" + encodeURI(encodeURI(data.uploadfile)) + "' cursor：hand>" +
					"<font color='blue'>" + data.uploadfile + "</font></a>";
					
				Ext.getCmp('uploadfile').setValue(value);
			}else{
				Ext.Msg.alert("提示","数据异常，请与管理员联系。")
			}
		},
		disableCaching : true,
	    autoAbort : true
	});
	return panel;
}