// 新闻、公告、会议 当前起始行记录变量
var newsye = 0;
var meetingsye = 0;
var noticeye = 0;

// 一页的条数
var shownews = 15;
// 新闻、公告、会议 总行数变量
var newstotal = 0;
var meetingtotal = 0;
var noticestotal = 0;

// 显示从{fromtotal}到{tototal},{presentpage}当前页
var fromtotal = 1;
var tototal = 15;
var presentpage = 1;
var pagecount = 1;

/*
 * 以下部分与 indexNews.js一起作用到indexlist.jsp indexNews.js负责加载新闻、公告、会议的内容
 * 这里负责加载新闻、公告、会议的数据行数，设置页号显示
 */
// 获取发布的新闻的总行数
Seam.Component.getInstance("news_newsserver").gettotal(function(news) {
			newstotal = news;
		});

// 获取发布的公告的总行数
Seam.Component.getInstance("notices_noticesserver").gettotal(function(notices) {
			noticestotal = notices;
		});

// 获取发布的会议的总行数
Seam.Component.getInstance("meetings_meetingsserver").gettotal(
		function(meetings) {
			meetingtotal = meetings;
		});

/**
 * 首页新闻、公告、会议的“更多”界面的翻页
 * 
 * @param str
 *            按钮功能0:首页，1:下一页，2:上一页，3:末页
 */

function fen(str) {
	types = "1";
	// types=1:新闻
	if (types == "1") {
		if (str == 0) { // 首页
			newsye = 0;
		} else if (str == 1) { // 上一页
			newsye = newsye - shownews;
			if (newsye < 0)
				newsye = 0;
		} else if (str == 2) { // 下一页
			// 总数据行不足一页
			if (newstotal < shownews)
				return;

			var s = newsye + shownews;
			if (s < newstotal)
				newsye = s;
		} else if (str == 3) { // 末页
			// 总数据行不足一页
			if (newstotal < shownews)
				return;

			if (newstotal > shownews) {
				var s = newstotal % shownews
				newsye = newstotal - s;
			}
		}

		var appVo = Seam.Remoting.createType("com.luck.itumserv.news.NewsVo");
		appVo.setStart(newsye); // 行号，从0开始
		appVo.setLimit(shownews); // 每页行数
		Seam.Component.getInstance("news_newsserver").getNewsFenye(appVo,
				function(news) {
					document.getElementById("news").innerHTML = news;
				});

		// types=2:公告
	} else if (types == "2") {
		var shownotices = 5;
		if (str == 0) { // 首页
			noticeye = 0;
		} else if (str == 1) { // 上一页
			noticeye = noticeye - shownotices;
			if (noticeye < 0)
				noticeye = 0;
		} else if (str == 2) { // 下一页
			// 总数据行不足一页
			if (noticestotal < shownotices)
				return;

			var s = noticeye + shownotices;
			if (s < noticestotal)
				noticeye = s;
		} else if (str == 3) { // 末页
			// 总数据行不足一页
			if (noticestotal < shownotices)
				return;

			if (noticestotal > shownotices) {
				var s = noticestotal % shownotices
				noticeye = noticestotal - s;
			}
		}

		var appVo = Seam.Remoting
				.createType("com.luck.itumserv.bulletin.NoticesVo");
		appVo.setStart(noticeye); // 行号，从0开始
		appVo.setLimit(shownotices); // 每页行数
		Seam.Component.getInstance("notices_noticesserver").getNoticesFenye(
				appVo, function(notices) {
					document.getElementById("notice").innerHTML = notices;
				});

		// types=3:会议
	} else if (types == "3") {
		var showmeeting = 5;
		if (str == 0) { // 首页
			meetingsye = 0;
		} else if (str == 1) { // 上一页
			meetingsye = meetingsye - showmeeting;
			if (meetingsye < 0)
				meetingsye = 0;
		} else if (str == 2) { // 下一页
			// 总数据行不足一页
			if (meetingtotal < showmeeting)
				return;

			var s = meetingsye + showmeeting;
			if (s < meetingtotal)
				meetingsye = s;
		} else if (str == 3) { // 末页
			// 总数据行不足一页
			if (meetingtotal < showmeeting)
				return;

			if (meetingtotal > showmeeting) {
				var s = meetingtotal % showmeeting
				meetingsye = meetingtotal - s;
			}
		}

		var appVo = Seam.Remoting
				.createType("com.luck.itumserv.conference.MeetingsVo");
		appVo.setStart(meetingsye); // 行号，从0开始
		appVo.setLimit(showmeeting); // 每页行数
		Seam.Component.getInstance("meetings_meetingsserver").getMeetingsFenye(
				appVo, function(meeting) {
					document.getElementById("meeting").innerHTML = meeting;
				});
	}
}