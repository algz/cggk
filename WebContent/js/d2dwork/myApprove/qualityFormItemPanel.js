
qualityFormItemPanel = {};


qualityFormItemPanel.init = function (colid) {
	var fPanel = new Ext.form.FormPanel({
		bodyStyle : 'padding:5px 5px',

		border : false,
		autoScroll : true,
		defaults : {
			anchor : '60%',
			msgTarget : 'side',
			labelAlign : 'right',
			style : 'margin-bottom: 5px;',
			readOnly : true
		}
	});
	Ext.Ajax.request({
		url : '../JSON/warehouseobject_WarehouseObjectRemote.getOneWarehouseData',
		method : 'POST',
		success : function(response, options) {
			var formjson = Ext.util.JSON.decode(response.responseText);
			for (var i = 0; i < formjson.length; i++) {
				var type = formjson[i]['dataEntityType'];
				var name = formjson[i]['dataEntityName'];
				var value = formjson[i]['value'];
				var fileid = formjson[i]['fileID'];
				var fomat = "";
				var precision = 0;
				if (type == "double") {
					precision = 10;
				} else if (type == "date") {
					fomat = "Y-m-d";
				}
				fPanel.add(mytaskExtend.FormControls('', name, value, fomat, precision, type));
				fPanel.doLayout();
			}
		},
		disableCaching : true,
		autoAbort : true,
		params : {
			pid : colid
		}
	});
	return fPanel;
}

	