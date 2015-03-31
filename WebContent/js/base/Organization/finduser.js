Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var finduser = {
	finddialog : null,
	findform : null,
	cs : null,
	sel : false,
	valuecode : null,
	depid:null,
	depname:null
};
finduser.findeuser = function() {
	departmentUser.codeid=null;
	Seam.Component.getInstance("base_user_UserSerivce").getCsVo(
			finduser.getfinddialog);
}
finduser.getfinddialog = function(cs) {
	finduser.cs = cs;
	tlework.addHtml(tlework.divHtml, 'finduser');
	if (!finduser.finddialog) {
		finduser.finddialog = new Ext.Window( {
			el : 'finduser',
			title : '' + getResource('resourceParam652') + '',
			layout : 'fit',
			modal : true,
			width : 300,
			height : 190,
			closeAction : 'hide',
			plain : false,
			items : finduser.getfindform()
		});
		finduser.finddialog.on('hide', finduser.close);
	}
	finduser.finddialog.show();
	departmentUser.codeid = finduser.depid;
	departmentUser.departmentCombo.setTextValue(finduser.depname);
};
finduser.close = function() {
	finduser.findform.form.reset();
	finduser.finddialog.destroy();
	finduser.findform = null;
	finduser.finddialog = null;
};
finduser.getfindform = function() {
	departmentUser.department('' + getResource('resourceParam873') + '');
	departmentUser.departmentCombo.setWidth(180);
	finduser.findform = new Ext.FormPanel(
			{
				labelWidth : 75, // label settings here cascade unless
									// overridden
				plain : false,
				frame : false,
				bodyStyle : 'padding:5px 5px 0;background:transparent',
				defaultType : 'textfield',
				items : [ {
					fieldLabel : '' + getResource('resourceParam887') + '',
					width : 180,
					name : 'findloginname',
					id : 'findloginname',
					minLength : 1,
					maxLength : 20
				}, {
					fieldLabel : '' + getResource('resourceParam872') + '',
					width : 180,
					name : 'findtruename',
					id : 'findtruename',
					minLength : 1,
					maxLength : 20
				}, departmentUser.departmentCombo
				// },{
				// xtype:'combo',
				// store: new Ext.data.SimpleStore({
				// fields: ["findinstcode", "name"],
				// data:finduser.cs.instcodelist
				// }),
				// valueField :"findinstcode",
				// displayField: "name",
				// mode: 'local',
				// forceSelection: true,
				// blankText:'请选择所属机构',
				// emptyText:'选择所属机构',
				// hiddenName:'findinstcode',
				// editable: false,
				// triggerAction: 'all',
				// allowBlank:false,
				// fieldLabel: '所属机构',
				// name: 'findinstcode',
				// anchor:'95%'
				// }
				// ,{
				// fieldLabel: '地址',
				// width:175,
				// name: 'findaddress',
				// id:'findaddress',
				// anchor:'95%',
				// minLength:1,
				// maxLength:2
				// }

				],
				buttons : [
						{
							text : '' + getResource('resourceParam505') + '',
							handler : function() {
								if (departmentUser.codeid == 0) {
									Ext.MessageBox
											.show( {
												title : '' + getResource('resourceParam587') + '',
												msg : '' + getResource('resourceParam864') + '',
												buttons : Ext.MessageBox.OK,
												icon : Ext.MessageBox.ERROR
											});
									return;
								}
								user.baseargs = {
									findloginname : finduser.findform.form
											.getValues().findloginname,
									findtruename : finduser.findform.form
											.getValues().findtruename,
									findinstcode : departmentUser.codeid
								}
								user.sm.clearSelections();
								myGrid.loadvalue(user.grid.store, {
									start : 0,
									limit : 25
								}, user.baseargs);
//								user.baseargs.findloginname=null;
//								user.baseargs.findtruename=null;
//								user.baseargs.findinstcode=null;
								// user.loadvalue();
								finduser.sel = true;
								finduser.finddialog.hide();
							}
						}, {
							text : '取消',
							handler : function() {
								finduser.finddialog.hide();
							}
						} ]
			});
	return finduser.findform;
};
