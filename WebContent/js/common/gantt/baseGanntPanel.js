Ext.ns("Sch");
Sch.QuantityPanel = Ext.extend(Sch.TreeGanttPanel, {
    leftLabelField : 'Name',
    rightLabelField : 'Responsible',
    highlightWeekends : false,
    showTodayLine : false,
    loadMask : true,
    trackMouseOver : false,
    stripeRows : true,
    timeColumnDefaults : { width : 150 },
    
    enableLabelEdit : false,
    enableTaskDragDrop : false,
    enableDependencyDragDrop:false,
    resizeHandles:'none',
  
    
    initComponent : function() {
        // Add some extra functionality
        this.plugins = this.plugins.concat([new Sch.gantt.plugins.TaskContextMenu(), new Sch.plugins.Pan()]);
        
        Ext.apply(this, {
            // Define an HTML template for the tooltip
            tooltipTpl : new Ext.XTemplate(
                '<h4 class="tipHeader">{Name}</h4>',
                '<table class="taskTip">', 
                    '<tr><td>计划开始时间:</td> <td align="right">{[values.StartDate.format("y-m-d")]}</td></tr>',
                    '<tr><td>计划结束时间:</td> <td align="right">{[values.EndDate.format("y-m-d")]}</td></tr>',
                    '<tr><td>完成量:</td><td align="right">{PercentDone}%</td></tr>',
                '</table>'
            ).compile(),
            
            // Define the static columns
            colModel : new Ext.ux.grid.LockingColumnModel({
                columns : [
                    {
                        header : getResource('resourceParam480'), 
                        sortable:true, 
                        dataIndex : 'Name', 
                        locked : true,
                        width:180,
                        renderer : function(value, cellmeta, record, rowIndex,
                            columnIndex, store) {
                        var str = record.data.Names;
                        var statusCss = '';
                        if (record.data.type != '1') {
                            statusCss = contants.projectCss(record.data.Status);
                        } else {
                            
                            statusCss = contants.taskCss(record.data.Status);
                        }
                         var strs="<table class='x-grid3-row-table' border='0' cellspacing='0' cellpadding='0'>"+
                        "<tbody><tr>" +
                                "<td width='18px'; style='padding:0px 0px;margin:0px 0px;'><span class='"+statusCss+"' style='float:left;white-space:nowrap;overflow:hidden;padding:0px 0px;margin:0px 0px;height:16px;width:16px;'></span></td>" +
                                "<td style='padding:0px 0px;margin:0px 0px;border:0px;'><span class='task-schedule-name' title=\""+record.data.Name+"\">"
                              + record.data.Name
                              + "</a></span></td>" +
                                "</tr></tbody></table>";
                         return strs;
                       }
                    }
                ]
            }),
            
             // Define the buttons that are available for user interaction
            tbar : [{
                xtype: 'buttongroup',
                title: '导航',
                columns: 2,
                defaults: {
                    scale: 'large'
                },
                items: [{
                    iconCls : 'icon-prev',
                    scope : this,
                    handler : function() {
                        this.setView(this.getStart().add(Date.MONTH, -1), this.getEnd().add(Date.MONTH, -1));
                    }
                },
                {
                    iconCls : 'icon-next',
                    scope : this,
                    handler : function() {
                        this.setView(this.getStart().add(Date.MONTH, 1), this.getEnd().add(Date.MONTH, 1));
                    }
                }]
            },
            {
                xtype: 'buttongroup',
                title: '查看菜单',
                columns: 2,
                defaults: {
                    scale: 'small'
                },
                items: [
                    {
                        text : '全部合起',
                        iconCls : 'icon-collapseall',
                        scope : this,
                        handler : function() {
                            this.store.collapseAll();
                        }
                    },
                    {
                        text : '自适应',
                        iconCls : 'zoomfit',
                        handler : function() {
                            var first = new Date(9999,0,1), last = new Date(0);
                            
                            this.store.each(function(r) {
                                first = Date.min(r.get('StartDate'),first);
                                last = Date.max(r.get('EndDate'),last);
                            });
                            
                            first = first.clone();
                            first.setDate(1);
                            first = first.add(Date.MONTH, -1);
                            last = last.clone();
                            last.setDate(1);
                            last = last.add(Date.MONTH, 1);
                            
                            this.setView(first, last, 'monthAndQuarters');
                            this.fitTimeColumns();
                        },
                        scope : this
                    },
                    {
                        text : '全部展开',
                        iconCls : 'icon-expandall',
                        scope : this,
                        handler : function() {
                            this.store.expandAll();
                        }
                    }
                ]
            },
            {
                xtype: 'buttongroup',
                title: '视图解析',
                columns: 2,
                defaults: {
                    scale: 'small'
                },
                items: [{
                        id : Ext.id('span1'),
                        text: '10 周',
                        scope : this,
                        handler : function() {
                            var s = this.getStart();
                            
                            // Start the week on a Monday
                            while(s.getDay() !== 1) {
                                s = s.add(Date.DAY, -1);
                            }
                            this.setView(s, s.add(Date.WEEK, 10), 'weekAndDayLetters');
                        }
                    },
                    {
                        id :  Ext.id('span2'),
                        text: '6 个月',
                        scope : this,
                        handler : function() {
                            var s = this.getStart();
                            s.setDate(1);
                            this.setView(s, s.add(Date.MONTH, 6), 'monthAndQuarters');
                        }
                    },
                    {
                        id :  Ext.id('span3'),
                        text: '1 年',
                        scope : this,
                        handler : function() {
                            var s = this.getStart();
                            s.setMonth(0);
                            s.setDate(1);
                            this.setView(s, s.add(Date.MONTH, 12), 'monthAndQuarters');
                        }
                    }
                ]},
                '->',
                {
                    xtype: 'buttongroup',
                    title: '其他功能',
                    columns : 2,
                    items: [
                    {
                        text : '高亮显示关键路径',
                        iconCls : 'togglebutton',
                        scope : this,
                        enableToggle : true,
                        handler : function(btn) {
                            this.el.toggleClass('show-critical-chain');
                            if (btn.pressed) {
                                this.highlightCriticalPaths(true);
                            } else {
                                this.unhighlightCriticalPaths(true);
                            }
                        }
                    },
                    {
                        iconCls : 'action',
                        text : '高亮显示大于 7天的任务',
                        scope : this,
                        handler : function(btn) {
                            this.store.each(function(task) {
                                if (Date.getDurationInDays(task.get('StartDate'), task.get('EndDate')) > 7) {
                                    var el = this.getElementFromEventRecord(task);
                                    el && el.frame('lime');
                                }
                            }, this);
                        }
                    },
                    {
                        iconCls : 'togglebutton',
                        text : '小于30%完成量',
                        scope : this,
                        enableToggle : true,
                        toggleGroup : 'filter',
                        handler : function(btn) {   
                            if (btn.pressed) {
                                this.store.filterBy(function(task) {
                                    return task.get('PercentDone') < 30;
                                });
                            } else {
                                this.store.clearFilter();
                            }
                        }
                    },
                    {
                        xtype : 'textfield',
                        emptyText : '模糊匹配任务名称',
                        scope : this,
                        width:150,
                        enableKeyEvents : true,
                        listeners : {
                            keyup : {
                                fn : function(field) {
                                    this.store.filter('Name', field.getValue(), true, false);
                                },
                                scope : this
                            }
                        }
                    }]
                }
            ]
        });
        
        Sch.QuantityPanel.superclass.initComponent.apply(this, arguments);
    }
});

