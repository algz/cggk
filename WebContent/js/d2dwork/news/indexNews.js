// 获取 新闻 区内容
Seam.Component.getInstance("news_newsserver").getNewDate(
    function(news){
	    document.getElementById("news").innerHTML=news;
    });
 //登陆页去除会议和公告内容
//获取 公告 区内容
//Seam.Component.getInstance("notices_noticesserver").getNotices(
//		function(notices){
//			document.getElementById("notice").innerHTML=notices;
//		});
// 获取 会议 区内容
//Seam.Component.getInstance("meetings_meetingsserver").getMeetings(
//    function(meetings){
//        document.getElementById("meeting").innerHTML=meetings;
//    });