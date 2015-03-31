var appDel = {};
appDel.init = function(btn, pressed) {
	if (myGrid.row == null) {
		Ext.MessageBox.show( {
			title : ''+getResource('resourceParam663')+'',
			msg : ''+getResource('resourceParam1100')+'',
			width : 280,
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.WARNING
		});
		return false;
	}
    // text：警告！    
	var isbox = Ext.MessageBox.confirm(''+getResource('resourceParam1724')+'', ''+getResource('resourceParam475')+'的'+getResource('resourceParam558')+''+getResource('resourceParam508')+'无法恢复，'+getResource('resourceParam512')+''+getResource('resourceParam510')+'继续?', function(
			btn, text) {
		if (btn == 'yes') {
			
			var records=appMain.getSelections();
			var ids=new Array();
			for(var i=0;i<records.length;i++){
				ids[i]=records[i].get('applicationid');
			}
			var vo = Seam.Remoting.createType("com.luck.itumserv.applicationop.TApplicationVo");
			
	         vo.setApplicationids(ids);
			
//			var appId = myGrid.row.get('applicationid');
		    callSeam("applicationop_tapplicationsvr","tappDel",[ids],appDel.delreturn);
		}
	}).getDialog().setWidth(330);
}
appDel.delreturn = function(result) {
    result="true";
	var sign = result;
	if (sign == "true") {
		myGrid.row = null;
		Ext.example.msg("" + getResource('resourceParam575') + "", ""
						+ getResource('resourceParam649') + "");

	} else {
		Ext.MessageBox.show( {
			title : ''+getResource('resourceParam651')+'',
			msg : sign,
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		})
	}
	appMain.baseargs = {};
	myGrid.loadvalue(appMain.appgrid.store, {start:0,limit:25},{});
}
