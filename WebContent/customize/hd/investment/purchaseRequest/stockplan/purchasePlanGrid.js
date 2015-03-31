var purchasePlanGrid = {
	selectRow : null,
	selectObj : null
};

MyGridView = Ext.extend(Ext.grid.GridView, {

			renderHeaders : function() {

				var cm = this.cm, ts = this.templates;

				var ct = ts.hcell, ct2 = ts.mhcell, ctm = ts.mhcellm;

				var cb = [], sb = [], p = {}, mcb = [], mcbm = [];

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

					cells : cb.join(""),// 显示字段

					tstyle : 'width:' + this.getTotalWidth() + ';',

					mergecells : mcb.join("")
						// ,

						// mergecellsm : mcbm.join("")

					});
				var ss = ts.headerm.apply({

							// cells : cb.join(""),//显示字段

							tstyle : 'width:' + this.getTotalWidth() + ';',

							// mergecells : mcb.join(""),

							mergecellsm : mcbm.join("")

						});

				return ss + s;

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

// 固定资产
purchasePlanGrid.gridPanel = function(planId, status) {
	if (stockPlanTabpanel.tabPanel.get(planId)) {
		stockPlanTabpanel.tabPanel.setActiveTab(planId);
	} else {
		stockPlanTabpanel.tabPanel.add({
					id : planId,
					title : '详情',
					layout : 'fit',
					closable : true,
					items : [purchasePlanGrid.fixGridPanel(planId, status)]
				}).show();
	}
}
purchasePlanGrid.fixGridPanel = function(planId, status) {

	var sm = new Ext.grid.CheckboxSelectionModel({
				mtext : " ",
				mcol : 1,
				mwidth : 20,
				width : 20
			});
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : '../JSON/stockPlan_Remote.getFixedMoreInfo',
							method : 'post'
						}),
				reader : new Ext.data.JsonReader({
							root : 'results',
							id : 'fixid',
							totalProperty : 'totalProperty'
						}, ['fixid', 'materialitemname', 'materialstandard',
								'price', 'budget', 'budout', 'selfmoney',
								'total', 'amount', 'procurementdate',
								'procurementtype', 'materialcatalog_name',
								'demartment', 'remark'])
			});
	var cm = new Ext.grid.ColumnModel([sm, new Ext.grid.RowNumberer({
						mtext : " ",
						mcol : 1,
						mwidth : 30,
						width : 30,
						header : "序号"
					}), {
				mtext : " &nbsp;",
				mcol : 1,
				mwidth : 100,
				header : '名称',
				dataIndex : 'materialitemname',
				align : "center",
				width : 100,
				sortable : true
			}, {
				mtext : "&nbsp;",
				mcol : 1,
				mwidth : 100,
				header : '配置(规格)',
				dataIndex : 'materialstandard',
				align : "center",
				width : 100,
				sortable : true
			}, {
				mtext : "&nbsp;",
				mcol : 1,
				mwidth : 100,
				header : '<font color=red>*</font>参考单价(元)',
				dataIndex : 'price',
				align : "center",
				width : 100,
				sortable : true,
				editor : new Ext.form.NumberField({
							allowBlank : true
						})
			}, {
				mtext : "资金来源(单位:元)",
				mcol : 4,
				mwidth : 400,
				header : '<font color=red>*</font>预算内',
				width : 100,
				align : "center",
				dataIndex : 'budget',
				sortable : true,
				editor : new Ext.form.NumberField({
							allowBlank : true,
							maxLength : 10,
		        			maxLengthText : '不能超过10个字符，请重新输入！'
						})
			}, {
				header : '<font color=red>*</font>预算外',
				align : "center",
				dataIndex : 'budout',
				width : 100,
				sortable : true,
				editor : new Ext.form.NumberField({
							allowBlank : true,
							maxLength : 10,
		        			maxLengthText : '不能超过10个字符，请重新输入！'
						})
			}, {
				header : '<font color=red>*</font>自筹资金',
				align : "center",
				dataIndex : 'selfmoney',
				width : 100,
				sortable : true,
				editor : new Ext.form.NumberField({
							allowBlank : true,
							maxLength : 10,
		        			maxLengthText : '不能超过10个字符，请重新输入！'
						})
			}, {
				header : '<font color=red>*</font>合计',
				align : "center",
				dataIndex : 'total',
				width : 100,
				sortable : true
			}, {
				mtext : "&nbsp;",
				mcol : 1,
				mwidth : 100,
				header : '<font color=red>*</font>数量/单位',
				dataIndex : 'amount',
				align : "center",
				width : 100,
				sortable : true,
				editor : new Ext.form.NumberField({
							allowBlank : true,
							maxLength : 10,
		        			maxLengthText : '不能超过10个字符，请重新输入！'
						})
			}, {
				mtext : "&nbsp;",
				mcol : 1,
				mwidth : 100,
				header : '<font color=red>*</font>要求采购时间',
				dataIndex : 'procurementdate',
				align : "center",
				width : 100,
				id : 'procurementdate',
				sortable : true,
				// 设置表格显示的样式信息
				// renderer:Ext.util.Format.dateRenderer('Y-m-d'),
				editor : new Ext.form.DateField({
							format : 'Y-m-d',
							editable : false,
							allowBlank : true
						})
			},
			// {
			// mtext : "&nbsp;",
			// mcol : 1,
			// mwidth : 100,
			// header : '采购方式',
			// dataIndex : 'procurementtype',
			// align : "center",
			// width : 100,
			// sortable : true,
			// editor : new Ext.form.TextField({
			// allowBlank : true
			// })
			// },
			{
				mtext : "&nbsp;",
				mcol : 1,
				mwidth : 100,
				header : '<font color=red>*</font>物资类别',
				dataIndex : 'materialcatalog_name',
				align : "center",
				width : 100,
				sortable : true,
				editor : new Ext.form.TextField({
							allowBlank : true
						})
			}, {
				mtext : "&nbsp;",
				mcol : 1,
				mwidth : 100,
				header : '<font color=red>*</font>使用单位',
				dataIndex : 'demartment',
				align : "center",
				width : 100,
				sortable : true,
				editor : new Ext.form.TextField({
							allowBlank : true
						})
			}, {
				mtext : " &nbsp;",
				mcol : 1,
				mwidth : 100,
				header : '<font color=red>*</font>备注',
				align : "center",
				dataIndex : 'remark',
				width : 100,
				sortable : true,
				editor : new Ext.form.TextField({
							allowBlank : true
						})
			}]);

	var bb = new Ext.PagingToolbar({
				pageSize : 20,
				store : store,
				displayInfo : true,
				displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
				emptyMsg : '没有记录'
			});

	// 新加 grid顶端的工具栏
	var tbar = [{
				id : "saveBtn1",
				text : "保存修改",
				iconCls : "CreateData",
				handler : function() {
					finalSaveForFix();
				}
			}, '-'];

	var grid = new Ext.grid.EditorGridPanel({
				store : store,
				bbar : bb,
				tbar : tbar,
				cm : cm,
				sm : sm,
				id : "purchasePlanGridId",
				view : new MyGridView(viewConfig),
				loadMask : {
					msg : '正在加载数据,请稍后...'
				}
			});

	sm.on('rowselect', function(sm, rowIndex, record) {
				purchasePlanGrid.selectRow = record;
			});
	sm.on('selectionchange', function(sm, t) {
				purchasePlanGrid.selectObj = sm.getSelections();
				if (!sm.getSelections() || sm.getSelections().length < 1) {
					purchasePlanGrid.selectRow = null;
				}
			});
	grid.on('afteredit', afterEdit, grid);
	// grid.on('afteredit', update().fix, grid, function(ds, options) {
	var fix = function(e) {
		var oo = Seam.Remoting
				.createType("com.sysware.customize.hd.investment.purchaseRequest.stockPlan.entity.FixedStockplanMoreinfo");
		var data = e.record;
		oo.setFixid(data.get('fixid'));
		oo.setPrice(data.get('price'));
		oo.setBudget(data.get('budget'));
		oo.setBudout(data.get('budout'));
		oo.setSelfmoney(data.get('selfmoney'));
		oo.setTotal(data.get('total'));
		oo.setAmount(data.get('amount'));
		// oo.setProcurementdate(new
		// Date(data.get('procurementdate')).format("Y-m-d"));
		oo.setProcurementdate(data.get('procurementdate'));
		// alert(data.get('procurementdate').format("Y-m-d"));
		// oo.setProcurementtype(data.get('procurementtype'));
		oo.setDemartment(data.get('demartment'));
		oo.setRemark(data.get('remark'));
		Seam.Component.getInstance("stockPlan_Remote").updateFix(oo,
				function(result) {
					// alert(result);
				});
	}
	/*
	 * grid.on('afteredit', update.fix, grid, function(ds, options) {
	 * Ext.apply(ds.baseParams, null); store.load(); });
	 */

	// 原逻辑 ---- 编辑完后立刻调用fix方法来保存改变的值,现需要点击保存按钮后才进行保存,所以此方法暂时屏蔽掉
	/*
	 * grid.on('afteredit', fix, grid, function(ds, options) {
	 * Ext.apply(ds.baseParams, null); store.load(); });
	 */

	store.baseParams = {
		start : 0,
		limit : 20,
		declareId : planId
	};
	store.load();

	// '固定资产'点击保存修改后执行的方法
	// 整体借鉴fix方法,但fix方法是基于监听事件的,取的值为发生变动的值,但这里的方法不适用,修改了data的取法
	finalSaveForFix = function() {
		var records = Ext.getCmp("purchasePlanGridId").getStore()
				.getModifiedRecords();;
		if (records == null || records.length == 0) {
			Ext.Msg.alert("提示", "没有修改记录");
			return;
		}
		var Fixid = new Array();
		var Price = new Array();
		var Budget = new Array();
		var Budout = new Array();
		var Selfmoney = new Array();
		var Total = new Array();
		var Amount = new Array();
		var Procurementdate = new Array();
		var Demartment = new Array();
		var Remark = new Array();
		for (i = 0; i < records.length; i++) {
			data = records[i];
			Fixid.push(data.get('fixid'));
			Price.push(data.get('price'));
			Budget.push(data.get('budget'));
			Budout.push(data.get('budout'));
			Selfmoney.push(data.get('selfmoney'));
			Total.push(data.get('total'));
			Amount.push(data.get('amount'));
			if (typeof(data.get('procurementdate')) == "string") { // 没有编辑时间,则为默认的String对象
				Procurementdate.push("");
			} else {// 如果通过控件选取过时间,则为object对象
				Procurementdate.push(data.get('procurementdate')
						.format("Y-m-d"));
			}
			Demartment.push(data.get('demartment'));
			Remark.push(data.get('remark'));
		}
		Seam.Component.getInstance("stockPlan_Remote").updateFix(Fixid, Price,
				Budget, Budout, Selfmoney, Total, Amount, Procurementdate,
				Demartment, Remark, function(result) {
					if (result) {
						Ext.Msg.alert("成功", "保存成功!");
					}
				});
	};

	// 判断审批状态进行屏蔽编辑处理
	// decode(status,0 未编制,1,'编制中',2,'已送审',3,'已审批','error')
	if (status != 1 && status != 0) {
		Ext.getCmp("saveBtn1").setDisabled(true);
		grid.on('beforeedit', function(obj) {
					return false;// 不可编辑
				});
	}

	return grid;
}

