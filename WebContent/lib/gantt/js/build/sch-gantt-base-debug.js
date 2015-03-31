/*
 * Ext Gantt 1.1
 * Copyright(c) 2009-2010 Mats Bryntse Consulting
 * 
 * info@ext-scheduler.com
 * 
 * http://www.ext-scheduler.com/license.html
 * 
 */


 
Ext.apply(Date.prototype, {
    
    betweenLesser : function(start, end) {
        var t = this.getTime();
        return start.getTime() <= t && t < end.getTime();
    },
    
    // Override to add WEEK/QUARTER case
    add : function(interval, value) {
        var d = this.clone();
        if (!interval || value === 0) return d;

        switch(interval.toLowerCase()) {
            case Date.MILLI:
                d.setMilliseconds(this.getMilliseconds() + value);
                break;
            case Date.SECOND:
                d.setSeconds(this.getSeconds() + value);
                break;
            case Date.MINUTE:
                d.setMinutes(this.getMinutes() + value);
                break;
            case Date.HOUR:
                d.setHours(this.getHours() + value);
                break;
            case Date.DAY:
                d.setDate(this.getDate() + value);
                break;
            case Date.WEEK:
                d.setDate(this.getDate() + value * 7);
                break;
            case Date.MONTH:
                var day = this.getDate();
                if (day > 28) {
                    day = Math.min(day, this.getFirstDateOfMonth().add('mo', value).getLastDateOfMonth().getDate());
                }
                d.setDate(day);
                d.setMonth(this.getMonth() + value);
                break;
            case Date.QUARTER:
                d = d.add(Date.MONTH, 3);
                break;
            case Date.YEAR:
                d.setFullYear(this.getFullYear() + value);
                break;
        }
        return d;
    },
    
    // Rounds the date to nearest minute increment
    round : function(minuteIncrement) {
        var c = this.clone(),
            h = this.getHours(),
            min = this.getMinutes(),
            roundedMinutes = Math.round(((h * 60) + min) / minuteIncrement) * minuteIncrement,
            wholeHours = roundedMinutes % 60;
        c.setHours(wholeHours);
        c.setMinutes(roundedMinutes - (60 * wholeHours));
        return c;
    },
    
    // Floors the date to nearest minute increment
    floor : function(minuteIncrement) {
        var c = this.clone(),
            h = this.getHours(),
            min = this.getMinutes(),
            roundedMinutes = Math.floor(((h * 60) + min) / minuteIncrement) * minuteIncrement,
            wholeHours = roundedMinutes % 60;
        c.setHours(wholeHours);
        c.setMinutes(roundedMinutes - (60 * wholeHours));
        return c;
    }
});

Ext.applyIf(Date, {
    
    isSameDay : function (date1, date2) {
        return date1.getFullYear() === date2.getFullYear() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getDate() === date2.getDate();
    },
    
    
    getDurationInMinutes : function (start, end) {
        return (end - start) / 60000;
    },
    
    
    getDurationInHours : function (start, end) {
        return (end - start) / 3600000;
    },
    
    
    getDurationInDays : function (start, end) {
        return (end - start) / 86400000;
    },
    
    
    getDurationInBusinessDays : function (start, end) {
        var nbrDays = Math.round((end - start) / 86400000),
            nbrBusinessDays = 0,
            d;
        
        for (var i = 0; i < nbrDays; i++) {
            d = start.add(Date.DAY, i).getDay();
            if (d !== 6 && d !== 0) {
                nbrBusinessDays++;
            }
        }
        return nbrBusinessDays;
    },
    
    
    getDurationInMonths : function (start, end) {
        return ((end.getFullYear() - start.getFullYear()) * 12) + (end.getMonth() - start.getMonth());
    },
    
    
    min : function (d1, d2) {
        return d1 < d2 ? d1 : d2;
    },
    
    
    max : function (d1, d2) {
        return d1 > d2 ? d1 : d2;
    },
    
    
    intersectSpans : function (date1Start, date1End, date2Start, date2End) {
        return date1Start.betweenLesser(date2Start, date2End) || 
               date2Start.betweenLesser(date1Start, date1End);
    },
    
    
    WEEK : "w",
    
    
    QUARTER : "q"
});


// Override to be able to save the previous value for record fields
Ext.override(Ext.data.Record, {
    set : function(name, value){
        var encode = Ext.isPrimitive(value) ? String : Ext.encode;
        if(encode(this.data[name]) == encode(value)) {
            return;
        }        
        this.dirty = true;
        
        // Keep previous Field value
        if(!this.previous){
            this.previous = {};
        }
        this.previous[name] = this.data[name];

        if(!this.modified){
            this.modified = {};
        }
        if(this.modified[name] === undefined){
            this.modified[name] = this.data[name];
        }

        this.data[name] = value;
        if(!this.editing){
            this.afterEdit();
        }
    },
    
    afterEdit: function(){
        if(this.store){
            this.store.afterEdit(this, this.previous);
        }
        
        // Don't need this anymore
        delete this.previous;
    },
    
    reject : function(silent){
        var m = this.modified,
            current = {};
        for(var n in m){
            if(typeof m[n] != "function"){
                // Save current value
                current[n] = this.data[n];
                this.data[n] = m[n];
            }
        }
        delete this.modified;
        this.dirty = false;
        this.editing = false;
        if(silent !== true){
            this.afterReject(current);
        }
    },
    
    // private
    afterReject: function(current){
        if(this.store){
            this.store.afterReject(this, current);
        }
    }
});

Ext.override(Ext.data.Store,{
    afterEdit : function(record, hashPrevious){
        if(this.modified.indexOf(record) == -1){
            this.modified.push(record);
        }
        this.fireEvent('update', this, record, Ext.data.Record.EDIT, hashPrevious);
    },

    // private
    afterReject : function(record, hashPrevious){
        this.modified.remove(record);
        this.fireEvent('update', this, record, Ext.data.Record.REJECT, hashPrevious);
    }
});


Ext.override(Ext.grid.ColumnModel, {
   // Override to handle bypass the destruction of column editors in setConfig (introduced in Ext 3.1.1)
    setConfig : function(config, initial, ignoreDestroy){
        var i, c, len;
        if(!initial){ // cleanup
            delete this.totalWidth;
            
            if (Ext.grid.Column.prototype.destroy && !ignoreDestroy) {
                for(i = 0, len = this.config.length; i < len; i++){
                    this.config[i].destroy();
                }
            }
        }
        
        // backward compatibility
        this.defaults = Ext.apply({
            width: this.defaultWidth,
            sortable: this.defaultSortable
        }, this.defaults);

        this.config = config;
        this.lookup = {};

        for(i = 0, len = config.length; i < len; i++){
            c = Ext.applyIf(config[i], this.defaults);
            // if no id, create one using column's ordinal position
            if(Ext.isEmpty(c.id)){
                c.id = i;
            }
            if(!c.isColumn){
                var Cls = Ext.grid.Column.types[c.xtype || 'gridcolumn'];
                c = new Cls(c);
                config[i] = c;
            }
            this.lookup[c.id] = c;
        }
        if(!initial){
            this.fireEvent('configchange', this);
        }
    }
});

if (Ext.ux && Ext.ux.grid && Ext.ux.grid.LockingColumnModel) {
    Ext.override(Ext.ux.grid.LockingColumnModel, {
        getLockedCount : function(){
            for(var i = 0, len = this.config.length; i < len; i++){
                if(!this.isLocked(i)){
                    return i;
                }
            }
            return len;
        }
    });
}


// Temp fix for: http://www.extjs.com/forum/showthread.php?98659-3.2.1-Ext.dd.DragZone-doesn-t-clean-up-properly-when-using-containerScroll-true&p=465198#post465198
Ext.override(Ext.dd.DragZone, {
    destroy : Ext.dd.DragZone.prototype.destroy.createInterceptor(function() {
        if (this.containerScroll) {
            Ext.dd.ScrollManager.unregister(this.el);
        }
    })
});


// Some convenience methods, credit https://www.sencha.com/forum/showthread.php?81507-Get-Ext-version-number-in-more-easily-comparable-manner
Ext.getMajorVersion = function(){
      return Math.abs(this.version.split('.')[0]);
};
Ext.getMinorVersion = function(){
      return Math.abs(this.version.split('.')[1]);
};
Ext.getRevision = function(){
      return Math.abs(this.version.split('.')[2]);
};

// Fix onBlur bug in SpinnerField
// http://www.sencha.com/forum/showthread.php?97878-OPEN-905-Ext.ux.form.SpinnerField-change-event-does-not-fire&p=461703
if (Ext.ux && Ext.ux.form && Ext.ux.form.SpinnerField && Ext.ux.form.SpinnerField.prototype.onBlur === Ext.emptyFn) {
    Ext.ux.form.SpinnerField.prototype.onBlur = Ext.ux.form.SpinnerField.superclass.onBlur;
}


Ext.ns('Sch');


