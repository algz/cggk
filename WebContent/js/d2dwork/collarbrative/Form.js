var collarbForm = {

};
collarbForm.init = function() {

	dataCenterBase.combox(''+getResource('resourceParam689')+'', ''+getResource('resourceParam731')+'');
	dataCenterBase.departmentCombo.on('select', function(combo, record, index) {
		dataCenterBase.codeid = record.id;
		dataCenterBase.codename = record.text;
		dataCenterBase.userComb.clearValue();
		// dataCenterBase.manname=null;
		if (dataCenterBase.codeid != null) {
			if (dataCenterBase.codeid == -1) {
				dataCenterBase.codeid = -1;
				dataCenterBase.codename = null;
			}
			dataCenterBase.dbaseparams = {
				instcode : dataCenterBase.codeid
			};
			dataCenterBase.comboboxStore.proxy = new Ext.data.HttpProxy({
						url : "../JSON/base_user_UserSerivce.findDepartmentList?a="
								+ new Date()
								+ "&instcode="
								+ dataCenterBase.codeid
					});
			dataCenterBase.comboboxStore.load();

		}
	});
	dataCenterBase.departmentCombo.setWidth(350);
	dataCenterBase.departmentCombo.style = 'margin-bottom: 5px;';
	dataCenterBase.userComb.setWidth(350);
	dataCenterBase.userComb.allowBlank = false;
	dataCenterBase.userComb.style = 'margin-bottom: 5px;';
	collarbForm.department = dataCenterBase.departmentCombo;
	collarbForm.user = dataCenterBase.userComb;
	collarbForm.name = new Ext.form.TextField({
		fieldLabel : ''+getResource('resourceParam480')+'',
		name : 'name',
		id : 'quanjiao',
		allowBlank : false,
		disabled : false,
		labelStyle : 'padding:5px 0px 5px 0px',
		style : 'margin-bottom: 5px;',
		width : 350,
		maxLength : 20,
		maxLengthText : ''+getResource('resourceParam1000')+'',
		minLength : 1,
		minLengthText : ''+getResource('resourceParam1002')+'',
		blankText : ''+getResource('resourceParam1161')+'',
		regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d)*$/,
		regexText : ''+getResource('resourceParam679')+'',
		/**
		 * 取消全角输入时的空格bug
		 * @author wangyf
		 * 2011-04-20 17:00
		 */
		enableKeyEvents : true,
		listeners : {'blur' : function(cur, evt) {
				var curStr = cur.getValue();
				for(var i = 0; i < curStr.length; i++) {
					var str = curStr.charCodeAt(i);
					if(str == 12288) {
						if(typeof curStr[i] == 'undefined' || curStr[i] == '　') {
							curStr = curStr.replace('　', ' ');
						}
					} 
				}
				Ext.getCmp('quanjiao').setValue(curStr);
			}
		}
			// anchor : '95%'
		});

	// 新建工程可选类型combo
	collarbForm.type = new Ext.form.ComboBox({
		store : new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
								url : '../JSON/project_ProjectRemote.getTypes'
							}),
					reader : new Ext.data.JsonReader({
								totalProperty : 'totalProperty',
								root : 'root'
							}, [{
										name : 'projectcategoryid'
									}, {
										name : 'projectcategoryname'
									}])
				}),
		fieldLabel : ''+getResource('resourceParam481')+'',
		hiddenName : 'category',
		valueField : "projectcategoryid",
		displayField : "projectcategoryname",
		mode : 'remote',
		allowBlank : false,
		disabled : false,
		forceSelection : true,
		editable : false,
		triggerAction : 'all',
		emptyText : ''+getResource('resourceParam1159')+'',
		labelStyle : 'padding:5px 0px 5px 0px',
		listeners : {
			select : function(combo, record, index) {
				collarbMain.projectcategoryid = record.get('projectcategoryid');
			}
		},
		style : 'margin-bottom: 5px;',
		width : 350
	});
	// // 新建类型可选负责人下拉列表
	// collarbForm.userComb = new Ext.form.ComboBox({
	// store : comboboxStore,
	// valueField : "userid",
	// displayField : "truename",
	// mode : 'remote',
	// forceSelection : true,
	// hiddenName : 'userid',
	// editable : false,
	// triggerAction : 'all',
	// fieldLabel : '负责人',
	// name : 'userid',
	// anchor : '95%'
	// });
	// collarbForm.userComb.on('select', function(combo, record, index) {
	// // 下拉列表文本值
	// collarbForm.manname = record.get(combo.displayField);
	// });

	collarbForm.status = new Ext.form.ComboBox({
				store : new Ext.data.Store({
							proxy : new Ext.data.HttpProxy({
										// url :
										// "../JSON/aofoquery_GongyiwcComboxSvr.getTaskStatus"
										url : "../JSON/project_ProjectRemote.getStatus"
									}),
							reader : new Ext.data.JsonReader({
										totalProperty : 'totalProperty',
										root : 'root'
									}, [{
												name : 'projectstatusname'
											}, {
												name : 'projectstatusid'
											}])
						}),
				valueField : "projectstatusid",
				displayField : "projectstatusname",
				mode : 'remote',
				forceSelection : true,
				disabled : false,
				hiddenName : 'projectstatusid',
				editable : false,
				triggerAction : 'all',
				fieldLabel : ''+getResource('resourceParam739')+'',
				// anchor : '95%',
				style : 'margin-bottom: 5px;',
				width : 350,
				allowBlank : true,
				value : ''+getResource('resourceParam947')+'',// 默认设置为编制中
				disabled : true
			});

	collarbForm.start = new Ext.form.DateField({
				format : 'Y年m月d日',// 设置日期格式 月/日/年
				fieldLabel : ''+getResource('resourceParam991')+'',
				editable : false,// 设置未不可编辑
				name : 'start',
				minValue : (new Date()).format('m/d/Y'),// 设置可选择的最小日期为今天
				minText : ''+getResource('resourceParam1160')+'',
				disabledDays : [0, 6],// 去掉周六、周日
				disabledDaysText : ''+getResource('resourceParam1157')+'',
				allowBlank : false,
				disabled : false,
				labelStyle : 'padding:5px 0px 5px 0px',
				style : 'margin-bottom: 5px;',
				width : 350,
				// anchor : '95%',
				listeners : {
					change : function(field, newValue, oldValue) {
						// collarbForm.end.minValue =
						// collarbForm.start.getValue();
						var plannedStart = collarbForm.start.getValue();
						var plannedEnd = collarbForm.end.getValue();
						if (plannedStart > plannedEnd) {
							collarbForm.end.setValue('');
						}
					}
				}

			});
	collarbForm.end = new Ext.form.DateField({
		format : 'Y年m月d日',// 设置日期格式 月/日/年
		fieldLabel : ''+getResource('resourceParam1032')+'',
		editable : false,// 设置未不可编辑
		name : 'end',
		minText : ''+getResource('resourceParam1160')+'',
		disabledDays : [0, 6],// 去掉周六、周日
		disabledDaysText : ''+getResource('resourceParam1158')+'',
		allowBlank : false,
		disabled : false,
		labelStyle : 'padding:5px 0px 5px 0px',
		style : 'margin-bottom: 5px;',
		width : 350,
		validator : function() {
			var plannedStart = collarbForm.start.getValue();
			var plannedEnd = collarbForm.end.getValue();
			var date = plannedEnd - plannedStart;
			if (date > 0) {
				return true;
			}
			return false;
		}
			// anchor : '95%'
		});

	collarbForm.realstart = new Ext.form.DateField({
				format : 'Y年m月d日',// 设置日期格式 月/日/年
				fieldLabel : ''+getResource('resourceParam856')+'',
				editable : false,// 设置未不可编辑
				name : 'start',
				minValue : (new Date()).format('m/d/Y'),// 设置可选择的最小日期为今天
				minText : ''+getResource('resourceParam1160')+'',
				disabledDays : [0, 6],// 去掉周六、周日
				disabledDaysText : ''+getResource('resourceParam1157')+'',
				allowBlank : true,
				disabled : true,
				labelStyle : 'padding:5px 0px 5px 0px',
				style : 'margin-bottom: 5px;',
				// anchor : '95%',
				width : 350,
				listeners : {
					select : function(field, date) {

					}
				}
			});

	collarbForm.realend = new Ext.form.DateField({
		disabled : true,
		format : 'Y年m月d日',// 设置日期格式 月/日/年
		fieldLabel : ''+getResource('resourceParam1033')+'',
		editable : false,// 设置未不可编辑
		name : 'end',
		minText : ''+getResource('resourceParam1160')+'',
		disabledDays : [0, 6],// 去掉周六、周日
		disabledDaysText : ''+getResource('resourceParam1158')+'',
		allowBlank : true,
		disabled : true,
		width : 350,
		labelStyle : 'padding:5px 0px 5px 0px',
		style : 'margin-bottom: 5px;'
			// anchor : '95%'
		});
	collarbForm.textarea = new Ext.form.TextArea({
		fieldLabel : ''+getResource('resourceParam648')+'',
		name : 'ptextarea',
		allowBlank : true,
		labelStyle : 'padding:5px 0px 5px 0px',
		style : 'margin-bottom: 5px;',
		width : 350,
		disabled : false,
		maxLength : 500,
		maxLengthText : ''+getResource('resourceParam1156')+''
			// anchor : '95%'
		});

	collarbForm.myform = new Ext.form.FormPanel({
				standardSubmit : true,
				// hidden : true,
				// disabled : true,
				hideMode : 'visibility',
				bodyStyle : 'padding:10px 0px 10px 10px',
				buttonAlign : 'right',
				autoScroll : true,
				height : 300,
				split : true,
				border : false,
				autoWidth : true,
				// autoHeight:true,
				items : [collarbForm.name, collarbForm.type,
						dataCenterBase.departmentCombo,
						dataCenterBase.userComb, {
							xtype : 'datefield',
							fieldLabel : ''+getResource('resourceParam858')+'',
							format : 'Y年m月d日',
							name : 'createtime',
							// anchor : '95%',
							style : 'margin-bottom: 5px;',
							value : (new Date()).format('Y年m月d日'),
							width : 350,
							disabled : true
						}, collarbForm.status, collarbForm.start,
						collarbForm.end, collarbForm.realstart,
						collarbForm.realend, collarbForm.textarea

				]
			});
	return collarbForm.myform;
}
