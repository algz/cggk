HITBCombox = Ext.extend(Ext.form.ComboBox, {   
     border		: false,
     triggerAction	: 'all',
     valueField		: 'code',
     displayField	: 'name',
     mode		: 'remote',
     initComponent	: function() {
        Ext.apply(this, {
            store   : new Ext.data.Store({
	           	proxy	  : new Ext.data.HttpProxy({
					method	: 'GET',
					url	: this.dataurl+'.json'
			}),
	            	reader	  : new Ext.data.JsonReader({
					id	: "code",
					root	: "root"
				  },
				  new Ext.data.Record.create([{name: 'code'},{name: 'name'}])
			),
	            	listeners : {
				load : function(){ }
			},
			autoLoad 	: true,
			remoteStore	:true
     	   })
  	}
      );
       HITBCombox.superclass.initComponent.apply(this, arguments);
    },
    onRender		: function() {
        this.store.load();
        HITBCombox.superclass.onRender.apply(this, arguments);
    }
});

Ext.reg('HITBCombox', HITBCombox);






Dict = Ext.data.Record.create([{name: 'code'},	{name: 'name'}]);
 
HITBCheckBox = Ext.extend(Ext.form.TriggerField,  {

	/**初始化方法，调用父类方法初始化,设置readOnly为TRUE
	 *  init
	 */
    initComponent : function(){       
    },

    /**当单击图标的时候触发该函数，显示一个HITBChexkboxWindow窗口。
     * @method onTriggerClick
     * Implements the default empty TriggerField.onTriggerClick function to display the Search Window
     */
    onTriggerClick : function(){
        if(this.disabled){
            return;
        }
        if(this.id==null){
        	alert('id'+getResource("20111205_param_3822")/* 属性没有设定 请设定 */+'!');
        	return;
        }
        if(this.searchUrl==null){
        	alert('searchUrl'+getResource("20111205_param_3823")/* 属性没有设定 请设定 */+'!');
        	return;
        }
        if(this.wtitle==null){
        	alert('wtitle'+getResource("20111205_param_3824")/* 属性没有设定 /* 请设定 */+'!');
        	return;
        }
        if(this.pcolnum==null){
        	alert('pcolnum'+getResource("20111205_param_3825")/* 属性没有设定 /* 请设定 */+'!');
        	return;
        }
    	var listwindow = new HITBChexkboxWindow({
    		parentID 	: this.id,
    		pListUrl	: 'dict/'+this.searchUrl,
    		pcolnum		: this.pcolnum,
		title		: this.wtitle,
		keyshow		: this.keyshow,
		width		: 357,
		autoScroll 	: true,
		plain		: true,
		bodyStyle	: 'padding:5px;',
		buttonAlign	: 'right'
		});
    }
});

