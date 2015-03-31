/**
 * hegs 使用方法： 只需引用historyMessage文件夹下的文件和approveFlowSteps.js即可 调用代码示例如下：
 * mytaskdetails.historyPanel = historyMessage.init();
 * mytaskdetails.approvalHistoryPanel = new Ext.Panel({ id :
 * 'approvalHistoryPanel', height : 800, title : '' +
 * getResource('resourceParam1448') + '', layout : 'fit',
 * items:[mytaskdetails.historyPanel], listeners : { activate : function() {
 * historyMessage.refresh(mytaskMain.taskid); } } });
 * 即新建一个Panel，调用historyMessage.init()方法得到历史记录面板，并加入到Panel中， 当用户点击Panel面板时触发
 * listeners监听的 activate事件,并调用historyMessage.refresh方法加载数据
 * historyMessage.refresh方法需要传参，即需要查询的任务ID
 */
var historyMessage = {
	dataid : null,
	dataType:null,
	args : {
		start : 0,
		limit : 10
	}
};

historyMessage.refresh = function(objectId,objectType) {
	historyMessage.dataid = objectId;
	historyMessage.dataType=objectType;
	approveFlowSteps.grid.getStore().load({
				params : {
					objectType:historyMessage.dataType,
					objectID : historyMessage.dataid,
					approvalType : "StepByStep"
				}
			});
	historyMessage.comboHistoryType.setValue(''
			+ getResource('resourceParam1153') + '');
	historyMessage.approvalHistoryPanel.getLayout().setActiveItem(0);
	historyMessage.approvalHistoryPanel.doLayout();
};

