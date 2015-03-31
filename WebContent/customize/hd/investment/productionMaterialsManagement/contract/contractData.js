//多级表头样式

MyGridView = Ext.extend(Ext.grid.GridView, {

			renderHeaders : function() {

				var cm = this.cm, ts = this.templates;

				var ct = ts.hcell, ct2 = ts.mhcell,ctm=ts.mhcellm;

				var cb = [], sb = [], p = {}, mcb = [],mcbm=[];

				for (var i = 0, len = cm.getColumnCount(); i < len; i++) {

					p.id = cm.getColumnId(i);

					p.value = cm.getColumnHeader(i) || "";

					p.style = this.getColumnStyle(i, true);

					if (cm.config[i].align == 'right') {

						p.istyle = 'padding-right:16px';

					}

					cb[cb.length] = ct.apply(p);
                    
					if (cm.config[i].mtext)

						mcb[mcb.length] = ct2.apply({

									value : cm.config[i].mtext,								
								

									mcols : cm.config[i].mcol,						
								

									mwidth : cm.config[i].mwidth

								});
				   if (cm.config[i].mtext)

						mcbm[mcbm.length] = ctm.apply({
								
									
									valuem : cm.config[i].mtextm,							
									
									mcolsm : cm.config[i].mcolm,
									
									mwidthm : cm.config[i].mwidthm


								});				

				}

				var s = ts.header.apply({

							cells : cb.join(""),//显示字段

							tstyle : 'width:' + this.getTotalWidth() + ';',

							mergecells : mcb.join("")//,
						 	
//						    mergecellsm : mcbm.join("")

						});
			   var ss = ts.headerm.apply({

//							cells : cb.join(""),//显示字段

							tstyle : 'width:' + this.getTotalWidth() + ';',

//							mergecells : mcb.join(""),
						 	
						    mergecellsm : mcbm.join("")

						});		

				return ss+s;

			}

		});

viewConfig = {

	templates : {
		headerm : new Ext.Template(

				' <table border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',

				' <thead> <tr class="x-grid3-hd-row">{mergecellsm} </tr>'

				+ '  </thead>',

				" </table>"),


		header : new Ext.Template(

				' <table border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',

				' <thead> <tr class="x-grid3-hd-row">{mergecells} </tr>'

				+ ' <tr class="x-grid3-hd-row">{cells} </tr> </thead>',

				" </table>"),

		mhcellm : new Ext.Template(
		        	' <td class="x-grid3-header" colspan="{mcolsm}" style="width:{mwidthm}px;"> <div align="center">{valuem}</div>',

				" </td>"),
				
		mhcell : new Ext.Template(
		        	' <td class="x-grid3-header" colspan="{mcols}" style="width:{mwidth}px;"> <div align="center">{value}</div>',

				" </td>")
		

	}

};

