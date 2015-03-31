/**
 * by suny 2011-08-17
 * 通过配置
 * enableClearValue：true
 * 增加清除trigger
 * 可以通过监听clearvalue来增加额外的处理
 * 
 * examples like this :
 * {
 *	xtype:'fileuploadfield',
 *	fieldLabel:'上传附件',
 *	allowBlank:false,
 *	name:'myfile',
 *  fullPath: false,//默认为false，只显示文件名称；true时显示全路径
 *	vtype:'fileType',
 *	vtypeText:'上传文件必须是xls,doc,txt,ppt类型文件中的一种!!!',
 *	fileTypes:['xls','doc','txt','ppt'],
 *	enableClearValue:true,
 *	toolTip:true
 *}
 * 
 * 
 */
Ext.ns('Ext.ux.form');
Ext.ux.form.FileUploadField = Ext.extend(Ext.form.TwinTriggerField, {
	
	editable : false,
	
	readOnly : true,
	
	blankText : ''+getResource("20111205_param_3238")/* 请选择要上传的文件 */+'!',
	
	//clear trgger
	trigger1Class : 'x-form-clear-trigger',
	//select trigger
    trigger2Class : 'x-form-file-trigger',
	
	//the hidden <input type='file'/> id
	fileFieldId : null,
	
	//wether show full fath;
	fullPath:false,
	
	//the hidden <input type='file'/> name
	name : null,
	
	fileTypes : [],
	
	fileTypesText : '',
	//toolTip Mixed
	toolTip : null,
	
	//enable show clear trigger
	enableClearValue : true,
	
	//hide trigger1
	hideTrigger1 : true,
	
    initComponent : function(){
        Ext.ux.form.FileUploadField.superclass.initComponent.call(this);
        
		this.fileFieldId=Ext.id();
		if(this.name==null){
		   this.name=Ext.id();
		}
		this.triggerConfig = {
            tag:'span', cls:'x-form-twin-triggers', cn:[
            {tag: "img", id:'triger-clear'+this.fileFieldId, src: Ext.BLANK_IMAGE_URL, style:'visibility:visible',cls: "x-form-trigger " + this.trigger1Class},
            {tag:'span', cls:'ux-cabinet', cn:[
            	{tag: "div", id:'wrap'+this.fileFieldId,cls:"ux-input-file-wrapper",cn: [
                    {tag: "input", name: this.name, cls : 'ux-file',style:'cursor:pointer;',type: "file", id: this.fileFieldId}
                ]},
                {tag: "img", id:"triger-search"+this.fileFieldId, src: Ext.BLANK_IMAGE_URL, cls: "x-form-trigger " + this.trigger2Class}
       		]}
        ]};
		
		if(this.enableClearValue){
			this.onTrigger1Click = this.clearValue;
		}
		
		this.addEvents(
            /**
             * @event fileselected
             * Fires when the underlying file input field's value has changed from the user
             * selecting a new file from the system file selection dialog.
             * @param {Ext.ux.form.FileUploadField} this
             * @param {String} value The file value returned by the underlying file input field
             */
            'fileselected',
			
			/**
             * @event clearvalue
             * Fires when the clear value trigger is clicked
             * @param {Ext.ux.form.FileUploadField}
             * @param {String} the value will be cleared
             */
			'clearvalue'
        );
    },
	
	//override
	onRender : function(ct, position){
		Ext.ux.form.FileUploadField.superclass.onRender.call(this,ct,position);
		this.fileField = Ext.getDom(this.fileFieldId);
		this.fileFieldWrap = Ext.get('wrap' + this.fileFieldId);
		this.initSelectorStyle();
		//init toolTip
		if(this.toolTip){
			this.toolTip = new Ext.ToolTip({
				target:this.getEl(),
				autoHide:true,
				anchor: 'bottom',
				showDelay:100,
				anchorToTarget:true,
				trackMouse: true,
				renderTo: document.body,
				html:'',
				listeners: { 
					scope:this,
					'beforeshow': function(tip) {
						tip.body.dom.innerHTML = this.getValue();
					},
					'show': function(tip){
						if(tip.body.dom.innerHTML.trim() == '' || !this.toolTip){
							tip.hide();
						}
					}
				}
			});
		}
	},
	
	getFileName:function(){
		if(this.fullPath==true){
			
			/*
			 * 如果显示全路径
			 */
			/*
			 * 文件上传时，获取全路径。
			 * 否则 引用程序无法正确启动
			 */
			if(window.navigator.userAgent.indexOf("MSIE")>=1){
				/*
				 * 如果高版本ie无法获取全路径
				 */
//				if(Ext.isIE7||Ext.isIE8){
//					var file=this.fileField;
//					file.select();
//					var path=document.selection.createRange().text;
//					document.selection.empty();
//					return path;
//				}
				return this.fileField.value;
				
				
			}else if(window.navigator.userAgent.indexOf("Firefox")>=1){
//				console.log( this.fileField.value)
//				console.log( this.fileField.files.item(0).fileName)
//				console.log( this.fileField.files.item(0).fileSize)
//				console.log( this.fileField.files.item(0).getAsText('utf-8'))
//				console.log( this.fileField.files.item(0).getAsDataURL())
				try{
					netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
				}catch(e){
					alert(""+getResource("20111205_param_3239","firefox","about:config","signed.applets.codebase_principal_support,true")/* 请在 /* 的地址栏输/* ，然后将 /* 设置为 /* 。 */+"");
				}
				var fname=this.fileField.value;
				var file=Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
				try{
					file.initWithPath(fname.replace(/\//g,'\\\\'));
					return file.path;
				}catch(e){
//					if(e.result!=Component.results.NS_ERROR_FILE_UNRECOGIZED_PATH)throw e;
				}
				return fname;
			}
			return this.fileField.value;
		}else{
			/*
			 * 如果只显示文件名
			 */
			var path=this.fileField.value.replace(/\//g,'\\');
			var index=path.lastIndexOf('\\');
			return 	path.substring(index+1);	
		}
	},
	
	//init events
    initEvents : function(){
		Ext.ux.form.FileUploadField.superclass.initEvents.call(this);
		Ext.get(this.fileField).on('change',function(){
			this.setValue(this.getFileName());
			if(this.fireEvent('fileselected',this,this.fileField.value) !== false && this.enableClearValue){
//				this.triggers[0].show();
			}
		},this);
	},
	
	setValue:function(v){
		Ext.ux.form.FileUploadField.superclass.setValue.call(this,v);
		/*
		 * 设置value时，不为空才显示trigger
		 */
		if(v!=null&&v!=''&&this.enableClearValue){
		   this.triggers[0].show();
		}
	},
	
	//clear value by click clear value trigger
	clearValue : function(){
		var v = this.fileField.value || this.getValue();
		Ext.get(this.fileField).remove();
		this.fileField = Ext.DomHelper.append(this.fileFieldWrap, {
			tag: "input",
			name: this.name,
			type: "file",
			style:'cursor:pointer;',
			cls: "ux-file",
			id: this.fileFieldId
		},false);
		//rebind event on the new fileField
		Ext.get(this.fileField).on('change',function(){
			this.setValue(this.getFileName());
			if(this.fireEvent('fileselected',this,this.fileField.value) !== false && this.enableClearValue){
//				this.triggers[0].show();
			}
		},this);
		this.initSelectorStyle();
		this.setValue('');
		this.triggers[0].hide();
		this.fireEvent('clearvalue', this, v);
    },
	
	validateFileTypes :function(){
    	var filePath = this.fileField.value;
		var currentFilePrefix = filePath.substring(filePath.lastIndexOf('.') + 1);
    	
    },
	
	//override
    reset : function(){
        Ext.ux.form.FileUploadField.superclass.reset.call(this);
        if(this.fileField){
			this.clearValue();
		}
    },
	
	//init the trigger2 style
	initSelectorStyle : function(){
		Ext.get(this.fileField).setOpacity(0);
//		this.fileFieldWrap.alignTo(Ext.get('triger-search' + this.fileFieldId),'tl?');
		this.fileFieldWrap.setXY(Ext.get('triger-search' + this.fileFieldId).getXY());
	},
	
	//prevent trigger hidden when set readOnly = true
    updateEditState: function(){
        if(this.rendered){
            if (this.readOnly) {
                this.el.dom.readOnly = true;
                this.el.addClass('x-trigger-noedit');
                this.mun(this.el, 'click', this.onTriggerClick, this);
            } else {
                if (!this.editable) {
                    this.el.dom.readOnly = true;
                    this.el.addClass('x-trigger-noedit');
                    this.mon(this.el, 'click', this.onTriggerClick, this);
                } else {
                    this.el.dom.readOnly = false;
                    this.el.removeClass('x-trigger-noedit');
                    this.mun(this.el, 'click', this.onTriggerClick, this);
                }
                this.trigger.setDisplayed(!this.hideTrigger);
            }
            this.onResize(this.width || this.wrap.getWidth());
        }
    },
    onTriggerClick:function(){
    },

    // private
    onDestroy: function(){
        Ext.ux.form.FileUploadField.superclass.onDestroy.call(this);
        Ext.destroy(this.fileField, this.fileFieldWrap);
    },
    
    onDisable: function(){
        Ext.ux.form.FileUploadField.superclass.onDisable.call(this);
        this.doDisable(true);
    },
	
	onEnable: function(){
        Ext.ux.form.FileUploadField.superclass.onEnable.call(this);
        this.doDisable(false);

    },
    
    // private
    doDisable: function(disabled){
        this.fileField.disabled = disabled;
    }
});
/**
* customized vtype for validate file types when upload
*
**/
Ext.apply(Ext.form.VTypes, {
    fileType : function(val, field){
    	var filePath = field.fileField.value;
		var currentFilePrefix = filePath.substring(filePath.lastIndexOf('.') + 1);
    	if(field.fileTypes.length > 0 && !Ext.isEmpty(filePath)){
			var temp = [];
			for(var i=0;i<field.fileTypes.length;i++){
				temp[field.fileTypes[i].toLowerCase()] = true;
			}
			if(!temp[currentFilePrefix.toLowerCase()]){
				return false;
			}
    	}
    	return true;
    },
    fileTypeText:''+getResource("20111205_param_3240")/* 上传文件的格式不符合要求 /* 请重新选择后再上传 */+'!'
});

Ext.reg('fileuploadfield', Ext.ux.form.FileUploadField);
Ext.form.FileUploadField = Ext.ux.form.FileUploadField;
