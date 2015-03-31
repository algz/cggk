var baobiaoLists = {}
baobiaoLists.init = function() {

			 
	var h = '<div id="baobiaolistsid"></div>';
	baobiaoLists.f = new Ext.Panel({
		id : 'fbaobiaoidlist',
		region : 'center',
		bodyStyle : 'font: 100% 宋体, 新宋体;' + 'margin: 0;' + 'padding: 0;'
				+ 'text-align: center;' + 'color: #000000;',
		html : h,
		autoScroll : true,
		margins : '20 20 20 20'
	});
	return baobiaoLists.f;
}
