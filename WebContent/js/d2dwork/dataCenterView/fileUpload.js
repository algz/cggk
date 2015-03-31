/**
 * 实现文件上传功能
 */
var fileUpload = {};

fileUpload.upload = function(fileID, doID) {

	var windowTitle = ''+getResource('resourceParam469')+''+getResource('resourceParam470')+'';
	fileUpload.fileDialog = new Ext.Window({
		// el:'scxz1',
		title : windowTitle,
		modal : true,
		layout : 'fit',
		width : 360,
		height : 120,
		closeAction : 'hide',
		plain : false,
		items : [fileUpload.fileForm({'fileID':fileID,'doID':doID})]
	});

	fileUpload.fileDialog.show();
	fileUpload.fileDialog.on("hide", function() {
		fileUpload.fileDialog.close();
		fileUpload.fileDialog.destroy();
		fileUpload.fileDialog = null;

	});
}

fileUpload.uploadCallBack = function(options) {

	var windowTitle = ''+getResource('resourceParam469')+''+getResource('resourceParam470')+'';
	fileUpload.fileDialog = new Ext.Window({
		// el:'scxz1',
		title : windowTitle,
		modal : true,
		layout : 'fit',
		width : 360,
		height : 120,
		closeAction : 'hide',
		plain : false,
		items : [fileUpload.fileForm(options)]
	});

	fileUpload.fileDialog.show();
	fileUpload.fileDialog.on("hide", function() {
		fileUpload.fileDialog.close();
		fileUpload.fileDialog.destroy();
		fileUpload.fileDialog = null;

	});
}

fileUpload.fileForm = function(options) {
	fileUpload.file = new Ext.form.TextField({
		name : 'filepath',
		id : 'filepath',
		inputType : 'file',
		fieldLabel : ''+getResource('resourceParam469')+''+getResource('resourceParam503')+''
	});

	// 组合上传文件的url地址信息，把文件id和数据对象id加进去
	var uploadUrl = '../svr/upload?fileID=' + options.fileID + '&dataObjectID=' + options.doID + '&temp=' + options.temp;
	fileUpload.form = new Ext.FormPanel({
		labelWidth : 60, // label settings here cascade unless overridden
		frame : false,
		plain : false,
		fileUpload : true,
		url : uploadUrl,
		bodyStyle : 'padding:5px 5px 0;background:transparent;',
		defaultType : 'textfield',
		items : [fileUpload.file],
		buttons : [ // 定义面板中的按钮
		{
			text : ''+getResource('resourceParam470')+'',
			handler : function() // 为当前按钮绑定事件
			{
				// 需要判断文件名是否合法
				var fileName;// 由文件路径获取文件名
				var filePath = fileUpload.form.getForm().findField('filepath').getValue();
				var lastIndex = filePath.lastIndexOf('\\');
				if (lastIndex != -1)
					fileName = filePath.substring(lastIndex + 1);
				else
					fileName = filePath;
				
				if (fileName == ''){
					alert(""+getResource('resourceParam459')+""+getResource('resourceParam469')+"");
				} else {
					fileUpload.form.getForm().submit({
					waitMsg : ''+getResource('resourceParam470')+ '' + getResource('resourceParam9066') + '，'+getResource('resourceParam460')+'...',
					method : 'post',
					success : function(form, action) {																	
						if (options.success){
//							var fileName;//由文件路径获取文件名
//							var filePath = form.findField('filepath').getValue();							
//							var lastIndex = filePath.lastIndexOf('\\');							
//							if (lastIndex != -1)
//								fileName = filePath.substring(lastIndex+1);
//							else
//							    fileName = filePath;
							    
							options.success(fileName);//回调回调函数
						}
						// text : 9067--成功    9068--失败
						Ext.Msg.alert(''+getResource('resourceParam508')+'', ""+getResource('resourceParam469')+""+getResource('resourceParam470')+ '' + getResource('resourceParam9067') + '' ); // action.result.success
						fileUpload.fileDialog.hide();
					},
					failure : function() {
						Ext.Msg.alert(''+getResource('resourceParam499')+'', ''+getResource('resourceParam469')+''+getResource('resourceParam470')+ '' + getResource('resourceParam9068') + '' );
						if (options.failure){
							options.failure();							
						}
					}
				});
				}
			}
		}, {
			text :  '' + getResource('resourceParam9002') + '' , // text : 取消
			handler : function() {
				// fileUpload.form.getForm().reset(); //表单重置
				fileUpload.fileDialog.hide();
			}
		}]
	});

	return fileUpload.form;

}
