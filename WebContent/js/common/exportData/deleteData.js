deleteData = {};
deleteData.init = function(value,arr) {
	Ext.MessageBox.confirm('' + getResource('resourceParam1724') + '', ''
					+ getResource('resourceParam636') + '',
			function(btn, text) {
				if (btn == 'yes') {
					var exportVo = Seam.Remoting
							.createType("com.sysware.common.export.ExporterVo");
					exportVo.setIds(value);
					exportVo.setData_paths(arr);
					Seam.Component.getInstance("export_ExporterRemote")
							.deleteData(exportVo, deleteData.exportYN);
				}
			})
}

deleteData.exportYN = function(value) {
	var sign = value;
	if (sign == true) {
		Ext.example.msg("" + getResource('resourceParam575') + "", ""
						+ getResource('resourceParam884') + "!");
		exportDataMain.sm.clearSelections();
		myGrid.loadvalue(exportDataMain.mygrid.getStore(), exportDataMain.args,
				exportDataMain.baseargs);
	} else {
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam638') + '',
					msg : '' + getResource('resourceParam885') + '!',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
	}
}