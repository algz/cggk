var ganttLoad = {
	args : {
		start : 0,
		limit : 25
	},
	baseargs : null
}
ganttLoad.init = function() {
	var today = new Date();
	today.setMonth(0);
	today.setDate(1);
	// 将部门二字改成了负责部门
	departmentUser.init('负责部门', '人员(<font color=red>*</font>)');
	// updateProjectBasic.department = departmentUser.departmentCombo;
	// updateProjectBasic.user = departmentUser.userComb;
	// departmentUser.departmentCombo.setWidth(190);
	// departmentUser.userComb.setWidth(190);
	var startdate = new Ext.form.DateField({
				fieldLabel : '开始时间',
				anchor : '97%',
				format : 'Y-m-d'
			});

	var enddate = new Ext.form.DateField({ // @chen 添加结束时间
		fieldLabel : '结束时间',
		anchor : '97%',
		format : 'Y-m-d'
	});

	ganttLoad.ganttGrid = Sch.PersonGantt.init(today);
	var b = new Ext.Panel({

				layout : 'fit',
				border : false,
				items : [ganttLoad.ganttGrid]
			});
	// departmentUser.userComb
	var a = new Ext.form.FormPanel({
		// bodyStyle : 'padding:5px 5px',
		defaults : {
			labelWidth : 60,
			labelAlign : 'left',

			allowBlank : true
		},
		id : 'queryform',
		autoScroll : true,
		items : [{
					layout : 'column',
					items : [{

								columnWidth : .45,
								layout : 'form',
								defaults : {
									anchor : '97%'

								},
								items : [departmentUser.departmentCombo,
										startdate]
							}, {

								columnWidth : .55,
								layout : 'form',
								defaults : {
									anchor : '100%'

								},
								items : [departmentUser.userComb, enddate]
							}
					/**
					 * bug编号923 wagnyf bug信息：项目统计报表中查询人员负荷，选择人员下拉列表，宽度不够时，不能翻页。
					 * 2011-05-30 12:05
					 */
					// {
					// columnWidth : .10,
					// layout : 'form',
					// defaults : {
					// anchor : '97%'
					//
					// },
					// items : [{
					// xtype : 'button',
					// text : '查询',
					// handler : function() {
					// // alert(baobiaoMain.nodeid);
					// // if (departmentUser.departmentCombo.getValue()
					// // == ''
					// // && departmentUser.userComb.getValue() == '')
					// // {
					// // Ext.example.msg('提示信息', '请选择部门！');
					// // return;
					// // }
					// var taskname = 'root';
					// var projectid = 0;
					// if (baobiaoMain.nodeid == 0) {
					//
					// } else {
					// projectid = baobiaoMain.nodeid.replace("p",
					// "");
					// }
					// var st = "";
					// if (null != startdate.getValue()
					// && "" != startdate.getValue()) {
					// st = Ext.util.Format.date(startdate
					// .getValue(), 'Y-m-d');
					// }
					//
					// var proxy = new Ext.data.HttpProxy({
					// url :
					// '../JSON/aofoquery_zongheChaxunSvr.getTaskListByUser',
					// method : 'POST'
					//										
					// });
					// ganttLoad.baseargs ={
					// nodeid : taskname,
					// chargedmanid : departmentUser.userComb.getValue(),
					// startdate : st,
					// depid:departmentUser.codeid,
					// projectid:projectid
					//                                     
					// }
					// ganttLoad.ganttGrid.getStore().proxy = proxy;
					// myGrid.loadvalue(
					// ganttLoad.ganttGrid.getStore(),
					// ganttLoad.args, ganttLoad.baseargs);
					//
					// }
					// }]
					// }
					]
				}, {
					/**
					 * bug编号923 wagnyf bug信息：项目统计报表中查询人员负荷，选择人员下拉列表，宽度不够时，不能翻页。
					 * 2011-05-30 12:05
					 */
					xtype : 'button',
					width : 100,
					style : 'float:right',
					text : '查询',
					handler : function() {
						// alert(baobiaoMain.nodeid);
						// if (departmentUser.departmentCombo.getValue()
						// == ''
						// && departmentUser.userComb.getValue() == '')
						// {
						// Ext.example.msg('提示信息', '请选择部门！');
						// return;
						// }
						var taskname = 'root';
						var projectid = 0;
						if (baobiaoMain.nodeid == 0
								&& !departmentUser.userComb.getValue()) {
							Ext.MessageBox.show({
												title : "信息提示",
												msg : "点击所有项目时，人员内容不能为空!",
												width:200,
												buttons : Ext.MessageBox.OK,
												icon : Ext.MessageBox.INFO
							});
							return;
						} else {
							projectid = baobiaoMain.nodeid.replace("p", "");
						}
						var st = "";
						if (null != startdate.getValue()
								&& "" != startdate.getValue()) {
							st = Ext.util.Format.date(startdate.getValue(),
									'Y-m-d');
						}

						var proxy = new Ext.data.HttpProxy({
							url : '../JSON/aofoquery_zongheChaxunSvr.getTaskListByUser',
							method : 'POST'

						});
						ganttLoad.baseargs = {
							nodeid : taskname,
							chargedmanid : departmentUser.userComb.getValue(),
							startdate : st,
							depid : departmentUser.codeid,
							projectid : projectid

						}
						ganttLoad.ganttGrid.getStore().proxy = proxy;
						myGrid.loadvalue(ganttLoad.ganttGrid.getStore(),
								ganttLoad.args, ganttLoad.baseargs);

					}
				}],
		border : false,
		frame : true

	});
	var main = new Ext.Panel({
				layout : 'border',
				title : '人员负荷',
				border : false,
				items : [new Ext.Panel({
									region : 'north',
									items : [a],
									layout : 'fit',
									border : false,
									height : 90
								}), new Ext.Panel({
									region : 'center',
									border : false,
									items : [b],
									layout : 'fit'
								})]
			});
	return main;
}
