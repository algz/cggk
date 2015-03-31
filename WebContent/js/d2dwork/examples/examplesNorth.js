var examplesNorth ={npanel:null};


examplesNorth.init = function()
{
	var hh = "<div class='x-panel-header x-unselectable x-accordion-hd' style='height:25px;width:1800' align='left'>" +
	"<a href='javascript:void(0);'>"+getResource('resourceParam483')+"</a>&nbsp;|&nbsp;" +
	"<a href='javascript:void(0);'>"+getResource('resourceParam1170')+"</a>&nbsp;|&nbsp;"+
	"<a href='javascript:void(0);'>"+getResource('resourceParam475')+"</a>&nbsp;|&nbsp;"+
	"<a href='javascript:void(0);'>"+getResource('resourceParam485')+"</a>&nbsp;|&nbsp;"+
	"<a href='javascript:void(0);'>"+getResource('resourceParam487')+"</a>&nbsp;|&nbsp;"+
	"<a href='javascript:void(0);'>"+getResource('resourceParam488')+"</a>&nbsp;|&nbsp;"+
	"<a href='javascript:void(0);'>"+getResource('resourceParam489')+"</a>&nbsp;|&nbsp;"+
	"<a href='javascript:void(0);'>"+getResource('resourceParam1195')+"</a>&nbsp;|&nbsp;"+
	"<a href='javascript:void(0);'>"+getResource('resourceParam1196')+"</a>&nbsp;|&nbsp;"+
	"<a href='javascript:void(0);'>"+getResource('resourceParam652')+"</a>&nbsp;|&nbsp;"+
	"</div>";
	//上面面板
	examplesNorth.npanel=new Ext.Panel({
		id : 'nPanel',
		region :'north',
		height :25,
		collapsible : true,
		html : hh
	});
	return examplesNorth.npanel;
}
