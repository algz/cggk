var createExtendForm = {
	isExtendFormExist : false//每当更换了类型，置为false。没更换类型时，保持扩展页面的值
};
/*
 * form 要加入items的表单 items 传入的items labelWidth items名称的宽度
 */
createExtendForm.createForm = function(form, items, labelWidth) {
	var paddingleft = labelWidth + 5;
	if (paddingleft < 105) {
		paddingleft = 105;
	}
	if (labelWidth < 100) {
		labelWidth = 100;
	}
	function toFormItem(item) {
		var formItem = null;
		if (item.type == 'string') {
			fileSequence += 1;
			formItem = new Ext.form.TextField({
						fieldLabel : item.label,
						labelStyle : 'width:' + labelWidth + 'px;',
						name : item.objid,
						value : item.value,
						allowBlank : item.allowBlank,
						width : item.width,
						style : 'margin-bottom: 5px',
						maxLength : 20,
						maxLengthText : ''+getResource('resourceParam1000')+'',
						minLength : 1,
						minLengthText : ''+getResource('resourceParam1002')+'',
						blankText : ''+getResource('resourceParam1027')+'',
						emptyText : ''+getResource('resourceParam1027')+'',
						// regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d)*$/,
						// regexText : '只能输入中文,字母,数字',
						validator : function(val) {
							if(this.allowBlank){
								return true;
							}
							if (val.trim() == '') {
								return ""+getResource('resourceParam1027')+"";
							}
							return true;
						},
						listeners : {
							render : function() {
								this.el.dom.parentNode.setAttribute('style',
										'padding-left:' + paddingleft + 'px');
							}
						}
					});
		} else if (item.type == 'integer') {
			fileSequence += 1;
			formItem = new Ext.form.NumberField({
						fieldLabel : item.label,
						labelStyle : 'width:' + labelWidth + 'px',
						name : item.objid,
						value : item.value,
						maxValue : Math.pow(2, 31) - 1,
						minValue : -Math.pow(2, 31),
						allowBlank : item.allowBlank,
						width : item.width,
						style : 'margin-bottom: 5px;',
						allowDecimals : false,
						allowNegative : true,
						blankText : ''+getResource('resourceParam1028')+'',
						emptyText : ''+getResource('resourceParam1028')+'',
						invalidText : ''+getResource('resourceParam1024')+'',
						listeners : {
							render : function() {
								this.el.dom.parentNode.setAttribute('style',
										'padding-left:' + paddingleft + 'px');
							}
						}
					});
		} else if (item.type == 'double') {
			fileSequence += 1;
			formItem = new Ext.form.NumberField({
						fieldLabel : item.label,
						labelStyle : 'width:' + labelWidth + 'px',
						name : item.objid,
						value : item.value,
						maxValue : Math.pow(2, 63) - 1,
						minValue : -Math.pow(2, 63),
						allowBlank : item.allowBlank,
						width : item.width,
						style : 'margin-bottom: 5px;',
						allowDecimals : true,
						allowNegative : true,
						decimalPrecision : 9,
						blankText : ''+getResource('resourceParam1025')+'',
						emptyText : ''+getResource('resourceParam1025')+'',
						invalidText : ''+getResource('resourceParam1023')+'',
						listeners : {
							render : function() {
								this.el.dom.parentNode.setAttribute('style',
										'padding-left:' + paddingleft + 'px');
							}
						}
					});
		} else if (item.type == 'date') {
			fileSequence += 1;
			formItem = new Ext.form.DateField({
						fieldLabel : item.label,
						labelStyle : 'width:' + labelWidth + 'px',
						name : item.objid,
						value : item.value,
						allowBlank : item.allowBlank,
						width : item.width,
						style : 'margin-bottom: 5px;',
						format : 'Y年m月d日',
						editable : false,
						blankText : ''+getResource('resourceParam1029')+'',
						emptyText : ''+getResource('resourceParam1029')+''
					});
		} else if (item.type == 'boolean') {
			fileSequence += 1;
			formItem = new Ext.form.ComboBox({
						value : 'false',
						fieldLabel : item.label,
						value : item.value,
						labelStyle : 'width:' + labelWidth + 'px',
						hiddenName : item.objid,
						allowBlank : item.allowBlank,
						width : item.width,
						style : 'margin-bottom: 5px;',
						store : new Ext.data.SimpleStore({
									fields : ['value', 'state'],
									data : [['false', ''+getResource('resourceParam510')+''], ['true', ''+getResource('resourceParam512')+'']]
								}),
						valueField : 'value',
						displayField : 'state',
						typeAhead : false,
						mode : 'local',
						triggerAction : 'all',
						selectOnFocus : true,
						forceSelection : true,
						editable : false
					});
		} else if (item.type == 'file') {
			fileSequence += 1;
			var filename;
			if (item.value != null) {
				filename = item.value.split("/")[1];
				if (filename == null) {
					filename = item.value.split("\\")[1];
				}
			}
			formItem = new Ext.ux.form.FileUploadField({
						fieldLabel : item.label,
						value : filename,
						labelStyle : 'width:' + labelWidth + 'px',
						name : 'file' + fileSequence,
						allowBlank : item.allowBlank,
						width : item.width,
						style : 'margin-bottom: 5px;',
						buttonText : ''+getResource('resourceParam473')+'',
						emptyText : ''+getResource('resourceParam1022')+'',
						listeners : {
							render : function() {
								this.el.dom.parentNode.parentNode.setAttribute(
										'style', 'padding-left:' + paddingleft
												+ 'px');
								this.el.dom.parentNode.setAttribute('style',
										'width:' + item.width + 'px;'
												+ 'margin-bottom: 5px;');
							}
						}
					});
		}
		return formItem;
	}
	var length = items.length;
	var fileSequence = 0;// 标记是第几个文件
	for (var i = 0; i < length; i++) {
		if (items[i].allowBlank == false) {
			items[i].label += '(<span style="color:red;" >＊</span>)';
		}
		createExtendForm.item = toFormItem(items[i])
		form.insert(i, createExtendForm.item);
	}
	createExtendForm.isExtendFormExist = true;
	form.doLayout();
}

