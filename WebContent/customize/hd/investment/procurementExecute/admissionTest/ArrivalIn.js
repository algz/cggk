 
var ArrivalIn = {};

// 1、引入命名空间
Ext.namespace("ArrivalIn.arrivalComboBox");//相当于java中包的作用,即  var stockout={}
//2、编写自定义控件类
/**
 * 检验窗口的ComboBox公共类
 * @class ArrivalIn.arrivalComboBox
 * @extends Ext.form.ComboBox
 */
ArrivalIn.arrivalComboBox = Ext.extend(Ext.form.ComboBox, {// 定义主窗体,主窗体前缀带main
	// fieldLabel : name,
	displayField : 'text',
	valueField : 'value',
	triggerAction : 'all',
	mode : 'local',
	editable : false,
	width : 50,
	comboxData : [],
	forceSelection : true,
	anchor : '95%',
	initComponent : function() {// 事件绑定不要放在初始时,可以放在扩展时或Renderer中.
		var combo = this;
		Ext.applyIf(this, { // 初始化时赋值属性.当然也可以在外层扩展或构造时赋值.
			// treepanel扩展时,仅root属性不能放在扩展中,可以放在初始化/渲染或NEW定义时
			store : new Ext.data.SimpleStore({
						fields : ['text', 'value'],
						data : this.comboxData
					})
		})
		ArrivalIn.arrivalComboBox.superclass.initComponent.call(this);// 必须放在末尾,否则出错
	}
})
// 3、注册控件
Ext.reg('arrivalComboBox', ArrivalIn.arrivalComboBox);//第一个参数为自定义控件的xtype



ArrivalIn.combo = function(id,name,data){ 
	var combox = new Ext.form.ComboBox({
		hiddenName : id, 
		fieldLabel : name,
		displayField : 'text',
		valueField : 'value',
		store : new Ext.data.SimpleStore({
			fields : ['text','value'],
			data : data==null||data==''?[]:data
		}),
		triggerAction : 'all',
		mode : 'local',
		editable : false,
//		allowBlank : false,
		width:50,
		forceSelection : true,
		anchor : '95%'//,
		//value : '否'
	})
	return combox;
};

/**
 * 
 * @param {} arrivalCheckId
 * @param {} contractCode 无效
 * @param {} itemCode
 * @param {} contractName
 * @param {} itemName
 * @param {} checkResult
 * @param {} materialType
 * @param {} registrationCode 登记编号
 * @param {} createDate 创建时间
 * @param {} createrName 创建人
 * @param {} desingnation 牌号
 * @param {} materialStandard 规格
 * @param {} technicCondition 技术条件
 * @param {} checkStatus 交货状态
 * @param {} demension 计量单位
 * @param {} vendorName 供应商
 * @param {} qualityStatus 质量状态
 * @param {} arrivalDate 到货时间
 * @param {} furnaceBatch 炉批号
 */