function afterEdit(obj) {
	var record = obj.record;// 被修改的行
	var field = obj.field;// 被修改的列

	if (obj.field != 'budout' && obj.field != 'budget'
			&& obj.field != 'selfmoney')
		return;
	var updateValue = record.get("budout");// 预算外
	if (updateValue == null || updateValue == "")
		updateValue = 0;
	var originalValue = record.get("budget");// 预算内
	if (originalValue == null || originalValue == "")
		originalValue = 0;
	var thirdValue = record.get("selfmoney");
	if (thirdValue == null || thirdValue == "")
		thirdValue = 0;
	var value = parseFloat(thirdValue) + parseFloat(updateValue)
			+ parseFloat(originalValue);
	record.set("total", value)
}
var dateFormat = function(value) {
	if (value instanceof Date) {
		return new Date(value).format("Y-m-d");
	} else {
		if (Ext.isEmpty(value)) {
			return '';
		} else {
			return Ext.util.Format.date(new Date(value.time), 'Y-m-d')
		}
	}
}

var update = function() {
	return {
		fix : function(e) {
			var oo = Seam.Remoting
					.createType("com.sysware.customize.hd.investment.purchaseRequest.stockPlan.entity.FixedStockplanMoreinfo");
			var data = e.record;
			oo.setFixid(data.get('fixid'));
			oo.setPrice(data.get('price'));
			oo.setBudget(data.get('budget'));
			oo.setBudout(data.get('budout'));
			oo.setSelfmoney(data.get('selfmoney'));
			oo.setTotal(data.get('total'));
			oo.setAmount(data.get('amount'));
			// oo.setProcurementdate(new
			// Date(data.get('procurementdate')).format("Y-m-d"));
			if (typeof(data.get('procurementdate')) == "string") { // 没有编辑时间,则为默认的String对象
				var procurementdate = data.get('procurementdate');
				var dateField = new Date(procurementdate);// 02-28-2012
				/*
				 * alert(typeof(dateField)); alert(dateField.constructor);
				 * alert(dateField);
				 */
				// oo.setProcurementdate(dateField);
			} else {// 如果通过控件选取过时间,则为object对象
				var procurementdate = data.get('procurementdate');
				oo.setProcurementdate(new Date(data.get('procurementdate'))
						.format("Y-m-d"));
			}
			// oo.setProcurementtype(data.get('procurementtype'));
			oo.setDemartment(data.get('demartment'));
			oo.setRemark(data.get('remark'));
			Seam.Component.getInstance("stockPlan_Remote").updateFix(oo,
					function(result) {
						// alert(result);
					});
		},

		nofix : function(e) {
			var oo = Seam.Remoting
					.createType("com.sysware.customize.hd.investment.purchaseRequest.stockPlan.entity.NoFixedStockplanMoreinfo");
			var data = e.record;
			oo.setPlanid(data.get('planid'));
			oo.setPrice(data.get('price'));
			oo.setLast_year_Consume(data.get('last_year_Consume'));
			oo.setSubtotal(data.get('subtotal'));
			oo.setInventory(data.get('inventory'));
			oo.setTobetested(data.get('tobetested'));
			oo.setContract(data.get('contract'));
			oo.setOutstanding(data.get('outstanding'));
			oo.setYear_inventory(data.get('year_inventory'));
			oo.setHalf_year_consume(data.get('half_year_consume'));
			oo.setGap_number(data.get('gap_number'));
			oo.setDirect_materials(data.get('direct_materials'));
			oo.setAuxiliary_materials(data.get('auxiliary_materials'));
			oo.setReserve(data.get('reserve'));
			oo.setNumber_applications(data.get('number_applications'));
			oo.setAmount_applications(data.get('amount_applications'));
			oo.setDeliver(data.get('deliver'));
			oo.setWip(data.get('wip'));
			oo.setOther(data.get('other'));
			oo.setApply_reserve(data.get('apply_reserve'));
			oo.setSubtotal_number(data.get('subtotal_number'));
			oo.setSubtotal_amount(data.get('subtotal_amount'));
			oo.setSuper_storage(data.get('super_storage'));
			oo.setRedeployment(data.get('redeployment'));
			oo.setVendor_id(data.get('vendor_id'));
			// oo.setProcurementtype(data.get('procurementtype'));
			Seam.Component.getInstance("stockPlan_Remote").updateNofix(oo,
					function(result) {
						// alert(result);
					});
		}
	}

};