Sch.ColumnFactory = {
    
    years:new Date().format('Y'),
    defaults : {
        align : 'center',
        menuDisabled : true,
        hideable : false,
        resizable : false,
        sortable : false,
        headerCls : 'sch-timeheader '
    },
    
    
    createColumns : function (startDate, endDate, type, defaults) {
        if (startDate > endDate || !this.columnConstructors[type]) {
            throw 'Invalid parameters passed to createColumns';
        }
        
        return this.columnConstructors[type].call(this, startDate, endDate, defaults);
    },
    
    
    createColumnsInternal : function(start, end, interval, headerRenderer, skipFn, defaults) {
        var cols = [],
            cursor = start.clone(),
            intervalEnd,
            colCfg;
        
        if (typeof skipFn !== "function") {
            defaults = skipFn;
            skipFn = null;
        }
            
        while (cursor < end) {
            if (typeof interval == "number") {
                intervalEnd = cursor.add(Date.SECOND, interval);
            } else {
                intervalEnd = cursor.add(interval, 1);
            }
            
            if (!skipFn || skipFn.call(this, cursor, intervalEnd) !== true) {
                colCfg = Ext.apply({
                    start : cursor,
                    end : intervalEnd
                }, defaults, this.defaults);
                
                headerRenderer.call(this, cursor, intervalEnd, colCfg);
                cols.push(colCfg);
            }
            cursor = intervalEnd;
        }
        return cols;
    },
    
    
    headerRenderers : {
        
        minute : function(start, end, cfg) {
            cfg.header = start.format('i');
        },
        
        quarterMinute : function(start, end, cfg) {
            cfg.headerCls += 'sch-quarterminuteheader';
            cfg.header = '<table class="quarterMinuteIndicator" cellpadding="0" cellspacing="0"><tr><td>00</td><td>15</td><td>30</td><td>45</td></tr></table>';
        },
        
        hourMinute : function(start, end, cfg) {
            cfg.header = start.format('H:i');
        },
        
        day : function(start, end, cfg) {
            cfg.header = String.format('{0} {1}/{2}', Date.getShortDayName([start.getDay()]), start.getDate(), start.getMonth() + 1);
        },
        days : function(start, end, cfg){
            cfg.header =this.count;
        },
        
        fulldate : function(start, end, cfg) {
            cfg.header = start.format('d F Y');
        },
        
        dayLetter : function(start, end, cfg) {
            cfg.headerCls += 'sch-dayheadercell-' + start.getDay();
            cfg.header = Date.dayNames[start.getDay()].substring(0,1);
        },
        
        dayNumber : function(start, end, cfg) {
            cfg.headerCls += 'sch-dayheadercell-' + start.getDay();
            cfg.header = start.getDate();
        },
        
        dayHours : function(start, end, cfg) {
            cfg.headerCls += 'sch-dayheader';
            cfg.header = '<table class="hourIndicator" cellpadding="0" cellspacing="0"><tr><td></td><td>3</td><td>6</td><td>9</td><td>12</td><td>15</td><td>18</td><td>21</td></tr></table>';
        },
        
        week : function(start, end, cfg) { 
            cfg.headerCls += 'sch-weekheader';
            var w = start.getWeekOfYear(),
                y = (w === 1 && start.getMonth() > 0) ? (start.getFullYear() + 1) : start.getFullYear();
            cfg.header = ((w < 10) ? ('0' + w) : w);
        },
        
        weekMonthYear : function(start, end, cfg) { 
            cfg.headerCls += 'sch-weekheader';
            var w = start.getWeekOfYear();
            cfg.header = 'w.' + ((w < 10) ? '0' : '') + w + ' ' + Date.getShortMonthName(start.getMonth()) + ' ' + start.getFullYear();
        },
        
        dayNumbers : function() {
            var dayTemplate = new Ext.XTemplate('<table class="sch-dayIndicator" cellpadding="0" cellspacing="0"><tr class="days">' + 
                '<tpl for="."><td class="sch-dayheadercell-{dayOfWeek}">{dayNumber}</td></tpl>' + 
                '</tr></table>').compile();
            
            return function(start, end, cfg) {
                cfg.headerCls += 'sch-daytableheader';
                var vals = [],
                    nbrDays = Math.round(Date.getDurationInDays(start, end)),
                    dt = start.clone();
                
                for (var i = 0; i < nbrDays; i++) {
                    vals.push({
                        dayOfWeek : dt.getDay(),
                        dayNumber : dt.getDate()
                    });
                    dt = dt.add(Date.DAY, 1);
                }
                
                cfg.header = dayTemplate.apply(vals);
            };
        }(),
        
        dayLetters : function() {
            var dayTemplate = new Ext.XTemplate('<table class="sch-dayIndicator" cellpadding="0" cellspacing="0"><tr class="days">' + 
                '<tpl for="."><td class="sch-dayheadercell-{dayOfWeek} {cls}">{dayLetter}</td></tpl>' + 
                '</tr></table>').compile();
            
            return function(start, end, cfg) {
                cfg.headerCls += 'sch-daytableheader';
                var vals = [],
                    nbrDays = Math.round(Date.getDurationInDays(start, end)),
                    dt = start.clone();
                
                for (var i = 0; i < nbrDays; i++) {
                    vals.push({
                        dayOfWeek : dt.getDay(),
                        dayLetter : Date.dayNames[dt.getDay()].substring(0,1)
                    });
                    dt = dt.add(Date.DAY, 1);
                }
                
                vals[0].cls = 'sch-headercell-first';
                vals[vals.length-1].cls = 'sch-headercell-last';
                
                cfg.header = dayTemplate.apply(vals);
            };
        }(),
        
        month : function(start, end, cfg) {
            cfg.headerCls += 'sch-monthheader';
            cfg.header = String.format('{0} {1}', Date.getShortMonthName(start.getMonth()), start.getFullYear());
        },
        months : function(start, end, cfg) {
            cfg.headerCls += 'sch-monthheader';
            var d=Date.getShortMonthName(start.getMonth());
            var y=start.getFullYear();
            var f=(y-this.years)*12+1;
            var n=start.getMonth()+f;
            cfg.header = String.format('{0}',n+" 个月");
        },
        
        monthDays : function(start, end, cfg) {
            cfg.headerCls += 'sch-monthheader';
            cfg.header = String.format('{0} {1}', Date.getShortMonthName(start.getMonth()), start.getFullYear());
        },
        
        quarter : function(start, end, cfg) {
            cfg.headerCls += 'sch-quarterheader';
            cfg.header = String.format('Q{0} {1}', Math.floor(start.getMonth() / 3) + 1, start.getFullYear());
        },
        
        year : function(start, end, cfg) {
            cfg.headerCls += 'sch-yearheader';
            cfg.header = start.getFullYear();
        }
    },
    
    
    count : 0,
    columnConstructors : {
        minute : function(startDate, endDate, defaults) {
            var cols = this.createColumnsInternal(startDate, endDate, Date.MINUTE, this.headerRenderers.hourMinute, defaults);
            
            return {
                columns : cols
            };
        },
        
        quarterMinutes : function(startDate, endDate, defaults) {
            var cols = this.createColumnsInternal(startDate, endDate, Date.HOUR, this.headerRenderers.quarterMinute, defaults);
            
            return {
                columns : cols,
                rows : [
                    Sch.ColumnFactory.rowConstructors.day.call(this, startDate, endDate),
                    Sch.ColumnFactory.rowConstructors.hour.call(this, startDate, endDate)
                ]
            };
        },
        
        hour : function(startDate, endDate, defaults) {
            var cols = this.createColumnsInternal(startDate, endDate, Date.HOUR, this.headerRenderers.hourMinute, defaults);
            
            return {
                columns : cols
            };
        },
        
        hourAndDay : function(startDate, endDate, defaults) {
            var cols = this.createColumnsInternal(startDate, endDate, Date.HOUR, this.headerRenderers.hourMinute, defaults);
            
            return {
                columns : cols,
                rows : [
                    Sch.ColumnFactory.rowConstructors.day.call(this, startDate, endDate)
                ]
            };
        },
        
        dayAndHours : function(startDate, endDate, defaults) {
            startDate.clearTime();
            endDate.clearTime();
            
            var cols = this.createColumnsInternal(startDate, endDate, Date.DAY, this.headerRenderers.dayHours, defaults);
            
            return {
                columns : cols,
                rows : [
                    Sch.ColumnFactory.rowConstructors.day.call(this, startDate, endDate)
                ]
            };
        },
        
        
        
        dayNoWeekends : function(startDate, endDate, defaults) {
            startDate.clearTime();
            endDate.clearTime();
            
            var cols = this.createColumnsInternal(startDate, endDate, Date.DAY, this.headerRenderers.day, function(start, end) {
                var d = start.getDay();
                return d === 0 || d === 6;
            }, defaults);
            
            return {
                columns : cols
            };
        },
        
        day : function(startDate, endDate, defaults) {
            startDate.clearTime();
            endDate.clearTime();
            
            var cols = this.createColumnsInternal(startDate, endDate, Date.DAY, this.headerRenderers.day, defaults);
            
            return {
                columns : cols
            };
        },
        
        days : function(startDate, endDate, defaults) {
            startDate.clearTime();
            endDate.clearTime();
            var cols = this.createColumnsInternals(startDate, endDate, Date.DAY,
                    this.headerRenderers.days, defaults);
            return {
                columns : cols
            };
        },
        
        dayAndWeeks : function(startDate, endDate, defaults) {
            startDate.clearTime();
            endDate.clearTime();
            
            var cols = this.createColumnsInternal(startDate, endDate, Date.DAY, this.headerRenderers.dayNumber, defaults);
            
            return {
                columns : cols,
                rows : [
                    Sch.ColumnFactory.rowConstructors.week.call(this, startDate, endDate, this.headerRenderers.week)
                ]
            };
        },
       
        dayAndMonths : function(startDate, endDate, defaults) {
            startDate.clearTime();
            endDate.clearTime();
            
            var cols = this.createColumnsInternal(startDate, endDate, Date.DAY, this.headerRenderers.dayNumber, defaults);
            
            return {
                columns : cols,
                rows : [
                    Sch.ColumnFactory.rowConstructors.month.call(this, startDate, endDate, this.headerRenderers.month)
                ]
            };
        },
        
        dayWeekAndMonths : function(startDate, endDate, defaults) {
            startDate.clearTime();
            endDate.clearTime();
            
            // Make sure we are dealing with an even number of weeks
            endDate = startDate.add(Date.WEEK, Math.round(Date.getDurationInDays(startDate, endDate)/7));
            
            var cols = this.createColumnsInternal(startDate, endDate, Date.WEEK, this.headerRenderers.dayNumbers, defaults);
            
            return {
                columns : cols,
                rows : [
                    Sch.ColumnFactory.rowConstructors.month.call(this, startDate, endDate, this.headerRenderers.month),
                    Sch.ColumnFactory.rowConstructors.week.call(this, startDate, endDate, this.headerRenderers.week)
                ]
            };
        },
        
        week : function(startDate, endDate, defaults) {
            startDate.clearTime();
            endDate.clearTime();
            
            // Make sure we are dealing with an even number of weeks
            endDate = startDate.add(Date.WEEK, Math.round(Date.getDurationInDays(startDate, endDate)/7));
            
            var cols = this.createColumnsInternal(startDate, endDate, Date.WEEK, this.headerRenderers.week, defaults);
            
            return {
                columns : cols
            };
        },
        
        weekAndMonths : function(startDate, endDate, defaults) {
            startDate.clearTime();
            endDate.clearTime();
            
            // Make sure we are dealing with an even number of weeks
            endDate = startDate.add(Date.WEEK, Math.round(Date.getDurationInDays(startDate, endDate)/7));
            
            var cols = this.createColumnsInternal(startDate, endDate, Date.WEEK, this.headerRenderers.week, defaults);
            
            return {
                columns : cols,
                rows : [
                    Sch.ColumnFactory.rowConstructors.month.call(this, startDate, endDate)
                ]
            };
        },
        
        weekAndDays : function(startDate, endDate, defaults) {
            startDate.clearTime();
            endDate.clearTime();
            
            // Make sure we are dealing with an even number of weeks
            endDate = startDate.add(Date.WEEK, Math.round(Date.getDurationInDays(startDate, endDate)/7));
            
            var cols = this.createColumnsInternal(startDate, endDate, Date.WEEK, this.headerRenderers.dayNumbers, defaults);
                
            return {
                columns : cols,
                rows : [
                    Sch.ColumnFactory.rowConstructors.week.call(this, startDate, endDate, this.headerRenderers.weekMonthYear)
                ]
            };
        },
        
        weekAndDayLetters : function(startDate, endDate, defaults) {
            startDate.clearTime();
            endDate.clearTime();
            
            // Make sure we are dealing with an even number of weeks
            endDate = startDate.add(Date.WEEK, Math.round(Date.getDurationInDays(startDate, endDate)/7));
            
            var cols = this.createColumnsInternal(startDate, endDate, Date.WEEK, this.headerRenderers.dayLetters, defaults);
                
            return {
                columns : cols,
                rows : [
                    Sch.ColumnFactory.rowConstructors.week.call(this, startDate, endDate, this.headerRenderers.fulldate)
                ]
            };
        },
        
        month : function(startDate, endDate, defaults) {
            startDate.clearTime();
            endDate.clearTime();
            
            startDate.setDate(1);
            
            // Make sure we deal with a whole number of months
            if (endDate.getDate() !== 1) {
                endDate.setDate(1);
                endDate = endDate.add(Date.MONTH, 1);
            }
            
            var cols = this.createColumnsInternal(startDate, endDate, Date.MONTH, this.headerRenderers.month, defaults);
            
            return {
                columns : cols
            };
        },
        
        monthAndDays : function(startDate, endDate, defaults) {
            startDate.clearTime();
            endDate.clearTime();
            
            startDate.setDate(1);
            
            // Make sure we deal with a whole number of months
            if (endDate.getDate() !== 1) {
                endDate.setDate(1);
                endDate = endDate.add(Date.MONTH, 1);
            }
            var cols = this.createColumnsInternal(startDate, endDate, Date.MONTH, this.headerRenderers.dayNumbers, defaults);
            
            return {
                columns : cols,
                rows : [
                    Sch.ColumnFactory.rowConstructors.fullmonth.call(this, startDate, endDate)
                ]
            };
        },
         monthAndDayss : function(startDate, endDate, defaults) {
            startDate.clearTime();
            endDate.clearTime();
            startDate.setDate(1);
            if (endDate.getDate() !== 1) {
                endDate.setDate(1);
                endDate.add(Date.MONTH, 1);
            }
            var cols = this.createColumnsInternal(startDate, endDate,
                    Date.MONTH, this.headerRenderers.dayNumbers, defaults);
            return {
                columns : cols
                ,
                rows : [Sch.ColumnFactory.rowConstructors.months.call(this,
                        startDate, endDate)]
            };
        },
        
        monthAndQuarters : function(startDate, endDate, defaults) {
            startDate.clearTime();
            endDate.clearTime();
            
            startDate.setDate(1);
            
            // Make sure we deal with a whole number of months
            if (endDate.getDate() !== 1) {
                endDate.setDate(1);
                endDate = endDate.add(Date.MONTH, 1);
            }
            
            var cols = this.createColumnsInternal(startDate, endDate, Date.MONTH, this.headerRenderers.month, defaults);
            
            return {
                columns : cols,
                rows : [
                    Sch.ColumnFactory.rowConstructors.quarter.call(this, startDate, endDate)
                ]
            };
        },
        
        quarter : function(startDate, endDate, headerRenderer) {
            startDate.clearTime();
            endDate.clearTime();
            
            // Make sure we deal with a whole number of quarters
            startDate = new Date(startDate.getFullYear(), Math.floor(startDate.getMonth() / 3) * 3, 1);
            
            // Make sure we deal with a whole number of quarters
            endDate = new Date(endDate.getFullYear(), Math.floor(endDate.getMonth() / 3) * 3, 1).add(Date.QUARTER, 1);
            
            var cols = this.createColumnsInternal(startDate, endDate, Date.QUARTER, this.headerRenderers.month, defaults);
            
            return {
                columns : cols
            };
        },
        
        year : function(startDate, endDate, defaults) {
            startDate.clearTime();
            startDate.setMonth(0);
            startDate.setDate(1);
            
            var cols = this.createColumnsInternal(startDate, endDate, Date.YEAR, this.headerRenderers.year, defaults);
            
            return {
                columns : cols
            };
        }
    },
    
    
    rowConstructors : {
        hour : function(startDate, endDate, headerRenderer) {
            var spanHours = Date.getDurationInHours(startDate, endDate),
                cols = [],
                dt,
                i,
                cfg,
                intervalEnd;
            
            for (i = 0; i < spanHours; i++) {
                dt = startDate.add(Date.HOUR, i);
                intervalEnd = dt.add(Date.HOUR, 1);
                
                cfg = Ext.applyIf({
                    width : 1 / spanHours,
                    align : 'center',
                    start : dt,
                    end : intervalEnd
                }, Sch.ColumnFactory.defaults);
                
                (headerRenderer || this.headerRenderers.hourMinute).call(this, dt, intervalEnd, cfg);
                
                cols.push(cfg);
            }
            
            return cols;
        },
        
        day : function(startDate, endDate, headerRenderer) {
            var intervalDuration = endDate - startDate,
                cols = [],
                dt = startDate,
                i,
                cfg,
                intervalEnd;
            
            while (dt < endDate) {
                intervalEnd = Date.min(dt.add(Date.DAY, 1).clearTime(), endDate);
                
                cfg = Ext.applyIf({
                    width : (intervalEnd - dt) / intervalDuration,
                    align : 'center',
                    start : dt,
                    end : intervalEnd
                }, Sch.ColumnFactory.defaults);
                
                (headerRenderer || this.headerRenderers.day).call(this, dt, intervalEnd, cfg);
                
                cols.push(cfg);
                dt = intervalEnd;
            }
            
            return cols;
        },
        
        // Works only with a whole number of weeks
        week : function(startDate, endDate, headerRenderer) {
            var cols = [],
                i = 0,
                spanDays = Math.round(Date.getDurationInDays(startDate, endDate)),
                width,
                cursor = startDate.clone(),
                cfg,
                intervalEnd;
            
            while (cursor < endDate) {
                if (i === 0) {
                    width = Math.round(Date.getDurationInDays(startDate, startDate.add(Date.WEEK, 1))) / spanDays;
                } else {
                    width = Math.min(7, Math.round(Date.getDurationInDays(cursor, endDate))) / spanDays;
                }
                
                intervalEnd = cursor.add(Date.WEEK, 1);
                
                cfg = Ext.applyIf({
                    width : width,
                    align : 'center',
                    start : cursor,
                    end : intervalEnd
                }, Sch.ColumnFactory.defaults);
                
                (headerRenderer || this.headerRenderers.week).call(this, cursor, intervalEnd, cfg);
                
                cols.push(cfg);
                
                i++;
                cursor = cursor.add(Date.WEEK, 1);
            }
            
            return cols;
        },
        
        
        
        weekNoWeekends : function(startDate, endDate, headerRenderer) {
            var cols = [],
                i = 0,
                spanDays = Math.round(Date.getDurationInBusinessDays(startDate, endDate)),
                width,
                cursor = startDate.clone(),
                cfg,
                nbrDays,
                intervalEnd;
            
            while (cursor < endDate) {
                if (i === 0) {
                    nbrDays = 6 - cursor.getDay();
                } else {
                    nbrDays = Date.getDurationInBusinessDays(cursor, Date.min(endDate, cursor.add(Date.DAY, 5))); 
                }
                
                intervalEnd = cursor.add(Date.WEEK, 1);

                cfg = Ext.applyIf({
                    width : nbrDays / spanDays,
                    align : 'center',
                    start : cursor,
                    end : intervalEnd
                }, Sch.ColumnFactory.defaults);
                
                (headerRenderer || this.headerRenderers.week).call(this, cursor, intervalEnd, cfg);
                
                cols.push(cfg);
                
                i++;
                cursor = cursor.add(Date.DAY, nbrDays + 2);
            }
            
            return cols;
        },
        
        month : function(startDate, endDate, headerRenderer) {
            var intervalDuration = Math.round(Date.getDurationInDays(startDate, endDate)),
                cols = [],
                dt = startDate,
                i,
                cfg,
                intervalEnd;
            
            while (dt < endDate) {
                intervalEnd = Date.min(new Date(dt.add(Date.MONTH, 1).setDate(1)), endDate);
                
                cfg = Ext.applyIf({
                    width : Math.round(Date.getDurationInDays(dt, intervalEnd)) / intervalDuration,
                    align : 'center',
                    start : dt,
                    end : intervalEnd
                }, Sch.ColumnFactory.defaults);
                
                (headerRenderer || this.headerRenderers.day).call(this, dt, intervalEnd, cfg);
                
                cols.push(cfg);
                dt = intervalEnd;
            }
            
            return cols;
        },
         months : function(startDate, endDate, headerRenderer) {
            var spanMonths = Date.getDurationInMonths(startDate, endDate), cols = [], dt, i, cfg, intervalEnd;
            for (i = 0; i < spanMonths; i++) {
                dt = startDate.add(Date.MONTH, i);
                intervalEnd = dt.add(Date.MONTH, 1);
                cfg = Ext.applyIf({
                            width : 1 / spanMonths,
                            align : 'center',
                            start : dt,
                            end : intervalEnd
                        }, Sch.ColumnFactory.defaults);
                (headerRenderer || this.headerRenderers.months).call(this, dt,
                        intervalEnd, cfg);
                cols.push(cfg);
            }
            return cols;
        },
                
        fullmonth : function(startDate, endDate, headerRenderer) {
            var spanMonths = Date.getDurationInMonths(startDate, endDate),
                cols = [],
                dt,
                i,
                cfg,
                intervalEnd;
            
            for (i = 0; i < spanMonths; i++) {
                dt = startDate.add(Date.MONTH, i);
                intervalEnd = dt.add(Date.MONTH, 1);
                
                cfg = Ext.applyIf({
                    width : 1 / spanMonths,
                    align : 'center',
                    start : dt,
                    end : intervalEnd
                }, Sch.ColumnFactory.defaults);
                
                (headerRenderer || this.headerRenderers.month).call(this, dt, intervalEnd, cfg);
                cols.push(cfg);
            }
            
            return cols;
        },
        
        // For use with the month column type, and only for a whole number of months
        quarter : function(startDate, endDate, headerRenderer) {
            var startQuarter = Math.floor(startDate.getMonth() / 3) + 1,
                endQuarter = Math.floor(endDate.getMonth() / 3) + 1,
                spanQuarters = 4 * (endDate.getYear() - startDate.getYear()) + (endQuarter - startQuarter),
                spanMonths = Date.getDurationInMonths(startDate, endDate),
                startMonth = startDate.getMonth(),
                endMonth = endDate.getMonth(),
                firstDateOfStartQuarter = new Date(startDate.getFullYear(), Math.floor(startMonth / 3) * 3, 1),
                cols = [],
                dt = startDate.clone(),
                i,
                width,
                cfg,
                intervalEnd;
            
            // TODO clean up
            if (startQuarter === endQuarter && startDate.getYear() === endDate.getYear()) {
                spanQuarters = 1;
            }
            else {
                if (endDate.getMonth() % 3 === 0 && startDate.getMonth() % 3 > 0) {
                    spanQuarters--;
                }
                
                if ((startDate.getMonth() % 3 > 0 || endDate.getMonth() % 3 > 0))
                {
                    spanQuarters++;
                }
            }
            
            dt = firstDateOfStartQuarter;
            
            for (i = 0; i < spanQuarters; i++) {
                
                if (i === 0) {
                    width = Date.getDurationInMonths(startDate, Date.min(firstDateOfStartQuarter.add(Date.MONTH, 3), endDate)) / spanMonths;
                } else if (i === spanQuarters - 1) {
                    width = Date.getDurationInMonths(dt, endDate) / spanMonths;
                } else {
                    width = Date.getDurationInMonths(dt, dt.add(Date.MONTH, 3)) / spanMonths;
                }
                intervalEnd = dt.add(Date.MONTH, 3);
                
                cfg = Ext.applyIf({
                    width : width,
                    align : 'center',
                    start : dt,
                    end : intervalEnd
                }, Sch.ColumnFactory.defaults);
                
               (headerRenderer || this.headerRenderers.quarter).call(this, dt, intervalEnd, cfg);
                cols.push(cfg);
                
                dt = dt.add(Date.MONTH, 3);
            }
            
            return cols;
        }
    }
};

 
Ext.ns('Sch');



