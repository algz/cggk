var selectGradePersonnelPanel = {
	contractId:null
}

selectGradePersonnelPanel.init = function(id,num,name){
	selectGradePersonnelPanel.contractId = id;
	var panel1 = new Ext.Panel({
		region:'center',
		layout:'form',
		items:[
			selectGradePersonnelPanel.btnToGrid,
			selectGradePersonnelPanel.btnToTree
		]
	})
	
	var panel2 = gradeParticipant.init();
	//加载参与人表
	Ext.getCmp('gradeParticipantGrid').store.load({
		params:{
			contract_id:id
		}
	})
	var panel3 = selectGradePersonnelPanel.selectPersonnelTree();
	
	var panel = new Ext.Panel({
//		title:'测试',
		layout:'border',
		tbar:['合同编号：<font color="red">'+num+'</font><font style="margin-left:100px;">合同名称：</font><font color="red">'+name+'</font>'],
		items:[
			panel3,panel1,panel2
		]
	});
	
	wind = new Ext.Window({
		width : 650,
		height : 380,
		layout:'fit',
		autoScrool:true,
		title : '参与人选择界面',
		modal : true,
		//弹窗按钮的显示位置
//		buttonAlign:'center',
		//防止窗口超出浏览器
		constrain:true,
//		closeAction:'hide',
		closable:false,
		items : [panel],
		buttons:[
		{
			text:'确定',
			handler:function(){
				var store = Ext.getCmp('gradeParticipantGrid').store;
				var arrayObjChild = new Array();
				//组织插入的参与人编号
				for(var i=0;i<store.getCount();i++){
					arrayObjChild.push(store.getAt(i).data.expert_code);
				}
				Ext.Ajax.request({
					url:'../JSON/SelectGradePersonnelRemote.insertContractGradeParticipant',
					method : 'post',
					disableCaching : true,
					autoAbort : true,
					success : function(response, options) {
						wind.hide();
						//刷新效能评分当前页面的数据
						Ext.getCmp('pactEfficiencyGradeGridGrid').store.baseParams.contract_code=pactEfficiencyGradeGrid.conditionForm.getForm().getValues().pactEfficiencyGradeNum;
						Ext.getCmp('pactEfficiencyGradeGridGrid').store.baseParams.contract_name=pactEfficiencyGradeGrid.conditionForm.getForm().getValues().pactEfficiencyGradeNmae;
						Ext.getCmp('pactEfficiencyGradeGridGrid').store.baseParams.department_b=pactEfficiencyGradeGrid.conditionForm.getForm().getValues().pactEfficiencyGradeSupplier;
						Ext.getCmp('pactEfficiencyGradeGridGrid').store.load({
							params:{
								start:Ext.getCmp('pactEfficiencyGradeGridGrid').getBottomToolbar().cursor,//获得当前页的起始位置
								limit:pactEfficiencyGradeMain.limit
							}
						});
					},
					params : {
						contract_id : selectGradePersonnelPanel.contractId,
						expertCodeForContract : arrayObjChild.toString()
					}
				});
				
			}
		}
		,{text:'取消',handler:function(){
			wind.hide();
			
		}}
		],
		resizable : false
	});
	wind.show();
}

