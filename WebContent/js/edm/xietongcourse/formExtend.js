var formExtend = {}

// 文本框
formExtend.textFields = function(id, labelname, value) {
	return new Ext.form.TextField({
				id : id,
				name : id,
				fieldLabel : labelname,
				value : value
			});
}
// 文件
formExtend.files = function(id, labelname, value) {
	return new Ext.form.TextField({
				inputType : 'file',
				allowBlank : true,
				id : id,
				name : id,
				fieldLabel : labelname
			});
}

// 多行文本
formExtend.TextAreas = function(id, labelname, value) {
	return new Ext.form.TextArea({
				id : id,
				name : id,
				fieldLabel : labelname,
				value : value
			});
}

// 日期
formExtend.DateFields = function(id, labelname, value, format) {

	return new Ext.form.DateField({
				fieldLabel : labelname,
				format : format,
				name : id,
				id : id,
				value : value
			});
}

// 数字框
formExtend.NumberFields = function(id, labelname, value, precision) {
	return new Ext.form.NumberField({
				id : id,
				name : id,
				fieldLabel : labelname,
				decimalPrecision : precision,
				value : value
			});
}
// 编辑文本框
formExtend.HtmlEditors = function(id, labelname, value) {
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
formExtend.Checkboxs = function(id, labelname, boxlabel, isvalue) {
	return new Ext.form.Checkbox({
				id : id,
				name : id,
				fieldLabel : labelname,
				boxLabel : boxlabel,
				checked : isvalue
			});
}

formExtend.combo = function(id, labelname, value) {
	var s = value == "true" ? 1 : 2;
	return new Ext.form.ComboBox({
				id : id,
				fieldLabel : labelname,
				value : s,
				name : id,
			
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
											2,
											''
													+ getResource('resourceParam510')
													+ '']]
						}),
				valueField : "id",
				displayField : 'displayText',
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

// 下拉框
formExtend.ComboBoxs = function(url, id, name, labelname, value) {

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
				name : id
			});
}
// 表单控件
formExtend.FormControls = function(id, labelname, value, format, precision,
		type) {
	// alert(id+"---"+labelname+"----"+value+"----"+format+"----"+precision+"-----"+type);
	if (type == "string") {
		return formExtend.textFields(id, labelname, value);// 返回文本框控件
	} else if (type == "integer") {
		return formExtend.NumberFields(id, labelname, value, precision);// 返回整形文本控件
	} else if (type == "double") {
		return formExtend.NumberFields(id, labelname, value, precision);
	} else if (type == "boolean") {
		return formExtend.combo(id, labelname, value);
	} else if (type == "date") {
		return formExtend.DateFields(id, labelname, value, format);
	} else if (type == "file") {
		return formExtend.files(id, labelname, value);
	}
	// else if (type == "dataset") {
	// return formExtend.ComboBoxs(url, id, name, labelname, value);
	// }
}
