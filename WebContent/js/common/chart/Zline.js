Ext.ns('Ext.chart');
Ext.chart.Line = Ext.extend(Ext.chart.BaseChart, {
	yMin : null,
	yMax : null,
	xColumns : 12,
	yRows : 10,
	series : [],
	xLabels : [],
	xTextOffset : 5,
	yTextOffset : 10,
	legendOffset : 5,
	arrowHeight : 10,
	arrowWidth : 10,
	defaultLineWidth : 2,
	repeat : 10,
	timeCount : 0,
	legend : true,
	initComponent : function() {
		Ext.chart.Line.superclass.initComponent.apply(this, arguments);
		this.addEvents('afterAnimal');
		var str = '<table width="150px"  style="font-size:12px;margin-left:8px;" >'
				+ '<tr> <td colspan="2"  height="18px"><div align="center"><strong>{year}年{name}销售额</strong></div></td> </tr>'
				+ ' <tr> <td height="18px" width="90px">全年平均销售额:</td> <td>{avg}万元</td> </tr>'
				+ ' <tr>  <td  height="18px" width="90px">当前月销售额:</td> <td>{now}万元</td> </tr>'
				+ '</table>';
		if (!this.msgTpl) {
			var t = new Ext.XTemplate(str);
			t.compile();
			Ext.chart.Line.prototype.msgTpl = t;
		}
		this.tipHide = true;
		if (this.ds) {
			for (var i = 0; i < this.ds.getCount(); i++) {
				if (this.ds.getAt(i).data['state'] == 1)
					return this.setData(i);
				break;
			}
		}
	},
	onRender : function() {
		Ext.chart.Line.superclass.onRender.apply(this, arguments);
		this.dotDetail = new Ext.ux.BalloonTip( {
			direction : 't',
			yDetal : 3,
			xDetal:15,
			//useCurveRate : 0,
			xDetalRate:60,
			bWHDetalRate : 15,
			constrainCt : this.ct
		});
		this.draw();
	},

	drawAxis : function() {
		this.drawXYAxis();
		this.drawXText();
		this.drawYText();
		
	},
	createVLabel : function(v, w, items) {
		var item = this.yText.createChild( {
			tag : 'span'
		});
		item.position('absolute');
		item.dom.appendChild(document.createTextNode(parseInt(v)));
		items.push([v, item]);
		item.getWidth() > w ? w = item.getWidth() : '';
		return [w, item.getHeight()];
	},

	drawYText : function() {
		if (this.yText)
			this.yText.remove();
		var step = this.yRange / (this.yRows - 1);
		this.yText = this.ct.createChild( {
			style : 'position:absolute;'
		});
		var w = 0, items = [];
		for (var n = 0, v = this.yMax; (v > this.yMin) && (n < this.yRows - 1); v -= step, n++)
			w = this.createVLabel(v, w, items)[0];
		var wh = this.createVLabel(this.yMin, w, items);
		this.yText.setWidth(wh[0]);
		this.yText.setLeftTop(this.cBox.l - wh[0] - this.yTextOffset, 0);/* 标值左边与y轴距离 */
		var rate = this.cBox.h / this.yRange, yoffset = (this.yMin * rate);
		for (i = 0; i < items.length; i++) {
			var item = items[i][1], pos = items[i][0];
			pos = this.cBox.h - pos * rate + yoffset;/* 标值位置在y轴高度上的体现 */
			item.setRight(0);
			item.setTop(parseInt(this.cBox.y + pos - wh[1] / 2) || 0);/* 定位为标值文本高度的中央 */
		}
	},
	drawXText : function() {
		if (this.xText)
			this.xText.remove();
		var step = this.cBox.w / (this.xColumns - 1);
		this.xText = this.ct.createChild();
		this.xText.position('absolute');
		this.xText.setWidth(this.width);
		this.xText.setLeftTop(0, this.cBox.b + this.xTextOffset);
		for (var i = 0; i < this.xColumns; i++) {
			var label = this.xText.createChild();
			label.dom.appendChild(document.createTextNode(this.xLabels[i]));
			label.position('absolute');
			var x = this.cBox.x + (step * i) - (label.getWidth() / 2);
			var h = label.getHeight();
			label.setLeftTop(x, 0);
		}
		this.xText.setHeight(h);
	},
	drawXYAxis : function() {
		var x = this.cBox.l, y = this.cBox.b;
		var x1 = this.cBox.x, y1 = this.cBox.y - this.arrowHeight;
		var x2 = this.cBox.r + this.arrowHeight, y2 = this.cBox.b;
		this.ctx.lineWidth = 1;
		this.ctx.strokeStyle = "black";
		this.ctx.beginPath();
		this.ctx.moveTo(x, y);
		this.ctx.lineTo(x1, y1);
		this.ctx.stroke();

		this.ctx.beginPath();
		this.ctx.moveTo(x1 - this.arrowWidth / 2, y1 + this.arrowHeight);
		this.ctx.lineTo(x1, y1);
		this.ctx.lineTo(x1 + this.arrowWidth / 2, y1 + this.arrowHeight);
		this.ctx.stroke();

		this.ctx.beginPath();
		this.ctx.moveTo(x, y);
		this.ctx.lineTo(x2, y2);
		this.ctx.stroke();

		this.ctx.beginPath();
		this.ctx.moveTo(x2 - this.arrowHeight, y2 - this.arrowWidth / 2);
		this.ctx.lineTo(x2, y2);
		this.ctx.lineTo(x2 - this.arrowHeight, y2 + this.arrowWidth / 2);
		this.ctx.stroke();
	},
	drawBackground : function() {
		var w = this.cBox.w, h = this.cBox.h, x = this.cBox.x, y = this.cBox.y;
		xgd = (this.xColumns) ? w / (this.xColumns - 1) : 0;
		ygd = (this.yRows) ? h / (this.yRows - 1) : 0;
		this.ctx.fillStyle = 'silver';
		if (xgd)
			for (i = xgd; i <= w; i += xgd)
				this.ctx.fillRect(x + i, y, 1, h - 1);
		if (ygd)
		for (i = h - ygd; i >= 0; i -= ygd)
				this.ctx.fillRect(x + 1, y + i, w, 1);
	},
	addLine : function(label, color, values, width, id, product) {
		this.series.push(this.initLine( {
			label : label,
			color : color,
			values : values,
			width : width || this.defaultLineWidth,
			id : id,
			product : product
		}));
	},
	initLine : function(line) {
		var sum = 0, len = line.values.length;
		for (var i = 0; i < len; i++)
			sum = sum + line.values[i];
		line.avgValue = sum / len;
		if (!line.tempValues)
			line.tempValues = [];
		for (var j = 0; j < len; j++)
			line.tempValues[j] = line.avgValue;
		return line;
	},
	drawAnimLines : function() {
		this.timeCount++;
		if (this.timeCount == 1)
			this.beforeAnimal();
		var last = (this.timeCount === this.repeat);
		if (!last)
			this.animaling = true;
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.drawAxis();
		this.drawBackground();
		this.drawLines(last, true);
		if (last) {
			this.animaling = false;
			this.afterAnimal();
		}
	},
	beforeAnimal : function() {
		this.products.disable();
		this.years.disable();
	},
	afterAnimal : function() {
		this.products.enable();
		this.years.enable();
		this.fireEvent('afterAnimal',this);
	},
	drawLines : function(last, anim) {
		if (this.deleteAllDot == true && this.dotsEl) {
			this.dotsEl.select('div', true).remove();
			this.deleteAllDot = false;
		}
		if (!this.dotsEl) {
			this.dotsEl = Ext.get(this.ct).createChild();
			this.dotsEl.position('absolute');
			// this.dotsEl.setStyle('border', "1px solid #FF0000");
			this.dotsEl.setSize(this.width, 1);
			this.dotsEl.setLeftTop(0, 0);
			this.deleteAllDot = false;
		}

		for (i = 0; i < this.series.length; i++) {
			this.drawLine(i, anim, last);
		}
	},
	getYLen : function(line, i, rate, last) {
		return (last ? line.values[i] : line.tempValues[i]) * rate;
	},
	drawLine : function(index, anim, last) {
		var line = this.series[index], len = line.values.length;;
		var rate = this.cBox.h / this.yRange, yoffset = this.yMin * rate;
		if (anim === false) {
			// line.tempValues = line.values;//注意不能这样用 会改变values值
			for (var i = 0; i < line.values.length; i++) {
				line.tempValues[i] = line.values[i];
			}
		}
		if (!len)
			return;
		var yLen = this.getYLen(line, 0, rate, last), bBase = this.cBox.b
				+ yoffset;
		var x = this.cBox.x, y = bBase - yLen;
		this.ctx.strokeStyle = line.color;
		this.ctx.lineWidth = line.width;

		this.ctx.beginPath();
		var tx = x, ty = y;
		this.ctx.moveTo(tx, ty);
		for (var i = 1; i < len; i++) {
			yLen = this.getYLen(line, i, rate, last)
			tx += this.xStep, ty = bBase - yLen;
			this.ctx.lineTo(tx, ty);
		}
		this.ctx.stroke();

		tx = x, ty = y;
		for (var i = 1; i < len; i++) {
			yLen = this.getYLen(line, i, rate, last)
			tx += this.xStep;
			ty = bBase - yLen;
			this.drawDot(tx, ty, 3, line, last, i);
		}
		if (anim) {
			for (var i = 0; i < len; i++) {
				line.tempValues[i] += (line.values[i] - line.avgValue)
						/ this.repeat;
			}
		}

	},
	drawDot : function(x, y, rad, line, last, dotindex) {
		this.ctx.beginPath();
		this.ctx.fillStyle = line.color;
		this.ctx.arc(x, y, rad, 0, Math.PI * 2, false);
		this.ctx.fill();
		if (last) {
			var div = this.dotsEl.createChild();
			div.position('absolute');
			// div.setStyle('border', "1px solid #FF0000");
			div.setSize(10, 10);
			div.setLeftTop(x - 5, y - 5);
			// div.setStyle('cursor', "move");

			div.on('mouseover', this.showTip.createDelegate(this, [line, 3,
					dotindex], 0), this, {
				delay : 100
			});
			div.on('mouseout', this.hideTip.createDelegate(this, [line, 2,
					dotindex], 0), this, {
				delay : 100
			});

		}
	},
	showTip : function(line, size, dotindex, e) {
		if (this.tipHide == true) {
			line.width = size;
			this.ctx.clearRect(0, 0, this.width, this.height);
			this.drawAxis();
			this.drawBackground();
			this.drawLines(true, false);
			var data = {
				name : line.product.data['name'],
				avg : Math.round(line.avgValue),
				now : Math.round(line.values[dotindex]),
				year : line.label
			};
			var text = this.msgTpl.applyTemplate(data);
			this.dotDetail.show(text, e.getXY());
			this.tipHide = false;
		}
	},
	hideTip : function(line, size, dotindex, e) {
		if (this.tipHide == false) {
			line.width = size;
			this.ctx.clearRect(0, 0, this.width, this.height);
			this.drawAxis();
			this.drawBackground();
			this.drawLines(true, false);
			this.dotDetail.hide();
			this.tipHide = true;
		}
	},
	initValue : function() {
		// this.yMax = this.yMin = null;
		this.xLength = 0;
		for (i = 0; i < this.series.length; i++) {
			var line = this.series[i], vlen = line.values.length;
			vlen > this.xLength ? this.xLength = vlen : '';
			for (j = 0; j < vlen; j++) {
				var value = line.values[j];
				if ((this.yMin == null) || (value < this.yMin))
					this.yMin = value;
				if ((this.yMax == null) || (value > this.yMax))
					this.yMax = value;
			}
		}
		this.yRange = this.yMax - this.yMin;
		this.xStep = this.cBox.w / (this.xLength - 1);
		this.xColumns = this.xLabels.length;
	},
	initPos : function() {
		this.cBox = {
			x : this.width * 0.08,
			y : this.height * 0.05,
			w : this.width * 0.85,
			h : this.height * (this.legend ? 0.75 : 0.85)
		};
		this.cBox.t = this.cBox.y;
		this.cBox.l = this.cBox.x;
		this.cBox.b = this.cBox.y + this.cBox.h;
		this.cBox.r = this.cBox.x + this.cBox.w;

	},
	initLines : function() {
		for (var i = 0; i < this.series.length; i++) {
			this.initLine(this.series[i]);
		}
	},
	init : function() {
		this.initPos();
		this.initLines();
		this.initValue();
		this.timeCount = 0;
	},
	draw : function() {
		this.init();
		this.drawAxis();
		this.drawBackground();
		this.drawLegend();
		// this.drawLines(true, false);
		Ext.TaskMgr.start( {
			run : function() {
				this.drawAnimLines();
			},
			interval : 100,
			repeat : this.repeat,
			scope : this
		});

	},
	getProductsCheckId : function() {
		for (var i = 0; i < this.radioItems.length; i++) {
			var p = this.radioItems[i].el.dom;
			if (p.checked)
				return p.value;
		}
	},
	setData : function(index) {
		this.series = [];
		var product = this.ds.getAt(index);
		if (!product)
			return;
		for (var i = 0; i < product.data['data'].length; i++) {
			var line = product.data['data'][i];
			this.addLine(line[0], line[1], line[2], this.defaultLineWidth, i,
					product);
		}
	},
	addData : function(index) {
		var product = this.ds.getAt(this.getProductsCheckId());
		var line = product.data['data'][index];
		if (this.series.indexOf(line) == -1) {
			this.addLine(line[0], line[1], line[2], this.defaultLineWidth,
					index, product);
		}
	},
	removeData : function(index) {
		for (var i = 0; i < this.series.length; i++) {
			if (this.series[i].id == index) {
				this.series.remove(this.series[i]);
			}
		}
	},
	choice : function(c, type) {
		var v = c.el.dom.value;
		switch (type) {
			case 'all' :
				this.setData(parseInt(v));
				this.createYears(this.getProductsCheckId());
				break;
			case 'add' :
				this.addData(parseInt(v));
				break;
			case 'del' :
				this.removeData(parseInt(v));
				break;
		}
		this.deleteAllDot = true;
		this.yMin = null;
		this.yMax = null;
		this.draw();
	},
	createProducts : function() {
		var checked;
		if (!this.radioItems)
			this.radioItems = [];
		for (var i = 0; i < this.ds.getCount(); i++) {
			var r = this.ds.getAt(i);
			if (r.data['state'] == 1)
				checked = i;
			var name = '<font color="' + r.data['color'] + '">'
					+ r.data['name'] + '</font>';
			var product = new Ext.form.Radio( {
				boxLabel : name,
				name : '_cg',
				inputValue : i,
				checked : !!r.data['state']
			});
			product.on('check', function(t, c) {
				c ? this.choice(t, 'all') : '';
			}, this);
			this.radioItems.push(product);
		}
		this.products = new Ext.form.RadioGroup( {
			columnWidth : '.5',
			items : this.radioItems
		});
		this.createYears(checked);

	},
	createYears : function(checked) {
		var data = (this.ds.getAt(checked)).data['data'];
		if (!this.checkboxItems)
			this.checkboxItems = [];
		for (var i = 0; i < data.length; i++) {
			var line = data[i], name = '<font color="' + line[1] + '">'
					+ line[0] + '</font>';
			var year = new Ext.form.Checkbox( {
				boxLabel : name,
				inputValue : i,
				name : '_ck',
				checked : true
			})
			year.on('check', function(t, c) {
				this.choice(t, c ? 'add' : 'del');
			}, this);
			this.checkboxItems.push(year);
		}
		var oldYears = this.years;
		this.years = new Ext.form.CheckboxGroup( {
			columnWidth : '.5',
			columns : 3,
			items : this.checkboxItems
		});
		if (this.legendPanel) {
			this.legendPanel.remove(this.yearsoldYears);
			this.legendPanel.insert(1, this.years);
			this.legendPanel.doLayout();
		}
	},
	drawLegend : function() {
		if (this.legend == true && !this.legendPanel) {
			this.createProducts();
			this.legendPanel = new Ext.FormPanel( {
				layout : 'column',
				width : this.cBox.w,
				border : false,
				defaults : {
					border : false
				},
				floating : true,
				shadow : false,
				x : this.cBox.x,
				y : this.cBox.b + this.xText.getHeight() + this.xTextOffset
						+ this.legendOffset,
				height : 30,
				frame : true,
				items : [this.products, this.years]
			});
			this.legendPanel.render(this.ct);

		}

	}
});