Sch.SchedulerPanel = Ext.extend(Ext.grid.GridPanel, {
    
    tooltipTpl : null,
    
    
    resizeHandles : 'right',
    
    
    enableEventDragDrop : true,
    
    
    enableDragCreation : true,
    
    
    startParamName : 'start',
    
     
    endParamName : 'end',
    
    
    allowOverlap : true,
    
   
    columnLines : true,

    
   
    
     
   
    dndValidatorFn : function(dragRecords, targetResourceRecord, date, duration, e) {
        return true;
    },
    
    
    resizeValidatorFn : function(resourceRecord, eventRecord, startDate, endDate, e) {
        return true;
    },
    
    
    createValidatorFn : function(resourceRecord, startDate, endDate, e) {
        return true;
    },
    
    
    validatorFnScope : null,
    
    
    eventRenderer : Ext.emptyFn,
    
    
    // The width of the left + right border of your event, needed to calculate the correct start/end positions
    eventBorderWidth : 2,
    
    
    
    
    
    
    timeColumnDefaults : {},
    
    
    trackMouseInTimeHeader : false,
    
    
    overClass : 'sch-event-hover',
    
    
    timeCellRenderer : Ext.emptyFn,
    
    // private
    resizeHandleHtml : '<div class="x-resizable-handle x-resizable-handle-{0}"></div>',
    
    
    getEventRecordFromElement : function(el) {
        var element = Ext.get(el);
        if (!element.is(this.eventSelector)) {
            element = element.up(this.eventSelector);
        }
        return this.getEventRecordFromDomId(element.id);
    },
    
    
    getEventRecordFromDomId : function(id) {
        var trueId = this.getEventIdFromDomNodeId(id);
        return this.eventStore.getAt(this.eventStore.findBy(function(r){return trueId == r.id; }));
    },
    
    
    getEventIdFromDomNodeId : function(id) {
        return id.substring(this.eventPrefix.length);
    },
    
    
    getElementFromEventId : function(id) {
        return Ext.get(this.eventPrefix + id);
    },
    
    
    getElementFromEventRecord : function(record) {
        return this.getElementFromEventId(record.id);
    },
    
    
    getXFromDate : function(date) {
       var cm = this.getColumnModel(),
           count = cm.getColumnCount();
           
       for (var i = this.nbrStaticColumns; i < count; i++) {
            if (date <= this.getColumnEnd(i)) {
                var diff = date - this.getColumnStart(i),
                    timeInColumn = this.getColumnEnd(i) - this.getColumnStart(i);
                    
                return this.view.getAccColumnWidth(i) + (diff * cm.getColumnWidth(i) / timeInColumn);
            } 
       }
       
       return -1;
    },
    
    
    getTimeFromDomEvent : function(e, floorOrRound, depth) {
        return this.getTimeFromX(e.getTarget('.sch-timetd', depth || this.view.cellSelectorDepth),
                                 e.getPageX(),
                                 floorOrRound);
    },
    
    
    getTimeFromX : function(timeCell, x, roundingMethod) {
        var colIndex = typeof timeCell === 'number' ? (timeCell + this.nbrStaticColumns) : this.view.getCellIndex(timeCell);
        
        if (colIndex < 0 || colIndex === false) return null;
        
        var colWidth = this.getColumnModel().getColumnWidth(colIndex),   
            cellStart = this.getColumnStart(colIndex),
            availableTimeInCell = Date.getDurationInMinutes(cellStart, this.getColumnEnd(colIndex)),
            diffX = x - (this.view.mainBody.getX() + this.view.getAccColumnWidth(colIndex)),
            diffInMinutes = (availableTimeInCell * diffX / colWidth);
        
        if (roundingMethod) {
            var viewResolution = this.getViewResolution();
            diffInMinutes = Math[roundingMethod](diffInMinutes / viewResolution) * viewResolution;
        }
        
        return cellStart.add(Date.MINUTE, diffInMinutes);
    },
    
    
    // Method to get time from just an x coordinate
    getTimeFromX2 : function(x, roundingMethod) {
        var cm = this.getColumnModel(),
            timeColWidth = cm.getColumnWidth(this.nbrStaticColumns),
            v = this.getView();   
        
        x -= (v.mainBody.getX() + v.getAccColumnWidth(this.nbrStaticColumns));
        
        if (x < 0) return;
        
        var nbrTimeCols = Math.floor(x / timeColWidth),
            diffX = x - (nbrTimeCols * timeColWidth),
            colIndex = nbrTimeCols + this.nbrStaticColumns,
            colCount = cm.getColumnCount();
        
        if (colIndex > colCount) {
            return;
        } else if (colIndex === colCount) {
            return this.getEnd();
        }
        
        var cellStart = this.getColumnStart(colIndex),
            availableTimeInCell = Date.getDurationInMinutes(cellStart, this.getColumnEnd(colIndex)),
            diffInMinutes = (availableTimeInCell * diffX / timeColWidth);
            
        if (roundingMethod) {
            var viewResolution = this.getViewResolution();
            diffInMinutes = Math[roundingMethod](diffInMinutes / viewResolution) * viewResolution;
        }
        
        return cellStart.add(Date.MINUTE, diffInMinutes);
    },
    
    //private
    roundDate : function(date) {
        return date.round(this.viewBehaviour.timeResolution);
    },
    
    //private
    floorDate : function(date) {
        return date.floor(this.viewBehaviour.timeResolution);
    },
    
    
    setEventTemplate : function(template) {
        this.eventTemplate = template;
    },
    
    
    setEventRenderer : function(fn) {
        this.eventRenderer = fn;
    },
    
    
    getSelectedRecords : function(){
        var r = [], s = this.getSelectionModel().selected.elements;
        for(var i = 0, len = s.length; i < len; i++){
            r[r.length] = this.getEventRecordFromDomId(s[i].id);
        }
        return r;
    },
    
    
    getFormattedDate : function(date, roundingMethod) {
        var vb = this.viewBehaviour;
        return date[roundingMethod || 'floor'](vb.timeResolution).format(vb.dateFormat);
    },
    
    
    getFormattedEndDate : function(date, roundingMethod) {  
        var vb = this.viewBehaviour;
        return (vb.timeResolution === 1440 && date.getHours() === 0 ? date.add(Date.DAY, -1) : date)[roundingMethod || 'floor'](vb.timeResolution).format(vb.dateFormat);
    },
    
    
    setView : function(startDate, endDate, columnType, viewBehaviour, renderer, timeColumnDefaults) {
        this.setViewInternal(startDate, endDate, columnType, viewBehaviour, renderer, timeColumnDefaults);
    },
    
    // private
    eventSelector : '.sch-event',
    
    // private
    // returns the current view time resolution defined in the view behaviour object (in minutes)
    getViewResolution : function() {
        return this.viewBehaviour.timeResolution;
    },
    
    //private helper
    getRowIndex : function(t) {
        return this.view.findRowIndex(t);
    },
    
    // private
    constructor : function(config) {
        this.addEvents(
            
            'eventclick', 
            
            
            'eventdblclick', 
            
            
            'eventcontextmenu', 
            
            
            'beforetooltipshow',
            
            
            'beforeviewchange',
            
             
            'viewchange',
            
            
            'timeheaderdblclick',
            
            
             
            // Resizing events start --------------------------
            
            'beforeresize', 
            
            
            'resizestart', 
            
            
            'partialresize', 
            
            
            'afterresize',
            // Resizing events end --------------------------
            
            // Dnd events start --------------------------
             
            'beforednd', 
            
            
            'dndstart',
            
            
            'drop',
            
            
            'afterdnd',
            // Dnd events end --------------------------
            
            // Drag create events start --------------------------
            
            'beforedragcreate', 
            
            
            'dragcreatestart', 
        
            
            'dragcreateend',
            
            
            'afterdragcreate'
            // Drag create events end --------------------------
            );
        
        config = config || {};
        
        // Normalize to array
        if(config.plugins && !Ext.isArray(config.plugins)){
            config.plugins = [config.plugins];
        }
        
        Ext.applyIf(config, {
            plugins : []
        });
        
        Ext.apply(this, config);
        
        if (!this.eventTemplate) {
            this.eventTemplate = new Ext.Template(
                '<div id="{id}" style="width:{width}px;left:{leftOffset}px;{style}" class="sch-event {cls}">',
                    (this.resizeHandles === 'both' || this.resizeHandles === 'left') ? String.format(this.resizeHandleHtml, 'west') : '',

                    '<div class="sch-event-inner">{text}</div>',
                    
                    // The html that makes up the resize handle
                    (this.resizeHandles === 'both' || this.resizeHandles === 'right') ? String.format(this.resizeHandleHtml, 'east') : '',
                '</div>'
            ).compile();
        }
        
        this.configureFunctionality();
        Sch.SchedulerPanel.superclass.constructor.call(this, config);
    },
    
    getView : function(){
        if(!this.view){
            this.view = new Sch.SchedulerView(this.viewConfig);
        }
        return this.view;
    },
    
    // private
    initComponent : function() {
        
        Ext.apply(this.timeColumnDefaults, {
            // Assign a default renderer to be used by all time column cells
            renderer : this.internalRenderer,
            
            // Scope of the internal renderer must be the schedulerpanel itself
            scope : this
        });
        
        // Required to be able to have multiple schedulers running at the same time, to not risk having multiple items in the DOM with the same id
        this.eventPrefix = Ext.id() + '-';
        
        if (this.autoViews && this.autoViews.length > 0) {
             this.eventStore.on({
                beforeload : this.onBeforeStoreLoad,
                scope : this
            });
            
            // If the store has a proxy, intercept its request method
            if (this.eventStore.proxy.request) {
              // Setup new view after a store load operation is initiated
              this.eventStore.proxy.request = this.eventStore.proxy.request.createInterceptor(function(a, b, params) {
                this.reconfigureInternal(params);
              }, this);
            } else if (this.eventStore.proxy.load) {
              // Ext 2.x intercept load method instead
              this.eventStore.proxy.load = this.eventStore.proxy.load.createInterceptor(function(params) {
                this.reconfigureInternal(params);
              }, this);
            }
        }
     
        this.on({
            afterrender : this.onRender_,
            beforedestroy : this.onBeforeDestroy_,
            dndstart : this.onDragDropStart,
            afterdnd : this.onDragDropEnd,
            dragcreatestart : this.onDragCreateStart,
            afterdragcreate : this.onAfterDragCreate,
            headerdblclick : this.onHeaderDoubleClick,
            
            cellclick : function(g, r, c, e) {
                var t = e.getTarget(this.eventSelector);
                if (t) {
                    this.fireEvent('eventclick', this, this.getEventRecordFromDomId(t.id), t, e);
                }
            },
            celldblclick : function(g, r, c, e) {
                var t = e.getTarget(this.eventSelector);
                if (t) {
                    this.fireEvent('eventdblclick', this, this.getEventRecordFromDomId(t.id), e);
                }
            },
            cellcontextmenu : function(g, r, c, e) {
                var t = e.getTarget(this.eventSelector);
                if (t) {
                    this.fireEvent('eventcontextmenu', this, this.getEventRecordFromDomId(t.id), e);
                }
            },
            scope : this
        });
        
        if(!this.selModel && !this.disableSelection){
            this.selModel = new Sch.EventSelectionModel();
        }
        
        Sch.SchedulerPanel.superclass.initComponent.call(this);
        var cm = this.getColumnModel();
        this.nbrStaticColumns = cm.getColumnCount();
        
        // Initialize the cm to handle multiple row headers
        Ext.applyIf(cm, { rows : [] });
        
        this.on('render', function() {
            this.el.addClass('sch-schedulerpanel');
        }, this);
        
    },
    
    configureFunctionality : function() {
        var plugs = this.plugins,
            vfScope = this.validatorFnScope || this;
        
        if (this.resizeHandles !== 'none' && !this.resizePlug) {
            this.resizePlug = new Sch.plugins.Resize({
                validatorFn : function(resourceRecord, eventRecord, startDate, endDate) {
                    return (this.allowOverlap || this.isDateRangeAvailable(startDate, endDate, eventRecord.id, resourceRecord.get('Id'))) && 
                            this.resizeValidatorFn.apply(vfScope, arguments);
                },
                validatorFnScope : this
            });
            
            plugs.push(this.resizePlug);
        }
        
        if (this.enableEventDragDrop !== false && !this.dragdropPlug) {
                
            this.dragdropPlug = new Sch.plugins.DragDrop({
                validatorFn : function(dragRecords, targetResourceRecord, date, duration, e) {
                    return (this.allowOverlap || this.isDateRangeAvailable(date, date.add(Date.MINUTE, duration), dragRecords[0].id, targetResourceRecord.get('Id'))) && 
                           this.dndValidatorFn.apply(vfScope, arguments);
                },
                validatorFnScope : this
            });
            
            plugs.push(this.dragdropPlug);
        }
        
        if (this.enableDragCreation !== false && !this.dragCreatePlug) {
            this.dragCreatePlug = new Sch.plugins.DragCreator({
                validatorFn : function(resourceRecord, startDate, endDate) {
                    return (this.allowOverlap || this.isDateRangeAvailable(startDate, endDate, null, resourceRecord.get('Id'))) && 
                            this.createValidatorFn.apply(vfScope, arguments);
                },
                validatorFnScope : this
            });
            
            plugs.push(this.dragCreatePlug);
        }
    },
    
    // private
    reconfigureInternal : function(params) {
        var startDate = params[this.startParamName],
            endDate = params[this.endParamName],            
            timeSpan = Math.floor(Date.getDurationInDays(startDate, endDate)),
            i = 0;
        
        // Find the appropriate view by iterating the views array and comparing the requested timespan
        // to the timeSpan configured in the views arrays
        for (i = 0; i < this.autoViews.length; i++) {
            if (timeSpan <= this.autoViews[i].timeSpan) {
                break;
            }
        }
        var viewCfg = this.autoViews[Math.min(i, this.autoViews.length - 1)];
        
        this.setViewInternal(params[this.startParamName], params[this.endParamName], viewCfg.columnType, viewCfg.viewBehaviour, viewCfg.renderer);
    }, 
     
    // private, clean up
    onBeforeDestroy_ : function() {
        if (this.tip)  this.tip.destroy();
        if (this.eventStore.autoDestroy) this.eventStore.destroy();
    },
    
    // private
    onRender_ : function(g) {
        // Prevent moving time columns
        var view = this.getView();
        if (view.columnDrag) {  
            view.columnDrag.onBeforeDrag = function(data, e) {
                return !e.getTarget('.sch-timeheader');
            };
        }
        
        if (this.tooltipTpl) {
            this.setupTooltip();
        }
        
        if (this.viewModel) {
            var v = this.viewModel;
            this.setView(v.start, v.end, v.columnType, v.viewBehaviour, v.renderer);
        }
        
        if(this.overClass){
            this.mon(this.getView().mainBody, {
                "mouseover": this.onMouseOver,
                "mouseout": this.onMouseOut,
                scope:this
            });
        }
    },
    
    tipCfg : {
        mouseOffset : [5,-50],
        cls : 'sch-tip',
        trackMouse: true,
        showDelay:1000,
        autoHide : false,
        width : Ext.isIE ? 140 : undefined
    },
    
    // private
    setupTooltip : function() {
        var v = this.getView(),
            tipCfg = Ext.apply({
                renderTo: Ext.getBody(),
                delegate: this.eventSelector,
                target: v.mainBody,
                listeners: {
                    beforeshow : {
                        fn : function (tip) {
                            if (!tip.triggerElement.id) return false;
                            
                            var eRec = this.getEventRecordFromDomId(tip.triggerElement.id);
                            
                            if (!eRec || this.fireEvent('beforetooltipshow', this, eRec) === false) return false;
                            
                            tip.update(this.tooltipTpl.apply(eRec.data));
                            
                            return true;
                        },
                        scope : this
                    }
                }
            }, this.tipCfg);
        var a=new Ext.ToolTip(tipCfg);
        a.trackMouse=true;
        a.mouseOffset=[0,-60];
        this.tip = a;
        
//        this.tip = new Ext.ToolTip(tipCfg);
    },
    
    // Convenience method to load a date span
    loadInterval : function(start, end) {
        var params = {};
        params[this.startParamName] = start;
        params[this.endParamName] = end;
        this.eventStore.load({
            params : params
        });
    },
    
    // private
    onBeforeStoreLoad : function(store, options) {
        if (this.tip) {
            this.tip.hide();
        }
    },
   
    // private
    setViewInternal : function(startDate, endDate, columnType, viewBehaviourConstructor, renderer, timeColumnDefaults) {
        var cm = this.getColumnModel();
        
        timeColumnDefaults = timeColumnDefaults || this.timeColumnDefaults;
        
        this.fireEvent('beforeviewchange', this);
        viewBehaviourConstructor = viewBehaviourConstructor || Sch.ViewBehaviour.Base;
        
        if (renderer) {
            this.setEventRenderer(renderer);
        }
        if (!this.viewBehaviour) {
            this.viewBehaviour = new viewBehaviourConstructor(this);
        } else if (viewBehaviourConstructor && !(this.viewBehaviour instanceof viewBehaviourConstructor)) {
            // Destroy old view behaviour
            this.viewBehaviour.destroy();
            
            this.viewBehaviour = new viewBehaviourConstructor(this);
        }
        
        // Save column type to be able to call setView using only start/end date, reusing all other configuration data
        this.columnType = columnType || this.columnType;
        
        // Create new time columns
        var columnConfig = Sch.ColumnFactory.createColumns(startDate, endDate, this.columnType, timeColumnDefaults);
        
        if (columnConfig.rows) {
            if (this.nbrStaticColumns > 0) {
                Ext.each(columnConfig.rows, function(a) {
                    a.unshift({colspan : this.nbrStaticColumns});
                }, this);
            }
        }
        
        Ext.apply(cm, {
		    rows: columnConfig.rows || []
	    });
        
        var staticColumns = cm.config.slice(0, this.nbrStaticColumns);
        
        // Append the new time columns to the columns supplied at create-time
        cm.setConfig(staticColumns.concat(columnConfig.columns), false, true);
        
        this.fireEvent('viewchange', this);
   },
    
    // private
    internalRenderer : function(v, m, rec, row, col, ds, events) {
        var cellResult = '',
            grid = this,
            viewStart = grid.getStart(),
            viewEnd = grid.getEnd(),
            cm = grid.getColumnModel(),
            colWidth = cm.getColumnWidth(col),
            colStart = grid.getColumnStart(col),
            colEnd = grid.getColumnEnd(col);
        
        // Call timeCellRenderer to be able to set css/style properties on grid cells
        grid.timeCellRenderer.call(this, events, m, rec, row, col, ds, colStart, colEnd);
        
        // Iterate events (belonging to current row) passed by the schedulerview
        events.each(function(event) {
            var start = event.get('StartDate'),
                end = event.get('EndDate'),
                startsInsideCell = start.betweenLesser(colStart, colEnd);
            
            // Determine if the event should be rendered or not
            if (startsInsideCell || (col == grid.nbrStaticColumns && start < colStart && end > colStart)) {
                
                var availableTimeInColumn = Date.getDurationInMinutes(colStart, colEnd),
                    endsOutsideView = end > viewEnd,
                    leftOffset = (Date.getDurationInMinutes(colStart, startsInsideCell ? start : colStart) / availableTimeInColumn) * colWidth,
                    itemWidth = grid.getXFromDate(Date.min(end, viewEnd)) - grid.getXFromDate(startsInsideCell ? start : viewStart);
                
                // Get event data from user supplied "eventRenderer" 
                var eventData = grid.eventRenderer.call(this, event, rec, row, col, ds) || {};
                
                // Apply scheduler specific properties
                Ext.apply(eventData, {
                    id : grid.eventPrefix + event.id,
                    cls : (eventData.cls || '') + (event.dirty ? ' sch-dirty' : '') + (endsOutsideView ? ' sch-event-endsoutside ' : '') + (startsInsideCell ? '' : ' sch-event-startsoutside'),
                    width : Math.max(1, Ext.isBorderBox ? itemWidth : itemWidth - grid.eventBorderWidth),
                    leftOffset : leftOffset
                });
                
                eventData.text = eventData.text || '&#160;';
                cellResult += grid.eventTemplate.apply(eventData);
            }
        }, this);
        
        m.css += ' sch-timetd';
        
        // Z-index is trouble in IE, thanks Condor for this fix
        if (Ext.isIE) {
            m.attr += ' style="z-index:' + (cm.getColumnCount() - col) + '"';
        }
        return cellResult;
    },
    
    
    getStart : function() {
        return this.getColumnStart(this.nbrStaticColumns);
    },
    
    
    getEnd : function() {
        return this.getColumnEnd(this.getColumnModel().getColumnCount() - 1);
    },
    
    
    getViewBehaviour : function() {
        return this.viewBehaviour;
    },
    
    
    getColumnStart : function(index) {
        return this.getColumnModel().config[index].start;
    },
    
    
    getColumnEnd : function(index) {
        return this.getColumnModel().config[index].end;
    },
    
    onMouseOver : function(e){
        var item = e.getTarget(this.eventSelector, this.view.cellSelectorDepth);
        if(item && item !== this.lastItem){
            this.lastItem = item;
            Ext.fly(item).addClass(this.overClass);
        }
    },
    
    onMouseOut : function(e){
        if(this.lastItem){
            if(!e.within(this.lastItem, true, true)){
                Ext.fly(this.lastItem).removeClass(this.overClass);
                delete this.lastItem;
            }
        }
    },
    
    onDragDropStart : function() {
        if (this.dragCreatePlug) {
            this.dragCreatePlug.setDisabled(true);
        }
        
        if (this.tip) {
            this.tip.hide();
            this.tip.disable();
        }
    },
    
    onDragDropEnd : function() {
        if (this.dragCreatePlug) {
            this.dragCreatePlug.setDisabled(false);
        }
        
        if (this.tip) {
            this.tip.enable();
        }
    },
    
    onDragCreateStart : function() {
        if (this.tip) {
            this.tip.hide();
            this.tip.disable();
        }
    },
    
    onAfterDragCreate : function() {
        if (this.tip) {
            this.tip.enable();
        }
    },
    
    getResourceByEventRecord : function(eventRecord) {
        return this.store.getById(eventRecord.get('ResourceId'));
    },
    
    onHeaderDoubleClick : function(g, colIndex, e) {
         var t = e.getTarget('.sch-timeheader');
         
         if (!t) return;
         
         var isGroupRow = !!t.className.match('ux-grid-hd-group-cell'),
             headerCfg,
             cm = g.getColumnModel(),
             isLockingView = Sch.LockingSchedulerView && (this.view instanceof Sch.LockingSchedulerView);
            
        if (isGroupRow) {
            var rowGroupIndex = g.getView().getHeaderGroupRow(e.getTarget('.x-grid3-hd'));
            if (isLockingView && cm.getLockedCount() > 0) {
                // Add one for locking scenario since first one is the locked header
                headerCfg = cm.rows[rowGroupIndex][colIndex + 1];
            } else {
                headerCfg = cm.rows[rowGroupIndex][colIndex - this.nbrStaticColumns + 1];
            }
        } else {
            headerCfg = cm.config[colIndex];
        }
        
        this.fireEvent('timeheaderdblclick', this, headerCfg.start, headerCfg.end, e);
    },
    
    // protected
    getResourceRecordByElement : function(t) {
        var retval = null,
            index = this.getView().findRowIndex(t);
        if (index >= 0) {
            retval = this.store.getAt(index);
        }
        return retval;
    },
    
    
    isDateRangeAvailable : function(start, end, eventId, resourceId) {
        var available = true;
        this.eventStore.each(function(r) {
            if (Date.intersectSpans(start, end, r.get('StartDate'), r.get('EndDate')) && (resourceId === r.get('ResourceId') && (!eventId || eventId !== r.id))){
                available = false;
                return false;
            }
        });
        return available;
    },
    
    
    getEventsInView : function() {
        var viewStart = this.getStart(),
            viewEnd = this.getEnd();
            
        return this.eventStore.queryBy(function(event) {
            var eventStart = event.get('StartDate'),
                eventEnd = event.get('EndDate');
            
            return Date.intersectSpans(eventStart, eventEnd, viewStart, viewEnd);
        });
    }
}); 

