var contractView = {}

contractView.tabs = function(){
	privilegeValidate.privilegeValidate(null,null,null,"30000012","3000023",
		null,null,null,null,null,
		null,null,null,null,null,
		null,"30000021",null,null,null,
		null,null,null,null,null,
		null,null,null,null,null,
		null,null,"40000014","40000015","40000016",
		null,"40000018","40000019");
	var reCheck = privilegeValidate.check();
	//合同审签列表
	var contractDetailDataTabCheckSign = contractAuditGrid.mainGrid();//contractData.contractTab();
	//合同管理列表
	var contractDetailDataTabManager = contractBookData.contractBookTab();
	
	return [ contractDetailDataTabCheckSign, contractDetailDataTabManager,new contractDetailList.mainGrid() ];
}

contractView.conractBookSearchWindow = function(){
	var items = [{
 	   fieldLabel:'合同编号',
 	   name : 'contractCode',
 	   anchor : '95%',
		sortable : true
    },{
 	   fieldLabel : '签订单位',
 	   name:'vendName',
 	   anchor : '95%',
		sortable : true
    },{
 	   fieldLabel : '物资名称',
 	   name:'mainMaterialName',
 	   anchor : '95%',
		sortable : true
    }];

	var inform = new Ext.FormPanel({
		id : 'conractBookSearchFrom',
		buttonAlign : 'right',
		labelAlign : 'left',
		labelWidth : 80,
		padding : 5,
		autoScroll : true,
		defaultType: 'textfield',
		items : items
	});

	var buttons = [{
		text : ' 检索 ',
		handler : function(){
			var grid = Ext.getCmp('contractManagerPanelId');
			grid.getStore().baseParams = {
				start : 0,
				limit : 20,
				contractCode : inform.getForm().findField('contractCode').getValue(),
				vendName : inform.getForm().findField('vendName').getValue(),
				mainMaterialName : inform.getForm().findField('mainMaterialName').getValue()
			};
			grid.store.load();
			inform.getForm().reset();
			window.close();
		}		
	}, {
		text : ' 重置 ',
		handler : function() {
			inform.getForm().reset();
		}
	}, {
		text : ' 取消 ',
		handler : function() {
			inform.getForm().reset();
			window.close();
		}
	}];

	var window = new Ext.Window({
		id : "conractBookSearchWin",
		width : 310,
		height : 156,
		layout : 'fit',
		title : '&nbsp;合同管理-按条件检索',
		modal : true,
		items : inform,
		buttons : buttons
	});
	return window;
}