var personLoad = {
	args : {
		start : 0,
		limit : 25
	},
	baseargs : null

}
personLoad.init = function(projectId, userid) {
	var today = new Date();
	today.setMonth(0);
	today.setDate(1);
	var proxy = new Ext.data.HttpProxy({
		url : '../JSON/aofoquery_zongheChaxunSvr.getTaskListByUser?nodeid='
				+ 'root' + "&chargedmanid=" + userid + "&projectid="
				+ projectId
			// url:'tasks.json'
		});

	personLoad.ganttGrid = AppLoad.init(today);
	personLoad.ganttGrid.getStore().proxy = proxy;
	// myGrid.loadvalue = function(ds, args, baseargs) { // 带参数的数据加载
	// // ds.baseParams = baseargs; // 分页时也能保持的参数
	// ds.on('beforeload', function(ds, options) {
	// Ext.apply(options.params, baseargs);
	// ds.baseParams = options.params;
	// });
	// ds.load({
	// params : args
	// }); // 首次加载有效的参数，点分页时参数被覆盖
	// };
	personLoad.ganttGrid.getStore().on('beforeload', function(ds, options) {
				Ext.apply(options.params, personLoad.baseargs);
				personLoad.ganttGrid.getStore().baseParams = options.params;
			});
	personLoad.ganttGrid.getStore().load({
		params : personLoad.args,
		callback : function(r, options, success) {
			personLoad.ganttGrid.setView(AppLoad.startDate,
					personLoad.ganttGrid.getEnd());

		}
	}); // 首次加载有效的参数，点分页时参数被覆盖
	var win = new Ext.Window({
		title : '个人负荷',
		width : 700,
		height : 300,
		modal : true,
		layout : 'fit',

		autoScroll : true,
		items : [personLoad.ganttGrid]
	});
	win.show();

}