ArrivalIn.getForm = function(arrivalCheckId,registrationid,isEdit) { 
	
	var items = [
		{
				xtype : 'fieldset',
				title : '物资基本信息',
				autoHeight : true,
				layout : 'column',
				items : [{
							columnWidth : .5,
							border : false,
							layout : 'form',
							labelWidth : 110,
							defaults : {
								readOnly : true,
								xtype : 'textfield',
								anchor : '95%'
							},
							items : [{
										fieldLabel : '登记编号',
										value:registrationid
									}, {
										fieldLabel : '登记人',
										id:'createname'
									}, {
										fieldLabel : '物料名称',
										id:'itemName'
									}, {
										fieldLabel : '规格',
										id:'materialstandard'
									}, {
										fieldLabel : '交货状态',
										id:'deliveryStatus'
									}, {
										fieldLabel : '供应商',
										id:'vendorName'
									}, {
										fieldLabel : '到货时间',
										id:'arrivalDate'
									}]
						},{
							columnWidth : .5,
							border : false,
							layout : 'form',
							labelWidth : 110,
							defaults : {
								readOnly : true,
								xtype : 'textfield',
								anchor : '95%'
							},
							items : [{
										fieldLabel : '登记时间',
										id:'createdate'
									},{
										fieldLabel : '物料编码',
										id : 'itemCode'
									},{
										fieldLabel : '牌号/型号',
										id:'desingnation'
									},{
										fieldLabel : '技术条件',
										id:'techniccondition'
									},{
										fieldLabel : '计量单位',
										id:'demension'
									},{
										fieldLabel : '质量状态'//,
										//value:qualityStatus
									},{
										fieldLabel : '炉批号',
										id:'furnacebatch'
									}]
						}]
			},
	              {				
	                xtype : 'fieldset',
				    title : '验收状态',
	            	layout : 'column',
	    			defaults : {
	    				border : false,
	    				labelWidth : 75/*,
	    				columnWidth : 1	*/		
	    		    }, 
	               items : [{
	                    	columnWidth : .4,
	        				border : false,
	        				layout : 'form',
	        				defaults : {
	        					xtype:'arrivalComboBox'
	    		            },
	        				items : [
	        				/*{xtype:'hidden',
	        				 id:'arrivalCheckId',
	        				 value:arrivalCheckId},*/
	        				{
	        					hiddenName:'ynRegistration',
	        					fieldLabel:'登记确认',
	        					comboxData:[['','0'],['已确认','1'],['退回','2']],
	        					allowBlank:false
	        				}
		        				,ArrivalIn.combo('outCheck','开箱检验',[['','0'],['合格','1'],['不合格','2']])
		        				,ArrivalIn.combo('pleaseCheck','请检',[['','0'],['完成','1'],['未完成','2']])
		        				,ArrivalIn.combo('oneCheck','表面初检',[['','0'],['合格','1'],['不合格','2']])
		        				,ArrivalIn.combo('test','委托试验',[['','0'],['完成','1'],['未完成','2'],['无需','3']])
		        				,ArrivalIn.combo('sampling','取样',[['','0'],['完成','1'],['未完成','2'],['无需','3']])
	        				    ,ArrivalIn.combo('sendSampling','送样',[['','0'],['完成','1'],['未完成','2'],['无需','3']])
		        				,ArrivalIn.combo('testReport','试验报告',[['','0'],['合格','1'],['不合格','2'],['无需','3']])
		        				,ArrivalIn.combo('ynStamped','打钢印',[['','0'],['完成','1'],['未完成','2'],['无需','3']])
		        				,ArrivalIn.combo('ynSpark','分光/磨火花',[['','0'],['合格','1'],['不合格','2'],['无需','3']])
		        				,ArrivalIn.combo('ynCheck','表面检查',[['','0'],['合格','1'],['不合格','2'],['无需','3']])
		        				,ArrivalIn.combo('sprayWord','喷字',[['','0'],['完成','1'],['未完成','2'],['无需','3']])
		        				,ArrivalIn.combo('ynSeal','油封 ',[['','0'],['完成','1'],['未完成','2'],['无需','3']])
//		        				,ArrivalIn.combo('ynSpectro','分光 ')
		        				,ArrivalIn.combo('aa','入库',[])
		        				,ArrivalIn.combo('failureHandling','不合格处理',[['','0'],['退货','1'],['返修']])] 
	               	},{
                    	columnWidth : .3,
        				border : false,
        				layout : 'form',
        				defaults:{
        					xtype:'datefield',
        					format:'Y-m-d'
        				},
        				items : [{
        					id:'ynRegistrationDate',
        					fieldLabel:'完成时间',
        					allowBlank:false
        					},{
        					id:'outcheckDate',
        					fieldLabel:'完成时间'
        					},{
        						id:'pleasecheckDate',
        					fieldLabel:'完成时间'
        					},{id:'onecheckDate',
        					fieldLabel:'完成时间'
        					},{id:'samplingDate',
        					fieldLabel:'完成时间'
        					},{id:'testDate',
        					fieldLabel:'完成时间'
        					},{id:'sendsamplingDate',
        					fieldLabel:'完成时间'
        					},{id:'testreportDate',
        					fieldLabel:'完成时间'
        					},{id:'ynStampedDate',
        					fieldLabel:'完成时间'
        					},{id:'ynsparkDate',
        					fieldLabel:'完成时间'
        					},{id:'ynCheckDate',
        					fieldLabel:'完成时间'
        					},{id:'spraywordDate',
        					fieldLabel:'完成时间'
        					},{id:'ynSealDate',
        					fieldLabel:'完成时间'
        					},{id:'',
        					fieldLabel:'完成时间'
        					},{id:'failurehandlingDate',
        					fieldLabel:'完成时间'
        					}
        				    ] 
               	},{
                    	columnWidth : .3,
        				border : false,
        				layout : 'form',
        				defaults:{
        					xtype:'textfield',
        					width:65
        				},
        				items : [{
        					id:'ynRegistrationCreator',
        					fieldLabel:'完成人',
        					allowBlank:false
        					},{id:'outcheckCreator',
        					fieldLabel:'完成人'
        					},{id:'pleasecheckCreator',
        					fieldLabel:'完成人'
        					},{id:'onecheckCreator',
        					fieldLabel:'完成人'
        					},{id:'testCreator',
        					fieldLabel:'完成人'
        					},{id:'samplingCreator',
        					fieldLabel:'完成人'
        					},{id:'sendsamplingCreator',
        					fieldLabel:'完成人'
        					},{id:'testreportCreator',
        					fieldLabel:'完成人'
        					},{id:'ynStampedCreator',
        					fieldLabel:'完成人'
        					},{id:'ynsparkCreator',
        					fieldLabel:'完成人'
        					},{id:'ynCheckCreator',
        					fieldLabel:'完成人'
        					},{id:'spraywordCreator',
        					fieldLabel:'完成人'
        					},{id:'ynSealCreator',
        					fieldLabel:'完成人'
        					},{id:'',
        					fieldLabel:'完成人'
        					},{id:'failurehandlingCreator',
        					fieldLabel:'完成人'
        					}] 
               	}
	               ]
	              },{xtype:'textfield',id:'explain',anchor:'95%',fieldLabel:'情况说明'}];

	var inform = new Ext.FormPanel( {
		id : 'ArrivalInForm',
		buttonAlign : 'center',
		labelAlign : 'left', 
		lableWidth : 130,
		width : 530,
		height : 390,
        autoScroll: true,
		frame : false,
		border : false,
		items : items,
		fileUpload : false,
		padding : 5 
	}); 
 	inform.form.doAction('load',{
		waitTitle : '加载编辑数据',
				waitMsg : '正在加载编辑数据',
				url : '../JSON/admissionTestRemote.getArrivalCheckDetil',
				method : 'POST',
				params : {
					arrivalCheckId : arrivalCheckId,
					registrationCode:registrationid
					/*,
					contractCode : contractCode,
					itemCode : itemCode,
					contractName : contractName,
					itemName : itemName*/
				},
				success : function(form, action) {
					form.items.each(function(f) {
								f.originalValue = f.getValue();
							});
				}
			}); 
	var buttons = [ {
		text : ' 确定 ',
		hidden:isEdit=='1'?false:true,
		handler : function() {
			if (inform.form.isValid()&&inform.form.isDirty()) {  
				inform.getForm().submit({
							clientValidation : true,
							url : '../JSON/admissionTestRemote.saveArrivalCheckDetil?d=' + new Date(),
							params : {arrivalCheckId : arrivalCheckId},
							success : function(form, action) {
								Ext.getCmp('admissionTestGridPanelId').store.load();
								window.close();
								Ext.Msg.alert('提示', action.result.msg);
							},
							failure : function(form, action) {
								Ext.Msg.alert('提示', action.result.msg);
							}
						});
				return;
				//***************************
				var ynStamped  = inform.form.findField('ynStamped').getRawValue(); 
				//var ynSpectro  = inform.form.findField('ynSpectro').getRawValue();  
				var ynCheck  = inform.form.findField('ynCheck').getRawValue(); 
				var sampling  = inform.form.findField('sampling').getRawValue(); 
				var test  = inform.form.findField('test').getRawValue();  
				var sendSampling  = inform.form.findField('sendSampling').getRawValue();  
				var testReport  = inform.form.findField('testReport').getRawValue(); 
				var outCheck  = inform.form.findField('outCheck').getRawValue(); 
				var pleaseCheck  = inform.form.findField('pleaseCheck').getRawValue(); 
				var oneCheck  = inform.form.findField('oneCheck').getRawValue(); 
				var ynSpark  = inform.form.findField('ynSpark').getRawValue(); 
				var failureHandling  = inform.form.findField('failureHandling').getRawValue();
				var sprayWord = inform.form.findField('sprayWord').getRawValue();
				var ynSeal = inform.form.findField('ynSeal').getRawValue();
				var param1  =new Array(); 
				param1.push(ynStamped);
				var param2  =new Array(); 
//				param2.push(ynSpectro);
				var param3  =new Array(); 
				param3.push(ynCheck);
				var param4  =new Array(); 
				param4.push(sampling);
				var param5  =new Array(); 
				param5.push(test);
				var param6  =new Array(); 
				param6.push(sendSampling);
				var param7  =new Array(); 
				param7.push(testReport);
				var param8  =new Array(); 
				param8.push(outCheck);
				var param9  =new Array(); 
				param9.push(pleaseCheck);
				var param10  =new Array(); 
				param10.push(oneCheck);
				var param11  =new Array(); 
				param11.push(ynSpark);
				var param12  =new Array(); 
				param12.push(failureHandling);
				var param13  =new Array(); 
				param13.push(arrivalCheckId);
				var param14  =new Array(); 
				param14.push('');
				var param15  =new Array(); 
				param15.push('否');
				var param16  =new Array(); 
				param16.push(ynSeal);
				var param17  =new Array(); 
				param17.push('否');
				var param18  =new Array(); 
				param18.push('');
				var param19  =new Array(); 
				param19.push('否');
				var param20  =new Array(); 
				param20.push('否');
				var param21  =new Array(); 
				param21.push('否');
				var param22  =new Array(); 
				param22.push(sprayWord);
				var remote = Seam.Component.getInstance("admissionTestRemote"); 
				remote.save(param13,param14,param1, param2,param15, param16, param3,param4,
				param5, param6,param17,param18, param19,param20,param7,param21,param8,param9,
				param10,param11,param22,param12, function(result){ 
				 	Ext.Msg.alert('提示', '数据保存成功！');  
					inform.getForm().reset();
					window.close();
					var grid = Ext.getCmp('admissionTestGridPanelId');  
					grid.store.reload();
				
				});
			}

		}
	}, {
		text : '取消',
		handler : function() {
			inform.getForm().reset();
			window.close();
		}
	} ]

	var window = new Ext.Window( {
		id : "ArrivalInAddWind",
		width : 630,
		layout : 'fit',
//		autoScroll : true,
		title : '检验',
		modal : true,
		items : inform,
		border : true,
		buttons : buttons,
		closeAction : 'close'
	}); 
//	if(checkResult=="是"){
//		Ext.getCmp("test").disable();
//		Ext.getCmp("sampling").disable();
//		Ext.getCmp("sendSampling").disable();
//		Ext.getCmp("testReport").disable();
//	}
//	if(materialType=="2"){
//		Ext.getCmp("ynStamped").disable();
//		Ext.getCmp("ynSpectro").disable();
//		Ext.getCmp("ynSpark").disable();
//		Ext.getCmp("ynCheck").disable();
//		Ext.getCmp("sprayWord").disable();
//		Ext.getCmp("ynSeal").disable();
//	}
	window.show();

} 