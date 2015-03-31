Seam.Remoting.displayLoadingMessage = function() {
};
Seam.Remoting.hideLoadingMessage = function() {
};
function createBox(t, s1, s2, s3, s4) {
	return [
			'<div class="x-box-blue">',
			'<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>',
			'<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc" style="float:left"><h3>',
			t,
			'</h3>',

			'<div style="margin-bottom:5px;float:left;">',
			'<div style="float:left;margin-left:5px">',
			s1,
			'</div>',
			,
			'<div id="msg-bt-look-task" style="width:32px;float:right;margin-right:15px"></div>',
			'</div>',

			'<div style="margin-bottom:5px;float:left;">',
			'<div style="float:left;margin-left:5px">',
			s2,
			'</div>',
			'<div id="msg-bt-look-approve" style="width:32px;float:right;margin-right:15px"></div>',
			'</div>',

			'<div style="margin-bottom:5px;float:left;">',
			'<div style="float:left;margin-left:5px">',
			s3,
			'</div>',
			'<div id="msg-bt-look-notapprove" style="width:32px;float:right;margin-right:15px"></div>',
			'</div>',

			'<div style="margin-bottom:5px;float:left;">',
			'<div style="float:left;margin-left:5px">',
			s4,
			'</div>',
			'<div id="msg-bt-look-mynews" style="width:32px;float:right;margin-right:15px"></div>',
			'</div>',
			'<br/>',
			'<div id="msg-bt-close" style="width:98px;float:right;clear:both;"><span><a href="javascript:void(taskNotify.status=0)">不再提醒</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);"> '
					+ getResource('resourceParam506') + '</a></span></div>',
			'</div></div>', '</div>'].join('');
};
function msg(title, s1, el) {
	// 弹出消息div
	msgCt = Ext.get('notify_msg_div');
	if (!msgCt) {
		msgCt = Ext.DomHelper.insertFirst(el, {
					id : 'notify_msg_div'
				}, true);

	}
	 
	var s1 = String.format.apply(String, Array.prototype.slice.call(arguments,
					1));
 
	msgCt.dom.innerHTML = "";
	var m = Ext.DomHelper.append(msgCt, {
				html : createBox(title, s1)
			}, true);

	Ext.get('msg-bt-close').on("click", function() {
				msgCt.ghost("b", {
							remove : true
						});
			});

	// m.slideIn("b").pause(5).ghost("b", {remove : true});
}

var taskNotify = { 
	timer : null, // 当前计时器
	status : 1
};
taskNotify.ontime = function() {
	if (taskNotify.status == 0) {
		return;
	}
	var conn = synchronize.createXhrObject();
    var url = "../JSON/organization_orgchargeman_OrgChargeManRemote.flagAdminandSafe";
		conn.open("POST", url, false);
		conn.send(null);
		var respText = conn.responseText;
		var obj = Ext.util.JSON.decode(respText);
		if (!obj.success) {//系统管理员、安全保密管理员、安全审计管理员
			callSeam("vendorAppraisalRemote", "getAllMessages", [],
				taskNotify.show);
			taskNotify.timer = setTimeout("taskNotify.ontime();", 1000 * 5 * 60);
		}else{
			return ;
		}
};
taskNotify.show = function(result) { 
	 	var obj = Ext.util.JSON.decode(result);
	 
	if(parseInt(obj.count) > 0){//评分提醒  
		msg("<br/>您有新任务", "您有<span style='color:red'>" + obj.count
						+ "</span>条供应商需要评分，请尽快处理;", cenpanel.panel
						.getEl()// Ext.get('header')
		); 
	}else {
			return false;
	}
 
};
 