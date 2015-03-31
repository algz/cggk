/*
 * bu suny
 * Sysware.P2M.ComboBox 重写了Ext.form.ComboBox的setvalue 
 * 需要进一步优化，如果store中已经有值并且不需要store不需要分页则可以不必再次发送请求
 */
Ext.ns('Sysware.P2M');
Sysware.P2M.ComboBox = Ext.extend(Ext.form.ComboBox,
		{
			paramNames : {
				value : 'value',
				records : 'records'
			},
			setValue : function(value) {
				var val = value;
				if ('object' === typeof value
						&& '[object Object]' === Object.prototype.toString
								.call(value)) {
					if (undefined !== value[this.paramNames['records']]) {
						this.store.loadData(value[this.paramNames['records']]);
					}
					val = value[this.paramNames['value']];
				}
				Sysware.P2M.ComboBox.superclass.setValue.call(this, val);
			}
		});

Ext.reg('sysware.p2m.combobox', Sysware.P2M.ComboBox);
