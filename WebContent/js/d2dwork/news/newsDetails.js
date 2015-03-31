if (name == "1") {
	// 显示新闻详细内容
	Seam.Component.getInstance("news_newsserver").getNewsDetails(id,
			function(news) {
				document.getElementById("dcontent").innerHTML = news;
			});
} else if (name == "3") {
	// 显示会议详细内容
	Seam.Component.getInstance("meetings_meetingsserver").getMeetingsDetails(
			id, function(meetings) {
				document.getElementById("dcontent").innerHTML = meetings;
			});
} else if (name == "2") {
	// 显示公告详细内容
	Seam.Component.getInstance("notices_noticesserver").getNoticesDetails(id,
			function(notices) {
				document.getElementById("dcontent").innerHTML = notices;
			});
}