var procurementProcessForm={};

procurementProcessForm.getForm=function(){
	var items=[{
			fieldLabel:'Code',
			name:'purchaseCode',
			id:'purchaseId'},
		{
			fieldLabel:'editorDeptName',
			name:'editorDeptName',
			id:'purchaseId'}];
	
	var buttons = [{
		text : ' 确定 ',
		handler : function(){
			if(inform.form.isValid()) {
				inform.form.doAction('submit',{
					waitMsg:'正在保存数据，请稍候...',
					waitTitle:'提示',
					url : '../JSON/vendor_VendorRemote.saveVendor',
					method : 'post',
					success : function(form, action) {
						Ext.Msg.alert('提示','保存数据成功！');
						form.reset();
						window.close();
						common.gridPanel.refush();
					}
				})
			}
		}		
	}, {
		text : '取消',
		handler : function() {
			inform.getForm().reset();
			window.close();
		}
	}]
	
	var inform = new Ext.FormPanel({
		id : 'procurementProcessFrom',
		buttonAlign :'center',
		labelAlign : 'right',
		labelWidth: 80,
		bodyStyle : 'padding:10,0,10,0',
		autoHeight : true,
		frame : false,
		defaultType: 'textfield',
		items : items
	});
	var window=new Ext.Window({
		id:'procurementProcessWindow',
	   width:500,
	   height:800,
	   autoScroll:auto,
	   title:'采购信息',
	   modal:true,
	   items:inform,
	   bottons:buttons
	});
	return window;
}