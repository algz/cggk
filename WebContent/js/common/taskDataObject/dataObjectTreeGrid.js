/**
 * 数据编辑treegrid封装
 * @type 
 */

var dataObjectTreeGrid = {
	parameters : {}
}

dataObjectTreeGrid.init = function(/**上传回调函数*/fileUploadCallback,/**设置映射关系回调函数*/setDataRelationCallback,/**更新映射回调函数*/updateDataEntityByRelationCallback) {
	Ext.QuickTips.init()
	var self = this;
	var record = Ext.data.Record.create([{
				name : 'text'
			}, {
				name : 'value',
				type : 'string'
			}, {
				name : 'inout',
				type : 'string'
			}, {
				name : 'leaf',
				type : 'bool'
			}, {
				name : 'dataEntityID',
				type : 'string'
			}, {
				name : 'dataEntityTypeName',
				type : 'string'
			}, {
				name : 'dataEntityType',
				type : 'string'
			}, {
				name : 'parent',
				type : 'auto'
			}, {
				name : 'id',
				type : 'string'
			}, {
				name : 'disableCheck',
				type : 'bool'
			}, {
				name : 'dimension',
				type : 'string'
			}, {
				name : 'dataCenterID',
				type : 'string'
			}, {
				name : 'updateCount',
				mapping : 'updateCount',
				type : 'string'
			}, {
				name : 'revision',
				mapping : 'revision',
				type : 'string'
			}, {
				name : 'isRef',
				type : 'string'
			}, {
				name : 'parentDataEntityID',
				type : 'string'
			}, {
				name : 'customTypeItemID',
				type : 'string'
			}, {
				name : 'customTypeParentID',
				type : 'string'
			}, {
				name : 'fileID',
				type : 'string'
			}, {
				name : 'destCategoryInsPath',
				type : 'string'
			}, {
				name : 'sourceCategoryInsPath',
				type : 'string'
			}, {
				name : 'dcategoryinstanceid',
				type : 'string'
			}, {
				name : 'extendsTypeRealName',
				type : 'string'
			}, {
				name : 'realIsRef',
				type : 'string'
			},{
				name : 'dataEntityCategoryTagName',
				type : 'string'
			},{
				name : 'dataEntityCategoryTagCenterID',
				type : 'string'
			},{
				name : 'dataEntityCategoryTag',
				type : 'string'
			},{
				name : 'isSourceDataUpedRevision',
				type : 'bool'
			},{
				name : 'iconCls',
				type : 'string'
			},{
				name : 'checkStr',
				type : 'string'
			},{
				name : 'arrLength',
				type : 'string'
			},{
				name : 'isArray',
				type : 'bool'
			},{
				name : 'unit',
				type : 'string'
			},{
				name : 'description',
				type : 'string'
			},{
				name : 'createTime'
			},{
				name : 'createrName'
			},{
				name : 'modifyTime'
			},{
				name : 'isArrayItemChild',
				type : 'bool'
			},{
				name : 'unitAbbreviation',
				type : 'string'
			},{
				name : 'unitLocaleName',
				type : 'string'
			}]);
	this.proxy = new Ext.data.HttpProxy({
				method : 'POST',
				url : '../JSON/dataEntity_DataEntityRemote.getDataEntities'
			});

	var store = new Ext.ux.maximgb.tg.sysEditTreeGridStore({
				proxy : this.proxy,
				reader : new Ext.data.JsonReader({
							id : 'id',
							root : 'results',
							totalProperty : 'totalProperty'
						}, record)
			});

	var sm = new Ext.grid.CheckboxSelectionModel({});
	var lineNum = new Ext.grid.RowNumberer({})
	//数组化列
	var isArrayColumn = new Ext.ux.grid.CheckColumn({
					header : getResource('resourceParam4041'),
					width : 60,
					dataIndex : 'isArray',
					renderer : function(v, p, record){
				        p.css += ' x-grid3-check-col-td'; 
				        //根据逻辑判断是否灰显
				        if(!self.parameters["enableEdit"]||record.get('disableCheck')||"arrayfile"==record.get("dataEntityType")){
				        	p.css += ' x-item-disabled';  
				        }else if(record.get("inout") == 0&&record.get("sourceCategoryInsPath")!=""&&record.get("sourceCategoryInsPath")!=undefined){
				        	p.css += ' x-item-disabled';
				        }
				        return '<div class="x-grid3-check-col'+(v?'-on':'')+' x-grid3-cc-'+this.id+'">&#160;</div>';
				    },
				    onMouseDown : function(e, t){
		        		if(t.className && t.className.indexOf('x-grid3-cc-'+this.id) != -1){
		        			//判断是否可以编辑		        			
					    	var index = this.grid.getView().findRowIndex(t);
					        var record = this.grid.store.getAt(index);
					        if(record.get('disableCheck')||!self.parameters["enableEdit"]||"arrayfile"==record.get("dataEntityType")){
					        	return;
					        }else if(record.get("inout") == 0&&record.get("sourceCategoryInsPath")!=""&&record.get("sourceCategoryInsPath")!=undefined){
					        	return;
					        }
					        record.set('value',"");
					        if(record.data[this.dataIndex]){
					        	record.set("dimension",'1');
					        }
				            e.stopEvent();
				            record.set(this.dataIndex, !record.data[this.dataIndex]);
				        }
				    }
				})
	var grid = new Ext.ux.maximgb.tg.sysEditTreeGridPanel({
		store : store,
		sm : sm,
		loadMask : true,
		master_column_id : 'text',
		plugins : isArrayColumn,
		bbar : new Ext.ux.maximgb.tg.PagingToolbar({
			store : store,
			displayInfo : true,
			pageSize : 25,
			listeners : {
				//由于store在展开数据的时候修改，分页时需要判断并重置store调用
				'beforechange' : function(ptbar, opt) {
					if (grid.getSelectionModel().getSelections().length < 1) {//没有选中，顶层分页。。
						store.on('beforeload', function(store, options) {
							this.proxy = new Ext.data.HttpProxy({
								method : 'POST',
								url : '../JSON/dataEntity_DataEntityRemote.getDataEntities'
							})
							options.params = Ext.apply(options.params, {
									dataCenterID : self.parameters["dataCenterPrefixID"],
									parentDataEntityID : self.parameters["dataCategoryPrefixID"]
								});
						});
					}else{//选中下级节点分页
						var rc = sm.getSelected();
						store.on('beforeload', function(store, options) {
							this.proxy = new Ext.data.HttpProxy({
								method : 'POST',
								url : '../JSON/dataEntity_DataEntityRemote.getDataChildEntities'
							})
							options.params = Ext.apply(options.params, {
								dataCenterID : rc.get('dataCenterID'),
								dataEntityID : rc.get('dataEntityID'),
								parentDataEntityID : rc.get('parentDataEntityID'),
								dataEntityType : rc.get('dataEntityType'),
								customTypeParentID : rc.get('customTypeParentID'),
								customTypeItemID : rc.get('customTypeItemID'),
								isRef : (rc.get("dimension").indexOf("*") > 0 || Number(rc.get("dimension")) > 1) ? 2 : rc.get('isRef'),
								inout : rc.get("inout"),
								dcategoryinstanceid : rc.get("dcategoryinstanceid"),
								isArrayItemChild : rc.get('isArrayItemChild')
							});
						})
					}
				}
			}
		}),
		cm : new Ext.grid.ColumnModel({
			defaults: {
		        sortable: false,
		        menuDisabled: true
		    },
			columns : [lineNum, sm, {
					id : 'text',
					header : ''+getResource('resourceParam480')+'',
					width : 250,
					dataIndex : 'text',
					renderer : function(value, p, record) {
						return "<div ext:qtip='" + value + "'>" + value + "</div>";
					},
					editor : new Ext.form.TextField({
								allowBlank : false,
						maxLength : 50
							})
				},{
					header : 'I/O',
					width : 100,
					dataIndex : 'inout',
					renderer : function(value, p, record) {
						if (value == 0)
							return ""+getResource('resourceParam494')+"";
						if (value == 1)
							return ""+getResource('resourceParam1066')+"";
						if (value == 2)
							return ""+getResource('resourceParam1065')+"";
					},
					editor : new Ext.form.ComboBox({
						id : 'itemidCombo',
						store : new Ext.data.JsonStore({
									url : '../JSON/group_groupRemote.getGroupListById',
									fields : [{
												name : 'itemName',
												mapping : 'itemName'
											}, {
												name : 'itemID',
												mapping : 'itemID'
											}],
									baseParams : {
										groupID : 'DataInOut'
									}
								}),
						triggerAction : 'all',
						editable : false,
						displayField : 'itemName',
						valueField : 'itemID',
						fieldLabel : ''+getResource('resourceParam849')+'',
						lazyRender : true,
						listeners:{
							'afterrender':function(t){
								t.getStore().load({
									callback:function(r){
										t.setValue(r[0].get('itemID'));
									}
								});
							}							
						},
						onSelect : function(record, index) {
							if (this.fireEvent('beforeselect', this, record,
									index) != false) {
								this.setValue(record.data[this.valueField
										|| this.displayField]);
								this.collapse();
								this.fireEvent('select', this, record, index);
							}
							grid.getSelectNodes()[0].set('inout', record
											.get("itemID"));
						}
					})
				}, {
					header : ''+getResource('resourceParam511')+'',
					width : 100,
					dataIndex : 'value',
					renderer : function(value, p, record) {
						if (value == undefined) {
							return "";
						}
//						if(!self.parameters["enableEdit"]){
//							return value;
//						}
						if("arrayfile"==record.get("dataEntityType")){
							return '<a style="color:#0000FF;text-decoration:underline;" href="../dataObjectFileDownload?fileId=' + record.get("fileID") + '&fileName=' + encodeURI(encodeURI(record.get('value')))+'" ext:qtip="'+value+'" >' + value + '</a>';
						}
						
						if ("file" == record.get('extendsTypeRealName')&&!record.get("isArray")) {
							if (value == "") {
								return "<a href='javascript:void(0)' style='color:#0000FF;text-decoration:underline;'>"+getResource('resourceParam1085')+"</a>";
							} else {
								return "<a href='javascript:void(0)' ext:qtip=\""+value+"\" style='color:#0000FF;text-decoration:underline;'>"
										+ value + "</a>";
							}
						}else if(record.get("isArray")){
							return "<a href='javascript:void(0)' style='color:#0000FF;text-decoration:underline;'>"	+ value + "</a>";
						}else if("boolean"==record.get("dataEntityType")){
							/**
							 * 如果是boolean显示  是或否
							 * at 2011-06-08 by liuxj
							 */
							var _value = "";
							if(value == "true")
								_value = "是";
							if(value == "false")
								_value = "否";
							return "<div title="+_value+">"+_value+"</div>";
						} else {
							return "<div title="+value+">"+value+"</div>";
						}
					}
				},{
					header : getResource('resourceParam4042'),
					width : 80,
					dataIndex : 'unitAbbreviation',
					editor : new Ext.form.ComboBox({
						store : new Ext.data.JsonStore({
							url : '../JSON/dimensionUnit_DimensionUnitRemote.getUsualUnitList',
							method : 'POST',
							fields : [{
										name : 'name',
										mapping : 'name'
									},{
										name : 'abbreviation',
										mapping : 'abbreviation'
									},{
										name : 'englishname',
										mapping : 'englishname'
									}]
						}),
						triggerAction : 'all',
						valueField : 'abbreviation',
						displayField : 'name',
						editable : false,
						lazyRender : true,
						onSelect : function(record, index) {
							var editRecord = grid.getSelectNodes()[0];
							if (this.fireEvent('beforeselect', this, record,
									index) !== false) {
								var that = this;
								if(record.get("name")=="more..."){
									grid.stopEditing();
									new UnitSelect().init(function(o){
						            	editRecord.set('unit',o.englishname);
						            	editRecord.set('unitAbbreviation',o.abbreviation);
						            })
									return;
								}
								//TODO 同量纲单位值转换
//								if(editRecord.get('value')!=""&&editRecord.get("value")!=undefined&&record.get("abbreviation")!="more..."){
//									Ext.Msg.confirm('提示','是否要将值映射为新的单位?',function(buttonId){
//										alert(buttonId)
//									})
//								}
								var value = record.data[this.valueField
										|| this.displayField];
								this.setValue(value);
								this.collapse();
								this.fireEvent('select', this, record, index);
							}
							editRecord.set('unit',record.get("englishname"));
						},
						listeners : {
							'beforequery' : function(qu){
								qu.combo.getStore().load({
									callback : function(){
										var record = new Ext.data.Record({
											name : 'more...'
										})
										qu.combo.getStore().add(record)
									}
								});
								return false;
							}
						}
					})
				},{
					header : ''+getResource('resourceParam481')+'',
					width : 100,
					dataIndex : 'dataEntityTypeName',
					renderer : function(value, p, record) {
						if (value == "typeIsDeleted") {
							return "<span style='color:red;'>"
									+ baseResource.typeIsDeleted + "</span>";
						} else {
							return value;
						}
					},
					editor : new Ext.form.ComboBox({
						store : new Ext.data.JsonStore({
							url : '../JSON/dynamicmodel_datatype.getAllDataTypeList',
							method : 'POST',
							fields : [{
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
									}]
						}),
						triggerAction : 'all',
						valueField : 'datatypeName',
						displayField : 'datatypeName',
						editable : false,
						lazyRender : true,
						onSelect : function(record, index) {
							if (this.fireEvent('beforeselect', this, record,
									index) !== false) {
								var value = record.data[this.valueField
										|| this.displayField];
								this.setValue(value);
								this.collapse();
								this.fireEvent('select', this, record, index);
							}
							var editingRecord = grid.getSelectNodes()[0];
							editingRecord.set('dataEntityType', record.get("datatypeId"));
							editingRecord.set('isRef', record.get("rank"));
							editingRecord.set('realIsRef', record.get("rank"));
							editingRecord.set('extendsTypeRealName', record.get('dataType'));
							editingRecord.set('value', "");
							editingRecord.set('unit', "");
						}
					})
				}, {
					header : getResource('resourceParam4046'),
					width : 200,
					dataIndex : 'description',
					editor : new Ext.form.TextField({
						maxLength : 50
					})
				}, isArrayColumn,{
					header : ''+getResource('resourceParam853')+'',
					width : 50,
					dataIndex : 'dimension',
					editor : new Ext.form.TextField({
						allowBlank : false,
						enableKeyEvents : true,
						validator : function(value) {
							if (Ext.util.Format.trim(value).length == 0) {
								this.invalidText = ""+getResource('resourceParam1084')+"";
								return false;
							}
//							var reg = /^([1-9][0-9]*(\*[1-9][0-9]*)?)*$/;
							var reg = /^[1-9]?$/;
							if (reg.test(value)) {
								if ( value > 9) {
									this.invalidText = "您"+getResource('resourceParam494')+"的"+getResource('resourceParam474')+""+getResource('resourceParam511')+"超过9!";
									return false;
								} else
									return true;
							} else {
								this.invalidText = getResource('resourceParam7020') + "！";
								return false;
							}
						}
					}),
					renderer : function(value, p, record) {
						if(!record.get('isArray')){
							return "";
						}else{
							if (value == undefined) {
								return 1;
							} else {
								return value;
							}
						}
					}
				}, {
					header : ''+getResource('resourceParam462')+'',
					width : 50,
					dataIndex : 'updateCount',
					renderer : function(v, p, r) {
						var revision = r.get("revision");
						var dataEntityID = r.get("dataEntityID");
						if (v == undefined) {
							return "";
						}
						if (!r.get("disableCheck")) {
							return '<a href="javascript:void(0);" ext:qtip="'+getResource("resourceParam3022")+'" style="color:#0000FF;text-decoration:underline;" onclick="dataObjectTreeGrid.viewHistory(\'' + revision + '\', \'' + dataEntityID + '\')">' + v + '</a>';
						} else {
							return "";
						}
					}
				},{
					header : getResource('resourceParam981'),
					width : 100,
					dataIndex : 'modifyTime',
					renderer : function(v, p, r) {
						if(v!=undefined&&v!=""&&!r.get("disableCheck")){
							return new Date(v.time.time).format("Y-m-d H:i")
						}else{
							return "";
						}
					}
				},{
					header : getResource('resourceParam5007'),//创建人
					width : 100,
					dataIndex : 'createrName',
					renderer : function(v, p, r) {
						if(r.get("disableCheck")){
							return "";
						}else{
							return v;
						}
					}
				},{
					header : getResource('resourceParam7023'), // '标签',
					width : 100,
					dataIndex : 'dataEntityCategoryTagName',
					renderer : function(value, cellMeta, record, rowIndex, columnIndex, store) {
						if (value == undefined) {
							return "";
						}
						dataObjectTreeGrid.setParameter('__tmpGrid', grid);
						return "<a href='#' ext:qtip='编辑标签列表' onclick='setLabelType(\"" + record.get('dataEntityID') + "\", \"" + record.get('dataCenterID') + "\", \"" + record.get('dcategoryinstanceid') + "\")' style='color:#0000FF;text-decoration:underline;vertical-align:middle;'>标签列表</a>";
					}
//					editor : new Ext.form.ComboBox({
//						store : new Ext.data.JsonStore({
//							url : '../JSON/datacenter_DataCenterRemote.getChildCategoryInsByDataCenterId',
//							method : 'GET',
//							root : 'results',
//							fields : [{
//										name : 'text',
//										mapping : 'text'
//									}, {
//										name : 'dataEntityID',
//										mapping : 'dataEntityID'
//									}, {
//										name : 'dataCenterID',
//										mapping : 'dataCenterID'
//									}]
//						}),
//						triggerAction : 'all',
//						width : 200,
//						valueField : 'text',
//						displayField : 'text',
//						editable : false,
//						lazyRender : true,
//						onSelect : function(record, index) {
//							if (this.fireEvent('beforeselect', this, record,
//									index) !== false) {
//								var value = record.data[this.valueField
//										|| this.displayField];
//								this.setValue(value);
//								this.collapse();
//								this.fireEvent('select', this, record, index);
//							}
//							grid.getSelectNodes()[0].set('dataEntityCategoryTagName', record
//											.get("text"));
//							grid.getSelectNodes()[0].set('dataEntityCategoryTag', record
//											.get("dataEntityID"));
//							grid.getSelectNodes()[0].set('dataEntityCategoryTagCenterID', record
//											.get("dataCenterID"));
//						},
//						listeners : {
//							beforequery : function(e) {
//								e.combo.getStore().setBaseParam("dataEntityID",
//										self.parameters["EdmCategoryInstanceId"])
//								e.combo.getStore().load();
//								return false;
//							}
//						}
//					})
				}, {
					header : getResource('resourceParam7024'),//'映射',
					width : 250,
					dataIndex : 'sourceCategoryInsPath',
					renderer : getDataRelationView
				},{
					width : 30,
					header : '&nbsp;',
					renderer : function() {
						return '';
					}
				}]
		}),
		autoScroll : true,
		autoExpandeColumn : 'sourceCategoryInsPath',
		listeners : {
			cellclick : function(grid, row, col) {//动态设置单元格的编辑控件
				/**
				 * 添加功能单元位置判定，在“协同工程”中，“请上传”按钮可用，在“协同工程历程”中，“请上传”按钮不可用。
				 * @author YangJingang
				 * @date 2010-09-14
				 */
				var bool = (document.location.toString().indexOf('xietongcourse') == -1);
				var dataIndex = grid.getColumnModel().getColumnAt(col).dataIndex;
				var record = store.getAt(row);
				if(record.get('disableCheck')&&dataIndex=='isArray'){
					return false;
				}
				if (dataIndex == 'value') {
					if (record.get("realIsRef") == "9") {
						grid.getColumnModel().setEditor(col,
								new Ext.form.ComboBox({
									store : new Ext.data.JsonStore({
										method : 'GET',
										url : '../JSON/dataModel_dataModelRemote.getChildDataModel',
										root : 'results',
										fields : [{
													name : 'dataEntityName',
													mapping : 'dataEntityName'
												}]
									}),
									triggerAction : 'all',
									valueField : 'dataEntityName',
									displayField : 'dataEntityName',
									editable : false,
									lazyRender : true,
									onSelect : function(r, index) {
										if (this.fireEvent('beforeselect',
												this, r, index) !== false) {
											var value = r.data[this.valueField
													|| this.displayField];
											this.setValue(value);
											this.collapse();
											this.fireEvent('select', this, r,
													index);
										}
									},
									listeners : {
										beforequery : function(e) {
											e.combo
													.getStore()
													.setBaseParam(
															"dataCenterID",
															record
																	.get("dataEntityType"))
										}
									}
								}));
					} else {
						if (record.get('extendsTypeRealName') == 'date') {
							grid.getColumnModel().setEditor(col,
									new Ext.form.DateField({
												selectOnFocus : true,
												format : 'Y-m-d'
											}))
						} else if (bool && record.get('extendsTypeRealName') == "file"&& record.get('dataEntityType') != "arrayfile"&&!record.get("isArray")) {
							var fileName = Ext.isIE
									? encodeURI(encodeURI(record.get('value')))
									: record.get('value');
							var config = {
								title : ""+getResource('resourceParam470')+"",
								width : 300,
								height : 110,
								disableUpload : !self.parameters["enableEdit"],
								resizable : false,
								upParams : {
									fileId : record.get('dataEntityID')
								},
								downParams : {
									fileId : record.get('fileID'),
									fileName : record.get('value')
								},
								upUrl : '../FILEUP/',
								downUrl : '../FILEDOWN/?ID='
										+ record.get('fileID')
										+ '&ORIGINALNAME='
										+ encodeURI(encodeURI(record.get('value')))
							}
							var valueObject = {
								name : record.get("value"),
								fileId : record.get("fileID"),
								checkStr : record.get("checkStr")
							}
							fileUploadDialog.initWindow(config, valueObject,
									fileUploadCallback);
						} else if (record.get('extendsTypeRealName') == 'boolean') {
							grid.getColumnModel().setEditor(col,
									new Ext.form.ComboBox({
										store : new Ext.data.SimpleStore({
													data : [["true", "是"],
															["false", "否"]],
													fields : ['value', 'text']
												}),
										triggerAction : 'all',
										editable : false,
										mode : 'local',
										displayField : 'text',
										valueField : 'value',
										onSelect : function(record, index) {
											if (this.fireEvent('beforeselect',
													this, record, index) != false) {
												this
														.setValue(record.data[this.valueField
																|| this.displayField]);
												this.collapse();
												this.fireEvent('select', this,
														record, index);
											}
										}
									}))
						} else {
							grid.getColumnModel().setEditor(col,
									new Ext.form.TextField({
										validator : function(value) {
											var flag = record.get('extendsTypeRealName');
											if ("double" == flag
													|| "float" == flag) {
//												var reg = /^(\-?[0-9]\d*(.?\d)?)*$/;
//												var reg = /^-?\d+(.\d*$)?$/;
												var reg = /^-?((\d+\.\d+)|(\d+))$/;
												if (reg.test(value)) {
													return true;
												} else {
													this.invalidText = ""+getResource('resourceParam1083')+"!";
													return false;
												}
											}
											if ("integer" == flag) {
												var reg = /^(\-?[0-9][0-9]*)*$/;
												if (reg.test(value)) {
													return true;
												} else {
													this.invalidText = ""+getResource('resourceParam1083')+"!";
													return false;
												}
											}
											if(record.get('checkStr') != undefined&&record.get('checkStr') != ""){
												var regstr = record.get('checkStr');
												var reg;
												if(regstr.indexOf("/^") != 0||regstr.substr(regstr.length-1) != "/"){
													reg = new RegExp(regstr);
												}else{
													reg = eval(record.get('checkStr'));
												}
												if(!reg.test(value)){
													this.invalidText = "必须符合"+record.get("dataEntityTypeName")+"的格式";
													return false;
												}
											}
											return true;
										}
									}))
						}
					}
				}
				if(self.parameters["enableEdit"]&&dataIndex == "sourceCategoryInsPath"&&(record.get("inout") != 1||(record.get("inout") == 1&&record.get("sourceCategoryInsPath")!=""))&&record.get("sourceCategoryInsPath")!=undefined){
					if(record.get("isSourceDataUpedRevision")){
						Ext.MessageBox.show({
									title : ''+getResource('resourceParam575')+'',
									icon : Ext.MessageBox.QUESTION,
									width : 230,
									msg : '您好，'+getResource('resourceParam512')+''+getResource('resourceParam510')+'从'+getResource('resourceParam474')+'源获取新'+getResource('resourceParam462')+''+getResource('resourceParam474')+'？'+getResource('resourceParam505')+'请选“'+getResource('resourceParam512')+'”，'+getResource('resourceParam503')+'“'+getResource('resourceParam510')+'”则重新'+getResource('resourceParam503')+'映射'+getResource('resourceParam474')+'源！',
									buttons : Ext.MessageBox.YESNOCANCEL,
									fn : function(id) {
										if(id == "no"){
											dataCenterData.init(self.parameters["EdmCategoryInstanceId"],self.parameters["dataCategoryPrefixID"],self.parameters["isProject"],setDataRelationCallback);
										}else if(id=="yes"){
											updateDataEntityByRelationCallback(record);
										}else{
											return false;
										}
									}
								})
						return;
					}
					dataCenterData.init(self.parameters["EdmCategoryInstanceId"],self.parameters["dataCategoryPrefixID"],self.parameters["isProject"],
								setDataRelationCallback);
				}
				if(self.parameters["enableEdit"]&&record.get("isArray")&&dataIndex == "value"){
					var arrEditForm = new Ext.form.FormPanel({
							border : false,
							items : [{
								xtype : 'textfield',
								fieldLabel : getResource('resourceParam853')+":",//'维度:',
								name : 'arrDimension',
								value : record.get("dimension"),
								readOnly : true
							},new Ext.form.TextField({
								fieldLabel : getResource("resourceParam4048")+":",//'长度:',
								value : record.get("value"),
								name : 'arrLength',
								enableKeyEvents : true,
								validator : function(value) {
									var reg = /^[1-9]\d*(\*[1-9]\d*)*$/;
									if (!reg.test(value)) {
										this.invalidText = "您"+getResource('resourceParam494')+"的"+getResource('resourceParam474')+""+getResource('resourceParam511')+"不符合格式!";
										return false;
									}
									var resultObject = arrEditForm.getForm().getValues();
									if(resultObject.arrLength.split("*").length != resultObject.arrDimension){
										this.invalidText = getResource("resourceParam4049");//"长度和维度不符！";
										return false;
									}
									return true;
								}
							})]
						}) 
					var win = new Ext.Window({
						defaults : {
								padding : 5
							},
						modal : true,
						resizable : false,
						width : 300,
						items : arrEditForm,
						buttons : [{
							text : getResource('resourceParam6085'),//'确定',
							handler : function(){
								if(arrEditForm.getForm().isValid()){
									var resultObject = arrEditForm.getForm().getValues();
									record.set("value",resultObject.arrLength);
									win.close();
								}
							}
						},{
							text : getResource('resourceParam7007'),//'取消',
							handler : function(){
								win.close();
							}
						}]
					})
					win.show();
				}
			},
			beforeedit : function(e) {//编辑前判断相关操作
				var dataIndex = e.grid.getColumnModel().getColumnAt(e.column).dataIndex;
				if(!self.parameters["enableEdit"]){
					return false;
				}
				if (e.record.get('disableCheck')) {
					if (e.field !== 'value'&&e.field != "dimension"&&e.field!="unit"&&e.field!="description") {
						return false;
					}
				}
				if (("file" == e.record.get("extendsTypeRealName")
						|| "dataset" == e.record.get("extendsTypeRealName"))
						&& e.field == 'value') {
					return false;
				}
				if (e.record.get("isArray") && e.field == 'value') {
					return false;
				}
				if(e.field == 'dimension'){
					if(!e.record.get("isArray")){
						return false;
					}
					if(e.record.get("dataEntityID") != undefined){
						return false;
					}
					if(e.record.get("isArray")&&e.record.get('disableCheck')){
						return false;
					}
				}
				if(e.field == "dataEntityTypeName"&&e.record.get("dataEntityID") != undefined){
					return false;
				}
				if("integer" != e.record.get("extendsTypeRealName")&&"double" != e.record.get("extendsTypeRealName")&&dataIndex == "unit"){
					return false;
				}
				if(dataIndex!="dataEntityCategoryTagName"&&e.record.get("sourceCategoryInsPath")!=""&&e.record.get("sourceCategoryInsPath")!=undefined&&e.record.get("inout")=="0"){
					return false;
				}
			},
			afteredit : function(e) {//编辑后设置相关信息
				var dataIndex = e.grid.getColumnModel().getColumnAt(e.column).dataIndex;
				if (e.record.get('extendsTypeRealName') == 'date'
						&& e.field == 'value') {
					var date = new Date(e.record.get('value'));
					e.record.set('value', date.dateFormat('Y-m-d'));
				}
				if(dataIndex == "dimension"){
					e.record.set('value', "");
				}
				
				var rows = e.grid.getStore().getCount();
				for (var i = 0; i < rows; i++) {
					var td = e.grid.getView().getCell(i, 2);
					var styl = td.childNodes[0].childNodes[0].style;
					if(Ext.isIE)
					{
						styl.styleFloat = 'left';
					}else
					{
						styl.cssFloat = 'left';
					}
					styl.display = 'inline';
				}
			}
		}
	});
	function selectChildren(rc, selectFlag) {
		var childrenNodes = store.getNodeChildren(rc);
		for (var i = 0; i < childrenNodes.length; i++) {
			var rowIndex = store.indexOf(childrenNodes[i]);
			if (selectFlag) {
				sm.selectRow(rowIndex, true);
			} else {
				sm.deselectRow(rowIndex, false);
			}
			selectChildren(childrenNodes[i], selectFlag);
		}
	}

	function selectParent(rc, selectFlag) {
		var parentNode = store.getNodeParent(rc);
		if (parentNode !== undefined && !selectFlag) {
			var rowIndex = store.indexOf(parentNode);
			sm.deselectRow(rowIndex, false);
			selectParent(parentNode, selectFlag);
		}
	}
	function beforeEdit(e) {
		if (rowindex == e.row) {
			return false;
		}
	}
	sm.on('selectionchange',function(selection){
		var selectedArr = selection.getSelections();
		for(var i=0;i<selectedArr.length;i++){
			if(selectedArr[i].dirty){
				Ext.getCmp('btnBatchSetTag').disable();
				return;
			}
		}
		Ext.getCmp('btnBatchSetTag').enable();
	});
	grid.on('rowclick', function(grid, rowindex) {
		grid.stopEditing();
		selectChildren(store.getAt(rowindex), sm.isSelected(rowindex));
		selectParent(store.getAt(rowindex), sm.isSelected(rowindex));
//		Ext.Ajax.request({
//			url : '../JSON/privilege_DataPrivilegeRemote.getDataEntityManipultations',
//			method : 'POST',
//			success : function(response, options) {
//				var obj = Ext.util.JSON.decode(response.responseText);
//				if (obj.modify == false) {
//					Ext.getCmp('dataObjectColumnTreeAdd').disable();
//					Ext.getCmp('dataObjectColumnTreeSave').disable();
//					Ext.getCmp('dataObjectColumnTreeEdit').disable();
//					grid.on('beforeedit', beforeEdit);
//				} else {
//					Ext.getCmp('dataObjectColumnTreeAdd').enable();
//					Ext.getCmp('dataObjectColumnTreeSave').enable();
//					Ext.getCmp('dataObjectColumnTreeEdit').enable();
//					grid.un('beforeedit', beforeEdit);
//				}
//				if (obj.del == false) {
//					Ext.getCmp('dataObjectColumnTreeDel').disable();
//				} else {
//					Ext.getCmp('dataObjectColumnTreeDel').enable();
//				}
//			},
//			params : {
//				dataId : grid.getStore().getAt(rowindex).get('dataEntityID')
//			}
//		});
	})
	
	/**
	 * 映射关系列显示
	 */
	function getDataRelationView(v, p, r) {
		if(!self.parameters["enableEdit"]){
			return "<a href='javascript:void(0)' style='color:#0000FF;text-decoration:underline;vertical-align:middle;'>" + v + "</a>";
		}
		if (v == "" || v == undefined) {
			if (v != undefined && r.get("inout") != 1 && !r.get("isArrayItemChild")) {
				return "<a href='javascript:void(0)' style='color:#0000FF;text-decoration:underline;vertical-align:middle;'>"+getResource('resourceParam459')+""+"</a>";
			} else {
				return "";
			}
		} else {
			if (r.get("isSourceDataUpedRevision")) {
				return "<a href='javascript:void(0)' style='color:#0000FF;text-decoration:underline;vertical-align:middle;color:red;' title='源" + getResource('resourceParam474') + getResource('resourceParam619') + getResource('resourceParam478')+"'>"
						+ v + "</a>";
			} else {
				return "<a href='javascript:void(0)' style='color:#0000FF;text-decoration:underline;vertical-align:middle;'>"
						+ v + "</a>";
			}
		}
	}
	
	store.on('beforeexpandnode', function(store, rc) {
		store.on('beforeload', function(store, options) {
			this.proxy = new Ext.data.HttpProxy({
				method : 'POST',
				url : '../JSON/dataEntity_DataEntityRemote.getDataChildEntities'
			})
			options.params = Ext.apply(options.params, {
						// disableCheck : true,
						dataCenterID : rc.get('dataCenterID'),
						dataEntityID : rc.get('dataEntityID'),
						parentDataEntityID : rc.get('parentDataEntityID'),
						dataEntityType : rc.get('dataEntityType'),
						customTypeParentID : rc.get('customTypeParentID'),
						customTypeItemID : rc.get('customTypeItemID'),
						isRef : (rc.get("dimension").indexOf("*") > 0 || Number(rc
								.get("dimension")) > 1) ? 2 : rc.get('isRef'),
						inout : rc.get("inout"),
						dcategoryinstanceid : rc.get("dcategoryinstanceid"),
						isArrayItemChild : rc.get("isArrayItemChild")
					});
		});
	})
	store.on('expandnode', function(store, rc) {
				selectChildren(rc, sm.isSelected(store.indexOf(rc)));
				grid.getView().refresh();
			})
	//修改我的工作日历中为任务添加数据时数据串到下一行问题---hegs
	//start
	var view = grid.getView();
	view.on('refresh',function(v){
		var rows = store.getCount();
		for (var i = 0; i < rows; i++) {
			var td = v.getCell(i, 2);
			var styl = td.childNodes[0].childNodes[0].style;
			if(Ext.isIE)
			{
				styl.styleFloat = 'left';
			}else
			{
				styl.cssFloat = 'left';
			}
			styl.display = 'inline';
		}
	});	
	//end
	return grid;
}
/**
 * 设置内部属性，传入对象数组。
 */
