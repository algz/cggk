function updateDate(dateid) {
	Ext.QuickTips.init();
	Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
	var workItemId = new Ext.form.TextField({
				id : 'workItemId',
				readOnly : true,
				inputType : 'hidden'
			});
	var theme = new Ext.form.TextField({
				id : 'theme',
				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
				regexText : '' + getResource('resourceParam1092') + '!',
				// width:200,
				blankText : '' + getResource('resourceParam1908') + '',
				style : 'margin-bottom: 5px;',
				maxLength : 100,
				maxLengthText : '' + getResource('resourceParam1902') + '',
				allowBlank : false,
				fieldLabel : '' + getResource('resourceParam476') + ''
			});
	var place = new Ext.form.TextField({
				id : 'place',
				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
				regexText : '' + getResource('resourceParam1092') + '!',
				// width:200,
				style : 'margin-bottom: 5px;',
				blankText : '' + getResource('resourceParam1909') + '',
				maxLength : 200,
				maxLengthText : '' + getResource('resourceParam1903') + '',
				// allowBlank : false,
				fieldLabel : '地点'
			});
	var startTime1 = new Ext.form.DateField({
		 allowBlank : false,
		id : 'startTime1',
		fieldLabel : '' + getResource('resourceParam1269') + '',
		style : 'margin-bottom: 5px;',
		blankText : '' + getResource('resourceParam1663') + '',
		format : 'Y-m-d',
		editable : false,
		listeners : {
				'select' : function() {
					Ext.getCmp('startTime2').enable();
				}
			}
		});
	var startTime2 = new Ext.form.TimeField({
				 allowBlank : false,
				 emptyText:'请先选择开始日期',
				id : 'startTime2',
				fieldLabel : '' + getResource('resourceParam723') + '',
				style : 'margin-bottom: 5px;',
				blankText : '' + getResource('resourceParam459') + ''
						+ getResource('resourceParam723') + '',
				editable : false,
				format : 'G:i'

			});
	var endTime1 = new Ext.form.DateField({
				id : 'endTime1',
				style : 'margin-bottom: 5px;',
				fieldLabel : '' + getResource('resourceParam1270') + '',
				blankText : '' + getResource('resourceParam1906') + '',
				format : 'Y-m-d ',
				editable : false,
				listeners : {
					'select' : function() {
						if (Ext.getCmp('endTime2').getValue != '') {
							Ext.getCmp('endTime2').enable();
						}
					}
				}
			});
	var endTime2 = new Ext.form.TimeField({
				id : 'endTime2',
				emptyText:'请先选择结束日期',
				fieldLabel : '' + getResource('resourceParam987') + ''
						+ getResource('resourceParam988') + '',
				style : 'margin-bottom: 5px;',
				allowBlank : false,
				blankText : '' + getResource('resourceParam459') + ''
						+ getResource('resourceParam987') + ''
						+ getResource('resourceParam988') + '',
				editable : false,
				format : 'G:i'

			});
	Ext.getCmp('endTime2').disable();
	Ext.getCmp('startTime2').disable();
	var workItem = new Ext.form.TextArea({
				id : 'workItem',
				style : 'margin-bottom: 5px;',
				height:300,
				fieldLabel : '内容',
				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
				regexText : '' + getResource('resourceParam1092') + '!',

				blankText : '' + getResource('resourceParam1907') + '',
				maxLength : 500,
				maxLengthText : '' + getResource('resourceParam9795') + '',
				fontFamilies : ['宋体', '黑体', '隶书', '幼圆', 'Arial', 'Courier New',
						'Tahoma', 'Times New Roman', 'Verdana'],
				defaultFont : '宋体'
			});

	var updateDateForm = new Ext.form.FormPanel({
				id : 'updateDateForm',
				width : 560,
				height : 380,
				labelWidth : 60,
				autoScroll : true,

				plain : false,
				bodyStyle : 'padding:10px 12px 10px 10px ',
				frame : false,
				defaults : {
					anchor : '95%',
					// allowBlank : false,
					msgTarget : 'under'
				},
				/**
				 * bug 646
				 * gaoyn 2011-5-18 15:41
				 * 实现column布局
				 * @type 
				 */
				items : [theme, place, {
						border : false,
						layout : 'column',
						defaults : {
						msgTarget : 'under'
						},
						items : [{
									columnWidth : .5,
									layout : 'form',
									defaults : {
											anchor : '98%',
											msgTarget : 'under'
										},
									border : false,
									items : [startTime1]
								}, {
									columnWidth : .5,
									layout : 'form',
									defaults : {
											anchor : '100%',
											msgTarget : 'under'
										},
									border : false,
									items : [startTime2]
								}
								
								]
					
				
				},{
									
						border : false,
						layout : 'column',
						defaults : {
						msgTarget : 'under'
						},
						items : [{
									columnWidth : .5,
									layout : 'form',
									defaults : {
											anchor : '98%',
											msgTarget : 'under'
										},
									border : false,
									items : [endTime1]
								}, {
									columnWidth : .5,
									layout : 'form',
									defaults : {
											anchor : '100%',
											msgTarget : 'under'
										},
									border : false,
									items : [endTime2]
								}
								
								]
					
				
				}, workItem,workItemId],
				buttons : [{
							text : '保存',
							handler : updateDateSubmit
						}, {
							text : '删除',
							handler : delDateSubmit
						}, {
							text : '' + getResource('resourceParam606') + '',
							handler : function() {
								var id = workItemId.getValue();
								Ext.getCmp('endTime2').disable();
								updateDateForm.form.reset();
								workItemId.setValue(id);
							}
						}]

			});
	updateDateForm.getForm().load({
		url : '../JSON/mydate_MyDateRemote.getDateInfoById?workItemId='
				+ dateid,
		method : 'GET',
		success : function(form, action) {
			if(form.getValues().endTime1!='')
			{
				Ext.getCmp('endTime2').enable();
			}
		}
	});
	var updateWin = new Ext.Window({
				title : '' + getResource('resourceParam1392') + '',
				width : 580,
				height : 380,
				layout : 'fit',
				plain : false,
				// closeAction : 'hide',
				modal : true,
				items : [updateDateForm]
			});
	updateWin.show();
	function updateDateSubmit() {
		var today = new Date();
//		today = today.toString().replace("-", "/");
		var st1 = Ext.getCmp("startTime1").getValue().toString().replace("-",
				"/");
		var st2 = Ext.getCmp("startTime2").getValue().toString().replace(":",
				"");
		if (Ext.getCmp("endTime1").getValue() != '') {
			var et1 = Ext.getCmp("endTime1").getValue().toString().replace("-",
					"/");
		}
		if (Ext.getCmp("endTime2").getValue() != '') {
			var et2 = Ext.getCmp("endTime2").getValue().toString().replace(":",
					"");
		}
		var getTimeMill;
		if (st2.length == 3) {
			getTimeMill = st2.substring(0, 1) * 3600 * 1000
					+ st2.substring(1, 3) * 60 * 1000;
		} else {
			getTimeMill == st2.substring(0, 2) * 3600 * 1000
					+ st2.substring(2, 4) * 60 * 1000;
		}

		if (typeof(et1) != "undefined") {
			if (Date.parse(st1) > Date.parse(et1)) {
				Ext.MessageBox.show({
							title : '' + getResource('resourceParam596') + '',
							msg : '' + getResource('resourceParam1904') + '!',
							buttons : Ext.MessageBox.OK
						});
				return;
			} else if (Date.parse(st1) == Date.parse(et1)) {
				if (typeof(et2) != "undefined") {
					if (st2 >= et2) {
						Ext.MessageBox.show({
									title : ''
											+ getResource('resourceParam596')
											+ '',
									msg : '' + getResource('resourceParam1900')
											+ '!',
									buttons : Ext.MessageBox.OK
								});
						return;
					}
				}
			}
		}
//		var temp = Ext.getCmp("workItem").getValue();
//		if (null == temp || "" == temp || temp.length == 0) {
//			Ext.MessageBox.show({
//						title : '' + getResource('resourceParam596') + '',
//						msg : '' + getResource('resourceParam1918') + '',
//						buttons : Ext.MessageBox.OK
//					});
//			return;
//		}
//		var workItemLength = 0;
//		for (i = 0; i < temp.length; i++) {
//			if (temp.charCodeAt(i) >= 0 && temp.charCodeAt(i) <= 128) {
//				workItemLength += 1;
//			} else {
//				workItemLength += 2;
//			}
//		}
//		
//		if (workItemLength > 1000) {
//			Ext.MessageBox.show({
//						title : '' + getResource('resourceParam596') + '',
//						msg : '' + getResource('resourceParam1901') + '',
//						buttons : Ext.MessageBox.OK
//					});
//			return;
//		}

		
		if (!updateDateForm.getForm().isValid()) {
			return;
		}
	if (Date.parse(st1) < Date.parse(new Date().format('Y/m/d'))) {
//		Ext.Msg.confirm('' + getResource('resourceParam575') + '', "开始日期早于当前日期，是否继续保存？", function(btn) {
//			if (btn == 'yes') {
//				var sc = Seam.Remoting
//							.createType("com.luck.itumserv.mydate.vo.ScheduleVO");
//					Ext.apply(sc, updateDateForm.getForm().getValues());
//					Seam.Component.getInstance("mydate_MyDateRemote")
//							.updateDate(sc, updateDateCallBack);
//			}
//		});

			//bug gaoyn 845 添加待办事项时如果开始日期早于当前日期则系统弹出的提示信息应该放置1行显示

				Ext.Msg.show({
		   title:'' + getResource('resourceParam575') + '',
		   msg: "开始日期早于当前日期，是否保存？",
		   buttons: Ext.Msg.YESNO,
		   fn: function(btn) {
			if (btn == 'yes') {
				var sc = Seam.Remoting.createType("com.luck.itumserv.mydate.vo.ScheduleVO");
						var sc = Seam.Remoting
							.createType("com.luck.itumserv.mydate.vo.ScheduleVO");
					Ext.apply(sc, updateDateForm.getForm().getValues());
					sc.startTime2 = Ext.getCmp('startTime2').getValue();
					sc.endTime2 = Ext.getCmp('endTime2').getValue();
					Seam.Component.getInstance("mydate_MyDateRemote")
							.updateDate(sc, updateDateCallBack);
			
			
			}
		   },
		   animEl: 'elId',
		   width :300
		});



	} else if(Date.parse(st1) == Date.parse(new Date().format('Y/m/d'))) {
		var todayMill = today.getHours() * 3600 * 1000 + today.getMinutes() * 60 * 1000 + today.getSeconds() * 1000;
		if (getTimeMill < todayMill) {
               //bug gaoyn 845 添加待办事项时如果开始日期早于当前日期则系统弹出的提示信息应该放置1行显示
			
				Ext.Msg.show({
		   title:'' + getResource('resourceParam575') + '',
		   //gaoyn bug 1038 2011-6-8 10:24 添加待办事项，如果开始时间早于当前时间，系统提示开始日期早于当前日期，
		   msg: "开始时间早于当前时间，是否保存？", 
		   buttons: Ext.Msg.YESNO,
		   fn: function(btn) {
			if (btn == 'yes') {
				var sc = Seam.Remoting
								.createType("com.luck.itumserv.mydate.vo.ScheduleVO");
						var vals = updateDateForm.getForm().getValues();
						Ext.apply(sc, updateDateForm.getForm()
										.getValues());
						sc.startTime2 = Ext.getCmp('startTime2').getValue();
						sc.endTime2 = Ext.getCmp('endTime2').getValue();
						Seam.Component
								.getInstance("mydate_MyDateRemote")
								.updateDate(sc, updateDateCallBack);
			
			
			
			
			}
		   },
		   animEl: 'elId',
		   width :300
		});


		} 
		
		else {
	     		var sc = Seam.Remoting
						.createType("com.luck.itumserv.mydate.vo.ScheduleVO");
				Ext.apply(sc, updateDateForm.getForm().getValues());
				sc.startTime2 = Ext.getCmp('startTime2').getValue();
				sc.endTime2 = Ext.getCmp('endTime2').getValue();
				Seam.Component.getInstance("mydate_MyDateRemote").updateDate(
						sc, updateDateCallBack);
		}
	} else {
     			var sc = Seam.Remoting
					.createType("com.luck.itumserv.mydate.vo.ScheduleVO");
			Ext.apply(sc, updateDateForm.getForm().getValues());
			sc.startTime2 = Ext.getCmp('startTime2').getValue();
			sc.endTime2 = Ext.getCmp('endTime2').getValue();
			Seam.Component.getInstance("mydate_MyDateRemote").updateDate(sc,
					updateDateCallBack);
	}
	}
	// workItemId
	function delDateSubmit() {

		Ext.Msg.confirm('' + getResource('resourceParam1724') + '', ""
						+ getResource('resourceParam636') + "", function(btn) {
					if (btn == 'yes') {
						var sc = Seam.Remoting
								.createType("com.luck.itumserv.mydate.Schedule");
						Ext.apply(sc, updateDateForm.getForm().getValues());
						Seam.Component.getInstance("mydate_MyDateRemote")
								.delDate(sc, updateDateCallBack);
					}
				});

	}
	updateDateCallBack = function(result) {
		if (result == "true") {

			parent.reloadCal();

		}
		if (result == "false") {
			Ext.MessageBox.show({
						title : '' + getResource('resourceParam596') + '',
						msg : '' + getResource('resourceParam1559') + '',
						buttons : Ext.MessageBox.OK

					});
		}
	}
}
