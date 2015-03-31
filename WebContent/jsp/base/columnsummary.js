Ext.ns('App');

Ext.onReady(function() {
    Ext.BLANK_IMAGE_URL = 'http://extjs.cachefly.net/ext-3.1.0/resources/images/default/s.gif';
    
    App.Scheduler.init();
});


App.Scheduler = {
    
    // Initialize application
    init : function() {
        
        var today = new Date();
        
        today.clearTime();
        
        this.grid = this.createGrid();
        this.grid.setView(today, today.add(Date.MONTH, 12), 'month', Sch.ViewBehaviour.MonthView, this.renderer);
        alert(today);
        alert(Date.MONTH);
        
        
        this.grid.store.loadData([
                {Id : 'r1', Name : ''+getResource('resourceParam463')+'1'},
                {Id : 'r2', Name : ''+getResource('resourceParam463')+'2'},
                {Id : 'r3', Name : ''+getResource('resourceParam463')+'3'},
                {Id : 'r4', Name : ''+getResource('resourceParam463')+'4'},
                {Id : 'r5', Name : ''+getResource('resourceParam463')+'5'},
                {Id : 'r6', Name : ''+getResource('resourceParam463')+'6'},
                {Id : 'r7', Name : ''+getResource('resourceParam463')+'7'},
                {Id : 'r8', Name : ''+getResource('resourceParam463')+'8'}
        ]);
        
        this.grid.eventStore.loadData([
                {Id : 'e10', ResourceId: 'r1', Title : '进度1', StartDate : today.add(Date.MONTH, 2), EndDate : today.add(Date.MONTH, 6)},
                {Id : 'e11', ResourceId: 'r2', Title : '进度2', StartDate : today.add(Date.MONTH, 3), EndDate : today.add(Date.MONTH, 8)},
                {Id : 'e21', ResourceId: 'r3', Title : '进度3', StartDate : today.add(Date.MONTH, 5), EndDate : today.add(Date.MONTH, 9)},
                {Id : 'e22', ResourceId: 'r4', Title : '进度4', StartDate : today.add(Date.MONTH, 5), EndDate : today.add(Date.MONTH, 7)},
                {Id : 'e32', ResourceId: 'r5', Title : '进度5', StartDate : today.add(Date.MONTH, 4), EndDate : today.add(Date.MONTH, 6)},
                {Id : 'e33', ResourceId: 'r6', Title : '进度6', StartDate : today.add(Date.MONTH, 4), EndDate : today.add(Date.MONTH, 7)},
                {Id : 'e34', ResourceId: 'r7', Title : '进度4', StartDate : today.add(Date.MONTH, 5), EndDate : today.add(Date.MONTH, 7)},
                {Id : 'e35', ResourceId: 'r8', Title : '进度5', StartDate : today.add(Date.MONTH, 4), EndDate : today.add(Date.MONTH, 6)}
        ]);
    },
    
    renderer : function (item, r, row, col, ds, index) {
        return {
            text : item.get('Title')
        };
    },
    
    createGrid : function() {
        
        // Store holding all the categories
        var resourceStore = new Ext.data.JsonStore({
            sortInfo:{field: 'Name', direction: "ASC"},
            idProperty : 'Id',
            fields : [
                {name: 'Id'},
                {name: 'Name'}
            ]
        });
        
        // Store holding all the events
        var eventStore = new Ext.data.JsonStore({
            sortInfo:{field: 'ResourceId', direction: "ASC"},
            idProperty : 'Id',
            fields : [
                {name: 'Id', type:'string'},
                {name: 'ResourceId'},
                {name: 'StartDate', type : 'date'},
                {name: 'EndDate', type : 'date'},
                
                {name: 'Title'}
            ]
        });
        
//        var summaryCol = new Sch.plugins.SummaryColumn({ header : '% allocated', showPercent : true });
        
        var g = new Sch.SchedulerPanel({
            border : true,
            height:600,
            width: 1500,
            renderTo : 'grid-columnsummary',
            trackMouseOver : true,
            stripeRows : false,
//            enableColumnMove:false,
//            enableColumnResize:false,
//            enableDragCreation:false,
            enableDragDrop:true,//拖拽
            resizeHandles:'none',//拖动栏
//            enableEventDragDrop:false,
//            footer:false,
            // Setup static columns
            loadMask:'正在加载'+getResource('resourceParam474')+'……',
            disableSelection:true,//点击
            columns : [
               {header : ''+getResource('resourceParam1035')+'', sortable:true, width:100, dataIndex : 'Name'},
//               summaryCol
            ],
            
//            viewConfig : {
//                forceFit:true
//            },
            
//            plugins : [
//                summaryCol
//            ],
            store : resourceStore,
            eventStore : eventStore
//            listeners : {
//                dragcreateend : {
//                    fn : function(p, data, e) {
//                        var b = new this.grid.eventStore.recordType({
//                            Id : 'evt-' + new Date().getTime(),
//                            Title: '', 
//                            ResourceId : data.record.get('Id'),
//                            StartDate : data.startDate,
//                            EndDate : data.endDate
//                        });
//                        
//                        this.grid.eventStore.add(b);
//                    },
//                    scope : this
//                }
//                
//            }
        });
        
        document.getElementById('ext-gen30').style.height='0px';
        document.getElementById('ext-gen30').style.width='0px';
        return g;
    }
};