//注册hitbcheckbox名称，用来在item组件中定义使用
Ext.reg('hitbcheckbox', HITBCheckBox);



 
HITBChexkboxWindow = Ext.extend(Ext.Window, {
	
	//存储控件的初始值
	oldValue		:'',
	 modal          	: true,
	initComponent 		: function(){
		
			HITBChexkboxWindow.superclass.initComponent.call(this);
			
			this.width= 550;
			this.plain=true;
			this.autoScroll = true;
			this.bodyStyle='padding:5px 0px 0px 12px;';
			this.buttonAlign='center';
			
			//初始化控件初始值
			if(document.getElementById(this.parentID)){
				if(document.getElementById(this.parentID).value.length>0){
					oldValue=document.getElementById(this.parentID).value;
				}else{
					oldValue='null';
				}
			}else{
				oldValue='null';
			}
			//checkbox数组
			var arycheck=new Array();
			//设置访问json文件对象
		   	var dictProxy = new Ext.data.HttpProxy({
				url	: this.pListUrl,
				method	: 'GET'
			});
				
			//存储json文件内容对象
			var dictstore = new Ext.data.Store({
				proxy	  : dictProxy,
				reader	  : new Ext.data.JsonReader({
						id	: 'code',
						root	: 'root'
				},Dict),
				autoLoad  : true 
			});
			
			//当加载json文件时，调用LoadedData方法
			dictstore.on('load',LoadedData, this, true);
			
			//初始化FormPanel
			var formPanel = new Ext.form.FormPanel({
				region      : 'center',
				bodyStyle   : ' background-color: #DFE8F6',
				width       : 520,
				buttonAlign : 'right',
				method	    :'POST',
				layout      : 'column',
				bbar: [{
					 text	   : ''+getResource("20111205_param_3826")/* 全选 */+'',
					 handler   : function(){
					   	for(var m=0;m<arycheck.length;m++){
					   	      arycheck[m].setValue(true);
						}
					 }
				      },{
					   text	   : ''+getResource("20111205_param_3827")/* 清空 */+'',
					   handler : function(){
					   	for(var m=0;m<arycheck.length;m++){
					   	      arycheck[m].setValue(false);
						}
					   }
				      },{
					   text	   : ''+getResource("20111205_param_3828")/* 取消 */+'',
					   handler : function(){
					   	this.findParentByType('HITBChexkboxWindow').close();
					   }
				      },{
					   text    : ''+getResource("20111205_param_3829")/* 确定 */+'',
					   //把checkbox组件的值拼成用‘,’分割的串，赋给控件.
					   handler : function(){
						 var dictcode='';
						 for(var j=0;j<arycheck.length;j++){
						      if(arycheck[j].checked==true){
							   if(dictcode==''){
								dictcode = arycheck[j].getName();			
							   }else{
								dictcode = dictcode+","+arycheck[j].getName();
							   }
							}
						 }
							//单独使用窗体时，需要配置rootObj，rootElName参数，把选中的checkbox值赋值给rootObj的rootElName属性
						 if(document.getElementById(this.findParentByType('HITBChexkboxWindow').parentID)){
							document.getElementById(this.findParentByType('HITBChexkboxWindow').parentID).value=dictcode;
						 }else{
							this.findParentByType('HITBChexkboxWindow').rootObj[this.findParentByType('HITBChexkboxWindow').rootElName]=dictcode;
						 }
					     	this.findParentByType('HITBChexkboxWindow').close();
					     }
					}]
		  	});
		  	
	function LoadedData(){
		//根据checkbox的数量设定formPanel的高度
		var chboxheight = (dictstore.getCount()/this.pcolnum)*16.5;
		formPanel.getForm().height=chboxheight;
		//根据formPanel的高度设定window的高度,最大高度为500
		if(chboxheight+127<530){
		     this.height = chboxheight+127;
		}else{
		     this.height = 530;
		}
		//根据store的内容，构建checkbox，并加载到formpanel中。
		for (var i = 0; i < dictstore.getCount(); i++) {
		    var rec  = dictstore.getAt(i);
		    var code = rec.get("code");
		    var name = rec.get("name");	
		    var checkb;
		    if(this.keyshow){
		        checkb = new  Ext.form.Checkbox({
				 boxLabel   : code+'-'+name,
				 name       : code,
				 width		: (formPanel.width-15)/this.pcolnum
		        });
		    } else {
		        checkb = new  Ext.form.Checkbox({
				 boxLabel   : name,
				 name       : code,
				 width	    : (formPanel.width-15)/this.pcolnum
		        });
		   }
		    //获取上次组件的值，并把该值赋给checkbox的value
		    if(oldValue!='null'){
			  var aryOldvalue=oldValue.split(',');
			  for(var k=0;k<aryOldvalue.length;k++){
			     if(checkb.name==aryOldvalue[k]){
				checkb.checked =true;
			     }
			  }
		    }
		    arycheck[i]=checkb;
		    formPanel.add(arycheck[i]);
		}
		//formpanel加载到window中
		this.add(formPanel);
		//window展示
		this.show();
	  }
      },
      //渲染，调用父类方法
     onRender : function(ct, position){
     HITBChexkboxWindow.superclass.onRender.call(this, ct, position);
   }
});
//注册
Ext.reg('HITBChexkboxWindow', HITBChexkboxWindow);