Ext.reg('scheduler', Sch.SchedulerPanel);




 
Ext.ns('Sch');




// This component reuses all methods defined on the SchedulerPanel while inheriting from the EditorGridPanel
(function() {
    var schedulerPrototype = Sch.SchedulerPanel.prototype;
    
    Sch.EditorSchedulerPanel = Ext.extend(Ext.grid.EditorGridPanel, {
        
        tooltipTpl : schedulerPrototype.tooltipTpl,
        
        
        resizeHandles : schedulerPrototype.resizeHandles,
        
         
        enableEventDragDrop : schedulerPrototype.enableEventDragDrop,
        
        
        enableDragCreation : schedulerPrototype.enableDragCreation,
        
        
        startParamName : schedulerPrototype.startParamName,
        
        
        endParamName : schedulerPrototype.endParamName,
        
        
        
        
        
        
        allowOverlap : true,
        
       
        timeColumnDefaults : schedulerPrototype.timeColumnDefaults,
      
       
        dndValidatorFn : schedulerPrototype.dndValidatorFn,
        
        
        resizeValidatorFn : schedulerPrototype.resizeValidatorFn,
        
        
        createValidatorFn : schedulerPrototype.createValidatorFn,
        
        
        validatorFnScope : null,
        
        // The width of the left + right border of your event, needed to calculate the correct start/end positions
        eventBorderWidth : 2,
        
        columnLines : true,

        
        
        
        
        
        trackMouseInTimeHeader : schedulerPrototype.trackMouseInTimeHeader,
        
        
        overClass : schedulerPrototype.overClass,
        
        
     
        
        eventRenderer : Ext.emptyFn,
        
        timeCellRenderer : schedulerPrototype.timeCellRenderer,
        
        // private
        resizeHandleHtml : schedulerPrototype.resizeHandleHtml,
        
        
        getEventRecordFromElement : schedulerPrototype.getEventRecordFromElement,
        
        
        getEventRecordFromDomId : schedulerPrototype.getEventRecordFromDomId,
        
        
        getEventIdFromDomNodeId : schedulerPrototype.getEventIdFromDomNodeId,
        
        
        getElementFromEventId : schedulerPrototype.getElementFromEventId,
        
        
        getElementFromEventRecord : schedulerPrototype.getElementFromEventRecord,
        
        
        getXFromDate : schedulerPrototype.getXFromDate,
        
        
        getTimeFromDomEvent : schedulerPrototype.getTimeFromDomEvent,
        
        
        getTimeFromX : schedulerPrototype.getTimeFromX,
        
        getTimeFromX2 : schedulerPrototype.getTimeFromX2,
        
        // private
        roundDate : schedulerPrototype.roundDate,
        
        // private
        floorDate : schedulerPrototype.floorDate,
        
        
        setEventTemplate : schedulerPrototype.setEventTemplate,
        
        
        setEventRenderer : schedulerPrototype.setEventRenderer,
        
        
        getSelectedRecords : schedulerPrototype.getSelectedRecords,
        
        
        getFormattedDate : schedulerPrototype.getFormattedDate,
        
        
        getFormattedEndDate : schedulerPrototype.getFormattedEndDate,
        
        
        setView : schedulerPrototype.setView,
        
        // private
        eventSelector : schedulerPrototype.eventSelector,
        
        // private
        // returns the current view time resolution defined in the view behaviour object (in minutes)
        getViewResolution : schedulerPrototype.getViewResolution,
        
        //private helper
        getRowIndex : schedulerPrototype.getRowIndex,
        
        // private
        constructor : function(config) {
            this.addEvents(
            
            'eventclick', 
            
            
            'eventdblclick', 
            
            
            'eventcontextmenu', 
            
            
            'beforetooltipshow',
            
            
            'beforeviewchange',
            
             
             'viewchange',
            
            
            'timeheaderdblclick',
            
            // Resizing events start --------------------------
            
            'beforeresize', 
            
            
            'partialresize', 
            
            
            'afterresize',
            // Resizing events end --------------------------
            
            // Dnd events start --------------------------
             
            'beforednd', 
            
            
            'dndstart',
            
            
            'drop',
            
            
            'afterdnd',
            // Dnd events end --------------------------
            
            // Drag create events start --------------------------
            
            'beforedragcreate', 
            
            
            'dragcreatestart', 
        
            
            'dragcreateend',
            
            
            'afterdragcreate'
            // Drag create events end --------------------------
            );

            config = config || {};
            
            // Normalize to array
            if(config.plugins && !Ext.isArray(config.plugins)){
                config.plugins = [config.plugins];
            }
            
            Ext.applyIf(config, {
                plugins : []
            });
            
            Ext.apply(this, config);
            
            if (!config.eventTemplate) {
                config.eventTemplate =  new Ext.Template(
                    '<div id="{id}" style="width:{width}px;left:{leftOffset}px;{style}" class="sch-event {cls}">',
                        // The html that makes up the left resize handle
                        (this.resizeHandles === 'both' || this.resizeHandles === 'left') ? String.format(this.resizeHandleHtml, 'west') : '',

                        '<div class="sch-event-inner">{text}</div>',
                    
                        // The html that makes up the right resize handle
                        (this.resizeHandles === 'both' || this.resizeHandles === 'right') ? String.format(this.resizeHandleHtml, 'east') : '',
                    '</div>'
                ).compile();
            }
            
            this.configureFunctionality();
            Sch.EditorSchedulerPanel.superclass.constructor.call(this, config);
        },
        
        getView : schedulerPrototype.getView,
        
        // private
        initComponent : function() {
            
            Ext.apply(this.timeColumnDefaults, {
                // Assign a default renderer to be used by all time column cells
                renderer : this.internalRenderer,
                
                // Scope of the internal renderer must be the schedulerpanel itself
                scope : this
            });
        
            // Required to be able to have multiple schedulers running at the same time, to not risk having multiple items in the DOM with the same id
            this.eventPrefix = Ext.id() + '-';
            
            if (this.autoViews && this.autoViews.length > 0) {
                 this.eventStore.on({
                    beforeload : this.onBeforeStoreLoad,
                    scope : this
                });
                
                // If the store has a proxy, intercept its request method
                if (this.eventStore.proxy.request) {
                  // Setup new view after a store load operation is initiated
                  this.eventStore.proxy.request = this.eventStore.proxy.request.createInterceptor(function(a, b, params) {
                    this.reconfigureInternal(params);
                  }, this);
                } else if (this.eventStore.proxy.load) {
                  // Ext 2.x intercept load method instead
                  this.eventStore.proxy.load = this.eventStore.proxy.load.createInterceptor(function(params) {
                    this.reconfigureInternal(params);
                  }, this);
                }
            }
         
            this.on({
                afterrender : this.onRender_,
                beforedestroy : this.onBeforeDestroy_,
                dndstart : this.onDragDropStart,
                afterdnd : this.onDragDropEnd,
                dragcreatestart : this.onDragCreateStart,
                afterdragcreate : this.onAfterDragCreate,
                headerdblclick : this.onHeaderDoubleClick,
                cellclick : function(g, r, c, e) {
                    var t = e.getTarget(this.eventSelector);
                    if (t) {
                        this.fireEvent('eventclick', this, this.getEventRecordFromDomId(t.id), t, e);
                    }
                },
                celldblclick : function(g, r, c, e) {
                    var t = e.getTarget(this.eventSelector);
                    if (t) {
                        this.fireEvent('eventdblclick', this, this.getEventRecordFromDomId(t.id), e);
                    }
                },
                cellcontextmenu : function(g, r, c, e) {
                    var t = e.getTarget(this.eventSelector);
                    if (t) {
                        this.fireEvent('eventcontextmenu', this, this.getEventRecordFromDomId(t.id), e);
                    }
                },
                scope : this
            });
            
            if(!this.selModel && !this.disableSelection){
                this.selModel = new Sch.EventSelectionModel();
            }
            
            Sch.EditorSchedulerPanel.superclass.initComponent.call(this);
            var cm = this.getColumnModel();
            this.nbrStaticColumns = cm.getColumnCount();
            
            // Initialize the cm to handle multiple row headers
            Ext.applyIf(cm, { rows : [] });
            
            this.on('render', function() {
                this.el.addClass('sch-schedulerpanel');
            }, this);
            
        },
        
        configureFunctionality : schedulerPrototype.configureFunctionality,
        
        // private
        reconfigureInternal : schedulerPrototype.reconfigureInternal, 
         
        // private, clean up
        onBeforeDestroy_ : schedulerPrototype.onBeforeDestroy_,
        
        // private
        onRender_ : schedulerPrototype.onRender_,
        
        // private
        setupTooltip : schedulerPrototype.setupTooltip,
        
        // Convenience method to load a date span
        loadInterval : schedulerPrototype.loadInterval,
        
        // private
        onBeforeStoreLoad : schedulerPrototype.onBeforeStoreLoad,
       
        // private
        internalRenderer : schedulerPrototype.internalRenderer,
        
        
        getStart : schedulerPrototype.getStart,
        
        
        getEnd : schedulerPrototype.getEnd,
        
        getViewBehaviour : schedulerPrototype.getViewBehaviour,
        
        // private
        getColumnStart : schedulerPrototype.getColumnStart,
        
        // private
        getColumnEnd : schedulerPrototype.getColumnEnd,
        
        onMouseOver : schedulerPrototype.onMouseOver,
        
        onMouseOut : schedulerPrototype.onMouseOut,
        
        onDragDropStart : schedulerPrototype.onDragDropStart,
        
        onDragDropEnd : schedulerPrototype.onDragDropEnd,
        
        onDragCreateStart : schedulerPrototype.onDragCreateStart,
        
        onAfterDragCreate : schedulerPrototype.onAfterDragCreate,
        
        setViewInternal : schedulerPrototype.setViewInternal,
       
       getResourceByEventRecord : schedulerPrototype.getResourceByEventRecord,
       
       onHeaderDoubleClick : schedulerPrototype.onHeaderDoubleClick,
       
       getResourceRecordByElement : schedulerPrototype.getResourceRecordByElement,
       
       isDateRangeAvailable : schedulerPrototype.isDateRangeAvailable,
       
       getEventsInView : schedulerPrototype.getEventsInView
    }); 

    Ext.reg('editorscheduler', Sch.EditorSchedulerPanel);
})();

 
Ext.ns('Sch');


Sch.EventSelectionModel = function(config){
    Ext.apply(this, config);

    this.selected = new Ext.CompositeElementLite();

    this.addEvents(
        
	    "beforeeventselect",
       
        
	    "selectionchange"
    );

    Sch.EventSelectionModel.superclass.constructor.call(this);
};

Ext.extend(Sch.EventSelectionModel, Ext.grid.AbstractSelectionModel,  {
    
    multiSelect : false,
    
    
    selectedClass : 'sch-event-selected',
    
    
    clearSelectionsOnBlur : true,
    
    
    initEvents : function(){
        this.grid.on("eventclick", this.onEventClick, this);
        
        this.grid.getView().on({
            scope: this,
            refresh: this.onViewRefresh,
            rowupdated: this.onRowUpdated,
            beforerowremoved: this.clearSelections,
            beforerowsinserted: this.clearSelections
        });
        
        if (this.clearSelectionsOnBlur) {
            // Hide when clicking on an "non-event"-area
            this.grid.mon(Ext.getBody(), 'click', function(e){
                if (!e.getTarget(this.grid.eventSelector)) {
                  this.clearSelections();
                }
            }, this);
        }
    },
    
    deselectEvent : function(s, r) {
        this.deselect(this.grid.eventPrefix + r.id);
    },
    
    onRowUpdated : function(v, index, r){
        var count = this.selected.getCount(),
            resourceId = r.id;
        
        // Remove selected status after an item has been updated
        for (var i = count - 1; i >= 0; i--){
            var item = this.selected.item(i),
                eventRecord = this.grid.getEventRecordFromDomId(item.dom.id);
                
            // If an item is not found in the store or it is no longer in the DOM, unselect it
            if (!eventRecord || resourceId === eventRecord.get('ResourceId')) {
                this.selected.removeElement(item);
            }
        }
    },

	//private
    onViewRefresh : function(){
        this.clearSelections(true);
    },

    
    clearSelections : function(suppressEvent, skipUpdate){
        if(this.selected.getCount() > 0){
            if(!skipUpdate){
                this.selected.removeClass(this.selectedClass);
            }
            this.selected.clear();
            if(!suppressEvent){
                this.fireEvent("selectionchange", this, this.selected.elements);
            }
        }
    },

    
    hasSelection : function(){
        return this.selection ? true : false;
    },
    
    // private
    onEventClick : function(g, record, node, e){
        if(e.ctrlKey && this.isSelected(node)){
            this.deselect(node);
        }else{
            this.select(node, this.multiSelect);
        }
    },
    
    
    getSelectionCount : function(){
        return this.selected.getCount();
    },

    
    getSelectedNodes : function(){
        return this.selected.elements;
    },

    
    isSelected : function(node){
        return this.selected.contains(this.getNode(node).id);
    },

    
    deselect : function(nodeInfo){
        var node = this.getNode(nodeInfo);
        if(this.isSelected(node)){
            node = this.getNode(node);
            this.selected.removeElement(node);
            Ext.fly(node).removeClass(this.selectedClass);
            this.fireEvent("selectionchange", this, this.selected.elements);
        }
    },

    
    select : function(nodeInfo, keepExisting, suppressEvent){
        if(Ext.isArray(nodeInfo)){
            if(!keepExisting){
                this.clearSelections(true);
            }
            for(var i = 0, len = nodeInfo.length; i < len; i++){
                this.select(nodeInfo[i], true, true);
            }
            if(!suppressEvent){
                this.fireEvent("selectionchange", this, this.selected.elements);
            }
        } else{
            var node = this.getNode(nodeInfo);
            if(!keepExisting){
                this.clearSelections(true);
            }
            if(node && !this.isSelected(node)){
                if(this.fireEvent("beforeventselect", this, node, this.selected.elements) !== false){
                    Ext.fly(node).addClass(this.selectedClass);
                    this.selected.add(node);
                    if(!suppressEvent){
                        this.fireEvent("selectionchange", this, this.selected.elements);
                    }
                }
            }
        }
    },
    
    
    getNode : function(nodeInfo){
        if(typeof nodeInfo === 'string'){
            return document.getElementById(nodeInfo);
        }
        return nodeInfo;
    },
    
    // private, required for editing functionality when inheriting from EditorGridPanel
    onEditorKey : Ext.emptyFn
});

 
Ext.ns('Sch');


Sch.LazyResizable = function(el, config, direction, e){
    this.addEvents(
         
        'partialresize'
    );
    
    Sch.LazyResizable.superclass.constructor.apply(this, arguments);
    
    // Start the resizing instantly
    this.handleOver();
    this.onMouseDown(this[direction], e);
};