var contractData = {
		isDisabled : true
}; 
contractData.rightPanel = function() {
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var store = new Ext.data.Store(
			{
				proxy : new Ext.data.HttpProxy(
						{
							url : '../JSON/contract_ProcurementContractRemote.getContracts?d='
									+ new Date(),
							method : 'post'
						}),
				reader : new Ext.data.JsonReader( {
					root : 'results',
					id : 'procurementContractId',
					totalProperty : 'totalProperty'
				}, [  'procurementContractId','contractCode','createDate','applicationStatus','materialType','attachments',
				      'editors','editorDept','vendName','arrivalDate','remark','contractAmount','purchaseId','auditCode','contractName'])
			});
	var cm = new Ext.grid.ColumnModel( [ sm, rm, {
		header : '审签单编号',
		dataIndex : 'auditCode',
		renderer : function(value, cellmeta, record, rowIndex) { 
			var id = record.get("procurementContractId");
			var type = value.substring(1,2);
			value = "&nbsp;<font color=blue>"+value+"</font>";
			return "<a href='javascript:void(0);' onclick=contractAction.showContractDetail('"+id+"','"+type+"')  >"+value+"</a>";
		}
	},{
		header : '合同名称',
		dataIndex : 'contractName',
		sortable : true
	},{
		header : '生成日期',
		dataIndex : 'createDate',
		sortable : true
	},{
		header : '申请状态',
		dataIndex : 'applicationStatus',
		sortable : true
	},{
		header : '审批进度',
		dataIndex : '',
		renderer : function(value, cellmeta, record, rowIndex){
			var id = record.get("procurementContractId");
			var applicationStatus = record.get("applicationStatus");
			if(applicationStatus == '审批中' || applicationStatus == '已审批'|| applicationStatus == '已生成台账'){
				return "<a href='javascript:void(0);' onclick=contractAction.showFlowInstance('"
					+id+"')><font color=blue>查看</font></a>";
			}			
		},
		sortable : true
	},{
		header : '审批记录',
		dataIndex : '',
		renderer : function(value, cellmeta, record, rowIndex){
			var id = record.get("procurementContractId"); 
			var applicationStatus = record.get("applicationStatus");
			if(applicationStatus != '编制中'){
				return "<a href='javascript:void(0);' onclick=approvalInfoList.showWin('"
					+id+"')><font color=blue>查看</font></a>";
			}			
		},
		sortable : true
	},{
		header : '物资类别',
		dataIndex : 'materialType',
		hidden:true,
		sortable : true
	},{
		header : '编辑人',
		dataIndex : 'editors',
		sortable : true
	},{
		header : '部门',
		dataIndex : 'editorDept',
		sortable : true
	},{
		header : '供应厂商',
		dataIndex : 'vendName',
		sortable : true
/*	},{
		header : '到货日期',
		dataIndex : 'arrivalDate',
		sortable : true
	},{
		header : '备注',
		dataIndex : 'remark',
		sortable : true
*/	} ]);

	var tbar = [ '-', {
		text : '导入',
		iconCls : 'Send',
		disabled :privilegeValidate.importHDisable,
		menu : {
                items: [{
                    text: '合同导入',
		handler : function() {
			var win=new contractData.fileUpload({url:'../ContractImportUploadServlet?contractType=1'});
			win.show();
		}
                }, {
                    text: '合同详情导入',
		handler : function() {
			var win=new contractData.fileUpload({url:'../ContractImportUploadServlet?contractType=2'});
			win.show();
		}
                }]}
	}, '-', {
		text : '送审',
		iconCls : 'Send',
		disabled :privilegeValidate.sendHDisable,
		handler : function() {
			contractAction.submitContract();
		}
	}, 
//	'-','合同模板:',{
//		xtype : "combo",
//		id : 'modelType',
//		triggerAction : 'all',
//		editable : false, 
//		anchor : '95%', 
//		store:[['','请选择合同模板'],['设备买卖合同(招标、比价项目使用)','设备买卖合同(招标、比价项目使用)'],['设备买卖合同','设备买卖合同'],
//			   ['办公用品采购合同','办公用品采购合同'],['材料买卖合同','材料买卖合同'],
//			   ['茶叶买卖合同','茶叶买卖合同'],['成件修理合同(成件处)定稿','成件修理合同(成件处)定稿'] ,
//			   ['承揽合同-工具','承揽合同-工具'],['订单采购-电脑范例合同范本定稿','订单采购-电脑范例合同范本定稿'],
//			   ['防暑药品买卖合同定稿','防暑药品买卖合同定稿'],['非金属处-材料采购合同范本定稿','非金属处-材料采购合同范本定稿'],
//			   ['工具买卖合同范本定稿','工具买卖合同范本定稿'],['工装标准件采购合同','工装标准件采购合同'],
//			   ['机电产品采购合同范本定稿','机电产品采购合同范本定稿'],['金属处-钢材采购合同范本定稿','金属处-钢材采购合同范本定稿'],
//			   ['金属处-军品材料采购合同定稿','金属处-军品材料采购合同定稿'],['木材买卖合同范本定稿','木材买卖合同范本定稿'],
//			   ['配件维修合同版本1试用','配件维修合同版本1试用'],['塑料件订货合同(成件处)定稿','塑料件订货合同(成件处)定稿'],
//			   ['维修合同范本2试用','维修合同范本2试用'],['武器装备配套产品订货合同(成件处导弹)定稿','武器装备配套产品订货合同(成件处导弹)定稿'],
//			   ['武器装备配套产品订货合同(成件处飞机)定稿','武器装备配套产品订货合同(成件处飞机)定稿'],
//			   ['原煤采购合同范本定稿','原煤采购合同范本定稿'],['劳保用品采购合同范本评审稿','劳保用品采购合同范本评审稿'],
//			   ['设备买卖合同(国家专项技改项目范本)','设备买卖合同(国家专项技改项目范本)']
//			   ],
//		value : ''
////		,
////		listeners:{ 
////	         'select': function(){
////	         	 contractAction.findByCreateType(Ext.getCmp("selectType").getValue());
////	         }
////    	}
//
//
//	}, {
//		text : '生成合同',
//		iconCls : 'CreateLog',
//		handler : function() { 
//			contractAction.createContract(); 
//		}
//	}, 
	'-', {
		text : '生成台账',
		iconCls : 'CreateLog',
		disabled :privilegeValidate.newTDisable,
		handler : function() {
			contractAction.addContractBook();
		}
	}, '-' ,'采购方式:',{
		xtype : "combo",
		id : 'selectType',
		triggerAction : 'all',
		editable : false, 
		anchor : '95%', 
		store:[['','全部'],['1','直接采购'],['2','比价'],['3','招标'],['4','协议采购'],['5','其它采购']],
		value : ''
//		,
//		listeners:{ 
//	         'select': function(){
//	         	 contractAction.findByCreateType(Ext.getCmp("selectType").getValue());
//	         }
//    	}


	}, //'-', '物资种类：', 
	{
		xtype : "textfield",
		id : "materialType",
		hidden:true
	}, {
		text : '搜索',
		iconCls : 'search1',
		handler : function() {
			contractAction.search();
		}
	}];

	var grid = common.gridPanel('contractCheckSignPanelId', cm, store, tbar,
			true, sm, '合同审签列表');
	store.baseParams = {start : 0, limit: 20};
	store.load();
	return grid;

}

contractData.tabCard01 = function() {

	var tab = new Ext.Panel( {		
		id : 'contractDataTab1',
		layout : 'fit',
		items : new Ext.Panel( {
			id : 'rightGrid1',
			layout : 'fit',// 自适应整个高度
			border : false,
			margin : '0 0 5 0',
			items : [ contractData.rightPanel() ]
		}),
		listeners : {
			render : function(){
				Ext.getCmp('contractCheckSignPanelId').getStore().load();
			}
		}
	});

	return tab;
};

