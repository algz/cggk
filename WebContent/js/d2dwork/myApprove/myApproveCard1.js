var myApproveCard1 = {
	appStatusLovCom:'',		
	appObjLovCom:''
	
	
};
//bug:382 在我的审批界面“审批状态”和“审批对象”下拉列表不能进行多选
//把原来的'审批状态'和'审批对象' 的combox改为lovcom 

myApproveCard1.init = function() {
	myApproveCard1.centerPanel = myApproveGrid.init();
	appStatusStore= new Ext.data.SimpleStore({
							data : [ //全部状态  再添加一个全部取消
									['-1', ""+getResource('resourceParam1367')+""],//未审批
									['0', ""+getResource('resourceParam1363')+""],
									['1', ""+getResource('resourceParam1365')+""],
									['2', ""+getResource('resourceParam9181')+""],
									['3', ""+getResource('resourceParam9182')+""],
									['100', ""+getResource('resourceParam9794')+""]
									],
							fields : ['value', 'text']
						});
						
	appObjectStore=	new Ext.data.SimpleStore({
					data : [
							['-2', ''+getResource('resourceParam1366')+''], //全部对象
							['TaskDataType', ""+getResource('resourceParam733')+""],
							['ProjectDataType', ""+getResource('resourceParam463')+""],
						 	['FileDataType', ""+getResource('resourceParam469')+""],
						 	['TemplateDataType', '任务流程模板'],
							['DataTypeDataType', ""+getResource('resourceParam611')+""]

							],
					fields : ['value', 'text']
				});	
				
	pro_record = Ext.data.Record.create([{
				name : 'text'
			}, {
				name : 'value'
			}]),					
	status_selectAll = new pro_record({ //全部选取
				text : getResource('resourceParam5029'),
				value : '-2'
			}),
    status_deSelectAll = new pro_record({ //全部取消
				text : '' + getResource('resourceParam808') + '',
				value : '-3'
			}),	
			
	objType_selectAll = new pro_record({ //全部选取
				text : getResource('resourceParam5029'),
				value : '-2'
			}),
    objType_deSelectAll = new pro_record({ //全部取消
				text : '' + getResource('resourceParam808') + '',
				value : '-3'
			}),			
	myApproveCard1.northPanel = new Ext.Panel({
		layout : 'table',
		width : 800,
		height : 30,
		border : false,
		layoutConfig : {
			columns : 4	
		},
		defaults : {
			bodyStyle : 'padding:3px 5px;'
		},
		items : [{
			html : '<span style="line-height:18px;padding-left:5px;font-size:12;">'+getResource('resourceParam1145')+':</span>',//审批状态
			width : 80,
			bodyBorder : false
		},{
			
			bodyBorder : false,
			width : 160,
			items : [
				appStatusLovCom=new Ext.ux.form.LovCombo({
				id : 'approveStatusComb',
				width : 130,
				listWidth : 150,
				hideOnSelect : false,
				maxHeight : 200,
				store :appStatusStore,
				triggerAction : 'all',
				valueField : 'value',
				displayField : 'text',
				value:'-1',
				mode : 'local',
				beforeBlur : Ext.emptyFn,
                selectAll : function() {
                        var i=0;
                        this.store.each(function(record) {
                                    if(i !== 0)
                                    {
                                       record.set(this.checkField, true);
                                    }
                                    i++;
                                }, this);
                        this.doQuery(this.allQuery);
                        this.setValue(this.getCheckedValue());
                 }
				

			
			})]
		}
		
		,
		{
			html : '<span style="line-height:18px;padding-left:5px;font-size:12;">'+getResource('resourceParam728')+':</span>',//审批对象
			width : 80,
			hidden : true,
			bodyBorder : false
		}
		,{
			bodyBorder : false,
			width : 160,
			items : [
				appObjLovCom=new Ext.ux.form.LovCombo({
				id : 'approveObjectType',
				width : 130,
				listWidth : 150,
				hideOnSelect : false,
				maxHeight : 200,
				hidden : true,
				store : appObjectStore,
				triggerAction : 'all',
				valueField : 'value',
				displayField : 'text',
				value:'-2',
				mode : 'local',
				beforeBlur : Ext.emptyFn,
                selectAll : function() {
                        var i=0;
                        this.store.each(function(record) {
                                    if(i !== 0)
                                    {
                                       record.set(this.checkField, true);
                                    }
                                    i++;
                                }, this);
                        this.doQuery(this.allQuery);
                        this.setValue(this.getCheckedValue());
                 }
			})]

		}]
	}),
	
	//捕捉选择状态时的 select 事件

	appStatusLovCom.on('expand', function(combo) {

				var store = appStatusStore;
				var firstRecord = store.getAt(0);
				if (firstRecord.data.value == -2
						|| firstRecord.data.value == -3) {
					store.remove(firstRecord);
				}
				var checkSum = null;// 选中的总数
				if (combo.getCheckedValue() == '') {
					checkSum = 0;
				} else {
					checkSum = combo.getCheckedValue().split(',').length;
				}
				if (checkSum == store.getCount()) {
					// 已全部选中
					store.insert(0, status_deSelectAll);
				} else {
					store.insert(0, status_selectAll);
				}
			});
	appStatusLovCom.on('select', function(combo, record, index) {
			if (record.data.value == -2) {
					record.set('checked', false);
					combo.getStore().remove(record);
					combo.getStore().insert(0, status_deSelectAll);
					combo.selectAll();
                    combo.getStore().getAt(0).set('checked',false);
				} else if (record.data.value == -3) {
					combo.deselectAll();
					combo.getStore().remove(record);
					combo.getStore().insert(0, status_selectAll);
				} else {
					var checkSum = null;// 选中的总数
					if (combo.getCheckedValue() == '') {
						checkSum = 0;
					} else {
						checkSum = combo.getCheckedValue().split(',').length;
					}
					if (checkSum < (combo.getStore().getCount() - 1)) {
						combo.getStore().remove(combo.getStore().getAt(0));
						combo.getStore().insert(0, status_selectAll);
					}
					if (checkSum == (combo.getStore().getCount() - 1)) {
						combo.getStore().remove(combo.getStore().getAt(0));
						combo.getStore().insert(0, status_deSelectAll);
					}
				}	
		
		});		
	 appStatusLovCom.on('blur', function() {
				// return;
	 			//状态
	 			var tempStatus = Ext.getCmp("approveStatusComb").getValue();
	 			//对象
				var tempObjType= Ext.getCmp("approveObjectType").getValue();
				
				var objectType="";
				if (tempObjType.length != 0) {
					objectType= tempObjType+',';
					
				} else {
					appObjLovCom.setRawValue(""
							+ getResource('resourceParam1366') + "");
				}
				
				if(tempStatus.length==0){
					appStatusLovCom.setRawValue(""
							+ getResource('resourceParam1364') + "");
				}
				 
				var approveStore = myApproveCard1.centerPanel.getStore();
				approveStore.proxy = new Ext.data.HttpProxy({
						url : '../JSON/approval_ApprovalRemote.getApprovalListByUserId?appStatuses='
								+ tempStatus + '&objectType=' + objectType+'&approvalType=StepByStep',
						method : 'GET'
					});
				
				approveStore.load();
				
			});	
			//捕捉“选择对象”时的各种事件 
		appObjLovCom.on('expand', function(combo) {
			var store = appStatusStore;
			var firstRecord = store.getAt(0);
			if (firstRecord.data.value == -2
					|| firstRecord.data.value == -3 || firstRecord.data.value == -1) {
				store.remove(firstRecord);
			}
			var checkSum = null;// 选中的总数
			if (combo.getCheckedValue() == '') {
				checkSum = 0;
			} else {
				checkSum = combo.getCheckedValue().split(',').length;
			}
			if (checkSum == store.getCount()) {
				// 已全部选中
				store.insert(0, objType_deSelectAll);
			} else {
				store.insert(0, objType_selectAll);
			}
		});
		appObjLovCom.on('select', function(combo, record, index) {
			if (record.data.value == -2) {
					record.set('checked', false);
					combo.getStore().remove(record);
					combo.getStore().insert(0, objType_deSelectAll);
					combo.selectAll();
                    combo.getStore().getAt(0).set('checked',false);
				} else if (record.data.value == -3) {
					combo.deselectAll();
					combo.getStore().remove(record);
					combo.getStore().insert(0, objType_selectAll);
				} else {
					var checkSum = null;// 选中的总数
					if (combo.getCheckedValue() == '') {
						checkSum = 0;
					} else {
						checkSum = combo.getCheckedValue().split(',').length;
					}
					/**
					 * bug编号597 王跃飞 bug信息：在我的审批界面，审批对象过滤条件可以选择“选取所有，任务”
					 * bug已修改
					 */
					Ext.getCmp("approveObjectType").setValue(Ext.getCmp("approveObjectType").getValue().replace("-2", ""));
					
					if (checkSum < (combo.getStore().getCount() - 1)) {
						combo.getStore().remove(combo.getStore().getAt(0));
						combo.getStore().insert(0, objType_selectAll);
					}
					if (checkSum == (combo.getStore().getCount() - 1)) {
						combo.getStore().remove(combo.getStore().getAt(0));
						combo.getStore().insert(0, objType_deSelectAll);
					}
				}	
		
		});		
	 	appObjLovCom.on('blur', function() {
				// return;
	 			//状态
	 			var tempStatus = Ext.getCmp("approveStatusComb").getValue();
	 			//对象
				var tempObjType= Ext.getCmp("approveObjectType").getValue();
				
				var objectType="";
				if (tempObjType.length != 0) {
					objectType= tempObjType+',';
					
				} else {
					appObjLovCom.setRawValue(""
							+ getResource('resourceParam1366') + "");
				}
				
				if(tempStatus.length==0){
					appStatusLovCom.setRawValue(""
							+ getResource('resourceParam1364') + "");
				}
				 
				var approveStore = myApproveCard1.centerPanel.getStore();
				approveStore.proxy = new Ext.data.HttpProxy({
						url : '../JSON/approval_ApprovalRemote.getApprovalListByUserId?appStatuses='
								+ tempStatus + '&objectType=' + objectType+'&approvalType=StepByStep',
						method : 'GET'
					});
				
				approveStore.load();

	
			});		
//	appObjLovCom.setRawValue(""+ getResource('resourceParam1366') + "");
	
	myApproveCard1.mainPanel = new Ext.Panel({
				layout : 'border',
				items : [{
							region : 'north',
							height : 30,
							items : [myApproveCard1.northPanel]
						}, {
							region : 'center',
							layout : 'fit',
							items : [myApproveCard1.centerPanel]
						}]
			})

	return myApproveCard1.mainPanel;
}
