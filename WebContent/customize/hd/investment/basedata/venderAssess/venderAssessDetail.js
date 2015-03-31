var venderAssessDetail = {

	assessId : null,
	hasOpen : false,
	showVenderDetail : function(assessId,num,type){
//	移除已经打开的panel
	if(venderAssessDetail.hasOpen){
		venderManagerMain.tabs.remove(1);
	}	
	venderAssessDetail.assessId = assessId;
		var panel = null;
		if(type==1){
			panel = venderAssessDetail.getPanelI();
		}else if(type == 2){
			panel = venderAssessDetail.getPanelII();
		}
		venderManagerMain.tabs.add({
			title : '考核单'+num+'详情',
			layout : 'fit',
			closable : true,
			items : [panel]
		}).show();
	},
//	成品供应商考核grid
	getPanelI : function(){
		venderAssessDetail.hasOpen = true;
		var store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						url : '../JSON/vendor_VendorRemote.getVenderAssessDetailData?d='+new Date(),
						method : 'post'
					}),
			reader : new Ext.data.JsonReader({
						root : 'results',
						id : 'id',
						totalProperty : 'totalProperty'
					}, ['vendorCode','vendorName','dpCode','dpName', 
						'matingType','massScore','payScore','serveScore','compositeScore',
						'assessGrade','editor','editdate','assessDetailId'])
		});
		//分页工具栏   
		var paging = new Ext.PagingToolbar({
			store : store,
			pageSize : 20,
			displayInfo : true,
			displayMsg : '第 {0} 到 {1} 条，一共  {2} 条',
			emptyMsg : '没有记录'
		}); 
		var sm = new Ext.grid.CheckboxSelectionModel();
		var cm = new Ext.grid.ColumnModel([sm,
			 new Ext.grid.RowNumberer({header : "序号",width : 40}),
			 {header : '供应商编号',dataIndex : 'vendorCode',sortable : true,width : 130},
			 {header : '供方名称',dataIndex : 'vendorName',sortable : true,width : 100}, 
			 {header : '配套机型',dataIndex : 'matingType',sortable : true,width : 100},
			 {header : '质量综合分',dataIndex : 'massScore',sortable : true,width : 100},
			 {header : '支付综合分',dataIndex : 'payScore',sortable : true,width : 100},
			 {header : '服务综合分',dataIndex : 'serveScore',sortable : true,width : 100},
			 {header : '综合得分',dataIndex : 'compositeScore',sortable : true,width : 100},
			 {header : '评定等级',dataIndex : 'assessGrade',sortable : true,width : 100},
			 {header : '创建人',dataIndex : 'editor',sortable : true,width : 100},
			 {header : '创建时间',dataIndex : 'editdate',sortable : true,width : 100}
		]);
		var grid = new Ext.grid.GridPanel({
			id : 'DetailPanelI',
			cm : cm, 
			sm:sm,
			columnLines : true,
			stripeRows : true,
			bbar : paging,
			region : 'center',
			store : store,
			loadMask : {
		    	 msg : '正在加载数据，请稍侯……'
		    },
			tbar : new Ext.Toolbar({
				items : ['-',{
							iconCls : 'add1',text : '考核评分',
							handler : function(){
								venderAssessDetail.createGradeWinI();
							}
						},'-',{
							text : '删除',iconCls : 'del1',
							handler : function(){

								var s = grid.getSelectionModel().getSelections();
								if (s.length > 0) {
									Ext.MessageBox.confirm("提示", "是否真的要删除数据？", function(ret) {
									delIds = "";
									if (ret == "yes") {
										for (var i = 0, r; r = s[i]; i++) {
											delIds  = delIds + r.data.assessDetailId + ",";
										}
										Ext.Ajax.request({  
											url: '../JSON/vendor_VendorRemote.delVenderAssessDetail?d='+new Date(),  
											params: {assessDetailId : delIds},
											success : function(response, opts) {
												var obj = Ext.decode(response.responseText);
												if (obj.success == true) {
													 Ext.Msg.alert('提示', '保存成功!');
													 var grid = Ext.getCmp('DetailPanelI');
													grid.getStore().baseParams = {start:0,limit:20,assessId :venderAssessDetail.assessId};
													grid.store.reload();
													Ext.getCmp('venderGradeWinI').close();
												} else {
													Ext.Msg.alert('提示', '保存失败!');
												}
											},
											failure : function(response, opts) {
												Ext.Msg.alert('提示', '数据问题,请与管理员联系!');
											}
										});
									}
								})
								} else {
									Ext.MessageBox.alert("提示", "请先选择要删除的数据!");
								}	
							
							}
						}
				]})
		
		});
	
		store.baseParams = {start:0,limit:20,assessId : venderAssessDetail.assessId};
		store.load();
		return grid;


	},
