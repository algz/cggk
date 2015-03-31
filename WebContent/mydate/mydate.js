Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
Ext.onReady(function() {
			Ext.QuickTips.init();
			new Ext.Viewport({
						autoScroll : true,
						layout : 'border',
						fitToFrame : true,
						items : [{
									id : 'mydate_panel',
									region : 'center',
									layout : 'card',
									// margins:'2 5 5 0',
									activeItem : 0,
									border : false,
									items : [addDateForm]

								}]
					});
		});
var theme = new Ext.form.TextField({
			id : 'theme',
			regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
			regexText : '' + getResource('resourceParam1092') + '!',
			blankText : '' + getResource('resourceParam1908') + '',
			maxLength : 100,
			style : 'margin-bottom: 5px;',
			maxLengthText : '' + getResource('resourceParam1902') + '',
			allowBlank : false,
			fieldLabel : '' + getResource('resourceParam476') + ''
		});
var place = new Ext.form.TextField({
			id : 'place',
			// allowBlank : false,
			style : 'margin-bottom: 5px;',
			regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
			regexText : '' + getResource('resourceParam1092') + '!',
			// width:200,
			blankText : '' + getResource('resourceParam1909') + '',
			maxLength : 200,
			maxLengthText : '' + getResource('resourceParam1903') + '',
			fieldLabel : '地点'
		});
var startTime1 = new Ext.form.DateField({
	// allowBlank : false,
	id : 'startTime1',
	allowBlank : false,
	style : 'margin-bottom: 5px;',
	fieldLabel : '' + getResource('resourceParam1269') + '',
	format : 'Y-m-d',
	blankText : '' + getResource('resourceParam1663') + '',
	editable : false,
	listeners : {
				'select' : function() {
					Ext.getCmp('startTime2').enable();
				}
			}
	
	});
var startTime2 = new Ext.form.TimeField({
			// allowBlank : false,
			emptyText:'请先选择开始日期',
			id : 'startTime2',
			allowBlank : false,
			style : 'margin-bottom: 5px;',
			fieldLabel : '' + getResource('resourceParam723') + '',
			blankText : '' + getResource('resourceParam459') + ''
					+ getResource('resourceParam723') + '',
			editable : false,
			format : 'G:i'

		});
var endTime1 = new Ext.form.DateField({
			// allowBlank : false,
			id : 'endTime1',
			style : 'margin-bottom: 5px;',
			fieldLabel : '' + getResource('resourceParam1270') + '',
			blankText : '' + getResource('resourceParam1906') + '',
			format : 'Y-m-d ',
			editable : false,
			//bug 828 如果不输入结束日期就不验证结束时间，如果输入结束日期必须输入结束时间 gaoyn 2011-5-25 
			listeners : {
				'select' : function() {
					Ext.getCmp('endTime2').enable();
					Ext.getCmp('endTime2').allowBlank=false;
				}
			}
		});
var endTime2 = new Ext.form.TimeField({
//			 allowBlank : false,
			id : 'endTime2',
			emptyText:'请先选择结束日期',
			style : 'margin-bottom: 5px;',
			fieldLabel : '' + getResource('resourceParam987') + ''
					+ getResource('resourceParam988') + '',
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
			fieldLabel : '内容',
			regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
			regexText : '' + getResource('resourceParam1092') + '!',

			blankText : '' + getResource('resourceParam1907') + '',
			maxLength : 500,
			maxLengthText : '' + getResource('resourceParam9795') + '',
			fontFamilies : ['宋体', '黑体', '隶书', '幼圆', 'Arial', 'Courier New',
					'Tahoma', 'Times New Roman', 'Verdana'],
			defaultFont : '宋体',
			height:350 //内容文本框太小,故添加高度
		});

