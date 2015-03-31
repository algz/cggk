/** 
 * @author zhaodw
 * @version 1.0
 * @create 2011-11-21
 * 
 */
var admissionTestGrid = {
	userId : null
};
admissionTestGrid.combo = function(){ 
	var combox = new Ext.form.ComboBox({ 
		displayField : 'text',
		valueField : 'value',
		store : new Ext.data.SimpleStore({
			fields : ['value','text'],
			data : [ [ '否', '否' ],[ '是', '是' ]]
		}),
		triggerAction : 'all',
		mode : 'local',
		editable : false,
		width:50,
		forceSelection : true,
		anchor : '95%'
	})
	return combox;
}; 
// 数据列表
admissionTestGrid.gridPanel = function() {
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var store = new Ext.data.Store(
			{
				proxy : new Ext.data.HttpProxy( {
					url : '../JSON/registrationRemote.getGridData',
					method : 'post'
				}),
				reader : new Ext.data.JsonReader( {
					root : 'results',
					id : 'registrationId',
					totalProperty : 'totalProperty'
				}, [ 'registrationId', 'itemCode', 'itemName', 'contractCode',
					 'contractName','itemId','contractId','lotNo','invoiceNo',
					 'arrivalNum','purchaseNum','transportNo','transportNum',
					 'qualifyNo','arrivalDate','registrationCode','transportDate',
					 'createrId','createDate','amount','routeId', 'routeNo', 'routeName','applyNo' /*入库编号*/,
					 'measurement', 'hardness', 'pulling','arrivalCheckId','qualityStatus'/*质量状态*/,
					 'checkStatus','ynStamped','ynSpectro','ynClean','ynSeal','ynCheck','vendorName'/*供应商*/,
					 'sampling','test','sendSampling','ynSpray','remark','ynFlawDetection','demension','createrName'/*创建人*/,
					 'technicCondition'/*技术条件*/,'desingnation'/*牌号*/,'materialStandard'/*规格*/,'furnaceBatch'/*炉批号*/,
					 'vendorCode','vendName','physicalCommissioned','testReport','submissions','failureHandling',
					 'sprayWord','ynSpark','oneCheck','pleaseCheck','outCheck','check_result','materialType',
					 'deliveryStatus'/*物资交货状态*/
					 ])
			});
	var cm = new Ext.grid.ColumnModel( [
			sm,
			rm,
			{
				header : '登记编号 ',
				dataIndex : 'registrationCode',
				width : 100,
				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
				store) {  
					    var arrivalCheckId = record.get("arrivalCheckId");
					    var registrationId=record.get("registrationCode");
					    var checkStatus=record.get('checkStatus');
					    var isEdit="1";
					    if(admissionTestGrid.ckeck_instcode&&checkStatus!='6' && checkStatus!='7'){
					    	isEdit="1"
					    }
						else{
							isEdit="0"
						}
						return "<a href=javascript:void(0); onclick=ArrivalIn.getForm('"+
						        arrivalCheckId+"','"+registrationId+"','"+isEdit+"'); ><font color=blue>"+value+"</font></a>"; 
				}
			},			
			{
				header : '物资编号',
				dataIndex : 'itemCode',
				sortable : true,
				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
				store) {  
					var sendSampling = record.get("sendSampling");
					 var checkStatus =  record.get("checkStatus");
					if(sendSampling=="是" && checkStatus!='6' && checkStatus!='7')
						return "<a href=javascript:void(0); onclick=admissionTestAction.add('9'); ><font color=blue>"+value+"</font></a>"; 
					else
						return value;
				}
			},
			{
				header : '物资名称 ',
				dataIndex : 'itemName',
				width : 100,
				sortable : true
			} ,
			{
				header : '牌号/型号 ',
				dataIndex : 'desingnation',
				width : 100,
				sortable : true
			} ,
			{
				header : '规格 ',
				dataIndex : 'materialStandard',
				width : 100,
				sortable : true
			} ,
			{
				header : '技术条件 ',
				dataIndex : 'technicCondition',
				width : 100,
				sortable : true
			},
			{
				header : '交货状态 ',
				dataIndex : 'deliveryStatus',
				width :100	,
				sortable : true
			} ,
			{
				header : '计量单位 ',
				dataIndex : 'demension',
				width : 70,
				sortable : true
			},
			{
				header : '到货时间 ',
				dataIndex : 'arrivalDate',
				width : 100	,
				sortable : true			
			},
			{
				header : '炉批号 ',
				dataIndex : 'furnaceBatch',
				width : 100	,
				sortable : true			
			},
			{
				header : '当前状态 ',
				dataIndex : 'checkStatus',
				width : 100	,
				sortable : true	,
				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
				store) { 
					if(value=='0'){return '登记';}
					else if(value=='1'){return '理化';}
					else if(value=='2'){return '检测报告合格';}
					else if(value=='3'){return '检测报告不合格';}
					else if(value=='4'){return '意见书重检';}
					else if(value=='5'){return '意见书退货';}
					else if(value=='6'){return '已退货';}
					else if(value=='7'){return '已入库';}
					else if(value=='8'){return '意见书-降级使用';}
					else if(value=='9'){return '';}
					else if(value=='10'){return '确认登记:已确认';}
					else if(value=='-10'){return '确认登记:退回';}
					else if(value=='11'){return '开箱检查:合格';}
					else if(value=='-11'){return '开箱检查:不合格';}
					else if(value=='12'){return '请检:完成';}
					else if(value=='-12'){return '请检:未完成';}
					else if(value=='13'){return '表面初检:合格';}
					else if(value=='-13'){return '表面初检:不合格';}
					else if(value=='14'){return '委托试验:完成';}
					else if(value=='-14'){return '委托试验:未完成';}
					else if(value=='+14'){return '委托试验:无需';}
					else if(value=='15'){return '取样:完成';}
					else if(value=='-15'){return '取样:未完成';}
					else if(value=='+15'){return '取样:无需';}
					else if(value=='16'){return '送样:完成';}
					else if(value=='-16'){return '送样:未完成';}
					else if(value=='+16'){return '送样:无需';}
					else if(value=='17'){return '试验报告:完成';}
					else if(value=='-17'){return '试验报告:未完成';}
					else if(value=='+17'){return '试验报告:无需';}
					else if(value=='18'){return '打钢印:完成';}
					else if(value=='-18'){return '打钢印:未完成';}
					else if(value=='+18'){return '打钢印:无需';}
					else if(value=='19'){return '分光/磨火花:完成';}
					else if(value=='-19'){return '分光/磨火花:未完成';}
					else if(value=='+19'){return '分光/磨火花:无需';}
					else if(value=='20'){return '表面检查:完成';}
					else if(value=='-20'){return '表面检查:未完成';}
					else if(value=='+20'){return '表面检查:无需';}
					else if(value=='21'){return '喷字:完成';}
					else if(value=='-21'){return '喷字:未完成';}
					else if(value=='+21'){return '喷字:无需';}
					else if(value=='22'){return '油封:完成';}
					else if(value=='-22'){return '油封:未完成';}
					else if(value=='+22'){return '油封:无需';}
					else if(value=='24'){return '不合格处理:退货';}
					else if(value=='-24'){return '不合格处理:返修';}
					else{
						return value;//'已登记';
					}
						    
					 
				}			
			},
			{
				header : '备注 ',
				dataIndex : 'remark',
				width : 100	,
				sortable : true,
				editor: new Ext.form.TextField({})
			} ,
				{
				header : '入库编号 ',
				dataIndex : 'applyNo',
				width : 100	,
				sortable : true,
				editor: new Ext.form.TextField({})
			} ,
			//********************以下数据不显示*********************
			{
				header : '合同编号',
				dataIndex : 'contractCode',
				hidden:true,
				sortable : true 
			},
			{
				header : '合同名称 ',
				dataIndex : 'contractName',
				hidden:true,
				width : 100	,
				sortable : true			
			},
			{
				header : '到货批次 ',
				dataIndex : 'lotNo',
				hidden:true,
				width : 100	,
				sortable : true			
			} ,
			{
				header : '到货数量 ',
				dataIndex : 'arrivalNum',
				hidden:true,
				width : 100	,
				sortable : true			
			}
