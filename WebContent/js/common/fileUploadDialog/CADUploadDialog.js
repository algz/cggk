var CADfileUploadDialog = {
	visual_upload_uri : 'http://192.168.0.81:8081/sysware/FILEUP/',

	visual_download_uri : 'http://192.168.0.81:8081/sysware/FILEDOWN/'

}
function viewWindow(url) {
	var u = window.location.href.substring(0, window.location.href
					.indexOf("base"));
	var dd = u + url.substring(3, url.length);
	var view = new Ext.Window({
		// title : '' + getResource('resourceParam576') + '',
		width : 600,
		resizable : false,
		modal : true,
		height : 550,
		layout : 'fit',
		// html : '<html>'
		// + '<head>'
		// + '</head>'
		// + '<body>'
		// + '<p>'
		// + '<object
		// classid="CLSID:FE5180BC-62B4-40F0-83E2-AB4D96B12558"
		// width="690"
		// height="580">'
		// + '<param name="_Version" value="65536">'
		// + '<param name="_ExtentX" value="7938">'
		// + '<param name="_ExtentY" value="5292">'
		// + '<param name="_StockProps" value="16">'
		// + '<param name="Text" value="' + dd + '">' + '</object>'
		// + '</p>' + '</body>' + '</html>'
		html : "<BODY><p align = center ><Font face = Arial size = 8></font></p><P><div style='text-align:center;'><object classid='CLSID:FE5180BC-62B4-40F0-83E2-AB4D96B12558' width='100%' height='100%' > <param name='FilePath' value='"
				+ url
				+ "'/><object type='application/x-vnd-vcollab-cax' data='"
				+ url
				+ "' width='100%' height='100%' ><br/> <div style='text-align:center;'>Marechi supports 32-bit Microsoft Internet Explorer, Mozilla <br/>Firefox and Google Chrome browsers on Windows operating <br/>systems. Other operating systems are not supported as of now. <br/></div> <br/><div style='text-align:center;'>VCollab Presenter (Lite) is required to view this page. <br/><a href='http://www.marechi.com/DownloadPresenter.aspx'>Click Here to Download VCollab Presenter Lite</a><br/><br/>If you have VCollab Presenter (Lite) installed on your system, <br/>and still see this message, <a href='http://www.vcollab.com/presentertroubleshooting.html' target='_blank' >click here</a></div></object></object></div></P>"

			// + "<div style='text-align:center;'><object
			// classid='CLSID:FE5180BC-62B4-40F0-83E2-AB4D96B12558' width='500'
			// height='400' > "
			// +
			//
			// "<param name='FilePath' value='" + url + "'/>" +

			// "<object type='application/x-vnd-vcollab-cax' data='" + url
			// + "' width='100%' height='100%' ><br/>"

			// "<div style='text-align:center;'>Marechi supports
			// 32-bit
			// Microsoft Internet Explorer, Mozilla <br/>Firefox and
			// Google
			// Chrome browsers on Windows operating <br/>systems.
			// Other
			// operating systems are not supported as of now.
			// <br/></div>
			// <br/><div style='text-align:center;'>VCollab
			// Presenter (Lite)
			// is required to view this page. <br/><a
			// href='http://www.marechi.com/DownloadPresenter.aspx'>Click
			// Here to Download VCollab Presenter
			// Lite</a><br/><br/>If you
			// have VCollab Presenter (Lite) installed on your
			// system,
			// <br/>and still see this message, <a
			// href='http://www.vcollab.com/presentertroubleshooting.html'
			// target='_blank' >click
			// here</a></div></object></object></div>"

	});
	view.show();
}
CADfileUploadDialog.initWindow = function(config, valueObject, callback,
		afterInitCallback) {

	var visual = "";
	if (valueObject.fileId != undefined) {
		var conn = synchronize.createXhrObject();
		var url = "../JSON/dataEntity_VisualFileRemote.getVisualFile?type=1&fileId="
				+ valueObject.fileId;
		conn.open("GET", url, false);
		conn.send(null);
		var respText = conn.responseText;
		var obj = Ext.util.JSON.decode(respText);
		if (obj.success == true) {
			visual = "&nbsp;&nbsp;<a href=' javascript:void(0)' style='color:#0000FF;text-decoration:underline;' title='"
					+ obj.vf.name
					+ "' onclick='viewWindow(\""
					+ CADfileUploadDialog.visual_download_uri
					+ "?ID="
					+ obj.vf.id
					+ "&ORIGINALNAME="
					+ encodeURI(encodeURI(obj.vf.name))
					+ "\")'>"
					+  getResource('resourceParam4067') + "</a>";
		}
	}
	var count = 1;
	var self = this;
	this.title = config && config.title ? config.title : ""
			+ getResource('resourceParam470') + "";
	this.width = config && config.width ? config.width : 400;
	this.height = config && config.height ? config.height : 300;
	this.resizable = config && config.resizable ? config.resizable : true;
	this.fileUploadField = new Ext.form.FileUploadField({
		buttonText : '' + getResource('resourceParam569') + '',
		allowBlank : false,
		border : false,
		readOnly : true,
		fieldLabel : 'CAD/CAE',
		id : 'mainfile',
		name : 'mainfile',
		labelWidth : 20

			// validator : function(value) {
			// if (CADfileUploadDialog.fileUploadField.getValue()
			// .toLowerCase().indexOf('.cad') == -1
			// && CADfileUploadDialog.fileUploadField.getValue()
			// .toLowerCase().indexOf('.cae') == -1) {
			// CADfileUploadDialog.fileUploadField.invalidText = ' '
			//
			// + '文件类型应为CAE或CAD!';
			// // CADfileUploadDialog.fileUploadField.focus();
			// return false;
			// } else {
			// return true;
			// }
			//
			// }

		});
	this.fileUploadField1 = new Ext.form.FileUploadField({
		buttonText : '' + getResource('resourceParam569') + '',
		allowBlank : true,
		border : false,
		fieldLabel : '文件1',
		labelWidth : 20,

		readOnly : true
			// ,
			// validator : function(value) {
			// if (CADfileUploadDialog.fileUploadField1.getValue()
			// .toLowerCase().indexOf('.cad') == -1
			// && CADfileUploadDialog.fileUploadField1.getValue()
			// .toLowerCase().indexOf('.vrml') == -1
			// && CADfileUploadDialog.fileUploadField1.getValue() != "") {
			// CADfileUploadDialog.fileUploadField1.invalidText = ' '
			//
			// + '文件类型应为VRML!';
			// // CADfileUploadDialog.fileUploadField1.focus();
			// return false;
			// } else {
			// return true;
			// }
			//
			// }
		});
	this.uploadForm = new Ext.form.FormPanel({
				fileUpload : true,
				defaults : {},
				border : false,
				frame : true,
				autoScroll : true,
				items : [this.fileUploadField, this.fileUploadField1]
			});

	this.window = new Ext.Window({
		title : this.title,
		width : 330,
		height : 175,
		autoScroll : true,

		tbar : [new Ext.Button({
					text : '添加文件',
					handler : function() {
						count = count + 1;
						var t = new Ext.form.TextField();

						var up = new Ext.form.FileUploadField({
									buttonText : ''
											+ getResource('resourceParam569')
											+ '',
									allowBlank : true,
									border : false,
									fieldLabel : '文件' + count,
									labelWidth : 20,
									readOnly : true

								});
						CADfileUploadDialog.uploadForm.add(up);
						CADfileUploadDialog.uploadForm.doLayout();
						// self.window.setHeight(self.window.getHeight() + 30);

					}
				})],
		buttonAlign : 'center',
		border : false,
		frame : true,
		resizable : true,
		modal : true,
		items : [new Ext.form.Label({
			html : valueObject.name.substring(
					valueObject.name.lastIndexOf("."), valueObject.name.length) == ".vcz"
					? "<a href=' javascript:void(0)' style='color:#0000FF;text-decoration:underline;' title='"
							+ valueObject.name
							+ "' onclick='viewWindow(\""
							+ config.downUrl
							+ "\")'>"
							+ valueObject.name
							+ "</a>"
					: "<a href='"
							+ config.downUrl
							+ "' style='color:#0000FF;text-decoration:underline;' title='"
							+ valueObject.name
							+ "'>"
							+ stringTools.StringFormat.getSubstring(
									valueObject.name, 40) + "</a>" + visual
		}), this.uploadForm],
		buttons : [{
			text : '' + getResource('resourceParam470') + '',
			handler : function() {
				if (!self.uploadForm.getForm().isValid()) {
					Ext.Msg.alert('' + getResource('resourceParam575') + '', ""
									+ getResource('resourceParam985') + "")
				} else {
					// if
					// (CADfileUploadDialog.fileUploadField.getValue()
					// .toLowerCase().indexOf('.cad') != -1
					// &&
					// CADfileUploadDialog.fileUploadField1.getValue()
					// == "")
					// {
					// Ext.example.msg("" +
					// getResource('resourceParam575')
					// + "", "" + '请选择vrml' + "");
					// return;
					// }
					self.uploadForm.getForm().submit({
						url : config.upUrl,
						waitMsg : '' + getResource('resourceParam984') + '',
						success : function(form, result) {
							var main = {};
							var assistant = {
								fileName : ""
							};
							var arr = new Array();
							var v1 = Seam.Remoting
									.createType("com.sysware.edm.dataentity.VisualFile");
							for (var i = 0; i < result.result.rs.length; i++) {
								if (result.result.rs[i].type == 2) {
									assistant.fileName = result.result.rs[i].fileName;
									assistant.fileId = result.result.rs[i].fileId;
									assistant.type = 2;
									var v2 = Seam.Remoting
											.createType("com.sysware.edm.dataentity.VisualFile");
									v2.setId(result.result.rs[i].fileId);
									v2.setName(result.result.rs[i].fileName);
									v2.setType(2);
									arr.push(v2);
								} else if (result.result.rs[i].type == 0) {

									main.fileName = result.result.rs[i].fileName;
									main.fileId = result.result.rs[i].fileId;
									v1.setFileId(main.fileId);
									v1.setName(result.result.rs[i].fileName);
								}
							}
							v1.setVfList(arr);
							if ("" != assistant.fileName) {
								// var
								// visualFile =
								// Seam.Remoting
								// .createType("com.sysware.edm.dataentity.VisualFile");
								// visualFile.setId(assistant.fileId);
								// visualFile.setName(assistant.fileName);
								// visualFile.setFileId(main.fileId);
								// visualFile.setType(2);
								Seam.Component
										.getInstance("dataEntity_VisualFileRemote")
										.addVisualFile(v1, function(result) {
												})
							}
							// alert(main.fileName);
							callback(self, form, main, "success");

						},
						failure : function(form, result) {
							Ext.Msg.alert('' + getResource('resourceParam575')
											+ '', ""
											+ getResource('resourceParam470')
											+ "出现异常！")
						}
					})
				}
			}
		}, {
			text : '取消',
			handler : function() {
				self.window.close();
			}
		}]
	})
	if (typeof afterInitCallback == 'function') {
		afterInitCallback(this.uploadForm, this.window);
	}
	this.window.show();
}
