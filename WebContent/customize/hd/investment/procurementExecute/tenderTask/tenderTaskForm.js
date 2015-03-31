var tenderTaskForm = {
};
tenderTaskForm.combo = function(){
	
	 
	var combox = new Ext.form.ComboBox({
		id : 'procurementtype',
		fieldLabel : '采购类型',
		displayField : 'text',
		valueField : 'value',
		store : new Ext.data.SimpleStore({
			fields : ['value','text'],
			data : [ [ '3', '定向采购' ],[ '4', '委托招标' ],[ '5', '自行比价' ]]
		}),
		triggerAction : 'all',
		mode : 'local',
		editable : false,
		allowBlank : false,
		width:50,
		forceSelection : true,
		anchor : '95%'
	})
	return combox;
}
tenderTaskForm.getForm = function(fixid,rd) { 
	var items = [
	              {
	            	layout : 'column',
	    			border : false,
	    			defaults : {
	    				border : false,
	    				labelWidth : 110,
	    				columnWidth : 1			
	    		    }, 
	               items : [{
	                    	columnWidth : .5,
	        				border : false,
	        				layout : 'form',
	        				items : [
	        				     {
		        					fieldLabel : '设备名称',	
		        					xtype :'textfield',
		        					name : 'materialitemname',
		        					disabled : true,
		        					anchor : '95%'
		        				},{
		        					fieldLabel : '采购数量',	
		        					xtype :'numberfield',
		        					name : 'amount',  
		        					disabled : true,
		        					anchor : '95%'
		        				},{
		        					fieldLabel : '价格',	
		        					xtype :'numberfield',
		        					name : 'price', 
		        					anchor : '95%',
		        					allowBlank : false,
		        					maxLength : 12,
		        					maxLengthText : '不能超过12个字符，请重新输入！',
		        					allowDecimals :true,//是否允许输入小数   
	    						    decimalPrecision :3//小数点后面允许的位数多余的位数会自动四舍五入,配合allowDecimals :true一起使用,否则没意义 
		        				},{
		        					fieldLabel : '耗电量',	
		        					xtype :'textfield',
		        					name : 'powerConsumption', 
		        					anchor : '95%'
		        				},tenderTaskForm.combo(),{
		        					fieldLabel : '安装厂房',	
		        					xtype :'textfield',
		        					name : 'installationofplant', 
		        					allowBlank : false,
		        					anchor : '95%'
		        				}] 
	               	},{
                    	columnWidth : .5,
        				border : false,
        				layout : 'form',
        				items : [
        				    {
	        					fieldLabel : '规格型号',	
	        					xtype :'textfield',
	        					name : 'materialstandard',
	        					disabled : true,
	        					anchor : '95%'
	        				},{
	        					fieldLabel : '提出单位',	
	        					xtype :'textfield',
	        					name : 'demartment', 
	        					disabled : true,
	        					anchor : '95%'
	        				},{
	        					fieldLabel : '任务编号',	
	        					xtype :'textfield',
	        					name : 'taskCode', 
	        					allowBlank : false,
	        					anchor : '95%'
	        				},{
	        					fieldLabel : '需面积',	
	        					xtype :'numberfield',
	        					name : 'area', 
	        					anchor : '95%'
	        				},{
	        					fieldLabel : '生产厂家',	
	        					xtype :'textfield',
	        					name : 'plant',
	        					allowBlank : false,
	        					anchor : '95%'
	        				},{
	        					xtype:'fileuploadfield',
	    						id:'form-file',
	    						fieldLabel : '<font color=red>*</font>技借卡',
	    						name : 'fileName',
	    						anchor : '95%',
	    						width : '330',
	    		            	buttonText:'浏览...',
	    		            	allowBlank:false,
	    		            	blankText:'技借卡不能为空！'
	        				},{
	        					xtype :'textfield',
	        					name : 'fileId', 
	        					hidden: true
	        				}] 
               	}
	               ]
	              }];

	var inform = new Ext.FormPanel( {
		id : 'tenderTaskForm',
		buttonAlign : 'center',
		labelAlign : 'left', 
		lableWidth : 150,
		width : 480,
		height : 165,
		frame : false,
		border : false,
		items : items,
		fileUpload : true,
		padding : 5 
	}); 
	if(rd!=null)
		inform.getForm().loadRecord(rd);
	var buttons = [ {
		text : ' 确定 ',
		handler : function() {
			if (inform.form.isValid()) {  
				inform.form
				.doAction(
						'submit',
						{
							waitMsg : '正在保存数据，请稍候...',
							waitTitle : '提示',
							url : '../FILEUP/',//这里用的上传文件，同时要保存返回来的Json中的文件ID，文件名
							method : 'post',
							success : function(form, action) {//在这处理逻辑。
									var remote = Seam.Component.getInstance("stockPlan_Remote"); 
									var fileId = action.result.fileId;
									if(fileId==null || fileId=="")
										fileId = inform.form.findField('fileId').getRawValue();
									var	fileName = action.result.fileName;  
									if(fileName || fileName=="")
										fileName = inform.form.findField('fileName').getRawValue();
									if(fileName.indexOf("\\")!=-1)
									    fileName = fileName.substring(fileName.lastIndexOf("\\")+1);
								
									var	area= inform.form.findField('area').getRawValue();
									var	taskCode= inform.form.findField('taskCode').getRawValue();
									var	price= inform.form.findField('price').getRawValue();
									var	powerConsumption= inform.form.findField('powerConsumption').getRawValue();
									var	plant=inform.form.findField('plant').getRawValue();
									var	procurementtype= inform.form.findField('procurementtype').getRawValue();
									var	installationofplant= inform.form.findField('installationofplant').getRawValue() 
									remote.updateFixInfo(fixid, area, taskCode, price, powerConsumption, plant,
											 procurementtype, installationofplant, fileName, fileId, function(result){
										Ext.Msg.alert('提示', '保存数据成功！');
										form.reset();
										window.close(); 
										Ext.getCmp('tenderTaskGrid').store.baseParams={start:0,limit:20,materialcatalogName:'机电设备'};
										Ext.getCmp('tenderTaskGrid').store.load();
									});
								
											 
							},
							failure : function(form, action) {
								Ext.Msg.alert('提示',"保存失败");
							}
						});
			}

		}
	}, {
		text : '取消',
		handler : function() {
			inform.getForm().reset();
			window.close();
		}
	} ]

	var window = new Ext.Window( {
		id : "tenderTaskFormAddWind",
		width : 500,
		layout : 'fit',
		autoScroll : true,
		title : '任务列表-编辑',
		modal : true,
		items : inform,
		border : true,
		buttons : buttons,
		closeAction : 'hide'
	});
	return window;

} 