//			{
//				header : '开箱检验 ',
//				dataIndex : 'outCheck',
//				hidden:true,
//				width :100	,
//				sortable : true	 
//			},
//			{
//				header : '请检 ',
//				dataIndex : 'pleaseCheck',
//				hidden:true,
//				width :100	,
//				sortable : true	 
//			},
//			{
//				header : '表面初检',
//				dataIndex : 'oneCheck',
//				width :100	,
//				sortable : true	 
//			},
//			{
//				header : '取样 ',
//				dataIndex : 'sampling',
//				width : 100	,
//				sortable : true 
//			},
//			 
//			{
//				header : '委托试验 ',
//				dataIndex : 'test',
//				width : 100	,
//				sortable : true 
//			},
//			{
//				header : '送样 ',
//				dataIndex : 'sendSampling',
//				width : 100	,
//				sortable : true 
//			}, 
//			{
//				header : '试验报告 ',
//				dataIndex : 'testReport',
//				width : 100	,
//				sortable : true 
//			},
//			{
//				header : '打钢印 ',
//				dataIndex : 'ynStamped',
//				width : 100	,
//				sortable : true 
//			},
//			{
//				header : '分光 ',
//				dataIndex : 'ynSpectro',
//				width : 100	,
//				sortable : true 
//			},
//			{
//				header : '磨火花 ',
//				dataIndex : 'ynSpark',
//				width : 100	,
//				sortable : true 
//			},
//			{
//				header : '表面检查 ',
//				dataIndex : 'ynCheck',
//				width : 100	,
//				sortable : true 
//			},
//			{
//				header : '喷字 ',
//				dataIndex : 'sprayWord',
//				width : 100	,
//				sortable : true 
//			},
//			{
//				header : '油封 ',
//				dataIndex : 'ynSeal',
//				width : 100	,
//				sortable : true 
//			},
//			{
//				header : '不合格处理 ',
//				dataIndex : 'failureHandling',
//				width : 100	,
//				sortable : true 
//			}
			]);
	var tbar = [ 
	'-', {
		text : '紧急放行',
		id : 'jinjifangxing',
//		iconCls : 'Send',
		disabled:!admissionTestGrid.ckeck_instcode,
		handler : function() {
			admissionTestAction.add("9"); 
		}
	},
	'-', {
		text : '退货',
		id : 'tuiHuo',
//		iconCls : 'Send',
		disabled:!admissionTestGrid.ckeck_instcode,
		handler : function() {
			admissionTestAction.add("3"); 
		}
	},'-', {
		text : '申请入库',
		id : 'shenQingRuKu',
//		iconCls : 'Send',
		disabled:!admissionTestGrid.ckeck_instcode,
		handler : function() {
			admissionTestAction.applyIn();
		}
	},
//	'-', {
//		text : '物资报表',
//		id : 'wuZhiBaoBiao',
////		iconCls : 'Send',
//		handler : function() {
//			admissionTestAction.materialsReport(); 
//		}
//	},
//	'-', {
//		text : '保存',
//		iconCls : 'save1',
//		handler : function() {
//			admissionTestAction.save();
//		}
//	},
	'-', {
		text : '查询',
		iconCls : 'search1',
		handler : function() {
			registrationAction.seach('admissionTestGridPanelId');
		}
	} ]; 
	var grid = new Ext.grid.EditorGridPanel({
				id : 'admissionTestGridPanelId',
				layout : 'fit',
				cm : cm,
				sm:sm,
				store : store,
				autoScroll : true,  
				autoWidth  : true,
				columnLines : true,
				clicksToEdit:1, 
				loadMask : {
					msg : '数据加载中...'
				},
				stripeRows : true,
				viewConfig : {
					enableRowBody : true
				},
				tbar:tbar,
				bbar : new Ext.PagingToolbar({
							pageSize : 20,
							store : store,
							displayInfo : true,
							displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
							emptyMsg : '没有记录'
							
						})
	}); 
	grid.on('beforeedit', admissionTestGrid.beforeedit, this );  
	var tuiHuo = Ext.getCmp('tuiHuo');
	var shenQingRuKu = Ext.getCmp('shenQingRuKu');
	var jinjifangxing = Ext.getCmp('jinjifangxing');
	//处理checkbox的勾选事件
	grid.getSelectionModel().on('rowselect',function(sm,rowldx,r){
		if(!admissionTestGrid.ckeck_instcode){
			return false;
		}
		var checkStatus = grid.store.getAt(rowldx).get('checkStatus');
		var checkResult = grid.store.getAt(rowldx).get('check_result');
		var sendSampling = grid.store.getAt(rowldx).get('sendSampling');
		var record = grid.getSelectionModel().getSelections();
		//获取选中的行数
		if(record.length==1){
		 
			/*if(checkStatus == '6'){ 
				tuiHuo.disable();
				shenQingRuKu.disable();
				jinjifangxing.disable();
			}
			//已入库
			else if(checkStatus == '7'){ 
				tuiHuo.disable();
				shenQingRuKu.disable();
				jinjifangxing.disable();
			}else{
				tuiHuo.enable();
				if(sendSampling=="是")
					jinjifangxing.enable();
				else 
					jinjifangxing.disable();
				shenQingRuKu.enable();
			}*/
			//紧急放行必须在取样之后
			if(checkStatus>=15){
				jinjifangxing.enable();
			}else{
				jinjifangxing.disable();
			}
			//申请入库必须在所有检验完成后,即油封后
			if(checkStatus>=22){
				shenQingRuKu.enable();
			}else{
				shenQingRuKu.disable();
			}
			//退货在任一检验过程为不合格时显示
			if(checkStatus<0&&checkStatus!=-10){
				tuiHuo.enable();
			}else{
				tuiHuo.disable();
			}
		}else if(record.length>1){ 
		}
	})
