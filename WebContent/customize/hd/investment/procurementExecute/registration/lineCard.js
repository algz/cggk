/**
*路线卡
**/
var lineCard = {
	contractId : null,
	routeNo : null
};
lineCard.measurementCombo = function(){ 
	var combox = new Ext.form.ComboBox({ 
		hiddenName : 'measurement',
		fieldLabel : '测量',
		displayField : 'text',
		valueField : 'value',
		store : new Ext.data.SimpleStore({
			fields : ['value','text'],
			data : [ [ '0', '未测量' ],[ '1', '已测量' ]]
		}),
		triggerAction : 'all',
		mode : 'local',
		editable : false,
		width:50,
		forceSelection : true,
		anchor : '95%',
		value : '0'
	})
	return combox;
} 
lineCard.hardnessCombo = function(){ 
	var combox = new Ext.form.ComboBox({ 
		hiddenName : 'hardness',
		fieldLabel : '硬度',
		displayField : 'text',
		valueField : 'value',
		store : new Ext.data.SimpleStore({
			fields : ['value','text'],
			data : [ [ '0', '不需要测硬度' ],[ '1', '需要测硬度' ]]
		}),
		triggerAction : 'all',
		mode : 'local',
		editable : false,
		width:50,
		forceSelection : true,
		anchor : '95%',
		value : '0'
	})
	return combox;
} 
lineCard.pullingCombo = function(){ 
	var combox = new Ext.form.ComboBox({ 
		hiddenName : 'pulling',
		fieldLabel : '拉力',
		displayField : 'text',
		valueField : 'value',
		store : new Ext.data.SimpleStore({
			fields : ['value','text'],
			data : [ [ '0', '不需要侧拉力' ],[ '1', '需要侧拉力' ]]
		}),
		triggerAction : 'all',
		mode : 'local',
		editable : false,
		width:50,
		forceSelection : true,
		anchor : '95%',
		value : '0'
	})
	return combox;
} 
lineCard.getForm = function(rd,itemCode,itemName,itemId) { 
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
	        						{name:'itemId',value:itemId,xtype : 'hidden'},
	        						{name:'routeId',xtype : 'hidden'},
	        				     {
		        					fieldLabel : '路线卡编号',	
		        					xtype :'textfield',
		        					name : 'routeNo', 
		        					allowBlank : false,
		        					anchor : '95%' 
		        				},{
		        					fieldLabel : '物资编号',	
		        					xtype :'textfield',
		        					name : 'itemCode', 
		        					disabled : true,
		        					anchor : '95%',
		        					value : itemCode
		        				},lineCard.measurementCombo(),lineCard.pullingCombo() ] 
	               	},{
                    	columnWidth : .5,
        				border : false,
        				layout : 'form',
        				items : [
        				    {
	        					fieldLabel : '路线卡名称',	
	        					xtype :'textfield', 
	        					name : 'routeName', 
	        					allowBlank : false,
	        					anchor : '95%'
	        				},{
	        					fieldLabel : '物资名称',	
	        					name : 'itemName', 
	        					xtype :'textfield', 
	        					disabled : true,
	        					allowBlank : false,
	        					anchor : '95%',
	        					value : itemName
	        				}, lineCard.hardnessCombo()
	        				] 
               	}
	               ]
	              }];

	var inform = new Ext.FormPanel( {
		id : 'lineCard',
		buttonAlign : 'center',
		labelAlign : 'left', 
		lableWidth : 150,
		width : 480,
		height : 120,
		frame : false,
		border : false,
		items : items,
		fileUpload : false,
		padding : 5 
	}); 
	if(rd!=null){
		inform.getForm().loadRecord(rd);
	}else{
		inform.form.doAction('load',{
			waitTitle : '加载路线卡信息',
			waitMsg : '加载路线卡信息',
			url : '../JSON/routeRemote.getRoute?d=' + new Date(),
			method : 'post',
			params : {itemId : itemId,itemName:itemName,itemCode:itemCode },
			success : function (form,action){ 
				lineCard.routeNo = action.result.data.routeNo;
			}
		}); 
	}
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
							url : '../JSON/routeRemote.saveRoute?d=' + new Date(),
							method : 'post',
							success : function(form, action) {//在这处理逻辑。
								   inform.getForm().reset();
								    Ext.Msg.alert('提示',"保存成功");
								   	var grid = Ext.getCmp('registrationGridPanelId'); 
									grid.store.baseParams = {start : 0 ,limit :20};
									var registrationForm =  Ext.getCmp("registrationForm"); 
									if(registrationForm!=null){ 
										if(lineCard.routeNo!=null)
											registrationForm.form.findField('routeNo').setRawValue(lineCard.routeNo);
										else 
											registrationForm.form.findField('routeNo').setRawValue(inform.form.findField('routeNo').getRawValue());
									}
									grid.store.load();
								    window.close();
							},
							failure : function(form, action) {
								   inform.getForm().reset();
								   Ext.Msg.alert('提示',"保存失败");
								   window.close();
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
		id : "lineCardAddWind",
		width : 500,
		layout : 'fit',
		autoScroll : true,
		title : '路线卡',
		modal : true,
		items : inform,
		border : true,
		buttons : buttons,
		closeAction : 'close'
	});
	return window;

} 
