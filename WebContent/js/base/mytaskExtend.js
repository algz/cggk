var mytaskExtend = {}

// 文本框
mytaskExtend.textFields = function(id, labelname, value, allowBlank) {
	return new Ext.form.TextField( {
		id : id,
		name : id,
		fieldLabel : labelname,
		anchor : '61.8%',
		value : value,
		allowBlank : allowBlank,
		blankText : '' + getResource('resourceParam9142') + ''
	});
}
// 文件
mytaskExtend.files = function(id, labelname, value, allowBlank) {
	return new Ext.form.TextField( {
		inputType : 'file',
		allowBlank : allowBlank,
		id : id,
		name : id,
		anchor : '61.8%',
		fieldLabel : labelname,
		blankText : '' + getResource('resourceParam9142') + ''
	});
}

// 多行文本
mytaskExtend.TextAreas = function(id, labelname, value, allowBlank) {
	return new Ext.form.TextArea( {
		id : id,
		name : id,
		fieldLabel : labelname,
		anchor : '61.8%',
		value : value,
		allowBlank : allowBlank
	});
}

// 日期
mytaskExtend.DateFields = function(id, labelname, value, format, allowBlank) {

	return new Ext.form.DateField( {
		fieldLabel : labelname,
		format : format,
		name : id,
		id : id,
		value : value,
		anchor : '61.8%',
		allowBlank : allowBlank,
		blankText : '' + getResource('resourceParam9142') + '',
		invalidText : '' + getResource('resourceParam9800') + ''

	});
}

mytaskExtend.invalidText = function(value){
	alert(value);
	return getResource('resourceParam9142');
}

// 数字框
mytaskExtend.NumberFields = function(id, labelname, value, precision,
		allowBlank) {
	return new Ext.form.NumberField( {
		id : id,
		name : id,
		fieldLabel : labelname,
		decimalPrecision : precision,
		anchor : '61.8%',
		value : value,
		allowBlank : allowBlank,
		blankText : '' + getResource('resourceParam9142') + ''
	});
}
// 编辑文本框
mytaskExtend.HtmlEditors = function(id, labelname, value, allowBlank) {
	return new Ext.form.HtmlEditor( {
		id : id,
		name : id,
		fieldLabel : labelname,
		anchor : '61.8%',
		value : value,
		fontFamilies : [ '宋体', '黑体', '隶书', '幼圆', 'Arial', 'Courier New',
				'Tahoma', 'Times New Roman', 'Verdana' ],
		defaultFont : '宋体'
	});
}
// 复选框
mytaskExtend.Checkboxs = function(id, labelname, boxlabel, isvalue, allowBlank) {
	return new Ext.form.Checkbox( {
		id : id,
		name : id,
		fieldLabel : labelname,
		boxLabel : boxlabel,
		anchor : '61.8%',
		checked : isvalue
	});
}

mytaskExtend.combo = function(id, labelname, value, allowBlank) {
	/**
	 * bug 编号517
	 * 
	 * @author wangyf
	 */
	// var s = value == "true" ? 1 : 2;
	if (value == null) {
		return;
	}
	return new Ext.form.ComboBox( {
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
		allowBlank : allowBlank,
		store : new Ext.data.ArrayStore( {
			id : 0,
			fields : [ "id", 'displayText' ],
			data : [ [ 1, '' + getResource('resourceParam512') + '' ],
					[ 2, '' + getResource('resourceParam510') + '' ] ]
		}),
		valueField : "id",
		displayField : 'displayText',
		onSelect : function(record, index) {
			if (this.fireEvent('beforeselect', this, record, index) !== false) {
				var value = record.data[this.valueField || this.displayField];
				this.setValue(value);
				this.collapse();
				this.fireEvent('select', this, record, index);
			}

		}
	});
}

// 下拉框
mytaskExtend.ComboBoxs = function(url, id, name, labelname, value, allowBlank) {

	return new Ext.form.ComboBox( {
		store : new Ext.data.Store( {
			proxy : new Ext.data.HttpProxy( {// 可以获取子类型了，但是对于选择的判断，还有类型的过滤仍然需要调试，这里要加入rank，以便判断是不是加入全部的子类型？
				url : url
			}),
			reader : new Ext.data.JsonReader( {
				totalProperty : 'totalProperty',
				root : 'results'
			}, [ {
				name : id
			}, {
				name : name
			} ])
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
// 表单控件
mytaskExtend.FormControls = function(id, labelname, value, format, precision,
		type, aBlank) {
	var allowBlank = true;
	if (undefined != aBlank) {
		allowBlank = aBlank;
	}
	// alert(id+"---"+labelname+"----"+value+"----"+format+"----"+precision+"-----"+type);
	if (type == "string") {
		return mytaskExtend.textFields(id, labelname, value, allowBlank);// 返回文本框控件
	} else if (type == "integer") {
		return mytaskExtend.NumberFields(id, labelname, value, precision,
				allowBlank);// 返回整形文本控件
	} else if (type == "double") {
		return mytaskExtend.NumberFields(id, labelname, value, precision,
				allowBlank);
	} else if (type == "boolean") {
		return mytaskExtend.combo(id, labelname, value, allowBlank);
	} else if (type == "date") {
		return mytaskExtend
				.DateFields(id, labelname, value, format, allowBlank);
	} else if (type == "file") {
		return mytaskExtend.files(id, labelname, value, allowBlank);
	}
	// else if (type == "dataset") {
	// return mytaskExtend.ComboBoxs(url, id, name, labelname, value);
	// }
}