// 根据需求类型获取表格ColumnModel
contractData.getProcurementDetailGridCm = function(procurementType){
	var typeName = new Array('比价','招标','直接采购','协议采购','其它采购');
	var cm;
	if(procurementType == 'N'){
		cm = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer({
						mtextm : " &nbsp;",
						mcolm : 1,
						mwidthm : 40,
						mtext : " ",
						mcol : 1,
						mwidth : 40,
						width : 40,
						header : "序号",
						resizable : false
					}), {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "器材名称",
				width : 80,
				dataIndex : "materialItemName",
				resizable : false
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "牌号/型号",
				width : 80,
				dataIndex : "desingnation",
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "规格",
				width : 80,
				dataIndex : "materialStandard",
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "技术条件",
				width : 80,
				dataIndex : "technicCondition",
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "计划单价",
				width : 80,
				dataIndex : "price",
				sortable : true,
				editor : new Ext.form.NumberField({
							allowBlank : true
						})
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "计量单位",
				width : 80,
				dataIndex : "demension",
				resizable : false,
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "上年消耗",
				width : 80,
				dataIndex : "last_year_Consume",
				resizable : false,
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "机型",
				width : 80,
				dataIndex : "productCode",
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : "&nbsp",
				mcol : 1,
				mwidth : 80,
				header : "供应商",
				width : 80,
				dataIndex : "vendorName", 
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 6,
				mwidthm : 480,
				mtext : "资源情况",
				mcol : 6,
				mwidth : 480,
				header : "小计",
				width : 80,
				resizable : false,
				dataIndex : "subtotal",
				sortable : true
			}, {
				header : "库存",
				width : 80,
				dataIndex : "storeNumber",
				resizable : false,

				sortable : true
			}, {
				header : "待检",
				width : 80,
				resizable : false,
				dataIndex : "noCheck",
				sortable : true
			}, {
				header : "合同",
				width : 80,
				resizable : false,
				dataIndex : "contract",
				sortable : true
			}, {
				header : "欠交合同",
				width : 80,
				dataIndex : "onNumber",
				resizable : false,
				sortable : true
			}, {
				header : "不合用",
				width : 80,
				resizable : false,
				dataIndex : "operable",
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 12,
				mwidthm : 600,
				mtextm : " &nbsp;",
				mcolm : 12,
				mwidthm : 600,
				mtext : "交付时间",
				mcol : 12,
				mwidth : 600,
				header : "1月",
				width : 50,
				resizable : false,
				dataIndex : "jan",
				editor : new Ext.form.NumberField({
							decimalPrecision : 4,
							allowNegative : false
						}),
				renderer : function(value, cellmeta, record, rowIndex) {
					if (typeof(value) == 'undefined') {
						return;
					}
					value = "&nbsp;<font color='red'>" + value + "</font>";
					return value;
				},
				sortable : true
			}, {
				header : "2月",
				width : 50,
				dataIndex : "feb",
				resizable : false,
				editor : new Ext.form.NumberField({
							decimalPrecision : 4,
							allowNegative : false
						}),
				renderer : function(value, cellmeta, record, rowIndex) {
					if (typeof(value) == 'undefined') {
						return;
					}
					value = "&nbsp;<font color='red'>" + value + "</font>";
					return value;
				},
				sortable : true
			}, {
				header : "3月",
				width : 50,
				dataIndex : "mar",
				resizable : false,
				sortable : true
			}, {
				header : "4月",
				width : 50,
				dataIndex : "apr",
				resizable : false,
				editor : new Ext.form.NumberField({
							decimalPrecision : 4,
							allowNegative : false
						}),
				renderer : function(value, cellmeta, record, rowIndex) {
					if (typeof(value) == 'undefined') {
						return;
					}
					value = "&nbsp;<font color='red'>" + value + "</font>";
					return value;
				},
				sortable : true
			}, {
				header : "5月",
				width : 50,
				dataIndex : "may",
				resizable : false,
				editor : new Ext.form.NumberField({
							decimalPrecision : 4,
							allowNegative : false
						}),
				renderer : function(value, cellmeta, record, rowIndex) {
					if (typeof(value) == 'undefined') {
						return;
					}
					value = "&nbsp;<font color='red'>" + value + "</font>";
					return value;
				},
				sortable : true
			}, {
				header : "6月",
				width : 50,
				dataIndex : "june",
				resizable : false,
				sortable : true
			}, {
				header : "7月",
				width : 50,
				dataIndex : "july",
				resizable : false,
				editor : new Ext.form.NumberField({
							decimalPrecision : 4,
							allowNegative : false
						}),
				renderer : function(value, cellmeta, record, rowIndex) {
					if (typeof(value) == 'undefined') {
						return;
					}
					value = "&nbsp;<font color='red'>" + value + "</font>";
					return value;
				},
				sortable : true
			}, {
				header : "8月",
				width : 50,
				dataIndex : "aug",
				resizable : false,
				editor : new Ext.form.NumberField({
							decimalPrecision : 4,
							allowNegative : false
						}),
				renderer : function(value, cellmeta, record, rowIndex) {
					if (typeof(value) == 'undefined') {
						return;
					}
					value = "&nbsp;<font color='red'>" + value + "</font>";
					return value;
				},
				sortable : true
			}, {
				header : "9月",
				width : 50,
				dataIndex : "sept",
				sortable : true
			}, {
				header : "10月",
				width : 50,
				dataIndex : "oct",
				resizable : false,
				editor : new Ext.form.NumberField({
							decimalPrecision : 4,
							allowNegative : false
						}),
				renderer : function(value, cellmeta, record, rowIndex) {
					if (typeof(value) == 'undefined') {
						return;
					}
					value = "&nbsp;<font color='red'>" + value + "</font>";
					return value;
				},
				sortable : true
			}, {
				header : "11月",
				width : 50,
				dataIndex : "nov",
				resizable : false,
				editor : new Ext.form.NumberField({
							decimalPrecision : 4,
							allowNegative : false
						}),
				renderer : function(value, cellmeta, record, rowIndex) {
					if (typeof(value) == 'undefined') {
						return;
					}
					value = "&nbsp;<font color='red'>" + value + "</font>";
					return value;
				},
				sortable : true
			}, {
				header : "12月",
				width : 50,
				dataIndex : "dect",
				resizable : false,
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 2,
				mwidthm : 200,
				mtext : "预计消耗",
				mcol : 2,
				mwidth : 200,
				header : '<font color=red>*</font>下半年消耗',
				dataIndex : 'half_year_consume',
				align : "center",
				width : 100,
				sortable : true
			}, {
				header : '<font color=red>*</font>年末库存',
				dataIndex : 'year_inventory',
				align : "center",
				width : 100,
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "下半年缺口",
				width : 80,
				dataIndex : "gap_number",
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "需求量",
				width : 80,
				dataIndex : 'materialCount',//"needNumber",
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "储备量",
				width : 80,
				dataIndex : "reserve",
				sortable : true,
				editor : new Ext.form.NumberField({
							allowBlank : true
						})
			}, {
				mtextm : " &nbsp;",
				mcolm : 2,
				mwidthm : 200,
				mtext : "申请",
				mcol : 2,
				mwidth : 200,
				header : '<font color=red>*</font>数量',
				dataIndex : 'number_applications',
				align : "center",
				width : 100,
				sortable : true
			}, {
				header : '<font color=red>*</font>金额',
				dataIndex : 'amount_applications',
				align : "center",
				width : 100,
				sortable : true,
				editor : new Ext.form.NumberField({
							allowBlank : true
						})
			}, {
				mtextm : " 多余 ",
				mcolm : 4,
				mwidthm : 400,
				mtext : "小计",
				mcol : 2,
				mwidth : 200,
				header : '<font color=red>*</font>数量',
				dataIndex : 'subtotal_number',
				align : "center",
				width : 100,
				sortable : true
				// ,
			// editor : new Ext.form.NumberField({
			// allowBlank : true
			// })
		}	, {
				header : '<font color=red>*</font>金额',
				dataIndex : 'subtotal_amount',
				align : "center",
				width : 100,
				sortable : true,
				editor : new Ext.form.NumberField({
							allowBlank : true
						})
			}, {
				mtext : "其中",
				mcol : 2,
				mwidth : 200,
				header : '<font color=red>*</font>超储',
				dataIndex : 'super_storage',
				align : "center",
				width : 100,
				sortable : true,
				editor : new Ext.form.NumberField({
							allowBlank : true
						})
			}, {
				header : '<font color=red>*</font>外调',
				dataIndex : 'redeployment',
				align : "center",
				width : 100,
				sortable : true,
				editor : new Ext.form.NumberField({
							allowBlank : true
						})
			}, {
				mtextm : "  ",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "实际采购数量",
				width : 80,
				align : "left",
				dataIndex : "actualNumber",
				resizable : false,
				sortable : true 
			}, {
				mtextm : "  ",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "物资类别",
				width : 80,
				dataIndex : "materialTypeName",
				sortable : true
			}, {
				mtextm : "  ",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "采购方式",
				width : 80,
				align : "left",
				dataIndex : "purchaseTypeName",
				resizable : false, 
				sortable : true
			}, {
				mtextm : "  ",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "需求编号",
				width : 80,
				align : "left",
				dataIndex : "requestCode",
				sortable : true
			}, {
				mtextm : "  ",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "备注",
				width : 80,
				align : "left",
				dataIndex : "note",
				sortable : true
			}, {
				mtextm : "  ",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "变更前数据",
				width : 80,
				align : "left",
				dataIndex : 'oldquantity',
				sortable : true
			} ,{
				mtextm : "  ",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "变更人",
				width : 80,
				align : "left",
				dataIndex : 'changer',
				sortable : true
			}, {
				mtextm : "  ",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "变更时间",
				width : 80,
				align : "left",
				dataIndex : 'changtime',
				sortable : true
			} ,{
				mtextm : "  ",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : '变更原因',
				width : 80,
				align : "left",
				dataIndex : "changreson",
				sortable : true
			}]);
	} else {
		var sm = new Ext.grid.CheckboxSelectionModel({
//			mtextm : " &nbsp;",
			mcolm : 1,
			mwidthm : 20,
			mtext : " ",
			mcol : 1,
			mwidth : 20,
			width : 20
		});
		cm = new Ext.grid.ColumnModel([sm,
       	    	new Ext.grid.RowNumberer( {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 30,
				mtext : " ",
				mcol : 1,
				mwidth : 30,
				width : 30,
				header : "序号"
			}),
			{
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "器材名称",
				width : 80,
				dataIndex : "materialItemName",
				sortable : true
			},
			{
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "牌号/型号",
				width : 80,
				dataIndex : "desingnation",
				sortable : true
			},
			{
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "规格",
				width : 80,
				dataIndex : "materialStandard",
				sortable : true
			},
			{
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "技术条件",
				width : 80,
				dataIndex : "technicCondition",
				sortable : true
			},
			{
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "计划单价",
				width : 80,
				dataIndex : "price",
				sortable : true
			},
			{
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "计量单位",
				width : 80,
				dataIndex : "demension",
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : '上年消耗',
				dataIndex : 'last_year_Consume', 
				width : 80,
				sortable : true 
		   },
			{
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : "&nbsp",
				mcol : 1,
				mwidth : 80,
				header : "供应商",
				width : 80,
				dataIndex : "vendorName" ,
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 6,
				mwidthm : 420,
				mtext : "资源情况",
				mcol : 6,
				mwidth :420,
				header : "小计",
				width : 70,
				dataIndex : "subtotal", 
				sortable : true
			}, {
				header : "库存",
				width : 70,
				dataIndex : "storeNumber", 
				sortable : true
			},  {
				header : "待检",
				width : 70,
				resizable :  false,
				dataIndex : "noCheck", 
				sortable : true
			}, {
				header : "合同",
				width : 70,
				dataIndex : "contract", 
				sortable : true
			}, {
				header : "欠交合同",
				width : 70,
				dataIndex : "onNumber", 
				sortable : true
			} , {
				header : "不合用",
				width : 70,
				resizable :  false,
				dataIndex : "operable", 
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "需求量",
				width : 80,
				dataIndex : 'materialCount',//"needNumber",
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 2,
			    mwidthm : 200,
				mtext : "申请",
				mcol : 2,
				mwidth : 200,
				header : '<font color=red>*</font>数量',
				dataIndex : 'number_applications',
				align : "center",
				width : 100,
				sortable : true
//			,
//			editor : new Ext.form.NumberField({
//						allowBlank : true
//					})
		}, {
			header : '<font color=red>*</font>金额',
			dataIndex : 'amount_applications',
			align : "center",
			width : 100,
			sortable : true 
		} , {
		    mtextm : " 多余 ",
			mcolm : 4,
		    mwidthm : 400,
			mtext : "小计",
			mcol : 2,
			mwidth : 200,
			header : '<font color=red>*</font>数量',
			dataIndex : 'subtotal_number',
			align : "center",
			width : 100,
			sortable : true
//			,
//			editor : new Ext.form.NumberField({
//						allowBlank : true
//					})
		}, {
			header : '<font color=red>*</font>金额',
			dataIndex : 'subtotal_amount',
			align : "center",
			width : 100,
			sortable : true
		}, {
			mtext : "其中",
			mcol : 2,
			mwidth : 200,
			header : '<font color=red>*</font>超储',
			dataIndex : 'super_storage',
			align : "center",
			width : 100,
			sortable : true 
		}, {
			header : '<font color=red>*</font>外调',
			dataIndex : 'redeployment',
			align : "center",
			width : 100,
			sortable : true 
		} 
		,  {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "物资类别",
				width : 80,
				dataIndex : "materialTypeName",
				sortable : true

			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "实际采购量",
				width : 80,
				align : "left",
				dataIndex : "actualNumber", 
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "采购方式",
				width : 80,
				align : "left",
				dataIndex : "purchaseTypeName", 
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				hidden : true,
				width : 80,
				align : "left",
				dataIndex : "purchaseType",
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				hidden : true,
				width : 80,
				align : "left",
				dataIndex : "productCode",
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				hidden : true,
				width : 80,
				align : "left",
				dataIndex : "purchaseId",
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "需求编号",
				width : 80,
				align : "left",
				dataIndex : "requestCode",
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "备注",
				width : 80,
				align : "left",
				dataIndex : "note",
				sortable : true,
				editor : new Ext.form.TextField({
				})
			},{
				mtextm : "  ",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "变更前数据",
				width : 80,
				align : "left",
				dataIndex : 'oldquantity',
				sortable : true
			} ,{
				mtextm : "  ",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "变更人",
				width : 80,
				align : "left",
				dataIndex : 'changer',
				sortable : true
			}, {
				mtextm : "  ",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "变更时间",
				width : 80,
				align : "left",
				dataIndex : 'changtime',
				sortable : true
			} ,{
				mtextm : "  ",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : '变更原因',
				width : 80,
				align : "left",
				dataIndex : "changreson",
				sortable : true
			} ]);
	}
	return cm;
}

