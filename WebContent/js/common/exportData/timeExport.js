timeExport = {
	timedialog : null,
	timeform : null
};

timeExport.gettimeform = function() {

	// 导出形式下拉列表原始数据
	var dataSituation = [
			[
					0,
					'' + getResource('resourceParam7111')
							+ getResource('resourceParam7099') + ''],
			[
					1,
					'' + getResource('resourceParam7111')
							+ getResource('resourceParam7090') + ''],
			[
					2,
					'' + getResource('resourceParam7111')
							+ getResource('resourceParam6054') + '']];

	var exportSituationStore = new Ext.data.SimpleStore({
				fields : ['value', 'text'],
				data : dataSituation
			});
	var comboExportSituation = new Ext.form.ComboBox({
				id : 'exportsituation',
				width : 210,
				fieldLabel : '' + getResource('resourceParam1196')
						+ getResource('resourceParam7116') + '',
				store : exportSituationStore,
				// emptyText:'审批记录',
				mode : 'local',
				triggerAction : 'all',
				valueField : 'value',
				displayField : 'text',
				editable : false,
				value : 0
			});

	// 导出格式下拉列表原始数据
	var dataType2 = [[1, 'Excel' + getResource('resourceParam7110') + ''],
			[2, 'sql' + getResource('resourceParam7110') + '']];

	var exportTypeStore2 = new Ext.data.SimpleStore({
				fields : ['value', 'text'],
				data : dataType2
			});
	var comboExportType2 = new Ext.form.ComboBox({
				id : 'exporttype2',
				width : 210,
				fieldLabel : '' + getResource('resourceParam1196')
						+ getResource('resourceParam7110') + '',
				store : exportTypeStore2,
				// emptyText:'审批记录',
				mode : 'local',
				triggerAction : 'all',
				valueField : 'value',
				displayField : 'text',
				editable : false,
				value : 1
			});

//	var comboTime = new Ext.form.TimeField({
//				id : 'exporttime',
//				width : 210,
//				fieldLabel : '' + getResource('resourceParam1196')
//						+ getResource('resourceParam988') + '',
//				format : 'G:i',
//				editable : false,
//				increment : 30
//			});

	var comboDate = new Ext.form.DateField({
				id : 'exportdate',
				width : 210,
				fieldLabel : '' + getResource('resourceParam1196')
						+ getResource('resourceParam1120') + '',
				editable : false,
				format : 'd'

			});

	var radioGroup = new Ext.form.RadioGroup({
				id : 'exportweek',
				fieldLabel : '' + getResource('resourceParam1850') + '',
				items : [{
							boxLabel : '' + getResource('resourceParam6046')
									+ '',
							name : 'rb-auto',
							inputValue : 2
						}, {
							boxLabel : '' + getResource('resourceParam6047')
									+ '',
							name : 'rb-auto',
							inputValue : 3,
							checked : true
						}, {
							boxLabel : '' + getResource('resourceParam6048')
									+ '',
							name : 'rb-auto',
							inputValue : 4
						}, {
							boxLabel : '' + getResource('resourceParam6049')
									+ '',
							name : 'rb-auto',
							inputValue : 5
						}, {
							boxLabel : '' + getResource('resourceParam6050')
									+ '',
							name : 'rb-auto',
							inputValue : 6
						}, {
							boxLabel : '' + getResource('resourceParam6051')
									+ '',
							name : 'rb-auto',
							inputValue : 7
						}, {
							boxLabel : '' + getResource('resourceParam6052')
									+ '',
							name : 'rb-auto',
							inputValue : 1
						}]
			});

	var strurl = '../JSON/export_ExporterRemote.getTimeMessage';
	var proxy = new Ext.data.HttpProxy({
				url : strurl
			});
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty'
			}, ['export_time', 'export_type', 'export_situation',
					'export_date', 'export_week']);
	timeStore = new Ext.data.Store({
				proxy : proxy,
				reader : reader
			})

	timeStore.load({
				callback : function(rs) {
					Ext.getCmp('exportsituation').setValue(rs[0]
							.get('export_situation'));
					if (rs[0].get('export_situation') == 0) {
						Ext.getCmp('exportdate').disable();
						Ext.getCmp('exportweek').disable();
					} else if (rs[0].get('export_situation') == 1) {
						Ext.getCmp('exportdate').disable();
					} else {
						Ext.getCmp('exportweek').disable();
					}
					Ext.getCmp('exporttype2')
							.setValue(rs[0].get('export_type'));
//					Ext.getCmp('exporttime').setValue(rs[0].get('export_time'));
					Ext.getCmp('exportweek').setValue(rs[0].get('export_week'));
					Ext.getCmp('exportdate').setValue(rs[0].get('export_date'));
				}
			});

	timeExport.timeform = new Ext.form.FormPanel({
		id : 'form',
		width : 340,
		height : 180,
		frame : true,
		items : [comboExportSituation, comboExportType2, /**comboTime,*/ comboDate,
				radioGroup],
		buttons : [{
			text : '' + getResource('resourceParam479') + '',
			handler : function() {
				var timeVo = Seam.Remoting
						.createType("com.sysware.common.export.TimeVo");
				if (Ext.getCmp('exportsituation').getValue() == 1) {
					timeVo
							.setExport_week(Ext.getCmp('exportweek').getValue().inputValue);
				} else if (Ext.getCmp('exportsituation').getValue() == 2) {
					timeVo.setExport_date(Ext.util.Format.date(Ext
									.getCmp('exportdate').getValue(), 'd'));
				}
//				timeVo.setExport_time(Ext.getCmp('exporttime').getValue());
				timeVo.setExport_type(Ext.getCmp('exporttype2').getValue());
				timeVo.setExport_situation(Ext.getCmp('exportsituation')
						.getValue());
				Seam.Component.getInstance("export_ExporterRemote").updateTime(
						timeVo, timeExport.exportYN);

			}
		}, {
			text : '' + getResource('resourceParam3001') + '',
			handler : function() {
				timeExport.timedialog.close();
			}
		}]

	});

	comboExportSituation.on('select', function(combo, record, index) {
				if (record.get('value') == 1) {
					Ext.getCmp('exportdate').disable();
					Ext.getCmp('exportweek').enable();
				} else if (record.get('value') == 2) {
					Ext.getCmp('exportdate').enable();
					Ext.getCmp('exportweek').disable();
				} else {
					Ext.getCmp('exportdate').disable();
					Ext.getCmp('exportweek').disable();
				}
			})

	return timeExport.timeform;
}

timeExport.init = function() {
		timeExport.timedialog = new Ext.Window({
					title : '' + getResource('resourceParam7113')
							+ getResource('resourceParam1196') + '',
					layout : 'fit',
					modal : true,
					width : 350,
					height : 190,
					closeAction : 'close',
					plain : false,
					items : timeExport.gettimeform()
				});
	timeExport.timedialog.show();
};
timeExport.exportYN = function(value) {
	timeExport.timedialog.close();
}
