var extendTypeProPanel = {editable : true};

extendTypeProPanel.init = function() {
	extendTypeProPanel.baseTypeComb = extendTypeMain.getBaseTypeComb("extendTypeProBaseType",
			"baseTypeName", ""+getResource('resourceParam610')+"", 200);
	extendTypeProPanel.formPanel = new Ext.form.FormPanel({
		labelAlign : 'right',
		border : false,
		labelWidth : 100,
		defaults : {
			margin : '5px'
		},
		items : [new Ext.form.FieldSet({
			title : '<span>'+getResource('resourceParam7029')+'</span>',//属性
			style : 'margin:10px 5px 0 5px;',
			items : [new Ext.form.TextField({
								id : 'extendTypeProTypeName',
								name : 'dataTypeName',
								fieldLabel : ''+getResource('resourceParam1139')+'',
								width : 200,
								validator : function(value) {
									if (Ext.util.Format.trim(value).length == 0) {
										this.invalidText = ""+getResource('resourceParam1089')+"";
										return false;
									}
									if (value.length > 50) {
										this.invalidText = ''+getResource('resourceParam1271')+'';
										return false;
									}
									var reg = /^.*[/\\:\*\?\"<>\|]+.*$/;
									if (reg.test(value)) {
										this.invalidText = ""+getResource('resourceParam1087')+"";
										return false;
									} else {
										return true;
									}
								}
							}), extendTypeProPanel.baseTypeComb, new Ext.form.Hidden({
								id : 'extendTypeProRealBaseType',
								name : 'dataType'
							}), new Ext.form.TextArea({
								id : 'extendTypeProTypeDiscription',
								name : 'dataTypeDiscription',
								fieldLabel : ''+getResource('resourceParam648')+'',
								width : 200,
								maxLength : 500
							})]
		})],
		tbar : [{
			text : ''+getResource('resourceParam7002')+'',//保存
			disabled : true,
			id : 'extendTypeProPanelSave',
			iconCls : 'save1',
			handler : function() {
				var formValues = extendTypeProPanel.formPanel.getForm()
						.getValues(false);
				if(extendTypeProPanel.formPanel.getForm().isValid()){
					var DataTypeVo = Seam.Remoting
							.createType("com.sysware.edm.dynamicmodel.DataTypeVo");
					DataTypeVo.setDatatype(formValues.dataType);
					DataTypeVo.setDatatypeName(formValues.dataTypeName);
					DataTypeVo.setCheckStr(formValues.checkStr);
					DataTypeVo.setDatatypeId(extendTypeProPanel.record
							.get("datatypeId"));
					DataTypeVo.setDatatypeRank(2);
					DataTypeVo
							.setDatatypeDiscription(formValues.dataTypeDiscription);
					Seam.Component.getInstance("dynamicmodel_datatype")
							.insertOrUpdateDataType(DataTypeVo, function(result) {
								if(result == "true"){
									extendTypeMain.ds.reload({
										params: {
									        start: 0,          
									        limit: extendTypeMain.sizePerPage
									    },
										callback : function() {
											extendTypeMain.grid
													.getSelectionModel()
													.selectRow(extendTypeMain.ds.findExact('datatypeName',formValues.dataTypeName));
											Ext.example.msg(""+getResource('resourceParam575')+"",""+getResource('resourceParam1072')+"");
										}
									});
								}else{
									Ext.MessageBox.show({
														title : ''+getResource('resourceParam651')+'',
														msg : ''+getResource('resourceParam7035')+'：<span style="color:blue;">'+result+'       </span>',//已存在重名对象
														buttons : Ext.MessageBox.OK,
														icon : Ext.MessageBox.ERROR
													});
								}
							});
				}else{
					
				}
			}
		}]

	})

	extendTypeProPanel.mainPanel = new Ext.Panel({
//				region : 'center',
				id : 'extendTypeProPanel',
				disabled : true,
				layout : 'fit',
				items : [extendTypeProPanel.formPanel],
				border : true,
				bodyStyle : 'border-top:0;border-right:0;border-bottom:0;',
				activeTab : 0
			})
	return extendTypeProPanel.mainPanel;
}

extendTypeProPanel.clearFormValues = function() {
	var record = Ext.data.Record.create([{
				name : 'datatypeName',
				type : 'string'
			}, {
				name : 'datatype',
				type : 'string'
			}, {
				name : 'basetypeName',
				type : 'string'
			}, {
				name : 'datatypeDiscription',
				type : 'string'
			}]);
	var rec = new record({
				datatypeName : '',
				datatype : '',
				basetypeName : '',
				datatypeDiscription : ''
			});
	extendTypeProPanel.setFormValues(rec);
}

extendTypeProPanel.setFormValues = function(rec, n) {
	extendTypeProPanel.record = rec;
	Ext.get('extendTypeProTypeName').dom.value = rec.get("datatypeName");
	Ext.getCmp('extendTypeProBaseType').setValue(rec.get("datatype"));
	Ext.get('extendTypeProBaseType').dom.value = rec.get("basetypeName");
	Ext.get('extendTypeProRealBaseType').dom.value = rec.get("datatype");
	Ext.get('extendTypeProTypeDiscription').dom.value = rec.get("datatypeDiscription");
	var theFormSet = extendTypeProPanel.formPanel.items.get(0);
	
	if(rec.get("datatype") == 'file'||rec.get("datatype") == 'string'){
		var fieldlabel = rec.get("datatype") == 'file'?""+getResource('resourceParam7037')+"":""+getResource('resourceParam7038')+"";//文件值域,正则表达式值域
		if(rec.get("datatype") == 'file'){
			var extendTypeProFileTypeCheckStr =  new Ext.form.TextField({
								id : 'extendTypeProFileTypeCheckStr',
								name : 'checkStr',
								fieldLabel : fieldlabel,
								width : 200,
								value : rec.get("checkStr"),
								regex : /^.\d*[A-Za-z]+\d*(;.\d*[A-Za-z]+\d*)*$/
							})
			if(Ext.get('extendTypeProFileTypeCheckStr') == null){
				theFormSet.insert(3,extendTypeProFileTypeCheckStr);
			}
			if(Ext.get('extendTypeProRegTypeCheckStr') != null){
				theFormSet.remove(Ext.getCmp('extendTypeProRegTypeCheckStr'));
			}
			if(Ext.get('extendTypeProRegTypeHidden') != null){
				theFormSet.remove(Ext.getCmp('extendTypeProRegTypeHidden'));
			}
		}else{
			var extendTypeProRegTypeHidden = new Ext.form.Hidden({
				id : 'extendTypeProRegTypeHidden',
				name : 'checkStr'
			})
			
			var extendTypeProRegTypeCheckStr =  new Ext.form.ComboBox({
						store : new Ext.data.JsonStore({
							url : '../JSON/dataModel_dataModelRemote.getChildDataModel',
							method : 'GET',
							root : 'results',
							fields : [{
										name : 'text',
										mapping : 'text'
									}, {
										name : 'dataEntityID',
										mapping : 'dataEntityID'
									}, {
										name : 'dataCenterID',
										mapping : 'dataCenterID'
									},{
										name : 'value',
										mapping : 'value'
									}],
							baseParams : {
								dataCenterID : "20100816113505000140018d9ae15dd0492b9789",
								parentDataEntityID : '0'
							}
						}),
						id : 'extendTypeProRegTypeCheckStr',
						name : 'checkStrText',
						fieldLabel : fieldlabel,
						triggerAction : 'all',
						width : 200,
						valueField : 'value',
						displayField : 'text',
						value : rec.get("checkStr"),
						editable : true,
						lazyRender : true,
						enableKeyEvents : true,
						validator : function(value){
							try {
								var reg = new RegExp(value);
							} catch (e) {
								// Ext.Msg.alert('', );
								return e.message;
							}
							return true;
						},
						onSelect : function(record, index) {
							if (this.fireEvent('beforeselect', this, record,
									index) !== false) {
								var value = record.data[this.valueField
										|| this.displayField];
								this.setValue(value);
								this.collapse();
								this.fireEvent('select', this, record, index);
							}
							this.flag = 0;//从类型库里选择方式
							Ext.get('extendTypeProRegTypeHidden').dom.value = record.data[this.valueField];
						},
						onKeyPress : function(e){
					        this.fireEvent('keypress', this, e);
					        this.flag = 1;//输入方式
					    },
						onBlur : function(){
					        this.beforeBlur();
					        if(this.focusClass){
					            this.el.removeClass(this.focusClass);
					        }
					        this.hasFocus = false;
					        if(this.validationEvent !== false && (this.validateOnBlur || this.validationEvent != 'blur')){
					            this.validate();
					        }
					        var v = this.getValue();
					        if(String(v) !== String(this.startValue)){
					            this.fireEvent('change', this, v, this.startValue);
					        }
					        this.fireEvent('blur', this);
					        this.postBlur();
					        if(this.flag == 1){
					        	Ext.get('extendTypeProRegTypeHidden').dom.value = Ext.get('extendTypeProRegTypeCheckStr').dom.value;
					        }
					    }
					})
			if(Ext.get('extendTypeProRegTypeCheckStr') == null){
				theFormSet.insert(3,extendTypeProRegTypeCheckStr);
				theFormSet.insert(4,extendTypeProRegTypeHidden);
			}
			if(Ext.get('extendTypeProFileTypeCheckStr') != null){
				theFormSet.remove(Ext.getCmp('extendTypeProFileTypeCheckStr'));
			}
		}
	}else{
		if(Ext.get('extendTypeProFileTypeCheckStr') != null){
			theFormSet.remove(Ext.getCmp('extendTypeProFileTypeCheckStr'));
		}
		if(Ext.get('extendTypeProRegTypeCheckStr') != null){
			theFormSet.remove(Ext.getCmp('extendTypeProRegTypeCheckStr'));
		}
		if(Ext.get('extendTypeProRegTypeHidden') != null){
			theFormSet.remove(Ext.getCmp('extendTypeProRegTypeHidden'));
		}
	}
	if(Ext.get('extendTypeProFileTypeCheckStr') != null&&rec.get("datatype") == 'file'){
		Ext.get('extendTypeProFileTypeCheckStr').dom.value = rec.get("checkStr");
	}
	if(Ext.get('extendTypeProRegTypeCheckStr') != null&&rec.get("datatype") == 'string'){
		Ext.get('extendTypeProRegTypeCheckStr').dom.value = rec.get("checkStr");
	}
	extendTypeProPanel.formPanel.doLayout();
}
