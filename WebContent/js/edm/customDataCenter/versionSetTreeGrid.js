var versionSetTreeGrid = {}
versionSetTreeGrid.init = function(nodeid) {
	var record = Ext.data.Record.create([{
				name : 'text'
			},{
				name : 'id',
				type : 'string'
			}, {
				name : 'leaf',
				type : 'bool'
			}, {
				name : 'parent',
				type : 'auto'
			}, {
				name : 'categoryinstanceid',
				type : 'string'
			}, {
				name : 'categoryinstancename',
				type : 'string'
			}, {
				name : 'categoryid',
				type : 'string'
			}, {
				name : 'parentinstanceid',
				type : 'string'
			}, {
				name : 'ordernumber',
				type : 'string'
			}, {
				name : 'datacenterid',
				type : 'string'
			}, {
				name : 'description',
				type : 'string'
			}, {
				name : 'version',
				type : 'string'
			}, {
				name : 'fixedrevision',
				type : 'string'
			}, {
				name : 'revision',
				type : 'string'
			}, {
				name : 'treepath',
				type : 'string'
			}, {
				name : 'nextVersions',
				type : 'string'
			}, {
				name : 'icon',
				type : 'string'
			}, {
				name : 'newversiontext',
				type : 'string'
			}, {
				name : 'note',
				type : 'string'
			}]);
	this.proxy = new Ext.data.HttpProxy({
				method : 'POST',
				url : '../JSON/datacenter_DataCenterRemote.getTopDataInsByInsId'
			});
	var store = new Ext.ux.maximgb.tg.sysEditTreeGridStore({
				autoLoad : true,
				proxy : this.proxy,
				reader : new Ext.data.JsonReader({
							id : 'id',
							root : 'results',
							totalProperty : 'totalProperty'
						}, record)
			});
	store.on('beforeload', function(store, options) {
				this.proxy = new Ext.data.HttpProxy({
					method : 'POST',
					url : '../JSON/datacenter_DataCenterRemote.getTopDataInsByInsId'
				})
				options.params = Ext.apply(options.params, {
							categoryinstanceid : nodeid
						});
			});
	var lineNum = new Ext.grid.RowNumberer({});
	var grid = new Ext.ux.maximgb.tg.sysEditTreeGridPanel({
		store : store,
		height : 240,
		clicksToEdit : 1,
		viewConfig : {
			forceFit : true
		},
		master_column_id : 'text',
		cm : new Ext.grid.ColumnModel({
			defaults: {
		        sortable: false,
		        menuDisabled: true
		    },
			columns : [lineNum, {
					id : 'text',
					header : ''+getResource('resourceParam480')+'',
					width : 200,
					dataIndex : 'text'
				}, {
					header : ''+getResource('resourceParam1732')+'',
					width : 200,
					dataIndex : 'version'
				}, {
					header : ''+getResource('resourceParam1721')+'',
					width : 200,
					dataIndex : 'newversiontext',
					editor : new Ext.form.ComboBox({
									store : new Ext.data.SimpleStore({
												data : [],
												fields : ['value', 'text']
											}),
									triggerAction : 'all',
									allowBlank : false,
									width : 120,
									listWidth : 120,
									editable : false,
									mode : 'local',
									displayField : 'text',
									valueField : 'value',
									onSelect : function(record, index) {
										if (this.fireEvent('beforeselect', this, record,
												index) !== false) {
											var value = record.data[this.valueField
													|| this.displayField];
											this.setValue(value);
											this.collapse();
											this.fireEvent('select', this, record, index);
										}
									}
							})
				}, {
					header : ''+getResource('resourceParam1723')+'',
					width : 200,
					dataIndex : 'note',
					renderer : function(value, p, record) {
						var size = 0;
						var count = 0;
						var tip = '';
						var arr = [];
						var lastIndex = 0;
						for (var i = 0; i < value.length; i++) {
							var code = value.charCodeAt(i);
							if (code > 255) {
								count += 2;
							} else {
								count += 1;
							}
							size += count;
							if(count>30){
								arr.push(value.substring(lastIndex,i));
								lastIndex = i;
								count = 0;
							}
						}
						if(size<=30){
							arr.push(value);
						}else{
							arr.push(value.substring(lastIndex));
						}
						tip = arr.join('<br />');
						return '<div ext:qtip="'+tip+'">'+value+'</div>';
					}
				}]
		}),
		autoScroll : true,
		autoExpandeColumn : 'text',
		listeners : {
			cellclick : function(grid,rowIndex,colIndex,e){
				var record = Ext.data.Record.create([{
					name : 'value',
					type : 'string'
				},{
					name : 'text',
					type : 'string'
				}]);
				var rec = grid.getStore().getAt(rowIndex);
				if(colIndex==3){
					if(rec.get('newversiontext')==''+getResource('resourceParam1712')+''){
						return false;
					}
					var store = grid.getColumnModel().getCellEditor(3,rowIndex).field.store;
					store.removeAll();
					var nv = rec.get('nextVersions').split(',');
					for(var i=0;i<nv.length;i++){
						store.add(new record({
							value : nv[i],
							text : nv[i]
						}));
					}
					rec.set('newversiontext',store.getAt(0).get('text'));
					rec.set('note',''+getResource('resourceParam1723')+'');
				}else if(colIndex==4){
					var textarea = new Ext.form.TextArea({
						width : 285,
						height : 200,
						autoScroll : true
					});
					var flag = 0;
					var patrn = /<(font)\s*color=gray[^<>]*>([\w\W]*)<\/\1\s*>/;
					if(patrn.exec(rec.get('note'))){
						flag = 1;
					}else{
						flag = 2;
					}
					var win = new Ext.Window({
						width : 300,
						height : 260,
						title : ''+getResource('resourceParam1723')+'',
						modal : true,
						items : [textarea],
						bbar : [{
							text : ''+getResource('resourceParam479')+'',
							handler : function(){
								if(flag==2){
									rec.set('note',textarea.getValue());
								}
								win.close();
							}
						},
						{
							text : ''+getResource('resourceParam7007')+'',//取消
							handler : function(){
								win.close();
							}
						}]
					});
					if(flag==1){
						var v = rec.get('note').replace(patrn,'$2');
						if(v!=''+getResource('resourceParam1723')+''){
							win.items.get(0).setValue(v);
						}else{
							win.items.get(0).setValue('');
						}
						win.items.get(0).disable();
					}else if(flag==2){
						if(rec.get('note')!=''+getResource('resourceParam1723')+''){
							win.items.get(0).setValue(rec.get('note'));
						}else{
							win.items.get(0).setValue('');
						}
					}
					win.show();
				}
			}
		}
	});
	store.on('beforeexpandnode', function(store, rc) {
		store.on('beforeload', function(store, options) {
			this.proxy = new Ext.data.HttpProxy({
				method : 'POST',
				url : '../JSON/datacenter_DataCenterRemote.getChildDataInsByParentId'
			})
			options.params = Ext.apply(options.params, {
				categoryinstanceid : rc.get('categoryinstanceid')
			});
		});
	});
	store.on('load',function(store,recs,options){
		store.expandNode(recs[0]);
	});
	return grid;
}
