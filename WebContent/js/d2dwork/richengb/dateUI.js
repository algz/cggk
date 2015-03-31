/**
 * 日历控件类 游松 2008-3-5
 */

var Calendar = {
	array : null
};

Calendar.getCalendar = function() {
	var _date = arguments.length == 0 ? new Date() : new Date(year, month - 1,
			date);
	// 实例变量
	this.year = _date.getFullYear();
	this.month = _date.getMonth() + 1;
	this.fday = new Date(this.year, this.month - 1, 1).getDay();// 每月第一天的星期数
	this.dayNum = new Date(this.year, this.month, 0).getDate();// 每月的天数
	// 成员变量，当前年月日
	Calendar.cur_year = this.year;
	Calendar.cur_month = this.month;
	Calendar.cur_date = _date.getDate();
}

/**
 * 根据所选时间获得当月有日程内容的号数 参数:所选择的日期
 */
Calendar.difference = function(year, month, day) {
	callSeam("d2dwork_richengb_richenggl", "difference", [year, month, day],
			Calendar.differenceCallback);// 调用远程方法
}

/**
 * 回调方法并初始化richengbAjax.yricheng属性
 */
Calendar.differenceCallback = function(obj) {
	Calendar.array = obj;
	Calendar.init();
}

Calendar.init = function() {
	Calendar.getCalendar();
	document.getElementById("calendar_contain").innerHTML = Calendar.show();
}

Calendar.show = function() {
	var date = new Array(this.fday > 0 ? this.day : 0);// 预先定义一段空数组，对应日历里第一周空的位置
	var html_str = new Array();
	var date_index = 0;
	var weekDay = ["" + getResource('resourceParam6052'), // 日
	               "" + getResource('resourceParam6046'), // 一
	               "" + getResource('resourceParam6047'), // 二
	               "" + getResource('resourceParam6048'), // 三
	               "" + getResource('resourceParam6049'), // 四
	               "" + getResource('resourceParam6050'), // 五
	               "" + getResource('resourceParam6051')];// 六
	for (var j = 1;j <= this.dayNum; j++) {// 初始化date数组
		date.push(j);
	}
	html_str.push("<table id='calendar' align='center' border='1'>");
	html_str
			.push("<caption><span align='center' title=''+getResource('resourceParam1656')+'' onmouseover=\"this.style.color='#F90'\" onmouseout=\"this.style.color='#09F'\" onclick=\"Calendar.update(-12);return false\" style='color:#09F;font-size:16px;margin-right:5px;'>&laquo;</span><span title=''+getResource('resourceParam1657')+''  onmouseover=\"this.style.color='#F90'\" onmouseout=\"this.style.color='#09F'\" onclick=\"Calendar.update(-1);return false\" style='margin-right:15px;color:#09F;'>▲</span><span id='calendar_title'>"
					+ this.year
					+ "" + getResource('resourceParam6053') // 年
					+ this.month
					+ "" + getResource('resourceParam6054') // 月
					+ "</span><span title=''+getResource('resourceParam1658')+'' onclick=\"Calendar.update(1);return false\"  onmouseover=\"this.style.color='#F90'\" onmouseout=\"this.style.color='#09F'\" style='margin-left:15px;color:#09F;'>▼</span><span title=''+getResource('resourceParam1659')+'' onclick=\"Calendar.update(12);return false\"  onmouseover=\"this.style.color='#F90'\" onmouseout=\"this.style.color='#09F'\" style='font-size:16px;margin-left:5px;color:#09F;'>&raquo;</span></caption>");
	html_str.push("<thead><tr>");
	for (var i = 0;i < 7; i++) {// 填充日历头
		html_str.push("<td>" + weekDay[i] + "</td>");
	}
	html_str.push("</tr></thead>");
	html_str.push("<tbody>");
	var count = 0;
	for (var i = 0;i < 6; i++) {// 填充日期 控制行
		html_str.push("<tr>");
		for (var j = 0;j < 7; j++) { // 控制列
			var flag = false;
			tmp = date[date_index++];
			tmp = tmp ? tmp : "";
			if (tmp == "") {
				html_str.push("<td></td>");
			} else if(Calendar.cur_date == tmp){
				html_str.push("<td><div onclick='Calendar.click(this)'><span id='c_today' style='color:red;'>" + Calendar.cur_date + "</span></div></td>");
			}else {
				for (var i = 0;i < Calendar.array.length; i++) {
					if (parseInt(Calendar.array[i]) == parseInt(tmp)) {
						html_str
								.push("<td><div onmouseover=\"this.style.backgroundColor='#FFF'\" onmouseout=\"this.style.backgroundColor=''\" onclick='Calendar.click(this)'>"
										+ tmp
										+ "<img src='../base/details.gif'/></div></td>");
						flag = true;
						break;
					}
				}
				if (!flag) {
					html_str
								.push("<td><div onmouseover=\"this.style.backgroundColor='#FFF'\" onmouseout=\"this.style.backgroundColor=''\" onclick='Calendar.click(this)'>"
										+ tmp + "</div></td>");
				}
				
			}

		}
		html_str.push("</tr>");
	}
	html_str.push("</tbody></table>");
	return html_str.join("");
}

