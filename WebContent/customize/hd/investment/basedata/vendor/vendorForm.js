var vendorForm = {};
vendorForm.getForm = function(rd){
	var initialEvaluationDate = new Ext.form.DateField( {
	    invalidText : '初评日期输入格式为Y-m-d',
	    xtype : 'datefield',
		fieldLabel : '初评日期',
		id : "initialEvaluationDate",
		name:"initialEvaluationDate",
		format : 'Y-m-d',
		anchor : '95%'
	} );
	var reviewDate = new Ext.form.DateField({
		invalidText : '复评日期输入格式为Y-m-d',
		xtype : 'datefield',
		fieldLabel : '复评日期',
		id : "reviewDate",
		name:"reviewDate",
		format : 'Y-m-d',
		anchor : '95%'
	});
	initialEvaluationDate.on('afterrender', function(dateField) {
		if(dateField.getValue() == ''){
			reviewDate.disable();
		} else {
			reviewDate.enable();
			reviewDate.setMinValue(dateField.getValue());
		}		
	});
	initialEvaluationDate.on('select', function(dateField,date) {
		if(dateField.getValue() == ''){
			reviewDate.disable();
			reviewDate.setValue('');
		} else {
			reviewDate.enable();
			reviewDate.setMinValue(dateField.getValue());
		}
	});
	initialEvaluationDate.on('blur', function(dateField) {
		if(dateField.getValue() == ''){
			reviewDate.disable();
			reviewDate.setValue('');
		} else {
			reviewDate.enable();
			reviewDate.setMinValue(dateField.getValue());
		}
	});
	
	var bankStore = new Ext.data.SimpleStore( {
		fields : [ 'id', 'flag' ],
		data : [ [ '中国工商银行', '中国工商银行' ],[ '中国建设银行', '中国建设银行' ],[ '中国农业银行', '中国农业银行' ], 
		         [ '中国银行', '中国银行' ],[ '交通银行', '交通银行' ],[ '兴业银行', '兴业银行' ],[ '招商银行', '招商银行' ],		         
		         [ '中国民生银行', '中国民生银行' ],[ '中信银行', '中信银行' ],[ '北京银行', '北京银行' ],
		         [ '上海浦东发展银行', '上海浦东发展银行' ],[ '广东发展银行', '广东发展银行' ],[ '深圳发展银行', '深圳发展银行' ]]
	});
	
	var sectorStore = new Ext.data.SimpleStore( {
		fields : [ 'id', 'flag' ],
		data : [ [ '核工业', '核工业' ],[ '航天', '航天' ],[ '航空', '航空' ],[ '船舶', '船舶' ],[ '兵器', '兵器' ],[ '电子', '电子' ],
				[ '军方', '军方' ],[ '冶金', '冶金' ],[ '锻铸造', '锻铸造' ],[ '轻工', '轻工' ],[ '纺织', '纺织' ],[ '化工', '化工' ],
				[ '建材', '建材' ],[ '石化', '石化' ],[ '机械', '机械' ],[ '物流', '物流' ],[ '进出口', '进出口' ],[ '其他', '其他' ]]
	});
	
	var typeStore = new Ext.data.SimpleStore( {
		fields : [ 'value', 'text' ],
		data : [ [ '1', '合格' ],[ '2', '试供' ]]
	});
	
	var items = [{
		    	   xtype : 'hidden',
		    	   name :'vendorID',
		    	   id : "vendorID"
		       },
		       {
		    	   xtype : 'hidden',
		    	   name :'materialIDs',
		    	   id : "materialIDs" 
		       },
		       {
		    	   xtype : 'hidden',
		    	   name :'catalogIDs',
		    	   id : "catalogIDs" 
		       },
		       //供应商编号先采用自动生成的方式
//		       {
//		    	   fieldLabel : '供应商编号',
//		    	   id : "vendorCode",
//		    	   name : "vendorCode",
//		    	   anchor : '95%'
//		       },		       
		       {
		    	   fieldLabel : '供应商名称',
		    	   id : "vendorName",
		    	   name : "vendorName",
		    	   xtype : 'textarea',
		    	   height : 50,
		    	   allowBlank : false,
		    	   maxLength : 200,
		    	   maxLengthText : '最多可输入200个字，请重新输入！',
		    	   anchor : '95%'
		       },  {
		    	   	fieldLabel : '供应商简称',
		    	   	id : "simpleName",
		    	   	name : "simpleName",  
					allowBlank : true,
				    maxLength : 50,
		    	    maxLengthText : '最多可输入50个字，请重新输入！',
					anchor : '95%'
		       }  ,
		       {
            xtype: 'radiogroup',
            fieldLabel: '供应商类型',
            id:'vendorkind',
            vertical: true,
            anchor : '95%',
            items: [
                {boxLabel: '消耗类供应商',id:'kind1', name: 'kind', inputValue: 0, checked: true},
                {boxLabel: '固定资产类供应商',id:'kind2', name: 'kind', inputValue: 1}
            ]
        },{
            xtype: 'radiogroup',
            fieldLabel: '供应商类别',
            id:'kindClass',
            vertical: true,
            anchor : '95%',
            items: [
                {boxLabel: '供应商',id:'kindClass1', name: 'kindClass', inputValue: 0, checked: true},
                {boxLabel: '生产商',id:'kindClass2', name: 'kindClass', inputValue: 1}
            ]
        },
		       {
		    	   fieldLabel : '经营范围',
		    	   id : "businessScope",
		    	   name : "businessScope",
		    	   xtype : 'textarea',
		    	   height : 50,
		    	   maxLength : 200,
		    	   maxLengthText : '最多可输入200个字，请重新输入！',
		    	   anchor : '95%'
		       },
		       {
		    	   fieldLabel:'税号',
		    	   id : 'taxID',
		    	   name : 'taxID',
		    	   anchor : '95%'
		       },
		       {
		    	   fieldLabel : '账户',
		    	   id:'accountID',
		    	   name:'accountID',
		    	   maxLength : 25,
		    	   maxLengthText : '最多可输入25个字，请重新输入！',
		    	   anchor : '95%'
		       },
		       {
		    	   	fieldLabel : '开户行',
			    	xtype : 'combo',
			    	allowBlank: true,
			    	store : bankStore,
			    	triggerAction : 'all',
			    	valueField : 'id',
					displayField : 'flag',
					mode : 'local',
					id : 'bank',
					name : 'bank',
					forceSelection : true,
					anchor : '95%'
		       },
		       {
		    	   	fieldLabel:'经营地址',
		    	   	xtype:'textarea',
		    	   	id:'address',
		    	   	name:'address',
		    	   	allowBlank:true,
		    	   	height : 50,
		    	   	maxLength : 200,
			    	maxLengthText : '最多可输入200个字，请重新输入！',
		    	   	anchor : '95%'
		       },
		       {
		    	   fieldLabel : '电话',
		    	   id:'phone',
		    	   name:'phone',
		    	   regex : /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/,  
		    	   anchor : '95%'
		       },
		       {
		    	   fieldLabel : '传真',
		    	   id:'fax',
		    	   name:'fax',
		    	   anchor : '95%'
		       },
		       {
		    	   fieldLabel : '保密资质等级',
		    	   id:'vendorLevel',
		    	   name:'vendorLevel',
		    	   anchor : '95%'
		       },
		       //新建供应商的时候是不能选择类别的。
//		       {
//		    	   fieldLabel : '类别',
//		    	   xtype : 'combo',
//			       //不允许手动输入
//		    	   setEditable:false,
//		    	   //是否允许为空
////			       allowBlank: false,
//			       blankText :'“类别”选项不能为空！',
//			       store : typeStore,
//			       triggerAction : 'all',
//			       valueField : 'value',
//				   displayField : 'text',
//				   mode : 'local',
//				   forceSelection : true,
//		    	   id:'type',
//		    	   name:'type',
//		    	   anchor : '95%'
//		       },
		       {
		    	   fieldLabel : '信用度',
		    	   id:'reposal',
		    	   name:'reposal',
		    	   anchor : '95%'
		       },
		       {
		    	   fieldLabel : '企业性质',
		    	   id:'property',
		    	   name:'property',
		    	   maxLength : 25,
		    	   maxLengthText : '最多可输入25个字，请重新输入！',
		    	   anchor : '95%'
		       },
		       {
		    	   fieldLabel : '生产厂商',
		    	   id:'productVendor',
		    	   name:'productVendor',
		    	   maxLength : 25,
		    	   maxLengthText : '最多可输入25个字，请重新输入！',
		    	   anchor : '95%'
		       },
		       initialEvaluationDate,
		       reviewDate,
		       {
		    	   	fieldLabel : '复评结果',
		    	   	id : "reviewResult",
		    	   	name : "reviewResult",
					xtype:'textarea',
					height : 50,
					allowBlank : true,
					maxLength : 200,
			    	maxLengthText : '最多可输入200个字，请重新输入！',
					anchor : '95%'
		       } 
		       ,  {
		    	   	fieldLabel : '所属行业',
		    	   	xtype : 'combo',
		    	   	//不允许手动输入
		    	   	setEditable:false,
		    	   	//是否允许为空
			    	allowBlank: false,
			    	blankText :'“所属行业”选项不能为空！',
			    	store : sectorStore,
			    	triggerAction : 'all',
			    	valueField : 'id',
					displayField : 'flag',
					mode : 'local',
					forceSelection : true,
		    	   	id : "sector",
		    	   	name : "sector",  
//				    maxLength : 100,
//		    	    maxLengthText : '最多可输入100个字，请重新输入！',
					anchor : '95%'
		       } 
		       ,  {
		    	   	fieldLabel : 'email',
		    	   	id : "email",
		    	   	name : "email", 
					allowBlank : true,
				    maxLength : 25,
		    	    maxLengthText : '最多可输入25个字，请重新输入！',
					anchor : '95%'
		       }  ,  {
		    	   	fieldLabel : '邮编',
		    	   	id : "zipCode",
		    	   	name : "zipCode", 
					allowBlank : true,
				    maxLength : 25,
		    	    maxLengthText : '最多可输入25个字，请重新输入！',
					anchor : '95%'
		       } 
//		       ,  {
//		    	   	fieldLabel : '许可证编号',
//		    	   	id : "license",
//		    	   	name : "license", 
//					allowBlank : true,
//				    maxLength : 25,
//		    	    maxLengthText : '最多可输入25个字，请重新输入！',
//					anchor : '95%'
//		       }  ,  {
//		    	   	fieldLabel : '许可证时间',
//		    	   	id : "licenseTime",
//		    	   	name : "licenseTime", 
//					allowBlank : false,
//				  	invalidText : '成立时间输入格式为Y-m-d',
//	   				 xtype : 'datefield', 
//					format : 'Y-m-d',
//					anchor : '95%'
//		       } ,  {
//		    	   	fieldLabel : '期限',
//		    	   	id : "deadLine",
//		    	   	name : "deadLine", 
//					allowBlank : false,
//				    maxLength : 25,
//		    	    maxLengthText : '最多可输入25个字，请重新输入！',
//					anchor : '95%'
//		       },  {
//		    	   	fieldLabel : '内容',
//		    	   	id : "content",
//		    	   	name : "content", 
//					allowBlank : false,
//				  	xtype:'textarea',
//					height : 50,
//					allowBlank : true,
//					maxLength : 100,
//			    	maxLengthText : '最多可输入100个字，请重新输入！',
//					anchor : '95%'
//		       },  {
//		    	   	fieldLabel : '保密资格证号',
//		    	   	id : "secrecyLicense",
//		    	   	name : "secrecyLicense", 
//					allowBlank : false,
//				    maxLength : 25,
//		    	    maxLengthText : '最多可输入25个字，请重新输入！',
//					anchor : '95%'
//		       },  {
//		    	   	fieldLabel : '武器装备生产资格证号',
//		    	   	id : "produceLicense",
//		    	   	name : "produceLicense", 
//					allowBlank : false,
//				 	 maxLength : 25,
//		    	    maxLengthText : '最多可输入25个字，请重新输入！',
//					anchor : '95%'
//		       } 
		       ,  {
		    	   	fieldLabel : '企业法人',
		    	   	id : "egal",
		    	   	name : "egal", 
					allowBlank : true,
				    maxLength : 50,
		    	    maxLengthText : '最多可输入50个字，请重新输入！',
					anchor : '95%'
		       }   ,  {
		    	   	fieldLabel : '成立时间',
		    	   	id : "setUpDate",
		    	   	name : "setUpDate", 
					allowBlank : true, 
					anchor : '95%',
					invalidText : '成立时间输入格式为Y-m-d',
	   				 xtype : 'datefield', 
					format : 'Y-m-d'
		       }   ,  {
		    	   	fieldLabel : '注册资本',
		    	   	id : "registeredCapital",
		    	   	name : "registeredCapital", 
					allowBlank : true, 
					anchor : '95%', 
	   				 xtype : 'numberfield' 
		       }   ,  {
		    	   	fieldLabel : '开户行2',
		    	   	id : "bank2",
		    	   	name : "bank2",  
					anchor : '95%'  
		       }    ,  {
		    	   	fieldLabel : '开户行3',
		    	   	id : "bank2",
		    	   	name : "bank2", 
					anchor : '95%' 
		       }   ,  {
		    	   	fieldLabel : '银行账户2',
		    	   	id : "bank2",
		    	   	name : "bank2", 
					anchor : '95%' 
		       }   ,  {
		    	   	fieldLabel : '银行账户3',
		    	   	id : "bank3",
		    	   	name : "bank3", 
					anchor : '95%' 
		       }     ,  {
		    	   	fieldLabel : '发货地址',
		    	   	id : "deliveryAddress",
		    	   	name : "deliveryAddress", 
					anchor : '95%' 
		       }     ,  {
		    	   	fieldLabel : '供货资格',
		    	   	id : "availability",
		    	   	name : "availability", 
					anchor : '95%' 
		       }     ,  {
		    	   	fieldLabel : '评审意见',
		    	   	id : "trial_comment",
		    	   	name : "trial_comment", 
					anchor : '95%' 
		       }       ,  {
		    	   	fieldLabel : '規模',
		    	   	id : "scale",
		    	   	name : "scale", 
					anchor : '95%' 
		       }, {
		    	   	fieldLabel : '备注',
		    	   	id : "remark",
		    	   	name : "remark",
					xtype:'textarea',
					height : 50,
					allowBlank : true,
					maxLength : 100,
			    	maxLengthText : '最多可输入100个字，请重新输入！',
					anchor : '95%'
		       }     ,  {
		    	   
		    	   	id : "trial_comment",
		    	   	name : "trial_comment", 
					hidden : true 
		       } ,  { 
		    	   	id : "create_date",
		    	   	name : "create_date", 
					hidden : true 
		       } ,  {
		    	   	id : "trial_status",
		    	   	name : "trial_status", 
					hidden : true 
		       } ,  {
		    	   	id : "evaluation_status",
		    	   	name : "evaluation_status", 
					hidden : true 
		       } ,  {
		    	   	id : "creater",
		    	   	name : "creater", 
					hidden : true 
		       } 
			];
	
	var inform = new Ext.FormPanel({
		id : 'vendorFrom',
		buttonAlign : 'center',
		labelAlign : 'left',
		labelWidth : 80,
		padding : 5,
		autoScroll : true,
		defaultType: 'textfield',
		items : items
	});
	if(rd){
		inform.getForm().loadRecord(rd);
	}
	var buttons = [{
		text : ' 确定 ',
		handler : function(){
			//判断“所属行业”是否有值
			if(Ext.getCmp('sector').getValue() == null || Ext.getCmp('sector').getValue() == ''
//				||Ext.getCmp('type').getValue()== null || Ext.getCmp('type').getValue()==''
				){
				Ext.Msg.alert('提示','“所属行业”为必填。');
			}else{
//				if(inform.form.isValid()) {
//					inform.form.doAction('submit',{
//						waitMsg:'正在保存数据，请稍候...',
//						waitTitle:'提示',
//						url : '../JSON/vendor_VendorRemote.saveVendor',
//						method : 'post',
//						success : function(form, action) {
//							Ext.Msg.alert('提示','保存数据成功！');
//							form.reset();
//							window.close();
//							if(vendorTree.selectedMC != null && vendorTree.selectedMC != ''){
//								vendorTree.clickCallBack(vendorTree.selectedMC);
//							}else{
//								Ext.getCmp('vendorGridPanelId').getStore().reload();
//							}						
//						},
//						failure : function(form, action){
//							Ext.Msg.alert('提示','保存数据失败,供应商编号或供应商名称重复');
//						}
//					})
//				}
				if(inform.form.isValid()) {
					inform.form.doAction('submit',{
						waitMsg:'正在保存数据，请稍候...',
						waitTitle:'提示',
						url : '../JSON/vendor_VendorRemote.saveVendor',
						method : 'post',
						success : function(form, action) {
							Ext.Msg.alert('提示','保存数据成功！');
							form.reset();
							window.close();
							var grid = Ext.getCmp('venderRegisterGridPanelId'); 
							grid.store.baseParams = {start :0 ,limit : 20};
							grid.store.load();				
						},
						failure : function(form, action){
							Ext.Msg.alert('提示','保存数据失败,供应商编号或供应商名称重复');
						}
					})
				}
		}		
	}}, {
		text : '取消',
		handler : function() {
			inform.getForm().reset();
			window.close();
		}
	}]
	
	if(rd!=null){
		if(rd.get('kind')==1){
			Ext.getCmp('vendorkind').setValue('kind2',true);
		}else{
			Ext.getCmp('vendorkind').setValue('kind1',true);
		}
	
	}
	
	var window = new Ext.Window({
		id : "vendorAddWind",
		width : 500,
		height : 300,
		layout : 'fit',
		title : '&nbsp;供应商-新增',
		modal : true,
		items : inform,
		buttons : buttons
	});
	return window;
	
}
vendorForm.getDate = function(date, adddaycount) {
	date.setDate(date.getDate() + adddaycount);
	return date;
};