function handleInfoObj(fieldsetObj,title,smessage){
	var message='';
	for(var i =0;i<smessage.length;i++){
			message=message+'<br>'+smessage[i].content;
	}
	fieldsetObj.title=title;
	fieldsetObj.xtype='fieldset';
	fieldsetObj.autoWidth=true;
	fieldsetObj.autoHeight=true;
	fieldsetObj.html=message;
}

function handleMessage(smessage){
	var remessage='';
	for(var i =0;i<smessage.length;i++){
		remessage=remessage+smessage[i].content+';';
	}
	return remessage;
}


function parseAlertInfo(datas,obj,submitflag,formObj){
				var wfieldset = new Array();
				var count =0 ;
				//解析 error信息
				//alert(Ext.decode(datas));
				if(Ext.decode(datas).root.msg.Error){
					wfieldset[count]=new Object();
					handleInfoObj(wfieldset[count],''+getResource("20111205_param_3830")/* 错误信息 */+'',Ext.decode(datas).root.msg.Error);
					count++;
				}
				
				//解析 warn信息
				if(Ext.decode(datas).root.msg.Warn){
					wfieldset[count]=new Object();
					handleInfoObj(wfieldset[count],''+getResource("20111205_param_3831")/* 警告信息 */+'',Ext.decode(datas).root.msg.Warn);
					count++;
				}
				
				//解析 normal信息
				if(Ext.decode(datas).root.msg.Info){	
				    wfieldset[count]=new Object();
					handleInfoObj(wfieldset[count],''+getResource("20111205_param_3832")/* 提示信息 */+'',Ext.decode(datas).root.msg.Info);
					count++;
				}
				
				
				var arywbutton ;
				//如果是警告或者正常信息调用回调函数
				var sflag = Ext.decode(datas).flag;
				if( sflag =='Error' ){
					 arywbutton = [{
			           text: ''+getResource("20111205_param_3833")/* 关闭 */+'',
			           type:'button',
			           handler: function()
			           {
			           		awindow.close();
			           }
				      }];
				}
				
				if( sflag =='Warn' ){
					arywbutton = [{
				           text: ''+getResource("20111205_param_3834")/* 继续 */+'',
				           type:'button',
				           handler: function()
				           {
				           		obj.params.ignoreWarn = true;
				           		
				           		if(submitflag =='RSubmit'){
				           			HITBAjax.request(obj);
				           		}
				           		
				           		if(submitflag =='FSubmit'){
				           			//alert(Ext.encode(obj));
				           			//alert(formObj.id);
				           			//var bf=new Ext.form.BasicForm(formObj.id,formObj);
				           			//bf.submit(obj);
				           			 Ext.getCmp(formObj.id).getForm().submit(obj);
													           			
				           		}
				           		//obj.successCallBack=null;
				           		awindow.close();
				           }
				       }
				       ,{
				           text: ''+getResource("20111205_param_3835")/* 取消 */+'',
				           type:'button',
				           handler: function()
				           {
				           		obj.successCallBack=null;
				           		awindow.close();
				           }
				       }
				       ];
								
				}
				
				if( sflag =='Info' ){
						
					arywbutton = [{
			           text: ''+getResource("20111205_param_3836")/* 确定 */+'',
			           type:'button',
			           id:'login',
			           handler: function()
			           {
			           		if(obj.successCallBack){
								Ext.callback(obj.successCallBack,this,[datas]);
								obj.successCallBack=null;
							}
			           		awindow.close();
			           }
				     }];		
				}
				
				var msgCount = Ext.decode(datas).msgCount;
				
				var countHeight = msgCount*30;
				
				var winHeight = 0;
				
				if(countHeight<200){
					winHeight=200;
				}else{
					if(countHeight>500){
						winHeight=500;
					}else{
						winHeight=countHeight;
					}
				}
				
				
				//建立显示window
				var awindow = new Ext.Window({
						title: '',
						width: 500,
						height:winHeight,
						layout: 'fit',
						plain:true,
						autoScroll : true,
						bodyStyle:'padding:5px;',
						resizable:false,
						//maximizable: true, 
                	    //minimizable : true,
						//html :emessage+'<br>'+wmessage+'<br>'+nmessage,
						items: wfieldset,
						buttons: arywbutton
				});
				
				
				var datastatus = Ext.getCmp('data-status');
				if(datastatus &&  sflag =='Info' ){
					if(Ext.decode(datas).root.msg.Info){
					 datastatus.setStatus({
												iconCls: 'x-status-tip',
												text: handleMessage(Ext.decode(datas).root.msg.Info)
										});
					}
					
					if(obj.successCallBack){
								Ext.callback(obj.successCallBack, this, [datas]);
								obj.successCallBack=null;
					}
				}else{
					//显示window
					awindow.show(); 
				
				}
				
				
				awindow.on('beforeclose',function(){
					if( sflag =='Info' ){
						if(obj.successCallBack){
								Ext.callback(obj.successCallBack, this, [datas]);
						}
					}
				},this,awindow);
				
				//隐藏MessageBox，进度条
				Ext.MessageBox.hide();
}




	
 
 
HITBAjax = new Ext.data.Connection({
    
    request : function(o){
    	if(o.params){
    		  if(!o.params.ignoreWarn){
    		 	  	o.params.ignoreWarn= false;
    		  }
    	}else{
    		 o.params=new Object();
    		 o.params.ignoreWarn = false;
    	}
     
      //Ext.decode(o.params).ignoreWarn = false;
      Ext.Ajax.request({
			url : o.url, 
			method: o.method,
			params:o.params, 
			scope: o.scope,
			isUpload: o.isUpload,
			form: o.form,
			headers: o.headers,
			disableCaching: o.disableCaching , 
			callback: function(options,success,resp){
				parseAlertInfo(resp.responseText,o,'RSubmit','');
			}
	  });
    }
});










 

