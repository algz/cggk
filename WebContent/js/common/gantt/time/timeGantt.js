Ext.ns('Sch.TimeGantt');

Sch.TimeGantt.init = function(today) {
    Ext.QuickTips.init();
    
    Ext.override(Sch.ViewBehaviour.MonthView, {
        timeResolution : 720
    });
    
    Ext.override(Sch.ViewBehaviour.WeekView, {
        timeResolution : 720
    });
    
    return Sch.TimeGantt.Gantt.init(today);
}

Sch.TimeGantt.Gantt = {
    
    init : function(serverCfg) {        
        this.gantt = this.createGantt(serverCfg);
        this.initEvents();
        return this.gantt;
    },
    
    initEvents : function() {
        var g = this.gantt;
        g.on({
            'beforeedit': this.beforeEdit, 
            'afteredit': this.afterEdit, 
            'timeheaderdblclick' : this.onTimeHeaderDoubleClick,
            scope : this
        });
    },
    
    onTimeHeaderDoubleClick : function(g, start, end, e) {
        var columnType = 'monthAndQuarters';
        
        if (start.getYear() === end.getYear() && (end.getMonth() - start.getMonth() === 1))
        {
            // Only showing one month, show day numbers
            columnType = 'monthAndQuarters';
        }
        g.setView(start, end, columnType, Sch.ViewBehaviour.MonthView);
    },
    
    beforeEdit : function(o) {
        // Set the duration field to help the editor get the value
        o.cancel = (o.field === 'Duration' || o.field === 'StartDate') && !o.record.store.isLeafNode(o.record);
        
        if (!o.cancel && o.field === 'Duration') {
            var r = o.record,
                durationDays = Math.round(Date.getDurationInHours(r.get('StartDate'), r.get('EndDate'))/12) / 2;
            
            r.set('Duration', durationDays);
        }
    },
    
    afterEdit : function(o) {
        if (o.field === 'Duration') {
            var start = o.record.get('StartDate');
            o.record.set('EndDate', start.add(Date.HOUR, o.value * 24));
        } else if (o.field === 'StartDate') {
            var dur = o.record.get('EndDate') - o.originalValue;
            o.record.set('EndDate', o.value.add(Date.MILLI, dur));
        }
    },
    
    createGantt : function(today) {
      
        var store = new Ext.ux.maximgb.tg.AdjacencyListStoreGantt({
//            defaultExpanded : true,
            autoLoad : true,
            proxy : new Ext.data.HttpProxy({
                url : "../JSON/gantt_ganttRemote.getTimeGanttList?nodeid=0",
                method : "POST"
            }),
            baseParams : {
                start : '0',
                limit : '25'
            },
            reader: new Ext.data.JsonReader({
                        idProperty : 'Id',
                        root : 'yoruRoot',
                        totalProperty : 'totalProperty'
                    }, [
                    // Mandatory fields
                    {name:'Id'},
                    {name:'Name', type:'string'},
                    {name:'StartDate', type : 'date', dateFormat:'c'},
                    {name:'EndDate', type : 'date', dateFormat:'c'},
                    {name:'PercentDone'},
                    {name:'ParentId'},
                    {name:'IsLeaf', type: 'bool'},

                    // Your task meta data goes here
                    {name:'Responsible'},
                    {name:'Duration'},
                    {name:'Status'},
                    {name : 'AstartDate', type : 'date',dateFormat : 'c'}, 
                    {name : 'AendDate',type : 'date',dateFormat : 'c'}
                ]
            )
        });
        
        var dependencyStore = new Ext.data.JsonStore({   
//            idProperty : 'Id',
//            autoLoad : true,
            proxy : new Ext.data.HttpProxy({
                  url : '../JSON/ganttRelation_GanttRelationRemote.getGantLines?nodeid=0',
                  method : 'POST'
            }),
            baseParams : {
                        start : '0',
                        limit : '25'
            },
            fields : [
                // 3 mandatory fields
                {name:'From'},
                {name:'To'},
                {name:'Type'}
            ]
        });
        var g = new Sch.TimePanel({
            region : 'center',
            store : store,
            dependencyStore : dependencyStore,
            
            viewModel : {
                start : today, 
                end : today.add(Date.WEEK, 20), 
                columnType : 'monthAndQuarters',
                viewBehaviour : Sch.ViewBehaviour.WeekView
            }
        });
        
        return g;
    }
};

