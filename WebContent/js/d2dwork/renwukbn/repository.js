var repository = {
	grid : null,
	tree : null,
	panel : null,
	currentNode : null,
	treeLoader : null,
	webroot : null

};

/**
 * 判断权限，下载文件
 */
repository.dowloadFile = function(file) {
		if (result) {
			var frame = document.getElementById("for_file_dowload_frame");
			if (!frame) {
				frame = Ext.DomHelper.append(document.body, {
					tag : 'iframe',
					id : 'for_file_dowload_frame',
					width : 0,
					height : 0
				});
				frame.src = "../svr/download?filePath="
						+ encodeURIComponent(file);
			} else
				frame.src = "../svr/download?filePath="
						+ encodeURIComponent(file);
	} 
}

