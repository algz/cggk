function back(id, name) {
	cateGoryMain.cateGorypanel.getLayout().setActiveItem(0);
	if(window.parent.document.getElementById("center_frame").firstChild.firstChild!=null)
	{
		window.parent.document.getElementById("center_frame").firstChild.firstChild.innerHTML = ''+getResource('resourceParam598')+'：'
		+ name;
	}else
	{
		window.parent.document.getElementById("center_frame").childNodes[1].innerHTML = ''+getResource('resourceParam598')+'：'
		+ name;
	}

}
var cateGoryAttribute = {};
cateGoryAttribute.init = function() {
	cateGoryAttribute.extendgrid = cateGoryExtend.init();
	cateGoryAttribute.extend = new Ext.Panel({
				title : ''+getResource('resourceParam1782')+'',
				border : false,
				frame : false,
				layout : 'fit',
				items : [cateGoryAttribute.extendgrid]
			});
	return cateGoryAttribute.extend;
}
