var tenderFileApprovalForm={

};
/**
 * 招标文件审批对象
 * @return {}
 */
tenderFileApprovalForm.tenderTenderPanel = function(){
	var tenderFileForm = new Ext.form.FormPanel({
		id : 'tenderFileForm2',
		fileUpload : true,
		region : 'north',
		height : 60,
		padding : 5,
		items : [{xtype:'hidden',name:'fileId'},
		     {layout:'column',border:false,items:[
		     {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'编号',name:'tenderFileCode',readOnly:true,anchor:'90%'}]},
		     {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'招标项目',name:'procurementplanDetilName',readOnly:true,anchor:'90%'}]}
		     ]},{layout:'column',border:false,items:[
		     {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'全权代表',name:'plenipotentiary',readOnly:true,anchor:'90%'}]},
		     {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'时间',name:'createdate',readOnly:true,anchor:'90%'}]},
		     {columnWidth:.4,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'招标文件',name:'fileName',readOnly:true,anchor:'98%'}]},
		     {columnWidth:.1,layout:'form',border:false,items:[       
		     {html:"<a id = 'down'>下载</a>",border:false}
		            ]}
		     ]}]
	});
	return tenderFileForm;
}
/**
 * 招标文件审批对象
 * @return {}
 */
tenderFileApprovalForm.tenderAppraPanel = function(){
	var tenderFileForm = new Ext.form.FormPanel({
		id : 'tenderFileForm2',
		fileUpload : true,
		region : 'north',
		height : 60,
		padding : 5,
		items : [{xtype:'hidden',name:'fileId'},
		     {layout:'column',border:false,items:[
		     {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'编号',name:'tenderFileCode',readOnly:true,anchor:'90%'}]},
		     {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'招标项目',name:'procurementplanDetilName',readOnly:true,anchor:'90%'}]}
		     ]},{layout:'column',border:false,items:[
		     {columnWidth:.5,layout:'form',border:false,items:[
		     {xtype:'textfield',fieldLabel:'中标单位',name:'selecteddepartment',readOnly:true,anchor:'90%'}]},
		     {columnWidth:.5,layout:'form',border:false,items:[
		     {xtype:'textfield',fieldLabel:'选评审人员',name:'syndic',readOnly:true,anchor:'90%'}]},
		      {columnWidth:.5,layout:'form',border:false,items:[
		     {xtype:'textfield',fieldLabel:'全权代表',name:'plenipotentiary',readOnly:true,anchor:'90%'}]},
		     {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'时间',name:'createdate',readOnly:true,anchor:'90%'}]},
		     {columnWidth:.4,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'招标文件',name:'fileName',readOnly:true,anchor:'98%'}]},
		     {columnWidth:.1,layout:'form',border:false,items:[       
		     {html:"<a id = 'down'>下载</a>",border:false}
		            ]},
		      {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'金额',name:'amount',readOnly:true,anchor:'90%'}]}
		     ]}]
	});
	return tenderFileForm;
}
/**
 * 委托审签
 * @return {}
 */
tenderFileApprovalForm.tenderFilePanel = function(){
	var tenderFileForm = new Ext.form.FormPanel({
		id : 'tenderFileForm2',
		fileUpload : true,
		region : 'north',
		height : 60,
		padding : 5,
		items : [{xtype:'hidden',name:'fileId'},
		     {layout:'column',border:false,items:[
		     {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'编号',name:'tenderFileCode',readOnly:true,anchor:'90%'}]},
		     {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'招标项目',name:'procurementplanDetilName',readOnly:true,anchor:'90%'}]}
		     ]},{layout:'column',border:false,items:[
		     {columnWidth:.5,layout:'form',border:false,items:[
		     {xtype:'textfield',fieldLabel:'资金来源',name:'efficiency',readOnly:true,anchor:'90%'}]}, 
		     {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'时间',name:'createdate',readOnly:true,anchor:'90%'}]},
		     {columnWidth:.4,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'招标文件',name:'fileName',readOnly:true,anchor:'98%'}]},
		     {columnWidth:.1,layout:'form',border:false,items:[       
		     {html:"<a id = 'down'>下载</a>",border:false}
		            ]}
		     ]}]
	});
	return tenderFileForm;
}
/**
 * 招标通知或者招标管理登记
 * @return {}
 */
tenderFileApprovalForm.tenderMessagePanel = function(){
	var tenderFileForm = new Ext.form.FormPanel({
		id : 'tenderFileForm2',
		fileUpload : true,
		region : 'north',
		height : 60,
		padding : 5,
		items : [{xtype:'hidden',name:'fileId'},
		     {layout:'column',border:false,items:[
		     {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'编号',name:'tenderFileCode',readOnly:true,anchor:'90%'}]},
		     {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'招标项目',name:'procurementplanDetilName',readOnly:true,anchor:'90%'}]}
		     ]},{layout:'column',border:false,items:[
		     {columnWidth:.5,layout:'form',border:false,items:[
		     {xtype:'textfield',fieldLabel:'全权代表',name:'plenipotentiary',readOnly:true,anchor:'90%'}]}, 
		     {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'时间',name:'createdate',readOnly:true,anchor:'90%'}]},
		     {columnWidth:.4,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'招标文件',name:'fileName',readOnly:true,anchor:'98%'}]},
		     {columnWidth:.1,layout:'form',border:false,items:[       
		     {html:"<a id = 'down'>下载</a>",border:false}
		            ]}
		     ]}]
	});
	return tenderFileForm;
} 
/**
 * 招标通知或者招标管理登记
 * @return {}
 */