// 非固定资产
purchasePlanGrid.threeHeaderGrid = function(planId, status) {

	if (stockPlanTabpanel.tabPanel.get(planId)) {
		stockPlanTabpanel.tabPanel.setActiveTab(planId);
	} else {
		stockPlanTabpanel.tabPanel.add({
					id : planId,
					title : '详情',
					layout : 'fit',
					closable : true,
					items : [purchasePlanGrid.threeGrid(planId, status)]
				}).show();
	}
}
purchasePlanGrid.threeGrid = function(planId, status) {
	var sm = new Ext.grid.CheckboxSelectionModel({
				mtextm : "&nbsp;",
				mcolm : 1,
				mwidthm : 20,
				mtext : " ",
				mcol : 1,
				mwidth : 20,
				width : 20
			});
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : '../JSON/stockPlan_Remote.getNoFixedMoreInfo',
							method : 'post'
						}),
				reader : new Ext.data.JsonReader({
							root : 'results',
							id : 'planid',
							totalProperty : 'totalProperty'
						}, ['planid', 'materialitemname', 'desingnation',
								'materialstandard', 'techniccondition',
								'demension', 'price', 'last_year_Consume',
								'subtotal', 'inventory', 'tobetested',
								'contract', 'outstanding', 'year_inventory',
								'half_year_consume', 'gap_number',
								'direct_materials', 'auxiliary_materials',
								'reserve', 'number_applications',
								'amount_applications', 'deliver', 'wip',
								'other', 'apply_reserve', 'subtotal_number',
								'subtotal_amount', 'super_storage',
								'redeployment', 'vendor_id', 'procurementtype',
								'materialCalalogName', 'needNumber','use','taskno',
								'actualNumber', 'purchaseType', 'materialId',
								'vendorName', 'note', 'operable','declare_detil_status',
								'confirmcontract','deliverydate','deliveryStatus'])
			});
	var cm = new Ext.grid.ColumnModel([sm, new Ext.grid.RowNumberer({
						mtextm : "&nbsp;",
						mcolm : 1,
						mwidthm : 30,
						mtext : " ",
						mcol : 1,
						mwidth : 30,
						width : 30,
						header : "序号"
					}), {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 100,
				mtext : " &nbsp;",
				mcol : 1,
				mwidth : 100,
				header : '名称',
				dataIndex : 'materialitemname',
				align : "center",
				width : 100,
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 100,
				mtext : " &nbsp;",
				mcol : 1,
				mwidth : 100,
				header : '牌号',
				dataIndex : 'desingnation',
				align : "center",
				width : 100,
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 100,
				mtext : " &nbsp;",
				mcol : 1,
				mwidth : 100,
				header : '规格',
				dataIndex : 'materialstandard',
				align : "center",
				width : 100,
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 100,
				mtext : " &nbsp;",
				mcol : 1,
				mwidth : 100,
				header : '技术条件',
				dataIndex : 'techniccondition',
				align : "center",
				width : 100,
				sortable : true
			},{				
			    mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 100,
				mtext : " &nbsp;",
				mcol : 1,
				mwidth : 100,
		header : "交货状态",
		align : "center",
		dataIndex : 'deliveryStatus'
	}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 100,
				mtext : " &nbsp;",
				mcol : 1,
				mwidth : 100,
				header : '<font color=red>*</font>计划单价',
				dataIndex : 'price',
				align : "center",
				width : 100,
				sortable : true,
				editor : new Ext.form.NumberField({
					allowBlank : false,
					decimalPrecision : 4,// 小数位数
					maxLength : 20,// 最大长度
					maxLengthText : '不能超过10个字符，请重新输入！',
					maxValue : 999999999
						// 最大值
					})
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 100,
				mtext : " &nbsp;",
				mcol : 1,
				mwidth : 100,
				header : '单位',
				dataIndex : 'demension',
				align : "center",
				width : 100,
				sortable : true
				/*
				 * , editor : new Ext.form.TextField({ allowBlank : true })
				 */
		}	, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 100,
				mtext : " &nbsp;",
				mcol : 1,
				mwidth : 100,
				header : '上年消耗',
				dataIndex : 'last_year_Consume',
				align : "center",
				width : 100,
				sortable : true
				// ,
			// editor : new Ext.form.NumberField({
			// allowBlank : true
			// })
		}	,{
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 100,
				mtext : " &nbsp;",
				mcol : 1,
				mwidth : 100,
				header : '需用时间',
				dataIndex : 'deliverydate',
				align : "center",
				width : 100,
				sortable : true
				// ,
			// editor : new Ext.form.NumberField({
			// allowBlank : true
			// })
		}, {
				mtextm : " &nbsp;",
				mcolm : 6,
				mwidthm : 600,
				mtext : "资源",
				mcol : 6,
				mwidth : 600,
				header : '小计',
				dataIndex : 'subtotal',
				align : "center",
				width : 100,
				sortable : true
				// ,
			// editor : new Ext.form.NumberField({
			// allowBlank : true
			// })
		}	, {
				header : '库存',
				dataIndex : 'inventory',
				align : "center",
				width : 100,
				sortable : true
				// ,
			// editor : new Ext.form.NumberField({
			// allowBlank : true
			// })
		}	, {
				header : '待验',
				dataIndex : 'tobetested',
				align : "center",
				width : 100,
				sortable : true
				// ,
			// editor : new Ext.form.NumberField({
			// allowBlank : true
			// })
		}	, {
				header : '合同',
				dataIndex : 'contract',
				align : "center",
				width : 100,
				sortable : true
				// ,
			// editor : new Ext.form.NumberField({
			// allowBlank : true
			// })
		}	, {
				header : '欠缴合同',
				dataIndex : 'outstanding',
				align : "center",
				width : 100,
				sortable : true
				// ,
			// editor : new Ext.form.NumberField({
			// allowBlank : true
			// })
		}	, {
				header : '不合用',
				dataIndex : 'operable',
				align : "center",
				width : 100,
				sortable : true
				// ,
			// editor : new Ext.form.NumberField({
			// allowBlank : true
			// })
		}	, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 100,
				mtext : "&nbsp;",
				mcol : 1,
				mwidth : 100,
				header : '需用量',
				dataIndex : 'needNumber',
				align : "center",
				width : 100,
				sortable : true,
				editor : new Ext.form.NumberField({
					allowBlank : true,
					decimalPrecision : 4,// 小数位数
					maxLength : 20,// 最大长度
					maxLengthText : '不能超过10个字符，请重新输入！',
					maxValue : 999999999
						// 最大值
					})
			}, {
				mtextm : " &nbsp;",
				mcolm : 2,
				mwidthm : 200,
				mtext : "申请",
				mcol : 2,
				mwidth : 200,
				header : '数量',
				dataIndex : 'number_applications',
				align : "center",
				width : 100,
				sortable : true
				// ,
			// editor : new Ext.form.NumberField({
			// allowBlank : true
			// })
		}	, {
				header : '<font color=red>*</font>金额',
				dataIndex : 'amount_applications',
				align : "center",
				width : 100,
				sortable : true,
				editor : new Ext.form.NumberField({
					allowBlank : true,
					decimalPrecision : 4,// 小数位数
					maxLength : 20,// 最大长度
					maxLengthText : '不能超过10个字符，请重新输入！',
					maxValue : 999999999
						// 最大值
					})
			}, {
				mtextm : " 多余 ",
				mcolm : 4,
				mwidthm : 402,
				mtext : "小计",
				mcol : 2,
				mwidth : 200,
				header : '数量',
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
					allowBlank : true,
					decimalPrecision : 4,// 小数位数
					maxLength : 20,// 最大长度
					maxLengthText : '不能超过10个字符，请重新输入！',
					maxValue : 999999999
						// 最大值
					})
			}, {
				mtext : "其中",
				mcol : 2,
				mwidth : 200,
				header : '超储',
				dataIndex : 'super_storage',
				align : "center",
				width : 100,
				sortable : true 
			}, {
				header : '<font color=red>*</font>外调',
				dataIndex : 'redeployment',
				align : "center",
				width : 100,
				sortable : true,
				editor : new Ext.form.NumberField({
					allowBlank : true,
					decimalPrecision : 4,// 小数位数
					maxLength : 20,// 最大长度
					maxLengthText : '不能超过10个字符，请重新输入！',
					maxValue : 999999999
						// 最大值
					})
			}, {
				mtextm : " &nbsp; ",
				mcolm : 1,
				mwidthm : 100,
				mtext : "&nbsp;",
				mcol : 1,
				mwidth : 100,
				header : '物资类别',
				dataIndex : 'materialCalalogName',
				align : "center",
				width : 100,
				sortable : true
			},{
				mtextm : " &nbsp; ",
				mcolm : 1,
				mwidthm : 100,
				mtext : "&nbsp;",
				mcol : 1,
				mwidth : 100,
				header : '采购用途',
				dataIndex : 'use',
				align : "center",
				width : 100,
				sortable : true
			},{
				mtextm : " &nbsp; ",
				mcolm : 1,
				mwidthm : 100,
				mtext : "&nbsp;",
				mcol : 1,
				mwidth : 100,
				header : '变更状态',
				dataIndex : 'declare_detil_status',
				align : "center",
				width : 100,
				sortable : true,
				renderer:function(value){return value==5?"已变更":""}
			},{
				mtextm : " &nbsp; ",
				mcolm : 1,
				mwidthm : 100,
				mtext : "&nbsp;",
				mcol : 1,
				mwidth : 100,
				header : '合同确认',
				dataIndex : 'confirmcontract',
				align : "center",
				width : 100,
				sortable : true,
				renderer:function(value){return value!=""?"确认入库":""}
			},{
				mtextm : " &nbsp; ",
				mcolm : 1,
				mwidthm : 100,
				mtext : "&nbsp;",
				mcol : 1,
				mwidth : 100,
				header : '任务编号',
				dataIndex : 'taskno',
				align : "center",
				width : 100,
				sortable : true
			}, {
				mtextm : " &nbsp; ",
				mcolm : 1,
				mwidthm : 100,
				mtext : "&nbsp;",
				mcol : 1,
				mwidth : 100,
				header : '<font color=red>*</font>建议采购量',
				dataIndex : 'actualNumber',
				align : "center",
				width : 100,
				sortable : true,
				editor : new Ext.form.NumberField({
					decimalPrecision : 4,// 小数位数
					maxLength : 20,// 最大长度
					maxLengthText : '不能超过10个字符，请重新输入！',
					maxValue : 999999999
						// 最大值
					})
			}, {
				mtextm : " &nbsp; ",
				mcolm : 1,
				mwidthm : 100,
				mtext : "&nbsp;",
				mcol : 1,
				mwidth : 100,
				header : '备注',
				dataIndex : 'note',
				align : "center",
				width : 100,
				sortable : true,
				editor : new Ext.form.TextField({
							allowBlank : true
						})
			}]);

	var bb = new Ext.PagingToolbar({
				pageSize : 20,
				store : store,
				displayInfo : true,
				displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
				emptyMsg : '没有记录'
			});

	// grid顶端的工具栏
	var tbar = [{
				id : "saveBtn2",
				text : "保存修改",
				iconCls : "CreateData",
				handler : function() {
					finalSaveForNofix();
				}
			}];

	var grid = new Ext.grid.EditorGridPanel({
		store : store,
		loadMak : true,
		bbar : bb,
		tbar : tbar,
		cm : cm,
		sm : sm,
		id : "purchaseThreePlanGridId",
		view : new MyGridView(viewConfig),
		loadMask : {
			msg : '正在加载数据,请稍后...'
		},
		listeners : { // 单击表格事件
			'cellclick' : function(grid, rowIndex, columnIndex, e) {
				if (columnIndex == 30) {// 当点击供应商列，可进行下拉框选择
					var record = grid.getStore().getAt(rowIndex); // Get the
					// Record
					var materialId = record.get("materialId"); // 获得物料信息ID，以选取相应供应商
					var purchaseType = record.get('purchaseType');// 获得采购方式
					if (purchaseType == null || purchaseType == '') {
						Ext.Msg.alert('提示', '请先选择采购方式!');
						return;
					}
					procurementProcessAction.venderStore.baseParams = {
						materialId : materialId,
						start : 0,
						limit : 0
					};
					procurementProcessAction.venderStore.on("beforeload",
							function() {
								procurementProcessAction.venderStore.baseParams = {
									materialId : materialId,
									start : 0,
									limit : 0
								};
							});
					procurementProcessAction.venderStore.load();
				}
			},
			'afteredit' : function(e) {// 对添加汇总后，采购方式由”直接采购“向非”直接采购“或者”其它采购“向非”其它采购“状态改变时，对供应商信息进行处理。

						var rec=e.record
						if(e.field=="actualNumber"||e.field=='amount_applications'||e.field=="subtotal_amount"||e.field=='super_storage'||e.field=='redeployment'||e.field=='reserve'){
							//建议采购量验证
							if(e.field=='actualNumber'&&rec.get('number_applications')!=rec.get('actualNumber')){
								var win=new Ext.Window({
									title:'编辑',
									layout:'fit',
									width:200,
									modal:true,
									actualNumber:rec.get('actualNumber'),
									items:[{
										border:false,
										id:'content',
										xtype:'textarea'
									}],
									buttons : [{
														text : '确定',
														handler : function(e) {
															var value=Ext.getCmp('content').getValue();
															if(value!=null&&value!=""){
																rec.set('note',value);
																rec.set('actualNumber',win.actualNumber);
//															    rec.commit();
															    win.close();
															}else{
																Ext.Msg.alert('提示','请输入值!');
															}
														}
													}]
								})
								win.show();
								rec.reject();
								return;
							}
							//外调数量验证
							if (e.field == 'redeployment') {
								var subtotal_number = rec.get("subtotal_number");
								var updateValue = e.value;
								if (subtotal_number == "" || subtotal_number == null) {
									Ext.Msg.alert("提示", "多余中的小计 数量 为空，不能设置外调数量！");
                                    rec.reject();
									return false;
								}
								if (parseFloat(updateValue) > parseFloat(subtotal_number)) {
									Ext.Msg.alert("提示", "外调数量不能大于多余中的小计 数量 ！");
                                    rec.reject();
									return false;
								}
								rec.set("super_storage", Subtr(parseFloat(subtotal_number), parseFloat(updateValue)));
//								rec.commit();
							}
//							
//							//储备量修改
//							if (e.field == "reserve") {
//								//建议采购量=储备量+申请量-多余量
//								var actualNumber = Number(rec.get('reserve')) + Number(rec.get('actualNumber'))-Number(rec.get('subtotal_number'));
//								rec.set("actualNumber", actualNumber);// 设置建议采购量
//							}
//													e.record.commit();
						}

//				if (e.column == 33) {
//					if ((e.originalValue == '直接采购' && e.value != '直接采购')
//							|| (e.originalValue == '其它采购' && e.value != '其它采购')) {
//						e.record.set('vendorName', '');
//						e.record.set('vendorId', '');
//					}
//				}
			}
		}
	});

	sm.on('rowselect', function(sm, rowIndex, record) {
				purchasePlanGrid.selectRow = record;
			});
	sm.on('selectionchange', function(sm, t) {
				purchasePlanGrid.selectObj = sm.getSelections();
				if (!sm.getSelections() || sm.getSelections().length < 1) {
					purchasePlanGrid.selectRow = null;
				}
			});
	grid.on('afteredit', afterEditNofix, grid);
	function afterEditNofix(obj) {
		var record = obj.record;// 被修改的行
		var field = obj.field;// 被修改的列

//		if (obj.field == 'needNumber' || obj.field == 'reserve') {
//			var updateValue = record.get("reserve");// 储备量
//			if (updateValue == null || updateValue == "")
//				updateValue = 0;
//			var originalValue = record.get("needNumber");// 需用量
//			if (originalValue == null || originalValue == "")
//				originalValue = 0;
//			var thirdValue = record.get("half_year_consume");
//			if (thirdValue == null || thirdValue == "")
//				thirdValue = 0;
//			else
//				thirdValue = -thirdValue;
//			var fourValue = record.get("gap_number");
//			if (fourValue == null || fourValue == "")
//				fourValue = 0;
//			var value =Subtr((accAdd(parseFloat(updateValue),parseFloat(originalValue))),(Subtr(parseFloat(fourValue),parseFloat(thirdValue)))); 
//			if (parseFloat(value) > 0)
//			{
//				record.set("number_applications", value);
//				record.set("actualNumber", value);
//				record.set("subtotal_number","");
//			}
//			else if (parseFloat(value) < 0)
//			{
//				record.set("number_applications", "");
//				record.set("actualNumber", "");
//				record.set("subtotal_number", -value);
//			}
//			
//			record.set("redeployment","");
//			record.set("super_storage","");
//		}else
		if (obj.field == 'redeployment'){
			var subtotal_number =  record.get("subtotal_number");
			var updateValue = obj.value;
			if(subtotal_number=="" || subtotal_number==null){
				Ext.Msg.alert("提示", "多余中的小计 数量 为空，不能设置外调数量！");
				record.set("redeployment","");
				record.commit();
				return;
			}
			if(parseFloat(updateValue)>parseFloat(subtotal_number)){
				Ext.Msg.alert("提示", "外调数量不能大于多余中的小计 数量 ！");
				record.set("redeployment","");
				record.commit();
				return;
			}
			record.set("super_storage",Subtr(parseFloat(subtotal_number),parseFloat(updateValue)));
			record.commit();
		}
	}
	function accAdd(arg1,arg2){ 
		var r1,r2,m; 
		try{
			r1=arg1.toString().split(".")[1].length;
		}catch(e){
			r1=0;
		} 
		try{
			r2=arg2.toString().split(".")[1].length;
		}catch(e){
			r2=0;
		} 
		m=Math.pow(10,Math.max(r1,r2));
		return (arg1*m+arg2*m)/m;
	}
	function Subtr(arg1,arg2){
	    var r1,r2,m,n;
	    try{
	    	r1=arg1.toString().split(".")[1].length;
	    }catch(e){
	    	r1=0;
	    }
	    try{
	    	r2=arg2.toString().split(".")[1].length;
	    }catch(e){
	    	r2=0;
	    }
	    m=Math.pow(10,Math.max(r1,r2));
	    n=(r1>=r2)?r1:r2;
	    return ((arg1*m-arg2*m)/m).toFixed(n);
	}
	// grid.on('afteredit', update().nofix, grid, function(ds, options) {
	var nofix = function(e) {
		var oo = Seam.Remoting
				.createType("com.sysware.customize.hd.investment.purchaseRequest.stockPlan.entity.NoFixedStockplanMoreinfo");
		var data = e.record;
		oo.setPlanid(data.get('planid'));
		oo.setPrice(data.get('price'));
		oo.setLast_year_Consume(data.get('last_year_Consume'));
		oo.setSubtotal(data.get('subtotal'));
		oo.setInventory(data.get('inventory'));
		oo.setTobetested(data.get('tobetested'));
		oo.setContract(data.get('contract'));
		oo.setOutstanding(data.get('outstanding'));
		oo.setYear_inventory(data.get('year_inventory'));
		oo.setHalf_year_consume(data.get('half_year_consume'));
		oo.setGap_number(data.get('gap_number'));
		oo.setDirect_materials(data.get('direct_materials'));
		oo.setAuxiliary_materials(data.get('auxiliary_materials'));
		oo.setReserve(data.get('reserve'));
		oo.setNumber_applications(data.get('number_applications'));
		oo.setAmount_applications(data.get('amount_applications'));
		oo.setDeliver(data.get('deliver'));
		oo.setWip(data.get('wip'));
		oo.setOther(data.get('other'));
		oo.setApply_reserve(data.get('apply_reserve'));
		oo.setSubtotal_number(data.get('subtotal_number'));
		oo.setSubtotal_amount(data.get('subtotal_amount'));
		oo.setSuper_storage(data.get('super_storage'));
		oo.setRedeployment(data.get('redeployment'));
		oo.setVendor_id(data.get('vendor_id'));
		// oo.setProcurementtype(data.get('procurementtype'));
		Seam.Component.getInstance("stockPlan_Remote").updateNofix(oo,
				function(result) {
					// alert(result);
				});
	}

	/*
	 * grid.on('afteredit', update.nofix, grid, function(ds, options) {
	 * Ext.apply(ds.baseParams, null); store.load(); });
	 */

	// 原逻辑 ---- 编辑完后立刻调用nofix方法来保存改变的值,现需要点击保存按钮后才进行保存,所以此方法暂时屏蔽掉
	/*
	 * grid.on('afteredit', nofix, grid, function(ds, options) {
	 * Ext.apply(ds.baseParams, null); store.load(); });
	 */

	// 如果设置,则为单元格不可编辑状态
	/*
	 * grid.on('beforeedit', function(obj){ return false;//不可编辑 });
	 */

	store.baseParams = {
		start : 0,
		limit : 20,
		declareId : planId
	};
	store.load();

	// '非固定资产'点击保存修改后执行的方法
	// 整体借鉴nofix方法,但nofix方法是基于监听事件的,取的值为发生变动的值,但这里的方法不适用,修改了data的取法
	finalSaveForNofix = function() {
		var records = Ext.getCmp("purchaseThreePlanGridId").getStore()
				.getModifiedRecords();;
//		if (records == null || records.length == 0) {
//			Ext.Msg.alert("提示", "没有修改记录");
//			return;
//		}
		var Planid = new Array();
		var Price = new Array();
		var NeedNumber = new Array();
		var ActualNumber = new Array();
		var Subtotal_amount = new Array();
		var Super_storage = new Array();
		var Redeployment = new Array();
		var note = new Array();
		var subtotal = new Array();
		var contract = new Array();
		var number_applications = new Array();
		var amount_applications = new Array();
		var subtotal_number = new Array();
		var last_year_Consume = new Array();
		for (i = 0; i < records.length; i++) {
			data = records[i];
			Planid.push(data.get('planid'));
			Price.push(data.get('price'));
			Subtotal_amount.push(data.get('subtotal_amount'));
			Super_storage.push(data.get('super_storage'));
			Redeployment.push(data.get('redeployment'));
			NeedNumber.push(data.get('needNumber'));
			subtotal.push(data.get('subtotal'));
			contract.push(data.get('contract'));
			number_applications.push(data.get('number_applications'));
			amount_applications.push(data.get('amount_applications'));
			subtotal_number.push(data.get('subtotal_number'));
			last_year_Consume.push(data.get('last_year_Consume'));
			if (data.get('actualNumber') == "") {
				Ext.Msg.alert("提示", "请输入建议采购数量!");
				return;
			}
			ActualNumber.push(data.get('actualNumber'));
			note.push(data.get('note'));

		}
		Seam.Component.getInstance("stockPlan_Remote").updateNofix(Planid,
				Price, Subtotal_amount, Super_storage, Redeployment,
				NeedNumber, ActualNumber, note, subtotal, contract,
				number_applications, amount_applications, subtotal_number,
				last_year_Consume, function(result) {
					Ext.Msg.alert("成功", "保存成功!");
				});
	};

	// 判断审批状态进行屏蔽编辑处理
	// decode(status,1,'编制中',2,'已送审',3,'已审批','error')
	if (status != 1 && status != 0 ) {
		var a = Ext.getCmp("saveBtn2");
		Ext.getCmp("saveBtn2").setDisabled(true);
		grid.on('beforeedit', function(obj) {
					return false;// 不可编辑
				});
	}

	return grid;
}
