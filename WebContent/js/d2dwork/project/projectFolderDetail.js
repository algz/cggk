var projectFolderDetail = {
  tpye:"1"
};
projectFolderDetail.init = function(callback) {
	projectFolderDetail.contentsname = new Ext.form.TextField({
				id : 'contentsname1',
				name : 'contentsname',
				fieldLabel : ''+getResource('resourceParam1561')+'',
				style : 'margin-bottom: 5px;',
				allowBlank : false,
				blankText : ''+getResource('resourceParam1560')+'',
				maxLength : 20,
				maxLengthText : ''+getResource('resourceParam1000')+'',
				minLength : 1,
				minLengthText : ''+getResource('resourceParam1002')+'',
				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d)*$/,
				regexText : ''+getResource('resourceParam679')+'',
				readOnly : true

			});
	projectFolderDetail.contentsnotes = new Ext.form.TextArea({
				id : 'contentsnotes1',
				name : 'contentsnotes',
				fieldLabel : ''+getResource('resourceParam1256')+'',
				height : 150,
				style : 'margin-bottom: 5px;',
				maxLength : 999,
				grow : true,
				growMin : 150,
				preventScrollbars : true,
				minLengthText : ''+getResource('resourceParam1256')+''+getResource('resourceParam866')+'0',
				readOnly : true
			});

	projectFolderDetail.updateFolderForm = new Ext.form.FormPanel({
				id : 'addFolderForm1',
				bodyStyle : 'padding:10px 0px 10px 10px',
				title : getResource('resourceParam5001'),
				frame : false,
				boder : false,
				defaults : {
					anchor : '62%'
				},
				items : [projectFolderDetail.contentsname, {
					xtype : 'textfield',
					fieldLabel : getResource('resourceParam1973'),
					name : 'securityDegreeName',
					// anchor : '95%',
					style : 'margin-bottom: 5px;',
					width : 250,
					readOnly : true
				},
						projectFolderDetail.contentsnotes]
			});
	projectFolderDetail.updateFolderForm.getForm().load({
		url : '../JSON/project_ProjectRemote.getProjectFolderById?contentsid='
				+ leftNavigationTree.nodeId.replace("c", "")+"&tpye="+ projectFolderDetail.tpye,
		method : 'GET',
		success : function(form, action) {
		},
		failure : function(form, action) {
			Ext.MessageBox.show({
						title : ''+getResource('resourceParam499')+'',
						msg : action.result.error,
						icon : Ext.MessageBox.ERROR,
						buttons : Ext.MessageBox.OK
					});
		}
	});

	return projectFolderDetail.updateFolderForm;
}
