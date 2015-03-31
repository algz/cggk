Ext.ns('utils.deviceProjectDateComboxBox2')
/**
 * 获取设备项目时间Combox
 * 
 * @class utils.deviceProjectDateComboxBox
 * @extends Ext.form.ComboBox
 */
utils.deviceProjectDateComboxBox2 = Ext.extend(Ext.form.ComboBox, {
			mode : 'remote',
			pageSize : 10,
			forceSelection : true,
			triggerAction : 'all',
			emptyText : '请选择...',
			resizable : true,// 弹出选择添加缩放按钮
			blankText : '请选择项目日期',
			projectDataType : '1', // 数据获取类型.1实施计划中获取;2执行管理中获取(实施计划状态不为1或2);3合同管理中获取
			valueField : "value",
			displayField : "text",
			initComponent : function() {// 事件绑定不要放在初始时,可以放在扩展时或Renderer中.
				var combo = this;
				var inputType = this.projectDataType;//在没赋值前,获取用户调用此控件的时候传递过来的值 
				
				
				utils.deviceProjectDateComboxBox2.superclass.initComponent.call(this);// 必须放在末尾,否则出错
			},
			'onRender' : function(ct, position){//扩展渲染,在内部函数的顶层,可以使用this对此对象的引用.注意,不要在镶嵌的函数层次太深,不然this就不是此对象,需要sope指定.
             	utils.deviceProjectDateComboxBox2.superclass.onRender.call(this, ct, position);//必须放在开始
             	
             	//不覆盖已有配置
             	Ext.applyIf(this, { // 初始化时赋值属性.当然也可以在外层扩展或构造时赋值.
								'beforequery' : function(qe) {
										delete qe.combo.lastQuery;
									},
								store : new Ext.data.Store({
									proxy : new Ext.data.HttpProxy({
												url : "../JSON/engineeringProject_UtilRemote.getProjectDateData?d="+new Date(),
												method : 'POST'
											}),
									reader : new Ext.data.JsonReader({
												totalProperty : 'totalProperty',
												root : 'results',
												id : 'projectDate'
											}, ['text', 'value']),
									baseParams : {
										projectDataType : this.projectDataType //获取用户调用此控件的时候传递过来的值 
									}
							    })
				});
				
				
        	}
		});
Ext.reg('deviceProjectDateComboxBox2', utils.deviceProjectDateComboxBox2);





Ext.ns('utils.deviceProjectDateComboxBox')
utils.myTextField = Ext.extend(Ext.form.TextField ,{
	id : 'XXX',//占位符而已
	value : '你妹',
	optionType : 1,
	propA : 'google',
	initComponent: function(){
		var textField = this;
		alert(this.propA);
		Ext.apply(this, {
            propA: 'baidu'
        });
		alert(this.propA);
        
		utils.myTextField.superclass.initComponent.call(this);
		
	}
});
Ext.reg('myTextField', utils.myTextField);