//	原材料供应商考核grid
	getPanelII : function(){
		venderAssessDetail.hasOpen = true;
		var store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						url : '../JSON/vendor_VendorRemote.getVenderAssessDetailData?d='+new Date(),
						method : 'post'
					}),
			reader : new Ext.data.JsonReader({
						root : 'results',
						id : 'id',
						totalProperty : 'totalProperty'
					}, ['vendorCode','vendorName','dpCode','dpName', 
						'matingType','massScore','payScore','serveScore','compositeScore',
						'assessGrade','editor','editdate','assessDetailId'])
		});
		//分页工具栏   
		var paging = new Ext.PagingToolbar({
			store : store,
			pageSize : 20,
			displayInfo : true,
			displayMsg : '第 {0} 到 {1} 条，一共  {2} 条',
			emptyMsg : '没有记录'
		}); 
		var sm = new Ext.grid.CheckboxSelectionModel();
		var cm = new Ext.grid.ColumnModel([sm,
			 new Ext.grid.RowNumberer({header : "序号",width : 40}),
			 {header : '承制单位编号',dataIndex : 'dpCode',sortable : true,width : 130},
			 {header : '承制单位',dataIndex : 'dpName',sortable : true,width : 100}, 
			 {header : '经销商编号',dataIndex : 'vendorCode',sortable : true,width : 100}, 
			 {header : '经销商',dataIndex : 'vendorName',sortable : true,width : 100},
			 {header : '质量综合分',dataIndex : 'massScore',sortable : true,width : 100},
			 {header : '支付综合分',dataIndex : 'payScore',sortable : true,width : 100},
			 {header : '服务综合分',dataIndex : 'serveScore',sortable : true,width : 100},
			 {header : '综合得分',dataIndex : 'compositeScore',sortable : true,width : 100},
			 {header : '评定等级',dataIndex : 'assessGrade',sortable : true,width : 100},
			 {header : '创建人',dataIndex : 'editor',sortable : true,width : 100},
			 {header : '创建时间',dataIndex : 'editdate',sortable : true,width : 100}
		]);
		var grid = new Ext.grid.GridPanel({
			id : 'DetailPanelII',
			cm : cm, 
			sm : sm,
			columnLines : true,
			stripeRows : true,
			bbar : paging,
			region : 'center',
			store : store,
			loadMask : {
		    	 msg : '正在加载数据，请稍侯……'
		    },
			tbar : new Ext.Toolbar({
				items : ['-',{
							iconCls : 'add1',
							text : '考核评分',
							handler : function(){
								venderAssessDetail.createGradeWinII();
							}
						},'-',{
							text : '删除',
							iconCls : 'del1',
							handler : function(){


								var s = grid.getSelectionModel().getSelections();
								if (s.length > 0) {
									Ext.MessageBox.confirm("提示", "是否真的要删除数据？", function(ret) {
									delIds = "";
									if (ret == "yes") {
										for (var i = 0, r; r = s[i]; i++) {
											delIds  = delIds + r.data.assessDetailId + ",";
										}
										Ext.Ajax.request({  
											url: '../JSON/vendor_VendorRemote.delVenderAssessDetail?d='+new Date(),  
											params: {assessDetailId : delIds},
											success : function(response, opts) {
												var obj = Ext.decode(response.responseText);
												if (obj.success == true) {
													 Ext.Msg.alert('提示', '保存成功!');
													 var grid = Ext.getCmp('DetailPanelII');
													grid.getStore().baseParams = {start:0,limit:20,assessId :venderAssessDetail.assessId};
													grid.store.reload();
													Ext.getCmp('venderGradeWinII').close();
												} else {
													Ext.Msg.alert('提示', '保存失败!');
												}
											},
											failure : function(response, opts) {
												Ext.Msg.alert('提示', '数据问题,请与管理员联系!');
											}
										});
									}
								})
								} else {
									Ext.MessageBox.alert("提示", "请先选择要删除的数据!");
								}	
							}
						}
				]})
		
		});
	
		store.baseParams = {start:0,limit:20,assessId : venderAssessDetail.assessId};
		store.load();
		return grid;
	},