dataObjectTreeGrid.setParameters = function() {
	for (var i = 0; i < arguments.length; i++) {
		var param = arguments[i];
		for (var key in param) {
			this.parameters[key] = param[key];
		}
	}
}
/**
 * 设置内部属性，单个属性设置
 * @param {} key
 * @param {} value
 */
dataObjectTreeGrid.setParameter = function(key, value) {
	this.parameters[key] = value;
}
/**
 * 查看历史记录
 * @param {} revision
 * @param {} dataEntityID
 */
dataObjectTreeGrid.viewHistory = function(revision, dataEntityID) {
	var t = dataCenterGridView.init();
	var cm = t.getColumnModel();
	t.on('beforeedit', function() {
		return false;
	});
	t.getBottomToolbar().removeAll();
	t.getBottomToolbar().add(new Ext.ux.maximgb.tg.PagingToolbar({
		store : t.getStore(),
		displayInfo : true,
		pageSize : 25,
		listeners : {
			'beforechange' : function(ptbar, opt) {
				t.getStore().on('beforeload', function(store, options) {
					this.proxy = new Ext.data.HttpProxy({
						method : 'POST',
						url : '../JSON/dataEntity_DataEntityRemote.getHistoryDataEntities'
					})
					options.params = Ext.apply(options.params, {
						dataEntityID : dataEntityID,
						revision : revision
					});
				});
			}
		}
	}));
	var win = new Ext.Window({
		autoScroll : true,
		tbar : [{
			hidden : true,
			text : '' + getResource('resourceParam1722') + '',
			handler : function() {
				cateInstanceEditTab.checkDataVer = revision;
				cateInstanceEditTab.checkDataId = dataEntityID;

				var u = window.location.href.substring(0,
						window.location.href.indexOf("base"));
				var dd = u + "/MM.swf?version=" + revision + "&dataId=" + dataEntityID;
				var winChart = new Ext.Window({
					width : 700,
					height : 500,
					layout : 'fit',
					items : [new Ext.Panel({
						html : '<embed src="' + dd + '" quality="high" type="application/x-shockwave-flash" width="100%" height="100%">'
					})]
				});
				winChart.show();
			}
		}],
		title : getResource('resourceParam3022'),
		items : [t],
		width : 700,
		modal : true,
		layout : 'fit',
		height : 300
	});
	t.getStore().on('beforeload', function(store, options) {
		this.proxy = new Ext.data.HttpProxy({
			method : 'POST',
			url : '../JSON/dataEntity_DataEntityRemote.getHistoryDataEntities'
		})
		options.params = Ext.apply(options.params, {
			dataEntityID : dataEntityID,
			revision : revision
		});
	});
	t.getStore().on('beforeexpandnode', function(store, rc) {
		store.on('beforeload', function(store, options) {
			this.proxy = new Ext.data.HttpProxy({
				method : 'POST',
				url : '../JSON/dataEntity_DataEntityRemote.getDataChildEntities'
			})
			options.params = Ext.apply(options.params, {
				// disableCheck : true,
				dataCenterID : rc.get('dataCenterID'),
				dataEntityID : rc.get('dataEntityID'),
				parentDataEntityID : rc.get('parentDataEntityID'),
				dataEntityType : rc.get('dataEntityType'),
				customTypeParentID : rc.get('customTypeParentID'),
				customTypeItemID : rc.get('customTypeItemID'),
				isRef : (rc.get("dimension").indexOf("*") > 0 || Number(rc.get("dimension")) > 1) ? 2 : rc.get('isRef'),
				inout : rc.get("inout"),
				dcategoryinstanceid : rc.get("dcategoryinstanceid"),
				revision : rc.get("revision"),
				isArrayItemChild : rc.get("isArrayItemChild")
			});
		});
	})
	t.getStore().load();
	win.show();
}

/**
 * 设置发布到数据中心的数据标签<br>
 * 选择数据中心标签
 */
function setLabelType(entityId, centerId, insId){
	dataLabelLocation.init(entityId, centerId, insId,
					function(insId_s, centerId_s){
						// grid.getSelectNodes()[0].set('dataEntityCategoryTagName', record.get("text"));
						dataObjectTreeGrid.parameters['__tmpGrid'].stopEditing();
						var r = dataObjectTreeGrid.parameters['__tmpGrid'].getSelectNodes()[0];
						r.set('dataEntityCategoryTag', insId_s);
						r.set('dataEntityCategoryTagCenterID', centerId_s);
						
						var tmp = r.get('dataEntityCategoryTagName');
					    tmp = tmp.substring(tmp.length - 1, tmp.length) == '_' ? tmp.substring(0, tmp.length - 1) : (tmp + '_');
					    r.set('dataEntityCategoryTagName', tmp);
					    r.markDirty();
					}
	);
}