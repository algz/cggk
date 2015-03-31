ViewApprovalWin=function(functOK, functCancel) {
	var scope=this;
	this.departmentTextFiled = new Ext.form.TextField({
		fieldLabel : '负责人部门',
		emptyText : '未设置',
		anchor : '90%',
		disabled : true
	});
	this.roleTextFiled = new Ext.form.TextField({
		fieldLabel : '负责人角色',
		emptyText : '未设置',
		anchor : '90%',
		disabled : true
	});
	this.usrliststore = new Ext.data.ArrayStore({
	    fields: ['examiner', 'examinerName','loginName']
	    //data : activityInfo.comments[0].userList
	});
	this.userComb = new Ext.form.ComboBox({
	    store: this.usrliststore,
	    hiddenName : 'examiner',
	    valueField : "examiner",
	    anchor : '90%',
	    typeAhead : false,
	    displayField : 'examinerName',
	    typeAhead: true,
	    mode: 'local',
	    allowBlank : false,
	    triggerAction: 'all',
	    emptyText:'请选择...',
	    selectOnFocus:true,
	    fieldLabel : "负责人",
	    tpl : '<tpl for="."><div ext:qtip="{examinerName}"  class="x-combo-list-item">'
            + '<div style="float:left; text-align:left; padding-left:3px">{examinerName}</div>'
            + '<div style="float:right; text-align:right padding-right:3px"><font color="green">{loginName}</font></div>'
            + '</div></tpl>'
	    
	});
	this.loadMask = null;
	
	this.viewPanel = new Ext.FormPanel({
		frame : false,
		boder : false,
		bodyStyle : 'padding:5px 10px 5px 10px',
		labelWidth : 100,
		layout : 'form',
		region : 'center',
		items : [this.departmentTextFiled, this.roleTextFiled,this.userComb],
		listeners : {
        	afterrender : function() {
				scope.loadMask = new Ext.LoadMask(scope.viewPanel.body.dom, {
					msg : 'loading...'
				});
        	}
        }
	});
	
	this.window = new Ext.Window({
		title : '确认',
		width : 400,
		height : 300,
		buttonAlign : 'right',
		closeAction : 'hide',
		layout : 'border',
		resizable : false,
		modal : true,
		plain : true,
		bodystyle : 'padding:5px',
		items : [this.viewPanel],
		buttons : [{
			width : 50,
			text : "" + getResource('resourceParam479') + "",
			handler : function(button) {
				var getuser = scope.userComb.getValue();
				if(getuser&&getuser!= ''){
					if(functOK) {
						functOK(getuser);
					}
				}else{
					Ext.MessageBox.show({
						title : '' + getResource('resourceParam575') + '',
						msg : "请选择审批人以后再提交审批！",
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.INFO
					});
					return;
				}
				scope.window.hide();
			}
		}, {
			width : 50,
			text : "" + getResource('resourceParam2006') + "",
			handler : function() {
				if(functCancel) {
					functCancel();
				}
				scope.window.hide();
			}
		}]
	});
	
	this.showWin = function(activityInfo, msg) {
		var attentionPanel = new Ext.Panel({
			border : false,
			bodyStyle : 'padding:5px 0px 5px 0px',
	   	  	region : 'north',
	   	  	html : '<div style="color:blue;font-size:12px">' + msg + '</div>'
		});
		this.userComb.getStore().loadData(activityInfo.comments[0].userList);
		this.departmentTextFiled.setValue(activityInfo.comments[0].chargedDepName);
		this.roleTextFiled.setValue(activityInfo.comments[0].chargedRoleName);
		this.viewPanel.insert(0, attentionPanel);
		this.window.show();
		scope.viewPanel.getForm().reset();
		
		var comments = activityInfo.comments;
		if(comments && comments.length > 0) {
			var comment = comments[0];
			if(comment.examiner && comment.examiner != '') {
				this.userComb.disable();
				this.userComb.setValue(comment.examiner);
				this.userComb.setRawValue(comment.examinerName);
			}
		}else {
			Ext.MessageBox.show({
				title : '' + getResource('resourceParam575') + '',// 信息提示
				msg : '没有找到审批参与人，请联系系统管理员！',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.ERROR
			});
		}
	}
	
	this.window.on('hide',function(){
		scope.viewPanel.form.reset();
		scope.window.destroy();
		scope.viewPanel=null;
		scope.window=null;
	});
}