// 创建任务回调函数
	collarbMain.createTaskCallBack = function(mes) {
		var newNode = null;
		if (collarbMain.kind == 'sub') {
			// 创建子任务
			var currentNode = collarbMain.leftTree
					.getNodeById(leftNavigationTree.nodeId);
			currentNode.attributes.leaf = false;
			currentNode.attributes.expandable = true;
			newNode = collarbMain.leftTree.getLoader().createNode({
						id : mes.nodeId,
						text : TaskBasicForm.name1,
						projectId : mes.projectId,
						chargedManId : TaskBasicForm.user1,
						dataType: 'TaskDataType',
						iconCls : 'icon-planningTask',
						statusId : mes.statusId,
						nt : mes.nt,
						approval : mes.approval,
						allowDrop : mes.allowDrop,
						allowDrag : false,
						leaf : true
					});
			var lastChildNode = currentNode.lastChild;
			if (lastChildNode != null) {
				// 粘贴时，维护新节点于最后一个节点的
				// pre，nex
				newNode.attributes.pre = lastChildNode.attributes.id;
				newNode.attributes.nex = lastChildNode.attributes.nex;

				lastChildNode.attributes.nex = newNode.attributes.id;
			} else {
				newNode.attributes.pre = '';
				newNode.attributes.nex = '';
			}
			currentNode.beginUpdate();
			currentNode.appendChild(newNode);
			currentNode.endUpdate();
			currentNode.expand();
		} else if (collarbMain.kind == 'same') {
			// 创建同级任务
			var currentNode = collarbMain.leftTree
					.getNodeById(leftNavigationTree.nodeId);
			var parentNode = currentNode.parentNode;
			newNode = collarbMain.leftTree.getLoader().createNode({
						id : mes.nodeId,
						text : TaskBasicForm.name1,
						projectId : mes.projectId,
						chargedManId : TaskBasicForm.user1,
						dataType:'TaskDataType',
						iconCls : 'icon-planningTask',
						statusId : mes.statusId,
						nt : mes.nt,
						approval : mes.approval,
						allowDrop : mes.allowDrop,
						allowDrag : false,
						leaf : true
					});
			newNode.attributes.pre = currentNode.attributes.id;
			newNode.attributes.nex = currentNode.attributes.nex;
			currentNode.attributes.next = newNode.attributes.id;

			var nextNode = currentNode.nextSibling;
			if (nextNode != null) {
				nextNode.attributes.pre = newNode.attributes.id;
				parentNode.insertBefore(newNode, nextNode);
			} else {
				parentNode.appendChild(newNode);
			}
		}
		Ext.example.msg(getResource('resourceParam596'),getResource('resourceParam4024'));	
		collarbMain.leftTree.fireEvent('beforeclick', newNode);// 点击该node
		collarbMain.leftTree.fireEvent('click', newNode,Ext.EventObject.ctrlKey);// 点击该node
		newNode.select();
	}
//添加项目夹回调	
    collarbMain.addFolderCallBack=function(result) {

		var json = Ext.util.JSON.decode(result)
		if (json.success == true) {
			var currentNode = collarbMain.leftTree
					.getNodeById(leftNavigationTree.nodeId);
			currentNode.attributes.leaf = false;
			currentNode.attributes.expandable = true;
			var newNode = collarbMain.leftTree.getLoader
			().createNode({
						id : json.nodeId,
						text : json.name,
						dataType:'ContentDataType',
						allowDrop : false,
						iconCls : 'new-icon-projectCategory',
						leaf : true,
						expandable : false
					});
			//添加到第一个节点
//			var firstChild = currentNode.firstChild;
//			if (firstChild == null) {
//				currentNode.appendChild(newNode);
//			} else {
//				currentNode.insertBefore(newNode, firstChild)
//			}
			var lastChildNode = currentNode.lastChild;
			if (lastChildNode != null) {
				// 粘贴时，维护新节点于最后一个节点的
				// pre，nex
				newNode.attributes.pre = lastChildNode.attributes.id;
				newNode.attributes.nex = lastChildNode.attributes.nex;

				lastChildNode.attributes.nex = newNode.attributes.id;
			} else {
				newNode.attributes.pre = '';
				newNode.attributes.nex = '';
			}		
			currentNode.appendChild(newNode);
            Ext.example.msg(getResource('resourceParam596'),getResource('resourceParam4024'));	
			collarbMain.leftTree.fireEvent('beforeclick', newNode);// 点击该node
			collarbMain.leftTree.fireEvent('click', newNode,
					Ext.EventObject.ctrlKey);// 点击该
		} else {
			Ext.MessageBox.show({
						title : '' + getResource('resourceParam499') + '',
						msg : json.error,
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
		}
	}	
	//更新项目夹回调
	collarbMain.updateFolderCallBack=function(result) {
		var obj = Ext.util.JSON.decode(result);
		if (obj.success == true) {
			collarbMain.refresh();		
			var node =leftNavigationTree.node;
			collarbMain.leftTree.fireEvent('beforeclick',
					node);// 刷新当前节点
			collarbMain.leftTree
					.fireEvent('click', node,Ext.EventObject.ctrlKey);// 刷新当前节点
			Ext.example.msg(getResource('resourceParam596'),getResource('resourceParam677'));	
		} else {
			Ext.MessageBox.show( {
				title : ''+getResource('resourceParam596')+'!',
				msg : obj.error,
				buttons : Ext.MessageBox.ERROR
			});
		}
	}