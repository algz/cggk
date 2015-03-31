var whExtend = {}

// 文本框
whExtend.textFields = function(id, labelname, value, allowblank, checkstr,
		length) {
	return new Ext.form.TextField({
				id : id,
				name : id,
				allowBlank : allowblank == undefined ? true : allowblank,
				maxLengthText : getResource('resourceParam1386') + length,
				maxLength : length == undefined ? Number.MAX_VALUE : length,
				regex : (checkstr == '' || checkstr == undefined)
						? null
						: new RegExp(checkstr),
				fieldLabel : labelname,
				anchor : '61.8%',
				value : value,
				blankText : '' + getResource('resourceParam7011') + '！'// 请输入字符串
			});
}
// 文件
whExtend.files = function(id, labelname, value) {
	return new Ext.form.TextField({
				inputType : 'file',
				allowBlank : true,
				id : id,
				name : id,
				anchor : '61.8%',
				fieldLabel : labelname
			});
}

// 多行文本
whExtend.TextAreas = function(id, labelname, value) {
	return new Ext.form.TextArea({
				id : id,
				name : id,
				fieldLabel : labelname,
				anchor : '61.8%',
				value : value
			});
}

// 日期
whExtend.DateFields = function(id, labelname, value, format, allowblank,
		checkstr) {

	return new Ext.form.DateField({
				fieldLabel : labelname,
				format : format,
				allowBlank : allowblank == undefined ? true : allowblank,
				regex : (checkstr == '' || checkstr == undefined)
						? null
						: new RegExp(checkstr),
				name : id,
				id : id,
				value : value,
				anchor : '61.8%',
				blankText : '' + getResource('resourceParam1029') + ''// 请选择日期

			});
}

// 数字框
whExtend.NumberFields = function(id, labelname, value, precision, allowblank,
		checkstr, length) {
	return new Ext.form.NumberField({
				id : id,
				name : id,
				fieldLabel : labelname,
				allowBlank : allowblank == undefined ? true : allowblank,
				maxLengthText : getResource('resourceParam1386') + length,
				maxLength : length == undefined ? Number.MAX_VALUE : length,
				regex : (checkstr == '' || checkstr == undefined)
						? null
						: new RegExp(checkstr),
				decimalPrecision : precision,
				anchor : '61.8%',
				value : value,
				blankText : '' + getResource('resourceParam7012') + ''// 请输入数值
			});
}
// 编辑文本框
whExtend.HtmlEditors = function(id, labelname, value) {
	return new Ext.form.HtmlEditor({
				id : id,
				name : id,
				fieldLabel : labelname,
				anchor : '61.8%',
				value : value,
						fontFamilies: ['宋体','黑体','隶书','幼圆','Arial','Courier New','Tahoma','Times New Roman','Verdana'],
		defaultFont: '宋体'
			});
}
// 复选框
whExtend.Checkboxs = function(id, labelname, boxlabel, isvalue) {
	return new Ext.form.Checkbox({
				id : id,
				name : id,
				fieldLabel : labelname,
				boxLabel : boxlabel,
				anchor : '61.8%',
				checked : isvalue
			});
}

whExtend.combo = function(id, labelname, value) {
//	var s = value == "true" ? 1 : 0;
	var s = value == getResource('resourceParam512') ? value : getResource('resourceParam510');
	return new Ext.form.ComboBox({
				id : id,
				fieldLabel : labelname,
				value : s,
				name : id,
				anchor : '61.8%',
				typeAhead : true,
				triggerAction : 'all',
				lazyRender : true,
				editable : false,
				mode : 'local',
				store : new Ext.data.ArrayStore({
							id : 0,
							fields : ["id", 'displayText'],
							data : [
									[
											'' + getResource('resourceParam512') + '',
											''
													+ getResource('resourceParam512')
													+ ''],
									[
											'' + getResource('resourceParam510') + '',
											''
													+ getResource('resourceParam510')
													+ '']]
						}),
				valueField : "id",
				displayField : 'displayText',
				onSelect : function(record, index) {
					if (this.fireEvent('beforeselect', this, record, index)) {
						var value = record.data[this.valueField
								|| this.displayField];
						this.setValue(value);
						this.collapse();
						this.fireEvent('select', this, record, index);
					}

				}
			});
}

