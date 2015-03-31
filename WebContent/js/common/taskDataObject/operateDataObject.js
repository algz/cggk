var operateDataObject = {}

operateDataObject.initWindow = function(node,flag,callback) {
	//var node = dataObjectColumnTree.columnTree.getChecked()[0];
	var self = this;
	var windowTitle = (flag == "add") ? ""+getResource('resourceParam466')+"" : "更新";
	this.fnCallback = callback;
	var isChild = (flag == "add" || node.attributes.isRef.indexOf("Parent") > 0)
			? false
			: true;

	this.typeComboStore = new Ext.data.JsonStore({
				url : '../JSON/webremote_dataTypeRemote.getAllDataType',
				fields : [{
							name : 'datatypename',
							mapping : 'datatypename'
						}, {
							name : 'datatype',
							mapping : 'datatype'
						}, {
							name : 'datatypeid',
							mapping : 'datatypeid'
						}]
			})
	this.typeCombo = new Ext.form.ComboBox({
				id : 'dataObjectTypeCombo',
				store : this.typeComboStore,
				triggerAction : 'all',
				width : 130,
				listWidth : 130,
				editable : false,
				blankText : ''+getResource('resourceParam1088')+'',
				allowBlank : false,
				disabled : isChild,
				value : flag == "add" ? "" : node.attributes.dataObjectType,
				displayField : 'datatypename',
				valueField : 'datatypeid',
				fieldLabel : ''+getResource('resourceParam481')+'',
				onSelect : function(record, index) {
					if (this.fireEvent('beforeselect', this, record, index) != false) {
						this.setValue(record.data[this.valueField
								|| this.displayField]);
						this.collapse();
						this.fireEvent('select', this, record, index);
					}
					Ext.get("dataObjectType").dom.value = this.value;
					self.vaildFn(record.get('datatype'));
				}
			})
	this.vaildFn = function(dataType) {
		var comValue = Ext.get("dataObjectType").dom.value;

		if ("date" == dataType) {
			self.content.remove(Ext.getCmp("newDataObjectValue"));
			self.content.insert(8, new Ext.form.DateField({
				id : 'newDataObjectValue',
				name : 'value',
				fieldLabel : ''+getResource('resourceParam511')+'',
				format : 'Y年m月d日',
				disabled : (dataType == "file")
						? true
						: false,
				width : 130,
				value : flag == "add" ? "" : node.attributes.value
			}))
			self.content.doLayout();
		} else if ("boolean" == dataType) {
			self.content.remove(Ext.getCmp("newDataObjectValue"));
			self.content.insert(8, new Ext.form.ComboBox({
					id : 'newDataObjectValue',
					name : 'value',
					store : new Ext.data.SimpleStore({
								data : [["true", "true"], ["false", "false"]],
								fields : ['value', 'text']
							}),
					triggerAction : 'all',
					width : 130,
					listWidth : 130,
					editable : false,
					disabled : isChild,
					mode : 'local',
					value : flag == "add" ? "true" : node.attributes.value,
					displayField : 'text',
					fieldLabel : ''+getResource('resourceParam511')+'',
					valueField : 'value',
					onSelect : function(record, index) {
						if (this.fireEvent('beforeselect', this, record, index) != false) {
							this.setValue(record.data[this.valueField
									|| this.displayField]);
							this.collapse();
							this.fireEvent('select', this, record, index);
						}
					}
				}))
			self.content.doLayout();
		} else {
			self.content.remove(Ext.getCmp("newDataObjectValue"));
			self.content.insert(8, new Ext.form.TextField({
				id : 'newDataObjectValue',
				name : 'value',
				fieldLabel : ''+getResource('resourceParam511')+'',
				maxLength : 50,
				disabled : (dataType == "file")
						? true
						: false,
				width : 130,
				value : flag == "add" ? "" : node.attributes.value,
				enableKeyEvents : true,
				validator : function(value) {
					var flag = Ext.get("dataObjectType").dom.value;
					if ("boolean" == flag) {
						var reg = /^(true|false)*$/;
						if (reg.test(value)) {
							return true;
						} else {
							this.invalidText = ""+getResource('resourceParam1083')+"!";
							return false;
						}
					}
					if ("double" == flag) {
						var reg = /^([1-9]\d*(.\d*)?)*$/;
						if (reg.test(value)) {
							return true;
						} else {
							this.invalidText = ""+getResource('resourceParam1083')+"!";
							return false;
						}
					}
					if ("integer" == flag) {
						var reg = /^([1-9][0-9]*)*$/;
						if (reg.test(value)) {
							return true;
						} else {
							this.invalidText = ""+getResource('resourceParam1083')+"!";
							return false;
						}
					}
					return true;
				}
			}))
			self.content.doLayout();
		}
		if (dataType == "file") {
			Ext.getCmp("newDataObjectValue").disable();
			Ext.get("newDataObjectValue").dom.value = "";
		} else {
			Ext.getCmp("newDataObjectValue").enable();
		}
	}
	this.groupComboStore = new Ext.data.JsonStore({
				url : '../JSON/webremote_DataGroupRemote.getGroupListById',
				fields : [{
							name : 'itemname',
							mapping : 'itemname'
						}, {
							name : 'itemid',
							mapping : 'itemid'
						}],
				baseParams : {
					groupid : 'DataInOut'
				}
			})
	this.groupCombo = new Ext.form.ComboBox({
				id : 'itemidCombo',
				store : this.groupComboStore,
				triggerAction : 'all',
				width : 130,
				listWidth : 130,
				allowBlank : false,
				blankText : 'IO'+getResource('resourceParam1088')+'',
				editable : false,
				disabled : isChild,
				value : flag == "add" ? "" : node.attributes.inout,
				displayField : 'itemname',
				valueField : 'itemid',
				fieldLabel : ''+getResource('resourceParam849')+'',
				onSelect : function(record, index) {
					if (this.fireEvent('beforeselect', this, record, index) != false) {
						this.setValue(record.data[this.valueField
								|| this.displayField]);
						this.collapse();
						this.fireEvent('select', this, record, index);
					}
					Ext.get("inout").dom.value = this.value;
				}
			})

	this.content = new Ext.form.FormPanel({
		labelWidth : 100,
		labelAlign : 'right',
		defaults : {
			cls : 'padding:5px 5px;border:0;'
		},
		frame : true,
		border : false,
		items : [new Ext.form.TextField({
							name : 'dataObjectName',
							fieldLabel : ''+getResource('resourceParam480')+'',
							allowBlank : false,
							blankText : ''+getResource('resourceParam1089')+'',
							width : 130,
							maxLength : 30,
							disabled : isChild,
							enableKeyEvents : true,
							validator : function(value) {
								if (Ext.util.Format.trim(value).length == 0) {
									this.invalidText = ""+getResource('resourceParam1089')+"";
									return false;
								}
								var reg = /^.*[/\\:\*\?\"<>\|]+.*$/;
								if (reg.test(value)) {
									this.invalidText = ""+getResource('resourceParam1087')+"";
									return false;
								} else {
									return true;
								}
							},
							value : flag == "add"
									? ""
									: node.attributes.dataObjectName
						}), this.typeCombo, {
					id : 'dataObjectType',
					xtype : 'hidden',
					value : flag == "add"
							? ""
							: node.attributes.dataObjectRealType
				}, this.groupCombo, {
					id : 'inout',
					xtype : 'hidden',
					value : flag == "add" ? "" : node.attributes.inoutType
				}, new Ext.form.TextField({
							name : 'dimension',
							fieldLabel : ''+getResource('resourceParam853')+'',
							disabled : isChild,
							blankText : ''+getResource('resourceParam1084')+'',
							width : 130,
							allowBlank : false,
							enableKeyEvents : true,
							validator : function(value) {
								if (Ext.util.Format.trim(value).length == 0) {
									this.invalidText = ""+getResource('resourceParam1084')+"";
									return false;
								}
								var reg = /^([1-9][0-9]*(\*[1-9][0-9]*)?)*$/;
								if (reg.test(value)) {
									if ((value.indexOf("*") < 0 && value > 10000)
											|| (value.indexOf("*") > 0 && (value
													.split("*")[0]
													* value.split("*")[1] > 10000))) {
										this.invalidText = ""+getResource('resourceParam1086')+"";
										return false;
									} else
										return true;
								} else {
									this.invalidText = ""+getResource('resourceParam1082')+"";
									return false;
								}
							},
							value : flag == "add"
									? "1"
									: node.attributes.dimension
						}), new Ext.form.ComboBox({
					id : 'publishComb',
					store : new Ext.data.SimpleStore({
								data : [[1, ""+getResource('resourceParam512')+""], [0, ""+getResource('resourceParam510')+""]],
								fields : ['value', 'text']
							}),
					triggerAction : 'all',
					width : 130,
					listWidth : 130,
					editable : false,
					disabled : isChild,
					mode : 'local',
					value : flag == "add" ? 0 : node.attributes.publish,
					displayField : 'text',
					fieldLabel : ''+getResource('resourceParam850')+'',
					valueField : 'value',
					onSelect : function(record, index) {
						if (this.fireEvent('beforeselect', this, record, index) != false) {
							this.setValue(record.data[this.valueField
									|| this.displayField]);
							this.collapse();
							this.fireEvent('select', this, record, index);
						}
					}
				}), new Ext.form.TextField({
					id : 'newDataObjectValue',
					name : 'value',
					fieldLabel : ''+getResource('resourceParam511')+'',
					disabled : (flag != "add" && node.attributes.dataObjectRealType == "file")
							? true
							: false,
					width : 130,
					maxLength : 50,
					value : flag == "add" ? "" : node.attributes.value,
					enableKeyEvents : true,
					validator : function(value) {
						var flag = Ext.get("dataObjectType").dom.value;
						if ("boolean" == flag) {
							var reg = /^(true|false)*$/;
							if (reg.test(value)) {
								return true;
							} else {
								this.invalidText = ''+getResource('resourceParam1083')+'!';
								return false;
							}
						}
						if ("double" == flag) {
							var reg = /^(\d+(.\d*)?)*$/;
							if (reg.test(value)) {
								return true;
							} else {
								this.invalidText = ""+getResource('resourceParam1083')+"!";
								return false;
							}
						}
						if ("integer" == flag) {
							var reg = /^([1-9][0-9]*)*$/;
							if (reg.test(value)) {
								return true;
							} else {
								this.invalidText = ""+getResource('resourceParam1083')+"!";
								return false;
							}
						}
						return true;
					}
				})]
	})
	this.window = new Ext.Window({
				modal : true,
				width : 400,
				height : 250,
				title : windowTitle + ''+getResource('resourceParam474')+'',
				items : [this.content],
				border : false,
				buttonAlign : 'center',
				buttons : [{
							text : ''+getResource('resourceParam479')+'',
							handler : function(button) {
								button.disable();
								if (!self.content.getForm().isValid()) {
									return;
								}
								if (flag == "add") {
									self.addDataObject();
								} else {
									self.updateDataObject();
								}
								button.enable();
							}
						}, {
							text : '取消',
							handler : function() {
								self.window.close();
							}
						}],
				closable : 'close'
			})
	this.window.show();
	Ext.onReady(function() {
				if (flag == "add") {
					operateDataObject.vaildFn();
				} else {
					operateDataObject.vaildFn(node.attributes.datatype);
				}
			})
	this.updateDataObject = function() {
		if (node.attributes.dataObjectId != "") {
			Ext.Ajax.request({
				url : '../JSON/webremote_DataObjectRemote.updateDataObject',
				method : 'POST',
				params : Ext.apply(self.content.getForm().getFieldValues(), {
							dataObjectId : node.attributes.dataObjectId,
							dataCenterId : node.attributes.dataCenterId,
							dataObjectRealType : node.attributes.dataObjectRealType,
							isRef : node.attributes.isRef,
							publish : Ext.getCmp("publishComb").getValue()
						}),
				success : function(result, opt) {
					node.parentNode.reload();
					self.window.close();
					callback(true);
				},
				failure : function(result, opt) {
					self.window.close();
					callback(false);
				}
			})
		} else {
			Ext.Ajax.request({
				url : '../JSON/webremote_DataObjectRemote.updateChildDataObjectEntity',
				method : 'POST',
				params : Ext.apply(self.content.getForm().getFieldValues(), {
							dataCenterId : node.attributes.dataCenterId,
							parentDataObjectId : node.attributes.parentDataObjectId,
							customTypeItemID : node.attributes.customTypeItemID,
							dataObjectRealType : node.attributes.dataObjectRealType,
							orderNumber : node.attributes.orderNumber,
							isRef : node.attributes.isRef,
							customTypeParentID : node.attributes.customTypeParentID,
							publish : Ext.getCmp("publishComb").getValue()
						}),
				success : function(result, opt) {
					node.parentNode.reload();
					self.window.close();
					callback(true);
				},
				failure : function(result, opt) {
					self.window.close();
					callback(false);
				}
			})
		}

	}

	this.addDataObject = function() {
		Ext.Ajax.request({
			url : '../JSON/webremote_DataObjectRemote.insertDataObject',
			method : 'POST',
			params : Ext.apply(self.content.getForm().getValues(false), {
						dataCenterId : node.id.substring(1, node.id.length),
						publish : Ext.getCmp("publishComb").getValue()
					}),
			success : function(result, opt) {
				node.reload();
				self.window.close();
				callback(true);
			},
			failure : function(result, opt) {
				callback(false);
				self.window.close();
			}
		})
	}

}
operateDataObject.delDataObject = function(delNodes,callback) {
	Ext.Msg.confirm(""+getResource('resourceParam851')+"", ""+getResource('resourceParam848')+"", function(button, text) {
		if ('yes' == button) {
			Ext.Ajax.request({
						url : '../JSON/webremote_DataObjectRemote.delDataObjectBat',
						success : function(res, opt) {
							for(var i=0;i<delNodes.length;i++){
								if(delNodes[i].id.indexOf("io")==0){
									delNodes[i].remove();
								}else if(delNodes[i].id.indexOf("t")==0){
									var tNode = delNodes[i];
									for(var j=0;j<tNode.childNodes.length;j++){
										tNode.childNodes[j].remove();
									}
									tNode.reload();
								}
							}
							callback(true);
						},
						failure : function(res, opt) {
							callback(false);
						},
						params : {
							id : getDelNodesIds(delNodes).join(",")
						}
					})
		}
	})
	function getDelNodesIds(nodes){
		var idArr = new Array();
		for(var i=0;i<nodes.length;i++){
			idArr.push(nodes[i].id)
		}
		return idArr;
	}
}
operateDataObject.uploadFile = function(id) {
	var obj = {
		dataObjectId : 0,
		value : ""
	};
	if (id != "") {
		var conn = synchronize.createXhrObject();
		var myurl = "../JSON/webremote_DataObjectRemote.getDataObjectById?dataObjectId="
				+ id + "&d=" + new Date();
		conn.open("GET", myurl, false);
		conn.send(null);
		obj = Ext.util.JSON.decode(conn.responseText)[0];
	}
	var self = this;
	this.uploadFileWindow = new Ext.Window({
		title : ''+getResource('resourceParam1090')+'',
		height : 180,
		width : 350,
		resizable : false,
		modal : true,
		buttonAlign : 'center',
		items : [{
					xtype : 'hidden',
					id : 'idpathHiddenField',
					value : id
				}, {
					xtype : 'hidden',
					id : 'objectHiddenField',
					value : dataObjectColumnTree
				}],
		html : obj.realIsRef == "NONE"
				? '<div style="padding:5px 5px;font-size:14px;"><span>'+getResource('resourceParam469')+' ： </span><span>'
						+ obj.value
						+ '</span></div><iframe frameborder=0 width=100% height=100% id="myTaskDataObjectFile" src="../dataObjectFile.seam"></iframe>'
				: '<div style="padding:5px 5px;font-size:14px;"><span>'+getResource('resourceParam469')+' ： </span><a style="text-decoration:underline;" href="../DataObjectFileDownLoadServlet?fileid='
						+ obj.dataObjectId
						+ '"><span>'
						+ obj.value
						+ '</span></a></div><iframe frameborder=0 width=100% height=100% id="myTaskDataObjectFile" src="../dataObjectFile.seam"></iframe>',
		buttons : [{
					text : ''+getResource('resourceParam506')+'',
					handler : function() {
						self.uploadFileWindow.close()
					}
				}]
	})
	this.uploadFileWindow.show();
	this.uploadFileWindow.on("close", function() {
		dataObjectColumnTree.columnTree.getChecked()[0].parentNode
				.reload();
	})
}
operateDataObject.beforeUploadFile = function(id, fobjName) {
	var node = dataObjectColumnTree.columnTree.getNodeById(id);
	Ext.Ajax.request({
				url : '../JSON/webremote_DataObjectRemote.updateChildDataObjectEntity',
				method : 'POST',
				params : {
					dataCenterId : node.attributes.dataCenterId,
					parentDataObjectId : node.attributes.parentDataObjectId,
					customTypeItemID : node.attributes.customTypeItemID,
					dataObjectRealType : node.attributes.dataObjectRealType,
					orderNumber : node.attributes.orderNumber,
					isRef : node.attributes.isRef,
					dimension : node.attributes.dimension,
					customTypeParentID : node.attributes.customTypeParentID,
					dataObjectName : node.attributes.dataObjectName,
					customTypeParentID : node.attributes.customTypeParentID,
					publish : node.attributes.publish
				},
				success : function(result, opt) {
					var data = Ext.util.JSON.decode(result.responseText)[0];
					operateDataObject.uploadFile(data.dataObjectId, fobjName)
				}
			})
}
