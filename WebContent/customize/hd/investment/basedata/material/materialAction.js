var materialAction = {};

// 新增视图
materialAction.addView = function() {//新增物料信息，必须先在物料种类树上，选择非root节点。
	if (materialTree.parentId == '' || materialTree.parentId == 'root'
			|| materialTree.parentId == '0') {
		Ext.Msg.alert('提示', '请先选择物资种类！');
		return;
	}
	var win = materialForm.getForm();
	win.show();
}

// 修改视图
materialAction.editeView = function() {
	var records = common.selectObj;
	if (records == null || records.length < 1) {
		Ext.Msg.alert('提示', '请选择你要编辑的记录！');
		return;
	}
	if (records.length>1) {
		Ext.Msg.alert('提示', '请选择一条记录进行编辑！');
		return;
	}
	var win = materialForm.getForm(records[0]);//展示已存在信息
	win.setTitle('&nbsp;物资信息-编辑');
	win.show();
}

// 删除
materialAction.del = function() {
	var records = common.selectObj;
	if (records == null || records.length < 1) {
		Ext.Msg.alert('提示', '请选择你要删除的数据！');
		return;
	}	
	Ext.MessageBox.confirm('删除物资信息', 
			'删除的物资信息无法恢复，是否继续？　', function(btn, text){
		if(btn == 'yes'){
			var arr = new Array();
			for ( var i = 0; i < records.length; i++) {
				arr.push(records[i].get('materialid'));//添加要删除id到arr数组
			}

			callSeam("material_MaterialRemote", "deleteMaterials", [ arr ],
					materialAction.callBack);//调用已封装好的方法删除，并回调materialAction.callBack，反馈删除操作结果信息
		}
	});

}

// 回调
materialAction.callBack = function(r) {
	if (r) {
		var result = Ext.util.JSON.decode(r);
		if(result.success == false){
			Ext.Msg.alert('提示', '数据已被使用，请核实后再删除！');
		} else {
			var grid = Ext.getCmp('materialGridPanelId');
			grid.getStore().baseParams = {
				startId : materialTree.parentId,
				start : 0,
				limit : 20
			};
			grid.store.load();
		}		
	} else {
		Ext.Msg.alert('提示', '服务器忙，请稍候重试！');
	}
}

// 对物料信息名进行搜索
materialAction.search = function() {
	var startId = materialTree.parentId;
	var materialItemName = document.getElementById('materialItemName').value;
	document.getElementById('type').value = 'true';
	var type = document.getElementById('type').value;
	var grid = Ext.getCmp('materialGridPanelId');
	grid.getStore().baseParams = {
		start : 0,
		limit : 20,
		startId : startId,
		materialItemName : materialItemName,
		type : type
	};
	grid.store.load();
}

// 物料信息文件上传
materialAction.upload = function() {
	var win = materialAction.fileUploadForm();
	win.show();
}
materialAction.fileUploadForm = function(rd) {//物料信息上传form方法
	var items = [ {//物料信息上传组件
		xtype : "textfield",
		fieldLabel : '上传文件',
		name : 'file',
		inputType : 'file',
		id : 'file1',
		allowBlank : false
	} ];
	var inform = new Ext.FormPanel( {//物料信息上传form
		id : 'materialFileUploadForm',
		buttonAlign : 'center',
		labelAlign : 'left',
		padding : 5,
		fileUpload : true,
		labelWidth : 70,		
		frame : false,
		items : items
	});
	var buttons = [ {
		text : '确定',
		handler : function() {
			if (!inform.form.isValid()) return;	//判断上传文件Excel的文件后缀名是否为‘.xls’，其余的格式文件上传为非法上传		
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
						url : '../MaterialUploadServlet',
						method : 'post',
						success : function(form, action) {
							form.reset();
							window.close();
							if(action.result.ImportExcelVo.redupObjs == ''){
								Ext.Msg.alert('提示', '上传数据成功！');
							} else {//重复数据信息的上传结果数据反馈
								var cm = new Ext.grid.ColumnModel([//反馈页面表头
	       							{header:'物料名称',dataIndex:'materialItemName'},{header:'规格',dataIndex:'materialStandard'},
	       							{header:'牌号',dataIndex:'desingnation'},{header:'技术条件',dataIndex:'technicCondition'}
	       						]);
	       						var showMessage = action.result.ImportExcelVo.redupObjs;//重复物料种类信息
	       						var data = {id : 0,root : showMessage };//封装为data数组
	       						var reader = new Ext.data.JsonReader({id:'id',root:'root'},
	       							['materialItemName','materialStandard','desingnation','technicCondition']);
	       						var store = new Ext.data.Store({
	       							proxy : new Ext.data.MemoryProxy(data),
	       							reader : reader
	       						});
	       						store.load();						
	       						var win = new Ext.Window({
	       							title : '&nbsp;系统已存在的物资信息',
	       							width : 520,
	       							height : 300,
	       							layout : 'fit',
	       							autoScroll : true,
	       							items : new Ext.grid.GridPanel({store:store,cm:cm,loadMask : {msg:'正在加载数据，请稍后...'}})
	       						});
	       						win.show();
							}
							common.gridPanel.refush();
						},
						failure : function(form, action){
							window.close();
							form.reset();
							Ext.Msg.alert('提示', '以下物资种类不存在，请核实后再重新导入！<br/>'+action.result.ImportExcelVo.returnMsg);
						}
					});
		}
	}, {
		text : '取消',
		handler : function() {
			inform.getForm().reset();
			window.close();
		}
	} ];

	var window = new Ext.Window( {//物料信息上传窗口
		id : "materialFileUploadWind",
		layout : 'fit',
		width : 300,
		height : 100,
		title : '&nbsp;物资信息-上传',
		modal : true,
		items : inform,
		buttons : buttons
	});
	return window;

}