HITBFormPanel = function (config) {
	HITBFormPanel.superclass.constructor.call(this, config);
};
Ext.extend(HITBFormPanel,Ext.FormPanel, {
        createForm: function(){
	        delete this.initialConfig.listeners;
	        return new HITBBasicForm(null, this.initialConfig);
    	}
});
Ext.reg('HITBForm',HITBFormPanel);



HITBBasicForm = function (config,initiConfig) {
	this.initiConfig=initiConfig;
	HITBBasicForm.superclass.constructor.call(this, config);
};
Ext.extend(HITBBasicForm,Ext.form.BasicForm, {
	
	formConfig :'',
	
    submit : function(options){
    		formConfig=this.initiConfig;
    		
    		if(options.params){
    		 	  if(!options.params.ignoreWarn){
    		 	  	options.params.ignoreWarn= false;
    		 	  }
	    	}else{
	    		 options.params=new Object();
	    		 options.params.ignoreWarn = false;
	    	}
	    	
    		options.success=function(form, action){
    			parseAlertInfo(Ext.encode(action.result),options,'FSubmit',formConfig);
    		};
    		options.failure= function(form, action){
    			parseAlertInfo(Ext.encode(action.result),options,'FSubmit',formConfig);
			};
    	return HITBBasicForm.superclass.submit.call(this,options);
    }
});






Ext.namespace('HITB.form'); 