historyMessage.init = function() {
	// 下拉列表原始数据
	var data = [[1, '' + getResource('resourceParam1153') + ''],
			[2, '' + getResource('resourceParam7079') + ''],
			[3, '' +getResource('resourceParam9172')+ getResource('resourceParam7080') + ''],
			[4, '' + getResource('resourceParam7081') + '']
			 /*
			  * by suny 2011-5-13
			  * bug 605 屏蔽进度记录
			  * 成飞的具体实现
			  */
//			 ,
//			[5, '' + getResource('resourceParam9137') + '']
			 ];

	var historyTypeStore = new Ext.data.SimpleStore({
				fields : ['value', 'text'],
				data : data
			});

	historyMessage.comboHistoryType = new Ext.form.ComboBox({
				store : historyTypeStore,
				// emptyText:'审批记录',
				mode : 'local',
				triggerAction : 'all',
				valueField : 'value',
				displayField : 'text',
				value : '' + getResource('resourceParam1153') + ''
			});

	var tb = new Ext.Toolbar();
	tb.add('' + getResource('resourceParam7078')
			+ getResource('resourceParam481') + ':');
	tb.add(historyMessage.comboHistoryType);

	// 审批历史面板
	var approvalP = approvalPanel.init();
	historyMessage.panel1 = new Ext.Panel({
				id : 'approvalPanel',
				height : 800,
				layout : 'fit',
				items : [approvalP]
			});

	// 委派历史记录
	var accreditP = accreditPanel.init();
	historyMessage.panel2 = new Ext.Panel({
				id : 'accreditPanel',
				height : 800,
				layout : 'fit',
				items : [accreditP],
				bbar : new Ext.PagingToolbar({
							pageSize : 10,
							store : accreditPanel.panel.getStore(),
							displayInfo : true,
							displayMsg : '' + getResource('resourceParam7074')
									+ '',
							emptyMsg : "" + getResource('resourceParam7075')
									+ ""
						})
			});

	// 调整记录面板
	var adjustP = adjustPanel.init();
	historyMessage.panel3 = new Ext.Panel({
				id : 'adjustPanel',
				height : 800,
				layout : 'fit',
				items : [adjustP],
				bbar : new Ext.PagingToolbar({
							pageSize : 10,
							store : adjustPanel.panel.getStore(),
							displayInfo : true,
							displayMsg : '' + getResource('resourceParam7074')
									+ '',
							emptyMsg : "" + getResource('resourceParam7075')
									+ ""
						})
			});

	// 反馈记录面板
	var feedbackP = feedbackPanel.init();
	historyMessage.panel4 = new Ext.Panel({
				id : 'feedbackPanel',
				height : 800,
				layout : 'fit',
				items : [feedbackP],
				bbar : new Ext.PagingToolbar({
							pageSize : 10,
							store : feedbackPanel.panel.getStore(),
							displayInfo : true,
							displayMsg : '' + getResource('resourceParam7074')
									+ '',
							emptyMsg : "" + getResource('resourceParam7075')
									+ ""
						})
			});

	// 进度反馈面板
	var scheduleP = schedulePanel.init();
	historyMessage.panel5 = new Ext.Panel({
				id : 'schedulePanel',
				height : 800,
				layout : 'fit',
				items : [scheduleP]
			});

	// 当历史记录类型的下拉列表值改变时触发的方法
	historyMessage.comboHistoryType.on('select',
			function(combo, record, index) {
				switch (record.get('value')) {
					case 1 :
						approveFlowSteps.grid.getStore().load({
									params : {
										objectType:historyMessage.dataType,
										objectID : historyMessage.dataid,
										approvalType : "StepByStep"
									}
								});
						historyMessage.approvalHistoryPanel.getLayout()
								.setActiveItem(0);
						historyMessage.approvalHistoryPanel.doLayout();
						break;
					case 2 :
						accreditPanel.panel.getStore().on('beforeload',
								function(store, options) {
									Ext.apply(options.params, {
												taskid : historyMessage.dataid
											});
								});
						accreditPanel.panel.getStore().load({
									params : historyMessage.args
								});
						historyMessage.approvalHistoryPanel.getLayout()
								.setActiveItem(1);
						historyMessage.approvalHistoryPanel.doLayout();
						break;
					case 3 :
						adjustPanel.panel.getStore().on('beforeload',
								function(store, options) {
									Ext.apply(options.params, {
												taskid : historyMessage.dataid,
												sign : 4
											});
								});
						adjustPanel.panel.getStore().load({
									params : historyMessage.args
								});
						historyMessage.approvalHistoryPanel.getLayout()
								.setActiveItem(2);
						historyMessage.approvalHistoryPanel.doLayout();
						break;
					case 4 :
						feedbackPanel.panel.getStore().on('beforeload',
								function(store, options) {
									Ext.apply(options.params, {
												taskid : historyMessage.dataid,
												sign : 2
											});
								});
						feedbackPanel.panel.getStore().load({
									params : historyMessage.args
								});
						historyMessage.approvalHistoryPanel.getLayout()
								.setActiveItem(3);
						historyMessage.approvalHistoryPanel.doLayout();
						break;
					case 5 :
						schedulePanel.panel.getStore().load({
									params : {
										col11 : historyMessage.dataid
									}
								});
						historyMessage.approvalHistoryPanel.getLayout()
								.setActiveItem(4);
						historyMessage.approvalHistoryPanel.doLayout();
						break;
				}
		})
	// 历史记录面板,包括审批历史记录、委派历史记录、调整历史记录、反馈历史记录,进度反馈记录
	historyMessage.approvalHistoryPanel = new Ext.Panel({
				id : 'approvalHistoryPanel',
				height : 800,
				tbar : tb,
				/*
				 * by suny 2011-05-24
				 * 在需要设置title的地方，
				 * 请setTitle();
				 */
//				title : '' + getResource('resourceParam576')
//						+ getResource('resourceParam7078') + '',
				layout : 'card',
				items : [historyMessage.panel1, historyMessage.panel2,
						historyMessage.panel3, historyMessage.panel4,
						historyMessage.panel5]
			});

	return historyMessage.approvalHistoryPanel;
}
