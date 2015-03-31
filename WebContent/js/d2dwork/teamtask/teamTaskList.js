var teamTaskList={grid:null,teamTaskListpanel:null,start:null,limit:25,baseargs:null}
teamTaskList.panel=function()
{
	teamTaskList.grid=teamTaskGrid.init();
	teamTaskList.teamTaskListpanel=new Ext.Panel({
		region:'center',
		id:'teamTaskListpanel',
		layout:'fit',
		resizable:false,
		items:[teamTaskList.grid]
	});
	
	teamTaskList.baseargs = {
		role:'fuze',
		fanwei:'man'
	}
	
	myGrid.loadvalue(teamTaskList.grid.store,{start:0,limit:25},teamTaskList.baseargs);
	return teamTaskList.teamTaskListpanel;
}