//	成品类型供应商评分添加窗口
	createGradeWinI : function(){

		var store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
				url : '../JSON/vendor_VendorRemote.getVendorAppraisalGridData?d='+new Date(),
				method : 'post'
			}),
			reader : new Ext.data.JsonReader({
				root : 'results',
				id : 'id',
				totalProperty : 'totalProperty'
			},[,'vendorID','vendorName', 'vendorCode']),
			baseParams :{
				start:0,limit:20
			}
		});
		var combox = new Ext.form.ComboBox({
			name : 'venderId',
			fieldLabel : '供应商',
			displayField : ['vendorName'],
			valueField : 'vendorID',
			hiddenName : 'venderId',
			store : store,
			triggerAction : 'all',
			width:50,
			minChars : 0,
			pageSize : 20,
			allowBlank : false,
			forceSelection : true,
			anchor : '89%',
	//		value : ''
			emptyText : '请选择...',
			listeners :{
				beforequery : function(e){
					var sto = e.combo.getStore();
					e.combo.getStore().setBaseParam("vendorName",e.combo.getRawValue());
				},
				select :function(combo,record){
					Ext.getCmp('vendorCode').setValue(record.data.vendorCode);
				}
			}
		});
		var items = [
		    {xtype : 'hidden',id:'assessId',name:'assessId',value:venderAssessDetail.assessId},
			combox,
			{xtype : "textfield",disabled : true,fieldLabel : '供应商编号',lableWidth : 150,id : 'vendorCode',name : 'vendorCode',anchor : '89%',allowBlank : false},
			{xtype : "textfield",fieldLabel : '配套机型',lableWidth : 150,id : 'matingType',name : 'matingType',allowBlank : false,anchor : '89%'},
			{xtype : "textfield",fieldLabel : '质量综合分',lableWidth : 150,id : 'massScore',name : 'massScore',allowBlank : false,anchor : '89%'},
			{xtype : "textfield",fieldLabel : '交付综合分',lableWidth : 150,id : 'payScore',name : 'payScore',allowBlank : false,anchor : '89%'},
			{xtype : "textfield",fieldLabel : '服务综合分',lableWidth : 150,id : 'serveScore',name : 'serveScore',allowBlank : false,anchor : '89%'},
			{xtype : "textfield",fieldLabel : '综合得分',lableWidth : 150,id : 'compositeScore',name : 'compositeScore',allowBlank : false,anchor : '89%'},
			{xtype : "textfield",fieldLabel : '评定等级',lableWidth : 150,id : 'assessGrade',name : 'assessGrade',allowBlank : false,anchor : '89%'}
		]; 
	
		var inform = new Ext.FormPanel( {
			id : 'venderAssessDetailFromI', 
			buttonAlign : 'center',
			labelAlign : 'right', 
			autoHeight : true, 
			border : false,
			items : items,
			width : 300,
			height : 150
		});
		
		var buttons = [ {
			text : ' 确定 ',
			handler : function() { 
				var formPanel = Ext.getCmp('venderAssessDetailFromI');
				if(formPanel.form.isValid()) {
					formPanel.form.doAction('submit',{
						waitMsg:'正在保存数据，请稍候...',
						waitTitle:'提示',
						url : '../JSON/vendor_VendorRemote.saveVendorAssessDetail?d='+ new Date(),
						method : 'POST',
						success : function(form, action) {
							Ext.Msg.alert('提示','保存数据成功！');	
							var grid = Ext.getCmp('DetailPanelI');
							grid.getStore().baseParams = {start:0,limit:20,assessId :venderAssessDetail.assessId};
							grid.store.reload();
							win.close();
						},
						failure : function(form, action){
							Ext.Msg.alert('提示','保存数据失败,供应商编号或供应商名称重复');
						}
					});
				}
			}
		}, {
			text : '取消',
			handler : function() {
				win.close();
			}
		} ]
	
		var win = new Ext.Window( {
			id : "venderGradeWinI",
			title : "考核单",
			width : 300,
			layout : 'fit',
			autoScroll : true, 
			modal : true,
			items : inform,
			autoDestory : true,
			buttons : buttons,
			closeAction :'close'
		});
		win.show();

	},