tenderFileApprovalForm.tenderFileDirectionalPanel = function(){
	var tenderFileForm = new Ext.form.FormPanel({
		id : 'tenderFileForm2',
		fileUpload : true,
		region : 'north',
		height : 60,
		padding : 5,
		items : [{xtype:'hidden',name:'fileId'},
		     {layout:'column',border:false,items:[
		     {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'编号',name:'tenderFileCode',readOnly:true,anchor:'90%'}]},
		     {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'使用单位',name:'agreementdepartment',readOnly:true,anchor:'90%'}]}
		     ]},{layout:'column',border:false,items:[
		     {columnWidth:.5,layout:'form',border:false,items:[
		     {xtype:'textfield',fieldLabel:'定向单位',name:'selecteddepartment',readOnly:true,anchor:'90%'}]}, 
		      {columnWidth:.5,layout:'form',border:false,items:[
		     {xtype:'textfield',fieldLabel:'招标项目',name:'procurementplanDetilName',readOnly:true,anchor:'90%'}]}, 
		     {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'时间',name:'createdate',readOnly:true,anchor:'90%'}]},
		     {columnWidth:.4,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'招标文件',name:'fileName',readOnly:true,anchor:'98%'}]},
		     {columnWidth:.1,layout:'form',border:false,items:[       
		     {html:"<a id = 'down'>下载</a>",border:false}
		            ]}
		     ]}]
	});
	return tenderFileForm;
} 
/**
 * 谈判记录
 * @return {}
 */
tenderFileApprovalForm.tenderNegotiationPanel = function(){
	var tenderFileForm = new Ext.form.FormPanel({
		id : 'tenderFileForm2',
		fileUpload : true,
		region : 'north',
		height : 60,
		padding : 5,
		items : [{xtype:'hidden',name:'fileId'},
		     {layout:'column',border:false,items:[
		     {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'编号',name:'tenderFileCode',readOnly:true,anchor:'90%'}]},
		     {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'全权代表',name:'plenipotentiary',readOnly:true,anchor:'90%'}]}
		     ]},{layout:'column',border:false,items:[
		     {columnWidth:.5,layout:'form',border:false,items:[
		     {xtype:'textfield',fieldLabel:'中标单位',name:'selecteddepartment',readOnly:true,anchor:'90%'}]}, 
		    
		     {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'时间',name:'createdate',readOnly:true,anchor:'90%'}]},
		     {columnWidth:.4,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'招标文件',name:'fileName',readOnly:true,anchor:'98%'}]},
		     {columnWidth:.1,layout:'form',border:false,items:[       
		     {html:"<a id = 'down'>下载</a>",border:false}
		            ]},
		              {columnWidth:.5,layout:'form',border:false,items:[
		     {xtype:'textfield',fieldLabel:'评审人员',name:'syndic',readOnly:true,anchor:'90%'}]}
		     ]}]
	});
	return tenderFileForm;
} 
/**
 * 谈判记录
 * @return {}
 */
tenderFileApprovalForm.tenderFileCommissionPanel = function(){
	var tenderFileForm = new Ext.form.FormPanel({
		id : 'tenderFileForm2',
		fileUpload : true,
		region : 'north',
		height : 60,
		padding : 5,
		items : [{xtype:'hidden',name:'fileId'},
		     {layout:'column',border:false,items:[
		     {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'编号',name:'tenderFileCode',readOnly:true,anchor:'90%'}]},
		     {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'协议单位',name:'agreementdepartment',readOnly:true,anchor:'90%'}]}
		     ]},{layout:'column',border:false,items:[
		     {columnWidth:.5,layout:'form',border:false,items:[
		     {xtype:'textfield',fieldLabel:'全权代表',name:'plenipotentiary',readOnly:true,anchor:'90%'}]}, 
		      {columnWidth:.5,layout:'form',border:false,items:[
		     {xtype:'textfield',fieldLabel:'招标项目',name:'procurementplanDetilName',readOnly:true,anchor:'90%'}]}, 
		     {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'时间',name:'createdate',readOnly:true,anchor:'90%'}]},
		     {columnWidth:.4,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'招标文件',name:'fileName',readOnly:true,anchor:'98%'}]},
		     {columnWidth:.1,layout:'form',border:false,items:[       
		     {html:"<a id = 'down'>下载</a>",border:false}
		            ]}
		     ]}]
	});
	return tenderFileForm;
} 
/**
 * 自行比价
 * @return {}
 */
tenderFileApprovalForm.tenderFileParityPanel = function(){
	var tenderFileForm = new Ext.form.FormPanel({
		id : 'tenderFileForm2',
		fileUpload : true,
		region : 'north',
		height : 60,
		padding : 5,
		items : [{xtype:'hidden',name:'fileId'},
		     {layout:'column',border:false,items:[
		     {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'编号',name:'tenderFileCode',readOnly:true,anchor:'90%'}]},
		     {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'numberfield',fieldLabel:'总金额',name:'amount',readOnly:true,anchor:'90%'}]}
		     ]},{layout:'column',border:false,items:[
		     {columnWidth:.5,layout:'form',border:false,items:[
		     {xtype:'textfield',fieldLabel:'申请单位',name:'selecteddepartment',readOnly:true,anchor:'90%'}]}, 
		      {columnWidth:.5,layout:'form',border:false,items:[
		     {xtype:'textfield',fieldLabel:'招标项目',name:'procurementplanDetilName',readOnly:true,anchor:'90%'}]}, 
		     {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'时间',name:'createdate',readOnly:true,anchor:'90%'}]},
		     {columnWidth:.4,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'招标文件',name:'fileName',readOnly:true,anchor:'98%'}]},
		     {columnWidth:.1,layout:'form',border:false,items:[       
		     {html:"<a id = 'down'>下载</a>",border:false}
		            ]}
		     ]}]
	});
	return tenderFileForm;
} 