Ext.extend(Sch.LazyResizable, Ext.Resizable, {
    
    // Override to include beforeresize firing to possibly stop the execution
    startSizing : Ext.Resizable.prototype.startSizing.createInterceptor(function(e, handle) {
        return this.fireEvent('beforeresize', this, e) !== false;
    }),
    
    // Override to include partialresize firing
    resizeElement : function(e){
        var box = this.proxy.getBox(),
            oldWidth = this.el.getWidth();
        
        if (box.width !== oldWidth) {
            this.fireEvent('partialresize', this, box.width, oldWidth, e);
            
            if(this.updateBox){
                this.el.setBox(box, false, this.animate, this.duration, null, this.easing);
            }else{
                this.el.setSize(box.width, box.height, this.animate, this.duration, null, this.easing);
            }
            this.updateChildSize();
            if(!this.dynamic){
                this.proxy.hide();
            }
        }
        return box;
    },
    
    
    // Override to be able to pass 'e' as parameter to resizeElement function
    onMouseMove : function(e){
        if(this.enabled && this.activeHandle){
            try{// try catch so if something goes wrong the user doesn't get hung

            if(this.resizeRegion && !this.resizeRegion.contains(e.getPoint())) {
                return;
            }

            //var curXY = this.startPoint;
            var curSize = this.curSize || this.startBox,
                x = this.startBox.x, y = this.startBox.y,
                ox = x, 
                oy = y,
                w = curSize.width, 
                h = curSize.height,
                ow = w, 
                oh = h,
                mw = this.minWidth, 
                mh = this.minHeight,
                mxw = this.maxWidth, 
                mxh = this.maxHeight,
                wi = this.widthIncrement,
                hi = this.heightIncrement,
                eventXY = e.getXY(),
                diffX = -(this.startPoint[0] - Math.max(this.minX, eventXY[0])),
                diffY = -(this.startPoint[1] - Math.max(this.minY, eventXY[1])),
                pos = this.activeHandle.position,
                tw,
                th;
            
            switch(pos){
                case 'east':
                    w += diffX; 
                    w = Math.min(Math.max(mw, w), mxw);
                    break;
                case 'south':
                    h += diffY;
                    h = Math.min(Math.max(mh, h), mxh);
                    break;
                case 'southeast':
                    w += diffX; 
                    h += diffY;
                    w = Math.min(Math.max(mw, w), mxw);
                    h = Math.min(Math.max(mh, h), mxh);
                    break;
                case 'north':
                    diffY = this.constrain(h, diffY, mh, mxh);
                    y += diffY;
                    h -= diffY;
                    break;
                case 'west':
                    diffX = this.constrain(w, diffX, mw, mxw);
                    x += diffX;
                    w -= diffX;
                    break;
                case 'northeast':
                    w += diffX; 
                    w = Math.min(Math.max(mw, w), mxw);
                    diffY = this.constrain(h, diffY, mh, mxh);
                    y += diffY;
                    h -= diffY;
                    break;
                case 'northwest':
                    diffX = this.constrain(w, diffX, mw, mxw);
                    diffY = this.constrain(h, diffY, mh, mxh);
                    y += diffY;
                    h -= diffY;
                    x += diffX;
                    w -= diffX;
                    break;
               case 'southwest':
                    diffX = this.constrain(w, diffX, mw, mxw);
                    h += diffY;
                    h = Math.min(Math.max(mh, h), mxh);
                    x += diffX;
                    w -= diffX;
                    break;
            }
            var sw = this.snap(w, wi, mw);
            var sh = this.snap(h, hi, mh);
            
            if(sw != w || sh != h){
                switch(pos){
                    case 'northeast':
                        y -= sh - h;
                    break;
                    case 'north':
                        y -= sh - h;
                        break;
                    case 'southwest':
                        x -= sw - w;
                    break;
                    case 'west':
                        x -= sw - w;
                        break;
                    case 'northwest':
                        x -= sw - w;
                        y -= sh - h;
                    break;
                }
                w = sw;
                h = sh;
            }
            
            if(this.preserveRatio){
                switch(pos){
                    case 'southeast':
                    case 'east':
                        h = oh * (w/ow);
                        h = Math.min(Math.max(mh, h), mxh);
                        w = ow * (h/oh);
                       break;
                    case 'south':
                        w = ow * (h/oh);
                        w = Math.min(Math.max(mw, w), mxw);
                        h = oh * (w/ow);
                        break;
                    case 'northeast':
                        w = ow * (h/oh);
                        w = Math.min(Math.max(mw, w), mxw);
                        h = oh * (w/ow);
                    break;
                    case 'north':
                        tw = w;
                        w = ow * (h/oh);
                        w = Math.min(Math.max(mw, w), mxw);
                        h = oh * (w/ow);
                        x += (tw - w) / 2;
                        break;
                    case 'southwest':
                        h = oh * (w/ow);
                        h = Math.min(Math.max(mh, h), mxh);
                        tw = w;
                        w = ow * (h/oh);
                        x += tw - w;
                        break;
                    case 'west':
                        th = h;
                        h = oh * (w/ow);
                        h = Math.min(Math.max(mh, h), mxh);
                        y += (th - h) / 2;
                        tw = w;
                        w = ow * (h/oh);
                        x += tw - w;
                       break;
                    case 'northwest':
                        tw = w;
                        th = h;
                        h = oh * (w/ow);
                        h = Math.min(Math.max(mh, h), mxh);
                        w = ow * (h/oh);
                        y += th - h;
                        x += tw - w;
                        break;
                        
                }
            }
            this.proxy.setBounds(x, y, w, h);
            if(this.dynamic){
                this.resizeElement(e);
            }
            }catch(ex){}
        }
    }
});




Ext.ns('Sch');


Sch.SchedulerViewConfig = {
    // Increase depth for getTarget functionality
    cellSelectorDepth : 6,
    rowSelectorDepth : 11,
    
    init : function(grid){
        Sch.SchedulerView.superclass.init.apply(this, arguments);
        
        grid.on('columnresize', this.refreshView, this);
        grid.on('resize', this.refreshView, this);
        
        // Prevent user from dropping static columns among the time columns
        grid.on('afterrender', function() { 
            if (this.columnDrop) {
                Ext.apply(this.columnDrop, {
                    getTargetFromEvent : this.getTargetFromEvent
                });
            }
        },this);
    },
    
    // Prevent user from dropping static columns among the time columns
    getTargetFromEvent : function(e){
        var t = Ext.lib.Event.getTarget(e);
        var cindex = this.view.findCellIndex(t);
        
        if(cindex !== false && cindex < this.grid.nbrStaticColumns){
            return this.view.getHeaderCell(cindex);
        }
        return false;
    },

    onEventAdd : function(s, recs) {
        for (var i = 0; i < recs.length; i++) {
            var resource = this.grid.getResourceByEventRecord(recs[i]);
            if (resource) {
                this.refreshRow(resource);
            }
        }
    },
    
    onEventRemove : function(s, rec) {
        var el = this.grid.getElementFromEventRecord(rec);
        
        if (el) {
            el.fadeOut({
                remove : true,
                callback : function() {
                    var resource = this.grid.getResourceByEventRecord(rec);
                    if (resource) {
                        this.refreshRow(resource);
                    }
                },
                scope : this 
            });
        }
    },
    
    onEventUpdate : function(s, rec, operation, hashPrevious) { 
        var resource;
        
        if (hashPrevious && hashPrevious.ResourceId) {
            // If an event has been moved to a new row, refresh old row first
            resource = this.ds.getAt(this.ds.findExact('Id', hashPrevious.ResourceId));
            this.refreshRow(resource);
        }
        
        resource = this.grid.getResourceByEventRecord(rec);
        if (resource) {
            this.refreshRow(resource);
        }
    },
    
     
    refreshView : function (g) {
        if (this.grid.viewReady && this.grid.nbrStaticColumns < this.cm.getColumnCount()) {
            this.refresh(true);
        }
    },
    
    // Overridden to attach listeners to eventstore
    initData : function(ds, cm){
        Sch.SchedulerView.superclass.initData.apply(this, arguments);
        
        if(this.cm){
            this.cm.un('hiddenchange', this.refreshView, this);
        }
        if(cm){
           cm.on('hiddenchange', this.refreshView, this);
        }
        
        if(!this.es){
            this.es = this.grid.eventStore;
            this.es.on({
                scope: this,
                load: this.onLoad,
                datachanged: this.onDataChange,
                add: this.onEventAdd,
                update: this.onEventUpdate,
                remove: this.onEventRemove,
                clear: this.onClear
            });
        }
    },
    
    constructor : function(config){
        Ext.apply(this, config);
        
        if (config && config.forceFit) {
            this.refresh = this.refresh.createInterceptor(function(){this.fitColumns(true);});
        }
	    Sch.SchedulerView.superclass.constructor.call(this);    
    },
    
    // Override to add start/end dates to each column data object
    getColumnData : function(){
        // build a map for all the columns
        var cs = [], cm = this.cm, colCount = cm.getColumnCount();
        for(var i = 0; i < colCount; i++){
            var name = cm.getDataIndex(i);
            cs[i] = {
                name : name || '', 
                id : cm.getColumnId(i),
                style : this.getColumnStyle(i),
                renderer : cm.getRenderer(i),
                scope : cm.config[i].scope,
                
                start : cm.config[i].start,
                end : cm.config[i].end
            };
        }
        return cs;
    },
    
    // This function fits respects the original width of the static columns and
    // fits the time columns into the space that's left
    fitColumns : function(preventRefresh, onlyExpand, omitColumn){
        var cm = this.cm, i;
        var tw = cm.getTotalWidth(false);
        var aw = this.grid.getGridEl().getWidth(true)-this.getScrollOffset();

        if(aw < 20){ // not initialized, so don't screw up the default widths
            return;
        }
        var extra = aw - tw;

        if(extra === 0){
            return;
        }

        var vc = cm.getColumnCount(true);
        
        if(vc <= this.grid.nbrStaticColumns){ // not showing any time columns yet
            return;
        }
        
        var ac = vc-(typeof omitColumn == 'number' ? 1 : 0);
        if(ac === 0){
            ac = 1;
            omitColumn = undefined;
        }
         
        if(omitColumn ){
             cm.setColumnWidth(omitColumn, Math.max(1, cm.getColumnWidth(omitColumn)), true);
        }
        
        var colCount = cm.getColumnCount(),
            cols = [],
            extraCol = 0,
            width = 0,
            w,
            staticColumnsWidth = 0;
        
        // Calculate static columns total width
        for (i = 0; i < this.grid.nbrStaticColumns; i++){
            if(!cm.isHidden(i)){
                extraCol = i;
                w = i === omitColumn ? cm.getColumnWidth(i) : cm.config[i].width;
                cols.push(i);
                cols.push(w);
                staticColumnsWidth += w;
            }
        }
        
        var timeColumnWidth = (aw - staticColumnsWidth)/ (colCount - this.grid.nbrStaticColumns);
        
        for (i = this.grid.nbrStaticColumns; i < colCount; i++){
            cols.push(i);
            cols.push(timeColumnWidth);
        }
        
        while (cols.length){
            w = cols.pop();
            i = cols.pop();
            cm.setColumnWidth(i, Math.max(this.grid.minColumnWidth, Math.floor(w)), true);
        }
       
        if(preventRefresh !== true){
            this.updateAllColumnWidths();
        }
    },


    // private
    doRender : function(cs, rs, ds, startRow, colCount, stripe){
        var g = this.grid, ts = this.templates, ct = ts.cell, rt = ts.row, last = colCount-1;
        var tstyle = 'width:'+this.getTotalWidth()+';';
        // buffers
        var buf = [], cb, c, p = {}, rp = {tstyle: tstyle}, r, events;
        for(var j = 0, len = rs.length; j < len; j++){
            r = rs[j]; cb = [];
            var rowIndex = (j+startRow),
                resId = r.get('Id');
            
            // @Modification: Events for current row
            events = this.es.data.filterBy(function(brec) {
                return brec.data.ResourceId == resId;
            });
            
            for(var i = 0; i < colCount; i++){
                c = cs[i];
                p.id = c.id;
                p.css = i === 0 ? 'x-grid3-cell-first ' : (i == last ? 'x-grid3-cell-last ' : '');
                p.attr = p.cellAttr = "";
                
                // @Modification: Added events to param list
                p.value = c.renderer.call(c.scope || c, r.data[c.name], p, r, rowIndex, i, ds, events);
                p.style = c.style;
                
                cb[cb.length] = ct.apply(p);
            }
            var alt = [];
            if(stripe && ((rowIndex+1) % 2 === 0)){
                alt[0] = "x-grid3-row-alt";
            }
            if(r.dirty){
                alt[1] = " x-grid3-dirty-row";
            }
            rp.cols = colCount;
            if(this.getRowClass){
                alt[2] = this.getRowClass(r, rowIndex, rp, ds);
            }
            rp.alt = alt.join(" ");
            rp.cells = cb.join("");
            buf[buf.length] =  rt.apply(rp);
        }
        return buf.join("");
    },
    
    // @Modification: Added gcell for multiple header rows
    initTemplates : function(){
        this.templates = this.templates || {};
        var ts = this.templates;
        
        if (!ts.gcell) {
		    ts.gcell = new Ext.XTemplate(
				'<td class="x-grid3-hd x-grid3-gcell x-grid3-td-{id} ux-grid-hd-group-row-{row} {cls}" style="{style}">',
				'<div {tooltip} class="x-grid3-hd-inner x-grid3-hd-{id}" unselectable="on" style="{istyle}">',
				'{value}</div></td>'
			);
		}
			
        Sch.SchedulerView.superclass.initTemplates.call(this);
    },
    
    getTimeColumnWidth : function(widthFraction, totalWidthOfTimeColumns){
        var width = totalWidthOfTimeColumns * widthFraction;
        return (Ext.isBorderBox || (Ext.isWebKit && !Ext.isSafari2) ? width : (width - this.borderWidth > 0 ? width - this.borderWidth : 0));
    },
    
    getColumnHeaderCls : function(i, last) {
        var css = i === 0 ? 'x-grid3-cell-first ' : (i == last ? 'x-grid3-cell-last ' : '');
        return css + (this.cm.config[i].headerCls || '');
    },
    
    // Grouping header related functionality, based on Condors GroupHeaderGrid plugin
	renderHeaders : function() {

		var ts = this.templates, 
		         headers = [], 
		         cm = this.cm, 
		         rows = cm.rows, 
		         width, 
		         id, 
		         group, 
		         firstGroupWidth, 
		         tw = this.cm.getTotalWidth(), 
		         totalWidthOfTimeColumns,
		         i,
		         len,
		         gcol;
		         
		if (rows.length > 0) {
		    firstGroupWidth = this.getFirstGroupWidth.call(this, rows[0][0], 0);
		    totalWidthOfTimeColumns = tw - firstGroupWidth;
		    if (firstGroupWidth > 0 && !(Ext.isBorderBox || (Ext.isWebKit && !Ext.isSafari2))) {
		       totalWidthOfTimeColumns -= this.borderWidth;
		    }
		}
		
		for (var row = 0, rlen = rows.length; row < rlen; row++) {
			 var r = rows[row], cells = [], cls;
			
			for (i = 0, gcol = 0, len = r.length; i < len; i++) {
				group = r[i];
				id = this.getColumnId(group.dataIndex ? cm.findColumnIndex(group.dataIndex) : gcol);
				
				if (i === 0 && group.colspan) {
				    width = firstGroupWidth;
				    cls = '';
				} else {
				    width = this.getTimeColumnWidth(group.width, totalWidthOfTimeColumns);
				    cls = 'sch-timeheader ';
				}
				group.colspan = group.colspan || 1;
				
				cells[i] = ts.gcell.apply({
					cls: cls + (group.headerCls || '') + (group.header ? ' ux-grid-hd-group-cell' : ' ux-grid-hd-nogroup-cell'),
					id: id,
					row: row,
					style: 'width:' + width + 'px;' + (group.align ? 'text-align:' + group.align + ';' : ''),
					tooltip: group.tooltip ? (Ext.QuickTips.isEnabled() ? 'ext:qtip' : 'title') + '="' + group.tooltip + '"' : '',
					istyle: group.align == 'right' ? 'padding-right:16px' : '',
					btn: this.grid.enableHdMenu && group.header,
					value: (width > 10) ? (group.header || '&nbsp;') : '&nbsp;'
				});
				gcol += group.colspan;
			}
			headers[row] = ts.header.apply({
				tstyle: 'width:' + this.getTotalWidth(),
				cells: cells.join('')
			});
		}
		
		
		// The default column header rendering, overriden to be able to assign a css class to each header cell
        len = cm.getColumnCount();
        
        var ct = ts.hcell,
            cb = [], 
            p = {},
            last = len - 1;
            
        for(i = 0; i < len; i++){
            p.id = cm.getColumnId(i);
            p.value = cm.getColumnHeader(i) || '';
            p.style = this.getColumnStyle(i, true);
            p.tooltip = this.getColumnTooltip(i);
            p.css = this.getColumnHeaderCls(i, last);
            if(cm.config[i].align == 'right'){
                p.istyle = 'padding-right:16px';
            } else {
                delete p.istyle;
            }
            cb[cb.length] = ct.apply(p);
        }
		headers.push(ts.header.apply({cells: cb.join(''), tstyle:'width:'+this.getTotalWidth()+';'}));
		return headers.join('');
	},

	onColumnWidthUpdated : function(){
		Sch.SchedulerView.superclass.onColumnWidthUpdated.apply(this, arguments);
		this.updateGroupStyles.call(this);
	},

	onAllColumnWidthsUpdated : function(){
		Sch.SchedulerView.superclass.onAllColumnWidthsUpdated.apply(this, arguments);
		this.updateGroupStyles.call(this);
	},

	onColumnHiddenUpdated : function(){
		Sch.SchedulerView.superclass.onColumnHiddenUpdated.apply(this, arguments);
		this.updateGroupStyles.call(this);
	},

	getHeaderCell : function(index){
		return this.mainHd.query(this.cellSelector)[index];
	},

	findHeaderCell : function(el){
		return el ? this.fly(el).findParent('td.x-grid3-hd', this.cellSelectorDepth) : false;
	},

	findHeaderIndex : function(el){
		var cell = this.findHeaderCell(el);
		return cell ? this.getCellIndex(cell) : false;
	},

	updateSortIcon : function(col, dir){
		var sc = this.sortClasses;
		var hds = this.mainHd.select(this.cellSelector).removeClass(sc);
		hds.item(col).addClass(sc[dir == "DESC" ? 1 : 0]);
	},

	getFirstGroupWidth: function(group, gcol) {
		var width = 0, hidden = true, visCols = 0;
		for (var i = gcol, len = gcol + group.colspan; i < len; i++) {
			if (!this.cm.isHidden(i)) {
				var cw = this.cm.getColumnWidth(i);
				if(typeof cw == 'number'){
					width += cw;
				}
				hidden = false;
			}
		}
		return (Ext.isBorderBox || (Ext.isWebKit && !Ext.isSafari2)) ? width : Math.max(width - this.borderWidth, 0);
	},
	
	updateGroupStyles: function(col) {
		var tables = this.mainHd.query('.x-grid3-header-offset > table'), 
		             rows = this.cm.rows, 
		             firstGroupWidth, 
		             tw = this.cm.getTotalWidth(),
		             totalWidthOfTimeColumns = tw,
		             staticColumnsExist = (this.grid.nbrStaticColumns > 0);
		
		if (rows.length > 0 && staticColumnsExist) {
		    firstGroupWidth = this.getFirstGroupWidth.call(this, rows[0][0], 0);
		    totalWidthOfTimeColumns -= firstGroupWidth;
		    if (firstGroupWidth > 0 && !(Ext.isBorderBox || (Ext.isWebKit && !Ext.isSafari2))) {
		       totalWidthOfTimeColumns -= this.borderWidth;
		    }
		}
		
		for (var row = 0; row < tables.length; row++) {
			tables[row].style.width = tw + 'px';
			
			if (row < rows.length) {
				var cells = tables[row].firstChild.firstChild.childNodes;
				
				for (var i = 0, gcol = 0; i < cells.length; i++) {
					var group = rows[row][i];
					if ((typeof col != 'number') || (col >= gcol && col < gcol + (group.colspan || 0))) {
					    if (staticColumnsExist && i === 0) {
						    cells[i].style.width = firstGroupWidth + 'px';
					    } else {
				            width = this.getTimeColumnWidth(group.width, totalWidthOfTimeColumns);
					    	cells[i].style.width = width + 'px';
					    }
					}
				}
			}
		}
	},
	
	getAccColumnWidth : function(endCol) {
	    var w = 0,
            cm = this.cm,
            i;
             
        for (i = 0; i < endCol; i++) {
            if (!cm.isHidden(i)) {
                w += cm.getColumnWidth(i);
            }
        }
        
        return w;
	},
	
	updateTimeColumnWidths : function(width, suppressRefresh) {
        var cm = this.cm;
        for (var i = this.grid.nbrStaticColumns, l = cm.getColumnCount(); i < l; i++) {
	        cm.setColumnWidth(i, width, true);
	    }
	    
	    if (!suppressRefresh) {
	        this.refresh(true);
	    }
    },
    
    getHeaderGroupRow : function(cell) {
        var cls = cell.className, 
            retVal = -1;
        
        if (cls) {
            var m = cls.match(/ux-grid-hd-group-row-(\d+)/);
            if (m && m.length === 2) {
                retVal = parseInt(m[1], 10);
            }
        }
        return retVal;
    },
    
    onHeaderClick : Ext.grid.GridView.prototype.onHeaderClick.createInterceptor(function(g, index, e){
        // Block the default sort mechanism when clicking on a grouping header row
        return !e.getTarget('.ux-grid-hd-group-cell');
    }),
    
    // private, overwritten to be able to highlight header cell even though menu is disabled
    handleHdOver : function(e, t){
        var hd = this.findHeaderCell(t);
        if(hd && !this.headersDisabled){
            this.activeHdRef = t;
            this.activeHdIndex = this.getCellIndex(hd);
            var fly = this.fly(hd);
            this.activeHdRegion = fly.getRegion();
            if (this.activeHdIndex >= this.grid.nbrStaticColumns) {
                // Time column header cell
                if (this.grid.trackMouseInTimeHeader) {
                    fly.addClass('x-grid3-hd-over');
                    
                    if(!this.cm.isMenuDisabled(this.activeHdIndex)){
                        this.activeHdBtn = fly.child('.x-grid3-hd-btn');
                        if(this.activeHdBtn){
                            this.activeHdBtn.dom.style.height = (hd.firstChild.offsetHeight-1)+'px';
                        }
                    }
                }
            } else {
                if(!this.cm.isMenuDisabled(this.activeHdIndex)){
                    fly.addClass('x-grid3-hd-over');
                    this.activeHdBtn = fly.child('.x-grid3-hd-btn');
                    if(this.activeHdBtn){
                        this.activeHdBtn.dom.style.height = (hd.firstChild.offsetHeight-1)+'px';
                    }
                }
            }
        }
    },
    
    
    scrollEventIntoView : function(eventRec, highlight) {
        var el = this.grid.getElementFromEventRecord(eventRec);
        
        if (el) {
            el.scrollIntoView(this.scroller);
            
            if (highlight) {
                if (typeof highlight === "boolean") {
                    el.highlight();
                } else {
                    el.highlight(null, highlight);
                }
            }
        }
    },
    
    handleHdMove : Ext.grid.GridView.prototype.handleHdMove.createInterceptor(function(e){
        // Block the default resize mechanism for group header row cells
        return !e.getTarget('.ux-grid-hd-group-cell');
    })
};