//	原材料类型供应商评分添加窗口
	createGradeWinII : function(){

		var store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
				url : '../JSON/vendor_VendorRemote.getVendorAppraisalGridData?d='+new Date(),
				method : 'post'
			}),
			reader : new Ext.data.JsonReader({
				root : 'results',
				id : 'id',
				totalProperty : 'totalProperty'
			},[,'vendorID','vendorName', 'vendorCode']),
			baseParams :{
				start:0,limit:20
			}
		});
		var combox = new Ext.form.ComboBox({
			name : 'venderId',
			fieldLabel : '经销商',
			displayField : 'vendorName',
			valueField : 'vendorID',
			hiddenName : 'venderId',
			store : store,
			triggerAction : 'all',
			width:50,
			minChars : 0,
			pageSize : 20,
			allowBlank : false,
			forceSelection : true,
			anchor : '89%',
	//		value : ''
			emptyText : '请选择...',
			listeners :{
				beforequery : function(e){
					var sto = e.combo.getStore();
					e.combo.getStore().setBaseParam("vendorName",e.combo.getRawValue());
				},
				select :function(combo,record){
					Ext.getCmp('vendorCode').setValue(record.data.vendorCode);
				}
			}
		});
		
		var dpStore = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
				url : '../JSON/untilsRemote.getDepartmentList?d='+new Date(),
				method : 'post'
			}),
			reader : new Ext.data.JsonReader({
				root : 'results',
				id : 'id',
				totalProperty : 'totalProperty'
			},[,'text', 'value']),
			baseParams :{
				start:0,limit:20
			}
		});
		var dpCombox = new Ext.form.ComboBox({
			name : 'departId',
			fieldLabel : '承制单位',
			displayField : 'text',
			valueField : 'value',
			hiddenName : 'departId',
			store : dpStore,
			triggerAction : 'all',
			width:50,
			minChars : 0,
			pageSize : 20,
			allowBlank : false,
			forceSelection : true,
			anchor : '89%',
	//		value : ''
			emptyText : '请选择...',
			listeners :{
				beforequery : function(e){
					var sto = e.combo.getStore();
					e.combo.getStore().setBaseParam("departmentName",e.combo.getRawValue());
				},
				select :function(combo,record){
					Ext.getCmp('dpCode').setValue(record.data.value);
				}
			}
		});
		var items = [
		    {xtype : 'hidden',id:'assessId',name:'assessId',value:venderAssessDetail.assessId},
//		    {xtype : "textfield",fieldLabel : '承制单位',lableWidth : 150,id : '2',name : '2',allowBlank : false,anchor : '89%'},
		    dpCombox,
		    {xtype : "textfield",disabled : true,fieldLabel : '承制单位编号',lableWidth : 150,id : 'dpCode',name : 'dpCode',anchor : '89%',allowBlank : false},
			combox,
			{xtype : "textfield",disabled : true,fieldLabel : '经销商编号',lableWidth : 150,id : 'vendorCode',name : 'vendorCode',allowBlank : false,anchor : '89%'},
			{xtype : "textfield",fieldLabel : '质量综合分',lableWidth : 150,id : 'massScore',name : 'massScore',allowBlank : false,anchor : '89%'},
			{xtype : "textfield",fieldLabel : '交付综合分',lableWidth : 150,id : 'payScore',name : 'payScore',allowBlank : false,anchor : '89%'},
			{xtype : "textfield",fieldLabel : '服务综合分',lableWidth : 150,id : 'serveScore',name : 'serveScore',allowBlank : false,anchor : '89%'},
			{xtype : "textfield",fieldLabel : '综合得分',lableWidth : 150,id : 'compositeScore',name : 'compositeScore',allowBlank : false,anchor : '89%'},
			{xtype : "textfield",fieldLabel : '评定等级',lableWidth : 150,id : 'assessGrade',name : 'assessGrade',allowBlank : false,anchor : '89%'},
		]; 

		var inform = new Ext.FormPanel( {
			id : 'venderAssessDetailFromII', 
			buttonAlign : 'center',
			labelAlign : 'right', 
			autoHeight : true, 
			border : false,
			items : items,
			width : 300,
			height : 150
		});
		
		var buttons = [ {
			text : ' 确定 ',
			handler : function() {
				var formPanel = Ext.getCmp('venderAssessDetailFromII');
				if(formPanel.form.isValid()) {
					formPanel.form.doAction('submit',{
						waitMsg:'正在保存数据，请稍候...',
						waitTitle:'提示',
						url : '../JSON/vendor_VendorRemote.saveVendorAssessDetail?d='+ new Date(),
						method : 'POST',
						success : function(form, action) {
							Ext.Msg.alert('提示','保存数据成功！');	
							var grid = Ext.getCmp('DetailPanelII');
							grid.getStore().baseParams = {start:0,limit:20,assessId :venderAssessDetail.assessId};
							grid.store.reload();
							win.close();
						},
						failure : function(form, action){
							Ext.Msg.alert('提示','保存数据失败,供应商编号或供应商名称重复');
						}
					});
				}
			}
		}, {
			text : '取消',
			handler : function() {
				win.close();
			}
		} ]

		var win = new Ext.Window( {
			id : "venderGradeWinII",
			title : "考核单",
			width : 300,
			layout : 'fit',
			autoScroll : true, 
			modal : true,
			items : inform,
			autoDestory : true,
			buttons : buttons,
			closeAction :'close'
		});
		win.show();
	
	}
}