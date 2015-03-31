Ext.ns('Ext.chart');
Ext.chart.BaseChart = Ext.extend(Ext.BoxComponent,{
	width : 500,
	height : 285,
	onRender : function(ct,position){
		Ext.chart.BaseChart.superclass.onRender.call(this,ct,position);
		this.ct = Ext.get(ct);
		this.ct.position();
		this.ct.setStyle('overflow','hidden');
		this.createCanvas();
	},
	createCanvas : function(ct){
		var canvas = document.createElement("canvas");
		this.ct.dom.appendChild(canvas);
		this.el = Ext.get(canvas);
		if(Ext.isIE&&G_vmlCanvasManager){
			this.el = Ext.get(G_vmlCanvasManager.initElement(canvas));
		}
		this.el = Ext.get(this.el);
		this.setCanvasSize(this.width,this.height);
		this.canvas = Ext.getDom(this.el);
		this.el.position('absolute',this.zIndex);
		this.ctx = this.getContext();
	},
	getContext : function(){
		return this.el.dom.getContext("2d");
	},
	setCanvasSize : function(w,h){
		this.el.setSize(w,h);
		this.el.set({
			width : w,
			height : h
		});
	}
});
