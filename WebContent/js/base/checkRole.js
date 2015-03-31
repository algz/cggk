var checkRole = {

}
checkRole.init = function(callback, dataId, dataType) {
	Ext.ux.Multiselect.override( {
		onRender : function(ct, position) {
			Ext.ux.form.MultiSelect.superclass.onRender
					.call(this, ct, position);
			var fs = this.fs = new Ext.form.FieldSet( {
				renderTo : this.el,
				title : this.legend,
				height : this.height,
				width : this.width,
				style : "padding:0;",
				tbar : this.tbar
			});
			fs.body.addClass('ux-mselect');
			this.view = new Ext.ListView( {
				multiSelect : true,
				store : this.store,
				columns : [ {
					header : 'rolename',
					dataIndex : 'rolename'
				}],
				hideHeaders : true
			});

			fs.add(this.view);

			this.view.on('click', this.onViewClick, this);
			this.view.on('beforeclick', this.onViewBeforeClick, this);
			this.view.on('dblclick', this.onViewDblClick, this);

			this.hiddenName = this.name || Ext.id();
			var hiddenTag = {
				tag : "input",
				type : "hidden",
				value : "",
				name : this.hiddenName
			};
			this.hiddenField = this.el.createChild(hiddenTag);
			this.hiddenField.dom.disabled = this.hiddenName != this.name;
			fs.doLayout();
		}
	});
	
	var rolestore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : '../JSON/base_role_roleSerivce.selectRole'
						}),
				reader : new Ext.data.JsonReader({
							root : 'results',
							totalProperty : 'totalProperty',
							id : 'roleid'
						}, ['roleid', 'rolename', 'descr', 'roleType']),
				baseParams : {
					instcode : '',
					dataId : dataId,
					dataType : dataType
				}
			});

	checkRole.rolecheck = new Ext.data.Store();
	checkRole.rolecheck.clearData();
	rolestore.load();
	var nameStr = "";
	rolestore.on("remove", function(store, record) {
				// nameStr += record.get("truename") + ",";

			})
	checkRole.rolecheck.on("remove", function(store, record) {
				// nameStr = nameStr.replace(record.get("truename") + ",", "");
			})
	checkRole.rolecheck.on("add", function(stroe, record) {
			})

	var isForm = new Ext.Panel({
				width : 377,
				frame : true,
				items : [{
							xtype : "itemselector",
							name : "itemselector",
							id : 'checkrole',
							fieldLabel : ""+getResource('resourceParam554')+"",
							dataFields : ["roleid", "rolename"],
							msWidth : 170,
							msHeight : 200,
							valueField : "roleid",
							displayField : "rolename",
							imagePath : "../images/",
							toLegend : ""+getResource('resourceParam555')+"",
							fromLegend : ""+getResource('resourceParam556')+"",
							fromStore : rolestore,
							toStore : checkRole.rolecheck,
							toTBar : [{
										text : ""+getResource('resourceParam557')+"",
										handler : function() {
											Ext.getCmp('checkrole').reset();
										}
									}]
						}],

				buttons : [{
							text : ''+getResource('resourceParam505')+'',
							handler : function() {
								if (callback) {
									callback();
								}
								checkRoleWin.close();
							}
						}]
			});

	var checkRoleWin = new Ext.Window({
				width : 407,
				height : 310,
				title : ''+getResource('resourceParam554')+'',
				modal : true,
				closable : true,
				// closeAction : 'hide',
				bodyStyle : 'padding:10px 12px 10px 10px ',
				items : [isForm],
				resizable : false
			});
	checkRoleWin.show();
}
