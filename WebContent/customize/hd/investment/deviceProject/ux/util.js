

Ext.ns('utils.deviceProjectDateComboxBox')
/**
 * 获取设备项目时间Combox
 * 
 * @class utils.deviceProjectDateComboxBox
 * @extends Ext.form.ComboBox
 */
utils.deviceProjectDateComboxBox = Ext.extend(Ext.form.ComboBox, {
			mode : 'remote',
			pageSize : 10,
			forceSelection : true,
			triggerAction : 'all',
			emptyText : '请选择...',
			// 弹出选择添加缩放按钮
			resizable : true,
			blankText : '请选择项目日期',
			projectDataType : '1', // 数据获取类型.1实施计划中获取;2执行管理中获取(实施计划状态不为1或2);3合同管理中获取
			valueField : "value",
			displayField : "text",
			comboxBoxURL:"../JSON/untilsRemote.getProjectDateData?d=" + new Date(),
			initComponent : function() {// 事件绑定不要放在初始时,可以放在扩展时或Renderer中.
				var combo = this;
				utils.deviceProjectDateComboxBox.superclass.initComponent.call(this);// 必须放在末尾,否则出错
			},
			onRender : function(ct, position) {// 扩展渲染,在内部函数的顶层,可以使用this对此对象的引用.注意,不要在镶嵌的函数层次太深,不然this就不是此对象,需要sope指定.
				utils.deviceProjectDateComboxBox.superclass.onRender.call(this, ct, position);// 必须放在开始
				Ext.applyIf(this, { // 初始化时赋值属性.当然也可以在外层扩展或构造时赋值.
					beforequery : function(qe) {
						delete qe.combo.lastQuery;
					},
					store : new Ext.data.Store({
								proxy : new Ext.data.HttpProxy({
											url : this.comboxBoxURL,
											method : 'POST'
										}),
								reader : new Ext.data.JsonReader({
											totalProperty : 'totalProperty',
											root : 'results',
											id : 'projectDate'
										}, ['text', 'value']),
								baseParams : {
									projectDataType : this.projectDataType
								}
							})
				})
			}
		})
Ext.reg('deviceProjectDateComboxBox', utils.deviceProjectDateComboxBox);

Ext.ns("utils.deviceProjectComboBox");
/**
 * 获取设备项目编号Combox
 * 
 * @class utils.deviceProjectComboBox
 * @extends Ext.form.ComboBox
 */
utils.deviceProjectComboBox = Ext.extend(Ext.form.ComboBox, {
			fieldLabel : '项目编号',
			mode : 'remote',
			pageSize : 10,
			forceSelection : true,
			triggerAction : 'all',
			emptyText : '请选择...',
			// 弹出选择添加缩放按钮
			resizable : true,
			blankText : '请选择项目编号',
			projectDataType : '1',
			valueField : "projectid",
			displayField : "projectnum",
			comboBoxURL : "../JSON/untilsRemote.getProjectData",
			initComponent : function() {// 事件绑定不要放在初始时,可以放在扩展时或Renderer中.
				var combo = this;
				Ext.applyIf(this, { // 初始化时赋值属性.当然也可以在外层扩展或构造时赋值.
					store : new Ext.data.Store({
								proxy : new Ext.data.HttpProxy({
											url : this.comboBoxURL,
											method : 'POST'
										}),
								reader : new Ext.data.JsonReader({
											totalProperty : 'totalProperty',
											root : 'results',
											id : 'projectid'
										}, ['projectid', 'projectnum', 'projectname', 'implementplanid','headperson','useunit','projectcategorys']),
								baseParams : {
									projectDataType : this.projectDataType
								}
							})
				})
				utils.deviceProjectComboBox.superclass.initComponent.call(this);// 必须放在末尾,否则出错
			}
		});
Ext.reg('deviceProjectComboBox', utils.deviceProjectComboBox);// 第一个参数为自定义控件的xtype

Ext.ns("utils.departmentComboBox");
/**
 * 获取部门Combox
 * 
 * @class utils.deviceProjectComboBox
 * @extends Ext.form.ComboBox
 */
utils.departmentComboBox = Ext.extend(Ext.form.ComboBox, {
			fieldLabel : '部门',
			mode : 'remote',
			pageSize : 10,
			forceSelection : true,
			triggerAction : 'all',
			emptyText : '请选择...',
			// 弹出选择添加缩放按钮
			resizable : true,
			blankText : '请选择部门...',
			valueField : "value",
			displayField : "text",
			initComponent : function() {// 事件绑定不要放在初始时,可以放在扩展时或Renderer中.
				var combo = this;
				Ext.applyIf(this, { // 初始化时赋值属性.当然也可以在外层扩展或构造时赋值.
					store : new Ext.data.Store({
						proxy : new Ext.data.HttpProxy({
									url : "../JSON/untilsRemote.getDepartmentList",
									method : 'POST'
								}),
						reader : new Ext.data.JsonReader({
									totalProperty : 'totalProperty',
									root : 'results',
									id : 'value'
								}, ['text', 'value'])
/*
 * , baseParams : { projectDataType : this.projectDataType }
 */
						})
				})
				utils.departmentComboBox.superclass.initComponent.call(this);// 必须放在末尾,否则出错
			}
		});
Ext.reg('departmentComboBox', utils.departmentComboBox);// 第一个参数为自定义控件的xtype

