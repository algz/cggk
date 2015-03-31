
var XX = {};
var depUser = {
	departmentCombo : null,
	codeid : null,
	roleId : null,// 对于角色的过滤
	codename : null,
	dbaseparams : null,
	manname : null,
	comboboxStore : null,
	onselectDepart : null,
	pagingUser : null
}

depUser.users = function(u, url,iD) {
	depUser.comboboxStores = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
					method : 'POST',
					url : "../JSON/base_user_UserSerivce.findpageDepartmentList?a="
							+ new Date()
				}),
		reader : new Ext.data.JsonReader({
					id : "userid",
					totalProperty : 'totalProperty',
					root : 'results'
				}, [{
							name : 'truename'
						}, {
							name : 'userid'
						}, {
							name : 'loginname'
						}])
	});
	if(iD == null) {
		iD = 'depUserComb';
	}
	depUser.usersComb = new Ext.form.ComboBox({
		id : iD,
		store : depUser.comboboxStores,
		valueField : "userid",
		displayField : "truename",
		mode : 'remote',
		queryParam : 'truename',
		minChars : 0,
		pageSize : 10,
		forceSelection : true,
		hiddenName : 'userid',
		editable : true,
		triggerAction : 'all',
		fieldLabel : u,
		typeAhead : false,
		name : 'userid',
		blankText : ''+getResource('resourceParam570')+'',
		allowBlank : false,
		enableKeyEvents : true,
		disableKeyFilter : true,
		tpl : '<tpl for="."><div ext:qtip="{loginname}"  class="x-combo-list-item">'
				+ '<div style="float:left; text-align:left; padding-left:3px">{truename}</div>'
				+ '<div style="float:right; text-align:right padding-right:3px"><font color="green">{loginname}</font></div>'
				+ '</div></tpl>',
		emptyText : ''+getResource('resourceParam569')+''
		
	});
	depUser.usersComb.on('select', function(combo, record, index) {
				// 下拉列表文本值
				depUser.manname = record.get(combo.displayField);
			});
}




/******************Msg**************************/
XX.common =  function(){
    var msgCt;

    function createBox(t, s){
        return ['<div class="msg">',
                '<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>',
                '<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc"><h3>', t, '</h3>', s, '</div></div></div>',
                '<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>',
                '</div>'].join('');
    }
    return {
        msg : function(title, format){
            if(!msgCt){
                msgCt = Ext.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
            }
            msgCt.alignTo(document, 't-t');
            var s = String.format.apply(String, Array.prototype.slice.call(arguments, 1));
            var m = Ext.DomHelper.append(msgCt, {html:createBox(title, s)}, true);
            m.slideIn('t').pause(1).ghost("t", {remove:true});
        },
         init : function(){
            
        }
    

       
    };
}();

XX.view = function(){
	return {
	
		upload : function(label) {
				return new Ext.form.FileUploadField({
				id : 'fileUpload',
				fieldLabel : label,
				width : 270

			})

}
	}
}();
