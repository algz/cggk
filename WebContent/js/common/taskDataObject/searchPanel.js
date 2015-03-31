Ext.form.superDateField = Ext.extend(Ext.form.DateField, {// 继承dateField，修改使得zindex样式适合
			onTriggerClick : function() {
				if (this.disabled) {
					return;
				}
				if (this.menu == null) {
					this.menu = new Ext.menu.DateMenu( {
						hideOnClick : false
					});
				}
				this.onFocus();
				Ext.apply(this.menu.picker, {
					minDate : this.minValue,
					maxDate : this.maxValue,
					disabledDatesRE : this.disabledDatesRE,
					disabledDatesText : this.disabledDatesText,
					disabledDays : this.disabledDays,
					disabledDaysText : this.disabledDaysText,
					format : this.format,
					showToday : this.showToday,
					minText : String.format(this.minText, this
							.formatDate(this.minValue)),
					maxText : String.format(this.maxText, this
							.formatDate(this.maxValue))
				});
				this.menu.picker.setValue(this.getValue() || new Date());
				this.menu.show(this.el, "tl-bl?");
				this.menuEvents('on');
				this.menu.getEl().dom.style.zIndex = '99999';
			}
		})

var searchPanel = {
	parameters : {}
}

searchPanel.init = function(defaultsConfigs, searchCallback) {
	var projectFormItemConfig = {
		fieldLabel : getResource('resourceParam463') + '',
		width : 120
	};
	Ext.apply(projectFormItemConfig, defaultsConfigs.projectFormItem);
	searchPanel.projectFormItem = new Ext.form.TextField(projectFormItemConfig);

	var taskFormItemConfig = {
		fieldLabel : getResource('resourceParam733') + '',
		width : 120
	}
	Ext.apply(taskFormItemConfig, defaultsConfigs.taskFormItem);
	searchPanel.taskFormItem = defaultsConfigs.taskFormItem.isShow ? new Ext.form.TextField(
			taskFormItemConfig)
			: {};

	var menuHight = defaultsConfigs.taskFormItem.isShow ? 280 : 260;

	var dataNameFormItemConfig = {
		fieldLabel : getResource('resourceParam4052') + ':', //数据名称
		width : 120
	}
	Ext.apply(dataNameFormItemConfig, defaultsConfigs.dataNameFormItem);
	searchPanel.dataNameFormItem = new Ext.form.TextField(
			dataNameFormItemConfig)

	var dataTypeFormItemConfig = {
		fieldLabel : getResource('resourceParam4053') + ':',//数据类型
		width : 120,
		store : new Ext.data.JsonStore( {
			url : '../JSON/dynamicmodel_datatype.getAllDataTypeList',
			method : 'POST',
			fields : [ {
				name : 'datatypeId',
				mapping : 'dataTypeId'
			}, {
				name : 'datatypeName',
				mapping : 'dataTypeName'
			}, {
				name : 'rank',
				mapping : 'rank'
			}, {
				name : 'dataType',
				mapping : 'dataType'
			} ]
		}),
		triggerAction : 'all',
		valueField : 'datatypeName',
		displayField : 'datatypeName',
		editable : false,
		lazyRender : true,
		onSelect : function(record, index) {
			if (this.fireEvent('beforeselect', this, record, index) !== false) {
				var value = record.data[this.valueField || this.displayField];
				this.setValue(value);
				this.collapse();
				this.fireEvent('select', this, record, index);
				searchPanel.dataTypeFormItemHidden.setValue(record
						.get('datatypeId'))
			}
		}

	}
	Ext.apply(dataTypeFormItemConfig, defaultsConfigs.dataTypeFormItem);
	searchPanel.dataTypeFormItem = new Ext.form.ComboBox(dataTypeFormItemConfig);

	var dataTypeFormItemHiddenConfig = {}
	Ext.apply(dataTypeFormItemHiddenConfig,
			defaultsConfigs.dataTypeFormItemHidden);
	searchPanel.dataTypeFormItemHidden = new Ext.form.Hidden(
			dataTypeFormItemHiddenConfig)

	var valueFormItemConfig = {
		fieldLabel : getResource('resourceParam4054') + ':',
		width : 120
	}
	Ext.apply(valueFormItemConfig, defaultsConfigs.valueFormItem);
	searchPanel.valueFormItem = new Ext.form.TextField(valueFormItemConfig)

	var startDateFormItemConfig = {
		fieldLabel : getResource('resourceParam4055') + ':',
		width : 120,
		format : 'Y-m-d'
	}
	Ext.apply(startDateFormItemConfig, defaultsConfigs.startDateFormItem);
	searchPanel.startDateFormItem = new Ext.form.superDateField(
			startDateFormItemConfig)

	var endDateFormItemConfig = {
		fieldLabel : getResource('resourceParam4056') + ':',
		width : 120,
		format : 'Y-m-d',
		style : 'z-index:99999'
	};
	Ext.apply(endDateFormItemConfig, defaultsConfigs.endDateFormItem);
	searchPanel.endDateFormItem = new Ext.form.superDateField(
			endDateFormItemConfig)

	var versionFormItemConfig = {
		width : 120,
		store : new Ext.data.JsonStore( {
			url : "../JSON/datacenter_DataCenterRemote.getInstanceVersion?a="
					+ new Date(),
			method : 'GET',
			fields : [ 'id', 'version', 'fixedRevision' ]
		}),
		valueField : 'id',
		displayField : 'version',
		fieldLabel : '' + getResource('resourceParam462') + ':',
		triggerAction : 'all',
		editable : false,
		onSelect : function(record, index) {
			if (this.fireEvent('beforeselect', this, record, index) !== false) {
				var value = record.data[this.valueField || this.displayField];
				this.setValue(value);
				this.collapse();
				this.fireEvent('select', this, record, index);
				searchPanel.versionFormItemHidden.setValue(record
						.get('fixedRevision'))
			}
		},
		listeners : {
			beforequery : function(e) {
				e.combo.getStore().setBaseParam("categoryInstanceID",
						searchPanel.parameters["dcategoryInsid"])
				e.combo.getStore().load();
				return false;
			}
		}
	}
	Ext.apply(versionFormItemConfig, defaultsConfigs.versionFormItem);
	searchPanel.versionFormItem = new Ext.form.ComboBox(versionFormItemConfig)

	var versionFormItemHiddenConfig = {}
	Ext.apply(versionFormItemHiddenConfig,
			defaultsConfigs.versionFormItemHidden);
	searchPanel.versionFormItemHidden = new Ext.form.Hidden(
			versionFormItemHiddenConfig)

	var itemsArray = defaultsConfigs.taskFormItem.isShow ? [
			searchPanel.projectFormItem, searchPanel.taskFormItem,
			searchPanel.dataNameFormItem, searchPanel.dataTypeFormItem,
			searchPanel.dataTypeFormItemHidden, searchPanel.valueFormItem,
			searchPanel.startDateFormItem, searchPanel.endDateFormItem,
			searchPanel.versionFormItem, searchPanel.versionFormItemHidden ]
			: [ searchPanel.projectFormItem, searchPanel.dataNameFormItem,
					searchPanel.dataTypeFormItem,
					searchPanel.dataTypeFormItemHidden,
					searchPanel.valueFormItem, searchPanel.startDateFormItem,
					searchPanel.endDateFormItem, searchPanel.versionFormItem,
					searchPanel.versionFormItemHidden ]

	searchPanel.mainpanel = new Ext.form.FormPanel(
			{
				layout : 'form',
				defaults : {
					bodyStyle : 'padding:5px',
					border : false
				},
				labelAlign : 'left',
				labelSeparator : ' ',
				labelWidth : 85,
				buttonAlign : 'center',
				autoScroll : true,
				items : itemsArray,
				buttons : [
						{
							text : getResource('resourceParam652'),//查询
							width : 50,
							handler : function() {
								var objectDatas = Ext
										.apply(
												searchPanel.mainpanel.getForm()
														.getValues(),
												{
													dcategoryinstanceid : searchPanel.parameters["dcategoryInsid"],
													parent : 0
												})
								searchPanel.menu.el.hide();
								searchCallback(objectDatas);
							}
						},
						{
							text : getResource('resourceParam606'),//重置
							width : 50,
							handler : function() {
								searchPanel.mainpanel.getForm().reset();
								searchPanel.projectFormItem
										.setValue(searchPanel.parameters["projectFormItemName"]);
								searchPanel.taskFormItem
										.setValue(searchPanel.parameters["taskFormItemName"]);
							}
						}, {
							text : getResource('resourceParam3001'),//取消
							width : 50,
							handler : function() {
								searchPanel.menu.el.hide();
							}
						} ]
			})

	searchPanel.menu = new Ext.menu.Menu( {
		items : this.mainpanel,
		style : 'z-index:10000;background:#fff;height:' + menuHight + 'px;', //chenw 设置层的zindex
		defaults : {
			padding : 10
		},
		width : 250,
		onHide : function() {
			Ext.menu.Menu.superclass.onHide.call(this);
			this.deactivateActive();
			var pm = this.parentMenu;
			if (this.deepHide === true && pm) {
				if (pm.floating) {
					pm.hide(true);
				} else {
					pm.deactivateActive();
				}
			}
		}
	})
	return searchPanel.menu;
}
searchPanel.setParameter = function(key, value) {
	this.parameters[key] = value;
}
