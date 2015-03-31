Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
/**
 * 修改权限
 */

var privmenu = {addDialog:null,privform:null,privs:null};


/**
* 下拉菜单
*/
privmenu.gettree =  function(){
	var dataUrl = '../JSON/base_privilege_privSerivce.getMenuTree';	
	
	function createTree(el){
		var Tree = Ext.tree;
	
		var tree = new Tree.TreePanel({
			el:el,
			autoScroll:true,
			animate:true,
			containerScroll: true, 
			dropConfig: {appendOnly:true},
			loader: new Tree.TreeLoader({
				dataUrl : this.dataUrl,
				baseParams : this.baseParams
			})
		});
		var root = new Tree.AsyncTreeNode(this.treeRootConfig);
		tree.setRootNode(root);
		return tree;
	};
	
	return new Ext.form.myTreeField({
		fieldLabel: ''+getResource('resourceParam771')+'',
		emptyText:''+getResource('resourceParam770')+'',
		valueField : 'id',
		hiddenName : 'menuid',
		listWidth : 200,
		layerHeight : 200,
		dataUrl : dataUrl,
		allowBlank : false,
		createTree : createTree
    });
};
/**
 * 生成修改权限表单面板
 */
privmenu.getprivform =  function(){
	return new Ext.FormPanel({

		labelWidth: 75, // label settings here cascade unless overridden
        frame:false,
        plain: false,
        bodyStyle:'padding:5px 5px 0;background:transparent',
		defaultType: 'textfield',
		items:[								//定义面板中的表单元素
			{	inputType:'hidden',
				name: 'privilegeid',
				width:175,
				value:myGrid.row.get('privilegeid')
			},
			{	fieldLabel: ''+getResource('resourceParam756')+'',		//文本框
				name: 'privilegeid',
				width:175,
				blankText:''+getResource('resourceParam753')+'',
				value:myGrid.row.get('privilegeid'),
				disabled:true,
				allowBlank:false
			},
			{	fieldLabel: ''+getResource('resourceParam674')+'',		//文本框
				name: 'privilegename',
				width:175,
				blankText:''+getResource('resourceParam754')+'',
				value:myGrid.row.get('privilegename'),
				disabled:true,
				allowBlank:false
			},
			{
				fieldLabel: ''+getResource('resourceParam675')+'',
				xtype:'textarea',
				name: 'description',
				width:175,
				height:60,
				blankText:''+getResource('resourceParam769')+'',
				value:myGrid.row.get('description'),
				disabled:true,
				allowBlank:false
			
			},
			{	inputType:'hidden',
				name: 'groups',
				width:175,
				value:myGrid.row.get('groups')
			},
			{	fieldLabel: ''+getResource('resourceParam1654')+'',		//文本框
				name: 'groups',
				width:175,
				blankText:''+getResource('resourceParam754')+'',
				value:myGrid.row.get('groups'),
				disabled:true,
				allowBlank:false
			}
			],										
		buttons: [							//定义面板中的按钮
			{	text: ''+getResource('resourceParam505')+'',
				handler: function()			//为当前按钮绑定事件
					{						//如果验证通过，则将表单元素提交到指定路径
					if(privmenu.privform.form.isValid()){
						var privVo = Seam.Remoting.createType("com.luck.itumserv.base.privilege.PrivVo");
						Ext.apply(privVo,privmenu.privform.getForm().getValues());
						Seam.Component.getInstance
							("base_privilege_privSerivce").privAddMenu(privVo,privmenu.save);
					}
					
				}
			},
			{   text: ''+getResource('resourceParam7007')+'',
				handler: function(){
					//privmenu.privform.form.reset();	//表单重置
					privmenu.addDialog.close();
					privmenu.addDialog.destroy();		//摧毁当前元素相关的所有对象，包括Div等
					privmenu.addDialog = null;
					}
			}]	
		});	
	}

/**
 * 返回查询到的机构列表，创建修改权限对话框
 */
privmenu.init = function(response, opt){
	if(myGrid.row == null){									//如未选中任何一行，则不执行操作
	  	
	  	Ext.MessageBox.show({
           title: ''+getResource('resourceParam663')+'',
           msg:''+getResource('resourceParam759')+'',
           buttons: Ext.MessageBox.OK,
           icon: Ext.MessageBox.WARNING
       	});
       	return false;
	  }
	
	if (!privmenu.addDialog){				
		tlework.addHtml(tlework.divHtml,'privupdate');			//动态生成需要绑定的div
		privmenu.addDialog = new Ext.Window({ 				//创建对话框
		el:'privupdate',
		title: ''+getResource('resourceParam772')+'',
		modal: true,
		layout:'fit',
		width:300,
		height:260,
		closeAction:'hide',
		plain: false,
		items: [privmenu.addprivform()]						//将面板绑定到对话框
		});
	}
	privmenu.addDialog.show();								//显示对话框
}

/**
 * 生成修改权限的Form面板
 */
privmenu.addprivform = function(){
	    Ext.form.Field.prototype.msgTarget = 'qtip';

		var tree = privmenu.gettree();
		privmenu.privform = privmenu.getprivform();
		privmenu.privform.add(tree);
		return privmenu.privform;
};
/**
 * 根据返回结果进行操作
 */
privmenu.save = function(result){
	var sign = result;	
	if (sign=="true"){							
       	
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam6073')+'',
			msg: ''+getResource('resourceParam631')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		});	
		privmenu.addDialog.close();
		privmenu.addDialog.destroy();		
		privmenu.addDialog = null;
	    privMain.baseargs = null;
		myGrid.loadvalue(privMain.privgrid.store,privMain.args,privMain.baseargs);
	}else{
		privmenu.privform.form.reset();
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: sign,
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR
		});
	}
	
};
