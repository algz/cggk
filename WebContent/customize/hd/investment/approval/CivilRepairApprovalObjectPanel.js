//土建大修审批查看明细
CivilRepairApprovalObjectPanel = {};
CivilRepairApprovalObjectPanel.init = function(id){

	var panel = new Ext.Panel({
		id :'CivilRepairApprovalObjcetPanel',
		width : 900,
		title:"土建大修",
		autoScroll:false,
		autoDestroy: true,
		items:[{
			layout : 'column',
			border : false,
			items : [{
				xtype : 'form',
				columnWidth : .33,
				border : false,
				labelWidth : 60,

				bodyStyle : 'padding:5px;',
				defaults : {
					anchor : '95%'
				},
				items : [{
					id : 'repairproject',
					xtype : 'textfield',
					fieldLabel : '维修项目',
					readOnly : true
				}, {
					id : 'annualinvestment',
					xtype : 'numberfield',
					fieldLabel : '本年投资',
					readOnly : true
				}, {
					id : 'useunit',
					xtype : 'textfield',
					fieldLabel : '使用单位',
					readOnly : true
				}]
			}, {
				xtype : 'form',
				columnWidth : .33,
				border : false,
				labelWidth : 60,
				bodyStyle : 'padding:5px;',
				defaultType : 'textfield',
				defaults : {
					anchor : '95%'
				},
				items : [{
					id : 'plancost',
					xtype : 'numberfield',
					fieldLabel : '计划费用',
					readOnly : true
				}, {
					id : 'repairarea',
					xtype : 'numberfield',
					fieldLabel : '修理面积',
					readOnly : true
				}, {
					id : 'repaircontent',
					fieldLabel : '维修内容',
					readOnly : true
				}]
			},{
				xtype : 'form',
				columnWidth : .33,
				border : false,
				labelWidth : 60,

				bodyStyle : 'padding:5px;',
				defaults : {
					anchor : '95%'
				},
				items : [{
					id : 'costunit',
					xtype : 'textfield',
					fieldLabel : '费用单位',
					readOnly : true
				}, {
					id : 'areaunit',
					xtype : 'textfield',
					fieldLabel : '面积单位',
					readOnly : true
				}, {
					id : 'categorys',
					xtype : 'textfield',
					fieldLabel : '类别',
					readOnly : true
				}]
			}]
		},{
			layout : 'column',
			border : false,
			items : [{
				columnWidth : .33,
				xtype : 'form',
				border : false,
				labelWidth : 60,
				bodyStyle : 'padding:5px;',
				defaults : {
					anchor : '95%'
				},
				items : [{
					id : 'remark',
					xtype : 'textfield',
					fieldLabel : '备注',
					readOnly : true
				}]
			},{
				xtype : 'form',
				columnWidth : .33,
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
		url : "../JSON/PEdeclareRemote.getCivilRepairList?d="+new Date(),
		params : {
				id : id
		},
		success : function(response, opt) {
			var obj = Ext.decode(response.responseText);
			if (obj.success == true) {
				var data = obj.results[0];
				Ext.getCmp('repairproject').setValue(data.repairproject);
				Ext.getCmp('plancost').setValue(data.plancost);
				Ext.getCmp('costunit').setValue(data.costunit);
				Ext.getCmp('annualinvestment').setValue(data.annualinvestment);
				Ext.getCmp('repairarea').setValue(data.repairarea);
				Ext.getCmp('areaunit').setValue(data.areaunit);
				Ext.getCmp('useunit').setValue(data.useunit);
				Ext.getCmp('repaircontent').setValue(data.repaircontent);
				Ext.getCmp('categorys').setValue(data.categorys);
				Ext.getCmp('remark').setValue(data.remark);
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