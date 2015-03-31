var visual = {

}
visual.init = function(fileId) {

	var conn = synchronize.createXhrObject();
	var url = "../JSON/dataEntity_VisualFileRemote.getVisualFile?type=1&fileId="
			+ fileId;
	conn.open("GET", url, false);
	conn.send(null);
	var respText = conn.responseText;
	var obj = Ext.util.JSON.decode(respText);
	var caxpath = "";
	if (obj.success == true) {
		caxpath = CADfileUploadDialog.visual_download_uri + "?fileId="
				+ obj.vf.id + "&fileName=" + encodeURI(encodeURI(obj.vf.name));
		// alert(caxpath);

	}

	var tab = new Ext.Panel({
		title : '轻量化展现',
		html : "<BODY><p align = center ><Font face = Arial size = 8></font></p><P><div style='text-align:center;'><object classid='CLSID:FE5180BC-62B4-40F0-83E2-AB4D96B12558' width='100%' height='100%' > <param name='FilePath' value='"
				+ caxpath
				+ "'/><object type='application/x-vnd-vcollab-cax' data='"
				+ caxpath
				+ "' width='100%' height='100%' ><br/> <div style='text-align:center;'>Marechi supports 32-bit Microsoft Internet Explorer, Mozilla <br/>Firefox and Google Chrome browsers on Windows operating <br/>systems. Other operating systems are not supported as of now. <br/></div> <br/><div style='text-align:center;'>VCollab Presenter (Lite) is required to view this page. <br/><a href='http://www.marechi.com/DownloadPresenter.aspx'>Click Here to Download VCollab Presenter Lite</a><br/><br/>If you have VCollab Presenter (Lite) installed on your system, <br/>and still see this message, <a href='http://www.vcollab.com/presentertroubleshooting.html' target='_blank' >click here</a></div></object></object></div></P>"

	});
	return tab;

}
visual.cax = function(fileId, fileName) {
	var u = window.location.href.substring(0, window.location.href
					.indexOf("base"));
	var caxpath = '/FILEDOWN/?ID=' + fileId + '&ORIGINALNAME='
			+ encodeURI(encodeURI(fileName));
	var tab = new Ext.Panel({
		title : '轻量化展现',
		html : "<BODY><p align = center ><Font face = Arial size = 8></font></p><P><div style='text-align:center;'><object classid='CLSID:FE5180BC-62B4-40F0-83E2-AB4D96B12558' width='100%' height='100%' > <param name='FilePath' value='"
				+ u
				+ caxpath
				+ "'/><object type='application/x-vnd-vcollab-cax' data='"
				+ u
				+ caxpath
				+ "' width='100%' height='100%' ><br/> <div style='text-align:center;'>Marechi supports 32-bit Microsoft Internet Explorer, Mozilla <br/>Firefox and Google Chrome browsers on Windows operating <br/>systems. Other operating systems are not supported as of now. <br/></div> <br/><div style='text-align:center;'>VCollab Presenter (Lite) is required to view this page. <br/><a href='http://www.marechi.com/DownloadPresenter.aspx'>Click Here to Download VCollab Presenter Lite</a><br/><br/>If you have VCollab Presenter (Lite) installed on your system, <br/>and still see this message, <a href='http://www.vcollab.com/presentertroubleshooting.html' target='_blank' >click here</a></div></object></object></div></P>"

	});
	return tab;

}