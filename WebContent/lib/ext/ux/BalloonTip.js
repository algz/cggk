Ext.ns('Ext.ux');
Ext.ux.BalloonTip = Ext.extend(Ext.BoxComponent, {
	nodeWidth : 80,
	nodeHeight : 40,
	useCurveLine : true,
	useCurveRate : 0.15,

	yDetal : 0,
	xDetal : 0,

	xDetalRate : 40,
	bWHDetalRate : 20,
	xDetalBase : 10,
	btWidth : 10,
	btHeight : 10,
	tWidth : 15,
	tHeight : 15,
	radius : 5,
	rate : 1 / 2,
	midRate : 1 / 2,
	padRate : 1 / 10,

	angleDetal : 0,
	angleDetalStart : 0,

	textCls : '',
	data : [],
	color : '',
	direction : 't',
	constrain : true,
	autoRender : true,

	onRender : function(ct, position) {
		Ext.ux.BalloonTip.superclass.onRender.call(this, ct, position);
		this.initDirection = this.direction;
		this.ct = ct;
		if (this.text)
			this.addText(this.text);
		this.createCanvas();
	},
	getZIndex : function() {
		return parseInt(this.ct.getStyle("z-index"), 10) || 11000;
	},
	show : function(text, xy) {
		Ext.ux.BalloonTip.superclass.show.apply(this, arguments);

		if (text && text.isXType && text.isXType('panel')) {
			if (!text.rendered)
				text.renderTo(this.ct);
			else
				text.show();
			this.textEl = text;
		} else {
			this.addText(text);
		}
		this.adjustOuter(xy[0], xy[1]);
		this.draw();
		this.setXY(xy);
	},
	hide : function(text) {
		this.direction = this.initDirection;
		Ext.ux.BalloonTip.superclass.hide.apply(this, arguments);
		if (this.textEl) {
			this.textEl.dom.innerHTML = "";
			this.textEl.setLeftTop(-10000, -10000);
			this.el.setLeftTop(-10000, -10000);
		}
	},
	createCanvas : function() {
		//if (!this.el) {
			var canvas = document.createElement("canvas");
			this.ct.dom.appendChild(canvas);
			this.el = Ext.get(canvas);
			if (Ext.isIE && G_vmlCanvasManager)
				this.el = Ext.get(G_vmlCanvasManager.initElement(canvas));
		//}
		this.el = Ext.get(this.el);
		this.setCanvasSize(this.width, this.height);
		this.canvas = Ext.getDom(this.el);
		this.el.position('absolute', this.zIndex || this.getZIndex() + 2);
		this.ctx = this.getContext();
	},
	getContext : function() {
		return this.el.dom.getContext("2d");
	},
	constrainXY : function(x1, y1) {
		if (this.constrain) {
			var constrainEl = Ext.get(this.constrainCt || document);
			var cbox = constrainEl.getBox(), tbox = this.el.getBox();
			var ox = tbox.x - cbox.x, oy = tbox.y - cbox.y;
			var or = tbox.right - cbox.right, ob = tbox.bottom - cbox.bottom;
			var ow = tbox.width - cbox.width, oh = tbox.height - cbox.height;
			switch (this.direction) {
				case 't' :
					ox < 0 ? x1 = x1 - ox : "";
					or > 0 ? x1 = x1 - or : "";
					if (oh < 0) {
						oy < 0 ? y1 = y1 - oy : '';
						ob > 0 ? this.changeDirection('b', x1, y1) : '';
					}
					break;
				case 'b' :
					ox < 0 ? x1 = x1 - ox : "";
					or > 0 ? x1 = x1 - or : "";
					if (oh < 0) {
						ob > 0 ? y1 = y1 - ob : "";
						oy < 0 ? this.changeDirection('t', x1, y1) : '';
					}
					break;
				case 'l' :
					ob > 0 ? y1 = y1 - ob : "";
					oy < 0 ? y1 = y1 - oy : "";
					if (ow < 0) {
						ox < 0 ? x1 = x1 - ox : "";
						or > 0 ? this.changeDirection('r', x1, y1) : '';
					}
					break;
				case 'r' :
					ob > 0 ? y1 = y1 - ob : "";
					oy < 0 ? y1 = y1 - oy : "";
					if (ow < 0) {
						or > 0 ? x1 = x1 - or : "";
						ox < 0 ? this.changeDirection('l', x1, y1) : '';
					}
					break;
			}
			x1 = parseInt(x1), y1 = parseInt(y1);
			x1 < 0 ? x1 = 0 : "";
			y1 < 0 ? y1 = 0 : "";
			//alert(x1,y1);
			this.setPagePosition(x1, y1);
		}
	},
	changeDirection : function(direction, x, y) {
		this.direction = direction;
		this.adjustOuter(x, y);
		this.draw();
	},
	addText : function(text) {
		if (!this.textEl) {
			this.textEl = Ext.get(this.ct).createChild();
			this.textEl.addClass(this.textCls);
		}
		Ext.DomHelper.overwrite(this.textEl, text);

		var size = Ext.util.TextMetrics.measure(this.textEl, text);
		this.nodeWidth = size.width + 10;
		this.nodeHeight = size.height + 10;
		this.textEl.setSize(this.nodeWidth, this.nodeHeight);
		this.textEl.position('absolute', this.zIndexText || this.getZIndex()
				+ 3);
	},
	afterRender : function() {
		Ext.ux.BalloonTip.superclass.afterRender.apply(this, arguments);
	},
	setXY : function(xy) {
		this.setPagePosition(xy[0], xy[1]);
		this.constrainXY(xy[0], xy[1]);

	},
	setCanvasSize : function(w, h) {
		var width, height;
		switch (this.direction) {
			case 't' :
			case 'b' :
				width = this.nodeWidth + this.angleDetal || 0;
				height = this.nodeHeight + this.tHeight + this.yDetal;
				break;
			case 'l' :
			case 'r' :
				width = this.nodeWidth + this.tHeight + this.yDetal + 1;
				height = this.nodeHeight + this.angleDetal || 0;
				break;
		}
		this.el.setSize(width, height);
		this.el.set( {
			width : width,
			height : height
		});
		this.width = width;
		this.height = height;
	},
	between : function(x, min, max) {
		if (x < min)
			x = min;
		if (x > max)
			x = max;
		return x;
	},
	adjustStart : function() {
		var x = this.tWidth + this.yDetal, y = this.tHeight + this.yDetal;
		switch (this.direction) {
			case 't' :
				x = 0 + this.angleDetalStart || 0;
				break;
			case 'b' :
				x = 0 + this.angleDetalStart || 0, y = 0;
				break;
			case 'l' :
				x = y;
				y = 0 + this.angleDetalStart || 0;
				break;
			case 'r' :
				x = y;
				y = 0;
				break;
		}
		return {
			x : x,
			y : y
		};
	},
	calDetal : function() {
		var midRate = (this.rate - 0.5), absMidRate = Math.abs(midRate);
		var bWHDetal = absMidRate * this.bWHDetalRate;
		this.xDetal = midRate * this.xDetalRate;
		this.tWidth = this.btWidth + bWHDetal;
		this.tHeight = this.btHeight + bWHDetal;
		if (this.angleToCurve == false)
			this.useCurveLine = false;
		else
			this.useCurveLine = absMidRate < this.useCurveRate ? false : true;

	},
	calAngleDetal : function(w) {
		var o = this.radius + this.offsetLen + this.tWidth * this.midRate
				+ this.xDetal;
		nwh = (w == 'w') ? this.nodeWidth : this.nodeHeight;
		if (o < 0) {
			this.angleDetal = Math.abs(o);
			this.angleDetalStart = Math.abs(o);
		} else if (o - nwh > 0)
			this.angleDetal = o - nwh;
		else {
			this.angleDetal = 0;
			this.angleDetalStart = 0;
		}
	},
	offset : function(wh, r, rate) {
		return (wh - 2 * r) * rate;
	},
	calOffsetLen : function(w) {
		var nwh = (w == "w") ? this.nodeWidth : this.nodeHeight;
		var len = (nwh - 2 * this.radius) * this.rate;
		var minLen = nwh * this.padRate;
		var maxLen = nwh - 2 * this.radius - this.tWidth - minLen;
		this.offsetLen = this.between(len, minLen, maxLen);
	},
	calRate : function(x, y, w) {
		if (this.constrainCt) {
			var ctBox = Ext.get(this.constrainCt).getBox();
			var v = (w == "w") ? (x - ctBox.x) / ctBox.width : (y - ctBox.y)
					/ ctBox.height;
			this.rate = this.between(v, 0, 1);
		}
	},
	adjustOuter : function(x, y) {
		if (this.constrain) {
			switch (this.direction) {
				case 't' :
				case 'b' :
					var flag = 'w';
					break;
				case 'l' :
				case 'r' :
					var flag = 'h';
			}
			this.calRate(x, y, flag);
			this.calDetal();
			this.calOffsetLen(flag);
			this.calAngleDetal(flag);
		}
	},
	draw : function() {
		this.setCanvasSize();
		var len = this.offsetLen || 0, r = this.radius;
		var tw = this.tWidth, th = this.tHeight, nw = this.nodeWidth, nh = this.nodeHeight;
		var xy = this.adjustStart(), x = xy.x, y = xy.y;

		this.ctx.strokeStyle = this.bdcolor || '#000000';
		this.ctx.lineWidth = this.lineWidth || 1;
		this.ctx.fillStyle = this.bgcolor || 'white';
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.ctx.beginPath();
		this.ctx.moveTo(x, y + r);
		this.ctx.quadraticCurveTo(x, y, x + r, y);

		this.drawAngle('t', len, x, y, r, tw, th);
		this.ctx.lineTo(x + nw - 2 * r, y);
		this.ctx.quadraticCurveTo(x + nw, y, x + nw, y + r);
		this.drawAngle('r', len, x, y, r, tw, th);

		this.ctx.lineTo(x + nw, y + nh - 2 * r);
		this.ctx.quadraticCurveTo(x + nw, y + nh, x + nw - r, y + nh);
		this.drawAngle('b', len, x, y, r, tw, th);

		this.ctx.lineTo(x + r, y + nh);
		this.ctx.quadraticCurveTo(x, y + nh, x, y + nh - r);
		this.drawAngle('l', len, x, y, r, tw, th);

		this.ctx.lineTo(x, y + r);
		this.ctx.fill();
		this.ctx.stroke();
	},

	onDestroy : function() {
		if (this.textEl)
			this.textEl.remove();
	},
	drawAngle : function(direction, len, x, y, r, tw, th) {
		var x1, y1, x2, y2, x3, y3, x4, y4, x5, y5;
		if (this.direction != direction)
			return;
		switch (this.direction) {
			case 't' :
				x1 = x + r + len, y1 = y;
				x2 = x1 + tw * this.midRate + this.xDetal;
				y2 = y1 - th - this.yDetal;
				x3 = x1 + tw, y3 = y1;
				break;
			case 'b' :
				x3 = x + r + len, y3 = y + this.nodeHeight;
				x1 = x3 + tw, y1 = y3;
				x2 = x3 + tw * this.midRate + this.xDetal;
				y2 = y3 + th + this.yDetal;
				break;
			case 'l' :
				x3 = x, y3 = y + r + len;
				x1 = x3, y1 = y3 + tw;
				x2 = x3 - th - this.yDetal;
				y2 = y3 + tw * this.midRate + this.xDetal;
				break;
			case 'r' :
				x1 = x + this.nodeWidth, y1 = y + r + len;
				x2 = x1 + th + this.yDetal;
				y2 = y1 + tw * this.midRate + this.xDetal;
				x3 = x1, y3 = y1 + tw;
		}

		this.ctx.lineTo(x1, y1);
		if (this.useCurveLine) {
			x4 = x1, y4 = y2;
			x5 = x3, y5 = y2;
			this.ctx.quadraticCurveTo(x4, y4, x2, y2);
			this.ctx.quadraticCurveTo(x5, y5, x3, y3);
		} else {
			this.ctx.lineTo(x2, y2);
			this.ctx.lineTo(x3, y3);
		}
	},

	realignText : function() {
		var xy = this.adjustStart(), x = xy.x, y = xy.y;
		x = this.x1 + x, y = this.y1 + y;
		this.textEl.setLeftTop(x, y);
	},
	setPagePosition : function(x2, y2) {
		Ext.ux.BalloonTip.superclass.setPagePosition.apply(this, arguments);
		this.realignText();
	},
	adjustPosition : function(x1, y1) {
		var detal = this.radius + this.offsetLen + this.tWidth * this.midRate
				+ this.xDetal + this.angleDetalStart;
		switch (this.direction) {
			case 't' :
				x = x1 - detal;
				y = y1;
				break;
			case 'b' :
				x = x1 - detal;
				y = y1 - this.height;
				break;
			case 'l' :
				x = x1;
				y = y1 - detal;
				break;
			case 'r' :
				x = x1 - this.width;
				y = y1 - detal;
		}
		this.x1 = x;
		this.y1 = y;

		return {
			x : x,
			y : y
		};
	}
});

// 背景色与背景图
// 采用panel,window做为内容
// 计算约束