contractData.procurementDetailPanel = function(procurementDetailGridId, procurementType) {

	var cm = contractData.getProcurementDetailGridCm(procurementType);
	var store = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : '../JSON/procurementDetail_ProcurementDetailRemote.getGridDataByContract?d=' + new Date(),
			method : 'post'
		}),
		reader : new Ext.data.JsonReader( {
			root : 'results',
			id : 'procurementDetailId',
			totalProperty : 'totalProperty'
		}, [ 'procurementDetailId', 'buinessPlanDetailsId',
						'materialQuotaId', 'materialTypeName', 'vendorId',
						'vendorName', 'materialCounts', 'jan', 'feb', 'mar',
						'apr', 'may', 'june', 'july', 'aug', 'sept', 'oct',
						'nov', 'dect', 'materialItemName', 'desingnation',
						'materialStandard', 'productName', 'deliveryCount',
						'materialCount', 'remark', 'demension',
						'procurementId', 'newProcessType', 'desingnation',
						'purchaseType', 'materialId', 'backNumber', 'onNumber',
						'storeNumber', 'needNumber', 'purchaseTypeName',
						'requestCode', 'optLock', 'purchaseId', 'productCode',
						'technicCondition', 'noCheck', 'noExpend', 'operable',
						'productCode', 'provideNumber', 'subtotal', 'contract',
						'number_applications', 'amount_applications',
						'subtotal_number', 'subtotal_amount', 'super_storage',
						'redeployment', 'last_year_Consume',
						'half_year_consume', 'year_inventory', 'gap_number',
						'actualNumber','price','note','reserve',
						'oldquantity','changer','changtime','changreson'
						])
	});
	var bb = new Ext.PagingToolbar({
		pageSize:20,
		store:store,
		displayInfo:true,
		displayMsg:'显示第{0}条到{1}条记录,一共{2}条',
		emptyMsg:'没有记录'
	});
	var grid;	
	if(procurementType == 'N'){		
		grid = new Ext.grid.GridPanel({
		     store : store,
		     bbar : bb,
		     cm : cm,
		     id : procurementDetailGridId,
		     view : new MyGridView(viewConfig),
		     loadMask : {
		      msg : '正在加载数据,请稍后...'
		     },
		     columnLines : true,
		     stripeRows : true,
		     viewConfig : {
				enableRowBody : true
		     }
		    });
	} else {
		var sm = new Ext.grid.CheckboxSelectionModel();
		grid = new Ext.grid.GridPanel({
		     store : store,
		     bbar : bb,
		     sm:sm,
		     cm : cm,
		     id : procurementDetailGridId,		     
		     view : new MyGridView(viewConfig),
		     loadMask : {
		      msg : '正在加载数据,请稍后...'
		     },
		     columnLines : true,
		     stripeRows : true,
		     viewConfig : {
				enableRowBody : true
		     }
		    });
	}	
	return grid;

}

