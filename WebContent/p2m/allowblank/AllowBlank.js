/**
 * by suny
 * 在form表单中的field为必填的添加*
 * 注：现在对于文件上传FileUploadField支持不好
 */
Ext.ns('Sysware.P2M');
Sysware.P2M.AllowBlank = Ext.extend(Object, {
	constructor : function() {
	},
	el:null,
	init : function(c) {
		c.allowBlank = false;
		c.on('render', function(comp,aw,ah,ow,oh) {
			if(this.el==null){
				this.el = new Ext.Element(document.createElement("div"));
				if (c instanceof Ext.form.TriggerField) {
					this.el.applyStyles("display:inline;margin-left:20px");
				} else {
					this.el.applyStyles("display:inline;margin-left:2px");
				}
				var font = document.createElement("font");
				font.setAttribute("color", "red");
				font.setAttribute("size", "3px");
				var redStar = document.createTextNode("*");
				font.appendChild(redStar);
				this.el.dom.appendChild(font);
				c.getEl().dom.parentNode.appendChild(this.el.dom);
			}else{
				if (c instanceof Ext.form.FileUploadField) {
//					alert("aw"+aw+"---ow"+ow)
//					this.el.applyStyles("display:inline;margin-left:"+aw+2+"px");
				} 
			}
			
			
		}, this);

	}
});

Ext.reg('sysware.p2m.allowblank', Sysware.P2M.AllowBlank);
