
var parametersAdd = {issueDialog:null,form:null,temp:null, rank:null, taskid:null, projectid:null, flag:null}

parametersAdd.init = function(flag, taskid,projectid){
	parametersAdd.taskid=taskid;
	parametersAdd.projectid=projectid;
	parametersAdd.flag=flag;
	Ext.QuickTips.init();
	
	if (!parametersAdd.issueDialog){				
		tlework.addHtml(tlework.divHtml,'parametersAdd');			//动态生成需要绑定的div
		parametersAdd.issueDialog = new Ext.Window({ 				//创建对话框
		el:'parametersAdd',
		title: ''+getResource('resourceParam1613')+'',
		modal: true,
		layout:'fit',
		width:400,
		height:250,
		closeAction:'hide',
		plain: false,
		items: [parametersAdd.addform()]						//将面板绑定到对话框
		});
	}
	parametersAdd.issueDialog.show();
 
	parametersAdd.issueDialog.on("hide",function(){
		parametersAdd.issueDialog.close();
		parametersAdd.issueDialog.destroy();		
		parametersAdd.issueDialog = null;
		
	});
}

parametersAdd.addform= function(){
	parametersAdd.combo1 = new Ext.form.ComboBox({
		store : new Ext.data.SimpleStore({
			fields : ["typeid", "typename"],
			data : [[0, ''+getResource('resourceParam6072')], // 6072  数字
			        [1, ''+getResource('resourceParam502')+''], 
			        [2, ''+getResource('resourceParam1614')+''], 
			        [3, ''+getResource('resourceParam469')+'']]
		}),
		allowBlank : false,
		valueField : "typeid",
		displayField : "typename",
		mode : 'local',
		forceSelection : true,
		hiddenName : 'typeid',
		editable : false,
		triggerAction : 'all',
		fieldLabel : ''+getResource('resourceParam1261')+'',
		name : 'typeid',
		anchor : '100%'
	});
	parametersAdd.combo1.on('select', function(combo, record, index) {
		if (record.get('typeid') == 3) {
			parametersAdd.form.getComponent('stringvalue').setValue('');
			parametersAdd.form.getComponent('stringvalue').setDisabled(true);
		} else {			
			parametersAdd.form.getComponent('stringvalue').setDisabled(false);//恢复可以编辑
		}
	})
	
	//根据是输入参数还是输出参数过滤
	var variableType = [];//[[1, '输入变量'], [2, '输出变量'], [3, '临时变量'], [4, '输入输出变量']]
	if (parametersAdd.flag == 1){
		variableType = [[1, ''+getResource('resourceParam1615')+''], [4, ''+getResource('resourceParam1611')+'']];//输入参数
	} else {
		variableType = [[2, ''+getResource('resourceParam1616')+''], [4, ''+getResource('resourceParam1611')+'']];//输出参数
	}

	parametersAdd.combo2 = new Ext.form.ComboBox({
		store : new Ext.data.SimpleStore({
			fields : ["inoutId", "inoutName"],
			data : variableType
		}),
		allowBlank : false,
		valueField : "inoutId",
		displayField : "inoutName",
		mode : 'local',
		forceSelection : true,
		hiddenName : 'inoutId',
		editable : false,
		triggerAction : 'all',
		fieldLabel : ''+getResource('resourceParam854')+'',
		name : 'inoutId',
		anchor : '100%'
	});
	 
	parametersAdd.form = new Ext.FormPanel({
		labelWidth: 60, // label settings here cascade unless overridden
        frame:false,
        plain: false,
        bodyStyle:'padding:5px 5px 0;background:transparent;',
		defaultType: 'textfield',
		items:[	
			{
				fieldLabel: ''+getResource('resourceParam1258')+'',		//文本框
				name: 'name',
				id: 'name',
//				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
				regexText : ''+getResource('resourceParam1092')+'!',//输入校验有哪些？
				//width:200,
				blankText:''+getResource('resourceParam1254')+'',
				maxLength : 50,
				maxLengthText :''+getResource('resourceParam1257')+'',
				allowBlank:false,
				anchor:'100%'
			},
			parametersAdd.combo1,
			{
				fieldLabel: ''+getResource('resourceParam1262')+'',		//文本框
				name: 'stringvalue',
				id: 'stringvalue',
//				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
				regexText : ''+getResource('resourceParam1092')+'!',//输入校验有哪些？
				//width:200,
				blankText:''+getResource('resourceParam1259')+'',
				maxLength : 50,
				maxLengthText :''+getResource('resourceParam1257')+'',
				allowBlank:true,
				anchor:'100%'
			},
			parametersAdd.combo2,//输入输出变量
			{
				fieldLabel: ''+getResource('resourceParam1256')+'',		//文本框
				name: 'description',
				id: 'description',
//				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
				regexText : ''+getResource('resourceParam1092')+'!',//输入校验有哪些？
				//width:200,
				blankText:''+getResource('resourceParam1612')+'',
				maxLength : 50,
				maxLengthText :''+getResource('resourceParam1260')+'',
				allowBlank:true,
				anchor:'100%'
			}
 
			 ],						
		buttons : [ // 定义面板中的按钮
		{
			text : ''+getResource('resourceParam479')+'',
			handler : function(button) // 为当前按钮绑定事件
			{ // 如果验证通过，则将表单元素提交到指定路径
				button.disable();

				if (parametersAdd.form.form.isValid()) {
					var paraVo = Seam.Remoting
							.createType("com.luck.itumserv.tasklist.ParametersVo");
					Ext.apply(paraVo, parametersAdd.form.getForm().getValues());
					paraVo.setTypeid(parametersAdd.combo1.getValue());
					if (parametersAdd.combo1.getValue() == 3){
						paraVo.setStringvalue("");//文件类型，在新建的时候，没有名称，只有上传文件以后才有名称
					}
					paraVo.setInout(parametersAdd.combo2.getValue());
					paraVo.setProjectid(parametersAdd.projectid);//获取项目id
					paraVo.setTaskid(parametersAdd.taskid);
					
					callSeam("tasklist_scxzParametersService", "insertParam",
								[paraVo], parametersAdd.addreturn);
					
//					myGrid.loadvalue(dataCenterViewMain.onlinegrid.store, {
//						start : 0,
//						limit : 25
//					}, {});
				}
				button.enable();
			}
		},
		{
			text : ''+getResource('resourceParam6002')+'', // 取消
			handler : function() {
				parametersAdd.issueDialog.hide();

			}
		}]
	});
		
	return parametersAdd.form;
}

/**
 * 根据返回结果进行操作
 */
parametersAdd.addreturn = function(result){
	var sign = result;	
	if (sign=="true"){
//		Ext.MessageBox.show({
//			title: '保存成功',
//			msg: '您的信息已保存成功!',
//			buttons: Ext.MessageBox.OK,
//		    icon: Ext.MessageBox.INFO
//		});					
	}else{
		parametersAdd.form.form.reset();
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: sign,
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR 
		});
	}
	//刷新参数窗口
	scxzGrid.grid.store.load();
	
	parametersAdd.issueDialog.hide();
	
}
