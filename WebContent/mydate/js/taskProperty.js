Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var taskProperty = {

}
function initTaskAttribute() {
	Ext.QuickTips.init();
	var id = parent.taskidtemp;
	var name = parent.tasknametemp;
	var chargedmanid = parent.chargedmanid;
	var projectid = parent.projectid;
	var taskType = parent.tasktype;
	// alert(id + name);
	log.init(id, name);
	remind.init(id, name, chargedmanid);
	feedback.taskid = id;
	feedback.init(id, name);
	taskProperty.myTaskColumnTree;
	TaskAttributePanel.taskId = id;
	TaskAttributePanel.init();
	TaskAttributePanel.setBasicForm();
	taskProperty.attributePanel = TaskAttributePanel.init();
	taskProperty.ApproveTaskPanel = viewApproveTask.init();

	var mydataObjectPanel = new dataObjectPanel();
	taskProperty.egridpanel2 = mydataObjectPanel.init();
	taskProperty.egridpanel2.on('activate', function() {
				var conn = synchronize.createXhrObject();
				var myurl = "../JSON/task_TaskRemote.getTaskInfo?node=" + id
						+ "&d=" + new Date();
				conn.open("GET", myurl, false);
				conn.send(null);
				obj = Ext.util.JSON.decode(conn.responseText);
				var enableEdit = !(obj.tstatusid == "6" || obj.tstatusid == "7");
				mydataObjectPanel.setConfigs(projectid, id, enableEdit);

			})

	taskProperty.egridpanel1 = new Ext.Panel({
				id : 'etabpanel1',
				height : 800,
				title : '属性',
				layout : 'card',
				items : [taskProperty.attributePanel],
				activeItem : 0,
				listeners : {
					activate : function() {
						Ext.getCmp('etabpanel1').removeClass('x-hide-display');
					}
				}
			});

	var panel1 = new Ext.TabPanel({
				id : 'panel1',
				layoutOnTabChange : true,
				activeTab : 0,
				resizeTabs : true,
				items : [taskProperty.egridpanel1, taskProperty.egridpanel2,
						remind.fullRemainPanel, log.fullLogPanel,
						feedback.allFeedBackPanel]
			});

	if (taskType == 1) {
		var temp = taskProperty.egridpanel1.items.get(0);
		taskProperty.egridpanel1.remove(temp);
		viewApproveTask.setBasicForm(id);
		taskProperty.egridpanel1.add(taskProperty.ApproveTaskPanel);
		taskProperty.egridpanel1.doLayout();
	}
	new Ext.Viewport({
				autoScroll : false, // Update By YangJin'gang At 201009251040 for bug1284
				layout : 'border',
				fitToFrame : true,
				items : [{
							id : 'taskattribute',
							region : 'center',

							layout : 'card',
							// margins:'2 5 5 0',
							activeItem : 0,
							border : false,
							// html : 'abcde'
							items : [panel1]

						}]
			});
}

Ext.onReady(initTaskAttribute);
