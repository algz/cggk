Ext.apply(Ext.form.TextField.prototype, {
	validator : function(text) {
		if(this.allowBlank==false && Ext.util.Format.trim(text).length==0) {
			return false;
		} else {
			return true;
		}
	}
});
