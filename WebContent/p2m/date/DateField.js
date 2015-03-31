Ext.ns('Sysware.P2M');
Sysware.P2M.DateField = Ext.extend(Ext.form.DateField, {
	plannedStart : null,
	plannedEnd : null,
	reset : function() {
	    /*
	     * 重置对于最小最大可选日期
	     */
		this.minValue = null;
		this.maxValue = null;
		this.plannedStart = null;
		this.plannedEnd = null;
		Ext.form.ComboBox.superclass.reset.call(this);
		if (this.clearFilterOnReset && this.mode == 'local') {
			this.store.clearFilter();
		}
	},
	onTriggerClick : function() {
		if (this.disabled) {
			return;
		}
		if (this.menu == null) {
			this.menu = new Ext.menu.DateMenu( {
				hideOnClick : false,
				focusOnSelect : false
			});
		}
		this.onFocus();
		var start=this.menu.picker.start;
		if(start){
			if(this.plannedStart){
				start.setVisible(true);
			}else{
				start.setVisible(false);
			}
		}
		var end=this.menu.picker.end;
		if(end){
			if(this.plannedEnd){
				end.setVisible(true);
			}else{
				end.setVisible(false);
			}
		}
		Ext.apply(this.menu.picker, {
			plannedStart : this.plannedStart,
			plannedEnd : this.plannedEnd,
			minDate : this.minValue,
			maxDate : this.maxValue,
			disabledDatesRE : this.disabledDatesRE,
			disabledDatesText : this.disabledDatesText,
			disabledDays : this.disabledDays,
			disabledDaysText : this.disabledDaysText,
			format : this.format,
			showToday : this.showToday,
			minText : String.format(this.minText, this
					.formatDate(this.minValue)),
			maxText : String.format(this.maxText, this
					.formatDate(this.maxValue))
		});
		/*
		 * picker按照 datefield已有值、计划开始值、今天的 顺序选取 默认选中的顺序
		 */
		this.menu.picker.setValue(this.getValue() || this.plannedStart
				|| new Date());
		this.menu.show(this.el, "tl-bl?");
		this.menuEvents('on');
	}
//	
		});
Ext.reg('sysware.p2m.datefield', Sysware.P2M.DateField);