//可编辑界面
contractData.tabCard02 = function(){
			
	var contractForm = new Ext.form.FormPanel({
		id : 'contractFormId1',
		fileUpload : true,
		region : 'north',
		frame : true,
		height : 85,
		padding : 5,
		items : [{xtype:'hidden',name:'procurementContractId'},{xtype:'hidden',name:'applicationStatus'},
		     {layout:'column',border:false,items:[
		     {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'合同编号',name:'contractCode',anchor:'90%',
		            	allowBlank:false,blankText:'合同编号不能为空！'}]},
		     {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'合同名称',name:'contractName',anchor:'90%',
		            	allowBlank:false,blankText:'合同名称不能为空！'}]} 
		     ]},{layout:'column',border:false,items:[
		     {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'numberfield',fieldLabel:'合同总金额',name:'contractAmount',anchor:'90%',
		            	allowBlank:false,blankText:'合同总金额不能为空！',readOnly:true,allowDecimals : true,
						decimalPrecision : 2,minValue : 0,maxValue : 99999999.99,maskRe : /\d/}]},
		     {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'生产厂商',name:'vendName',readOnly:true,anchor:'90%'}]},
		     {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'fileuploadfield',id:'form-file',fieldLabel:'合同',name:'attachments',anchor:'90%',
		            	buttonText:'浏览...',allowBlank:true,blankText:'合同不能为空！'}]}
		     ]}]
	});
			
	var tbar = [ '-','合同模板:',{
		xtype : "combo",
		id : 'modelType',
		triggerAction : 'all',
		editable : false, 
		anchor : '95%', 
		store:[['','请选择合同模板'],
				['实物采购合同模板','实物采购合同模板'],
				['武器装备配套产品订货合同(导弹)','武器装备配套产品订货合同(导弹)'],
				['武器装备配套产品订货合同(飞机)','武器装备配套产品订货合同(飞机)'],
				['武器装备配套产品修理合同','武器装备配套产品修理合同']
//				['设备买卖合同(招标、比价项目使用)','设备买卖合同(招标、比价项目使用)'],['设备买卖合同','设备买卖合同'],
//			   ['办公用品采购合同','办公用品采购合同'],['材料买卖合同','材料买卖合同'],
//			   ['茶叶买卖合同','茶叶买卖合同'],['成件修理合同(成件处)定稿','成件修理合同(成件处)定稿'] ,
//			   ['承揽合同-工具','承揽合同-工具'],['订单采购-电脑范例合同范本定稿','订单采购-电脑范例合同范本定稿'],
//			   ['防暑药品买卖合同定稿','防暑药品买卖合同定稿'],['非金属处-材料采购合同范本定稿','非金属处-材料采购合同范本定稿'],
//			   ['工具买卖合同范本定稿','工具买卖合同范本定稿'],['工装标准件采购合同','工装标准件采购合同'],
//			   ['机电产品采购合同范本定稿','机电产品采购合同范本定稿'],['金属处-钢材采购合同范本定稿','金属处-钢材采购合同范本定稿'],
//			   ['金属处-军品材料采购合同定稿','金属处-军品材料采购合同定稿'],['木材买卖合同范本定稿','木材买卖合同范本定稿'],
//			   ['配件维修合同版本1试用','配件维修合同版本1试用'],['塑料件订货合同(成件处)定稿','塑料件订货合同(成件处)定稿'],
//			   ['维修合同范本2试用','维修合同范本2试用'],['武器装备配套产品订货合同(成件处导弹)定稿','武器装备配套产品订货合同(成件处导弹)定稿'],
//			   ['武器装备配套产品订货合同(成件处飞机)定稿','武器装备配套产品订货合同(成件处飞机)定稿'],
//			   ['原煤采购合同范本定稿','原煤采购合同范本定稿'],['劳保用品采购合同范本评审稿','劳保用品采购合同范本评审稿'],
//			   ['设备买卖合同(国家专项技改项目范本)','设备买卖合同(国家专项技改项目范本)']
			   ],
		value : ''
//		,
//		listeners:{ 
//	         'select': function(){
//	         	 contractAction.findByCreateType(Ext.getCmp("selectType").getValue());
//	         }
//    	}


	}, {
		text : '生成合同文件',
		iconCls : 'CreateLog',
		handler : function() { 
			contractAction.createContract(); 
		}
	}, '-', {
		text : '返回',
		iconCls : 'Cancel',
		handler : function() {
			var tab = Ext.getCmp('contractTab');
			tab.getLayout().setActiveItem(0);
			contractForm.form.reset();
		}
	}, '-', {
		text : '保存',
		iconCls : 'save1',
		disabled : privilegeValidate.updateHDisable,
		id : 'downCommit',
		handler : function(){
			if(contractForm.form.isValid()){
				// 判断文件类型是否合法（doc、docx、pdf、rar、zip）
				var subNames = new Array('.doc','.docx','.pdf','.rar','.zip');
				var fileName = contractForm.form.findField('form-file').getValue();
				var applicationStatus = contractForm.form.findField('applicationStatus').getValue();
				var subName = fileName.substring(fileName.lastIndexOf('.'));
				var i;
				if(applicationStatus != '编制中'){
					for(i=0; i<subNames.length; i++){
						if(subName == subNames[i]) break;
					}
					if(i == subNames.length){
						Ext.Msg.alert('提示','只能上传类型为[doc、docx、pdf、rar、zip]的文件！');
						return;
					}
				}
				contractForm.form.doAction('submit',{
					waitMsg:'正在保存数据，请稍候...',
					waitTitle:'提示',
					url : '../ContractUploadServlet',
					method : 'post',
					success : function(form, action) {
						Ext.Msg.alert('提示','保存数据成功！');
						form.reset();
						var tab = Ext.getCmp('contractTab');
						tab.getLayout().setActiveItem(0);
						var grid = Ext.getCmp('contractCheckSignPanelId');
						grid.getStore().reload();
					},
					failure : function(form, action){
						Ext.Msg.alert('提示',action.result.ImportExcelVo.returnMsg);
					}
				});
			}else{
				Ext.Msg.alert('提示','请正确填写数据！');
			}			
		}
	},'-',{
			text : '新增物资',
			disabled : privilegeValidate.addHmDisable,
			icons : 'add1',
			handler : function(){
//				获取采购方式和合同供应商id
				var form = contractForm.form;
				var id = form.findField('procurementContractId').getValue();
				contractData.addMaterialToContract(id);
			}
	},'-',{
			text : '删除物资',
			icons : 'del1',
			disabled : privilegeValidate.delHmDisable,
			handler : function(){
				var form = contractForm.form;
				var id = form.findField('procurementContractId').getValue();
				contractData.delMaterialFromContract(id);
			}
	}];

	var card02 = new Ext.Panel({
		layout : 'border',
		tbar : tbar,
		items : [ contractForm, {
			xtype : 'container',
			region : 'center',
			id : 'card02',
			layout : 'card',
			activeItem : '0',
			items : [contractData.procurementDetailPanel('procurementDetailGridId11','N'),
			         contractData.procurementDetailPanel('procurementDetailGridId12','L')]
		}]
	});
	
	return card02;
}