/**
 * 
 */
Calendar.cdifference = function(year, month, day) {
	callSeam("d2dwork_richengb_richenggl", "difference", [year, month, day],
			Calendar.cdifferenceCallback);// 调用远程方法
}

/**
 * 回调方法并初始化richengbAjax.yricheng属性
 */
Calendar.cdifferenceCallback = function(obj) {
	Calendar.array = obj;
	Calendar.change();
}

Calendar.change = function() {
	var date = new Date(Calendar.cur_year, Calendar.cur_month - 1 + Calendar._month, 1);
	var fday = date.getDay();// 每月第一天的星期数
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var dayNum = new Date(Calendar.cur_year, Calendar.cur_month + Calendar._month, 0)
			.getDate();// 每月的天数
	var tds = document.getElementById("calendar").getElementsByTagName("td");
	for (var i = 7;i < tds.length; i++)
		// 清空日历内容
		tds[i].innerHTML = "";
	document.getElementById("calendar_title").innerHTML = year + "" + getResource('resourceParam6053') + month // 年
			+ "" + getResource('resourceParam6054'); //月 更新显示年月
	// 更新当前年月
	Calendar.cur_year = year;
	Calendar.cur_month = month;
	for (var j = 1;j <= dayNum; j++) {
		var flag = false;
		for (var i = 0;i < Calendar.array.length; i++) {
			if (parseInt(Calendar.array[i]) == parseInt(j)) {
				tds[6 + fday + j].innerHTML = "<div onmouseover=\"this.style.backgroundColor='#CCC'\" onmouseout=\"this.style.backgroundColor=''\" onclick='Calendar.click(this)'>"
						+ j + "<img src='../base/details.gif'/></div>";
				flag = true;
				break;
			} 
		}
		if (!flag) {
			tds[6 + fday + j].innerHTML = "<div onmouseover=\"this.style.backgroundColor='#CCC'\" onmouseout=\"this.style.backgroundColor=''\" onclick='Calendar.click(this)'>"
					+ j + "</div>";
		}
	}
}

// 静态方法
Calendar.update = function(_month) {
	Calendar._month = _month;
	var date = new Date(Calendar.cur_year, Calendar.cur_month - 1 + _month, 1);
	Calendar.cdifference(date.getFullYear(), date.getMonth(), date.getDay());
}
Calendar.click = function(obj) {
	Calendar.cur_date = parseInt(obj.innerHTML);
	Calendar.onclick(obj);
}
Calendar.onclick = function(obj) {// 点击日期时执行的函数，可以更改为自己需要函数,控件传递过来的参数为当前日期
	var select = Calendar.cur_year + "-" + Calendar.cur_month + "-"
			+ Calendar.cur_date;
	richengbGridUI.baseargs = {
		selectDate : select
	}
	var dt = new Date(Calendar.cur_year,Calendar.cur_month,Calendar.cur_date);
	richengbFormUI.form.form.findField('rcksshji').setValue(dt);
//	if(obj.innerHTML.indexOf('<IMG') != -1){
//		richengbGridUI.loadData();
//	}
	richengbGridUI.loadData();
};