selectGradePersonnelPanel.btnToGrid = new Ext.Button({
	text:'右移',
	width:50,
	style:'margin-top:100px;margin-left:10px;',
	handler:function(){
		var arrayObj = new Array();
		//参与人编号集合
		//getRootNode返回树的根节点
		var nodes = selectGradePersonnelPanel.tree.getRootNode().childNodes; 
		for (var j = 0; j < nodes.length; j++) {  
		     var node = nodes[j];  
		     if (node.hasChildNodes()) {  
		         for (var i = 0; i < node.childNodes.length; i++) {  
		             if (node.childNodes[i].getUI().checkbox.checked) {
		             	arrayObj.push(node.childNodes[i].attributes.mm+'|'+node.childNodes[i].attributes.expert_name+'|'+node.childNodes[i].attributes.project_name);
		             }  
		         } 
		     }  
		 } 
		 
		//判断是否有勾选值传递到右边
		if(arrayObj.length>0){
			//获取表的store
			var store = Ext.getCmp('gradeParticipantGrid').store;
			//剔除掉勾选中重复的编号信息（即去掉重复的专家信息）
			for(var m=0;m<arrayObj.length;m++){
				for(var n=m+1;n<arrayObj.length;n++){
					if(arrayObj[m]==arrayObj[n]){
						arrayObj.remove(this);
						arrayObj.splice(m,1);//删除指定下标的元素
					    m=0;
					    break;
					}
				}
			}
			//判断是否与表中的数据发生重复
			for(var mm=0;mm<arrayObj.length;mm++){
				for(var nn=0;nn<store.getCount();nn++){
					if(store.getAt(nn).get('expert_code')==arrayObj[mm].split('|')[0]){
						arrayObj.splice(mm,1);
						mm = mm - 1;
					    break;
					}    
				}
			}
//			alert(arrayObj.length)

//			--------
			var record1 = new Ext.data.Record.create([
				{name : 'expert_code'},  
			    {name : 'expert_name'},                                   
			    {name : 'project_name'},
			    {name : 'expertId'}
		    ]);
			for(var k=0;k<arrayObj.length;k++){
				var theResult = arrayObj[k].split('|');
				//编写一个record
				var myRecord = new record1({
					expert_code:theResult[0],
					expert_name:theResult[1],
					project_name:theResult[2]
				});
				store.add(myRecord);
			}
/*			
			Ext.Ajax.request({
				url:'../JSON/SelectGradePersonnelRemote.insertContractGradeParticipant',
				method : 'post',
				disableCaching : true,
				autoAbort : true,
				success : function(response, options) {
					//实例一个数据记录
					var record1 = new Ext.data.Record.create([
						 {name : 'expert_code'},  
					     {name : 'expert_name'},                                   
					     {name : 'project_name'},
					     {name : 'expertId'}
				     ]);
					for(var k=0;k<arrayObj.length;k++){
						var theResult = arrayObj[k].split('|');
						//编写一个record
						var myRecord = new record1({
							expert_code:theResult[0],
							expert_name:theResult[1],
							project_name:theResult[2]
						});
						store.add(myRecord);
					}
				},
				params : {
					contract_id : selectGradePersonnelPanel.contractId,
					expertCodeForContract : arrayObjChild.toString()
				}
			});
			*/
		}else{
			alert('没有值加入');
		}
	}
});

selectGradePersonnelPanel.btnToTree = new Ext.Button({
	text:'左移',
	width:50,
	style:'margin-left:10px;margin-top:20px;',
	handler:function(){
		var records = Ext.getCmp('gradeParticipantGrid').getSelectionModel().getSelections();
		var store = Ext.getCmp('gradeParticipantGrid').store;
		//判断是否有选择项
		if(records.length>0){
			var experts = '';
			//组织要删除的参与人
//			for(var i=0;i<records.length;i++){
//				experts = experts + '\'' + records[i].get('expert_code') + '\'';
//				if(i!=records.length-1)
//					experts = experts + ',';
//			}
			for(var j=0;j<records.length;j++){
				store.remove(records[j]);
			}
			/*
			Ext.Ajax.request({
				url:'../JSON/SelectGradePersonnelRemote.DelectContractGradeParticipant',
				method : 'post',
				disableCaching : true,
				autoAbort : true,
				success : function(response, options) {
					for(var j=0;j<records.length;j++){
						store.remove(records[j]);
					}
					Ext.getCmp('selectPersonnelTree').root.reload();
				},
				params : {
					contract_id : selectGradePersonnelPanel.contractId,
					expertCodeForContract : experts
				}
			});*/
		}else{
			alert('必须先勾选数据才能执行操作')
		}
	}
});

//选择评分人员左边的树
selectGradePersonnelPanel.selectPersonnelTree = function(){

	selectGradePersonnelPanel.tree = new Ext.tree.TreePanel({
		title:'选择专家',
		id:'selectPersonnelTree',
		autoScroll:true,
		//隐藏结构虚线
		useArrows: true,
		animate: true,
		region:'west',
//		layout:'fit',
		width:280,
		loader:new Ext.tree.TreeLoader({
			dataUrl:'../JSON/SelectGradePersonnelRemote.GetRetuenTree?a='+ new Date(),
			method:'POST'
		}),
		root:new Ext.tree.AsyncTreeNode({
			id:'0',
			text:'320专家库',
			expanded:true,
			leaf:false,
			iconCls:'icon',
			children:[{id:'01',text:'专长1',leaf:false},{id:'02',text:'专长2',leaf:false}]
		}),
		listeners:{'checkchange':function(node, state){
			if (node.hasChildNodes()) {
				for (i = 0; i < node.childNodes.length; i++) {
					node.childNodes[i].getUI().checkbox.checked = state;
				}
			}
		}}
	})
	
	return selectGradePersonnelPanel.tree;
}