//只读界面
contractData.tabCard03 = function(){
	
	var contractForm = new Ext.form.FormPanel({
		id : 'contractFormId2',
		fileUpload : true,
		region : 'north',
		height : 85,
		padding : 5,
		items : [{xtype:'hidden',name:'procurementContractId'},{xtype:'hidden',name:'auditCode'},
		     {layout:'column',border:false,items:[
		     {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'合同编号',name:'contractCode',readOnly:true,anchor:'90%',style:{color:'red'}}]},
		     {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'合同名称',name:'contractName',readOnly:true,anchor:'90%',style:{color:'red'}}]}
		     ]},{layout:'column',border:false,items:[
		       {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'合同总金额',name:'contractAmount',readOnly:true,anchor:'90%'}]},
		     {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'生产厂商',name:'vendName',readOnly:true,anchor:'90%'}]},
		     {columnWidth:.4,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'合同',name:'attachments',readOnly:true,anchor:'98%',style:{color:'red'}}]},
		     {columnWidth:.1,layout:'form',border:false,items:[       
		            {xtype:'button',text:'下载',anchor:'50%',listeners:{'click':function(){
		            	contractAction.downloadFile(contractForm.getForm().findField('procurementContractId').getValue());
		            }}}]}
		     ]}]
	});
	
	
	var tbar = [ '-', {
		text : '返回',
		iconCls : 'Cancel',
		handler : function() {
			var tab = Ext.getCmp('contractTab');
			tab.getLayout().setActiveItem(0);
			contractForm.form.reset();
		}
	}];
			
	var card03 = new Ext.Panel({
		layout : 'border',
		tbar : tbar,
		items : [ contractForm, {
			xtype : 'container',
			region : 'center',
			id : 'card03',
			layout : 'card',
			activeItem : '0',
			items : [contractData.procurementDetailPanel('procurementDetailGridId21','N'),
			         contractData.procurementDetailPanel('procurementDetailGridId22','L')]
		}]
	});
	
	return card03;
}

