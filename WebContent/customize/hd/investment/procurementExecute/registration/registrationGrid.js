/** 
 * @author zhaodw
 * @version 1.0
 * @create 2011-11-21
 * 
 */
var registrationGrid = {
	userId : null,
	ckeck_instcode:false
};

// 数据列表
registrationGrid.gridPanel = function() {
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var store = new Ext.data.Store(
			{
				proxy : new Ext.data.HttpProxy( {
					url : '../JSON/registrationRemote.getGridData?d='+(Math.random()).toFixed(5),
					method : 'post'
				}),
				reader : new Ext.data.JsonReader( {
					root : 'results',
					id : 'registrationId',
					totalProperty : 'totalProperty'
				}, [ 'registrationId','arrivalCheckId', 'itemCode', 'itemName', 'contractCode',
					 'contractName','itemId','contractId','lotNo','invoiceNo',
					 'arrivalNum','purchaseNum','transportNo','transportNum',
					 'qualifyNo','arrivalDate','registrationCode','transportDate',
					 'createrId','createrName'/*登记人*/,'createDate'/*登记日期*/,'creatorDepartment'/*登记人部门*/,'amount','price',
					 'routeId', 'routeNo', 'routeName', 'measurement', 'hardness', 'pulling',
					  'checkStatus','ynStamped','ynSpectro','ynClean','ynSeal','ynCheck',
					  'sampling','test','sendSampling','ynSpray','remark','ynFlawDetection','demension','deliveryStatus'/*物资交货状态 */,
					  'technicCondition'/*技术条件*/,'desingnation'/*牌号*/,'materialStandard'/*规格*/,'demension'/*计量单位*/,'qualifiedNum','vendorName',
					  'note','furnaceBatch'/*炉批号*/,'materialType','check_result','materialtypename','materialtypename_parent','materialstate'])
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
					if(registrationGrid.ckeck_instcode){
						//综合采购部
						var itemId = record.get("itemId");
						if(record.get('checkStatus')=='-10'){
							return "<a href=javascript:void(0); onclick=registrationAction.updateRegistration(); ><font color=#FF00FF>"+value+"</font></a>"; 
						}else{
							return "<a href=javascript:void(0); onclick=registrationAction.updateRegistration(); ><font color=blue>"+value+"</font></a>"; 
				        }
					}else{
						return value;
					}
				}
			},			
			{
				header : '物资编码',
				dataIndex : 'itemCode',
				sortable : true
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
			} ,
			{
				header : '交货状态 ',
				dataIndex : 'deliveryStatus',
				width :100	,
				sortable : true	//,
//				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
//				store) { 
////					   if(value=="0")
////						 return "已登记";
////					   else  if(value=="1")
////						 return "已理化";
////					   else  if(value=="2")
////						 return "已检测"; 
////					   else  if(value=="3")
////						 return "已质量处理";  
//						//现有状态判断
////						if(value == '0')
////							return '已登记';
////						else if(value == '1')
////							return '已理化';
////						else if(value == '2')
////							return '检测合格';
////						else if(value == '3')
////							return '检测不合格';
////						else if(value == '4')
////							return '意见书-重检';
////						else if(value == '5')
////							return '意见书-退货';
////						else if(value == '6')
////							return '已退货';
////						else if(value == '7')
////							return '已入库';
////						else if(value == '8')
////							return '意见书-降级使用';	
//				}
			},
			{
				header : '技量单位 ',
				dataIndex : 'demension',
				width : 70,
				sortable : true
			} ,
			{
				header : '物资种类大类 ',
				dataIndex : 'materialtypename_parent',
				hidden:true,
				width : 100,
				sortable : true
			} ,{
				header : '物资种类小类',
				dataIndex : 'materialtypename',
				hidden:true,
				width : 100,
				sortable : true
			} ,
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
//			{
//				header : '到货数量 ',
//				dataIndex : 'arrivalNum',
//				width : 100	,
//				sortable : true			
//			},			
			{
				header : '供应商 ',
				dataIndex : 'vendorName',
				width : 100	,
				sortable : true			
			},
			{
				header : '到货日期 ',
				dataIndex : 'arrivalDate',
				width : 80	,
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
				sortable : true,
								renderer : function(value, cellmeta, record, rowIndex, columnIndex,
				store) { 
//					   if(value=="0")
//						 return "已登记";
//					   else  if(value=="1")
//						 return "已理化";
//					   else  if(value=="2")
//						 return "已检测"; 
//					   else  if(value=="3")
//						 return "已质量处理";  
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
/*						//现有状态判断
						if(value == '0')
							return '已登记';
						else if(value == '1')
							return '已理化';
						else if(value == '2')
							return '检测合格';
						else if(value == '3')
							return '检测不合格';
						else if(value == '4')
							return '意见书-重检';
						else if(value == '5')
							return '意见书-退货';
						else if(value == '6')
							return '已退货';
						else if(value == '7')
							return '已入库';
						else if(value == '8')
							return '意见书-降级使用';*/		
				}
			},
			{
				header : '登记时间 ',
				dataIndex : 'createDate',
				width : 120	,
				sortable : true			
			},
			{
				header : '登记单位 ',
				dataIndex : 'creatorDepartment',
				width : 100	,
				sortable : true			
			},
			{
				header : '登记人 ',
				dataIndex : 'createrName',
				width : 100	,
				sortable : true			
			},
			{
				header : '备注 ',
				dataIndex : 'note',
				width : 100	,
				sortable : true			
			}

//			{
//				header : '到货批次 ',
//				dataIndex : 'lotNo',
//				width : 100	,
//				sortable : true			
//			},
//			{
//				header : '发票号码 ',
//				dataIndex : 'invoiceNo',
//				width : 100	,
//				sortable : true			
//			},
//			{
//				header : '入场复验 ',
//				dataIndex : 'check_result',
//				width : 100	,
//				sortable : true ,
//				hidden:true,
//				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
//				store) { 
//					if(value=="是")
//					return "否";
//					return "是";
//				}
//			},
//			{
//				header : '采购数量 ',
//				dataIndex : 'purchaseNum',
//				width : 100	,
//				sortable : true			
//			},
//			{
//				header : '运单号 ',
//				dataIndex : 'transportNo',
//				width : 100	,
//				hidden:true,
//				sortable : true			
//			},
//			{
//				header : '运输数量 ',
//				dataIndex : 'transportNum',
//				width : 100	,
//				sortable : true			
//			},
//			{
//				header : '运输日期 ',
//				dataIndex : 'transportDate',
//				width : 100	,
//				sortable : true			
//			},
//			{
//				header : '合格证 ',
//				dataIndex : 'qualifyNo',
//				width : 100	,
//				sortable : true			
//			},
//			{
//				header : '路线卡 ',
//				dataIndex : 'routeNo',
//				width :100	,
//				sortable : true	,
//				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
//				store) {   
//						return "<a href=javascript:void(0); onclick=registrationAction.showLineCard(); ><font color=blue>"+value+"</font></a>"; 
//				}
//			},
//			{
//				header : '未到数量 ',
//				dataIndex : 'arrivalDate',
//				width : 100	,
//				sortable : true,
//				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
//				store) { 
//					    var purchaseNum = record.get("purchaseNum");
//					    var arrivalNum = record.get("arrivalNum");
//					    if(arrivalNum=="" ||　purchaseNum =="" || parseFloat(arrivalNum) > parseFloat(purchaseNum) )
//							return ""; 
//						else
//						    return  parseFloat(purchaseNum) - parseFloat(arrivalNum);
//				}
//			}
			]);
	var tbar = [ '-', {
		text : '登记',
		iconCls : 'add1',
		disabled:!registrationGrid.ckeck_instcode,
		handler : function() {
			registrationAction.flag = false;
			registrationAction.getRegistrationWindow(null,null,'1').show();
		}
	},'-', {
		text : '查询',
		iconCls : 'search1',
		handler : function() {
			registrationAction.seach('registrationGridPanelId');
		}
	}
	, {
		text : '新建',
		iconCls : 'add1',
		hidden:true,
		disabled:!registrationGrid.ckeck_instcode,
		handler : function() {
			registrationAction.flag = false;
			createRegistrationForm.getForm(null,null).show();
		}
	},'-',{
		text : '删除',
		iconCls : 'del1',
		disabled : !registrationGrid.ckeck_instcode,
		handler : function(){
			registrationAction.del();
		}
	}];
	var grid = common.gridPanel('registrationGridPanelId', cm, store, tbar, true, sm,
			''); 
	return grid;
}

registrationGrid.tabPanel = function() {
	var tab = new Ext.Panel( {
		title : '入厂登记',
		id : 'registrationGridTab',
		layout : 'fit',
		items : [ registrationGrid.gridPanel() ],
		listeners : {
			'activate' : function() { 
				var grid = Ext.getCmp('registrationGridPanelId'); 
				grid.store.baseParams = {start : 0 ,limit :20};
				grid.store.load();
			}
		}
	});

	return tab;
};