// Adaptations for GridView changes in Ext 3.3
if (Ext.getMajorVersion() >= 3 && Ext.getMinorVersion() >= 3) {
    Ext.apply(Sch.SchedulerViewConfig, {
        refreshRow: function(record) {
            var store     = this.ds,
                colCount  = this.cm.getColumnCount(),
                columns   = this.getColumnData(),
                last      = colCount - 1,
                cls       = ['x-grid3-row'],
                rowParams = {
                    tstyle: String.format("width: {0};", this.getTotalWidth())
                },
                colBuffer = [],
                cellTpl   = this.templates.cell,
                rowIndex, row, column, meta, css, i;
            
            if (Ext.isNumber(record)) {
                rowIndex = record;
                record   = store.getAt(rowIndex);
            } else {
                rowIndex = store.indexOf(record);
            }
            
            
            if (!record || rowIndex < 0) {
                return;
            }
            
            // @Modification: Events for current row
            var resId = record.get('Id'),
                events = this.es.data.filterBy(function(brec) {
                return brec.data.ResourceId == resId;
            });
            
            for (i = 0; i < colCount; i++) {
                column = columns[i];
                
                if (i === 0) {
                    css = 'x-grid3-cell-first';
                } else {
                    css = (i == last) ? 'x-grid3-cell-last ' : '';
                }
                
                meta = {
                    id      : column.id,
                    style   : column.style,
                    css     : css,
                    attr    : "",
                    cellAttr: ""
                };
                
                meta.value = column.renderer.call(column.scope, record.data[column.name], meta, record, rowIndex, i, store, events);
                
                if (Ext.isEmpty(meta.value)) {
                    meta.value = '&#160;';
                }
                
                if (this.markDirty && record.dirty && typeof record.modified[column.name] != 'undefined') {
                    meta.css += ' x-grid3-dirty-cell';
                }
                
                colBuffer[i] = cellTpl.apply(meta);
            }
            
            row = this.getRow(rowIndex);
            row.className = '';
            
            if (this.grid.stripeRows && ((rowIndex + 1) % 2 === 0)) {
                cls.push('x-grid3-row-alt');
            }
            
            if (this.getRowClass) {
                rowParams.cols = colCount;
                cls.push(this.getRowClass(record, rowIndex, rowParams, store));
            }
            
            this.fly(row).addClass(cls).setStyle(rowParams.tstyle);
            rowParams.cells = colBuffer.join("");
            row.innerHTML = this.templates.rowInner.apply(rowParams);
            
            this.fireEvent('rowupdated', this, rowIndex, record);
        }
    });
}

Sch.SchedulerView = Ext.extend(Ext.grid.GridView, Sch.SchedulerViewConfig);


 
Ext.ns('Sch');


(function() {
    var lgvp = Ext.ux.grid.LockingGridView.prototype;
        
    Sch.LockingSchedulerView = Ext.extend(Sch.SchedulerView, {
	    lockText : lgvp.lockText,
	    unlockText : lgvp.unlockText,
	    rowBorderWidth : lgvp.rowBorderWidth,
	    lockedBorderWidth : lgvp.lockedBorderWidth,
	    getEditorParent : lgvp.getEditorParent,
	    initElements : lgvp.initElements,
	    getLockedRows : lgvp.getLockedRows,
	    getLockedRow : lgvp.getLockedRow,
	    getCell : lgvp.getCell,
	    addRowClass : lgvp.addRowClass,
	    removeRowClass : lgvp.removeRowClass,
	    removeRow : lgvp.removeRow,
	    removeRows : lgvp.removeRows,
	    syncScroll : lgvp.syncScroll,
	    updateSortIcon : lgvp.updateSortIcon,
	    updateAllColumnWidths : lgvp.updateAllColumnWidths,
	    updateColumnWidth : lgvp.updateColumnWidth,
	    updateColumnHidden : lgvp.updateColumnHidden,
	    processRows : lgvp.processRows,
	    afterRender : lgvp.afterRender,
	    renderUI : lgvp.renderUI,
	    getOffsetWidth : lgvp.getOffsetWidth,
	    getResolvedXY : lgvp.getResolvedXY,
	    syncFocusEl : lgvp.syncFocusEl,
	    ensureVisible : lgvp.ensureVisible,
	    insertRows : lgvp.insertRows,
        getColumnStyle : lgvp.getColumnStyle,
	    getLockedWidth : lgvp.getLockedWidth,
	    getTotalWidth : lgvp.getTotalWidth,
	    renderBody : lgvp.renderBody,
	    refreshRow : lgvp.refreshRow,
	    onDenyColumnLock : lgvp.onDenyColumnLock,
	    onColumnLock : lgvp.onColumnLock,
	    handleHdMenuClick : lgvp.handleHdMenuClick,
	    handleHdDown : lgvp.handleHdDown,
	    syncHeaderHeight : lgvp.syncHeaderHeight,
	    updateLockedWidth : lgvp.updateLockedWidth,

	    // Methods that are kept in full since SchedulerView implements them
	    // -----------------------
	    initData : function(ds, cm){
		    if(this.cm){
			    this.cm.un('columnlockchange', this.onColumnLock, this);
		    }
		    Sch.LockingSchedulerView.superclass.initData.call(this, ds, cm);
		    if(this.cm){
			    this.cm.on('columnlockchange', this.onColumnLock, this);
		    }
	    },
    	
	    // Ext Scheduler additions/overrides
	    // -----------------------
    	
	    
        scrollToTime : function(date, animate) {
            var x = this.grid.getXFromDate(date);
            if (x >= 0) {
                this.scroller.scrollTo('left', x, animate);
            }
        },
        
	    // Don't inherit this method from Sch.SchedulerView, as locking view has no need to fully refresh 
	    // itself after a schedulerpanel resize (since unlocked columns are not automatically fitted)
	    refreshView : Ext.emptyFn,
    	
	    layout : lgvp.layout,
    	
	    // Overridden to handle multiple row headers
	    getHeaderCell : function(index){
		    var llen = this.cm.getLockedCount();
		    if(index < llen){
			    return this.lockedHd.child('table:last').dom.getElementsByTagName('td')[index];
		    }
		    return Sch.LockingSchedulerView.superclass.getHeaderCell.call(this, index - llen);
	    },
    	
	    // Overridden to handle multiple rows
	    renderHeaders : function() {
	        var cm = this.cm,
			    ts = this.templates,
			    ct = ts.hcell,
			    cb = [], lcb = [],
			    p = {},
			    len = cm.getColumnCount(),
			    last = len - 1,
			    twValue = this.cm.getTotalWidth() - this.cm.getTotalLockedWidth(),
			    tw = twValue + 'px',
			    lw = this.getLockedWidth(),
			    lockedHeaders = '',
			    unlockedHeaders = '',
			    i;
    	    
	        // Process standard headers		
		    for(i = 0; i < len; i++){
			    p.id = cm.getColumnId(i);
			    p.value = cm.getColumnHeader(i) || '';
			    p.style = this.getColumnStyle(i, true);
			    p.tooltip = this.getColumnTooltip(i);
			    p.css = (i === 0 ? 'x-grid3-cell-first ' : (i == last ? 'x-grid3-cell-last ' : '')) +
                    (cm.config[i].headerCls ? ' ' + cm.config[i].headerCls : '');
			    if(cm.config[i].align == 'right'){
				    p.istyle = 'padding-right:16px';
			    } else {
				    delete p.istyle;
			    }
			    if(cm.isLocked(i)){
				    lcb[lcb.length] = ct.apply(p);
			    }else{
				    cb[cb.length] = ct.apply(p);
			    }
		    }
    		
	        // Process extra row headers		
		    var rows = cm.rows, width, id, group, widthString, gcol, nbrLocked = cm.getLockedCount(), headerRowGroupFirstColWidth = 0;
    		
		    // Special case: nbrLocked === 0 means no locked columns in the LockingView, e.g. all columns are scrollable
		    for (var row = 0, rlen = rows.length; row < rlen; row++) {
			    var r = rows[row], cells = [];
    		    
			    for (i = (nbrLocked > 0 ? 1 : 0), gcol = 0, len = r.length; i < len; i++) {
				    group = r[i];
				    group.colspan = group.colspan || 1;
				    id = gcol;
    				
				    if (i === 0) {
				        width = 0;
				        for (var k = 0; k < group.colspan; k++) {
				            width += cm.getColumnWidth(k);
				        }
				        headerRowGroupFirstColWidth = width;
                    } else {
				        width = (nbrLocked > 0 ? twValue : (twValue - headerRowGroupFirstColWidth)) * group.width;
                    }
                    
                    widthString = (Ext.isBorderBox || (Ext.isWebKit && !Ext.isSafari2) ? width : (width - this.borderWidth > 0 ? width - this.borderWidth : 0)) + 'px;';
    				
				    cells[i] = ts.gcell.apply({
					    cls: (i > 0 ? 'sch-timeheader ' : '') + (group.headerCls || '') + (group.header ? ' ux-grid-hd-group-cell' : ' ux-grid-hd-nogroup-cell'),
					    id: id,
					    row: row,
					    style: 'width:' + widthString + (group.align ? 'text-align:' + group.align + ';' : ''),
					    tooltip: group.tooltip ? (Ext.QuickTips.isEnabled() ? 'ext:qtip' : 'title') + '="' + group.tooltip + '"' : '',
					    istyle: group.align == 'right' ? 'padding-right:16px' : '',
					    btn: this.grid.enableHdMenu && group.header,
					    value: (width > 10) ? (group.header || '&nbsp;') : '&nbsp;'
				    });
				    gcol += group.colspan;
			    }
    			
			    unlockedHeaders += ts.header.apply({
				    tstyle: 'width:' + tw,
				    cells: cells.join('')
			    });
    			
			    if (nbrLocked > 0) {
			        lockedHeaders += ts.header.apply({
			            cells : ts.gcell.apply({
					        cls: 'x-grid3-cell-first x-grid3-cell-last ux-grid-hd-nogroup-cell',
					        value: '&nbsp;',
					        row: row,
			                id : 0,
				            style: 'width:' + lw
			            }),
			            tstyle:'width:'+lw+';'
			        });
			    }
		    }
    		
		    unlockedHeaders += ts.header.apply({cells: cb.join(''), tstyle:'width:'+tw+';'});
		    lockedHeaders += ts.header.apply({cells: lcb.join(''), tstyle:'width:'+this.getLockedWidth()+';'});
    		
		    return [
		        unlockedHeaders,
			    lockedHeaders
		    ];
	    },
    	
	    // Overridden to support multiple header rows
	    updateHeaders : function(){
		    var hd = this.renderHeaders();
		    this.innerHd.firstChild.innerHTML = hd[0];
		    this.innerHd.firstChild.style.width = this.getOffsetWidth();
    		
		    Ext.fly(this.innerHd.firstChild).select('>table').setWidth(this.getTotalWidth());
		    this.lockedInnerHd.firstChild.innerHTML = hd[1];
		    var lw = this.getLockedWidth();
		    this.lockedInnerHd.firstChild.style.width = lw;
		    Ext.fly(this.lockedInnerHd.firstChild).select('table').setWidth(lw);
	    },
    	
	    initTemplates : function(){
		    var ts = this.templates || {};
		    if(!ts.master){
			    ts.master = new Ext.Template(
				    '<div class="x-grid3" hidefocus="true">',
					    '<div class="x-grid3-locked">',
						    '<div class="x-grid3-header"><div class="x-grid3-header-inner"><div class="x-grid3-header-offset" style="{lstyle}">{lockedHeader}</div></div><div class="x-clear"></div></div>',
						    '<div class="x-grid3-scroller"><div class="x-grid3-body" style="{lstyle}">{lockedBody}</div><div class="x-grid3-scroll-spacer"></div></div>',
					    '</div>',
					    '<div class="x-grid3-viewport x-grid3-unlocked">',
						    '<div class="x-grid3-header"><div class="x-grid3-header-inner"><div class="x-grid3-header-offset" style="{ostyle}">{header}</div></div><div class="x-clear"></div></div>',
						    '<div class="x-grid3-scroller"><div class="x-grid3-body" style="{bstyle}">{body}</div><a href="#" class="x-grid3-focus" tabIndex="-1"></a></div>',
					    '</div>',
					    '<div class="x-grid3-resize-marker">&#160;</div>',
					    '<div class="x-grid3-resize-proxy">&#160;</div>',
				    '</div>'
			    );
		    }
		    this.templates = ts;
		    Sch.LockingSchedulerView.superclass.initTemplates.call(this);
	    },
    	
	    // Overridden to include start/end dates
	    getColumnData : function(){
		    var cs = [], cm = this.cm, colCount = cm.getColumnCount();
		    for(var i = 0; i < colCount; i++){
			    var name = cm.getDataIndex(i);
			    cs[i] = {
                    scope : cm.config[i].scope,
                    name : name || '', 
				    renderer : cm.getRenderer(i),
				    id : cm.getColumnId(i),
				    style : this.getColumnStyle(i),
				    locked : cm.isLocked(i),
    				
				    start : cm.config[i].start,
                    end : cm.config[i].end
			    };
		    }
		    return cs;
	    },
    	
	    doRender : function(cs, rs, ds, startRow, colCount, stripe){
		    var ts = this.templates, ct = ts.cell, rt = ts.row, last = colCount-1,
			    tstyle = 'width:'+this.getTotalWidth()+';',
			    lstyle = 'width:'+this.getLockedWidth()+';',
			    buf = [], lbuf = [], cb, lcb, c, p = {}, rp = {}, r, events, g = this.grid;
		    for(var j = 0, len = rs.length; j < len; j++){
			    r = rs[j]; cb = []; lcb = [];
			    var rowIndex = (j+startRow),
			        resId = r.get('Id');
    			
			    // @Modification: Events for current row
                events = this.es.data.filterBy(function(brec) {
                    return brec.data.ResourceId == resId;
                });
                
			    for(var i = 0; i < colCount; i++){
				    c = cs[i];
				    p.id = c.id;
				    p.css = (i === 0 ? 'x-grid3-cell-first ' : (i == last ? 'x-grid3-cell-last ' : '')) +
                        (this.cm.config[i].cellCls ? ' ' + this.cm.config[i].cellCls : '');
				    p.attr = p.cellAttr = '';
				    // @Modification: Added events to param list
                    p.value = c.renderer.call(c.scope || c, r.data[c.name], p, r, rowIndex, i, ds, events);
				    p.style = c.style;
				    if(Ext.isEmpty(p.value)){
					    p.value = '&#160;';
				    }
				    if(this.markDirty && r.dirty && Ext.isDefined(r.modified[c.name])){
					    p.css += ' x-grid3-dirty-cell';
				    }
				    if(c.locked){
					    lcb[lcb.length] = ct.apply(p);
				    }else{
					    cb[cb.length] = ct.apply(p);
				    }
			    }
			    var alt = [];
			    if(stripe && ((rowIndex+1) % 2 === 0)){
				    alt[0] = 'x-grid3-row-alt';
			    }
			    if(r.dirty){
				    alt[1] = ' x-grid3-dirty-row';
			    }
			    rp.cols = colCount;
			    if(this.getRowClass){
				    alt[2] = this.getRowClass(r, rowIndex, rp, ds);
			    }
			    rp.alt = alt.join(' ');
			    rp.cells = cb.join('');
			    rp.tstyle = tstyle;
			    buf[buf.length] = rt.apply(rp);
			    rp.cells = lcb.join('');
			    rp.tstyle = lstyle;
			    lbuf[lbuf.length] = rt.apply(rp);
		    }
		    return [buf.join(''), lbuf.join('')];
	    },
    	
	    // Overridden to support mouse over effect for grouping header rows
        handleHdOver : function(e, t){
            var hd = this.findHeaderCell(t) || e.getTarget('.ux-grid-hd-group-cell');
            if(hd && !this.headersDisabled){
                this.activeHdRef = t;
                this.activeHdIndex = this.getCellIndex(hd);
                var fly = this.fly(hd), 
                    isTimeHeaderCell = hd.className.match('sch-timeheader'),
                    menuDisabled = isTimeHeaderCell || this.cm.isMenuDisabled(this.activeHdIndex);
                    
                this.activeHdRegion = fly.getRegion();
                if((!isTimeHeaderCell && !menuDisabled) || (this.grid.trackMouseInTimeHeader && isTimeHeaderCell)){
                    fly.addClass('x-grid3-hd-over');
                }
                
                if (!menuDisabled) {
                    this.activeHdBtn = fly.child('.x-grid3-hd-btn');
                    if(this.activeHdBtn){
                        this.activeHdBtn.dom.style.height = (hd.firstChild.offsetHeight-1)+'px';
                    }
                }
            }
        },
        
	    getAccColumnWidth : function(endCol) {
	        var w = 0,
                cm = this.cm,
                i;
                 
            for (i = this.grid.nbrStaticColumns; i < endCol; i++) {
                if (!cm.isHidden(i)) {
                    w += cm.getColumnWidth(i);
                }
            }
            
            return w;
	    },
    	
	    
        fitTimeColumns : function(suppressRefresh) {
            var cm = this.cm,
                colW = (this.scroller.getWidth() - this.getScrollOffset())/ (cm.getColumnCount() - cm.getLockedCount());
	        this.updateTimeColumnWidths(Math.floor(colW), suppressRefresh);
        },
        
        updateGroupStyles: function(col) {
		    var tables = this.lockedHd.query('.x-grid3-header-offset > table'), 
		                 rows = this.cm.rows, 
		                 tw = this.getLockedWidth();
    		
		    for (var row = 0; row < tables.length; row++) {
			    tables[row].style.width = tw;
    			
			    if (row < rows.length) {
				    var cells = tables[row].firstChild.firstChild.childNodes;
				    cells[0].style.width = tw;
			    }
		    }
	    },
        
        refresh : function(headersToo) {
            headersToo = headersToo || !this.hasRows(); // Simple hack to trigger refresh of headers on initial rendering
            
            // Fit columns if the total width occupied by the time columns is less than the available width
            if (this.cm.getColumnWidth(this.grid.nbrStaticColumns) < Math.floor(this.scroller.getWidth() - this.getScrollOffset())/ (this.cm.getColumnCount() - this.cm.getLockedCount())) {
                this.fitTimeColumns(true);
            }
            
            lgvp.refresh.call(this, headersToo);
        }
    });
})();