contractData.contractTab = function(){
	 
	var tab = new Ext.Panel( {
		title : '合同审签列表',
		id : 'contractTab',
		layout : 'card',
		activeItem : 0,
		items : [ contractData.tabCard01(), contractData.tabCard02(), contractData.tabCard03()],
		listeners : {
			activate : function(p){
				p.getLayout().setActiveItem(0);
			}
		}
	});

	return tab;
}



Ext.namespace("contractData.fileUpload")
/**
 * 
 * @class procurementProcessData.fileUpload
 * @extends Ext.Window
 */
contractData.fileUpload = Ext.extend(Ext.Window, {
	id : "fileUploadWin",
	layout : 'fit',
	width : 300,
	url:'',
//	autoHeight : true,
	title : '上传文件',
	modal : true,
	initComponent : function() {
		var win = this;
		Ext.applyIf(this, {
			items : new Ext.FormPanel({
				id : 'fileUploadForm',
				// buttonAlign : 'center',
				labelAlign : 'left',
				border:false,
				autoHeight:true,
//				height : 100,
				padding : 5,
				fileUpload : true,
				labelWidth : 70,
				frame : false,
				items : [{
							xtype : "textfield",
							fieldLabel : '上传文件',
							name : 'file',
							inputType : 'file',
							allowBlank : false
						}]
			}),
			buttons : [{
				text : '确定',
				handler : function() {
					var form=Ext.getCmp('fileUploadForm')
					if (!form.form.isValid())
						return;
					var fileName = form.form.findField('file').getValue()
							.toLowerCase().trim();
					if (fileName.lastIndexOf('.') == -1) {
						Ext.Msg.alert('提示', '仅支持扩展名为.xls的Excel文件!');
						return;
					}
					if (fileName.substr(fileName.lastIndexOf('.')) != '.xls') {
						Ext.Msg.alert('提示', '仅支持扩展名为.xls的Excel文件!');
						return;
					}
					form.form.doAction('submit', {
						waitMsg : '正在上传数据，请稍候...',
						waitTitle : '提示',
						url : win.url,
						method : 'POST',
						success : function(form, action) {
							var grid = Ext.getCmp('contractCheckSignPanelId');
							grid.store.baseParams = {
								start : 0,
								limit : 20
							};
							grid.store.load();
							win.close();
						},
						failure : function(form, action) {
//							win.close();
							Ext.Msg.alert('提示',
									action.result.ImportExcelVo.returnMsg);
						}
					});
				}
			}, {
				text : '取消',
				handler : function() {
					win.close();
				}
			}]
		})

		contractData.fileUpload.superclass.initComponent.call(this);//必须放在末尾,否则出错
	}

})

