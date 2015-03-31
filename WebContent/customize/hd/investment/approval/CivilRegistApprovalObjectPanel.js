//土建登记审批查看明细
CivilRegistApprovalObjectPanel = {};
CivilRegistApprovalObjectPanel.init = function(id){

	var panel = new Ext.Panel({
		id :'CivilRegistApprovalObjcetPanel',
		width : 900,
		title:"土建登记",
		autoScroll:false,
		autoDestroy: true,
		items:[{
			layout : 'column',
			border : false,
			items : [{
				xtype : 'form',
				columnWidth : .25,
				border : false,
				labelWidth : 60,

				bodyStyle : 'padding:5px;',
				defaults : {
					anchor : '95%'
				},
				items : [{
					id : 'projectname',
					xtype : 'textfield',
					fieldLabel : '项目名称',
					readOnly : true
				}, {
					id : 'investmentbudget',
					xtype : 'textfield',
					fieldLabel : '投资概算',
					readOnly : true
				}, {
					id : 'useunit',
					xtype : 'textfield',
					fieldLabel : '使用单位',
					readOnly : true
				}]
			}, {
				xtype : 'form',
				columnWidth : .25,
				border : false,
				labelWidth : 60,
				bodyStyle : 'padding:5px;',
				defaults : {
					anchor : '95%'
				},
				items : [{
					id : 'constructiontype',
					xtype : 'textfield',
					fieldLabel : '建设性质',
					readOnly : true
					
				}, {
					id : 'financeunit',
					xtype : 'textfield',
					fieldLabel : '概算单位',
					readOnly : true
				}, {
					id : 'mainuse',
					xtype : 'textfield',
					fieldLabel : '主要用途',
					readOnly : true
				}]
			},{
				xtype : 'form',
				columnWidth : .25,
				border : false,
				labelWidth : 60,

				bodyStyle : 'padding:5px;',
				defaults : {
					anchor : '95%'
				},
				items : [{
					id : 'nums',
					xtype : 'textfield',
					fieldLabel : '数量',
					readOnly : true
				}, {
					id : 'constructionsite',
					xtype : 'textfield',
					fieldLabel : '选址/地点',
					readOnly : true
				}, {
					id : 'demandreason',
					xtype : 'textfield',
					fieldLabel : '需求原因',
					readOnly : true
				}]
			},{
				xtype : 'form',
				columnWidth : .25,
				border : false,
				labelWidth : 60,

				bodyStyle : 'padding:5px;',
				defaults : {
					anchor : '95%'
				},
				items : [{
					id : 'numsunit',
					xtype : 'textfield',
					fieldLabel : '数量单位',
					readOnly : true
				}, {
					id : 'deliverytime',
					xtype : 'textfield',
					fieldLabel : '交付时间',
					readOnly : true
				}, {
					id : 'remarke',
					xtype : 'textfield',
					fieldLabel : '备注',
					readOnly : true
				}]
			}]
		},{
			xtype : 'form',
			border : false,
			labelWidth : 60,
			bodyStyle : 'padding:5px;',
			items : [{
						id : 'uploadfile',
						xtype : 'displayfield',
						fieldLabel : '上传附件',
						readOnly : true
					}]
		}],
		modal : true,
		border : true,
		bodyStyle:'background:#fff;',
		resizable: false,  
		buttonAlign : 'center'
	});
	
	Ext.Ajax.request({
		url : "../JSON/PEdeclareRemote.getCivilRegistList?d="+new Date(),
		params : {
				id : id
		},
		success : function(response, opt) {
			var obj = Ext.decode(response.responseText);
			if (obj.success == true) {
				var data = obj.results[0];
				Ext.getCmp('projectname').setValue(data.projectname);
				Ext.getCmp('constructiontype').setValue(data.constructiontype);
				Ext.getCmp('nums').setValue(data.nums);
				Ext.getCmp('numsunit').setValue(data.numsunit);
				Ext.getCmp('investmentbudget').setValue(data.investmentbudget);
				Ext.getCmp('financeunit').setValue(data.financeunit);
				Ext.getCmp('constructionsite').setValue(data.constructionsite);
				Ext.getCmp('deliverytime').setValue(data.deliverytime);
				Ext.getCmp('useunit').setValue(data.useunit);
				Ext.getCmp('mainuse').setValue(data.mainuse);
				Ext.getCmp('demandreason').setValue(data.demandreason);
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