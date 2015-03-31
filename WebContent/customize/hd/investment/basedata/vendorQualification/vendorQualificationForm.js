var vendorQualificationForm = {};
vendorQualificationForm.getForm = function(rd,vendorId){ 
	var items = [
			   {
		    	   xtype : 'hidden',
		    	   name :'vendorId',
		    	   id : "vendorId",
		    	   value :　vendorId
		       },
		       {
		    	   xtype : 'hidden',
		    	   name :'id',
		    	   id : "id"
		       },
		       {
		    	   fieldLabel : '名称',
		    	   id : "name",
		    	   name : "name", 
		    	   allowBlank : false,
				    maxLength : 50,
		    	    maxLengthText : '最多可输入50个字，请重新输入！',
					anchor : '95%'
		       },  {
		    	   	fieldLabel : '证书编号',
		    	   	id : "license",
		    	   	name : "license",  
					 allowBlank : false,
				    maxLength : 50,
		    	    maxLengthText : '最多可输入50个字，请重新输入！',
					anchor : '95%'
		       },  {
		    	   	fieldLabel : '内容',
		    	   	id : "content",
		    	   	name : "content",  
					allowBlank : false,
				    maxLength : 100,
		    	    maxLengthText : '最多可输入100个字，请重新输入！',
					anchor : '95%'
		       },{
		       		invalidText : '初评日期输入格式为Y-m-d',
				    xtype : 'datefield',
					fieldLabel : '起始日期',
					id : "startDate",
					name:"startDate",
					format : 'Y-m-d',
					allowBlank : false,
					anchor : '95%'
		       
		       },
		       {
		    	   	fieldLabel : '有效期（月）',
		    	   	id : "deadline",
		    	   	name : "deadline", 
		    	   	xtype : 'numberfield',
					allowBlank : false,
					anchor : '95%'
		       },  {
		    	   	fieldLabel : '发证机关',
		    	   	id : "issuingauthority",
		    	   	name : "issuingauthority",  
					 allowBlank : false,
				    maxLength : 100,
		    	    maxLengthText : '最多可输入100个字，请重新输入！',
					anchor : '95%'
		       },  {
		    	   	fieldLabel : '备注',
		    	   	id : "note",
		    	   	name : "note",  
					allowBlank : true,
				    maxLength : 100,
		    	    maxLengthText : '最多可输入100个字，请重新输入！',
					anchor : '95%'
		       }
			];
	
	var inform = new Ext.FormPanel({
		id : 'vendorQualificationFrom',
		buttonAlign : 'center',
		labelAlign : 'left',
		labelWidth : 80,
		padding : 5,
		autoScroll : true,
		defaultType: 'textfield',
		items : items
	});
	if(rd){
		inform.getForm().loadRecord(rd);
	}
	var buttons = [{
		text : ' 确定 ',
		handler : function(){ 
				if(inform.form.isValid()) {
					inform.form.doAction('submit',{
						waitMsg:'正在保存数据，请稍候...',
						waitTitle:'提示',
						url : '../JSON/vendorQualificationRemote.save',
						method : 'post',
						success : function(form, action) {
							Ext.Msg.alert('提示','保存数据成功！');
							form.reset();
							window.close();
							var grid = Ext.getCmp('vendorQualificationGridPanelId'); 
							grid.store.baseParams = {start :0 ,limit : 20,vendorId:vendorId};
							grid.store.load();				
						},
						failure : function(form, action){
							Ext.Msg.alert('提示','保存数据失败');
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
	
	var window = new Ext.Window({
		id : "vendorQualificationAddWind",
		width : 500,
		height : 300,
		layout : 'fit',
		title : '&nbsp;供应商资质',
		modal : true,
		items : inform,
		buttons : buttons
	});
	return window;
	
}