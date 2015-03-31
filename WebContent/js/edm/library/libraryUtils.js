var libraryUtils = {}

// 文本框
libraryUtils.textFields = function(id, name, labelname, value, allowblank,
		checkstr, length) {
	return new Ext.form.TextField({
				id : id,
				name : name,
				allowBlank : allowblank == undefined ? true : allowblank,
				maxLengthText : getResource('resourceParam1386') + length,
				maxLength : (length == undefined || length == 0) ? Number.MAX_VALUE : length,
				regex : (checkstr == '' || checkstr == undefined)
						? null
						: new RegExp(checkstr),
				fieldLabel : labelname,
				anchor : '100%',
				value : value,
				blankText : '' + getResource('resourceParam7011') + '！'// 请输入字符串
			});
}
// 文件
libraryUtils.files = function(id, name, labelname, value, allowblank) {
	return new Ext.form.FileUploadField({
				buttonText : ''+getResource('resourceParam569')+'',
				allowBlank : allowblank == undefined ? true : allowblank,
				border : false,
				anchor : '61.8%',
				name : name,
				id : id,
				fieldLabel : labelname,
				value : value.split(',')[1],
				readOnly : true
			})
}

// 日期
libraryUtils.DateFields = function(id, name, labelname, value, format,
		allowblank, checkstr) {

	return new Ext.form.DateField({
				fieldLabel : labelname,
				format : format,
				editable : false,
				allowBlank : allowblank == undefined ? true : allowblank,
				regex : (checkstr == '' || checkstr == undefined)
						? null
						: new RegExp(checkstr),
				name : name,
				id : id,
				value : value,
				anchor : '61.8%',
				blankText : '' + getResource('resourceParam1029') + ''// 请选择日期

			});
}

// 数字框
libraryUtils.NumberFields = function(id, name, labelname, value, precision,
		allowblank, checkstr, length) {
	return new Ext.form.NumberField({
				id : id,
				name : name,
				fieldLabel : labelname,
				allowBlank : allowblank == undefined ? true : allowblank,
				maxLengthText : getResource('resourceParam1386') + length,
				maxLength : (length == undefined || length == 0) ? Number.MAX_VALUE : length,
				regex : (checkstr == '' || checkstr == undefined)
						? null
						: new RegExp(checkstr),
				decimalPrecision : precision,
				anchor : '61.8%',
				value : value,
				blankText : '' + getResource('resourceParam7012') + ''// 请输入数值
			});
}

//布尔
libraryUtils.booleanField = function(id, name, labelname, value) {
	if(value==''){
		value = 0;
	}
	return new Ext.form.ComboBox({
				fieldLabel : labelname,
				value : value,
				name : name,
				hiddenName : name,
				anchor : '61.8%',
				typeAhead : true,
				triggerAction : 'all',
				lazyRender : true,
				editable : false,
				mode : 'local',
				store : new Ext.data.ArrayStore({
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

//枚举
libraryUtils.enumTypeField = function(id, name, labelname, value, format,
		precision, type, allowblank, checkstr, length, typeobj) {
	if (typeobj == undefined) {
		return new Ext.form.TextField({
					id : id,
					name : name,
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
				name : name,
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

libraryUtils.getFieldSet = function(title) {
	return new Ext.form.FieldSet({
		title:title,
		collapsible:true,
		autoHeight:true,
		layout:'column',
		defaults:{
			defaultType:'textfield',
			border:false,
			columnWidth:0.5,
			style:{
				"display":"inline",
				"margin-left":"10px",
				"margin-right":"30px"
			}
		}
	});
}

libraryUtils.getDataTypeById = function(id){
	var conn = synchronize.createXhrObject();
	var url = "../JSON/dynamicmodel_datatype.getDataTypeById?datatypeId="+id;
	conn.open("GET", url, false);
	conn.send(null);
	
	return Ext.util.JSON.decode(conn.responseText);
}

libraryUtils.getChildDataModelPhysicType = function(id){
	var conn = synchronize.createXhrObject();
	var url = "../JSON/dataModel_dataModelRemote.getChildDataModelPhysicType?dataCenterID="+id+"&parentDataEntityID=0&disableCheck=false";
	conn.open("GET", url, false);
	conn.send(null);
	
	return Ext.util.JSON.decode(conn.responseText);
}

libraryUtils.getFormControl = function(id, name, labelname, value, format,
		precision, type, allowblank, checkstr, length) {
	if (type == "string") {
		return libraryUtils.textFields(id, name, labelname, value, allowblank,
				checkstr, length);
	} else if (type == "integer") {
		return libraryUtils.NumberFields(id, name, labelname, value, precision,
				allowblank, checkstr, length);
	} else if (type == "double") {
		return libraryUtils.NumberFields(id, name, labelname, value, precision,
				allowblank, checkstr, length);
	} else if (type == "boolean") {
		return libraryUtils.booleanField(id, name, labelname, value);
	} else if (type == "date") {
		return libraryUtils.DateFields(id, name, labelname, value, format);
	} else if (type == "file") {
		return libraryUtils.files(id, name, labelname, value, allowblank);
	}
}

libraryUtils.balanceForm = function(m,f){
	for(var g in m){
		var fset1 = m[g].items.get(0);
		for(var i=0;i<fset1.items.getCount();i++){
			if(i%2==0){
				var t = fset1.items.get(i);
				m[g].items.get(0).remove(t);
				m[g].items.get(1).add(t);
			}
		}
		f.add(m[g]);
	}
}