Sch.TimePanel= Ext.extend(Sch.TreeGanttPanel, {
    enableLabelEdit : false,
    enableTaskDragDrop : false,
    leftLabelField : 'Name',
    rightLabelField : 'Responsible',
    highlightWeekends : false,
    enableDependencyDragDrop:false,
    resizeHandles:'none',
    showTodayLine : false,
    loadMask : true,
    trackMouseOver : false,
    stripeRows : true,
    timeColumnDefaults : { width : 150 },
    isPlannedTime : false,
    
    initComponent : function() {
        // Add some extra functionality
       // this.plugins = this.plugins.concat([new Sch.gantt.plugins.TaskContextMenu(), new Sch.plugins.Pan()]);
        
        Ext.apply(this, {
            // Define an HTML template for the tooltip
            tooltipTpl : new Ext.XTemplate(
                '<h4 class="tipHeader">{Name}</h4>',
                '<table class="taskTip">', 
                    '<tr><td>计划开始时间:</td> <td align="right">{[values.StartDate.format("y-m-d")]}</td></tr>',
                    '<tr><td>计划结束时间:</td> <td align="right">{[values.EndDate.format("y-m-d")]}</td></tr>',
//                    '<tr><td>实际开始时间:</td> <td align="right">{[values.AstartDate]}</td></tr>',
//                    '<tr><td>实际开始时间:</td> <td align="right">{[values.AendDate]}</td></tr>',
                '</table>'
            ).compile(),
            
            // Define the static columns
            colModel : new Ext.ux.grid.LockingColumnModel({
                columns : [
                    {
                        header : getResource('resourceParam480'), 
                        sortable:true, 
                        dataIndex : 'Name', 
                        locked : true,
                        width:180,
                        renderer : function(value, cellmeta, record, rowIndex,
                            columnIndex, store) {
                        var str = record.data.Names;
                        var statusCss = '';
                        if (record.data.type != '1') {
                            statusCss = contants.projectCss(record.data.Status);
                        } else {
                            
                            statusCss = contants.taskCss(record.data.Status);
                        }
                         var strs="<table class='x-grid3-row-table' border='0' cellspacing='0' cellpadding='0'>"+
                        "<tbody><tr>" +
                                "<td width='18px'; style='padding:0px 0px;margin:0px 0px;'><span class='"+statusCss+"' style='float:left;white-space:nowrap;overflow:hidden;padding:0px 0px;margin:0px 0px;height:16px;width:16px;'></span></td>" +
                                "<td style='padding:0px 0px;margin:0px 0px;border:0px;'><span class='task-schedule-name' title=\""+record.data.Name+"\">"
                              + record.data.Name
                              + "</a></span></td>" +
                                "</tr></tbody></table>";
                         return strs;
                       }
                    }
                ]
            }),
            
             // Define the buttons that are available for user interaction
            tbar : [{
                xtype: 'buttongroup',
                title: '导航',
                columns: 2,
                defaults: {
                    scale: 'large'
                },
                items: [{
                    iconCls : 'icon-prev',
                    scope : this,
                    handler : function() {
                        this.setView(this.getStart().add(Date.MONTH, -1), this.getEnd().add(Date.MONTH, -1));
                    }
                },
                {
                    iconCls : 'icon-next',
                    scope : this,
                    handler : function() {
                        this.setView(this.getStart().add(Date.MONTH, 1), this.getEnd().add(Date.MONTH, 1));
                    }
                }]
            },
            {
                xtype: 'buttongroup',
                title: '查看菜单',
                columns: 2,
                defaults: {
                    scale: 'small'
                },
                items: [
                    {
                        text : '全部合起',
                        iconCls : 'icon-collapseall',
                        scope : this,
                        handler : function() {
                            this.store.collapseAll();
                        }
                    },
                    {
                        text : '自适应',
                        iconCls : 'zoomfit',
                        handler : function() {
                            var first = new Date(9999,0,1), last = new Date(0);
                            
                            this.store.each(function(r) {
                                first = Date.min(r.get('StartDate'),first);
                                last = Date.max(r.get('EndDate'),last);
                            });
                            
                            first = first.clone();
                            first.setDate(1);
                            first = first.add(Date.MONTH, -1);
                            last = last.clone();
                            last.setDate(1);
                            last = last.add(Date.MONTH, 1);
                            
                            this.setView(first, last, 'monthAndQuarters');
                            this.fitTimeColumns();
                        },
                        scope : this
                    },
                    {
                        text : '全部展开',
                        iconCls : 'icon-expandall',
                        scope : this,
                        handler : function() {
                            this.store.expandAll();
                        }
                    }
                ]
            },
            {
                xtype: 'buttongroup',
                title: '视图解析',
                columns: 2,
                defaults: {
                    scale: 'small'
                },
                items: [{
                        id :  Ext.id('span1'),
                        text: '10 周',
                        scope : this,
                        handler : function() {
                            var s = this.getStart();
                            
                            // Start the week on a Monday
                            while(s.getDay() !== 1) {
                                s = s.add(Date.DAY, -1);
                            }
                            this.setView(s, s.add(Date.WEEK, 10), 'weekAndDayLetters');
                        }
                    },
                    {
                        id :  Ext.id('span2'),
                        text: '6 个月',
                        scope : this,
                        handler : function() {
                            var s = this.getStart();
                            s.setDate(1);
                            this.setView(s, s.add(Date.MONTH, 6), 'monthAndQuarters');
                        }
                    },
                    {
                        id :  Ext.id('span3'),
                        text: '1 年',
                        scope : this,
                        handler : function() {
                            var s = this.getStart();
                            s.setMonth(0);
                            s.setDate(1);
                            this.setView(s, s.add(Date.MONTH, 12), 'monthAndQuarters');
                        }
                    }
                ]},
                '->',
                {
                    xtype: 'buttongroup',
                    title: '其他功能',
                    columns : 2,
                    items: [
                    {
                        text : '高亮显示关键路径',
                        iconCls : 'togglebutton',
                        scope : this,
                        enableToggle : true,
                        handler : function(btn) {
                            this.el.toggleClass('show-critical-chain');
                            if (btn.pressed) {
                                this.highlightCriticalPaths(true);
                            } else {
                                this.unhighlightCriticalPaths(true);
                            }
                        }
                    },
                    {
                        iconCls : 'action',
                        text : '高亮显示大于 7天的任务',
                        scope : this,
                        handler : function(btn) {
                            this.store.each(function(task) {
                                if (Date.getDurationInDays(task.get('StartDate'), task.get('EndDate')) > 7) {
                                    var el = this.getElementFromEventRecord(task);
                                    el && el.frame('lime');
                                }
                            }, this);
                        }
                    },
                    {
                        iconCls : 'togglebutton',
                        text : '小于30%完成量',
                        scope : this,
                        enableToggle : true,
                        toggleGroup : 'filter',
                        handler : function(btn) {   
                            if (btn.pressed) {
                                this.store.filterBy(function(task) {
                                    return task.get('PercentDone') < 30;
                                });
                            } else {
                                this.store.clearFilter();
                            }
                        }
                    },
                    {
                        xtype : 'textfield',
                        emptyText : '模糊匹配任务名称',
                        scope : this,
                        width:150,
                        enableKeyEvents : true,
                        listeners : {
                            keyup : {
                                fn : function(field) {
                                    this.store.filter('Name', field.getValue(), true, false);
                                },
                                scope : this
                            }
                        }
                    }]
                }
            ]
        });
        
        Sch.QuantityPanel.superclass.initComponent.apply(this, arguments);
    },
    constructor : function(config) {
        this.addEvents(
            /**
             * @event labeledit_beforecomplete
             * Fires after a change has been made to a label field, but before the change is reflected in the underlying field.
             * @param {TreeGanttPanel} g The gantt panel object
             * @param {Mixed} value The current field value
             * @param {Mixed} startValue The original field value
             * @param {Record} record The affected record 
             */
            'labeledit_beforecomplete', 
            
            /**
             * @event labeledit_complete
             * Fires after editing is complete and any changed value has been written to the underlying field.
             * @param {TreeGanttPanel} g The gantt panel object
             * @param {Mixed} value The current field value
             * @param {Mixed} startValue The original field value
             * @param {Record} record The affected record 
             */
            'labeledit_complete'
        );
        config = config || {};
        Ext.applyIf(config, {
            plugins : []
        });
        
        Ext.apply(this, config);
        
        if (!config.eventTemplate) {
            config.eventTemplate = new Ext.Template(
                '<div class="sch-event-wrap sch-gantt-task" style="left:{leftOffset}px;width:{width}px">',
                    '<div id="{id}" class="sch-gantt-item sch-gantt-task-bar {cls}" style="width:{width}px;{style}">',
                    '</div>',
                '</div>',
            {
                compiled: true,      
                disableFormats: true 
            });
        }
        
        if (!config.parentEventTemplate) {
            config.parentEventTemplate = new Ext.Template(
               '<div class="sch-event-wrap sch-gantt-parent-task" style="top:1px;left:{leftOffset}px;width:{width}px">',
                    '<div id="{id}" class="sch-gantt-item sch-gantt-parenttask-bar {cls}" style="height:11px;background:#F4F4F4;width:{width}px;">',
                        '<div class="sch-gantt-parenttask-leftarrow"></div>',
                        '<div class="sch-gantt-parenttask-rightarrow"></div>',
                    '</div>',
                '</div>',
            {
                compiled: true,      
                disableFormats: true 
            });
        }
    
        if (!config.milestoneTemplate) {
            config.milestoneTemplate = new Ext.Template(
              '<div class="sch-event-wrap sch-gantt-milestone" style="left:{leftOffset}px">',
                    '<div id="{id}" class="sch-gantt-item sch-gantt-milestone-diamond {cls}" style="{style}">',
                    '</div>',
                '</div>',
            {
                compiled: true,      
                disableFormats: true 
            });
        }
    
        Sch.TimePanel.superclass.constructor.call(this, config);
    },
     internalRenderer : function(v, m, event, row, col, ds) {
        var cellResult = '',
            grid = this,
            viewStart = grid.getStart(),
            viewEnd = grid.getEnd().add(Date.DAY, 1),
            cm = grid.getColumnModel(),
            colWidth = cm.getColumnWidth(col),
            colStart = grid.getColumnStart(col),
            colEnd = grid.getColumnEnd(col).add(Date.DAY, 1);
            
        // Call timeCellRenderer to be able to set css/style properties on individual grid cells
        grid.timeCellRenderer.call(this, event, m, row, col, ds, colStart, colEnd, grid);
            
        var start = event.get('StartDate'),
            end = event.get('EndDate').add(Date.DAY, 1),
            astart = event.get('AstartDate'),
            aend = event.get('AendDate')?event.get('AendDate').add(Date.DAY, 1) : event.get('AendDate'),
            name=event.get('Name'),
            astartsInsideView = null,
            flag=false,
            aflag=false,
            startsInsideView = start.betweenLesser(colStart, colEnd);
            typeof astart=='object' ? astartsInsideView= astart.betweenLesser(colStart, colEnd):astartsInsideView=null;
            flag=startsInsideView || (col == grid.nbrStaticColumns && start < colStart && end > colStart);
            aflag=astartsInsideView || (col == grid.nbrStaticColumns && astart < colStart && aend > colStart);
        if (flag) {
            var availableTimeInColumn = Date.getDurationInMinutes(colStart, colEnd),
                leftOffset = Math.floor((Date.getDurationInMinutes(colStart, startsInsideView ? start : colStart) / availableTimeInColumn) * colWidth),
                eventData = grid.eventRenderer.call(this, event, row, col, ds) || {};
            if (grid.isMilestone(event)) {
                Ext.apply(eventData, {
                    id : grid.eventPrefix + event.id,
                    cls : (eventData.cls || '') + (event.dirty ? ' sch-dirty' : ''),
                    leftOffset : leftOffset - grid.milestoneOffset// Remove half of the diamond width
                });
                cellResult += grid.milestoneTemplate.apply(eventData);
            } else {
                var itemWidth = Math.floor(grid.getXFromDate(Date.min(end, viewEnd)) - grid.getXFromDate(startsInsideView ? start : viewStart)),
                    endsOutsideView = end > viewEnd,
                    isLeaf = ds.isLeafNode(event);
                if (!isLeaf) {
                    itemWidth += 2*grid.parentTaskOffset; // Add the down arrow width
                    leftOffset -= grid.parentTaskOffset; // Remove half of the down arrow width
                }
                Ext.apply(eventData, {
                    id : grid.eventPrefix + event.id,
                    cls : (eventData.cls || '') + (event.dirty ? ' sch-dirty' : '') + (endsOutsideView ? ' sch-event-endsoutside ' : '') + (startsInsideView ? '' : ' sch-event-startsoutside'),
                    width : Math.max(1, itemWidth - grid.eventBorderWidth),
                    leftOffset : leftOffset
                });
                eventData.text = eventData.text || '&#160;';
                cellResult += grid[isLeaf ? "eventTemplate" : "parentEventTemplate"].apply(eventData);
            }
         }
        if(aflag && typeof astart =='object')
        {
            var availableTimeInColumn = Date.getDurationInMinutes(colStart, colEnd),
                aleftOffset = Math.floor((Date.getDurationInMinutes(colStart,astartsInsideView ? astart : colStart) / availableTimeInColumn) * colWidth);
            if (grid.isMilestone(event)) {
              aleftOffset = aleftOffset - grid.milestoneOffset;
              cellResult ='<div class="sch-event-wrap sch-gantt-milestone" style="left:{aleftOffset}px">' +
                    '<div id="'+Ext.id()+'" class="sch-gantt-item sch-gantt-milestone-diamond-a "></div></div>';
            } else {
                var  aitemWidth = Math.floor(grid.getXFromDate(Date.min(aend, viewEnd)) - grid.getXFromDate(astartsInsideView ? astart : viewStart));
                isLeaf = ds.isLeafNode(event);
                if (!isLeaf) {
                    aitemWidth += 2*grid.parentTaskOffset; // Add the down arrow width
                    aleftOffset -= grid.parentTaskOffset; // Remove half of the down arrow width
                }
                if(isLeaf)
                {
                  cellResult+='<div class="sch-gantt-progress-bar-a" style="left:'+aleftOffset+'px;width:'+aitemWidth+'px;position:absolute;z-index:1001;">&#160;</div>';
                }else
                {
                  cellResult+='<div class="sch-gantt-progress-bar-b" style="left:'+aleftOffset+'px;width:'+aitemWidth+'px;position:absolute;z-index:1001;">&#160;</div>';
                }
            }
        }
         
        m.css += ' sch-timetd';
        // Z-index is trouble in IE, thanks Condor for this fix
        if (Ext.isIE) {
            m.attr = 'style="z-index:' + (grid.getColumnModel().getColumnCount() - col) + '"';
        }
        return cellResult;
    }
});