// 下拉框
whExtend.ComboBoxs = function(url, id, name, labelname, value) {

	return new Ext.form.ComboBox({
				store : new Ext.data.Store({
							proxy : new Ext.data.HttpProxy({// 可以获取子类型了，但是对于选择的判断，还有类型的过滤仍然需要调试，这里要加入rank，以便判断是不是加入全部的子类型？
								url : url
							}),
							reader : new Ext.data.JsonReader({
										totalProperty : 'totalProperty',
										root : 'results'
									}, [{
												name : id
											}, {
												name : name
											}])
						}),
				allowBlank : false,
				valueField : id,
				displayField : name,
				mode : 'remote',
				forceSelection : true,
				hiddenName : id,
				editable : false,
				triggerAction : 'all',
				fieldLabel : labelname,
				name : id,
				anchor : '61.8%'
			});
}

whExtend.booleanField = function(id, labelname, value) {
	alert(value+"<");
	return new Ext.form.ComboBox({
				fieldLabel : labelname,
				value : value,
				forceSelection : true,
				allowBlank : false,
				name : id,
				hiddenName : id,
				anchor : '61.8%',
				typeAhead : true,
				triggerAction : 'all',
				lazyRender : true,
				editable : false,
				mode : 'local',
				store : new Ext.data.ArrayStore({
							id : 0,
							fields : ["id", 'displayText'],
							data : [
									[
											1,
											''
													+ getResource('resourceParam512')
													+ ''],
									[
											0,
											''
													+ getResource('resourceParam510')
													+ '']]
						}),
				valueField : "id",
				displayField : 'displayText',
				onSelect : function(record, index) {
					if (this.fireEvent('beforeselect', this, record, index)) {
						var value = record.data[this.valueField
								|| this.displayField];
						this.setValue(value);
						this.collapse();
						this.fireEvent('select', this, record, index);
					}

				}
			});
}

whExtend.enumTypeField = function(id, labelname, value, format, precision,
		type, allowblank, checkstr, length, typeobj) {
	if (typeobj == undefined) {
		return new Ext.form.TextField({
					id : id,
					name : id,
					allowBlank : allowblank == undefined ? true : allowblank,
					fieldLabel : labelname,
					anchor : '61.8%',
					value : value,
					blankText : '' + getResource('resourceParam7011') + '！'// 请输入字符串
				});
	}
	var arr = [];
	for (var i = 0; i < typeobj.length; i++) {
		arr.push([typeobj[i].dataEntityName]);
	}
	return new Ext.form.ComboBox({
				id : id,
				fieldLabel : labelname,
				value : value,
				name : id,
				anchor : '61.8%',
				typeAhead : true,
				triggerAction : 'all',
				lazyRender : true,
				editable : false,
				mode : 'local',
				store : new Ext.data.ArrayStore({
							id : 0,
							fields : ['name'],
							data : arr
						}),
				valueField : "name",
				displayField : 'name',
				onSelect : function(record, index) {
					if (this.fireEvent('beforeselect', this, record, index) !== false) {
						var value = record.data[this.valueField
								|| this.displayField];
						this.setValue(value);
						this.collapse();
						this.fireEvent('select', this, record, index);
					}

				}
			});
}

whExtend.getFormControl = function(id, labelname, value, format, precision,
		type, allowblank, checkstr, length, typeobj) {
	if (type == "string") {
		return whExtend.textFields(id, labelname, value, allowblank, checkstr,
				length);// 返回文本框控件
	} else if (type == "integer") {
		return whExtend.NumberFields(id, labelname, value, precision,
				allowblank, checkstr, length);// 返回整形文本控件
	} else if (type == "double") {
		return whExtend.NumberFields(id, labelname, value, precision,
				allowblank, checkstr, length);
	} else if (type == "boolean") {
		return whExtend.booleanField(id, labelname, value);
	} else if (type == "date") {
		return whExtend.DateFields(id, labelname, value, format);
	} else if (type == "file") {
		return whExtend.files(id, labelname, value);
	}
}

// 表单控件
whExtend.FormControls = function(id, labelname, value, format, precision, type) {
	// alert(id+"---"+labelname+"----"+value+"----"+format+"----"+precision+"-----"+type);
	if (type == "string") {
		return whExtend.textFields(id, labelname, value);// 返回文本框控件
	} else if (type == "integer") {
		return whExtend.NumberFields(id, labelname, value, precision);// 返回整形文本控件
	} else if (type == "double") {
		return whExtend.NumberFields(id, labelname, value, precision);
	} else if (type == "boolean") {
		return whExtend.combo(id, labelname, value);
	} else if (type == "date") {
		return whExtend.DateFields(id, labelname, value, format);
	} else if (type == "file") {
		return whExtend.files(id, labelname, value);
	}
	// else if (type == "dataset") {
	// return whExtend.ComboBoxs(url, id, name, labelname, value);
	// }
}
