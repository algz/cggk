Ext.DatePicker
		.override( {
			plannedStart : null,
			plannedEnd : null,
			onRender : function(container, position) {
				var m = [
						'<table cellspacing="0">',
						'<tr><td class="x-date-left"><a href="#" title="',
						this.prevText,
						'">&#160;</a></td><td class="x-date-middle" align="center"></td><td class="x-date-right"><a href="#" title="',
						this.nextText, '">&#160;</a></td></tr>',
						'<tr><td colspan="3"><table class="x-date-inner" cellspacing="0"><thead><tr>' ], dn = this.dayNames, i;
				for (i = 0; i < 7; i++) {
					var d = this.startDay + i;
					if (d > 6) {
						d = d - 7;
					}
					m.push('<th><span>', dn[d].substr(0, 1), '</span></th>');
				}
				m[m.length] = '</tr></thead><tbody><tr>';
				for (i = 0; i < 42; i++) {
					if (i % 7 === 0 && i !== 0) {
						m[m.length] = '</tr><tr>';
					}
					m[m.length] = '<td><a href="#" hidefocus="on" class="x-date-date" tabIndex="1"><em><span></span></em></a></td>';
				}
				m
						.push(
								'</tr></tbody></table></td></tr>',
								this.showToday ? '<tr><td colspan="1" class="x-date-bottom" align="center"></td><td colspan="1" class="x-date-bottom" align="center"></td><td colspan="1" class="x-date-bottom" align="center"></td></tr>'
										: '',
								'</table><div class="x-date-mp"></div>');

				var el = document.createElement('div');
				el.className = 'x-date-picker';
				el.innerHTML = m.join('');

				container.dom.insertBefore(el, position);

				this.el = Ext.get(el);
				this.eventEl = Ext.get(el.firstChild);

				this.prevRepeater = new Ext.util.ClickRepeater(this.el
						.child('td.x-date-left a'), {
					handler : this.showPrevMonth,
					scope : this,
					preventDefault : true,
					stopDefault : true
				});

				this.nextRepeater = new Ext.util.ClickRepeater(this.el
						.child('td.x-date-right a'), {
					handler : this.showNextMonth,
					scope : this,
					preventDefault : true,
					stopDefault : true
				});

				this.monthPicker = this.el.down('div.x-date-mp');
				this.monthPicker.enableDisplayMode('block');

				this.keyNav = new Ext.KeyNav(this.eventEl, {
					'left' : function(e) {
						if (e.ctrlKey) {
							this.showPrevMonth();
						} else {
							this.update(this.activeDate.add('d', -1));
						}
					},

					'right' : function(e) {
						if (e.ctrlKey) {
							this.showNextMonth();
						} else {
							this.update(this.activeDate.add('d', 1));
						}
					},

					'up' : function(e) {
						if (e.ctrlKey) {
							this.showNextYear();
						} else {
							this.update(this.activeDate.add('d', -7));
						}
					},

					'down' : function(e) {
						if (e.ctrlKey) {
							this.showPrevYear();
						} else {
							this.update(this.activeDate.add('d', 7));
						}
					},

					'pageUp' : function(e) {
						this.showNextMonth();
					},

					'pageDown' : function(e) {
						this.showPrevMonth();
					},

					'enter' : function(e) {
						e.stopPropagation();
						return true;
					},

					scope : this
				});

				this.el.unselectable();

				this.cells = this.el.select('table.x-date-inner tbody td');
				this.textNodes = this.el.query('table.x-date-inner tbody span');

				this.mbtn = new Ext.Button( {
					text : '&#160;',
					tooltip : this.monthYearText,
					renderTo : this.el.child('td.x-date-middle', true)
				});
				this.mbtn.el.child('em').addClass('x-btn-arrow');

				var left = this.el.child('td.x-date-bottom', false);
				var center = left.next('td.x-date-bottom', false);
				var right = center.next('td.x-date-bottom', false);

				if (this.showToday) {
					this.todayKeyListener = this.eventEl.addKeyListener(
							Ext.EventObject.SPACE, this.selectToday, this);
					var today = (new Date()).dateFormat(this.format);
					this.todayBtn = new Ext.Button( {
						renderTo : center.dom,
						text : String.format(this.todayText, today),
						tooltip : String.format(this.todayTip, today),
						handler : this.selectToday,
						scope : this
					});
					this.start=new Ext.Button( {
						renderTo : left.dom,
						hidden : this.plannedStart==null?true:false,
						text : '<',
						tooltip : '已选取的计划开始时间',
						handler : this.selectStart,
						scope : this
					});
					this.end=new Ext.Button( {
						renderTo : right.dom,
						hidden : this.plannedEnd==null?true:false,
						text : '>',
						tooltip : '已选取的计划结束时间',
						handler : this.selectEnd,
						scope : this
					});
				}
				

				this.mon(this.eventEl, 'mousewheel', this.handleMouseWheel,
						this);
				this.mon(this.eventEl, 'click', this.handleDateClick, this, {
					delegate : 'a.x-date-date'
				});
				this.mon(this.mbtn, 'click', this.showMonthPicker, this);
				this.onEnable(true);
			},

			selectToday : function() {
				if (this.todayBtn && !this.todayBtn.disabled) {
					this.setValue(new Date().clearTime());
					this.fireEvent('select', this, this.value);
				}
			},
			selectStart : function() {
				if (this.plannedStart) {
					this.update(this.plannedStart);
				}
			},
			selectEnd : function() {
				if (this.plannedEnd) {
					this.update(this.plannedEnd);
				}
			}


		});
