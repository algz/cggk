var SampleGrid = {};

SampleGrid.getgrid = function(){
	//var strurl = '../JSON/tasklist_taskService.getRenwukbnPageList';
	var strurl = '../JSON/mytask_MyTaskRemote.getTaskArea';
  	var proxy = new Ext.data.HttpProxy({
            url: strurl
        });
  	var reader = new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalProperty',
            id: 'taskid'
        }, [
            'taskid','taskname','plannedstartstr','plannedendstr','taskstatusname','projectid',
            'taskstatusid','taskcategoryid','chargedmanid','issuedmanid','chargeddepid','isApproval',
            'taskdesignate','issuedmanname','instname','templatetype'
            
        ]);
  	var ascid = 'taskid';
  	var ascstr = 'asc';
  	var ds = new data.Store(proxy,reader,ascid,ascstr);

  	var sm = new Ext.grid.RowSelectionModel({singleSelect:true});
    var cm =  new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [
	        {id:'taskid',header: ""+getResource('resourceParam740')+"", width: .25, dataIndex: 'taskname',
	        renderer : function(value, cellmeta, record, rowIndex,
	                                columnIndex, store){
	                                var str = record.data.taskname;
	                                var taskid = record.data.taskid;
	                                var projectid = record.data.projectid;
	                                return "<a style='text-decoration:underline' href='#' tag='"
	                                        + projectid
	                                        + "' onclick='indexpanel.taskDetaile(&quot;"
	                                        + str
	                                        + "&quot;,"
	                                        + taskid
	                                        + ","
	                                        + projectid
	                                        + ");'><span style='color:blue'>" 
	                                        + str
	                                        +"</span> </a>";
	                                }},
	        {header: ""+getResource('resourceParam739')+"", width: .25, dataIndex: 'taskstatusname'},
	        {header: ""+getResource('resourceParam737')+"", width: .25, dataIndex: 'plannedendstr'},
	        {header: ""+getResource('resourceParam738')+"", width: .25, dataIndex: 'plannedstartstr'}
    	]
    });
 
	cm.defaultSortable = true;
  	var grid = myGrid.gridPageSize(ds, cm, null,sm,null,10);
  	grid.height=255;
  	grid.width="100%";
	return grid;
}