//	//处理checkbox的取消勾选事件
//	grid.getSelectionModel().on('rowdeselect',function(sm,rowldx,r){
//		if(!admissionTestGrid.ckeck_instcode){
//			return false;
//		}
//		var record1 = grid.getSelectionModel().getSelections();
//		if(record1.length<1){
//		}else if(record1.length=1){
//			//已退货
//			if(record1[0].data.checkStatus == '6'){
//				tuiHuo.disable();
//				shenQingRuKu.disable();
//				jinjifangxing.disable();
//			}
//			//已入库
//			else if(record1[0].data.checkStatus == '7'){
//				tuiHuo.disable();
//				shenQingRuKu.disable();
//				jinjifangxing.disable();
//			}else{
//				tuiHuo.enable();
//				shenQingRuKu.enable();
//				jinjifangxing.enable();
//			}
//		}else if(record1.length>1){
//		}
//	})
	
	return grid;
}

admissionTestGrid.tabPanel = function() {
	var tab = new Ext.Panel( {
		title : '入厂检验',
		id : 'admissionTestGridTab',
		layout : 'fit',
		items : [ admissionTestGrid.gridPanel() ],
		listeners : {
			'activate' : function() {
			 
				var grid = Ext.getCmp('admissionTestGridPanelId'); 
				grid.store.baseParams = {start : 0 ,limit :20};
				grid.store.load();
			}
		}
	});

	return tab;
};
