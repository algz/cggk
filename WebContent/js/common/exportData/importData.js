importData = {};

importData.init = function(id, value, sign) {
	Ext.MessageBox.confirm('' + getResource('resourceParam6086') + '', ''
					+ getResource('resourceParam7117') + '',
			function(btn, text) {
				if (btn == 'yes') {
					var importVo = Seam.Remoting
							.createType("com.sysware.common.export.ExporterVo");
					importVo.setId(id);
					importVo.setType(value);
					importVo.setSign(sign);
					var waitConfig = {};
					waitConfig.text = "" + getResource('resourceParam7055')
							+ "," + getResource('resourceParam7056') + "";
					Ext.MessageBox.wait("", ""
									+ getResource('resourceParam7056') + "",
							waitConfig);
					Seam.Component.getInstance("export_ExporterRemote")
							.importData(importVo, importData.importYN);
				}
			})
}

importData.importYN = function(value) {
	var sign = value;
	if (sign == true) {
		Ext.MessageBox.hide();
		Ext.example.msg("" + getResource('resourceParam575') + "", ""// 提示
						+ getResource('resourceParam7046') + "");// 导入成功
		exportDataMain.sm.clearSelections();
	} else {
		Ext.MessageBox.hide();
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam7047') + '',// 导入失败
					msg : '' + getResource('resourceParam7048') + '',// 您的信息导入失败，请重新导入！
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
	}
}
