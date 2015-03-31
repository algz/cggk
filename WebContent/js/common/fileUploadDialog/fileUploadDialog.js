var fileUploadDialog = {}
function viewWindow(url) {
	var durl = "http://localhost:8080/m/" + url.substring(3, url.length);
	var u = window.location.href.substring(0, window.location.href
					.indexOf("base"));
	var dd = u + url.substring(3, url.length);

	var view = new Ext.Window({
		title : ''+getResource('resourceParam576')+'',
		width : 705,
		resizable : false,
		modal : true,
		height : 610,
		html : '<html>'
				+ '<head>'
				+ '<meta http-equiv="Content-Type" content="text/html; charset=windows-1252">'
				+ '<meta name="GENERATOR" content="Microsoft FrontPage 4.0">'
				+ '<meta name="ProgId" content="FrontPage.Editor.Document">'
				+ '</head>'
				+ '<body>'
				+ '<p>'
				+ '<object classid="clsid:22A8722E-15D6-4BC8-9439-D805A9E83B59" id="V3D1" width="690" height="580">'
				+ '<param name="_Version" value="65536">'
				+ '<param name="_ExtentX" value="7938">'
				+ '<param name="_ExtentY" value="5292">'
				+ '<param name="_StockProps" value="16">'
				+ '<param name="Text" value="' + dd + '">' + '</object>'
				+ '</p>' + '</body>' + '</html>'
	});
	view.show();
}
fileUploadDialog.initWindow = function(config, valueObject, callback,
		afterInitCallback) {

	var self = this;
	this.title = config && config.title ? config.title : ""+getResource('resourceParam470')+"";
	this.width = config && config.width ? config.width : 400;
	this.height = config && config.height ? config.height : 300;
	this.resizable = config && config.resizable ? config.resizable : true;
	this.fileUploadField = new Ext.form.FileUploadField({
				buttonText : ''+getResource('resourceParam569')+'',
				allowBlank : false,
				border : false,
				readOnly : true
			});
	this.uploadForm = new Ext.form.FormPanel({
				layout : 'fit',
				fileUpload : true,
				border : false,
				items : [this.fileUploadField]
			});

	this.window = new Ext.Window({
		title : this.title,
		width : this.width,
		minHeight : 60,
		height : this.height,
		resizable : this.resizable,
		buttonAlign : 'center',
		border : false,
		modal : true,
		items : [new Ext.form.Label({
			html : valueObject.name.substring(
					valueObject.name.lastIndexOf("."), valueObject.name.length) == ".vcz"
					? "<a href=' javascript:void(0)' style='color:#0000FF;text-decoration:underline;' title='"+valueObject.name+"' onclick='viewWindow(\""
							+ config.downUrl
							+ "\")'>"
							+ valueObject.name
							+ "</a>"
					: "<a href='"
							+ config.downUrl
							+ "' style='color:#0000FF;text-decoration:underline;' title='"+valueObject.name+"'>"
							+ stringTools.StringFormat.getSubstring(valueObject.name,40) + "</a>"
		}), this.uploadForm],
		buttons : [{
			text : ''+getResource('resourceParam470')+'',
			disabled : config.disableUpload == undefined ? false:config.disableUpload,
			handler : function() {
				if(valueObject.checkStr != undefined){
					var filenamepath = self.fileUploadField.getValue();
					var fileType = filenamepath.substr(filenamepath.lastIndexOf("."));
					var arrCheckFileType = valueObject.checkStr.split(",");
					function checkIsValidType(){
						for(var i=0;i<arrCheckFileType.length;i++){
							var type = fileType.replace(".","");
							var tempType = arrCheckFileType[i].replace(".","");
							if(type == tempType){
								return true;
							}
						}
						return false;
					}
					if(valueObject.checkStr!=""&&!checkIsValidType()){
						Ext.Msg.alert(""+getResource('resourceParam575')+"", "文件格式不合法！");
						return false;
					}
				}
				if (!self.uploadForm.getForm().isValid()) {
					Ext.Msg.alert(''+getResource('resourceParam575')+'', ""+getResource('resourceParam985')+"")
				} else {
					self.uploadForm.getForm().submit({
								url : config.upUrl,
								waitTitle: getResource('resourceParam575'), // updated by YangJin'gang at 2011-05-23
								waitMsg : getResource('resourceParam984'),
								success : function(form, result) {
									if (result.result.fileId == undefined) {
										Ext.Msg.alert(''+getResource('resourceParam575')+'', ""+getResource('resourceParam470')+"出现异常！")
									} else {
										callback(self, form, result, "success");
									}
								},
								failure : function(form, result) {
									Ext.Msg.alert(''+getResource('resourceParam575')+'', ""+getResource('resourceParam470')+"出现异常！")
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