// Adaptations for LockingGridView changes in Ext 3.3
if (Ext.getMajorVersion() >= 3 && Ext.getMinorVersion() >= 3) {
    Ext.override(Sch.LockingSchedulerView, {
	    afterRenderUI: Ext.ux.grid.LockingGridView.prototype.afterRenderUI,
	    
	    refreshRow : function(record) {
            var store     = this.ds,
                colCount  = this.cm.getColumnCount(),
                columns   = this.getColumnData(),
                last      = colCount - 1,
                cls       = ['x-grid3-row'],
                rowParams = {
                    tstyle: String.format("width: {0};", this.getTotalWidth())
                },
                lockedRowParams = {
                    tstyle: String.format("width: {0};", this.getLockedWidth())
                },
                colBuffer = [],
                lockedColBuffer = [],
                cellTpl   = this.templates.cell,
                rowIndex, row, lockedRow, column, meta, css, i;
            
            if (Ext.isNumber(record)) {
                rowIndex = record;
                record   = store.getAt(rowIndex);
            } else {
                rowIndex = store.indexOf(record);
            }
            
            if (!record || rowIndex < 0) {
                return;
            }
            
            // @Modification: Events for current row
            var resId = record.get('Id'),
                events = this.es.data.filterBy(function(brec) {
                return brec.data.ResourceId == resId;
            });
            
            for (i = 0; i < colCount; i++) {
                column = columns[i];
                
                if (i == 0) {
                    css = 'x-grid3-cell-first';
                } else {
                    css = (i == last) ? 'x-grid3-cell-last ' : '';
                }
                
                meta = {
                    id      : column.id,
                    style   : column.style,
                    css     : css,
                    attr    : "",
                    cellAttr: ""
                };
                
                meta.value = column.renderer.call(column.scope, record.data[column.name], meta, record, rowIndex, i, store, events);
                
                if (Ext.isEmpty(meta.value)) {
                    meta.value = '&#160;';
                }
                
                if (this.markDirty && record.dirty && typeof record.modified[column.name] != 'undefined') {
                    meta.css += ' x-grid3-dirty-cell';
                }
                
                if(column.locked){
                    lockedColBuffer[i] = cellTpl.apply(meta);
                }else{
                    colBuffer[i] = cellTpl.apply(meta);
                }
            }
            
            row = this.getRow(rowIndex);
            row.className = '';
            lockedRow = this.getLockedRow(rowIndex);
            lockedRow.className = '';
            
            if (this.grid.stripeRows && ((rowIndex + 1) % 2 === 0)) {
                cls.push('x-grid3-row-alt');
            }
            
            if (this.getRowClass) {
                rowParams.cols = colCount;
                cls.push(this.getRowClass(record, rowIndex, rowParams, store));
            }
            
            // Unlocked rows
            this.fly(row).addClass(cls).setStyle(rowParams.tstyle);
            rowParams.cells = colBuffer.join("");
            row.innerHTML = this.templates.rowInner.apply(rowParams);
            
            // Locked rows
            this.fly(lockedRow).addClass(cls).setStyle(lockedRowParams.tstyle);
            lockedRowParams.cells = lockedColBuffer.join("");
            lockedRow.innerHTML = this.templates.rowInner.apply(lockedRowParams);
            lockedRow.rowIndex = rowIndex;
            
            this.fireEvent('rowupdated', this, rowIndex, record);
        },
    
	    initTemplates : function(){
            var ts = this.templates || {};

            if (!ts.masterTpl) {
                ts.masterTpl = new Ext.Template(
                    '<div class="x-grid3" hidefocus="true">',
                        '<div class="x-grid3-locked">',
                            '<div class="x-grid3-header"><div class="x-grid3-header-inner"><div class="x-grid3-header-offset" style="{lstyle}">{lockedHeader}</div></div><div class="x-clear"></div></div>',
                            '<div class="x-grid3-scroller"><div class="x-grid3-body" style="{lstyle}">{lockedBody}</div><div class="x-grid3-scroll-spacer"></div></div>',
                        '</div>',
                        '<div class="x-grid3-viewport x-grid3-unlocked">',
                            '<div class="x-grid3-header"><div class="x-grid3-header-inner"><div class="x-grid3-header-offset" style="{ostyle}">{header}</div></div><div class="x-clear"></div></div>',
                            '<div class="x-grid3-scroller"><div class="x-grid3-body" style="{bstyle}">{body}</div><a href="#" class="x-grid3-focus" tabIndex="-1"></a></div>',
                        '</div>',
                        '<div class="x-grid3-resize-marker">&#160;</div>',
                        '<div class="x-grid3-resize-proxy">&#160;</div>',
                    '</div>'
                );
            }

            this.templates = ts;

		    Sch.LockingSchedulerView.superclass.initTemplates.call(this);
        }
    });
}



Ext.ns('Sch.plugins');


Sch.plugins.DragSelector = function(cfg){
    cfg = cfg || {};
    var g, proxy, tracker, sm;
    var rs, bodyRegion, dragRegion = new Ext.lib.Region(0,0,0,0);

    this.init = function(grid){
        g = grid;
        sm = g.getSelectionModel();
        g.on('render', onRender);
    };

    function fillRegions(){
        rs = [];
        g.view.mainBody.select(g.eventSelector).each(function(el){
            rs[rs.length] = {
                region : el.getRegion(),
                node : el.dom
            };
        });
        bodyRegion = g.view.mainBody.getRegion();
    }

    function onBeforeStart(e){
        return e.ctrlKey;
    }

    function onStart(e){
        if(!proxy){
            proxy = g.el.createChild({cls:'x-view-selector'});
        }else{
            if(proxy.dom.parentNode !== g.el.dom){
                g.el.dom.appendChild(proxy.dom);
            }
            proxy.setDisplayed('block');
        }
        fillRegions();
        sm.clearSelections();
    }

    function onDrag(e){
        var startXY = tracker.startXY;
        var xy = tracker.getXY();

        var x = Math.min(startXY[0], xy[0]);
        var y = Math.min(startXY[1], xy[1]);
        var w = Math.abs(startXY[0] - xy[0]);
        var h = Math.abs(startXY[1] - xy[1]);

        dragRegion.left = x;
        dragRegion.top = y;
        dragRegion.right = x+w;
        dragRegion.bottom = y+h;

        dragRegion.constrainTo(bodyRegion);
        proxy.setRegion(dragRegion);

        for(var i = 0, len = rs.length; i < len; i++){
            var r = rs[i], sel = dragRegion.intersect(r.region);
            if(sel && !r.selected){
                r.selected = true;
                sm.select(r.node, true);
            }else if(!sel && r.selected){
                r.selected = false;
                sm.deselect(r.node);
            }
        }
    }

    function onEnd(e){
        if(proxy){
            proxy.setDisplayed(false);
        }
    }

    function onRender(g){
        var trackerCfg = {
            onBeforeStart: cfg.beforeStart || onBeforeStart,    // Default to CTRL key prevention if nothing is supplied
            onStart: onStart,
            onDrag: onDrag,
            onEnd: onEnd
        };
        
        tracker = new Ext.dd.DragTracker(trackerCfg);
        tracker.initEl(g.view.mainBody);
    }
};

  


Ext.ns('Sch.plugins');


Sch.plugins.EventEditor = Ext.extend(Ext.FormPanel, {
    
    
    saveText : 'Save',
    
    
    cancelText : 'Cancel',
    
    
    hoursText : 'hrs',
    
    
    hideOnBlur : true,
     
    
    timeConfig : {
         allowBlank:false,
         editable : false,
         forceSelection : true
    },
    
    
    fieldsPanelConfig : null,
    
    
    dateFormat:'Y-m-d',
    
    
    timeFormat:'H:i',
    
    
    show : function(eventRecord) {
        
        this.eventRecord = eventRecord;
        
        // Manually set the duration field value
        var duration = Date.getDurationInHours(eventRecord.get('StartDate'), eventRecord.get('EndDate'));
        this.durationField.setValue(duration);
        
        // Load form panel fields
        this.getForm().loadRecord(eventRecord);
        var eventEl = this.grid.getElementFromEventRecord(eventRecord);
        this.el.anchorTo(eventEl, 'bl', this.getConstrainOffsets(eventEl));
        this.expand();
    },
    
    // TODO implement support for constraining the editor panel to the viewport
    getConstrainOffsets : function(eventEl) {
        return [0, 0];
    },
    
    cls : 'sch-eventeditor',
    layout : 'border',
    border : false,
    
    initComponent : function() {
        
        if (!this.fieldsPanelConfig) throw 'Must define a fieldsPanelConfig property';
        
        if (this.hideOnBlur) {
            // Hide when clicking outside panel
            this.mon(Ext.getBody(), 'click', function(e){
                if (!this.collapsed && !e.within(this.getEl()) && !Ext.fly(e.getTarget()).is('.x-combo-list-item')) {
                  this.collapse(false);
                }
            }, this);
        }
        
        // Collapse after render, otherwise rendering is messed up
        this.on('render', this.collapse, this);
        
        this.fieldsPanelConfig.region = 'center';
        
        Ext.apply(this, {
            buttons : [
                {
                    text : this.saveText,
                    scope : this,
                    handler : function() {
                        if (this.getForm().isValid()) {
                            var start = this.startDateField.getValue(),
                                hours = this.durationField.getValue();
                                
                            if (start && hours) {
                                end = start.add(Date.MINUTE, hours * 60);
                            }
                            this.saveHandler.call(this.saveHandlerScope || this, this, start, end, this.eventRecord);
                        }
                    }
                },
                {
                    text : this.cancelText,
                    scope : this,
                    handler : this.collapse
                }
            ],
            items : [{
                region : 'north',
                layout : 'absolute',
                height :35,
                border : false,
                cls : 'sch-eventeditor-timefields',
                items : [
                    this.startDateField = new Ext.ux.form.DateTime({
                        name : 'StartDate',
                        x:10,
                        y:7,
                        width:160,
                        timeFormat:this.timeFormat,
                        timeWidth : 60,
                        timeConfig: this.timeConfig,
                        dateFormat:this.dateFormat,
                        dateConfig: {
                             allowBlank:false
                        }
                    }),
                    
                    this.durationField = new Ext.ux.form.SpinnerField({
                        x:180,
                        y:7,
                        width:55,
                        allowBlank:false
                    }),
                    
                    new Ext.form.Label({
                        y:7,
                        x:240,
                        xtype : 'label',
                        text : this.hoursText
                    })
                ]
            },
            this.fieldsPanelConfig]
        });
        Sch.plugins.EventEditor.superclass.initComponent.call(this);
    },
    
    init : function(grid) {
        grid.on('eventdblclick', this.onEventDblClick, this);
        grid.on('render', this.onGridRender, this);
        
        grid.on('beforedestroy', function() {
            grid.un('eventdblclick', this.onEventDblClick, this);
        });
        
        this.grid = grid;
    },
    
    onEventDblClick : function(g, evtRecord) {
        this.show(evtRecord);
    },
    
    onGridRender : function() {
        this.render(Ext.getBody());
    }
});



Ext.ns('Sch.plugins');


Sch.plugins.Lines = function(config) {
    Ext.apply(this, config);
};
 
Ext.extend(Sch.plugins.Lines, Ext.util.Observable, {    
    
    
    dateFormat : 'y-m-d G:i',
    
    // private
    getLineElements : function() {
        return this.containerEl.select('.' + this.cls);
    },
    
    // private
    removeLineElements : function() {
        return this.getLineElements().remove();
    },
    
    init:function(grid) {
        this.grid = grid;
       
        // unique css class to be able to identify only the lines belonging to this plugin
        this.cls = 'sch-verticalLine-' + Ext.id();
        
        if (!this.store) {
            throw 'You must configure a store to supply data to this plugin';
        }
        grid.on('render', this.onRender, this);
    },
    
    onRender : function (grid) {
        this.containerEl = grid.getView().scroller;
        this.gridBodyEl = grid.getView().mainBody;
        
        this.store.on({
            "load" : this.createLines,
            "datachanged" : this.createLines,
            "add" : this.createLines,
            "remove" : this.createLines,
            "update" : this.createLines,
            "clear" : this.createLines,
            scope : this
        });
        
        var v = grid.getView();
        
        grid.on('viewchange', this.createLines, this);
        v.on('refresh', this.createLines, this);
        v.on('rowremoved', this.refreshLines, this);
        v.on('rowsinserted', this.refreshLines, this);
        
        // HACK
        if ('togglegroup' in v.events) {
            v.on('togglegroup', this.refreshLines, this);
        }
        
        // HACK
        if ('togglerow' in v.events) {
            v.on('togglerow', this.refreshLines, this);
        }
        grid.mon(grid.getColumnModel(), 'hiddenchange', this.createLines, this);
        
        this.createLines();
    },
    
    onResize : function() {
        if (this.getLineElements().getCount() > 0) {
            this.createLines();
        }
    },
    
    createLines : function() {
      this.createLinesInternal.defer(200, this);
    },
    
    createLinesInternal : function() {
        var h = this.gridBodyEl.getHeight();
            
        this.removeLineElements();
            
        this.store.each(function(r){
            if (r.get('Date').between(this.grid.getStart(), this.grid.getEnd())) {
                this.buildMarker(r, h);
            }
        }, this);
    },
    
    buildMarker : function(r, height) {
        var gridStart = this.grid.getStart(),
            itemStart = r.get('Date'),
            lOff = this.grid.getXFromDate(itemStart);
            
        Ext.DomHelper.append(this.containerEl, {
            cls : 'sch-verticalLine ' + this.cls + ' ' + (r.get('Cls') || ''),
            title : String.format('{1} - {0}', (r.get('Text') || ''), r.get('Date').format(this.dateFormat)),
            style : {
                height : height + 'px', 
                left : lOff + 'px'
            }
        });
    },
    
    refreshLines : function() {
        var h = this.gridBodyEl.getHeight();
        
        this.getLineElements().setHeight(h);
    }
}); 



Ext.ns('Sch.plugins');
 

Sch.plugins.Resize = function(config) {
    Ext.apply(this, config);
    Sch.plugins.Resize.superclass.constructor.call(this);
};
 
