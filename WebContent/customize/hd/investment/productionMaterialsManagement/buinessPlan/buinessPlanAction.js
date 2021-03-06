var buinessPlanAction = {buinessPlanId:''};
// 上传年度计划大纲方法
buinessPlanAction.upload = function() {
	var win = buinessPlanAction.fileUploadForm();
	win.show();
}
// 上传年度计划大纲界面
buinessPlanAction.fileUploadForm = function(rd) {
	var items = [ new Ext.form.ComboBox({
		id : 'planType',
		// 作为FORM表单提交时的参数名,并且hiddenName!=id
		//hiddenName : 'yn_life',//创建一个新的控件,id=hiddenName
		fieldLabel : '计划类型',
		typeAhead : true,// 必须项
		triggerAction : 'all',// 必须项
		//hideTrigger:true ,//true隐藏下拉箭头
		lazyRender : true,
		resizable : true,// 是否手动扩展大小,默认false
		mode : 'local',
		forceSelection : true,// 限制输入范围在可选择的文本内
		editable : false,// 不允许输入,只能选择文本列表
		anchor : '95%',
		store : new Ext.data.ArrayStore(
			{
				id : 0,
				fields : ['value',	'displayText'],
				data : [[1, '预拨计划'],[2, '调整计划'],[3,'临批计划']]	
			}),
		valueField : 'value',
		value : 1,
		displayField : 'displayText'
}),{
		xtype : "textfield",
		fieldLabel : '上传文件',
		name : 'file',
		inputType : 'file',
		id: 'file1',
		allowBlank : false
	} ];//年度计划大纲界面form
	var inform = new Ext.FormPanel( {
		id : 'buinessPlanFileUploadForm',
		buttonAlign : 'center',
		labelAlign : 'left',
		padding : 5,
		fileUpload : true,
		labelWidth : 70,		
		frame : false,
		items : items
	});
	if (rd) {
		inform.getForm().loadRecord(rd);
	}
	var buttons = [ {
		text : '确定',
		handler : function() {//文件格式后缀名验证
			fileUploadSubmit(window,inform);
		}
	}, {
		text : '取消',
		handler : function() {
			inform.getForm().reset();
			window.close();
		}
	} ];

	var window = new Ext.Window( {
		id : "buinessPlanFileUploadWind",
		layout : 'fit',
		width : 300,
		height : 130,
		title : '&nbsp;年度计划信息-上传',
		modal : true,
		items : inform,
		buttons : buttons
	});
	return window;

}

//获取Store
function findStore(data){
	var reader = new Ext.data.ArrayReader({id:0},[{name:'productCode',mapping:0}]);
	var store = new Ext.data.Store({
		proxy:new Ext.data.MemoryProxy(data),
		reader:reader
	});
	return store;
}
//错误信息提示窗，含有两个选项卡
function errorMessageWin(store1,store2){
	var win = new Ext.Window({
		title : '&nbsp;错误记录',
		width : 520,
		height : 300,
		layout : 'fit',
		autoScroll : true,
		items : [{
			xtype : 'tabpanel',
			activeTab : 0,
			items : [{
				xtype : 'panel',
				title : '以下机型不存在',
				layout : 'fit',
				autoScroll : true,
				items : new Ext.grid.GridPanel({store : store1,
					cm : new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),
				        {header:'机型',dataIndex:'productCode'}
				    ]),
				  loadMask : {msg:'正在加载数据，请稍后...'}})
			},{
				xtype : 'panel',
				title : '以下机型数据缺少',
				layout : 'fit',
				autoScroll : true,
				items : new Ext.grid.GridPanel({store:store2,
					cm : new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),
			            {header:'机型',dataIndex:'productCode'}
				    ]),
				  loadMask : {msg:'正在加载数据，请稍后...'}})
			}]
		}]
	});
	
	return win;
}


//展示年度经营计划明细
buinessPlanAction.showPlanDetail = function(planDetailId,buinessPlanName,planType){
	//调用时赋值
	buinessPlanAction.buinessPlanId=planDetailId;
	var win = new Ext.Window({
		//id : "buinessPlanDetailShow",
		width : 1000,
		height : 500,
		autoScroll : false, 
		layout: 'fit',
		title:buinessPlanName,//title : '&nbsp;年度计划明细列表',
		modal : true,
		items : [new buinessPlanDetailGrid.importPlanGrid({buinessPlanId:planDetailId,planType:planType})]//grid
	})//buinessPlanDetailGrid.gridWin();
	win.show();
	Ext.getCmp('importBuinessPlanGrid').store.load();
	
}
//上传文件，确定操作方法
function fileUploadSubmit(window,inform){
	if (!inform.form.isValid()) return;			
	var fileName = inform.form.findField('file').getValue().toLowerCase().trim();
	if (fileName.lastIndexOf('.') == -1) {
		Ext.Msg.alert('提示','仅支持扩展名为.xls的Excel文件!');
		return;
	}
	if(fileName.substr(fileName.lastIndexOf('.')) != '.xls'){
		Ext.Msg.alert('提示','仅支持扩展名为.xls的Excel文件!');
		return;
	}
			inform.form.doAction('submit', {
				waitMsg : '正在上传数据，请稍候...',
				waitTitle : '提示',
				url : '../BuinessPlanUploadServlet?planType='+Ext.getCmp('planType').getValue(),
				method : 'post',
				success : function(form, action) {//成功提示，刷新计划大纲grid
					var showMessage = action.result.ImportExcelVo.returnMsg+'!';
					Ext.Msg.alert('提示', showMessage);
					form.reset();
					window.close();
					var grid = Ext.getCmp('buinessPlanGridPanelId');
					grid.getStore().baseParams = {start:0,limit:20};
					grid.store.load();
				},
				failure : function(form,action){//上传失败，错误信息反馈
					form.reset();//重置form
					window.close();//关闭原窗口
					
					var data1 = action.result.ImportExcelVo.noExistProducts;
					var store1 = findStore(data1);
					store1.load();
					
					var data2 = action.result.ImportExcelVo.bankExistProducts;
					var store2 = findStore(data2);
					store2.load();
					
					if(data1.length<1&&data2.length<1){
						var showMessage = action.result.ImportExcelVo.returnMsg+'!';
						Ext.Msg.alert('提示', showMessage);
					}else{
						var win = errorMessageWin(store1,store2);
						win.show();
					}
				}
			
			});
}