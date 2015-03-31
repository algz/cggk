var mytasklist = {
	grid : null,
	mytasklistpanel : null,
	start : null,
	limit : 25,
	baseargs : null
}
mytasklist.panel = function() {
	mytasklist.grid = mytaskGrid.init();
	mytasklist.mytasklistpanel = new Ext.Panel({
		region : 'center',
		id : 'mytasklistpanel',
		layout : 'fit',
		resizable : false,
		items : [mytasklist.grid]
	});

	mytasklist.baseargsfz = {
		role : 'fuze',
		fanwei : 'man',
		taskstatusstr : mytaskMain.ztai,
		taskcategorystr : '',
		projects : '',
		plannedstartstr : null,
		plannedendstr : null,
		taskstatusstr :"2,3,4,",
		taskname : null
	};
	myGrid.loadvalue(mytasklist.grid.store, mytaskMain.args, mytasklist.baseargsfz);
//	var record = window.parent.getMenu.title_record;
//	if (record != null && record != undefined) {
//		var as=new Array();
//		var taskid = record.data.taskid;
//		var n = 0;
//  
//		mytasklist.grid.store.each(function(re) {
//			alert("dddd");
//			if (re.get('taskid') == taskid) {
//				alert("dddd");
//				n = 1;
//				alert("dddd");
// 				mytasklist.grid.store.on("load",function(){
//					as[0]=re;
//					alert("dddd");
//					myGrid.rows = as;
//					alert("dddd");
//				});
//			}
//		});
//		if (n == 0) {
//			mytasklist.grid.store.add(record);
//			mytasklist.grid.store.on("load",function(){
//				as[0]=record;
//				myGrid.rows = as;
//			});
//		}
//	}

	return mytasklist.mytasklistpanel;
}
