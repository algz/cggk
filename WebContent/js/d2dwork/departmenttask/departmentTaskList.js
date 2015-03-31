var departmentTaskList={grid:null,teamTaskListpanel:null,start:null,limit:25,baseargs:null}
departmentTaskList.panel=function()
{
	departmentTaskList.grid=departmentTaskGrid.init();
	departmentTaskList.departmentTaskListpanel=new Ext.Panel({
		region:'center',
		id:'departmentTaskListpanel',
		layout:'fit',
		resizable:false,
		items:[departmentTaskList.grid]
	});
	
	departmentTaskList.baseargs = {
		role:'fuze',
		fanwei:'man'
	}
	
	myGrid.loadvalue(departmentTaskList.grid.store,{start:0,limit:25},departmentTaskList.baseargs);
	return departmentTaskList.departmentTaskListpanel;
}