contractData.addMaterialToContract = function(id){
	var sm = new Ext.grid.CheckboxSelectionModel(); 
	var store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
					url : '../JSON/parityRemote.getParityGridDataById?d='+new Date(),
					method : 'post'
				}),
		reader : new Ext.data.JsonReader({
					root : 'results',
					id : 'id',
					totalProperty : 'totalProperty'
				}, [ 'parityId', 'parityCode', 'createDate', 'deliveryDate',
			'applicationStatus', 'applicationStatusName', 'editors',
			'editorsNmae', 'editorsDept', 'purchaseId', 'purchaseCode',
			'vendorId', 'vendorName', 'type', 'typeName', 'materialId',
			'desingnation', 'materialItemName', 'materialStandard','technicCondition',
			'mCtgName','price' ])
	});
	//分页工具栏   
	var paging = new Ext.PagingToolbar({
		store : store,
		pageSize : 20,
		displayInfo : true,
		displayMsg : '第 {0} 到 {1} 条，一共  {2} 条',
		emptyMsg : '没有记录'
	}); 
	var cm = new Ext.grid.ColumnModel([ sm, 
		{header : '编号',dataIndex : 'parityCode',sortable : true}, 
		{header : '器材名称',dataIndex : 'materialItemName',width : 80,sortable : true}, 
		{header : "牌号",width : 80,dataIndex : "desingnation"}, 
		{header : "规格/型号",width : 80,dataIndex : "materialStandard"}, 
		{header : "技术条件",width : 80,dataIndex : "technicCondition"}, 
		{header : ' 生成日期 ',dataIndex : 'createDate',width : 120}, 
		{header : ' 交货日期 ',dataIndex : 'deliveryDate',width : 100}, 
		{header : '中标供应商 ',dataIndex : 'vendorName',width : 80} 
	]);
	var grid = new Ext.grid.GridPanel({
		id : 'ContractWithMaterialGrid',
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
				extype : 'button', 
				iconCls : 'save1',
				text : '提交',
				handler : function(){
//								保存合同与物资关联关系表
					contractData.submitMaterial(id);
					win.close();
				}
			},'-'
		]})
	
	});
	
	var win = new Ext.Window({
		title : '合同添加物资窗口',
		width : 800,
		id : 'addMaterialToContractWin',
		layout : 'fit',
		height : 360,
		autoScroll:false,
		autoDestroy: true,
		resizable: false, 
		modal : true,
		items : [grid]
	});
	store.baseParams = {
		start : 0,
		limit : 20,
		contractId : id
	};
	store.load();
	win.show();
}

contractData.submitMaterial = function(id){
	var grid = Ext.getCmp('ContractWithMaterialGrid');
	var ids = "";
	var rows = grid.getSelectionModel().getSelections();// 返回值为 Record 数组
	if(rows.length == 0){
	 	Ext.MessageBox.alert('提示', '请选择需要关联的物资!'); 
		return;
	}
	for(i = 0;i < rows.length;i++){   
		ids = ids + rows[i].get('parityId') + ",";
	}
	Ext.Ajax.request({
		url : '../JSON/parityRemote.submitMaterial?d='+new Date(),
		method : 'POST',
		success : function(response, options) {
			var result = Ext.util.JSON.decode(response.responseText);
			if(result.success == false){
				Ext.Msg.alert('提示', '操作失败！');
			} else {
				var grid = Ext.getCmp('procurementDetailGridId12');				
				grid.store.reload(); 
				Ext.Msg.alert('提示', '操作成功！');
			}
		},
		params : {
			parityId : ids,
			contractId : id // 这里要与权限那边一致
		}
	});
}

contractData.delMaterialFromContract = function(id){
	var grid = Ext.getCmp('procurementDetailGridId12');
	var materialId = "";
	var vendorId = "";
	var puchaseId = "";
	var rows = grid.getSelectionModel().getSelections();// 返回值为 Record 数组
	if(rows.length == 0){
	 	Ext.MessageBox.alert('提示', '请选择一条记录!'); 
		return;
	}
	for(i = 0;i < rows.length;i++){   
		puchaseId = puchaseId + rows[i].get('purchaseId') + ",";
		materialId = materialId + rows[i].get('materialId') + ',';
	}
	var count =Ext.getCmp('procurementDetailGridId12').getStore().getCount();
	if(rows.length == count){
		Ext.Msg.alert('提示', '不能删除所有数据，至少保留一条！');
		return;
	}
	var type = rows[0].get('purchaseType');
	vendorId = rows[0].get('vendorId');
//	供应商id
//	puchaseid
//	合同id
//	物资id
	Ext.MessageBox.confirm('提示','确定删除数据吗?',function(e){
			if(e=='yes'){
				Ext.Ajax.request({
					url : '../JSON/parityRemote.delMaterialFromContract?d='+new Date(),
					method : 'POST',
					success : function(response, options) {
						var result = Ext.util.JSON.decode(response.responseText);
						if(result.success == false){
							Ext.Msg.alert('提示', '操作失败！');
						} else {
							var grid = Ext.getCmp('procurementDetailGridId12');				
							grid.store.reload(); 
							Ext.Msg.alert('提示', '操作成功！');
						}
					},
					params : {
						purchaseId : puchaseId,
						vendorId : vendorId,
						materialId : materialId,
						contractId : id,
						type : type
					}
				});
			}
	});
	
}