Ext.extend(Sch.plugins.Resize, Ext.util.Observable, {
     
    useTooltip : true,
    
    
    validatorFn : function(resourceRecord, eventRecord, startDate, endDate, e) {
        return true;
    },
    
    
    validatorFnScope : null,
    
    init:function(grid) {
        this.grid = grid;
        
        if (!this.tipTemplate) {
            this.tipTemplate = new Ext.Template(
                '<div class="sch-timetipwrap {cls}">',
                    '<div class="sch-clock">',
                        '<img src="' + Ext.BLANK_IMAGE_URL + '" class="sch-hourIndicator" style="-moz-transform: rotate({startHourDegrees}deg);-webkit-transform: rotate({startHourDegrees}deg)"/>',
                        '<img src="' + Ext.BLANK_IMAGE_URL + '" class="sch-minuteIndicator" style="-moz-transform: rotate({startMinuteDegrees}deg);-webkit-transform: rotate({startMinuteDegrees}deg)"/>',
                        '{startText}',
                    '</div>',
                     '<div class="sch-clock">',
                        '<img src="' + Ext.BLANK_IMAGE_URL + '" class="sch-hourIndicator" style="-moz-transform: rotate({endHourDegrees}deg);-webkit-transform: rotate({endHourDegrees}deg)"/>',
                        '<img src="' + Ext.BLANK_IMAGE_URL + '" class="sch-minuteIndicator" style="-moz-transform: rotate({endMinuteDegrees}deg);-webkit-transform: rotate({endMinuteDegrees}deg)"/>',
                        '{endText}',
                    '</div>',
                '</div>'
            ).compile();
        }
        
        this.grid.on('render', this.onGridRender, this);
    },
    
    // private
    onGridRender : function() {
        this.grid.mon(this.grid.getView().mainBody, 'mousedown', function(e) {
            var domEl = e.getTarget(this.grid.eventSelector),
                rec = this.grid.getEventRecordFromDomId(domEl.id);
            if (this.grid.fireEvent('beforeresize', this.grid, rec, e) === false) {
                return;
            }
            e.stopEvent();
            this.createResizable(Ext.get(domEl), rec, e);
            this.grid.fireEvent('resizestart', this.grid, rec);
        }, 
        this,
        {
            delegate : '.x-resizable-handle'
        });
    },
    
    // private
    createResizable : function (el, eventRecord, e) {
       
        var t = e.getTarget(),
            isWest = !!t.className.match('x-resizable-handle-west'),
            resourceRecord = this.grid.getResourceRecordByElement(t),
            row = el.up('tr'),
            r = new Sch.LazyResizable(el, {
                row : row,
                resourceRecord : resourceRecord,
                eventRecord : eventRecord,
                handles: isWest ? 'w' : 'e',
                dynamic: true,
                widthIncrement : 1,
                constrainTo : row, // Constrain the resize within the current TR node
                minWidth: 1,
                listeners : {
                    partialresize : { fn : this[isWest ? 'partialWestResize' : 'partialEastResize'], scope : this },
                    resize        : { fn : this.afterResize, scope : this }
                }
            },
            isWest ? 'west' : 'east',
            e
        );
        
        if (this.useTooltip) {
            var tipContent = this.getTipContent(eventRecord.get('StartDate'), eventRecord.get('EndDate'), true);
            if(!this.tip) {
                this.tip = new Ext.QuickTip({
                    cls : 'sch-tip',
                    width : 145,
                    height:40,
                    autoHide : false,
                    anchor : 'b',
                    anchorToTarget:true,
                    html : tipContent // Without initialization data, the rendering fails
                });
            } 
            this.tip.initTarget(el);
            
            this.tip.show();
            this.tip.body.update(tipContent);
        }
    },
    
    // private
    partialEastResize : function (r, newWidth, oldWidth, e) {
        var g = this.grid,
            start = r.eventRecord.get('StartDate'),
            elRight = r.el.getRight(),
            colIndex = this.findColIndex(r.row, elRight),
            end = g.getTimeFromX(colIndex, elRight);
        
        if (colIndex < 0 || !start || !end) return;
        
        var roundedEnd = g.roundDate(end),
            valid = this.validatorFn.call(this.validatorFnScope || this, r.resourceRecord, r.eventRecord, start, roundedEnd) !== false;
        
        r.end = roundedEnd;
        
        g.fireEvent('partialresize', g, r.eventRecord, start, roundedEnd, r.el, e);
        
        if (this.useTooltip) {
            this.tip.body.update(this.getTipContent(start, end, valid));
        }
    },
    
    partialWestResize : function (r, newWidth, oldWidth, e) {
        var g = this.grid,
            end = r.eventRecord.get('EndDate'),
            elLeft = r.el.getLeft(),
            colIndex = this.findColIndex(r.row, elLeft);
        
        if (colIndex < 0) return;
        
        var start = g.getTimeFromX(colIndex, elLeft),
            roundedStart = g.roundDate(start);
        
        if (!start || !end) return;
        
        var valid = this.validatorFn.call(this.validatorFnScope || this, r.resourceRecord, r.eventRecord, roundedStart, end) !== false;
        r.start = roundedStart;
        
        g.fireEvent('partialresize', g, r.eventRecord, roundedStart, end, r.el, e);
        
        if (this.useTooltip) {
            this.tip.body.update(this.getTipContent(start, end, valid));
        }
    },
    
    // private
    findColIndex : function(row, x) {
         var firstTimeCell = row.down('td.sch-timetd'),
             firstTimeCellLeft = firstTimeCell.getLeft(),
             relativeX = x - firstTimeCellLeft,
             colIndex = Math.floor(relativeX / firstTimeCell.getWidth());
        return colIndex;
    },
    
    
    // private
    afterResize : function (r, w, h, e) {
        if (this.useTooltip) {
            this.tip.hide();
        }
        var resourceRecord = r.resourceRecord,
            eventRecord = r.eventRecord,
            oldStart = eventRecord.get('StartDate'),
            oldEnd = eventRecord.get('EndDate'),
            start = r.start || oldStart,
            end = r.end || oldEnd;
        
        if (start && end && (end - start > 0) && // Input sanity check
            ((start - oldStart !== 0) || (end - oldEnd !== 0)) && // Make sure start OR end changed
            this.validatorFn.call(this.validatorFnScope || this, resourceRecord, eventRecord, start, end, e) !== false) {
            
            eventRecord.beginEdit();
            eventRecord.set('StartDate', start);
            eventRecord.set('EndDate', end);
            eventRecord.endEdit();
        } else {
            this.grid.getView().refreshRow(resourceRecord);
        }
        
        // Destroy resizable 
        r.destroy();
        
        this.grid.fireEvent('afterresize', this.grid, eventRecord);
    },
    
    // private
    getTipContent : function(start, end, valid) {
        var g = this.grid,
            roundedStart = g.floorDate(start),
            roundedEnd = g.roundDate(end),
            formattedStart = g.getFormattedDate(start, 'floor'),
            formattedEnd = g.getFormattedEndDate(roundedEnd);
        
        return this.tipTemplate.apply({
            cls : valid ? 'sch-tip-ok' : 'sch-tip-notok',
            startText : formattedStart,
            endText : formattedEnd,
            startHourDegrees : roundedStart.getHours() * 30, 
            startMinuteDegrees : roundedStart.getMinutes() * 6,
            endHourDegrees : roundedEnd.getHours() * 30, 
            endMinuteDegrees : roundedEnd.getMinutes() * 6
        });
    }
}); 



Ext.ns('Sch.plugins');


Sch.plugins.Zones = function(config) {
    Ext.apply(this, config);
};
 
Ext.extend(Sch.plugins.Zones, Ext.util.Observable, {
   
    disabled : false,
    
    setDisabled : function(disabled) {
        if (disabled) {
            this.removeZoneElements();
        }
        
        this.disabled = disabled;
    },
     
    // private
    getZoneElements : function() {
        return this.containerEl.select('.' + this.cls);
    },
    
    // private
    removeZoneElements : function() {
        return this.getZoneElements().remove();
    },
    
    init:function(grid) {
        this.grid = grid;

        // unique css class to be able to identify only the zones belonging to this plugin
        this.cls = this.cls || ('sch-zone-' + Ext.id());
        
        if (!this.template) {
            this.template = new Ext.Template(
                '<div class="sch-zone ' + this.cls + ' {Cls}" style="left:{left}px;width:{width}px;height:{height}px"></div>'
            );       
        }
    
        if (!this.store) {
            throw 'Without a store, there\'s not much use for this plugin';
        }
        grid.on('render', this.onRender, this);
    },
    
    onRender : function (grid) {
        this.containerEl = grid.getView().scroller;
        this.gridBodyEl = grid.getView().mainBody;
        
        this.store.on({
            "load" : this.createZones,
            "datachanged" : this.createZones, 
            "add" : this.createZones, 
            "remove" : this.createZones, 
            "update" : this.createZones, 
            "clear" : this.createZones, 
            scope : this
        });
            
        grid.on('viewchange', this.createZones, this);
        
        var v = grid.getView();
        
        v.on('refresh', this.createZones, this);
        v.on('rowremoved', this.refreshZones, this);
        v.on('rowsinserted', this.refreshZones, this);

        // HACK
        if ('togglegroup' in v.events) {
            v.on('togglegroup', this.refreshZones, this);
        }
        
        // HACK
        if ('togglerow' in v.events) {
            v.on('togglerow', this.refreshZones, this);
        }
        grid.mon(grid.getColumnModel(), 'hiddenchange', this.createZones, this);
    },
    
    createZones : function() {
        // Don't render anything if the grid has no rows.
        if (this.disabled || this.grid.store.getCount() <= 0) return;
        
        // Defer to make sure rendering is not delayed by this plugin
        this.createZonesInternal.defer(10, this);
    },
    
    createZonesInternal : function() {
        
        var h = this.gridBodyEl.getHeight(),
            start = this.grid.getStart(), 
            end = this.grid.getEnd();
            
        this.removeZoneElements();
            
        this.store.each(function(r){
            if (Date.intersectSpans(r.get('StartDate'), r.get('EndDate'), start, end)) {
                this.insertZone(r, h);
            }
        }, this);
    },
    
    insertZone : function(r, height) {
        var gridStart = this.grid.getStart(),
            gridEnd = this.grid.getEnd(),
            itemStart = r.get('StartDate'),
            itemEnd = r.get('EndDate'),
            lOff = this.grid.getXFromDate(Date.max(itemStart, gridStart)),
            width = this.grid.getXFromDate(Date.min(itemEnd, gridEnd)) - lOff;
        
        this.template.insertFirst(this.containerEl, Ext.apply({
            left : lOff,
            width : width,
            height: height
        }, r.data));
    },
    
    // Refresh the height of the rendered zones in the DOM
    refreshZones : function() {
        var h = this.gridBodyEl.getHeight();
        
        this.getZoneElements().setHeight(h);
    }
}); 


 
Ext.ns('Sch.ViewBehaviour');


Sch.ViewBehaviour.Base = function (scheduler) {
    this.grid = scheduler;
    Ext.getBody().addClass(this.cssClass);
};

Ext.apply(Sch.ViewBehaviour.Base.prototype, {
    
    
    cssClass : '',
    
    
    dateFormat : 'Y-m-d',
    
    
    timeResolution : 60,
    
    
    destroy : function() {
        Ext.getBody().removeClass(this.cssClass);
    }
});

 
Ext.ns('Sch.ViewBehaviour');


Sch.ViewBehaviour.DayView = function (grid) {
    Sch.ViewBehaviour.DayView.superclass.constructor.apply(this, arguments);
};

Ext.extend(Sch.ViewBehaviour.DayView, Sch.ViewBehaviour.Base, {
    
    
    cssClass : 'sch-dayview',
    
    
    dateFormat : 'Y-m-d G:i',
    
    
    timeResolution : 60
});


Ext.ns('Sch.ViewBehaviour');


Sch.ViewBehaviour.HourView = function (grid) {
    Sch.ViewBehaviour.HourView.superclass.constructor.apply(this, arguments);
};

Ext.extend(Sch.ViewBehaviour.HourView, Sch.ViewBehaviour.Base, {
    
    
    cssClass : 'sch-hourview',
    
    
    dateFormat : 'G:i',
    
    
    timeResolution : 15
});



Ext.ns('Sch.ViewBehaviour');



Sch.ViewBehaviour.MonthView = function (grid) {
    Sch.ViewBehaviour.MonthView.superclass.constructor.apply(this, arguments);
};

Ext.extend(Sch.ViewBehaviour.MonthView, Sch.ViewBehaviour.Base, {
    
     
    cssClass : 'sch-monthview',
    
    
    dateFormat : 'Y-m-d',
    
    
    timeResolution : 1440
});


 
Ext.ns('Sch.ViewBehaviour');


Sch.ViewBehaviour.WeekView = function (grid) {
    Sch.ViewBehaviour.WeekView.superclass.constructor.apply(this, arguments);
};

Ext.extend(Sch.ViewBehaviour.WeekView, Sch.ViewBehaviour.Base, { 
    
    
    cssClass : 'sch-weekview',
    
    
    dateFormat : 'Y-m-d',
    
    
    timeResolution : 1440
});



Ext.ns('Sch.ViewBehaviour');


Sch.ViewBehaviour.YearView = function (grid) {
    Sch.ViewBehaviour.YearView.superclass.constructor.apply(this, arguments);
};

Ext.extend(Sch.ViewBehaviour.YearView, Sch.ViewBehaviour.Base, {
    
    
    cssClass : 'sch-yearview',
    
    
    dateFormat : 'Y-m-d',
    
    
    timeResolution : 1440
});



Ext.ns('Sch.plugins');
 

Sch.plugins.Tooltip = function(config, grid) {
    Ext.apply(this, config);
    this.grid = grid;
    Sch.plugins.Tooltip.superclass.constructor.call(this);
};
 
Ext.extend(Sch.plugins.Tooltip, Ext.ToolTip, {
    
    showClock : false,
    
    startText : 'Starts: ',
    
    endText : 'Ends: ',
    
    initComponent : function() {    
        
        if (!this.template) {
            if (this.showClock) {
                this.template = new Ext.Template(
                    '<div class="sch-timetipwrap {cls}">',
                    '<div class="sch-clock">',
                        '<img src="' + Ext.BLANK_IMAGE_URL + '" class="sch-hourIndicator" style="-moz-transform: rotate({startHourDegrees}deg);-webkit-transform: rotate({startHourDegrees}deg)"/>',
                        '<img src="' + Ext.BLANK_IMAGE_URL + '" class="sch-minuteIndicator" style="-moz-transform: rotate({startMinuteDegrees}deg);-webkit-transform: rotate({startMinuteDegrees}deg)"/>',
                        '{startText}',
                    '</div>',
                     '<div class="sch-clock">',
                        '<img src="' + Ext.BLANK_IMAGE_URL + '" class="sch-hourIndicator" style="-moz-transform: rotate({endHourDegrees}deg);-webkit-transform: rotate({endHourDegrees}deg)"/>',
                        '<img src="' + Ext.BLANK_IMAGE_URL + '" class="sch-minuteIndicator" style="-moz-transform: rotate({endMinuteDegrees}deg);-webkit-transform: rotate({endMinuteDegrees}deg)"/>',
                        '{endText}',
                    '</div>',
                '</div>'
                );
            } else {
                this.template = new Ext.Template(
                    '<div class="sch-timetipwrap {cls}">',
                    '<div>',
                        this.startText + '{startText}',
                    '</div>',
                     '<div>',
                        this.endText + '{endText}',
                    '</div>',
                '</div>'
                );
            }
        }
        
        this.template.compile();
        Sch.plugins.Tooltip.superclass.initComponent.apply(this, arguments);
    },
    
    cls : 'sch-tip',
    width: 145,
    height:40,
    autoHide : false,
    anchor : 'b-tl',
    
    update : function(start, end, valid) {
        var data = this.getTipData(start, end, valid);
        Sch.plugins.Tooltip.superclass.update.call(this, this.template.apply(data));
    },
     
    // private
    getTipData : function(start, end, valid) {
        var g = this.grid,
            roundedStart = g.floorDate(start),
            roundedEnd = g.floorDate(end),
            formattedStart = g.getFormattedDate(start, 'floor'),
            formattedEnd = g.getFormattedEndDate(roundedEnd);
        
        return {
            cls : valid ? 'sch-tip-ok' : 'sch-tip-notok',
            startText : formattedStart,
            endText : formattedEnd,
            startHourDegrees : roundedStart.getHours() * 30, 
            startMinuteDegrees : roundedStart.getMinutes() * 6,
            endHourDegrees : roundedEnd.getHours() * 30, 
            endMinuteDegrees : roundedEnd.getMinutes() * 6
        };
    },
    
    show : function(el) {
        el = Ext.get(el);
        
        this.anchorTarget = el;
        
        // Rendering is weird if the initial tooltip is empty, prepopulate it with some dummy html
        if (!this.rendered) {
            var dummyDate = new Date();
            this.html = this.template.apply(this.getTipData(dummyDate, dummyDate, true));
        }
        Sch.plugins.Tooltip.superclass.show.call(this);
    }
}); 



Ext.ns('Sch.plugins');


Sch.plugins.Pan = function(config) {
    Ext.apply(this, config);
};

Sch.plugins.Pan = Ext.extend(Object, {
    
    enableVerticalPan : true,
    
    
    hideScrollbar : false,
    
    init : function(grid) {
        grid.on('render', this.onRender, this);
    },

    onRender: function(grid) {
        this.eventSelector = grid.eventSelector;
        this.panEl = grid.getView().scroller;
        grid.mon(this.panEl, 'mousedown', this.onMouseDown, this , { delegate : '.x-grid3-cell' });
        
        if (this.hideScrollbar) {
            this.panEl.setStyle('overflow', 'hidden');
        }
    },

    onMouseDown: function(e, t) {
        if (!e.getTarget(this.eventSelector)) {
            e.stopEvent();
            this.mouseX = e.getPageX();
            this.mouseY = e.getPageY();
            Ext.getBody().on('mousemove', this.onMouseMove, this);
            Ext.getDoc().on('mouseup', this.onMouseUp, this);
        }
    },

    onMouseMove: function(e) {
        e.stopEvent();
        
        var x = e.getPageX(),
            y = e.getPageY(),
            xDelta = x - this.mouseX,
            yDelta = y - this.mouseY;
            
        this.panEl.scrollTo('left', this.panEl.dom.scrollLeft - xDelta);
        this.mouseX = x;
        this.mouseY = y;
        
        if (this.enableVerticalPan) {
            this.panEl.scrollTo ('top', this.panEl.dom.scrollTop - yDelta);
        }
    },

    onMouseUp: function(e) {
        Ext.getBody().un('mousemove', this.onMouseMove, this);
        Ext.getDoc().un('mouseup', this.onMouseUp, this);
    }   
});



if (Sch.plugins && Sch.plugins.SummaryColumn) {
    Ext.override(Sch.plugins.SummaryColumn, {
        dayText : 'd',
        hourText : 'h',
        minuteText : 'min'
    });
}