var addDateForm = new Ext.form.FormPanel({
	id : 'addDateForm',
	style : 'margin-bottom: 5px;',
	bodyStyle : 'padding:10px 0px 10px 10px',
	// split : true,
	autoScroll : true,
	defaults : {
		anchor : '96%',
		// allowBlank : false,
//		msgTarget : 'qtip'
		/**
		 * bug编号516 wangyf
		 * bug信息：在我的工作日历界面添加待办事项后如果主题或地点输入到字符上限后界面出现错误
		 * 2011-06-08 11：03
		 */
		msgTarget : 'under'

	},
	/**
	 * gaoyn 2011-5-18 15:20
	 * bug:647 修改页面
	 * 时间改成column布局
	 * @type  
	 */
	
	items : [theme, place,{
						border : false,
						layout : 'column',
						defaults : {
						msgTarget : 'under'
						},
						items : [{
									columnWidth : .5,
									layout : 'form',
									defaults : {
											anchor : '98%'
											
										},
									border : false,
									items : [startTime1]
								}, {
									columnWidth : .5,
									layout : 'form',
									defaults : {
											anchor : '100%'
											
										},
									border : false,
									items : [startTime2]
								}
								
								]
					},{
						border : false,
						layout : 'column',
						items : [
								{
									columnWidth : .5,
									layout : 'form',
									border : false,
									defaults : {
											anchor : '98%'
										},
									items : [endTime1]
								}, {
									columnWidth : .5,
									layout : 'form',
									border : false,
									defaults : {
											anchor : '100%'
										},
									items : [endTime2]
								}
								
								]
					},
					
					 workItem], 
	buttons : [{
				text : '保存',
				handler : addDateSubmit
			}, {
				text : '' + getResource('resourceParam606') + '',
				handler : function() {
					Ext.getCmp('endTime2').disable();
					addDateForm.form.reset();
				}
			}]

});
function addDateSubmit() {
	var today = new Date();
	var st1 = Ext.getCmp("startTime1").getValue().toString().replace("-", "/");
	var st2 = Ext.getCmp("startTime2").getValue().toString().replace(":", "");
	if (Ext.getCmp("endTime1").getValue() != '') {
		var et1 = Ext.getCmp("endTime1").getValue().toString()
				.replace("-", "/");
	}
	if (Ext.getCmp("endTime2").getValue() != '') {
		var et2 = Ext.getCmp("endTime2").getValue().toString().replace(":", "");
	}
	var getTimeMill;
	if (st2.length == 3) {
		getTimeMill = st2.substring(0, 1) * 3600 * 1000 + st2.substring(1, 3)
				* 60 * 1000;
	} else {
		getTimeMill = st2.substring(0, 2) * 3600 * 1000 + st2.substring(2, 4)
				* 60 * 1000;
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
								title : '' + getResource('resourceParam596')
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

	if (!addDateForm.getForm().isValid()) {
		return;
	}

	if (Date.parse(st1) < Date.parse(new Date().format('Y/m/d'))) {

		//bug gaoyn 845 添加待办事项时如果开始日期早于当前日期则系统弹出的提示信息应该放置1行显示

		Ext.Msg.show({
		   title:'' + getResource('resourceParam575') + '',
		   msg: "开始日期早于当前日期，是否保存？",
		   buttons: Ext.Msg.YESNO,
		   fn: function(btn) {
			if (btn == 'yes') {
				var sc = Seam.Remoting.createType("com.luck.itumserv.mydate.vo.ScheduleVO");
				Ext.apply(sc, addDateForm.getForm().getValues());
				Seam.Component.getInstance("mydate_MyDateRemote").addDate(sc, addDateCallBack);
			}
		   },
		   icon: Ext.MessageBox.QUESTION,
		   animEl: 'elId',
		   width :300
		});

		
		
		
		
	} else if(Date.parse(st1) == Date.parse(new Date().format('Y/m/d'))) {
		var todayMill = today.getHours() * 3600 * 1000 + today.getMinutes() * 60 * 1000 + today.getSeconds() * 1000;
		if (getTimeMill < todayMill) {
			//bug gaoyn 845 添加待办事项时如果开始日期早于当前日期则系统弹出的提示信息应该放置1行显示
			Ext.Msg.show({
		   title:'' + getResource('resourceParam575') + '', //gaoyn bug 1038 2011-6-8 10:24 添加待办事项，如果开始时间早于当前时间，系统提示开始日期早于当前日期，

		   msg: "开始时间早于当前时间，是否保存？",
		   buttons: Ext.Msg.YESNO,
		   fn: function(btn) {
			if (btn == 'yes') {
				var sc = Seam.Remoting.createType("com.luck.itumserv.mydate.vo.ScheduleVO");
					Ext.apply(sc, addDateForm.getForm().getValues());
					Seam.Component.getInstance("mydate_MyDateRemote").addDate(sc, addDateCallBack);
			}
		   },
		   animEl: 'elId',
		   width :300
		});
			
		} else {
	     	var sc = Seam.Remoting.createType("com.luck.itumserv.mydate.vo.ScheduleVO");
			Ext.apply(sc, addDateForm.getForm().getValues());
			Seam.Component.getInstance("mydate_MyDateRemote").addDate(sc, addDateCallBack);
		}
	} else {
     	var sc = Seam.Remoting.createType("com.luck.itumserv.mydate.vo.ScheduleVO");
		Ext.apply(sc, addDateForm.getForm().getValues());
		Seam.Component.getInstance("mydate_MyDateRemote").addDate(sc, addDateCallBack);
	}
}
addDateCallBack = function(result) {

	if (result == "true") {
		Ext.MessageBox.show({

					title : '' + getResource('resourceParam596') + '',

					msg : '    ' + getResource('resourceParam623') + '!   ',

					buttons : Ext.MessageBox.OK
				});
		addDateForm.form.reset();
		workcal("");
	}
	if (result == "false") {
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam594') + '',
					msg : '' + getResource('resourceParam1905') + '',
					buttons : Ext.MessageBox.OK
				});
		addDateForm.form.reset();
	}
}
