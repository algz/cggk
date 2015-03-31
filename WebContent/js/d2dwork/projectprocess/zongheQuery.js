/**
 * 高级查询
 */
var zongheQuery = {
	queryDialog : null,
	zongheform : null,
	models : null,
	store : null,
	modelcombo : null,
	batchecombo : null,
	//bug:767
	isCheck:0     //0：查看项目进度检索 1: 项目检索
};
//zongheQuery.isCheck=0;
/**
 * 查询面板初始化
 */
zongheQuery.init = function() {

	if (!zongheQuery.queryDialog) {
		tlework.addHtml(tlework.divHtml, "zongheQuery");
		zongheQuery.queryDialog = new Ext.Window({
					el : 'zongheQuery',
					title : ''+getResource('resourceParam6075'), // 检索
					modal : true,
					layout : 'border',
					width : '75%',
					height : 260,
					closeAction : 'hide',
					plain : false,
					items : zongheQuery.queryzongheform()
				});
	}

	delete departmentUser.departmentCombo;
	delete departmentUser.userComb;
	departmentUser.init("" + getResource('resourceParam986') + "", ""
					+ getResource('resourceParam731') + "");
	departmentUser.departmentCombo.anchor = '95%';
	departmentUser.userComb.anchor = '95%';
	enmusEntity.init();
	enmusEntity.usersComb.anchor = '95%';
	zongheQuery.zongheform.getComponent(0).insert(2, {
				columnWidth : .5,
				layout : 'form',
				items : [{
							xtype : 'datefield',
							fieldLabel : '' + getResource('resourceParam856')
									+ '晚于',
							format : 'Y-m-d',
							name : 'actualstartstr',
							anchor : '95%',
							editable:false
						}]
			});
	zongheQuery.zongheform.getComponent(0).insert(3, {
				columnWidth : .5,
				layout : 'form',
				items : [{
							xtype : 'datefield',
							fieldLabel : '' + getResource('resourceParam992')
									+ '早于',
							format : 'Y-m-d',
							name : 'actualendstr',
							anchor : '95%',
							editable:false
						}]
			});

	zongheQuery.zongheform.getComponent(0).insert(0, {
				columnWidth : .5,
				layout : 'form',
				defaultType : 'textfield',
				items : [departmentUser.departmentCombo]
			});
	zongheQuery.zongheform.getComponent(0).insert(1, {
				columnWidth : .5,
				layout : 'form',
				defaultType : 'textfield',
				items : [departmentUser.userComb]
			});

	zongheQuery.zongheform.getComponent(0).insert(2, {
		columnWidth : .5,
		layout : 'form',
		defaultType : 'textfield',
		items : [{
			msgTarget : "title",
			fieldLabel : '' + getResource('resourceParam1035') + '',
			name : 'projectname',
			regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
			regexText : '' + getResource('resourceParam1092') + '!',
			width : 175,
			maxLength : 50,
			allowBlank : true,
			maxLengthText : "" + getResource('resourceParam1284') + ""
					+ getResource('resourceParam1293') + "",
			anchor : '95%'
		}]
	});
	zongheQuery.zongheform.getComponent(0).insert(3, {
				columnWidth : .5,
				layout : 'form',
				items : [enmusEntity.usersComb]
			});

	zongheQuery.queryDialog.show();
	zongheQuery.queryDialog.on("hide", function() {
				zongheQuery.queryDialog.close();
				zongheQuery.queryDialog.destroy();
				zongheQuery.queryDialog = null;

			});
};

/**
 * 生成查询日志的Form面板
 */
zongheQuery.queryzongheform = function() {
new Ext.form.DateField()
	zongheQuery.zongheform = new Ext.FormPanel({
				labelWidth : 110, // label settings here cascade unless
									// overridden
				frame : true,
				region : 'center',
				plain : false,
				// shadow: false,
				bodyStyle : 'padding:5px 5px 0',
				width : 600,
				items : [{
					layout : 'column',
					items : [{
						columnWidth : .5,
						layout : 'form',
						items : [{
							xtype : 'datefield',
							fieldLabel : '' + getResource('resourceParam991')
									+ '晚于',
							format : 'Y-m-d',
							editable:false,	
							name : 'plannedstartstr',
							anchor : '95%'
						}]
					}, {
						columnWidth : .5,
						layout : 'form',
						items : [{
							xtype : 'datefield',
							fieldLabel : '' + getResource('resourceParam993')
									+ '早于',
							editable:false,		
							format : 'Y-m-d',
							name : 'plannedendstr',
							anchor : '95%'
						}]
					}]
				}, {
					fieldLabel : '' + getResource('resourceParam1039') + '',
					xtype : 'textarea',
					name : 'projectnotes',
					maxLengthText : "" + getResource('resourceParam1293') + "",
					allowBlank : true,
					anchor : '98%'
				}],
				buttons : [{
							text : '' + getResource('resourceParam652') + '',
							handler : function() {
								if(zongheQuery.isCheck==0){
									zongheUtil.Query();
								}
								else if(zongheQuery.isCheck==1){
									zongheUtil.GQuery();
								}
								zongheQuery.queryDialog.hide();
							}

						}, {
							text : ''+getResource('resourceParam6002')+'', // 取消
							handler : function() {
								zongheQuery.zongheform.getForm().reset();
								zongheQuery.queryDialog.hide();
							}
						}]
			});
	return zongheQuery.zongheform;
};