HITB.form.MobileField = Ext.extend(Ext.form.TextField, {
	
	// 验证手机号码的正则表达式
	regex 	: /^(13[0-9]|15[0|3|6|7|8|9]|18[8|9])\d{8}$/,
	
	// 当不符合规则时在页面上呈现的错误信息
	regexText : ""+getResource("20111205_param_3837")/* 不是有效的手机号码！ */+"",
	
	// 只允许输入数字
	baseChars : "0123456789",

	//初始事件:允许Field输入数字
	initEvents : function() {
		Ext.form.NumberField.superclass.initEvents.call(this);
		var allowed = this.baseChars + '';
		var keyPress = function(e) {
			var k = e.getKey();
			if (!Ext.isIE&& (e.isSpecialKey() || k == e.BACKSPACE || k == e.DELETE)) {
				return;
			}
			var c = e.getCharCode();
			if (allowed.indexOf(String.fromCharCode(c)) === -1) {
				e.stopEvent();
			}
		};
		this.el.on("keypress", keyPress, this);
	}
});
Ext.reg('mobiletel', HITB.form.MobileField);





HITB.form.PostCodeField = Ext.extend(Ext.form.TextField, {
	
	// 验证邮政编码的正则表达式
	regex : /[1-9]\d{5}/,
	
	// 当不符合邮政编码的正则表达式在页面上呈现的错误信息
	regexText : ""+getResource("20111205_param_3838")/* 不是有效的邮政编码！ */+"",
	
	// 只允许输入数字
	baseChars : "0123456789",

	//初始事件:允许Field输入数字
	initEvents : function(value) {
		Ext.form.NumberField.superclass.initEvents.call(this);
		var allowed = this.baseChars + '';
		var keyPress = function(e) {
			var k = e.getKey();
			if (!Ext.isIE
					&& (e.isSpecialKey() || k == e.BACKSPACE || k == e.DELETE)) {
				return;
			}
			var c = e.getCharCode();
            
			if (allowed.indexOf(String.fromCharCode(c)) === -1) {
				e.stopEvent();
			}
		};
		this.el.on("keypress", keyPress, this);
	},
	//验证方法
	validateValue : function(value){
        if(value.length < 1 || value === this.emptyText){ // if it's blank
             if(this.allowBlank){
                 this.clearInvalid();
                 return true;
             }else{
                 this.markInvalid(this.blankText);
                 return false;
             }
        }
       if(value.length > 6){
            this.markInvalid(this.regexText);
            return false;
        }
        if(this.vtype){
            var vt = Ext.form.VTypes;
            if(!vt[this.vtype](value, this)){
                this.markInvalid(this.vtypeText || vt[this.vtype +'Text']);
                return false;
            }
        }
        if(typeof this.validator == "function"){
            var msg = this.validator(value);
            if(msg !== true){
                this.markInvalid(msg);
                return false;
            }
        }
        if(this.regex && !this.regex.test(value)){
            this.markInvalid(this.regexText);
            return false;
        }
        return true;
        
    }
  
});
Ext.reg('post', HITB.form.PostCodeField);



HITB.form.TeleField = Ext.extend(Ext.form.TextField, {
	
	// 验证电话号码的正则表达式
	regex : /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/,
	
	// 当不符合电话号码的正则表达式在页面上呈现的错误信息
	regexText : ""+getResource("20111205_param_3839")/* 不是有效的电话号码！ */+"",
	
	// 只允许输入数字
	baseChars : "0123456789",

	// 初始事件:允许Field输入数字和"-"
	initEvents : function() {
		Ext.form.NumberField.superclass.initEvents.call(this);
		var allowed = this.baseChars + '';
		allowed += "-";

		var keyPress = function(e) {
			var k = e.getKey();
			if (!Ext.isIE
					&& (e.isSpecialKey() || k == e.BACKSPACE || k == e.DELETE)) {
				return;
			}
			var c = e.getCharCode();

			if (allowed.indexOf(String.fromCharCode(c)) === -1) {
				e.stopEvent();
			}
		};
		this.el.on("keypress", keyPress, this);
	}
});
Ext.reg('tel', HITB.form.TeleField);



HITB.form.Email = Ext.extend(Ext.form.TextField, {
	
	// 验证电话号码的正则表达式
	regex :  /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
	
	regexText : ""+getResource("20111205_param_3840")/* 不是有效的 /* 地址！ */+"" 
});

Ext.reg('email', HITB.form.Email);








