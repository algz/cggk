Ext.ns("Sch")
Sch.ganttQuantityMain = {
    todays : new Date(),
    ganttGrid : null,
    init : function() {
        var today = this.todays;
        today.setMonth(0);
        today.setDate(1);
        this.ganttGrid = Sch.QuantityGanttApp.init(today);
        var b = new Ext.Panel({   
                    id : 'ganttQuantityMainid',
                    height : 800,
                    title : "完成量",
                    layout : 'fit',
                    items : [this.ganttGrid] });
        return b;
    },

    getDay : function(taskname) {
        
        this.taskname = taskname;
        var s = Seam.Component.getInstance("aofoquery_zongheChaxunSvr")
                .getStartDate(taskname, function(reslut) {
                    var today = Date.parseDate(reslut, "Y-m-d");
                    if (today != null && today != undefined) {
                           this.todays = today;
                        Sch.ganttQuantityMain.ganttGrid.setView(today,
                                today.add(Date.MONTH, 12), 'monthAndQuarters');
                        return today;
                    }
                });
  
    },

    getDayreslut : function(reslut) {
        var today = Date.parseDate(reslut, "Y-m-d");
        this.todays = today;
        if (today != null && today != undefined) {
            return today;
        } else {
            return Date.parseDate(new Date(), "Y-m-d");
        }
    },

    addGantLines : function(formid, toid, type) {
        var app = Seam.Remoting
                .createType("com.sysware.p2m.ganttRelation.GanttRelationVo");
        app.setType(type);
        app.setOriginalTaskId(formid);
        app.setDestinationTaskId(toid);
        Seam.Component.getInstance("ganttRelation_GanttRelationRemote")
                .addGantLines(app);
    },
    deleteGantLines : function(formid, toid) {
        var app = Seam.Remoting
                .createType("com.sysware.p2m.ganttRelation.GanttRelationVo");
        app.setOriginalTaskId(formid);
        app.setDestinationTaskId(toid);
        Seam.Component.getInstance("ganttRelation_GanttRelationRemote")
                .deleteGantLines(app);
    },
    updateTaskTimes : function(taskid, starttime, endtime) {
        var app = Seam.Remoting.createType("com.sysware.p2m.task.TaskVo");
        app.setTaskId(taskid);
        app.setStart(starttime.dateFormat('Y-m-d'));
        app.setEnd(endtime.dateFormat('Y-m-d'));
        Seam.Component.getInstance("task_TaskRemote").updateTaskTimes(app);
    }
}

