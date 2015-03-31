var materialForm = {};
materialForm.getForm = function(rd) {//添加物资信息页面

   //量纲(单位)选择的下拉列表
   var getAddDropDownListDemension = function(){
        //加载下拉列表数据
        var proxy = new Ext.data.HttpProxy({
                url : "../JSON/material_MaterialRemote.getSelectStringDemensionList",
                method:'POST'
        });
        var reader = new Ext.data.JsonReader({
            root : 'results'
        },[{name : 'demension'}]);
        
        var dstore = new Ext.data.Store({
                proxy : proxy,
                reader : reader
        });
        dstore.load();
        
        var dropDownListComboBox = new Ext.form.ComboBox({
                id : "demensionId",
                fieldLabel: "<font color=red>*</font>量纲(单位)",
                store : dstore,
                name : 'demension', //可以隐藏一个字段,后台查询出来的
                //valueField: "equipmentname",
                displayField: "demension",
                mode: "local",
//                selectOnFocus:true,
                allowBlank : false,
                disabled : false,
               // forceSelection : true,
                //editable : false,
                triggerAction : 'all',
                //emptyText : '--请选择大类--',
                labelStyle : 'padding:5px 0px 5px 0px',
                value:"EA",
                anchor:'98%',
                listeners:{
			            select:{
			                fn:function(combo,record,index){
			                	
			                }
			            }
        		}
        
        });
        return dropDownListComboBox;
   };
   
  
  //级联下拉列表第二列   开始
  //加载下拉列表数据  其余参数在级联下拉列表第一列的选择事件触发后赋予
  var dstore2 = new Ext.data.Store();
  //级联下拉列表第二列   结束
	
	
  //级联下拉列表第一列
  //获取 下拉列表的 ComboBox 
  var getAddDropDownListClass = function(){
        var strurl = "../JSON/material_MaterialRemote.getSelectStringClassList";
        
        //加载下拉列表数据
        var proxy = new Ext.data.HttpProxy({
                url:strurl,
                method:'POST'
        });

        var reader = new Ext.data.JsonReader({
            root : 'results'
        },[{name : 'materialClass'}]);
        
        var dstore = new Ext.data.Store({
                proxy: proxy,
                reader: reader
        });
        dstore.load();
        
        var dropDownListComboBox = new Ext.form.ComboBox({
                id : "materialClass",
                fieldLabel: "<font color=red>*</font>物料大类",
                store: dstore,
                //hiddenName : 'produceId', 可以隐藏一个字段,后台查询出来的
                //valueField: "equipmentname",
                displayField: "materialClass",
                mode: "local",
                selectOnFocus:true,
                allowBlank : false,
                disabled : false,
                forceSelection : true,
                editable : false,
                triggerAction : 'all',
                //emptyText : '--请选择大类--',
                labelStyle : 'padding:5px 0px 5px 0px',
                anchor:'98%',
                listeners:{
			            select:{
			                fn:function(combo,record,index) {
			                    //alert(record.get('materialClass'));
			                    //alert(index);
			                	Ext.getCmp("materialKind").clearValue();//可以实现当队下拉值变更时，清空之前井号下拉选项中的值
			                	var inParameter = encodeURIComponent(encodeURIComponent(combo.value));
			                	dstore2.proxy = new Ext.data.HttpProxy({
			                		  url: '../JSON/material_MaterialRemote.getSelectStringKindList?materialKind=' + inParameter ,
			                		  method:'POST'
			                	}); //根据队下拉选项的改变，动态取出对应的井
			                	
			                	dstore2.reader = new Ext.data.JsonReader({
									root : 'results'
								},[{name : 'materialKind'}]);
			                	
			                	
           						dstore2.load(); //加载井下拉框的store     	
			                    //var getClassName = record.get('materialClass');
			                   
			               }
			            }
        		}
        
        });
        return dropDownListComboBox;
   };
	
	
	
   
   
   
   
    //级联的小类
    var getAddDropDownListKind = function(){
    	var dropDownListComboBox2 = new Ext.form.ComboBox({
                id : "materialKind",
                fieldLabel: "<font color=red>*</font>物料小类",
                store: dstore2,
                //hiddenName : 'produceId', 可以隐藏一个字段,后台查询出来的
                //valueField: "equipmentname",
                displayField: "materialKind",
                mode: "local",
                selectOnFocus:true,
                allowBlank : false,
                disabled : false,
                forceSelection : true,
                editable : false,
                triggerAction : 'all',
                //emptyText : '--请选择大类--',
                labelStyle : 'padding:5px 0px 5px 0px',
                anchor:'98%'
        });
        return dropDownListComboBox2;
   };
   
   
	
	
	////////////////////////////////////////新增选择审批人/////////////////////
var pingFenBtn = {
	text : '选择审批人',	
	iconCls : 'add1',
	handler : function(){
		//userMultiselect.init(selectUserPanel.callBack);//调用回调函数
	}
}

//调用回调函数
selectUserPanel.callBack = function(){
	var dataStore = userMultiselect.usersore;
	//var store = Ext.getCmp('pingFenGrid').getStore();
	var outApprover = Ext.getCmp('approver');
	var records = Ext.data.Record.create([
	    {name:'loginname'},
	    {name:'truename'}
	]);
	
	if(dataStore.getCount()>1){
		Ext.MessageBox.show( {
                        title : "提示",
                        msg : "请只选择一个用户!!!",
                        buttons : Ext.MessageBox.OK,
                        icon : Ext.MessageBox.INFO,
                        maxWidth : 800, 
                        minWidth : 300 
   		});
   		return;
	}
	
	
	//只会有一个循环
	for (i = 0; i < dataStore.getCount(); i++){
		var userid = dataStore.getAt(i).get('loginname');
		var truename = dataStore.getAt(i).get('truename');
        //var record = dataStore.getAt(i);
		var data = new records({
			userid:userid,
			truename:truename
		});
        //records.set('userid',userid);
        //records.set('truename',truename);
		//store.add(data);
		outApprover.setValue(truename+"["+userid+"]");
	}
	Ext.getCmp('userMultiselectWindow').close();
}
////////////////////////////////////////新增选择审批人/////////////////////

	
	
	var items = [{//第一行  
            layout:"column",  
            items:[{
		                columnWidth:.5,//第一列  
		                layout:"form",
		                labelWidth:80,
		                items:[{
		                	xtype : 'hidden',
					    	name : 'materialid'
	                    }]
            		},
            		{
		                columnWidth:.5,//第二列  
		                layout:"form", 
		                labelWidth:80,
		                items:[
		                {  
		                	xtype : 'hidden',
							name : 'parentId',
							value : materialTree.parentId
	                    }
	                    ]  
            	    }
            	   ]},
            	   
            	   
            	   {//第二行  
		            layout:"column",  
		            items:[{  
		                columnWidth:.5,//第一列  
		                layout:"form",
		                labelWidth:80,
		                items:[{  
		                    xtype:"textfield",
		                    fieldLabel : '<font color=red></font>物资编码',
							id : "materialitemcode",
							maxLength : 50,
							maxLengthText : '最多可输入25个字，请重新输入！',
							allowBlank : false,
							anchor : '98%',
							disabled : true
	                    }]  
            		},
            		{  
		                columnWidth:.5,//第二列  
		                layout:"form", 
		                labelWidth:80,
		                items:[{  
	                    	xtype:"textfield",
	                    	fieldLabel : '物资牌号',
							id : 'desingnation',
							blankText : 'this field is required',
							allowBlank : true,
							anchor : '98%'
	                    }]  
            	    }
            	    ]}, //第二行结束  
            	    
            	    
            	    {//第三行  
		            layout:"column",  
		            items:[{  
		                columnWidth:.5,//第一列  
		                layout:"form",
		                labelWidth:80,
		                items:[{  
		                    xtype:"textfield",
		                    fieldLabel : '<font color=red>*</font>物资名称',
							id : "materialItemName",
							maxLength : 50,
							maxLengthText : '最多可输入50个字，请重新输入！',
							allowBlank : false,
							anchor : '98%'
	                    }]  
            		},
            		{  
		                columnWidth:.5,//第二列  
		                layout:"form", 
		                labelWidth:80,
		                items:[/*{  
	                    	xtype:"textfield",
	                    	fieldLabel : '量纲',
							id : 'demension',
							blankText : 'this field is required',
							allowBlank : true,
							anchor : '98%'
	                    }*/
	                    getAddDropDownListDemension()
	                    ]  
            	    }
            	    ]}, //第三行结束 
            	    
            	    
            	    {//第四行  
		            layout:"column",  
		            items:[{  
		                columnWidth:.5,//第一列  
		                layout:"form",
		                labelWidth:80,
		                items:[{  
		                    xtype:"textfield",
		                    fieldLabel : '物资规格',
							id : 'materialStandard',
							maxLength : 50,
							maxLengthText : '最多可输入50个字，请重新输入！',
							allowBlank : true,
							anchor : '98%'
	                    }]  
            		},
            		{  
		                columnWidth:.5,//第二列  
		                layout:"form", 
		                labelWidth:80,
		                items:[{  
	                    	xtype:"textfield",
	                    	fieldLabel : '技术条件',
							id : 'technicCondition',
							maxLength : 50,
							maxLengthText : '最多可输入50个字，请重新输入！',
							allowBlank : true,
							anchor : '98%'
	                    }]  
            	    }
            	    ]}, //第四行结束
            	    
            	    
            	    {//第五行  
		            layout:"column",  
		            items:[{  
		                columnWidth:.5,//第一列  
		                layout:"form",
		                labelWidth:80,
		                items:[{  
		                    xtype:"textfield",
		                    fieldLabel : '计划单价',
							id : 'referencePrice',
							xtype : 'numberfield',
							allowNegative : false,
							allowDecimals : true,
							decimalPrecision : 2,
							minValue : 0,
							maxValue : 99999999.99,
							maskRe : /\d/,
							allowBlank : true,
							anchor : '98%'
	                    }]  
            		},
            		{  
		                columnWidth:.5,//第二列  
		                layout:"form", 
		                labelWidth:80,
		                items:[{  
	                    	xtype:"textfield",
	                    	fieldLabel : '保管期',
							id : 'preservePeriod',
							blankText : 'this field is required',
							allowBlank : true,
							anchor : '98%'
	                    }]  
            	    }
            	    ]}, //第五行结束
            	    
            	    
            	    {//第六行  
		            layout:"column",  
		            items:[{  
		                columnWidth:.5,//第一列  
		                layout:"form",
		                labelWidth:80,
		                items:[{  
		                    xtype:"textfield",
		                    fieldLabel : '预警值',
							id : 'warningValue',
							xtype : 'numberfield',
							allowNegative : false,
							allowDecimals : true,
							decimalPrecision : 2,
							minValue : 0,
							maxValue : 999999.9999,
							maskRe : /\d/,
							allowBlank : true,
							anchor : '98%'
	                    }]  
            		},
            		{  
		                columnWidth:.5,//第二列  
		                layout:"form", 
		                labelWidth:80,
		                items:[{  
	                    	xtype:"textfield",
	                    	fieldLabel : '交货状态',
							id : 'deliveryStatus',
							maxLength : 50,
							maxLengthText : '最多可输入50个字，请重新输入！',
							allowBlank : true,
							anchor : '98%'
	                    }]  
            	    }
            	    ]}, //第六行结束
            	    
            	    
            	    {//第七行  
		            layout:"column",  
		            items:[{  
		                columnWidth:.5,//第一列  
		                layout:"form",
		                labelWidth:80,
		                items:[getAddDropDownListClass()]  
            		},
            		{  
		                columnWidth:.5,//第二列  
		                layout:"form", 
		                labelWidth:80,
		                items:[getAddDropDownListKind()]  
            	    }
            	    ]}, //第七行结束
            	    
            	    
            	    {//第八行  
		            layout:"column",  
		            items:[{  
		                columnWidth:.5,//第一列  
		                layout:"form",
		                labelWidth:80,
		                items:[{  
		                    xtype:"textfield",
		                    fieldLabel : '<font color=red>*</font>审批人',
							id : 'approver',
							maxLength : 50,
							maxLengthText : '最多可输入50个字，请重新输入！',
							allowBlank : false,
							anchor : '98%',
							listeners: {
				                        afterrender: function (cmp){
				                            //cmp.on("click",function(){ 这么用没效果！
				                            cmp.el.on("click",function(){
				                        		//alert("fdasfds");
				                            	userMultiselect.init(selectUserPanel.callBack);//调用回调函数
				                       		})
				           				}
				           }
	                    }]
            		},
            		{  
		                columnWidth:.5,//第二列  
		                layout:"form", 
		                labelWidth:80,
		                items:[]  
            	    }
            	    ]}, //第八行结束
            	    
            	    
            	    {//第九行开始  
		            layout:"form",  
		            items:[{  
	                columnWidth:.5,//第一列  
	                layout:"form",
	                labelWidth:80,
	                items:[{
		                	    xtype : 'textarea',
	                    		fieldLabel : '备注',
								id : "remarks",
								height : 60,
								allowBlank : true,
								maxLength : 250,
								maxLengthText : '最多可输入250个字，请重新输入！',
								anchor : '100%'
	                    }]  
            		}
            		]}//第九行结束 
            	    
	];
	
	
	
	
	

	var inform = new Ext.FormPanel( {//添加物资信息页面form
		id : 'materialForm',
		buttonAlign : 'center',
		//labelAlign : 'center',
		labelWidth : 100,
		//padding:5,
		//frame : false,
		frame:true,
        plain:false,
        border:false,
        //defaultType: 'textfield',//column布局时不能设置该属性，否则不能正常显示 });
		//autoScroll:true,  //IE6不支持
		layout:'form',
		items : items
	});
	if (rd) {
		inform.getForm().loadRecord(rd);//在修改操作时,由form展示数据
	}
	var buttons = [
			{
				text : ' 确定 ',
				handler : function() {
					if (inform.form.isValid()) {
						
						inform.form.doAction('submit', {
							waitMsg : '正在保存数据，请稍候...',
							waitTitle : '提示',
							url : '../JSON/material_MaterialRemote.save?d='+ new Date(),
							method : 'post',
							success : function(form, action) {
								Ext.Msg.alert('提示', '保存数据成功！');
								form.reset();
								window.close();
								var grid = Ext.getCmp('materialGridPanelId');
								grid.getStore().baseParams = {//刷新页面，重新加载grid
									startId : materialTree.parentId,
									start : 0,
									limit : 20
								};
								grid.store.load();
							},
							failure : function(form, action){
							   alert(action.result.msg);
							}
							/*failure : function(){
								Ext.Msg.alert('提示', '物资信息已存在，请重新填写！');
							}*/
						})
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
		id : "materialAddWind",
		width : 560,
		height : 330,
		layout : 'fit',
		autoScroll : true,
		title : '&nbsp;物资信息-新增',
		modal : true,
		constrainHeader : true,   //window头必须在窗口中
		//maximizable  : true,  //添加最大按钮
		closeAction:'hide',
		items : inform,
		buttons : buttons
	});
	return window;

}