createExtendForm.createViewForm = function(form, items, labelWidth) {
	var paddingleft = labelWidth + 5;
	if (paddingleft < 105) {
		paddingleft = 105;
	}
	if (labelWidth < 100) {
		labelWidth = 100;
	}
	function toFormItem(item) {
		var formItem = null;
		if (item.type == 'string') {
			formItem = new Ext.form.TextField({
						fieldLabel : item.name,
						labelStyle : 'width:' + labelWidth + 'px',
						name : item.objid,
						value : item.value,
						width : item.width,
						readOnly : true,
						style : 'margin-bottom: 5px;',
						listeners : {
							render : function() {
								this.el.dom.parentNode.setAttribute('style',
										'padding-left:' + paddingleft + 'px');
							}
						}
					});
		} else if (item.type == 'integer') {
			formItem = new Ext.form.TextField({
						fieldLabel : item.name,
						labelStyle : 'width:' + labelWidth + 'px',
						name : item.objid,
						value : item.value,
						width : item.width,
						readOnly : true,
						style : 'margin-bottom: 5px;',
						listeners : {
							render : function() {
								this.el.dom.parentNode.setAttribute('style',
										'padding-left:' + paddingleft + 'px');
							}
						}
					});
		} else if (item.type == 'double') {
			formItem = new Ext.form.TextField({
						fieldLabel : item.name,
						labelStyle : 'width:' + labelWidth + 'px',
						name : item.objid,
						value : item.value,
						width : item.width,
						readOnly : true,
						style : 'margin-bottom: 5px;',
						listeners : {
							render : function() {
								this.el.dom.parentNode.setAttribute('style',
										'padding-left:' + paddingleft + 'px');
							}
						}
					});
		} else if (item.type == 'date') {
			formItem = new Ext.form.TextField({
						fieldLabel : item.name,
						labelStyle : 'width:' + labelWidth + 'px',
						name : item.objid,
						value : item.value,
						width : item.width,
						readOnly : true,
						style : 'margin-bottom: 5px;',
						listeners : {
							render : function() {
								this.el.dom.parentNode.setAttribute('style',
										'padding-left:' + paddingleft + 'px');
							}
						}
					});
		} else if (item.type == 'boolean') {
			formItem = new Ext.form.TextField({
						fieldLabel : item.name,
						labelStyle : 'width:' + labelWidth + 'px',
						name : item.objid,
						width : item.width,
						readOnly : true,
						style : 'margin-bottom: 5px;',
						listeners : {
							render : function() {
								this.el.dom.parentNode.setAttribute('style',
										'padding-left:' + paddingleft + 'px');
							}
						}
					});
			if (item.value == 'false') {
				formItem.setValue(''+getResource('resourceParam510')+'');
			} else if (item.value == 'true') {
				formItem.setValue(''+getResource('resourceParam512')+'');
			}
		} else if (item.type == 'file') {
			if (labelWidth < 100) {
				labelWidth = 100;
			}
			var filename;
			var path;
			if (item.value != null) {
				path=item.value.split("/")[0];
				filename = item.value.split("/")[1];
				if (filename == null) {
					path=item.value.split("\\")[0];
					filename = item.value.split("\\")[1];
				}
			}
			if (item.value != null && item.value != ' ') {
				formItem = new Ext.form.Label({
					html : '<div class="x-form-item " tabindex="-1">'
							+ '<label class="x-form-item-label" style="width: '
							+ labelWidth
							+ 'px;" >'
							+ item.name
							+ ':</label>'
							+ '<div  class="x-form-element" style="padding-left: '
							+ ((labelWidth == 100)
									? (labelWidth + 5)
									: (labelWidth))
							+ 'px;">'
							+ '<span class=" x-form-text x-form-field" style="margin-bottom: 5px; width: 250px;">'
							+ '<a ext:qtip="'+getResource('resourceParam1026')+'" style="text-decoration:underline;color:blue;padding-bottom:0px;padding-top:2px;" href="../FILEDOWN/?ID='+ path+ '&ORIGINALNAME='+ encodeURI(encodeURI(filename))
							+ '">' + Ext.util.Format.ellipsis(filename, 30, true) + '</a>' + '</span>'
//							+ '<a ext:qtip="'+getResource('resourceParam1026')+'" style="text-decoration:underline;color:blue;padding-bottom:0px;padding-top:2px;" href="../JSON/FileDownloadServlet?type=0&filename='+encodeURI(encodeURI(filename))+'&path='
//							+ path + '">' + Ext.util.Format.ellipsis(filename, 30, true) + '</a>' + '</span>'
							+ '</div>' + '<div class="x-form-clear-left"/>'
							+ '</div>'
				});
			} else {

				labelStyle : 'width:' + labelWidth + 'px', formItem = new Ext.form.Label(
						{
							html : '<div class="x-form-item " tabindex="-1">'
									+ '<label class="x-form-item-label" style="width:'
									+ labelWidth
									+ 'px;" >'
									+ item.name
									+ ':</label>'
									+ '<div  class="x-form-element" style="padding-left: '
									+ ((labelWidth == 100)
											? (labelWidth + 5)
											: (labelWidth))
									+ 'px;">'
									+ '<span class=" x-form-text x-form-field" style="margin-bottom: 5px; width: 250px;">'+getResource('resourceParam1030')+'</span>'
									+ '</div>'
									+ '<div class="x-form-clear-left"/>'
									+ '</div>'
						});
			}
		}
		return formItem;

	}
	var length = items.length;
	for (var i = 0; i < length; i++) {
		createExtendForm.item = toFormItem(items[i])
		form.insert(i, createExtendForm.item);
	}
	form.doLayout();
}