Sch.ActualmanhourPanel= Ext.extend(Sch.TreeGanttPanel, {
    count:0,
    enableLabelEdit : false,
    leftLabelField : 'Name',
    enableTaskDragDrop : false,
    rightLabelField : 'Responsible',
    highlightWeekends : false,
    showTodayLine : false,
    loadMask : true,
    trackMouseOver : false,
    stripeRows : true,
    timeColumnDefaults : { width : 800 },
    
    initComponent : function() {
        // Add some extra functionality
//        this.plugins = this.plugins.concat([new Sch.gantt.plugins.TaskContextMenu(), new Sch.plugins.Pan()]);
        
        Ext.apply(this, {
            // Define an HTML template for the tooltip
            tooltipTpl : new Ext.XTemplate(
                '<h4 class="tipHeader">{Name}</h4>',
                '<table class="taskTip">', 
                    '<tr><td>计划开始时间:</td> <td align="right">{[values.StartDatea.format("y-m-d")]}</td></tr>',
                    '<tr><td>计划结束时间:</td> <td align="right">{[values.EndDatea.format("y-m-d")]}</td></tr>',
                '</table>'
            ).compile(),
            
            // Define the static columns
            colModel : new Ext.ux.grid.LockingColumnModel({
                columns : [
                    {
                        header : getResource('resourceParam480'), 
                        sortable:true, 
                        dataIndex : 'Name', 
                        locked : true,
                        width:180,
                        renderer : function(value, cellmeta, record, rowIndex,
                            columnIndex, store) {
                        var str = record.data.Names;
                        var statusCss = '';
                        if (record.data.type != '1') {
                            statusCss = contants.projectCss(record.data.Status);
                        } else {
                            
                            statusCss = contants.taskCss(record.data.Status);
                        }
                         var strs="<table class='x-grid3-row-table' border='0' cellspacing='0' cellpadding='0'>"+
                        "<tbody><tr>" +
                                "<td width='18px'; style='padding:0px 0px;margin:0px 0px;'><span class='"+statusCss+"' style='float:left;white-space:nowrap;overflow:hidden;padding:0px 0px;margin:0px 0px;height:16px;width:16px;'></span></td>" +
                                "<td style='padding:0px 0px;margin:0px 0px;border:0px;'><span class='task-schedule-name' title=\""+record.data.Name+"\">"
                              + record.data.Name
                              + "</a></span></td>" +
                                "</tr></tbody></table>";
                         return strs;
                       }
                    }
                ]
            }),
            
             // Define the buttons that are available for user interaction
            tbar : [{
                xtype: 'buttongroup',
                title: '导航',
                columns: 2,
                defaults: {
                    scale: 'large'
                },
                items: [{
                    iconCls : 'icon-prev',
                    scope : this,
                    handler : function() {
                        if(this.count<=0)
                        {
                            return;
                        }
                        this.count--;
                        this.setView(this.getStart().add(Date.MONTH, -1), this.getEnd().add(Date.MONTH, -1));
                    }
                },
                {
                    iconCls : 'icon-next',
                    scope : this,
                    handler : function() {
                        this.count++;
                        this.setView(this.getStart().add(Date.MONTH, 1), this.getEnd().add(Date.MONTH, 1));
                    }
                }]
            },
            {
                xtype: 'buttongroup',
                title: '查看菜单',
                columns: 2,
                defaults: {
                    scale: 'small'
                },
                items: [
                    {
                        text : '全部合起',
                        iconCls : 'icon-collapseall',
                        scope : this,
                        handler : function() {
                            this.store.collapseAll();
                        }
                    },
                    {
                        text : '全部展开',
                        iconCls : 'icon-expandall',
                        scope : this,
                        handler : function() {
                            this.store.expandAll();
                        }
                    }
                ]
            },
                '->',
                {
                    xtype: 'buttongroup',
                    title: '其他功能',
                    columns : 2,
                    items: [
                    {
                        text : '高亮显示关键路径',
                        iconCls : 'togglebutton',
                        scope : this,
                        enableToggle : true,
                        handler : function(btn) {
                            this.el.toggleClass('show-critical-chain');
                            if (btn.pressed) {
                                this.highlightCriticalPaths(true);
                            } else {
                                this.unhighlightCriticalPaths(true);
                            }
                        }
                    },
                    {
                        iconCls : 'action',
                        text : '高亮显示大于 7天的任务',
                        scope : this,
                        handler : function(btn) {
                            this.store.each(function(task) {
                                if (Date.getDurationInDays(task.get('StartDate'), task.get('EndDate')) > 7) {
                                    var el = this.getElementFromEventRecord(task);
                                    el && el.frame('lime');
                                }
                            }, this);
                        }
                    },
                    {
                        iconCls : 'togglebutton',
                        text : '小于30%完成量',
                        scope : this,
                        enableToggle : true,
                        toggleGroup : 'filter',
                        handler : function(btn) {   
                            if (btn.pressed) {
                                this.store.filterBy(function(task) {
                                    return task.get('PercentDone') < 30;
                                });
                            } else {
                                this.store.clearFilter();
                            }
                        }
                    },
                    {
                        xtype : 'textfield',
                        emptyText : '模糊匹配任务名称',
                        scope : this,
                        width:150,
                        enableKeyEvents : true,
                        listeners : {
                            keyup : {
                                fn : function(field) {
                                    this.store.filter('Name', field.getValue(), true, false);
                                },
                                scope : this
                            }
                        }
                    }]
                }
            ]
        });
        
        Sch.QuantityPanel.superclass.initComponent.apply(this, arguments);
    },
    constructor : function(config) {
        this.addEvents(
            /**
             * @event labeledit_beforecomplete
             * Fires after a change has been made to a label field, but before the change is reflected in the underlying field.
             * @param {TreeGanttPanel} g The gantt panel object
             * @param {Mixed} value The current field value
             * @param {Mixed} startValue The original field value
             * @param {Record} record The affected record 
             */
            'labeledit_beforecomplete', 
            
            /**
             * @event labeledit_complete
             * Fires after editing is complete and any changed value has been written to the underlying field.
             * @param {TreeGanttPanel} g The gantt panel object
             * @param {Mixed} value The current field value
             * @param {Mixed} startValue The original field value
             * @param {Record} record The affected record 
             */
            'labeledit_complete'
        );
        config = config || {};
        Ext.applyIf(config, {
            plugins : []
        });
        
        Ext.apply(this, config);
        
        if (!config.eventTemplate) {
            config.eventTemplate = new Ext.Template(
                '<div class="sch-event-wrap sch-gantt-task" style="left:{leftOffset}px;width:{width}px">',
                    '<div id="{id}" class="sch-event sch-gantt-item sch-gantt-task-bar {cls}" style="background:#A2F790;width:{width}px">',
                    '</div>',
                '</div>',
            {
                compiled: true,      
                disableFormats: true 
            });
        }
        
        if (!config.parentEventTemplate) {
            config.parentEventTemplate = new Ext.Template(
                '<div class="sch-event-wrap sch-gantt-parent-task" style="left:{leftOffset}px;width:{pwidth}px">',
                    '<div id="{id}" class="sch-event sch-gantt-item sch-gantt-parenttask-bar {cls}" style="background:#E1E5F0;width:{pwidth}px">',
                    '<div class="sch-gantt-parenttask-leftarrow"></div>',
                     '<div class="sch-gantt-parenttask-rightarrow"></div>',
                    '</div>',
                '</div>',
            {
                compiled: true,      
                disableFormats: true 
            });
        }
    
        if (!config.milestoneTemplate) {
            config.milestoneTemplate = new Ext.Template(
                '<div id="aatime-gantt" class="sch-event-wrap sch-gantt-task" style="display:',(this.isStatusProgressBars == "aatime") ? '' : 'none',
                   ';left:{leftOffset}px;width:{width}px">',
                    '<div id="{id}" class="sch-event sch-gantt-item sch-gantt-task-bar {cls}" style="background:#A2F790;width:{width}px">',
                       '<div class="sch-gantt-progress-bar-all" style="width:{awidth}px;position:absolute;">&#160;</div>',
                    '</div>',
                '</div>',
            {
                compiled: true,      
                disableFormats: true 
            });
        }
    
        Sch.ActualmanhourPanel.superclass.constructor.call(this, config);
    },
        internalRenderer : function(v, m, event, row, col, ds) {
        var cellResult = '',
            grid = this,
            viewStart = grid.getStart(),
            viewEnd = grid.getEnd(),
            cm = grid.getColumnModel(),
            colWidth = cm.getColumnWidth(col),
            colStart = grid.getColumnStart(col),
            colEnd = grid.getColumnEnd(col);
       
        // Call timeCellRenderer to be able to set css/style properties on individual grid cells
        grid.timeCellRenderer.call(this, event, m, row, col, ds, colStart, colEnd, grid);
            
        var start = event.get('StartDate'),
            end = event.get('EndDate'),
            astart = event.get('AstartDate'),
            aend = event.get('AendDate'),
            name=event.get('Name'),
            astartsInsideView = null,
            flag=false,
            aflag=false,
            startsInsideView = start.betweenLesser(colStart, colEnd);
            typeof astart=='object' ? astartsInsideView= astart.betweenLesser(colStart, colEnd):astartsInsideView=null;
            flag=startsInsideView || (col == grid.nbrStaticColumns && start < colStart && end > colStart);
            aflag=astartsInsideView || (col == grid.nbrStaticColumns && astart < colStart && aend > colStart);
        if (flag) {
            var availableTimeInColumn = Date.getDurationInMinutes(colStart, colEnd),
                leftOffset = Math.floor((Date.getDurationInMinutes(colStart, startsInsideView ? start : colStart) / availableTimeInColumn) * colWidth),
                eventData = grid.eventRenderer.call(this, event, row, col, ds) || {};
            if (grid.isMilestone(event)) {
                Ext.apply(eventData, {
                    id : grid.eventPrefix + event.id,
                    cls : (eventData.cls || '') + (event.dirty ? ' sch-dirty' : ''),
                    leftOffset : leftOffset - grid.milestoneOffset// Remove half of the diamond width
                });
                cellResult += grid.milestoneTemplate.apply(eventData);
            } else {
                var itemWidth = Math.floor(grid.getXFromDate(Date.min(end, viewEnd)) - grid.getXFromDate(startsInsideView ? start : viewStart)),
                    endsOutsideView = end > viewEnd,
                    isLeaf = ds.isLeafNode(event);
                if (!isLeaf) {
                    itemWidth += 2*grid.parentTaskOffset; // Add the down arrow width
//                    leftOffset -= grid.parentTaskOffset; // Remove half of the down arrow width
                }
                /**
                 * 去掉通过对是否有子任务来缩进的问题，让所有任务顶头显示
                 * at 2011-05-29 by liuxj
                 */
                Ext.apply(eventData, {
                    id : grid.eventPrefix + event.id,
                    cls : (eventData.cls || '') + (event.dirty ? ' sch-dirty' : '') + (endsOutsideView ? ' sch-event-endsoutside ' : '') + (startsInsideView ? '' : ' sch-event-startsoutside'),
                    width : Math.max(1, itemWidth - grid.eventBorderWidth+(Ext.isIE ? -2 : 4)),
                    pwidth : Math.max(1,itemWidth - grid.eventBorderWidth-(Ext.isIE ? 16 : 6)),
//                    leftOffset : leftOffset
                    leftOffset : leftOffset - grid.parentTaskOffset
                });
                eventData.text = eventData.text || '&#160;';
                cellResult += grid[isLeaf ? "eventTemplate" : "parentEventTemplate"].apply(eventData);
            }
         }
        if(aflag && typeof astart =='object')
        {
            var availableTimeInColumn = Date.getDurationInMinutes(colStart, colEnd),
                aleftOffset = Math.floor((Date.getDurationInMinutes(colStart,astartsInsideView ? astart : colStart) / availableTimeInColumn) * colWidth);
            if (grid.isMilestone(event)) {
              aleftOffset = aleftOffset - grid.milestoneOffset;
              cellResult ='<div class="sch-event-wrap sch-gantt-milestone" style="left:{aleftOffset}px">' +
                    '<div id="'+Ext.id()+'" class="sch-gantt-item sch-gantt-milestone-diamond-a "></div></div>';
            } else {
                var  aitemWidth = Math.floor(grid.getXFromDate(Date.min(aend, viewEnd)) - grid.getXFromDate(astartsInsideView ? astart : viewStart));
                isLeaf = ds.isLeafNode(event);
                if (!isLeaf) {
                    aitemWidth += 2*grid.parentTaskOffset; // Add the down arrow width
                    aleftOffset -= grid.parentTaskOffset; // Remove half of the down arrow width
                }
                if(isLeaf)
                {
                  cellResult+='<div class="sch-gantt-progress-bar-all" style="left:'+(aleftOffset-(Ext.isIE ? 6 : 0))+'px;width:'+(aitemWidth-(Ext.isIE ? 5 : 0))+'px;position:absolute;z-index:1001;">&#160;</div>';
                }else
                {
                  cellResult+='<div class="sch-gantt-progress-bar-b" style="background:#98B45D;left:'+aleftOffset+'px;width:'+(aitemWidth-(Ext.isIE ? 14 : 6))+'px;position:absolute;z-index:1001;">&#160;</div>';
                }
            }
        }
         
        m.css += ' sch-timetd';
        // Z-index is trouble in IE, thanks Condor for this fix
        if (Ext.isIE) {
            m.attr = 'style="z-index:' + (grid.getColumnModel().getColumnCount() - col) + '"';
        }
        return cellResult;
    }
});